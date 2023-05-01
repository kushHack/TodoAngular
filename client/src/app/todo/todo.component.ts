import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ITasks } from '../interfaces';
import { TaskdataService } from '../services/taskdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  tasks: ITasks[] = [];
  private firstTaskSub: Subscription = new Subscription();

  constructor(private taskDataService: TaskdataService) {}

  ngOnInit() {
    this.taskDataService.getTasks();
    this.firstTaskSub = this.taskDataService.tasks.subscribe(
      (tasks) => (this.tasks = tasks)
    );
    console.log(this.tasks);
  }

  ngOnDestroy() {
    this.firstTaskSub.unsubscribe();
  }
}
