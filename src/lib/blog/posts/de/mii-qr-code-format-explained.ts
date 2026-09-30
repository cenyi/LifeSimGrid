/**
 * LifeSimGrid — Blogbeitrag (de): Der Mii-QR-Code im Detail
 *
 * Grundlage ist die eigene Implementierung der Seite:
 *   - src/lib/qr-handler.ts            (jsQR binaryData rein, Byte-Mode-QR raus, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (Kopieren 0x01 Bit 0, Teilen 0x30 Bit 0, Quelle: 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "Mii-QR-Code: FFL und der Offset 0x04",
  description:
    "Wie Mii-QR-Codes einen Mii in FFL-Binärdaten speichern: Header-Felder, Rechte-Flags und der Grund für „kann nicht bearbeitet werden“.",
  publishedAt: "2026-09-28",
  tags: ["Mii", "QR-Code", "3DS", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Scannst du einen Mii-QR-Code mit dem normalen Handy-Scanner, erscheint ein Bildschirm voller Buchstabensalat. Scannst du denselben Code auf einem 3DS, entsteht daraus ein kompletter Charakter — Gesicht, Name, Körperbau und ein unsichtbares Regelwerk darüber, wer ihn kopieren, teilen oder bearbeiten darf. Diese Lücke zwischen zwei Erfahrungen ist ein Stück Binär-Ingenieurskunst und der Grund, warum es unseren [Mii QR Unlocker](/de/mii-qr-unlocker) überhaupt gibt. Dieser Guide geht den Weg, den unser Werkzeug nimmt: die QR-Ebene, den FFL-Datenblock, die Rechte-Felder an Offsets wie \`0x01\` und \`0x04\` — und die genauen Gründe, warum eine Konsole **„Dieser Mii kann nicht bearbeitet werden“** meldet. Alles hier stammt aus demselben Decoder, der in unserem Tool läuft — nichts ist aus einem Wiki zusammenkopiert.",
    },
    { type: "h2", text: "Erste Überraschung: Ein Mii-QR-Code ist kein Text" },
    {
      type: "p",
      text: "Die meisten QR-Codes, die man im Alltag scannt, tragen reinen Text — eine URL, ein WLAN-Passwort, eine Speisekarte. Ein Mii-QR-Code nicht. Er trägt eine **Byte-Mode-Nutzlast**: einen rohen Binärblock, der nur für eine Konsole Sinn ergibt, die das Format kennt. Wenn ein Handy-Scanner einen solchen Code liest, versucht er, die Bytes als Text zu deuten, scheitert auf halbem Weg und gibt genau den Wirrwarr aus, den du wahrscheinlich schon gesehen hast.",
    },
    {
      type: "p",
      text: "Der technische Unterschied steckt in der QR-Spezifikation selbst. QR-Codes können Daten in mehreren Modi kodieren — numerisch, alphanumerisch, Byte und Kanji. Textinhalte nutzen den alphanumerischen oder den Byte-Mode mit UTF-8-Nutzlast; ein Mii nutzt den Byte-Mode mit einer Nutzlast, die schlicht **gar kein Text ist**. Unser Decoder liest den Code mit [jsQR](https://github.com/cozmo/jsQR) und nimmt das rohe \`binaryData\`-Array statt des dekodierten Strings — das ist das wichtigste Implementierungsdetail überhaupt: Sobald du einen Mii-QR-Code als Zeichenkette behandelst, hast du ihn bereits zerstört.",
    },
    {
      type: "p",
      text: "Das Zurückschreiben hat dieselbe Falle in umgekehrter Richtung. Ein QR-Generator, der auf URLs ausgelegt ist, kodiert Binärdaten gern durch eine Textschicht hindurch und ruiniert sie. Deshalb reicht unser Encoder den Puffer im Byte-Mode mit fester QR-Version und Fehlerkorrekturstufe durch, dimensioniert so, dass eine 3DS-Kamera den Code zuverlässig vom Handydisplay ablesen kann. Binär rein, binär raus — die Nutzlast berührt keinen String.",
    },
    { type: "h2", text: "FFL: Die Gesichtsbibliothek hinter jedem Mii" },
    {
      type: "p",
      text: "Die Daten im QR-Code beschreiben den Mii im **FFL-Format (Face Library)** — Nintendos zeichenübergreifende Charakter-Rendering-Bibliothek, von der Community öffentlich dokumentiert und die Grundlage derselben Mii-Daten, die Wii-, 3DS-, Wii-U- und Switch-Spiele verbrauchen. FFL speichert einen Mii als kompakte Struktur: Identitätsfelder wie Name und Geschlecht, eine Reihe von Erscheinungsfeldern für Gesichtszüge, Körperbau und Farben sowie einen kleinen Block mit **Rechte-Flags**, der steuert, was fremde Konsolen mit dem Charakter anfangen dürfen.",
    },
    {
      type: "p",
      text: "Zwei Eigenschaften dieses Formats prägen den Rest des Guides. Erstens: Es ist **stabil über Konsolengenerationen hinweg** — ein Mii-QR-Code aus der 3DS-Ära scannt noch auf einer Wii U, und Switch-Spiele verbrauchen dieselben zugrunde liegenden Mii-Daten. Ein einmal geschriebener Format-Guide bleibt deshalb nützlich. Zweitens: Es ist **positionsgebunden** — jedes Feld liegt an einem festen Offset vom Blockanfang, und diese Offsets verschieben sich zwischen Konsolengenerationen leicht. Einen Offset falsch erwischt, und du bekommst keinen leicht schrägen Mii, sondern einen, der überhaupt nicht mehr scannt. Genau diese Strenge ist auch der Grund, warum das Format Konsolenstarts unangetastet überlebt: Spiele erfinden es nicht neu, sie übergeben ihre Charakterdaten derselben Bibliothek.",
    },
    { type: "h2", text: "Das Header-Feldverzeichnis, Feld für Feld" },
    {
      type: "p",
      text: "Unser Tool parst die ersten Bytes des Blocks, um dir vor jeder Änderung eine Vorschau zu zeigen. Das sind die Kopffelder, die das Format definiert, und was jedes davon steuert:",
    },
    {
      type: "table",
      headers: ["Offset", "Feld", "Inhalt"],
      rows: [
        ["`0x00`", "Versionsbyte", "Welche Mii-Daten-Generation der Block nutzt"],
        ["`0x01`", "Options-Flags", "Bit `0` trägt das **Kopieren-erlauben**-Flag; die übrigen Bits decken Profanity-Flag und Region-Lock ab"],
        ["`0x02`–`0x03`", "Slot-Kopf", "Auf welcher Mii-Maker-Seite und in welchem Slot der Mii gesichert wurde"],
        ["`0x04`–`0x0B`", "System-ID", "Acht Bytes, die die Besitzer-Konsole identifizieren — das Feld, das die Bearbeitungs-Sperre prüft, und das unser Unlock-Durchlauf umschreibt"],
        ["`0x18`", "Geschlecht & persönliche Bits", "Das Geschlechts-Bit plus Geburtsdatum und Lieblingsfarbe"],
        ["`0x1A`–`0x2D`", "Name", "Bis zu 10 Zeichen in UTF-16, null-terminiert"],
        ["`0x30`", "Teilen-Flag", "Bit `0` hier ist der Schalter **Teilen deaktivieren** (Quelle: 3dbrews Mii-Format-Dokumentation)"],
      ],
    },
    {
      type: "p",
      text: "Beim Namensfeld lohnt sich ein Moment Pause, denn es ist die Stelle, an der Hand-edits am häufigsten scheitern. Zehn Zeichen heißt nicht zehn Bytes: Jedes Zeichen braucht zwei Bytes in UTF-16, ungenutzte Positionen werden mit Nullbytes gefüllt, und der Decoder stoppt am ersten Nullbyte. Schreibst du den Namen stattdessen in UTF-8, wird aus einem japanischen oder deutschen Namen auf der Konsole Mojibake; vergisst du das Nullbyte, läuft der Name in alles hinein, was danach kommt.",
    },
    {
      type: "p",
      text: "Alles nach dem Header ist der Mii selbst — Dutzende Erscheinungsfelder für Gesichtsform, Haare, Augen, Augenbrauen, Nase, Mund, Brille, Körpergröße und -statur sowie Lieblingsfarben, jeweils auf bestimmte Bits gepackt. Unser Tool liest genug davon, um eine Vorschau zu rendern, und fasst es danach bewusst **nie wieder an**: Ein Unlock, der auch nur ein einziges Gesichtspixel verändert, wäre ein Unlock, dem man nicht vertrauen dürfte.",
    },
    { type: "h2", text: "Warum gescannte Miis „Dieser Mii kann nicht bearbeitet werden“ sagen" },
    {
      type: "p",
      text: "Das Rechte-System existiert, weil Mii-QR-Codes ein Teilen-Mechanismus sind und Nintendo die Ersteller entscheiden ließ, wie weit das Teilen geht. Wird ein Mii auf einer Konsole erstellt, vermerken seine FFL-Daten die Wahl des Erstellers als Flags im Block. Scannt eine fremde Konsole diesen QR, kommt der Mii als **empfangen** an — die Konsole behandelt den ursprünglichen Ersteller als Autor, liest die Flags und setzt sie durch:",
    },
    {
      type: "ul",
      items: [
        "**Kopieren erlauben** — hat der Ersteller das Kopieren gesperrt, lässt die empfangende Konsole nicht zu, dass der Mii duplizert oder woanders gesichert wird.",
        "**Teilen deaktivieren** — ist Teilen aus, kann aus dem Mii kein neuer QR-Code erzeugt und weitergegeben werden.",
        "**Bearbeiten** — ein empfangener Mii ist auf der empfangenden Konsole nie bearbeitbar, egal wie die anderen beiden Flags stehen. Bearbeitungsrechte gehören der Konsole, auf der der Mii geboren wurde. Derselben Besitz-Logik folgt die Persönlichkeits- und Stimmenvorgabe, die unser [Stimm-Synthese-Guide](/de/blog/tomodachi-life-voice-synthesis-guide) auseinandernimmt.",
      ],
    },
    {
      type: "p",
      text: "Die dritte Regel überrascht die meisten. Du kannst einen Mii scannen, bewundern, in Spielen einsetzen — aber sobald du ihn im Editor öffnest, weigert sich die Konsole mit **„Dieser Mii kann nicht bearbeitet werden“.** Das ist kein Defekt; es sind die Flags, die exakt das tun, wofür ihr Autor sie bestimmt hat.",
    },
    {
      type: "p",
      text: "Einen offiziellen Umweg gibt es — und er funktioniert nur, wenn der Ersteller Kopieren erlaubt hat: Auf dem 3DS den Mii in den eigenen Mii Maker kopieren und aus den Teilen neu bauen. Der neu gebaute Mii ist deiner, auf deiner Konsole geboren, und vollständig bearbeitbar. Das ist mühsam für alles, was über einen Schnellfix hinausgeht, und es entfällt komplett, wenn schon das Kopieren gesperrt ist. Diese Lücke zwischen „offiziell möglich“ und „praktisch brauchbar“ ist der Raum, in dem jedes Unlock-Tool arbeitet.",
    },
    { type: "h2", text: "Was unser Unlocker ändert — und was er nie anfasst" },
    {
      type: "p",
      text: "Angesichts der Feldkarte ist die Unlock-Operation bewusst klein. Unser Tool liest die Nutzlast und schreibt das erste Byte der System-ID bei \`0x04\` — die Besitz-Identität, die eine Konsole prüft, wenn sie entscheidet, ob ein empfangener Mii bearbeitet werden darf —, sodass der Mii nicht mehr zu einem fremden Besitzer auflöst. Wenn du den Mii umtaufen willst, schreibt er das Namensfeld in korrektem UTF-16 im selben Durchlauf neu. Anschließend kodiert er den Block als frischen Byte-Mode-QR-Code neu. Alles andere wird Byte für Byte unangetastet durchgereicht.",
    },
    {
      type: "p",
      text: "Der Re-Encode-Schritt ist wichtiger, als er klingt. Der neue QR wird im Byte-Mode mit fester Version und Fehlerkorrekturstufe \`M\` erzeugt, in einer Größe gerendert, die auf das Ablesen per 3DS-Kamera vom Handydisplay abgestimmt ist. Mit den falschen QR-Einstellungen sieht der Code vielleicht tadellos aus und verweigert sich trotzdem genau der Konsole, auf die du ihn richtest — Fehlerkorrekturstufen tauschen Scan-Robustheit gegen Datenkapazität, und Mii-Nutzlasten liegen nah genug am Limit, dass die Wahl nicht kosmetisch ist.",
    },
    {
      type: "p",
      text: "Der ganze Rundlauf läuft im Browser. Die Nutzlast wird aus der Bilddatei dekodiert, die du hineinziehst, im Speicher gehalten, verändert und zurückgerendert — der Sitzungsverlauf liegt in der IndexedDB deines eigenen Browsers. Kein Server steht dazwischen, und das ist nicht nur Datenschutz: Es bedeutet auch, dass das Tool stillschweigend keine Kopie des Miis behalten kann, deines eingeschlossen.",
    },
    { type: "h2", text: "Von 3DS zu Switch: Kameras, QR-Codes und Access Keys" },
    {
      type: "p",
      text: "Die Hardware-Geschichte erklärt den größten Teil der heutigen Verwirrung um Mii-Sharing. Der 3DS hatte zwei Kameras, QR-Codes scannen war dort eine native Geste — Mii Maker, Tomodachi Life, Miitopia und StreetPass haben sie alle verwertet. Die Switch hat die Kameras ersatzlos gestrichen: Ihr Mii Maker kann einen 3DS- oder Wii-U-Mii-QR-Code weiterhin **lesen** — nur gibt es keine Kamera mehr, die ihn lesen könnte. Behalten hat die Switch die FFL-Daten selbst, weshalb das Formatwissen aus diesem Guide weiter gilt; die Teilen-Ebene ist umgezogen.",
    },
    {
      type: "p",
      text: "Für Miitopia auf der Switch hat Nintendo QR-Codes durch ein **Access-Key**-System ersetzt: ein kurzer Code, der einen Mii aus einem Onlinedienst lädt, und ein zweiter Schlüssel, der den eigenen veröffentlicht. Die Switch 2 führt diesen Ansatz fort. Access Keys lösen das Problem ohne Kamera elegant, erben aber dieselbe Rechte-Philosophie — ein geladener Mii ist das Werk eines anderen — und funktionieren nur in Spielen, die den Dienst unterstützen.",
    },
    {
      type: "p",
      text: "Die praktische Brücke zwischen den Ären läuft über das 3DS-Format: einen Mii-QR-Code nehmen, die Flags aufbrechen, falls sie geschlossen sind, und ihn über einen der Wege, mit denen Spieler die fehlende Kamera umgehen, in einen Switch-Mii-Maker bekommen — emuliertes Scannen auf einer gemoddeten Konsole oder den entsperrten Mii nach Augenmaß aus der Dekodier-Vorschau nachbauen. Existiert der Mii erst auf der Switch, sind seine Daten nativ, und er funktioniert überall dort, wo Switch-Mii-Support existiert — von [Tomodachi Life: Living the Dream](/de/tomodachi-voice-lab) bis Miitopia. Und weil das Persönlichkeitssystem auf denselben Mii-Daten reitet, gilt alles aus unserer [Tomodachi-Life-MBTI-Zuordnung](/de/blog/tomodachi-life-mbti-mapping-explained) für den transplantierten Charakter unverändert.",
    },
    { type: "h2", text: "Warum Hand-edits mit dem Hex-Editor meist scheitern" },
    {
      type: "p",
      text: "Jetzt, wo du das Layout kennst, ist die Versuchung groß, das Tool auszulassen und Bytes direkt im Hex-Editor zu kippen. Drei Fehlermodi warten dort — und alle drei sind stumm. Die Datei kündigt nie an, was schiefgelaufen ist.",
    },
    {
      type: "ol",
      items: [
        "**Falsche Generation, falsche Offsets.** Feldpositionen verschieben sich zwischen den Wii-, 3DS- und Switch-Generationen des Formats. Ein Patch gegen das falsche Layout editiert die falschen Bytes — und die wahrscheinlichsten Opfer sind die Erscheinungsfelder, die du nie anfassen wolltest.",
        "**Die String-Falle.** Hex-Editoren denken standardmäßig in Text. Öffne eine Mii-Nutzlast, editiere den Namen als ASCII, speichere — und das UTF-16-Namensfeld ist systembedingt verrutscht und beschädigt die Bytes, die darauf folgen.",
        "**Die Re-Encode-Falle.** Nach dem Byte-Edit fehlt noch der QR-Code. URL-orientierte Generatoren kodieren über eine Textschicht und verbiegen Binärnutzlasten; nur ein Byte-Mode-Encoder mit richtiger Version und Fehlerkorrekturstufe liefert einen Code, den eine Konsole akzeptiert.",
      ],
    },
    {
      type: "p",
      text: "Ein dediziertes Tool existiert, um alle drei Fehler unmöglich zu machen: feste Offsets, Byte-Mode rein und raus, und ein Namensfeld mit korrekter Kodierung und Padding. Das ist der gesamte Grund, warum [unser Unlocker](/de/mii-qr-unlocker) eine Seite ist und kein Dokumentationskommentar.",
    },
    { type: "h2", text: "Fragen, die Leute zu Mii-QR-Codes haben" },
    { type: "h3", text: "Ist das Entsperren eines Mii-QR-Codes legal und sicher?" },
    {
      type: "p",
      text: "Bei der Sicherheit sind die Mechaniken auf deiner Seite: Der Unlock schreibt nur die rechterelevanten Bytes neu und lässt den Erscheinungsblock unberührt — ein veränderter Code scannt also entweder als derselbe Mii mit neuen Rechten oder gar nicht. Zur Legalität: Das Format ist von der Community dokumentiert, das Tool arbeitet auf Mii-Daten, die du bereits besitzt, und was danach kommt, unterliegt denselben Regeln wie jede Fan-Aktivität — respektiere den ursprünglichen Ersteller und gib fremde Charaktere nicht als deine eigenen aus. Nintendos Haltung zu veränderten Mii-Daten entspricht der Haltung zum Rest des Dateisystems der Konsole: nicht unterstütztes Terrain, eigenes Urteil gefragt.",
    },
    { type: "h3", text: "Funktioniert das mit Miis aus Miitopia und Smash Bros.?" },
    {
      type: "p",
      text: "Ja. Miitopia und Super Smash Bros. Ultimate verbrauchen dieselben FFL-Format-Mii-Daten wie Tomodachi Life und der 3DS-Mii Maker; ein für ein Spiel erzeugter QR-Code scannt also in die anderen, sofern die Konsole QR-Eingabe akzeptiert. Das Format ist die gemeinsame Sprache — die Spiele sind nur unterschiedliches Publikum dafür.",
    },
    { type: "h3", text: "Warum meine Konsolenkamera den entsperrten QR-Code nicht scannt" },
    {
      type: "p",
      text: "In neun von zehn Fällen ist es Optik, nicht Daten. Displayhelligkeit auf Maximum, die Konsole auf den Abstand halten, bei dem der QR das Bild füllt, ohne zu verschwimmen, das Objektiv reinigen und Spiegelungen von Deckenlicht vermeiden. Wenn der Code sich weiterhin weigert: neu generieren — ein Screenshot eines QR-Codes kann Kompressionsartefakte tragen, die das Dekodieren verhindern; bewahre immer das original gerenderte Bild auf.",
    },
    { type: "h3", text: "Sieht der entsperrte Mii in Spielen anders aus?" },
    {
      type: "p",
      text: "Nein. Der Erscheinungsblock wird Byte für Byte durchgereicht — Gesicht, Haare, Farben, Körpergröße, Name und Stimmeinstellungen kommen exakt so an, wie der Ersteller sie gesetzt hat. Die einzigen sichtbaren Änderungen sind die, die du anforderst, etwa ein neuer Name. Wirkt ein Mii nach dem Scan anders, wurde irgendwo auf dem Weg das QR-Bild selbst verschlechtert; generiere neu und scanne erneut, bevor du den Daten die Schuld gibst.",
    },
    { type: "h3", text: "Kann ich einen Mii direkt auf der Switch bearbeiten?" },
    {
      type: "p",
      text: "Keinen empfangenen. Der Switch-Mii-Maker bearbeitet Miis, die auf dieser Konsole erstellt wurden; ein von außen ankommender Mii — per Access Key oder Scan — bleibt zum Schutz des Autors gesperrt, genauso wie auf dem 3DS. Der Weg zu einer bearbeitbaren Kopie führt übers Format: den Original-QR entsperren, damit er als lokaler, bearbeitbarer Mii scannt, und ihn dann über die Wege, die dein Setup hergibt, auf die Switch bekommen.",
    },
    { type: "h3", text: "Und das neue Mii-System der Switch 2?" },
    {
      type: "p",
      text: "Die Switch 2 führt den Access-Key-Ansatz für Miitopia fort, und die zugrunde liegenden Mii-Daten bleiben derselbe FFL-Stamm. QR-Codes als physisches Teilen-Medium gehören den Kamera-Konsolen 3DS und Wii U — und genau deshalb lohnt das Formatwissen weiterhin: Die Daten, die diese Codes tragen, sind dieselben, die deine Switch-Spiele heute verbrauchen.",
    },
    { type: "h3", text: "Kann ich die ursprünglichen Rechte wiederherstellen?" },
    {
      type: "p",
      text: "Behalte das Original-QR-Bild — der Unlock überschreibt nie deine Quelldatei, sondern erzeugt einen neuen Code mit geöffneten Flags. Willst du die Beschränkungen zurück, trägt das Originalbild sie weiterhin und scannt mit den Einstellungen des Erstellers. Was nicht geht: einen Mii wieder sperren, der bereits auf einer Konsole lebt. Bearbeitungsrechte, die deiner Konsole einmal durch einen entsperrten Scan gewährt wurden, bleiben für immer bei diesem Mii. Wer sich einen Mii von einem Freund ausgeliehen hat, sollte diese Asymmetrie kennen.",
    },
    { type: "h2", text: "Selbst ausprobieren" },
    {
      type: "p",
      text: "Am schnellsten wird das Format greifbar, wenn du das Tool mit einem eigenen Mii fütterst und zusiehst, wie die Felder erscheinen:",
    },
    {
      type: "ul",
      items: [
        "[Mii QR Unlocker](/de/mii-qr-unlocker) — QR-Code hineinziehen, Name und Rechte-Flags dekodiert sehen und einen bearbeitbaren Code neu erzeugen.",
        "[Mii Creator](/de/tomodachi-life-mii-creator) — einen Mii von Grund auf bauen, mit Live-Rendering auf FFL-Basis und Export.",
        "[Mii Eyes Editor](/de/mii-eyes) — ein fokussierter Editor für die Augenformen, die den Ausdruck eines Mii bestimmen.",
        "[Voice Lab](/de/tomodachi-voice-lab) — hören, wie Tomodachi Life aus einer Persönlichkeit eine synthetische Stimme macht.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch und Miitopia sind Marken von Nintendo. Dieser Guide beschreibt ein von der Community dokumentiertes Format für persönliche Sicherungs- und Bearbeitungszwecke und steht in keiner Verbindung zu Nintendo. Die FFL-Formatdetails folgen der öffentlichen 3dbrew-Dokumentation.",
    },
  ],
};
