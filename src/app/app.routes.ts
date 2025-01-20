import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { AmministrazioneComponent } from './amministrazione/amministrazione.component';
import { CorsiComponent } from './corsi/corsi.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'chisiamo', component: ChiSiamoComponent },

  { path: 'corsi', component: CorsiComponent },

  { path: 'amministrazione', component: AmministrazioneComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
