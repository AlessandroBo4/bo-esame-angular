import { Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioneComponent } from './prenotazione/prenotazione.component';

@Component({
  selector: 'app-prenotazioni',
  standalone: true,
  imports: [PrenotazioneComponent],
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css',
})
export class PrenotazioniComponent implements OnInit {
  private prenotazioniService = inject(PrenotazioniService);
  private destroyRef = inject(DestroyRef);

  prenotazioni = this.prenotazioniService.prenotazioni;
  isFetching = signal(true);

  ngOnInit() {
    const subscription = this.prenotazioniService.loadPrenotazioni().subscribe({
      next: (data) => {
        this.prenotazioni.set(data);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
