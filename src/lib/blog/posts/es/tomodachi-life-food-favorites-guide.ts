/**
 * LifeSimGrid — Blog: comidas favoritas de Tomodachi Life, un método de prueba
 *
 * Basado en el propio modelo del sitio:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "Cómo encontrar la comida favorita de cada Mii: 7 pasos",
  description:
    "Protocolo repetible de 7 pasos para encontrar la comida favorita de cada Mii en Tomodachi Life: 48 comidas, 8 categorías y afinidad por grupo.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Comida", "Personalidad", "Guías"],
  blocks: [
    {
      type: "p",
      text: "Cada Mii en Tomodachi Life lleva dos asignaciones ocultas de comida: una comida favorita y una comida desagrada, ambas generadas al azar. Como el juego nunca te muestra ninguno de los dos valores, la única forma confiable de saber qué adora un Mii específico es alimentarlo y observar la reacción — y la forma más económica de hacerlo es empezar con las comidas predilectas de su grupo de personalidad. Esta guía convierte esa idea en un protocolo repetible: cómo está organizada la base de datos de 48 comidas detrás de nuestra [tabla de comidas](/es/tomodachi-life-food-chart), cómo funcionan los cinco niveles de reacción, qué predice el modelo de afinidad estimado por la comunidad para cada uno de los cuatro grupos de personalidad, y cómo un ciclo de pruebas de siete pasos convierte las conjeturas en una búsqueda registrada y reproducible. Cada número de esta guía proviene de los propios archivos de datos del sitio, así que puedes reproducir todo el método a mano.",
    },
    { type: "h2", text: "Por qué las comidas favoritas importan en tu isla" },
    {
      type: "p",
      text: "Alimentar a un Mii con su comida favorita produce la reacción positiva más fuerte del sistema de comidas del juego, y merece la pena planificar en torno a ella. Las wikis comunitarias y los reportes acumulados de jugadores describen la escena de la comida favorita como una de las animaciones de alegría más dramáticas de la isla: el Mii celebra, su estado de ánimo da un salto visible, y un residente satisfecho tiende a aparecer sonriendo en los eventos sociales que impulsan las amistades, el romance y las propuestas. Alimentar con la comida desagrada hace lo contrario — una reacción claramente negativa. Conocer ambas asignaciones ocultas, por lo tanto, cumple dos funciones a la vez: te da una palanca confiable de felicidad diaria, y te evita servir por accidente el único alimento que le arruina el ánimo.",
    },
    {
      type: "p",
      text: "Hay una segunda razón, menos obvia, para cazar favoritas: probar comidas es una de las pocas actividades de la isla que produce información limpia por Mii. Cada alimentación es un experimento controlado — un residente, una comida, una reacción observable — y el vocabulario de reacciones es lo bastante pequeño para registrarlo con un solo toque. Una vez confirmada y anotada una favorita, las decisiones posteriores sobre ese residente se vuelven más fáciles: quién recibe lo bueno en tus rondas diarias, qué reacciones esperar al planificar la [compatibilidad](/es/tomodachi-life-compatibility), y qué comidas no deben llegar a la mesa. El resto de esta guía trata de abaratar ese experimento — menos alimentaciones por favorita confirmada y cero notas perdidas.",
    },
    { type: "h2", text: "El espacio de búsqueda: 8 categorías, 48 comidas, 16 favoritas comunes" },
    {
      type: "p",
      text: "Tu espacio de búsqueda son exactamente 48 comidas organizadas en 8 categorías — Bebidas, Postres, Dulces, Snacks, Platos principales, Fruta, Verduras y Otros — y conocer su forma es lo que hace posible una prueba eficiente. La base de datos es la que está detrás de la [tabla de comidas](/es/tomodachi-life-food-chart). Cada entrada lleva tres propiedades que importan para el protocolo: un `id` estable que sirve de clave para el rastreador, una categoría, y una marca `commonFavorite` que señala los 16 artículos que con más frecuencia acaban siendo favoritas. El desglose completo:",
    },
    {
      type: "table",
      headers: ["Categoría", "Comidas", "Favoritas comunes", "Artículos de ejemplo"],
      rows: [
        ["Bebidas", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Postres", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Dulces", "5", "2", "Chocolate, Candy, Licorice"],
        ["Snacks", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Platos principales", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Fruta", "5", "1", "Apple, Banana, Melon"],
        ["Verduras", "4", "0", "Carrot, Broccoli, Salad"],
        ["Otros", "2", "0", "Boba Tea, Sundae"],
        ["Total", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Dos detalles estructurales saltan a la vista en esa tabla. Primero, las categorías pesadas son `main` (10 artículos) y `drink` (9 artículos), así que una pasada de fuerza bruta a ciegas quema allí la mayoría de sus alimentaciones — un protocolo que puede aplazar una categoría pesada ahorra días reales de juego. Segundo, los 16 artículos `commonFavorite` se agrupan entre los favoritos clásicos del público: Cola, Juice y Soda entre las Bebidas; Cake, Ice Cream, Donut y Cookie entre los Postres; Pizza, Hamburger, Sushi y Curry entre los Platos principales. Esas marcas sirven como buenas sondas tempranas incluso antes de que la personalidad entre en escena. Los dos artículos `other` — Boba Tea y Sundae — son el extremo de nicho de la lista, y justo donde a un grupo de personalidad le gusta mirar primero.",
    },
    { type: "h2", text: "Cómo funcionan las reacciones: cinco niveles y un par oculto" },
    {
      type: "p",
      text: "Cada alimentación se resuelve en uno de cinco niveles de reacción — `love`, `like`, `neutral`, `dislike` o `hate` — y cada nivel es una animación distinta y observable en el juego. La escala de cinco niveles también es el vocabulario que usa nuestro rastreador: cada fila de comida lleva cinco botones compactos de registro, uno por nivel (♥ para La adora, ▲ para Le gusta, – para Neutral, ▼ para No le gusta, ✕ para La odia), así que registrar un resultado toma un solo toque. La escala es deliberadamente gruesa — lo bastante fina para comparar dos comidas positivas entre sí, lo bastante gruesa para que nunca dudes de qué nivel acabas de ver.",
    },
    {
      type: "p",
      text: "Bajo el capó, el modelo del sitio adjunta una puntuación de afinidad `0–100` a cada comida para cada grupo de personalidad, y una regla fija de bandas convierte una puntuación en un nivel predicho: `90` o más se mapea a `love`, `75–89` a `like`, `40–74` a `neutral`, `25–39` a `dislike`, y cualquier valor por debajo de `25` a `hate`. Esas bandas solo alimentan la predicción. Una vez confirmada la favorita real de un Mii, el modelo cortocircuita esa regla: la comida favorita se fuerza a `love` y la comida desagrada a `hate`, sin importar lo que diga la heurística. Esa anulación refleja el comportamiento real del juego — la asignación oculta siempre vence a la personalidad, que es precisamente la razón de que existan las pruebas.",
    },
    { type: "h2", text: "Qué predice el modelo para cada grupo de personalidad" },
    {
      type: "p",
      text: "Los cuatro grupos de personalidad — **Extrovertido**, **Seguro**, **Independiente** y **Afable** — reciben cada uno un ranking distinto de las ocho categorías, y ese ranking es tu orden de prueba. La matriz de abajo es la línea base completa de estimación comunitaria tomada del archivo de datos del sitio; lee una columna de arriba a abajo y verás el menú sugerido de ese grupo:",
    },
    {
      type: "table",
      headers: ["Categoría", "Extrovertido", "Seguro", "Independiente", "Afable"],
      rows: [
        ["Bebidas", "90", "70", "60", "75"],
        ["Postres", "85", "65", "70", "80"],
        ["Dulces", "95", "55", "60", "75"],
        ["Snacks", "80", "75", "70", "85"],
        ["Platos principales", "65", "90", "60", "90"],
        ["Fruta", "75", "70", "75", "80"],
        ["Verduras", "60", "65", "80", "85"],
        ["Otros", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Emergen cuatro menús claros. Los Miis **Extrovertidos** — Líder, Animador, Innovador y Optimista — alcanzan su punto máximo en los Dulces (`95`), las Bebidas (`90`) y los Postres (`85`): un diente dulce enérgico y orientado a la fiesta. Los Miis **Seguros** — Diseñador, Aventurero, Emprendedor, Encantador — alcanzan su punto máximo en los Platos principales (`90`), el extremo de la lista orientado al estatus y a los restaurantes. Los Miis **Independientes** — Artista, Espíritu libre, Pensador, Lobo solitario — son el caso interesante: sus puntuaciones más altas corresponden a los artículos de nicho `other` (`85`) y a las Verduras (`80`), que es precisamente la razón de que Boba Tea y Sundae tengan un lugar en la base de datos. Los Miis **Afables** — Soñador, Cariñoso, Sensible, Compañero — prefieren el extremo casero: Platos principales (`90`), Snacks (`85`) y Verduras (`85`). La vista previa de reacciones de la tabla toma una muestra de un residente por grupo — un Líder, un Emprendedor, un Pensador y un Compañero — para que puedas comparar los cuatro menús lado a lado. Para saber cómo acaba un Mii en uno de estos grupos, consulta nuestra [guía de mapeo MBTI](/es/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Una propiedad honesta de la matriz: cada celda se sitúa entre `55` y `95`, lo que significa que la heurística, por sí sola, solo puede predecir `love`, `like` o `neutral`. Los dos niveles negativos nunca son producidos por la afinidad de personalidad. En la práctica, los negativos provienen de la segunda asignación oculta — la comida desagrada, que es exactamente tan aleatoria como la favorita. La personalidad te dice dónde empezar a buscar el lado positivo; nada te dice dónde se esconde el lado negativo excepto las pruebas.",
    },
    { type: "h2", text: "El protocolo de pruebas: siete pasos hacia una favorita confirmada" },
    {
      type: "p",
      text: "El protocolo encuentra una favorita con tan pocas alimentaciones como sea posible probando primero las categorías más fuertes del grupo, registrando cada resultado y podando categorías a medida que llega la evidencia. Puedes ejecutarlo por completo dentro del [rastreador de la tabla de comidas](/es/tomodachi-life-food-chart), que recuerda tu lista de verificación entre sesiones.",
    },
    {
      type: "ol",
      items: [
        "**Identifica el grupo de personalidad del Mii.** Busca al residente en la [tabla de personalidades](/es/tomodachi-life-personality-chart) o en el [mapeo MBTI](/es/tomodachi-life-mbti) y anota el grupo: Extrovertido, Seguro, Independiente o Afable. Para la comida solo importa el grupo — el subtipo (Optimista frente a Innovador, por ejemplo) no cambia la matriz de afinidad.",
        "**Extrae los 5 mejores candidatos iniciales del grupo.** El panel de recomendaciones de la tabla ordena las 48 comidas por la afinidad del grupo seleccionado y muestra las cinco más altas. Para un Mii Extrovertido son los cinco artículos de Dulces con `95`; para un Mii Afable el panel comienza con los Platos principales a `90`. Esas cinco comidas son tu primera sesión.",
        "**Alimenta un candidato a la vez, empezando por el de mayor afinidad.** Una comida por alimentación mantiene limpia la evidencia — los regalos en ráfaga dificultan saber qué artículo causó qué reacción. Observa la animación, califícala en la escala de cinco niveles y solo entonces pasa al siguiente candidato.",
        "**Registra cada resultado de inmediato.** Toca el botón de reacción correspondiente en la fila de la comida. El rastreador persiste la lista de verificación en `localStorage` bajo la clave `lifesimgrid-food-tracker`, así que las comidas probadas, sus reacciones registradas y el contador de progreso sobreviven a recargas de página y reinicios del navegador — sin cuenta, sin sincronización, sin notas perdidas.",
        "**Confirma la ganadora en el momento en que veas la reacción más fuerte.** Marca esa comida como `love` en el rastreador y fíjala como favorita del Mii en el selector de la parte superior de la tabla. A partir de entonces la tabla fuerza `love` para esa comida sin importar lo que predijera la heurística, y la favorita queda resuelta.",
        "**Si una categoría sale plana, elimínala y pasa a la siguiente más fuerte del grupo.** Una racha de reacciones `neutral` a lo largo de los artículos de una categoría es evidencia de que la favorita vive en otra parte. Conserva cualquier resultado `like` como alternativa — una comida que le gusta no es la favorita, pero sigue siendo una elección diaria confiable. Recorre la matriz de afinidad categoría por categoría hasta que aparezca la ganadora.",
        "**Registra la comida desagrada cuando se presente la oportunidad, y reinicia entre Miis.** La comida desagrada aflora como la reacción negativa más fuerte durante las pruebas ordinarias — regístrala de la misma manera y fíjala en el selector para que la tabla fuerce `hate` para ella. Cuando cambies de residente, borra el rastreador con un botón (o usa un perfil de navegador separado), porque la lista de verificación se guarda por navegador, no por Mii.",
      ],
    },
    {
      type: "p",
      text: "El límite absoluto del protocolo es 48 alimentaciones — toda la base de datos. El orden por grupo existe para que casi nunca te acerques a él. La cobertura completa de las dos categorías líderes de un grupo cuesta como máximo 15 alimentaciones (los Platos principales y los Snacks reúnen 15 artículos combinados para Miis Afables y Seguros) y tan solo 6 para un Mii Independiente, cuyas categorías preferidas, `other` y Verduras, reúnen solo 6 artículos entre ambas. Esas cifras son puntos de partida, no garantías — la asignación oculta es aleatoria, y un residente con mala suerte puede llevarte más lejos dentro de la matriz.",
    },
    { type: "h2", text: "Ejemplo práctico: recorriendo el ciclo con un Mii Extrovertido" },
    {
      type: "p",
      text: "A un Mii Extrovertido — digamos un Innovador — se le debe sondear primero con Dulces, y el panel de recomendaciones está de acuerdo: los cinco artículos de Dulces con afinidad `95`, con las nueve Bebidas esperando en `90`. Aquí hay una sesión realista:",
    },
    {
      type: "ul",
      items: [
        "Alimentaciones 1–5 — Chocolate, Gum, Caramel, Licorice, Candy: Chocolate obtiene un `like` claro, Candy otro `like`, el resto `neutral`. Ninguna reacción de nivel superior, así que los Dulces quedan descartados — y como la primera sesión cubre de golpe toda la categoría de Dulces, cinco alimentaciones bastan para eliminarla por completo.",
        "Alimentaciones 6–8 — Cola, Juice, Soda: todas `neutral`. Tres bebidas favoritas comunes seguidas con reacción plana son evidencia débil contra toda la categoría de Bebidas de 9 artículos, así que el jugador aparca las seis bebidas no probadas (Coffee, Tea, Milk, Water, Beer, Sake) y salta a la siguiente categoría en lugar de desgastarse probándolas.",
        "Alimentaciones 9–10 — Cake, Ice Cream: Cake es `neutral`, e Ice Cream produce la reacción positiva más fuerte, imposible de confundir. Esa es la favorita.",
        "Confirmación — Ice Cream entra en el selector de favoritas, la tabla ahora fuerza `love` para ella, y el contador de progreso marca 10 de 48 comidas probadas — alrededor del 21% de la base de datos para una ganadora confirmada.",
      ],
    },
    {
      type: "p",
      text: "Diez alimentaciones produjeron una favorita confirmada, una categoría totalmente eliminada, una categoría aparcada, y dos comidas alternativas registradas que el jugador aún puede servir en días ordinarios. Observa lo que el protocolo nunca tocó: la categoría `main` de 10 artículos y la categoría `vegetable` de 4 artículos, las dos afinidades más débiles de un Mii Extrovertido (`65` y `60`). La comida desagrada sigue siendo desconocida — es tan aleatoria como la favorita — así que durante los días normales de la isla el jugador está atento a una reacción negativa fuerte, y la fija como `hate` en el selector cada vez que aparece. Ejecuta el mismo ciclo con un Mii Afable y solo cambia el punto de entrada: el panel comenzaría con Platos principales y Snacks en lugar de Dulces.",
    },
    { type: "h2", text: "Por qué las favoritas son aleatorias — y por qué las guías de respuesta fija fracasan" },
    {
      type: "p",
      text: "Cualquier guía que prometa una comida favorita fija para una personalidad dada está describiendo una partida guardada, no el juego. El archivo de datos detrás de nuestra tabla declara la situación sin rodeos: Tomodachi Life no publica una matriz oficial de reacciones a comidas, y cada Mii recibe una comida favorita y una comida desagrada, ambas generadas al azar. La aleatorización es por residente, no por personalidad — dos Miis con la misma personalidad, el mismo nombre e incluso los mismos controles deslizantes del editor pueden tener distintas favoritas ocultas.",
    },
    {
      type: "p",
      text: "Ese único hecho redefine qué puede ser una guía útil. Una tabla de consulta no puede funcionar, porque la respuesta no es función de nada que puedas leer del Mii. Lo que sí puede funcionar es una estrategia de búsqueda: un ordenamiento que pone primero a los candidatos estadísticamente más probables, un sistema de registro que nunca pierde un resultado, y una regla de eliminación que poda categorías a medida que llega la evidencia. Eso es exactamente lo que proporciona la matriz de afinidad de cuatro grupos — puntos de partida, no respuestas — y es la razón de que nuestra [tabla de comidas](/es/tomodachi-life-food-chart) incluya un rastreador persistente en lugar de una tabla de supuestas favoritas. Trata cualquier sitio que prometa favoritas fijas por personalidad como tratarías un horóscopo: entretenido, infalsificable y de ninguna ayuda para tu isla real.",
    },
    { type: "h2", text: "Límites del modelo (lee esta parte)" },
    {
      type: "p",
      text: "Los números de afinidad de esta guía son una estimación de la comunidad, no datos extraídos del juego — Nintendo nunca ha publicado el funcionamiento interno del sistema de comidas. Los presets están ajustados explícitamente para que cada grupo muestre un ranking propio entre las categorías, porque ese ranking diferenciado es lo que hace posible una recomendación de «qué comida probar primero». Ese ajuste es una decisión de modelado. El modelo aproxima la observación de la comunidad lo bastante bien para ser útil al ordenar tus pruebas y, como todos los modelos, se equivoca en algo.",
    },
    {
      type: "p",
      text: "Tres advertencias que vale la pena tener en mente. Primera, la regla de bandas significa que el modelo solo puede predecir hasta `neutral` — cada valor predefinido se sitúa en `55` o más alto — así que las reacciones negativas siempre son sorpresas provenientes de la asignación oculta de la comida desagrada, nunca pronósticos. Segunda, la base de datos de 48 artículos es un subconjunto curado de comidas observadas a lo largo de los títulos de Tomodachi Life, no una lista completa de comidas del juego; si una alimentación produce una reacción que no puedes encontrar en la tabla, registra el equivalente más cercano y continúa. Tercera, el rastreador guarda una sola lista de verificación por navegador bajo una clave de `localStorage`, así que trabaja con un solo Mii activo a la vez — bórrala entre residentes, o mantén un perfil de navegador por isleño si cazas varios en paralelo. Nada de esto cambia el objetivo central: un registro por Mii, basado en evidencia, de lo que cada residente adora en realidad. El modelo decide dónde empiezas; tus alimentaciones deciden en qué crees.",
    },
    { type: "h2", text: "Prueba el protocolo por tu cuenta" },
    {
      type: "ul",
      items: [
        "[Tabla de comidas y rastreador](/es/tomodachi-life-food-chart) — la base de datos completa de 48 comidas, el panel de recomendaciones por grupo y la lista de verificación persistente de comidas probadas.",
        "[Tabla de personalidades](/es/tomodachi-life-personality-chart) — la referencia de 16 tipos con grupos codificados por color, para el paso 1 del protocolo.",
        "[Mapeo MBTI](/es/tomodachi-life-mbti) — explora los residentes por código de cuatro letras si así llevas tu lista.",
        "[Calculadora de compatibilidad](/es/tomodachi-life-compatibility) — empareja dos residentes y descompón las puntuaciones de romance y amistad una vez registradas sus favoritas.",
      ],
    },
    {
      type: "callout",
      text: "MBTI y Nintendo son marcas registradas de sus respectivos propietarios. Esta guía de comidas es una interpretación hecha por fans con fines de entretenimiento y planificación, y no está afiliada ni respaldada por Nintendo ni por The Myers-Briggs Company.",
    },
  ],
};
