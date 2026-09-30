/**
 * LifeSimGrid — Articolo del blog (it): la mappatura tra le 16 personalità di Tomodachi Life e il MBTI
 *
 * Traduzione italiana di posts/tomodachi-life-mbti-mapping-explained.ts,
 * basata sul modello del sito:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Da Tomodachi Life al MBTI: la mappatura dei 16 tipi",
  description:
    "Metodologia completa della mappatura Tomodachi Life MBTI: fasce dei cursori, logica dei gruppi, derivazione lettera per lettera e anomalia INFP.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Personalità", "Guide"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life assegna a ogni Mii una delle 16 personalità e decide quale attraverso quattro cursori nascosti nell'editor dei Mii. La nostra [mappatura MBTI](/it/tomodachi-life-mbti) è un modello di stima della community che converte quei quattro cursori in un codice di quattro lettere in stile Myers-Briggs. Questa guida spiega l'intero pipeline esattamente come viene eseguito su questo sito — le soglie delle fasce, la logica di selezione dei gruppi, la derivazione delle lettere e l'unico caso in cui la mappatura produce una collisione sorprendente. Ogni numero riportato qui sotto proviene dallo stesso modello che alimenta il nostro [calcolatore di personalità](/it/tomodachi-life-personality-calculator) e la [tabella dei 16 tipi](/it/tomodachi-life-personality-chart), quindi puoi riprodurre qualsiasi risultato a mano.",
    },
    { type: "h2", text: "I quattro cursori che decidono tutto" },
    {
      type: "p",
      text: "Quando registri un Mii, il gioco ti permette di regolare finemente quattro assi di personalità. Diverse community di fan danno loro nomi leggermente diversi; su questo sito li chiamiamo **Movimento**, **Parlata**, **Energia** e **Pensiero**, e ciascuno è un valore continuo da `0` a `100`. Nessuna delle 16 personalità è raggiungibile tramite un solo cursore — la personalità è un **pattern** distribuito su tutti e quattro, ed è per questo che due Mii possono sembrare completamente diversi pur condividendo lo stesso valore su un singolo cursore.",
    },
    {
      type: "p",
      text: "Il **Movimento** va da lento a veloce. Un Mii con Movimento alto percorre l'isola con visibilmente meno passi, prende l'iniziativa di bussare alle porte e tende ad apparire per primo nelle scene di gruppo. La **Parlata** va da dolce a diretta. I Mii diretti danno risposte brusche, confessano presto i propri sentimenti e pronunciano le battute più dure durante i litigi. L'**Energia** va da pratico a immaginativo — i Mii pratici si occupano di ciò che hanno davanti, i Mii immaginativi fantasticano, propongono nuove attività e reagiscono con forza alle novità. Il **Pensiero** va da flessibile a strutturato: i Mii strutturati mantengono le routine, ordinano le proprie opinioni e tengono il conto.",
    },
    {
      type: "p",
      text: "I quattro assi non sono stati scelti a caso. Ciascuno corrisponde a esattamente una lettera del codice MBTI, ed è proprio questo che rende possibile una mappatura pulita dei 16 tipi. Prima di arrivarci, però, il modello deve comprimere quattro valori continui in una delle 16 personalità discrete — e lo fa in tre passaggi: fasce, gruppo e poi sottotipo.",
    },
    { type: "h2", text: "Passaggio 1: ogni cursore diventa una di tre fasce" },
    {
      type: "p",
      text: "Il primo passaggio quantizza ogni cursore in una fascia bassa, media o alta. Le soglie sono fisse per tutti e quattro i cursori:",
    },
    {
      type: "table",
      headers: ["Fascia", "Valore del cursore", "Significato"],
      rows: [
        ["Bassa", "`0 – 33`", "L'estremità sinistra dell'asse (lento, dolce, pratico, flessibile)"],
        ["Media", "`34 – 66`", "Nessuna forte inclinazione verso una delle due estremità"],
        ["Alta", "`67 – 100`", "L'estremità destra dell'asse (veloce, diretto, immaginativo, strutturato)"],
      ],
    },
    {
      type: "p",
      text: "Tre fasce per cursore su quattro cursori danno `3 × 3 × 3 × 3 = 81` celle possibili. Sono nettamente più delle 16 personalità che il gioco offre davvero, ed è per questo che serve un secondo passaggio per fondere le celle simili — e perché diverse combinazioni di cursori possono approdare alla stessa personalità. Se ti è mai capitato di giurare che due dei tuoi Mii avessero posizioni dei cursori diverse ma la stessa personalità, ecco il motivo: i 16 esiti del gioco sono più grezzi degli input dei cursori.",
    },
    { type: "h2", text: "Passaggio 2: le fasce scelgono uno dei quattro gruppi" },
    {
      type: "p",
      text: "Le 16 personalità sono organizzate in quattro gruppi da quattro: **Gruppo Estroverso**, **Gruppo Sicuro**, **Gruppo Indipendente** e **Gruppo Affabile**. Il secondo passaggio decide il gruppo leggendo le fasce come segnali. Due valori derivati fanno il lavoro:",
    },
    {
      type: "ul",
      items: [
        "**Segnale attivo** — la somma delle fasce di Movimento, Parlata ed Energia (un numero da `0` a `6`). Valori alti indicano che il Mii tende alla socievolezza e all'energia.",
        "**Segnale di introversione** — la sola fascia del Pensiero, letta con polarità invertita: una fascia di Pensiero **alta** significa che il Mii tende alla riservatezza e all'interiorità.",
      ],
    },
    {
      type: "p",
      text: "Le regole si applicano poi a cascata. Se il segnale di introversione è alto mentre il segnale attivo è basso, il Mii atterra nel gruppo **Indipendente** — la casa dell'Artista, dello Spirito libero, del Pensatore e del Lupo solitario. Se il segnale attivo è molto alto (`4` o più), il Mii è socievole: diventa **Estroverso** quando anche la Parlata è nella fascia alta, e **Sicuro** in caso contrario. Un segnale attivo intermedio si divide in base al Movimento — un Movimento alto mantiene il Mii **Estroverso**, in tutti gli altri casi scivola verso l'**Affabile**. E quando il segnale attivo è basso senza un forte segnale di introversione, il Mii si sistema nell'**Affabile** per impostazione predefinita. L'ordine della cascata conta: un Mii introverso ma energico si risolve con la prima regola che corrisponde, senza fare la media.",
    },
    {
      type: "p",
      text: "I due gruppi sociali e i due gruppi riservati non sono categorie arbitrarie — alimentano direttamente il modello di compatibilità del sito, dove l'Estroverso si abbina naturalmente con l'Indipendente e il Sicuro con l'Affabile. Ne parliamo più avanti.",
    },
    { type: "h2", text: "Passaggio 3: una seconda lettura sceglie il sottotipo" },
    {
      type: "p",
      text: "Una volta fissato il gruppo, un secondo passaggio sulle stesse fasce seleziona uno dei suoi quattro membri. Ogni gruppo ha i propri criteri di spareggio. Nel Gruppo Estroverso, per esempio, Energia alta insieme a Parlata alta produce l'**Intrattenitore**; Movimento alto con almeno Parlata media dà il **Trendsetter**; una fascia di Pensiero media o alta orienta verso il **Capo**; e tutto il resto diventa l'**Ottimista**. Gli altri tre gruppi seguono lo stesso schema con assi di priorità diversi.",
    },
    {
      type: "p",
      text: "La tabella completa qui sotto elenca tutte le 16 personalità con il loro gruppo, il loro codice MBTI e la loro firma dei cursori — la lettura dei quattro assi implicata dal codice:",
    },
    {
      type: "table",
      headers: ["Personalità", "Gruppo", "MBTI", "Firma dei cursori"],
      rows: [
        ["Capo", "Gruppo Estroverso", "ESTJ", "Veloce · Diretto · Pratico · Strutturato"],
        ["Intrattenitore", "Gruppo Estroverso", "ESFP", "Veloce · Dolce · Pratico · Flessibile"],
        ["Trendsetter", "Gruppo Estroverso", "ENFP", "Veloce · Dolce · Immaginativo · Flessibile"],
        ["Ottimista", "Gruppo Estroverso", "ESFJ", "Veloce · Dolce · Pratico · Strutturato"],
        ["Progettista", "Gruppo Sicuro", "INTJ", "Lento · Diretto · Immaginativo · Strutturato"],
        ["Avventuriero", "Gruppo Sicuro", "ESTP", "Veloce · Diretto · Pratico · Flessibile"],
        ["Realizzatore", "Gruppo Sicuro", "ENTJ", "Veloce · Diretto · Immaginativo · Strutturato"],
        ["Affascinante", "Gruppo Sicuro", "ENTP", "Veloce · Diretto · Immaginativo · Flessibile"],
        ["Artista", "Gruppo Indipendente", "INFP", "Lento · Dolce · Immaginativo · Flessibile"],
        ["Spirito libero", "Gruppo Indipendente", "INTP", "Lento · Diretto · Immaginativo · Flessibile"],
        ["Pensatore", "Gruppo Indipendente", "ISTP", "Lento · Diretto · Pratico · Flessibile"],
        ["Lupo solitario", "Gruppo Indipendente", "ISTJ", "Lento · Diretto · Pratico · Strutturato"],
        ["Sognatore", "Gruppo Affabile", "INFJ", "Lento · Dolce · Immaginativo · Strutturato"],
        ["Dolcezza", "Gruppo Affabile", "ISFJ", "Lento · Dolce · Pratico · Strutturato"],
        ["Dolce", "Gruppo Affabile", "INFP", "Lento · Dolce · Immaginativo · Flessibile"],
        ["Compagno", "Gruppo Affabile", "ISFP", "Lento · Dolce · Pratico · Flessibile"],
      ],
    },
    { type: "h2", text: "Come si deriva ogni lettera MBTI" },
    {
      type: "p",
      text: "Poiché a ogni asse dei cursori è stata assegnata una dimensione MBTI, derivare il codice di quattro lettere è una lettura diretta della firma dei cursori. Lettera per lettera:",
    },
    {
      type: "ol",
      items: [
        "**E o I ← Movimento.** Un Mii veloce è estroverso (E); un Mii lento è introverso (I). Il Movimento è l'unico asse che decide la prima lettera, e questo corrisponde a ciò che osservano i giocatori: la velocità di camminata è l'indizio di personalità più visibile del gioco.",
        "**S o N ← Energia.** Un Mii pratico è sensoriale (S); un Mii immaginativo è intuitivo (N). Questo asse governa come il Mii reagisce a nuovi oggetti, eventi e residenti.",
        "**T o F ← Parlata.** Un Mii diretto è di tipo pensiero (T); un Mii dolce è di tipo sentimento (F). Lo stesso cursore che rende aspri o morbidi i litigi è quello che decide la terza lettera.",
        "**J o P ← Pensiero.** Un Mii strutturato è giudicante (J); un Mii flessibile è percettivo (P). I Mii amanti della routine portano con sé la J, gli improvvisatori la P.",
      ],
    },
    {
      type: "p",
      text: "Osserva che il codice è determinato per intero dalla firma sui quattro assi — velocità del Movimento, stile dell'Energia, stile della Parlata e struttura del Pensiero — e **non** dal gruppo. Il gruppo è una quinta informazione, e la mappatura ne ha bisogno, come mostra la sezione successiva.",
    },

    { type: "h2", text: "Le domande che si fanno i giocatori" },
    { type: "h3", text: "Cursori identici danno sempre la stessa personalità?" },
    { type: "p", text: "Sì: la pipeline è completamente deterministica. Gli stessi quattro valori cadono sempre nelle stesse fasce, nella stessa delle `81` celle, risolvono nello stesso gruppo nella cascata e scelgono lo stesso sottotipo. Due Mii registrati con impostazioni identiche usciranno sempre identici, su questo sito e, per tutta l'osservazione accumulata dei giocatori, anche in gioco. L'unica cosa che può ribaltare la personalità di un Mii apparentemente invariato è uno scatto di un punto oltre il bordo di una fascia — da `33` a `34`, o da `66` a `67` — ed è per questo che i valori al limite meritano un secondo sguardo prima di chiudere il piano dell'isola." },
    { type: "h3", text: "Quale dei quattro cursori pesa di più?" },
    { type: "p", text: "**Movimento** porta il peso maggiore. È l'unico asse che decide da solo la prima lettera (veloce è E, lento è I), alimenta il segnale attivo e decide lo spareggio tra **Estroverso** e **Affabile** quando il segnale attivo è tiepido. **Pensiero** arriva subito dopo: da solo muove il segnale di introversione che porta i Mii riservati nel Gruppo Indipendente, e orienta diversi spareggi di sottotipo. Parlata ed Energia contano, ma soprattutto come moltiplicatori degli altri due." },
    { type: "h3", text: "Perché a volte il risultato sembra sbagliato anche con cursori sensati?" },
    { type: "p", text: "Quasi sempre per le fasce mediane. Un cursore parcheggiato tra `34` e `66` non porta quasi nessuna informazione (il modello lo legge come neutro), così due Mii che in gioco sembrano diversi possono essere quantizzati allo stesso modo e uscire uguali. L'ordine della cascata peggiora le cose: vince la prima regola che scatta, e una sola fascia può separare un Mii energico e dolce da uno energico e diretto. Se una previsione contrasta con come il tuo Mii si comporta davvero, fidati del comportamento e tratta il codice per quello che è: un'approssimazione." },
    { type: "h3", text: "La personalità cambia il comportamento del Mii in gioco?" },
    { type: "p", text: "L'osservazione dei giocatori dice di sì, a grandi linee: i Mii a parlata diretta sganciano le frasi durante i litigi e si dichiarano presto, gli immaginativi propongono attività strane, i disciplinati tengono le routine che il gioco consente di fissare. Quello che la personalità non fa, dimostrabilmente, è fissare il destino — livelli di amicizia, storia dei regali ed eventi casuali stanno fuori da questo sistema. Ecco perché i nostri punteggi di compatibilità arrivano con il dettaglio, non con promesse." },
    { type: "h3", text: "È lo stesso test MBTI che si fa online?" },
    { type: "p", text: "No, e non vanno confusi. Il Myers-Briggs Type Indicator è un questionario per persone vere; questa mappatura è uno strato di traduzione tra il sistema di cursori di un videogioco e il vocabolario a quattro lettere di quel questionario. Le lettere hanno lo stesso significato a livello di assi, ma un Mii non può essere introverso come una persona: può solo avere un valore di cursore. Prendi il codice di un Mii come una stenografia condivisa del suo profilo di cursori, non come una valutazione psicologica del personaggio e tantomeno del proprietario." },
    { type: "h2", text: "Al contrario: dal codice MBTI ai cursori" },
    { type: "p", text: "La tabella funziona anche al contrario — ed è la direzione di cui hanno bisogno la maggior parte dei visitatori: conosci il tuo codice MBTI e vuoi un Mii che ci stia. Leggi il codice come quattro posizioni di cursore e impostale così:" },
    { type: "ol", items: [
      "**Prima lettera → Movimento.** E vuole Movimento verso veloce (`67` o più); I verso lento (`33` o meno).",
      "**Seconda lettera → Energia.** S al polo pratico (`33` o meno); N al polo immaginativo (`67` o più).",
      "**Terza lettera → Parlata.** T vuole diretto (`67` o più); F vuole dolce (`33` o meno).",
      "**Quarta lettera → Pensiero.** J vuole strutturato (`67` o più); P vuole flessibile (`33` o meno).",
    ] },
    { type: "p", text: "Punta alle estremità di ogni asse, non al centro — le fasce mediane sono il punto debole del modello, come spiega la sezione sui limiti. Un solo codice richiede una scelta invece di una regolazione: [INFP](/it/tomodachi-life-mbti/infp) corrisponde sia all'[Artista](/it/tomodachi-life-personality/artist) sia al [Dolce](/it/tomodachi-life-personality/softie); scegli la riga il cui gruppo corrisponde al temperamento che cerchi — l'**Indipendente**, più riservato, per l'Artista; l'**Affabile**, più caloroso, per il Dolce — e imposta i cursori sulla firma di quella riga." },
    { type: "h2", text: "L'anomalia INFP: 16 personalità, 15 codici" },
    {
      type: "p",
      text: "Conta la colonna MBTI nella tabella sopra e troverai solo 15 codici unici. Due personalità — l'**Artista** e il **Dolce** — sono entrambe mappate su [INFP](/it/tomodachi-life-mbti/infp). Non è un errore di battitura; è una proprietà strutturale di qualsiasi mappatura da 16 a 16 che passi attraverso quattro assi.",
    },
    {
      type: "p",
      text: "L'Artista e il Dolce condividono esattamente la stessa firma dei cursori: lento, dolce, immaginativo e flessibile. Ciò che li separa è il gruppo. L'Artista vive nel Gruppo Indipendente, dove il modello legge quella firma come quella di un sognatore riservato, ripiegato sul proprio mondo interiore. Il Dolce vive nel Gruppo Affabile, dove la firma identica diventa un residente mite e apertamente affettuoso. Nei termini del gioco puoi pensarli come le stesse quattro letture degli assi con due costumi sociali diversi — uno mantiene le distanze, l'altro si avvicina.",
    },
    {
      type: "p",
      text: "La conseguenza pratica: il MBTI da solo non può distinguere un [Artista](/it/tomodachi-life-personality/artist) da un [Dolce](/it/tomodachi-life-personality/softie). Se stai pianificando la rosa dell'isola in base ai codici MBTI, ricorda che INFP è ambiguo, e controlla il gruppo (o la pagina della personalità) per vedere quale dei due è davvero quel Mii. Tutti gli altri codici della tabella corrispondono a esattamente una personalità.",
    },
    { type: "h2", text: "Come il modello di compatibilità usa gli stessi gruppi" },
    {
      type: "p",
      text: "La mappatura non si ferma alle etichette — la stessa struttura dei gruppi alimenta il nostro [calcolatore di compatibilità](/it/tomodachi-life-compatibility). Il modello valuta una coppia su due scale, romanticismo e amicizia, ed entrambe le scale sono costruite con gli stessi ingredienti, così che l'aritmetica resti controllabile:",
    },
    {
      type: "ul",
      items: [
        "**Termine zodiacale (50%).** Una matrice zodiacale simmetrica di 12 × 12 fornisce un punteggio base di chimica tra `40` e `90` per qualsiasi coppia di segni. Le coppie dello stesso segno e quelle classiche dello stesso elemento si collocano in cima a quell'intervallo.",
        "**Termine base (50%).** Un `50` piatto che rappresenta il punto di partenza neutro del modello, prima che entrino in gioco le personalità.",
        "**Modificatori di personalità.** I gruppi complementari (Estroverso con Indipendente, o Sicuro con Affabile) aggiungono `+20` al romanticismo. Due Mii dello stesso gruppo perdono `10` di romanticismo ma guadagnano `+20` di amicizia. Due Mii con la personalità **esattamente uguale** perdono altri `5` di romanticismo e guadagnano altri `+10` di amicizia.",
      ],
    },
    {
      type: "p",
      text: "Il punteggio finale è la somma dei due termini più il modificatore, arrotondato e limitato a `0 – 100`. La formula è volutamente semplice, ed è la stessa che usa il nostro [Matchmaker di romance](/it/tomodachi-life-romance-matcher): `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. La trasparenza è il punto — un numero che non puoi decomporre è un numero di cui non ti puoi fidare, e ogni punteggio mostrato dal sito è accompagnato dalla sua scomposizione.",
    },
    {
      type: "callout",
      text: "Il bonus di complementarità dei gruppi codifica l'osservazione più coerente della community sulle relazioni di Tomodachi Life: le coppie dai temperamenti opposti (veloce con lento, diretto con dolce) generano il maggior numero di eventi romantici, mentre le coppie dello stesso gruppo generano le amicizie più stabili. È una scelta di modellazione, non una costante del gioco.",
    },
    { type: "h2", text: "Prova il modello tu stesso" },
    {
      type: "p",
      text: "Il modo più rapido per interiorizzare il pipeline è muovere i cursori e guardare come cambiano i risultati:",
    },
    {
      type: "ul",
      items: [
        "[Calcolatore di Personalità](/it/tomodachi-life-personality-calculator) — imposta direttamente i quattro cursori e vedi la personalità, il gruppo e il codice MBTI previsti.",
        "[Tabella delle Personalità](/it/tomodachi-life-personality-chart) — il riferimento completo dei 16 tipi con gruppi contrassegnati per colore.",
        "[Mappatura MBTI](/it/tomodachi-life-mbti) — naviga dal lato MBTI, una pagina per tipo con tendenze dei cursori e riquadri di compatibilità.",
        "[Calcolatore di Compatibilità](/it/tomodachi-life-compatibility) — abbina due Mii e decomponi i punteggi di romanticismo e amicizia.",
      ],
    },
    { type: "h2", text: "I limiti del modello (leggi questa parte)" },
    {
      type: "p",
      text: "Nintendo non ha mai pubblicato il vero algoritmo di personalità del gioco, quindi ogni affermazione in questa guida — le soglie delle fasce, la cascata dei gruppi, le assegnazioni delle lettere — è una stima della community ricavata per reverse engineering dall'osservazione dei giocatori, non qualcosa di estratto dal codice del gioco. Il modello approssima gli esiti di gioco in modo abbastanza preciso da essere utile per pianificare la rosa dei residenti, ma è un modello, e come tutti i modelli sbaglia qualcosa.",
    },
    {
      type: "p",
      text: "Tre avvertenze da tenere a mente. Primo, i cursori in fascia media (`34 – 66`) sono il punto debole del modello: piccole variazioni vicino alle soglie possono ribaltare una fascia e cambiare la personalità prevista, quindi considera provvisori i risultati al limite. Secondo, la collisione INFP descritta sopra significa che la pianificazione basata sul MBTI perde informazioni che quella basata sulla personalità conserva. Terzo, gli esiti di gioco dipendono anche da fattori che questo modello non tocca — eventi dell'isola, storia dei regali e il seed casuale dietro le reazioni di ogni Mii — quindi i punteggi di compatibilità sono punti di partenza per storie, non garanzie.",
    },
    {
      type: "callout",
      text: "Questa mappatura è un'interpretazione realizzata dai fan a scopo di intrattenimento e pianificazione, non affiliata a Nintendo o alla Myers-Briggs Company e da loro non approvata. MBTI e Nintendo sono marchi registrati dei rispettivi proprietari.",
    },
  ],
};
