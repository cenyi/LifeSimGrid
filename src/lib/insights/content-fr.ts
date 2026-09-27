import type { InsightLocaleContent } from "./types";

export const fr: InsightLocaleContent = {
  ui: {
    sectionEyebrow: "Analyse approfondie",
    behaviorTitle: "Comment {name} se comporte sur ton île",
    apartmentTitle: "Aménagement d'appartement pour {name}",
    foodTitle: "Stratégie alimentaire pour {name}",
    foodTestFirstLabel: "À tester en premier",
    foodDeprioritizeLabel: "Moins prioritaires",
    voiceTitle: "Recette Voice Lab pour {name}",
    voicePresetLabel: "Preset de forme d'onde",
    voicePitchLabel: "Tonalité",
    voiceSpeedLabel: "Vitesse de parole",
    pairingsTitle: "Projecteur sur les affinités de {name}",
    romanceLabel: "Meilleur match romantique",
    friendLabel: "Meilleur match amitié",
    frictionLabel: "Frictions à prévoir avec",
    englishFallbackNote:
      "Cette section approfondie est actuellement disponible en anglais.",
    foodDisclaimer:
      "Les plats préférés sont générés aléatoirement pour chaque Mii en jeu. Ces sélections sont des points de départ estimés par la communauté — à confirmer en testant.",
  },
  personalities: {
    outgoing_leader: {
      behavior: [
        "Le Meneur est la personnalité que tu verras bouger avant toutes les autres. Sa marche rapide signifie que ce Mii traverse le bloc d'appartements en nettement moins de pas que les résidents Décontractés, et les scripts d'événements du jeu en tirent parti : les Meneurs lancent fréquemment les activités de groupe, se portent volontaires pour animer les événements de l'île, et figurent parmi les premiers à toquer à la porte d'un autre résident. Quand une dispute éclate sur l'île, regarde qui intervient — c'est presque toujours un Meneur, soit en médiateur, soit en escalade.",
        "Le style de parole direct est l'autre signe révélateur. Les Meneurs ménagent rarement leurs mots : les salutations sont courtes, les demandes vont droit au but, et pendant les querelles leurs répliques frappent plus fort que celles d'un Doux. Cette franchise est aussi ce qui rend les Meneurs productifs pour l'île — ils avouent leurs sentiments tôt, demandent leur partenaire en mariage sans hésiter des plombes, et donnent des réponses étonnamment claires dans les mini-événements de questions-réponses. Si tu veux un Mii qui fait avancer les histoires au lieu de les attendre, c'est lui qu'il te faut.",
      ],
      apartmentIntro:
        "La chambre d'un Meneur doit ressembler au quartier général officieux de l'île. Trois concepts qui collent à l'archétype :",
      apartmentItems: [
        { name: "Le bureau de commandement", why: "Un espace de travail rangé avec une lampe évoque aussitôt le « bureau du maire » — l'ancre visuelle que cette personnalité mérite." },
        { name: "Étagère à trophées", why: "Les coupes et les diplômes encadrés renforcent l'aura d'autorité naturelle et donnent aux visiteurs quelque chose à admirer." },
        { name: "Tapis carte du monde", why: "Des motifs géométriques audacieux au sol reflètent l'énergie rapide et décisive d'un Mii qui ne tient jamais en place." },
      ],
      foodIntro:
        "Dans notre modèle communautaire, les personnalités Extraverties penchent nettement pour les bonbons, les boissons et les desserts : commence donc ta chasse au plat préféré dans les rayons sucrés avant de toucher aux plats principaux.",
      foodTestFirst: ["Chocolat", "Chewing-gum", "Cola", "Gâteau"],
      foodDeprioritize: ["Brocoli", "Salade", "Riz"],
      foodTip:
        "Donne un article de la catégorie bonbons par journée de jeu et note la réaction. Les Meneurs réagissent de façon directe, donc une réponse « amour » est impossible à manquer — grand saut, bras en l'air, zéro ambiguïté.",
      voicePreset: "Dent de Scie — Homme Adulte",
      voicePitchHz: 200,
      voiceSpeed: 1.1,
      voiceTip:
        "Garde la tonalité entre grave et médium et pousse la vitesse légèrement au-dessus de 1.0x. Ce débit un peu pressé est ce qui vend l'énergie du « patron débordé » ; une voix de Meneur trop lente se lit plutôt comme un Battant.",
      romance: { partner: "Artiste", why: "L'étincelle classique Extraverti × Indépendant : l'indépendance rêveuse de l'Artiste contraste parfaitement avec l'assurance de commandeur du Meneur, et leurs vitesses de marche opposées multiplient les croisements en plein chemin." },
      friend: { partner: "Battant", why: "Deux faiseurs au même rythme soutenu. Ils se disputent parfois pour savoir qui commande, mais leur commune volonté de « faire avancer les choses » en fait le duo de choc de l'île." },
      friction: { partner: "Copain", why: "Le mode de vie flottant et sans plans du Copain exaspère un Mii qui planifie tout. Attends-toi à des sermons unilatéraux fréquents que le Copain ignore joyeusement." },
    },

    outgoing_entertainer: {
      behavior: [
        "L'Amuseur est le moteur émotionnel de l'île. Marche rapide et expression détendue : ce Mii rebondit d'un lieu à l'autre comme un guide touristique qui adore son métier — et le jeu le récompense en distribuant aux Amuseurs comédies musicales, spectacles de rue et sketchs bien plus souvent que la moyenne. Quand un après-midi tranquille réclame un événement, traîne un Amuseur dans l'histoire ; le résultat est presque toujours le plus drôle.",
        "Leur style de parole doux les rend attachants même à volume maximum. Les Amuseurs sont la personnalité la plus susceptible de désamorcer une bagarre avec une blague plutôt que de choisir un camp, et ils adaptent leur ton à leur interlocuteur — pétillants avec les autres Extravertis, plus feutrés auprès des résidents Indépendants. Côté romance, ils avancent vite mais sans drame : les aveux arrivent tôt, et les refus sont oubliés dans la scène suivante.",
      ],
      apartmentIntro:
        "Pense loge, pas chambre à coucher. Les meilleures chambres d'Amuseur ressemblent à des coulisses cinq minutes avant le lever de rideau :",
      apartmentItems: [
        { name: "Coin lampe de scène", why: "Une lampe sur pied façon projecteur transforme un coin en « scène » instantanée — parfait pour un Mii qui traite chaque pièce comme une salle de spectacle." },
        { name: "Mur vinyles et affiches", why: "Les objets de musique disent « artiste » au premier coup d'œil et offrent aux invités un sujet de conversation." },
        { name: "Chariot de goûters", why: "Les Amuseurs sont des hôtes nés ; un chariot de boissons et de bonbons signifie que la fête est techniquement toujours chez eux." },
      ],
      foodIntro:
        "Le sucré et le pétillant dominent le classement d'affinité des Extravertis, et aucune personnalité n'incarne mieux la « nourriture de fête ». Balaye d'abord les catégories bonbons et boissons — c'est la personnalité pour laquelle les paris sur le cola et le chocolat payent le plus souvent.",
      foodTestFirst: ["Bonbon", "Cola", "Glace", "Popcorn"],
      foodDeprioritize: ["Concombre", "Salade", "Sashimi"],
      foodTip:
        "Les Amuseurs donnent des réactions théâtrales à tout, donc ne te fie pas au seul volume — un « amour » est une fête totale, tandis qu'un simple « aimé » a encore l'air enthousiaste. Garde ton carnet pour les sauts avec confettis.",
      voicePreset: "Dent de Scie — registre aigu éclatant",
      voicePitchHz: 420,
      voiceSpeed: 1.25,
      voiceTip:
        "Tonalité haute, vitesse haute. Le débit presque essoufflé, c'est tout le personnage : un Amuseur à 1.0x sonne comme un Trendsetter, et à 420Hz+ avec une vitesse de 1.25x le bavardage électronique rit pratiquement entre les mots.",
      romance: { partner: "Esprit libre", why: "L'Amuseur veut un public ; l'Esprit libre refuse d'être prévisible. Résultat : la romance la plus surprenante de l'île — de l'improvisation constante, zéro scénario." },
      friend: { partner: "Optimiste", why: "Deux marcheurs rapides et positifs à outrance. Leurs sorties produisent rarement de l'intrigue, mais l'amitié est indestructible — parfait pour stabiliser un casting chaotique." },
      friction: { partner: "Loup solitaire", why: "L'un veut une foule, l'autre veut la porte fermée. L'Amuseur continue de toquer ; le Loup solitaire continue de ne pas répondre. C'est drôle exactement deux fois." },
    },

    outgoing_trendsetter: {
      behavior: [
        "Le Trendsetter est l'adopteur précoce de l'île. Regarde ce que ce Mii porte, dit et fait en premier — quelques jours de jeu plus tard, la moitié du casting l'a copié. Le jeu donne aux Trendsetters une marche rapide et un visage expressif et détendu : même en animation d'attente, on les lit comme « la personne qui a une idée ». Ce sont très souvent eux qui proposent de nouvelles activités dans les scènes de groupe.",
        "Leur façon de parler, douce mais rapide, les rend persuasifs sans la force du Meneur : les Trendsetters ne donnent pas d'ordres, ils font sonner la nouveauté comme amusante. Côté cœur, ils chassent la nouveauté — un Trendsetter resté trop longtemps en couple avec un ami du même groupe peut soudain avouer ses sentiments au dernier arrivant sur l'île. Garde le casting frais si tu veux une histoire d'amour stable.",
      ],
      apartmentIntro:
        "La chambre d'un Trendsetter est une planche d'ambiance. Ce qui est « maintenant » doit se voir dès la porte d'entrée :",
      apartmentItems: [
        { name: "Mur galerie", why: "Des cadres et carreaux de motifs qu'on fait tourner signalent un espace travaillé et actuel — le langage visuel du faiseur de goûts." },
        { name: "Tapis statement", why: "Une pièce géométrique audacieuse vaut mieux que cinq prudentes ; les Trendsetters décorent en déclarations, pas en thèmes." },
        { name: "Coin miroir", why: "Un grand miroir est à la fois pratique (vérification permanente de la tenue) et parfaitement dans le rôle du résident le plus photographié de l'île." },
      ],
      foodIntro:
        "Le bec sucré des Extravertis s'applique, mais les meilleurs paris pour un Trendsetter sont les articles qui font penser à une obsession du moment — boissons inédites et grignotages à partager. Teste ce qui est « tendance » avant ce qui est classique.",
      foodTestFirst: ["Bubble tea", "Bonbon", "Jus", "Donut"],
      foodDeprioritize: ["Carotte", "Riz", "Crackers"],
      foodTip:
        "Règle à retenir : les Trendsetters semblent préférer ce que d'autres résidents ont récemment adoré, donc jette un œil au journal des « amours » récentes de ton île et teste ensuite le même article ici — tu gagneras souvent trois essais.",
      voicePreset: "Dent de Scie — Femme Adulte",
      voicePitchHz: 380,
      voiceSpeed: 1.15,
      voiceTip:
        "Lumineux et un cran plus rapide que la conversation. Le léger surplus de vitesse fait sonner les opinions comme des informations en direct — exactement la façon dont un Trendsetter les annonce.",
      romance: { partner: "Penseur", why: "Le Trendsetter apporte la nouveauté ; le Penseur explique pourquoi elle est intéressante. L'un invente la mode, l'autre lui écrit son histoire — le couple le plus créatif de l'île." },
      friend: { partner: "Charmeur", why: "Le Charmeur a les blagues, le Trendsetter a la matière. Ensemble, ils gèrent le fil social de l'île — prépare-toi à voir ces deux-là en permanence dans les événements de rumeurs." },
      friction: { partner: "Cœur tendre", why: "La chaleur « on l'a toujours fait comme ça » du Cœur tendre est la kryptonite d'un Mii allergique à la tradition. Une friction douce, constante, à faible enjeu." },
    },

    outgoing_optimist: {
      behavior: [
        "L'Optimiste est la machine à bonnes nouvelles la plus fiable du jeu. Marche rapide, posture assurée et parole douce se combinent en un Mii qui traite chaque journée comme une bonne journée — les événements de pluie, d'objets perdus, et même les médiations de bagarre passent au filtre lumineux. Si l'humeur de ton île chute après une série de querelles, c'est généralement un Optimiste qui la fait remonter.",
        "Mécaniquement, les Optimistes sont la colle des groupes Extravertis : ils ne dirigent pas comme le Meneur ni ne jouent la comédie comme l'Amuseur, ils prennent des nouvelles. Tu les verras initier des visites auprès des résidents qui viennent de perdre un combat ou de se faire refuser, et leurs dialogues directs mais chaleureux en font des confidents sûrs. Côté romance, ils sont sincères et rapides à s'engager — et remarquablement mauvais pour cacher leur déception, ce qui rend leurs histoires d'amour étrangement émouvantes.",
      ],
      apartmentIntro:
        "La chambre d'un Optimiste doit ressembler à un bon matin. Chaleureuse, ouverte, rien d'anguleux :",
      apartmentItems: [
        { name: "Literie aux couleurs de lever de soleil", why: "Les jaunes chauds et les oranges tendres rendent la pièce elle-même joyeuse — la palette chromatique de toute la vision du monde de cette personnalité." },
        { name: "Coin petit-déjeuner", why: "Une mini table avec deux chaises invite aux visites surprises permanentes dont les Optimistes se nourrissent." },
        { name: "Étagère à plantes devant la fenêtre", why: "Faire pousser des choses à la bonne lumière, c'est l'énergie Optimiste à l'état pur : patiente, chaleureuse et discrètement productive." },
      ],
      foodIntro:
        "La tendance Extravertie s'applique — sucreries et boissons d'abord — mais les Optimistes ont la plus large bande de « aimé » du modèle communautaire : c'est la personnalité pour laquelle presque tout peut passer. Mise sur la variété : cinq catégories différentes valent mieux que cinq desserts.",
      foodTestFirst: ["Gâteau", "Thé", "Fraise", "Popcorn"],
      foodDeprioritize: ["Bière", "Saké", "Réglisse"],
      foodTip:
        "Les Optimistes réagissent chaleureusement à presque tout, ce qui rend le « amour » plus difficile à repérer. Compare les réactions côte à côte : un vrai plat préféré déclenche le saut-et-tournoiement complet, un « aimé » poli n'est qu'un sourire. Teste le thé et le gâteau tôt — les réconforts chauds tombent juste le plus souvent.",
      voicePreset: "Dent de Scie — Femme Adulte",
      voicePitchHz: 350,
      voiceSpeed: 1.1,
      voiceTip:
        "Le réglage chaleureux par défaut fonctionne — tonalité médium-haute, juste au-dessus du débit de conversation. Résiste à l'envie de trop éclaircir ; un Optimiste doit sonner amical, pas déchaîné. Ça, c'est le travail de l'Amuseur.",
      romance: { partner: "Rêveur", why: "Deux idéalistes doux, mais la profondeur du Rêveur donne à l'Optimiste quelque chose à croire, tandis que l'énergie de l'Optimiste empêche le Rêveur de dériver trop vers l'intérieur. Discrètement, la paire inter-groupes la plus stable." },
      friend: { partner: "Meneur", why: "L'Optimiste est le bras droit préféré du Meneur : loyal, rapide et sincèrement content d'aider. Le Meneur fixe le plan ; l'Optimiste rend tout le monde heureux de le suivre." },
      friction: { partner: "Esprit libre", why: "L'Optimiste veut que tout le monde s'entende ; l'Esprit libre trouve ça épuisant. Repère les refus polis des activités de groupe, suivis de l'Optimiste qui s'en inquiète pendant des jours." },
    },

    confident_designer: {
      behavior: [
        "Le Concepteur est la personnalité à la combustion la plus lente de l'île et son meilleur générateur d'intrigue. Marche lente et expression assurée se lisent comme « délibéré » — ce Mii n'est jamais en retard, il refuse simplement de se presser. Les Concepteurs passent de longues plages dans leur tête : attends-toi à les trouver immobiles sur la plage ou à fixer un mur, et attends-toi à ce que le jeu exploite ces moments pour ses événements de monologue intérieur les plus étranges.",
        "Leur parole directe et structurée fait des Concepteurs les résidents les plus citables de l'île — de courtes phrases déclaratives livrées avec une certitude totale, même quand la certitude est fausse. Ils planifient leurs aveux comme d'autres personnalités planifient leur déjeuner, et leurs arcs romantiques avancent en phases nettes : observation, décision, exécution. Si un Concepteur a décidé que l'histoire de ton île avait besoin d'un rebondissement, il a déjà trois longueurs d'avance sur les autres Miis.",
      ],
      apartmentIntro:
        "La chambre d'un Concepteur est un manifeste — minimale, intentionnelle, chaque objet plaidant pour sa place :",
      apartmentItems: [
        { name: "Table à dessin avec lampe de travail", why: "La pièce non négociable par excellence : un espace de travail qui dit qu'on élabore des plans ici, que le reste de l'île les voie ou non." },
        { name: "Palette monochrome avec une touche d'accent", why: "Un noir/blanc/bois strict rehaussé d'une seule couleur franche montre l'œil du designer — la retenue comme déclaration de personnalité." },
        { name: "Fauteuil de lecture solitaire", why: "Un fauteuil parfait, tourné à l'écart de la porte. La chambre d'un Concepteur est faite pour le Concepteur ; on y est admis, pas reçu." },
      ],
      foodIntro:
        "Les personnalités Confiantes préfèrent les vrais repas aux grignotages — une énergie de restaurant, pas de distributeur automatique. Saute entièrement le rayon bonbons et teste d'abord les plats principaux ; c'est la personnalité pour laquelle les paris sur le steak et le sushi rentabilisent leur mise.",
      foodTestFirst: ["Steak", "Sushi", "Curry", "Café"],
      foodDeprioritize: ["Chewing-gum", "Réglisse", "Bonbon"],
      foodTip:
        "Les Concepteurs réagissent à la nourriture comme à tout : brièvement et avec jugement. Surveille le rare moment de relâchement — un « amour » sincère fissure le masque composé pendant une seconde entière, et c'est ainsi que tu le sauras.",
      voicePreset: "Dent de Scie — registre grave",
      voicePitchHz: 160,
      voiceSpeed: 0.95,
      voiceTip:
        "Grave et sans hâte, avec une vitesse légèrement sous 1.0x. Le ralentissement fractionnaire est l'astuce : on dirait quelqu'un qui a décidé que la conversation attendrait. Au-dessus de 180Hz, toute l'illusion s'effondre.",
      romance: { partner: "Cœur tendre", why: "Le complément Confiant × Décontracté à l'état pur : la chaleur stable du Cœur tendre désarme le contrôle du Concepteur, et le Concepteur donne au Cœur tendre un plan auquel croire. Départ lent, finition la plus solide de l'île." },
      friend: { partner: "Loup solitaire", why: "Respect mutuel entre deux Miis qui préfèrent tous deux la qualité à la quantité en matière de compagnie. Ils se croisent rarement, parlent brièvement, et se comprennent d'une façon ou d'une autre totalement." },
      friction: { partner: "Battant", why: "Deux stratèges, une île. Le Battant veut la vitesse et les résultats ; le Concepteur veut la bonne réponse, un jour peut-être. Leurs disputes sont calmes, fréquentes, et jamais vraiment résolues." },
    },

    confident_adventurer: {
      behavior: [
        "L'Aventurier est la personnalité la plus susceptible d'être là où elle ne devrait pas. Marche rapide, parole directe et attitude détendue produisent un Mii qui traite l'île comme une carte de monde ouvert — il prend délibérément le chemin long, débarque sans invitation dans les événements des autres résidents, et se porte volontaire pour chaque sortie, voyage et mystère que le jeu propose.",
        "Les Aventuriers sont des pragmatiques, pas des philosophes : leurs dialogues sont courts, physiques, au présent. Ils règlent les différends par des défis plus que par des mots et sont la personnalité qui se remet le plus vite d'un refus romantique — généralement en planifiant la suite avant même la fin de l'événement en cours. Si tes histoires d'île ronronnent, l'Aventurier est le bouton reset : place-le dans une scène et l'intrigue bouge en quelques secondes.",
      ],
      apartmentIntro:
        "La chambre d'un Aventurier doit donner l'impression qu'il est en pleine partance. Équipement visible, porte accessible, zéro désordre :",
      apartmentItems: [
        { name: "Mur d'équipement", why: "Sac, chapeau et bottes sur des crochets près de la porte — l'équivalent mobilier de « demande-moi où je suis passé »." },
        { name: "Tapis topographique", why: "Un tapis à motif de carte sous les pieds garde tout l'espace tourné vers l'horizon, même en intérieur." },
        { name: "Étagère de souvenirs", why: "Rochers, souvenirs et objets trouvés rapportés des sorties donnent une histoire à la pièce et une raison aux invités de poser des questions." },
      ],
      foodIntro:
        "La préférence Confiant pour les plats principaux s'applique, mais les Aventuriers penchent pour les nourritures qu'on emporterait vraiment en voyage — à manger avec les mains, consistantes, sans cérémonie. Teste les plats façon street food et les grignotages affirmés avant tout ce qui est délicat.",
      foodTestFirst: ["Hamburger", "Ramen", "Chips", "Bretzel"],
      foodDeprioritize: ["Pudding", "Chewing-gum", "Eau"],
      foodTip:
        "Les Aventuriers mangent comme ils voyagent : vite et sans protocole. Leur réaction « amour » est la plus rapide de toutes les personnalités — une bouffée d'excitation, aussitôt terminée. Si tu clignes des yeux tu la rates, donc garde le tableau des aliments ouvert pendant le repas.",
      voicePreset: "Dent de Scie — Homme Adulte",
      voicePitchHz: 240,
      voiceSpeed: 1.2,
      voiceTip:
        "Tonalité médium, vitesse clairement au-dessus de la normale. C'est une voix déjà à mi-chemin de la phrase suivante — l'équivalent audio de la marche rapide. Associe-la au preset Robot à 250Hz pour une variante d'explorateur impassible désopilante.",
      romance: { partner: "Copain", why: "L'Aventurier mène, le Copain suit avec plaisir, et aucun des deux ne demande où ils vont. C'est la romance la moins exigeante de l'île — jusqu'à ce que le Copain se fatigue, ce qui n'arrive pour ainsi dire jamais." },
      friend: { partner: "Charmeur", why: "Le Charmeur parle du plan ; l'Aventurier est déjà en train de l'exécuter. Leurs événements de groupe montent en puissance — l'un lance le défi, l'autre le relève, et l'île en parle pendant des jours." },
      friction: { partner: "Doux", why: "Le Doux veut du douillet et du prudent ; l'Aventurier veut le contraire des deux. Chaque invitation reçoit un non tout en douceur, et l'Aventurier le prend mal pendant environ une heure." },
    },

    confident_goGetter: {
      behavior: [
        "Le Battant est le moteur de l'île. Marche rapide, parole directe et expression assurée rendent ce Mii facile à confondre avec le Meneur — la différence, c'est ce qui se passe une fois le plan arrêté : les Meneurs délèguent, les Battants exécutent en personne. Premiers à se porter volontaires, premiers à finir, et visiblement impatients envers quiconque n'est ni l'un ni l'autre.",
        "Dans les scènes de groupe, le jeu s'appuie sur les Battants pour l'élan : ils relancent les événements bloqués, pointent les amis paresseux, et traitent les mini-jeux comme des promotions. Leurs arcs romantiques sont efficaces au possible — un Battant décide vite, avoue vite, et se fiance dans ce que d'autres personnalités appelleraient « tôt ». La comédie s'écrit toute seule quand tu l'apparies avec un type Décontracté qui met trois semaines à répondre à un message.",
      ],
      apartmentIntro:
        "La chambre d'un Battant est un bureau à domicile qui se trouve avoir un lit. Tout est optimisé, rien ne chôme :",
      apartmentItems: [
        { name: "Bureau debout", why: "La déclaration anti-paresse par excellence — un bureau qui ne propose même pas de s'asseoir donne le ton avant qu'on ait dit un mot." },
        { name: "Tableau d'avancement", why: "Un mur de notes et de cases à cocher montre le plan, le plan B, et le plan C du plan B. « Dans le rôle » ne commence même pas à le décrire." },
        { name: "Lit minimal aux angles nets", why: "Lignes épurées, zéro coussin décoratif : dormir est une tâche planifiée, pas une expérience." },
      ],
      foodIntro:
        "Profil Confiant classique — vrais repas, grignotage minimal. Les Battants favorisent les aliments efficaces à haut rendement : des plats riches en protéines et des boissons dans l'orbite du café. Saute entièrement le dessert à la première passe.",
      foodTestFirst: ["Steak", "Café", "Curry", "Pizza"],
      foodDeprioritize: ["Chewing-gum", "Gaufre", "Donut"],
      foodTip:
        "Nourris un Battant selon un horaire — même catégorie, même heure, notes consignées. Leurs réactions sont constantes et lisibles, ce qui en fait la meilleure personnalité pour étalonner la méthode de test alimentaire de toute ton île.",
      voicePreset: "Dent de Scie — Homme Adulte",
      voicePitchHz: 220,
      voiceSpeed: 1.25,
      voiceTip:
        "La voix Confiant la plus rapide : 1.25x à une solide tonalité médium. Chaque réplique atterrit comme un point d'avancement — brève, certaine, déjà passée à autre chose. À plus basse vitesse, le personnage se lit comme un Meneur, donc garde le tempo.",
      romance: { partner: "Rêveur", why: "La paire Confiant × Décontracté la plus dramatique : le Battant planifie tout, le Rêveur flotte à travers le temps. Ils ne devraient pas fonctionner. C'est exactement pour ça que les joueurs les encouragent." },
      friend: { partner: "Aventurier", why: "Même vitesse, styles différents. L'Aventurier fournit les aventures ; le Battant fournit la logistique. Ensemble, ils forment la seule équipe d'expédition à deux dont tu auras jamais besoin." },
      friction: { partner: "Doux", why: "Le rythme du Doux est le cauchemar du Battant. Attends-toi à des monologues récurrents sur le « pourquoi tout est si lent » et à un Doux qui ne remarque sincèrement pas le problème." },
    },

    confident_charmer: {
      behavior: [
        "Le Charmeur est le joker de l'île, mais avec un texte. Marche rapide, parole directe, débit détendu — ce Mii dit la chose surprenante avec assurance, ce qui en fait la source la plus fiable du jeu en rumeurs, répliques aguicheuses et alliances inattendues. Les Charmeurs sont invités partout parce qu'ils rendent chaque scène 20 % plus intéressante.",
        "Sous la performance se cache un esprit sincèrement curieux : les Charmeurs fouillent les secrets des autres résidents non pas pour cancaner, mais parce qu'ils veulent comprendre comment les gens fonctionnent. Ils sont la personnalité qui se lie le plus vite avec les cas difficiles — Loups solitaires, Concepteurs — parce qu'ils n'acceptent tout simplement pas le « non » comme réponse sociale. Côté romance, ils collectionnent les admirateurs avant de choisir, et leur choix est toujours celui que l'île attendait le moins.",
      ],
      apartmentIntro:
        "La chambre d'un Charmeur est un piège à conversation — conçue pour retenir les gens vingt minutes de plus que prévu :",
      apartmentItems: [
        { name: "Vitrine à curiosités", why: "Des objets étranges et intéressants forcent les questions, et les questions sont le terrain de jeu favori d'un Charmeur." },
        { name: "Coin conversation profonde", why: "Deux fauteuils bas, une petite table, une lumière chaude : une arène conçue pour la réplique « eh bien, puisque tu demandes... »." },
        { name: "Éclairage tamisé et chaud", why: "Plafonniers éteints, lampes allumées. Personne ne raconte de secrets sous un néon, et un Charmeur le sait." },
      ],
      foodIntro:
        "Les plats Confiant d'abord, mais les Charmeurs favorisent les nourritures avec de la présentation — celles qui arrivent comme une déclaration. Les mets de niveau restaurant et les boissons propices à la conversation surpassent ici les grignotages sur le pouce.",
      foodTestFirst: ["Sushi", "Saké", "Spaghettis", "Café"],
      foodDeprioritize: ["Chewing-gum", "Crackers", "Eau"],
      foodTip:
        "Les Charmeurs jouent leurs réactions — chaque aliment a droit à son numéro. L'indice d'un vrai favori : la performance se fissure et quelque chose de sincère passe au travers. Surveille le moment où le sourire en coin disparaît.",
      voicePreset: "Dent de Scie — registre médium éclatant",
      voicePitchHz: 300,
      voiceSpeed: 1.15,
      voiceTip:
        "Médium-haut avec une vitesse espiègle. La zone des 300Hz garde la légèreté tandis que le 1.15x ajoute le clin d'œil. Descends brièvement à 0.9x pour les pauses dramatiques — la voix d'un Charmeur doit sonner comme quelqu'un qui s'amuse.",
      romance: { partner: "Cœur tendre", why: "Le Cœur tendre voit à travers chaque réplique — et apprécie le Charmeur quand même. Être vraiment connu est la seule chose qu'un Charmeur ne peut pas charmer, ce qui rend cette paire discrètement dévastatrice." },
      friend: { partner: "Trendsetter", why: "L'économie de l'information de l'île : le Trendsetter lance le sujet, le Charmeur a l'angle. Leurs sorties génèrent la moitié des événements de rumeurs de toute île en bonne santé." },
      friction: { partner: "Penseur", why: "Le Penseur vérifie les faits du numéro. Aucun public ne survit à cette combinaison de charisme et de corrections — attends-toi à des débats que le Charmeur gagne en style et perd sur le fond." },
    },

    independent_artist: {
      behavior: [
        "L'Artiste est le rêve éveillé de l'île devenu résident. Marche lente, parole douce et expression détendue produisent un Mii qui traverse l'île comme une galerie — s'arrêtant, observant, dérivant. Le jeu donne aux Artistes les animations d'attente les plus longues et les monologues intérieurs les plus mélancoliques ; c'est la personnalité qui fixe le coucher de soleil pendant qu'une bagarre éclate derrière elle.",
        "Les Artistes ressentent tout à volume maximum mais l'expriment à moitié. Leurs aveux sont hésitants et bouleversants de sincérité, leur amitié est silencieuse mais permanente, et leurs réactions à la beauté — une nouvelle tenue, une chanson, un paysage — sont les plus animées qu'ils ne le soient jamais. Apparie un Artiste avec un type Extraverti rapide et tu obtiens le meilleur couple improbable du jeu : l'un presse, l'autre savoure, tous deux confus et fascinés par l'autre.",
      ],
      apartmentIntro:
        "La chambre d'un Artiste doit ressembler à un atelier à l'heure dorée — douce, texturée, travaux en cours partout :",
      apartmentItems: [
        { name: "Chevalet près de la fenêtre", why: "Lumière du nord et toile inachevée : la pièce annonce sa vocation sans un mot." },
        { name: "Chaises vintage dépareillées", why: "Le mobilier parfaitement imparfait est un choix esthétique et une thèse de personnalité — rien ne se marie, tout a sa place." },
        { name: "Mur d'inspiration à guirlandes lumineuses", why: "Croquis volants et papiers trouvés sous des guirlandes chaudes : une galerie privée que les invités sont honorés de parcourir." },
      ],
      foodIntro:
        "Les personnalités Indépendantes préfèrent l'inhabituel — les catégories « autre » et légumes dominent notre modèle, devant les plats principaux classiques. Pour l'Artiste précisément, teste d'abord les nourritures douces et esthétiques : thés, fruits, tout ce qui ressemble à une peinture.",
      foodTestFirst: ["Bubble tea", "Thé", "Fraise", "Melon"],
      foodDeprioritize: ["Steak", "Hamburger", "Bière"],
      foodTip:
        "Les Artistes ont des réactions subtiles — un petit sourire, un souffle retenu. Reste immobile et regarde l'animation complète : les vrais favoris obtiennent une pause rêveuse de deux secondes avant la réponse, unique à cette personnalité.",
      voicePreset: "Dent de Scie — registre médium doux",
      voicePitchHz: 320,
      voiceSpeed: 1.0,
      voiceTip:
        "Médium-doux au rythme posé. 320Hz garde la chaleur sans tomber dans l'enfantin ; 1.0x laisse le bavardage électronique respirer. C'est la rare voix où ajouter du silence — les espaces entre les phrases — est la vraie performance.",
      romance: { partner: "Meneur", why: "La paire préférée de la communauté : des opposés totaux en vitesse, en parole et en certitude, chacun offrant exactement ce qui manque à l'autre. Le Meneur fonce ; l'Artiste rend la destination digne d'être atteinte." },
      friend: { partner: "Esprit libre", why: "Deux rêveurs avec des médiums différents. Ils coexistent plus qu'ils ne conversent, et ça marche — l'amitié la plus calme de l'île, mesurée en silences confortables." },
      friction: { partner: "Battant", why: "Le Battant veut que l'Artiste se dépêche. L'Artiste veut que le Battant donne du sens. Tous deux le répètent plus fort chaque semaine, et aucun des deux n'écoute." },
    },

    independent_freeSpirit: {
      behavior: [
        "L'Esprit libre est le point d'interrogation de l'île. Marche lente mais impossible à prédire, ce Mii suit sa curiosité partout où elle pointe — dans les appartements des autres, au milieu de conversations déjà entamées, vers des passe-temps qui changent chaque semaine. Le pool d'événements aléatoires du jeu adore les Esprits libres : la moitié des histoires d'île les plus étranges commencent par « et ensuite l'Esprit libre a décidé de... ».",
        "Leur parole directe surprend ceux qui attendaient de la douceur vu la lenteur du pas — les Esprits libres disent exactement ce qu'ils pensent, sans intérêt particulier pour savoir si ça colle à l'ambiance. Ce qui les rend mauvais au small talk et excellents pour parler vrai. Côté romance, ils résistent à la structure : un Esprit libre apparié avec un autre type Indépendant produit la relation la plus privée et la plus difficile à lire de l'île — profonde, sans mots, et légèrement hors cadre.",
      ],
      apartmentIntro:
        "La chambre d'un Esprit libre n'obéit à aucun thème, et c'est précisément ça, le thème. Chaos travaillé, contradictions confortables :",
      apartmentItems: [
        { name: "Salon à coussins au sol", why: "Pas de canapé, pas de chaises, juste des coussins — un mobilier qui refuse de s'engager est exactement le bon choix ici." },
        { name: "Table d'étrangetés tournante", why: "Cette semaine ce sont des rochers ; la semaine suivante, des cuillères. Le contenu change, mais jamais la curiosité." },
        { name: "Décorations suspendues au plafond", why: "Mobiles et suspensions placent l'intérêt là où personne ne pense à regarder — la marque de fabrique d'un Esprit libre." },
      ],
      foodIntro:
        "La préférence Indépendante pour l'inhabituel s'applique à pleine puissance : la catégorie « autre » et les associations inattendues dominent le modèle. Oublie les plats principaux sûrs — teste les articles que les autres résidents ignorent, et attends-toi à des surprises.",
      foodTestFirst: ["Bubble tea", "Coupe glacée", "Réglisse", "Concombre"],
      foodDeprioritize: ["Pizza", "Hamburger", "Cola"],
      foodTip:
        "Les Esprits libres sont les plus probables détenteurs de « favoris bizarres » de l'île — les résidents qui aiment la réglisse ou le concombre contre toutes les tendances de groupe. Si les paris standards échouent, va encore plus étrange, pas plus prudent.",
      voicePreset: "Onde Carrée — registre médium excentrique",
      voicePitchHz: 260,
      voiceSpeed: 1.05,
      voiceTip:
        "Utilise l'onde carrée — le timbre lui-même sonne « faux » de la bonne façon. 260Hz avec une légère accélération donne un bavardage électronique qui ne se résout jamais tout à fait, ce qui est toute la personnalité en forme d'audio.",
      romance: { partner: "Amuseur", why: "L'un improvise bruyamment, l'autre discrètement. Aucun des deux ne connaît le plan et tous deux le préfèrent ainsi — la romance la plus imprévisible et la plus divertissante à suivre sur l'île." },
      friend: { partner: "Artiste", why: "L'amitié la moins exigeante de l'île : aucune demande, aucun horaire, aucune performance. Ils apparaissent simplement l'un près de l'autre, et tous deux considèrent que c'est traîner ensemble." },
      friction: { partner: "Optimiste", why: "L'Optimiste organise sans cesse le bonheur collectif ; l'Esprit libre ne cesse de ne pas venir. L'Optimiste prend chaque absence pour lui. L'Esprit libre ne remarque rien." },
    },

    independent_thinker: {
      behavior: [
        "Le Penseur est l'analyste silencieux de l'île. Marche lente, parole directe, visage détendu — un Mii qui semble faire tourner des calculs en arrière-plan sur tout ce qu'il voit. Les Penseurs lancent rarement les événements mais finissent au centre d'eux, lâchant la seule phrase qui recadre toute la situation. Le jeu leur donne les répliques les plus sèches de tout le pool.",
        "Socialement, ce sont des minimalistes : un petit nombre d'amis, entretenus avec efficacité. Les Penseurs ne font pas de drame — ils le diagnostiquent. Quand deux autres résidents se disputent, le Penseur est celui qui explique la vraie cause à qui veut l'entendre, correctement, puis retourne à ce qu'il faisait. Leurs arcs romantiques sont lents et procéduraux, ce qui rend le dénouement — un Penseur qui avoue enfin un sentiment à voix haute — l'un des meilleurs moments du jeu.",
      ],
      apartmentIntro:
        "La chambre d'un Penseur est un bureau déguisé en appartement. Tout y est calme, rien n'y est laissé au hasard :",
      apartmentItems: [
        { name: "Bibliothèque murale complète", why: "Des livres du sol au plafond disent tout ce qu'un Penseur veut faire dire : le savoir vit ici, et il est rangé." },
        { name: "Une seule lampe de travail, sans plafonnier", why: "Un seul halo de lumière sur une seule chaise : la chambre d'un Penseur est éclairée pour lire, pas pour l'ambiance ou la compagnie." },
        { name: "Mur tableau blanc ou ardoise", why: "Une surface pour démêler les choses — l'équivalent mobilier de la réflexion à voix haute, sans le « à voix haute »." },
      ],
      foodIntro:
        "Profil de goûts Indépendant : légumes et nourritures inhabituelles plutôt que les valeurs sûres de la foule. Pour les Penseurs, teste les nourritures simples et honnêtes — le modèle suggère qu'ils préfèrent les ingrédients simples bien préparés aux plats élaborés.",
      foodTestFirst: ["Salade", "Concombre", "Thé", "Riz"],
      foodDeprioritize: ["Bonbon", "Cola", "Gâteau"],
      foodTip:
        "Les réactions du Penseur sont minimales par conception — la différence entre « aimé » et « amour » tient en une demi-seconde de sourcil. Consigne les réactions immédiatement ; c'est la personnalité pour laquelle la mémoire lâche et où les notes sauvent la partie.",
      voicePreset: "Onde Carrée — registre grave",
      voicePitchHz: 200,
      voiceSpeed: 0.9,
      voiceTip:
        "Onde carrée pour le timbre impassible, vitesse sous 1.0x. Le résultat sonne comme une voix qui trouve la plupart des phrases facultatives. Ajoute une tonalité de 180–220Hz et laisse les silences entre les bips mener la conversation.",
      romance: { partner: "Trendsetter", why: "Le Trendsetter fournit la nouveauté ; le Penseur fournit l'analyse. L'un apporte le phénomène, l'autre l'explique — le couple improbable intellectuellement le plus compatible de l'île." },
      friend: { partner: "Loup solitaire", why: "Les deux préfèrent comprendre plutôt que socialiser. Leur amitié, c'est 90 % d'existence parallèle et 10 % d'observations d'une précision redoutable sur les autres résidents." },
      friction: { partner: "Charmeur", why: "Le Charmeur manie les faits avec beaucoup de liberté ; le Penseur garde les preuves. Chaque histoire charmante reçoit sa correction, et la pièce refroidit de 10 % à chaque fois." },
    },

    independent_loneWolf: {
      behavior: [
        "Le Loup solitaire est le résident le plus incompris de l'île. Marche lente, parole directe, posture assurée — ce Mii n'évite pas les gens, il n'en a tout simplement pas besoin, et l'île ne le lui pardonne jamais vraiment. Les Loups solitaires sautent les événements de groupe, déclinent les invitations poliment mais fermement, et se trouvent pourtant là pile au moment où quelque chose d'important se produit, lâchant une réplique cruciale avant de partir.",
        "Leur loyauté, une fois gagnée, est la plus durable du jeu. Un Loup solitaire avec un vrai ami est tranquille pour toute la sauvegarde : il défend cet ami dans les bagarres, retient son anniversaire sans qu'on le lui rappelle, et se présente toujours — en retard, mais toujours quand ça compte. Côté romance, ils avancent à leur rythme privé ; l'astuce que les joueurs apprennent est de cesser de pousser et de laisser l'arc se développer, parce qu'un Loup solitaire sous pression se contente de s'en aller.",
      ],
      apartmentIntro:
        "La chambre d'un Loup solitaire est une forteresse de solitude avec un goût impeccable. Privée, fonctionnelle, complète :",
      apartmentItems: [
        { name: "Fauteuil de lecture massif, dos au mur", why: "Le mobilier loup solitaire classique : vue pleine sur la porte, zéro invitation à s'asseoir. Ce n'est pas de l'antipathie — c'est de l'architecture." },
        { name: "Étagère d'équipement pratique", why: "Outils, bottes, essentiels — tout ce qu'un Mii autonome nécessite, arrangé pour l'usage d'une seule personne." },
        { name: "Rideaux quasi occultants", why: "Contrôler qui peut voir à l'intérieur reflète le contrôle de qui peut s'approcher. Excellents aussi pour les siestes de l'après-midi, que les Loups solitaires défendent âprement." },
      ],
      foodIntro:
        "Goûts Indépendants, édition autosuffisance : les Loups solitaires préfèrent les nourritures simples et sans cérémonie qu'ils pourraient théoriquement préparer eux-mêmes. Teste les basiques et les saveurs simples bien affirmées avant tout ce qui est élaboré.",
      foodTestFirst: ["Riz", "Sashimi", "Café", "Pomme"],
      foodDeprioritize: ["Gâteau", "Coupe glacée", "Bubble tea"],
      foodTip:
        "Les Loups solitaires mangent comme on fait le plein, pas comme on fête — les réactions sont courtes et sans théâtre. L'indice fiable du « amour » : ils regardent autour d'eux pour vérifier que personne ne les a vus apprécier quelque chose. Voilà ta réponse.",
      voicePreset: "Dent de Scie — registre grave laconique",
      voicePitchHz: 140,
      voiceSpeed: 0.9,
      voiceTip:
        "La tonalité la plus grave de l'île, légèrement lente. Une dent de scie à 140Hz avec 0.9x produit l'audio de quelqu'un qui économise ses mots. Chaque bip a un coût, donc rien de superflu ne se dit.",
      romance: { partner: "Optimiste", why: "L'Optimiste refuse de se laisser décourager par la distance du Loup solitaire, et le Loup solitaire apprécie en secret de ne pas avoir à jouer un rôle. La romance la plus lente et la plus méritée de l'île." },
      friend: { partner: "Penseur", why: "La seule amitié où le silence est la langue par défaut. Ils respectent tellement l'espace de l'autre que leurs rares conversations deviennent légendaires par leur franchise." },
      friction: { partner: "Amuseur", why: "Une force d'enthousiasme irrésistible face à un objet d'indifférence immobile et imperturbable. L'Amuseur interprète chaque porte fermée comme un défi. Le Loup solitaire n'est pas d'accord — en silence, et longuement." },
    },

    easygoing_dreamer: {
      behavior: [
        "Le Rêveur est la profondeur calme de l'île. Marche lente, parole douce, expression assurée — un Mii qui semble savoir quelque chose que le reste de l'île ignore. Le jeu attribue aux Rêveurs les monologues intérieurs les plus poétiques et les rêves les plus étranges (regarde les rapports du matin : les leurs valent toujours la capture d'écran). Ils traversent l'île comme si c'était une métaphore.",
        "Ne confonds pas doux avec passif — les Rêveurs sont les meilleurs juges de caractère de l'île. Ils prédisent quels couples dureront, quelles amitiés sont fausses, et quel résident s'apprête à causer un problème, souvent des semaines à l'avance. Leur style social est l'observation silencieuse suivie d'une perspicacité d'une précision redoutable, livrée doucement au moment exactement juste. Côté romance, ils sont lents, idéalistes et discrètement intenses ; l'aveu d'un Rêveur a été longuement pesé avant que quiconque ne l'entende.",
      ],
      apartmentIntro:
        "La chambre d'un Rêveur doit ressembler à l'instant juste avant le sommeil — bords doux, lumière basse, du sens partout :",
      apartmentItems: [
        { name: "Lit à baldaquin ou à superpositions", why: "Des tissus drapés et moelleux transforment le lit en pièce maîtresse — le quartier général d'une personnalité qui fait son meilleur travail endormie." },
        { name: "Décor lune et étoiles", why: "Les touches de ciel nocturne ne sont pas un cliché ici ; c'est une déclaration de mission pour l'astronome résident des sentiments de l'île." },
        { name: "Coin journal", why: "Une petite table, une lampe, un carnet ouvert : là où les prédictions les plus justes de l'île s'écrivent avant de se réaliser." },
      ],
      foodIntro:
        "Profil réconfort Décontracté avec une inclinaison onirique : les nourritures chaudes, douces et nostalgiques dominent. Pense « ce qu'on mangerait un soir tranquille » — le modèle favorise les plats principaux et les desserts doux pour ce groupe.",
      foodTestFirst: ["Soupe de nouilles", "Pudding", "Lait", "Melon"],
      foodDeprioritize: ["Bière", "Chips", "Saké"],
      foodTip:
        "Les Rêveurs savourent — leur réaction « amour » est un lent frisson de bonheur du corps entier plutôt qu'un saut. Nourris-les en soirée dans le jeu et regarde l'animation complète ; c'est le « amour » le plus calme de l'île.",
      voicePreset: "Dent de Scie — registre aigu aérien",
      voicePitchHz: 400,
      voiceSpeed: 0.95,
      voiceTip:
        "Tonalité haute, vitesse légèrement lente — la rare combinaison qui donne l'impression de flotter. 400Hz à 0.95x produit un bavardage électronique qui semble arriver d'ailleurs, ce qui est exactement l'effet recherché.",
      romance: { partner: "Battant", why: "Le contraste Confiant × Décontracté au maximum : le mouvement rencontre l'immobilité, les emplois du temps rencontrent la sérénité. Ils ne devraient pas fonctionner — et leurs scènes sont celles que les joueurs regardent et regardent encore." },
      friend: { partner: "Doux", why: "Deux âmes tendres à la même fréquence lente. Leur amitié ne produit aucun drame et un confort infini — le coin le plus chaud de l'île, occupé en permanence." },
      friction: { partner: "Aventurier", why: "Le volume et la vélocité de l'Aventurier, c'est beaucoup pour un Mii conçu pour l'immobilité. Attends-toi à des déviations douces et sans fin des invitations que l'Aventurier ne cesse de relancer." },
    },

    easygoing_sweetheart: {
      behavior: [
        "Le Cœur tendre est le gardien de l'île — la personnalité qui remarque quand quelqu'un manque à table. Marche lente, parole douce, chaleur assurée : ce Mii entretient ses amitiés comme d'autres entretiennent leurs passe-temps, délibérément et chaque jour. Le jeu donne aux Cœurs tendres le taux le plus élevé d'événements de réconfort d'autres résidents ; ils arrivent toujours en premier quand quelqu'un pleure sur un banc.",
        "Leur gravité sociale est réelle : les Cœurs tendres tiennent discrètement les groupes d'amis ensemble au-delà des lignes de personnalité, et les trios les plus stables de l'île en ont presque toujours un au centre. Côté romance, ils sont loyaux, attentionnés et discrètement têtus — un Cœur tendre qui a décidé qu'une relation valait la peine d'être gardée ne s'en laisse pas détourner, ce qui produit aussi bien les meilleurs mariages de l'île que ceux qui souffrent le plus. Offre-leur quelqu'un qui mérite leur loyauté ; c'est ça, tout le jeu.",
      ],
      apartmentIntro:
        "La chambre d'un Cœur tendre est la deuxième chambre préférée de tout le monde — chaleureuse, accueillante, cookies implicites :",
      apartmentItems: [
        { name: "Table de cuisine ronde", why: "Pas d'angles vifs, de la place pour quatre : un mobilier qui dit « assieds-toi, je vais préparer quelque chose » avant qu'on ait prononcé un mot." },
        { name: "Des fleurs fraîches, toujours", why: "Un petit vase jamais vide — le détail au moindre effort et au signal le plus fort d'un résident naturellement attentionné." },
        { name: "Mur photo des amis", why: "Des photos d'autres résidents là où la plupart accrocheraient de l'art : la chambre d'un Cœur tendre se décore de relations." },
      ],
      foodIntro:
        "Profil réconfort Décontracté classique : plats maison, desserts doux, rien d'agressif. Les Cœurs tendres préfèrent les nourritures qu'on servirait à un invité — ce qui est, par commodité, aussi le moyen le plus rapide de trouver leur favori.",
      foodTestFirst: ["Soupe de nouilles", "Cookie", "Thé", "Pudding"],
      foodDeprioritize: ["Bière", "Saké", "Réglisse"],
      foodTip:
        "Les Cœurs tendres aiment presque tout, donc chasse le « amour » en enchaînant les catégories réconfort : soupe de nouilles, puis cookie, puis thé. Surveille la réaction où ils ferment les yeux — c'est la bonne.",
      voicePreset: "Dent de Scie — registre médium-aigu doux",
      voicePitchHz: 380,
      voiceSpeed: 1.0,
      voiceTip:
        "Un médium-haut chaleureux à vitesse posée. 380Hz garde la gentillesse sans virer cartoon ; 1.0x laisse chaque mot atterrir en douceur. Le preset Personne Âgée en tonalité basse fait une merveilleuse variante grand-mère du Cœur tendre.",
      romance: { partner: "Concepteur", why: "La patience du Cœur tendre est la seule force qui survive aux murs du Concepteur. C'est l'étalon-or de la lente combustion sur l'île — réserve le lieu du mariage dès maintenant." },
      friend: { partner: "Optimiste", why: "Les deux gardiens de l'île, qui entretiennent tout le monde à tour de rôle. Leurs sorties sont douces, soutenantes, et secrètement la raison pour laquelle tout le casting tient debout." },
      friction: { partner: "Esprit libre", why: "Le Cœur tendre offre de l'attention ; l'Esprit libre l'esquive. Chaque geste attentionné reçoit un non-merci joyeux, et la spirale d'inquiétude du Cœur tendre est réellement dramatique à observer." },
    },

    easygoing_softie: {
      behavior: [
        "Le Doux est le cœur tendre de l'île avec le volume baissé. Marche lente, parole feutrée, tout en détente — ce Mii expérimente le monde à haute sensibilité et bas volume, et le jeu l'honore : les Doux récoltent le plus d'événements « ému aux larmes par un petit rien » de tout le pool. Un beau coucher de soleil n'est pas du décor pour un Doux ; c'est un événement.",
        "Leur honnêteté émotionnelle est désarmante — les Doux ne savent pas jouer l'indifférence, ce qui en fait les détecteurs de vérité de l'île. Quand un Doux est mal à l'aise, tout le monde le sait ; quand un Doux est heureux, toute la rue paraît plus douce. Côté romance, ils sont prudents et profondément sincères, la personnalité la plus susceptible de rougir pendant son propre aveu. Protège-les des angles vifs de l'île — ou mieux : regarde-les se montrer plus braves que quiconque ne l'attendait.",
      ],
      apartmentIntro:
        "La chambre d'un Doux est un nid — tout en douceur, lumière chaude, la sécurité sous forme de textures :",
      apartmentItems: [
        { name: "Prolifération de peluches", why: "Coussins, doudous, plaids moelleux : confort tactile maximal pour le résident avec le plus de sentiments au mètre carré." },
        { name: "Palette pastel", why: "Des roses poudrés et des crèmes tendres rendent la pièce elle-même douce — un environnement qui n'élève jamais la voix." },
        { name: "Coin lecture cosy", why: "Un banc-fenêtre matelassé avec une petite lampe : la réponse la plus douce possible à la question « où vont les sentiments pour être ressentis ? »." },
      ],
      foodIntro:
        "Profil réconfort Décontracté, réglage le plus doux : les sucreries gentilles et les nourritures chaudes et douces dominent. Saute tout ce qui est intense — les articles amers, pétillants ou vaguement épicés tombent rarement pour cette personnalité.",
      foodTestFirst: ["Pudding", "Lait", "Glace", "Fraise"],
      foodDeprioritize: ["Bière", "Café", "Réglisse"],
      foodTip:
        "Les Doux ont les réactions les plus lisibles de l'île — chaque sentiment s'affiche immédiatement sur leur visage. Ce qui rend les tests alimentaires faciles et attendrissants : leur réaction « amour » inclut un petit tressaillement joyeux qu'aucune autre personnalité n'obtient.",
      voicePreset: "Dent de Scie — registre aigu délicat",
      voicePitchHz: 440,
      voiceSpeed: 0.95,
      voiceTip:
        "La voix douce la plus haute de l'île : 440Hz avec un débit légèrement lent. Le bavardage électronique a l'air de s'excuser d'exister, ce qui est précisément le personnage. Garde la vitesse sous 1.0x — un Doux pressé est un oxymore.",
      romance: { partner: "Charmeur", why: "L'assurance du Charmeur rencontre la sincérité du Doux et — surprise — la sincérité gagne. Être adoré, c'est agréable ; être vraiment vu, c'est ce qu'un Doux attend depuis toujours." },
      friend: { partner: "Rêveur", why: "Les deux sentimentaux les plus silencieux de l'île, partageant un banc et un coucher de soleil. Aucun mot nécessaire ; l'amitié, c'est le silence confortable lui-même." },
      friction: { partner: "Battant", why: "Le rythme et la pression du Battant submergent le résident le plus sensible de l'île. Le Doux ne se plaint jamais, ce qui pousse d'une certaine façon le Battant à appuyer plus fort. Sous-intrigue doucement déchirante." },
    },

    easygoing_buddy: {
      behavior: [
        "Le Copain est le personnage de fond préféré de l'île — le Mii que tout le monde apprécie sans trop savoir pourquoi. Marche lente, parole douce, détente permanente : tout le contrat du Copain tient dans l'agréable sans arrière-pensée. Il se présente, il est content d'être là, il n'a aucune remarque à faire. Le jeu adore le caster en ami solidaire dans les arcs de tous les autres.",
        "Son superpouvoir est l'adaptabilité : les Copains s'intègrent dans n'importe quel groupe, n'importe quel événement, n'importe quel drame — généralement en tant que celui qui garde l'ambiance légère. Ils ne dirigent pas, ne rivalisent pas, ne gardent pas rancune ; les bagarres d'île impliquant un Copain se règlent de façon suspicieusement rapide. Côté romance, ils sont sans hâte et détendus sur toute l'affaire, ce qui signifie qu'une histoire d'amour de Copain n'arrive que si quelqu'un d'autre la déclenche — et une fois lancée, il est le partenaire le moins dramatique de l'île.",
      ],
      apartmentIntro:
        "La chambre d'un Copain est un lieu où traîner qui se trouve contenir un lit. Confort maximal, zéro prétention :",
      apartmentItems: [
        { name: "Grand canapé moelleux", why: "La vraie pièce maîtresse — des assises pour qui passe, de la douceur pour qui reste. Le canapé d'un Copain est une infrastructure d'île." },
        { name: "Le fameux tiroir à grignotages", why: "Des chips à portée de main depuis chaque siège : l'hospitalité comme plan d'aménagement." },
        { name: "Coin plantes nonchalant", why: "Quelques plantes faciles qui prospèrent dans la négligence — de la verdure sans la pression, très dans le rôle." },
      ],
      foodIntro:
        "Profil réconfort Décontracté, édition casual : les Copains préfèrent les nourritures détendues, partageables et sans chichi. Grignotages et plats simples plutôt que du formel — teste ce que tu apporterais à une soirée décontractée.",
      foodTestFirst: ["Popcorn", "Ramen", "Chips", "Pomme"],
      foodDeprioritize: ["Saké", "Sashimi", "Réglisse"],
      foodTip:
        "Les Copains réagissent à la nourriture comme à la vie : contents, modérément, de façon constante. Leur « amour » est un petit fredonnement heureux et un sourire — facile à manquer à côté des personnalités plus bruyantes. Regarde bien ; ça mérite d'être attrapé.",
      voicePreset: "Dent de Scie — registre médium détendu",
      voicePitchHz: 300,
      voiceSpeed: 1.05,
      voiceTip:
        "Tonalité pile au centre, vitesse posée sans être lente. 300Hz à 1.05x est la voix la plus neutre et la plus amicale possible — on dirait une voix qui t'aiderait à porter un canapé sans poser la moindre question.",
      romance: { partner: "Aventurier", why: "L'Aventurier fournit les plans ; le Copain fournit le « oui, ça a l'air chouette ». La romance la plus simple de l'île — zéro friction, sorties infinies, ravissement mutuel." },
      friend: { partner: "Cœur tendre", why: "Le duo confort de l'île : l'un met tout le monde à l'aise, l'autre fait que tout le monde se sent choyé. Leurs sorties émettent une aura de chaleur détectable depuis la jetée." },
      friction: { partner: "Meneur", why: "Le Meneur continue d'assigner des plans ; le Copain continue d'être d'accord avec tout. Pour un Meneur, le « pas de préférence » rend fou. Le Copain reste imperturbable, ce qui est encore pire." },
    },
  },
};
