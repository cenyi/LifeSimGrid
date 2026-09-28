/**
 * LifeSimGrid — Artículo de blog (es): Cómo sintetiza Tomodachi Voice Lab las voces de 8 bits
 *
 * Traducción al español de posts/tomodachi-life-voice-synthesis-guide.ts,
 * basada en la implementación del propio sitio:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Cómo sintetiza Tomodachi Voice Lab las voces de 8 bits",
  description:
    "La cadena de la Web Audio API detrás de Tomodachi Voice Lab: osciladores, formas de onda, 5 presets de voz y cómo cada parámetro moldea el sonido.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Síntesis de voz", "Guías"],
  blocks: [
    {
      type: "p",
      text: "Tomodachi Voice Lab construye sus voces Mii de 8 bits a partir de un grafo de la Web Audio API con tres nodos: un `OscillatorNode` genera el tono, un `BiquadFilterNode` lo suaviza y un `GainNode` moldea su envolvente de volumen. Esta guía disecciona esa cadena de procesamiento exactamente como corre en [Tomodachi Voice Lab](/es/tomodachi-voice-lab) — cada constante, cada preset y cada decisión de programación — para que puedas comprender, reproducir o ampliar la estética de habla en beeps que evoca Tomodachi Life: Living the Dream. Cada número que aparece abajo está citado del código fuente del sitio, y donde un valor es una estimación de la comunidad en lugar de algo documentado por Nintendo, el texto lo dice.",
    },
    { type: "h2", text: "Por qué las voces de Tomodachi hablan en beeps" },
    {
      type: "p",
      text: "La peculiaridad distintiva del audio de Tomodachi Life es el habla en beeps: en lugar de diálogos grabados, cada Mii vocaliza en tonos sintetizados cortos que siguen el ritmo de una frase sin llegar a formar palabras reales. El enfoque se remonta a los orígenes portátiles de la serie, donde el tamaño del cartucho y el hardware de sonido hacían inviable el doblaje completo, y sobrevivió hasta Tomodachi Life: Living the Dream en Switch porque los beeps se convirtieron en parte de la identidad de la serie. El resultado se percibe como habla porque copia la prosodia del habla — el movimiento del tono, el tiempo de las sílabas, las pausas — mientras se mantiene deliberadamente no léxico.",
    },
    {
      type: "p",
      text: "Nintendo nunca ha publicado el método de síntesis real del juego, así que cualquier reconstrucción en el navegador es, por definición, una estimación de la comunidad. Lo que el laboratorio persigue es la estética y no una reproducción exacta al bit, y tres propiedades hacen la mayor parte del trabajo. Primero, los tonos son cortos: las envolventes abren y cierran en decenas de milisegundos, así que cada sílaba empieza y termina de forma limpia. Segundo, la forma de onda es rica en armónicos: un timbre zumbante se percibe mucho más fácilmente como «chiptune» que un tono puro. Tercero, el tono nunca es estático: pequeños desplazamientos de frecuencia por sílaba imitan el contorno del habla natural. El resto de esta guía muestra cómo cada una de esas propiedades se corresponde con un mecanismo concreto de la Web Audio API.",
    },
    { type: "h2", text: "La cadena de síntesis, nodo por nodo" },
    {
      type: "p",
      text: "Cada sonido que produce el laboratorio pasa exactamente por tres nodos de procesamiento entre el oscilador y tus altavoces. Se crea un `AudioContext` nuevo por cada reproducción — el laboratorio nunca mantiene vivo un grafo de audio global — y cada sílaba programa dentro de él su propio conjunto de nodos:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        solo en el preset Anciano:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "El `OscillatorNode` es la fuente del sonido. Su `type` proviene del preset seleccionado (`sawtooth` para cuatro de los cinco presets, `square` para el robot), y su `frequency` se establece desde el control deslizante de tono. Como un oscilador es un generador de forma de onda puro, no tiene controles de timbre propios — todo lo que hace que un preset suene distinto de otro es la programación de parámetros posterior.",
    },
    {
      type: "p",
      text: "El `BiquadFilterNode` siempre está configurado como filtro `lowpass`, con su frecuencia de corte tomada del valor `filterFreq` del preset (`900 – 2500 Hz` según el preset). Un filtro paso bajo atenúa los armónicos por encima de su corte, y eso es lo que convierte el zumbido a plena potencia de un diente de sierra crudo en algo parecido a una voz: los presets más oscuros (Anciano a `900 Hz`) conservan solo los armónicos graves, mientras que los presets más brillantes (Niño a `2500 Hz`) dejan pasar el brillo que hace que una voz se perciba pequeña y joven.",
    },
    {
      type: "p",
      text: "El `GainNode` es donde vive la envolvente, programada con cuatro puntos de automatización. La ganancia empieza en `0` en el instante inicial de la sílaba, sube linealmente hasta el valor objetivo del preset (`0.2 – 0.3`) durante el tiempo de ataque, se mantiene en ese valor hasta un tiempo de liberación antes del final y luego baja linealmente de vuelta a `0`. Las llamadas son `setValueAtTime()` para los anclajes y `linearRampToValueAtTime()` para las rampas — una envolvente simple de ataque/mantenimiento/liberación sin curvas exponenciales, lo que mantiene el sonido característicamente abrupto de una manera que encaja con la estética de 8 bits.",
    },
    {
      type: "p",
      text: "Existe un par de nodos opcional, el cuarto: el vibrato. Cuando un preset lo activa, un segundo `OscillatorNode` que actúa como LFO (oscilador de baja frecuencia) corre a la `vibratoRate` del preset y alimenta un `GainNode` ajustado a la `vibratoDepth`, que está conectado al parámetro `frequency` del oscilador principal. Se trata de modulación de frecuencia clásica — en el preset Anciano, un LFO de `5 Hz` hace oscilar el tono `±15 Hz`, produciendo la calidad temblorosa asociada con las voces envejecidas. Solo el preset Anciano lo activa; los otros cuatro dejan el vibrato completamente desactivado.",
    },
    { type: "h2", text: "Cómo suena cada forma de onda (y cuándo elegirla)" },
    {
      type: "p",
      text: "La elección de la forma de onda es la decisión de timbre más importante de toda la cadena de procesamiento, porque determina el contenido armónico que el filtro y la envolvente moldean después. El `OscillatorNode` de la Web Audio API ofrece cuatro tipos estándar, y cada uno tiene un carácter distinto:",
    },
    {
      type: "table",
      headers: ["Forma de onda", "Contenido armónico", "Carácter", "Usado por los presets"],
      rows: [
        ["`sine`", "Solo la fundamental", "Puro, parecido a una flauta, cero zumbido", "Ninguno (disponible vía `OscillatorType`)"],
        ["`square`", "Armónicos impares, fuertes", "Hueco, canal de melodía clásico de la NES", "Robot"],
        ["`sawtooth`", "Todos los armónicos, decrecientes", "Zumbante, tipo lengüeta, lo más cercano a la riqueza vocal", "Hombre adulto, Mujer adulta, Anciano, Niño"],
        ["`triangle`", "Pocos armónicos impares, débiles", "Suave, melodioso, ligeramente apagado", "Ninguno (disponible vía `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "Los presets del laboratorio usan solo dos de las cuatro: el `sawtooth` aporta las cuatro voces orgánicas y el `square` aporta el robot. Esa división es deliberada. Un diente de sierra contiene energía en cada armónico, lo que tras el filtrado paso bajo deja un núcleo denso y parecido a una voz — la razón por la que aproxima tonos cantados o hablados mejor que cualquier otra forma de onda básica. Una onda cuadrada conserva solo armónicos impares con más energía en la parte alta, lo que da la calidad hueca, nasal e inconfundiblemente electrónica que busca el preset Robot. `Sine` y `triangle` no los usa ningún preset actual, pero siguen siendo cambios de una sola línea a través del mismo campo `OscillatorType`: la onda sinusoidal sirve para efectos de sonido puros como campanillas, y la onda triangular para bips suaves de fondo donde el diente de sierra sería demasiado agresivo.",
    },
    { type: "h2", text: "Los cinco presets de voz, descodificados" },
    {
      type: "p",
      text: "Los cinco presets son cinco paquetes de parámetros sobre el mismo grafo de tres nodos, y sus diferencias se pueden enumerar por completo. Aquí está la tabla completa, citada directamente de la constante `VOICE_PRESETS` en el código fuente:",
    },
    {
      type: "table",
      headers: ["Preset", "Forma de onda", "Frecuencia base", "Corte de paso bajo", "Gain", "Vibrato", "Attack", "Release"],
      rows: [
        ["Hombre adulto", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Apagado", "`0.02 s`", "`0.05 s`"],
        ["Mujer adulta", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Apagado", "`0.02 s`", "`0.04 s`"],
        ["Anciano", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Niño", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Apagado", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Apagado", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "**Hombre adulto** ancla el conjunto en una frecuencia base de `180 Hz`, situada en el extremo grave del rango típico de habla de un hombre adulto, con un paso bajo de `1200 Hz` que doma el zumbido del diente de sierra hasta algo redondeado. **Mujer adulta** casi duplica la base a `350 Hz`, abre el filtro a `1800 Hz` para un tono más brillante y recorta tanto la ganancia (`0.25`) como la liberación (`0.04 s`) para una articulación algo más nítida.",
    },
    {
      type: "p",
      text: "**Anciano** es el preset más procesado: el registro más grave (`120 Hz`), el filtro más oscuro (`900 Hz`), el único vibrato (LFO de `5 Hz` con profundidad de `±15 Hz`) y la envolvente más lenta (`0.04 s` de ataque, `0.08 s` de liberación). Esos dos últimos valores importan tanto como el tono — el ataque lento suaviza el inicio de cada sílaba, y la liberación larga deja que los tonos se desborden ligeramente hacia el siguiente, evocando la articulación menos precisa que el preset busca.",
    },
    {
      type: "p",
      text: "**Niño** invierte casi todas las decisiones del Anciano: la base más aguda (`600 Hz`), el filtro más brillante (`2500 Hz`), la ganancia más baja (`0.20`) y la envolvente más rápida (`0.01 s` de ataque, `0.03 s` de liberación). Las envolventes rápidas sobre tonos agudos son la receta clásica para dar voz a criaturas pequeñas — cada sílaba aterriza como un gorjeo veloz. **Robot** es el caso aparte en dos ejes: es la única onda `square` y el único preset con ataque y liberación en cero, lo que significa que la ganancia se enciende y se apaga al instante. Esos bordes abruptos producen la calidad dura, entrecortada y mecánica que el preset quiere — sin rampa no hay suavidad, por construcción.",
    },
    { type: "h2", text: "Cómo el tono y la velocidad manejan realmente el oscilador" },
    {
      type: "p",
      text: "Dos controles deslizantes gobiernan el grafo en tiempo real: el tono, que abarca `100 – 800 Hz` con un valor predeterminado de `300 Hz`, y la velocidad, que abarca `0.5x – 2.0x` con un valor predeterminado de `1.0x`. Cada preset también declara su propio `baseFreq` canónico (el centro de referencia listado en la tabla anterior), que documenta dónde se diseñó para situarse ese tipo de voz.",
    },
    {
      type: "p",
      text: "El tono fija la frecuencia del oscilador directamente, con una sola barrera de protección: en el preset Niño la frecuencia reproducida es `Math.max(pitch, 500)`, así que arrastrar el control por debajo de `500 Hz` en modo Niño no hace nada — el oscilador nunca baja de ese piso. Este límite protege el carácter del preset, ya que una voz de niño a `150 Hz` simplemente se percibiría como un hombre adulto en voz baja.",
    },
    {
      type: "p",
      text: "La velocidad controla el tiempo, no la frecuencia. Una sola pulsación del botón de reproducción produce un beep que dura `0.5 / speed` segundos — `1.0 s` a `0.5x`, `0.5 s` a `1.0x` y `0.25 s` a `2.0x`. El mismo divisor se aplica a cada constante de tiempo en el modo de texto, así que una voz a `2.0x` es genuinamente dos veces más rápida de principio a fin en lugar de estar remuestreada, lo cual habría desplazado su tono. Tras la reproducción, la interfaz restablece su estado de reproducción después de `500 / speed + 50` milisegundos: la duración del beep más un margen de `50 ms`.",
    },
    { type: "h2", text: "Del texto al habla, un beep por carácter" },
    {
      type: "p",
      text: "El modo de texto a voz del laboratorio no es un motor de voz — es la misma cadena de oscilador de tres nodos programada una vez por carácter. Cuando escribes hasta `100` caracteres y pulsas hablar, la entrada se divide en caracteres individuales, y cada carácter que no es un espacio se convierte en un beep de sílaba programado con un desplazamiento de tono derivado de su código de carácter. Las constantes de tiempo, todas divididas por la velocidad:",
    },
    {
      type: "ul",
      items: [
        "**Tono por carácter** — `0.08 / speed` segundos por carácter (`0.08 s` a `1.0x`).",
        "**Intervalo entre caracteres** — `0.03 / speed` segundos entre caracteres consecutivos.",
        "**Intervalo entre palabras** — un espacio inserta `0.12 / speed` segundos de silencio, aproximadamente 1,5 longitudes de carácter.",
        "**Pausa de frase** — cada 5.º carácter (`i % 5 === 4`) añade una pausa extra de `gap × 2`, lo que le da a la salida una cadencia en lugar de un flujo plano.",
        "**Anticipación** — la programación empieza en `currentTime + 0.05` segundos para que el grafo de audio esté listo antes del primer tono.",
      ],
    },
    {
      type: "p",
      text: "La variación de tono es la parte ingeniosa. El desplazamiento de frecuencia de cada carácter se calcula como `((charCode % 20) - 10) × 3`, lo que produce una dispersión determinista entre `-30 Hz` y `+27 Hz` alrededor del tono base. Que sea determinista importa: la misma palabra produce siempre el mismo contorno melódico, así que una frase dada se vuelve reconocible igual que la voz de un Mii es reconocible. Como los desplazamientos provienen de códigos de carácter y no de la fonética, la salida sigue de cerca el ritmo del texto mientras permanece como jerigonza no léxica — que es precisamente el efecto de habla en beeps que el laboratorio intenta aproximar.",
    },
    { type: "h2", text: "Diseñar una voz para cada grupo de personalidad" },
    {
      type: "p",
      text: "Una voz de personalidad convincente es sobre todo una decisión de rango de tono: elige el preset que la tabla de referencia del sitio asigna al grupo de personalidad de tu Mii y luego deja el control deslizante de tono dentro del rango recomendado. La correspondencia completa que usa la [tabla de referencia del Laboratorio de Voz](/es/tomodachi-voice-lab):",
    },
    {
      type: "table",
      headers: ["Grupo de personalidad", "Tipo de ejemplo", "MBTI", "Ajuste recomendado", "Rango de tono"],
      rows: [
        ["Extrovertido", "Líder", "ESTJ", "Hombre adulto", "`180 – 250 Hz`"],
        ["Seguro de sí mismo", "Diseñador", "INTJ", "Hombre adulto", "`150 – 200 Hz`"],
        ["Independiente", "Artista", "INFP", "Mujer adulta", "`280 – 380 Hz`"],
        ["Tranquilo", "Soñador", "INFJ", "Anciano", "`120 – 180 Hz`"],
        ["Personajes infantiles", "Any", "Any", "Niño", "`500 – 700 Hz`"],
        ["Personajes robot/IA", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Ten en cuenta que la tabla mapea grupos, no las 16 personalidades completas — los cuatro grupos de personalidad de nuestro [mapeo MBTI](/es/tomodachi-life-mbti) reciben cada uno una silueta de voz representativa, y las personalidades individuales se expresan según dónde dentro del rango colocas el control y a qué velocidad manejas el control de velocidad. La receta paso a paso:",
    },
    {
      type: "ol",
      items: [
        "**Elige el preset según el grupo.** Los Miis Extrovertidos y Seguros de sí mismos llevan Hombre adulto; los Miis Independientes llevan Mujer adulta; los Miis Tranquilos llevan Anciano, cuyo vibrato de `5 Hz` aporta la cualidad relajada y sin prisa por la que se conoce al grupo. El grupo de un Mii proviene de sus cuatro controles deslizantes de personalidad — consulta la [tabla de personalidades](/es/tomodachi-life-personality-chart) si aún no la conoces.",
        "**Coloca el control de tono dentro del rango del grupo.** Para un Diseñador Seguro de sí mismo eso significa `150 – 200 Hz`; deslizar hacia `150 Hz` se percibe más imponente, hacia `200 Hz` más enérgico. El piso de `500 Hz` del preset Niño hace que el rango `500 – 700 Hz` se aplique por sí solo.",
        "**Elige la velocidad según el estilo de habla.** Los tipos Animador de habla rápida justifican `1.4x – 2.0x`; un Soñador somnoliento se sitúa de forma natural en `0.5x – 0.8x`. La velocidad cambia solo la duración, así que nunca desafina la voz que elegiste en el paso 2.",
        "**Prueba con una frase corta.** Escribe `20 – 30` caracteres en el campo de texto y escucha la pausa de frase cada 5.º carácter — si la cadencia se siente incorrecta para la personalidad, ajusta la velocidad antes de tocar el tono.",
        "**Itera con tu historial.** Cada reproducción — preset, tono, velocidad y hasta `100` caracteres de texto — se guarda en un panel de historial `IndexedDB` local dentro de la herramienta, así que puedes hacer una comparación A/B de dos ajustes sin anotarlos. Nada sale del navegador.",
      ],
    },
    {
      type: "p",
      text: "Las filas de niño y robot quedan intencionadamente fuera del sistema de personalidades: cualquier Mii puede recibir cualquiera de esas voces, y por eso su columna MBTI dice Any. La envolvente de duración cero del robot lo hace tolerante al tempo — a cualquier velocidad conserva la misma rigidez entrecortada, así que es la única voz en la que la velocidad es puramente un control cómico.",
    },
    { type: "h2", text: "Por qué no hay un fallback de la Web Speech API" },
    {
      type: "p",
      text: "El laboratorio evita deliberadamente la Web Speech API del navegador — no hay ninguna llamada a `speechSynthesis` en todo su código, y el modo de texto a voz es pura programación de oscilador. Es una decisión de diseño con una justificación defendible y un compromiso real, y vale la pena explicar ambas.",
    },
    {
      type: "p",
      text: "La justificación: `speechSynthesis` produce voces humanas naturales, que es exactamente lo que un laboratorio de voces de 8 bits no quiere. También delega la selección de voz al sistema operativo, así que el mismo texto puede sonar distinto entre navegadores y dispositivos, y varios navegadores cargan las voces de forma diferida con una latencia notable en la primera emisión. El enfoque de un beep por carácter mantiene cada sonido dentro del mismo grafo de tres nodos que usa el modo de beep único, garantiza un timbre idéntico en todas partes donde funciona la Web Audio API y arranca al instante porque no hay nada que cargar.",
    },
    {
      type: "p",
      text: "El compromiso: la salida no es habla inteligible. Sigue el ritmo y el contorno del texto pero no produce palabras reconocibles, así que evoca la cadencia del habla en beeps de Tomodachi Life en lugar de su comprensibilidad — y la jerigonza del juego tampoco es comprensible, que discutiblemente es la idea. Detener la reproducción es igual de contundente y eficaz: el laboratorio cierra el `AudioContext` completo vía `close()`, lo que mata inmediatamente cada nodo programado en lugar de hacer un fundido.",
    },
    { type: "h2", text: "Limitaciones, declaradas con honestidad" },
    {
      type: "p",
      text: "Tres limitaciones delimitan lo que este sintetizador puede afirmar con honestidad. Primero, aproxima una estética, no el motor del juego: Nintendo nunca ha documentado cómo genera Tomodachi Life sus voces, así que los valores de los presets que aparecen aquí son estimaciones de la comunidad afinadas para evocar el sonido de la serie, no constantes extraídas. Las voces recuerdan a las del juego, no son réplicas de ellas.",
    },
    {
      type: "p",
      text: "Segundo, la síntesis es monofónica y sin formantes. Cada sílaba es un solo oscilador moldeado por un único filtro paso bajo, mientras que el habla natural — y presumiblemente el motor más sofisticado del juego — lleva una estructura de formantes del tracto vocal. Por eso la salida se percibe como voz chiptune en lugar de habla muestreada, y es la brecha que más vale la pena explorar si amplías el código: un segundo oscilador una octava arriba, o un filtro con movimiento de frecuencia programado, empujarían ambos el resultado más cerca del territorio vocal.",
    },
    {
      type: "p",
      text: "Tercero, todo depende del soporte del navegador. La Web Audio API usada aquí — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — está soportada en todos los navegadores principales actuales, pero el carácter de salida de la Web Audio API aún varía ligeramente entre los sistemas de audio de los dispositivos, y los navegadores que bloquean la reproducción automática hasta un gesto del usuario exigirán la pulsación del botón de reproducir que el laboratorio ya proporciona. En cuanto a la privacidad, la herramienta es completamente del lado del cliente: la síntesis corre en el navegador y la única persistencia es el historial local de `IndexedDB` — ningún audio ni texto se sube a ninguna parte.",
    },
    { type: "h2", text: "Prueba la cadena de procesamiento tú mismo" },
    {
      type: "p",
      text: "La forma más rápida de interiorizar el modelo es mover los dos controles deslizantes y oír cómo responde el grafo en tiempo real:",
    },
    {
      type: "ul",
      items: [
        "[Tomodachi Voice Lab](/es/tomodachi-voice-lab) — el sintetizador en sí: cinco presets, el control deslizante de tono de `100 – 800 Hz`, el control de velocidad y el modo de texto con un beep por carácter.",
        "[Mapeo MBTI de Tomodachi Life](/es/tomodachi-life-mbti) — cómo los cuatro controles deslizantes de personalidad de un Mii producen su grupo, que decide su preset en la tabla anterior.",
        "[Tabla de Personalidades](/es/tomodachi-life-personality-chart) — la referencia completa de los 16 tipos para elegir una personalidad representativa a la que dar voz.",
        "[Desbloqueador de QR de Mii](/es/mii-qr-unlocker) — combina una voz diseñada con un personaje Mii editado para obtener al residente de isla completo.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life y Nintendo son marcas registradas de sus respectivos propietarios. Este sintetizador de voz es una interpretación hecha por fans con fines de entretenimiento y no está afiliado ni respaldado por Nintendo.",
    },
  ],
};
