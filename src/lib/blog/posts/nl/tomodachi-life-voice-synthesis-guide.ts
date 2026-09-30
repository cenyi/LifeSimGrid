/**
 * LifeSimGrid — Blogpost (nl): Hoe Tomodachi Voice Lab 8-bit-stemmen synthetiseert
 *
 * Nederlandse vertaling van posts/tomodachi-life-voice-synthesis-guide.ts,
 * inhoudelijk verankerd in de eigen implementatie van de site:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Hoe Tomodachi Voice Lab 8-bit-stemmen synthetiseert",
  description:
    "De volledige Web Audio API-pipeline achter Tomodachi Voice Lab: oscillatornodes, golfvormen, de 5 stempresets en hoe elke parameter het geluid vormt.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Stemsynthese", "Handleidingen"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Voice Lab bouwt zijn 8-bit Mii-stemmen op uit een Web Audio API-graaf met drie knooppunten: één `OscillatorNode` genereert de toon, één `BiquadFilterNode` verzacht hem en één `GainNode` vormt de volume-envelope. Deze gids ontleedt die pipeline precies zoals hij draait in [Tomodachi Voice Lab](/nl/tomodachi-voice-lab) — elke constante, elke preset en elke scheduling-beslissing — zodat je de pieptaal-esthetiek die aan Tomodachi Life: Living the Dream doet denken, kunt begrijpen, reproduceren of uitbreiden. Elk getal hieronder is letterlijk uit de broncode van de site overgenomen, en waar een waarde een community-schatting is in plaats van iets dat Nintendo heeft gedocumenteerd, staat dat expliciet in de tekst.",
    },
    { type: "h2", text: "Waarom Tomodachi-stemmen in pieptonen spreken" },
    {
      type: "p",
      text: "De markante eigenaardigheid van het geluid van Tomodachi Life is pieptaal: in plaats van opgenomen dialogen vocaliseert elke Mii in korte gesynthetiseerde tonen die het ritme van een zin volgen zonder ooit echte woorden te vormen. Deze aanpak gaat terug tot de handheld-oorsprong van de serie, waar cartridgeformaat en geluidshardware volledige voice-acting onpraktisch maakten, en hij heeft de sprong naar Tomodachi Life: Living the Dream op de Switch overleefd omdat de pieptonen onderdeel van de identiteit van de serie waren geworden. Het resultaat leest als spraak omdat het de prosodie van spraak kopieert — toonhoogtebeweging, timing van lettergrepen, pauzes — terwijl het bewust niet-lexicaal blijft.",
    },
    {
      type: "p",
      text: "Nintendo heeft de werkelijke synthesemethode van het spel nooit gepubliceerd, dus elke browserreconstructie is per definitie een community-schatting. Waar het lab op mikt is de esthetiek in plaats van een bit-exacte reproductie, en drie eigenschappen doen het meeste werk. Ten eerste zijn de tonen kort: envelopes openen en sluiten binnen tientallen milliseconden, zodat elke lettergreep netjes begint en stopt. Ten tweede is de golfvorm harmonisch rijk: een zoemende klankkleur leest veel gemakkelijker als 'chiptune' dan een zuivere toon. Ten derde is de toonhoogte nooit statisch: kleine frequentie-offsets per lettergreep bootsen de contour van natuurlijke spraak na. De rest van deze gids laat zien hoe elk van die eigenschappen op een concreet Web Audio API-mechanisme wordt afgebeeld.",
    },
    { type: "h2", text: "De synthesepipeline, knooppunt voor knooppunt" },
    {
      type: "p",
      text: "Elk geluid dat het lab produceert, komt uit dezelfde graaf van drie knooppunten — oscillator, filter, gain — en bereikt je luidsprekers via de laatste twee. Bij elke weergave wordt een verse `AudioContext` aangemaakt — het lab houdt nooit een globale audiograaf in leven — en elke lettergreep plant zijn eigen set knooppunten daarin:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        alleen bij de preset Oudere:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "De `OscillatorNode` is de geluidsbron. Zijn `type` komt uit de gekozen preset (`sawtooth` bij vier van de vijf presets, `square` bij de Robot), en zijn `frequency` wordt ingesteld via de toonhoogteschuifregelaar. Omdat een oscillator een kale golfvormgenerator is, heeft hij zelf geen regelaars voor klankkleur — alles wat de ene preset anders laat klinken dan de andere is stroomafwaartse parameterscheduling.",
    },
    {
      type: "p",
      text: "De `BiquadFilterNode` is altijd geconfigureerd als `lowpass`-filter, met een cutoff die uit de `filterFreq`-waarde van de preset komt (`900 – 2500 Hz`). Een laagdoorlaatfilter dempt de boventonen boven zijn cutofffrequentie, en dat is precies wat het ongeremde gezoem van een ruwe zaagtand omzet in iets dat op een stem lijkt: donkere presets (Oudere bij `900 Hz`) houden alleen de lage boventonen over, terwijl heldere presets (Kind bij `2500 Hz`) de glans doorlaten die een stem klein en jong doet klinken.",
    },
    {
      type: "p",
      text: "In de `GainNode` leeft de envelope, gepland met vier automatiseringspunten. De versterking begint op `0` op het starttijdstip van de lettergreep, loopt gedurende de attack-tijd lineair op naar de doelwaarde van de preset (`0.2 – 0.3`), houdt die waarde vast tot één release-tijd vóór het einde en loopt dan lineair terug naar `0`. De aanroepen zijn `setValueAtTime()` voor de ankers en `linearRampToValueAtTime()` voor de lineaire verlopen — een kale attack/hold/release-envelope zonder exponentiële curven, wat het geluid karakteristiek abrupt houdt, passend bij de 8-bit-stijl.",
    },
    {
      type: "p",
      text: "Er bestaat één optioneel vierde paar knooppunten: vibrato. Als een preset het inschakelt, draait een tweede `OscillatorNode` als LFO (laagfrequente oscillator) op de `vibratoRate` van de preset en voedt hij een `GainNode` die op de `vibratoDepth` staat en is aangesloten op de `frequency`-parameter van de hoofdoscillator. Dit is klassieke frequentiemodulatie — in de Oudere-preset laat een `5 Hz`-LFO de toonhoogte met `±15 Hz` wiebelen, wat de trillerige kwaliteit oplevert die bij oude stemmen hoort. Alleen de Oudere-preset zet vibrato aan; de andere vier laten het volledig uit.",
    },
    { type: "h2", text: "Hoe elke golfvorm klinkt (en wanneer je welke kiest)" },
    {
      type: "p",
      text: "De keuze van de golfvorm is de belangrijkste klankkleurbeslissing in de hele pipeline, omdat die het boventoongehalte bepaalt dat filter en envelope vervolgens vormgeven. De `OscillatorNode` van de Web Audio API biedt vier standaardtypes, en elk type heeft een duidelijk eigen karakter:",
    },
    {
      type: "table",
      headers: ["Golfvorm", "Boventongehalte", "Karakter", "Gebruikt door presets"],
      rows: [
        ["`sine`", "Alleen de grondtoon", "Zuiver, fluitachtig, nul gezoem", "Geen (beschikbaar via `OscillatorType`)"],
        ["`square`", "Oneven boventonen, sterk", "Hol, klassiek NES-leadkanaal", "Robot"],
        ["`sawtooth`", "Alle boventonen, afnemend", "Zoemend, rietachtig, dichtst bij de rijkdom van een echte stem", "Volwassen man, Volwassen vrouw, Oudere, Kind"],
        ["`triangle`", "Weinig oneven boventonen, zwak", "Zacht, mild, licht gedempt", "Geen (beschikbaar via `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "De presets van het lab gebruiken er maar twee van de vier: `sawtooth` draagt de vier organische stemmen en `square` draagt de Robot. Die splitsing is bewust. Een zaagtand bevat energie op elke boventoon, wat na het laagdoorlaatfilter een dikke, stemachtige kern overhoudt — de reden dat hij gezongen of gesproken tonen beter benadert dan enige andere basisgolfvorm. Een blokgolf houdt alleen oneven boventonen over met meer energie in de hoogte, wat de holle, nasale, onmiskenbaar elektronische kwaliteit oplevert die de Robot-preset wil. `sine` en `triangle` worden door geen enkele huidige preset gebruikt, maar ze blijven via hetzelfde `OscillatorType`-veld een verandering van één regel: sinus past bij zuivere geluidseffecten zoals klokkengelui, en driehoeksgolf past bij zachte achtergrondblips waar een zaagtand te agressief zou zijn.",
    },
    { type: "h2", text: "De vijf stempresets, ontcijferd" },
    {
      type: "p",
      text: "De vijf presets zijn vijf parameterbundels op dezelfde graaf met drie knooppunten, en hun verschillen laten zich volledig opsommen. Hier is de volledige tabel, rechtstreeks geciteerd uit de constante `VOICE_PRESETS` in de broncode:",
    },
    {
      type: "table",
      headers: ["Preset", "Golfvorm", "Basisfrequentie", "Laagdoorlaat-cutoff", "Versterking", "Vibrato", "Attack", "Release"],
      rows: [
        ["Volwassen man", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Uit", "`0.02 s`", "`0.05 s`"],
        ["Volwassen vrouw", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Uit", "`0.02 s`", "`0.04 s`"],
        ["Oudere", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Kind", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Uit", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Uit", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Volwassen man** verankert de set bij een basisfrequentie van `180 Hz`, aan de lage kant van het typische spreekbereik van volwassen mannen, met een `1200 Hz`-laagdoorlaatfilter dat het zaagtandgezoem temt tot iets ronders. **Volwassen vrouw** verdubbelt de basisfrequentie bijna naar `350 Hz`, opent het filter naar `1800 Hz` voor een helderdere toon en knipt zowel de versterking (`0.25`) als de release (`0.04 s`) bij voor een iets knapperiger articulatie.",
    },
    {
      type: "p",
      text: "**Oudere** is de meest bewerkte preset: het laagste register (`120 Hz`), het donkerste filter (`900 Hz`), het enige vibrato (`5 Hz`-LFO met een diepte van `±15 Hz`) en de traagste envelope (`0.04 s` attack, `0.08 s` release). Die laatste twee waarden zijn net zo belangrijk als de toonhoogte — de trage attack verzacht het begin van elke lettergreep, en de lange release laat tonen iets doorlopen in de volgende lettergreep, wat de minder precieze articulatie oproept waar de preset op mikt.",
    },
    {
      type: "p",
      text: "**Kind** keert bijna elke beslissing van de Oudere-preset om: de hoogste basisfrequentie (`600 Hz`), het helderste filter (`2500 Hz`), de laagste versterking (`0.20`) en de snelste envelope (`0.01 s` attack, `0.03 s` release). Snelle envelopes op hoge toonhoogtes zijn het klassieke recept voor de stemmetjes van kleine wezens — elke lettergreep landt als een kort tsjilpje. **Robot** is de uitzondering op twee assen: het is de enige `square`-golf en de enige preset met nul attack en nul release, wat betekent dat de versterking direct aan- en uitschakelt. Die abrupte randen produceren de harde, gated, mechanische kwaliteit die de preset wil — geen lineair verloop betekent geen zachtheid, per constructie.",
    },
    { type: "h2", text: "Hoe toonhoogte en snelheid de oscillator echt aansturen" },
    {
      type: "p",
      text: "Twee schuifregelaars besturen de graaf in realtime: toonhoogte, van `100 – 800 Hz` met een standaardwaarde van `300 Hz`, en snelheid, van `0.5x – 2.0x` met een standaardwaarde van `1.0x`. Elke preset declareert bovendien zijn eigen canonieke `baseFreq` (het referentiecentrum uit de tabel hierboven), die vastlegt op welke positie dat stemtype is ontworpen.",
    },
    {
      type: "p",
      text: "De toonhoogte stelt de oscillatorfrequentie rechtstreeks in, met één vangrail: in de Kind-preset is de gespeelde frequentie `Math.max(pitch, 500)`, dus de schuifregelaar onder `500 Hz` zetten doet in de kindmodus niets — de oscillator zakt nooit onder die ondergrens. Deze begrenzing beschermt het karakter van de preset, want een kinderstem op `150 Hz` zou simpelweg klinken als een volwassen man.",
    },
    {
      type: "p",
      text: "Snelheid bestuurt de tijd, niet de frequentie. Eén druk op de afspeelknop produceert één pieptoon van `0.5 / speed` seconden — `1.0 s` bij `0.5x`, `0.5 s` bij `1.0x` en `0.25 s` bij `2.0x`. Dezelfde deler geldt voor elke tijdsconstante in de tekstmodus, dus een `2.0x`-stem is echt van begin tot eind twee keer zo snel in plaats van geresampled, wat de toonhoogte zou hebben verschoven. Na de weergave zet de interface zijn afspeelstatus terug na `500 / speed + 50` milliseconden: de pieplengte plus een marge van `50 ms`.",
    },
    { type: "h2", text: "Van tekst naar spraak, één pieptoon per teken" },
    {
      type: "p",
      text: "De tekst-naar-spraak-modus van het lab is geen spraakengine — het is dezelfde oscillatorpipeline met drie knooppunten, één keer per teken gepland. Als je tot `100` tekens typt en op spreken drukt, wordt de invoer opgesplitst in afzonderlijke tekens, en elk teken behalve spaties wordt één geplande lettergreep-pieptoon met een toonhoogte-offset die uit de tekencode ervan is afgeleid. De tijdsconstanten, allemaal gedeeld door de snelheid:",
    },
    {
      type: "ul",
      items: [
        "**Tekentoon** — `0.08 / speed` seconden per teken (`0.08 s` bij `1.0x`).",
        "**Ruimte tussen tekens** — `0.03 / speed` seconden tussen opeenvolgende tekens.",
        "**Woordpauze** — een spatie voegt `0.12 / speed` seconden stilte in, ongeveer 1,5 tekenlengten.",
        "**Frasepauze** — elk 5e teken (`i % 5 === 4`) voegt een extra pauze van `gap × 2` toe, wat de uitvoer een cadans geeft in plaats van een vlakke stroom.",
        "**Voorlooptijd** — de planning start bij `currentTime + 0.05` seconden, zodat de audiograaf klaar staat vóór de eerste toon.",
      ],
    },
    {
      type: "p",
      text: "De toonhoogtevariatie is het slimme deel. De frequentie-offset van elk teken wordt berekend als `((charCode % 20) - 10) × 3`, wat een deterministische spreiding oplevert tussen `-30 Hz` en `+27 Hz` rond de basistoonhoogte. Dat het deterministisch is, is cruciaal: hetzelfde woord produceert altijd dezelfde melodische contour, waardoor een bepaalde frase net zo herkenbaar wordt als de stem van een Mii herkenbaar is. Omdat de offsets uit tekencodes komen in plaats van uit fonetiek, volgt de uitvoer het ritme van de tekst nauwkeurig terwijl hij niet-lexicaal wartaal blijft — precies het pieptaaleffect dat het lab probeert te benaderen.",
    },
    { type: "h2", text: "Een stem ontwerpen voor elke persoonlijkheidsgroep" },
    {
      type: "p",
      text: "Een overtuigende persoonlijkheidsstem is vooral een kwestie van het toonhoogtebereik: kies de preset die de referentietabel van de site aan de persoonlijkheidsgroep van je Mii toewijst, en parkeer de toonhoogteschuifregelaar vervolgens binnen het aanbevolen bereik. De volledige koppeling die de [referentietabel van het lab](/nl/tomodachi-voice-lab) gebruikt:",
    },
    {
      type: "table",
      headers: ["Groep", "Voorbeeldtype", "MBTI", "Preset", "Toonhoogtebereik"],
      rows: [
        ["Extravert", "Leider", "ESTJ", "Volwassen man", "`180 – 250 Hz`"],
        ["Zelfverzekerd", "Designer", "INTJ", "Volwassen man", "`150 – 200 Hz`"],
        ["Onafhankelijk", "Artiest", "INFP", "Volwassen vrouw", "`280 – 380 Hz`"],
        ["Ontspannen", "Dromer", "INFJ", "Oudere", "`120 – 180 Hz`"],
        ["Kinderlijke personages", "Any", "Any", "Kind", "`500 – 700 Hz`"],
        ["Robot/AI-personages", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Merk op dat de tabel groepen in kaart brengt, niet alle 16 persoonlijkheden — de vier persoonlijkheidsgroepen uit onze [MBTI-koppeling](/nl/tomodachi-life-mbti) krijgen elk één representatief stemsilhouet, en individuele persoonlijkheden komen tot uitdrukking in waar binnen het bereik je de schuifregelaar zet en hoe ver je de snelheidsregelaar opendraait. Het recept, stap voor stap:",
    },
    {
      type: "ol",
      items: [
        "**Kies de preset die bij de groep hoort.** Extraverte en Zelfverzekerde Mii's krijgen Volwassen man; Onafhankelijke Mii's krijgen Volwassen vrouw; Ontspannen Mii's krijgen Oudere, waarvan het `5 Hz`-vibrato de ontspannen, onhaastbare kwaliteit toevoegt waar de groep om bekendstaat. De groep van een Mii komt voort uit zijn vier persoonlijkheidsschuifregelaars — bekijk de [persoonlijkheidstabel](/nl/tomodachi-life-personality-chart) als je die nog niet kent.",
        "**Zet de toonhoogteschuifregelaar binnen het bereik van de groep.** Voor een Zelfverzekerde Designer betekent dat `150 – 200 Hz`; richting `150 Hz` leest imposanter, richting `200 Hz` energieker. De `500 Hz`-ondergrens van de Kind-preset zorgt ervoor dat het bereik `500 – 700 Hz` zichzelf handhaaft.",
        "**Kies de snelheid die bij de spreekstijl past.** Snel pratende Entertainer-typen rechtvaardigen `1.4x – 2.0x`; een slaperige Dromer zit van nature op `0.5x – 0.8x`. Snelheid verandert alleen de duur, dus de stem die je in stap 1 hebt gekozen raakt er nooit door ontstemd.",
        "**Test met een korte frase.** Typ `20 – 30` tekens in het tekstveld en luister naar de frasepauze bij elk 5e teken — als de cadans verkeerd aanvoelt voor de persoonlijkheid, pas dan eerst de snelheid aan voordat je aan de toonhoogte komt.",
        "**Itereer met je historie.** Elke weergave — preset, toonhoogte, snelheid en tot `100` tekens tekst — wordt opgeslagen in een lokaal `IndexedDB`-historiepaneel in de tool, zodat je twee instellingen kunt A/B-testen zonder ze op te schrijven. Niets verlaat de browser.",
      ],
    },
    {
      type: "p",
      text: "De rijen voor Kind en Robot staan bewust buiten het persoonlijkheidssysteem: elke Mii kan met een van beide stemmen worden uitgerust, en daarom staat er Any in hun MBTI-kolom. De envelope met lengte nul maakt de Robot tempotolerant — op elke snelheid behoudt hij dezelfde gated stijfheid, dus dit is de enige stem waarin snelheid puur een komische regelaar is.",
    },
    { type: "h2", text: "Waarom er geen Web Speech API-fallback is" },
    {
      type: "p",
      text: "Het lab mijdt de Web Speech API van de browser bewust — er staat nergens in de codebase een `speechSynthesis`-aanroep, en de tekst-naar-spraak-modus is pure oscillatorscheduling. Dit is een ontwerpbeslissing met een verdedigbare onderbouwing en een echte afweging, en het is de moeite waard om beide expliciet uit te werken.",
    },
    {
      type: "p",
      text: "De onderbouwing: `speechSynthesis` produceert natuurlijke menselijke stemmen, en dat is precies wat een 8-bit-stemlab niet wil. Het delegeert de stemkeuze bovendien aan het besturingssysteem, waardoor dezelfde tekst over browsers en apparaten heen anders kan klinken, en verschillende browsers laden stemmen lui in, met merkbare latentie bij de eerste uiting. De aanpak met één pieptoon per teken houdt elk geluid binnen dezelfde graaf met drie knooppunten die de enkele-pieptoon-modus gebruikt, garandeert overal dezelfde klankkleur waar de Web Audio API werkt, en start direct omdat er niets geladen hoeft te worden.",
    },
    {
      type: "p",
      text: "De afweging: de uitvoer is geen verstaanbare spraak. Hij volgt het ritme en de contour van de tekst, maar produceert geen herkenbare woorden, dus roept hij eerder de cadans van de pieptaal van Tomodachi Life op dan de verstaanbaarheid ervan — en de wartaal van het spel is zelf ook niet te verstaan, wat vermoedelijk precies de bedoeling is. Het stoppen van de weergave is net zo bot en doeltreffend: het lab sluit de volledige `AudioContext` via `close()`, wat elk gepland knooppunt onmiddellijk afbreekt in plaats van uit te faden.",
    },
    { type: "h2", text: "Beperkingen, eerlijk verwoord" },
    {
      type: "p",
      text: "Drie beperkingen begrenzen wat deze synthesizer eerlijk kan beweren. Ten eerste benadert hij een esthetiek, niet de engine van het spel: Nintendo heeft nooit gedocumenteerd hoe Tomodachi Life zijn stemmen genereert, dus de presetwaarden hier zijn community-schattingen, afgestemd om de klank van de serie op te roepen, geen geëxtraheerde constanten. De stemmen doen denken aan die van het spel; het zijn geen replica's.",
    },
    {
      type: "p",
      text: "Ten tweede is de synthese monofonisch en formantloos. Elke lettergreep is één enkele oscillator, gevormd door één laagdoorlaatfilter, terwijl natuurlijke spraak — en vermoedelijk de verfijndere engine van het spel — formantstructuur uit het spraakapparaat meedraagt. Daarom leest de uitvoer als een chiptune-stem in plaats van gesampelde spraak, en dat is de kloof die zich het meest leent voor verkenning als je de code uitbreidt: een tweede oscillator een octaaf hoger, of een filter met geplande frequentiebeweging, zou het resultaat op beide manieren dichter naar echt stemgeluid duwen.",
    },
    {
      type: "p",
      text: "Ten derde hangt alles af van browserondersteuning. De hier gebruikte Web Audio API — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — wordt door alle huidige grote browsers ondersteund, maar het uitvoerkarakter van de Web Audio API varieert nog steeds licht tussen de audiostacks van verschillende apparaten, en browsers die autoplay blokkeren tot een gebruikersgebaar, verlangen de druk op de afspeelknop die het lab toch al voorziet. Wat privacy betreft is de tool volledig client-side: de synthese draait in de browser, en de enige persistentie is de lokale `IndexedDB`-historie — er wordt nergens audio of tekst geüpload.",
    },
    { type: "h2", text: "Probeer de pipeline zelf uit" },
    {
      type: "p",
      text: "De snelste manier om het model te verinnerlijken, is de twee schuifregelaars te bewegen en de graaf in realtime te horen reageren:",
    },
    {
      type: "ul",
      items: [
        "[Tomodachi Voice Lab](/nl/tomodachi-voice-lab) — de synthesizer zelf: vijf presets, de `100 – 800 Hz`-toonhoogteschuifregelaar, de snelheidsregeling en de tekstmodus met één pieptoon per teken.",
        "[Tomodachi Life MBTI-koppeling](/nl/tomodachi-life-mbti) — hoe de vier persoonlijkheidsschuifregelaars van een Mii zijn groep bepalen, die in de tabel hierboven zijn preset vaststelt.",
        "[Persoonlijkheidstabel](/nl/tomodachi-life-personality-chart) — de volledige referentie met 16 typen om een representatieve persoonlijkheid als stem te kiezen.",
        "[Mii QR Unlocker](/nl/mii-qr-unlocker) — combineer een ontworpen stem met een bewerkt Mii-karakter voor de complete eilandbewoner.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life en Nintendo zijn geregistreerde handelsmerken van hun respectieve eigenaren. Deze stemsynthesizer is een interpretatie van fans voor entertainmentdoeleinden en is niet gelieerd aan Nintendo en wordt door Nintendo niet onderschreven.",
    },
  ],
};
