import { Component, Input } from '@angular/core';
import { ITasks } from '../../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  date: string = Date();
  @Input() tasksCount: number = -1;
}
