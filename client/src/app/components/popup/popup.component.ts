import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';
import { TaskdataService } from 'src/app/services/taskdata.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  constructor(
    private taskDataService: TaskdataService,
    private popUpService: PopupService,
    private formBuilder: FormBuilder
  ) {
    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required],
    });
  }

  private popupSub: Subscription = new Subscription();
  private updatingSub: Subscription = new Subscription();
  task: string = '';
  taskForm: FormGroup;
  isHidden: boolean = true;
  isUpdating: { status: boolean; id?: string } = { status: false };

  ngOnInit() {
    this.popupSub = this.popUpService.inputPopUp.subscribe(
      (isHidden) => (this.isHidden = isHidden)
    );
    this.updatingSub = this.popUpService.isUpdating.subscribe(
      (isUpdating) => (this.isUpdating = isUpdating)
    );
  }

  addTasks(event: Event) {
    event.preventDefault();
    if (this.isUpdating.status) {
      this.taskDataService.updateTask({
        task: this.task,
        id: this.isUpdating.id!,
      });
    } else {
      this.taskDataService.addTask({ task: this.task, status: false });
    }

    this.taskForm.get('task')?.reset();
    this.task = '';
    this.popUpService.setPopUp(true);
  }

  onInputChange(event: Event) {
    this.task = (<HTMLInputElement>event.target).value;
  }

  closePopUp() {
    this.popUpService.setPopUp(false);
    this.isHidden = true;
  }

  ngOnDestroy() {
    this.popupSub.unsubscribe();
    this.updatingSub.unsubscribe();
  }
}
