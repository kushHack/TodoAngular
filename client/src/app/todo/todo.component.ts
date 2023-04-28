import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITasks } from '../interfaces';
import { TaskdataService } from '../services/taskdata.service';
import { PopupService } from '../services/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  tasks: ITasks[] = [];
  // isHidden: boolean = true;
  private firstTaskSub: Subscription = new Subscription();

  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService
  ) {}

  ngOnInit() {
    this.taskDataService.getTasks();
    this.firstTaskSub = this.taskDataService.tasks.subscribe(
      (tasks) => (this.tasks = tasks)
    );
    // this.popUpService.inputPopUp.subscribe(
    //   (isHidden) => (this.isHidden = isHidden)
    // );
  }

  ngOnDestroy() {
    this.firstTaskSub.unsubscribe();
  }
}
