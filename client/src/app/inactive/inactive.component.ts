import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITasks } from '../interfaces';
import { TaskdataService } from '../services/taskdata.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss'],
})
export class InactiveComponent implements OnInit, OnDestroy {
  tasks: ITasks[] = [];
  filteredTask: ITasks[] = [];
  private firstTaskSub: Subscription = new Subscription();

  constructor(
    private taskDataService: TaskdataService,
  ) {}

  ngOnInit() {
    this.taskDataService.getTasks();
    this.firstTaskSub = this.taskDataService.tasks.subscribe((tasks) => {
      this.tasks = tasks.filter((task: ITasks) => task.status === true);
      this.taskDataService.taskCount.next(this.tasks.length);
      this.taskDataService.isAddActive.next(false);
    });
  }

  ngOnDestroy() {
    this.firstTaskSub.unsubscribe();
  }
}
