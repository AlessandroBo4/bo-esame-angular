import { Component, DestroyRef } from '@angular/core';
import { OnInit, signal, inject } from '@angular/core';
import { CorsoComponent } from './corso/corso.component';
import { type Corso } from './corso/corso.model';
import { CorsiService } from './corsi.service';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [CorsoComponent],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css',
})
export class CorsiComponent implements OnInit {
  private corsiService = inject(CorsiService);
  private destroyRef = inject(DestroyRef);

  corsi = this.corsiService.corsi;
  isFetching = signal(true);

  ngOnInit() {
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
}
