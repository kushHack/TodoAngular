import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITasks } from '../interfaces';
import { PopupService } from '../services/popup.service';
import { TaskdataService } from '../services/taskdata.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss'],
})
export class InactiveComponent implements OnInit, OnDestroy {
  tasks: ITasks[] = [];
  // isHidden: boolean = true;
  filteredTask: ITasks[] = [];
  private firstTaskSub: Subscription = new Subscription();

  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService
  ) {}

  ngOnInit() {
    this.taskDataService.getTasks();
    this.firstTaskSub = this.taskDataService.tasks.subscribe((tasks) => {
      this.tasks = tasks.filter((task: ITasks) => task.status === true);
      this.taskDataService.taskCount.next(this.tasks.length);
      this.taskDataService.isAddActive.next(false);
    });

    // this.popUpService.inputPopUp.subscribe(
    //   (isHidden) => (this.isHidden = isHidden)
    // );
  }

  ngOnDestroy() {
    this.firstTaskSub.unsubscribe();
  }
}
