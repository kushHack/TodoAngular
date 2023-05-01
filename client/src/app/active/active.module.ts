import { NgModule } from '@angular/core';
import { ActiveComponent } from './active.component';
import { ComponentModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const activeTaskRoutes: Routes = [
  { path: 'active', component: ActiveComponent },
];
@NgModule({
  declarations: [ActiveComponent],
  imports: [
    RouterModule.forChild(activeTaskRoutes),
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class ActiveModule {}
