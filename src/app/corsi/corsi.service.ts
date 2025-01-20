import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Corso } from './corso/corso.model';

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  private HttpClient = inject(HttpClient);

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
}
