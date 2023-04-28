import { Injectable } from '@angular/core';
import { ITasks } from '../interfaces';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskdataService {
  tasks = new Subject<ITasks[]>();
  isAddActive = new Subject<boolean>();
  taskCount = new Subject<number>();
  constructor(private http: HttpClient) {}

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
      },
      error: (error) => console.log(error),
    });
  }

  deleteTask(id: string) {
    return this.http.delete(`http://localhost:5500/tasks/${id}`).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateTask(task: { id: string; task?: string; status?: boolean }) {
    return this.http.patch('http://localhost:5500/tasks', task).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
