import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITasks } from '../../interfaces';
import { TaskdataService } from '../../services/taskdata.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  timestamp: string = Date();

  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService
  ) {}
  @Input() task: ITasks = { task: '', status: false };

  deleteTask() {
    this.taskDataService.deleteTask(this.task._id!);
  }

  openPopUp() {
    this.popUpService.setPopUp(false);
    this.popUpService.setIsUpdating({ status: true, id: this.task._id });
  }

  onCheck() {
    this.taskDataService.updateTask({
      id: this.task._id!,
      status: !this.task.status,
    });
  }
}
