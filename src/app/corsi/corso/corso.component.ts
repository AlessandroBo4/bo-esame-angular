import { Component, input } from '@angular/core';
import { type Corso } from './corso.model';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css',
})
export class CorsoComponent {
  corso = input.required<Corso>();
}
