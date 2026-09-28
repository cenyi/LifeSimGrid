/**
 * LifeSimGrid — Article de blog (fr) : Comment le Labo Vocal Tomodachi génère ses voix 8-bit
 *
 * Traduction française de posts/tomodachi-life-voice-synthesis-guide.ts,
 * ancrée dans l'implémentation propre du site :
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Comment le Labo Vocal Tomodachi génère ses voix 8-bit",
  description:
    "Tout le pipeline Web Audio API du Labo Vocal Tomodachi : nœuds d'oscillateur, formes d'onde, les 5 préréglages vocaux et le rôle de chaque paramètre.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Synthèse Vocale", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Le Labo Vocal Tomodachi construit ses voix Mii 8-bit à partir d'un graphe Web Audio API à trois nœuds : un `OscillatorNode` génère le ton, un `BiquadFilterNode` l'adoucit et un `GainNode` façonne son enveloppe de volume. Ce guide dissèque ce pipeline exactement tel qu'il s'exécute dans le [Labo Vocal Tomodachi](/fr/tomodachi-voice-lab) — chaque constante, chaque préréglage et chaque décision d'ordonnancement — afin que vous puissiez comprendre, reproduire ou étendre l'esthétique de parole en bips qui évoque Tomodachi Life: Living the Dream. Chaque chiffre ci-dessous est cité depuis le code source du site, et lorsqu'une valeur est une estimation de la communauté plutôt qu'un élément documenté par Nintendo, le texte le précise.",
    },
    { type: "h2", text: "Pourquoi les voix de Tomodachi parlent en bips" },
    {
      type: "p",
      text: "La signature audio de Tomodachi Life, c'est la parole en bips : au lieu de dialogues enregistrés, chaque Mii s'exprime en courts tons synthétisés qui suivent le rythme d'une phrase sans jamais former de vrais mots. Cette approche remonte aux origines de la série sur console portable, où la taille des cartouches et le matériel audio rendaient le doublage complet impraticable, et elle a survécu dans Tomodachi Life: Living the Dream sur Switch parce que les bips sont devenus partie intégrante de l'identité de la série. Le résultat se perçoit comme de la parole parce qu'il copie sa prosodie — mouvement de hauteur, rythme des syllabes, pauses — tout en restant délibérément non lexical.",
    },
    {
      type: "p",
      text: "Nintendo n'a jamais publié la méthode de synthèse réelle du jeu, donc toute reconstruction dans un navigateur est par définition une estimation de la communauté. Ce que le labo vise, c'est l'esthétique plutôt qu'une reproduction exacte au bit près, et trois propriétés font l'essentiel du travail. D'abord, les tons sont courts : les enveloppes s'ouvrent et se ferment en quelques dizaines de millisecondes, si bien que chaque syllabe commence et s'arrête net. Ensuite, la forme d'onde est riche en harmoniques : un timbre bourdonnant se lit bien plus facilement comme du « chiptune » qu'un ton pur. Enfin, la hauteur n'est jamais statique : de petits décalages de fréquence par syllabe imitent le contour de la parole naturelle. Le reste de ce guide montre comment chacune de ces propriétés correspond à un mécanisme concret de la Web Audio API.",
    },
    { type: "h2", text: "Le pipeline de synthèse, nœud par nœud" },
    {
      type: "p",
      text: "Chaque son produit par le labo traverse exactement trois nœuds de traitement entre l'oscillateur et vos haut-parleurs. Un `AudioContext` neuf est créé à chaque lecture — le labo ne garde jamais un graphe audio global actif — et chaque syllabe y planifie son propre ensemble de nœuds :",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        elder preset only:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "Le `OscillatorNode` est la source du son. Son `type` provient du préréglage sélectionné (`sawtooth` pour quatre des cinq préréglages, `square` pour le robot), et sa `frequency` est définie par le curseur de hauteur. Comme un oscillateur n'est qu'un générateur de forme d'onde brut, il n'a aucun contrôle de timbre propre — tout ce qui différencie le son d'un préréglage d'un autre tient à l'ordonnancement des paramètres en aval.",
    },
    {
      type: "p",
      text: "Le `BiquadFilterNode` est toujours configuré comme un filtre `lowpass`, avec sa coupure issue de la valeur `filterFreq` du préréglage (`900 – 2500 Hz` selon le préréglage). Un filtre passe-bas atténue les harmoniques au-dessus de sa coupure, ce qui transforme le bourdonnement à pleine puissance d'une dent de scie brute en quelque chose d'apparenté à une voix : les préréglages plus sombres (personne âgée à `900 Hz`) ne gardent que les harmoniques graves, tandis que les préréglages plus clairs (enfant à `2500 Hz`) laissent passer l'éclat qui fait qu'une voix sonne petite et jeune.",
    },
    {
      type: "p",
      text: "Le `GainNode` est là où vit l'enveloppe, planifiée avec quatre points d'automatisation. Le gain démarre à `0` à l'heure de début de la syllabe, monte linéairement jusqu'à la cible du préréglage (`0.2 – 0.3`) pendant le temps d'attaque, se maintient à cette valeur jusqu'à un temps de libération avant la fin, puis redescend linéairement vers `0`. Les appels sont `setValueAtTime()` pour les points d'ancrage et `linearRampToValueAtTime()` pour les rampes — une simple enveloppe attaque/maintien/libération sans courbes exponentielles, ce qui garde au son ce caractère abrupt typique, bien adapté au style 8-bit.",
    },
    {
      type: "p",
      text: "Une quatrième paire de nœuds facultative existe : le vibrato. Quand un préréglage l'active, un second `OscillatorNode` agissant comme LFO (oscillateur basse fréquence) tourne à la valeur `vibratoRate` du préréglage et alimente un `GainNode` défini à la valeur `vibratoDepth`, relié au paramètre `frequency` de l'oscillateur principal. C'est une modulation de fréquence classique — dans le préréglage personne âgée, un LFO à `5 Hz` fait osciller la hauteur de `±15 Hz`, produisant cette qualité chevrotante associée aux voix âgées. Seul le préréglage personne âgée l'active ; les quatre autres laissent le vibrato entièrement désactivé.",
    },
    { type: "h2", text: "Le son de chaque forme d'onde (et quand la choisir)" },
    {
      type: "p",
      text: "Le choix de la forme d'onde est la décision de timbre la plus déterminante de tout le pipeline, car il fixe le contenu harmonique que le filtre et l'enveloppe façonnent ensuite. Le `OscillatorNode` de la Web Audio API offre quatre types standard, et chacun a un caractère distinct :",
    },
    {
      type: "table",
      headers: ["Forme d'onde", "Contenu harmonique", "Caractère", "Préréglages concernés"],
      rows: [
        ["`sine`", "Fondamentale seule", "Pur, proche de la flûte, zéro bourdonnement", "Aucun (disponible via `OscillatorType`)"],
        ["`square`", "Harmoniques impaires, fortes", "Creux, canal lead classique de la NES", "Robot"],
        ["`sawtooth`", "Toutes les harmoniques, décroissantes", "Bourdonnant, nasillard, le plus proche de la richesse vocale", "Homme adulte, Femme adulte, Personne âgée, Enfant"],
        ["`triangle`", "Peu d'harmoniques impaires, faibles", "Doux, moelleux, légèrement étouffé", "Aucun (disponible via `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "Les préréglages du labo n'utilisent que deux des quatre : le `sawtooth` porte les quatre voix organiques et le `square` porte le robot. Cette répartition est délibérée. Une dent de scie contient de l'énergie à chaque harmonique, ce qui, après filtrage passe-bas, laisse un cœur épais et vocal — la raison pour laquelle elle approche les tons chantés ou parlés mieux que toute autre forme d'onde de base. Une onde carrée ne garde que les harmoniques impaires avec plus d'énergie dans les aigus, donnant cette qualité creuse, nasale et indéniablement électronique que recherche le préréglage robot. `Sine` et `triangle` ne sont utilisés par aucun préréglage actuel, mais ils restent modifiables en une ligne via le même champ `OscillatorType` : l'onde sinusoïdale convient aux effets sonores purs comme les carillons, et l'onde triangulaire aux petits bips d'arrière-plan doux là où la dent de scie serait trop agressive.",
    },
    { type: "h2", text: "Les cinq préréglages vocaux, décryptés" },
    {
      type: "p",
      text: "Les cinq préréglages sont cinq ensembles de paramètres posés sur le même graphe à trois nœuds, et leurs différences sont entièrement énumérables. Voici le tableau complet, cité directement depuis la constante `VOICE_PRESETS` du code source :",
    },
    {
      type: "table",
      headers: ["Préréglage", "Forme d'onde", "Fréq. de base", "Coupure passe-bas", "Gain", "Vibrato", "Attack", "Release"],
      rows: [
        ["Homme adulte", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Désactivé", "`0.02 s`", "`0.05 s`"],
        ["Femme adulte", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Désactivé", "`0.02 s`", "`0.04 s`"],
        ["Personne âgée", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Enfant", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Désactivé", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Désactivé", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Homme adulte** ancre l'ensemble à une fréquence de base de `180 Hz`, au bas de la plage de parole typique d'un homme adulte, avec un passe-bas à `1200 Hz` qui dompte le bourdonnement de la dent de scie en quelque chose de plus arrondi. **Femme adulte** porte la base presque au double à `350 Hz`, ouvre le filtre à `1800 Hz` pour un ton plus clair, et réduit à la fois le gain (`0.25`) et la libération (`0.04 s`) pour une articulation légèrement plus nette.",
    },
    {
      type: "p",
      text: "**Personne âgée** est le préréglage le plus travaillé : le registre le plus grave (`120 Hz`), le filtre le plus sombre (`900 Hz`), le seul vibrato (LFO à `5 Hz` avec une profondeur de `±15 Hz`) et l'enveloppe la plus lente (`0.04 s` d'attaque, `0.08 s` de libération). Ces deux dernières valeurs comptent autant que la hauteur — l'attaque lente adoucit le début de chaque syllabe, et la longue libération laisse les tons déborder légèrement sur le suivant, évoquant l'articulation moins précise visée par le préréglage.",
    },
    {
      type: "p",
      text: "**Enfant** inverse presque toutes les décisions du préréglage personne âgée : la base la plus haute (`600 Hz`), le filtre le plus clair (`2500 Hz`), le gain le plus faible (`0.20`) et l'enveloppe la plus rapide (`0.01 s` d'attaque, `0.03 s` de libération). Des enveloppes rapides sur des hauteurs aiguës sont la recette classique des voix de petites créatures — chaque syllabe atterrit comme un petit pépiement. **Robot** est l'exception sur deux axes : c'est la seule onde `square`, et le seul préréglage avec attaque et libération zéro, ce qui signifie que le gain s'enclenche et se coupe instantanément. Ces bords abrupts produisent la qualité dure, hachée et mécanique que recherche le préréglage — pas de rampe signifie pas de douceur, par construction.",
    },
    { type: "h2", text: "Comment la hauteur et la vitesse pilotent réellement l'oscillateur" },
    {
      type: "p",
      text: "Deux curseurs contrôlent le graphe en temps réel : la hauteur, couvrant `100 – 800 Hz` avec une valeur par défaut de `300 Hz`, et la vitesse, couvrant `0.5x – 2.0x` avec une valeur par défaut de `1.0x`. Chaque préréglage déclare aussi son propre `baseFreq` de référence (le centre de référence listé dans le tableau ci-dessus), qui documente là où ce type de voix est conçu pour se situer.",
    },
    {
      type: "p",
      text: "La hauteur définit directement la fréquence de l'oscillateur, avec un seul garde-fou : dans le préréglage enfant, la fréquence jouée est `Math.max(pitch, 500)`, donc faire glisser le curseur sous `500 Hz` en mode enfant ne fait rien — l'oscillateur ne descend jamais sous ce plancher. Ce verrou protège le caractère du préréglage, car une voix d'enfant à `150 Hz` se percevrait simplement comme un homme adulte tranquille.",
    },
    {
      type: "p",
      text: "La vitesse contrôle le temps, pas la fréquence. Une simple pression sur le bouton de lecture produit un bip d'une durée de `0.5 / speed` secondes — `1.0 s` à `0.5x`, `0.5 s` à `1.0x` et `0.25 s` à `2.0x`. Le même diviseur s'applique à chaque constante de temporisation en mode texte, donc une voix à `2.0x` est réellement deux fois plus rapide de bout en bout plutôt que rééchantillonnée, ce qui aurait décalé sa hauteur. Après la lecture, l'interface réinitialise son état de lecture après `500 / speed + 50` millisecondes, la durée du bip plus une marge de `50 ms`.",
    },
    { type: "h2", text: "Du texte à la parole, un bip par caractère" },
    {
      type: "p",
      text: "Le mode texte vers voix du labo n'est pas un moteur de synthèse vocale — c'est le même pipeline d'oscillateur à trois nœuds, planifié une fois par caractère. Quand vous tapez jusqu'à `100` caractères et appuyez sur prononcer, l'entrée est découpée en caractères individuels, et chaque caractère autre qu'un espace devient un bip de syllabe planifié avec un décalage de hauteur dérivé de son code de caractère. Les constantes de temporisation, toutes divisées par la vitesse :",
    },
    {
      type: "ul",
      items: [
        "**Tonalité par caractère** — `0.08 / speed` secondes par caractère (`0.08 s` à `1.0x`).",
        "**Intervalle entre caractères** — `0.03 / speed` secondes entre les caractères consécutifs.",
        "**Intervalle entre mots** — un caractère espace insère `0.12 / speed` secondes de silence, soit environ 1,5 longueur de caractère.",
        "**Pause de phrase** — chaque 5e caractère (`i % 5 === 4`) ajoute une pause supplémentaire de `gap × 2`, donnant à la sortie une cadence plutôt qu'un flux plat.",
        "**Amorce** — la planification démarre à `currentTime + 0.05` secondes pour que le graphe audio soit prêt avant le premier ton.",
      ],
    },
    {
      type: "p",
      text: "La variation de hauteur est la partie astucieuse. Le décalage de fréquence de chaque caractère est calculé comme `((charCode % 20) - 10) × 3`, ce qui produit une dispersion déterministe entre `-30 Hz` et `+27 Hz` autour de la hauteur de base. Déterministe, c'est l'essentiel : le même mot produit toujours le même contour mélodique, donc une phrase donnée devient reconnaissable au même titre que la voix d'un Mii est reconnaissable. Comme les décalages viennent des codes de caractères plutôt que de la phonétique, la sortie suit de près le rythme du texte tout en restant un charabia non lexical — ce qui est précisément l'effet de parole en bips que le labo cherche à approcher.",
    },
    { type: "h2", text: "Concevoir une voix pour chaque groupe de personnalité" },
    {
      type: "p",
      text: "Une voix de personnalité convaincante est surtout une décision de plage de hauteur : choisissez le préréglage que le tableau de référence du site attribue au groupe de personnalité de votre Mii, puis placez le curseur de hauteur dans la plage recommandée. Le mappage complet utilisé par le [tableau de référence du Labo Vocal](/fr/tomodachi-voice-lab) :",
    },
    {
      type: "table",
      headers: ["Groupe de personnalité", "Type d'exemple", "MBTI", "Préréglage recommandé", "Plage de hauteur"],
      rows: [
        ["Extraverti", "Meneur", "ESTJ", "Homme adulte", "`180 – 250 Hz`"],
        ["Assuré", "Designer", "INTJ", "Homme adulte", "`150 – 200 Hz`"],
        ["Indépendant", "Artiste", "INFP", "Femme adulte", "`280 – 380 Hz`"],
        ["Décontracté", "Rêveur", "INFJ", "Personne âgée", "`120 – 180 Hz`"],
        ["Personnages enfantins", "Any", "Any", "Enfant", "`500 – 700 Hz`"],
        ["Personnages robot/IA", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Notez que le tableau mappe des groupes, et non les 16 personnalités — les quatre groupes de personnalité de notre [mappage MBTI](/fr/tomodachi-life-mbti) reçoivent chacun une silhouette vocale représentative, et les personnalités individuelles s'expriment par la position du curseur dans la plage et la vitesse à laquelle vous réglez le contrôle de vitesse. La recette étape par étape :",
    },
    {
      type: "ol",
      items: [
        "**Choisissez le préréglage selon le groupe.** Les Miis Extravertis et Assurés prennent Homme adulte ; les Miis Indépendants prennent Femme adulte ; les Miis Décontractés prennent Personne âgée, dont le vibrato à `5 Hz` ajoute la qualité détendue et sans hâte caractéristique du groupe. Le groupe d'un Mii vient de ses quatre curseurs de personnalité — consultez le [tableau des personnalités](/fr/tomodachi-life-personality-chart) si vous ne le connaissez pas encore.",
        "**Placez le curseur de hauteur dans la plage du groupe.** Pour un Designer Assuré, cela signifie `150 – 200 Hz` ; glisser vers `150 Hz` sonne plus imposant, vers `200 Hz` plus énergique. Le plancher de `500 Hz` du préréglage enfant fait que la plage `500 – 700 Hz` s'impose d'elle-même.",
        "**Choisissez la vitesse selon le style de parole.** Les types Amuseur au débit rapide justifient `1.4x – 2.0x` ; un Rêveur endormi se situe naturellement à `0.5x – 0.8x`. La vitesse ne change que la durée, donc elle ne désaccorde jamais la voix choisie à l'étape 2.",
        "**Testez avec une phrase courte.** Tapez `20 – 30` caractères dans le champ texte et écoutez la pause de phrase à chaque 5e caractère — si la cadence semble inadaptée à la personnalité, ajustez la vitesse avant de toucher à la hauteur.",
        "**Itérez grâce à votre historique.** Chaque lecture — préréglage, hauteur, vitesse et jusqu'à `100` caractères de texte — est enregistrée dans un panneau d'historique `IndexedDB` local à l'intérieur de l'outil, pour que vous puissiez comparer deux réglages en A/B sans les noter. Rien ne quitte le navigateur.",
      ],
    },
    {
      type: "p",
      text: "Les lignes enfant et robot se situent volontairement hors du système de personnalité : n'importe quel Mii peut recevoir l'une ou l'autre de ces voix, c'est pourquoi leur colonne MBTI affiche Any. L'enveloppe de longueur nulle du robot le rend tolérant au tempo — à n'importe quelle vitesse, il conserve la même rigidité hachée, donc c'est la seule voix où la vitesse est purement un contrôle comique.",
    },
    { type: "h2", text: "Pourquoi il n'y a pas de repli vers la Web Speech API" },
    {
      type: "p",
      text: "Le labo évite délibérément la Web Speech API du navigateur — il n'y a aucun appel à `speechSynthesis` dans son code, et le mode texte vers voix est de la pure planification d'oscillateur. C'est une décision de conception avec une justification défendable et un compromis réel, et il vaut la peine d'exposer les deux.",
    },
    {
      type: "p",
      text: "La justification : `speechSynthesis` produit des voix humaines naturelles, ce qui est exactement ce qu'un labo de voix 8-bit ne veut pas. Il délègue aussi la sélection des voix au système d'exploitation, donc le même texte peut sonner différemment selon les navigateurs et les appareils, et plusieurs navigateurs chargent les voix paresseusement, avec une latence perceptible à la première énonciation. L'approche un bip par caractère garde chaque son dans le même graphe à trois nœuds que le mode bip unique, garantit un timbre identique partout où la Web Audio API fonctionne, et démarre instantanément car rien n'a besoin d'être chargé.",
    },
    {
      type: "p",
      text: "Le compromis : la sortie n'est pas une parole intelligible. Elle suit le rythme et le contour du texte mais ne produit aucun mot reconnaissable, donc elle évoque la cadence de la parole en bips de Tomodachi Life plutôt que sa compréhensibilité — et le charabia du jeu n'est pas compréhensible non plus, ce qui est sans doute le but recherché. Arrêter la lecture est tout aussi direct et efficace : le labo ferme l'`AudioContext` entier via `close()`, ce qui tue immédiatement chaque nœud planifié plutôt que de s'estomper.",
    },
    { type: "h2", text: "Les limites, énoncées honnêtement" },
    {
      type: "p",
      text: "Trois limites bornent ce que ce synthétiseur peut honnêtement prétendre. D'abord, il approxime une esthétique, pas le moteur du jeu : Nintendo n'a jamais documenté comment Tomodachi Life génère ses voix, donc les valeurs de préréglage ici sont des estimations de la communauté accordées pour évoquer le son de la série, pas des constantes extraites. Les voix rappellent celles du jeu, elles n'en sont pas des répliques.",
    },
    {
      type: "p",
      text: "Ensuite, la synthèse est monophonique et sans formants. Chaque syllabe est un unique oscillateur façonné par un seul filtre passe-bas, alors que la parole naturelle — et vraisemblablement le moteur plus sophistiqué du jeu — porte une structure de formants issue du conduit vocal. C'est pourquoi la sortie se perçoit comme une voix chiptune plutôt que comme de la parole échantillonnée, et c'est l'écart qui mérite le plus d'être exploré si vous étendez le code : un second oscillateur à l'octave supérieure, ou un filtre avec un mouvement de fréquence planifié, rapprocheraient tous deux le résultat du territoire vocal.",
    },
    {
      type: "p",
      text: "Enfin, tout dépend de la prise en charge du navigateur. La Web Audio API utilisée ici — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — est prise en charge par tous les grands navigateurs actuels, mais le caractère sonore de la Web Audio API varie encore légèrement selon les piles audio des appareils, et les navigateurs qui bloquent la lecture automatique jusqu'à un geste de l'utilisateur exigent l'appui sur le bouton de lecture que le labo fournit déjà. Côté confidentialité, l'outil est entièrement côté client : la synthèse s'exécute dans le navigateur, et la seule persistance est l'historique `IndexedDB` local — aucun audio ni texte n'est envoyé nulle part.",
    },
    { type: "h2", text: "Essayez le pipeline vous-même" },
    {
      type: "p",
      text: "Le moyen le plus rapide d'intégrer le modèle est de bouger les deux curseurs et d'entendre le graphe répondre en temps réel :",
    },
    {
      type: "ul",
      items: [
        "[Labo Vocal Tomodachi](/fr/tomodachi-voice-lab) — le synthétiseur lui-même : cinq préréglages, le curseur de hauteur `100 – 800 Hz`, le contrôle de vitesse et le mode texte à un bip par caractère.",
        "[Mappage MBTI de Tomodachi Life](/fr/tomodachi-life-mbti) — comment les quatre curseurs de personnalité d'un Mii produisent son groupe, qui décide de son préréglage dans le tableau ci-dessus.",
        "[Tableau des personnalités](/fr/tomodachi-life-personality-chart) — la référence complète des 16 types pour choisir une personnalité représentative à faire parler.",
        "[Débloqueur de QR Mii](/fr/mii-qr-unlocker) — associez une voix conçue à un personnage Mii édité pour l'habitant d'île complet.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life et Nintendo sont des marques déposées de leurs propriétaires respectifs. Ce synthétiseur vocal est une interprétation réalisée par des fans à des fins de divertissement ; il n'est ni affilié à Nintendo ni approuvé par celui-ci.",
    },
  ],
};
