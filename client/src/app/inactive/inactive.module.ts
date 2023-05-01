import { NgModule } from '@angular/core';
import { InactiveComponent } from './inactive.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../components/components.module';

const inactiveTaskRoutes = [{ path: 'inactive', component: InactiveComponent }];
@NgModule({
  declarations: [InactiveComponent],
  imports: [
    RouterModule.forChild(inactiveTaskRoutes),
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
})
export class InactiveModule {}
