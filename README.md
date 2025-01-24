# Documentazione AngFitness - Bo Alessandro

In questa documentazione descrivo le scelte implementative che ritengo necessarie di spiegazione che ho adottato nello sviluppo dell'applicazione.

## Gestione dell'autenticazione tramite Signal pubblico

Per gestire il controllo dell'autenticazione, ho deciso di utilizzare un signal pubblico all'interno del service dedicato. In questo modo tutti i componenti possono accedere facilmente allo stato di autenticazione, senza bisogno di sottoscrizioni aggiuntive.

Questa scelta mi permette di modificare dinamicamente la vista dei componenti in base allo stato dell'utente. Ad esempio, nel componente che rappresenta un corso, la vista si adatta: se l'utente è autenticato, mostro il pulsante "Elimina" e nascondo i dettagli non necessari, mentre nella lista corsi mostro tutti i dettagli di ogni corso.

## Generazione degli ID per nuove entità

Per generare un nuovo ID durante la creazione di corsi o prenotazioni, verifico l'ultimo ID presente nell'array corrispondente. Lo converto in numero, lo incremento e poi lo riconverto in stringa, poiché il formato stringa è necessario per altre operazioni, come gli aggiornamenti dei dati. Questo metodo mi assicura che gli ID siano sempre univoci e coerenti con il formato richiesto.

## Mostrare solo 4 corsi nella pagina Home

Nella pagina Home, per visualizzare solo quattro corsi, utilizzo una query che limita i risultati. Questo approccio mi consente di recuperare solo i dati necessari dal backend, migliorando le performance.

## Validazione del form di creazione corsi

Per il form di creazione corsi, utilizzo regex definite in funzioni esterne alla classe principale. Queste funzioni vengono poi impiegate come validator nei FormControl.

## Controllo della capacità massima nel servizio dei corsi

Nel service che gestisce i corsi, ho implementato una logica per controllare la capacità massima dei corsi. Quando il numero di iscritti raggiunge la capacità massima, aggiorno lo stato del corso in modo che il pulsante "Prenota" venga disabilitato e l'input bloccato. Questo aggiornamento avviene in tempo reale poichè controllato ad ogni incremento di iscritti, evitando che l'utente possa effettuare un'iscrizione di troppo prima che il pulsante venga disabilitato.
