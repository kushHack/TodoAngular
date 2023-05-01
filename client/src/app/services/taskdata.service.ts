import { Injectable } from '@angular/core';
import { INotification, ITasks } from '../interfaces';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({
  providedIn: 'root',
})
export class TaskdataService {
  tasks = new Subject<ITasks[]>();
  isAddActive = new Subject<boolean>();
  taskCount = new Subject<number>();
  notification = new Subject<INotification>();
  notificationStatus = new Subject<string>();
  constructor(private http: HttpClient) {}
  timeout!: ReturnType<typeof setTimeout>;

  setNotificationStatus() {
    this.notificationStatus.next('show');
    this.timeout = setTimeout(() => {
      this.notificationStatus.next('hide');
    }, 5000);
  }
  closeNotification() {
    clearTimeout(this.timeout);
    this.notificationStatus.next('hide');
  }
  setNotification(notification: INotification) {
    this.notification.next(notification);
    this.setNotificationStatus();
  }

  getTasks() {
    return this.http.get<ITasks[]>('http://localhost:5500/tasks').subscribe({
      next: (task: ITasks[]) => {
        this.tasks.next(task);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addTask(task: ITasks) {
    return this.http.post('http://localhost:5500/tasks', task).subscribe({
      next: () => {
        this.getTasks();
        this.setNotification({
          notifType: 'success',
          notifMsg: 'Task Added Successfully',
          notifIcon: 'check_circle',
        });
      },
      error: (error) => {
        this.setNotification({
          notifType: 'error',
          notifMsg: error,
          notifIcon: 'cancel',
        });
      },
    });
  }

  deleteTask(id: string) {
    return this.http.delete(`http://localhost:5500/tasks/${id}`).subscribe({
      next: () => {
        this.getTasks();
        this.setNotification({
          notifType: 'success',
          notifMsg: 'Task Deleted Successfully',
          notifIcon: 'check_circle',
        });
      },
      error: (error) => {
        console.log(error);
        this.setNotification({
          notifType: 'error',
          notifMsg: error,
          notifIcon: 'cancel',
        });
      },
    });
  }

  updateTask(task: { id: string; task?: string; status?: boolean }) {
    return this.http.patch('http://localhost:5500/tasks', task).subscribe({
      next: () => {
        this.getTasks();
        this.setNotification({
          notifType: 'success',
          notifMsg: 'Task Updated Successfully',
          notifIcon: 'check_circle',
        });
      },
      error: (error) => {
        console.log('error', error);
        this.setNotification({
          notifType: 'error',
          notifMsg: error.toString(),
          notifIcon: 'cancel',
        });
      },
    });
  }
}
