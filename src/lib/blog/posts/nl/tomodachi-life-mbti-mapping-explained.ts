/**
 * LifeSimGrid — Blogpost (nl): zo koppel je de 16 Tomodachi Life-persoonlijkheden aan MBTI
 *
 * Nederlandse vertaling van posts/tomodachi-life-mbti-mapping-explained.ts,
 * inhoudelijk verankerd in het eigen model van de site:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Zo koppel je 16 Tomodachi Life-persoonlijkheden aan MBTI",
  description:
    "De methodiek achter onze Tomodachi Life MBTI-koppeling: banden per schuifregelaar, groepslogica, letterafleiding en de INFP-anomalie.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Persoonlijkheid", "Gidsen"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life geeft elke Mii één van 16 persoonlijkheden, en welke dat wordt, bepaalt het spel via vier verborgen schuifregelaars in de Mii-editor. Onze [MBTI-koppeling](/nl/tomodachi-life-mbti) is een community-schattingsmodel dat die vier schuifregelaars omzet in een code van vier letters in de stijl van Myers-Briggs. Deze gids legt de hele pipeline uit, precies zoals die op deze site draait — de banddrempels, de logica achter de groepskeuze, de afleiding van de letters en het ene geval waarin de koppeling een verrassende botsing oplevert. Elk getal hieronder komt uit hetzelfde model dat ook onze [persoonlijkheidscalculator](/nl/tomodachi-life-personality-calculator) en het [16-typenoverzicht](/nl/tomodachi-life-personality-chart) aanstuurt, zodat je elk resultaat zelf met de hand na kunt rekenen.",
    },
    { type: "h2", text: "De vier schuifregelaars die alles bepalen" },
    {
      type: "p",
      text: "Als je een Mii registreert, laat het spel je vier persoonlijkheidsassen fijnafstellen. Verschillende fancommunities geven ze net iets andere namen; op deze site noemen we ze **Beweging**, **Spraak**, **Energie** en **Denken**, en elk is een doorlopende waarde van `0` tot `100`. Geen van de 16 persoonlijkheden is met één enkele schuifregelaar bereikbaar — de persoonlijkheid is een **patroon** over alle vier de assen, en daarom kunnen twee Mii's volledig verschillend aanvoelen terwijl ze één schuifregelaarwaarde delen.",
    },
    {
      type: "p",
      text: "**Beweging** loopt van langzaam naar snel. Een Mii met een hoge Beweging steekt het eiland over in zichtbaar minder stappen, klopt zelf op deuren aan en verschijnt in groepsscènes meestal als eerste. **Spraak** loopt van zacht naar direct. Directe Mii's geven botte antwoorden, bekennen hun gevoelens vroeg en komen tijdens ruzies met de hardere uitspraken. **Energie** loopt van praktisch naar verbeeldingsvol — praktische Mii's houden zich bezig met wat zich vlak voor hen bevindt, verbeeldingsvolle Mii's dagdromen, bedenken nieuwe activiteiten en reageren sterk op alles wat nieuw is. **Denken** loopt van flexibel naar gestructureerd: gestructureerde Mii's houden vast aan routines, houden hun meningen op orde en houden de stand bij.",
    },
    {
      type: "p",
      text: "De vier assen zijn niet willekeurig gekozen. Elke as komt overeen met precies één letter van de MBTI-code, en juist dat maakt een strakke koppeling van alle 16 typen mogelijk. Voordat het zo ver is, moet het model echter vier doorlopende waarden samenvatten tot één van 16 discrete persoonlijkheden — en dat gebeurt in drie stappen: banden, groep, daarna subtype.",
    },
    { type: "h2", text: "Stap 1: elke schuifregelaar wordt een van drie banden" },
    {
      type: "p",
      text: "De eerste stap zet elke schuifregelaar om in één van drie banden: laag, midden of hoog. De drempels liggen voor alle vier de schuifregelaars vast:",
    },
    {
      type: "table",
      headers: ["Band", "Schuifregelaarwaarde", "Betekenis"],
      rows: [
        ["Laag", "`0 – 33`", "Het linkereinde van de as (langzaam, zacht, praktisch, flexibel)"],
        ["Midden", "`34 – 66`", "Geen sterke neiging naar een van beide kanten"],
        ["Hoog", "`67 – 100`", "Het rechtereinde van de as (snel, direct, verbeeldingsvol, gestructureerd)"],
      ],
    },
    {
      type: "p",
      text: "Drie banden per schuifregelaar, over vier schuifregelaars, geeft `3 × 3 × 3 × 3 = 81` mogelijke cellen. Dat is ruim meer dan de 16 persoonlijkheden die het spel werkelijk biedt, en daarom is een tweede stap nodig die vergelijkbare cellen samenvoegt — en daarom kunnen meerdere verschillende schuifregelaarcombinaties op dezelfde persoonlijkheid uitkomen. Als je er ooit vast van overtuigd was dat twee van je Mii's verschillende schuifregelaarposities hadden maar dezelfde persoonlijkheid, dan is dit de reden: de 16 uitkomsten van het spel zijn grover dan de schuifregelaarwaarden die erin gaan.",
    },
    { type: "h2", text: "Stap 2: de banden kiezen één van vier groepen" },
    {
      type: "p",
      text: "De 16 persoonlijkheden zijn ingedeeld in vier groepen van vier: **Groep Sociaal**, **Groep Zelfverzekerd**, **Groep Onafhankelijk** en **Groep Meegaand**. De tweede stap bepaalt de groep door de banden als signalen te lezen. Twee afgeleide waarden doen het werk:",
    },
    {
      type: "ul",
      items: [
        "**Actief signaal** — de som van de banden voor Beweging, Spraak en Energie (een getal van `0` tot `6`). Hoge waarden betekenen dat de Mii een sociale en energieke aanleg heeft.",
        "**Intro-signaal** — alleen de band voor Denken, gelezen met omgekeerde polariteit: een **hoge** band voor Denken betekent dat de Mii teruggetrokken en in zichzelf gekeerd is.",
      ],
    },
    {
      type: "p",
      text: "Vervolgens werken de regels als een cascade in vaste volgorde. Is het intro-signaal hoog terwijl het actieve signaal laag is, dan belandt de Mii in **Groep Onafhankelijk** — de thuisbasis van de Kunstenaar, de Vrije geest, de Denker en de Eenling. Is het actieve signaal zeer hoog (`4` of meer), dan is de Mii sociaal: staat Spraak eveneens in de hoge band, dan volgt **Groep Sociaal**, anders **Groep Zelfverzekerd**. Een gemiddeld actief signaal wordt opgesplitst op basis van Beweging — een hoge Beweging houdt de Mii bij **Groep Sociaal**, al het andere schuift door naar **Groep Meegaand**. En is het actieve signaal laag zonder een sterk intro-signaal, dan belandt de Mii standaard in **Groep Meegaand**. De volgorde van de cascade is belangrijk: een introverte maar energieke Mii wordt opgelost door de eerste regel die van toepassing is, niet door middeling.",
    },
    {
      type: "p",
      text: "De twee sociale groepen en de twee teruggetrokken groepen zijn geen willekeurige hokjes — ze voeden rechtstreeks het compatibiliteitsmodel van de site, waarin Sociaal van nature met Onafhankelijk paart en Zelfverzekerd met Meegaand. Meer daarover hieronder.",
    },
    { type: "h2", text: "Stap 3: een tweede aflezing kiest het subtype" },
    {
      type: "p",
      text: "Zodra de groep vaststaat, kiest een tweede ronde over dezelfde banden één van de vier leden. Elke groep heeft zijn eigen beslissingsregels. In Groep Sociaal levert bijvoorbeeld een hoge Energie samen met een hoge Spraak de **Entertainer** op; een hoge Beweging met minimaal een middelste band voor Spraak geeft de **Trendsetter**; een middelste of hogere band voor Denken stuurt richting de **Leider**; en al het andere wordt de **Optimist**. De andere drie groepen volgen hetzelfde patroon met andere prioriteitsassen, en precies dat geeft elk subtype zijn herkenbare silhouet.",
    },
    {
      type: "p",
      text: "De volledige tabel hieronder somt alle 16 persoonlijkheden op met hun groep, hun MBTI-code en hun schuifregelaarsignatuur — de vier-assige aflezing die de code impliceert:",
    },
    {
      type: "table",
      headers: ["Persoonlijkheid", "Groep", "MBTI", "Schuifregelaarsignatuur"],
      rows: [
        ["Leider", "Groep Sociaal", "ESTJ", "Snel · Direct · Praktisch · Gestructureerd"],
        ["Entertainer", "Groep Sociaal", "ESFP", "Snel · Zacht · Praktisch · Flexibel"],
        ["Trendsetter", "Groep Sociaal", "ENFP", "Snel · Zacht · Verbeeldingsvol · Flexibel"],
        ["Optimist", "Groep Sociaal", "ESFJ", "Snel · Zacht · Praktisch · Gestructureerd"],
        ["Ontwerper", "Groep Zelfverzekerd", "INTJ", "Langzaam · Direct · Verbeeldingsvol · Gestructureerd"],
        ["Avonturier", "Groep Zelfverzekerd", "ESTP", "Snel · Direct · Praktisch · Flexibel"],
        ["Doorzetter", "Groep Zelfverzekerd", "ENTJ", "Snel · Direct · Verbeeldingsvol · Gestructureerd"],
        ["Charmeur", "Groep Zelfverzekerd", "ENTP", "Snel · Direct · Verbeeldingsvol · Flexibel"],
        ["Kunstenaar", "Groep Onafhankelijk", "INFP", "Langzaam · Zacht · Verbeeldingsvol · Flexibel"],
        ["Vrije geest", "Groep Onafhankelijk", "INTP", "Langzaam · Direct · Verbeeldingsvol · Flexibel"],
        ["Denker", "Groep Onafhankelijk", "ISTP", "Langzaam · Direct · Praktisch · Flexibel"],
        ["Eenling", "Groep Onafhankelijk", "ISTJ", "Langzaam · Direct · Praktisch · Gestructureerd"],
        ["Dromer", "Groep Meegaand", "INFJ", "Langzaam · Zacht · Verbeeldingsvol · Gestructureerd"],
        ["Liefhebber", "Groep Meegaand", "ISFJ", "Langzaam · Zacht · Praktisch · Gestructureerd"],
        ["Zachtmoedig", "Groep Meegaand", "INFP", "Langzaam · Zacht · Verbeeldingsvol · Flexibel"],
        ["Maatje", "Groep Meegaand", "ISFP", "Langzaam · Zacht · Praktisch · Flexibel"],
      ],
    },
    { type: "h2", text: "Hoe elke MBTI-letter wordt afgeleid" },
    {
      type: "p",
      text: "Omdat elke schuifregelaaras aan één MBTI-dimensie is toegewezen, is het afleiden van de code van vier letters niet meer dan de schuifregelaarsignatuur rechtstreeks uitlezen. Letter voor letter:",
    },
    {
      type: "ol",
      items: [
        "**E of I ← Beweging.** Een snel Mii is extravert (E); een langzaam Mii is introvert (I). Beweging is de enige as die de eerste letter bepaalt, en dat klopt met wat spelers waarnemen: de loopsnelheid is het zichtbaarste persoonlijkheidskenmerk in het spel.",
        "**S of N ← Energie.** Een praktisch Mii is sensorisch (S); een verbeeldingsvol Mii is intuïtief (N). Deze as bepaalt hoe de Mii reageert op nieuwe items, gebeurtenissen en bewoners.",
        "**T of F ← Spraak.** Een direct Mii is denkend (T); een zacht Mii is voelend (F). Dezelfde schuifregelaar die ruzies scherp of zacht maakt, is ook de schuifregelaar die de derde letter bepaalt.",
        "**J of P ← Denken.** Een gestructureerd Mii is oordelend (J); een flexibel Mii is waarnemend (P). Mii's die van routines houden dragen de J, improvisatoren dragen de P.",
      ],
    },
    {
      type: "p",
      text: "Merk op dat de code volledig bepaald wordt door de vier-assige signatuur — bewegingstempo, energiestijl, spreekstijl en denkstructuur — en **niet** door de groep. De groep is een vijfde stuk informatie, en de koppeling heeft het nodig, zoals de volgende sectie laat zien.",
    },

    { type: "h2", text: "Vragen die spelers over de mapping hebben" },
    { type: "h3", text: "Geven identieke schuifregelaars altijd dezelfde persoonlijkheid?" },
    { type: "p", text: "Ja — de pijplijn is volledig deterministisch. Dezelfde vier waarden landen altijd in dezelfde banden, in dezelfde cel van de `81`, lossen in de cascade op naar dezelfde groep en kiezen hetzelfde subtype. Twee Mii's met identieke persoonlijkheidsinstellingen komen er altijd identiek uit — op deze site en, voor zover langdurige spelersobservatie reikt, ook in het spel. De enige manier waarop een ogenschijnlijk onveranderde Mii kan omslaan, is een verschuiving van één punt over een bandgrens — van `33` naar `34`, of van `66` naar `67`. Daarom verdienen grenswaarden een tweede blik voordat je je eilandplan vastlegt." },
    { type: "h3", text: "Welke van de vier schuifregelaars weegt het zwaarst?" },
    { type: "p", text: "**Beweging** draagt het meeste gewicht. Het is de enige as die alleen al een letter beslist (snel is E, traag is I), het is een van de drie invoeren van het actieve signaal, en het beslist de knoop tussen **Sociaal** en **Meegaand** als het actieve signaal middelmatig is. **Denken** volgt op korte afstand: het drijft alleen het introductiesignaal dat stille, naar binnen gekeerde Mii's naar de Groep Onafhankelijk stuurt, en stuurt meerdere subtype-knoppen aan. Spraak en Energie tellen mee, maar vooral als versterkers van de andere twee." },
    { type: "h3", text: "Waarom voelt een resultaat soms verkeerd aan, ook met verstandige schuifregelaars?" },
    { type: "p", text: "Bijna altijd door de middenbanden. Een schuifregelaar geparkeerd tussen `34` en `66` draagt bijna geen informatie — het model leest hem als neutraal — waardoor twee Mii's die zich in het spel anders voelen, identiek gekwantiseerd kunnen worden en hetzelfde opleveren. De volgorde van de cascade versterkt dat: de eerste regel die past wint, zodat een energiek en zacht Mii en een energiek en direct Mii door één enkele band gescheiden kunnen zijn. Als een voorspelling botst met hoe je Mii zich echt gedraagt, vertrouw dan op het gedrag en behandel de code als wat hij is: een benadering." },
    { type: "h3", text: "Verandert de persoonlijkheid hoe een Mii zich in het spel gedraagt?" },
    { type: "p", text: "Spelersobservatie zegt ja, in grote lijnen: Mii's met directe spraak gooien er tijdens ruzies alles uit en belijden vroeg, fantasierijke Mii's stellen vreemde activiteiten voor, en gestructureerde Mii's volhouden de routines die het spel ze biedt. Wat de persoonlijkheid aantoonbaar níet doet, is het lot vastzetten — vriendschapsniveaus, cadeaugeschiedenis en willekeurige gebeurtenissen zitten buiten dit systeem. Precies daarom komen onze compatibiliteitsscores met onderbouwing in plaats van beloftes." },
    { type: "h3", text: "Is dit dezelfde MBTI-test die mensen online doen?" },
    { type: "p", text: "Nee — en dat onderscheid is belangrijk. De Myers-Briggs Type Indicator is een vragenlijst voor echte mensen; deze mapping is een vertaallaag tussen het schuifregelaarsysteem van een videogame en de vierletterse woordenschat van die vragenlijst. Op asniveau betekenen de letters hetzelfde, maar een Mii kan niet introvert zijn zoals een mens dat kan — het kan alleen een schuifregelaarwaarde vasthouden. Behandel de code van een Mii als een gedeelde steno voor zijn schuifregelaarpatroon, niet als een psychologische beoordeling van het personage, en zeker niet van de eigenaar." },
    { type: "h2", text: "Omgekeerd gebruiken: van MBTI-code naar schuifregelaars" },
    { type: "p", text: "De tabel werkt ook achterstevoren — en dat is de richting die de meeste bezoekers eigenlijk nodig hebben: je kent je eigen MBTI-code en wilt een Mii die past. Lees de code als vier schuifregelaarposities en zet ze zo af:" },
    { type: "ol", items: [
      "**Eerste letter → Beweging.** E wil Beweging richting snel (`67` of hoger); I richting traag (`33` of lager).",
      "**Tweede letter → Energie.** S zit aan het praktische uiteinde (`33` of lager); N aan het fantasierijke (`67` of hoger).",
      "**Derde letter → Spraak.** T wil direct (`67` of hoger); F wil zacht (`33` of lager).",
      "**Vierde letter → Denken.** J wil gestructureerd (`67` of hoger); P wil flexibel (`33` of lager).",
    ] },
    { type: "p", text: "Streef naar de uiteinden van elke as, niet naar het midden — middenbanden zijn de zwakke plek van het model, zoals de limietenparagraaf hieronder uitlegt. Eén code vraagt om een keuze in plaats van een instelling: [INFP](/nl/tomodachi-life-mbti/infp) past bij zowel de [Kunstenaar](/nl/tomodachi-life-personality/artist) als de [Zachtmoedig](/nl/tomodachi-life-personality/softie). Kies de rij waarvan de groep bij het gewenste temperament hoort — teruggetrokken **Onafhankelijk** voor de Kunstenaar, hartelijk **Meegaand** voor de Zachtmoedig — en zet de schuifregelaars op de signatuur van die rij." },
    { type: "h2", text: "De INFP-anomalie: 16 persoonlijkheden, 15 codes" },
    {
      type: "p",
      text: "Tel de MBTI-kolom in de tabel hierboven na en je vindt maar 15 unieke codes. Twee persoonlijkheden — de **Kunstenaar** en de **Zachtmoedig** — worden beide aan [INFP](/nl/tomodachi-life-mbti/infp) gekoppeld. Dit is geen typfout; het is een structurele eigenschap van elke 16-naar-16-koppeling die via vier assen loopt.",
    },
    {
      type: "p",
      text: "De Kunstenaar en de Zachtmoedig delen exact dezelfde schuifregelaarsignatuur: langzaam, zacht, verbeeldingsvol en flexibel. Wat ze scheidt, is hun groep. De Kunstenaar woont in Groep Onafhankelijk, waar het model die signatuur leest als een teruggetrokken dromer met een rijke binnenwereld. De Zachtmoedig woont in Groep Meegaand, waar die identieke signatuur een zachtaardige bewoner wordt die openlijk affectie toont. In speltermen kun je ze zien als dezelfde vier aswaarden in twee verschillende sociale kostuums — de ene houdt afstand, de andere zoekt nabijheid.",
    },
    {
      type: "p",
      text: "De praktische consequentie: met MBTI alleen kun je een [Kunstenaar](/nl/tomodachi-life-personality/artist) niet van een [Zachtmoedig](/nl/tomodachi-life-personality/softie) onderscheiden. Als je een eilandbezetting op basis van MBTI-codes plant, onthoud dan dat INFP dubbelzinnig is, en controleer de groep (of de persoonlijkheidspagina) om te zien welke van de twee een bepaald Mii werkelijk is. Elke andere code in de tabel koppelt aan precies één persoonlijkheid.",
    },
    { type: "h2", text: "Hoe het compatibiliteitsmodel dezelfde groepen gebruikt" },
    {
      type: "p",
      text: "De koppeling stopt niet bij alleen een label — dezelfde groepsstructuur drijft onze [compatibiliteitscalculator](/nl/tomodachi-life-compatibility). Het model scoort een paar op twee schalen, romantiek en vriendschap, en beide schalen zijn opgebouwd uit dezelfde ingrediënten, zodat de rekenwijze controleerbaar blijft:",
    },
    {
      type: "ul",
      items: [
        "**Dierenriemterm (50%).** Een symmetrische 12 × 12 dierenriemmatrix levert voor elk willekeurig paar tekens een basischemiescore op tussen `40` en `90`. Paren met hetzelfde teken en klassieke elementparen staan bovenaan dat bereik.",
        "**Basisterm (50%).** Een vlakke `50` die het neutrale startpunt van het model vertegenwoordigt, voordat persoonlijkheid wordt meegewogen.",
        "**Persoonlijkheidsmodificatoren.** Aanvullende groepen (Sociaal met Onafhankelijk, of Zelfverzekerd met Meegaand) tellen `+20` op bij romantiek. Twee Mii's uit dezelfde groep verliezen `10` romantiek maar winnen `+20` vriendschap. Twee Mii's met **exact dezelfde** persoonlijkheid verliezen nog eens `5` romantiek en winnen nog eens `+10` vriendschap.",
      ],
    },
    {
      type: "p",
      text: "De eindscore is de som van de twee termen plus de modificator, afgerond en begrensd op `0 – 100`. De formule is bewust eenvoudig en is dezelfde die onze [romantiek-matcher](/nl/tomodachi-life-romance-matcher) gebruikt: `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. De transparantie is het hele punt — een getal dat je niet kunt ontleden, is een getal dat je niet kunt vertrouwen, en bij elke score die de site toont hoort een volledige uitsplitsing.",
    },
    {
      type: "callout",
      text: "De aanvullendheidbonus per groep codeert de meest consistente waarneming van de community over relaties in Tomodachi Life: paren met tegengesteld temperament (snel met langzaam, direct met zacht) genereren de meeste romantiekgebeurtenissen, terwijl paren uit dezelfde groep de stabielste vriendschappen voortbrengen. Het is een modelkeuze, geen constante in het spel.",
    },
    { type: "h2", text: "Probeer het model zelf uit" },
    {
      type: "p",
      text: "De snelste manier om de pipeline te verinnerlijken is de schuifregelaars heen en weer te bewegen en te kijken hoe de uitvoer verandert:",
    },
    {
      type: "ul",
      items: [
        "[Persoonlijkheidscalculator](/nl/tomodachi-life-personality-calculator) — stel de vier schuifregelaars rechtstreeks in en zie de voorspelde persoonlijkheid, groep en MBTI-code.",
        "[Persoonlijkheidsoverzicht](/nl/tomodachi-life-personality-chart) — de volledige referentie met alle 16 typen, met een eigen kleur per groep.",
        "[MBTI-koppeling](/nl/tomodachi-life-mbti) — blader vanaf de MBTI-kant: één pagina per type, met schuifregelaarneigingen en compatibiliteitslabels.",
        "[Compatibiliteitscalculator](/nl/tomodachi-life-compatibility) — koppel twee Mii's aan elkaar en ontleed de romantiek- en vriendschapsscores.",
      ],
    },
    { type: "h2", text: "Grenzen van het model (lees dit deel)" },
    {
      type: "p",
      text: "Nintendo heeft het werkelijke persoonlijkheidsalgoritme van het spel nooit gepubliceerd, dus elke bewering in deze gids — de banddrempels, de groepscascade, de lettertoewijzingen — is een community-schatting, teruggeleid uit spelerswaarnemingen en niet geëxtraheerd uit de code van het spel. Het model benadert de uitkomsten in het spel goed genoeg om nuttig te zijn voor het plannen van je eilandbezetting, maar het blijft een model, en zoals elk model zit het er ergens naast.",
    },
    {
      type: "p",
      text: "Drie kanttekeningen om in je achterhoofd te houden. Ten eerste zijn schuifregelaars in de middelste band (`34 – 66`) de zachte plek van het model: kleine aanpassingen vlak bij de drempels kunnen een band doen omslaan en daarmee de voorspelde persoonlijkheid wijzigen, dus behandel resultaten vlak bij de grens als voorlopig. Ten tweede betekent de hierboven beschreven INFP-botsing dat plannen op basis van MBTI informatie verliest die plannen op basis van persoonlijkheid juist wél bewaart. Ten derde hangen uitkomsten in het spel ook af van factoren die dit model niet aanraakt — eilandgebeurtenissen, de cadeaugeschiedenis en de random seed achter de reacties van elke Mii — dus compatibiliteitsscores zijn vertrekpunten voor verhalen, geen garanties daarvoor.",
    },
    {
      type: "callout",
      text: "MBTI en Nintendo zijn geregistreerde handelsmerken van hun respectieve eigenaren. Deze koppeling is een door fans gemaakte interpretatie, bedoeld voor entertainment en planning, en is niet verbonden met of onderschreven door Nintendo of de Myers-Briggs Company.",
    },
  ],
};
