import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { type Prenotazione } from './prenotazione/prenotazione.model';
import type { Corso } from '../../corsi/corso/corso.model';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioniService {
  private HttpClient = inject(HttpClient);
  prenotazioni = signal<Prenotazione[]>([]);

  private fetchPrenotazioni(url: string, errorMessage: string) {
    return this.HttpClient.get<Prenotazione[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => {
          new Error(errorMessage);
        });
      })
    );
  }

  loadPrenotazioni() {
    return this.fetchPrenotazioni(
      'http://localhost:3000/prenotazioni',
      'Impossibile ottenere le prenotazioni dal DB'
    );
  }

  addPrenotazione(prenotazione: Prenotazione) {
    return this.HttpClient.post<Prenotazione>(
      'http://localhost:3000/prenotazioni',
      prenotazione
    )
      .pipe(
        catchError((error) => {
          console.error("Errore durante l'aggiunta della prenotazione:", error);
          return throwError(
            () => new Error("Errore durante l'aggiunta della prenotazione")
          );
        })
      )
      .subscribe({
        next: () => {
          this.prenotazioni.update((prenotazioni) => [
            ...prenotazioni,
            prenotazione,
          ]);
          alert('Prenotazione avvenuta con successo!');
        },
        error: (err) => console.error('Errore durante la POST:', err),
      });
  }

  creaPrenotazione(corso: Corso, nomePrenotante: string) {
    const prenotazioni = this.prenotazioni();

    const idPrenotazione =
      prenotazioni.length > 0
        ? Math.max(...prenotazioni.map((p) => p.id)) + 1
        : 1;

    const dataPrenotazione = new Date().toISOString();

    const prenotazione: Prenotazione = {
      id: idPrenotazione,
      id_corso_prenotato: corso.id,
      nome_corso_prenotato: corso.nome,
      nome_prenotante: nomePrenotante,
      data_prenotazione: dataPrenotazione,
    };

    this.addPrenotazione(prenotazione);
  }
}
