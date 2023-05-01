import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

// import { TasksComponent } from './components/tasks/tasks.component';
import { TaskdataService } from './services/taskdata.service';
import { PopupService } from './services/popup.service';
import { TodoComponent } from './todo/todo.component';
import { ActiveModule } from './active/active.module';
import { ComponentModule } from './components/components.module';
import { InactiveModule } from './inactive/inactive.module';
import { TodoModule } from './todo/todo.module';
import { NotificationComponent } from './components/notification/notification.component';
import { PopupComponent } from './components/popup/popup.component';

const appRoutes: Routes = [
  { path: '', component: TodoComponent },
  {
    path: 'active',
    loadChildren: () =>
      import('./active/active.module').then((x) => x.ActiveModule),
  },
  {
    path: 'inactive',
    loadChildren: () =>
      import('./inactive/inactive.module').then((x) => x.InactiveModule),
  },
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, NotificationComponent,PopupComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ActiveModule,
    InactiveModule,
    TodoModule,
    ComponentModule,
  ],
  providers: [TaskdataService, PopupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
