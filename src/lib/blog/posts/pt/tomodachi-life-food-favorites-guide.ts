/**
 * LifeSimGrid — Artigo de blogue (pt): A comida favorita de cada Mii, um método de testes
 *
 * Tradução portuguesa (Portugal) de posts/tomodachi-life-food-favorites-guide.ts,
 * ancorada no modelo próprio do site:
 *   - src/lib/food-data.ts                       (FOODS, AFFINITY_PRESETS, reaction bands)
 *   - src/components/TomodachiLifeFoodChartPage.tsx  (tracker, recommendation panel)
 */

import type { BlogPost } from "../../types";

export const postFoodFavorites: BlogPost = {
  slug: "tomodachi-life-food-favorites-guide",
  title: "A comida favorita de cada Mii: um método de testes",
  description:
    "Protocolo repetível de 7 passos para encontrares a comida favorita de cada Mii no Tomodachi Life: 48 alimentos, 8 categorias e afinidades por grupo.",
  publishedAt: "2026-09-27",
  tags: ["Tomodachi Life", "Comida", "Personalidade", "Guias"],
  blocks: [
    {
      type: "p",
      text: "Cada Mii no Tomodachi Life carrega duas atribuições ocultas de comida: uma comida favorita gerada ao acaso e uma comida desfavorita gerada ao acaso. Como o jogo nunca te mostra nenhum dos dois valores, a única forma fiável de saberes o que um determinado Mii adora é dar-lhe de comer e observar a reação — e a forma mais barata de o fazer é começar pelos alimentos que o seu grupo de personalidade prefere. Este guia transforma essa ideia num protocolo repetível: como está organizada a base de dados de 48 alimentos por trás do nosso [gráfico de comida](/pt/tomodachi-life-food-chart), como funcionam os cinco níveis de reação, o que o modelo de afinidade estimado pela comunidade prevê para cada um dos quatro grupos de personalidade, e um ciclo de testes de sete passos que converte palpites numa procura registada e reproduzível. Todos os números abaixo vêm dos próprios ficheiros de dados do site, por isso podes reproduzir todo o método à mão.",
    },
    { type: "h2", text: "Porque é que as comidas favoritas importam na tua ilha" },
    {
      type: "p",
      text: "Dar a um Mii a sua comida favorita produz a reação positiva mais forte do sistema de comida do jogo, e essa reação merece que planeies em torno dela. As wikis da comunidade e os relatos de longa data dos jogadores descrevem a cena da comida favorita como uma das animações de alegria mais dramáticas da ilha: o Mii festeja, o seu humor salta à vista, e um residente satisfeito tende a aparecer sorridente nos eventos sociais que impulsionam amizades, romances e pedidos de casamento. Dar a comida desfavorita produz o oposto — uma reação claramente negativa. Conhecer as duas atribuições ocultas faz portanto dois trabalhos ao mesmo tempo: dá-te uma alavanca fiável de felicidade diária e impede-te de servir por acaso o único item que estraga o humor.",
    },
    {
      type: "p",
      text: "Há uma segunda razão, menos óbvia, para caçar as favoritas: testar comida é uma das poucas atividades da ilha que produz informação limpa, residente a residente. Cada refeição é uma experiência controlada — um residente, um alimento, uma reação observável — e o vocabulário de reações é pequeno o suficiente para o registar num único toque. Logo que uma favorita é confirmada e anotada, as decisões posteriores sobre esse residente tornam-se mais fáceis: quem recebe as coisas boas nas tuas rondas diárias, que reações esperar ao planear a [compatibilidade](/pt/tomodachi-life-compatibility), e que comidas manter longe da mesa de jantar. O resto deste guia trata de tornar essa experiência barata — menos refeições por favorita confirmada e zero notas perdidas.",
    },
    { type: "h2", text: "O espaço de procura: 8 categorias, 48 alimentos, 16 favoritas comuns" },
    {
      type: "p",
      text: "O teu espaço de procura é exatamente de 48 alimentos organizados em 8 categorias — bebidas, sobremesas, doces, lanches, pratos principais, frutas, verduras e outras — e conhecer a sua forma é o que torna possível um teste eficiente. A base de dados é a que está por trás do [gráfico de comida](/pt/tomodachi-life-food-chart). Cada entrada carrega três propriedades que importam para o protocolo: um `id` estável que serve de chave ao tracker, uma categoria, e um sinalizador `commonFavorite` que marca os 16 itens que a comunidade mais vezes vê acabar como favoritos. A repartição completa:",
    },
    {
      type: "table",
      headers: ["Categoria", "Alimentos", "Favoritas comuns", "Exemplos"],
      rows: [
        ["Bebidas", "9", "3", "Cola, Juice, Coffee, Sake"],
        ["Sobremesas", "8", "4", "Cake, Ice Cream, Donut, Pie"],
        ["Doces", "5", "2", "Chocolate, Candy, Licorice"],
        ["Lanches", "5", "2", "Chips, Popcorn, Pretzel"],
        ["Pratos principais", "10", "4", "Pizza, Sushi, Curry, Steak"],
        ["Frutas", "5", "1", "Apple, Banana, Melon"],
        ["Verduras", "4", "0", "Carrot, Broccoli, Salad"],
        ["Outras", "2", "0", "Boba Tea, Sundae"],
        ["Total", "48", "16", "—"],
      ],
    },
    {
      type: "p",
      text: "Dois detalhes estruturais saltam dessa tabela. Primeiro, as categorias pesadas são `main` (10 itens) e `drink` (9 itens), por isso uma passagem cega de força bruta queima lá a maioria das suas refeições — um protocolo que consiga adiar uma categoria pesada poupa dias reais de jogo. Segundo, os 16 itens `commonFavorite` concentram-se nos lugares de agrado geral: Cola, Juice e Soda entre as bebidas; Cake, Ice Cream, Donut e Cookie entre as sobremesas; Pizza, Hamburger, Sushi e Curry entre os pratos principais. Esses sinalizadores fazem boas sondagens iniciais ainda antes de a personalidade entrar em cena. Os dois itens `other` — Boba Tea e Sundae — são a cauda de nicho da lista, e exatamente onde um grupo de personalidade gosta de olhar primeiro.",
    },
    { type: "h2", text: "Como funcionam as reações: cinco níveis e um par oculto" },
    {
      type: "p",
      text: "Cada refeição resolve-se num de cinco níveis de reação — `love`, `like`, `neutral`, `dislike` ou `hate` — e cada nível é uma animação distinta e observável no jogo. A escala de cinco níveis é também o vocabulário que o nosso tracker usa: cada linha de comida tem cinco botões compactos de registo, um por nível (♥ para Adora, ▲ para Gosta, – para Neutra, ▼ para Não gosta, ✕ para Odia), por isso registar um resultado leva um único toque. A escala é deliberadamente grosseira — fina o suficiente para comparar dois alimentos positivos entre si, grosseira o suficiente para nunca ficares indeciso sobre o nível que acabaste de ver.",
    },
    {
      type: "p",
      text: "Por baixo do capô, o modelo do site anexa uma pontuação de afinidade de `0–100` a cada alimento para cada grupo de personalidade, e uma regra fixa de bandas converte uma pontuação num nível previsto: `90` ou mais mapeia para `love`, `75–89` para `like`, `40–74` para `neutral`, `25–39` para `dislike`, e tudo abaixo de `25` para `hate`. Essas bandas alimentam apenas a previsão. Logo que a favorita real de um Mii é confirmada, o modelo curto-circuita: a comida favorita é forçada a `love` e a desfavorita a `hate`, independentemente do que a heurística diga. Essa imposição espelha o comportamento real do jogo — a atribuição oculta ganha sempre à personalidade, que é precisamente a razão pela qual o teste existe.",
    },
    { type: "h2", text: "O que o modelo prevê para cada grupo de personalidade" },
    {
      type: "p",
      text: "Os quatro grupos de personalidade — **Grupo Extrovertido**, **Grupo Confiante**, **Grupo Independente** e **Grupo Calmo** — recebem cada um uma ordenação distinta sobre as oito categorias, e essa ordenação é a tua ordem de teste. A matriz abaixo é a linha de base completa estimada pela comunidade a partir do ficheiro de dados do site; lê uma coluna de cima a baixo e estás a ler o menu sugerido desse grupo:",
    },
    {
      type: "table",
      headers: ["Categoria", "Extrovertido", "Confiante", "Independente", "Calmo"],
      rows: [
        ["Bebidas", "90", "70", "60", "75"],
        ["Sobremesas", "85", "65", "70", "80"],
        ["Doces", "95", "55", "60", "75"],
        ["Lanches", "80", "75", "70", "85"],
        ["Pratos principais", "65", "90", "60", "90"],
        ["Frutas", "75", "70", "75", "80"],
        ["Verduras", "60", "65", "80", "85"],
        ["Outras", "70", "60", "85", "70"],
      ],
    },
    {
      type: "p",
      text: "Emergem quatro menus claros. Os Miis do **Grupo Extrovertido** — o Líder, o Animador, o Inovador e o Otimista — atingem o pico nos doces (`95`), nas bebidas (`90`) e nas sobremesas (`85`): um dente doce enérgico e virado para a festa. Os Miis do **Grupo Confiante** — Designer, Aventureiro, Empreendedor, Encantador — atingem o pico nos pratos principais (`90`), a ponta da lista virada ao restaurante e ao estatuto. Os Miis do **Grupo Independente** — Artista, Espírito Livre, Pensador, Lobo Solitário — são o caso interessante: as suas pontuações mais altas pertencem aos itens de nicho `other` (`85`) e às verduras (`80`), e é por isso que Boba Tea e Sundae ganham sequer um lugar na base de dados. Os Miis do **Grupo Calmo** — Sonhador, Carinhoso, Sensível, Amigo — preferem a extremidade caseira: pratos principais (`90`), lanches (`85`) e verduras (`85`). A pré-visualização de reações do gráfico amostra um residente por grupo — um Líder, um Empreendedor, um Pensador e um Amigo — para poderes comparar os quatro menus lado a lado. Para saberes como é que um Mii acaba num destes grupos, vê o nosso [guia de mapeamento MBTI](/pt/blog/tomodachi-life-mbti-mapping-explained).",
    },
    {
      type: "p",
      text: "Uma propriedade honesta da matriz: cada célula situa-se entre `55` e `95`, o que significa que a heurística sozinha só consegue alguma vez prever `love`, `like` ou `neutral`. Os dois níveis negativos nunca são produzidos pela afinidade de personalidade. Na prática, os negativos vêm da segunda atribuição oculta — a comida desfavorita, que é exatamente tão aleatória como a favorita. A personalidade diz-te onde começar a procurar o lado positivo; nada te diz onde se esconde o lado negativo, exceto o teste.",
    },
    { type: "h2", text: "O protocolo de teste: sete passos até uma favorita confirmada" },
    {
      type: "p",
      text: "O protocolo encontra uma favorita com o mínimo de refeições possível ao testar primeiro as categorias mais fortes do grupo, ao registar todos os resultados e ao podar categorias à medida que a evidência chega. Podes executá-lo inteiramente dentro do [tracker do gráfico de comida](/pt/tomodachi-life-food-chart), que se lembra da tua lista de verificação entre sessões.",
    },
    {
      type: "ol",
      items: [
        "**Identifica o grupo de personalidade do Mii.** Procura o residente na [tabela de personalidades](/pt/tomodachi-life-personality-chart) ou no [mapeamento MBTI](/pt/tomodachi-life-mbti) e anota o grupo: Grupo Extrovertido, Grupo Confiante, Grupo Independente ou Grupo Calmo. Para a comida, só o grupo importa — o subtipo (Otimista versus Inovador, por exemplo) não altera a matriz de afinidade.",
        "**Retira os 5 melhores candidatos iniciais do grupo.** O painel de recomendações do gráfico ordena os 48 alimentos pela afinidade do grupo selecionado e mostra os cinco mais altos. Para um Mii do Grupo Extrovertido, isso são os cinco itens de doces a `95`; para um Mii do Grupo Calmo, o painel começa com os pratos principais a `90`. Esses cinco alimentos são a tua primeira sessão.",
        "**Dá um candidato de cada vez, primeiro o de maior afinidade.** Um alimento por refeição mantém a evidência limpa — presentes em rajada desfocam qual item causou qual reação. Observa a animação, classifica-a na escala de cinco níveis e só depois passa ao candidato seguinte.",
        "**Regista todos os resultados imediatamente.** Toca no botão de reação correspondente na linha do alimento. O tracker persiste a lista de verificação em `localStorage` sob a chave `lifesimgrid-food-tracker`, por isso os alimentos testados, as suas reações registadas e o contador de progresso sobrevivem a recarregamentos de página e a reinícios do navegador — sem conta, sem sincronização, sem notas perdidas.",
        "**Confirma a vencedora no momento em que vires a reação mais forte.** Marca esse alimento como `love` no tracker e define-o como comida favorita do Mii no seletor no topo do gráfico. A partir daí, o gráfico força `love` para esse alimento independentemente do que a heurística preveria, e a favorita fica decidida.",
        "**Se uma categoria vier morna, elimina-a e passa para a categoria seguinte mais forte do grupo.** Uma sequência de reações `neutral` ao longo dos itens de uma categoria é evidência de que a favorita vive noutro lado. Guarda quaisquer resultados `like` como alternativas — uma comida de que o Mii gosta não é a favorita, mas continua a ser uma escolha diária fiável. Desce a matriz de afinidade categoria a categoria até a vencedora aparecer.",
        "**Regista a comida desfavorita quando a oportunidade aparecer, e faz reset entre Miis.** A comida desfavorita revela-se como a reação negativa mais forte durante o teste normal — regista-a da mesma forma e fixa-a no seletor para que o gráfico force `hate` para ela. Quando mudas de residente, limpa o tracker com um único botão (ou usa um perfil de navegador separado), porque a lista de verificação é guardada por navegador, não por Mii.",
      ],
    },
    {
      type: "p",
      text: "O limite absoluto do protocolo é 48 refeições — a base de dados inteira. A ordenação grupo-primeiro existe para que quase nunca te aproximes disso. A cobertura completa das duas categorias de topo de um grupo custa no máximo 15 refeições (pratos principais e lanches somam 15 itens no total para Miis do Grupo Calmo e do Grupo Confiante) e apenas 6 para um Mii do Grupo Independente, cujas categorias preferidas, `other` e verduras, juntam apenas 6 itens entre si. Estas são expectativas de ponto de partida, não garantias — a atribuição oculta é aleatória, e um residente azarado pode empurrar-te mais fundo na matriz.",
    },
    { type: "h2", text: "Exemplo prático: um Mii do Grupo Extrovertido ao longo do ciclo" },
    {
      type: "p",
      text: "Um Mii do Grupo Extrovertido — digamos um Inovador — deve ser sondado primeiro com doces, e o painel de recomendações concorda: os cinco itens de doces com afinidade `95`, com as nove bebidas à espera a `90`. Eis uma sessão realista:",
    },
    {
      type: "ul",
      items: [
        "Refeições 1–5 — Chocolate, Gum, Caramel, Licorice, Candy: o Chocolate dá um `like` claro, a Candy outro `like`, o resto `neutral`. Sem reação de topo, por isso os doces estão fora — e como a primeira sessão acontece por acaso a cobrir a categoria de doces inteira, cinco refeições eliminaram-na completamente.",
        "Refeições 6–8 — Cola, Juice, Soda: todas `neutral`. Três bebidas favoritas comuns seguidas e mornas são evidência fraca contra a categoria inteira de 9 bebidas, por isso o jogador estaciona as seis bebidas por testar (Coffee, Tea, Milk, Water, Beer, Sake) e salta de nível em vez de as moer uma a uma.",
        "Refeições 9–10 — Cake, Ice Cream: o Cake fica `neutral`, e o Ice Cream produz a inconfundível reação positiva mais forte. É a favorita.",
        "Confirmação — o Ice Cream entra no seletor de favoritas, o gráfico agora força `love` para ele, e o contador de progresso marca 10 de 48 alimentos testados — cerca de 21% da base de dados para uma vencedora confirmada.",
      ],
    },
    {
      type: "p",
      text: "Dez refeições produziram uma favorita confirmada, uma categoria totalmente eliminada, uma categoria estacionada, e dois alimentos alternativos registados que o jogador ainda pode servir em dias comuns. Repara no que o protocolo nunca tocou: a categoria `main` de 10 itens e a categoria `vegetable` de 4 itens, as duas afinidades mais fracas de um Mii do Grupo Extrovertido (`65` e `60`). A comida desfavorita continua desconhecida — é tão aleatória como a favorita — por isso, durante os dias normais da ilha, o jogador mantém os olhos abertos para uma reação negativa forte, e fixa-a como `hate` no seletor sempre que aparece. Executa o mesmo ciclo num Mii do Grupo Calmo e só o ponto de entrada muda: o painel começaria com pratos principais e lanches em vez de doces.",
    },
    { type: "h2", text: "Porque é que as favoritas são aleatórias — e porque é que os guias de resposta fixa falham" },
    {
      type: "p",
      text: "Qualquer guia que imprima uma comida favorita fixa para uma determinada personalidade está a descrever um ficheiro de jogo gravado, não o jogo. O ficheiro de dados por trás do nosso gráfico afirma a situação claramente: o Tomodachi Life não publica uma matriz oficial de reações a comida, e cada Mii recebe uma comida favorita gerada ao acaso e uma comida desfavorita gerada ao acaso. A aleatoriedade é por residente, não por personalidade — dois Miis com a personalidade idêntica, o nome idêntico e até controlos deslizantes idênticos no editor podem carregar favoritas ocultas diferentes.",
    },
    {
      type: "p",
      text: "Esse único facto redefine o que um guia útil pode ser. Uma tabela de consulta não pode funcionar, porque a resposta não é função de nada que consigas ler no Mii. O que pode funcionar é uma estratégia de procura: uma ordenação que põe primeiro os candidatos estatisticamente mais prováveis, um sistema de registo que nunca perde um resultado, e uma regra de eliminação que poda categorias à medida que a evidência chega. É exatamente isso que a matriz de afinidade de quatro grupos fornece — pontos de partida, não respostas — e é por isso que o nosso [gráfico de comida](/pt/tomodachi-life-food-chart) traz um tracker persistente em vez de uma tabela de favoritas alegadas. Encara qualquer site que prometa favoritas fixas por personalidade como encararias um horóscopo: divertido, infalsificável e sem utilidade nenhuma para a tua ilha real.",
    },
    { type: "h2", text: "Limites do modelo (lê esta parte)" },
    {
      type: "p",
      text: "Os números de afinidade deste guia são uma estimativa da comunidade, não dados extraídos do jogo — a Nintendo nunca publicou o funcionamento interno do sistema de comida. As predefinições estão explicitamente afinadas para que cada grupo mostre uma ordenação distinta ao longo das categorias, porque uma ordenação distinta é o que torna sequer possível uma recomendação de «que comida tentar primeiro». Essa afinação é uma escolha de modelação. Aproxima a observação da comunidade com rigor suficiente para ser útil ao ordenar os teus testes e, como todos os modelos, falha em alguma coisa.",
    },
    {
      type: "p",
      text: "Três avisos que vale a pena manter em mente. Primeiro, a regra de bandas significa que o modelo só consegue prever até `neutral` — todos os valores predefinidos situam-se em `55` ou mais — por isso as reações negativas são sempre surpresas vindas da atribuição desfavorita oculta, nunca previsões. Segundo, a base de dados de 48 itens é um subconjunto curado de comidas observadas ao longo dos títulos de Tomodachi Life, não uma lista completa de comidas dentro do jogo; se uma refeição produzir uma reação que não consigas encontrar no gráfico, regista o equivalente mais próximo e continua. Terceiro, o tracker guarda uma única lista de verificação por navegador sob uma chave `localStorage`, por isso mantém um único Mii ativo de cada vez — limpa-o entre residentes, ou mantém um perfil de navegador por ilhéu se estiveres a caçar vários em paralelo. Nada disto altera o resultado essencial: um registo por Mii, baseado em evidência, do que cada residente realmente adora. O modelo decide onde começas; as tuas refeições decidem no que acreditas.",
    },
    { type: "h2", text: "Experimenta o protocolo tu mesmo" },
    {
      type: "ul",
      items: [
        "[Gráfico de comida e tracker](/pt/tomodachi-life-food-chart) — a base de dados completa de 48 alimentos, o painel de recomendações por grupo e a lista de verificação persistente de alimentos testados.",
        "[Tabela de Personalidades](/pt/tomodachi-life-personality-chart) — a referência dos 16 tipos com grupos codificados por cor, para o passo 1 do protocolo.",
        "[Mapeamento MBTI](/pt/tomodachi-life-mbti) — explora os residentes por código de quatro letras, se é assim que organizas o teu plantel.",
        "[Calculadora de Compatibilidade](/pt/tomodachi-life-compatibility) — emparelha dois residentes e decompõe as pontuações de romance e de amizade depois de as favoritas ficarem registadas.",
      ],
    },
    {
      type: "callout",
      text: "Este guia de comida é uma interpretação feita por fãs para fins de entretenimento e planeamento, sem afiliação com a Nintendo ou a Myers-Briggs Company e sem o endosso de qualquer delas. MBTI e Nintendo são marcas registadas dos respetivos proprietários.",
    },
  ],
};
