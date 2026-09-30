/**
 * LifeSimGrid — Article de blog (fr) : le format des QR codes de Mii, expliqué
 *
 * Basé sur l'implémentation du site :
 *   - src/lib/qr-handler.ts            (jsQR binaryData en entrée, QR byte mode en sortie, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (copie autorisée 0x01 bit 0, partage interdit 0x30 bit 0, source : 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "QR de Mii : le format FFL et l'offset 0x04",
  description:
    "Comment un QR de Mii range un Mii en binaire FFL : champs d'en-tête, drapeaux de permissions et la vraie raison du « impossible à modifier ».",
  publishedAt: "2026-09-28",
  tags: ["Mii", "QR code", "3DS", "guides"],
  blocks: [
    {
      type: "p",
      text: "Scannez un QR de Mii avec le scanner ordinaire de votre téléphone : vous obtenez un écran de charabia. Scannez le même code sur une 3DS : vous recevez un personnage complet — visage, nom, silhouette — plus un règlement invisible qui dicte qui peut le copier, le repartager, le modifier. Cet écart entre les deux expériences tient à un petit morceau d'ingénierie binaire, et c'est la raison d'être de notre [Débloqueur QR Mii](/fr/mii-qr-unlocker). Ce guide parcourt le format par le chemin que suit réellement l'outil : la couche QR, le bloc de données FFL, les champs de permissions aux offsets comme \`0x01\` et \`0x04\`, et les raisons exactes pour lesquelles la console affiche **« Ce Mii ne peut pas être modifié. »** Chaque affirmation vient du même décodeur qui tourne dans notre outil — rien ici n'est recyclé d'un wiki.",
    },
    { type: "h2", text: "Première surprise : un QR de Mii n'est pas du texte" },
    {
      type: "p",
      text: "Les codes que vous scannez au quotidien portent du texte pur : une URL, un mot de passe Wi-Fi, la carte d'un restaurant. Le QR d'un Mii, non. Il transporte une **charge utile en byte mode** : un bloc binaire brut qui ne parle qu'à une console qui connaît le format. Quand le scanner du téléphone s'y attaque, il tente de lire ces octets comme du texte dans un encodage quelconque, s'effondre à mi-chemin et crache le charabia que vous connaissez déjà.",
    },
    {
      type: "p",
      text: "La différence technique réside dans la spécification QR elle-même. Un code peut porter ses données en plusieurs modes — numérique, alphanumérique, byte et kanji. Le texte voyage en mode alphanumérique ou en byte mode avec une charge UTF-8 ; un Mii prend aussi le byte mode, mais sa charge **n'est pas du texte du tout**. Notre décodeur lit le code avec [jsQR](https://github.com/cozmo/jsQR) et prend le tableau \`binaryData\` brut plutôt que la chaîne décodée. C'est le détail d'implémentation le plus important de tous : au moment où vous traitez un QR de Mii comme une chaîne de caractères, il est déjà abîmé.",
    },
    {
      type: "p",
      text: "Du côté de l'écriture, le même piège se dresse dans l'autre sens. Un générateur conçu pour les URLs ré-encodera volontiers des données binaires à travers une couche texte et les démolira sans un mot. C'est pourquoi notre encodeur fait passer le tampon en byte mode avec une version de QR et un niveau de correction d'erreur fixes, calibrés pour qu'une caméra de 3DS lise le code sur l'écran d'un téléphone sans broncher. Du binaire entre, du binaire sort : la charge utile ne touche jamais une chaîne de caractères.",
    },
    { type: "h2", text: "FFL : la bibliothèque de visages derrière chaque Mii" },
    {
      type: "p",
      text: "Les données du QR décrivent le Mii au **format FFL (Face Library)** — la bibliothèque de rendu de personnages que Nintendo partage entre ses consoles, documentée publiquement par la communauté et socle des mêmes données Mii que consomment les jeux Wii, 3DS, Wii U et Switch. FFL range un Mii dans une structure compacte : des champs d'identité comme le nom et le genre, un paquet de champs d'apparence pour les traits du visage, la corpulence et les couleurs, et un petit bloc de **drapeaux de permissions** qui décide de ce que les consoles d'autrui ont le droit de faire.",
    },
    {
      type: "p",
      text: "Deux propriétés du format façonnent tout le reste du guide. D'abord, il est **stable d'une génération de console à l'autre** — un QR de l'ère 3DS se scanne encore sur une Wii U, et les jeux Switch consomment les mêmes données sous-jacentes ; un guide de format écrit une fois reste donc utile. Ensuite, il est **esclave des positions** : chaque champ vit à un offset fixe au sein d'une génération, mais ces offsets glissent légèrement d'une génération à l'autre. Un seul offset raté, et vous n'obtenez pas un Mii un peu biscornu — vous obtenez un Mii qui refuse de se scanner. Cette rigueur explique aussi pourquoi le format traverse les changements de console sans une ride : les jeux ne le réinventent pas, ils remettent leurs données de personnage à la même bibliothèque.",
    },
    { type: "h2", text: "La carte de l'en-tête, champ par champ" },
    {
      type: "p",
      text: "Avant toute modification, l'outil analyse les premiers octets du bloc et vous montre un aperçu. Voici les champs d'en-tête que le format définit, et ce que chacun gouverne :",
    },
    {
      type: "table",
      headers: ["Offset", "Champ", "Contenu"],
      rows: [
        ["`0x00`", "Octet de version", "Quelle génération de données Mii le bloc utilise"],
        ["`0x01`", "Drapeaux d'options", "Le bit `0` porte le drapeau **autoriser la copie** ; les autres bits couvrent le drapeau de grossièreté et le verrou régional"],
        ["`0x02`–`0x03`", "En-tête d'emplacement", "Sur quelle page et dans quel emplacement du Mii Maker le Mii a été enregistré"],
        ["`0x04`–`0x0B`", "System ID", "Huit octets identifiant la console propriétaire — le champ que vérifie le blocage d'édition, et que notre passe de déblocage réécrit"],
        ["`0x18`", "Genre et bits personnels", "Le bit de genre, plus la date de naissance et la couleur préférée"],
        ["`0x1A`–`0x2D`", "Nom", "Jusqu'à 10 caractères en UTF-16, terminé par null"],
        ["`0x30`", "Drapeau de partage", "Le bit `0` est l'interrupteur **interdire le partage** (source : documentation du format Mii sur 3dbrew)"],
      ],
    },
    {
      type: "p",
      text: "Le champ du nom mérite un arrêt sur image, car c'est là que l'édition manuelle trébuche le plus souvent. « Dix caractères » ne veut pas dire « dix octets » : en UTF-16, chaque caractère prend deux octets, les positions libres se remplissent de null, et le décodeur s'arrête au premier null. Écrivez le nom en UTF-8 et un nom japonais ou allemand devient de la bouillie sur la console ; oubliez le null final et le nom dévore ce qui le suit.",
    },
    {
      type: "p",
      text: "Tout ce qui suit l'en-tête, c'est le Mii lui-même : des dizaines de champs d'apparence — forme du visage, cheveux, yeux, sourcils, nez, bouche, lunettes, taille, corpulence et couleurs préférées — empaquetés dans des bits précis. L'outil en lit juste assez pour dessiner un aperçu, puis choisit délibérément de **ne plus jamais y toucher** : un déblocage qui déplacerait un seul pixel du visage serait un déblocage auquel on ne peut pas se fier.",
    },
    { type: "h2", text: "Pourquoi les Miis scannés disent « impossible à modifier »" },
    {
      type: "p",
      text: "Le système de permissions existe parce que le QR de Mii est un mécanisme de partage, et que Nintendo a laissé au créateur le soin de décider jusqu'où ce partage va. Quand un Mii naît sur une console, ses données FFL inscrivent le choix de l'auteur en drapeaux dans le bloc. Quand une autre console scanne ce QR, le Mii arrive marqué **reçu** : la console traite le créateur d'origine comme l'auteur du Mii, lit les drapeaux et les applique à la lettre :",
    },
    {
      type: "ul",
      items: [
        "**Autoriser la copie** — si le créateur a interdit la copie, la console réceptrice refusera de dupliquer le Mii ou de l'enregistrer ailleurs.",
        "**Interdire le partage** — partage coupé, ce Mii ne produira pas de nouveau QR à faire circuler.",
        "**Modifier** — un Mii reçu n'est jamais modifiable sur la console réceptrice, quel que soit l'état des deux autres drapeaux. Le droit de modification appartient à la console où le Mii est né. La même logique de propriété régit les valeurs par défaut de personnalité et de voix, et notre [guide de synthèse vocale](/fr/blog/tomodachi-life-voice-synthesis-guide) la démonte en détail.",
      ],
    },
    {
      type: "p",
      text: "C'est la troisième règle qui surprend. Vous pouvez scanner un Mii, l'admirer, l'employer dans vos jeux — mais dès que vous tentez de l'ouvrir dans l'éditeur, la console refuse : **« Ce Mii ne peut pas être modifié. »** Ce n'est pas une panne ; ce sont les drapeaux, scrupuleusement fidèles à la demande de leur auteur.",
    },
    {
      type: "p",
      text: "Il existe une voie de contournement officielle, et elle ne fonctionne que si le créateur a autorisé la copie : sur 3DS, copiez le Mii dans votre propre Mii Maker et reconstruisez-le pièce par pièce. Le Mii reconstruit est né sur votre console : il est à vous, et modifiable de bout en bout. Le hic, c'est que pour tout ce qui dépasse la retouche rapide, la facture est lourde — et si la copie elle-même est verrouillée, la voie disparaît d'emblée. Ce fossé entre « officiellement possible » et « pratiquement exploitable » est exactement le territoire de tout outil de déblocage.",
    },
    { type: "h2", text: "Ce que notre débloqueur change — et ce qu'il ne touche jamais" },
    {
      type: "p",
      text: "La carte des champs en tête, l'opération de déblocage se comprend d'un coup : elle est volontairement minuscule. L'outil lit la charge et réécrit le premier octet du System ID à \`0x04\` — l'identité de propriétaire que la console vérifie pour décider si un Mii reçu peut être modifié —, de sorte que le Mii ne renvoie plus à un propriétaire étranger. Si vous voulez le renommer, il réécrit le champ du nom en UTF-16 correct dans la même passe. Puis il ré-encode le bloc en un QR flambant neuf en byte mode. Tous les autres octets passent un à un, intacts.",
    },
    {
      type: "p",
      text: "L'étape de ré-encodage compte plus qu'elle n'en a l'air. Le nouveau QR naît en byte mode, avec version et niveau de correction \`M\` fixes, dessiné à une taille réglée pour que la caméra d'une 3DS le lise sur un écran de téléphone. Avec de mauvais réglages, le code peut paraître impeccable et échouer précisément sur la console que vous lui pointez : les niveaux de correction troquent la robustesse de lecture contre la capacité de données, et la charge d'un Mii frôle la limite — le choix n'a rien de cosmétique.",
    },
    {
      type: "p",
      text: "Tout le voyage se joue dans votre navigateur. La charge est décodée depuis le fichier que vous déposez, gardée en mémoire, modifiée, puis redessinée ; l'historique de la session dort dans l'IndexedDB de votre propre navigateur. Aucun serveur au milieu — et ce n'est pas qu'une délicatesse pour votre vie privée : cela signifie que le chemin par lequel l'outil garderait en secret une copie du Mii de quelqu'un, le vôtre compris, n'existe pas.",
    },
    { type: "h2", text: "De la 3DS à la Switch : caméras, QR et clés d'accès" },
    {
      type: "p",
      text: "La plus grande part de la confusion actuelle autour du partage des Miis s'explique par l'histoire du matériel. La 3DS avait deux caméras, et y scanner un QR était un geste natif : le Mii Maker, Tomodachi Life, Miitopia et StreetPass s'en nourrissaient tous. La Switch a retiré les caméras sans état d'âme : son Mii Maker sait toujours **lire** un QR de Mii 3DS ou Wii U — dans le vide, puisqu'il n'y a plus de caméra pour le lire. Ce que la Switch a gardé, ce sont les données FFL elles-mêmes ; voilà pourquoi le savoir-faire de ce guide reste valable. Ce qui a changé, c'est la couche de partage.",
    },
    {
      type: "p",
      text: "Pour Miitopia sur Switch, Nintendo a remplacé les QR par un système de **clés d'accès** : un code court qui télécharge un Mii depuis un service en ligne, et une autre clé pour publier le vôtre. La Switch 2 poursuit dans cette voie. Les clés d'accès résoluent avec élégance l'absence de caméra, mais héritent de la même philosophie de permissions — un Mii téléchargé est l'œuvre de quelqu'un d'autre — et ne fonctionnent que dans les jeux qui prennent en charge le service.",
    },
    {
      type: "p",
      text: "Le pont pratique entre les deux ères passe par le format de l'ère 3DS : prenez un QR de Mii, ouvrez les drapeaux s'ils sont fermés, et faites-le entrer dans le Mii Maker de la Switch par l'un des moyens que les joueurs inventent pour contourner la caméra manquante — scan émulé sur une console modifiée, ou reconstruction à l'œil du Mii débloqué depuis l'aperçu décodé. Une fois le Mii installé sur la Switch, ses données sont natives et il est accepté partout où la Switch prend en charge les Miis, de [Tomodachi Life: Living the Dream](/fr/tomodachi-voice-lab) à Miitopia. Et comme le système de personnalités roule sur les mêmes données Mii, tout notre [mappage MBTI de Tomodachi Life](/fr/blog/tomodachi-life-mbti-mapping-explained) vaut pour le personnage transplanté, sans changer un iota.",
    },
    { type: "h2", text: "Pourquoi l'édition manuelle dans un éditeur hexadécimal échoue si souvent" },
    {
      type: "p",
      text: "La carte lue, la tentation est grande de sauter l'outil et de retourner des octets dans un éditeur hexadécimal. Trois modes d'échec y attendent, et tous trois sont muets : le fichier ne dira jamais ce qui a mal tourné.",
    },
    {
      type: "ol",
      items: [
        "**Autre génération, autres offsets.** Les positions des champs glissent entre les générations Wii, 3DS et Switch. Un patch calé sur la mauvaise disposition édite les mauvais octets — et les premières victimes sont souvent les champs d'apparence que vous ne vouliez surtout pas toucher.",
        "**Le piège de la chaîne.** Les éditeurs hexadécimaux raisonnent en texte par défaut. Vous ouvrez la charge, corrigez le nom en ASCII, enregistrez — le champ du nom en UTF-16 se décale par construction, et les octets qui suivent s'écroulent avec lui.",
        "**Le piège du ré-encodage.** Après la retouche des octets, reste le QR à produire. Les générateurs pensés pour les URLs encodent à travers une couche texte et pulvérisent les charges binaires ; seul un encodeur en byte mode, à la version et au niveau justes, produit un code que la console accepte.",
      ],
    },
    {
      type: "p",
      text: "Un outil dédié existe précisément pour rendre ces trois erreurs impossibles : offsets fixes, byte mode à l'entrée et à la sortie, champ du nom écrit avec l'encodage et le bourrage corrects. C'est précisément la raison pour laquelle [notre débloqueur](/fr/mii-qr-unlocker) est une page et non une note de documentation.",
    },
    { type: "h2", text: "Les questions que l'on se pose sur les QR de Mii" },
    { type: "h3", text: "Débloquer un QR de Mii, est-ce légal et sûr ?" },
    {
      type: "p",
      text: "Côté sécurité, la mécanique joue pour vous : le déblocage ne réécrit que les octets de permissions et laisse intact le bloc d'apparence — le code modifié se scanne donc soit comme le même Mii avec de nouveaux droits, soit pas du tout ; pas de troisième voie silencieuse. Côté légalité, le format est documenté par la communauté, l'outil travaille sur des données Mii que vous possédez déjà, et la suite obéit aux mêmes règles que toute activité de fan — respectez le créateur d'origine, ne vous appropriez pas le personnage d'autrui. La position de Nintendo face aux données Mii modifiées est la même que face au reste du système de fichiers de la console : territoire sans support officiel, à chacun d'en peser le pour et le contre.",
    },
    { type: "h3", text: "Est-ce que ça marche pour les Miis de Miitopia et de Smash ?" },
    {
      type: "p",
      text: "Oui. Miitopia et Super Smash Bros. Ultimate consomment les mêmes données Mii au format FFL que Tomodachi Life et le Mii Maker de la 3DS : un QR produit pour un jeu se scanne dans les autres, sur les consoles qui acceptent l'entrée par QR. Le format est la langue commune ; les jeux ne sont que des publics différents.",
    },
    { type: "h3", text: "Ma console ne scanne pas le code débloqué, pourquoi ?" },
    {
      type: "p",
      text: "Neuf fois sur dix, c'est de l'optique, pas des données. Mettez la luminosité de l'écran au maximum, tenez la console à la distance où le QR remplit le cadre sans devenir flou, nettoyez l'objectif et évitez les reflets du plafonnier. Si le code résiste encore, régénérez-le : une capture d'écran d'un QR peut introduire des artefacts de compression qui cassent le décodage. La bonne habitude, c'est de garder l'image rendue d'origine.",
    },
    { type: "h3", text: "Le Mii débloqué aura-t-il une autre tête en jeu ?" },
    {
      type: "p",
      text: "Non. Le bloc d'apparence passe octet par octet : visage, coiffure, couleurs, taille et réglages de voix arrivent exactement comme le créateur les a réglés. Les changements visibles sont ceux que vous demandez, comme un nouveau nom. Si le Mii paraît différent après le scan, c'est l'image du QR qui a souffert en route : régénérez et re-scannez avant de soupçonner les données.",
    },
    { type: "h3", text: "Peut-on modifier un Mii directement sur la Switch ?" },
    {
      type: "p",
      text: "Un Mii reçu, non. Le Mii Maker de la Switch modifie ceux nés sur la console ; tout Mii arrivé de l'extérieur — par clé d'accès ou par scan — reste verrouillé pour protéger son auteur, exactement comme sur 3DS. Le chemin vers une copie modifiable repasse toujours par le format : débloquez le QR d'origine pour qu'il soit reconnu comme local et modifiable, puis faites-le entrer sur la Switch par les moyens que permet votre installation.",
    },
    { type: "h3", text: "Et le nouveau système de Mii de la Switch 2 ?" },
    {
      type: "p",
      text: "La Switch 2 poursuit l'approche par clés d'accès pour Miitopia, et les données Mii sous-jacentes restent de la lignée FFL. Le QR comme support physique d'échange appartient aux consoles à caméra — 3DS et Wii U —, et c'est précisément pourquoi comprendre le format garde toute sa valeur : les données que transportaient ces codes sont les mêmes que celles que consomment vos jeux Switch aujourd'hui.",
    },
    { type: "h3", text: "Peut-on restaurer les permissions d'origine ?" },
    {
      type: "p",
      text: "Gardez l'image du QR d'origine : le déblocage n'écrase jamais votre fichier source ; il produit un nouveau code aux drapeaux ouverts. Si un jour vous voulez rétablir les restrictions, l'image d'origine les porte toujours et se scannera avec les réglages du créateur. Ce qui n'est pas possible, c'est reverrouiller un Mii qui vit déjà sur une console : le droit de modification concédé à votre console par un scan débloqué reste attaché à ce Mii pour de bon. Cette asymétrie mérite d'être connue avant de débloquer un Mii emprunté à un ami.",
    },
    { type: "h2", text: "Essayez vous-même" },
    {
      type: "p",
      text: "Le plus rapide pour rendre le format concret, c'est de nourrir l'outil avec un de vos propres Miis et de regarder les champs surgir :",
    },
    {
      type: "ul",
      items: [
        "[Débloqueur QR Mii](/fr/mii-qr-unlocker) — déposez un code, voyez le nom et les drapeaux décodés, et générez un code modifiable.",
        "[Créateur Mii](/fr/tomodachi-life-mii-creator) — construisez un Mii à partir de zéro avec un rendu FFL en direct et exportez-le.",
        "[Yeux Mii](/fr/mii-eyes) — un éditeur concentré sur les formes d'yeux qui font l'expression d'un Mii.",
        "[Labo Vocal](/fr/tomodachi-voice-lab) — entendez comment Tomodachi Life change une personnalité en voix de synthèse.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch et Miitopia sont des marques déposées de Nintendo. Ce guide décrit un format documenté par la communauté, à des fins de sauvegarde et d'édition personnelles, et n'est ni affilié à Nintendo ni approuvé par elle. Les détails du format FFL suivent la documentation publique de 3dbrew.",
    },
  ],
};
