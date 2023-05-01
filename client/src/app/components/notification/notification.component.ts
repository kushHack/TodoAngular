import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from 'src/app/interfaces';
import { TaskdataService } from 'src/app/services/taskdata.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification$!: Observable<INotification>;
  notificationStatus: string = '';

  constructor(private taskDataService: TaskdataService) {}
  ngOnInit() {
    this.notification$ = this.taskDataService.notification;
    this.taskDataService.notificationStatus.subscribe(
      (status) => (this.notificationStatus = status)
    );
  }

  closePopup() {
    this.taskDataService.closeNotification();
  }
}
