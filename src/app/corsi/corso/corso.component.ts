import { Component, input, inject } from '@angular/core';
import { type Corso } from './corso.model';
import { CorsiService } from '../corsi.service';
import { FormsModule } from '@angular/forms';
import { PrenotazioniService } from '../../amministrazione/prenotazioni/prenotazioni.service';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css',
})
export class CorsoComponent {
  corsiService = inject(CorsiService);
  prenotazioniService = inject(PrenotazioniService);
  nomePrenotante: string = '';

  corso = input.required<Corso>();
  isAmministratore = this.corsiService.isAdminPageOpen;
  isDisponibile: boolean = true;

  onDeleteCorso(corso: Corso) {
    this.corsiService.deleteCorso(corso).subscribe({
      next: () => {
        alert('Corso eliminato con successo');
      },
      error: (err) => {
        alert("Errore durante l'eliminazione del corso: " + err);
      },
    });
  }

  onPrenotazione(corso: Corso, nomePrenotante: string) {
    if (nomePrenotante.trim() === '') {
      alert('Devi inserire un nome per effettuare la prenotazione');
    } else {
      this.nomePrenotante = '';
      this.prenotazioniService.creaPrenotazione(corso, nomePrenotante);
    }
  }
}
