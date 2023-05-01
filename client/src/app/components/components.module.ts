import { NgModule } from '@angular/core';
// import { PopupComponent } from './popup/popup.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TasksComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  exports: [TasksComponent],
})
export class ComponentModule {}
