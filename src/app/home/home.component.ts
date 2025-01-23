import { Component, OnInit, inject, DestroyRef, signal } from '@angular/core';
import { CorsiService } from '../corsi/corsi.service';
import { CorsoComponent } from '../corsi/corso/corso.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CorsoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private corsiService = inject(CorsiService);
  private destroyRef = inject(DestroyRef);

  corsi = this.corsiService.corsi;
  isFetching = signal(true);

  ngOnInit() {
    const subscription = this.corsiService.loadCorsiHome().subscribe({
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
