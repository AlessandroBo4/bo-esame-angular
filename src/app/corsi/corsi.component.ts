import { Component, DestroyRef } from '@angular/core';
import { OnInit, signal, inject } from '@angular/core';
import { CorsoComponent } from './corso/corso.component';
import { type Corso } from './corso/corso.model';
import { HttpClient } from '@angular/common/http';
import { CorsiService } from './corsi.service';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [CorsoComponent],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css',
})
export class CorsiComponent implements OnInit {
  private HttpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private corsiService = inject(CorsiService);

  corsi = signal<Corso[] | undefined>(undefined);
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
