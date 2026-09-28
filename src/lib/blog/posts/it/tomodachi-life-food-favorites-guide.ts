/**
 * LifeSimGrid — Blog: i cibi preferiti di Tomodachi Life, un metodo di test
 *
 * Basato sul modello del sito stesso:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "Trovare il cibo preferito di ogni Mii: metodo di test",
  description:
    "Un protocollo ripetibile in 7 passi per trovare il cibo preferito di ogni Mii in Tomodachi Life: 48 alimenti, 8 categorie e affinità per gruppo.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Cibi", "Personalità", "Guide"],
  blocks: [
    {
      type: "p",
      text: "Ogni Mii in Tomodachi Life porta con sé due assegnazioni alimentari nascoste: un cibo preferito generato casualmente e un cibo sgradito generato casualmente. Poiché il gioco non mostra mai nessuno dei due valori, l'unico modo affidabile per sapere cosa adora un determinato Mii è nutrirlo e osservare la reazione — e il modo più economico per farlo è partire dai cibi che il suo gruppo di personalità favorisce. Questa guida trasforma quell'idea in un protocollo ripetibile: come è organizzato il database di 48 alimenti dietro la nostra [tabella degli alimenti](/it/tomodachi-life-food-chart), come funzionano i cinque livelli di reazione, cosa predice il modello di affinità stimato dalla community per ciascuno dei quattro gruppi di personalità, e un ciclo di test in sette passi che trasforma le congetture in una ricerca registrata e riproducibile. Ogni numero qui sotto proviene dai file di dati del sito stesso, quindi puoi riprodurre l'intero metodo a mano.",
    },
    { type: "h2", text: "Perché i cibi preferiti contano sulla tua isola" },
    {
      type: "p",
      text: "Nutrire un Mii con il suo cibo preferito produce la reazione positiva più forte del sistema alimentare del gioco, e vale la pena pianificare in base a quella reazione. Le wiki della community e le segnalazioni di lungo periodo dei giocatori descrivono la scena del cibo preferito come una delle animazioni di gioia più teatrali dell'isola: il Mii festeggia, il suo umore fa un balzo visibile e un residente soddisfatto tende a presentarsi sorridente agli eventi sociali che alimentano amicizie, romanticismo e proposte di matrimonio. Nutrire il cibo sgradito produce l'effetto opposto — una reazione chiaramente negativa. Conoscere entrambe le assegnazioni nascoste svolge quindi due compiti in una volta: ti dà una leva affidabile per la felicità quotidiana e ti impedisce di servire per sbaglio l'unico articolo che rovina l'umore.",
    },
    {
      type: "p",
      text: "C'è una seconda ragione, meno ovvia, per dare la caccia ai preferiti: testare i cibi è una delle poche attività dell'isola che produce informazioni pulite, per singolo Mii. Ogni pasto è un esperimento controllato — un residente, un cibo, una reazione osservabile — e il vocabolario delle reazioni è abbastanza ridotto da registrarlo con un solo tocco. Una volta confermato e annotato un preferito, le decisioni successive su quel residente diventano più facili: chi riceve il meglio durante i tuoi giri quotidiani, quali reazioni aspettarsi quando pianifichi la [compatibilità](/it/tomodachi-life-compatibility), e quali cibi tenere lontani dalla tavola. Il resto di questa guida riguarda come rendere economico quell'esperimento — meno pasti per ogni preferito confermato, e zero note perse.",
    },
    { type: "h2", text: "Lo spazio di ricerca: 8 categorie, 48 alimenti, 16 preferiti comuni" },
    {
      type: "p",
      text: "Il tuo spazio di ricerca è esattamente di 48 alimenti organizzati in 8 categorie — Bevande, Dolci, Caramelle, Snack, Portate principali, Frutta, Verdure e Altri — e conoscerne la forma è ciò che rende possibile un test efficiente. Il database è quello dietro la [tabella degli alimenti](/it/tomodachi-life-food-chart). Ogni voce porta tre proprietà rilevanti per il protocollo: un `id` stabile su cui si basa il tracker, una categoria e un flag `commonFavorite` che segnala i 16 articoli che la community vede più spesso finire tra i preferiti. La ripartizione completa:",
    },
    {
      type: "table",
      headers: ["Categoria", "Alimenti", "Preferiti comuni", "Articoli di esempio"],
      rows: [
        ["Bevande", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Dolci", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Caramelle", "5", "2", "Chocolate, Candy, Licorice"],
        ["Snack", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Portate principali", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Frutta", "5", "1", "Apple, Banana, Melon"],
        ["Verdure", "4", "0", "Carrot, Broccoli, Salad"],
        ["Altri", "2", "0", "Boba Tea, Sundae"],
        ["Totale", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Due dettagli strutturali saltano all'occhio da quella tabella. Primo, le categorie più pesanti sono `main` (10 articoli) e `drink` (9 articoli), quindi una passata cieca a forza bruta brucia lì la maggior parte dei pasti — un protocollo capace di rinviare una categoria pesante risparmia veri giorni di gioco. Secondo, i 16 articoli `commonFavorite` si concentrano negli slot che accontentano tutti: Cola, Juice e Soda tra le Bevande; Cake, Ice Cream, Donut e Cookie tra i Dolci; Pizza, Hamburger, Sushi e Curry tra le Portate principali. Quei flag rendono buone sonde iniziali ancora prima che la personalità entri in gioco. I due articoli `other` — Boba Tea e Sundae — sono la coda di nicchia della lista, e esattamente dove a un gruppo di personalità piace guardare per primo.",
    },
    { type: "h2", text: "Come funzionano le reazioni: cinque livelli e una coppia nascosta" },
    {
      type: "p",
      text: "Ogni pasto si risolve in uno dei cinque livelli di reazione — `love`, `like`, `neutral`, `dislike` o `hate` — e ogni livello è un'animazione distinta e osservabile nel gioco. La scala a cinque livelli è anche il vocabolario che usa il nostro tracker: ogni riga di cibo porta cinque pulsanti compatti di registrazione, uno per livello (♥ per Lo adora, ▲ per Gli piace, – per Neutro, ▼ per Non gli piace, ✕ per Lo odia), quindi registrare un risultato richiede un solo tocco. La scala è volutamente grezza — abbastanza fine da classificare due cibi positivi l'uno contro l'altro, abbastanza grezza da non lasciarti mai in dubbio su quale livello hai appena visto.",
    },
    {
      type: "p",
      text: "Sotto il cofano, il modello del sito assegna un punteggio di affinità `0–100` a ogni cibo per ogni gruppo di personalità, e una regola fissa di bande converte un punteggio in un livello previsto: `90` e oltre corrispondono a `love`, `75–89` a `like`, `40–74` a `neutral`, `25–39` a `dislike`, e qualsiasi valore sotto `25` a `hate`. Quelle bande alimentano solo la predizione. Una volta confermato il preferito reale di un Mii, il modello cortocircuita: il cibo preferito viene forzato a `love` e il cibo sgradito a `hate`, indipendentemente da ciò che dice l'euristica. Quell'override rispecchia il comportamento reale del gioco — l'assegnazione nascosta batte sempre la personalità, ed è esattamente per questo che esiste il test.",
    },
    { type: "h2", text: "Cosa predice il modello per ogni gruppo di personalità" },
    {
      type: "p",
      text: "I quattro gruppi di personalità — **Gruppo Estroverso**, **Gruppo Sicuro**, **Gruppo Indipendente** e **Gruppo Affabile** — ricevono ciascuno una classifica distinta sulle otto categorie, e quella classifica è il tuo ordine di test. La matrice qui sotto è la baseline completa stimata dalla community, presa dal file di dati del sito; leggi una colonna dall'alto in basso e stai leggendo il menu suggerito per quel gruppo:",
    },
    {
      type: "table",
      headers: ["Categoria", "Estroverso", "Sicuro", "Indipendente", "Affabile"],
      rows: [
        ["Bevande", "90", "70", "60", "75"],
        ["Dolci", "85", "65", "70", "80"],
        ["Caramelle", "95", "55", "60", "75"],
        ["Snack", "80", "75", "70", "85"],
        ["Portate principali", "65", "90", "60", "90"],
        ["Frutta", "75", "70", "75", "80"],
        ["Verdure", "60", "65", "80", "85"],
        ["Altri", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Emergono quattro menu chiari. I Mii **Estroversi** — Capo, Intrattenitore, Trendsetter e Ottimista — toccano il picco sulle Caramelle (`95`), le Bevande (`90`) e i Dolci (`85`): una golosità dolce, energica e orientata alla festa. I Mii **Sicuri** — Progettista, Avventuriero, Realizzatore, Affascinante — toccano il picco sulle Portate principali (`90`), l'estremità della lista orientata al ristorante e allo status. I Mii **Indipendenti** — Artista, Spirito libero, Pensatore, Lupo solitario — sono il caso interessante: le loro punte più alte appartengono agli articoli di nicchia `other` (`85`) e alle Verdure (`80`), ed è esattamente il motivo per cui Boba Tea e Sundae si guadagnano un posto nel database. I Mii **Affabili** — Sognatore, Dolcezza, Dolce, Compagno — prediligono l'estremità casalinga: Portate principali (`90`), Snack (`85`) e Verdure (`85`). L'anteprima delle reazioni della tabella campiona un residente per gruppo — un Capo, un Realizzatore, un Pensatore e un Compagno — così puoi confrontare i quattro menu fianco a fianco. Per sapere come un Mii finisce in uno di questi gruppi, consulta la nostra [guida alla mappatura MBTI](/it/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Una proprietà onesta della matrice: ogni cella si colloca tra `55` e `95`, il che significa che l'euristica da sola può predire solo `love`, `like` o `neutral`. I due livelli negativi non sono mai prodotti dall'affinità di personalità. Nella pratica, i negativi arrivano dalla seconda assegnazione nascosta — il cibo sgradito, che è casuale esattamente quanto il preferito. La personalità ti dice dove iniziare a cercare il lato positivo; niente ti dice dove si nasconde il lato negativo, tranne il test.",
    },
    { type: "h2", text: "Il protocollo di test: sette passi verso un preferito confermato" },
    {
      type: "p",
      text: "Il protocollo trova un preferito con il minor numero di pasti possibile testando per prime le categorie più forti del gruppo, registrando ogni risultato e potando le categorie man mano che arrivano le evidenze. Puoi eseguirlo interamente nel [tracker della tabella degli alimenti](/it/tomodachi-life-food-chart), che ricorda la tua checklist da una sessione all'altra.",
    },
    {
      type: "ol",
      items: [
        "**Identifica il gruppo di personalità del Mii.** Cerca il residente nella [tabella delle personalità](/it/tomodachi-life-personality-chart) o nella [mappatura MBTI](/it/tomodachi-life-mbti) e annota il gruppo: Estroverso, Sicuro, Indipendente o Affabile. Per il cibo conta solo il gruppo — il sottotipo (Ottimista rispetto a Trendsetter, per esempio) non cambia la matrice di affinità.",
        "**Estrai i 5 candidati di partenza del gruppo.** Il pannello dei consigli della tabella ordina tutti i 48 alimenti per l'affinità del gruppo selezionato e mostra i cinque più alti. Per un Mii Estroverso sono tutti e cinque gli articoli delle Caramelle a `95`; per un Mii Affabile il pannello parte con le Portate principali a `90`. Quei cinque cibi sono la tua prima sessione.",
        "**Nutri un candidato alla volta, partendo dall'affinità più alta.** Un cibo per pasto mantiene pulita l'evidenza — i regali a raffica offuscano quale articolo ha causato quale reazione. Osserva l'animazione, valutala sulla scala a cinque livelli e solo allora passa al candidato successivo.",
        "**Registra ogni risultato immediatamente.** Tocca il pulsante di reazione corrispondente nella riga del cibo. Il tracker salva la checklist in `localStorage` sotto la chiave `lifesimgrid-food-tracker`, quindi i cibi testati, le reazioni registrate e il contatore di avanzamento sopravvivono alle ricariche della pagina e ai riavvii del browser — nessun account, nessuna sincronizzazione, nessuna nota persa.",
        "**Conferma il vincitore appena vedi la reazione più forte.** Segna quel cibo come `love` nel tracker e impostalo come preferito del Mii nel selettore in cima alla tabella. Da quel momento la tabella forza `love` per quel cibo a prescindere da ciò che predirebbe l'euristica, e il preferito è sistemato.",
        "**Se una categoria torna piatta, eliminala e passa alla successiva più forte del gruppo.** Una serie di reazioni `neutral` sugli articoli di una categoria è l'evidenza che il preferito vive altrove. Conserva ogni risultato `like` come riserva — un cibo che piace non è il preferito, ma resta una scelta quotidiana affidabile. Percorri la matrice di affinità categoria per categoria finché non compare il vincitore.",
        "**Registra il cibo sgradito quando se ne presenta l'occasione, e azzera tra un Mii e l'altro.** Il cibo sgradito affiora come la reazione negativa più forte durante il test ordinario — registralo allo stesso modo e fissalo nel selettore così la tabella forza `hate` per esso. Quando cambi residente, pulisci il tracker con un pulsante (oppure usa un profilo browser separato), perché la checklist è salvata per browser, non per Mii.",
      ],
    },
    {
      type: "p",
      text: "Il limite assoluto del protocollo è 48 pasti — l'intero database. L'ordinamento per gruppo esiste proprio perché tu non ti avvicini quasi mai a quel limite. La copertura completa delle due categorie di testa di un gruppo costa al massimo 15 pasti (Portate principali e Snack riuniscono 15 articoli insieme per i Mii Affabili e Sicuri) e appena 6 per un Mii Indipendente, le cui categorie preferite, `other` e Verdure, contano solo 6 articoli in tutto. Queste sono aspettative di partenza, non garanzie — l'assegnazione nascosta è casuale, e un residente sfortunato può spingerti più a fondo nella matrice.",
    },
    { type: "h2", text: "Esempio pratico: guidare un Mii Estroverso attraverso il ciclo" },
    {
      type: "p",
      text: "Un Mii Estroverso — diciamo un Trendsetter — andrebbe sondato prima con le Caramelle, e il pannello dei consigli è d'accordo: tutti e cinque gli articoli delle Caramelle con affinità `95`, con le nove Bevande in attesa a `90`. Ecco una sessione realistica:",
    },
    {
      type: "ul",
      items: [
        "Pasti 1–5 — Chocolate, Gum, Caramel, Licorice, Candy: Chocolate ottiene un chiaro `like`, Candy un altro `like`, il resto `neutral`. Nessuna reazione di livello massimo, quindi le Caramelle sono escluse — e poiché la prima sessione capita a coprire l'intera categoria Caramelle, cinque pasti l'hanno eliminata completamente.",
        "Pasti 6–8 — Cola, Juice, Soda: tutte `neutral`. Tre bevande preferite comuni piatte di fila sono un'evidenza debole contro l'intera categoria Bevande da 9 articoli, quindi il giocatore parcheggia le sei bevande non testate (Coffee, Tea, Milk, Water, Beer, Sake) e salta di livello invece di macinarle una a una.",
        "Pasti 9–10 — Cake, Ice Cream: Cake è `neutral`, ed Ice Cream produce l'inconfondibile reazione positiva più forte. Quello è il preferito.",
        "Conferma — Ice Cream entra nel selettore dei preferiti, la tabella ora forza `love` per esso, e il contatore di avanzamento segna 10 alimenti testati su 48 — circa il 21% del database per un vincitore confermato.",
      ],
    },
    {
      type: "p",
      text: "Dieci pasti hanno prodotto un preferito confermato, una categoria eliminata del tutto, una categoria parcheggiata e due cibi di riserva registrati che il giocatore può ancora servire nelle giornate ordinarie. Nota ciò che il protocollo non ha mai toccato: la categoria `main` da 10 articoli e la categoria `vegetable` da 4 articoli, le due affinità più deboli di un Mii Estroverso (`65` e `60`). Il cibo sgradito resta sconosciuto — è casuale quanto il preferito — quindi durante le normali giornate isolane il giocatore sta all'erta per una reazione negativa forte e la fissa come `hate` nel selettore ogni volta che compare. Esegui lo stesso ciclo con un Mii Affabile e cambia solo il punto d'ingresso: il pannello partirebbe con Portate principali e Snack invece che con le Caramelle.",
    },
    { type: "h2", text: "Perché i preferiti sono casuali — e perché le guide con risposte fisse falliscono" },
    {
      type: "p",
      text: "Qualsiasi guida che indichi un cibo preferito fisso per una data personalità sta descrivendo un file di salvataggio, non il gioco. Il file di dati dietro la nostra tabella dichiara la situazione senza giri di parole: Tomodachi Life non pubblica una matrice ufficiale delle reazioni ai cibi, e ogni Mii riceve un cibo preferito generato casualmente e un cibo sgradito generato casualmente. La randomizzazione è per residente, non per personalità — due Mii con personalità, nome e persino cursori dell'editor identici possono portare preferiti nascosti diversi.",
    },
    {
      type: "p",
      text: "Questo singolo fatto ridefinisce cosa può essere una guida utile. Una tabella di consultazione non può funzionare, perché la risposta non è funzione di nulla che tu possa leggere dal Mii. Ciò che può funzionare è una strategia di ricerca: un ordinamento che mette per primi i candidati statisticamente più probabili, un sistema di registrazione che non perde mai un risultato e una regola di eliminazione che pota le categorie man mano che arrivano le evidenze. È esattamente ciò che fornisce la matrice di affinità a quattro gruppi — punti di partenza, non risposte — ed è il motivo per cui la nostra [tabella degli alimenti](/it/tomodachi-life-food-chart) offre un tracker persistente invece di una tabella di presunti preferiti. Tratta qualsiasi sito che prometta preferiti fissi per personalità come tratteresti un oroscopo: divertente, infalsificabile e di nessun aiuto con la tua isola reale.",
    },
    { type: "h2", text: "I limiti del modello (leggi questa parte)" },
    {
      type: "p",
      text: "I numeri di affinità di questa guida sono una stima della community, non dati estratti dal gioco — Nintendo non ha mai pubblicato il funzionamento interno del sistema alimentare. I preset sono tarati esplicitamente perché ogni gruppo mostri una classifica distinta tra le categorie, perché una classifica distinta è ciò che rende possibile una raccomandazione su «quale cibo provare per primo». Quella taratura è una scelta di modellazione. Approssima l'osservazione della community abbastanza bene da essere utile per ordinare i tuoi test e, come tutti i modelli, sbaglia qualcosa.",
    },
    {
      type: "p",
      text: "Tre avvertenze che vale la pena tenere a mente. Prima, la regola delle bande significa che il modello può predire solo fino a `neutral` — ogni valore predefinito si colloca a `55` o più alto — quindi le reazioni negative sono sempre sorprese provenienti dall'assegnazione nascosta del cibo sgradito, mai previsioni. Seconda, il database di 48 articoli è un sottoinsieme curato di cibi osservati nei titoli di Tomodachi Life, non una lista completa dei cibi del gioco; se un pasto produce una reazione che non trovi nella tabella, registra l'equivalente più vicino e vai avanti. Terza, il tracker salva una sola checklist per browser sotto una chiave `localStorage`, quindi gestisce un Mii attivo alla volta — puliscila tra i residenti, oppure mantieni un profilo browser per isolano se ne cacci diversi in parallelo. Niente di tutto questo cambia il risultato centrale: un registro per Mii, basato sulle evidenze, di ciò che ogni residente ama davvero. Il modello decide dove inizi; i tuoi pasti decidono a cosa credere.",
    },
    { type: "h2", text: "Prova anche tu il protocollo" },
    {
      type: "ul",
      items: [
        "[Tabella degli alimenti e tracker](/it/tomodachi-life-food-chart) — il database completo di 48 alimenti, il pannello di consigli per gruppo e la checklist persistente dei cibi testati.",
        "[Tabella delle personalità](/it/tomodachi-life-personality-chart) — il riferimento dei 16 tipi con gruppi codificati per colore, per il passo 1 del protocollo.",
        "[Mappatura MBTI](/it/tomodachi-life-mbti) — sfoglia i residenti per codice di quattro lettere se è così che gestisci la tua lista.",
        "[Calcolatore di compatibilità](/it/tomodachi-life-compatibility) — abbina due residenti e scomponi i punteggi di romanticismo e amicizia una volta registrati i loro preferiti.",
      ],
    },
    {
      type: "callout",
      text: "Questa guida alimentare è un'interpretazione realizzata dai fan a scopo di intrattenimento e pianificazione, e non è affiliata né approvata da Nintendo o dalla Myers-Briggs Company. MBTI e Nintendo sono marchi registrati dei rispettivi proprietari.",
    },
  ],
};
