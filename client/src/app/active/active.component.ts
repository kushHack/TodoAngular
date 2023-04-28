import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITasks } from '../interfaces';
import { PopupService } from '../services/popup.service';
import { TaskdataService } from '../services/taskdata.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit, OnDestroy {
  tasks: ITasks[] = [];
  filteredTask: ITasks[] = [];

  private firstTaskSub: Subscription = new Subscription();

  constructor(
    private taskDataService: TaskdataService,
  ) {}

  ngOnInit() {
    this.taskDataService.getTasks();
    this.firstTaskSub = this.taskDataService.tasks.subscribe((tasks) => {
      this.tasks = tasks.filter((task: ITasks) => task.status === false);
      this.taskDataService.taskCount.next(this.tasks.length);
      this.taskDataService.isAddActive.next(false);
    });
  }

  ngOnDestroy() {
    this.firstTaskSub.unsubscribe();
  }
}
