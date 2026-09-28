/**
 * LifeSimGrid — Artigo de blogue (pt): Como o Tomodachi Voice Lab sintetiza vozes de 8 bits
 *
 * Tradução portuguesa (Portugal) de posts/tomodachi-life-voice-synthesis-guide.ts,
 * ancorada na implementação do próprio site:
 *   - src/components/VoiceLab.tsx              (VOICE_PRESETS, playSyllable, beep-TTS)
 *   - src/components/TomodachiVoiceLabPage.tsx (personality-voice reference table)
 *   - src/lib/history-db.ts                    (IndexedDB-backed voice history)
 */

import type { BlogPost } from "../../types";

export const postVoiceSynthesis: BlogPost = {
  slug: "tomodachi-life-voice-synthesis-guide",
  title: "Como o Tomodachi Voice Lab sintetiza vozes de 8 bits",
  description:
    "Toda a pipeline da Web Audio API por trás do Tomodachi Voice Lab: osciladores, formas de onda, os 5 presets de voz e como cada parâmetro molda o som.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Web Audio API", "Síntese de Voz", "Guias"],
  blocks: [
    {
      type: "p",
      text: "O Tomodachi Voice Lab constrói as suas vozes Mii de 8 bits a partir de um grafo da Web Audio API com três nós: um `OscillatorNode` gera o tom, um `BiquadFilterNode` suaviza-o e um `GainNode` molda o seu envelope de volume. Este guia disseciona essa pipeline exatamente como ela corre no [Tomodachi Voice Lab](/pt/tomodachi-voice-lab) — cada constante, cada preset e cada decisão de agendamento — para que possas compreender, reproduzir ou expandir a estética de fala em beeps que evoca Tomodachi Life: Living the Dream. Cada número abaixo é citado diretamente do código-fonte do site e, sempre que um valor é uma estimativa da comunidade em vez de algo documentado pela Nintendo, o texto diz-lo.",
    },
    { type: "h2", text: "Porque é que as vozes de Tomodachi falam em beeps" },
    {
      type: "p",
      text: "A peculiaridade marcante do áudio de Tomodachi Life é a fala em beeps: em vez de diálogos gravados, cada Mii vocaliza em tons sintetizados curtos que seguem o ritmo de uma frase sem nunca formar palavras reais. A abordagem remonta às origens portáteis da série, onde o tamanho dos cartuchos e o hardware de som tornavam impraticável a dobragem completa, e sobreviveu até Tomodachi Life: Living the Dream na Switch porque os beeps se tornaram parte da identidade da série. O resultado lê-se como fala porque copia a prosódia da fala — movimento do tom, timing das sílabas, pausas — mantendo-se deliberadamente não lexical.",
    },
    {
      type: "p",
      text: "A Nintendo nunca publicou o verdadeiro método de síntese do jogo, por isso qualquer reconstrução em browser é, por definição, uma estimativa da comunidade. O que o laboratório visa é a estética e não uma reprodução exata ao bit, e três propriedades fazem a maior parte do trabalho. Primeiro, os tons são curtos: os envelopes abrem e fecham em dezenas de milissegundos, pelo que cada sílaba começa e termina de forma limpa. Segundo, a forma de onda é rica em harmónicos: um timbre zumbido lê-se muito mais facilmente como «chiptune» do que um tom puro. Terceiro, o tom nunca é estático: pequenos desvios de frequência por sílaba imitam o contorno da fala natural. O resto deste guia mostra como cada uma dessas propriedades se mapeia num mecanismo concreto da Web Audio API.",
    },
    { type: "h2", text: "A pipeline de síntese, nó a nó" },
    {
      type: "p",
      text: "Cada som que o laboratório produz passa exatamente por três nós de processamento entre o oscilador e os teus altifalantes. Um `AudioContext` novo é criado por cada reprodução — o laboratório nunca mantém um grafo de áudio global vivo — e cada sílaba agenda o seu próprio conjunto de nós dentro dele:",
    },
    {
      type: "code",
      text: "OscillatorNode ──▶ BiquadFilterNode (lowpass) ──▶ GainNode ──▶ AudioContext.destination\n\n                        apenas no preset Idoso:\n  LFO OscillatorNode (5 Hz) ──▶ GainNode (depth 15) ──▶ main osc.frequency",
    },
    {
      type: "p",
      text: "O `OscillatorNode` é a fonte sonora. O seu `type` vem do preset selecionado (`sawtooth` em quatro dos cinco presets, `square` para o robot) e a sua `frequency` é definida pelo cursor de tom. Como um oscilador é um gerador de forma de onda nu, não tem controlos de timbre próprios — tudo o que faz um preset soar diferente de outro é o agendamento de parâmetros a jusante.",
    },
    {
      type: "p",
      text: "O `BiquadFilterNode` está sempre configurado como filtro `lowpass`, com o cutoff retirado do valor `filterFreq` do preset (`900 – 2500 Hz` dependendo do preset). Um filtro passa-baixo atenua os harmónicos acima do seu cutoff, e é isso que transforma o zumbido a todo o gás de um dente de serra cru em algo próximo de uma voz: presets mais escuros (Idoso a `900 Hz`) mantêm apenas os harmónicos graves, enquanto presets mais brilhantes (Criança a `2500 Hz`) deixam passar o brilho que faz uma voz parecer pequena e jovem.",
    },
    {
      type: "p",
      text: "O `GainNode` é onde vive o envelope, agendado com quatro pontos de automatização. O ganho começa em `0` no instante inicial da sílaba, sobe linearmente até ao valor-alvo do preset (`0.2 – 0.3`) durante o tempo de attack, mantém-se nesse valor até um tempo de release antes do fim e depois desce linearmente de volta a `0`. As chamadas são `setValueAtTime()` para as âncoras e `linearRampToValueAtTime()` para as rampas — um envelope attack/hold/release simples, sem curvas exponenciais, o que mantém o som caracteristicamente abrupto de uma forma que assenta na estética de 8 bits.",
    },
    {
      type: "p",
      text: "Existe um par de nós adicional opcional: o vibrato. Quando um preset o ativa, um segundo `OscillatorNode` a funcionar como LFO (oscilador de baixa frequência) corre à `vibratoRate` do preset e alimenta um `GainNode` definido com a `vibratoDepth`, que está ligado ao parâmetro `frequency` do oscilador principal. Isto é modulação de frequência clássica — no preset Idoso, um LFO de `5 Hz` faz o tom oscilar `±15 Hz`, produzindo a qualidade trémula associada a vozes envelhecidas. Só o preset Idoso o liga; os outros quatro deixam o vibrato completamente desativado.",
    },
    { type: "h2", text: "Como soa cada forma de onda (e quando a escolher)" },
    {
      type: "p",
      text: "A escolha da forma de onda é a maior decisão de timbre de toda a pipeline, porque determina o conteúdo harmónico que o filtro e o envelope moldam em seguida. O `OscillatorNode` da Web Audio API oferece quatro tipos padrão, e cada um tem um caráter distinto:",
    },
    {
      type: "table",
      headers: ["Forma de onda", "Conteúdo harmónico", "Caráter", "Usado pelos presets"],
      rows: [
        ["`sine`", "Apenas fundamental", "Puro, tipo flauta, zero zumbido", "Nenhum (disponível via `OscillatorType`)"],
        ["`square`", "Harmónicos ímpares, fortes", "Oco, canal lead clássico da NES", "Robot"],
        ["`sawtooth`", "Todos os harmónicos, decrescentes", "Zumbido, tipo palheta, o mais próximo da riqueza vocal", "Homem adulto, Mulher adulta, Idoso, Criança"],
        ["`triangle`", "Poucos harmónicos ímpares, fracos", "Suave, aveludado, ligeiramente abafado", "Nenhum (disponível via `OscillatorType`)"],
      ],
    },
    {
      type: "p",
      text: "Os presets do laboratório usam apenas dois dos quatro: o `sawtooth` transporta as quatro vozes orgânicas e o `square` transporta o robot. Esta divisão é deliberada. Um dente de serra contém energia em todos os harmónicos, o que, após a filtragem passa-baixo, deixa um núcleo denso e semelhante a uma voz — a razão pela qual aproxima tons cantados ou falados melhor do que qualquer outra forma de onda básica. Uma onda quadrada mantém apenas harmónicos ímpares com mais energia no topo, dando a qualidade oca, nasal e inconfundivelmente eletrónica que o preset Robot procura. `Sine` e `triangle` não são usados por nenhum preset atual, mas continuam a ser alterações de uma linha através do mesmo campo `OscillatorType`: a onda sinusoidal adequa-se a efeitos sonoros puros como sinos, e a onda triangular adequa-se a bips suaves de fundo onde um dente de serra seria demasiado agressivo.",
    },
    { type: "h2", text: "Os cinco presets de voz, descodificados" },
    {
      type: "p",
      text: "Os cinco presets são cinco conjuntos de parâmetros sobre o mesmo grafo de três nós, e as suas diferenças são totalmente enumeráveis. Aqui está a tabela completa, citada diretamente da constante `VOICE_PRESETS` no código-fonte:",
    },
    {
      type: "table",
      headers: ["Preset", "Forma de onda", "Frequência base", "Cutoff passa-baixo", "Ganho", "Vibrato", "Attack", "Release"],
      rows: [
        ["Homem adulto", "`sawtooth`", "`180 Hz`", "`1200 Hz`", "`0.30`", "Desligado", "`0.02 s`", "`0.05 s`"],
        ["Mulher adulta", "`sawtooth`", "`350 Hz`", "`1800 Hz`", "`0.25`", "Desligado", "`0.02 s`", "`0.04 s`"],
        ["Idoso", "`sawtooth`", "`120 Hz`", "`900 Hz`", "`0.30`", "`5 Hz`, `±15 Hz`", "`0.04 s`", "`0.08 s`"],
        ["Criança", "`sawtooth`", "`600 Hz`", "`2500 Hz`", "`0.20`", "Desligado", "`0.01 s`", "`0.03 s`"],
        ["Robot", "`square`", "`250 Hz`", "`1500 Hz`", "`0.25`", "Desligado", "`0 s`", "`0 s`"],
      ],
    },
    {
      type: "p",
      text: "O **Homem adulto** ancora o conjunto numa frequência base de `180 Hz`, no extremo grave da gama de fala típica de um homem adulto, com um passa-baixo de `1200 Hz` que doma o zumbido do dente de serra até algo arredondado. A **Mulher adulta** quase duplica a base para `350 Hz`, abre o filtro para `1800 Hz` num tom mais brilhante e corta tanto o ganho (`0.25`) como o release (`0.04 s`) para uma articulação ligeiramente mais nítida.",
    },
    {
      type: "p",
      text: "O **Idoso** é o preset mais processado: o registo mais grave (`120 Hz`), o filtro mais escuro (`900 Hz`), o único vibrato (LFO de `5 Hz` com profundidade de `±15 Hz`) e o envelope mais lento (`0.04 s` de attack, `0.08 s` de release). Estes dois últimos valores importam tanto como o tom — o attack lento suaviza o arranque de cada sílaba e o release longo deixa os tons transbordar ligeiramente para o seguinte, evocando a articulação menos precisa que o preset procura.",
    },
    {
      type: "p",
      text: "A **Criança** inverte quase todas as decisões do Idoso: a base mais aguda (`600 Hz`), o filtro mais brilhante (`2500 Hz`), o ganho mais baixo (`0.20`) e o envelope mais rápido (`0.01 s` de attack, `0.03 s` de release). Envelopes rápidos em tons agudos são a receita clássica para vozes de criaturas pequenas — cada sílaba aterra como um pio rápido. O **Robot** é o caso à parte em dois eixos: é a única onda `square` e o único preset com attack e release a zero, o que significa que o ganho liga e desliga instantaneamente. Essas arestas abruptas produzem a qualidade dura, cortada e mecânica que o preset quer — sem rampa não há suavidade, por construção.",
    },
    { type: "h2", text: "Como o tom e a velocidade controlam realmente o oscilador" },
    {
      type: "p",
      text: "Dois cursores controlam o grafo em tempo real: o tom, de `100 – 800 Hz` com um valor predefinido de `300 Hz`, e a velocidade, de `0.5x – 2.0x` com um valor predefinido de `1.0x`. Cada preset também declara o seu próprio `baseFreq` canónico (o centro de referência listado na tabela acima), que documenta onde esse tipo de voz foi desenhado para se situar.",
    },
    {
      type: "p",
      text: "O tom define a frequência do oscilador diretamente, com uma única proteção: no preset Criança, a frequência reproduzida é `Math.max(pitch, 500)`, por isso arrastar o cursor abaixo de `500 Hz` no modo Criança não faz nada — o oscilador nunca desce abaixo desse limite. Este clamp protege o caráter do preset, já que uma voz de criança a `150 Hz` soaria simplesmente como um homem adulto em voz baixa.",
    },
    {
      type: "p",
      text: "A velocidade controla o tempo, não a frequência. Um único toque no botão de reprodução produz um beep com a duração de `0.5 / speed` segundos — `1.0 s` a `0.5x`, `0.5 s` a `1.0x` e `0.25 s` a `2.0x`. O mesmo divisor aplica-se a todas as constantes de tempo no modo de texto, por isso uma voz a `2.0x` é genuinamente duas vezes mais rápida de ponta a ponta em vez de ser reamostrada, o que teria deslocado o seu tom. Após a reprodução, a interface repõe o seu estado de reprodução ao fim de `500 / speed + 50` milissegundos: o comprimento do beep mais uma margem de `50 ms`.",
    },
    { type: "h2", text: "Do texto à fala, um beep por caráter" },
    {
      type: "p",
      text: "O modo de fala de texto do laboratório não é um motor de fala — é a mesma pipeline de oscilador de três nós, agendada uma vez por caráter. Quando escreves até `100` carateres e clicas em falar, a entrada é dividida em carateres individuais e cada caráter que não seja um espaço torna-se um beep de sílaba agendado com um desvio de tom derivado do seu código de caráter. As constantes de tempo, todas divididas pela velocidade:",
    },
    {
      type: "ul",
      items: [
        "**Tom por caráter** — `0.08 / speed` segundos por caráter (`0.08 s` a `1.0x`).",
        "**Intervalo entre carateres** — `0.03 / speed` segundos entre carateres consecutivos.",
        "**Intervalo entre palavras** — um espaço insere `0.12 / speed` segundos de silêncio, cerca de 1,5 comprimentos de caráter.",
        "**Pausa de frase** — cada 5.º caráter (`i % 5 === 4`) acrescenta uma pausa extra de `gap × 2`, dando ao output uma cadência em vez de um fluxo plano.",
        "**Tempo de antecipação** — o agendamento começa em `currentTime + 0.05` segundos, para que o grafo de áudio esteja pronto antes do primeiro tom.",
      ],
    },
    {
      type: "p",
      text: "A variação de tom é a parte engenhosa. O desvio de frequência de cada caráter é calculado como `((charCode % 20) - 10) × 3`, o que produz uma dispersão determinística entre `-30 Hz` e `+27 Hz` em torno do tom base. Ser determinístico importa: a mesma palavra produz sempre o mesmo contorno melódico, por isso uma dada frase torna-se reconhecível do mesmo modo que a voz de um Mii é reconhecível. Como os desvios vêm de códigos de caráter e não de fonética, o output segue de perto o ritmo do texto enquanto permanece um sem-sentido não lexical — que é precisamente o efeito de fala em beeps que o laboratório procura aproximar.",
    },
    { type: "h2", text: "Desenhar uma voz para cada grupo de personalidade" },
    {
      type: "p",
      text: "Uma voz de personalidade convincente é sobretudo uma decisão de gama de tom: escolhe o preset que a tabela de referência do site atribui ao grupo de personalidade do teu Mii e depois posiciona o cursor de tom dentro da gama recomendada. A correspondência completa usada pela [tabela de referência do Voice Lab](/pt/tomodachi-voice-lab):",
    },
    {
      type: "table",
      headers: ["Grupo", "Personalidade representativa", "MBTI", "Preset", "Intervalo de tom"],
      rows: [
        ["Extrovertido", "Líder", "ESTJ", "Homem adulto", "`180 – 250 Hz`"],
        ["Confiante", "Designer", "INTJ", "Homem adulto", "`150 – 200 Hz`"],
        ["Independente", "Artista", "INFP", "Mulher adulta", "`280 – 380 Hz`"],
        ["Calmo", "Sonhador", "INFJ", "Idoso", "`120 – 180 Hz`"],
        ["Personagens infantis", "Any", "Any", "Criança", "`500 – 700 Hz`"],
        ["Personagens robô/IA", "Any", "Any", "Robot", "`200 – 300 Hz`"],
      ],
    },
    {
      type: "p",
      text: "Repara que a tabela mapeia grupos, não todas as 16 personalidades — os quatro grupos de personalidade do nosso [mapeamento MBTI](/pt/tomodachi-life-mbti) recebem cada um uma silhueta de voz representativa, e as personalidades individuais exprimem-se pelo sítio onde posicionas o cursor dentro da gama e pela velocidade a que corres o controlo de velocidade. A receita passo a passo:",
    },
    {
      type: "ol",
      items: [
        "**Escolhe o preset a partir do grupo.** Miis Extrovertidos e Confiantes levam Homem adulto; Miis Independentes levam Mulher adulta; Miis Calmos levam Idoso, cujo vibrato de `5 Hz` acrescenta a qualidade descontraída e sem pressa pela qual o grupo é conhecido. O grupo de um Mii vem dos seus quatro cursores de personalidade — vê o [gráfico de personalidades](/pt/tomodachi-life-personality-chart) se ainda não o conheces.",
        "**Define o cursor de tom dentro da gama do grupo.** Para um Designer Confiante isso significa `150 – 200 Hz`; deslizar em direção a `150 Hz` soa mais imponente, em direção a `200 Hz` mais energético. O limite de `500 Hz` do preset Criança faz com que a gama `500 – 700 Hz` se imponha por si.",
        "**Escolhe a velocidade a combinar com o estilo de fala.** Tipos Animador de fala rápida justificam `1.4x – 2.0x`; um Sonhador sonolento fica naturalmente em `0.5x – 0.8x`. A velocidade muda apenas a duração, por isso nunca desafina a voz que escolheste no passo 2.",
        "**Testa com uma frase curta.** Escreve `20 – 30` carateres no campo de texto e está atento à pausa de frase a cada 5.º caráter — se a cadência parecer errada para a personalidade, ajusta a velocidade antes de tocar no tom.",
        "**Itera sobre o teu histórico.** Cada reprodução — preset, tom, velocidade e até `100` carateres de texto — é guardada num painel de histórico `IndexedDB` local dentro da ferramenta, para que possas fazer A/B a duas configurações sem as anotar. Nada sai do browser.",
      ],
    },
    {
      type: "p",
      text: "As linhas da criança e do robot ficam intencionalmente fora do sistema de personalidades: qualquer Mii pode receber qualquer uma das vozes, e é por isso que a sua coluna MBTI diz Any. O envelope de comprimento zero do robot torna-o tolerante ao tempo — a qualquer velocidade mantém a mesma rigidez cortada, por isso é a única voz em que a velocidade é puramente um controlo cómico.",
    },
    { type: "h2", text: "Porque é que não existe fallback da Web Speech API" },
    {
      type: "p",
      text: "O laboratório evita deliberadamente a Web Speech API do browser — não existe nenhuma chamada `speechSynthesis` em todo o seu código, e o modo de fala de texto é puro agendamento de oscilador. É uma decisão de design com uma justificação defensável e uma troca real, e vale a pena explicitar ambas.",
    },
    {
      type: "p",
      text: "A justificação: a `speechSynthesis` produz vozes humanas naturais, que é exatamente o que um laboratório de vozes de 8 bits não quer. Também delega a seleção de voz no sistema operativo, por isso o mesmo texto pode soar diferente entre browsers e dispositivos, e vários browsers carregam as vozes de forma preguiçosa com latência notável na primeira elocução. A abordagem de um beep por caráter mantém todos os sons dentro do mesmo grafo de três nós que o modo de beep único usa, garante timbre idêntico em todo o lado onde a Web Audio API funciona e arranca instantaneamente porque não há nada para carregar.",
    },
    {
      type: "p",
      text: "A troca: o output não é fala inteligível. Segue o ritmo e o contorno do texto mas não produz palavras reconhecíveis, por isso evoca a cadência da fala em beeps de Tomodachi Life em vez da sua compreensibilidade — e o sem-sentido do jogo também não é compreensível, o que é discutivelmente o ponto. Parar a reprodução é igualmente bruto e eficaz: o laboratório fecha o `AudioContext` inteiro via `close()`, o que mata imediatamente todos os nós agendados em vez de fazer um fade out.",
    },
    { type: "h2", text: "Limitações, enunciadas com honestidade" },
    {
      type: "p",
      text: "Três limitações enquadram o que este sintetizador pode honestamente afirmar. Primeiro, aproxima uma estética, não o motor do jogo: a Nintendo nunca documentou como Tomodachi Life gera as suas vozes, por isso os valores de preset aqui presentes são estimativas da comunidade afinadas para evocar o som da série, não constantes extraídas. As vozes lembram as do jogo, não são réplicas delas.",
    },
    {
      type: "p",
      text: "Segundo, a síntese é monofónica e sem formantes. Cada sílaba é um único oscilador moldado por um filtro passa-baixo, ao passo que a fala natural — e presumivelmente o motor mais sofisticado do jogo — transporta estrutura de formantes do trato vocal. É por isso que o output soa como voz chiptune em vez de fala amostrada, e é a lacuna que mais vale a pena explorar se expandires o código: um segundo oscilador uma oitava acima, ou um filtro com movimento de frequência agendado, empurrariam ambos o resultado para mais perto do território vocal.",
    },
    {
      type: "p",
      text: "Terceiro, tudo depende do suporte do browser. A Web Audio API usada aqui — `AudioContext`, `OscillatorNode`, `BiquadFilterNode`, `GainNode` — é suportada em todos os principais browsers atuais, mas o caráter do output da Web Audio API ainda varia ligeiramente entre as pilhas de áudio dos dispositivos, e os browsers que bloqueiam a reprodução automática até haver um gesto do utilizador vão exigir o toque no botão de reprodução que o laboratório já fornece. No que toca à privacidade, a ferramenta é totalmente client-side: a síntese corre no browser e a única persistência é o histórico `IndexedDB` local — nenhum áudio ou texto é enviado para lado nenhum.",
    },
    { type: "h2", text: "Experimenta a pipeline tu mesmo" },
    {
      type: "p",
      text: "A forma mais rápida de interiorizar o modelo é mexer nos dois cursores e ouvir o grafo a responder em tempo real:",
    },
    {
      type: "ul",
      items: [
        "[Tomodachi Voice Lab](/pt/tomodachi-voice-lab) — o sintetizador em si: cinco presets, o cursor de tom de `100 – 800 Hz`, o controlo de velocidade e o modo de texto com um beep por caráter.",
        "[Mapeamento MBTI de Tomodachi Life](/pt/tomodachi-life-mbti) — como os quatro cursores de personalidade de um Mii produzem o seu grupo, que decide o seu preset na tabela acima.",
        "[Gráfico de Personalidades](/pt/tomodachi-life-personality-chart) — a referência completa dos 16 tipos para escolheres uma personalidade representativa para dar voz.",
        "[Mii QR Unlocker](/pt/mii-qr-unlocker) — combina uma voz desenhada com um personagem Mii editado para o residente completo da ilha.",
      ],
    },
    {
      type: "callout",
      text: "Tomodachi Life e Nintendo são marcas registadas dos respetivos proprietários. Este sintetizador de voz é uma interpretação feita por fãs para fins de entretenimento e não é afiliado nem endossado pela Nintendo.",
    },
  ],
};
