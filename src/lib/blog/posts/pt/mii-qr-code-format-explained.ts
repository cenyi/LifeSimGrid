/**
 * LifeSimGrid — Artigo de blog (pt): o formato dos códigos QR de Mii, explicado
 *
 * Baseado na implementação própria do site:
 *   - src/lib/qr-handler.ts            (jsQR binaryData à entrada, QR em byte mode à saída, ECL-M)
 *   - src/components/AvatarEditor.tsx  (0x01 copy-allow flag, 0x04-0x0B System ID rewritten by the unlock, name at 0x1A-0x2D UTF-16)
 *   - MiiQrUnlocker formatIntro        (permitir copiar 0x01 bit 0, proibir partilhar 0x30 bit 0, fonte: 3dbrew)
 */

import type { BlogPost } from "../../types";

export const postMiiQrFormat: BlogPost = {
  slug: "mii-qr-code-format-explained",
  title: "QR de Mii: o formato FFL e o offset 0x04",
  description:
    "Como um QR de Mii guarda um Mii em binário FFL: campos do cabeçalho, flags de permissões e a razão do \"não é editável\".",
  publishedAt: "2026-09-28",
  tags: ["Mii", "Código QR", "3DS", "Guias"],
  blocks: [
    {
      type: "p",
      text: "Lê um código QR de Mii com o leitor comum do telemóvel e obténs um ecrã cheio de lerigotes. Lê o mesmo código numa 3DS e chega um personagem completo — cara, nome, corpo — mais um regulamento invisível sobre quem o pode copiar, partilhar e editar. Esse desfasamento entre as duas experiências é um pedacinho de engenharia binária, e é a razão de ser do nosso [Desbloqueador de QR Mii](/pt/mii-qr-unlocker). Este guia percorre o formato pelo mesmo caminho que a ferramenta percorre: a camada QR, o bloco de dados FFL, os campos de permissões em offsets como \`0x01\` e \`0x04\`, e os motivos exatos por que a consola diz **\"Este Mii não pode ser editado\"**. Tudo o que se segue sai do mesmo descodificador que corre na nossa ferramenta — nada aqui foi reciclado de uma wiki.",
    },
    { type: "h2", text: "Primeira surpresa: um QR de Mii não é texto" },
    {
      type: "p",
      text: "Os códigos que lês no dia a dia transportam texto puro: um endereço, uma palavra-passe de Wi-Fi, o menu de um restaurante. O QR de um Mii, não. Transporta uma **carga útil em byte mode**: um bloco de binário cru que só faz sentido para uma consola que conhece o formato. Quando o leitor do telemóvel o apanha, tenta interpretar aqueles bytes como texto numa codificação qualquer, atolha-se a meio do caminho e cospe a sopa de letrinhas que provavelmente já viste.",
    },
    {
      type: "p",
      text: "A diferença técnica mora na própria especificação QR. Um código pode transportar dados em vários modos — numérico, alfanumérico, byte e kanji. O texto viaja em alfanumérico ou em byte mode com carga UTF-8; um Mii também usa o byte mode, mas a sua carga **não é texto de forma nenhuma**. O nosso descodificador lê o código com [jsQR](https://github.com/cozmo/jsQR) e fica com o array \`binaryData\` cru em vez da cadeia descodificada. É o detalhe de implementação mais importante de todos: no momento em que tratas um QR de Mii como cadeia de caracteres, já o estragaste.",
    },
    {
      type: "p",
      text: "Ao escrever o código de volta, a mesma armadilha surge às avessas. Um gerador feito para endereços recodifica dados binários através de uma camada de texto sem pestanejar e estraga-os. Por isso o nosso codificador passa o buffer em byte mode, com versão de QR e nível de correção de erros fixos, calibrados para que a câmara de uma 3DS leia o código no ecrã do telemóvel sem hesitar. Binário a entrar, binário a sair: a carga útil nunca toca numa cadeia de caracteres.",
    },
    { type: "h2", text: "FFL: a biblioteca de caras por trás de cada Mii" },
    {
      type: "p",
      text: "Os dados dentro do código descrevem o Mii no **formato FFL (Face Library)** — a biblioteca de renderização de personagens que a Nintendo partilha entre consolas, documentada publicamente pela comunidade e alicerce dos mesmos dados de Mii que os jogos de Wii, 3DS, Wii U e Switch consomem. O FFL guarda um Mii como uma estrutura compacta: campos de identidade como o nome e o género, um pacote de campos de aparência para traços do rosto, corpo e cores, e um bloco pequeno de **flags de permissões** que decide o que as consolas alheias podem fazer com o personagem.",
    },
    {
      type: "p",
      text: "Duas propriedades do formato moldam todo o resto do guia. Primeira: é **estável de geração em geração de consolas** — um QR da era 3DS ainda se lê numa Wii U, e os jogos de Switch consomem os mesmos dados de base; um guia de formato escrito uma vez continua a servir. Segunda: é **escravo das posições** — cada campo mora num offset fixo a partir do início do bloco, e esses offsets deslizam ligeiramente entre gerações. Erra um offset e não ficas com um Mii um pouco esquisito: ficas com um Mii que nem se lê. É este rigor que explica também que o formato atravesse as trocas de consola sem uma ruga: os jogos não o reinventam, entregam os dados dos seus personagens à mesma biblioteca.",
    },
    { type: "h2", text: "O cabeçalho, campo a campo" },
    {
      type: "p",
      text: "Antes de tocar em qualquer coisa, a ferramenta analisa os primeiros bytes do bloco e mostra-te uma antevisão. Estes são os campos do cabeçalho que o formato define, e o que cada um governa:",
    },
    {
      type: "table",
      headers: ["Offset", "Campo", "O que contém"],
      rows: [
        ["`0x00`", "Byte de versão", "Que geração de dados de Mii o bloco usa"],
        ["`0x01`", "Flags de opções", "O bit `0` carrega a flag de **permitir copiar**; os restantes bits cobrem a flag de profanidade e o bloqueio regional"],
        ["`0x02`–`0x03`", "Cabeçalho de ranura", "Em que página e ranura do Mii Maker o Mii foi guardado"],
        ["`0x04`–`0x0B`", "System ID", "Oito bytes que identificam a consola proprietária — o campo que a restrição de edição consulta, e que o nosso passo de desbloqueio reescreve"],
        ["`0x18`", "Género e bits pessoais", "O bit de género, mais data de nascimento e cor preferida"],
        ["`0x1A`–`0x2D`", "Nome", "Até 10 caracteres em UTF-16, terminado em null"],
        ["`0x30`", "Flag de partilha", "O bit `0` é o interruptor de **proibir partilhar** (fonte: documentação do formato Mii em 3dbrew)"],
      ],
    },
    {
      type: "p",
      text: "O campo do nome merece uma paragem, porque é aí que a edição à mão tropeça com mais frequência. \"Dez caracteres\" não quer dizer \"dez bytes\": em UTF-16 cada caractere ocupa dois bytes, as posições livres preenchem-se com null e o descodificador para no primeiro null. Escreve o nome em UTF-8 e um nome japonês ou alemão vira rabisco na consola; esquece o null final e o nome devora aquilo que vem a seguir.",
    },
    {
      type: "p",
      text: "Tudo o que segue o cabeçalho é o Mii propriamente dito: dezenas de campos de aparência — forma do rosto, cabelo, olhos, sobrancelhas, nariz, boca, óculos, altura, compleição e cores preferidas — comprimidos em bits precisos. A ferramenta lê o suficiente para desenhar uma antevisão e depois decide deliberadamente **nunca mais tocar**: um desbloqueio que mexesse num único pixel da cara seria um desbloqueio em que não se pode confiar.",
    },
    { type: "h2", text: "Porque é que os Miis lidos dizem \"não pode ser editado\"" },
    {
      type: "p",
      text: "O sistema de permissões existe porque o QR de Mii é um mecanismo de partilha, e a Nintendo deixou nas mãos do criador a decisão de até onde ela vai. Quando um Mii nasce numa consola, os seus dados FFL registam a escolha do autor em flags dentro do bloco. Quando outra consola lê esse QR, o Mii chega marcado como **recebido**: a consola trata o criador original como autor, lê as flags e cumpre-as à letra:",
    },
    {
      type: "ul",
      items: [
        "**Permitir copiar** — se o criador fechou a cópia, a consola receptora não deixa duplicar o Mii nem guardá-lo noutro sítio.",
        "**Proibir partilhar** — com a partilha desligada, deste Mii não sai um QR novo para a pessoa seguinte.",
        "**Editar** — um Mii recebido nunca é editável na consola receptora, estejam como estiverem os outros dois flags. O direito de edição pertence à consola onde o Mii nasceu. A mesma lógica de posse define os valores predefinidos de personalidade e de voz, e o nosso [guia de síntese de voz](/pt/blog/tomodachi-life-voice-synthesis-guide) desmonta essa parte ao pormenor.",
      ],
    },
    {
      type: "p",
      text: "A regra que apanha toda a gente de surpresa é a terceira. Podes ler um Mii, apreciá-lo, usá-lo nos jogos — mas no momento em que tentas abri-lo no editor, a consola recusa: **\"Este Mii não pode ser editado\"**. Não é uma avaria; são as flags a cumprir, escrupulosamente, o que o seu autor pediu.",
    },
    {
      type: "p",
      text: "Há um caminho oficial para contornar isto, e só funciona se o criador permitiu copiar: na 3DS, copias o Mii para o teu próprio Mii Maker e reconstrói-o peça a peça. O Mii reconstruído nasceu na tua consola: é teu, e é editável de ponta a ponta. O senão é que, para tudo o que vá além de um retoque rápido, o pedágio é pesado — e se a própria cópia estiver trancada, o caminho desaparece à nascença. Esse vão entre \"oficialmente possível\" e \"praticamente servível\" é exatamente o território de qualquer ferramenta de desbloqueio.",
    },
    { type: "h2", text: "O que o nosso desbloqueador muda — e o que nunca toca" },
    {
      type: "p",
      text: "Com o mapa de campos à vista, entende-se que a operação é deliberadamente miúda: a ferramenta lê a carga e reescreve o primeiro byte do System ID em \`0x04\` — a identidade de posse que a consola consulta para decidir se um Mii recebido pode ser editado —, de modo que o Mii deixa de apontar para um dono alheio. Se quiseres renomeá-lo, a ferramenta reescreve o campo do nome em UTF-16 correto na mesma passagem. Depois recodifica o bloco num QR fresco em byte mode. Todos os outros bytes passam um a um, intactos.",
    },
    {
      type: "p",
      text: "O passo de recodificação pesa mais do que parece. O QR novo nasce em byte mode, com versão e nível de correção \`M\` fixos, desenhado num tamanho afinado para a câmara da 3DS o ler no ecrã do telemóvel. Com ajustes errados, o código pode parecer impecável e ser recusado precisamente pela consola a que o apontas: os níveis de correção trocam robustez de leitura por capacidade de dados, e a carga de um Mii anda colada ao limite — a escolha não é estética.",
    },
    {
      type: "p",
      text: "A viagem de ida e volta acontece toda no teu navegador. A carga é descodificada do ficheiro que largas, vive em memória, é alterada e desenhada de volta; o histórico da sessão dorme no IndexedDB do teu próprio navegador. Não há servidor no meio — e isso não é só boas maneiras de privacidade: significa que o caminho pelo qual a ferramenta guardaria em segredo uma cópia do Mii de alguém, o teu incluído, não existe.",
    },
    { type: "h2", text: "Da 3DS para a Switch: câmaras, QR e chaves de acesso" },
    {
      type: "p",
      text: "A maior parte da confusão atual em torno da partilha de Miis explica-se com a história do hardware. A 3DS trazia duas câmaras, e ler um QR era ali um gesto nativo: o Mii Maker, Tomodachi Life, Miitopia e o StreetPass alimentavam-se todos destes códigos. A Switch cortou nas câmaras sem rodeios: o Mii Maker dela ainda consegue **ler** um QR de Mii de 3DS ou Wii U — em vão, porque não há câmara nenhuma que o leia. O que a Switch guardou foram os dados FFL em si; por isso é que o saber de formato que este guia transmite continua vivo. O que mudou foi a camada de partilha.",
    },
    {
      type: "p",
      text: "Para o Miitopia na Switch, a Nintendo substituiu os QR por um sistema de **chaves de acesso**: um código curto que descarrega um Mii de um serviço online, e outra chave para publicares o teu. A Switch 2 segue o mesmo caminho. As chaves resolvem com elegância a câmara em falta, mas herdam a mesma filosofia de permissões — um Mii descarregado é obra de outra pessoa — e só funcionam nos jogos com suporte do serviço.",
    },
    {
      type: "p",
      text: "A ponte prática entre as duas eras passa pelo formato da era 3DS: arranja um QR de Mii, abre as flags se estiverem fechadas, e fá-lo chegar ao Mii Maker da Switch por qualquer um dos meios com que os jogadores contornam a câmara que falta — leitura emulada numa consola modificada, ou recriação do Mii desbloqueado a olho a partir da antevisão descodificada. Assim que o Mii habita na Switch, os seus dados são nativos e é aceite em todos os sítios onde a Switch aceita Miis, de [Tomodachi Life: Living the Dream](/pt/tomodachi-voice-lab) a Miitopia. E como o sistema de personalidades cavalga os mesmos dados de Mii, tudo no nosso [mapeamento MBTI de Tomodachi Life](/pt/blog/tomodachi-life-mbti-mapping-explained) vale para o personagem transplantado sem alterar uma vírgula.",
    },
    { type: "h2", text: "Porque é que editar à mão num editor hexadecimal normalmente falha" },
    {
      type: "p",
      text: "Conhecido o mapa, apetece saltar a ferramenta e editar bytes diretamente num editor hexadecimal. Aí esperam-te três modos de falha, e os três são mudos: o ficheiro nunca anuncia o que correu mal.",
    },
    {
      type: "ol",
      items: [
        "**Outra geração, outros offsets.** As posições dos campos deslizam entre as gerações Wii, 3DS e Switch do formato. Um patch feito sobre a disposição errada edita os bytes errados — e as primeiras vítimas costumam ser os campos de aparência que nunca quiseste tocar.",
        "**A armadilha da cadeia.** Os editores hexadecimais pensam em texto por omissão. Abriste a carga, corrigiste o nome como ASCII, gravaste — e o campo do nome em UTF-16 fica desalinhado por construção, arrastando consigo os bytes que se seguem.",
        "**A armadilha da recodificação.** Depois de editar os bytes, falta ainda produzir o QR. Os geradores pensados para endereços codificam através de uma camada de texto e desfazem cargas binárias; só um codificador em byte mode, com a versão e o nível certos, produz um código que a consola aceite.",
      ],
    },
    {
      type: "p",
      text: "Existe uma ferramenta dedicada para tornar esses três erros impossíveis em princípio: offsets fixos, byte mode à entrada e à saída, e um campo de nome escrito com a codificação e o preenchimento corretos. É a razão inteira pela qual [o nosso desbloqueador](/pt/mii-qr-unlocker) é uma página e não uma nota de rodapé na documentação.",
    },
    { type: "h2", text: "Perguntas que as pessoas fazem sobre QR de Mii" },
    { type: "h3", text: "Desbloquear um QR de Mii é legal e seguro?" },
    {
      type: "p",
      text: "Em segurança, a mecânica joga a teu favor: o desbloqueio só reescreve os bytes das permissões e deixa o bloco de aparência intato — o código alterado ou lê-se como o mesmo Mii com permissões novas, ou não se lê de todo; não existe terceira via silenciosa. Em legalidade: o formato está documentado pela comunidade, a ferramenta trabalha sobre dados de Mii que já tens, e o que vem depois obedece às mesmas regras de qualquer atividade de fã — respeita o criador original e não faças passar o personagem alheio por teu. A posição da Nintendo perante dados de Mii alterados é a mesma que tem sobre o resto do sistema de ficheiros da consola: território sem apoio oficial, o juízo é teu.",
    },
    { type: "h3", text: "Serve para os Miis de Miitopia e Smash Bros.?" },
    {
      type: "p",
      text: "Serve. O Miitopia e o Super Smash Bros. Ultimate consomem os mesmos dados de Mii em formato FFL que o Tomodachi Life e o Mii Maker da 3DS, pelo que um QR feito para um jogo lê-se nos outros, nas consolas que aceitam entrada por QR. O formato é a língua comum; os jogos são apenas públicos diferentes.",
    },
    { type: "h3", text: "A câmara da consola não lê o código desbloqueado — porquê?" },
    {
      type: "p",
      text: "Nove vezes em dez é uma questão de ótica, não de dados. Sobe o brilho do ecrã ao máximo, segura a consola à distância a que o QR enche a moldura sem desfocar, limpa a lente da câmara e evita os reflexos da luz do teto. Se ainda assim resiste, regenera o código: uma captura de ecrã de um QR pode trazer artefactos de compressão que estragam a descodificação. O hábito certo é guardar sempre a imagem renderizada original.",
    },
    { type: "h3", text: "O Mii desbloqueado vai parecer diferente nos jogos?" },
    {
      type: "p",
      text: "Não. O bloco de aparência passa byte a byte: cara, cabelo, cores, altura e definições de voz chegam exatamente como o criador os deixou. As mudanças visíveis são as que pedes, como um nome novo. Se após a leitura o Mii parece outro, o que se estragou no caminho foi a própria imagem do QR: regenera e volta a ler antes de desconfiares dos dados.",
    },
    { type: "h3", text: "Posso editar um Mii diretamente na Switch?" },
    {
      type: "p",
      text: "Um recebido, não. O Mii Maker da Switch edita os Miis nascidos nessa consola; todo o Mii que chega de fora — por chave de acesso ou por leitura — fica trancado para proteger o autor, à imagem da 3DS. O caminho para uma cópia editável volta a passar pelo formato: desbloqueia o QR original para que seja reconhecido como local e editável, e depois fá-lo chegar à Switch pelo meio de que dispuseres.",
    },
    { type: "h3", text: "E o novo sistema de Mii da Switch 2?" },
    {
      type: "p",
      text: "A Switch 2 continua a abordagem por chaves de acesso no Miitopia, e os dados de Mii por baixo continuam a ser da linhagem FFL. O QR como suporte físico de partilha pertence às consolas com câmara — 3DS e Wii U —, e é precisamente por isso que perceber o formato continua a valer a pena: os dados que aqueles códigos transportavam são os mesmos que os teus jogos de Switch consomem hoje.",
    },
    { type: "h3", text: "Posso repor as permissões originais mais tarde?" },
    {
      type: "p",
      text: "Guarda a imagem original do QR — o desbloqueio nunca sobrescreve o teu ficheiro-fonte; produz apenas um código novo com as flags abertas. Se um dia quiseres as restrições de volta, a imagem original ainda as transporta e lê-se com as definições do criador. O que não se consegue é voltar a trancar um Mii que já vive numa consola: o direito de edição concedido à tua consola por uma leitura desbloqueada fica ligado a esse Mii para sempre. Convém conhecer esta assimetria antes de desbloquear um Mii que um amigo te emprestou.",
    },
    { type: "h2", text: "Experimenta tu" },
    {
      type: "p",
      text: "A forma mais rápida de tornar o formato concreto é dar à ferramenta um dos teus próprios Miis e ver os campos surgirem:",
    },
    {
      type: "ul",
      items: [
        "[Desbloqueador de QR Mii](/pt/mii-qr-unlocker) — larga um código, vê o nome e as flags descodificados e gera um código editável.",
        "[Criador Mii](/pt/tomodachi-life-mii-creator) — constrói um Mii de raiz com renderização FFL ao vivo e exporta-o.",
        "[Olhos Mii](/pt/mii-eyes) — um editor concentrado nas formas dos olhos que definem a expressão de um Mii.",
        "[Laboratório de Voz](/pt/tomodachi-voice-lab) — ouve como o Tomodachi Life transforma uma personalidade numa voz sintetizada.",
      ],
    },
    {
      type: "callout",
      text: "Nintendo, Mii, Nintendo 3DS, Wii U, Switch e Miitopia são marcas registadas da Nintendo. Este guia descreve um formato documentado pela comunidade, para fins de cópia de segurança e edição pessoais, e não tem qualquer afiliação ou respaldo da Nintendo. Os detalhes do formato FFL seguem a documentação pública do 3dbrew.",
    },
  ],
};
