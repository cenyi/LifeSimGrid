/**
 * LifeSimGrid — Artigo de blogue (pt): Como as 16 personalidades do Tomodachi Life mapeiam para o MBTI
 *
 * Tradução portuguesa (Portugal) de posts/tomodachi-life-mbti-mapping-explained.ts,
 * ancorada no modelo próprio do site:
 *   - src/lib/types.ts               (PERSONALITIES, MBTI_MAP)
 *   - src/lib/mii-creator-data.ts    (predictPersonality band model)
 *   - src/lib/compatibility.ts       (romance/friendship formula)
 */

import type { BlogPost } from "../../types";

export const postMbtiMapping: BlogPost = {
  slug: "tomodachi-life-mbti-mapping-explained",
  title: "Mapeamento MBTI: as 16 personalidades do Tomodachi Life",
  description:
    "A metodologia completa do nosso mapeamento MBTI do Tomodachi Life: bandas dos controlos, lógica de grupos, derivação letra a letra e a anomalia INFP.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "MBTI", "Personalidade", "Guias"],
  blocks: [
    {
      type: "p",
      text: "O Tomodachi Life atribui a cada Mii uma de 16 personalidades, e decide qual através de quatro controlos deslizantes ocultos no editor de Mii. O nosso [mapeamento MBTI](/pt/tomodachi-life-mbti) é um modelo estimado pela comunidade que converte esses quatro controlos num código de quatro letras ao estilo Myers-Briggs. Este guia explica todo o processo exatamente como corre neste site — os limiares das bandas, a lógica de seleção dos grupos, a derivação das letras e o único caso em que o mapeamento produz uma colisão surpreendente. Todos os números abaixo vêm do mesmo modelo que alimenta a nossa [calculadora de personalidade](/pt/tomodachi-life-personality-calculator) e a [tabela dos 16 tipos](/pt/tomodachi-life-personality-chart), por isso podes reproduzir qualquer resultado à mão.",
    },
    { type: "h2", text: "Os quatro controlos deslizantes que decidem tudo" },
    {
      type: "p",
      text: "Quando registas um Mii, o jogo deixa-te afinar quatro eixos de personalidade. As comunidades de fãs usam nomes ligeiramente diferentes para eles; neste site chamamos-lhes **Movimento**, **Fala**, **Energia** e **Pensamento**, e cada um é um valor contínuo de `0` a `100`. Nenhuma das 16 personalidades é alcançável com um único controlo — a personalidade é um **padrão** entre os quatro, e é por isso que dois Miis podem parecer completamente diferentes apesar de partilharem um único valor de controlo.",
    },
    {
      type: "p",
      text: "O **Movimento** vai de lento a rápido. Um Mii com Movimento alto atravessa a ilha em visivelmente menos passos, bate às portas por iniciativa própria e tende a aparecer primeiro nas cenas de grupo. A **Fala** vai de suave a direta. Os Miis diretos dão respostas cruas, confessam sentimentos cedo e largam as frases mais duras nas discussões. A **Energia** vai do prático ao imaginativo — os Miis práticos ocupam-se do que têm à frente, os Miis imaginativos sonham acordados, propõem novas atividades e reagem com força às novidades. O **Pensamento** vai do flexível ao estruturado: os Miis estruturados mantêm rotinas, mantêm as opiniões arrumadas e não perdem as contas.",
    },
    {
      type: "p",
      text: "Os quatro eixos não foram escolhidos ao acaso. Cada um corresponde exatamente a uma letra do código MBTI, e é isso que torna sequer possível um mapeamento limpo de 16 tipos. Antes de lá chegarmos, porém, o modelo tem de comprimir quatro valores contínuos numa de 16 personalidades discretas — e fá-lo em três passagens: bandas, grupo e depois subtipo.",
    },
    { type: "h2", text: "Passagem 1: cada controlo torna-se uma de três bandas" },
    {
      type: "p",
      text: "A primeira passagem quantiza cada controlo numa banda baixa, média ou alta. Os limiares são fixos para os quatro controlos:",
    },
    {
      type: "table",
      headers: ["Banda", "Valor do controlo", "Significado"],
      rows: [
        ["Baixa", "`0 – 33`", "A extremidade esquerda do eixo (lento, suave, prático, flexível)"],
        ["Média", "`34 – 66`", "Sem forte atração para nenhum dos lados"],
        ["Alta", "`67 – 100`", "A extremidade direita do eixo (rápido, direto, imaginativo, estruturado)"],
      ],
    },
    {
      type: "p",
      text: "Três bandas por controlo, em quatro controlos, dão `3 × 3 × 3 × 3 = 81` células de controlo possíveis. São claramente mais do que as 16 personalidades que o jogo na verdade oferece — por isso é necessária uma segunda passagem para fundir células semelhantes, e é por isso que várias combinações diferentes de controlos podem acabar na mesma personalidade. Se alguma vez juraste que dois dos teus Miis tinham posições de controlo diferentes mas a mesma personalidade, esta é a razão: os 16 resultados do jogo são mais grosseiros do que as suas entradas de controlo.",
    },
    { type: "h2", text: "Passagem 2: as bandas escolhem um de quatro grupos" },
    {
      type: "p",
      text: "As 16 personalidades estão organizadas em quatro grupos de quatro: **Grupo Extrovertido**, **Grupo Confiante**, **Grupo Independente** e **Grupo Calmo**. A segunda passagem decide o grupo lendo as bandas como sinais. Dois valores derivados fazem o trabalho:",
    },
    {
      type: "ul",
      items: [
        "**Sinal ativo** — a soma das bandas de Movimento, Fala e Energia (um número de `0` a `6`). Valores altos significam que o Mii pende para o sociável e o enérgico.",
        "**Sinal intro** — apenas a banda de Pensamento, lida com polaridade invertida: uma banda de Pensamento **alta** significa que o Mii tende para a reserva e para o interior.",
      ],
    },
    {
      type: "p",
      text: "As regras aplicam-se depois em cascata e por ordem. Se o sinal intro está alto enquanto o sinal ativo está baixo, o Mii fica no **Grupo Independente** — a casa do Artista, do Espírito Livre, do Pensador e do Lobo Solitário. Se o sinal ativo é muito alto (`4` ou mais), o Mii é sociável: entra no **Grupo Extrovertido** quando a Fala também está na banda alta, e no **Grupo Confiante** caso contrário. Um sinal ativo intermédio divide-se pelo Movimento — o Movimento alto mantém o Mii no **Grupo Extrovertido**, tudo o resto desliza para o **Grupo Calmo**. E quando o sinal ativo está baixo sem um sinal intro forte, o Mii acomoda-se por defeito no **Grupo Calmo**. A ordem da cascata importa: um Mii introvertido mas enérgico resolve-se pela primeira regra que cumpre, não por média.",
    },
    {
      type: "p",
      text: "Os dois grupos sociáveis e os dois grupos reservados não são categorias arbitrárias — alimentam diretamente o modelo de compatibilidade do site, no qual o Grupo Extrovertido emparelha naturalmente com o Grupo Independente, e o Grupo Confiante com o Grupo Calmo. Voltamos a isso mais abaixo.",
    },
    { type: "h2", text: "Passagem 3: uma segunda leitura escolhe o subtipo" },
    {
      type: "p",
      text: "Logo que o grupo está definido, uma segunda passagem sobre as mesmas bandas seleciona um dos seus quatro membros. Cada grupo tem os seus próprios critérios de desempate. No Grupo Extrovertido, por exemplo, Energia alta juntamente com Fala alta produz o **Animador**; Movimento alto com pelo menos Fala média dá o **Inovador**; uma banda de Pensamento média ou mais alta encaminha para o **Líder**; e tudo o resto se torna o **Otimista**. Os outros três grupos seguem o mesmo padrão com eixos prioritários diferentes, e é isso que dá a cada subtipo a sua silhueta reconhecível.",
    },
    {
      type: "p",
      text: "A tabela completa abaixo lista as 16 personalidades com o seu grupo, o seu código MBTI e a sua assinatura de controlos — a leitura dos quatro eixos que o código implica:",
    },
    {
      type: "table",
      headers: ["Personalidade", "Grupo", "MBTI", "Assinatura de controlos"],
      rows: [
        ["Líder", "Grupo Extrovertido", "ESTJ", "Rápido · Direto · Prático · Estruturado"],
        ["Animador", "Grupo Extrovertido", "ESFP", "Rápido · Suave · Prático · Flexível"],
        ["Inovador", "Grupo Extrovertido", "ENFP", "Rápido · Suave · Imaginativo · Flexível"],
        ["Otimista", "Grupo Extrovertido", "ESFJ", "Rápido · Suave · Prático · Estruturado"],
        ["Designer", "Grupo Confiante", "INTJ", "Lento · Direto · Imaginativo · Estruturado"],
        ["Aventureiro", "Grupo Confiante", "ESTP", "Rápido · Direto · Prático · Flexível"],
        ["Empreendedor", "Grupo Confiante", "ENTJ", "Rápido · Direto · Imaginativo · Estruturado"],
        ["Encantador", "Grupo Confiante", "ENTP", "Rápido · Direto · Imaginativo · Flexível"],
        ["Artista", "Grupo Independente", "INFP", "Lento · Suave · Imaginativo · Flexível"],
        ["Espírito Livre", "Grupo Independente", "INTP", "Lento · Direto · Imaginativo · Flexível"],
        ["Pensador", "Grupo Independente", "ISTP", "Lento · Direto · Prático · Flexível"],
        ["Lobo Solitário", "Grupo Independente", "ISTJ", "Lento · Direto · Prático · Estruturado"],
        ["Sonhador", "Grupo Calmo", "INFJ", "Lento · Suave · Imaginativo · Estruturado"],
        ["Carinhoso", "Grupo Calmo", "ISFJ", "Lento · Suave · Prático · Estruturado"],
        ["Sensível", "Grupo Calmo", "INFP", "Lento · Suave · Imaginativo · Flexível"],
        ["Amigo", "Grupo Calmo", "ISFP", "Lento · Suave · Prático · Flexível"],
      ],
    },
    { type: "h2", text: "Como cada letra MBTI é derivada" },
    {
      type: "p",
      text: "Como cada eixo de controlo foi atribuído a uma dimensão MBTI, derivar o código de quatro letras é uma leitura direta da assinatura de controlos. Letra a letra:",
    },
    {
      type: "ol",
      items: [
        "**E ou I ← Movimento.** Um Mii rápido é extravertido (E); um Mii lento é introvertido (I). O Movimento é o único eixo que decide a primeira letra, o que corresponde ao que os jogadores observam: a velocidade de marcha é o sinal de personalidade mais visível do jogo.",
        "**S ou N ← Energia.** Um Mii prático é sensorial (S); um Mii imaginativo é intuitivo (N). Este eixo governa a forma como o Mii reage a novos itens, eventos e residentes.",
        "**T ou F ← Fala.** Um Mii direto é de Pensamento (T); um Mii suave é de Sentimento (F). O mesmo controlo que torna as discussões afiadas ou suaves é o que decide a terceira letra.",
        "**J ou P ← Pensamento.** Um Mii estruturado é julgador (J); um Mii flexível é perceptivo (P). Os Miis que amam rotinas carregam o J, os improvisadores carregam o P.",
      ],
    },
    {
      type: "p",
      text: "Repara que o código é totalmente determinado pela assinatura dos quatro eixos — velocidade de Movimento, estilo de Energia, estilo de Fala e estrutura de Pensamento — e **não** pelo grupo. O grupo é uma quinta informação, e o mapeamento precisa dela, como a próxima secção mostra.",
    },

    { type: "h2", text: "Perguntas que os jogadores fazem sobre o mapeamento" },
    { type: "h3", text: "Controlos iguais produzem sempre a mesma personalidade?" },
    { type: "p", text: "Sim — o processo é totalmente determinista. Os mesmos quatro valores caem sempre nas mesmas bandas, aterram na mesma célula das `81`, resolvem-se no mesmo grupo na cascata e escolhem o mesmo subtipo. Dois Miis registados com definições idênticas sairão sempre idênticos, neste site e, por tudo o que os jogadores observaram ao longo do tempo, também no jogo. A única forma de um Mii aparentemente inalterado mudar é um empurrão de um ponto através do limite de uma banda — de `33` para `34`, ou de `66` para `67` — e é por isso que os valores fronteira merecem um segundo olhar antes de fechar o plano da ilha." },
    { type: "h3", text: "Qual dos quatro controlos pesa mais?" },
    { type: "p", text: "**Movimento** carrega o maior peso. É o único eixo que decide sozinho uma letra (rápido é E, lento é I), alimenta o sinal ativo e desempata entre **Extrovertido** e **Calmo** quando o sinal ativo é morno. **Pensamento** vem logo a seguir: sozinho move o sinal de introspeção que leva os Miis reservados ao Grupo Independente e orienta vários desempates de subtipo. Fala e Energia contam, mas sobretudo como multiplicadores dos outros dois." },
    { type: "h3", text: "Porque é que um resultado às vezes parece errado mesmo com controlos sensatos?" },
    { type: "p", text: "Quase sempre por causa das bandas médias. Um controlo estacionado entre `34` e `66` quase não transporta informação — o modelo lê-no como neutro —, pelo que dois Miis que se sentem diferentes em jogo podem ser quantizados da mesma forma e sair iguais. A ordem da cascata agrava isto: ganha a primeira regra que se aplica, e um Mii enérgico e doce pode ficar separado de um enérgico e direto por uma única banda. Se uma previsão contradiz o comportamento real do teu Mii, confia no comportamento e trata o código como o que é: uma aproximação." },
    { type: "h3", text: "A personalidade muda o comportamento do Mii no jogo?" },
    { type: "p", text: "A observação dos jogadores diz que sim, em traços gerais: os Miis de fala direta soltam as coisas durante as discussões e confessam cedo, os imaginativos sugerem atividades estranhas e os estruturados mantêm as rotinas que o jogo lhes permite definir. O que a personalidade claramente não faz é fixar o destino — níveis de amizade, histórico de presentes e eventos aleatórios vivem fora deste sistema. É precisamente por isso que as nossas pontuações de compatibilidade chegam com desdobramento em vez de promessas." },
    { type: "h3", text: "É o mesmo teste MBTI que as pessoas fazem online?" },
    { type: "p", text: "Não — e manter os dois separados importa. O Myers-Briggs Type Indicator é um questionário sobre pessoas reais; este mapeamento é uma camada de tradução entre o sistema de controlos de um videojogo e o vocabulário de quatro letras desse questionário. As letras significam o mesmo ao nível dos eixos, mas um Mii não pode ser introvertido como uma pessoa é — só pode ter um valor de controlo. Trata o código de um Mii como uma abreviatura partilhada do seu padrão de controlos, não como uma avaliação psicológica da personagem e muito menos do dono." },
    { type: "h2", text: "A usar o mapeamento ao contrário: do código MBTI aos controlos" },
    { type: "p", text: "A tabela também funciona ao contrário — e é a direção de que a maioria dos visitantes precisa: conheces o teu código MBTI e queres um Mii à altura. Lê o código como quatro posições de controlo e ajusta-as assim:" },
    { type: "ol", items: [
      "**Primeira letra → Movimento.** E quer Movimento para rápido (`67` ou mais); I para lento (`33` ou menos).",
      "**Segunda letra → Energia.** S senta-se no extremo prático (`33` ou menos); N no imaginativo (`67` ou mais).",
      "**Terceira letra → Fala.** T quer direto (`67` ou mais); F quer doce (`33` ou menos).",
      "**Quarta letra → Pensamento.** J quer estruturado (`67` ou mais); P quer flexível (`33` ou menos).",
    ] },
    { type: "p", text: "Mira nas extremidades de cada eixo e não no meio — as bandas médias são o ponto fraco do modelo, como a secção de limites explica. Um código pede uma decisão em vez de um ajuste: [INFP](/pt/tomodachi-life-mbti/infp) corresponde tanto ao [Artista](/pt/tomodachi-life-personality/artist) como ao [Sensível](/pt/tomodachi-life-personality/softie); escolhe a linha cujo grupo corresponde ao temperamento pretendido — **Independente** contido para o Artista, **Calmo** afetuoso para o Sensível — e põe os controlos na assinatura dessa linha." },
    { type: "h2", text: "A anomalia INFP: 16 personalidades, 15 códigos" },
    {
      type: "p",
      text: "Conta as entradas da coluna MBTI na tabela acima e vais encontrar apenas 15 códigos únicos. Duas personalidades — o **Artista** e o **Sensível** — mapeiam ambas para [INFP](/pt/tomodachi-life-mbti/infp). Não é um erro de escrita; é uma propriedade estrutural de qualquer mapeamento de 16 para 16 que passe por quatro eixos.",
    },
    {
      type: "p",
      text: "O Artista e o Sensível partilham exatamente a mesma assinatura de controlos: lento, suave, imaginativo e flexível. O que os separa é o grupo. O Artista vive no Grupo Independente, onde o modelo lê essa assinatura como a de um sonhador reservado, voltado para o mundo interior. O Sensível vive no Grupo Calmo, onde a assinatura idêntica se torna um residente manso e abertamente afetuoso. Em termos de jogo, podes pensar neles como as mesmas quatro leituras de eixos vestidas com dois trajes sociais diferentes — um guarda as distâncias, o outro aproxima-se.",
    },
    {
      type: "p",
      text: "A consequência prática: o MBTI sozinho não consegue distinguir um [Artista](/pt/tomodachi-life-personality/artist) de um [Sensível](/pt/tomodachi-life-personality/softie). Se estás a planear o plantel da ilha por códigos MBTI, lembra-te de que o INFP é ambíguo e verifica o grupo (ou a página da personalidade) para ver qual dos dois um dado Mii afinal é. Todos os outros códigos da tabela mapeiam exatamente para uma personalidade.",
    },
    { type: "h2", text: "Como o modelo de compatibilidade usa os mesmos grupos" },
    {
      type: "p",
      text: "O mapeamento não se limita a pôr etiquetas — a mesma estrutura de grupos alimenta a nossa [calculadora de compatibilidade](/pt/tomodachi-life-compatibility). O modelo pontua um par em duas escalas, romance e amizade, e ambas são construídas a partir dos mesmos ingredientes para que a aritmética se mantenha verificável:",
    },
    {
      type: "ul",
      items: [
        "**Termo zodiacal (50%).** Uma matriz zodiacal simétrica de 12 × 12 fornece uma pontuação base de química entre `40` e `90` para qualquer par de signos. Os pares do mesmo signo e os pares clássicos de elementos situam-se no topo dessa gama.",
        "**Termo base (50%).** Um `50` fixo que representa o ponto de partida neutro do modelo antes de a personalidade ser considerada.",
        "**Modificadores de personalidade.** Grupos complementares (Grupo Extrovertido com Grupo Independente, ou Grupo Confiante com Grupo Calmo) somam `+20` ao romance. Dois Miis do mesmo grupo perdem `10` de romance mas ganham `+20` de amizade. Dois Miis com a personalidade **exatamente igual** perdem mais `5` de romance e ganham mais `+10` de amizade.",
      ],
    },
    {
      type: "p",
      text: "A pontuação final é a soma dos dois termos mais o modificador, arredondada e limitada a `0 – 100`. A fórmula é deliberadamente simples e é a mesma que o nosso [matchmaker de romance](/pt/tomodachi-life-romance-matcher) usa: `romance = zodiacScore × 0.5 + 50 × 0.5 + romanceModifier`. A transparência é o ponto — um número que não podes decompor é um número em que não podes confiar, e cada pontuação que o site mostra vem com o seu desdobramento.",
    },
    {
      type: "callout",
      text: "O bónus de complementaridade de grupos codifica a observação mais consistente da comunidade sobre as relações em Tomodachi Life: pares de temperamentos opostos (rápido com lento, direto com suave) são os que geram mais eventos de romance, enquanto os pares do mesmo grupo geram as amizades mais estáveis. É uma escolha de modelação, não uma constante do jogo.",
    },
    { type: "h2", text: "Experimenta o modelo tu mesmo" },
    {
      type: "p",
      text: "A forma mais rápida de interiorizar o processo é mexer nos controlos e ver os resultados a mudar:",
    },
    {
      type: "ul",
      items: [
        "[Calculadora de Personalidade](/pt/tomodachi-life-personality-calculator) — define os quatro controlos diretamente e vê a personalidade prevista, o grupo e o código MBTI.",
        "[Tabela de Personalidades](/pt/tomodachi-life-personality-chart) — a referência completa dos 16 tipos com grupos codificados por cor.",
        "[Mapeamento MBTI](/pt/tomodachi-life-mbti) — explora a partir do lado do MBTI, uma página por tipo com tendências dos controlos e fichas de compatibilidade.",
        "[Calculadora de Compatibilidade](/pt/tomodachi-life-compatibility) — emparelha dois Miis e decompõe as pontuações de romance e de amizade.",
      ],
    },
    { type: "h2", text: "Limites do modelo (lê esta parte)" },
    {
      type: "p",
      text: "A Nintendo nunca publicou o verdadeiro algoritmo de personalidade do jogo, por isso todas as afirmações deste guia — os limiares das bandas, a cascata de grupos, as atribuições de letras — são estimativas da comunidade obtidas por engenharia inversa a partir da observação dos jogadores, e não algo extraído do código do jogo. O modelo aproxima os resultados dentro do jogo com rigor suficiente para ser útil no planeamento do plantel, mas é um modelo e, como todos os modelos, falha em alguma coisa.",
    },
    {
      type: "p",
      text: "Três avisos a ter em mente. Primeiro, os controlos na banda média (`34 – 66`) são o ponto fraco do modelo: pequenas alterações perto dos limiares podem virar uma banda e mudar a personalidade prevista, por isso encara os resultados limítrofes como provisórios. Segundo, a colisão INFP descrita acima significa que o planeamento por MBTI perde informação que o planeamento por personalidade conserva. Terceiro, os resultados dentro do jogo também dependem de fatores que este modelo não toca — eventos da ilha, histórico de presentes e a semente aleatória por trás das reações de cada Mii — pelo que as pontuações de compatibilidade são pontos de partida para histórias, não garantias delas.",
    },
    {
      type: "callout",
      text: "Este mapeamento é uma interpretação feita por fãs para fins de entretenimento e planeamento, sem afiliação com a Nintendo ou a Myers-Briggs Company e sem o endosso de qualquer delas. MBTI e Nintendo são marcas registadas dos respetivos proprietários.",
    },
  ],
};
