/**
 * LifeSimGrid — Article de blog (fr) : la correspondance entre les 16 personnalités de Tomodachi Life et le MBTI
 *
 * Traduction française de posts/tomodachi-life-mbti-mapping-explained.ts,
 * ancrée dans le modèle propre au site :
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Tomodachi Life : correspondance des 16 types au MBTI",
  description:
    "Toute la méthodologie de notre correspondance Tomodachi Life MBTI : paliers de curseurs, logique de groupe, dérivation des lettres et anomalie INFP.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Personnalité", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life attribue à chaque Mii l'une de ses 16 personnalités, et ce choix se joue sur quatre curseurs cachés dans l'éditeur de Mii. Notre [correspondance MBTI](/fr/tomodachi-life-mbti) est un modèle estimatif issu de la communauté qui convertit ces quatre curseurs en un code à quatre lettres à la manière de Myers-Briggs. Ce guide explique le pipeline complet exactement tel qu'il s'exécute sur ce site — les seuils de paliers, la logique de sélection des groupes, la dérivation des lettres et l'unique cas où la correspondance produit une collision surprenante. Chaque nombre ci-dessous provient du même modèle qui alimente notre [calculateur de personnalité](/fr/tomodachi-life-personality-calculator) et le [tableau des 16 types](/fr/tomodachi-life-personality-chart) ; vous pouvez donc reproduire n'importe quel résultat à la main.",
    },
    { type: "h2", text: "Les quatre curseurs qui décident de tout" },
    {
      type: "p",
      text: "Quand vous enregistrez un Mii, le jeu vous laisse régler finement quatre axes de personnalité. Les communautés de fans leur donnent des noms légèrement différents ; sur ce site, nous les appelons **Mouvement**, **Parole**, **Énergie** et **Réflexion**, et chacun est une valeur continue de `0` à `100`. Aucune des 16 personnalités n'est accessible par un seul curseur — la personnalité est un **motif** réparti sur les quatre axes, ce qui explique pourquoi deux Miis peuvent sembler complètement différents tout en partageant une même valeur de curseur.",
    },
    {
      type: "p",
      text: "Le **Mouvement** va de lent à rapide. Un Mii au Mouvement élevé traverse l'île nettement plus vite, prend l'initiative de toquer aux portes et tend à apparaître en premier dans les scènes de groupe. La **Parole** va de doux à direct. Les Miis directs donnent des réponses sans détour, avouent leurs sentiments tôt et assènent les répliques les plus dures pendant les querelles. L'**Énergie** va de pratique à imaginatif — les Miis pratiques s'occupent de ce qu'ils ont devant eux, les Miis imaginatifs rêvassent, proposent de nouvelles activités et réagissent fortement à la nouveauté. La **Réflexion** va de flexible à structuré : les Miis structurés respectent leurs routines, gardent des opinions bien arrêtées et savent tenir leurs comptes.",
    },
    {
      type: "p",
      text: "Ces quatre axes n'ont pas été choisis au hasard. Chacun correspond à exactement une lettre du code MBTI, et c'est précisément ce qui rend possible une correspondance nette des 16 types. Avant d'en arriver là, le modèle doit pourtant condenser quatre valeurs continues en l'une des 16 personnalités discrètes — et il le fait en trois passes : les paliers, le groupe, puis le sous-type.",
    },
    { type: "h2", text: "Passe 1 : chaque curseur devient l'un des trois paliers" },
    {
      type: "p",
      text: "La première passe réduit chaque curseur à un palier bas, moyen ou haut. Les seuils sont fixes pour les quatre curseurs :",
    },
    {
      type: "table",
      headers: ["Palier", "Valeur du curseur", "Signification"],
      rows: [
        ["Bas", "`0 – 33`", "L'extrémité gauche de l'axe (lent, doux, pratique, flexible)"],
        ["Moyen", "`34 – 66`", "Aucune attraction marquée dans un sens ou dans l'autre"],
        ["Haut", "`67 – 100`", "L'extrémité droite de l'axe (rapide, direct, imaginatif, structuré)"],
      ],
    },
    {
      type: "p",
      text: "Trois paliers par curseur, sur quatre curseurs, cela donne `3 × 3 × 3 × 3 = 81` cellules de curseurs possibles. C'est largement plus que les 16 personnalités que le jeu propose réellement — d'où la nécessité d'une deuxième passe pour fusionner les cellules similaires, et la raison pour laquelle plusieurs combinaisons de curseurs différentes peuvent atterrir sur la même personnalité. Si vous avez déjà juré que deux de vos Miis avaient des positions de curseurs différentes mais la même personnalité, en voici la raison : les 16 résultats du jeu sont moins fins que ses entrées de curseurs.",
    },
    { type: "h2", text: "Passe 2 : les paliers choisissent l'un des quatre groupes" },
    {
      type: "p",
      text: "Les 16 personnalités sont organisées en quatre groupes de quatre : **Extraverti**, **Sûr de soi**, **Indépendant** et **Décontracté**. La deuxième passe décide du groupe en lisant les paliers comme des signaux. Deux valeurs dérivées font le travail :",
    },
    {
      type: "ul",
      items: [
        "**Signal actif** — la somme des paliers de Mouvement, de Parole et d'Énergie (un nombre de `0` à `6`). Les valeurs hautes signifient que le Mii penche vers le social et l'énergie.",
        "**Signal d'intro** — le palier de Réflexion seul, lu avec une polarité inversée : un palier de Réflexion **haut** signifie que le Mii penche vers la réserve et l'introversion.",
      ],
    },
    {
      type: "p",
      text: "Les règles s'enchaînent ensuite en cascade et dans l'ordre. Si le signal d'intro est haut alors que le signal actif est bas, le Mii atterrit dans le groupe **Indépendant** — le foyer de l'Artiste, de l'Esprit libre, du Penseur et du Loup solitaire. Si le signal actif est très haut (`4` ou plus), le Mii est sociable : il devient **Extraverti** quand la Parole est elle aussi dans le palier haut, et **Sûr de soi** sinon. Un signal actif moyen se départage selon le Mouvement — un Mouvement haut garde le Mii **Extraverti**, tout le reste glisse vers **Décontracté**. Et quand le signal actif est bas sans signal d'intro fort, le Mii finit en **Décontracté** par défaut. L'ordre de la cascade a son importance : un Mii introverti mais énergique est départagé par la première règle qui s'applique, et non par une moyenne.",
    },
    {
      type: "p",
      text: "Les deux groupes sociables et les deux groupes réservés ne sont pas des cases arbitraires — ils alimentent directement le modèle de compatibilité du site, où Extraverti s'apparie naturellement avec Indépendant, et Sûr de soi avec Décontracté. On y revient plus bas.",
    },
    { type: "h2", text: "Passe 3 : une seconde lecture détermine le sous-type" },
    {
      type: "p",
      text: "Une fois le groupe fixé, une seconde passe sur les mêmes paliers sélectionne l'un de ses quatre membres. Chaque groupe a ses propres critères de départage. Dans le groupe Extraverti, par exemple, une Énergie haute associée à une Parole haute produit l'**Amuseur** ; un Mouvement haut avec une Parole au moins moyenne donne le **Trendsetter** ; un palier de Réflexion moyen ou supérieur oriente vers le **Meneur** ; et tout le reste devient l'**Optimiste**. Les trois autres groupes suivent le même schéma avec des axes prioritaires différents.",
    },
    {
      type: "p",
      text: "Le tableau complet ci-dessous liste les 16 personnalités avec leur groupe, leur code MBTI et leur signature de curseurs — la lecture des quatre axes qu'implique le code :",
    },
    {
      type: "table",
      headers: ["Personnalité", "Groupe", "MBTI", "Signature de curseurs"],
      rows: [
        ["Meneur", "Groupe Extraverti", "ESTJ", "Rapide · Direct · Pratique · Structuré"],
        ["Amuseur", "Groupe Extraverti", "ESFP", "Rapide · Doux · Pratique · Flexible"],
        ["Trendsetter", "Groupe Extraverti", "ENFP", "Rapide · Doux · Imaginatif · Flexible"],
        ["Optimiste", "Groupe Extraverti", "ESFJ", "Rapide · Doux · Pratique · Structuré"],
        ["Concepteur", "Groupe Sûr de soi", "INTJ", "Lent · Direct · Imaginatif · Structuré"],
        ["Aventurier", "Groupe Sûr de soi", "ESTP", "Rapide · Direct · Pratique · Flexible"],
        ["Battant", "Groupe Sûr de soi", "ENTJ", "Rapide · Direct · Imaginatif · Structuré"],
        ["Charmeur", "Groupe Sûr de soi", "ENTP", "Rapide · Direct · Imaginatif · Flexible"],
        ["Artiste", "Groupe Indépendant", "INFP", "Lent · Doux · Imaginatif · Flexible"],
        ["Esprit libre", "Groupe Indépendant", "INTP", "Lent · Direct · Imaginatif · Flexible"],
        ["Penseur", "Groupe Indépendant", "ISTP", "Lent · Direct · Pratique · Flexible"],
        ["Loup solitaire", "Groupe Indépendant", "ISTJ", "Lent · Direct · Pratique · Structuré"],
        ["Rêveur", "Groupe Décontracté", "INFJ", "Lent · Doux · Imaginatif · Structuré"],
        ["Cœur tendre", "Groupe Décontracté", "ISFJ", "Lent · Doux · Pratique · Structuré"],
        ["Doux", "Groupe Décontracté", "INFP", "Lent · Doux · Imaginatif · Flexible"],
        ["Copain", "Groupe Décontracté", "ISFP", "Lent · Doux · Pratique · Flexible"],
      ],
    },
    { type: "h2", text: "Comment chaque lettre MBTI est dérivée" },
    {
      type: "p",
      text: "Comme chaque axe de curseur a été assigné à une dimension MBTI, dériver le code à quatre lettres revient à lire directement la signature de curseurs. Lettre par lettre :",
    },
    {
      type: "ol",
      items: [
        "**E ou I ← Mouvement.** Un Mii rapide est extraverti (E) ; un Mii lent est introverti (I). Le Mouvement est le seul axe qui décide de la première lettre, ce qui correspond à ce que les joueurs observent : la vitesse de marche est le trait de personnalité le plus visible du jeu.",
        "**S ou N ← Énergie.** Un Mii pratique est sensoriel (S) ; un Mii imaginatif est intuitif (N). Cet axe régit la façon dont le Mii réagit aux nouveaux objets, événements et résidents.",
        "**T ou F ← Parole.** Un Mii direct est du côté Pensée (T) ; un Mii doux est du côté Sentiment (F). Le même curseur qui rend les querelles vives ou douces est celui qui tranche la troisième lettre.",
        "**J ou P ← Réflexion.** Un Mii structuré est du côté Jugement (J) ; un Mii flexible est du côté Perception (P). Les Miis épris de routine portent le J, les improvisateurs portent le P.",
      ],
    },
    {
      type: "p",
      text: "Remarquez que le code est entièrement déterminé par la signature à quatre axes — vitesse de Mouvement, style d'Énergie, style de Parole et structure de Réflexion — et **non** par le groupe. Le groupe est une cinquième information, et la correspondance en a besoin, comme le montre la section suivante.",
    },

    { type: "h2", text: "Les questions que se posent les joueurs" },
    { type: "h3", text: "Des curseurs identiques donnent-ils toujours la même personnalité ?" },
    { type: "p", text: "Oui — le pipeline est entièrement déterministe. Les mêmes quatre valeurs tombent toujours dans les mêmes paliers, dans la même cellule des `81`, résolvent le même groupe dans la cascade et mènent au même sous-type. Deux Miis enregistrés avec des réglages identiques sortiront toujours identiques, sur ce site comme, selon toute l'observation accumulée des joueurs, dans le jeu. Seul un déplacement d'un point au bord d'un palier — de `33` à `34`, ou de `66` à `67` — peut faire basculer un Mii apparemment inchangé ; voilà pourquoi les valeurs limites méritent un second regard avant de figer votre plan d'île." },
    { type: "h3", text: "Quel curseur pèse le plus lourd ?" },
    { type: "p", text: "**Mouvement** porte le plus de poids. C'est le seul axe qui décide de la première lettre (rapide donne E, lent donne I), l'une des trois entrées du signal actif, et l'arbitre entre **Extraverti** et **Décontracté** quand le signal actif est moyen. **Réflexion** arrive juste derrière : elle alimente à elle seule le signal d'intro qui envoie les Miis discrets vers le Groupe Indépendant, et elle oriente plusieurs départages de sous-types. Parole et Énergie comptent, surtout comme multiplicateurs des deux autres." },
    { type: "h3", text: "Pourquoi un résultat semble-t-il parfois faux malgré des curseurs apparemment bien réglés ?" },
    { type: "p", text: "Presque toujours à cause des paliers médians. Un curseur calé entre `34` et `66` ne porte presque aucune information — le modèle le lit comme neutre —, si bien que deux Miis qui semblent différents en jeu peuvent être quantifiés à l'identique et sortir pareils. L'ordre de la cascade aggrave la chose : la première règle qui s'applique gagne, et un Mii énergique et doux peut être séparé d'un Mii énergique et direct par un seul palier. Si une prédiction contredit le comportement réel de votre Mii, faites confiance au comportement et traitez le code comme ce qu'il est : une approximation." },
    { type: "h3", text: "La personnalité change-t-elle le comportement d'un Mii en jeu ?" },
    { type: "p", text: "L'observation des joueurs dit oui, dans les grandes lignes : les Miis à la parole directe lâchent leurs vérités dans les disputes et avouent tôt, les imaginatifs proposent des activités étranges, les structurés suivent les routines que le jeu leur permet de fixer. Ce que la personnalité ne fait visiblement pas, c'est verrouiller le destin — niveaux d'amitié, historique de cadeaux et événements aléatoires vivent hors de ce système. C'est précisément pour cela que nos scores de compatibilité arrivent avec leur décomposition, pas avec des promesses." },
    { type: "h3", text: "Est-ce le même test MBTI que l'on passe en ligne ?" },
    { type: "p", text: "Non — et il vaut mieux ne pas les confondre. Le Myers-Briggs Type Indicator est un questionnaire pour de vraies personnes ; cette correspondance est une couche de traduction entre le système de curseurs d'un jeu vidéo et le vocabulaire à quatre lettres de ce questionnaire. Les lettres gardent le même sens au niveau des axes, mais un Mii ne peut pas être introverti comme une personne : il ne peut que porter une valeur de curseur. Prenez le code d'un Mii comme un raccourci partagé pour son profil de curseurs, non comme une évaluation psychologique du personnage — et encore moins de son propriétaire." },
    { type: "h2", text: "À l'envers : du code MBTI aux curseurs" },
    { type: "p", text: "Le tableau marche aussi à l'envers — et c'est le sens dont la plupart des visiteurs ont besoin : vous connaissez votre code MBTI et voulez un Mii assorti. Lisez le code comme quatre positions de curseurs et réglez-les ainsi :" },
    { type: "ol", items: [
      "**Première lettre → Mouvement.** E veut un Mouvement rapide (`67` ou plus) ; I un Mouvement lent (`33` ou moins).",
      "**Deuxième lettre → Énergie.** S au pôle pratique (`33` ou moins) ; N au pôle imaginatif (`67` ou plus).",
      "**Troisième lettre → Parole.** T veut direct (`67` ou plus) ; F veut doux (`33` ou moins).",
      "**Quatrième lettre → Réflexion.** J veut structuré (`67` ou plus) ; P veut flexible (`33` ou moins).",
    ] },
    { type: "p", text: "Visez les extrémités de chaque axe plutôt que le milieu — les paliers médians sont le point faible du modèle, comme l'explique la section des limites. Un même code impose ici un choix, pas un simple réglage : [INFP](/fr/tomodachi-life-mbti/infp) correspond à la fois à l'[Artiste](/fr/tomodachi-life-personality/artist) et au [Doux](/fr/tomodachi-life-personality/softie) ; choisissez la ligne dont le groupe colle au tempérament voulu — **Indépendant** renfermé pour l'Artiste, **Décontracté** chaleureux pour le Doux — et réglez les curseurs sur la signature de cette ligne." },
    { type: "h2", text: "L'anomalie INFP : 16 personnalités, 15 codes" },
    {
      type: "p",
      text: "Comptez la colonne MBTI du tableau ci-dessus et vous n'y trouverez que 15 codes uniques. Deux personnalités — l'**Artiste** et le **Doux** — correspondent toutes les deux à [INFP](/fr/tomodachi-life-mbti/infp). Ce n'est pas une coquille ; c'est une propriété structurelle de toute correspondance de 16 vers 16 qui transite par quatre axes.",
    },
    {
      type: "p",
      text: "L'Artiste et le Doux partagent exactement la même signature de curseurs : lent, doux, imaginatif et flexible. Ce qui les sépare, c'est leur groupe. L'Artiste vit dans le groupe Indépendant, où le modèle lit cette signature comme celle d'un rêveur discret, absorbé dans son monde intérieur. Le Doux vit dans le groupe Décontracté, où la même signature devient celle d'un résident posé et ouvertement affectueux. En jeu, voyez-les comme les quatre mêmes lectures d'axes qui revêtent deux costumes sociaux différents — l'un garde ses distances, l'autre vient vers les autres.",
    },
    {
      type: "p",
      text: "Conséquence pratique : le MBTI seul ne permet pas de distinguer un [Artiste](/fr/tomodachi-life-personality/artist) d'un [Doux](/fr/tomodachi-life-personality/softie). Si vous planifiez la liste des résidents de votre île par codes MBTI, souvenez-vous qu'INFP est ambigu et vérifiez le groupe (ou la page de la personnalité) pour savoir duquel des deux il s'agit pour un Mii donné. Chaque autre code du tableau correspond à exactement une personnalité.",
    },
    { type: "h2", text: "Comment le modèle de compatibilité utilise les mêmes groupes" },
    {
      type: "p",
      text: "La correspondance ne s'arrête pas au simple étiquetage — la même structure de groupes pilote notre [calculateur de compatibilité](/fr/tomodachi-life-compatibility). Le modèle évalue une paire sur deux échelles, romance et amitié, et les deux échelles sont construites à partir des mêmes ingrédients pour que l'arithmétique reste vérifiable :",
    },
    {
      type: "ul",
      items: [
        "**Terme zodiacal (50 %).** Une matrice zodiacale symétrique de 12 × 12 fournit un score de chimie de base entre `40` et `90` pour n'importe quelle paire de signes. Les paires de même signe et les paires d'éléments classiques se situent en haut de cette plage.",
        "**Terme de base (50 %).** Une constante `50` qui représente le point de départ neutre du modèle avant toute prise en compte de la personnalité.",
        "**Modificateurs de personnalité.** Les groupes complémentaires (Extraverti avec Indépendant, ou Sûr de soi avec Décontracté) ajoutent `+20` en romance. Deux Miis du même groupe perdent `10` de romance mais gagnent `+20` d'amitié. Deux Miis d'**exactement la même** personnalité perdent `5` de romance en plus et gagnent `+10` d'amitié en plus.",
      ],
    },
    {
      type: "p",
      text: "Le score final est la somme des deux termes et du modificateur, arrondi et borné à `0 – 100`. La formule est volontairement simple, et c'est aussi celle de notre [matchmaker de romance](/fr/tomodachi-life-romance-matcher) : `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. La transparence est le but — un nombre qu'on ne peut pas décomposer est un nombre auquel on ne peut pas se fier, et chaque score affiché par le site s'accompagne de son détail.",
    },
    {
      type: "callout",
      text: "Le bonus de complémentarité des groupes traduit l'observation la plus constante de la communauté au sujet des relations dans Tomodachi Life : les paires de tempéraments opposés (rapide avec lent, direct avec doux) génèrent le plus d'événements romantiques, tandis que les paires d'un même groupe génèrent les amitiés les plus stables. C'est un choix de modélisation, pas une constante du jeu.",
    },
    { type: "h2", text: "Essayez le modèle vous-même" },
    {
      type: "p",
      text: "Le moyen le plus rapide d'intégrer le pipeline consiste à pousser les curseurs dans tous les sens et à regarder les sorties changer :",
    },
    {
      type: "ul",
      items: [
        "[Calculateur de personnalité](/fr/tomodachi-life-personality-calculator) — réglez directement les quatre curseurs et voyez la personnalité prédite, le groupe et le code MBTI.",
        "[Tableau des personnalités](/fr/tomodachi-life-personality-chart) — la référence complète des 16 types, avec des groupes repérés par couleur.",
        "[Correspondance MBTI](/fr/tomodachi-life-mbti) — partez du côté MBTI : une page par type, avec tendances de curseurs et puces de compatibilité.",
        "[Calculateur de compatibilité](/fr/tomodachi-life-compatibility) — appariez deux Miis et décomposez les scores de romance et d'amitié.",
      ],
    },
    { type: "h2", text: "Les limites du modèle (lisez cette partie)" },
    {
      type: "p",
      text: "Nintendo n'a jamais publié le véritable algorithme de personnalité du jeu ; chaque affirmation de ce guide — les seuils de paliers, la cascade de groupes, les attributions de lettres — est donc une estimation de la communauté reconstruite par rétro-ingénierie à partir de l'observation des joueurs, et non une donnée extraite du code du jeu. Le modèle se rapproche suffisamment des résultats en jeu pour être utile quand vous planifiez la liste de vos résidents, mais c'est un modèle, et comme tous les modèles, il se trompe sur quelque chose.",
    },
    {
      type: "p",
      text: "Trois réserves méritent d'être gardées en tête. D'abord, les curseurs en palier moyen (`34 – 66`) sont le point faible du modèle : de petits changements près des seuils peuvent faire basculer un palier et changer la personnalité prédite — traitez donc les résultats limites comme provisoires. Ensuite, la collision INFP décrite plus haut signifie qu'une planification par MBTI perd des informations qu'une planification par personnalité conserve. Enfin, les résultats en jeu dépendent aussi de facteurs que ce modèle n'aborde pas — les événements de l'île, l'historique des cadeaux et la graine aléatoire derrière les réactions de chaque Mii ; les scores de compatibilité sont donc des points de départ pour des histoires, pas des garanties.",
    },
    {
      type: "callout",
      text: "Cette correspondance est une interprétation de fans à des fins de divertissement et de planification ; elle n'est ni affiliée à Nintendo ni à la Myers-Briggs Company, ni approuvée par elles. MBTI et Nintendo sont des marques déposées de leurs propriétaires respectifs.",
    },
  ],
};
