import { Component, OnInit } from '@angular/core';
import { ITasks } from './interfaces';
import { TaskdataService } from './services/taskdata.service';
import { PopupService } from './services/popup.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'training';
  tasks: ITasks[] = [];
  isAddActive$!: Observable<boolean>;
  taskCount$!: Observable<number>;
  data$!: Observable<{ isAddActive: boolean; taskCount: number }>;

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
    this.taskCount$ = this.taskDataService.taskCount;
    this.isAddActive$ = this.taskDataService.isAddActive;
    this.data$ = combineLatest([this.isAddActive$, this.taskCount$]).pipe(
      map(([isAddActive, taskCount]) => ({
        isAddActive,
        taskCount,
      }))
    );
  }

  showInput() {
    this.popUpService.setPopUp(false);
    this.popUpService.setIsUpdating({ status: false });
  }
}
