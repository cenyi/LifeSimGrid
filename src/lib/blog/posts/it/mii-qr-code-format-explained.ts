/**
 * LifeSimGrid — Articolo del blog (it): il formato dei QR di Mii, spiegato
 *
 * Basato sull'implementazione del sito:
 *   - src/lib/qr-handler.ts            (jsQR binaryData in ingresso, QR in byte mode in uscita, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (copia consentita 0x01 bit 0, condivisione vietata 0x30 bit 0, fonte: 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "QR di Mii: il formato FFL e l'offset 0x04",
  description:
    "Come un QR di Mii conserva un Mii in binario FFL: campi dell'intestazione, flag di permessi, perché la console dice \"non modificabile\" e cosa cambia davvero uno sblocco.",
  publishedAt: "2026-09-28",
  tags: ["Mii", "Codice QR", "3DS", "Guide"],
  blocks: [
    {
      type: "p",
      text: "Scansiona un QR di Mii con il normale scanner dello smartphone e otterrai uno schermo pieno di pasticci. Scansiona lo stesso codice su un 3DS e riceverai un personaggio completo — volto, nome, corpo — più un regolamento invisibile su chi possa copiarlo, condividerlo e modificarlo. Questa distanza tra le due esperienze è un piccolo pezzo di ingegneria binaria, ed è la ragione per cui esiste il nostro [Sbloccatore QR Mii](/it/mii-qr-unlocker). Questa guida attraversa il formato lungo la strada che lo strumento percorre davvero: il livello QR, il blocco dati FFL, i campi dei permessi agli offset come \`0x01\` e \`0x04\`, e i motivi precisi per cui la console ti risponde **\"Questo Mii non può essere modificato\"**. Ogni affermazione arriva dallo stesso decoder che gira nella nostra applicazione: qui non c'è una frase riciclata da un wiki.",
    },
    { type: "h2", text: "Prima sorpresa: un QR di Mii non è testo" },
    {
      type: "p",
      text: "I codici che scansioni ogni giorno trasportano testo puro: un indirizzo, una password Wi-Fi, il menù di un ristorante. Il QR di un Mii, no. Trasporta un **payload in byte mode**: un blocco di binario grezzo che ha senso solo per una console che conosce il formato. Quando lo scanner dello smartphone lo legge, prova a interpretare quei byte come testo in qualche codifica, si ferma a metà strada e stampa il guazzabuglio che avrai già visto.",
    },
    {
      type: "p",
      text: "La differenza tecnica sta nella specifica QR stessa. Un codice può trasportare dati in più modalità — numerica, alfanumerica, byte e kanji. Il testo viaggia in alfanumerica o in byte mode con payload UTF-8; un Mii usa pure il byte mode, ma il suo payload **non è testo affatto**. Il nostro decoder legge il codice con [jsQR](https://github.com/cozmo/jsQR) e prende l'array \`binaryData\` grezzo invece della stringa decodificata. È il dettaglio d'implementazione più importante di tutti: nel momento in cui tratti un QR di Mii come una stringa, l'hai già rovinato.",
    },
    {
      type: "p",
      text: "Al momento di riscrivere il codice, la stessa trappola si presenta al contrario. Un generatore pensato per gli URL ricodifica volentieri i dati binari attraverso uno strato di testo e li distrugge senza dire una parola. Per questo il nostro encoder fa passare il buffer in byte mode, con versione del QR e livello di correzione d'errore fissi, calibrati perché la fotocamera di un 3DS legga il codice dallo schermo del telefono senza intoppi. Binario in entrata, binario in uscita: il payload non sfiora mai una stringa.",
    },
    { type: "h2", text: "FFL: la biblioteca di volti dietro ogni Mii" },
    {
      type: "p",
      text: "I dati nel QR descrivono il Mii nel **formato FFL (Face Library)** — la libreria di rendering dei personaggi che Nintendo condivide tra le sue console, documentata pubblicamente dalla comunità e fondamento degli stessi dati Mii che i giochi per Wii, 3DS, Wii U e Switch consumano. FFL conserva un Mii come struttura compatta: campi d'identità come nome e genere, un pacchetto di campi d'aspetto per tratti del volto, corporatura e colori, e un piccolo blocco di **flag di permessi** che decide cosa le console altrui possono fare con il personaggio.",
    },
    {
      type: "p",
      text: "Due proprietà del formato modellano tutto il resto della guida. La prima: è **stabile attraverso le generazioni di console** — un QR dell'era 3DS si scansiona ancora su una Wii U, e i giochi per Switch consumano gli stessi dati sottostanti; una guida al formato, scritta una volta, resta utile a lungo. La seconda: è **schiavo delle posizioni** — ogni campo vive a un offset fisso dall'inizio del blocco, e tra le generazioni quegli offset scivolano leggermente. Un solo offset sbagliato, e non ottieni un Mii un po' strano: ottieni un Mii che non si scansiona proprio. È proprio questo rigore a spiegare perché il formato attraversa i passaggi di generazione senza una piega: i giochi non lo reinventano, consegnano i dati dei loro personaggi alla stessa libreria.",
    },
    { type: "h2", text: "La mappa dell'intestazione, campo per campo" },
    {
      type: "p",
      text: "Prima di toccare qualsiasi cosa, lo strumento analizza i primi byte del blocco e ti mostra un'anteprima. Questi sono i campi dell'intestazione definiti dal formato, e ciò che ciascuno governa:",
    },
    {
      type: "table",
      headers: ["Offset", "Campo", "Cosa contiene"],
      rows: [
        ["`0x00`", "Byte di versione", "Quale generazione di dati Mii usa il blocco"],
        ["`0x01`", "Flag di opzioni", "Il bit `0` porta il flag **consenti copia**; gli altri bit coprono il flag di volgarità e il blocco regionale"],
        ["`0x02`–`0x03`", "Intestazione slot", "In quale pagina e slot del Mii Maker il Mii è stato salvato"],
        ["`0x04`–`0x0B`", "System ID", "Otto byte che identificano la console proprietaria — il campo che il controllo di modifica verifica, e che il nostro passaggio di sblocco riscrive"],
        ["`0x18`", "Genere e bit personali", "Il bit del genere, più data di nascita e colore preferito"],
        ["`0x1A`–`0x2D`", "Nome", "Fino a 10 caratteri in UTF-16, terminato da null"],
        ["`0x30`", "Flag di condivisione", "Il bit `0` è l'interruttore del flag **vietare la condivisione** (fonte: documentazione del formato Mii su 3dbrew)"],
      ],
    },
    {
      type: "p",
      text: "Il campo del nome merita una sosta, perché è qui che l'editing manuale inciampa più spesso. \"Dieci caratteri\" non significa \"dieci byte\": in UTF-16 ogni carattere occupa due byte, le posizioni libere si riempiono di null e il decoder si ferma al primo null. Scrivi il nome in UTF-8 e un nome giapponese o tedesco esce pasticciato sulla console; dimentichi il null finale e il nome divorerà ciò che viene dopo.",
    },
    {
      type: "p",
      text: "Tutto ciò che segue l'intestazione è il Mii in persona: decine di campi d'aspetto — forma del viso, capelli, occhi, sopracciglia, naso, bocca, occhiali, altezza, corporatura e colori preferiti — compressi in bit precisi. Lo strumento ne legge abbastanza da disegnare un'anteprima, e poi sceglie deliberatamente di **non toccarli mai**: uno sblocco che spostasse un solo pixel del viso sarebbe uno sblocco di cui non ci si può fidare.",
    },
    { type: "h2", text: "Perché i Mii scansionati dicono \"non modificabile\"" },
    {
      type: "p",
      text: "Il sistema di permessi esiste perché il QR di Mii è un meccanismo di condivisione, e Nintendo ha lasciato al creatore decidere fino a dove arriva. Quando un Mii nasce su una console, i suoi dati FFL annotano la scelta dell'autore in flag dentro il blocco. Quando un'altra console scansiona quel QR, il Mii arriva marchiato **ricevuto**: la console tratta il creatore originario come autore, legge i flag e li esegue alla lettera:",
    },
    {
      type: "ul",
      items: [
        "**Consenti copia** — se il creatore ha disattivato la copia, la console ricevente non permetterà di duplicare il Mii o di salvarlo altrove.",
        "**Vietare la condivisione** — con lo scambio spento, da questo Mii non uscirà un nuovo QR per la persona successiva.",
        "**Modificare** — un Mii ricevuto non è mai modificabile sulla console ricevente, quale che sia lo stato degli altri due flag. Il diritto di modifica appartiene alla console dove il Mii è nato. La stessa logica di proprietà governa i valori predefiniti di personalità e voce, e la nostra [guida alla sintesi vocale](/it/blog/tomodachi-life-voice-synthesis-guide) la smonta nel dettaglio.",
      ],
    },
    {
      type: "p",
      text: "È la terza regola a sorprendere. Puoi scansionare un Mii, ammirarlo, usarlo nei giochi — ma nel momento in cui provi ad aprirlo nell'editor, la console si rifiuta: **\"Questo Mii non può essere modificato\"**. Non è un malfunzionamento; sono i flag che svolgono, meticolosamente, ciò che il loro autore ha chiesto.",
    },
    {
      type: "p",
      text: "Esiste una via ufficiale per aggirare l'ostacolo, e funziona solo se il creatore ha consentito la copia: sul 3DS copi il Mii nel tuo Mii Maker e lo ricostruisci pezzo per pezzo. Il Mii ricostruito è nato sulla tua console: è tuo, ed è modificabile del tutto. Il problema è che per tutto ciò che va oltre il ritocco veloce la bolletta è salata — e se è bloccata la copia stessa, la strada si chiude subito. Quello spazio fra \"ufficialmente possibile\" e \"praticamente utile\" è esattamente il territorio di ogni strumento di sblocco.",
    },
    { type: "h2", text: "Cosa cambia il nostro sbloccatore e cosa non tocca mai" },
    {
      type: "p",
      text: "Con la mappa dei campi davanti, l'operazione si capisce al volo: è volutamente minuscola. Lo strumento legge il payload e riscrive il primo byte del System ID a \`0x04\` — l'identità di proprietà che la console verifica per decidere se un Mii ricevuto può essere modificato — così il Mii non rimanda più a un proprietario estraneo. Se vuoi rinominarlo, lo strumento riscrive il campo del nome in UTF-16 corretto nello stesso passaggio. Poi ricodifica il blocco in un QR nuovo di zecca in byte mode. Tutti gli altri byte passano uno a uno, intatti.",
    },
    {
      type: "p",
      text: "Il passo di ricodifica conta più di quanto sembri. Il nuovo QR nasce in byte mode, con versione e livello di correzione \`M\` fissi, disegnato a una dimensione regolata perché la fotocamera di un 3DS lo legga dallo schermo di un telefono. Con impostazioni sbagliate, il codice può sembrare impeccabile e rifiutarsi proprio quando lo punti con la console: i livelli di correzione barattano robustezza di lettura con capacità di dati, e il payload di un Mii sfiora il limite — la scelta non è estetica.",
    },
    {
      type: "p",
      text: "Tutto il viaggio avviene nel tuo browser. Il payload viene decodificato dal file che trascini, tenuto in memoria, modificato e ridisegnato; la cronologia della sessione dorme nell'IndexedDB del tuo browser. Nessun server in mezzo — e non è solo una cortesia per la privacy: significa che per lo strumento non esiste alcuna strada per tenere di nascosto una copia del Mii di qualcuno, il tuo compreso.",
    },
    { type: "h2", text: "Dal 3DS allo Switch: fotocamere, QR e chiavi di accesso" },
    {
      type: "p",
      text: "La più gran parte della confusione attuale attorno alla condivisione dei Mii si spiega con la storia dell'hardware. Il 3DS aveva due fotocamere, e scansionare un QR era un gesto nativo di quella generazione: il Mii Maker, Tomodachi Life, Miitopia e StreetPass si nutrivano tutti di questi codici. Switch ha rimosso le fotocamere senza esitazioni: il suo Mii Maker sa ancora **leggere** un QR di Mii da 3DS o Wii U — nel vuoto, perché non c'è più una fotocamera che lo legga. Ciò che Switch ha conservato sono i dati FFL stessi; per questo il sapere sul formato di questa guida resta valido. È cambiato lo strato di condivisione.",
    },
    {
      type: "p",
      text: "Per Miitopia su Switch, Nintendo ha sostituito i QR con un sistema di **chiavi di accesso**: un codice corto che scarica un Mii da un servizio online, e un'altra chiave per pubblicare il tuo. Switch 2 prosegue su questa strada. Le chiavi risolvono con eleganza l'assenza di fotocamera, ma ereditano la stessa filosofia di permessi — un Mii scaricato è opera di qualcun altro — e funzionano solo nei giochi che supportano il servizio.",
    },
    {
      type: "p",
      text: "Il ponte pratico fra le due epoche passa per il formato dell'era 3DS: prendi un QR di Mii, aprine i flag se sono chiusi e portalo nel Mii Maker di Switch con uno dei mezzi con cui i giocatori aggirano la fotocamera mancante — una scansione emulata su una console modificata, oppure la ricreazione a occhio del Mii sbloccato a partire dall'anteprima decodificata. Quando il Mii abita già su Switch, i suoi dati sono nativi ed è accolto ovunque Switch supporti i Mii, da [Tomodachi Life: Living the Dream](/it/tomodachi-voice-lab) a Miitopia. E poiché il sistema di personalità si basa sugli stessi dati Mii, tutta la nostra [mappatura MBTI di Tomodachi Life](/it/blog/tomodachi-life-mbti-mapping-explained) vale per il personaggio trapiantato senza cambiare una virgola.",
    },
    { type: "h2", text: "Perché l'editing manuale con un editor esadecimale di solito fallisce" },
    {
      type: "p",
      text: "A mappa letta, la tentazione di saltare lo strumento e andare a ritoccare i byte in un editor esadecimale è forte. Lì aspettano tre modi di fallire, e tutti e tre sono muti: il file non annuncerà mai cosa è andato storto.",
    },
    {
      type: "ol",
      items: [
        "**Altra generazione, altri offset.** Le posizioni dei campi slittano fra le generazioni Wii, 3DS e Switch del formato. Una patch applicata alla disposizione sbagliata modifica i byte sbagliati — e le prime vittime sono spesso i campi d'aspetto che non avevi nessuna intenzione di toccare.",
        "**La trappola della stringa.** Gli editor esadecimali ragionano in testo per impostazione predefinita. Apri il payload, correggi il nome come ASCII, salvi — e il campo del nome in UTF-16 si disallinea per costruzione, trascinando nella rovina i byte che seguono.",
        "**La trappola della ricodifica.** Dopo la modifica dei byte resta da produrre il QR. I generatori pensati per gli URL codificano attraverso uno strato di testo e polverizzano i payload binari; solo un encoder in byte mode, con versione e livello giusti, produce un codice che la console accetta.",
      ],
    },
    {
      type: "p",
      text: "Uno strumento dedicato esiste proprio per rendere questi tre errori impossibili in linea di principio: offset fissi, byte mode in entrata e in uscita, campo del nome scritto con la codifica e il riempimento corretti. È l'intera ragione per cui [il nostro sbloccatore](/it/mii-qr-unlocker) è una pagina e non una nota a piè di documentazione.",
    },
    { type: "h2", text: "Le domande che ci si fa sui QR di Mii" },
    { type: "h3", text: "Sbloccare un QR di Mii è legale e sicuro?" },
    {
      type: "p",
      text: "Sul versante sicurezza, la meccanica gioca per te: lo sblocco riscrive solo i byte dei permessi e lascia intatto il blocco dell'aspetto — il codice modificato si scansiona dunque come lo stesso Mii con permessi nuovi, oppure non si scansiona affatto; non esiste la terza strada silenziosa. Sul versante legale: il formato è documentato dalla comunità, lo strumento lavora su dati Mii che già possiedi, e ciò che viene dopo obbedisce alle stesse regole di ogni attività dei fan — rispetta il creatore originario e non presentare il personaggio d'altri come tuo. La posizione di Nintendo sui dati Mii modificati è la stessa che ha sul resto del file system della console: territorio senza supporto ufficiale, giudizio al proprietario.",
    },
    { type: "h3", text: "Funziona con i Mii di Miitopia e Smash Bros.?" },
    {
      type: "p",
      text: "Sì. Miitopia e Super Smash Bros. Ultimate consumano gli stessi dati Mii in formato FFL di Tomodachi Life e del Mii Maker del 3DS: un QR prodotto per un gioco si scansiona negli altri, sulle console che accettano input QR. Il formato è la lingua comune; i giochi sono solo pubblici diversi.",
    },
    { type: "h3", text: "La fotocamera della console non legge il codice sbloccato, perché?" },
    {
      type: "p",
      text: "Nove volte su dieci è ottica, non dati. Porta la luminosità dello schermo al massimo, tieni la console alla distanza in cui il QR riempie l'inquadratura senza sfocare, pulisci la lente della fotocamera ed evita i riflessi della luce dal soffitto. Se il codice resiste ancora, rigeneralo: uno screenshot di un QR può contenere artefatti di compressione che rompono la decodifica. L'abitudine giusta è conservare sempre l'immagine renderizzata d'origine.",
    },
    { type: "h3", text: "Il Mii sbloccato apparirà diverso nei giochi?" },
    {
      type: "p",
      text: "No. Il blocco dell'aspetto passa byte per byte: volto, capelli, colori, altezza, nome e impostazioni della voce arrivano esattamente come li ha lasciati il creatore. I cambiamenti visibili sono quelli che chiedi tu, come un nuovo nome. Se dopo la scansione il Mii appare strano, è stata l'immagine del QR a rovinarsi lungo la strada: rigenera e riscansiona prima di sospettare i dati.",
    },
    { type: "h3", text: "Posso modificare un Mii direttamente su Switch?" },
    {
      type: "p",
      text: "Uno ricevuto, no. Il Mii Maker di Switch modifica i Mii nati su quella console; ogni Mii arrivato dall'esterno — chiave di accesso o scansione — resta bloccato a protezione dell'autore, esattamente come sul 3DS. La strada verso una copia modificabile ripassa sempre dal formato: sblocca il QR d'origine perché venga riconosciuto come locale e modificabile, poi portalo su Switch con il mezzo che la tua configurazione consente.",
    },
    { type: "h3", text: "E il nuovo sistema di Mii di Switch 2?" },
    {
      type: "p",
      text: "Switch 2 prosegue l'approccio a chiavi di accesso per Miitopia, e i dati Mii sottostanti restano della stirpe FFL. Il QR come supporto fisico di condivisione appartiene alle console con fotocamera — 3DS e Wii U —, e proprio per questo capire il formato conserva il suo valore: i dati che quei codici trasportavano sono gli stessi che i tuoi giochi Switch consumano oggi.",
    },
    { type: "h3", text: "Si possono ripristinare i permessi originali?" },
    {
      type: "p",
      text: "Conserva l'immagine del QR d'origine: lo sblocco non sovrascrive mai il tuo file sorgente, produce soltanto un nuovo codice coi flag aperti. Se un giorno vorrai le restrizioni indietro, l'immagine originale le porta ancora con sé e si scansionerà con le impostazioni del creatore. Ciò che non si può fare è richiudere un Mii che già vive su una console: il diritto di modifica concesso alla tua console da uno sblocco resta legato a quel Mii per sempre. Questa asimmetria merita di essere conosciuta prima di sbloccare un Mii prestato da un amico.",
    },
    { type: "h2", text: "Provalo tu stesso" },
    {
      type: "p",
      text: "Il modo più rapido di rendere concreto il formato è dare allo strumento uno dei tuoi Mii e guardare i campi emergere:",
    },
    {
      type: "ul",
      items: [
        "[Sbloccatore QR Mii](/it/mii-qr-unlocker) — trascina un codice, guarda nome e flag decodificati e genera un codice modificabile.",
        "[Creatore Mii](/it/tomodachi-life-mii-creator) — costruisci un Mii da zero con rendering FFL in diretta ed esportalo.",
        "[Occhi Mii](/it/mii-eyes) — un editor concentrato sulle forme degli occhi che fanno l'espressione di un Mii.",
        "[Laboratorio Vocale](/it/tomodachi-voice-lab) — ascolta come Tomodachi Life trasforma una personalità in voce sintetizzata.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch e Miitopia sono marchi registrati di Nintendo. Questa guida descrive un formato documentato dalla comunità a fini di backup personale ed editing, e non è affiliata a Nintendo né ne riceve approvazione. I dettagli del formato FFL seguono la documentazione pubblica di 3dbrew.",
    },
  ],
};
