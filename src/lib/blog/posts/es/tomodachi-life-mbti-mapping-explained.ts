/**
 * LifeSimGrid — Blog post: Tomodachi Life MBTI mapping, explained (es)
 *
 * Grounded in the site's own model:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Mapeo MBTI: las 16 personalidades de Tomodachi Life",
  description:
    "La metodología completa de nuestro mapeo MBTI de Tomodachi Life: bandas de valores, lógica de grupos, derivación letra a letra y la anomalía INFP.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Personalidad", "Guías"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Life asigna a cada Mii una de 16 personalidades, y decide cuál mediante cuatro controles deslizantes ocultos en el editor de Miis. Nuestro [mapeo MBTI](/es/tomodachi-life-mbti) es un modelo de estimación comunitaria que convierte esos cuatro controles en un código de cuatro letras al estilo Myers-Briggs. Esta guía explica todo el pipeline exactamente como funciona en este sitio: los umbrales de las bandas, la lógica de selección de grupos, la derivación de letras y el único caso en el que el mapeo produce una colisión sorprendente. Cada número que aparece abajo proviene del mismo modelo que alimenta nuestra [calculadora de personalidad](/es/tomodachi-life-personality-calculator) y la [tabla de 16 tipos](/es/tomodachi-life-personality-chart), así que puedes reproducir cualquier resultado a mano.",
    },
    { type: "h2", text: "Los cuatro controles que lo deciden todo" },
    {
      type: "p",
      text: "Cuando registras un Mii, el juego te permite ajustar cuatro ejes de personalidad. Las distintas comunidades de fans les dan nombres ligeramente diferentes; en este sitio los llamamos **Movimiento**, **Habla**, **Energía** y **Pensamiento**, y cada uno es un valor continuo de `0` a `100`. Ninguna de las 16 personalidades se consigue con un solo control — la personalidad es un **patrón** a lo largo de los cuatro ejes, y por eso dos Miis pueden parecer completamente distintos aunque compartan el valor de un solo control.",
    },
    {
      type: "p",
      text: "**Movimiento** va de lento a rápido. Un Mii con Movimiento alto da visiblemente menos pasos al cruzar la isla, toma la iniciativa de llamar a las puertas y tiende a aparecer primero en las escenas de grupo. **Habla** va de suave a directo. Los Miis directos dan respuestas bruscas, se declaran pronto y sueltan frases más duras en las peleas. **Energía** va de práctico a imaginativo: los Miis prácticos se ocupan de lo que tienen delante, mientras que los imaginativos divagan, proponen actividades nuevas y reaccionan con fuerza a la novedad. **Pensamiento** va de flexible a estructurado: los Miis estructurados siguen rutinas, ordenan sus opiniones y llevan la cuenta de todo.",
    },
    {
      type: "p",
      text: "Los cuatro ejes no se eligieron al azar. Cada uno corresponde exactamente a una letra del código MBTI, y eso es lo que hace posible un mapeo limpio de 16 tipos. Antes de llegar ahí, el modelo tiene que reducir cuatro valores continuos a una de 16 personalidades discretas, y lo hace en tres pasos: bandas, grupo y luego subtipo.",
    },
    { type: "h2", text: "Paso 1: cada control se convierte en una de tres bandas" },
    {
      type: "p",
      text: "El primer paso cuantiza cada control en una banda baja, media o alta. Los umbrales son fijos para los cuatro controles:",
    },
    {
      type: "table",
      headers: ["Banda", "Valor del control", "Significado"],
      rows: [
        ["Baja", "`0 – 33`", "El extremo izquierdo del eje (lento, suave, práctico, flexible)"],
        ["Media", "`34 – 66`", "Sin inclinación fuerte hacia ningún lado"],
        ["Alta", "`67 – 100`", "El extremo derecho del eje (rápido, directo, imaginativo, estructurado)"],
      ],
    },
    {
      type: "p",
      text: "Tres bandas por control en cuatro controles dan `3 × 3 × 3 × 3 = 81` celdas posibles. Eso es bastante más que las 16 personalidades que el juego ofrece en realidad, y por eso hace falta un segundo paso que fusione celdas similares — y por eso varias combinaciones distintas de controles pueden terminar en la misma personalidad. Si alguna vez has jurado que dos de tus Miis tenían posiciones de control distintas pero la misma personalidad, esta es la razón: los 16 resultados del juego son más gruesos que sus entradas de control.",
    },
    { type: "h2", text: "Paso 2: las bandas eligen uno de cuatro grupos" },
    {
      type: "p",
      text: "Las 16 personalidades se organizan en cuatro grupos de cuatro: **Grupo Extrovertido**, **Grupo Seguro**, **Grupo Independiente** y **Grupo Afable**. El segundo paso decide el grupo leyendo las bandas como señales. Dos valores derivados hacen el trabajo:",
    },
    {
      type: "ul",
      items: [
        "**Señal activa** — la suma de las bandas de Movimiento, Habla y Energía (un número de `0` a `6`). Los valores altos indican que el Mii tiende a lo social y lo enérgico.",
        "**Señal de introversión** — solo la banda de Pensamiento, leída con polaridad invertida: una banda de Pensamiento **alta** significa que el Mii tiende a ser reservado e introvertido.",
      ],
    },
    {
      type: "p",
      text: "Luego las reglas se aplican en cascada y en orden. Si la señal de introversión es alta mientras la señal activa es baja, el Mii cae en el **Grupo Independiente** — el hogar del Artista, el Espíritu libre, el Pensador y el Lobo solitario. Si la señal activa es muy alta (`4` o más), el Mii es social: se convierte en **Extrovertido** cuando Habla también está en la banda alta, y en **Seguro** en caso contrario. Una señal activa intermedia se desempata con Movimiento: un Movimiento alto mantiene al Mii en **Extrovertido**, y cualquier otra cosa lo desliza hacia **Afable**. Y cuando la señal activa es baja sin una señal de introversión fuerte, el Mii se instala en **Afable** por defecto. El orden de la cascada importa: un Mii introvertido pero enérgico lo resuelve la primera regla que coincida, no un promedio de señales.",
    },
    {
      type: "p",
      text: "Los dos grupos sociales y los dos grupos reservados no son categorías arbitrarias: alimentan directamente el modelo de compatibilidad del sitio, donde Extrovertido empareja de forma natural con Independiente, y Seguro con Afable. Volveremos sobre eso más abajo.",
    },
    { type: "h2", text: "Paso 3: una segunda lectura elige el subtipo" },
    {
      type: "p",
      text: "Una vez fijado el grupo, una segunda pasada sobre las mismas bandas selecciona a uno de sus cuatro miembros. Cada grupo tiene sus propios criterios de desempate. En el Grupo Extrovertido, por ejemplo, Energía alta junto con Habla alta produce el **Animador**; Movimiento alto con al menos Habla media da el **Innovador**; una banda de Pensamiento media o más alta orienta hacia el **Líder**; y todo lo demás se convierte en el **Optimista**. Los otros tres grupos siguen el mismo patrón con ejes de prioridad distintos.",
    },
    {
      type: "p",
      text: "La tabla completa de abajo enumera las 16 personalidades con su grupo, su código MBTI y su firma de controles — la lectura de cuatro ejes que implica el código:",
    },
    {
      type: "table",
      headers: ["Personalidad", "Grupo", "MBTI", "Firma de controles"],
      rows: [
        ["Líder", "Grupo Extrovertido", "ESTJ", "Rápido · Directo · Práctico · Estructurado"],
        ["Animador", "Grupo Extrovertido", "ESFP", "Rápido · Suave · Práctico · Flexible"],
        ["Innovador", "Grupo Extrovertido", "ENFP", "Rápido · Suave · Imaginativo · Flexible"],
        ["Optimista", "Grupo Extrovertido", "ESFJ", "Rápido · Suave · Práctico · Estructurado"],
        ["Diseñador", "Grupo Seguro", "INTJ", "Lento · Directo · Imaginativo · Estructurado"],
        ["Aventurero", "Grupo Seguro", "ESTP", "Rápido · Directo · Práctico · Flexible"],
        ["Emprendedor", "Grupo Seguro", "ENTJ", "Rápido · Directo · Imaginativo · Estructurado"],
        ["Encantador", "Grupo Seguro", "ENTP", "Rápido · Directo · Imaginativo · Flexible"],
        ["Artista", "Grupo Independiente", "INFP", "Lento · Suave · Imaginativo · Flexible"],
        ["Espíritu libre", "Grupo Independiente", "INTP", "Lento · Directo · Imaginativo · Flexible"],
        ["Pensador", "Grupo Independiente", "ISTP", "Lento · Directo · Práctico · Flexible"],
        ["Lobo solitario", "Grupo Independiente", "ISTJ", "Lento · Directo · Práctico · Estructurado"],
        ["Soñador", "Grupo Afable", "INFJ", "Lento · Suave · Imaginativo · Estructurado"],
        ["Cariñoso", "Grupo Afable", "ISFJ", "Lento · Suave · Práctico · Estructurado"],
        ["Sensible", "Grupo Afable", "INFP", "Lento · Suave · Imaginativo · Flexible"],
        ["Compañero", "Grupo Afable", "ISFP", "Lento · Suave · Práctico · Flexible"],
      ],
    },
    { type: "h2", text: "Cómo se deriva cada letra MBTI" },
    {
      type: "p",
      text: "Como cada eje de control se asignó a una dimensión MBTI, derivar el código de cuatro letras es una lectura directa de la firma de controles. Letra por letra:",
    },
    {
      type: "ol",
      items: [
        "**E o I ← Movimiento.** Un Mii rápido es extrovertido (E); un Mii lento es introvertido (I). Movimiento es el único eje que decide la primera letra, y eso coincide con lo que observan los jugadores: la velocidad al caminar es el rasgo de personalidad más visible del juego.",
        "**S o N ← Energía.** Un Mii práctico es sensorial (S); un Mii imaginativo es intuitivo (N). Este eje gobierna cómo reacciona el Mii ante objetos, eventos y residentes nuevos.",
        "**T o F ← Habla.** Un Mii directo es de pensamiento (T); un Mii suave es de sentimiento (F). El mismo control que hace que las peleas sean duras o suaves es el que decide la tercera letra.",
        "**J o P ← Pensamiento.** Un Mii estructurado es calificador (J); un Mii flexible es perceptivo (P). Los Miis amantes de la rutina llevan la J; los improvisadores llevan la P.",
      ],
    },
    {
      type: "p",
      text: "Fíjate en que el código está totalmente determinado por la firma de cuatro ejes — velocidad de Movimiento, estilo de Energía, estilo de Habla y estructura de Pensamiento — y **no** por el grupo. El grupo es una quinta pieza de información, y el mapeo la necesita, como muestra la siguiente sección.",
    },

    { type: "h2", text: "Preguntas frecuentes sobre el mapeo" },
    { type: "h3", text: "¿Controles idénticos producen siempre la misma personalidad?" },
    { type: "p", text: "Sí: el proceso es totalmente determinista. Los mismos cuatro valores caen siempre en las mismas bandas, aterran en la misma celda de las `81`, resuelven el mismo grupo en la cascada y eligen el mismo subtipo. Dos Miis registrados con ajustes idénticos saldrán siempre idénticos, en este sitio y, según toda la observación acumulada de los jugadores, también en el juego. Lo único que puede voltear a un Mii aparentemente intacto es un empujón de un punto en el borde de una banda — de `33` a `34`, o de `66` a `67` —, por eso los valores al límite merecen una segunda mirada antes de cerrar tu plan de isla." },
    { type: "h3", text: "¿Cuál de los cuatro controles pesa más?" },
    { type: "p", text: "**Movimiento** lleva el mayor peso. Es el único eje que decide la primera letra por sí solo (rápido es E, lento es I), alimenta la señal activa y desempata entre **Extrovertido** y **Afable** cuando la señal activa es tibia. **Pensamiento** va justo detrás: es el único motor de la señal de introversión que lleva a los Miis callados hacia el Grupo Independiente, y inclina varios desempates de subtipo. Habla y Energía cuentan, pero sobre todo como multiplicadores de los otros dos." },
    { type: "h3", text: "¿Por qué a veces un resultado se siente mal incluso con valores sensatos?" },
    { type: "p", text: "Casi siempre por las bandas medias. Un control estacionado entre `34` y `66` casi no aporta información — el modelo lo lee como neutro —, así que dos Miis que se sienten distintos en el juego pueden cuantizarse igual y acabar siendo lo mismo. El orden de la cascada lo agrava: gana la primera regla que aplica, y un Mii enérgico y amable puede acabar en un grupo distinto al de uno enérgico y directo por una sola banda. Si una predicción choca con cómo se comporta tu Mii en el juego, fíate del comportamiento y toma el código por lo que es: una aproximación." },
    { type: "h3", text: "¿La personalidad cambia cómo actúa un Mii dentro del juego?" },
    { type: "p", text: "La observación de los jugadores dice que sí, a grandes rasgos: los Miis de habla directa sueltan lo que piensan en las peleas y se declaran pronto, los imaginativos proponen actividades raras y los estructurados mantienen las rutinas que el juego les permite fijar. Lo que la personalidad claramente no hace es sellar el destino: los niveles de amistad, el historial de regalos y los eventos aleatorios viven fuera de este sistema. Por eso nuestras puntuaciones de compatibilidad llegan con desglose y no con promesas." },
    { type: "h3", text: "¿Es el mismo test MBTI que la gente hace en internet?" },
    { type: "p", text: "No, y conviene no mezclarlos. El indicador Myers-Briggs es un cuestionario para personas reales; este mapeo es una capa de traducción entre el sistema de controles de un videojuego y el vocabulario de cuatro letras de ese cuestionario. Las letras significan lo mismo a nivel de eje, pero un Mii no puede ser introvertido como lo es una persona: solo puede tener un valor de control. Toma el código de un Mii como una taquigrafía compartida de su patrón de controles, no como una evaluación psicológica del personaje y mucho menos de su dueño." },
    { type: "h2", text: "El mapeo al revés: del código MBTI a los controles" },
    { type: "p", text: "La tabla también funciona en sentido inverso, que es la dirección que la mayoría necesita: conoces tu propio código MBTI y quieres un Mii que le haga juego. Lee el código como cuatro posiciones de control y ajústalas así:" },
    { type: "ol", items: [
      "**Primera letra → Movimiento.** E pide Movimiento hacia rápido (`67` o más); I hacia lento (`33` o menos).",
      "**Segunda letra → Energía.** S se sienta en el extremo práctico (`33` o menos); N en el imaginativo (`67` o más).",
      "**Tercera letra → Habla.** T quiere directo (`67` o más); F quiere amable (`33` o menos).",
      "**Cuarta letra → Pensamiento.** J quiere estructurado (`67` o más); P quiere flexible (`33` o menos).",
    ] },
    { type: "p", text: "Apunta a los extremos de cada eje, no a la mitad — las bandas medias son el punto débil del modelo, como explica la sección de límites. Un código pide una decisión en lugar de un ajuste: [INFP](/es/tomodachi-life-mbti/infp) corresponde tanto al [Artista](/es/tomodachi-life-personality/artist) como al [Sensible](/es/tomodachi-life-personality/softie); elige la fila cuyo grupo encaje con el temperamento buscado — contenido **Independiente** para el Artista, afectuoso **Afable** para el Sensible — y pon los controles según la firma de esa fila." },
    { type: "h2", text: "La anomalía INFP: 16 personalidades, 15 códigos" },
    {
      type: "p",
      text: "Cuenta la columna MBTI de la tabla de arriba y encontrarás solo 15 códigos únicos. Dos personalidades — el **Artista** y el **Sensible** — se mapean ambas a [INFP](/es/tomodachi-life-mbti/infp). No es una errata; es una propiedad estructural de cualquier mapeo de 16 a 16 que pase por cuatro ejes.",
    },
    {
      type: "p",
      text: "El Artista y el Sensible comparten exactamente la misma firma de controles: lento, suave, imaginativo y flexible. Lo que los separa es su grupo. El Artista vive en el Grupo Independiente, donde el modelo lee esa firma como la de un soñador reservado y de mundo interior. El Sensible vive en el Grupo Afable, donde la firma idéntica se convierte en un residente tranquilo y abiertamente cariñoso. En términos del juego puedes pensarlos como las mismas cuatro lecturas de ejes con dos vestuarios sociales distintos: uno mantiene su distancia, el otro se acerca.",
    },
    {
      type: "p",
      text: "La consecuencia práctica: el MBTI por sí solo no puede distinguir a un [Artista](/es/tomodachi-life-personality/artist) de un [Sensible](/es/tomodachi-life-personality/softie). Si planificas la lista de residentes de tu isla por códigos MBTI, recuerda que INFP es ambiguo, y consulta el grupo (o la página de la personalidad) para ver cuál de los dos es realmente un Mii concreto. Todos los demás códigos de la tabla se mapean a exactamente una personalidad.",
    },
    { type: "h2", text: "Cómo el modelo de compatibilidad usa los mismos grupos" },
    {
      type: "p",
      text: "El mapeo no se queda en poner etiquetas: la misma estructura de grupos impulsa nuestra [calculadora de compatibilidad](/es/tomodachi-life-compatibility). El modelo puntúa a una pareja en dos escalas, romance y amistad, y ambas escalas se construyen con los mismos ingredientes para que la aritmética siga siendo inspeccionable:",
    },
    {
      type: "ul",
      items: [
        "**Término zodiacal (50%).** Una matriz zodiacal simétrica de 12 × 12 aporta una puntuación base de química entre `40` y `90` para cualquier par de signos. Los pares del mismo signo y los clásicos del mismo elemento están en la parte alta de ese rango.",
        "**Término base (50%).** Un `50` plano que representa el punto de partida neutral del modelo antes de considerar la personalidad.",
        "**Modificadores de personalidad.** Los grupos complementarios (Extrovertido con Independiente, o Seguro con Afable) suman `+20` al romance. Dos Miis del mismo grupo pierden `10` de romance pero ganan `+20` de amistad. Dos Miis con **exactamente la misma** personalidad pierden otros `5` de romance y ganan otros `+10` de amistad.",
      ],
    },
    {
      type: "p",
      text: "La puntuación final es la suma de los dos términos más el modificador, redondeada y limitada a `0 – 100`. La fórmula es deliberadamente simple, y es la misma que usa nuestro [buscador de romance](/es/tomodachi-life-romance-matcher): `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. La transparencia es el punto: un número que no puedes descomponer es un número en el que no puedes confiar, y cada puntuación que muestra el sitio viene con su desglose.",
    },
    {
      type: "callout",
      text: "El bono de complementariedad de grupos codifica la observación más consistente de la comunidad sobre las relaciones de Tomodachi Life: las parejas de temperamentos opuestos (rápido con lento, directo con suave) generan la mayor cantidad de eventos románticos, mientras que las parejas del mismo grupo generan las amistades más estables. Es una decisión de modelado, no una constante del juego.",
    },
    { type: "h2", text: "Prueba el modelo tú mismo" },
    {
      type: "p",
      text: "La forma más rápida de interiorizar el pipeline es mover los controles y ver cómo cambian los resultados:",
    },
    {
      type: "ul",
      items: [
        "[Calculadora de Personalidad](/es/tomodachi-life-personality-calculator) — ajusta los cuatro controles directamente y mira la personalidad, el grupo y el código MBTI predichos.",
        "[Tabla de Personalidades](/es/tomodachi-life-personality-chart) — la referencia completa de 16 tipos con grupos codificados por colores.",
        "[Mapeo MBTI](/es/tomodachi-life-mbti) — navega desde el lado MBTI, una página por tipo con tendencias de controles y fichas de compatibilidad.",
        "[Calculadora de Compatibilidad](/es/tomodachi-life-compatibility) — empareja dos Miis y descompón las puntuaciones de romance y amistad.",
      ],
    },
    { type: "h2", text: "Límites del modelo (lee esta parte)" },
    {
      type: "p",
      text: "Nintendo nunca ha publicado el algoritmo de personalidad real del juego, así que cada afirmación de esta guía — los umbrales de las bandas, la cascada de grupos, las asignaciones de letras — es una estimación comunitaria de ingeniería inversa a partir de la observación de los jugadores, no algo extraído del código del juego. El modelo se aproxima a los resultados del juego lo bastante bien como para ser útil en la planificación de residentes, pero es un modelo, y como todos los modelos se equivoca en algo.",
    },
    {
      type: "p",
      text: "Tres advertencias que conviene tener en mente. Primero, los controles en banda media (`34 – 66`) son el punto débil del modelo: cambios pequeños cerca de los umbrales pueden voltear una banda y cambiar la personalidad predicha, así que trata los resultados al límite como provisionales. Segundo, la colisión INFP descrita arriba significa que planificar por MBTI pierde información que la planificación por personalidad conserva. Tercero, los resultados del juego también dependen de factores que este modelo no toca — eventos de la isla, historial de regalos y la semilla aleatoria detrás de las reacciones de cada Mii — así que las puntuaciones de compatibilidad son puntos de partida para historias, no garantías.",
    },
    {
      type: "callout",
      text: "Este mapeo es una interpretación hecha por fans con fines de entretenimiento y planificación, sin afiliación con Nintendo o la Myers-Briggs Company y sin el respaldo de ninguna de las dos. MBTI y Nintendo son marcas registradas de sus respectivos propietarios.",
    },
  ],
};
