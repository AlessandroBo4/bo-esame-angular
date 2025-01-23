import { Component, input } from '@angular/core';
import { type Prenotazione } from './prenotazione.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-prenotazione',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './prenotazione.component.html',
  styleUrl: './prenotazione.component.css',
})
export class PrenotazioneComponent {
  prenotazione = input.required<Prenotazione>();
}
