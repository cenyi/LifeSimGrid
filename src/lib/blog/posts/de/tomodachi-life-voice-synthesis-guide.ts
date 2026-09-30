/**
 * LifeSimGrid — Blogbeitrag (de): Wie Tomodachi Voice Lab 8-Bit-Stimmen erzeugt
 *
 * Deutsche Übersetzung von posts/tomodachi-life-voice-synthesis-guide.ts,
 * inhaltlich verankert in der eigenen Implementierung der Website:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Wie Tomodachi Voice Lab 8-Bit-Stimmen erzeugt",
  description:
    "Die Web Audio API-Pipeline von Tomodachi Voice Lab: Oszillatoren, Wellenformen, 5 Stimmpresets und wie jeder Parameter den Klang formt.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Sprachsynthese", "Ratgeber"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Voice Lab baut seine 8-Bit-Mii-Stimmen aus einem Graphen der Web Audio API mit drei Knoten: Ein `OscillatorNode` erzeugt den Ton, ein `BiquadFilterNode` mildert ihn ab, und ein `GainNode` formt die Lautstärke-Hüllkurve. Dieser Leitfaden seziert diese Pipeline genau so, wie sie in [Tomodachi Voice Lab](/de/tomodachi-voice-lab) läuft — jede Konstante, jedes Preset und jede Scheduling-Entscheidung —, damit Sie die Beep-Sprach-Ästhetik, die an Tomodachi Life: Living the Dream erinnert, verstehen, reproduzieren oder erweitern können. Jede Zahl weiter unten stammt wörtlich aus dem Quellcode der Website, und überall dort, wo ein Wert eine Community-Schätzung statt einer von Nintendo dokumentierten Größe ist, sagt der Text das ausdrücklich.",
    },
    { type: "h2", text: "Warum Tomodachi-Stimmen in Beeps sprechen" },
    {
      type: "p",
      text: "Die markante Eigenheit des Tomodachi-Life-Sounds ist die Beep-Sprache: Statt aufgezeichneter Dialoge erzeugt jedes Mii kurze synthetisierte Töne, die dem Rhythmus eines Satzes folgen, ohne jemals echte Wörter zu formen. Der Ansatz reicht bis zu den Handheld-Ursprüngen der Serie zurück, wo Cartridge-Größe und Sound-Hardware vollständige Sprachausgabe unpraktisch machten, und er hat es bis Tomodachi Life: Living the Dream auf der Switch geschafft, weil die Beeps Teil der Identität der Serie geworden sind. Das Ergebnis liest sich als Sprache, weil es die Prosodie der Sprache kopiert — Tonhöhenbewegung, Silben-Timing, Pausen —, während es bewusst nicht-lexikalisch bleibt.",
    },
    {
      type: "p",
      text: "Nintendo hat die tatsächliche Synthesemethode des Spiels nie veröffentlicht, deshalb ist jede Browser-Rekonstruktion per Definition eine Community-Schätzung. Was das Labor anstrebt, ist die Ästhetik statt einer bit-genauen Reproduktion, und drei Eigenschaften leisten dabei die meiste Arbeit. Erstens sind die Töne kurz: Hüllkurven öffnen und schließen sich innerhalb weniger Dutzend Millisekunden, sodass jede Silbe sauber beginnt und endet. Zweitens ist die Wellenform harmonisch reich: Eine brummige Klangfarbe liest sich viel eher als „Chiptune“ denn als reiner Ton. Drittens ist die Tonhöhe nie statisch: Kleine Frequenz-Offsets pro Silbe ahmen die Kontur natürlicher Sprache nach. Der Rest dieses Leitfadens zeigt, wie sich jede dieser Eigenschaften auf einen konkreten Web Audio API-Mechanismus abbildet.",
    },
    { type: "h2", text: "Die Synthese-Pipeline, Knoten für Knoten" },
    {
      type: "p",
      text: "Jeder Klang, den das Labor erzeugt, entsteht im selben Drei-Knoten-Graphen — Oszillator, Filter, Gain — und erreicht über die letzten beiden Ihre Lautsprecher. Für jede Wiedergabe wird ein frischer `AudioContext` erstellt — das Labor hält nie einen globalen Audiographen am Leben —, und jede Silbe plant darin ihr eigenes Set an Knoten:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        nur beim Preset Ältere Person:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "Der `OscillatorNode` ist die Klangquelle. Sein `type` stammt aus dem gewählten Preset (`sawtooth` bei vier der fünf Presets, `square` beim Roboter), und seine `frequency` wird vom Tonhöhen-Regler gesetzt. Weil ein Oszillator ein bloßer Wellenform-Generator ist, hat er keine eigenen Klangfarben-Regler — alles, was ein Preset anders klingen lässt als ein anderes, ist nachgelagertes Parameter-Scheduling.",
    },
    {
      type: "p",
      text: "Der `BiquadFilterNode` ist immer als `lowpass`-Filter konfiguriert, mit einer Cutoff-Frequenz aus dem `filterFreq`-Wert des Presets (`900 – 2500 Hz` je nach Preset). Ein Tiefpass dämpft die Obertöne oberhalb seiner Cutoff-Frequenz, und genau das verwandelt das volle Brummen eines rohen Sägezahns in etwas Stimmenartiges: Dunklere Presets (Ältere Person bei `900 Hz`) behalten nur die tiefen Obertöne, während hellere Presets (Kind bei `2500 Hz`) den Glanz durchlassen, der eine Stimme klein und jung klingen lässt.",
    },
    {
      type: "p",
      text: "Im `GainNode` lebt die Hüllkurve, geplant mit vier Automatisierungspunkten. Die Verstärkung beginnt bei `0` zum Startzeitpunkt der Silbe, steigt über die Attack-Zeit linear auf den Zielwert des Presets (`0.2 – 0.3`), hält diesen Wert, bis eine Release-Zeit vor dem Ende erreicht ist, und fällt dann linear auf `0` zurück. Die Aufrufe sind `setValueAtTime()` für die Anker und `linearRampToValueAtTime()` für die Rampen — eine schlichte Attack/Hold/Release-Hüllkurve ohne exponentielle Kurven, was den Klang charakteristisch abrupt hält, wie es zur 8-Bit-Gestaltung passt.",
    },
    {
      type: "p",
      text: "Es gibt ein optionales viertes Knoten-Paar: Vibrato. Wenn ein Preset es aktiviert, läuft ein zweiter `OscillatorNode` als LFO (Niederfrequenzoszillator) mit der `vibratoRate` des Presets und speist einen `GainNode`, der auf die `vibratoDepth` gesetzt und mit dem `frequency`-Parameter des Haupt-Oszillators verbunden ist. Das ist klassische Frequenzmodulation — im Preset „Ältere Person“ versetzt ein `5 Hz`-LFO die Tonhöhe um `±15 Hz` in Schwingung und erzeugt so die bebende Qualität, die mit gealterten Stimmen assoziiert wird. Nur das Preset „Ältere Person“ schaltet das Vibrato ein; die anderen vier lassen es vollständig deaktiviert.",
    },
    { type: "h2", text: "Wie jede Wellenform klingt (und wann Sie welche wählen)" },
    {
      type: "p",
      text: "Die Wahl der Wellenform ist die größte Klangfarben-Entscheidung der gesamten Pipeline, denn sie bestimmt den Oberton-Gehalt, den anschließend Filter und Hüllkurve formen. Der `OscillatorNode` der Web Audio API bietet vier Standardtypen, und jeder hat einen eigenen Charakter:",
    },
    {
      type: "table",
      headers: ["Wellenform", "Oberton-Gehalt", "Charakter", "Von Presets genutzt"],
      rows: [
        ["`sine`", "Nur Grundton", "Rein, flötenartig, ohne jedes Brummen", "Keines (verfügbar über `OscillatorType`)"],
        ["`square`", "Ungerade Obertöne, stark", "Hohl, klassischer NES-Lead-Kanal", "Roboter"],
        ["`sawtooth`", "Alle Obertöne, abfallend", "Brummig, bläserartig, am nächsten an stimmlicher Fülle", "Erwachsener Mann, Erwachsene Frau, Ältere Person, Kind"],
        ["`triangle`", "Wenige ungerade Obertöne, schwach", "Weich, samtig, leicht gedämpft", "Keines (verfügbar über `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "Die Presets des Labors verwenden nur zwei der vier: `sawtooth` trägt die vier organischen Stimmen, und `square` trägt den Roboter. Diese Aufteilung ist Absicht. Ein Sägezahn enthält Energie bei jedem Oberton, was nach der Tiefpass-Filterung einen dichten, stimmenartigen Kern hinterlässt — der Grund, warum er sich gesungenen oder gesprochenen Tönen besser annähert als jede andere Basis-Wellenform. Eine Rechteckwelle behält nur ungerade Obertöne mit mehr Energie in den Höhen, was die hohle, nasale, unverwechselbar elektronische Qualität erzeugt, die das Roboter-Preset anstrebt. `Sine` und `triangle` verwendet kein aktuelles Preset, doch sie bleiben über dasselbe `OscillatorType`-Feld Ein-Zeilen-Änderungen: Sinus passt zu reinen Soundeffekten wie Glockenspielen, und Dreieck passt zu weichen Hintergrund-Blips, wo ein Sägezahn zu aggressiv wäre.",
    },
    { type: "h2", text: "Die fünf Stimm-Presets, entschlüsselt" },
    {
      type: "p",
      text: "Die fünf Presets sind fünf Parameter-Bündel über demselben Drei-Knoten-Graphen, und ihre Unterschiede lassen sich vollständig aufzählen. Hier ist die vollständige Tabelle, direkt zitiert aus der Konstante `VOICE_PRESETS` im Quellcode:",
    },
    {
      type: "table",
      headers: ["Preset", "Wellenform", "Basisfrequenz", "Tiefpass-Cutoff", "Verstärkung", "Vibrato", "Attack", "Release"],
      rows: [
        ["Erwachsener Mann", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Aus", "`0.02 s`", "`0.05 s`"],
        ["Erwachsene Frau", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Aus", "`0.02 s`", "`0.04 s`"],
        ["Ältere Person", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Kind", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Aus", "`0.01 s`", "`0.03 s`"],
        ["Roboter", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Aus", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Erwachsener Mann** verankert das Set bei einer Basisfrequenz von `180 Hz`, am unteren Ende der typischen Sprechstimmlage erwachsener Männer, mit einem `1200 Hz`-Tiefpass, der das Sägezahn-Brummen zu etwas Gerundetem zähmt. **Erwachsene Frau** verdoppelt die Basisfrequenz fast auf `350 Hz`, öffnet den Filter auf `1800 Hz` für einen helleren Ton und stutzt sowohl die Verstärkung (`0.25`) als auch das Release (`0.04 s`) für eine etwas knackigere Artikulation.",
    },
    {
      type: "p",
      text: "**Ältere Person** ist das am stärksten verarbeitete Preset: das tiefste Register (`120 Hz`), der dunkelste Filter (`900 Hz`), das einzige Vibrato (`5 Hz`-LFO mit `±15 Hz` Tiefe) und die langsamste Hüllkurve (`0.04 s` Attack, `0.08 s` Release). Diese letzten beiden Werte sind so wichtig wie die Tonhöhe — der träge Attack weicht den Einsatz jeder Silbe auf, und das lange Release lässt Töne leicht in den folgenden übergehen, was die weniger präzise Artikulation einfängt, auf die das Preset abzielt.",
    },
    {
      type: "p",
      text: "**Kind** kehrt fast jede Entscheidung des Presets „Ältere Person“ um: die höchste Basisfrequenz (`600 Hz`), der hellste Filter (`2500 Hz`), die niedrigste Verstärkung (`0.20`) und die schnellste Hüllkurve (`0.01 s` Attack, `0.03 s` Release). Schnelle Hüllkurven auf hohen Tonhöhen sind das klassische Rezept für kleine Kreatur-Stimmen — jede Silbe landet wie ein kurzes Zwitschern. **Roboter** ist der Sonderfall auf zwei Achsen: Er ist die einzige `square`-Welle und das einzige Preset mit null Attack und null Release, das heißt, die Verstärkung schaltet augenblicklich ein und aus. Diese abrupten Kanten erzeugen die harte, abgehackt-mechanische Qualität, die das Preset will — keine Rampe bedeutet keine Weichheit, per Konstruktion.",
    },
    { type: "h2", text: "Wie Tonhöhe und Geschwindigkeit den Oszillator wirklich steuern" },
    {
      type: "p",
      text: "Zwei Schieberegler steuern den Graphen in Echtzeit: die Tonhöhe, über `100 – 800 Hz` mit dem Standardwert `300 Hz`, und die Geschwindigkeit, über `0.5x – 2.0x` mit dem Standardwert `1.0x`. Jedes Preset deklariert außerdem seine eigene kanonische `baseFreq` (das Referenzzentrum aus der Tabelle oben), die dokumentiert, wo dieser Stimmtyp angesiedelt sein soll.",
    },
    {
      type: "p",
      text: "Die Tonhöhe setzt die Oszillatorfrequenz direkt, mit einer einzigen Schutzklemme: Im Kind-Preset ist die gespielte Frequenz `Math.max(pitch, 500)`, deshalb bewirkt das Ziehen des Reglers unter `500 Hz` im Kind-Modus nichts — der Oszillator sinkt nie unter diese Untergrenze. Diese Klemme schützt den Charakter des Presets, denn eine Kinderstimme bei `150 Hz` würde schlicht wie ein leiser erwachsener Mann klingen.",
    },
    {
      type: "p",
      text: "Die Geschwindigkeit steuert die Zeit, nicht die Frequenz. Ein einzelner Druck auf die Abspielen-Taste erzeugt einen Beep von `0.5 / speed` Sekunden — `1.0 s` bei `0.5x`, `0.5 s` bei `1.0x` und `0.25 s` bei `2.0x`. Derselbe Divisor gilt für jede Zeitkonstante im Textmodus, deshalb ist eine `2.0x`-Stimme tatsächlich von Anfang bis Ende doppelt so schnell, statt resampelt zu werden, was ihre Tonhöhe verschoben hätte. Nach der Wiedergabe setzt die Oberfläche ihren Abspielzustand nach `500 / speed + 50` Millisekunden zurück: der Beep-Länge plus einer `50 ms`-Sicherheitszugabe.",
    },
    { type: "h2", text: "Von Text zu Sprache, ein Beep pro Zeichen" },
    {
      type: "p",
      text: "Der Text-Sprechen-Modus des Labors ist keine Sprach-Engine — sondern dieselbe Drei-Knoten-Oszillator-Pipeline, einmal pro Zeichen geplant. Wenn Sie bis zu `100` Zeichen eintippen und auf Sprechen drücken, wird die Eingabe in einzelne Zeichen aufgeteilt, und jedes Zeichen außer Leerzeichen wird zu einem geplanten Silben-Beep mit einem Tonhöhen-Offset, der aus seinem Zeichencode abgeleitet wird. Die Zeitkonstanten, alle durch die Geschwindigkeit geteilt:",
    },
    {
      type: "ul",
      items: [
        "**Zeichenton** — `0.08 / speed` Sekunden pro Zeichen (`0.08 s` bei `1.0x`).",
        "**Lücke zwischen Zeichen** — `0.03 / speed` Sekunden zwischen aufeinanderfolgenden Zeichen.",
        "**Wortlücke** — ein Leerzeichen fügt `0.12 / speed` Sekunden Stille ein, rund 1,5 Zeichenlängen.",
        "**Phrasenpause** — jedes 5. Zeichen (`i % 5 === 4`) fügt eine zusätzliche Pause von `gap × 2` hinzu, was dem Output eine Kadenz statt eines flachen Stroms gibt.",
        "**Vorlauf** — das Scheduling startet bei `currentTime + 0.05` Sekunden, damit der Audiograph vor dem ersten Ton bereit ist.",
      ],
    },
    {
      type: "p",
      text: "Die Tonhöhen-Variation ist der clevere Teil. Der Frequenz-Offset jedes Zeichens wird als `((charCode % 20) - 10) × 3` berechnet, was eine deterministische Streuung zwischen `-30 Hz` und `+27 Hz` um die Grundtonhöhe ergibt. Deterministisch ist entscheidend: Dasselbe Wort erzeugt immer dieselbe melodische Kontur, deshalb wird eine bestimmte Phrase so wiedererkennbar, wie die Stimme eines Miis wiedererkennbar ist. Weil die Offsets aus Zeichencodes stammen statt aus Phonetik, folgt der Output eng dem Rhythmus des Textes, während er nicht-lexikalischer Kauderwelsch bleibt — genau der Beep-Sprach-Effekt, den das Labor anzunähern versucht.",
    },
    { type: "h2", text: "Eine Stimme für jede Persönlichkeitsgruppe entwerfen" },
    {
      type: "p",
      text: "Eine überzeugende Persönlichkeitsstimme ist größtenteils eine Entscheidung für einen Tonhöhenbereich: Wählen Sie das Preset, das die Referenztabelle der Website der Persönlichkeitsgruppe Ihres Mii zuweist, und parken Sie den Tonhöhen-Regler dann innerhalb des empfohlenen Bereichs. Die vollständige Zuordnung, die die [Referenztabelle des Voice Labs](/de/tomodachi-voice-lab) verwendet:",
    },
    {
      type: "table",
      headers: ["Gruppe", "Beispieltyp", "MBTI", "Voreinstellung", "Tonhöhenbereich"],
      rows: [
        ["Lebhaft", "Anführer", "ESTJ", "Erwachsener Mann", "`180 – 250 Hz`"],
        ["Selbstbewusst", "Designer", "INTJ", "Erwachsener Mann", "`150 – 200 Hz`"],
        ["Unabhängig", "Künstler", "INFP", "Erwachsene Frau", "`280 – 380 Hz`"],
        ["Entspannt", "Träumer", "INFJ", "Ältere Person", "`120 – 180 Hz`"],
        ["Kindähnliche Charaktere", "Beliebig", "Beliebig", "Kind", "`500 – 700 Hz`"],
        ["Roboter-/KI-Charaktere", "Beliebig", "Beliebig", "Roboter", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Beachten Sie, dass die Tabelle Gruppen abbildet, nicht alle 16 Persönlichkeiten — die vier Persönlichkeitsgruppen unserer [MBTI-Zuordnung](/de/tomodachi-life-mbti) erhalten je eine repräsentative Stimm-Silhouette, und einzelne Persönlichkeiten drücken sich darin aus, wo innerhalb des Bereichs Sie den Regler setzen und wie schnell Sie die Geschwindigkeit laufen lassen. Das Rezept Schritt für Schritt:",
    },
    {
      type: "ol",
      items: [
        "**Wählen Sie das Preset passend zur Gruppe.** Lebhafte und Selbstbewusste Miis bekommen das Preset „Erwachsener Mann“; Unabhängige Miis bekommen Erwachsene Frau; Entspannte Miis bekommen Ältere Person, deren `5 Hz`-Vibrato die entspannte, gemächliche Qualität beisteuert, für die die Gruppe bekannt ist. Die Gruppe eines Miis ergibt sich aus seinen vier Persönlichkeits-Schiebereglern — siehe die [Persönlichkeitsübersicht](/de/tomodachi-life-personality-chart), falls Sie sie noch nicht kennen.",
        "**Setzen Sie den Tonhöhen-Regler innerhalb des Gruppenbereichs.** Für einen Selbstbewussten Designer bedeutet das `150 – 200 Hz`; Richtung `150 Hz` liest sich imposanter, Richtung `200 Hz` energiegeladener. Die `500 Hz`-Untergrenze des Kind-Presets sorgt dafür, dass sich der Bereich `500 – 700 Hz` von selbst durchsetzt.",
        "**Wählen Sie die Geschwindigkeit passend zum Sprechstil.** Schnellsprechende Entertainer-Typen rechtfertigen `1.4x – 2.0x`; ein schläfriger Träumer sitzt natürlich bei `0.5x – 0.8x`. Die Geschwindigkeit ändert nur die Dauer, sie verstimmt also nie die Stimme, die Sie in Schritt 2 gewählt haben.",
        "**Testen Sie mit einer kurzen Phrase.** Tippen Sie `20 – 30` Zeichen in das Textfeld und achten Sie auf die Phrasenpause bei jedem 5. Zeichen — wenn sich die Kadenz für die Persönlichkeit falsch anfühlt, justieren Sie die Geschwindigkeit, bevor Sie die Tonhöhe anfassen.",
        "**Iterieren Sie anhand Ihrer Historie.** Jede Wiedergabe — Preset, Tonhöhe, Geschwindigkeit und bis zu `100` Zeichen Text — wird in einem lokalen `IndexedDB`-Historien-Panel im Tool gespeichert, sodass Sie zwei Einstellungen im A/B-Vergleich gegenüberstellen können, ohne sie aufzuschreiben. Nichts verlässt den Browser.",
      ],
    },
    {
      type: "p",
      text: "Die Zeilen für Kind und Roboter liegen absichtlich außerhalb des Persönlichkeitssystems: Jedes Mii kann mit beiden Stimmen versehen werden, weshalb ihre MBTI-Spalte „Beliebig“ lautet. Die Hüllkurve mit null Länge macht den Roboter tempotolerant — bei jeder Geschwindigkeit behält er dieselbe abgehackte Steifheit, deshalb ist er die eine Stimme, bei der die Geschwindigkeit rein ein komödiantischer Regler ist.",
    },
    { type: "h2", text: "Warum es keinen Web Speech API-Fallback gibt" },
    {
      type: "p",
      text: "Das Labor vermeidet die Web Speech API des Browsers bewusst — es gibt nirgendwo in seiner Codebasis einen `speechSynthesis`-Aufruf, und der Text-Sprechen-Modus ist reines Oszillator-Scheduling. Das ist eine Design-Entscheidung mit einer vertretbaren Begründung und einem echten Kompromiss, und es lohnt sich, beides explizit auszuführen.",
    },
    {
      type: "p",
      text: "Die Begründung: `speechSynthesis` erzeugt natürliche menschliche Stimmen, und genau das will ein 8-Bit-Sprachlabor nicht. Es delegiert die Stimmauswahl außerdem an das Betriebssystem, sodass derselbe Text über Browser und Geräte hinweg unterschiedlich klingen kann, und mehrere Browser laden Stimmen verzögert mit spürbarer Latenz bei der ersten Äußerung. Der Beep-pro-Zeichen-Ansatz hält jeden Klang in demselben Drei-Knoten-Graphen, den auch der Einzelbeep-Modus verwendet, liefert überall dort, wo die Web Audio API funktioniert, garantiert dieselbe Klangfarbe und startet sofort, weil nichts geladen werden muss.",
    },
    {
      type: "p",
      text: "Der Kompromiss: Der Output ist keine verständliche Sprache. Er folgt Rhythmus und Kontur des Textes, produziert aber keine erkennbaren Wörter, erinnert also eher an die Kadenz der Beep-Sprache von Tomodachi Life als an ihre Verständlichkeit — und auch der Kauderwelsch des Spiels ist nicht verständlich, was durchaus der Punkt sein dürfte. Das Stoppen der Wiedergabe ist ähnlich brachial und effektiv: Das Labor schließt den gesamten `AudioContext` per `close()`, was jeden geplanten Knoten sofort abschaltet, statt auszublenden.",
    },
    { type: "h2", text: "Grenzen, ehrlich benannt" },
    {
      type: "p",
      text: "Drei Einschränkungen begrenzen, was dieser Synthesizer ehrlich behaupten kann. Erstens bildet er eine Ästhetik nach, nicht die Engine des Spiels: Nintendo hat nie dokumentiert, wie Tomodachi Life seine Stimmen erzeugt, deshalb sind die Preset-Werte hier Community-Schätzungen, abgestimmt darauf, den Klang der Serie zu evozieren, keine extrahierten Konstanten. Die Stimmen erinnern an die des Spiels, sie sind keine getreuen Nachbildungen.",
    },
    {
      type: "p",
      text: "Zweitens ist die Synthese monophon und formantfrei. Jede Silbe ist ein einzelner Oszillator, geformt von einem einzigen Tiefpass, während natürliche Sprache — und vermutlich auch die ausgefeiltere Engine des Spiels — Formant-Struktur aus dem Vokaltrakt mitbringt. Deshalb liest sich der Output als Chiptune-Stimme statt als gesampelte Sprache, und das ist die Lücke, die sich am meisten zu erkunden lohnt, wenn Sie den Code erweitern: Ein zweiter Oszillator eine Oktave höher oder ein Filter mit geplanter Frequenzbewegung würden beide das Ergebnis näher an stimmliches Terrain heranschieben.",
    },
    {
      type: "p",
      text: "Drittens hängt alles von der Browser-Unterstützung ab. Die hier verwendete Web Audio API — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — wird von allen aktuellen großen Browsern unterstützt, aber der Ausgabe-Charakter der Web Audio API variiert dennoch leicht über die Audio-Stacks der Geräte hinweg, und Browser, die Autoplay bis zu einer Nutzergeste blockieren, verlangen den Druck auf die Abspielen-Taste, den das Labor ohnehin bereitstellt. Was den Datenschutz angeht, ist das Tool vollständig clientseitig: Die Synthese läuft im Browser, und die einzige Persistenz ist die lokale `IndexedDB`-Historie — kein Audio und kein Text wird irgendwohin hochgeladen.",
    },
    { type: "h2", text: "Probieren Sie die Pipeline selbst aus" },
    {
      type: "p",
      text: "Der schnellste Weg, das Modell zu verinnerlichen, besteht darin, die beiden Schieberegler zu bewegen und zu hören, wie der Graph in Echtzeit reagiert:",
    },
    {
      type: "ul",
      items: [
        "[Tomodachi Voice Lab](/de/tomodachi-voice-lab) — der Synthesizer selbst: fünf Presets, der `100 – 800 Hz`-Tonhöhen-Regler, die Geschwindigkeitsregelung und der Beep-pro-Zeichen-Textmodus.",
        "[MBTI-Zuordnung](/de/tomodachi-life-mbti) — wie die vier Persönlichkeits-Schieberegler eines Mii seine Gruppe erzeugen, die in der Tabelle oben sein Preset bestimmt.",
        "[Persönlichkeitsübersicht](/de/tomodachi-life-personality-chart) — die vollständige 16-Typen-Referenz für die Wahl einer repräsentativen Persönlichkeit als Stimme.",
        "[Mii QR Unlocker](/de/mii-qr-unlocker) — kombinieren Sie eine entworfene Stimme mit einem bearbeiteten Mii-Charakter zum vollständigen Inselbewohner.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life und Nintendo sind eingetragene Marken der jeweiligen Eigentümer. Dieser Sprachsynthesizer ist eine von Fans erstellte Interpretation zu Unterhaltungszwecken und steht weder in Verbindung mit Nintendo noch wird er von Nintendo befürwortet.",
    },
  ],
};
