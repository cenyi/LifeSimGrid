/**
 * LifeSimGrid — Blogartikel (nl): het formaat van Mii QR-codes, uitgelegd
 *
 * Gebaseerd op de eigen implementatie van de site:
 *   - src/lib/qr-handler.ts            (jsQR binaryData erin, byte-mode-QR eruit, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (kopiëren toegestaan 0x01 bit 0, delen verboden 0x30 bit 0, bron: 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "Mii QR-code: het FFL-formaat en offset 0x04",
  description:
    "Hoe een Mii QR-code een Mii in binair FFL bewaart: kopvelden, permissievlaggen en waarom je console '\"kan niet bewerken\" zegt.",
  publishedAt: "2026-09-28",
  tags: ["Mii", "QR-code", "3DS", "gidsen"],
  blocks: [
    {
      type: "p",
      text: "Scan een Mii QR-code met de gewone telefoonscanner en je krijgt een scherm vol wartaal. Scan dezelfde code op een 3DS en er arriveert een compleet personage — gezicht, naam, gestalte — plus een onzichtbare reeks regels over wie hem mag kopiëren, delen en bewerken. Dat gat tussen twee ervaringen is een klein stukje binaire ingenieurskunst, en de reden dat onze [Mii QR-ontgrendelaar](/nl/mii-qr-unlocker) bestaat. Deze gids loopt het formaat langs de weg die het hulpmiddel werkelijk neemt: de QR-laag, het FFL-datablok, de permissievelden op offsets als \`0x01\` en \`0x04\`, en de precieze redenen waarom een console **\"Deze Mii kan niet worden bewerkt\"** meldt. Elke uitspraak hier komt uit dezelfde decoder die in onze tool draait — niets is uit een wiki overgeschreven.",
    },
    { type: "h2", text: "Eerste verrassing: een Mii QR-code is geen tekst" },
    {
      type: "p",
      text: "De meeste codes die je dagelijks scant, dragen platte tekst: een url, een wifi-wachtwoord, een menukaart. Een Mii QR-code niet. Hij draagt een **byte-mode-payload**: een rauw blok binaire data dat alleen zin heeft voor een console die het formaat kent. Als de telefoonscanner hem leest, probeert hij die bytes in welke codering dan ook als tekst te duiden, struikelt halverwege en spuugt de brij uit die je vast al eens gezien hebt.",
    },
    {
      type: "p",
      text: "Het technische verschil huist in de QR-specificatie zelf. Een code kan data in meerdere modi vervoeren — numeriek, alfanumeriek, byte en kanji. Tekst reist in alfanumeriek of byte mode met een UTF-8-payload; een Mii gebruikt ook byte mode, maar zijn payload is **helemaal geen tekst**. Onze decoder leest de code met [jsQR](https://github.com/cozmo/jsQR) en pakt de rauwe \`binaryData\`-array in plaats van de gedecodeerde tekenreeks. Dat is het belangrijkste implementatiedetail van allemaal: op het moment dat je een Mii QR-code als tekenreeks behandelt, heb je hem al geruïneerd.",
    },
    {
      type: "p",
      text: "Bij het terugschrijven wacht dezelfde val, nu op zijn kop. Een generator die voor url's gebouwd is, codeert binaire data graag via een tekstlaag opnieuw en ramt ze kapot zonder een woord. Daarom laat onze encoder de buffer in byte mode passeren, met een vaste QR-versie en foutcorrectieniveau, op maat zodat een 3DS-camera de code van een telefoonscherm betrouwbaar kan lezen. Binair in, binair uit: de payload raakt nooit een tekenreeks.",
    },
    { type: "h2", text: "FFL: de gezichtsbibliotheek achter elke Mii" },
    {
      type: "p",
      text: "De data in de code beschrijft de Mii in het **FFL-formaat (Face Library)** — de karakterweergavebibliotheek die Nintendo over zijn consoles heen deelt, publiek gedocumenteerd door de community, en de grondslag van dezelfde Mii-data die Wii-, 3DS-, Wii-U- en Switch-spellen consumeren. FFL bewaart een Mii als compacte structuur: identiteitsvelden als naam en geslacht, een reeks uiterlijk-velden voor gezichtstrekken, gestalte en kleuren, en een klein blok **permissievlaggen** dat bepaalt wat andermans console met het personage mag doen.",
    },
    {
      type: "p",
      text: "Twee eigenschappen van het formaat vormen de basis voor de rest van deze gids. Eén: het is **stabiel over consolegeneraties heen** — een Mii QR-code uit het 3DS-tijdperk scant nog op een Wii U, en Switch-spellen consumeren dezelfde onderliggende data; een eenmalig geschreven formatgids blijft dus lang bruikbaar. Twee: het is **slaaf van posities** — elk veld ligt op een vaste offset vanaf het begin van het blok, en die offsets schuiven per generatie lichtjes. Eén offset missen en je krijgt geen ietwat eigenaardige Mii, maar een Mii die niet eens scant. Die strengheid verklaart tegelijk waarom het formaat consolewisselingen ongeschonden doorstaat: games vinden het niet opnieuw uit, ze leggen hun karakterdata bij dezelfde bibliotheek neer.",
    },
    { type: "h2", text: "De kop, veld voor veld" },
    {
      type: "p",
      text: "Voordat er ook maar iets wijzigt, parseert de tool de eerste bytes van het blok en toont een voorproefje. Dit zijn de kopvelden die het formaat definieert, en wat elk ervan bestuurt:",
    },
    {
      type: "table",
      headers: ["Offset", "Veld", "Inhoud"],
      rows: [
        ["`0x00`", "Versiebyte", "Welke Mii-data-generatie het blok gebruikt"],
        ["`0x01`", "Optievlaggen", "Bit `0` draagt de vlag **kopiëren toestaan**; de overige bits dekken de grofvlag en de regioblokkering af"],
        ["`0x02`–`0x03`", "Slotkop", "Op welke Mii Maker-pagina en in welke slot de Mii is bewaard"],
        ["`0x04`–`0x0B`", "Systeem-ID", "Acht bytes die de bezittende console identificeren — het veld dat de bewerkingscontrole raadpleegt, en dat onze unlock-pass herschrijft"],
        ["`0x18`", "Geslacht & persoonlijke bits", "De geslachtsbit, plus geboortedatum en lievelingskleur"],
        ["`0x1A`–`0x2D`", "Naam", "Tot 10 tekens in UTF-16, null-beëindigd"],
        ["`0x30`", "Deelvlag", "Bit `0` hier is de schakelaar **delen verbieden** (bron: de Mii-formaatdocumentatie op 3dbrew)"],
      ],
    },
    {
      type: "p",
      text: "Het naamveld verdient een aparte vermelding, want daar struikelt handmatig bewerken het vaakst. 'Tien tekens' betekent niet 'tien bytes': in UTF-16 kost elk teken twee bytes, ongebruikte posities worden met nullen gevuld, en de decoder stopt bij de eerste nul. Schrijf de naam in UTF-8 en een Japanse of Duitse naam wordt wartaal op de console; vergeet de null-beëindiger en de naam vreet wat erachter komt op.",
    },
    {
      type: "p",
      text: "Alles na de kop is de Mii zelf: tientallen uiterlijk-velden — gezichtsvorm, haar, ogen, wenkbrauwen, neus, mond, bril, lengte, bouw en lievelingskleuren — elk gepakt in precieze bits. De tool leest net genoeg om een voorbeeld te tekenen en raakt daarna opzettelijk **niets meer aan**: een unlock die ook maar één gezichtspixel verzet, is een unlock waar je niet op kunt vertrouwen.",
    },
    { type: "h2", text: "Waarom gescande Mii's \"deze Mii kan niet worden bewerkt\" zeggen" },
    {
      type: "p",
      text: "Het permissiesysteem bestaat omdat de Mii QR-code een deelmechanisme is en Nintendo de maker heeft laten beslissen hoe ver dat delen reikt. Wanneer een Mii op een console wordt gemaakt, zet zijn FFL-data de keuze van de maker als vlaggen in het blok. Scant een andere console die QR, dan arriveert de Mii als **ontvangen**: de console behandelt de oorspronkelijke maker als auteur, leest de vlaggen en voert ze letterlijk uit:",
    },
    {
      type: "ul",
      items: [
        "**Kopiëren toestaan** — sloot de maker het kopiëren af, dan staat de ontvangende console niet toe dat de Mii wordt gedupliceerd of elders bewaard.",
        "**Delen verbieden** — met delen uit komt er geen nieuwe QR uit deze Mii voor de volgende persoon.",
        "**Bewerken** — een ontvangen Mii is op de ontvangende console nooit bewerkbaar, hoe de andere twee vlaggen ook staan. Het bewerkingsrecht hoort bij de console waar de Mii geboren is. Dezelfde eigendomslogica stuurt de standaardwaarden van persoonlijkheid en stem aan; onze [stem-synthetiseringgids](/nl/blog/tomodachi-life-voice-synthesis-guide) haalt die uit elkaar.",
      ],
    },
    {
      type: "p",
      text: "De derde regel is degene die verbaast. Je kunt een Mii scannen, bewonderen, in games gebruiken — maar op het moment dat je hem in de editor probeert te openen, weigert de console: **\"Deze Mii kan niet worden bewerkt.\"** Dat is geen defect; het zijn de vlaggen, scrupuleus trouw aan wat hun maker vroeg.",
    },
    {
      type: "p",
      text: "Er is één officiële omweg, en die werkt alleen als de maker kopiëren toestond: op de 3DS kopieer je de Mii naar je eigen Mii Maker en bouw je hem onderdeel voor onderdeel na. De nagebouwde Mii is geboren op jouw console, volledig van jou en volledig bewerkbaar. Het nadeel: voor alles voorbij een snelle retouche is het een karwei, en zodra het kopiëren zelf op slot zit, valt de route weg. Die kloof tussen 'officieel mogelijk' en 'praktisch bruikbaar' is precies het terrein van elke unlock-tool.",
    },
    { type: "h2", text: "Wat onze ontgrendelaar verandert — en wat hij nooit raakt" },
    {
      type: "p",
      text: "Met de veldkaart voor ogen is de unlock-bewerking bewust klein: de tool leest de payload en herschrijft de eerste byte van het System-ID op \`0x04\` — de eigendomsidentiteit waaraan een console toetst of een ontvangen Mii bewerkt mag worden —, zodat de Mii niet meer aan een vreemde eigenaar koppelt. Wil je de Mii hernoemen, dan herschrijft hij het naamveld in correcte UTF-16 in dezelfde pass. Daarna codeert hij het blok om tot een frisse byte-mode-QR. Alle overige bytes passeren één voor één, onaangeroerd.",
    },
    {
      type: "p",
      text: "De hercodeerstap weegt zwaarder dan hij klinkt. De nieuwe QR ontstaat in byte mode, met vaste versie en foutcorrectieniveau \`M\`, getekend op een maat die is afgestemd zodat een 3DS-camera hem van een telefoonscherm leest. Met verkeerde QR-instellingen kan de code er kraaknet uitzien en toch weigeren bij exact de console waar je hem op richt: foutcorrectieniveaus ruilen scanrobuustheid tegen datacapaciteit, en de Mii-payload kruipt dicht tegen de grens — die keuze is geen cosmetica.",
    },
    {
      type: "p",
      text: "De hele rondreis speelt zich in je browser af. De payload wordt uit het bestand dat je neerzet gedecodeerd, in het geheugen gehouden, aangepast en teruggetekend; de sessiegeschiedenis slaapt in de IndexedDB van je eigen browser. Geen server ertussenin — en dat is meer dan privacy-gemak: het betekent dat de route waarmee de tool heimelijk een kopie van iemands Mii zou achterhouden, inclusief die van jou, niet bestaat.",
    },
    { type: "h2", text: "Van 3DS naar Switch: camera's, QR-codes en toegangssleutels" },
    {
      type: "p",
      text: "Het grootste deel van de hedendaagse verwarring rond Mii-delen verklaart zich uit de hardwaregeschiedenis. De 3DS had twee camera's, en daar was het scannen van een QR een ingebakken gebaar van het toestel zelf: Mii Maker, Tomodachi Life, Miitopia en StreetPass aten er allemaal van. Switch haalde de camera's helemaal weg: zijn Mii Maker kan een Mii-QR van 3DS of Wii U nog steeds **lezen** — in theorie, want er is geen camera die hem leest. Wat Switch behield, zijn de FFL-data zelf; daarom blijft de formaatkennis uit deze gids geldig. Wat verhuisde, is de deellaag.",
    },
    {
      type: "p",
      text: "Voor Miitopia op Switch verving Nintendo de QR-codes door een systeem van **toegangssleutels**: een korte code die een Mii uit een onlinedienst laadt, en een tweede sleutel om je eigen Mii te publiceren. Switch 2 zet dit voort. Toegangssleutels lossen het camera-loze probleem elegant op, erven dezelfde permissiefilosofie — een gedownloade Mii is andermans werk — en werken alleen in games die de dienst ondersteunen.",
    },
    {
      type: "p",
      text: "De praktische brug tussen beide tijdperken loopt over het 3DS-formaat: pak een Mii QR-code, open de vlaggen als ze dicht zijn, en breng hem naar de Mii Maker op Switch via een van de wegen waarmee spelers de ontbrekende camera omzeilen — geëmuleerd scannen op een gemodde console, of de ontgrendelde Mii op het oog nabouwen vanuit de gedecodeerde preview. Zit de Mii eenmaal op Switch, dan draait zijn data native en wordt hij geaccepteerd overal waar Switch Mii's ondersteunt, van [Tomodachi Life: Living the Dream](/nl/tomodachi-voice-lab) tot Miitopia. En omdat het persoonlijkheidssysteem op dezelfde Mii-data rijdt, geldt alles uit onze [Tomodachi Life MBTI-mapping](/nl/blog/tomodachi-life-mbti-mapping-explained) ongewijzigd voor het getransplanteerde personage.",
    },
    { type: "h2", text: "Waarom handmatig bewerken met een hex-editor meestal faalt" },
    {
      type: "p",
      text: "Nu je de kaart kent, prikkelt het om de tool over te slaan en bytes rechtstreeks in een hex-editor om te draaien. Daar wachten drie faalmodi, en alle drie zijn ze stom: het bestand meldt nooit wat er scheef ging.",
    },
    {
      type: "ol",
      items: [
        "**Andere generatie, andere offsets.** Veldposities schuiven tussen de Wii-, 3DS- en Switch-generaties van het formaat. Een patch op de verkeerde indeling bewerkt de verkeerde bytes — en de eerste slachtoffers zijn doorgaans de uiterlijk-velden die je nooit wilde raken.",
        "**De tekenreeksval.** Hex-editors denken standaard in tekst. Je opent de payload, bewerkt de naam als ASCII, slaat op — en het UTF-16-naamveld is bij ontwerp verschoven, met de bytes erachter als puin.",
        "**De hercodeerval.** Na de bytebewerking resteert nog de QR. Url-gerichte generatoren coderen via een tekstlaag en verpulveren binaire payloads; alleen een byte-mode-encoder met de juiste versie en het juiste niveau levert een code af die een console accepteert.",
      ],
    },
    {
      type: "p",
      text: "Een speciale tool bestaat precies om die drie fouten principieel onmogelijk te maken: vaste offsets, byte mode in en uit, en een naamveld geschreven met de juiste codering en opvulling. Dat is de volledige reden waarom [onze ontgrendelaar](/nl/mii-qr-unlocker) een pagina is en geen voetnoot in documentatie.",
    },
    { type: "h2", text: "Vragen die mensen over Mii QR-codes hebben" },
    { type: "h3", text: "Is het ontgrendelen van een Mii QR-code legaal en veilig?" },
    {
      type: "p",
      text: "Wat veiligheid betreft, werkt de mechaniek voor je mee: de unlock herschrijft alleen de permissiebytes en laat het uiterlijk-blok onaangeroerd — een aangepaste code scant dus óf als dezelfde Mii met nieuwe rechten, óf helemaal niet; er is geen stille derde weg. Wat legaliteit betreft: het formaat is door de community gedocumenteerd, de tool werkt op Mii-data die je al bezit, en wat daarna komt gehoorzaamt aan dezelfde regels als elke fanactiviteit — respecteer de oorspronkelijke maker en geef andermans personage niet uit voor je eigen werk. Nintendo's houding tegenover aangepaste Mii-data is dezelfde als tegenover de rest van het bestandssysteem van de console: gebied zonder officiële ondersteuning, het oordeel is aan jou.",
    },
    { type: "h3", text: "Werkt het ook met Mii's uit Miitopia en Smash Bros.?" },
    {
      type: "p",
      text: "Ja. Miitopia en Super Smash Bros. Ultimate consumeren dezelfde FFL-formaat-Mii-data als Tomodachi Life en de 3DS-Mii Maker; een voor het ene spel gemaakte QR scant dus in de andere, op consoles die QR-invoer aannemen. Het formaat is de gemeenschappelijke taal; de games zijn slechts andere luisteraars.",
    },
    { type: "h3", text: "Mijn console scant de ontgrendelde code niet — waarom?" },
    {
      type: "p",
      text: "Negen van de tien keer is het optica, geen data. Zet de schermhelderheid op maximaal, houd de console op de afstand waar de QR het beeld vult zonder onscherp te worden, maak de lens schoon en vermijd de reflectie van plafonnlampen. Weigert hij nóg, genereer dan opnieuw: een screenshot van een QR kan compressie-artefacten meedragen die de decodering breken. De juiste gewoonte is het oorspronkelijk gerenderde beeld bewaren.",
    },
    { type: "h3", text: "Ziet de ontgrendelde Mii er in games anders uit?" },
    {
      type: "p",
      text: "Nee. Het uiterlijk-blok passeert byte voor byte: gezicht, haar, kleuren, lengte, naam en steminstellingen arriveren precies zoals de maker ze zette. De zichtbare veranderingen zijn degene die je vraagt, zoals een nieuwe naam. Ziet een Mii er na de scan anders uit, dan heeft ergens onderweg het QR-beeld zelf geleden: genereer opnieuw en scan opnieuw voordat je de data de schuld geeft.",
    },
    { type: "h3", text: "Kan ik een Mii direct op de Switch bewerken?" },
    {
      type: "p",
      text: "Een ontvangen Mii, nee. De Mii Maker op Switch bewerkt Mii's die op die console zijn gemaakt; elke Mii die van buiten komt — via toegangssleutel of scan — blijft vergrendeld ter bescherming van de auteur, precies zoals op de 3DS. De weg naar een bewerkbare kopie loopt wederom via het formaat: ontgrendel de originele QR zodat hij als lokaal en bewerkbaar wordt herkend, en breng hem daarna via het middel dat jouw opstelling toelaat naar de Switch.",
    },
    { type: "h3", text: "En het nieuwe Mii-systeem van Switch 2?" },
    {
      type: "p",
      text: "Switch 2 zet de toegangssleutelbenadering voor Miitopia voort, en de onderliggende Mii-data blijft uit dezelfde FFL-lijn. De QR als fysiek deelmedium hoort bij de consoles met camera — 3DS en Wii U — en precies daarom blijft het begrijpen van het formaat zijn waarde behouden: de data die die codes vervoerden is dezelfde data die je Switch-games vandaag consumeren.",
    },
    { type: "h3", text: "Kan ik de oorspronkelijke permissies herstellen?" },
    {
      type: "p",
      text: "Bewaar het originele QR-beeld — de unlock overschrijft nooit je bronbestand, hij maakt een nieuwe code met opengeklapte vlaggen. Wil je ooit de beperkingen terug, dan draagt het origineel de instellingen van de maker nog steeds en scant hij precies zo weer. Wat niet kan: een Mii die al op een console woont opnieuw op slot zetten. Het bewerkingsrecht dat jouw console eenmaal via een ontgrendelde scan kreeg, blijft voor altijd bij die Mii horen. Die asymmetrie is goed om te weten voordat je iets ontgrendelt dat een vriend je leende.",
    },
    { type: "h2", text: "Probeer het zelf" },
    {
      type: "p",
      text: "Het snelst wordt het formaat tastbaar als je de tool een eigen Mii voert en ziet hoe de velden opduiken:",
    },
    {
      type: "ul",
      items: [
        "[Mii QR-ontgrendelaar](/nl/mii-qr-unlocker) — zet een code neer, zie naam en permissievlaggen gedecodeerd en genereer een bewerkbare code opnieuw.",
        "[Mii-creator](/nl/tomodachi-life-mii-creator) — bouw een Mii van nul, met live FFL-rendering en export.",
        "[Mii Ogen-editor](/nl/mii-eyes) — een gerichte editor voor de oogvormen die de uitdrukking van een Mii bepalen.",
        "[Stemlab](/nl/tomodachi-voice-lab) — hoor hoe Tomodachi Life een persoonlijkheid in een gesynthetiseerde stem omzet.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch en Miitopia zijn handelsmerken van Nintendo. Deze gids beschrijft een door de community gedocumenteerd formaat voor persoonlijke back-up en bewerking, en is niet verbonden met Nintendo of door Nintendo goedgekeurd. De FFL-formaatdetails volgen de openbare 3dbrew-documentatie.",
    },
  ],
};
