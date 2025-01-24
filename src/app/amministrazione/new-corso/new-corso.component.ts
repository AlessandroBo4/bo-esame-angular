import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CorsiService } from '../../corsi/corsi.service';

function soloLettere(control: AbstractControl) {
  const soloLettere = /^(?=.*[a-zA-Z])[a-zA-Z\s]+$/;
  if (soloLettere.test(control.value)) {
    return null;
  } else {
    return { nonSoloLettere: true };
  }
}

function urlValido(control: AbstractControl) {
  const immagineURL = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp))$/i;
  if (immagineURL.test(control.value)) {
    return null;
  } else {
    return { urlNonValido: true };
  }
}

@Component({
  selector: 'app-new-corso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-corso.component.html',
  styleUrl: './new-corso.component.css',
})
export class NewCorsoComponent {
  private corsiService = inject(CorsiService);
  staCreandoCorso: boolean = false;
  isSubmitted!: boolean;
  messaggioErrore: string = '';

  creaCorsoForm = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required, soloLettere],
      asyncValidators: [],
    }),
    descrizione: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ],
      asyncValidators: [],
    }),
    istruttore: new FormControl('', {
      validators: [Validators.required, soloLettere],
      asyncValidators: [],
    }),
    durata: new FormControl('', {
      validators: [Validators.required, Validators.min(10), Validators.max(60)],
      asyncValidators: [],
    }),
    capacitaMax: new FormControl('', {
      validators: [Validators.required, Validators.min(5), Validators.max(10)],
      asyncValidators: [],
    }),
    immagine: new FormControl('', {
      validators: [Validators.required, urlValido],
      asyncValidators: [],
    }),
  });

  onCreaCorso() {
    this.staCreandoCorso = true;
  }

  onClose() {
    this.staCreandoCorso = false;
  }

  get isNomeValid() {
    return (
      this.creaCorsoForm.controls.nome.touched &&
      this.creaCorsoForm.controls.nome.dirty &&
      this.creaCorsoForm.controls.nome.invalid
    );
  }
  get isDescrizioneValid() {
    return (
      this.creaCorsoForm.controls.descrizione.touched &&
      this.creaCorsoForm.controls.descrizione.dirty &&
      this.creaCorsoForm.controls.descrizione.invalid
    );
  }
  get isIstruttoreValid() {
    return (
      this.creaCorsoForm.controls.istruttore.touched &&
      this.creaCorsoForm.controls.istruttore.dirty &&
      this.creaCorsoForm.controls.istruttore.invalid
    );
  }
  get isDurataValid() {
    return (
      this.creaCorsoForm.controls.durata.touched &&
      this.creaCorsoForm.controls.durata.dirty &&
      this.creaCorsoForm.controls.durata.invalid
    );
  }
  get isCapacitaMaxValid() {
    return (
      this.creaCorsoForm.controls.capacitaMax.touched &&
      this.creaCorsoForm.controls.capacitaMax.dirty &&
      this.creaCorsoForm.controls.capacitaMax.invalid
    );
  }
  get isImmagineValid() {
    return (
      this.creaCorsoForm.controls.immagine.touched &&
      this.creaCorsoForm.controls.immagine.dirty &&
      this.creaCorsoForm.controls.immagine.invalid
    );
  }

  onSubmit() {
    if (this.creaCorsoForm.invalid) {
      this.isSubmitted = false;
      return;
    }
    const nome = this.creaCorsoForm.value.nome;
    const descrizione = this.creaCorsoForm.value.descrizione;
    const istruttore = this.creaCorsoForm.value.istruttore;
    const durata = Number(this.creaCorsoForm.value.durata);
    const capacita_massima = Number(this.creaCorsoForm.value.capacitaMax);
    const immagine = this.creaCorsoForm.value.immagine;
    console.log(this.creaCorsoForm.value);
    this.creaCorsoForm.reset();
    this.staCreandoCorso = false;

    const nuovoCorso = this.corsiService.creaCorso(
      nome!,
      descrizione!,
      istruttore!,
      durata!,
      capacita_massima!,
      immagine!
    );

    this.corsiService.addCorso(nuovoCorso);
  }
}
