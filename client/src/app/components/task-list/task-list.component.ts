import { Component } from '@angular/core';
import { TaskdataService } from '../../services/taskdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService,
    private formBuilder: FormBuilder
  ) {
    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required],
    });
  }

  task: string = '';
  taskForm: FormGroup;

  addTasks() {
    this.taskDataService.addTask({ task: this.task, status: false });
    this.taskForm.get('task')?.reset();
    this.task = '';
    this.popUpService.setPopUp(true);
  }

  onInputChange(event: Event) {
    this.task = (<HTMLInputElement>event.target).value;
  }
}
