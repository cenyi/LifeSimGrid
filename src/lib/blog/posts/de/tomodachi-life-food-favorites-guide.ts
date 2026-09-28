/**
 * LifeSimGrid — Blogbeitrag (de): Tomodachi Life Lieblingsessen, eine Testmethode
 *
 * Verankert im eigenen Modell der Website:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "Lieblingsessen jedes Mii: Die Testmethode",
  description:
    "Ein 7-Schritte-Protokoll für das Lieblingsessen jedes Mii in Tomodachi Life: 48 Speisen, 8 Kategorien, Affinitäts-Startwerte je Gruppe.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Essen", "Persönlichkeit", "Anleitungen"],
  blocks: [
    {
      type: "p",
      text: "Jeder Mii in Tomodachi Life trägt zwei verborgene Essens-Zuweisungen in sich: ein zufällig erzeugtes Lieblingsessen und ein zufällig erzeugtes unbeliebtes Essen. Da das Spiel Ihnen keinen der beiden Werte jemals zeigt, ist der einzige zuverlässige Weg zu wissen, was ein bestimmter Mii liebt, ihn zu füttern und die Reaktion zu beobachten – und am sparsamsten gelingt das, wenn Sie mit den Speisen beginnen, die seine Persönlichkeitsgruppe bevorzugt. Diese Anleitung verwandelt die Idee in ein wiederholbares Protokoll: wie die Datenbank mit 48 Speisen hinter unserem [Essenschart](/de/tomodachi-life-food-chart) aufgebaut ist, wie die fünf Reaktionsstufen funktionieren, was das auf Community-Schätzungen beruhende Affinitätsmodell für jede der vier Persönlichkeitsgruppen vorhersagt und welche siebenstufige Testschleife Rätselraten in eine protokollierte, reproduzierbare Suche verwandelt. Jede Zahl im Folgenden stammt aus den eigenen Datendateien dieser Website, sodass Sie die gesamte Methode von Hand nachvollziehen können.",
    },
    { type: "h2", text: "Warum Lieblingsessen auf Ihrer Insel wichtig sind" },
    {
      type: "p",
      text: "Einem Mii sein Lieblingsessen zu geben, erzeugt die stärkste positive Reaktion im Essens-System des Spiels, und diese Reaktion verdient es, eingeplant zu werden. Community-Wikis und langjährige Spielerberichte beschreiben den Lieblingsessen-Moment als eine der dramatischsten Glücksanimationen auf der Insel: Der Mii jubelt, seine Stimmung springt sichtbar nach oben, und ein zufriedener Bewohner zeigt sich bei den sozialen Ereignissen, die Freundschaften, Romanzen und Anträge vorantreiben, eher lächelnd. Das unbeliebte Essen bewirkt das Gegenteil – eine klar negative Reaktion. Wenn Sie beide verborgenen Zuweisungen kennen, erledigen Sie damit zwei Aufgaben auf einmal: Sie erhalten einen verlässlichen täglichen Glückshebel, und Sie vermeiden es, versehentlich das eine Gericht zu servieren, das die Stimmung verdirbt.",
    },
    {
      type: "p",
      text: "Es gibt einen zweiten, weniger offensichtlichen Grund, nach Lieblingsessen zu suchen: Das Testen von Essen ist eine der wenigen Insel-Aktivitäten, die saubere Informationen pro Mii liefert. Jede Fütterung ist ein kontrolliertes Experiment – ein Bewohner, eine Speise, eine beobachtbare Reaktion – und der Wortschatz der Reaktionen ist klein genug, um ihn mit einem einzigen Tipp zu protokollieren. Sobald ein Lieblingsessen bestätigt und notiert ist, fallen spätere Entscheidungen über diesen Bewohner leichter: wer bei Ihren täglichen Runden die guten Sachen bekommt, welche Reaktionen Sie bei der Planung der [Kompatibilität](/de/tomodachi-life-compatibility) erwarten können und welche Speisen vom Esstisch fernzuhalten sind. Im Rest dieser Anleitung geht es darum, dieses Experiment günstig zu machen – weniger Fütterungen pro bestätigtem Lieblingsessen und null verlorene Notizen.",
    },
    { type: "h2", text: "Der Suchraum: 8 Kategorien, 48 Speisen, 16 häufige Lieblinge" },
    {
      type: "p",
      text: "Ihr Suchraum besteht aus genau 48 Speisen, organisiert in 8 Kategorien – Getränke, Desserts, Bonbons, Snacks, Hauptgerichte, Obst, Gemüse und Sonstiges – und genau dieses Gefüge zu kennen macht effizientes Testen möglich. Die Datenbank ist diejenige hinter dem [Essenschart](/de/tomodachi-life-food-chart). Jeder Eintrag trägt drei Eigenschaften, die für das Protokoll zählen: eine stabile `id`, an der sich der Tracker orientiert, eine Kategorie und ein `commonFavorite`-Flag, das die 16 Einträge kennzeichnet, die nach Beobachtung der Community am häufigsten als Lieblingsessen landen. Die vollständige Aufschlüsselung:",
    },
    {
      type: "table",
      headers: ["Kategorie", "Speisen", "Häufige Lieblinge", "Beispiel-Speisen"],
      rows: [
        ["Getränke", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Desserts", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Bonbons", "5", "2", "Chocolate, Candy, Licorice"],
        ["Snacks", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Hauptgerichte", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Obst", "5", "1", "Apple, Banana, Melon"],
        ["Gemüse", "4", "0", "Carrot, Broccoli, Salad"],
        ["Sonstiges", "2", "0", "Boba Tea, Sundae"],
        ["Gesamt", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Zwei strukturelle Details springen aus dieser Tabelle ins Auge. Erstens sind die großen Kategorien `main` (10 Einträge) und `drink` (9 Einträge), weshalb ein blinder Brute-Force-Durchlauf den Großteil seiner Fütterungen dort verbrennt – ein Protokoll, das eine große Kategorie zurückstellen kann, spart echte Spieltage. Zweitens ballen sich die 16 `commonFavorite`-Einträge in den Publikumslieblings-Plätzen: Cola, Juice und Soda unter den Getränken; Cake, Ice Cream, Donut und Cookie unter den Desserts; Pizza, Hamburger, Sushi und Curry unter den Hauptgerichten. Diese Flags sind gute frühe Testsonden, noch bevor die Persönlichkeit ins Spiel kommt. Die beiden `other`-Einträge – Boba Tea und Sundae – sind das Nischen-Ende der Liste und genau die Stelle, an der eine Persönlichkeitsgruppe gern zuerst hinschaut.",
    },
    { type: "h2", text: "Wie Reaktionen funktionieren: fünf Stufen und ein verborgenes Paar" },
    {
      type: "p",
      text: "Jede Fütterung mündet in eine von fünf Reaktionsstufen – `love`, `like`, `neutral`, `dislike` oder `hate` – und jede Stufe ist im Spiel eine eigene, beobachtbare Animation. Die Fünf-Stufen-Skala ist zugleich der Wortschatz unseres Trackers: Jede Speisenzeile trägt fünf kompakte Protokoll-Buttons, einen pro Stufe (♥ für Liebt es, ▲ für Gefällt, – für Neutral, ▼ für Gefällt nicht, ✕ für Hasst es), sodass das Festhalten eines Ergebnisses nur einen Tipp erfordert. Die Skala ist bewusst grob gewählt – fein genug, um zwei positive Speisen gegeneinander zu ordnen, grob genug, dass Sie nie im Zweifel sind, welche Stufe Sie gerade gesehen haben.",
    },
    {
      type: "p",
      text: "Unter der Haube ordnet das Modell der Website jeder Speise für jede Persönlichkeitsgruppe einen Affinitäts-Score von `0–100` zu, und eine feste Werteband-Regel wandelt einen Score in eine vorhergesagte Stufe um: `90` und höher wird auf `love` abgebildet, `75–89` auf `like`, `40–74` auf `neutral`, `25–39` auf `dislike` und alles unter `25` auf `hate`. Diese Wertebänder dienen allein der Vorhersage. Sobald das tatsächliche Lieblingsessen eines Mii bestätigt ist, greift das Modell direkt ein: Das Lieblingsessen wird auf `love` erzwungen und das unbeliebte Essen auf `hate`, egal, was die Heuristik sagt. Diese Überschreibung spiegelt das echte Verhalten des Spiels – die verborgene Zuweisung schlägt immer die Persönlichkeit, und genau deshalb existiert das Testen.",
    },
    { type: "h2", text: "Was das Modell für jede Persönlichkeitsgruppe vorhersagt" },
    {
      type: "p",
      text: "Die vier Persönlichkeitsgruppen – **Gruppe Gesellig**, **Gruppe Selbstsicher**, **Gruppe Unabhängig** und **Gruppe Umgänglich** – erhalten jeweils eine eigene Rangfolge über die acht Kategorien, und genau diese Rangfolge ist Ihre Testreihenfolge. Die Matrix unten ist die vollständige Baseline der Community-Schätzung aus der Datendatei der Website; lesen Sie eine Spalte von oben nach unten, und Sie lesen den vorgeschlagenen Speiseplan dieser Gruppe:",
    },
    {
      type: "table",
      headers: ["Kategorie", "Gruppe Gesellig", "Gruppe Selbstsicher", "Gruppe Unabhängig", "Gruppe Umgänglich"],
      rows: [
        ["Getränke", "90", "70", "60", "75"],
        ["Desserts", "85", "65", "70", "80"],
        ["Bonbons", "95", "55", "60", "75"],
        ["Snacks", "80", "75", "70", "85"],
        ["Hauptgerichte", "65", "90", "60", "90"],
        ["Obst", "75", "70", "75", "80"],
        ["Gemüse", "60", "65", "80", "85"],
        ["Sonstiges", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Vier klare Speisepläne zeichnen sich ab. Miis der **Gruppe Gesellig** – der Anführer, der Unterhalter, der Trendsetter und der Optimist – erreichen ihre Höchstwerte bei Bonbons (`95`), Getränken (`90`) und Desserts (`85`): ein energiegeladener, partyorientierter Hang zum Süßen. Miis der **Gruppe Selbstsicher** – Planer, Abenteurer, Macher, Charmeur – erreichen ihre Höchstwerte bei Hauptgerichten (`90`), dem statusorientierten Restaurant-Ende der Liste. Miis der **Gruppe Unabhängig** – Künstler, Freigeist, Denker, Einzelgänger – sind der interessante Fall: Ihre Top-Scores gehören den Nischen-Einträgen `other` (`85`) und dem Gemüse (`80`), weshalb Boba Tea und Sundae überhaupt einen Platz in der Datenbank verdienen. Miis der **Gruppe Umgänglich** – Träumer, Herzensmensch, Sanftmütiger, Kumpel – bevorzugen die bodenständige Seite: Hauptgerichte (`90`), Snacks (`85`) und Gemüse (`85`). Die Reaktionsvorschau des Charts zieht aus jeder Gruppe einen Bewohner als Stichprobe – einen Anführer, einen Macher, einen Denker und einen Kumpel –, sodass Sie alle vier Speisepläne nebeneinander vergleichen können. Wie ein Mii überhaupt in eine dieser Gruppen einsortiert wird, erfahren Sie in unserer [Anleitung zum MBTI-Mapping](/de/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Eine ehrliche Eigenschaft der Matrix: Jede Zelle liegt zwischen `55` und `95`, das heißt, die Heuristik allein kann niemals mehr vorhersagen als `love`, `like` oder `neutral`. Die beiden negativen Stufen werden niemals von Persönlichkeits-Affinität erzeugt. In der Praxis stammen negative Reaktionen aus der zweiten verborgenen Zuweisung – dem unbeliebten Essen, das genau so zufällig ist wie das Lieblingsessen. Die Persönlichkeit sagt Ihnen, wo Sie mit der Suche nach dem Positiven anfangen können; wo das Negative versteckt ist, verrät Ihnen allein das Testen.",
    },
    { type: "h2", text: "Das Testprotokoll: sieben Schritte bis zum bestätigten Lieblingsessen" },
    {
      type: "p",
      text: "Das Protokoll findet ein Lieblingsessen mit so wenigen Fütterungen wie möglich, indem es die stärksten Kategorien der Gruppe zuerst testet, jedes Ergebnis protokolliert und Kategorien ausdünnt, sobald Beweise eintreffen. Sie können es vollständig im [Tracker des Essenscharts](/de/tomodachi-life-food-chart) ausführen, der Ihre Checkliste über Sitzungen hinweg speichert.",
    },
    {
      type: "ol",
      items: [
        "**Ermitteln Sie die Persönlichkeitsgruppe des Mii.** Schlagen Sie den Bewohner im [Persönlichkeitschart](/de/tomodachi-life-personality-chart) oder im [MBTI-Mapping](/de/tomodachi-life-mbti) nach und notieren Sie die Zugehörigkeit: Gruppe Gesellig, Gruppe Selbstsicher, Gruppe Unabhängig oder Gruppe Umgänglich. Für Essen zählt allein die Gruppe – der Subtyp (etwa Optimist gegenüber Trendsetter) verändert die Affinitätsmatrix nicht.",
        "**Ziehen Sie die Top-5-Startkandidaten der Gruppe.** Der Empfehlungsbereich des Charts sortiert alle 48 Speisen nach der Affinität der gewählten Gruppe und zeigt die fünf höchsten. Für einen Mii der Gruppe Gesellig sind das alle fünf Bonbon-Einträge bei `95`; für einen Mii der Gruppe Umgänglich beginnt der Bereich mit Hauptgerichten bei `90`. Diese fünf Speisen sind Ihre erste Sitzung.",
        "**Füttern Sie immer nur einen Kandidaten, zuerst den mit der höchsten Affinität.** Eine Speise pro Fütterung hält die Beweislage sauber – im Schnelldurchlauf überreichte Geschenke verwischen, welcher Eintrag welche Reaktion ausgelöst hat. Sehen Sie sich die Animation an, ordnen Sie sie auf der Fünf-Stufen-Skala ein und gehen Sie erst dann zum nächsten Kandidaten über.",
        "**Protokollieren Sie jedes Ergebnis sofort.** Tippen Sie in der Zeile der Speise auf den passenden Reaktions-Button. Der Tracker speichert die Checkliste im `localStorage` unter dem Schlüssel `lifesimgrid-food-tracker`, sodass getestete Speisen, ihre protokollierten Reaktionen und der Fortschrittszähler Seiten-Neuladungen und Browser-Neustarts überdauern – kein Konto, keine Synchronisierung, keine verlorenen Notizen.",
        "**Bestätigen Sie den Gewinner, sobald Sie die stärkste Reaktion sehen.** Markieren Sie diese Speise im Tracker als `love` und legen Sie sie oben im Chart in der Auswahl als Lieblingsessen des Mii fest. Von da an erzwingt der Chart für diese Speise `love`, unabhängig davon, was die Heuristik vorhersagen würde, und das Lieblingsessen steht fest.",
        "**Kommt eine Kategorie flach zurück, streichen Sie sie und wechseln Sie zur nächststärksten der Gruppe.** Eine Serie von `neutral`-Reaktionen über die Einträge einer Kategorie ist ein Beweis dafür, dass das Lieblingsessen anderswo zu finden ist. Bewahren Sie `like`-Ergebnisse als Rückfalloptionen auf – eine gemochte Speise ist nicht das Lieblingsessen, aber dennoch eine verlässliche tägliche Wahl. Arbeiten Sie die Affinitätsmatrix Kategorie für Kategorie ab, bis der Gewinner erscheint.",
        "**Protokollieren Sie das unbeliebte Essen beiläufig mit und setzen Sie zwischen Miis zurück.** Das unbeliebte Essen taucht beim gewöhnlichen Testen als stärkste negative Reaktion auf – erfassen Sie es auf dieselbe Weise und heften Sie es in der Auswahl fest, damit der Chart dafür `hate` erzwingt. Wenn Sie den Bewohner wechseln, leeren Sie den Tracker mit einem einzigen Button (oder nutzen Sie ein separates Browser-Profil), denn die Checkliste wird pro Browser gespeichert, nicht pro Mii.",
      ],
    },
    {
      type: "p",
      text: "Die absolute Obergrenze des Protokolls sind 48 Fütterungen – die gesamte Datenbank. Die Reihenfolge, bei der die Gruppe zuerst kommt, existiert, damit Sie sich dieser Grenze fast nie nähern. Die vollständige Abdeckung der zwei führenden Kategorien einer Gruppe kostet höchstens 15 Fütterungen (Hauptgerichte und Snacks umfassen für Miis der Gruppen Umgänglich und Selbstsicher zusammen 15 Einträge) und nur 6 für einen Mii der Gruppe Unabhängig, dessen bevorzugte Kategorien `other` und Gemüse zusammen nur 6 Einträge enthalten. Das sind Startpunkt-Erwartungen, keine Garantien – die verborgene Zuweisung ist zufällig, und ein Bewohner mit Pech kann Sie tiefer in die Matrix treiben.",
    },
    { type: "h2", text: "Praxisbeispiel: einen Mii der Gruppe Gesellig durch die Schleife führen" },
    {
      type: "p",
      text: "Ein Mii der Gruppe Gesellig – sagen wir ein Trendsetter – sollte zuerst mit Bonbons getestet werden, und der Empfehlungsbereich stimmt dem zu: alle fünf Bonbon-Einträge bei Affinität `95`, während die neun Getränke bei `90` warten. Hier ist eine realistische Sitzung:",
    },
    {
      type: "ul",
      items: [
        "Fütterungen 1–5 – Chocolate, Gum, Caramel, Licorice, Candy: Chocolate landet als klares `like`, Candy als weiteres `like`, der Rest als `neutral`. Keine Reaktion der höchsten Stufe, also fällt die Kategorie Bonbons raus – und weil die erste Sitzung zufällig die gesamte Bonbon-Kategorie abdeckt, hat sie diese mit fünf Fütterungen vollständig eliminiert.",
        "Fütterungen 6–8 – Cola, Juice, Soda: alle `neutral`. Drei Getränke aus den häufigen Lieblingen hintereinander ohne Reaktion sind ein schwacher Beweis gegen die gesamte Getränke-Kategorie mit ihren 9 Einträgen, also parkt der Spieler die sechs ungetesteten Getränke (Coffee, Tea, Milk, Water, Beer, Sake) und springt lieber über die Ebenen, statt sie kleinteilig durchzuarbeiten.",
        "Fütterungen 9–10 – Cake, Ice Cream: Cake gibt `neutral`, und Ice Cream erzeugt die unverkennbar stärkste positive Reaktion. Das ist das Lieblingsessen.",
        "Bestätigung – Ice Cream kommt in die Lieblingsessen-Auswahl, der Chart erzwingt von nun an dafür `love`, und der Fortschrittszähler zeigt 10 von 48 getesteten Speisen – rund 21 % der Datenbank für einen bestätigten Gewinner.",
      ],
    },
    {
      type: "p",
      text: "Zehn Fütterungen brachten ein bestätigtes Lieblingsessen, eine vollständig eliminierte Kategorie, eine geparkte Kategorie und zwei protokollierte Rückfall-Speisen hervor, die der Spieler an gewöhnlichen Tagen weiterhin servieren kann. Beachten Sie, was das Protokoll nie angefasst hat: die Kategorie `main` mit ihren 10 Einträgen und die Kategorie `vegetable` mit ihren 4 Einträgen, die zwei schwächsten Affinitäten eines Mii der Gruppe Gesellig (`65` und `60`). Das unbeliebte Essen ist noch unbekannt – es ist genauso zufällig wie das Lieblingsessen –, deshalb hält der Spieler an normalen Inseltagen Ausschau nach einer starken negativen Reaktion und heftet sie als `hate` in der Auswahl fest, sobald sie auftritt. Führen Sie dieselbe Schleife mit einem Mii der Gruppe Umgänglich aus, ändert sich nur der Einstiegspunkt: Der Empfehlungsbereich würde mit Hauptgerichten und Snacks beginnen statt mit Bonbons.",
    },
    { type: "h2", text: "Warum Lieblingsessen zufällig sind – und warum Anleitungen mit festen Antworten scheitern" },
    {
      type: "p",
      text: "Jede Anleitung, die für eine bestimmte Persönlichkeit ein festes Lieblingsessen abdruckt, beschreibt einen einzelnen Spielstand, nicht das Spiel. Die Datendatei hinter unserem Chart benennt die Situation deutlich: Tomodachi Life veröffentlicht keine offizielle Essens-Reaktionsmatrix, und jeder Mii erhält ein zufällig erzeugtes Lieblingsessen und ein zufällig erzeugtes unbeliebtes Essen. Die Zufallszuweisung gilt pro Bewohner, nicht pro Persönlichkeit – zwei Miis mit identischer Persönlichkeit, identischem Namen und sogar identischen Editor-Slidern können unterschiedliche verborgene Lieblingsessen tragen.",
    },
    {
      type: "p",
      text: "Diese eine Tatsache formt um, was eine nützliche Anleitung überhaupt sein kann. Eine Nachschlagetabelle kann nicht funktionieren, weil die Antwort keine Funktion von irgendetwas ist, das Sie am Mii ablesen können. Funktionieren kann eine Suchstrategie: eine Reihenfolge, die statistisch wahrscheinlichere Kandidaten zuerst platziert, ein Protokollierungssystem, das nie ein Ergebnis verliert, und eine Eliminierungsregel, die Kategorien ausdünnt, sobald Beweise eintreffen. Genau das liefert die Affinitätsmatrix mit vier Gruppen – Startpunkte, keine Antworten –, und genau deshalb liefert unser [Essenschart](/de/tomodachi-life-food-chart) einen dauerhaften Tracker statt einer Tabelle behaupteter Lieblingsessen. Begegnen Sie jeder Website, die feste Lieblingsessen pro Persönlichkeit verspricht, wie einem Horoskop: unterhaltsam, unfalsifizierbar und keine Hilfe für Ihre tatsächliche Insel.",
    },
    { type: "h2", text: "Grenzen des Modells (lesen Sie diesen Abschnitt)" },
    {
      type: "p",
      text: "Die Affinitätszahlen in dieser Anleitung sind eine Community-Schätzung, keine aus dem Spiel extrahierten Daten – Nintendo hat die Interna des Essens-Systems nie veröffentlicht. Die Presets sind ausdrücklich so abgestimmt, dass jede Gruppe über die Kategorien hinweg eine eigene Rangfolge zeigt, denn eine eigene Rangfolge macht eine Empfehlung im Stil „welche Speise zuerst probieren“ überhaupt erst möglich. Diese Abstimmung ist eine Modellierungsentscheidung. Sie nähert die Community-Beobachtung eng genug an, um Ihre Tests sinnvoll zu ordnen, und wie alle Modelle liegt sie in irgendeinem Punkt falsch.",
    },
    {
      type: "p",
      text: "Drei Einschränkungen verdienen Ihre Aufmerksamkeit. Erstens bedeutet die Werteband-Regel, dass das Modell nur bis hinunter zu `neutral` vorhersagen kann – jeder Preset-Wert liegt bei `55` oder höher –, sodass negative Reaktionen immer Überraschungen aus der verborgenen Zuweisung des unbeliebten Essens sind, niemals Vorhersagen. Zweitens ist die Datenbank mit 48 Einträgen eine kuratierte Auswahl von Speisen, die über die Tomodachi-Life-Titel hinweg beobachtet wurden, nicht eine vollständige In-Game-Speisenliste; wenn eine Fütterung eine Reaktion hervorbringt, die Sie im Chart nicht finden, protokollieren Sie die nächstliegende Entsprechung und machen weiter. Drittens speichert der Tracker pro Browser eine einzige Checkliste unter einem `localStorage`-Schlüssel, sodass er jeweils nur einen aktiven Mii führt – leeren Sie ihn zwischen den Bewohnern oder pflegen Sie ein Browser-Profil pro Inselbewohner, wenn Sie mehreren parallel nachjagen. Nichts davon ändert das Kernergebnis: eine evidenzbasierte Aufzeichnung pro Mii darüber, was jeder Bewohner tatsächlich liebt. Das Modell entscheidet, wo Sie anfangen; Ihre Fütterungen entscheiden, was Sie glauben.",
    },
    { type: "h2", text: "Probieren Sie das Protokoll selbst aus" },
    {
      type: "ul",
      items: [
        "[Essenschart & Tracker](/de/tomodachi-life-food-chart) – die vollständige Datenbank mit 48 Speisen, der Empfehlungsbereich pro Gruppe und die dauerhafte Checkliste getesteter Speisen.",
        "[Persönlichkeitschart](/de/tomodachi-life-personality-chart) – die Referenz mit 16 Typen und farbcodierten Gruppen, für Schritt 1 des Protokolls.",
        "[MBTI-Mapping](/de/tomodachi-life-mbti) – stöbern Sie per Vier-Buchstaben-Code in Ihren Bewohnern, falls Sie Ihre Insel so verwalten.",
        "[Kompatibilitätsrechner](/de/tomodachi-life-compatibility) – paaren Sie zwei Bewohner und zerlegen Sie die Romantik- und Freundschaftswerte, sobald ihre Lieblingsessen protokolliert sind.",
      ],
    },
    {
      type: "callout",
      text: "Diese Essens-Anleitung ist eine von Fans erstellte Interpretation zu Unterhaltungs- und Planungszwecken und steht in keiner Verbindung zu Nintendo oder The Myers-Briggs Company und wird von beiden nicht unterstützt. MBTI und Nintendo sind eingetragene Marken ihrer jeweiligen Inhaber.",
    },
  ],
};
