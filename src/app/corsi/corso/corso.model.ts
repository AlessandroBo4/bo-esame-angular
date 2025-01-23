export interface Corso {
  id: number;
  nome: string;
  descrizione: string;
  immagine: string;
  istruttore: string;
  durata: number;
  iscritti: number;
  capacita_massima: number;
  disponibilita: boolean;
}
