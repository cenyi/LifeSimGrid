/**
 * LifeSimGrid — Article de blog (fr) : Tomodachi Life, l'aliment préféré de chaque Mii, une méthode de test
 *
 * Ancré dans le propre modèle du site :
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "L'aliment préféré de chaque Mii : la méthode de test",
  description:
    "Un protocole en sept étapes pour trouver l'aliment préféré de chaque Mii dans Tomodachi Life : 48 aliments, 8 catégories, affinités par groupe.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Aliments", "Personnalité", "Guides"],
  blocks: [
    {
      type: "p",
      text: "Chaque Mii de Tomodachi Life porte deux attributions alimentaires cachées : un aliment préféré généré aléatoirement et un aliment détesté qui l+est tout autant. Comme le jeu ne vous montre aucune de ces deux valeurs, la seule façon fiable de savoir ce qu'un Mii précis adore est de le nourrir et d'observer la réaction — et la façon la plus économique de procéder est de commencer par les aliments que favorise son groupe de personnalité. Ce guide transforme cette idée en un protocole reproductible : comment la base de 48 aliments derrière notre [tableau des aliments](/fr/tomodachi-life-food-chart) est organisée, comment fonctionnent les cinq niveaux de réaction, ce que le modèle d'affinité estimé par la communauté prédit pour chacun des quatre groupes de personnalité, et une boucle de test en sept étapes qui convertit les conjectures en une recherche consignée et reproductible. Chaque chiffre ci-dessous provient des fichiers de données du site lui-même ; vous pouvez donc reproduire toute la méthode à la main.",
    },
    { type: "h2", text: "Pourquoi les aliments préférés ont de l'importance sur votre île" },
    {
      type: "p",
      text: "Nourrir un Mii avec son aliment préféré produit la réaction positive la plus forte du système alimentaire du jeu, et cet effet mérite d'être intégré à vos plans. Les wikis communautaires et les rapports de joueurs de longue date décrivent la réaction à l'aliment préféré comme l'une des animations de joie les plus spectaculaires de l'île : le Mii célèbre, son humeur bondit visiblement, et un résident satisfait a tendance à se montrer souriant lors des événements sociaux qui nourrissent amitiés, romances et demandes en mariage. Nourrir avec l'aliment détesté produit l'effet inverse — une réaction clairement négative. Connaître les deux attributions cachées remplit donc deux tâches à la fois : cela vous donne un levier de bonheur quotidien fiable, et cela vous évite de servir par accident le seul plat qui gâche l'ambiance.",
    },
    {
      type: "p",
      text: "Il existe une seconde raison, moins évidente, de chasser les aliments préférés : tester les aliments est l'une des rares activités de l'île qui produit des informations propres, Mii par Mii. Chaque nourrissage est une expérience contrôlée — un résident, un aliment, une réaction observable — et le vocabulaire des réactions est assez restreint pour être consigné en un seul appui. Une fois un préféré confirmé et noté, les décisions suivantes concernant ce résident deviennent plus simples : qui reçoit les bons plats lors de vos tournées quotidiennes, quelles réactions attendre quand vous planifiez la [compatibilité](/fr/tomodachi-life-compatibility), et quels aliments écarter de la table du dîner. Le reste de ce guide explique comment rendre cette expérience peu coûteuse — moins de nourrissages par préféré confirmé, et zéro note perdue.",
    },
    { type: "h2", text: "L'espace de recherche : 8 catégories, 48 aliments, 16 préférés fréquents" },
    {
      type: "p",
      text: "Votre espace de recherche compte exactement 48 aliments répartis en 8 catégories — Boissons, Desserts, Confiseries, Collations, Plats principaux, Fruits, Légumes et Autres — et connaître sa forme est ce qui rend possible un test efficace. La base de données est celle qui se cache derrière le [tableau des aliments](/fr/tomodachi-life-food-chart). Chaque entrée porte trois propriétés qui comptent pour le protocole : un `id` stable sur lequel le suivi s'appuie, une catégorie, et un indicateur `commonFavorite` qui marque les 16 éléments que la communauté observe le plus souvent comme préférés. La répartition complète :",
    },
    {
      type: "table",
      headers: ["Catégorie", "Aliments", "Préférés fréquents", "Exemples"],
      rows: [
        ["Boissons", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Desserts", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Confiseries", "5", "2", "Chocolate, Candy, Licorice"],
        ["Collations", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Plats principaux", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Fruits", "5", "1", "Apple, Banana, Melon"],
        ["Légumes", "4", "0", "Carrot, Broccoli, Salad"],
        ["Autres", "2", "0", "Boba Tea, Sundae"],
        ["Total", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Deux détails structurels sautent aux yeux dans ce tableau. D'abord, les catégories lourdes sont `main` (10 éléments) et `drink` (9 éléments) : un passage en force à l'aveuglette y brûle la majorité de vos nourrissages — un protocole capable de différer une catégorie lourde économise de vraies journées de jeu. Ensuite, les 16 éléments `commonFavorite` se regroupent dans les valeurs sûres du public : Cola, Juice et Soda parmi les Boissons ; Cake, Ice Cream, Donut et Cookie parmi les Desserts ; Pizza, Hamburger, Sushi et Curry parmi les Plats principaux. Ces indicateurs font de bonnes premières sondes, même avant que la personnalité n'entre en jeu. Les deux éléments `other` — Boba Tea et Sundae — forment le bout le plus confidentiel de la liste, et c'est exactement là qu'un groupe de personnalité aime chercher en premier.",
    },
    { type: "h2", text: "Comment fonctionnent les réactions : cinq niveaux et une paire cachée" },
    {
      type: "p",
      text: "Chaque nourrissage aboutit à l'un des cinq niveaux de réaction — `love`, `like`, `neutral`, `dislike` ou `hate` — et chaque niveau est une animation distincte et observable dans le jeu. L'échelle à cinq niveaux est aussi le vocabulaire de notre suivi : chaque ligne d'aliment porte cinq boutons de consignation compacts, un par niveau (♥ pour « L'adore », ▲ pour « L'aime », – pour « Neutre », ▼ pour « N'aime pas », ✕ pour « Le déteste »), si bien qu'enregistrer un résultat ne demande qu'un seul appui. L'échelle est volontairement grossière — assez fine pour départager deux aliments positifs, assez grossière pour que vous ne doutiez jamais du niveau que vous venez de voir.",
    },
    {
      type: "p",
      text: "Sous le capot, le modèle du site attache un score d'affinité de `0–100` à chaque aliment pour chaque groupe de personnalité, et une règle de paliers fixe convertit un score en un niveau prédit : `90` et au-delà correspond à `love`, `75–89` à `like`, `40–74` à `neutral`, `25–39` à `dislike`, et tout ce qui se situe en dessous de `25` à `hate`. Ces paliers ne servent qu'à la prédiction. Dès que le préféré réel d'un Mii est confirmé, le modèle est court-circuité : l'aliment préféré est forcé à `love` et l'aliment détesté à `hate`, quoi que dise l'heuristique. Ce forçage reflète le comportement réel du jeu — l'attribution cachée l'emporte toujours sur la personnalité, et c'est précisément pour cela que le test existe.",
    },
    { type: "h2", text: "Ce que le modèle prédit pour chaque groupe de personnalité" },
    {
      type: "p",
      text: "Les quatre groupes de personnalité — **Groupe Extraverti**, **Groupe Sûr de soi**, **Groupe Indépendant** et **Groupe Décontracté** — obtiennent chacun un classement distinct sur les huit catégories, et ce classement est votre ordre de test. La matrice ci-dessous est la référence complète des estimations de la communauté, tirée du fichier de données du site ; lisez une colonne de haut en bas et vous lisez le menu suggéré de ce groupe :",
    },
    {
      type: "table",
      headers: ["Catégorie", "Groupe Extraverti", "Groupe Sûr de soi", "Groupe Indépendant", "Groupe Décontracté"],
      rows: [
        ["Boissons", "90", "70", "60", "75"],
        ["Desserts", "85", "65", "70", "80"],
        ["Confiseries", "95", "55", "60", "75"],
        ["Collations", "80", "75", "70", "85"],
        ["Plats principaux", "65", "90", "60", "90"],
        ["Fruits", "75", "70", "75", "80"],
        ["Légumes", "60", "65", "80", "85"],
        ["Autres", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Quatre menus nets se dessinent. Les Miis du **Groupe Extraverti** — Meneur, Amuseur, Trendsetter et Optimiste — culminent avec les Confiseries (`95`), les Boissons (`90`) et les Desserts (`85`) : un penchant sucré, énergique et tourné vers la fête. Les Miis du **Groupe Sûr de soi** — Concepteur, Aventurier, Battant, Charmeur — culminent avec les Plats principaux (`90`), le pôle restaurant de la liste, tourné vers le statut. Les Miis du **Groupe Indépendant** — Artiste, Esprit libre, Penseur, Loup solitaire — sont le cas intéressant : leurs meilleurs scores reviennent aux éléments de niche `other` (`85`) et aux Légumes (`80`), et c'est précisément pourquoi Boba Tea et Sundae méritent une place dans la base de données. Les Miis du **Groupe Décontracté** — Rêveur, Cœur tendre, Doux, Copain — privilégient le côté cuisine maison : Plats principaux (`90`), Collations (`85`) et Légumes (`85`). L'aperçu des réactions du tableau sélectionne un résident par groupe — un Meneur, un Battant, un Penseur et un Copain — pour que vous puissiez comparer les quatre menus côte à côte. Pour savoir comment un Mii atterrit dans l'un de ces groupes, consultez notre [guide de correspondance MBTI](/fr/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Une propriété honnête de la matrice : chaque cellule se situe entre `55` et `95`, ce qui signifie que l'heuristique seule ne peut jamais prédire autre chose que `love`, `like` ou `neutral`. Les deux niveaux négatifs ne sont jamais produits par l'affinité de personnalité. En pratique, les négatifs viennent de la seconde attribution cachée — l'aliment détesté, qui est exactement aussi aléatoire que le préféré. La personnalité vous dit où commencer à chercher du côté positif ; rien ne vous dit où se cache le négatif, sinon le test.",
    },
    { type: "h2", text: "Le protocole de test : sept étapes vers un préféré confirmé" },
    {
      type: "p",
      text: "Le protocole trouve un préféré en un minimum de nourrissages en testant d'abord les catégories les plus fortes du groupe, en consignant chaque résultat et en élaguant les catégories à mesure que les preuves arrivent. Vous pouvez l'exécuter entièrement dans le [suivi du tableau des aliments](/fr/tomodachi-life-food-chart), qui mémorise votre liste de contrôle d'une session à l'autre.",
    },
    {
      type: "ol",
      items: [
        "**Identifiez le groupe de personnalité du Mii.** Cherchez le résident dans le [tableau des personnalités](/fr/tomodachi-life-personality-chart) ou dans le [mapping MBTI](/fr/tomodachi-life-mbti) et notez le groupe : Groupe Extraverti, Groupe Sûr de soi, Groupe Indépendant ou Groupe Décontracté. Seul le groupe compte pour la nourriture — le sous-type (Optimiste ou Trendsetter, par exemple) ne change pas la matrice d'affinité.",
        "**Retenez les cinq meilleurs candidats de départ du groupe.** Le panneau de recommandation du tableau trie les 48 aliments par affinité du groupe sélectionné et affiche les cinq plus élevés. Pour un Mii du Groupe Extraverti, ce sont les cinq éléments de la catégorie Confiseries à `95` ; pour un Mii du Groupe Décontracté, le panneau commence par les Plats principaux à `90`. Ces cinq aliments sont votre première session.",
        "**Nourrissez un seul candidat à la fois, l'affinité la plus haute d'abord.** Un aliment par nourrissage garde les preuves propres — les cadeaux en rafale brouillent la trace : impossible de savoir quel élément a causé quelle réaction. Regardez l'animation, notez-la sur l'échelle à cinq niveaux, et passez seulement ensuite au candidat suivant.",
        "**Consignez chaque résultat immédiatement.** Touchez le bouton de réaction correspondant sur la ligne de l'aliment. Le suivi enregistre la liste de contrôle dans `localStorage` sous la clé `lifesimgrid-food-tracker`, si bien que les aliments testés, leurs réactions consignées et le compteur de progression survivent aux rechargements de page et aux redémarrages du navigateur — pas de compte, pas de synchronisation, pas de notes perdues.",
        "**Confirmez le gagnant dès que vous voyez la réaction la plus forte.** Marquez cet aliment `love` dans le suivi et définissez-le comme aliment préféré du Mii dans le sélecteur en haut du tableau. À partir de là, le tableau force `love` pour cet aliment, quelle que soit la prédiction de l'heuristique, et le préféré est déterminé.",
        "**Si une catégorie ne donne que du neutre, éliminez-la et passez à la plus forte suivante du groupe.** Une série de réactions `neutral` sur les éléments d'une catégorie est une preuve que le préféré se trouve ailleurs. Gardez les résultats `like` comme solutions de repli — un aliment aimé n'est pas le préféré, mais il reste un choix quotidien fiable. Descendez la matrice d'affinité catégorie par catégorie jusqu'à ce que le gagnant apparaisse.",
        "**Consignez l'aliment détesté au fil des tests, puis réinitialisez le suivi entre deux Miis.** L'aliment détesté se manifeste par la réaction négative la plus forte au cours d'un test ordinaire — enregistrez-le de la même façon et épinglez-le dans le sélecteur pour que le tableau force `hate` pour cet aliment. Quand vous changez de résident, effacez le suivi en un seul clic (ou utilisez un profil de navigateur séparé), car la liste de contrôle est stockée par navigateur, pas par Mii.",
      ],
    },
    {
      type: "p",
      text: "La limite absolue du protocole est de 48 nourrissages — toute la base de données. L'ordre « groupe d'abord » existe pour que vous ne vous en approchiez presque jamais. La couverture complète des deux catégories de tête d'un groupe coûte au plus 15 nourrissages (les Plats principaux et les Collations totalisent 15 éléments pour les Miis des groupes Décontracté et Sûr de soi) et à peine 6 pour un Mii Indépendant, dont les catégories préférées `other` et Légumes n'en comptent que 6 à elles deux. Ce sont des attentes de départ, pas des garanties — l'attribution cachée est aléatoire, et un résident malchanceux peut vous pousser plus loin dans la matrice.",
    },
    { type: "h2", text: "Exemple pratique : dérouler la boucle avec un Mii Extraverti" },
    {
      type: "p",
      text: "Un Mii Extraverti — disons un Trendsetter — devrait d'abord être sondé avec les Confiseries, et le panneau de recommandation est d'accord : les cinq éléments de la catégorie Confiseries à l'affinité `95`, avec les neuf Boissons qui attendent à `90`. Voici une session réaliste :",
    },
    {
      type: "ul",
      items: [
        "Nourrissages 1–5 — Chocolate, Gum, Caramel, Licorice, Candy : Chocolate obtient un `like` net, Candy un autre `like`, le reste `neutral`. Aucune réaction du niveau le plus fort, donc les Confiseries sortent — et comme la première session couvre par hasard toute la catégorie, cinq nourrissages l'ont éliminée complètement.",
        "Nourrissages 6–8 — Cola, Juice, Soda : tous `neutral`. Trois boissons parmi les préférés fréquents, toutes `neutral` d'affilée, constituent une preuve faible contre toute la catégorie Boissons et ses 9 éléments ; vous mettez donc de côté les six boissons non testées (Coffee, Tea, Milk, Water, Beer, Sake) et passe à la catégorie suivante de la matrice plutôt que de les épuiser une par une.",
        "Nourrissages 9–10 — Cake, Ice Cream : Cake donne `neutral`, et Ice Cream produit la réaction positive la plus forte, impossible à confondre avec une autre. C'est le préféré.",
        "Confirmation — Ice Cream entre dans le sélecteur de préféré, le tableau force désormais `love` pour cet aliment, et le compteur de progression affiche 10 aliments testés sur 48 — environ 21 % de la base de données pour un gagnant confirmé.",
      ],
    },
    {
      type: "p",
      text: "Dix nourrissages ont produit un préféré confirmé, une catégorie entièrement éliminée, une catégorie mise de côté, et deux aliments de repli consignés que vous pouvez encore servir les jours ordinaires. Remarquez ce que le protocole n'a jamais touché : la catégorie `main` de 10 éléments et la catégorie `vegetable` de 4 éléments, les deux affinités les plus faibles d'un Mii Extraverti (`65` et `60`). L'aliment détesté reste inconnu — il est exactement aussi aléatoire que le préféré —, donc au quotidien sur l'île, vous restez à l'affût d'une réaction négative forte et l'épingle comme `hate` dans le sélecteur dès qu'elle apparaît. Déroulez la même boucle avec un Mii Décontracté et seul le point d'entrée change : le panneau commencerait avec les Plats principaux et les Collations au lieu des Confiseries.",
    },
    { type: "h2", text: "Pourquoi les préférés sont aléatoires — et pourquoi les guides à réponses fixes échouent" },
    {
      type: "p",
      text: "Tout guide qui affiche un aliment préféré fixe pour une personnalité donnée décrit un fichier de sauvegarde, pas le jeu. Le fichier de données derrière notre tableau énonce la situation clairement : Tomodachi Life ne publie pas de matrice officielle de réactions aux aliments, et chaque Mii reçoit un aliment préféré généré aléatoirement et un aliment détesté, lui aussi tiré au sort. La randomisation se fait par résident, pas par personnalité — deux Miis avec la même personnalité, le même nom et même des curseurs d'éditeur identiques peuvent porter des préférés cachés différents.",
    },
    {
      type: "p",
      text: "Ce seul fait redessine ce qu'un guide utile peut être. Une table de consultation ne peut pas fonctionner, parce que la réponse n'est pas fonction de quoi que ce soit que vous puissiez lire sur le Mii. Ce qui peut fonctionner, c'est une stratégie de recherche : un ordre qui place d'abord les candidats statistiquement les plus probables, un système de consignation qui ne perd jamais un résultat, et une règle d'élimination qui élague les catégories à mesure que les preuves arrivent. C'est exactement ce que fournit la matrice d'affinité à quatre groupes — des points de départ, pas des réponses — et c'est pourquoi notre [tableau des aliments](/fr/tomodachi-life-food-chart) embarque un suivi persistant au lieu d'une table de préférés prétendus. Traitez tout site qui promet des préférés fixes par personnalité comme vous traiteriez un horoscope : divertissant, infalsifiable, et d'aucune aide pour votre vraie île.",
    },
    { type: "h2", text: "Les limites du modèle (lisez cette partie)" },
    {
      type: "p",
      text: "Les chiffres d'affinité de ce guide sont une estimation de la communauté, pas des données extraites du jeu — Nintendo n'a jamais publié les rouages internes du système alimentaire. Les préréglages sont explicitement ajustés pour que chaque groupe affiche un classement distinct entre les catégories, parce qu'un classement distinct est ce qui rend possible une recommandation du type « quel aliment essayer en premier ». Cet ajustement est un choix de modélisation. Il colle de près à l'observation de la communauté, assez pour être utile quand vous ordonnez vos tests, et comme tous les modèles, il se trompe sur quelque chose.",
    },
    {
      type: "p",
      text: "Trois mises en garde à retenir. D'abord, la règle de paliers signifie que le modèle ne prédit jamais plus bas que `neutral` — chaque valeur préréglée se situe à `55` ou plus —, donc les réactions négatives sont toujours des surprises venues de l'attribution cachée de l'aliment détesté, jamais des prévisions. Ensuite, la base de 48 éléments est un sous-ensemble sélectionné d'aliments observés à travers les titres Tomodachi Life, pas une liste complète des aliments du jeu ; si un nourrissage porte sur un aliment introuvable dans le tableau, consignez l'équivalent le plus proche et continuez. Enfin, le suivi stocke une seule liste de contrôle par navigateur, sous une clé `localStorage` unique, il ne garde donc qu'un Mii actif à la fois — effacez-la entre les résidents, ou gardez un profil de navigateur par insulaire si vous en traquez plusieurs en parallèle. Rien de tout cela ne change l'essentiel : un journal par Mii, fondé sur des preuves, de ce que chaque résident aime réellement. Le modèle décide où vous commencez ; vos nourrissages décident ce que vous croyez.",
    },
    { type: "h2", text: "Essayez le protocole vous-même" },
    {
      type: "ul",
      items: [
        "[Tableau des aliments & suivi](/fr/tomodachi-life-food-chart) — la base complète de 48 aliments, le panneau de recommandation par groupe et la liste persistante des aliments testés.",
        "[Tableau des personnalités](/fr/tomodachi-life-personality-chart) — la référence des 16 types avec des groupes codés par couleur, pour l'étape 1 du protocole.",
        "[Mapping MBTI](/fr/tomodachi-life-mbti) — parcourez les résidents par code à quatre lettres si vous gérez votre liste de résidents de cette façon.",
        "[Calculateur de compatibilité](/fr/tomodachi-life-compatibility) — appariez deux résidents et décomposez les scores de romance et d'amitié une fois leurs préférés consignés.",
      ],
    },
    {
      type: "callout",
      text: "Ce guide des aliments est une interprétation créée par des fans, à des fins de divertissement et de planification ; il n'est ni affilié à Nintendo ni à The Myers-Briggs Company, ni approuvé par eux. MBTI et Nintendo sont des marques déposées de leurs propriétaires respectifs.",
    },
  ],
};
