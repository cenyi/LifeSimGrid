/**
 * LifeSimGrid — Blogpost (nl): het lievelingseten van elke Mii vinden, een testmethode
 *
 * Nederlandse vertaling van posts/tomodachi-life-food-favorites-guide.ts,
 * inhoudelijk verankerd in het eigen model van de site:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "Het lievelingseten van elke Mii vinden: een testmethode",
  description:
    "Een herhaalbaar 7-stappenplan om het lievelingseten van elke Mii in Tomodachi Life te vinden: 48 etenswaren, 8 categorieën en startpunten per groep.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Eten", "Persoonlijkheid", "Gidsen"],
  blocks: [
    {
      type: "p",
      text: "Elke Mii in Tomodachi Life draagt twee verborgen voedseltoewijzingen met zich mee: een willekeurig gegenereerd lievelingseten en een willekeurig gegenereerd ongeliefdste eten. Omdat het spel geen van beide waarden ooit laat zien, kun je alleen betrouwbaar ontdekken wat een specifieke Mii liefheeft door te voeren en de reactie te bekijken — en de goedkoopste manier om dat te doen is beginnen met de etenswaren waar de persoonlijkheidsgroep van die bewoner van houdt. Deze gids werkt dat idee uit tot een herhaalbaar protocol: hoe de eetdatabase met 48 etenswaren achter onze [eetkaart](/nl/tomodachi-life-food-chart) is opgebouwd, hoe de vijf reactieniveaus werken, wat het affiniteitsmodel op basis van community-schattingen voorspelt voor elk van de vier persoonlijkheidsgroepen, en een testloop in zeven stappen die giswerk omzet in een vastgelegde, reproduceerbare zoektocht. Elk getal hieronder komt uit de databestanden van de site zelf, dus je kunt de hele methode handmatig uitvoeren.",
    },
    { type: "h2", text: "Waarom lievelingseten belangrijk is op je eiland" },
    {
      type: "p",
      text: "Het lievelingseten van een Mii geven levert de sterkste positieve reactie op die het voedselsysteem van het spel kent, en zo'n reactie is het plannen waard. Community-wiki's en langlopende spelersverslagen beschrijven het lievelingseten-moment als een van de meest dramatische geluksanimaties op het eiland: de Mii juicht, de stemming springt zichtbaar omhoog, en een tevreden bewoner duikt vaker lachend op in de sociale gebeurtenissen die vriendschappen, romantiek en aanzoeken aansturen. Het ongeliefdste eten geven doet het tegenovergestelde — een duidelijk negatieve reactie. Ken je beide verborgen toewijzingen, dan sla je twee vliegen in één klap: je hebt een betrouwbare dagelijkse geluksknop, en je voorkomt dat je per ongeluk juist dat ene item serveert dat de stemming bederft.",
    },
    {
      type: "p",
      text: "Er is nog een tweede, minder voor de hand liggende reden om op favorieten te jagen: eten testen is een van de weinige eilandactiviteiten die schone, per-Mii-informatie opleveren. Elke voerbeurt is een gecontroleerd experiment — één bewoner, één etenswaar, één waarneembare reactie — en het aantal mogelijke reacties is klein genoeg om met één tik vast te leggen. Zodra een favoriet bevestigd en opgeschreven is, worden latere beslissingen over die bewoner makkelijker: wie krijgt het goede spul tijdens je dagelijkse ronde, welke reacties kun je verwachten bij het plannen van [compatibiliteit](/nl/tomodachi-life-compatibility), en welke etenswaren moet je van de eettafel weghouden. De rest van deze gids draait om dat experiment goedkoop maken — minder voerbeurten per bevestigde favoriet, en nul verloren aantekeningen.",
    },
    { type: "h2", text: "De zoekruimte: 8 categorieën, 48 etenswaren, 16 veelvoorkomende favorieten" },
    {
      type: "p",
      text: "Je zoekruimte bestaat uit precies 48 etenswaren, ingedeeld in 8 categorieën — Drankwaren, Desserts, Snoep, Snacks, Hoofdgerechten, Fruit, Groenten en Andere — en juist het kennen van die indeling maakt efficiënt testen mogelijk. Het is dezelfde database als die achter de [eetkaart](/nl/tomodachi-life-food-chart) zit. Elk item draagt drie eigenschappen die voor het protocol belangrijk zijn: een stabiele `id` die de tracker als sleutel gebruikt, een categorie, en een `commonFavorite`-vlag die de 16 items markeert die volgens de community het vaakst als favoriet naar voren komen. Het volledige overzicht:",
    },
    {
      type: "table",
      headers: ["Categorie", "Etenswaren", "Veelvoorkomende favorieten", "Voorbeelditems"],
      rows: [
        ["Drankwaren", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Desserts", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Snoep", "5", "2", "Chocolate, Candy, Licorice"],
        ["Snacks", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Hoofdgerechten", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Fruit", "5", "1", "Apple, Banana, Melon"],
        ["Groenten", "4", "0", "Carrot, Broccoli, Salad"],
        ["Andere", "2", "0", "Boba Tea, Sundae"],
        ["Totaal", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Twee structurele details springen uit die tabel naar voren. Ten eerste zijn `main` (10 items) en `drink` (9 items) de zwaarste categorieën, dus een blinde brute-force-aanpak kost daar de meeste voerbeurten — een protocol dat een zware categorie kan uitstellen, bespaart echte in-game dagen. Ten tweede clusteren de 16 `commonFavorite`-items zich rond de klassiekers die overal in de smaak vallen: Cola, Juice en Soda onder de Drankwaren; Cake, Ice Cream, Donut en Cookie onder de Desserts; Pizza, Hamburger, Sushi en Curry onder de Hoofdgerechten. Die vlaggen leveren goede vroege tests op, nog voordat de persoonlijkheid in beeld komt. De twee `other`-items — Boba Tea en Sundae — vormen het niche-uiteinde van de lijst, en precies daar wil één persoonlijkheidsgroep het liefst eerst kijken.",
    },
    { type: "h2", text: "Hoe reacties werken: vijf niveaus en één verborgen paar" },
    {
      type: "p",
      text: "Elke voerbeurt eindigt in één van vijf reactieniveaus — `love`, `like`, `neutral`, `dislike` of `hate` — en elk niveau is een eigen, waarneembare animatie in het spel. De vijftraps schaal is ook het vocabulaire dat onze tracker gebruikt: elke voedselrij heeft vijf compacte logknoppen, één per niveau (♥ voor Liefheeft het, ▲ voor Vindt het goed, – voor Neutraal, ▼ voor Vindt het minder, ✕ voor Haat het), dus een resultaat vastleggen kost één tik. De schaal is bewust grof — fijn genoeg om twee positieve etenswaren onderling te rangschikken, grof genoeg om nooit te twijfelen welk niveau je net hebt gezien.",
    },
    {
      type: "p",
      text: "Onder de motorkap koppelt het model van de site aan elk etenswaar en elke persoonlijkheidsgroep een affiniteitsscore van `0–100`, en een vaste bandenregel zet een score om in een voorspeld niveau: `90` en hoger wijst naar `love`, `75–89` naar `like`, `40–74` naar `neutral`, `25–39` naar `dislike`, en alles onder `25` naar `hate`. Die banden voeden alleen de voorspelling. Zodra het echte lievelingseten van een Mii bevestigd is, schakelt het model direct door: het lievelingseten wordt afgedwongen als `love` en het ongeliefdste eten als `hate`, wat de heuristiek ook zegt. Die override weerspiegelt het echte gedrag van het spel — de verborgen toewijzing verslaat de persoonlijkheid altijd, en precies daarom is testen nodig.",
    },
    { type: "h2", text: "Wat het model voorspelt voor elke persoonlijkheidsgroep" },
    {
      type: "p",
      text: "De vier persoonlijkheidsgroepen — **Groep Sociaal**, **Groep Zelfverzekerd**, **Groep Onafhankelijk** en **Groep Meegaand** — krijgen elk een eigen rangschikking over de acht categorieën, en die rangschikking is jouw testvolgorde. De matrix hieronder is de volledige community-schattingsbaseline uit het databestand van de site; lees een kolom van boven naar beneden en je ziet het voorgestelde menu van die groep:",
    },
    {
      type: "table",
      headers: ["Categorie", "Groep Sociaal", "Groep Zelfverzekerd", "Groep Onafhankelijk", "Groep Meegaand"],
      rows: [
        ["Drankwaren", "90", "70", "60", "75"],
        ["Desserts", "85", "65", "70", "80"],
        ["Snoep", "95", "55", "60", "75"],
        ["Snacks", "80", "75", "70", "85"],
        ["Hoofdgerechten", "65", "90", "60", "90"],
        ["Fruit", "75", "70", "75", "80"],
        ["Groenten", "60", "65", "80", "85"],
        ["Andere", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Er duiken vier duidelijke menu's op. Mii's uit **Groep Sociaal** — de Leider, Entertainer, Trendsetter en Optimist — pieken op Snoep (`95`), Drankwaren (`90`) en Desserts (`85`): een energieke, feestelijke zoetekauw. Mii's uit **Groep Zelfverzekerd** — Ontwerper, Avonturier, Doorzetter, Charmeur — pieken op Hoofdgerechten (`90`), het statusgerichte restaurant-uiteinde van de lijst. Mii's uit **Groep Onafhankelijk** — Kunstenaar, Vrije geest, Denker, Eenling — zijn het interessante geval: hun topscores liggen bij de niche-items uit `other` (`85`) en de Groenten (`80`), en daarom verdienen Boba Tea en Sundae überhaupt een plek in de database. Mii's uit **Groep Meegaand** — Dromer, Liefhebber, Zachtmoedig, Maatje — gaan voor het huiselijke uiteinde: Hoofdgerechten (`90`), Snacks (`85`) en Groenten (`85`). De reactievoorvertoning van de kaart pakt per groep één bewoner als voorbeeld — een Leider, een Doorzetter, een Denker en een Maatje — zodat je alle vier de menu's naast elkaar kunt vergelijken. Hoe een Mii in de eerste plaats in één van deze groepen terechtkomt, lees je in onze [gids over de MBTI-koppeling](/nl/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Eén eerlijke eigenschap van de matrix: elke cel ligt tussen `55` en `95`, wat betekent dat de heuristiek alleen nooit meer dan `love`, `like` of `neutral` kan voorspellen. De twee negatieve niveaus worden nooit door persoonlijkheidsaffiniteit veroorzaakt. In de praktijk komen negatieve reacties van de tweede verborgen toewijzing — het ongeliefdste eten, dat net zo willekeurig is als het lievelingseten. Persoonlijkheid vertelt je waar je kunt beginnen met zoeken naar de positieve reacties; waar de negatieve reactie verstopt zit, vertelt alleen testen.",
    },
    { type: "h2", text: "Het testprotocol: zeven stappen naar een bevestigde favoriet" },
    {
      type: "p",
      text: "Het protocol vindt een favoriet met zo weinig mogelijk voerbeurten door eerst de sterkste categorieën van de groep te testen, elk resultaat vast te leggen en categorieën te snoeien zodra er bewijs binnenkomt. Je kunt het volledig draaien in de [tracker van de eetkaart](/nl/tomodachi-life-food-chart), die je checklist tussen sessies bijhoudt.",
    },
    {
      type: "ol",
      items: [
        "**Bepaal de persoonlijkheidsgroep van de Mii.** Zoek de bewoner op in de [persoonlijkheidsgrafiek](/nl/tomodachi-life-personality-chart) of de [MBTI-mapping](/nl/tomodachi-life-mbti) en noteer de groep: Groep Sociaal, Groep Zelfverzekerd, Groep Onafhankelijk of Groep Meegaand. Voor eten telt alleen de groep — het subtype (bijvoorbeeld Optimist versus Trendsetter) verandert niets aan de affiniteitsmatrix.",
        "**Vis de top-5 startkandidaten van de groep eruit.** Het aanbevelingspaneel van de kaart sorteert alle 48 etenswaren op de affiniteit van de geselecteerde groep en toont de vijf hoogste. Voor een Mii uit Groep Sociaal zijn dat alle vijf de snoepitems op `95`; voor een Mii uit Groep Meegaand begint het paneel bij de Hoofdgerechten op `90`. Die vijf etenswaren zijn je eerste sessie.",
        "**Voer telkens één kandidaat, hoogste affiniteit eerst.** Eén etenswaar per voerbeurt houdt het bewijs schoon — cadeaus snel achter elkaar geven vertroebelt welk item welke reactie veroorzaakte. Bekijk de animatie, beoordeel die op de vijftraps schaal, en ga pas dan naar de volgende kandidaat.",
        "**Leg elk resultaat meteen vast.** Tik op de bijpassende reactieknop in de rij van het etenswaar. De tracker bewaart de checklist in `localStorage` onder de sleutel `lifesimgrid-food-tracker`, zodat geteste etenswaren, hun vastgelegde reacties en de voortgangsteller paginaherladingen en browserherstarts overleven — geen account, geen sync, geen verloren aantekeningen.",
        "**Bevestig de winnaar zodra je de sterkste reactie ziet.** Markeer dat etenswaar in de tracker als `love` en stel het in als lievelingseten van de Mii in de kiezer bovenaan de kaart. Vanaf dat moment dwingt de kaart `love` af voor dat etenswaar, wat de heuristiek ook zou voorspellen, en de favoriet staat vast.",
        "**Komt een categorie met `neutral`-reacties terug, schrap hem dan en ga naar de op één na sterkste categorie van de groep.** Een reeks `neutral`-reacties over de items van een categorie is bewijs dat de favoriet elders zit. Bewaar eventuele `like`-resultaten als vangnet — zo'n etenswaar is de favoriet niet, maar nog wel een betrouwbare dagelijkse keuze. Werk de affiniteitsmatrix categorie voor categorie af tot de winnaar verschijnt.",
        "**Leg het ongeliefdste eten opportunistisch vast, en reset tussen Mii's.** Het ongeliefdste eten duikt op als de sterkste negatieve reactie tijdens het gewone testen — leg het op dezelfde manier vast en pin het in de kiezer, zodat de kaart er `hate` voor afdwingt. Wanneer je van bewoner wisselt, wis je de tracker met één knop (of gebruik een apart browserprofiel), want de checklist wordt per browser bewaard, niet per Mii.",
      ],
    },
    {
      type: "p",
      text: "De absolute bovengrens van het protocol is 48 voerbeurten — de volledige database. De groep-eerst-volgorde bestaat zodat je die grens bijna nooit nadert. Twee koplopende categorieën van een groep volledig afdekken kost hooguit 15 voerbeurten (Hoofdgerechten en Snacks tellen samen 15 items voor Mii's uit Groep Meegaand en Groep Zelfverzekerd) en slechts 6 voor een Mii uit Groep Onafhankelijk, wiens favoriete categorieën — `other` en Groenten — samen maar 6 items tellen. Dat zijn startverwachtingen, geen garanties — de verborgen toewijzing is willekeurig, en een ongelukkige bewoner kan je dieper de matrix in duwen.",
    },
    { type: "h2", text: "Uitgewerkt voorbeeld: een Mii uit Groep Sociaal door de testloop loodsen" },
    {
      type: "p",
      text: "Een Mii uit Groep Sociaal — zeg een Trendsetter — moet je eerst met Snoep aftasten, en het aanbevelingspaneel is het daarmee eens: alle vijf de snoepitems op affiniteit `95`, en de negen dranken wachten op `90`. Hier is een realistische sessie:",
    },
    {
      type: "ul",
      items: [
        "Voerbeurten 1–5 — Chocolate, Gum, Caramel, Licorice, Candy: Chocolate levert een duidelijke `like` op, Candy nog een `like`, de rest `neutral`. Geen topreactie, dus Snoep valt af — en omdat de eerste sessie toevallig de hele snoepcategorie dekt, waren vijf voerbeurten genoeg om die volledig uit te schakelen.",
        "Voerbeurten 6–8 — Cola, Juice, Soda: alle drie `neutral`. Drie neutrale reacties op rij bij dranken die vaak favoriet zijn, vormen zwak bewijs tegen de hele Drankwaren-categorie van 9 items, dus de speler parkeert de zes ongeteste dranken (Coffee, Tea, Milk, Water, Beer, Sake) en springt liever door naar de volgende categorie dan ze allemaal af te werken.",
        "Voerbeurten 9–10 — Cake, Ice Cream: Cake is `neutral`, en Ice Cream levert de onmiskenbaar sterkste positieve reactie. Dat is de favoriet.",
        "Bevestiging — Ice Cream gaat de lievelingskiezer in, de kaart dwingt er nu `love` voor af, en de voortgangsteller staat op 10 van 48 geteste etenswaren — ongeveer 21% van de database voor een bevestigde winnaar.",
      ],
    },
    {
      type: "p",
      text: "Tien voerbeurten leveren een bevestigde favoriet op, één volledig uitgeschakelde categorie, één geparkeerde categorie en twee vastgelegde etenswaren om op terug te vallen, die de speler op gewone dagen nog gewoon kan serveren. Let op wat het protocol nooit heeft aangeraakt: de 10-item `main`-categorie en de 4-item `vegetable`-categorie, de twee zwakste affiniteiten van een Mii uit Groep Sociaal (`65` en `60`). Het ongeliefdste eten is nog onbekend — het is net zo willekeurig als het lievelingseten — dus tijdens gewone eilanddagen houdt de speler een sterke negatieve reactie in de gaten en pinnt zo'n reactie zodra die optreedt als `hate` in de kiezer vast. Draai dezelfde loop met een Mii uit Groep Meegaand en alleen het instappunt verschuift: het paneel zou dan met Hoofdgerechten en Snacks beginnen in plaats van Snoep.",
    },
    { type: "h2", text: "Waarom favorieten willekeurig zijn — en waarom gidsen met vaste antwoorden falen" },
    {
      type: "p",
      text: "Elke gids die voor een bepaalde persoonlijkheid een vast lievelingseten afdrukt, beschrijft één savebestand, niet het spel. Het databestand achter onze kaart zegt het ronduit: Tomodachi Life publiceert geen officiële reactiematrix voor eten, en elke Mii krijgt een willekeurig gegenereerd lievelingseten en een willekeurig gegenereerd ongeliefdste eten. De willekeurigheid zit in de afzonderlijke bewoner, niet in de persoonlijkheid — twee Mii's met een identieke persoonlijkheid, naam en zelfs identieke schuifregelaars in de editor kunnen verschillende verborgen favorieten dragen.",
    },
    {
      type: "p",
      text: "Dat ene feit herdefinieert wat een bruikbare gids kan zijn. Een opzoektabel kan niet werken, omdat het antwoord geen functie is van iets wat je van een Mii kunt aflezen. Wat wél kan werken is een zoekstrategie: een volgorde die statistisch waarschijnlijkere kandidaten vooraan zet, een logsysteem dat nooit een resultaat verliest, en een eliminatieregel die categorieën snoeit zodra er bewijs binnenkomt. Precies dat levert de affiniteitsmatrix met vier groepen — startpunten, geen antwoorden — en daarom heeft onze [eetkaart](/nl/tomodachi-life-food-chart) een blijvende tracker aan boord in plaats van een tabel met zogenaamde favorieten. Behandel elke site die vaste favorieten per persoonlijkheid belooft zoals je een horoscoop behandelt: vermakelijk, niet te toetsen, en totaal geen hulp voor je echte eiland.",
    },
    { type: "h2", text: "Grenzen van het model (lees dit deel)" },
    {
      type: "p",
      text: "De affiniteitsgetallen in deze gids zijn een community-schatting, geen geëxtraheerde speldata — Nintendo heeft de interne werking van het voedselsysteem nooit gepubliceerd. De presets zijn bewust zo afgesteld dat elke groep een eigen rangschikking over de categorieën laat zien, want zo'n rangschikking is precies wat een aanbeveling als ‘welk eten eerst proberen’ überhaupt mogelijk maakt. Die afstemming is een modelkeuze. Het model benadert de community-waarnemingen goed genoeg om nuttig te zijn voor het ordenen van je tests, en zoals alle modellen zit het ergens naast.",
    },
    {
      type: "p",
      text: "Drie kanttekeningen om in je achterhoofd te houden. Ten eerste betekent de bandenregel dat het model hooguit tot `neutral` kan voorspellen — elke presetwaarde ligt op `55` of hoger — dus negatieve reacties zijn altijd verrassingen van de verborgen ongeliefdste-toewijzing, nooit voorspellingen. Ten tweede is de database van 48 items een samengestelde selectie van etenswaren die in de Tomodachi Life-titels zijn waargenomen, geen complete in-game etenlijst; levert een voerbeurt een reactie op die je niet in de kaart vindt, leg dan het dichtstbijzijnde equivalent vast en ga door. Ten derde bewaart de tracker één checklist per browser onder één `localStorage`-sleutel, dus hij houdt één actieve Mii tegelijk vast — wis hem tussen bewoners, of houd één browserprofiel per eilandbewoner aan als je er meerdere tegelijk jaagt. Niets hiervan verandert het eigenlijke eindresultaat: een op bewijs gebaseerd logboek per Mii van wat elke bewoner werkelijk liefheeft. Het model bepaalt waar je begint; jouw voerbeurten bepalen wat je gelooft.",
    },
    { type: "h2", text: "Probeer het protocol zelf uit" },
    {
      type: "ul",
      items: [
        "[Eetkaart en tracker](/nl/tomodachi-life-food-chart) — de volledige eetdatabase met 48 etenswaren, het aanbevelingspaneel per groep en de blijvende checklist met getest eten.",
        "[Persoonlijkheidsgrafiek](/nl/tomodachi-life-personality-chart) — het overzicht van 16 typen met kleurgecodeerde groepen, voor stap 1 van het protocol.",
        "[MBTI-mapping](/nl/tomodachi-life-mbti) — blader door je bewoners op vierlettercode, als je je roster zo bijhoudt.",
        "[Compatibiliteitscalculator](/nl/tomodachi-life-compatibility) — koppel twee bewoners en ontleed de romantiek- en vriendschapsscores zodra hun favorieten vastliggen.",
      ],
    },
    {
      type: "callout",
      text: "MBTI en Nintendo zijn geregistreerde handelsmerken van hun respectieve eigenaren. Deze voedselgids is een door fans gemaakte interpretatie, bedoeld voor entertainment en planning, en is niet verbonden met of onderschreven door Nintendo of de Myers-Briggs Company.",
    },
  ],
};
