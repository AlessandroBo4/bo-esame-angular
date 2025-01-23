import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-corso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-corso.component.html',
  styleUrl: './new-corso.component.css',
})
export class NewCorsoComponent {
  creaCorsoForm = new FormGroup({
    nome: new FormControl('', {
      validators: [],
      asyncValidators: [],
    }),
  });

  onSubmit() {
    console.log(this.creaCorsoForm);
  }
}
