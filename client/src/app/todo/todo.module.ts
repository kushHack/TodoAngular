import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components/components.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [TodoComponent],
  imports: [
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class TodoModule {}
