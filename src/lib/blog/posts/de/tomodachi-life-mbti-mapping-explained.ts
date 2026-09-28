/**
 * LifeSimGrid — Blogbeitrag (de): Wie die 16 Tomodachi-Life-Persönlichkeiten auf MBTI abgebildet werden
 *
 * Deutsche Übersetzung von posts/tomodachi-life-mbti-mapping-explained.ts,
 * inhaltlich verankert im eigenen Modell der Website:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Tomodachi Life: 16 Persönlichkeiten als MBTI",
  description:
    "Die Methodik unserer Tomodachi-Life-MBTI-Zuordnung: Schieberegler-Bänder, Gruppenlogik, Buchstaben-Ableitung und die INFP-Anomalie.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Persönlichkeit", "Ratgeber"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life gibt jedem Mii eine von 16 Persönlichkeiten, und welche es am Ende wird, entscheidet das Spiel über vier verborgene Schieberegler im Mii-Editor. Unsere [MBTI-Zuordnung](/de/tomodachi-life-mbti) ist ein Community-Schätzmodell, das diese vier Schieberegler in einen vierbuchstabigen Code nach Myers-Briggs-Art übersetzt. Dieser Leitfaden erklärt die gesamte Pipeline genau so, wie sie auf dieser Website läuft — die Band-Schwellenwerte, die Gruppen-Auswahllogik, die Ableitung der Buchstaben und den einen Fall, in dem die Zuordnung eine überraschende Kollision erzeugt. Jede Zahl weiter unten stammt aus demselben Modell, das auch unseren [Persönlichkeitsrechner](/de/tomodachi-life-personality-calculator) und das [16-Typen-Chart](/de/tomodachi-life-personality-chart) antreibt — Sie können also jedes Ergebnis von Hand nachvollziehen.",
    },
    { type: "h2", text: "Die vier Schieberegler, die alles entscheiden" },
    {
      type: "p",
      text: "Wenn Sie ein Mii registrieren, lässt Sie das Spiel vier Persönlichkeitsachsen feinjustieren. Verschiedene Fan-Communities geben ihnen leicht unterschiedliche Namen; auf dieser Website nennen wir sie **Bewegung**, **Sprache**, **Energie** und **Denken**, und jede davon ist ein kontinuierlicher Wert von `0` bis `100`. Keine der 16 Persönlichkeiten ist über einen einzigen Schieberegler allein erreichbar — die Persönlichkeit ist ein **Muster** über alle vier Achsen hinweg, weshalb sich zwei Miis völlig unterschiedlich anfühlen können, obwohl sie einen Schiebereglerwert teilen.",
    },
    {
      type: "p",
      text: "**Bewegung** reicht von langsam bis schnell. Ein Mii mit hoher Bewegung überquert die Insel mit sichtbar weniger Schritten, klopft von sich aus an Türen und erscheint in Gruppenszenen meist als Erstes. **Sprache** reicht von sanft bis direkt. Direkte Miis geben unverblümte Antworten, gestehen Gefühle früh und setzen in Streitereien die schärferen Sätze durch. **Energie** reicht von praktisch bis vorstellungsstark — praktische Miis beschäftigen sich mit dem, was unmittelbar vor ihnen liegt; vorstellungsstarke Miis tagträumen, schlagen neue Aktivitäten vor und reagieren stark auf alles Neue. **Denken** reicht von flexibel bis strukturiert: Strukturierte Miis halten an Routinen fest, bewahren geordnete Ansichten und führen Buch.",
    },
    {
      type: "p",
      text: "Die vier Achsen wurden nicht zufällig gewählt. Jede entspricht genau einem Buchstaben des MBTI-Codes, und nur das macht eine saubere Zuordnung aller 16 Typen überhaupt möglich. Bevor es so weit ist, muss das Modell allerdings vier kontinuierliche Werte auf eine von 16 diskreten Persönlichkeiten verdichten — und das geschieht in drei Schritten: Bänder, Gruppe, dann Untertyp.",
    },
    { type: "h2", text: "Schritt 1: Jeder Schieberegler wird zu einem von drei Bändern" },
    {
      type: "p",
      text: "Der erste Schritt quantisiert jeden Schieberegler in ein niedriges, mittleres oder hohes Band. Die Schwellenwerte sind für alle vier Schieberegler gleich festgelegt:",
    },
    {
      type: "table",
      headers: ["Band", "Schiebereglerwert", "Bedeutung"],
      rows: [
        ["Niedrig", "`0 – 33`", "Das linke Ende der Achse (langsam, sanft, praktisch, flexibel)"],
        ["Mittel", "`34 – 66`", "Keine starke Neigung in eine der beiden Richtungen"],
        ["Hoch", "`67 – 100`", "Das rechte Ende der Achse (schnell, direkt, vorstellungsstark, strukturiert)"],
      ],
    },
    {
      type: "p",
      text: "Drei Bänder pro Schieberegler über vier Schieberegler hinweg ergeben `3 × 3 × 3 × 3 = 81` mögliche Schieberegler-Zellen. Das sind deutlich mehr als die 16 Persönlichkeiten, die das Spiel tatsächlich anbietet — weshalb ein zweiter Schritt nötig ist, der ähnliche Zellen zusammenführt, und weshalb mehrere unterschiedliche Schieberegler-Kombinationen bei derselben Persönlichkeit landen können. Falls Sie jemals der festen Überzeugung waren, dass zwei Ihrer Miis unterschiedliche Schieberegler-Positionen, aber dieselbe Persönlichkeit hatten, ist das der Grund: Die 16 möglichen Ergebnisse des Spiels sind gröber als seine Schieberegler-Eingaben.",
    },
    { type: "h2", text: "Schritt 2: Die Bänder wählen eine von vier Gruppen" },
    {
      type: "p",
      text: "Die 16 Persönlichkeiten sind in vier Gruppen zu je vier Typen gegliedert: **Gruppe Gesellig**, **Gruppe Selbstsicher**, **Gruppe Unabhängig** und **Gruppe Umgänglich**. Der zweite Schritt bestimmt die Gruppe, indem er die Bänder als Signale liest. Die eigentliche Arbeit erledigen zwei abgeleitete Werte:",
    },
    {
      type: "ul",
      items: [
        "**Aktiv-Signal** — die Summe der Bewegungs-, Sprach- und Energie-Bänder (eine Zahl von `0` bis `6`). Hohe Werte bedeuten, dass das Mii zum Geselligen und Energiegeladenen neigt.",
        "**Intro-Signal** — allein das Denk-Band, mit umgekehrter Polarität gelesen: Ein **hohes** Denk-Band bedeutet, dass das Mii zum Zurückhaltenden und Introvertierten neigt.",
      ],
    },
    {
      type: "p",
      text: "Anschließend greifen die Regeln der Reihe nach als Kaskade. Ist das Intro-Signal hoch, während das Aktiv-Signal niedrig ist, landet das Mii in der **Gruppe Unabhängig** — der Heimat von Künstler, Freigeist, Denker und Einzelgänger. Ist das Aktiv-Signal sehr hoch (`4` oder mehr), ist das Mii gesellig: Liegt auch Sprache im hohen Band, fällt es in die **Gruppe Gesellig**, andernfalls in die **Gruppe Selbstsicher**. Ein mittleres Aktiv-Signal spaltet sich nach Bewegung — hohe Bewegung hält das Mii in der **Gruppe Gesellig**, alles Übrige rutscht in die **Gruppe Umgänglich**. Und ist das Aktiv-Signal niedrig, ohne dass ein starkes Intro-Signal hinzukommt, landet das Mii standardmäßig in der **Gruppe Umgänglich**. Die Reihenfolge der Kaskade ist wichtig: Ein introvertiertes, aber energiegeladenes Mii wird durch die erste zutreffende Regel aufgelöst, nicht durch Durchschnittsbildung.",
    },
    {
      type: "p",
      text: "Die beiden geselligen Gruppen und die beiden zurückhaltenden Gruppen sind keine willkürlichen Kategorien — sie fließen direkt in das Kompatibilitätsmodell der Website ein, wo sich Gesellig auf natürliche Weise mit Unabhängig paart und Selbstsicher mit Umgänglich. Mehr dazu weiter unten.",
    },
    { type: "h2", text: "Schritt 3: Eine zweite Auswertung bestimmt den Untertyp" },
    {
      type: "p",
      text: "Sobald die Gruppe feststeht, wählt eine zweite Auswertung derselben Bänder eines der vier Mitglieder der Gruppe aus. Jede Gruppe hat ihre eigenen Prioritätsregeln. In der Gruppe Gesellig erzeugen etwa hohe Energie zusammen mit hoher Sprache den **Unterhalter**; hohe Bewegung mit mindestens mittlerer Sprache ergibt den **Trendsetter**; ein mittleres oder höheres Denk-Band lenkt in Richtung **Anführer**; alles Übrige wird zum **Optimisten**. Die anderen drei Gruppen folgen mit anderen Prioritätsachsen demselben Muster — und genau das verleiht jedem Untertyp seine wiedererkennbare Silhouette.",
    },
    {
      type: "p",
      text: "Die vollständige Tabelle weiter unten listet alle 16 Persönlichkeiten mit ihrer Gruppe, ihrem MBTI-Code und ihrer Schieberegler-Signatur auf — der Vier-Achsen-Lesart, die der Code impliziert:",
    },
    {
      type: "table",
      headers: ["Persönlichkeit", "Gruppe", "MBTI", "Schieberegler-Signatur"],
      rows: [
        ["Anführer", "Gruppe Gesellig", "ESTJ", "Schnell · Direkt · Praktisch · Strukturiert"],
        ["Unterhalter", "Gruppe Gesellig", "ESFP", "Schnell · Sanft · Praktisch · Flexibel"],
        ["Trendsetter", "Gruppe Gesellig", "ENFP", "Schnell · Sanft · Vorstellungsstark · Flexibel"],
        ["Optimist", "Gruppe Gesellig", "ESFJ", "Schnell · Sanft · Praktisch · Strukturiert"],
        ["Planer", "Gruppe Selbstsicher", "INTJ", "Langsam · Direkt · Vorstellungsstark · Strukturiert"],
        ["Abenteurer", "Gruppe Selbstsicher", "ESTP", "Schnell · Direkt · Praktisch · Flexibel"],
        ["Macher", "Gruppe Selbstsicher", "ENTJ", "Schnell · Direkt · Vorstellungsstark · Strukturiert"],
        ["Charmeur", "Gruppe Selbstsicher", "ENTP", "Schnell · Direkt · Vorstellungsstark · Flexibel"],
        ["Künstler", "Gruppe Unabhängig", "INFP", "Langsam · Sanft · Vorstellungsstark · Flexibel"],
        ["Freigeist", "Gruppe Unabhängig", "INTP", "Langsam · Direkt · Vorstellungsstark · Flexibel"],
        ["Denker", "Gruppe Unabhängig", "ISTP", "Langsam · Direkt · Praktisch · Flexibel"],
        ["Einzelgänger", "Gruppe Unabhängig", "ISTJ", "Langsam · Direkt · Praktisch · Strukturiert"],
        ["Träumer", "Gruppe Umgänglich", "INFJ", "Langsam · Sanft · Vorstellungsstark · Strukturiert"],
        ["Herzensmensch", "Gruppe Umgänglich", "ISFJ", "Langsam · Sanft · Praktisch · Strukturiert"],
        ["Sanftmütiger", "Gruppe Umgänglich", "INFP", "Langsam · Sanft · Vorstellungsstark · Flexibel"],
        ["Kumpel", "Gruppe Umgänglich", "ISFP", "Langsam · Sanft · Praktisch · Flexibel"],
      ],
    },
    { type: "h2", text: "Wie jeder MBTI-Buchstabe abgeleitet wird" },
    {
      type: "p",
      text: "Weil jede Schieberegler-Achse einer MBTI-Dimension zugewiesen wurde, ist die Ableitung des vierbuchstabigen Codes nichts anderes als das direkte Auslesen der Schieberegler-Signatur. Buchstabe für Buchstabe:",
    },
    {
      type: "ol",
      items: [
        "**E oder I ← Bewegung.** Ein schnelles Mii ist extravertiert (E); ein langsames Mii ist introvertiert (I). Bewegung ist die einzige Achse, die den ersten Buchstaben bestimmt — das entspricht dem, was Spieler beobachten: Die Gehgeschwindigkeit ist das sichtbarste Persönlichkeitsmerkmal im Spiel.",
        "**S oder N ← Energie.** Ein praktisches Mii ist sensorisch (S); ein vorstellungsstarkes Mii ist intuitiv (N). Diese Achse steuert, wie das Mii auf neue Gegenstände, Ereignisse und Inselbewohner reagiert.",
        "**T oder F ← Sprache.** Ein direktes Mii ist denkend (T); ein sanftes Mii ist fühlend (F). Derselbe Schieberegler, der Streit scharf oder weich macht, entscheidet auch über den dritten Buchstaben.",
        "**J oder P ← Denken.** Ein strukturiertes Mii ist urteilend (J); ein flexibles Mii ist wahrnehmend (P). Miis, die Routinen lieben, tragen das J; Improvisierer tragen das P.",
      ],
    },
    {
      type: "p",
      text: "Beachten Sie, dass der Code vollständig durch die Vier-Achsen-Signatur bestimmt wird — Bewegungstempo, Energiestil, Sprechstil und Denkstruktur — und **nicht** durch die Gruppe. Die Gruppe ist ein fünftes Informationselement, und die Zuordnung braucht es, wie der nächste Abschnitt zeigt.",
    },

    { type: "h2", text: "Fragen, die Spieler zum Mapping stellen" },
    { type: "h3", text: "Ergeben identische Schieberegler immer dieselbe Persönlichkeit?" },
    { type: "p", text: "Ja — die Pipeline ist vollständig deterministisch. Dieselben vier Werte landen immer in denselben Bändern, in derselben Zelle der `81`, in derselben Gruppe und beim selben Sub-Typ. Zwei Miis mit identischen Persönlichkeitseinstellungen fallen immer identisch aus — auf dieser Seite und, nach allem, was Spieler über Jahre beobachten, auch im Spiel. Kippen kann ein scheinbar unveränderter Mii nur, wenn ein Wert eine Bandgrenze überquert — `33` auf `34` oder `66` auf `67`. Genau deshalb verdienen Grenzfälle einen zweiten Blick, bevor du deinen Inselplan festlegst." },
    { type: "h3", text: "Welcher der vier Schieberegler wiegt am schwersten?" },
    { type: "p", text: "**Bewegung** trägt das größte Gewicht. Sie ist die einzige Achse, die allein einen Buchstaben entscheidet (schnell ist E, langsam ist I), sie speist den Aktivitätswert mit, und sie entscheidet die Knappheit zwischen **Gesellig** und **Umgänglich**, wenn der Aktivitätswert mittelprächtig ist. **Denken** folgt knapp dahinter: Es treibt allein das Intro-Signal an, das stille, nach innen gerichtete Miis in die Gruppe Unabhängig lenkt, und steuert mehrere Sub-Typ-Entscheidungen. Sprache und Energie zählen — vor allem als Verstärker der anderen beiden." },
    { type: "h3", text: "Warum fühlt sich manches Ergebnis falsch an, obwohl die Regler plausibel wirken?" },
    { type: "p", text: "Fast immer wegen der Mittelbänder. Ein Regler zwischen `34` und `66` trägt kaum Information — das Modell liest ihn als neutral —, deshalb können zwei Miis, die im Spiel unterschiedlich wirken, identisch quantisiert werden und gleich herauskommen. Die Kaskadenreihenfolge verstärkt das: Die erste passende Regel gewinnt, sodass ein energetisch-freundlicher und ein energetisch-direkter Mii durch ein einziges Band getrennt sein können. Widerspricht eine Vorhersage dem Verhalten deines Miis im Spiel, glaube dem Verhalten und behandle den Code als das, was er ist: eine Näherung." },
    { type: "h3", text: "Verändert die Persönlichkeit das Verhalten eines Miis im Spiel?" },
    { type: "p", text: "Spielbeobachtung sagt: ja, in groben Zügen. Direkt sprechende Miis platzen mit Äußerungen heraus, wenn Streit ausbricht, und gestehen früh; fantasievolle Miis schlagen seltsame Aktivitäten vor; strukturierte Miis halten die Routinen durch, die das Spiel ihnen erlaubt. Was die Persönlichkeit nachweislich nicht tut, ist das Schicksal festschreiben — Freundschaftswerte, Geschenkhistorie und Zufallsereignisse liegen außerhalb dieses Systems. Genau deshalb liefern unsere Kompatibilitätswerte Herleitungen statt Versprechen." },
    { type: "h3", text: "Ist das derselbe MBTI-Test, den Menschen online machen?" },
    { type: "p", text: "Nein — und die Trennung ist wichtig. Der Myers-Briggs-Type-Indikator ist ein Fragebogen für echte Menschen; dieses Mapping ist eine Übersetzungsschicht zwischen dem Schieberegler-System eines Videospiels und dem Vier-Buchstaben-Wortschatz dieses Fragebogens. Die Buchstaben bedeuten auf Achsenebene dasselbe, aber ein Mii kann nicht introvertiert sein wie ein Mensch — es kann nur einen Reglerwert halten. Behandle den Code eines Miis als gemeinsame Kurzschrift für sein Schieberegler-Muster, nicht als psychologische Beurteilung der Figur und schon gar nicht des Besitzers." },
    { type: "h2", text: "Rückwärts genutzt: vom MBTI-Code zu den Schiebereglern" },
    { type: "p", text: "Die Tabelle funktioniert auch rückwärts — und das ist die Richtung, die die meisten Besucher eigentlich brauchen: Du kennst deinen eigenen MBTI-Code und suchst ein passendes Mii. Lies den Code als vier Reglerpositionen und stelle sie entsprechend ein:" },
    { type: "ol", items: [
      "**Erster Buchstabe → Bewegung.** E will Bewegung Richtung schnell (`67` oder höher); I Richtung langsam (`33` oder niedriger).",
      "**Zweiter Buchstabe → Energie.** S liegt am praktischen Ende (`33` oder niedriger); N am fantasievollen (`67` oder höher).",
      "**Dritter Buchstabe → Sprache.** T will direkt (`67` oder höher); F will sanft (`33` oder niedriger).",
      "**Vierter Buchstabe → Denken.** J will strukturiert (`67` oder höher); P will flexibel (`33` oder niedriger).",
    ] },
    { type: "p", text: "Ziele auf die Enden der Achsen, nicht auf die Mitte — Mittelbänder sind die schwache Stelle des Modells, wie der Abschnitt zu den Grenzen unten erklärt. Ein Code verlangt statt eines Reglers eine Entscheidung: [INFP](/de/tomodachi-life-mbti/infp) passt sowohl zum [Künstler](/de/tomodachi-life-personality/artist) als auch zum [Sanftmütiger](/de/tomodachi-life-personality/softie). Wähle die Zeile, deren Gruppe zum gewünschten Temperament passt — verschlossen **Unabhängig** für den Künstler, herzlich **Umgänglich** für den Sanftmütiger — und stelle die Regler auf die Signatur dieser Zeile." },
    { type: "h2", text: "Die INFP-Anomalie: 16 Persönlichkeiten, 15 Codes" },
    {
      type: "p",
      text: "Zählen Sie die MBTI-Spalte in der Tabelle oben nach, und Sie finden nur 15 eindeutige Codes. Zwei Persönlichkeiten — der **Künstler** und der **Sanftmütige** — werden beide auf [INFP](/de/tomodachi-life-mbti/infp) abgebildet. Das ist kein Tippfehler; es ist eine strukturelle Eigenschaft jeder 16-auf-16-Zuordnung, die über vier Achsen läuft.",
    },
    {
      type: "p",
      text: "Der Künstler und der Sanftmütige teilen exakt dieselbe Schieberegler-Signatur: langsam, sanft, vorstellungsstark und flexibel. Was sie voneinander trennt, ist die Gruppe. Der Künstler lebt in der Gruppe Unabhängig, wo das Modell diese Signatur als privaten, in die Innenwelt versunkenen Träumer liest. Der Sanftmütige lebt in der Gruppe Umgänglich, wo dieselbe Signatur zu einem gelassenen, offen Zuneigung zeigenden Bewohner wird. Auf das Spiel übertragen können Sie sich die beiden als dieselbe Vier-Achsen-Lesart in zwei unterschiedlichen sozialen Kostümen vorstellen — der eine wahrt Abstand, der andere sucht Nähe.",
    },
    {
      type: "p",
      text: "Die praktische Konsequenz: MBTI allein kann einen [Künstler](/de/tomodachi-life-personality/artist) nicht von einem [Sanftmütigen](/de/tomodachi-life-personality/softie) unterscheiden. Wenn Sie ein Insel-Aufgebot nach MBTI-Codes planen, denken Sie daran, dass INFP mehrdeutig ist, und prüfen Sie die Gruppe (oder die Persönlichkeitsseite), um festzustellen, welcher von beiden ein bestimmtes Mii tatsächlich ist. Jeder andere Code in der Tabelle wird auf genau eine Persönlichkeit abgebildet.",
    },
    { type: "h2", text: "Wie das Kompatibilitätsmodell dieselben Gruppen verwendet" },
    {
      type: "p",
      text: "Bei der Zuordnung bleibt es nicht beim bloßen Etikett — dieselbe Gruppenstruktur treibt unseren [Kompatibilitätsrechner](/de/tomodachi-life-compatibility) an. Das Modell bewertet ein Paar auf zwei Skalen, Romantik und Freundschaft, und beide Skalen sind aus denselben Bausteinen aufgebaut, damit die Rechnung nachprüfbar bleibt:",
    },
    {
      type: "ul",
      items: [
        "**Tierkreis-Term (50 %).** Eine symmetrische 12 × 12 Tierkreis-Matrix liefert für jedes beliebige Zeichenpaar eine Basis-Chemie-Punktzahl zwischen `40` und `90`. Paare mit demselben Zeichen und klassische Element-Paare liegen am oberen Ende dieses Bereichs.",
        "**Basis-Term (50 %).** Ein flacher Wert von `50`, der den neutralen Ausgangspunkt des Modells darstellt, bevor die Persönlichkeit einbezogen wird.",
        "**Persönlichkeits-Modifikatoren.** Sich ergänzende Gruppen (Gesellig mit Unabhängig oder Selbstsicher mit Umgänglich) addieren `+20` auf die Romantik. Zwei Miis aus derselben Gruppe verlieren `10` Romantik, gewinnen aber `+20` Freundschaft. Zwei Miis mit **exakt derselben** Persönlichkeit verlieren weitere `5` Romantik und gewinnen weitere `+10` Freundschaft.",
      ],
    },
    {
      type: "p",
      text: "Die Endpunktzahl ist die Summe der beiden Terme plus Modifikator, gerundet und auf `0 – 100` begrenzt. Die Formel ist bewusst einfach und ist dieselbe, die auch unser [Liebes-Matcher](/de/tomodachi-life-romance-matcher) verwendet: `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. Die Transparenz ist der springende Punkt — eine Zahl, die sich nicht zerlegen lässt, ist eine Zahl, der man nicht vertrauen kann, und zu jeder Punktzahl, die die Website anzeigt, gehört ihre Aufschlüsselung.",
    },
    {
      type: "callout",
      text: "Der Gruppen-Ergänzungsbonus bildet die konsistenteste Beobachtung der Community zu Beziehungen in Tomodachi Life ab: Paare mit entgegengesetztem Temperament (schnell mit langsam, direkt mit sanft) erzeugen die meisten Romantik-Ereignisse, während Paare aus derselben Gruppe die stabilsten Freundschaften hervorbringen. Es ist eine Modellierungsentscheidung, keine spielinterne Konstante.",
    },
    { type: "h2", text: "Probieren Sie das Modell selbst aus" },
    {
      type: "p",
      text: "Der schnellste Weg, die Pipeline zu verinnerlichen, besteht darin, die Schieberegler hin- und herzuschieben und zu beobachten, wie sich die Ausgaben verändern:",
    },
    {
      type: "ul",
      items: [
        "[Persönlichkeitsrechner](/de/tomodachi-life-personality-calculator) — stellen Sie die vier Schieberegler direkt ein und sehen Sie die vorhergesagte Persönlichkeit, die Gruppe und den MBTI-Code.",
        "[Persönlichkeitsübersicht](/de/tomodachi-life-personality-chart) — die vollständige Referenz aller 16 Typen mit farbcodierten Gruppen.",
        "[MBTI-Zuordnung](/de/tomodachi-life-mbti) — stöbern Sie von der MBTI-Seite aus: eine Seite pro Typ mit Schieberegler-Tendenzen und Kompatibilitäts-Chips.",
        "[Kompatibilitätsrechner](/de/tomodachi-life-compatibility) — paaren Sie zwei Miis und zerlegen Sie die Romantik- und Freundschaftswerte.",
      ],
    },
    { type: "h2", text: "Grenzen des Modells (lesen Sie diesen Abschnitt)" },
    {
      type: "p",
      text: "Nintendo hat den tatsächlichen Persönlichkeitsalgorithmus des Spiels nie veröffentlicht. Deshalb ist jede Aussage in diesem Leitfaden — die Band-Schwellenwerte, die Gruppen-Kaskade, die Buchstaben-Zuweisungen — eine Community-Schätzung, die aus Spielerbeobachtungen rückentwickelt wurde, nicht aus dem Code des Spiels extrahiert. Das Modell nähert die spielinternen Ergebnisse gut genug an, um für die Planung Ihres Insel-Aufgebots nützlich zu sein — aber es ist ein Modell, und wie alle Modelle liegt es in irgendeinem Punkt daneben.",
    },
    {
      type: "p",
      text: "Drei Vorbehalte sollten Sie im Hinterkopf behalten. Erstens sind Schieberegler im mittleren Band (`34 – 66`) die weiche Stelle des Modells: Kleine Änderungen nahe den Schwellenwerten können ein Band kippen lassen und die vorhergesagte Persönlichkeit ändern — behandeln Sie Ergebnisse nahe der Schwelle daher als vorläufig. Zweitens bedeutet die oben beschriebene INFP-Kollision, dass MBTI-basierte Planung Informationen verliert, die persönlichkeitsbasierte Planung bewahrt. Drittens hängen spielinterne Ergebnisse auch von Faktoren ab, die dieses Modell nicht berührt — Inselereignisse, die Geschenk-Historie und der Zufalls-Seed hinter den Reaktionen jedes Mii —; deshalb sind Kompatibilitäts-Punktzahlen Ausgangspunkte für Geschichten, keine Garantien dafür.",
    },
    {
      type: "callout",
      text: "Diese Zuordnung ist eine von Fans erstellte Interpretation für Unterhaltungs- und Planungszwecke und ist weder mit Nintendo oder der Myers-Briggs Company verbunden noch von ihnen befürwortet. MBTI und Nintendo sind eingetragene Marken ihrer jeweiligen Inhaber.",
    },
  ],
};
