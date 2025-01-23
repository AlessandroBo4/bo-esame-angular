import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Corso } from './corso/corso.model';

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  private HttpClient = inject(HttpClient);
  private isAmministratore = false;
  public corsi = signal<Corso[]>([]);

  get isAdminPageOpen(): boolean {
    return this.isAmministratore;
  }

  set isAdminPageOpen(value: boolean) {
    this.isAmministratore = value;
  }

  private fetchCorsi(url: string, errorMessage: string) {
    return this.HttpClient.get<Corso[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => {
          new Error(errorMessage);
        });
      })
    );
  }

  loadCorsi() {
    return this.fetchCorsi(
      'http://localhost:3000/corsi',
      'Impossibile ottenere i corsi dal DB'
    );
  }

  loadCorsiHome() {
    return this.fetchCorsi(
      'http://localhost:3000/corsi?_limit=4',
      'Impossibile ottenre i corsi dal DB'
    );
  }

  isDisponibile(corso: Corso) {
    if (corso.iscritti === corso.capacita_massima) {
      return false;
    } else {
      return true;
    }
  }

  aumentaIscritti(corso: Corso) {
    this.corsi.update((corsi) =>
      corsi.map((c) =>
        c.id === corso.id ? { ...c, iscritti: c.iscritti + 1 } : c
      )
    );
    return this.HttpClient.patch('http://localhost:3000/corsi/' + corso.id, {
      iscritti: corso.iscritti + 1,
    }).subscribe({
      next: (response) => {
        console.log('Corso aggiornato con successo:', response);
      },
      error: (error) => {
        console.error("Errore durante l'aggiornamento del corso:", error);
      },
    });
  }

  deleteCorso(corso: Corso) {
    this.corsi.update((corsi) => corsi.filter((c) => c.id !== corso.id));
    return this.HttpClient.delete('http://localhost:3000/corsi/' + corso.id);
  }

  addCorso(corso: Corso) {
    return this.HttpClient.post('http://localhost:3000/corsi', corso);
  }

  getCorsoById(id: number) {
    return this.HttpClient.get<Corso>(`http://localhost:3000/corsi/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => {
            new Error(`Impossibile ottenere il corso con ID: ${id}`);
          });
        })
      )
      .subscribe({
        next: (data) => {
          return data;
        },
      });
  }

  getCorsiHome() {
    alert('ciao');
    const corsiHome = [];
    for (let i = 0; i < 4; i++) {
      corsiHome[i] = this.getCorsoById(i);
    }

    return corsiHome;
  }
}
