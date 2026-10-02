import { LevelData } from '../types';

export const LEVELS: LevelData[] = [
  {
    id: 0,
    title: "Livello 0",
    topic: "COS'È UN PROGRAMMA?",
    subtitle: "La Ricetta e le Istruzioni Quotidiane",
    description: "Impara cosa significa programmare un computer usando la metafora delle istruzioni di tutti i giorni.",
    iconName: "Puzzle",
    badgeName: "Sarto degli Algoritmi",
    badgeIcon: "Sparkles",
    badgeDescription: "Hai compreso che un programma è semplicemente una sequenza di istruzioni ordinate!",
    steps: [
      {
        id: "L0_S1",
        type: "theory",
        title: "Cos'è un Programma e cos'è un'Istruzione?",
        theoryText: "Benvenuto nel mondo del coding! Un **programma computerizzato** non è altro che una lista ordinata di **istruzioni** che dicono al computer cosa fare passo dopo passo.",
        analogyText: "Pensa a una **ricetta di cucina**: per preparare il tè devi seguire i passi nell'ordine giusto. Se metti la bustina nell'acqua prima di scaldarla, il risultato cambia! Il computer esegue le istruzioni esattamente nell'ordine in cui le scrivi.",
        codeExample: "// Esempio di programma quotidiano:\n1. Prendi la tazza\n2. Versa l'acqua calda\n3. Immergi la bustina di tè"
      },
      {
        id: "L0_S2",
        type: "example",
        title: "Input, Elaborazione e Output",
        theoryText: "Ogni programma riceve degli **Input** (dati in ingresso), li elabora tramite le istruzioni e produce un **Output** (risultato finale).",
        analogyText: "Nella preparazione del tè:\n- INPUT: Acqua fredda + Bustina di tè + Tazza\n- ISTRUZIONE: Scalda l'acqua e lascia in infusione per 3 minuti\n- OUTPUT: Una deliziosa tazza di tè caldo!",
        codeExample: "Input (Dati) -> Istruzioni (Elaborazione) -> Output (Risultato)"
      },
      {
        id: "L0_S3",
        type: "simple_exercise",
        title: "Esercizio Semplice: Riconosci la Sequenza",
        question: "Quale tra le seguenti è una sequenza CORRETTA di istruzioni per preparare un panino?",
        choices: [
          {
            id: "opt_1",
            label: "1. Prendi il pane -> 2. Tostalo nella griglia -> 3. Spalma la marmellata",
            isCorrect: true,
            explanation: "Esatto! Devi prima tostare il pane prima di spalmare la marmellata."
          },
          {
            id: "opt_2",
            label: "1. Spalma la marmellata -> 2. Tostalo nella griglia -> 3. Prendi il pane",
            isCorrect: false,
            explanation: "Sbagliato! Non puoi spalmare la marmellata prima di avere il pane o tostarlo col condimento sopra!"
          },
          {
            id: "opt_3",
            label: "1. Tostalo nella griglia -> 2. Spalma la marmellata -> 3. Metti via il pane",
            isCorrect: false,
            explanation: "L'ordine non ha senso logico!"
          }
        ],
        hint: "Pensa alle azioni nel mondo reale: devi avere il pane pronto prima di poterlo condire."
      },
      {
        id: "L0_S4",
        type: "autonomous_exercise",
        title: "Esercizio Autonomo: Riordina la Sequenza",
        question: "Trascina o ordina i seguenti passaggi nella sequenza corretta per inviare un messaggio con uno smartphone:",
        orderingItems: [
          { id: "item_1", text: "Accendi lo schermo dello smartphone", correctIndex: 0 },
          { id: "item_2", text: "Apri l'applicazione dei messaggi", correctIndex: 1 },
          { id: "item_3", text: "Scrivi il testo del messaggio", correctIndex: 2 },
          { id: "item_4", text: "Premi il pulsante Invia", correctIndex: 3 }
        ],
        hint: "Immagina di avere il telefono in tasca: qual è la primissima cosa che fai?"
      }
    ]
  },
  {
    id: 1,
    title: "Livello 1",
    topic: "ISTRUZIONI E SEQUENZA",
    subtitle: "Guida il Bot Ferris verso la Gemma",
    description: "Introduciamo il concetto di comando di programmazione. Componi una sequenza di istruzioni per guidare il robot.",
    iconName: "Compass",
    badgeName: "Pilota di Sequenze",
    badgeIcon: "Zap",
    badgeDescription: "Hai dimostrato di saper comporre ed eseguire istruzioni sequenziali senza commettere errori di rotta!",
    steps: [
      {
        id: "L1_S1",
        type: "theory",
        title: "Istruzioni Sequenziali nel Codice",
        theoryText: "In programmazione, ogni riga di codice contiene una singola **istruzione**. Il computer legge ed esegue il codice dall'alto verso il basso, una riga alla volta.",
        analogyText: "Immagina di dare comandi vocali a un robot telecomandato: `avanza()`, `girati_a_destra()`, `raccogli()`. Il robot non inventa nulla: esegue solo ciò che hai ordinato.",
        codeExample: "// Programma di movimento per il Robot Ferris:\nferris.avanza();\nferris.girati_a_destra();\nferris.avanza();\nferris.raccogli_gemma();"
      },
      {
        id: "L1_S2",
        type: "simple_exercise",
        title: "Esercizio Semplice: Scegli la Rotta Giusta",
        question: "Ferris si trova a 2 passi dalla gemma ed è rivolto verso di essa. Qual è la sequenza minima per raccoglierla?",
        choices: [
          {
            id: "opt_1",
            label: "avanza(); avanza(); raccogli();",
            isCorrect: true,
            explanation: "Perfetto! Due passi in avanti e poi il comando raccogli()."
          },
          {
            id: "opt_2",
            label: "girati(); avanza(); raccogli();",
            isCorrect: false,
            explanation: "Girandoti cambi direzione e ti allontani dalla gemma!"
          },
          {
            id: "opt_3",
            label: "raccogli(); avanza(); avanza();",
            isCorrect: false,
            explanation: "Non puoi raccogliere la gemma prima di esserti avvicinato!"
          }
        ],
        hint: "Conta quante caselle separano Ferris dalla gemma."
      },
      {
        id: "L1_S3",
        type: "autonomous_exercise",
        title: "Esercizio Autonomo: Evita l'Ostacolo",
        question: "C'è un muro d'energia sulla strada diretta. Qual è la sequenza di comandi per aggirare l'ostacolo?",
        orderingItems: [
          { id: "cmd_1", text: "girati_a_sinistra();", correctIndex: 0 },
          { id: "cmd_2", text: "avanza();", correctIndex: 1 },
          { id: "cmd_3", text: "girati_a_destra();", correctIndex: 2 },
          { id: "cmd_4", text: "avanza();", correctIndex: 3 }
        ],
        hint: "Prima svolta a sinistra per uscire dalla corsia bloccata, poi avanza e riallineati."
      }
    ]
  },
  {
    id: 2,
    title: "Livello 2",
    topic: "VALORI E VARIABILI",
    subtitle: "Le Scatole con Etichetta in Rust",
    description: "Impara a memorizzare i dati con le variabili. Scopri la differenza tra variabili immutabili e mutabili.",
    iconName: "Box",
    badgeName: "Mago delle Scatole",
    badgeIcon: "PackageCheck",
    badgeDescription: "Ora sai creare variabili, assegnare valori e modificarli con la sintassi let e let mut in Rust!",
    steps: [
      {
        id: "L2_S1",
        type: "theory",
        title: "Cos'è una Variabile?",
        theoryText: "In programmazione, una **variabile** è una **scatola con un'etichetta (nome)** utilizzata per memorizzare un dato nella memoria del computer.",
        analogyText: "Immagina di avere una scatola di cartone su cui scrivi a pennarello l'etichetta `punti`. Dentro la scatola metti un foglio col numero `100`. Ogni volta che il programma legge la scatola `punti`, scopre che contiene `100`!",
        codeExample: "// In Rust si dichiara una variabile con la parola chiave 'let':\nlet punti = 100;\n\n// Ora la scatola 'punti' contiene 100!"
      },
      {
        id: "L2_S2",
        type: "example",
        title: "Mutabilità: `let` vs `let mut`",
        theoryText: "Nel linguaggio **Rust**, per sicurezza, le scatole sono **sigillate (immutabili)** di default con `let`. Se vuoi poter cambiare il contenuto della scatola in seguito, devi aggiungere la parola `mut` (mutabile)!",
        analogyText: "- `let nome = \"Ferris\";` -> Scatola sigillata col lucchetto. Non si può cambiare!\n- `let mut monete = 5;` -> Scatola apribile! Puoi aggiungere monete dopo.",
        codeExample: "let mut monete = 5;\nmonete = monete + 10; // Ora le monete diventano 15!"
      },
      {
        id: "L2_S3",
        type: "simple_exercise",
        title: "Esercizio Semplice: Crea la tua Variabile",
        question: "Come si dichiara in Rust una variabile immutabile chiamata `livello` con valore `1`?",
        choices: [
          {
            id: "v_1",
            label: "let livello = 1;",
            isCorrect: true,
            explanation: "Esatto! Usa 'let', il nome della variabile, '=' e il valore finale segnato da punto e virgola ';'."
          },
          {
            id: "v_2",
            label: "scatola livello = 1;",
            isCorrect: false,
            explanation: "'scatola' è la nostra metafora, in codice Rust si usa la parola chiave 'let'!"
          },
          {
            id: "v_3",
            label: "1 = let livello;",
            isCorrect: false,
            explanation: "La sintassi è al contrario! Il nome va a sinistra dell'uguale e il valore a destra."
          }
        ],
        hint: "Ricorda la regola: let nome = valore;"
      },
      {
        id: "L2_S4",
        type: "autonomous_exercise",
        title: "Esercizio Autonomo: Modifica il Valore",
        question: "Quale codice Rust permette di creare una variabile `xp` iniziale a 50 e poi aumentarla a 80?",
        choices: [
          {
            id: "m_1",
            label: "let mut xp = 50;\nxp = 80;",
            isCorrect: true,
            explanation: "Bravissimo! Serve 'let mut' per permettere la successiva modifica 'xp = 80;'."
          },
          {
            id: "m_2",
            label: "let xp = 50;\nxp = 80;",
            isCorrect: false,
            explanation: "Errore! Senza 'mut', Rust vieta di modificare il valore di una variabile immutabile!"
          },
          {
            id: "m_3",
            label: "let xp = 50;\nlet xp = mut 80;",
            isCorrect: false,
            explanation: "Sintassi errata. 'mut' si scrive durante la prima dichiarazione."
          }
        ],
        hint: "Ricorda che per poter cambiare il valore di una variabile in un secondo momento occorre la parola chiave 'mut'."
      }
    ]
  },
  {
    id: 3,
    title: "Livello 3",
    topic: "TIPI DI DATI FONDAMENTALI",
    subtitle: "Numeri, Testo e Booleani",
    description: "Ogni dato ha una forma specifica. Impara a distinguere tra numeri interi, stringhe di testo e valori di verità (vero/falso).",
    iconName: "Binary",
    badgeName: "Maestro dei Tipi",
    badgeIcon: "Tags",
    badgeDescription: "Ora sai classificare ed utilizzare correttamente i 3 tipi di dati fondamentali: i32, String e bool!",
    steps: [
      {
        id: "L3_S1",
        type: "theory",
        title: "I 3 Tipi di Dati Principali",
        theoryText: "Le variabili non contengono dati tutti uguali. Nel computer esistono diverse **tipologie di dati** per scopi diversi:",
        analogyText: "1. **Numeri (`i32`)**: Servono per contare e calcolare (es. `42`, `100`, `-5`).\n2. **Testo (`String` o `&str`)**: Servono per le parole e frasi, sempre racchiusi tra virgolette `\"Ciao!\"`.\n3. **Booleani (`bool`)**: Servono per rappresentare la verità: solo due valori possibili: `true` (vero) o `false` (falso).",
        codeExample: "let eta: i32 = 25;\nlet nome: &str = \"Ferris\";\nlet attivo: bool = true;"
      },
      {
        id: "L3_S2",
        type: "simple_exercise",
        title: "Esercizio Semplice: Riconosci il Tipo",
        question: "Di che tipo di dato si tratta il valore `\"Benvenuto nel gioco!\"` (notare le virgolette)?",
        choices: [
          {
            id: "t_1",
            label: "Testo / Stringa (&str)",
            isCorrect: true,
            explanation: "Corretto! Tutto ciò che è racchiuso tra virgolette doppi \"...\" è un testo (Stringa)."
          },
          {
            id: "t_2",
            label: "Numero (i32)",
            isCorrect: false,
            explanation: "I numeri non hanno le virgolette!"
          },
          {
            id: "t_3",
            label: "Booleano (bool)",
            isCorrect: false,
            explanation: "I booleani possono essere solo true o false."
          }
        ],
        hint: "Fai attenzione alle virgolette doppi intorno alla frase."
      },
      {
        id: "L3_S3",
        type: "autonomous_exercise",
        title: "Esercizio Autonomo: Trova l'Errore di Tipo",
        question: "Quale delle seguenti dichiarazioni in Rust contiene un ERRORE di tipo?",
        choices: [
          {
            id: "e_1",
            label: "let vivo: bool = 100;",
            isCorrect: true,
            explanation: "Esatto! Un booleano ('bool') accetta solo 'true' o 'false', non il numero 100!"
          },
          {
            id: "e_2",
            label: "let punti: i32 = 100;",
            isCorrect: false,
            explanation: "Questa dichiarazione è perfettamente corretta: 100 è un numero intero (i32)."
          },
          {
            id: "e_3",
            label: "let messaggio: &str = \"Ciao\";",
            isCorrect: false,
            explanation: "Questa dichiarazione è corretta: \"Ciao\" è una stringa di testo."
          }
        ],
        hint: "I booleani ammettono unicamente due valori: vero (true) o falso (false)."
      }
    ]
  },
  {
    id: 4,
    title: "Livello 4",
    topic: "CONDIZIONI E DECISIONI",
    subtitle: "Il Controllo di Flusso (if / else)",
    description: "Insegna al computer a prendere decisioni intelligenti in base ai dati. Se la condizione è vera fai A, altrimenti fai B.",
    iconName: "GitFork",
    badgeName: "Master del Flusso",
    badgeIcon: "ShieldCheck",
    badgeDescription: "Complimenti! Ora sai far prendere decisioni al codice usando i blocchi logici if ed else in Rust!",
    steps: [
      {
        id: "L4_S1",
        type: "theory",
        title: "Prendere Decisioni con `if` ed `else`",
        theoryText: "I programmi non seguono sempre una sola strada fissa. Con la struttura **`if` (se)** ed **`else` (altrimenti)**, il codice può prendere strade diverse a seconda delle situazioni!",
        analogyText: "Pensa alle decisioni di ogni giorno:\n- **SE (`if`)** piove == true -> prendi l'ombrello!\n- **ALTRIMENTI (`else`)** -> indossa gli occhiali da sole!",
        codeExample: "let energia = 80;\n\nif energia > 50 {\n    print!(\"Porta d'energia aperta!\");\n} else {\n    print!(\"Ricarica necessaria!\");\n}"
      },
      {
        id: "L4_S2",
        type: "example",
        title: "Gli Operatori di Confronto",
        theoryText: "Per creare una condizione usiamo i simboli di confronto:\n- `>` Maggiore di\n- `<` Minore di\n- `==` Uguale a (attenzione: si usano due simboli di uguale!)\n- `>=` Maggiore o uguale",
        codeExample: "if punteggio == 100 {\n    print!(\"Hai vinto la medaglia d'oro!\");\n}"
      },
      {
        id: "L4_S3",
        type: "simple_exercise",
        title: "Esercizio Semplice: Completa la Condizione",
        question: "Ferris deve entrare in un'area riservata solo se ha un livello di energia maggiore di 20. Qual è il blocco `if` corretto?",
        choices: [
          {
            id: "c_1",
            label: "if energia > 20 { entra(); }",
            isCorrect: true,
            explanation: "Bravissimo! Il simbolo '>' significa 'maggiore di'."
          },
          {
            id: "c_2",
            label: "if energia < 20 { entra(); }",
            isCorrect: false,
            explanation: "'<' significa minore di: così il bot entrerebbe solo con energia bassa!"
          },
          {
            id: "c_3",
            label: "se energia = 20 { entra(); }",
            isCorrect: false,
            explanation: "In codice Rust si usa 'if' e per confrontare l'uguaglianza si usa '==' non '='."
          }
        ],
        hint: "Ricorda che 'maggiore di' si indica col simbolo >."
      },
      {
        id: "L4_S4",
        type: "autonomous_exercise",
        title: "Esercizio Autonomo: Gestisci l'Else",
        question: "Cosa stamperà a schermo il seguente codice dato `let monete = 3;`?\n\n```rust\nif monete >= 5 {\n    print!(\"Puoi comprare lo scudo!\");\n} else {\n    print!(\"Monete insufficienti!\");\n}\n```",
        choices: [
          {
            id: "a_1",
            label: "\"Monete insufficienti!\"",
            isCorrect: true,
            explanation: "Esatto! Essendo 3 minore di 5, la condizione è FALSA e viene eseguito il blocco else!"
          },
          {
            id: "a_2",
            label: "\"Puoi comprare lo scudo!\"",
            isCorrect: false,
            explanation: "3 non è maggiore o uguale a 5, quindi il blocco if viene saltato."
          },
          {
            id: "a_3",
            label: "Entrambi i messaggi",
            isCorrect: false,
            explanation: "Il programma esegue SOLO uno dei due rami, mai entrambi!"
          }
        ],
        hint: "Confronta 3 con 5: 3 è maggiore o uguale a 5?"
      }
    ]
  }
];
