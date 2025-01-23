import {
  Component,
  inject,
  DestroyRef,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NewCorsoComponent } from './new-corso/new-corso.component';
import { CorsiService } from '../corsi/corsi.service';
import { type Corso } from '../corsi/corso/corso.model';
import { CorsoComponent } from '../corsi/corso/corso.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';

@Component({
  selector: 'app-amministrazione',
  standalone: true,
  imports: [NewCorsoComponent, CorsoComponent, PrenotazioniComponent],
  templateUrl: './amministrazione.component.html',
  styleUrl: './amministrazione.component.css',
})
export class AmministrazioneComponent implements OnInit, OnDestroy {
  private corsiService = inject(CorsiService);
  private destroyRef = inject(DestroyRef);

  corsi = this.corsiService.corsi;
  isFetching = signal(true);

  ngOnInit() {
    this.corsiService.isAdminPageOpen = true;

    const subscription = this.corsiService.loadCorsi().subscribe({
      next: (data) => {
        this.corsi.set(data);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.corsiService.isAdminPageOpen = false;
  }
}
