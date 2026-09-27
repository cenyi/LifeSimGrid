/**
 * LifeSimGrid — Deep-Dive Insights: Spanish (es)
 *
 * Mirrors content-en.ts exactly in structure: same ui keys, same 16
 * personality keys, same array lengths and identical numeric voice
 * values. Personality display names match the official localized
 * labels in src/locales/es.json (TomodachiLifeMbtiPage.personality*).
 */

import type { InsightLocaleContent } from "./types";

export const es: InsightLocaleContent = {
  ui: {
    sectionEyebrow: "Análisis profundo",
    behaviorTitle: "Cómo actúa {name} en tu isla",
    apartmentTitle: "Decoración del apartamento de {name}",
    foodTitle: "Estrategia de alimentación para {name}",
    foodTestFirstLabel: "Prueba primero estos",
    foodDeprioritizeLabel: "Menos prioridad",
    voiceTitle: "Receta del Laboratorio de Voz para {name}",
    voicePresetLabel: "Preset de forma de onda",
    voicePitchLabel: "Tono",
    voiceSpeedLabel: "Velocidad del habla",
    pairingsTitle: "Dinámicas destacadas de {name}",
    romanceLabel: "Mejor pareja romántica",
    friendLabel: "Mejor amistad",
    frictionLabel: "Espera rozamientos con",
    englishFallbackNote:
      "Esta sección en profundidad está disponible actualmente en inglés.",
    foodDisclaimer:
      "Las comidas favoritas se asignan al azar a cada Mii dentro del juego. Estas sugerencias son puntos de partida estimados por la comunidad: confírmalos haciendo pruebas.",
  },
  personalities: {
    outgoing_leader: {
      behavior: [
        "El Líder es la personalidad que verás moverse antes que ninguna otra. Su velocidad de caminar rápida hace que este Mii cruce el bloque de apartamentos en notablemente menos pasos que los residentes Afables, y los guiones de eventos del juego lo aprovechan: los Líderes inician con frecuencia actividades en grupo, se ofrecen como maestros de ceremonias de los eventos de la isla y están entre los primeros en llamar a la puerta de otro residente. Cuando estalla una pelea en la isla, fíjate en quién interviene: casi siempre es un Líder, ya sea mediando o avivando el conflicto.",
        "Su estilo de habla directa es la otra señal. Los Líderes rara vez andan con rodeos: los saludos son cortos, las peticiones van al grano y, durante las discusiones, sus frases pegan más fuerte que las de un Sensible. Esa franqueza también convierte a los Líderes en ciudadanos productivos de la isla: confiesan sus sentimientos pronto, proponen matrimonio sin dudar eternamente y dan respuestas inusualmente claras en los minieventos de preguntas. Si quieres un Mii que impulse las historias en lugar de esperarlas, esta es tu personalidad.",
      ],
      apartmentIntro:
        "La habitación de un Líder debería parecer el cuartel general oficioso de la isla. Tres conceptos que encajan con el arquetipo:",
      apartmentItems: [
        { name: "El escritorio de mando", why: "Una zona de trabajo ordenada con una lámpara se lee como 'oficina del alcalde': el ancla visual que esta personalidad merece." },
        { name: "Estantería de premios", why: "Los trofeos y los diplomas enmarcados refuerzan la vibra de autoridad natural y le dan a las visitas algo que admirar." },
        { name: "Alfombra de mapa mundial", why: "Los patrones de suelo atrevidos y geométricos reflejan la energía rápida y decidida de un Mii que nunca se queda quieto." },
      ],
      foodIntro:
        "Las personalidades Extrovertidas se inclinan fuertemente hacia los caramelos, las bebidas y los postres en nuestro modelo comunitario, así que empieza tu búsqueda de la comida favorita por los pasillos dulces antes de tocar los platos principales.",
      foodTestFirst: ["chocolate", "chicle", "refresco de cola", "pastel"],
      foodDeprioritize: ["brócoli", "ensalada", "arroz"],
      foodTip:
        "Dale una comida de la categoría de dulces por día de juego y registra la reacción. Los Líderes tienen reacciones directas, así que una respuesta de 'amor' es inconfundible: gran salto, brazos en alto, sin ambigüedad.",
      voicePreset: "Diente de sierra — Hombre Adulto",
      voicePitchHz: 200,
      voiceSpeed: 1.1,
      voiceTip:
        "Mantén el tono medio-grave y sube la velocidad ligeramente por encima de 1.0x. Esa entrega algo apurada es lo que vende la energía de 'jefe ocupado'; una voz de Líder lenta suena a Emprendedor en su lugar.",
      romance: { partner: "Artista", why: "La chispa clásica Extrovertido × Independiente: la independencia soñadora del Artista juega perfectamente contra la certeza de mando del Líder, y sus velocidades de caminar opuestas crean momentos constantes de 'cruce de caminos'." },
      friend: { partner: "Emprendedor", why: "Dos personas de acción con el mismo ritmo rápido. Ocasionalmente discuten por quién manda, pero la actitud compartida de 'hay que hacer las cosas' los convierte en el dúo de poder de la isla." },
      friction: { partner: "Compañero", why: "El estilo de vida a la deriva y sin planes del Compañero frustra a un Mii que lo planifica todo. Espera frecuentes regaños en solitario que el Compañero ignora con toda la alegría." },
    },

    outgoing_entertainer: {
      behavior: [
        "El Animador es el motor del ánimo de la isla. Su velocidad de caminar rápida junto a una expresión relajada hace que este Mii rebote entre locaciones como un guía turístico que ama su trabajo — y el juego lo premia: elige a los Animadores para musicales, actuaciones callejeras y sketches de comedia con una frecuencia desproporcionada. Cuando una tarde tranquila necesita un evento, arrastra a un Animador a la escena; el resultado casi siempre es el gracioso.",
        "Su estilo de habla suave los mantiene simpáticos incluso al volumen máximo. Los Animadores son la personalidad con más probabilidades de desactivar una pelea con un chiste en vez de ponerse de un lado, y adaptan su tono a quien tengan delante: burbujeante con otros tipos Extrovertidos, más suave con los residentes Independientes. En lo romántico van rápido pero con poco drama: las confesiones llegan pronto y los rechazos se les pasan en cuestión de una escena.",
      ],
      apartmentIntro:
        "Piensa en un camerino, no en un dormitorio. Las mejores habitaciones de Animador se sienten como los bastidores cinco minutos antes del espectáculo:",
      apartmentItems: [
        { name: "Rincón con lámpara de escenario", why: "Una lámpara de pie estilo foco convierte cualquier esquina en un 'escenario' instantáneo: perfecta para un Mii que trata cada habitación como un local de actuación." },
        { name: "Pared de vinilos y pósters", why: "Los objetos de música comunican 'artista' de un vistazo y le dan a las visitas un tema de conversación." },
        { name: "Carrito de aperitivos", why: "Los Animadores son anfitriones natos; un carrito de bebidas y dulces significa que la fiesta, técnicamente, siempre es en su habitación." },
      ],
      foodIntro:
        "Lo dulce y lo burbujeante encabeza la tabla de afinidad Extrovertida, y ninguna personalidad encaja mejor con la 'comida de fiesta'. Recorre primero las categorías de dulces y bebidas: esta es la personalidad en la que las apuestas por el refresco de cola y el chocolate pagan con más frecuencia.",
      foodTestFirst: ["caramelo", "refresco de cola", "helado", "palomitas de maíz"],
      foodDeprioritize: ["pepino", "ensalada", "sashimi"],
      foodTip:
        "Los Animadores reaccionan de forma teatral a todo, así que no te fíes solo del volumen: un 'amor' es una celebración completa, mientras que un simple 'me gusta' también parece entusiasta. Reserva tu cuaderno para los saltos con confeti.",
      voicePreset: "Diente de sierra — registro agudo y brillante",
      voicePitchHz: 420,
      voiceSpeed: 1.25,
      voiceTip:
        "Tono alto, velocidad alta. La entrega casi sin aliento es todo el personaje: un Animador a 1.0x suena como un Innovador, y a 420Hz+ con velocidad 1.25x el habla a bips prácticamente se ríe entre palabra y palabra.",
      romance: { partner: "Espíritu libre", why: "El Animador quiere un público; el Espíritu libre se niega a ser predecible. El resultado es el romance más sorprendente de la isla: improvisación constante, cero guiones." },
      friend: { partner: "Optimista", why: "Dos caminantes rápidos implacablemente positivos. Sus quedadas rara vez generan trama, pero la amistad en sí es indestructible: ideal para estabilizar un elenco caótico." },
      friction: { partner: "Lobo solitario", why: "Uno quiere multitud, el otro quiere la puerta cerrada. El Animador sigue llamando; el Lobo solitario sigue sin contestar. Es gracioso exactamente dos veces." },
    },

    outgoing_trendsetter: {
      behavior: [
        "El Innovador es el primero en adoptar las novedades de la isla. Observa qué lleva puesto, qué dice y qué hace este Mii primero — en pocos días de juego, la mitad del elenco lo copia. El juego da a los Innovadores velocidad de caminar rápida y una cara relajada y expresiva, así que se perciben como 'persona con una idea' incluso en las animaciones de reposo. Son ellos, de forma desproporcionada, los que proponen nuevas actividades en las escenas de grupo.",
        "Su patrón de habla suave pero veloz los hace persuasivos sin la contundencia del Líder: los Innovadores no dan órdenes a la gente, hacen que lo nuevo suene divertido. En lo romántico persiguen la novedad — un Innovador que lleva demasiado tiempo emparejado con un amigo del mismo grupo puede confesarse de repente al residente más recién llegado de la isla. Mantén el elenco fresco si quieres una historia de amor estable con un Innovador.",
      ],
      apartmentIntro:
        "La habitación de un Innovador es una tabla de inspiración. Lo que está 'de moda ahora' debería verse desde la puerta:",
      apartmentItems: [
        { name: "Pared de galería", why: "Arte enmarcado o azulejos estampados que van rotando señalan un espacio curado y al día: el lenguaje visual de un creador de tendencias." },
        { name: "Alfombra protagonista", why: "Una pieza geométrica atrevida vale más que cinco discretas; los Innovadores decoran con declaraciones de intenciones, no con temáticas." },
        { name: "Rincón de espejo", why: "Un espejo de cuerpo entero es práctico (comprobaciones constantes del atuendo) y muy coherente con la marca del residente más fotografiado de la isla." },
      ],
      foodIntro:
        "El diente dulce Extrovertido aplica, pero las mejores apuestas de un Innovador son los artículos que se sienten como una obsesión del momento: bebidas novedosas y aperitivos para compartir. Prueba lo que está 'de moda' antes de probar lo clásico.",
      foodTestFirst: ["té de burbujas", "caramelo", "zumo", "donut"],
      foodDeprioritize: ["zanahoria", "arroz", "galletas saladas"],
      foodTip:
        "Sigue la regla no escrita: los Innovadores parecen favorecer lo que otros residentes amaron recientemente, así que echa un vistazo al registro de 'amores' recientes de tu isla y prueba el mismo artículo a continuación — a menudo te saltarás tres intentos.",
      voicePreset: "Diente de sierra — Mujer Adulta",
      voicePitchHz: 380,
      voiceSpeed: 1.15,
      voiceTip:
        "Brillante y un punto más rápido que la conversación normal. Ese ligero filo en la velocidad hace que las opiniones suenen a última hora: exactamente cómo las entrega un Innovador.",
      romance: { partner: "Pensador", why: "El Innovador trae lo nuevo; el Pensador explica por qué es interesante. Uno inventa la moda pasajera y el otro le da una historia: la pareja más creativa de la isla." },
      friend: { partner: "Encantador", why: "El Encantador tiene los chistes, el Innovador tiene el material. Juntos gestionan el feed social de la isla — espera eventos de rumores protagonizados por estos dos constantemente." },
      friction: { partner: "Cariñoso", why: "El calor del 'siempre lo hemos hecho así' del Cariñoso es kriptonita para un Mii alérgico a la tradición. Fricción suave, constante y de bajas consecuencias." },
    },

    outgoing_optimist: {
      behavior: [
        "El Optimista es la máquina de buenas noticias más fiable del juego. Velocidad de caminar rápida, postura segura y habla suave se combinan en un Mii que trata cada día como un buen día — los eventos de lluvia, los de objetos perdidos e incluso las mediaciones de peleas reciben su giro luminoso. Si el ánimo de tu isla se hunde tras una racha de riñas, un Optimista suele ser quien lo levanta de nuevo.",
        "En lo mecánico, los Optimistas son el pegamento de los grupos Extrovertidos: no lideran como el Líder ni actúan como el Animador, simplemente se preocupan por los demás. Los verás iniciar visitas a residentes que acaban de perder una pelea o sufrir un rechazo, y su diálogo directo pero cálido los convierte en confidentes seguros. En lo romántico son sinceros y rápidos para comprometerse — y notablemente malos escondiendo la decepción, lo que hace sus arcos amorosos extrañamente conmovedores.",
      ],
      apartmentIntro:
        "La habitación de un Optimista debería sentirse como una buena mañana. Cálida, abierta, sin nada cortante:",
      apartmentItems: [
        { name: "Ropa de cama en colores del amanecer", why: "Los amarillos cálidos y los naranjas suaves hacen que la habitación en sí se perciba alegre: la paleta de colores de toda la visión del mundo de esta personalidad." },
        { name: "Rincón de desayuno", why: "Una mini mesa con dos sillas invita a las visitas constantes de las que los Optimistas viven felices." },
        { name: "Estantería de plantas junto a la ventana", why: "Cultivar cosas con buena luz es la máxima energía Optimista: paciente, cálida y silenciosamente productiva." },
      ],
      foodIntro:
        "La inclinación Extrovertida aplica — primero dulces y bebidas —, pero los Optimistas tienen la banda de 'me gusta' más ancha del modelo comunitario, así que esta es la personalidad en la que casi cualquier cosa puede funcionar. Prioriza la variedad: cinco categorías distintas valen más que cinco postres.",
      foodTestFirst: ["pastel", "té", "fresa", "palomitas de maíz"],
      foodDeprioritize: ["cerveza", "sake", "regaliz"],
      foodTip:
        "Los Optimistas reaccionan con calidez a casi todo, lo que hace más difícil detectar el 'amor'. Compara reacciones lado a lado: un verdadero favorito recibe el salto con giro completo, y un 'me gusta' educado es solo una sonrisa. Prueba el té y el pastel pronto: los artículos reconfortantes y cálidos aciertan con más frecuencia.",
      voicePreset: "Diente de sierra — Mujer Adulta",
      voicePitchHz: 350,
      voiceSpeed: 1.1,
      voiceTip:
        "La configuración cálida predeterminada funciona: tono medio-agudo, apenas por encima de la velocidad conversacional. Resiste las ganas de aclararlo demasiado; un Optimista debe sonar amistoso, no maníaco. Ese es el trabajo del Animador.",
      romance: { partner: "Soñador", why: "Ambos son idealistas dulces, pero la profundidad del Soñador le da al Optimista algo en lo que creer, mientras que la energía del Optimista impide que el Soñador se pierda demasiado hacia dentro. En silencio, el emparejamiento entre grupos más estable." },
      friend: { partner: "Líder", why: "El Optimista es el subjefe favorito del Líder: leal, rápido y genuinamente encantado de ayudar. El Líder marca el plan; el Optimista hace que todos estén contentos con él." },
      friction: { partner: "Espíritu libre", why: "El Optimista quiere que todos se lleven bien; el Espíritu libre encuentra eso agotador. Atento a las negativas educadas a las actividades en grupo, seguidas del Optimista preocupándose por ello durante días." },
    },

    confident_designer: {
      behavior: [
        "El Diseñador es la personalidad de combustión más lenta de la isla y su mejor generador de trama. Velocidad de caminar lenta más una expresión segura se lee como 'deliberado': este Mii nunca llega tarde, simplemente se niega a apresurarse. Los Diseñadores pasan largos ratos en su propia cabeza: espera encontrarlos quietos en la playa o mirando fijamente una pared, y espera que el juego use esos momentos para sus eventos de monólogo interno más extraños.",
        "Su habla directa y estructurada hace de los Diseñadores los residentes más citables de la isla: frases declarativas cortas dichas con total certeza, incluso cuando la certeza es errónea. Planifican las confesiones como otras personalidades planifican la comida, y sus arcos románticos avanzan en fases claras: observación, decisión, ejecución. Si un Diseñador ha decidido que tu historia de la isla necesita un giro, ya va tres pasos por delante de los demás Miis.",
      ],
      apartmentIntro:
        "La habitación de un Diseñador es un manifiesto: minimalista, intencional, con cada objeto defendiendo su lugar:",
      apartmentItems: [
        { name: "Mesa de dibujo con lámpara de trabajo", why: "La única pieza innegociable: una zona de trabajo que dice que aquí se hacen planes, los vea o no alguien más." },
        { name: "Paleta monocromática con un acento", why: "Negro/blanco/madera estrictos con un solo color atrevido muestran el ojo de diseño: la contención como declaración de personalidad." },
        { name: "Sillón solitario de lectura", why: "Una silla perfecta, orientada hacia lejos de la puerta. La habitación de un Diseñador es para el Diseñador; a las visitas se les admite, no se les recibe." },
      ],
      foodIntro:
        "Las personalidades Seguras favorecen las comidas de verdad sobre los aperitivos — energía de plato de restaurante, no de máquina expendedora. Sáltate por completo el pasillo de los dulces y prueba primero los platos principales: esta es la personalidad en la que las apuestas por el filete y el sushi valen su precio.",
      foodTestFirst: ["filete", "sushi", "curry", "café"],
      foodDeprioritize: ["chicle", "regaliz", "caramelo"],
      foodTip:
        "Los Diseñadores reaccionan a la comida como reaccionan a todo: brevemente y con juicio. Atento al raro momento de descuido: un 'amor' genuino rompe la máscara compuesta durante un segundo entero, y así es como lo sabes.",
      voicePreset: "Diente de sierra — registro grave",
      voicePitchHz: 160,
      voiceSpeed: 0.95,
      voiceTip:
        "Grave y sin prisa, con la velocidad ligeramente por debajo de 1.0x. La desaceleración fraccionaria es el truco: suena como alguien que ha decidido que la conversación le esperará. Por encima de 180Hz toda la ilusión se derrumba.",
      romance: { partner: "Cariñoso", why: "El complemento Seguro × Afable en su forma más pura: el calor constante del Cariñoso desarma el control del Diseñador, y el Diseñador le da al Cariñoso un plan en el que creer. Inicio lento, el final más sólido de la isla." },
      friend: { partner: "Lobo solitario", why: "Respeto mutuo entre dos Miis que prefieren la calidad a la cantidad en compañía. Se ven rara vez, hablan brevemente y de algún modo se entienden por completo." },
      friction: { partner: "Emprendedor", why: "Dos estrategas, una isla. El Emprendedor quiere velocidad y resultados; el Diseñador quiere la respuesta correcta, tarde o temprano. Sus discusiones son silenciosas, frecuentes y nunca se resuelven de verdad." },
    },

    confident_adventurer: {
      behavior: [
        "El Aventurero es la personalidad con más probabilidades de estar donde no debe. Velocidad de caminar rápida, habla directa y una actitud relajada producen un Mii que trata la isla como un mapa de mundo abierto: toman el camino largo a propósito, se cuelan sin invitación en los eventos de otros residentes y se ofrecen como voluntarios para cada excursión, viaje y misterio que ofrece el juego.",
        "Los Aventureros son pragmáticos, no filósofos: su diálogo es corto, físico y en tiempo presente. Resuelven disputas con retos más que con palabras y son la personalidad que más rápido se recupera de un rechazo romántico — normalmente planificando lo siguiente antes de que termine lo actual. Si las historias de tu isla se sienten rancias, un Aventurero es el botón de reinicio: ponlo en una escena y la trama avanza en segundos.",
      ],
      apartmentIntro:
        "La habitación de un Aventurero debería parecer que está a medio partir. Equipamiento a la vista, puerta accesible, sin desorden:",
      apartmentItems: [
        { name: "Pared de equipo", why: "Mochila, sombrero y botas en ganchos junto a la puerta — el equivalente habitacional de 'pregúntame dónde he estado'." },
        { name: "Alfombra topográfica", why: "Una alfombra con estampado de mapa bajo los pies mantiene todo el espacio apuntando al horizonte, incluso bajo techo." },
        { name: "Estantería de recuerdos", why: "Piedras, recuerdos y objetos hallados en las salidas le dan a la habitación una historia y a las visitas una razón para preguntar." },
      ],
      foodIntro:
        "El sesgo hacia platos principales de los tipos Seguros aplica, pero los Aventureros favorecen las comidas que de verdad llevarías de viaje: de mano, contundentes y sin ceremonia. Prueba platos principales estilo comida callejera y aperitivos atrevidos antes que nada delicado.",
      foodTestFirst: ["hamburguesa", "ramen", "patatas fritas", "pretzel"],
      foodDeprioritize: ["flan", "chicle", "agua"],
      foodTip:
        "Los Aventureros comen como viajan: rápido y sin ceremonia. Su reacción de 'amor' es la más rápida de todas las personalidades: un golpe de emoción que termina de inmediato. Si parpadeas te la pierdes, así que mantén la tabla de comidas abierta mientras alimentas.",
      voicePreset: "Diente de sierra — Hombre Adulto",
      voicePitchHz: 240,
      voiceSpeed: 1.2,
      voiceTip:
        "Tono medio, velocidad claramente superior a lo normal. Es una voz que ya va por la mitad de la siguiente frase: el equivalente sonoro de caminar deprisa. Combínala con el preset Robot a 250Hz para una hilarante variante de explorador impasible.",
      romance: { partner: "Compañero", why: "El Aventurero lidera, el Compañero le sigue encantado y ninguno pregunta a dónde van. Es el romance que menos mantenimiento exige en la isla — hasta que el Compañero se cansa, algo que básicamente nunca ocurre." },
      friend: { partner: "Encantador", why: "El Encantador habla del plan; el Aventurero ya lo está ejecutando. Sus eventos en grupo tienden a escalarse: uno reta, el otro cumple, y la isla entera habla de ello durante días." },
      friction: { partner: "Sensible", why: "El Sensible quiere mimosidad y cuidado; el Aventurero quiere lo contrario de ambas cosas. Cada invitación recibe un no suave, y el Aventurero se lo toma como algo personal durante aproximadamente una hora." },
    },

    confident_goGetter: {
      behavior: [
        "El Emprendedor es el motor de la isla. Velocidad de caminar rápida, habla directa y una expresión segura hacen que este Mii sea fácil de confundir con el Líder — la diferencia está en lo que ocurre después de trazar el plan: los Líderes delegan, los Emprendedores ejecutan en persona. Son los primeros en ofrecerse, los primeros en terminar y visiblemente impacientes con quien no hace ninguna de las dos cosas.",
        "En las escenas de grupo, el juego se apoya en los Emprendedores para dar impulso: empujan hacia adelante los eventos estancados, señalan a los amigos perezosos y tratan los minijuegos como ascensos. Sus arcos románticos son eficientes hasta el exceso: un Emprendedor decide rápido, confiesa rápido y se compromete en lo que otras personalidades llamarían 'demasiado pronto'. La comedia se escribe sola cuando lo emparejas con un tipo Afable que tarda tres semanas en responder un mensaje.",
      ],
      apartmentIntro:
        "La habitación de un Emprendedor es una oficina en casa a la que le ocurre tener una cama. Todo optimizado, nada inactivo:",
      apartmentItems: [
        { name: "Escritorio de pie", why: "La declaración de mobiliario anti-pereza: un escritorio que ni siquiera ofrece la opción de sentarse marca el tono antes de que nadie hable." },
        { name: "Tablero de progreso", why: "Una pared de notas y casillas de verificación muestra el plan, el plan de respaldo y el respaldo del respaldo. 'Muy propio de la personalidad' se queda corto." },
        { name: "Cama minimalista, esquinas marcadas", why: "Líneas limpias, sin cojines decorativos: dormir es una tarea programada, no una experiencia." },
      ],
      foodIntro:
        "Perfil Seguro clásico: comidas de verdad, picoteo mínimo. Los Emprendedores favorecen comidas eficientes y de alto rendimiento: platos principales ricos en proteína y bebidas cercanas al café. Sáltate el postre por completo en la primera ronda.",
      foodTestFirst: ["filete", "café", "curry", "pizza"],
      foodDeprioritize: ["chicle", "gofre", "donut"],
      foodTip:
        "Alimenta a un Emprendedor con horario fijo: misma categoría, misma hora, notas registradas. Sus reacciones son consistentes y legibles, lo que los convierte en la mejor personalidad para calibrar el método de pruebas de comida de toda tu isla.",
      voicePreset: "Diente de sierra — Hombre Adulto",
      voicePitchHz: 220,
      voiceSpeed: 1.25,
      voiceTip:
        "La voz Segura más rápida: velocidad 1.25x con un tono medio sólido. Cada frase aterriza como una actualización de estado: breve, segura, ya pasando a lo siguiente. A velocidades menores el personaje se percibe como Líder, así que mantén el ritmo alto.",
      romance: { partner: "Soñador", why: "La pareja Seguro × Afable con más drama: el Emprendedor lo planifica todo, el Soñador flota en el tiempo. No deberían funcionar. Exactamente por eso los jugadores les gritan ánimos desde la grada." },
      friend: { partner: "Aventurero", why: "Misma velocidad, estilo distinto. El Aventurero aporta aventuras; el Emprendedor aporta logística. Juntos son el único equipo de expedición de dos islas que jamás necesitarás." },
      friction: { partner: "Sensible", why: "El ritmo del Sensible es la pesadilla del Emprendedor. Espera monólogos recurrentes de 'por qué todo es tan lento' y a un Sensible que genuinamente no nota el problema." },
    },

    confident_charmer: {
      behavior: [
        "El Encantador es el comodín de la isla, pero con guion. Velocidad de caminar rápida, habla directa, entrega relajada: este Mii dice lo sorprendente con confianza, lo que lo convierte en la fuente más fiable de rumores, frases coquetas y alianzas inesperadas del juego. A los Encantadores los invitan a todas partes porque hacen que cada escena sea un 20% más interesante.",
        "Bajo la actuación hay una mente genuinamente curiosa: los Encantadores hurgan en los secretos de otros residentes no por cotillear, sino porque quieren saber cómo funciona la gente. Son la personalidad que más rápido traba amistad con los difíciles — Lobos solitarios, Diseñadores — porque sencillamente no aceptan un 'no' como respuesta social. En lo romántico coleccionan admiradores antes de elegir, y su elección siempre es la que menos esperaba la isla.",
      ],
      apartmentIntro:
        "La habitación de un Encantador es una trampa de conversación: diseñada para que la gente se quede veinte minutos más de lo planeado:",
      apartmentItems: [
        { name: "Vitrina de curiosidades", why: "Los objetos extraños e interesantes obligan a preguntar, y las preguntas son el terreno de juego natural de un Encantador." },
        { name: "Rincón de conversación profunda", why: "Dos sillones bajos, una mesita, luz cálida: una arena construida para la frase 'bueno, ya que lo preguntas...'." },
        { name: "Luz cálida y tenue", why: "Luces del techo apagadas, lámparas encendidas. Nadie cuenta secretos bajo luz fluorescente, y un Encantador lo sabe." },
      ],
      foodIntro:
        "Primero los platos principales Seguros, pero los Encantadores favorecen las comidas con presentación: las que llegan como una declaración. Los platos de nivel restaurante y las bebidas propicias para conversar rinden más aquí que los aperitivos de agarrar y llevar.",
      foodTestFirst: ["sushi", "sake", "espaguetis", "café"],
      foodDeprioritize: ["chicle", "galletas saladas", "agua"],
      foodTip:
        "Los Encantadores interpretan sus reacciones: cada comida recibe su numerito. La señal de un verdadero favorito: la actuación se rompe y algo genuino se escapa. Atento al momento en que desaparece la sonrisita.",
      voicePreset: "Diente de sierra — registro medio-agudo",
      voicePitchHz: 300,
      voiceSpeed: 1.15,
      voiceTip:
        "Medio-agudo con velocidad juguetona. El rango de 300Hz lo mantiene ligero mientras 1.15x añade el guiño. Baja a 0.9x brevemente para las pausas dramáticas: la voz de un Encantador debe sonar como si se estuviera divirtiendo.",
      romance: { partner: "Cariñoso", why: "El Cariñoso ve a través de cada frase — y le cae bien el Encantador de todos modos. Que lo conozcan de verdad es lo único a lo que un Encantador no puede encantar su entrada, y eso hace de esta pareja algo silenciosamente demoledor." },
      friend: { partner: "Innovador", why: "La economía de la información de la isla: el Innovador marca el tema, el Encantador tiene la opinión. Sus quedadas generan la mitad de los eventos de rumores de cualquier isla sana." },
      friction: { partner: "Pensador", why: "El Pensador verifica los datos del chiste. Ningún público sobrevive a esa combinación de carisma y correcciones: espera debates que el Encantador gana en estilo y pierde en el marcador." },
    },

    independent_artist: {
      behavior: [
        "El Artista es el ensueño de la isla convertido en residente. Velocidad de caminar lenta, habla suave y una expresión relajada producen un Mii que recorre la isla como si fuera una galería: pausando, observando, a la deriva. El juego da a los Artistas las animaciones de reposo más largas y los monólogos internos más melancólicos; esta es la personalidad que mira el atardecer mientras estalla una pelea a sus espaldas.",
        "Los Artistas lo sienten todo al volumen máximo pero lo expresan a la mitad. Sus confesiones son titubeantes y devastadoramente sinceras, su amistad es silenciosa pero permanente, y sus reacciones ante la belleza — un atuendo nuevo, una canción, una vista — son lo más animadas que llegan a ser. Empareja a un Artista con un tipo Extrovertido rápido y obtendrás el mejor arco de pareja dispar del juego: uno apurado, uno saboreando, ambos confundidos y fascinados por el otro.",
      ],
      apartmentIntro:
        "La habitación de un Artista debería sentirse como un estudio a la hora dorada: suave, con textura, con obras en progreso por todas partes:",
      apartmentItems: [
        { name: "Caballete junto a la ventana", why: "Luz de norte y un lienzo sin terminar: la habitación anuncia su propósito sin decir palabra." },
        { name: "Sillas vintage desparejadas", why: "El mobiliario perfectamente imperfecto es una elección estética y una tesis de personalidad: nada combina, todo pertenece." },
        { name: "Pared de inspiración con luces de hadas", why: "Bocetos sueltos y papeles hallados bajo cálidas luces de hadas: una galería privada con la que las visitas se sienten honradas de que se les enseñe." },
      ],
      foodIntro:
        "Las personalidades Independientes favorecen lo inusual: las categorías de 'otros' y vegetales encabezan nuestro modelo, por delante de los platos principales convencionales. Para el Artista en concreto, prueba primero las comidas suaves y estéticas: tés, fruta, cualquier cosa que parezca un cuadro.",
      foodTestFirst: ["té de burbujas", "té", "fresa", "melón"],
      foodDeprioritize: ["filete", "hamburguesa", "cerveza"],
      foodTip:
        "Los Artistas tienen reacciones sutiles: una pequeña sonrisa, un aliento contenido. Quédate quieto y mira la animación completa: los verdaderos favoritos reciben una pausa soñadora de dos segundos antes de responder, exclusiva de esta personalidad.",
      voicePreset: "Diente de sierra — registro medio suave",
      voicePitchHz: 320,
      voiceSpeed: 1.0,
      voiceTip:
        "Medio-suave con ritmo sin prisa. 320Hz mantiene el calor sin volverse infantil; 1.0x deja que el habla a bips respire. Es la rara voz en la que añadir silencio — los espacios entre frases — es la verdadera actuación.",
      romance: { partner: "Líder", why: "El emparejamiento más querido por la comunidad: opuestos totales en velocidad, habla y certeza, cada uno ofreciendo exactamente lo que al otro le falta. El Líder embiste hacia adelante; el Artista hace que valga la pena llegar al destino." },
      friend: { partner: "Espíritu libre", why: "Dos soñadores con medios distintos. Coexisten más de lo que conversan, y funciona: la amistad más tranquila de la isla, medida en silencios cómodos." },
      friction: { partner: "Emprendedor", why: "El Emprendedor quiere que el Artista se dé prisa. El Artista quiere que lo que hace el Emprendedor signifique algo. Ambos lo dicen más alto cada semana, y ninguno escucha." },
    },

    independent_freeSpirit: {
      behavior: [
        "El Espíritu libre es el signo de interrogación de la isla. Camina lento pero es imposible de predecir: este Mii sigue a la curiosidad adonde apunte — a los apartamentos de otros residentes, a conversaciones a media frase, a aficiones que cambian cada semana. El grupo de eventos aleatorios del juego adora a un Espíritu libre: la mitad de las historias más raras de la isla empiezan con 'y entonces el Espíritu libre decidió...'.",
        "Su habla directa sorprende a quienes esperaban suavidad por el ritmo lento: los Espíritus libres dicen exactamente lo que piensan, sin ningún interés particular en si encaja con el ambiente. Eso los hace pésimos en la charla trivial y excelentes en la charla de verdad. En lo romántico se resisten a la estructura: un Espíritu libre emparejado con otro tipo Independiente produce la relación más privada y difícil de leer de la isla — profunda, sin palabras y ligeramente fuera de encuadre.",
      ],
      apartmentIntro:
        "La habitación de un Espíritu libre no obedece a ninguna temática, y ESO es la temática. Caos curado, contradicciones cómodas:",
      apartmentItems: [
        { name: "Salón de cojines en el suelo", why: "Sin sofá, sin sillas, solo cojines: el mobiliario que se niega a comprometerse es la elección correcta aquí." },
        { name: "Mesa de rarezas rotativa", why: "Esta semana son piedras; la próxima, cucharas. El contenido de la mesa cambia, pero la curiosidad nunca." },
        { name: "Decoración colgante del techo", why: "Los móviles y colgantes ponen el interés donde a nadie más se le ocurre mirar: el sello inconfundible de un Espíritu libre." },
      ],
      foodIntro:
        "La preferencia Independiente por lo inusual aplica con toda su fuerza: la categoría de 'otros' y las combinaciones inesperadas encabezan el modelo. Olvídate de los platos principales seguros: prueba los artículos que otros residentes ignoran y espera sorpresas.",
      foodTestFirst: ["té de burbujas", "copa de helado", "regaliz", "pepino"],
      foodDeprioritize: ["pizza", "hamburguesa", "refresco de cola"],
      foodTip:
        "Los Espíritus libres son los más propensos de la isla a tener 'favoritos raros': los residentes que aman el regaliz o el pepino en contra de todas las tendencias de grupo. Si las apuestas estándar fallan, ve hacia lo más raro, no hacia lo más seguro.",
      voicePreset: "Onda cuadrada — registro medio peculiar",
      voicePitchHz: 260,
      voiceSpeed: 1.05,
      voiceTip:
        "Usa la onda cuadrada: el timbre en sí suena 'mal' de la manera correcta. 260Hz con una ligera aceleración da un habla a bips que nunca termina de resolverse, que es toda la personalidad en forma de audio.",
      romance: { partner: "Animador", why: "Uno improvisa ruidosamente, otro improvisa en silencio. Ninguno sabe cuál es el plan y ambos prefieren que sea así: el romance más impredecible y más divertido de ver de la isla." },
      friend: { partner: "Artista", why: "La amistad que menos mantenimiento exige de la isla: sin exigencias, sin horario, sin actuación. Simplemente aparecen el uno cerca del otro, y ambos consideran eso una quedada." },
      friction: { partner: "Optimista", why: "El Optimista sigue organizando felicidad de grupo; el Espíritu libre sigue sin asistir. El Optimista se toma cada ausencia como algo personal. El Espíritu libre no nota nada." },
    },

    independent_thinker: {
      behavior: [
        "El Pensador es el analista silencioso de la isla. Caminar lento, habla directa, cara relajada: un Mii que parece estar ejecutando cálculos en segundo plano sobre todo lo que ve. Los Pensadores rara vez inician eventos, pero acaban en el centro de ellos, usualmente diciendo la única frase que reencuadra toda la situación. El juego les da las líneas de diálogo más secas de todo el repertorio.",
        "En lo social son minimalistas: un número reducido de amigos, mantenidos con eficiencia. Los Pensadores no hacen drama: lo diagnostican. Cuando otros dos residentes pelean, el Pensador es quien explica la causa real a quien quiera escuchar, correctamente, y luego vuelve a lo que estuviera haciendo. Sus arcos románticos son lentos y procedimentales, lo que convierte la recompensa — un Pensador admitiendo por fin un sentimiento en voz alta — en uno de los mejores momentos del juego.",
      ],
      apartmentIntro:
        "La habitación de un Pensador es un estudio disfrazado de apartamento. Todo tranquilo, nada accidental:",
      apartmentItems: [
        { name: "Librería de pared completa", why: "Los libros del suelo al techo dicen todo lo que un Pensador quiere decir: aquí vive el conocimiento, y está ordenado." },
        { name: "Una sola lámpara de trabajo, sin luz de techo", why: "Un solo círculo de luz sobre una sola silla: la habitación de un Pensador está iluminada para leer, no para el ambiente ni la compañía." },
        { name: "Pizarra blanca o de tiza", why: "Una superficie para resolver las cosas: el equivalente habitacional de pensar en voz alta, sin la parte de la voz." },
      ],
      foodIntro:
        "Perfil de gusto Independiente: vegetales y artículos inusuales por encima de los favoritos del público. Para los Pensadores, prueba las comidas sencillas y honestas: el modelo sugiere que favorecen los ingredientes simples bien hechos frente a los platos elaborados.",
      foodTestFirst: ["ensalada", "pepino", "té", "arroz"],
      foodDeprioritize: ["caramelo", "refresco de cola", "pastel"],
      foodTip:
        "Las reacciones de los Pensadores son mínimas por diseño: la diferencia entre 'me gusta' y 'amor' es medio segundo de ceja. Registra las reacciones de inmediato; esta es la personalidad donde la memoria falla y las notas salvan la partida.",
      voicePreset: "Onda cuadrada — registro grave",
      voicePitchHz: 200,
      voiceSpeed: 0.9,
      voiceTip:
        "Onda cuadrada para un timbre impasible, por debajo de 1.0x de velocidad. El resultado suena como una voz que considera opcional la mayoría de las frases. Añade un tono de 180–220Hz y deja que el silencio entre bips haga la conversación.",
      romance: { partner: "Innovador", why: "El Innovador aporta novedad; el Pensador aporta análisis. Uno trae el fenómeno, el otro lo explica: la pareja dispar más compatible intelectualmente de la isla." },
      friend: { partner: "Lobo solitario", why: "Ambos prefieren entender antes que socializar. Su amistad es 90% existencia en paralelo y 10% observaciones demoledoramente precisas sobre los demás residentes." },
      friction: { partner: "Encantador", why: "El Encantador juega con los hechos a la ligera; el Pensador guarda los recibos. Cada historia encantadora recibe una corrección, y la habitación se enfría un 10% cada vez." },
    },

    independent_loneWolf: {
      behavior: [
        "El Lobo solitario es el residente más incomprendido de la isla. Caminar lento, habla directa, postura segura: este Mii no evita a la gente, simplemente no la necesita, y la isla nunca termina de perdonárselo. Los Lobos solitarios se saltan los eventos de grupo, declinan invitaciones con cortesía pero con firmeza y, de algún modo, están presentes en el momento exacto en que ocurre algo importante, aportando una frase crucial antes de marcharse.",
        "Su lealtad, una vez ganada, es la más duradera del juego. Un Lobo solitario con un amigo de verdad está hecho para toda la partida: defiende a ese amigo en las peleas, recuerda su cumpleaños sin que se lo recuerden y aparece — siempre tarde, siempre cuando importa. En lo romántico va a su propio ritmo privado; el truco que los jugadores aprenden es dejar de empujar y dejar que el arco se desarrolle, porque un Lobo solitario presionado sencillamente se va.",
      ],
      apartmentIntro:
        "La habitación de un Lobo solitario es una fortaleza de soledad con un gusto excelente. Privada, funcional, completa:",
      apartmentItems: [
        { name: "Sillón sólido de lectura, con el respaldo a la pared", why: "El clásico mobiliario de lobo solitario: vista completa de la puerta, cero invitación a sentarse. No es antipatía: es arquitectura." },
        { name: "Estantería de equipo práctico", why: "Herramientas, botas, lo esencial: todo lo que un Mii autosuficiente necesita, dispuesto para el uso de una sola persona." },
        { name: "Cortinas casi opacas", why: "El control sobre quién mira dentro refleja el control sobre quién se acerca. Además, excelentes para la siesta de la tarde, que los Lobos solitarios defienden con uñas y dientes." },
      ],
      foodIntro:
        "Gustos Independientes, edición autosuficiencia: los Lobos solitarios favorecen comidas simples y sin ceremonia que teóricamente podrían preparar ellos mismos. Prueba alimentos básicos y sabores simples intensos antes que nada elaborado.",
      foodTestFirst: ["arroz", "sashimi", "café", "manzana"],
      foodDeprioritize: ["pastel", "copa de helado", "té de burbujas"],
      foodTip:
        "Los Lobos solitarios comen como si fuera combustible, no un evento: las reacciones son cortas y sin actuación. La señal fiable del 'amor': miran alrededor para comprobar que nadie los vio disfrutando de algo. Esa es tu respuesta.",
      voicePreset: "Diente de sierra — registro grave y lacónico",
      voicePitchHz: 140,
      voiceSpeed: 0.9,
      voiceTip:
        "El tono más grave de la isla, ligeramente lento. Diente de sierra a 140Hz con velocidad 0.9x produce el audio de alguien que ahorra palabras. Cada bip cuesta algo, así que no se dice nada de más.",
      romance: { partner: "Optimista", why: "El Optimista se niega a desanimarse por la distancia del Lobo solitario, y el Lobo solitario aprecia en secreto no tener que actuar. El romance más lento y más ganado a pulso de la isla." },
      friend: { partner: "Pensador", why: "La única amistad donde el silencio es el idioma por defecto. Se respetan tanto el espacio que sus raras conversaciones son legendarias por su franqueza." },
      friction: { partner: "Animador", why: "Una fuerza imparable de entusiasmo contra un objeto inamovible de desinterés. El Animador interpreta cada puerta cerrada como un desafío. El Lobo solitario discrepa, en silencio, largamente." },
    },

    easygoing_dreamer: {
      behavior: [
        "El Soñador es la profundidad silenciosa de la isla. Caminar lento, habla suave, expresión segura: un Mii que parece saber algo que el resto de la isla no sabe. El juego asigna a los Soñadores los monólogos internos más poéticos y los sueños más extraños (mira los informes de la mañana: los suyos siempre son los que merecen una captura de pantalla). Recorren la isla a la deriva como si fuera una metáfora.",
        "No confundas dulzura con pasividad: los Soñadores son los mejores jueces de carácter de la isla. Predicen qué parejas durarán, qué amistades son falsas y qué residente está a punto de causar un problema, normalmente con semanas de antelación. Su estilo social es la observación silenciosa seguida de una perspicacia demoledoramente precisa, entregada suavemente en el momento exacto. En lo romántico son lentos, idealistas e intensamente callados; la confesión de un Soñador lleva mucho tiempo siendo pensada antes de que alguien la oiga.",
      ],
      apartmentIntro:
        "La habitación de un Soñador debería sentirse como el momento justo antes de dormir: bordes suaves, luz baja, significado por todas partes:",
      apartmentItems: [
        { name: "Cama con dosel o ropa de cama en capas", why: "La tela suave y fluida convierte la cama en el centro de la habitación: el cuartel general de una personalidad que hace su mejor trabajo dormida." },
        { name: "Decoración de luna y estrellas", why: "Los detalles de cielo nocturno no son un cliché aquí: son una declaración de principios del astrónomo residente de los sentimientos de la isla." },
        { name: "Rincón de diario", why: "Una mesita, una lámpara, un cuaderno abierto: donde se escriben las predicciones más precisas de la isla antes de cumplirse." },
      ],
      foodIntro:
        "Perfil de comida reconfortante Afable con un giro soñador: lideran las comidas cálidas, suaves y nostálgicas. Piensa en 'lo que comerías durante una tarde tranquila': el modelo favorece los platos principales y los postres suaves para este grupo.",
      foodTestFirst: ["sopa de fideos", "flan", "leche", "melón"],
      foodDeprioritize: ["cerveza", "patatas fritas", "sake"],
      foodTip:
        "Los Soñadores saborean: su reacción de 'amor' es un escalofrío feliz, lento y de cuerpo entero en lugar de un salto. Aliméntalos por la noche dentro del juego y mira la animación completa: es el 'amor' más tranquilo de la isla.",
      voicePreset: "Diente de sierra — registro agudo etéreo",
      voicePitchHz: 400,
      voiceSpeed: 0.95,
      voiceTip:
        "Tono alto, velocidad ligeramente lenta: la rara combinación que suena a flotar. 400Hz a 0.95x produce un habla a bips que parece llegar de un lugar ligeramente distinto, que es exactamente lo correcto.",
      romance: { partner: "Emprendedor", why: "El contraste Seguro × Afable al máximo: el movimiento se encuentra con la quietud, los horarios con la serenidad. No deberían funcionar — y sus escenas son las que los jugadores vuelven a ver." },
      friend: { partner: "Sensible", why: "Dos almas dulces en la misma frecuencia lenta. Su amistad no produce drama y sí confort infinito: el rincón más cálido de la isla, permanentemente ocupado." },
      friction: { partner: "Aventurero", why: "El volumen y la velocidad del Aventurero son demasiado para un Mii construido para la quietud. Espera desvíos suaves e infinitos de invitaciones que el Aventurero vuelve a ofrecer una y otra vez." },
    },

    easygoing_sweetheart: {
      behavior: [
        "El Cariñoso es el cuidador de la isla: la personalidad que nota cuándo falta alguien en la mesa. Caminar lento, habla suave, calidez segura: este Mii mantiene las amistades como otras personalidades mantienen sus aficiones, de forma deliberada y diaria. El juego da a los Cariñosos la tasa más alta de eventos de consolar a otros residentes; siempre llegan primeros cuando alguien llora en un banco.",
        "Su gravedad social es real: los Cariñosos sostienen silenciosamente a los grupos de amigos a través de las líneas de personalidad, y los tríos más estables de la isla suelen tener uno en el centro. En lo romántico son leales, atentos y calladamente tercos: a un Cariñoso que ha decidido que una relación vale la pena conservar no se le puede convencer de lo contrario, lo que produce tanto los mejores matrimonios de la isla como los que más aguantan. Dale a alguien digno de su lealtad: eso es todo el juego.",
      ],
      apartmentIntro:
        "La habitación de un Cariñoso es la segunda favorita de todos: cálida, acogedora, con galletas implícitas:",
      apartmentItems: [
        { name: "Mesa redonda de cocina", why: "Sin esquinas afiladas, con sitio para cuatro: mobiliario que dice 'siéntate, te preparo algo' antes de que nadie diga nada." },
        { name: "Flores frescas, siempre", why: "Un pequeño jarrón que nunca está vacío: el detalle de menor esfuerzo y mayor señal de un residente naturalmente atento." },
        { name: "Pared de fotos de amigos", why: "Fotos de otros residentes donde la mayoría colgaría arte: la habitación de un Cariñoso se decora con relaciones." },
      ],
      foodIntro:
        "Perfil reconfortante Afable clásico: platos principales caseros, postres suaves, nada agresivo. Los Cariñosos favorecen las comidas que servirías a una visita, que convenientemente también es la forma más rápida de encontrar su favorito.",
      foodTestFirst: ["sopa de fideos", "galleta", "té", "flan"],
      foodDeprioritize: ["cerveza", "sake", "regaliz"],
      foodTip:
        "A los Cariñosos les gusta casi todo, así que caza el 'amor' probando categorías reconfortantes una tras otra: sopa de fideos, luego galleta, luego té. Atento a la reacción en la que cierran los ojos: esa es la buena.",
      voicePreset: "Diente de sierra — registro medio-agudo dulce",
      voicePitchHz: 380,
      voiceSpeed: 1.0,
      voiceTip:
        "Medio-agudo cálido a velocidad sin prisa. 380Hz lo mantiene amable sin volverse caricaturesco; 1.0x deja que cada palabra aterrice suavemente. El preset Anciano a tono bajo crea una maravillosa variante abuela del Cariñoso.",
      romance: { partner: "Diseñador", why: "La paciencia del Cariñoso es la única fuerza que sobrevive a los muros del Diseñador. Este es el estándar dorado de fuego lento de la isla: planifica el lugar de la boda pronto." },
      friend: { partner: "Optimista", why: "Los dos cuidadores de la isla, manteniendo a todos los demás por turnos. Sus quedadas son dulces, de apoyo y, en secreto, la razón de que todo el elenco siga funcionando." },
      friction: { partner: "Espíritu libre", why: "El Cariñoso ofrece cuidado; el Espíritu libre lo esquiva. Cada gesto considerado recibe un 'no, gracias' alegre, y la espiral de preocupación del Cariñoso es genuinamente dramática de ver." },
    },

    easygoing_softie: {
      behavior: [
        "El Sensible es el corazón dulce de la isla con el volumen bajado. Caminar lento, habla blanda, todo relajado: este Mii experimenta el mundo con alta sensibilidad y bajo volumen, y el juego lo respeta: los Sensibles reciben la mayor cantidad de eventos de 'conmovido hasta las lágrimas por algo pequeño' de todo el repertorio. Un atardecer precioso no es paisaje para un Sensible: es un evento.",
        "Su honestidad emocional es desarmante: los Sensibles no saben fingir indiferencia, lo que los convierte en los detectores de verdad de la isla. Cuando un Sensible está incómodo, todo el mundo lo sabe; cuando un Sensible es feliz, toda la calle se siente más suave. En lo romántico son cautelosos y profundamente sinceros, la personalidad con más probabilidades de sonrojarse durante su propia confesión. Protégelos de los bordes afilados de la isla, o mejor: míralos ser más valientes de lo que nadie esperaba.",
      ],
      apartmentIntro:
        "La habitación de un Sensible es un nido: todo suave, luz cálida, seguridad en forma de textura:",
      apartmentItems: [
        { name: "Sobreabundancia de peluches", why: "Cojines, peluches, mantas suaves: confort táctil máximo para el residente con más sentimientos por metro cuadrado." },
        { name: "Paleta pastel", why: "Los rosas suaves y las cremas delicadas hacen que la habitación en sí sea tierna: un entorno que nunca levanta la voz." },
        { name: "Rincón acogedor de lectura", why: "Un asiento acolchado junto a la ventana con una lámpara pequeña: la respuesta más suave posible a la pregunta '¿a dónde van los sentimientos para ser sentidos?'" },
      ],
      foodIntro:
        "Perfil reconfortante Afable en su ajuste más suave: lideran los dulces tiernos y las comidas cálidas y suaves. Sáltate cualquier cosa intensa: lo amargo, lo burbujeante o lo ligeramente picante rara vez funciona con esta personalidad.",
      foodTestFirst: ["flan", "leche", "helado", "fresa"],
      foodDeprioritize: ["cerveza", "café", "regaliz"],
      foodTip:
        "Los Sensibles tienen las reacciones más legibles de la isla: cada sentimiento se ve en su cara de inmediato. Eso hace que probar comidas sea fácil y enternecedor: su reacción de 'amor' incluye un meneo feliz que ninguna otra personalidad tiene.",
      voicePreset: "Diente de sierra — registro agudo delicado",
      voicePitchHz: 440,
      voiceSpeed: 0.95,
      voiceTip:
        "La voz dulce más aguda de la isla: 440Hz con una entrega ligeramente lenta. El habla a bips suena como si pudiera disculparse por existir, que es precisamente el personaje. Mantén la velocidad por debajo de 1.0x: un Sensible apurado es una contradicción.",
      romance: { partner: "Encantador", why: "La confianza del Encantador se encuentra con la sinceridad del Sensible y — sorprendentemente — gana la sinceridad. Que te adoren es agradable; que te vean de verdad es lo que un Sensible lleva toda la vida esperando." },
      friend: { partner: "Soñador", why: "Las dos almas más silenciosas y sensibles de la isla, compartiendo un banco y un atardecer. No hacen falta palabras: la amistad es el propio silencio cómodo." },
      friction: { partner: "Emprendedor", why: "El ritmo y la presión del Emprendedor abruman al residente más sensible de la isla. El Sensible nunca se queja, y de algún modo eso hace que el Emprendedor empuje más fuerte. Subtrama dulcemente desgarradora." },
    },

    easygoing_buddy: {
      behavior: [
        "El Compañero es el personaje de fondo favorito de la isla: el Mii que cae bien a todos sin que sepan muy bien por qué. Caminar lento, habla suave, permanentemente relajado: todo el asunto del Compañero es ser agradable sin segundas intenciones. Aparecen, están encantados de estar ahí, no ponen ninguna pega. Al juego le encanta elegirlos como el amigo solidario en los arcos de historia de todos los demás.",
        "Su superpoder es la adaptabilidad: los Compañeros encajan en cualquier grupo, cualquier evento, cualquier drama — normalmente como quien mantiene el ambiente ligero. No lideran, no compiten y no guardan rencor; las peleas de isla en las que participa un Compañero se resuelven sospechosamente rápido. En lo romántico van sin prisa y se toman todo el asunto con calma, lo que significa que la historia de amor de un Compañero solo ocurre si otra persona la inicia — y una vez que empieza, son la pareja con menos drama de la isla.",
      ],
      apartmentIntro:
        "La habitación de un Compañero es un sitio de quedadas al que le ocurre contener una cama. Confort máximo, cero pretensión:",
      apartmentItems: [
        { name: "Sofá grande y suave", why: "La verdadera pieza central de la habitación: asiento para quien pase a verle, suavidad para quien se quede. El sofá de un Compañero es infraestructura de la isla." },
        { name: "Cajón de aperitivos", why: "Patatas fritas al alcance de la mano desde cada asiento: la hospitalidad como distribución del mobiliario." },
        { name: "Rincón de plantas relajadas", why: "Unas pocas plantas fáciles que prosperan con el abandono: verdor sin presión, muy propio de la personalidad." },
      ],
      foodIntro:
        "Perfil reconfortante Afable, edición casual: los Compañeros favorecen comidas relajadas, compartibles y sin complicaciones. Aperitivos y platos principales simples antes que nada formal: prueba lo que llevarías a una quedada informal.",
      foodTestFirst: ["palomitas de maíz", "ramen", "patatas fritas", "manzana"],
      foodDeprioritize: ["sake", "sashimi", "regaliz"],
      foodTip:
        "Los Compañeros reaccionan a la comida como reaccionan a la vida: contentos, moderadamente, con constancia. Su 'amor' es un pequeño tarareo feliz y una sonrisa — fácil de pasar por alto junto a personalidades más ruidosas. Observa de cerca: merece la pena atraparlo.",
      voicePreset: "Diente de sierra — registro medio relajado",
      voicePitchHz: 300,
      voiceSpeed: 1.05,
      voiceTip:
        "Tono en el punto central exacto, velocidad sin prisa pero no lenta. 300Hz a 1.05x es la voz más neutra y amistosa posible: suena como si te ayudara a mudar el sofá sin preguntar nada.",
      romance: { partner: "Aventurero", why: "El Aventurero aporta los planes; el Compañero aporta el 'claro, suena divertido'. El romance más fácil de la isla: cero fricción, quedadas infinitas, deleite mutuo." },
      friend: { partner: "Cariñoso", why: "El dúo de confort de la isla: uno hace que todos se sientan bienvenidos, el otro hace que todos se sientan cuidados. Sus quedadas emiten un aura de calidez detectable desde el muelle." },
      friction: { partner: "Líder", why: "El Líder sigue asignando planes; el Compañero sigue estando bien con lo que sea. Para un Líder, 'sin preferencia' es exasperante. El Compañero sigue sin inmutarse, que es peor." },
    },
  },
};
