/**
 * LifeSimGrid — Artículo de blog (es): el formato de los códigos QR de Mii, explicado
 *
 * Basado en la implementación propia del sitio:
 *   - src/lib/qr-handler.ts            (jsQR binaryData de entrada, QR en byte mode de salida, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (copiar permitido 0x01 bit 0, compartir prohibido 0x30 bit 0, fuente: 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "El formato del QR de Mii: FFL y el 0x04",
  description:
    "Cómo un QR de Mii guarda un Mii en binario FFL: campos de cabecera, flags de permisos y por qué tu consola dice «no se puede editar».",
  publishedAt: "2026-09-28",
  tags: ["Mii", "Código QR", "3DS", "Guías"],
  blocks: [
    {
      type: "p",
      text: "Escanea un código QR de Mii con el escáner normal del móvil y verás una pantalla llena de galimatías. Escanea el mismo código en una 3DS y llegará un personaje completo — cara, nombre, cuerpo — más un reglamento invisible sobre quién puede copiarlo, compartirlo y editarlo. Esa distancia entre las dos experiencias es un trocito de ingeniería binaria y la razón de que exista nuestro [Desbloqueador QR Mii](/es/mii-qr-unlocker). Esta guía recorre el formato por el mismo camino que toma la herramienta: la capa QR, el bloque de datos FFL, los campos de permisos en offsets como \`0x01\` y \`0x04\`, y los motivos exactos por los que la consola suelta **«Este Mii no puede ser editado»**. Cada afirmación sale del mismo descodificador que corre dentro de la herramienta: nada aquí está reciclado de una wiki.",
    },
    { type: "h2", text: "Primera sorpresa: un QR de Mii no es texto" },
    {
      type: "p",
      text: "Los códigos que escaneas a diario llevan texto plano: una URL, una contraseña de Wi-Fi, la carta de un restaurante. El QR de un Mii, no. Lleva una **carga útil en byte mode**: un bloque de binario crudo que solo cobra sentido para una consola que conoce el formato. Cuando el escáner del móvil lo lee, intenta interpretar esos bytes como texto en alguna codificación, se atasca a mitad de camino y escupe la basura que seguramente ya has visto.",
    },
    {
      type: "p",
      text: "La diferencia técnica vive en la propia especificación QR. Un código puede codificar datos en varios modos — numérico, alfanumérico, byte y kanji. El texto va en alfanumérico o en byte mode con carga UTF-8; un Mii también usa el byte mode, pero su carga **no es texto de ninguna manera**. Nuestro descodificador lee el código con [jsQR](https://github.com/cozmo/jsQR) y toma el array \`binaryData\` crudo en lugar de la cadena descodificada. Es el detalle de implementación más importante de todos: en el momento en que trates un QR de Mii como una cadena, ya lo has estropeado.",
    },
    {
      type: "p",
      text: "Al escribir el código de vuelta, la misma trampa aparece del revés. Un generador pensado para URLs recodificará los datos binarios a través de una capa de texto y los destrozará sin decir palabra. Por eso nuestro codificador pasa el buffer en byte mode con una versión de QR y un nivel de corrección de errores fijos, calibrados para que la cámara de una 3DS lea el código desde la pantalla del móvil sin rechistar. Binario entra, binario sale: la carga útil nunca toca una cadena.",
    },
    { type: "h2", text: "FFL: la biblioteca de caras detrás de cada Mii" },
    {
      type: "p",
      text: "Los datos del QR describen al Mii en el **formato FFL (Face Library)**, la biblioteca de renderizado de personajes que Nintendo comparte entre consolas, documentada públicamente por la comunidad y base de los mismos datos de Mii que consumen los juegos de Wii, 3DS, Wii U y Switch. FFL guarda un Mii como una estructura compacta: campos de identidad como el nombre y el género, un paquete de campos de apariencia para rasgos faciales, cuerpo y colores, y un bloque pequeño de **flags de permisos** que decide qué pueden hacer las consolas ajenas con el personaje.",
    },
    {
      type: "p",
      text: "Dos propiedades del formato condicionan todo lo demás. Primera: es **estable entre generaciones** — un QR de la era 3DS aún se escanea en una Wii U y los juegos de Switch consumen los mismos datos de fondo, así que una guía de formato escrita una vez sigue sirviendo. Segunda: está **atado a las posiciones** — cada campo vive a un offset fijo desde el inicio del bloque, y esos offsets se desplazan ligeramente entre generaciones. Falla uno y no obtienes un Mii un poco raro: obtienes un Mii que directamente no escanea. Ese rigor explica también que el formato sobreviva intacto a los relevos de consola: los juegos no lo reinventan, le entregan sus datos de personaje a la misma biblioteca.",
    },
    { type: "h2", text: "La cabecera, campo a campo" },
    {
      type: "p",
      text: "Antes de tocar nada, la herramienta analiza los primeros bytes del bloque y te enseña una vista previa. Estos son los campos de cabecera que define el formato, y lo que controla cada uno:",
    },
    {
      type: "table",
      headers: ["Offset", "Campo", "Qué contiene"],
      rows: [
        ["`0x00`", "Byte de versión", "Qué generación de datos de Mii usa el bloque"],
        ["`0x01`", "Flags de opciones", "El bit `0` lleva la bandera de **permitir copiar**; los demás bits cubren el flag de profanidad y el bloqueo regional"],
        ["`0x02`–`0x03`", "Cabecera de ranura", "En qué página y ranura del Mii Maker se guardó el Mii"],
        ["`0x04`–`0x0B`", "System ID", "Ocho bytes que identifican la consola propietaria — el campo que comprueba la restricción de edición, y el que reescribe nuestro pase de desbloqueo"],
        ["`0x18`", "Género y bits personales", "El bit de género, más fecha de nacimiento y color favorito"],
        ["`0x1A`–`0x2D`", "Nombre", "Hasta 10 caracteres en UTF-16, terminado en null"],
        ["`0x30`", "Flag de compartir", "El bit `0` es el interruptor de **prohibir compartir** (fuente: documentación del formato Mii en 3dbrew)"],
      ],
    },
    {
      type: "p",
      text: "El campo del nombre merece una pausa, porque ahí es donde fracasan casi todas las ediciones a mano. «Diez caracteres» no significa «diez bytes»: en UTF-16 cada carácter ocupa dos bytes, las posiciones libres se rellenan con null y el descodificador se detiene en el primer null. Escribe el nombre en UTF-8 y un nombre japonés o alemán se convierte en jerigonza en la consola; olvida el null final y el nombre se comerá lo que venga después.",
    },
    {
      type: "p",
      text: "Todo lo que sigue a la cabecera es el Mii propiamente dicho: decenas de campos de apariencia — forma de la cara, pelo, ojos, cejas, nariz, boca, gafas, altura, complexión y colores favoritos — empaquetados en bits concretos. La herramienta lee lo justo para dibujar una vista previa y después decide deliberadamente **no volver a tocarlos**: un desbloqueo que moviera un solo píxel de la cara sería un desbloqueo en el que no se puede confiar.",
    },
    { type: "h2", text: "Por qué los Miis escaneados dicen «no se puede editar»" },
    {
      type: "p",
      text: "El sistema de permisos existe porque el QR de Mii es un mecanismo de intercambio y Nintendo dejó en manos del creador hasta dónde llega. Cuando un Mii nace en una consola, sus datos FFL anotan la elección del autor como flags dentro del bloque. Cuando otra consola escanea ese QR, el Mii llega marcado como **recibido**: la consola trata al creador original como autor, lee los flags y los ejecuta al pie de la letra:",
    },
    {
      type: "ul",
      items: [
        "**Permitir copiar** — si el creador cerró la copia, la consola receptora no dejará duplicar el Mii ni guardarlo en otro sitio.",
        "**Prohibir compartir** — con el intercambio apagado, de este Mii no saldrá un QR nuevo para la siguiente persona.",
        "**Editar** — un Mii recibido no es editable en la consola receptora, sean cuales sean los otros dos flags. El derecho de edición pertenece a la consola donde el Mii nació. La misma lógica de propiedad define los valores por defecto de personalidad y voz, y nuestra [guía de síntesis de voz](/es/blog/tomodachi-life-voice-synthesis-guide) la desmonta en detalle.",
      ],
    },
    {
      type: "p",
      text: "La que sorprende es la tercera. Puedes escanear un Mii, admirarlo, usarlo en juegos — pero en cuanto intentas abrirlo en el editor, la consola se niega: **«Este Mii no puede ser editado»**. No es un fallo; son los flags, que hacen escrupulosamente lo que su autor les pidió.",
    },
    {
      type: "p",
      text: "Hay una ruta oficial para sortearlo, y solo funciona si el creador permitió copiar: en la 3DS, copias el Mii a tu propio Mii Maker y lo reconstruyes pieza a pieza. El reconstruido nace en tu consola, es tuyo y es editable del todo. El problema es que, para cualquier cosa que no sea un retoque rápido, ese rodeo es un peaje; y cuando la propia copia está bloqueada, la ruta desaparece directamente. Ese hueco entre «oficialmente posible» y «prácticamente útil» es el terreno donde vive cualquier herramienta de desbloqueo.",
    },
    { type: "h2", text: "Qué cambia nuestro desbloqueador y qué no toca jamás" },
    {
      type: "p",
      text: "Con el mapa de campos delante, la operación se entiende de golpe: es pequeña a propósito. La herramienta lee la carga y reescribe el primer byte del System ID en \`0x04\` — la identidad de propietario que la consola comprueba al decidir si un Mii recibido puede editarse —, de modo que el Mii deja de resolverse a un dueño ajeno. Si quieres renombrarlo, reescribe el campo del nombre en UTF-16 correcto en la misma pasada. Después recodifica el bloque como un QR fresco en byte mode. Todos los demás bytes pasan uno a uno, intactos.",
    },
    {
      type: "p",
      text: "El paso de recodificación importa más de lo que suena. El QR nuevo se genera en byte mode con versión y nivel de corrección \`M\` fijos, y se dibuja a un tamaño afinado para que la cámara de la 3DS lo lea desde la pantalla del móvil. Con ajustes equivocados, el código puede verse perfecto y negarse justo en la consola a la que lo apuntas: los niveles de corrección intercambian robustez de lectura por capacidad de datos, y la carga de un Mii anda cerca del límite, así que la elección no es estética.",
    },
    {
      type: "p",
      text: "Todo el viaje ocurre dentro de tu navegador. La carga se descodifica del archivo que arrastras, vive en memoria, se modifica y se dibuja de vuelta; el historial de la sesión duerme en el IndexedDB de tu propio navegador. No hay servidor en medio — y eso no es solo una cortesía de privacidad: significa que la vía para que la herramienta guarde en secreto una copia de cualquier Mii, el tuyo incluido, no existe.",
    },
    { type: "h2", text: "De la 3DS a Switch: cámaras, QR y claves de acceso" },
    {
      type: "p",
      text: "La mayor parte de la confusión actual sobre el intercambio de Miis se explica con la historia del hardware. La 3DS llevaba dos cámaras, y escanear un QR era un gesto nativo de aquella generación: el Mii Maker, Tomodachi Life, Miitopia y StreetPass se alimentaban todos de estos códigos. Switch eliminó las cámaras sin piedad: su Mii Maker conserva la opción de **leer** un QR de Mii de 3DS o Wii U — que se queda en el aire, porque no hay cámara que lo escanee. Lo que Switch conservó son los datos FFL; por eso el conocimiento de formato de esta guía sigue vivo. Lo que cambió fue la capa de intercambio.",
    },
    {
      type: "p",
      text: "Para Miitopia en Switch, Nintendo sustituyó los QR por un sistema de **claves de acceso**: un código corto que descarga un Mii de un servicio online, y otra clave para publicar el tuyo. Switch 2 sigue por el mismo camino. Las claves resuelven con elegancia el problema de la cámara ausente, pero heredan la misma filosofía de permisos — un Mii descargado es obra de otro — y solo funcionan en juegos con soporte del servicio.",
    },
    {
      type: "p",
      text: "El puente práctico entre las dos eras pasa por el formato de la era 3DS: toma un QR de Mii, ábrelo si las flags están cerradas y llévalo al Mii Maker de Switch por cualquiera de las vías con que los jugadores sortean la cámara que falta — escaneo emulado en una consola modificada, o reconstrucción a ojo del Mii desbloqueado a partir de la vista previa. Cuando el Mii ya vive en la Switch, sus datos son nativos y el Mii funciona en todos los sitios donde la Switch los admite, desde [Tomodachi Life: Living the Dream](/es/tomodachi-voice-lab) hasta Miitopia. Y como el sistema de personalidades cabalga sobre los mismos datos de Mii, todo lo de nuestro [mapeo MBTI de Tomodachi Life](/es/blog/tomodachi-life-mbti-mapping-explained) le sirve al personaje trasplantado sin cambios.",
    },
    { type: "h2", text: "Por qué editar a mano con un editor hexadecimal suele fallar" },
    {
      type: "p",
      text: "Conocido el mapa, pica saltarse la herramienta y girar bytes en un editor hexadecimal. Allí esperan tres modos de fallo, y los tres son mudos: el archivo jamás anuncia qué salió mal.",
    },
    {
      type: "ol",
      items: [
        "**Otra generación, otros offsets.** Las posiciones de los campos se desplazan entre las generaciones Wii, 3DS y Switch del formato. Un parche contra el mapa equivocado edita los bytes equivocados — y las víctimas más frecuentes son los campos de apariencia que nunca quisiste tocar.",
        "**La trampa de la cadena.** Los editores hexadecimales piensan en texto por defecto. Abres la carga, reescribes el nombre como ASCII, guardas — y el campo en UTF-16 queda desalineado de raíz, arrastrando consigo los bytes que vienen después.",
        "**La trampa del re-encodado.** Tras editar los bytes falta el QR. Los generadores de URLs codifican a través de una capa de texto y trituran cargas binarias; solo un codificador en byte mode, con la versión y el nivel correctos, produce un código que la consola acepte.",
      ],
    },
    {
      type: "p",
      text: "Existe una herramienta dedicada para volver imposibles esos tres errores: offsets fijos, byte mode de entrada y salida, y un campo de nombre escrito con la codificación y el relleno correctos. Esa es toda la razón por la que [nuestro desbloqueador](/es/mii-qr-unlocker) es una página y no un comentario en la documentación.",
    },
    { type: "h2", text: "Preguntas que la gente hace sobre los QR de Mii" },
    { type: "h3", text: "¿Desbloquear un QR de Mii es legal y seguro?" },
    {
      type: "p",
      text: "En cuanto a seguridad, la mecánica está de tu parte: el desbloqueo solo reescribe los bytes de permisos y deja el bloque de apariencia intacto, así que el código modificado o escanea como el mismo Mii con permisos nuevos o no escanea en absoluto; no existe la tercera vía silenciosa. En legalidad: el formato está documentado por la comunidad, la herramienta trabaja con datos de Mii que ya posees y lo que venga después se rige por las mismas normas que cualquier actividad de fans — respeta al creador original y no presentes el personaje ajeno como tuyo. La postura de Nintendo sobre los datos de Mii modificados es la misma que sobre el resto del sistema de archivos de la consola: territorio sin soporte oficial, criterio tuyo.",
    },
    { type: "h3", text: "¿Sirve para los Miis de Miitopia y Smash Bros.?" },
    {
      type: "p",
      text: "Sí. Miitopia y Super Smash Bros. Ultimate consumen los mismos datos de Mii en formato FFL que Tomodachi Life y el Mii Maker de 3DS, así que un QR producido para un juego escanea en los demás, en las consolas que aceptan entrada por QR. El formato es el idioma común; los juegos son públicos distintos.",
    },
    { type: "h3", text: "Mi consola no escanea el código desbloqueado, ¿por qué?" },
    {
      type: "p",
      text: "Nueve de cada diez veces el problema es de óptica, no de datos. Sube el brillo de la pantalla al máximo, coloca la consola a la distancia en que el QR llena el encuadre sin desenfocarse, limpia la lente de la cámara y evita los reflejos de la luz de techo. Si aun así se resiste, regenera el código: una captura de pantalla de un QR puede traer artefactos de compresión que rompen la descodificación; lo correcto es guardar siempre la imagen renderizada original.",
    },
    { type: "h3", text: "¿El Mii desbloqueado se verá distinto en los juegos?" },
    {
      type: "p",
      text: "No. El bloque de apariencia pasa byte a byte — cara, pelo, colores, altura —, y el nombre y los ajustes de voz llegan exactamente como los dejó el creador. Los cambios visibles son solo los que pides, como un nombre nuevo. Si tras el escaneo el Mii se ve raro, lo que se estropeó por el camino fue la propia imagen del QR: regenera y vuelve a escanear antes de culpar a los datos.",
    },
    { type: "h3", text: "¿Puedo editar un Mii directamente en la Switch?" },
    {
      type: "p",
      text: "Uno recibido, no. El Mii Maker de Switch edita los Miis creados en esa consola; todo Mii llegado de fuera — por clave de acceso en Switch, por escaneo en 3DS — queda bloqueado para proteger a su autor. El camino hacia una copia editable vuelve a pasar por el formato: desbloquea el QR original para que se reconozca como local y editable, y luego llévalo a la Switch por el medio que permita tu configuración.",
    },
    { type: "h3", text: "¿Y el nuevo sistema de Miis de Switch 2?" },
    {
      type: "p",
      text: "Switch 2 continúa el enfoque de claves de acceso para Miitopia, y los datos de Mii de fondo siguen siendo de la estirpe FFL. El QR como soporte físico de intercambio pertenece a las consolas con cámara — 3DS y Wii U —, y justo por eso entender el formato sigue valiendo oro: los datos que esos códigos transportaban son los mismos que tus juegos de Switch consumen hoy.",
    },
    { type: "h3", text: "¿Puedo recuperar los permisos originales?" },
    {
      type: "p",
      text: "Conserva la imagen original del QR: el desbloqueo nunca sobreescribe tu archivo fuente, solo genera un código nuevo con las flags abiertas. Si algún día quieres las restricciones de vuelta, la imagen original sigue llevándolas y escaneará con la configuración del creador. Lo que no se puede hacer es volver a cerrar un Mii que ya vive en una consola: el derecho de edición concedido a tu consola por un escaneo desbloqueado queda ligado a ese Mii para siempre. Conviene conocer esa asimetría antes de desbloquear algo que te prestaron.",
    },
    { type: "h2", text: "Pruébalo tú mismo" },
    {
      type: "p",
      text: "La forma más rápida de ver el formato en acción es alimentar la herramienta con uno de tus propios Miis y ver aparecer los campos:",
    },
    {
      type: "ul",
      items: [
        "[Desbloqueador QR Mii](/es/mii-qr-unlocker) — suelta un código, mira el nombre y los flags descodificados y genera una versión editable.",
        "[Creador Mii](/es/tomodachi-life-mii-creator) — construye un Mii desde cero con renderizado FFL en vivo y expórtalo.",
        "[Diseño de Ojos Mii](/es/mii-eyes) — un editor centrado en las formas de los ojos que definen la expresión de un Mii.",
        "[Laboratorio de Voz](/es/tomodachi-voice-lab) — escucha cómo Tomodachi Life convierte una personalidad en voz sintetizada.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch y Miitopia son marcas registradas de Nintendo. Esta guía describe un formato documentado por la comunidad con fines de copia de seguridad y edición personal, y no está afiliada a Nintendo ni cuenta con su respaldo. Los detalles del formato FFL siguen la documentación pública de 3dbrew.",
    },
  ],
};
