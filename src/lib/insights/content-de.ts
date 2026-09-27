/**
 * LifeSimGrid — Deep-Dive Insights: German / de
 *
 * Von content-en.ts übersetzt; die Struktur ist ein exaktes Spiegelbild
 * (ui-Schlüssel, 16 Persönlichkeits-Schlüssel, Array-Längen und numerische
 * Parameter identisch mit der englischen Version).
 *
 * Terminologie-Konventionen (konsistent mit de.json):
 *   - Persönlichkeits-Anzeigenamen aus TomodachiLifeMbtiPage:
 *     Anführer / Unterhalter / Trendsetter / Optimist / Planer / Abenteurer /
 *     Macher / Charmeur / Künstler / Freigeist / Denker / Einzelgänger /
 *     Träumer / Herzensmensch / Sanftmütiger / Kumpel
 *   - Wellenformen und Presets wie im Voice Lab: Sägezahn, Rechteckwelle
 *   - Technische Begriffe bleiben Englisch: Web Audio API, Hz, Voice Lab
 *   - Angesprochen wird die Leserschaft per „du“
 */

import type { InsightLocaleContent } from "./types";

export const de: InsightLocaleContent = {
  ui: {
    sectionEyebrow: "Deep Dive",
    behaviorTitle: "So verhält sich {name} auf deiner Insel",
    apartmentTitle: "So richtest du das Apartment für {name} ein",
    foodTitle: "So fütterst du {name} richtig",
    foodTestFirstLabel: "Teste diese zuerst",
    foodDeprioritizeLabel: "Niedrigere Priorität",
    voiceTitle: "So klingt {name} im Voice Lab",
    voicePresetLabel: "Wellenform-Preset",
    voicePitchLabel: "Tonhöhe",
    voiceSpeedLabel: "Sprechtempo",
    pairingsTitle: "So harmoniert {name} mit anderen",
    romanceLabel: "Beste romantische Verbindung",
    friendLabel: "Beste Freundschaft",
    frictionLabel: "Erwarte Reibung mit",
    englishFallbackNote:
      "Dieser ausführliche Abschnitt ist derzeit nur auf Englisch verfügbar.",
    foodDisclaimer:
      "Lieblingsessen werden im Spiel pro Mii zufällig festgelegt. Diese Vorschläge sind geschätzte Ausgangspunkte der Community — bestätige sie durch eigenes Testen.",
  },
  personalities: {
    outgoing_leader: {
      behavior: [
        "Der Anführer ist die Persönlichkeit, die du als Erste in Bewegung siehst. Die schnelle Gehgeschwindigkeit bedeutet, dass dieser Mii den Apartmentblock in deutlich weniger Schritten durchquert als umgängliche Bewohner — und die Event-Skripte des Spiels spielen das bewusst aus: Anführer initiieren ständig Gruppenaktivitäten, melden sich freiwillig als Moderator für Insel-Events und gehören zu den Ersten, die bei einem anderen Bewohner an die Tür klopfen. Wenn auf der Insel ein Streit ausbricht, achte darauf, wer dazwischengeht — meist ist es ein Anführer, der entweder vermittelt oder die Lage anheizt.",
        "Der direkte Sprachstil ist das zweite Erkennungszeichen. Anführer reden selten um den heißen Brei: Begrüßungen sind knapp, Bitten kommen ohne Umschweife, und in Streitgesprächen sitzen ihre Sätze härter als bei einem Sanftmütigen. Genau diese Direktheit macht Anführer zu produktiven Inselbewohnern — sie gestehen Gefühle früh, machen einen Heiratsantrag ohne endloses Zögern und geben in den Frage-Mini-Events ungewöhnlich klare Antworten. Wenn du einen Mii willst, der Geschichten vorantreibt, statt auf sie zu warten, ist es dieser.",
      ],
      apartmentIntro:
        "Das Zimmer eines Anführers sollte wie das inoffizielle Hauptquartier der Insel wirken. Drei Konzepte, die zum Archetyp passen:",
      apartmentItems: [
        { name: "Der Kommandotisch", why: "Ein aufgeräumter Arbeitsplatz mit Lampe liest sich als „Bürgermeisterbüro“ — der visuelle Anker, den diese Persönlichkeit verdient." },
        { name: "Ehrenregal", why: "Trophäen und gerahmte Urkunden unterstreichen die natürliche Autorität und geben Besuchern etwas zum Bewundern." },
        { name: "Weltkarten-Teppich", why: "Kühne, geometrische Bodenmuster spiegeln die schnelle, entschiedene Energie eines Mii, der nie stillsteht." },
      ],
      foodIntro:
        "Gesellige Persönlichkeiten neigen in unserem Community-Modell deutlich zu Süßigkeiten, Getränken und Desserts — starte die Suche nach dem Lieblingsessen also in den süßen Regalen, bevor du dich den Hauptgerichten zuwendest.",
      foodTestFirst: ["Schokolade", "Kaugummi", "Cola", "Kuchen"],
      foodDeprioritize: ["Brokkoli", "Salat", "Reis"],
      foodTip:
        "Füttere pro Spieltag einen Artikel aus der Süßwaren-Kategorie und notiere die Reaktion. Anführer reagieren direkt — eine „Liebe“-Antwort ist unverkennbar: großer Sprung, Arme nach oben, keinerlei Zweifel.",
      voicePreset: "Sägezahn — Erwachsener Mann",
      voicePitchHz: 200,
      voiceSpeed: 1.1,
      voiceTip:
        "Halte die Tonhöhe im mittleren bis tiefen Bereich und pushe das Tempo leicht über 1,0x. Der leicht gehetzte Vortrag ist es, der die Energie eines beschäftigten Chefs verkauft; eine langsame Anführer-Stimme klingt stattdessen wie ein Macher.",
      romance: { partner: "Künstler", why: "Der klassische Funke aus Gesellig × Unabhängig: Die verträumte Unabhängigkeit des Künstlers spielt perfekt gegen die Entschiedenheit des Anführers, und ihre entgegengesetzten Gehgeschwindigkeiten lassen die beiden ständig aufeinander treffen." },
      friend: { partner: "Macher", why: "Zwei Tatmenschen im selben schnellen Tempo. Gelegentlich Gerangel darum, wer die Führung hat — aber die gemeinsame „Dinge erledigen“-Einstellung macht sie zum Power-Duo der Insel." },
      friction: { partner: "Kumpel", why: "Der treibende, planlose Lebensstil des Kumpels frustriert einen Mii, der alles durchplant. Erwarte häufige einseitige Vorträge, die der Kumpel fröhlich ignoriert." },
    },

    outgoing_entertainer: {
      behavior: [
        "Der Unterhalter ist die Stimmungsmaschine der Insel. Schnelle Gehgeschwindigkeit plus entspannter Gesichtsausdruck: Dieser Mii hüpft zwischen den Orten hin und her wie ein Reiseleiter, der seinen Job liebt — und das Spiel belohnt es, indem es Unterhalter überproportional oft in Musicals, Straßenvorführungen und Comedy-Sketches besetzt. Wenn ein ruhiger Nachmittag ein Event braucht, zieh einen Unterhalter hinein; das Ergebnis ist fast immer das lustigste.",
        "Ihr sanfter Sprachstil hält sie auch bei maximaler Lautstärke sympathisch. Unterhalter sind die Persönlichkeit, die einen Streit am ehesten mit einem Witz entschärft, statt Partei zu ergreifen, und sie passen ihren Ton jedem Gegenüber an — sprudelnd mit anderen Geselligen, weicher in Gesellschaft unabhängiger Bewohner. Romantisch gehen sie schnell vor, aber ohne viel Drama: Geständnisse kommen früh, und eine Abfuhr ist nach einer Szene schon wieder vergessen.",
      ],
      apartmentIntro:
        "Denk an die Künstlergarderobe, nicht ans Schlafzimmer. Die besten Unterhalter-Zimmer fühlen sich an wie ein Backstage-Bereich fünf Minuten vor Showtime:",
      apartmentItems: [
        { name: "Bühnenlampen-Ecke", why: "Eine helle Scheinwerfer-Stehlampe verwandelt eine Ecke sofort in eine „Bühne“ — perfekt für einen Mii, der jeden Raum als Auftrittsort behandelt." },
        { name: "Schallplatten- und Posterwand", why: "Musik-Memorabilia kommuniziert „Performer“ auf einen Blick und gibt Gästen ein Gesprächsthema." },
        { name: "Snack-Bar-Wagen", why: "Unterhalter sind geborene Gastgeber; ein Getränke-und-Süßigkeiten-Wagen bedeutet, dass die Party technisch gesehen immer in ihrem Zimmer stattfindet." },
      ],
      foodIntro:
        "Süß und sprudelnd führt die Gesellig-Affinitätsliste an, und keine Persönlichkeit passt besser zu Partyessen. Arbeite zuerst die Süßwaren- und Getränkekategorien ab — bei dieser Persönlichkeit zahlen sich Cola- und Schokolade-Tipps am häufigsten aus.",
      foodTestFirst: ["Bonbon", "Cola", "Eis", "Popcorn"],
      foodDeprioritize: ["Gurke", "Salat", "Sashimi"],
      foodTip:
        "Unterhalter reagieren auf alles theatralisch — vertraue also nicht allein auf die Lautstärke: Eine „Liebe“ ist eine komplette Jubel-Feier, während ein bloßes „Gefällt“ trotzdem begeistert aussieht. Hebe dir dein Notizbuch für die Sprünge mit Konfetti auf.",
      voicePreset: "Sägezahn — helles hohes Register",
      voicePitchHz: 420,
      voiceSpeed: 1.25,
      voiceTip:
        "Tonhöhe hoch, Tempo hoch. Der fast atemlose Vortrag ist der ganze Charakter: Ein Unterhalter bei 1,0x klingt wie ein Trendsetter, und bei 420 Hz+ mit 1,25x lacht die Pieps-Sprache praktisch zwischen den Wörtern.",
      romance: { partner: "Freigeist", why: "Der Unterhalter will ein Publikum; der Freigeist verweigert sich jeder Vorhersehbarkeit. Das Ergebnis ist die überraschendste Romanze der Insel — dauerhaftes Improvisieren, null Drehbuch." },
      friend: { partner: "Optimist", why: "Zwei unermüdlich positive Schnellgeher. Ihre Treffen produzieren selten Plot, aber die Freundschaft selbst ist unzerstörbar — ideal, um ein chaotisches Aufgebot zu stabilisieren." },
      friction: { partner: "Einzelgänger", why: "Der eine will eine Menschenmenge, der andere will die Tür zu. Der Unterhalter klopft weiter; der Einzelgänger öffnet weiter nicht. Genau zweimal ist das lustig." },
    },

    outgoing_trendsetter: {
      behavior: [
        "Der Trendsetter ist der Early Adopter der Insel. Beobachte, was dieser Mii als Erstes trägt, sagt und tut — innerhalb weniger Spieltage kopiert es die halbe Insel. Das Spiel gibt Trendsettern schnelle Gehgeschwindigkeit und einen entspannten, ausdrucksstarken Gesichtsausdruck, sodass sie selbst in Leerlauf-Animationen wie eine Person mit einer Idee wirken. Überproportional oft sind es Trendsetter, die in Gruppenszenen neue Aktivitäten vorschlagen.",
        "Ihr sanftes, aber schnelles Sprechmuster macht sie überzeugend, ohne die Durchschlagskraft des Anführers zu brauchen: Trendsetter kommandieren niemanden herum — sie lassen das Neue nach Spaß klingen. Romantisch jagen sie der Neuheit hinterher; ein Trendsetter, der zu lange mit einem Freund aus derselben Gruppe gepaart war, gesteht plötzlich dem neuesten Neuzugang der Insel seine Gefühle. Halte dein Aufgebot frisch, wenn du eine stabile Trendsetter-Liebesgeschichte willst.",
      ],
      apartmentIntro:
        "Das Zimmer eines Trendsetters ist ein Moodboard. Was gerade „in“ ist, sollte schon von der Tür aus sichtbar sein:",
      apartmentItems: [
        { name: "Galeriewand", why: "Wechselnde gerahmte Kunst oder Musterfliesen signalisieren einen kuratierten, ganz im Jetzt befindlichen Raum — die visuelle Sprache eines Geschmacksträgers." },
        { name: "Statement-Teppich", why: "Ein kühnes geometrisches Stück schlägt fünf sichere; Trendsetter dekorieren in Statements, nicht in Themen." },
        { name: "Spiegelecke", why: "Ein hoher Spiegel ist praktisch (ständige Outfit-Kontrollen) und genau das Markenzeichen des meistfotografierten Bewohners der Insel." },
      ],
      foodIntro:
        "Der gesellige Zahn für Süßes greift, aber die besten Wetten eines Trendsetters sind die Artikel, die sich wie eine aktuelle Besessenheit anfühlen — neue Getränke und teilbare Snacks. Teste, was im Trend liegt, bevor du Klassiker testest.",
      foodTestFirst: ["Bubble Tea", "Bonbon", "Saft", "Donut"],
      foodDeprioritize: ["Karotte", "Reis", "Cracker"],
      foodTip:
        "Eine Regel zum Mitnehmen: Trendsetter bevorzugen offenbar das, was andere Bewohner kürzlich geliebt haben. Wirf einen Blick in das „Liebe“-Log deiner Insel und teste denselben Artikel als Nächstes — oft sparst du dir drei Versuche.",
      voicePreset: "Sägezahn — Erwachsene Frau",
      voicePitchHz: 380,
      voiceSpeed: 1.15,
      voiceTip:
        "Hell und eine Spur schneller als Konversationstempo. Die leichte Temposchärfe lässt Meinungen wie Eilmeldungen klingen — genau so liefert ein Trendsetter sie ab.",
      romance: { partner: "Denker", why: "Der Trendsetter bringt das Neue; der Denker erklärt, warum es interessant ist. Einer erfindet den Hype, der andere gibt ihm eine Vorgeschichte — das kreativste Paar der Insel." },
      friend: { partner: "Charmeur", why: "Der Charmeur hat die Gags, der Trendsetter das Material. Gemeinsam betreiben sie den Social Feed der Insel — rechne mit ständigen Gerücht-Events mit diesen beiden." },
      friction: { partner: "Herzensmensch", why: "Die „Wir-haben-es-schon-immer-so-gemacht“-Herzigkeit des Herzensmenschen ist Kryptonit für einen Mii, der gegen Tradition allergisch ist. Sanfte, ständige Reibung auf niedriger Flamme." },
    },

    outgoing_optimist: {
      behavior: [
        "Der Optimist ist die zuverlässigste Gute-Nachrichten-Maschine des Spiels. Schnelle Gehgeschwindigkeit, aufrechte Haltung und sanfte Sprache verschmelzen zu einem Mii, der jeden Tag wie einen anständigen behandelt — Regen-Events, Fundsachen-Events, sogar Streitschlichtungen bekommen einen positiven Dreh. Wenn die Stimmung deiner Insel nach einer Streit-Serie in den Keller geht, ist es meist ein Optimist, der sie zurückdreht.",
        "Mechanisch gesehen sind Optimisten der Kitt der geselligen Gruppen: Sie führen nicht wie der Anführer und performen nicht wie der Unterhalter — sie fragen nach. Du siehst sie Besuche bei Bewohnern initiieren, die gerade einen Streit verloren haben oder abgewiesen wurden, und ihre direkte, aber warme Dialogfarbe macht sie zu sicheren Vertrauten. Romantisch sind sie aufrichtig und schnell beim Binden — und auffällig schlecht darin, Enttäuschung zu verbergen, was ihre Liebesbögen seltsam bewegend macht.",
      ],
      apartmentIntro:
        "Das Zimmer eines Optimisten sollte sich wie ein guter Morgen anfühlen. Warm, offen, nichts Spitzes:",
      apartmentItems: [
        { name: "Bettwäsche in Sonnenaufgangsfarben", why: "Warmes Gelb und weiches Orange lassen den Raum selbst fröhlich wirken — die Farbpalette der gesamten Weltanschauung dieser Persönlichkeit." },
        { name: "Frühstückseck", why: "Ein winziges Tisch-mit-zwei-Stühlen-Ensemble lädt zu den ständigen spontanen Besuchen ein, von denen Optimisten leben." },
        { name: "Pflanzenregal am Fenster", why: "Dinge im guten Licht wachsen zu lassen ist maximale Optimisten-Energie: geduldig, warm und leise produktiv." },
      ],
      foodIntro:
        "Der gesellige Drift greift — Süßes und Getränke zuerst —, aber Optimisten haben das breiteste „Gefällt“-Band im Community-Modell, also ist dies die Persönlichkeit, bei der fast alles treffen kann. Setze auf Abwechslung: Fünf verschiedene Kategorien schlagen fünf Desserts.",
      foodTestFirst: ["Kuchen", "Tee", "Erdbeere", "Popcorn"],
      foodDeprioritize: ["Bier", "Sake", "Lakritz"],
      foodTip:
        "Optimisten reagieren auf die meisten Speisen warm, was eine „Liebe“ schwer erkennbar macht. Vergleiche Reaktionen direkt nebeneinander: Ein echtes Lieblingsessen bekommt den vollen Sprung-und-Dreh, ein höfliches „Gefällt“ nur ein Lächeln. Teste Tee und Kuchen früh — warme Wohlfühl-Artikel treffen am häufigsten.",
      voicePreset: "Sägezahn — Erwachsene Frau",
      voicePitchHz: 350,
      voiceSpeed: 1.1,
      voiceTip:
        "Die Standard-Warmeinstellung funktioniert — mittel-hohe Tonhöhe, knapp über Konversationstempo. Widerstehe dem Drang, zu hell zu stellen; ein Optimist soll freundlich klingen, nicht manisch. Das ist der Job des Unterhalters.",
      romance: { partner: "Träumer", why: "Beide sind sanfte Idealisten, aber die Tiefe des Träumers gibt dem Optimisten etwas, an das er glauben kann, während die Energie des Optimisten den Träumer davor bewahrt, zu weit nach innen zu treiben. Still die stabilste gruppenübergreifende Paarung." },
      friend: { partner: "Anführer", why: "Der Optimist ist der Lieblingsstellvertreter des Anführers: loyal, schnell und aufrichtig gern behilflich. Der Anführer macht den Plan; der Optimist macht alle damit glücklich." },
      friction: { partner: "Freigeist", why: "Der Optimist will, dass sich alle verstehen; der Freigeist findet das anstrengend. Rechne mit höflichen Absagen bei Gruppenaktivitäten, gefolgt von einem Optimisten, der tagelang darüber grübelt." },
    },

    confident_designer: {
      behavior: [
        "Der Planer ist die am langsamsten lodernde Persönlichkeit der Insel und ihr bester Plot-Generator. Langsame Gehgeschwindigkeit plus selbstsicherer Gesichtsausdruck liest sich als „bedacht“ — dieser Mii ist nie zu spät, er weigert sich schlicht zu hetzen. Planer verbringen lange Strecken in ihrem eigenen Kopf: Rechne damit, sie reglos am Strand stehen oder auf eine Wand starren zu sehen — und rechne damit, dass das Spiel genau diese Momente für seine seltsamsten inneren Monolog-Events nutzt.",
        "Ihre direkte, strukturierte Sprache macht Planer zu den zitierfähigsten Bewohnern der Insel — kurze, beschlussfeste Sätze mit totaler Gewissheit, selbst wenn die Gewissheit falsch ist. Geständnisse planen sie so, wie andere Persönlichkeiten ihr Mittagessen planen, und ihre romantischen Bögen verlaufen in klaren Phasen: Beobachtung, Entscheidung, Umsetzung. Wenn ein Planer entschieden hat, dass deine Insel-Geschichte eine Wendung braucht, ist er den anderen Miis bereits drei Schritte voraus.",
      ],
      apartmentIntro:
        "Das Zimmer eines Planers ist ein Manifest — minimal, intentional, jedes Objekt argumentiert für seinen Platz:",
      apartmentItems: [
        { name: "Zeichentisch mit Arbeitslampe", why: "Das eine nicht verhandelbare Möbel: ein Arbeitsplatz, der sagt, dass hier Pläne gemacht werden — ob sie sonst jemand sieht oder nicht." },
        { name: "Monochrome Palette mit einem Akzent", why: "Strenges Schwarz/Weiß/Holz mit einer einzigen kühnen Farbe zeigt das Design-Auge — Zurückhaltung als Persönlichkeitsstatement." },
        { name: "Einzelner Lesesessel", why: "Ein perfekter Sessel, von der Tür weg gedreht. Das Zimmer eines Planers ist für den Planer; Gäste werden zugelassen, nicht bewirtet." },
      ],
      foodIntro:
        "Selbstsichere Persönlichkeiten bevorzugen richtige Mahlzeiten statt Snacks — Restaurant-Gang-Energie, nicht Automaten-Energie. Überspringe die Süßwaren-Gasse komplett und teste zuerst Hauptgerichte; bei dieser Persönlichkeit zahlen sich Steak- und Sushi-Tipps aus.",
      foodTestFirst: ["Steak", "Sushi", "Curry", "Kaffee"],
      foodDeprioritize: ["Kaugummi", "Lakritz", "Bonbon"],
      foodTip:
        "Planer reagieren auf Essen wie auf alles andere: kurz und mit Wertung. Achte auf den seltenen ungeschützten Moment — eine echte „Liebe“ bricht die komponierte Maske für eine volle Sekunde, und genau so erkennst du es.",
      voicePreset: "Sägezahn — tiefes Register",
      voicePitchHz: 160,
      voiceSpeed: 0.95,
      voiceTip:
        "Tief und unbeschwert langsam, mit Tempo knapp unter 1,0x. Die minimale Verlangsamung ist der Trick: Es klingt wie jemand, der beschlossen hat, dass das Gespräch auf ihn warten wird. Über 180 Hz kollabiert die ganze Illusion.",
      romance: { partner: "Herzensmensch", why: "Die Selbstsicher-×-Umgänglich-Ergänzung in Reinform: Die stetige Wärme des Herzensmenschen entwaffnet die Kontrolle des Planers, und der Planer gibt dem Herzensmenschen einen Plan zum Glauben. Langsamer Start, stärkstes Finish auf der Insel." },
      friend: { partner: "Einzelgänger", why: "Gegenseitiger Respekt zwischen zwei Miis, die beide Qualität über Quantität stellen, wenn es um Gesellschaft geht. Sie treffen sich selten, sprechen kurz — und verstehen sich irgendwie vollständig." },
      friction: { partner: "Macher", why: "Zwei Strategen, eine Insel. Der Macher will Tempo und Ergebnisse; der Planer will die richtige Antwort — irgendwann. Ihre Streits sind leise, häufig und werden nie wirklich gelöst." },
    },

    confident_adventurer: {
      behavior: [
        "Der Abenteurer ist die Persönlichkeit, die am ehesten dort ist, wo sie nicht sein sollte. Schnelle Gehgeschwindigkeit, direkte Sprache und eine entspannte Haltung erzeugen einen Mii, der die Insel wie eine Open-World-Karte behandelt — er nimmt bewusst den langen Weg, taucht uneingeladen in die Events anderer Bewohner ein und meldet sich freiwillig zu jedem Ausflug, jeder Reise und jedem Mysterium, das das Spiel anbietet.",
        "Abenteurer sind Pragmatiker, keine Philosophen: Ihre Dialoge sind kurz, körperlich und im Präsens. Streit schlichten sie eher mit Mutproben als mit Worten, und sie erholen sich schneller als jede andere Persönlichkeit von einer Abfuhr — meist, indem sie das Nächste planen, bevor das Aktuelle vorbei ist. Wenn deine Inselgeschichten abgestanden wirken, ist ein Abenteurer der Reset-Knopf: stell ihn in eine Szene, und der Plot bewegt sich binnen Sekunden.",
      ],
      apartmentIntro:
        "Das Zimmer eines Abenteurers sollte aussehen, als stünde er mitten in der Abreise. Ausrüstung sichtbar, Tür erreichbar, kein Gerümpel:",
      apartmentItems: [
        { name: "Ausrüstungswand", why: "Rucksack, Hut und Stiefel an Haken neben der Tür — die Zimmer-Entsprechung von „Frag mich, wo ich gewesen bin“." },
        { name: "Topografischer Teppich", why: "Ein Karten-Teppich unter den Füßen hält den ganzen Raum auf den Horizont ausgerichtet — auch drinnen." },
        { name: "Souvenir-Regal", why: "Steine, Mitbringsel und Fundsachen von Ausflügen geben dem Zimmer eine Geschichte und den Gästen einen Grund, Fragen zu stellen." },
      ],
      foodIntro:
        "Die Hauptgerichte-Präferenz der Selbstsicheren greift, aber Abenteurer bevorzugen die Speisen, die du tatsächlich auf eine Reise mitnehmen würdest — handlich, deftig, ohne Zeremoniell. Teste Streetfood-artige Hauptgerichte und mutige Snacks, bevor du etwas Filigranes probierst.",
      foodTestFirst: ["Hamburger", "Ramen", "Chips", "Brezel"],
      foodDeprioritize: ["Pudding", "Kaugummi", "Wasser"],
      foodTip:
        "Abenteurer essen, wie sie reisen: schnell und ohne Zeremoniell. Ihre „Liebe“-Reaktion ist die schnellste aller Persönlichkeiten — ein Schub Aufregung, sofort vorbei. Blinzelst du, verpasst du sie; halte die Speisentabelle also beim Füttern offen.",
      voicePreset: "Sägezahn — Erwachsener Mann",
      voicePitchHz: 240,
      voiceSpeed: 1.2,
      voiceTip:
        "Mittlere Tonhöhe, klar übernormales Tempo. Das ist eine Stimme, die schon auf halbem Weg zum nächsten Satz ist — das akustische Äquivalent von schnellem Gehen. Kombiniere sie mit dem Roboter-Preset bei 250 Hz für eine urkomische, trockene Entdecker-Variante.",
      romance: { partner: "Kumpel", why: "Der Abenteurer führt, der Kumpel folgt glücklich, und keiner fragt, wohin die Reise geht. Die pflegeleichteste Romanze der Insel — bis der Kumpel müde wird, was praktisch nie passiert." },
      friend: { partner: "Charmeur", why: "Der Charmeur bespricht den Plan; der Abenteurer führt ihn längst aus. Ihre Gruppen-Events eskalieren gern — einer wettet, der andere liefert, und die Insel redet tagelang darüber." },
      friction: { partner: "Sanftmütiger", why: "Der Sanftmütige will es gemütlich und vorsichtig; der Abenteurer will genau das Gegenteil von beidem. Jede Einladung bekommt ein sanftes Nein, und der Abenteurer nimmt es sich rund eine Stunde persönlich." },
    },

    confident_goGetter: {
      behavior: [
        "Der Macher ist der Motor der Insel. Schnelle Gehgeschwindigkeit, direkte Sprache und ein selbstsicherer Ausdruck machen diesen Mii leicht mit dem Anführer verwechselbar — der Unterschied zeigt sich, nachdem der Plan steht: Anführer delegieren, Macher führen selbst aus. Sie sind die Ersten, die sich melden, die Ersten, die fertig sind — und sichtbar ungeduldig mit allen, die beides nicht sind.",
        "In Gruppenszenen setzt das Spiel auf Macher für Momentum: Sie schieben festgeratene Events voran, sprechen träge Freunde direkt an und behandeln Mini-Games wie Beförderungen. Ihre romantischen Bögen sind effizient bis zum Fehler — ein Macher entscheidet schnell, gesteht schnell und verlobt sich in dem Tempo, das andere Persönlichkeiten „früh“ nennen würden. Die Komödie schreibt sich von selbst, wenn du ihn mit einem umgänglichen Typ pairst, der drei Wochen braucht, um eine Nachricht zu beantworten.",
      ],
      apartmentIntro:
        "Das Zimmer eines Machers ist ein Homeoffice, das zufällig ein Bett hat. Alles optimiert, nichts untätig:",
      apartmentItems: [
        { name: "Stehpult-Setup", why: "Das Anti-Faulheit-Möbelstatement — ein Schreibtisch, der nicht einmal Sitzen anbietet, setzt den Ton, bevor jemand spricht." },
        { name: "Fortschrittsboard", why: "Eine Wand aus Notizen und Häkchen zeigt den Plan, den Ersatz-Plan und den Ersatz-des-Ersatz-Plans. „Passend“ beschreibt das nicht annähernd." },
        { name: "Minimales Bett, scharfe Kanten", why: "Klare Linien, keine Zierkissen: Schlafen ist eine geplante Aufgabe, kein Erlebnis." },
      ],
      foodIntro:
        "Klassisches Selbstsicher-Profil — richtige Mahlzeiten, kaum Snacks. Macher bevorzugen effiziente, ertragreiche Speisen: proteinlastige Hauptgerichte und kaffee-nahe Getränke. Überspringe Desserts beim ersten Durchgang komplett.",
      foodTestFirst: ["Steak", "Kaffee", "Curry", "Pizza"],
      foodDeprioritize: ["Kaugummi", "Waffel", "Donut"],
      foodTip:
        "Füttere einen Macher nach Zeitplan — gleiche Kategorie, gleiche Zeit, Notizen protokolliert. Seine Reaktionen sind konsistent und gut lesbar, was ihn zur besten Persönlichkeit macht, um deine Fütterungs-Testmethodik für die ganze Insel zu kalibrieren.",
      voicePreset: "Sägezahn — Erwachsener Mann",
      voicePitchHz: 220,
      voiceSpeed: 1.25,
      voiceTip:
        "Die schnellste selbstsichere Stimme: 1,25x Tempo bei solider mittlerer Tonhöhe. Jeder Satz landet wie ein Status-Update — knapp, gewiss, schon weitergezogen. Bei niedrigerem Tempo liest sich der Charakter als Anführer, also halte das Tempo oben.",
      romance: { partner: "Träumer", why: "Das dramatischste Selbstsicher-×-Umgänglich-Paar: Der Macher plant alles, der Träumer schwebt durch die Zeit. Eigentlich dürfte das nicht funktionieren. Genau darum feuern die Spieler es an." },
      friend: { partner: "Abenteurer", why: "Gleiches Tempo, anderer Stil. Der Abenteurer liefert Abenteuer; der Macher liefert Logistik. Zusammen sind sie das einzige Expeditionsteam, das du jemals brauchen wirst." },
      friction: { partner: "Sanftmütiger", why: "Das Tempo des Sanftmütigen ist der Albtraum des Machers. Erwarte wiederkehrende „Warum ist hier alles so langsam“-Monologe und einen Sanftmütigen, der das Problem aufrichtig nicht bemerkt." },
    },

    confident_charmer: {
      behavior: [
        "Der Charmeur ist der Joker der Insel — allerdings mit Drehbuch. Schnelle Gehgeschwindigkeit, direkte Sprache, entspannter Vortrag: Dieser Mii sagt das Überraschende mit Selbstbewusstsein, was ihn zur zuverlässigsten Quelle für Gerüchte, Flirt-Sprüche und unerwartete Bündnisse macht. Charmeure werden überall eingeladen, weil sie jede Szene um 20 Prozent interessanter machen.",
        "Unter der Performance steckt ein aufrichtig neugieriger Kopf: Charmeure bohren in den Geheimnissen anderer Bewohner — nicht zum Klatschen, sondern weil sie verstehen wollen, wie Menschen funktionieren. Sie sind die schnellste Persönlichkeit, wenn es darum geht, die Schwierigen zu befreunden — Einzelgänger, Planer —, weil sie ein „Nein“ schlicht nicht als soziale Antwort akzeptieren. Romantisch sammeln sie Bewunderer, bevor sie wählen, und ihre Wahl ist immer die, mit der die Insel am wenigsten gerechnet hat.",
      ],
      apartmentIntro:
        "Das Zimmer eines Charmeurs ist eine Gesprächsfalle — gebaut, um Menschen zwanzig Minuten länger zu halten als geplant:",
      apartmentItems: [
        { name: "Kuriositätenschrank", why: "Seltsame, interessante Objekte erzwingen Fragen — und Fragen sind das Heimspiel eines Charmeurs." },
        { name: "Tiefen-Gesprächsecke", why: "Zwei niedrige Ohrensessel, ein kleiner Tisch, warmes Licht: eine Arena, gebaut für den Satz „Na, wenn du schon fragst …“." },
        { name: "Gedämpft warmes Licht", why: "Deckenlicht aus, Lampen an. Niemand erzählt Geheimnisse im Licht von Leuchtstoffröhren — und ein Charmeur weiß das." },
      ],
      foodIntro:
        "Selbstsichere Hauptgerichte zuerst, aber Charmeure bevorzugen Speisen mit Inszenierung — solche, die wie ein Statement serviert werden. Restaurant-Klasse und gesprächstaugliche Getränke schlagen hier To-go-Snacks.",
      foodTestFirst: ["Sushi", "Sake", "Spaghetti", "Kaffee"],
      foodDeprioritize: ["Kaugummi", "Cracker", "Wasser"],
      foodTip:
        "Charmeure spielen ihre Reaktionen — jede Speise bekommt eine Nummer. Das Erkennungszeichen eines echten Lieblingsessens: Die Performance bricht, und etwas Echtes rutscht durch. Achte auf den Moment, in dem das Grinsen verschwindet.",
      voicePreset: "Sägezahn — mittelhelles Register",
      voicePitchHz: 300,
      voiceSpeed: 1.15,
      voiceTip:
        "Mittel-hoch mit verspieltem Tempo. Die 300-Hz-Region hält es leicht, während 1,15x das Zwinkern beisteuert. Fall für dramatische Pausen kurz auf 0,9x ab — die Stimme eines Charmeurs soll klingen, als amüsiere sie sich selbst.",
      romance: { partner: "Herzensmensch", why: "Der Herzensmensch durchschaut jede Floskel — und mag den Charmeur trotzdem. Aufrichtig erkannt zu werden ist das Eine, in das sich ein Charmeur nicht hineinschminken kann — genau deshalb trifft diese Paarung mitten ins Herz." },
      friend: { partner: "Trendsetter", why: "Die Informationsökonomie der Insel: Der Trendsetter setzt das Thema, der Charmeur liefert die Meinung. Ihre Treffen erzeugen die Hälfte aller Gerücht-Events auf jeder gesunden Insel." },
      friction: { partner: "Denker", why: "Der Denker faktencheckt die Nummer. Kein Publikum übersteht diese Kombination aus Charisma und Korrekturen — erwarte Debatten, die der Charmeur nach Stil gewinnt und nach Punkten verliert." },
    },

    independent_artist: {
      behavior: [
        "Der Künstler ist der zum Bewohner gewordene Tagtraum der Insel. Langsame Gehgeschwindigkeit, sanfte Sprache und ein entspannter Ausdruck erzeugen einen Mii, der sich durch die Insel bewegt, als wäre sie eine Galerie — innehaltend, beobachtend, treibend. Das Spiel gibt Künstlern die längsten Leerlauf-Animationen und die sehnsuchtsvollsten inneren Monologe; dies ist die Persönlichkeit, die in den Sonnenuntergang starrt, während hinter ihr ein Streit ausbricht.",
        "Künstler fühlen alles bei voller Lautstärke, drücken es aber bei halber aus. Ihre Geständnisse sind zögerlich und überwältigend aufrichtig, ihre Freundschaft ist leise, aber permanent, und ihre Reaktionen auf Schönheit — ein neues Outfit, ein Lied, ein Ausblick — sind das Lebhaftigste, was sie je zeigen. Paarst du einen Künstler mit einem schnellen geselligen Typ, bekommst du den besten Odd-Couple-Bogen des Spiels: Einer hetzt, einer genießt, beide sind vom anderen verwirrt und fasziniert.",
      ],
      apartmentIntro:
        "Das Zimmer eines Künstlers soll sich anfühlen wie ein Atelier in der goldenen Stunde — weich, texturiert, überall halbfertige Arbeiten:",
      apartmentItems: [
        { name: "Staffelei am Fenster", why: "Nordlicht und eine unvollendete Leinwand: Der Raum kündigt seinen Zweck ohne ein Wort an." },
        { name: "Zusammengewürfelte Vintage-Stühle", why: "Perfekt unperfekte Möbel sind eine ästhetische Entscheidung und eine Persönlichkeits-These — nichts passt zusammen, alles gehört hierher." },
        { name: "Ideenwand mit Lichterkette", why: "Lose Skizzen und Fundstücke aus Papier unter warmen Lichterketten: eine private Galerie, deren Besichtigung für Gäste eine Ehre ist." },
      ],
      foodIntro:
        "Unabhängige Persönlichkeiten bevorzugen das Ungewöhnliche — die Kategorien „Sonstiges“ und Gemüse führen unser Modell an, noch vor den Mainstream-Hauptgerichten. Für den Künstler konkret: Teste zuerst die sanften, ästhetischen Speisen — Tees, Obst, alles, was wie ein Gemälde aussieht.",
      foodTestFirst: ["Bubble Tea", "Tee", "Erdbeere", "Melone"],
      foodDeprioritize: ["Steak", "Hamburger", "Bier"],
      foodTip:
        "Künstler haben subtile Reaktionen — ein kleines Lächeln, ein angehaltener Atemzug. Bleib stehen und schau dir die ganze Animation an: Echte Lieblinge bekommen eine verträumte Zwei-Sekunden-Pause vor der Antwort — einzigartig bei dieser Persönlichkeit.",
      voicePreset: "Sägezahn — weiches Mittelregister",
      voicePitchHz: 320,
      voiceSpeed: 1.0,
      voiceTip:
        "Mittel-weich mit unbeschwertem Tempo. 320 Hz halten die Stimme warm, ohne kindlich zu werden; 1,0x lassen die Pieps-Sprache atmen. Das ist die seltene Stimme, bei der Stille hinzufügen — Zwischenräume zwischen den Phrasen — die eigentliche Performance ist.",
      romance: { partner: "Anführer", why: "Die beliebteste Paarung der Community: totale Gegensätze in Tempo, Sprache und Gewissheit — und jeder bietet exakt das, was dem anderen fehlt. Der Anführer stürmt voraus; der Künstler macht das Ziel der Reise wert." },
      friend: { partner: "Freigeist", why: "Zwei Träumer mit unterschiedlichen Medien. Sie koexistieren eher, als dass sie miteinander reden — und es funktioniert: die ruhigste Freundschaft der Insel, gemessen in wohltuendem Schweigen." },
      friction: { partner: "Macher", why: "Der Macher will, dass der Künstler sich beeilt. Der Künstler will, dass das Tun des Machers eine Bedeutung hat. Beide sagen es jede Woche lauter, und keiner hört zu." },
    },

    independent_freeSpirit: {
      behavior: [
        "Der Freigeist ist das Fragezeichen der Insel. Langsam gehend, aber unmöglich vorherzusagen — dieser Mii folgt seiner Neugier, wohin sie auch zeigt: in die Apartments anderer Bewohner, mitten in Sätze hinein, in Hobbys, die wöchentlich wechseln. Der Zufalls-Event-Pool des Spiels liebt Freigeister: Die Hälfte der seltsamsten Inselgeschichten beginnt mit „und dann entschied sich der Freigeist einfach, …“.",
        "Ihre direkte Sprache überrascht Leute, die beim langsamen Tempo Sanftheit erwarten — Freigeister sagen exakt, was sie denken, ohne besonderes Interesse daran, ob es zur Stimmung passt. Das macht sie schrecklich im Smalltalk und exzellent im echten Gespräch. Romantisch widersetzen sie sich jeder Struktur: Ein Freigeist, der mit einem anderen unabhängigen Typ gepaart wird, erzeugt die privatste, am schwersten lesbare Beziehung der Insel — tief, wortlos und leicht außerhalb des Rahmens.",
      ],
      apartmentIntro:
        "Das Zimmer eines Freigeists folgt keinem Thema — und genau das ist das Thema. Kuratiertes Chaos, gemütliche Widersprüche:",
      apartmentItems: [
        { name: "Bodenkissen-Lounge", why: "Kein Sofa, keine Stühle, nur Kissen — Möbel, die sich nicht festlegen wollen, sind hier genau die richtige Wahl." },
        { name: "Wechselnder Kuriositäten-Tisch", why: "Diese Woche Steine, nächste Woche Löffel. Der Inhalt des Tisches wechselt ständig, die Neugier nie." },
        { name: "Deckenabhängende Deko", why: "Mobiles und Behänge setzen das Interesse dorthin, wo sonst niemand hinsieht — das Markenzeichen eines Freigeists." },
      ],
      foodIntro:
        "Die unabhängige Vorliebe für ungewöhnliche Artikel greift in voller Stärke: Die Kategorie „Sonstiges“ und unerwartete Kombinationen führen das Modell an. Vergiss sichere Hauptgerichte — teste die Artikel, die andere Bewohner ignorieren, und rechne mit Überraschungen.",
      foodTestFirst: ["Bubble Tea", "Eisbecher", "Lakritz", "Gurke"],
      foodDeprioritize: ["Pizza", "Hamburger", "Cola"],
      foodTip:
        "Freigeister sind die wahrscheinlichsten Besitzer skurriler Lieblinge der Insel — die Bewohner, die gegen alle Gruppentrends Lakritz oder Gurke lieben. Wenn die Standard-Tipps scheitern, werde skurriler, nicht sicherer.",
      voicePreset: "Rechteckwelle — schrulliges Mittelregister",
      voicePitchHz: 260,
      voiceSpeed: 1.05,
      voiceTip:
        "Nimm die Rechteckwelle — die Klangfarbe selbst klingt auf die richtige Art „falsch“. 260 Hz mit leichtem Temposchub erzeugen eine Pieps-Sprache, die nie ganz zur Ruhe kommt — die ganze Persönlichkeit in Audioform.",
      romance: { partner: "Unterhalter", why: "Einer improvisiert laut, einer improvisiert leise. Keiner weiß, was der Plan ist, und beide finden das besser — die unvorhersehbarste und lustigste Liebesgeschichte der Insel zum Zusehen." },
      friend: { partner: "Künstler", why: "Die pflegeleichteste Freundschaft der Insel: keine Forderungen, kein Zeitplan, keine Performance. Sie tauchen einfach nebeneinander auf, und beide betrachten das als gemeinsames Abhängen." },
      friction: { partner: "Optimist", why: "Der Optimist organisiert ständig Gruppen-Glück; der Freigeist nimmt ständig nicht teil. Der Optimist nimmt jede Abwesenheit persönlich. Der Freigeist bemerkt gar nichts." },
    },

    independent_thinker: {
      behavior: [
        "Der Denker ist der stille Analyst der Insel. Langsames Gehen, direkte Sprache, entspanntes Gesicht — ein Mii, der über alles, was er sieht, Hintergrundberechnungen laufen zu lassen scheint. Denker starten selten Events, landen aber in deren Zentrum — meist mit dem einen Satz, der die gesamte Situation neu rahmt. Das Spiel gibt ihnen die trockensten Dialogzeilen im Pool.",
        "Sozial sind sie Minimalisten: wenige Freunde, effizient gepflegt. Denker machen kein Drama — sie diagnostizieren es. Wenn zwei andere Bewohner sich streiten, ist der Denker derjenige, der jedem, der zuhören will, die tatsächliche Ursache erklärt — korrekt — und dann zu dem zurückkehrt, was er vorher tat. Ihre romantischen Bögen sind langsam und prozedural, was den Payoff — ein Denker, der endlich ein Gefühl laut ausspricht — zu einem der besten Momente des Spiels macht.",
      ],
      apartmentIntro:
        "Das Zimmer eines Denkers ist ein Studierzimmer, getarnt als Apartment. Alles ruhig, nichts zufällig:",
      apartmentItems: [
        { name: "Bücherregal über die ganze Wand", why: "Bücher von Boden bis Decke sagen alles, was ein Denker gesagt haben will: Wissen wohnt hier — und es ist sortiert." },
        { name: "Eine Arbeitslampe, keine Deckenlichter", why: "Ein Lichtkegel auf einem Stuhl: Das Zimmer eines Denkers ist zum Lesen beleuchtet, nicht für Atmosphäre oder Gesellschaft." },
        { name: "Whiteboard- oder Tafelwand", why: "Eine Fläche zum Durchdenken — die Apartment-Entsprechung von lautem Denken, nur ohne das Laute." },
      ],
      foodIntro:
        "Unabhängiges Geschmacksprofil: Gemüse und ungewöhnliche Artikel vor den Publikumslieblingen. Teste für Denker die schlichten, ehrlichen Speisen — das Modell legt nahe, dass sie einfach zubereitete, gut gemachte Zutaten über aufwendige Gerichte stellen.",
      foodTestFirst: ["Salat", "Gurke", "Tee", "Reis"],
      foodDeprioritize: ["Bonbon", "Cola", "Kuchen"],
      foodTip:
        "Denker-Reaktionen sind von Design her minimal — der Unterschied zwischen „Gefällt“ und „Liebe“ ist eine halbe Sekunde Augenbraue. Protokolliere Reaktionen sofort; das ist die Persönlichkeit, bei der das Gedächtnis versagt und Notizen den Lauf retten.",
      voicePreset: "Rechteckwelle — tiefes Register",
      voicePitchHz: 200,
      voiceSpeed: 0.9,
      voiceTip:
        "Rechteckwelle für trockene Klangfarbe, unter 1,0x Tempo gedrückt. Das Ergebnis klingt wie eine Stimme, die die meisten Sätze für optional hält. Stelle die Tonhöhe auf 180–220 Hz und lass die Stille zwischen den Pieptönen reden.",
      romance: { partner: "Trendsetter", why: "Der Trendsetter liefert die Neuheiten; der Denker liefert die Analyse. Einer bringt das Phänomen, der andere erklärt es — das intellektuell kompatibelste ungleiche Paar der Insel." },
      friend: { partner: "Einzelgänger", why: "Beide ziehen Verstehen dem Gesellschaften vor. Ihre Freundschaft besteht zu 90 Prozent aus parallelem Dasein und zu 10 Prozent aus vernichtend präzisen Beobachtungen über die anderen Bewohner." },
      friction: { partner: "Charmeur", why: "Der Charmeur geht locker mit Fakten um; der Denker hebt alle Belege auf. Jede charmante Geschichte kriegt eine Korrektur, und der Raum wird dabei jedes Mal um 10 Prozent kälter." },
    },

    independent_loneWolf: {
      behavior: [
        "Der Einzelgänger ist der am meisten missverstandene Bewohner der Insel. Langsames Gehen, direkte Sprache, selbstsichere Haltung — dieser Mii meidet Menschen nicht, er braucht sie nur nicht, und die Insel verzeiht ihm das nie ganz. Einzelgänger überspringen Gruppen-Events, lehnen Einladungen höflich, aber bestimmt ab — und sind trotzdem exakt in dem Moment zur Stelle, in dem etwas Wichtiges passiert, tragen einen entscheidenden Satz bei und verschwinden wieder.",
        "Ihre Loyalität ist, einmal verdient, die haltbarste im Spiel. Ein Einzelgänger mit einem echten Freund ist für den gesamten Spielstand versorgt: Er verteidigt diesen Freund in Streitigkeiten, erinnert sich ungefragt an den Geburtstag und taucht auf — immer zu spät, immer, wenn es zählt. Romantisch bewegt er sich in seinem eigenen privaten Tempo; der Trick, den Spieler lernen, ist, aufzuhören zu drücken und den Bogen entwickeln zu lassen — denn ein Einzelgänger unter Druck geht einfach.",
      ],
      apartmentIntro:
        "Das Zimmer eines Einzelgängers ist eine Festung der Einsamkeit mit exzellentem Geschmack. Privat, funktional, vollständig:",
      apartmentItems: [
        { name: "Massiver Lesesessel, Rücken zur Wand", why: "Das klassische Einzelgänger-Möbel: volle Sicht auf die Tür, null Einladung zum Sitzenbleiben. Das ist nicht unfreundlich — das ist Architektur." },
        { name: "Praktisches Ausrüstungsregal", why: "Werkzeug, Stiefel, das Wesentliche — alles, was ein autarker Mii braucht, arrangiert für den Gebrauch durch genau eine Person." },
        { name: "Verdunkelungsähnliche Vorhänge", why: "Die Kontrolle darüber, wer hineinsieht, spiegelt die Kontrolle darüber, wer näherkommen darf. Außerdem hervorragend für Nachmittagsschläfchen, die Einzelgänger erbittert verteidigen." },
      ],
      foodIntro:
        "Unabhängiger Geschmack in der Selbstversorger-Edition: Einzelgänger bevorzugen einfache Speisen ohne Zeremoniell, die sie theoretisch selbst zubereiten könnten. Teste Grundnahrungsmittel und kräftige, schlichte Aromen vor allem Aufwendigen.",
      foodTestFirst: ["Reis", "Sashimi", "Kaffee", "Apfel"],
      foodDeprioritize: ["Kuchen", "Eisbecher", "Bubble Tea"],
      foodTip:
        "Einzelgänger essen, als wäre es Treibstoff, kein Event — Reaktionen sind kurz und ungespielt. Das verlässliche „Liebe“-Zeichen: Sie schauen sich um, um zu prüfen, dass niemand gesehen hat, wie sie etwas genießen. Das ist deine Antwort.",
      voicePreset: "Sägezahn — tiefes, knappes Register",
      voicePitchHz: 140,
      voiceSpeed: 0.9,
      voiceTip:
        "Tiefste Tonhöhe der Insel, leicht langsam. 140 Hz Sägezahn mit 0,9x Tempo erzeugen den Klang von jemandem, der an Wörtern spart. Jeder Piepton kostet etwas, also fällt nichts Überflüssiges.",
      romance: { partner: "Optimist", why: "Der Optimist lässt sich von der Distanz des Einzelgängers nicht entmutigen, und der Einzelgänger schätzt insgeheim, nicht performen zu müssen. Die langsamste, am härtesten verdiente Romanze der Insel." },
      friend: { partner: "Denker", why: "Die einzige Freundschaft, in der Schweigen die Standardsprache ist. Sie respektieren den Raum des anderen so gründlich, dass ihre seltenen Gespräche wegen ihrer Direktheit legendär sind." },
      friction: { partner: "Unterhalter", why: "Eine unaufhaltsame Kraft aus Begeisterung trifft auf ein unbewegliches Objekt aus Desinteresse. Der Unterhalter interpretiert jede geschlossene Tür als Herausforderung. Der Einzelgänger widerspricht — lautlos, ausführlich." },
    },

    easygoing_dreamer: {
      behavior: [
        "Der Träumer ist die stille Tiefe der Insel. Langsames Gehen, sanfte Sprache, selbstsicherer Ausdruck — ein Mii, der etwas zu wissen scheint, das der Rest der Insel nicht weiß. Das Spiel gibt Träumern die poetischsten inneren Monologe und die seltsamsten Träume (schau in die Morgenberichte: Ihre sind immer die, die einen Screenshot wert sind). Sie treiben durch die Insel, als wäre sie eine Metapher.",
        "Verwechsle sanft nicht mit passiv — Träumer sind die besten Menschenkenner der Insel. Sie sagen voraus, welche Paare halten werden, welche Freundschaften unecht sind und welcher Bewohner als Nächstes für ein Problem sorgen wird — meist Wochen im Voraus. Ihr Sozialstil ist stille Beobachtung, gefolgt von vernichtend präziser Einsicht, sanft ausgesprochen im exakt richtigen Moment. Romantisch sind sie langsam, idealistisch und leise intensiv; das Geständnis eines Träumers wurde sehr lange erwogen, bevor es jemand hörte.",
      ],
      apartmentIntro:
        "Das Zimmer eines Träumers soll sich anfühlen wie der Moment kurz vor dem Einschlafen — weiche Kanten, gedämpftes Licht, Bedeutung überall:",
      apartmentItems: [
        { name: "Baldachin- oder Schichtbettwäsche", why: "Weich drapierte Stoffe machen das Bett zum Mittelpunkt des Raums — das Hauptquartier einer Persönlichkeit, die ihre beste Arbeit schlafend erledigt." },
        { name: "Mond-und-Sterne-Deko", why: "Nacht-Himmel-Details sind hier kein Klischee, sondern ein Mission Statement des Inselastronomen der Gefühle." },
        { name: "Tagebuch-Ecke", why: "Ein kleiner Tisch, eine Lampe, ein offenes Notizbuch: der Ort, an dem die genauesten Vorhersagen der Insel aufgeschrieben werden, bevor sie eintreffen." },
      ],
      foodIntro:
        "Umgängliches Wohlfühlessen-Profil mit verträumtem Einschlag: warme, weiche, nostalgische Speisen führen. Denk an das, was man an einem stillen Abend isst — das Modell bevorzugt Hauptgerichte und sanfte Desserts für diese Gruppe.",
      foodTestFirst: ["Nudelsuppe", "Pudding", "Milch", "Melone"],
      foodDeprioritize: ["Bier", "Chips", "Sake"],
      foodTip:
        "Träumer kosten aus — ihre „Liebe“-Reaktion ist ein langsames, ganzkörperhaftes Glücks-Schaudern statt eines Sprungs. Füttere sie im Spiel am Abend und schau dir die ganze Animation an; das ist die ruhigste „Liebe“ der Insel.",
      voicePreset: "Sägezahn — luftiges hohes Register",
      voicePitchHz: 400,
      voiceSpeed: 0.95,
      voiceTip:
        "Hohe Tonhöhe, leicht verlangsamtes Tempo — die seltene Kombination, die nach Schweben klingt. 400 Hz bei 0,95x erzeugen eine Pieps-Sprache, die wirkt, als käme sie von leicht anderswoher — genau richtig so.",
      romance: { partner: "Macher", why: "Der Selbstsicher-×-Umgänglich-Kontrast am Maximum: Bewegung trifft Stille, Terminkalender treffen Gelassenheit. Eigentlich dürfte das nicht funktionieren — und genau ihre Szenen sind die, die Spieler sich erneut ansehen." },
      friend: { partner: "Sanftmütiger", why: "Zwei sanfte Seelen auf derselben langsamen Frequenz. Ihre Freundschaft produziert kein Drama und unendlich viel Trost — die wärmste Ecke der Insel, dauerhaft besetzt." },
      friction: { partner: "Abenteurer", why: "Lautstärke und Tempo des Abenteurers sind viel für einen Mii, der für die Stille gebaut wurde. Erwarte sanfte, endlose Ausflüchte auf Einladungen, die der Abenteurer immer wieder erneuert." },
    },

    easygoing_sweetheart: {
      behavior: [
        "Der Herzensmensch ist die Betreuungsperson der Insel — die Persönlichkeit, die merkt, wenn jemand am Tisch fehlt. Langsames Gehen, sanfte Sprache, selbstsichere Wärme: Dieser Mii pflegt Freundschaften so, wie andere Persönlichkeiten Hobbys pflegen — gezielt und täglich. Das Spiel gibt Herzensmenschen die höchste Rate an Tröstungs-Events; sie sind immer zuerst zur Stelle, wenn jemand auf einer Parkbank weint.",
        "Ihre soziale Gravitation ist real: Herzensmenschen halten Freundeskreise still über Persönlichkeitsgrenzen hinweg zusammen, und die stabilsten Trios der Insel haben meist einen im Zentrum. Romantisch sind sie loyal, aufmerksam und leise stur — ein Herzensmensch, der beschlossen hat, dass eine Beziehung das Halten wert ist, lässt sich davon nicht abbringen, was sowohl die besten Ehen der Insel hervorbringt als auch die langlebigsten Leidensvollen. Gib ihnen jemanden, der ihre Loyalität verdient; das ist das ganze Spiel.",
      ],
      apartmentIntro:
        "Das Zimmer eines Herzensmenschen ist der zweitliebste Raum aller — warm, einladend, Kekse inklusive:",
      apartmentItems: [
        { name: "Runder Küchentisch", why: "Keine scharfen Kanten, Platz für vier: Möbel, die „Setz dich, ich mach dir etwas“ sagen, bevor jemand ein Wort spricht." },
        { name: "Frische Blumen, immer", why: "Eine kleine Vase, die nie leer ist — das aufwandärmste, aussagekräftigste Detail eines von Natur aus fürsorglichen Bewohners." },
        { name: "Fotowand mit Freunden", why: "Bilder anderer Bewohner dort, wo die meisten Kunst aufhängen würden: Das Zimmer eines Herzensmenschen ist mit Beziehungen dekoriert." },
      ],
      foodIntro:
        "Klassisches umgängliches Wohlfühlprofil: hausmannskostartige Hauptgerichte, weiche Desserts, nichts Aggressives. Herzensmenschen bevorzugen die Speisen, die man einem Gast servieren würde — was praktischerweise auch der schnellste Weg zu ihrem Lieblingsessen ist.",
      foodTestFirst: ["Nudelsuppe", "Keks", "Tee", "Pudding"],
      foodDeprioritize: ["Bier", "Sake", "Lakritz"],
      foodTip:
        "Herzensmenschen mögen fast alles — jage der „Liebe“ also hinterher, indem du Wohlfühl-Kategorien direkt hintereinander testest: Nudelsuppe, dann Keks, dann Tee. Achte auf die Reaktion, bei der die Augen geschlossen werden — das ist die echte.",
      voicePreset: "Sägezahn — sanftes mittelhohes Register",
      voicePitchHz: 380,
      voiceSpeed: 1.0,
      voiceTip:
        "Warm mittel-hoch bei unbeschwertem Tempo. 380 Hz halten die Stimme gütig, ohne karikaturesk zu werden; 1,0x lassen jedes Wort weich landen. Das Ältere-Preset in tiefer Lage ergibt eine wunderbare Oma-Variante des Herzensmenschen.",
      romance: { partner: "Planer", why: "Die Geduld des Herzensmenschen ist die eine Kraft, die die Mauern des Planers überdauert. Das ist der Goldstandard der Insel für Slow Burn — plane den Hochzeitsort früh." },
      friend: { partner: "Optimist", why: "Die zwei Betreuer der Insel, die sich beim Um-sie-Kümmern abwechseln. Ihre Treffen sind sanft und unterstützend — und insgeheim der Grund, warum das gesamte Aufgebot funktionstüchtig bleibt." },
      friction: { partner: "Freigeist", why: "Der Herzensmensch bietet Fürsorge an; der Freigeist weicht ihr aus. Jede aufmerksame Geste kriegt ein fröhliches „Danke, nein“ — und die Sorgenspirale des Herzensmenschen ist wirklich dramatisch anzusehen." },
    },

    easygoing_softie: {
      behavior: [
        "Der Sanftmütige ist das sanfte Herz der Insel mit heruntergedrehter Lautstärke. Langsames Gehen, weiche Sprache, alles entspannt — dieser Mii erlebt die Welt bei hoher Empfindlichkeit und niedrigem Pegel, und das Spiel ehrt das: Sanftmütige bekommen die meisten „von etwas Kleinem zu Tränen gerührt“-Events im Pool. Ein schöner Sonnenuntergang ist für einen Sanftmütigen keine Kulisse; er ist ein Event.",
        "Ihre emotionale Ehrlichkeit entwaffnet — Sanftmütige können Gleichgültigkeit nicht spielen, was sie zu den Wahrheitsdetektoren der Insel macht. Wenn einem Sanftmütigen etwas unangenehm ist, weiß es jeder; ist er glücklich, fühlt sich die ganze Straße weicher an. Romantisch sind sie vorsichtig und zutiefst aufrichtig — die Persönlichkeit, die beim eigenen Geständnis am ehesten errötet. Beschütze sie vor den scharfen Kanten der Insel — oder besser: sieh zu, wie sie mutiger sind, als irgendwer erwartet hat.",
      ],
      apartmentIntro:
        "Das Zimmer eines Sanftmütigen ist ein Nest — alles weich, warmes Licht, Sicherheit in Texturform:",
      apartmentItems: [
        { name: "Plüsch-Überladung", why: "Kissen, Stofftiere, weiche Decken: maximale haptische Behaglichkeit für den Bewohner mit den meisten Gefühlen pro Quadratmeter." },
        { name: "Pastell-Palette", why: "Zartrosa und weiche Cremetöne machen den Raum selbst sanft — eine Umgebung, die nie die Stimme erhebt." },
        { name: "Gemütliche Lese-Ecke", why: "Ein gepolsterter Fenstersitz mit kleiner Lampe: die weichmöglichste Antwort auf die Frage „Wo gehen Gefühle hin, um gefühlt zu werden?“." },
      ],
      foodIntro:
        "Umgängliches Wohlfühlprofil, weichste Stufe: sanfte Süßigkeiten und warme milde Speisen führen. Überspringe alles Intensive — Bitteres, Sprudelndes oder schärfenahe Artikel landen bei dieser Persönlichkeit selten.",
      foodTestFirst: ["Pudding", "Milch", "Eis", "Erdbeere"],
      foodDeprioritize: ["Bier", "Kaffee", "Lakritz"],
      foodTip:
        "Sanftmütige haben die lesbarsten Reaktionen der Insel — jedes Gefühl zeigt sich sofort im Gesicht. Das macht Fütterungstests leicht und herzerwärmend: Ihre „Liebe“-Reaktion enthält ein kleines glückliches Wackeln, das keine andere Persönlichkeit bekommt.",
      voicePreset: "Sägezahn — zartes hohes Register",
      voicePitchHz: 440,
      voiceSpeed: 0.95,
      voiceTip:
        "Die höchste sanfte Stimme der Insel: 440 Hz bei leicht langsamem Vortrag. Die Pieps-Sprache klingt, als möchte sie sich für sich selbst entschuldigen — exakt der Charakter. Halte das Tempo unter 1,0x — ein gehetzter Sanftmütiger ist ein Widerspruch in sich.",
      romance: { partner: "Charmeur", why: "Das Selbstbewusstsein des Charmeurs trifft auf die Aufrichtigkeit des Sanftmütigen — und überraschenderweise gewinnt die Aufrichtigkeit. Vergöttert zu werden ist nett; wirklich gesehen zu werden ist das, worauf ein Sanftmütiger gewartet hat." },
      friend: { partner: "Träumer", why: "Die zwei stillsten Fühler der Insel, eine Parkbank und ein Sonnenuntergang teilend. Keine Worte nötig; die Freundschaft ist das wohltuende Schweigen selbst." },
      friction: { partner: "Macher", why: "Das Tempo und der Druck des Machers überfordern den empfindlichsten Bewohner der Insel. Der Sanftmütige beschwert sich nie, was den Macher irgendwie noch härter drücken lässt. Ein zartherziger, leise trauriger Nebenplot." },
    },

    easygoing_buddy: {
      behavior: [
        "Der Kumpel ist der Lieblings-Nebencharakter der Insel — der Mii, den alle mögen, ohne genau zu wissen, warum. Langsames Gehen, sanfte Sprache, permanent entspannt: Das ganze Ding des Kumpels ist Angenehmsein ohne Agenda. Er ist da, er freut sich, dabei zu sein, er hat keine Anmerkungen. Das Spiel besetzt ihn gern als unterstützenden Freund in den Story-Bögen aller anderen.",
        "Seine Superkraft ist Anpassungsfähigkeit: Kumpel passen in jede Gruppe, jedes Event, jedes Drama — meist als die Person, die alles leicht hält. Sie führen nicht, konkurrieren nicht und tragen keinen Groll; Insel-Streit mit Beteiligung eines Kumpels löst sich verdächtig schnell auf. Romantisch sind sie gemütlich und locker bei der ganzen Sache — die Liebesgeschichte eines Kumpels passiert also nur, wenn jemand anderes den Anfang macht — und sobald sie läuft, ist er der dramafreieste Partner der Insel.",
      ],
      apartmentIntro:
        "Das Zimmer eines Kumpels ist ein Hangout-Spot, der zufällig ein Bett enthält. Maximale Behaglichkeit, null Attitüde:",
      apartmentItems: [
        { name: "Großes weiches Sofa", why: "Das eigentliche Herzstück des Raums — Sitzplätze für alle, die vorbeischauen, Weichheit für alle, die bleiben. Das Sofa eines Kumpels ist Insel-Infrastruktur." },
        { name: "Snack-Schubladen-Situation", why: "Chips in Reichweite jedes Sitzplatzes: Gastfreundschaft als Möbel-Layout." },
        { name: "Entspannte Pflanzenecke", why: "Ein paar einfache Pflanzen, die unter Vernachlässigung gedeihen — Grün ohne Druck, sehr Kumpel-typisch." },
      ],
      foodIntro:
        "Umgängliches Wohlfühlprofil, lockere Edition: Kumpel mögen entspannte, teilbare, unkomplizierte Speisen. Snacks und einfache Hauptgerichte vor allem Formellen — teste, was du zu einem lockeren Treffen mitbringen würdest.",
      foodTestFirst: ["Popcorn", "Ramen", "Chips", "Apfel"],
      foodDeprioritize: ["Sake", "Sashimi", "Lakritz"],
      foodTip:
        "Kumpel reagieren auf Essen wie auf das Leben: zufrieden, mild, verlässlich. Ihre „Liebe“ ist ein kleines glückliches Summen und ein Lächeln — leicht neben lauten Persönlichkeiten zu übersehen. Schau genau hin; es lohnt sich, sie zu erwischen.",
      voicePreset: "Sägezahn — entspanntes Mittelregister",
      voicePitchHz: 300,
      voiceSpeed: 1.05,
      voiceTip:
        "Tonhöhe exakt in der Mitte, Tempo unbeschwert, aber nicht langsam. 300 Hz bei 1,05x ist die neutralste, freundlichste Stimme überhaupt — sie klingt, als würde sie dir beim Couchtransport helfen, ohne Fragen zu stellen.",
      romance: { partner: "Abenteurer", why: "Der Abenteurer liefert die Pläne; der Kumpel liefert das „Klar, klingt lustig“. Die leichteste Romanze der Insel — null Reibung, unendliche Hangouts, gegenseitige Freude." },
      friend: { partner: "Herzensmensch", why: "Das Wohlfühl-Duo der Insel: Der eine macht alle willkommen, der andere macht alle umsorgt. Ihre Treffen strahlen eine Wärme aus, die man noch von der Pier aus spüren kann." },
      friction: { partner: "Anführer", why: "Der Anführer verteilt laufend Pläne; der Kumpel ist laufend mit allem einverstanden. Für einen Anführer ist „keine Präferenz“ wahnsinnigmachend. Der Kumpel bleibt unbeeindruckt — was es noch schlimmer macht." },
    },
  },
};
