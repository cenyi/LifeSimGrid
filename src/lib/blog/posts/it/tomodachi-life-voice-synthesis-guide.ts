/**
 * LifeSimGrid — Articolo del blog (it): come il Voice Lab Tomodachi sintetizza le voci 8-bit
 *
 * Traduzione italiana di posts/tomodachi-life-voice-synthesis-guide.ts,
 * basata sull'implementazione propria del sito:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Come il Voice Lab Tomodachi sintetizza le voci 8-bit",
  description:
    "L'intera pipeline Web Audio API del Voice Lab Tomodachi: nodi oscillatore, forme d'onda, i 5 preset vocali e come ogni parametro modella il suono.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Sintesi Vocale", "Guide"],
  blocks: [
    {
      type: "p",
      text: "Il Voice Lab Tomodachi costruisce le proprie voci Mii 8-bit a partire da un grafo Web Audio API a tre nodi: un `OscillatorNode` genera il tono, un `BiquadFilterNode` lo ammorbidisce e un `GainNode` ne modella l'inviluppo del volume. Questa guida disseziona quel pipeline esattamente come viene eseguito nel [Voice Lab Tomodachi](/it/tomodachi-voice-lab) — ogni costante, ogni preset e ogni decisione di scheduling — così che tu possa capire, riprodurre o estendere l'estetica del parlato a beep che evoca Tomodachi Life: Living the Dream. Ogni numero riportato qui sotto è citato dal codice sorgente del sito e, quando un valore è una stima della community anziché qualcosa che Nintendo ha documentato, il testo lo dichiara esplicitamente.",
    },
    { type: "h2", text: "Perché le voci di Tomodachi parlano a beep" },
    {
      type: "p",
      text: "Il tratto distintivo dell'audio di Tomodachi Life è il parlato a beep: invece di dialoghi registrati, ogni Mii si esprime in brevi toni sintetizzati che seguono il ritmo di una frase senza mai formare parole reali. L'approccio risale alle origini della serie su console portatili, dove la dimensione delle cartucce e l'hardware audio rendevano impraticabile il doppiaggio completo, ed è sopravvissuto in Tomodachi Life: Living the Dream su Switch perché i beep sono diventati parte dell'identità della serie. Il risultato viene percepito come parlato perché ne copia la prosodia — movimento dell'intonazione, tempistica delle sillabe, pause — pur rimanendo volutamente non lessicale.",
    },
    {
      type: "p",
      text: "Nintendo non ha mai pubblicato il metodo di sintesi effettivo del gioco, quindi qualsiasi ricostruzione nel browser è per definizione una stima della community. Ciò a cui il laboratorio mira è l'estetica, non una riproduzione esatta al bit, e tre proprietà fanno la maggior parte del lavoro. Primo, i toni sono brevi: gli inviluppi si aprono e si chiudono in decine di millisecondi, così ogni sillaba inizia e si ferma in modo netto. Secondo, la forma d'onda è ricca di armoniche: un timbro ronzante viene percepito come «chiptune» molto più facilmente di un tono puro. Terzo, l'intonazione non è mai statica: piccoli scostamenti di frequenza per sillaba imitano il contorno del parlato naturale. Il resto di questa guida mostra come ciascuna di queste proprietà corrisponda a un meccanismo concreto della Web Audio API.",
    },
    { type: "h2", text: "Il pipeline di sintesi, nodo per nodo" },
    {
      type: "p",
      text: "Ogni suono prodotto dal laboratorio esce dallo stesso grafo a tre nodi — oscillatore, filtro e guadagno — e raggiunge i tuoi altoparlanti attraverso gli ultimi due. Un `AudioContext` nuovo viene creato a ogni riproduzione — il laboratorio non mantiene mai in vita un grafo audio globale — e ogni sillaba pianifica il proprio insieme di nodi al suo interno:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        solo preset Anziano:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "L'`OscillatorNode` è la sorgente del suono. Il suo `type` proviene dal preset selezionato (`sawtooth` per quattro dei cinque preset, `square` per il robot), e la sua `frequency` viene impostata dal cursore del tono. Poiché un oscillatore è un semplice generatore di forma d'onda, non ha controlli timbrici propri — tutto ciò che rende il suono di un preset diverso da un altro è lo scheduling dei parametri a valle.",
    },
    {
      type: "p",
      text: "Il `BiquadFilterNode` è sempre configurato come filtro `lowpass`, con il cutoff preso dal valore `filterFreq` del preset (`900 – 2500 Hz` a seconda del preset). Un filtro passa-basso attenua le armoniche sopra il proprio cutoff, ed è questo che trasforma il ronzio pieno di un'onda a dente di sega grezza in qualcosa che assomiglia a una voce: i preset più scuri (Anziano a `900 Hz`) conservano solo le armoniche basse, mentre i preset più brillanti (Bambino a `2500 Hz`) lasciano passare lo scintillio che fa suonare la voce piccola e giovane.",
    },
    {
      type: "p",
      text: "Il `GainNode` è dove vive l'inviluppo, pianificato con quattro punti di automazione. Il gain parte da `0` all'istante di inizio della sillaba, sale linearmente fino al target del preset (`0.2 – 0.3`) durante il tempo di attack, si mantiene a quel valore fino all'inizio del release, poi ridiscende linearmente a `0`. Le chiamate sono `setValueAtTime()` per i punti di ancoraggio e `linearRampToValueAtTime()` per le rampe — un semplice inviluppo attack/hold/release senza curve esponenziali, che conferisce al suono quella bruschezza caratteristica che si addice allo stile 8-bit.",
    },
    {
      type: "p",
      text: "Esiste una quarta coppia di nodi facoltativa: il vibrato. Quando un preset lo attiva, un secondo `OscillatorNode` che agisce da LFO (oscillatore a bassa frequenza) gira al `vibratoRate` del preset e alimenta un `GainNode` impostato al valore `vibratoDepth`, che è collegato al parametro `frequency` dell'oscillatore principale. Si tratta di una classica modulazione di frequenza — nel preset anziano, un LFO a `5 Hz` fa oscillare il tono di `±15 Hz`, producendo quella qualità tremolante associata alle voci anziane. Solo il preset anziano lo attiva; gli altri quattro lasciano il vibrato interamente disattivato.",
    },
    { type: "h2", text: "Come suona ogni forma d'onda (e quando sceglierla)" },
    {
      type: "p",
      text: "La scelta della forma d'onda è la decisione timbrica più importante di tutto il pipeline, perché determina il contenuto armonico che il filtro e l'inviluppo modellano in seguito. L'`OscillatorNode` della Web Audio API offre quattro tipi standard, e ciascuno ha un carattere distinto:",
    },
    {
      type: "table",
      headers: ["Forma d'onda", "Contenuto armonico", "Carattere", "Preset che la usano"],
      rows: [
        ["`sine`", "Solo fondamentale", "Puro, simile a un flauto, zero ronzio", "Nessuno (disponibile via `OscillatorType`)"],
        ["`square`", "Armoniche dispari, intense", "Vuota, canale lead classico della NES", "Robot"],
        ["`sawtooth`", "Tutte le armoniche, decrescenti", "Ronzante, nasale, la più vicina alla ricchezza vocale", "Uomo adulto, Donna adulta, Anziano, Bambino"],
        ["`triangle`", "Poche armoniche dispari, deboli", "Morbida, pastosa, leggermente smorzata", "Nessuno (disponibile via `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "I preset del laboratorio ne usano solo due delle quattro: `sawtooth` è la forma delle quattro voci organiche e `square` quella del robot. Questa divisione è deliberata. Un'onda a dente di sega contiene energia a ogni armonica, che dopo il filtraggio passa-basso lascia un nucleo denso e simile a una voce — il motivo per cui approssima i toni cantati o parlati meglio di qualsiasi altra forma d'onda di base. Un'onda quadrata conserva solo le armoniche dispari, con più energia nelle alte frequenze, che dona quella qualità vuota, nasale e inconfondibilmente elettronica che il preset robot cerca. `sine` e `triangle` non sono usati da alcun preset attuale, ma si attivano con la modifica di una sola riga tramite lo stesso campo `OscillatorType`: l'onda sinusoidale si adatta a effetti sonori puri come le campane, e l'onda triangolare a blip morbidi di sottofondo dove l'onda a dente di sega risulterebbe troppo aggressiva.",
    },
    { type: "h2", text: "I cinque preset vocali, decodificati" },
    {
      type: "p",
      text: "I cinque preset sono cinque pacchetti di parametri sullo stesso grafo a tre nodi, e le loro differenze sono interamente enumerabili. Ecco la tabella completa, citata direttamente dalla costante `VOICE_PRESETS` nel codice sorgente:",
    },
    {
      type: "table",
      headers: ["Preset", "Forma d'onda", "Freq. di base", "Cutoff passa-basso", "Gain", "Vibrato", "Attack", "Release"],
      rows: [
        ["Uomo adulto", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Disattivato", "`0.02 s`", "`0.05 s`"],
        ["Donna adulta", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Disattivato", "`0.02 s`", "`0.04 s`"],
        ["Anziano", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Bambino", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Disattivato", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Disattivato", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Uomo adulto** ancora l'insieme a una frequenza di base di `180 Hz`, all'estremità bassa della tipica gamma di parlato maschile adulto, con un passa-basso a `1200 Hz` che doma il ronzio dell'onda a dente di sega in qualcosa di più arrotondato. **Donna adulta** porta la base quasi al doppio, a `350 Hz`, apre il filtro a `1800 Hz` per un tono più brillante e riduce sia il gain (`0.25`) sia il release (`0.04 s`) per un'articolazione leggermente più netta.",
    },
    {
      type: "p",
      text: "**Anziano** è il preset più elaborato: il registro più basso (`120 Hz`), il filtro più scuro (`900 Hz`), l'unico vibrato (LFO a `5 Hz` con profondità di `±15 Hz`) e l'inviluppo più lento (`0.04 s` di attack, `0.08 s` di release). Questi ultimi due valori contano quanto il tono — l'attack pigro ammorbidisce l'inizio di ogni sillaba, e il release lungo lascia che i toni sfumino leggermente l'uno nell'altro, evocando l'articolazione meno precisa che il preset vuole ottenere.",
    },
    {
      type: "p",
      text: "**Bambino** inverte quasi ogni decisione del preset anziano: la base più alta (`600 Hz`), il filtro più brillante (`2500 Hz`), il gain più basso (`0.20`) e l'inviluppo più rapido (`0.01 s` di attack, `0.03 s` di release). Inviluppi rapidi su intonazioni acute sono la ricetta classica per le voci di piccole creature — ogni sillaba atterra come un cinguettio rapido. **Robot** è l'eccezione su due assi: usa l'unica onda `square`, ed è l'unico preset con attack e release a zero, il che significa che il gain si accende e si spegne istantaneamente. Quei bordi bruschi producono la qualità dura, gated e meccanica che il preset vuole — nessuna rampa significa nessuna morbidezza, per costruzione.",
    },
    { type: "h2", text: "Come tono e velocità pilotano davvero l'oscillatore" },
    {
      type: "p",
      text: "Due cursori controllano il grafo in tempo reale: il tono, che copre `100 – 800 Hz` con un valore predefinito di `300 Hz`, e la velocità, che copre `0.5x – 2.0x` con un valore predefinito di `1.0x`. Ogni preset dichiara inoltre il proprio `baseFreq` canonico (il centro di riferimento elencato nella tabella sopra), che documenta dove quel tipo di voce è progettato per collocarsi.",
    },
    {
      type: "p",
      text: "Il tono imposta direttamente la frequenza dell'oscillatore, con un solo vincolo di protezione: nel preset bambino la frequenza riprodotta è `Math.max(pitch, 500)`, quindi trascinare il cursore sotto `500 Hz` in modalità bambino non ha alcun effetto — l'oscillatore non scende mai sotto quel limite minimo. Questo blocco protegge il carattere del preset, poiché una voce di bambino a `150 Hz` verrebbe semplicemente percepita come quella di un uomo adulto tranquillo.",
    },
    {
      type: "p",
      text: "La velocità controlla il tempo, non la frequenza. Una sola pressione del pulsante di riproduzione produce un beep della durata di `0.5 / speed` secondi — `1.0 s` a `0.5x`, `0.5 s` a `1.0x` e `0.25 s` a `2.0x`. Lo stesso divisore si applica a ogni costante temporale in modalità testo, quindi una voce a `2.0x` è davvero due volte più veloce da cima a fondo, e non ricampionata: un ricampionamento ne avrebbe spostato il tono. Al termine della riproduzione, l'interfaccia reimposta il proprio stato dopo `500 / speed + 50` millisecondi, la durata del beep più un margine di `50 ms`.",
    },
    { type: "h2", text: "Dal testo al parlato, un beep per carattere" },
    {
      type: "p",
      text: "La modalità testo-voce del laboratorio non è un motore di sintesi vocale — è lo stesso pipeline di oscillatori a tre nodi, pianificato una volta per carattere. Quando digiti fino a `100` caratteri e premi «parla», l'input viene suddiviso in caratteri singoli, e ogni carattere diverso da uno spazio diventa un beep di sillaba pianificato con uno scostamento di tono derivato dal suo codice carattere. Le costanti temporali, tutte divise per la velocità:",
    },
    {
      type: "ul",
      items: [
        "**Durata del tono per carattere** — `0.08 / speed` secondi per carattere (`0.08 s` a `1.0x`).",
        "**Intervallo tra caratteri** — `0.03 / speed` secondi tra caratteri consecutivi.",
        "**Intervallo tra parole** — uno spazio inserisce `0.12 / speed` secondi di silenzio, circa una volta e mezza la durata di un carattere.",
        "**Pausa di frase** — ogni quinto carattere (`i % 5 === 4`) aggiunge una pausa extra di `gap × 2`, dando all'output una cadenza invece di un flusso piatto.",
        "**Ritardo iniziale** — lo scheduling inizia a `currentTime + 0.05` secondi così che il grafo audio sia pronto prima del primo tono.",
      ],
    },
    {
      type: "p",
      text: "La variazione di tono è la parte ingegnosa. Lo scostamento di frequenza di ogni carattere viene calcolato come `((charCode % 20) - 10) × 3`, che produce una dispersione deterministica tra `-30 Hz` e `+27 Hz` attorno al tono base. Il determinismo conta: la stessa parola produce sempre lo stesso contorno melodico, quindi una determinata frase diventa riconoscibile allo stesso modo in cui è riconoscibile la voce di un Mii. Poiché gli scostamenti derivano dai codici carattere anziché dalla fonetica, l'output segue da vicino il ritmo del testo rimanendo però un farfugliare non lessicale — che è precisamente l'effetto di parlato a beep che il laboratorio sta approssimando.",
    },
    { type: "h2", text: "Progettare una voce per ogni gruppo di personalità" },
    {
      type: "p",
      text: "Progettare una voce di personalità convincente è soprattutto una decisione sull'intervallo di tono: scegli il preset che la tabella di riferimento del sito assegna al gruppo di personalità del tuo Mii, poi posiziona il cursore del tono entro il range consigliato. La mappatura completa usata dalla [tabella di riferimento del Voice Lab](/it/tomodachi-voice-lab):",
    },
    {
      type: "table",
      headers: ["Gruppo di personalità", "Tipo di esempio", "MBTI", "Preset consigliato", "Range di tonalità"],
      rows: [
        ["Estroverso", "Leader", "ESTJ", "Uomo adulto", "`180 – 250 Hz`"],
        ["Sicuro di sé", "Designer", "INTJ", "Uomo adulto", "`150 – 200 Hz`"],
        ["Indipendente", "Artista", "INFP", "Donna adulta", "`280 – 380 Hz`"],
        ["Tranquillo", "Sognatore", "INFJ", "Anziano", "`120 – 180 Hz`"],
        ["Personaggi infantili", "Any", "Any", "Bambino", "`500 – 700 Hz`"],
        ["Personaggi robot/IA", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Nota che la tabella mappa i gruppi, non tutte le 16 personalità — i quattro gruppi di personalità della nostra [mappatura MBTI](/it/tomodachi-life-mbti) ricevono ciascuno una silhouette vocale rappresentativa, e le personalità individuali si esprimono attraverso la posizione del cursore entro il range e la velocità impostata sul controllo dedicato. La ricetta passo per passo:",
    },
    {
      type: "ol",
      items: [
        "**Scegli il preset in base al gruppo.** I Mii Estroversi e Sicuri di sé prendono Uomo adulto; i Mii Indipendenti prendono Donna adulta; i Mii Tranquilli prendono Anziano, il cui vibrato a `5 Hz` aggiunge la qualità rilassata e senza fretta per cui il gruppo è noto. Il gruppo di un Mii deriva dai suoi quattro cursori di personalità — consulta la [tabella delle personalità](/it/tomodachi-life-personality-chart) se non lo conosci ancora.",
        "**Posiziona il cursore del tono entro il range del gruppo.** Per un Designer Sicuro di sé ciò significa `150 – 200 Hz`; scendere verso `150 Hz` rende la voce più imponente, salire verso `200 Hz` più energica. Il limite minimo di `500 Hz` del preset bambino garantisce di fatto il range `500 – 700 Hz`.",
        "**Scegli la velocità in base allo stile di parlato.** I tipi Intrattenitore dal parlato veloce staranno bene a `1.4x – 2.0x`; un Sognatore assonnato si colloca naturalmente a `0.5x – 0.8x`. La velocità cambia solo la durata, quindi non stona mai la voce che hai scelto al passo 2.",
        "**Prova con una frase breve.** Digita `20 – 30` caratteri nel campo di testo e ascolta la pausa di frase ogni quinto carattere — se la cadenza sembra sbagliata per la personalità, regola la velocità prima di toccare il tono.",
        "**Sfrutta lo storico.** Ogni riproduzione — preset, tono, velocità e fino a `100` caratteri di testo — viene salvata in un pannello dello storico `IndexedDB` locale dentro lo strumento, così puoi confrontare in A/B due impostazioni senza annotarle. Nulla lascia il browser.",
      ],
    },
    {
      type: "p",
      text: "Le righe bambino e robot stanno volutamente fuori dal sistema di personalità: qualsiasi Mii può essere doppiato con l'una o l'altra, ed è per questo che la loro colonna MBTI mostra Any. L'inviluppo a lunghezza zero del robot lo rende tollerante al tempo — a qualsiasi velocità mantiene la stessa rigidità gated, quindi è l'unica voce in cui la velocità è puramente un controllo comico.",
    },
    { type: "h2", text: "Perché non esiste un fallback alla Web Speech API" },
    {
      type: "p",
      text: "Il laboratorio evita deliberatamente la Web Speech API del browser — non c'è alcuna chiamata a `speechSynthesis` in tutto il suo codice, e la modalità testo-voce è puro scheduling di oscillatori. È una decisione di progetto con una giustificazione difendibile e un compromesso reale, e vale la pena esplicitarli entrambi.",
    },
    {
      type: "p",
      text: "La giustificazione: `speechSynthesis` produce voci umane naturali, il che è esattamente ciò che un laboratorio di voci 8-bit non vuole. Delega inoltre la selezione delle voci al sistema operativo, quindi lo stesso testo può suonare diverso tra browser e dispositivi, e diversi browser caricano le voci in modo differito, con una latenza percepibile alla prima pronuncia. L'approccio a un beep per carattere mantiene ogni suono dentro lo stesso grafo a tre nodi usato dalla modalità a beep singolo, garantisce un timbro identico ovunque funzioni la Web Audio API e parte all'istante perché non c'è nulla da caricare.",
    },
    {
      type: "p",
      text: "Il compromesso: l'output non è un parlato intelligibile. Segue il ritmo e il contorno del testo ma non produce parole riconoscibili, quindi evoca la cadenza del parlato a beep di Tomodachi Life anziché la sua comprensibilità — e il farfugliare del gioco non è comprensibile a sua volta, che è probabilmente il punto. Fermare la riproduzione è altrettanto diretto ed efficace: il laboratorio chiude l'intero `AudioContext` tramite `close()`, il che elimina immediatamente ogni nodo pianificato invece di sfumare.",
    },
    { type: "h2", text: "I limiti, dichiarati onestamente" },
    {
      type: "p",
      text: "Tre limiti delimitano ciò che questo sintetizzatore può onestamente rivendicare. Primo, approssima un'estetica, non il motore del gioco: Nintendo non ha mai documentato come Tomodachi Life genera le proprie voci, quindi i valori dei preset qui presenti sono stime della community accordate per evocare il suono della serie, non costanti estratte dal gioco. Le voci ricordano quelle del gioco, non ne sono le repliche.",
    },
    {
      type: "p",
      text: "Secondo, la sintesi è monofonica e senza formanti. Ogni sillaba è un singolo oscillatore modellato da un solo filtro passa-basso, mentre il parlato naturale — e presumibilmente il motore più sofisticato del gioco — porta una struttura di formanti derivata dal tratto vocale. È per questo che l'output viene percepito come una voce chiptune anziché come parlato campionato, ed è il divario che merita più di tutti di essere esplorato se estendi il codice: un secondo oscillatore un'ottava sopra, o un filtro con un movimento di frequenza pianificato, spingerebbero entrambi il risultato più vicino al territorio vocale.",
    },
    {
      type: "p",
      text: "Terzo, tutto dipende dal supporto del browser. La Web Audio API usata qui — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — è supportata in tutti i principali browser attuali, ma il carattere dell'output varia ancora leggermente tra gli stack audio dei dispositivi, e i browser che bloccano la riproduzione automatica fino a un gesto dell'utente richiederanno la pressione del pulsante di riproduzione che il laboratorio già fornisce. Sul fronte della privacy lo strumento è interamente lato client: la sintesi viene eseguita nel browser e l'unica persistenza è lo storico `IndexedDB` locale — nessun audio o testo viene caricato da nessuna parte.",
    },
    { type: "h2", text: "Prova tu stesso il pipeline" },
    {
      type: "p",
      text: "Il modo più rapido per interiorizzare il modello è muovere i due cursori e sentire il grafo rispondere in tempo reale:",
    },
    {
      type: "ul",
      items: [
        "[Voice Lab Tomodachi](/it/tomodachi-voice-lab) — il sintetizzatore stesso: cinque preset, il cursore del tono `100 – 800 Hz`, il controllo della velocità e la modalità testo a un beep per carattere.",
        "[Mappatura MBTI di Tomodachi Life](/it/tomodachi-life-mbti) — come i quattro cursori di personalità di un Mii producono il suo gruppo, che decide il suo preset nella tabella sopra.",
        "[Tabella delle personalità](/it/tomodachi-life-personality-chart) — il riferimento completo dei 16 tipi per scegliere una personalità rappresentativa da far parlare.",
        "[Sbloccatore QR Mii](/it/mii-qr-unlocker) — abbina una voce progettata a un personaggio Mii modificato per completare la rosa dei residenti dell'isola.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life e Nintendo sono marchi registrati dei rispettivi proprietari. Questo sintetizzatore vocale è un'interpretazione realizzata dai fan a scopo di intrattenimento e non è affiliato né approvato da Nintendo.",
    },
  ],
};
