import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITasks } from './interfaces';
import { TaskdataService } from './services/taskdata.service';
import { PopupService } from './services/popup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'training';
  tasks: ITasks[] = [];
  isAddActive: boolean = true;
  taskCount: number = -1;
  private addActiveSub: Subscription = new Subscription();
  private taskCountSub: Subscription = new Subscription();

  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService
  ) {}

  ngOnInit(): void {
    this.taskDataService.getTasks();
    this.taskDataService.tasks.subscribe((tasks) => {
      this.tasks = tasks;
      this.taskDataService.taskCount.next(tasks.length);
      this.taskDataService.isAddActive.next(true);
    });
    this.taskCountSub = this.taskDataService.taskCount.subscribe(
      (taskcount) => (this.taskCount = taskcount)
    );
    this.addActiveSub = this.taskDataService.isAddActive.subscribe(
      (isAddActive) => (this.isAddActive = isAddActive)
    );
  }

  ngOnDestroy(): void {
    this.addActiveSub.unsubscribe();
    this.taskCountSub.unsubscribe();
  }

  showInput() {
    this.popUpService.setPopUp(false);
    this.popUpService.setIsUpdating({ status: false });
  }
}
