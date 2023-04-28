import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskdataService } from './services/taskdata.service';
import { PopupService } from './services/popup.service';
import { TodoComponent } from './todo/todo.component';
import { ActiveComponent } from './active/active.component';
import { InactiveComponent } from './inactive/inactive.component';
import { PopupComponent } from './components/popup/popup.component';

const appRoutes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'active', component: ActiveComponent },
  { path: 'inactive', component: InactiveComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    TaskListComponent,
    TodoComponent,
    ActiveComponent,
    InactiveComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [TaskdataService, PopupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
