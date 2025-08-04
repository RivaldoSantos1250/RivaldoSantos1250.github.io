/*
============================================================
BANCO DE DADOS DE RECEITAS
============================================================
AVISO: As novas receitas estão usando uma imagem temporária 
chamada 'placeholder.jpg'. Lembre-se de criar as imagens 
para cada nova receita e atualizar o caminho no campo 'imagem'.
============================================================
*/

const receitas = [
    // --- RECEITAS EXISTENTES ---
    {
        id: "pudim-tapioca",
        titulo: "Pudim de Tapioca",
        imagem: "/assets/img/pudim-tapioca.jpg",
        tempoPreparo: "2h",
        porcoes: "12 porções",
        categoria: "sobremesas",
        ingredientes: [ "500g de tapioca granulada", "1 litro e meio de leite", "1 vidro de leite de coco", "1 lata de leite condensado", "1 xícara de chá de açúcar", "Coco ralado desidratado a gosto" ],
        modoPreparo: [ "É importante hidratar a tapioca com leite antes de preparar o pudim para que a massa fique bem macia e molhadinha.", "Em um recipiente, coloque 500 gramas de tapioca granulada e 1 litro e meio de leite. Misture.", "Em seguida, adicione 1 vidro de leite de coco, 1 lata de leite condensado e 1 xícara de chá de açúcar. Misture novamente.", "Transfira a mistura para uma forma e leve para gelar por 2 horas.", "Desenforme e finalize com coco desidratado ralado a gosto." ],
        observacoes: []
    },
    {
        id: "pudim-leite-condensado",
        titulo: "Pudim de Leite Condensado",
        imagem: "/assets/img/pudim-leite-condensado.webp",
        tempoPreparo: "1h 30min",
        porcoes: "8 porções",
        categoria: "sobremesas",
        ingredientes: [ "1 xícara de açúcar (para a calda)", "1/4 de xícara de água (para a calda)", "1 lata de leite condensado", "A mesma medida de leite", "3 ovos inteiros", "1 colher de chá de essência de baunilha (opcional)" ],
        modoPreparo: [ "Em uma panela, coloque o açúcar e a água. Leve ao fogo médio-baixo, sem mexer, até obter uma calda dourada.", "Despeje o caramelo em uma forma para pudim e reserve.", "No liquidificador, coloque o leite condensado, o leite, os ovos e a essência de baunilha. Bata tudo até obter uma mistura homogênea.", "Despeje a mistura na forma caramelizada e cubra com papel alumínio.", "Asse em banho-maria por aproximadamente 1 hora e 30 minutos a 180°C.", "Deixe esfriar, leve à geladeira por pelo menos 4 horas e desenforme." ],
        observacoes: [ "Se desejar, decore o pudim com raspas de chocolate ou frutas cristalizadas antes de servir." ]
    },
    {
        id: "brownie-caneca",
        titulo: "Brownie de Caneca",
        imagem: "/assets/img/brownie.jpg",
        tempoPreparo: "5min",
        porcoes: "1 porção",
        categoria: "sobremesas",
        ingredientes: [ "2 colheres de sopa de farinha de trigo", "2 colheres de sopa de chocolate em pó", "2 colheres de sopa de açúcar", "2 colheres de sopa de leite", "1 e 1/2 colher de sopa de manteiga derretida" ],
        modoPreparo: [ "Em uma caneca grande, misture a farinha, o chocolate, o açúcar, o leite e a margarina até obter uma massa homogênea.", "Adicione gotas de chocolate e mexa delicadamente.", "Leve ao micro-ondas por 1 minuto.", "Caso precise de mais tempo coloque de 10 em 10 segundos até ficar pronto." ],
        observacoes: [ "Experimente adicionar nozes picadas ou pedaços de chocolate amargo para uma versão ainda mais indulgente." ]
    },
    {
        id: "brigadeiro-microondas",
        titulo: "Brigadeiro de Micro-ondas",
        imagem: "/assets/img/brigadeiro-microondas.jpg",
        tempoPreparo: "10min",
        porcoes: "20 brigadeiros",
        categoria: "sobremesas",
        ingredientes: [ "1 lata de leite condensado", "2 colheres de sopa de chocolate em pó", "1 colher de sopa de manteiga", "Chocolate granulado para decorar" ],
        modoPreparo: [ "Em uma tigela própria para micro-ondas, misture o leite condensado, o chocolate em pó e a manteiga.", "Leve ao micro-ondas por 6 a 8 minutos, mexendo a cada 2 minutos para não queimar.", "Quando a mistura estiver desgrudando do fundo da tigela, retire do micro-ondas e deixe esfriar.", "Com as mãos untadas de manteiga, faça bolinhas e passe-as no chocolate granulado.", "Coloque os brigadeiros em forminhas de papel e sirva." ],
        observacoes: [ "Você pode substituir o chocolate em pó por cacau em pó para um sabor mais intenso." ]
    },
    {
        id: "mojito-classico",
        titulo: "Mojito Clássico",
        imagem: "/assets/img/mojito.jpg",
        tempoPreparo: "10min",
        porcoes: "1 porção",
        categoria: "drinques",
        ingredientes: [ "limão", "folhas de hortelã", "açúcar", "rum branco", "Água com gás", "Gelo" ],
        modoPreparo: [ "Em um copo alto, adicione os pedaços de limão e o açúcar. Amasse suavemente.", "Adicione as folhas de hortelã e amasse delicadamente para liberar os aromas.", "Encha o copo com gelo e adicione o rum branco.", "Complete o copo com água com gás e mexa suavemente.", "Decore com um ramo de hortelã e uma fatia de limão." ],
        observacoes: [ "Para um toque extra, adicione algumas gotas de angostura." ]
    },
    {
        id: "panqueca-aveia-banana",
        titulo: "Panquecas de Aveia e Banana",
        imagem: "/assets/img/panqueca-aveia-banana.jpg",
        tempoPreparo: "20min",
        porcoes: "4 porções",
        categoria: "café-da-manhã",
        ingredientes: [ "2 bananas maduras", "2 ovos", "1/2 xícara de aveia", "1 colher de chá de canela", "Mel a gosto" ],
        modoPreparo: [ "Amasse as bananas em uma tigela grande.", "Adicione os ovos e misture bem até ficar homogêneo.", "Acrescente a aveia e a canela, misturando bem.", "Aqueça uma frigideira antiaderente em fogo médio.", "Despeje pequenas porções da massa na frigideira, formando as panquecas.", "Cozinhe por 2-3 minutos de cada lado ou até dourar.", "Sirva as panquecas quentes com mel, frutas ou iogurte." ],
        observacoes: [ "Para uma versão sem glúten, utilize aveia certificada sem glúten." ]
    },

    // --- 20 NOVAS RECEITAS ---
    {
        id: "feijoada-completa",
        titulo: "Feijoada Completa",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "3h",
        porcoes: "8 porções",
        categoria: "prato-principal",
        ingredientes: [ "1 kg de feijão preto", "200g de carne seca", "200g de costelinha de porco", "1 paio", "1 linguiça calabresa", "200g de lombo de porco", "2 folhas de louro", "1 cebola grande picada", "4 dentes de alho picados", "Sal e pimenta a gosto" ],
        modoPreparo: [ "Deixe as carnes salgadas de molho de um dia para o outro, trocando a água algumas vezes.", "Cozinhe o feijão com as folhas de louro.", "Em outra panela, cozinhe as carnes dessalgadas.", "Quando as carnes estiverem macias, junte-as ao feijão e cozinhe por mais 1 hora.", "Faça um refogado com cebola e alho e adicione à feijoada.", "Ajuste o sal e a pimenta e sirva com arroz, couve e farofa." ],
        observacoes: [ "Sirva com laranja fatiada para ajudar na digestão." ]
    },
    {
        id: "moqueca-baiana",
        titulo: "Moqueca Baiana",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "50min",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "1 kg de peixe branco em postas", "2 cebolas em rodelas", "1 pimentão vermelho em rodelas", "1 pimentão amarelo em rodelas", "4 tomates em rodelas", "1 maço de coentro picado", "500 ml de leite de coco", "2 colheres de sopa de azeite de dendê", "Suco de 1 limão", "Sal e pimenta a gosto" ],
        modoPreparo: [ "Tempere o peixe com sal, pimenta e limão.", "Em uma panela de barro, faça camadas de cebola, pimentão, tomate e peixe.", "Regue com o leite de coco e o azeite de dendê.", "Cozinhe em fogo médio por cerca de 30 minutos.", "Finalize com coentro picado e sirva com arroz branco e pirão." ],
        observacoes: [ "Use peixes como robalo ou cação para uma moqueca mais tradicional." ]
    },
    {
        id: "strogonoff-de-frango",
        titulo: "Strogonoff de Frango",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "30min",
        porcoes: "4 porções",
        categoria: "prato-principal",
        ingredientes: [ "1 kg de filé de frango em cubos", "1 cebola picada", "2 dentes de alho picados", "2 colheres de sopa de manteiga", "1/2 xícara de conhaque (opcional)", "200g de champignon fatiado", "1 xícara de ketchup", "1/2 xícara de mostarda", "1 lata de creme de leite" ],
        modoPreparo: [ "Em uma panela, derreta a manteiga e doure o alho e a cebola.", "Adicione o frango e frite até dourar.", "Se usar, adicione o conhaque e flambe.", "Acrescente o champignon, o ketchup e a mostarda. Cozinhe por 5 minutos.", "Desligue o fogo e incorpore o creme de leite.", "Sirva imediatamente com arroz branco e batata palha." ],
        observacoes: []
    },
    {
        id: "lasanha-a-bolonhesa",
        titulo: "Lasanha à Bolonhesa",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h 30min",
        porcoes: "8 porções",
        categoria: "prato-principal",
        ingredientes: [ "500g de massa para lasanha", "500g de carne moída", "1 cebola picada", "2 dentes de alho picados", "1 lata de tomate pelado", "500g de queijo muçarela fatiado", "400g de presunto fatiado", "Molho branco a gosto", "Queijo parmesão ralado a gosto" ],
        modoPreparo: [ "Refogue a cebola e o alho, adicione a carne moída e frite até dourar.", "Junte o tomate pelado e cozinhe por 20 minutos para fazer o molho bolonhesa.", "Cozinhe a massa da lasanha conforme as instruções da embalagem.", "Em um refratário, monte a lasanha em camadas: molho, massa, presunto, queijo.", "Repita as camadas e finalize com molho branco e queijo parmesão.", "Leve ao forno pré-aquecido a 180°C por 30 minutos ou até gratinar." ],
        observacoes: [ "Para um molho branco rápido, use 1 litro de leite, 2 colheres de manteiga e 2 colheres de farinha de trigo." ]
    },
    {
        id: "coxinha-de-frango",
        titulo: "Coxinha de Frango",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h",
        porcoes: "20 unidades",
        categoria: "lanches",
        ingredientes: [ "1 peito de frango cozido e desfiado", "1 cebola picada", "2 dentes de alho picados", "1 xícara do caldo do cozimento do frango", "2 xícaras de farinha de trigo", "Sal e cheiro-verde a gosto", "Farinha de rosca e ovos para empanar" ],
        modoPreparo: [ "Refogue a cebola e o alho, adicione o frango desfiado e o cheiro-verde. Reserve.", "Em uma panela, ferva o caldo do frango. Adicione a farinha de trigo de uma vez, mexendo sem parar até formar uma massa que desgrude do fundo.", "Deixe a massa amornar, sove bem e abra pequenas porções na mão.", "Recheie com o frango, modele as coxinhas, passe no ovo e na farinha de rosca.", "Frite em óleo quente até dourar." ],
        observacoes: [ "Adicionar um pouco de requeijão cremoso ao recheio deixa a coxinha ainda mais gostosa." ]
    },
    {
        id: "pao-de-queijo-mineiro",
        titulo: "Pão de Queijo Mineiro",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "40min",
        porcoes: "30 unidades",
        categoria: "café-da-manhã",
        ingredientes: [ "500g de polvilho azedo", "1 xícara de leite", "1/2 xícara de óleo", "1 colher de chá de sal", "3 ovos", "200g de queijo minas padrão ralado" ],
        modoPreparo: [ "Em uma panela, ferva o leite, o óleo e o sal.", "Despeje a mistura quente sobre o polvilho em uma tigela e misture bem. Deixe amornar.", "Adicione os ovos, um a um, misturando a cada adição.", "Incorpore o queijo ralado e amasse até obter uma massa homogênea.", "Faça bolinhas e asse em forno pré-aquecido a 180°C por cerca de 25 minutos, ou até dourarem." ],
        observacoes: []
    },
    {
        id: "mousse-de-maracuja",
        titulo: "Mousse de Maracujá",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "15min",
        porcoes: "6 porções",
        categoria: "sobremesas",
        ingredientes: [ "1 lata de leite condensado", "1 lata de creme de leite", "A mesma medida (da lata) de suco de maracujá concentrado" ],
        modoPreparo: [ "Bata todos os ingredientes no liquidificador por aproximadamente 3 minutos.", "Despeje em um refratário ou em taças individuais.", "Leve à geladeira por pelo menos 2 horas antes de servir." ],
        observacoes: [ "Decore com a polpa de um maracujá fresco por cima para um toque especial." ]
    },
    {
        id: "bolo-de-cenoura-com-chocolate",
        titulo: "Bolo de Cenoura com Chocolate",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h",
        porcoes: "12 porções",
        categoria: "lanches",
        ingredientes: [ "3 cenouras médias raladas", "4 ovos", "1 xícara de óleo", "2 xícaras de açúcar", "2 xícaras de farinha de trigo", "1 colher de sopa de fermento em pó", "1 lata de leite condensado (cobertura)", "3 colheres de sopa de chocolate em pó (cobertura)" ],
        modoPreparo: [ "No liquidificador, bata as cenouras, os ovos e o óleo.", "Em uma tigela, misture o açúcar e a farinha. Adicione a mistura do liquidificador e mexa bem.", "Incorpore o fermento delicadamente.", "Asse em forma untada em forno a 180°C por 40 minutos.", "Para a cobertura, misture o leite condensado e o chocolate em pó e leve ao fogo baixo até engrossar.", "Despeje sobre o bolo." ],
        observacoes: []
    },
    {
        id: "caipirinha-tradicional",
        titulo: "Caipirinha Tradicional",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "5min",
        porcoes: "1 porção",
        categoria: "drinques",
        ingredientes: [ "1 limão taiti", "2 colheres de sopa de açúcar", "50 ml de cachaça", "Gelo a gosto" ],
        modoPreparo: [ "Corte o limão em rodelas ou pedaços, removendo o miolo branco.", "Em um copo, macere o limão com o açúcar.", "Complete o copo com gelo.", "Adicione a cachaça e mexa bem." ],
        observacoes: [ "Experimente com outras frutas como morango, kiwi ou abacaxi." ]
    },
    {
        id: "escondidinho-de-carne-seca",
        titulo: "Escondidinho de Carne Seca",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h 20min",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "500g de carne seca dessalgada e desfiada", "1 kg de mandioca cozida e amassada", "1 cebola picada", "2 dentes de alho picados", "1 xícara de leite", "2 colheres de sopa de manteiga", "Queijo coalho ralado a gosto" ],
        modoPreparo: [ "Refogue a cebola e o alho, adicione a carne seca e cozinhe por 10 minutos.", "Em outra panela, misture a mandioca amassada com o leite e a manteiga para fazer o purê.", "Em um refratário, coloque a carne seca no fundo e cubra com o purê de mandioca.", "Polvilhe o queijo coalho por cima.", "Leve ao forno para gratinar." ],
        observacoes: []
    },
    {
        id: "vatapa",
        titulo: "Vatapá",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h",
        porcoes: "8 porções",
        categoria: "prato-principal",
        ingredientes: [ "500g de camarão seco", "200g de castanha de caju moída", "100g de amendoim torrado e moído", "2 pães franceses amanhecidos", "1 litro de leite de coco", "1 cebola grande", "Gengibre ralado a gosto", "Azeite de dendê a gosto" ],
        modoPreparo: [ "Deixe o pão de molho no leite de coco.", "Bata no liquidificador o pão amolecido, a cebola, o amendoim, a castanha e o gengibre.", "Leve a mistura ao fogo, adicione o camarão seco e cozinhe, mexendo sempre.", "Quando engrossar, adicione o azeite de dendê e cozinhe por mais alguns minutos.", "Sirva com arroz branco." ],
        observacoes: []
    },
    {
        id: "galinhada-com-pequi",
        titulo: "Galinhada com Pequi",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h 15min",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "1 frango inteiro em pedaços", "2 xícaras de arroz", "1 cebola picada", "3 dentes de alho picados", "10 a 15 pequis cozidos", "Açafrão-da-terra (cúrcuma) a gosto", "Cheiro-verde picado" ],
        modoPreparo: [ "Tempere e frite os pedaços de frango até dourarem.", "Na mesma panela, refogue a cebola e o alho.", "Adicione o arroz e o açafrão, e refogue mais um pouco.", "Cubra com água quente, adicione os pequis e cozinhe até o arroz ficar macio.", "Finalize com cheiro-verde." ],
        observacoes: [ "Cuidado ao roer o pequi, ele tem espinhos no caroço." ]
    },
    {
        id: "pave-de-biscoito",
        titulo: "Pavê de Biscoito com Chocolate",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "30min",
        porcoes: "10 porções",
        categoria: "sobremesas",
        ingredientes: [ "1 lata de leite condensado", "1 lata de creme de leite", "A mesma medida de leite", "2 gemas", "1 pacote de biscoito maisena", "Chocolate em pó a gosto" ],
        modoPreparo: [ "Leve ao fogo o leite condensado, o leite e as gemas, mexendo até engrossar.", "Deixe o creme esfriar e misture o creme de leite.", "Em um refratário, faça camadas de creme e biscoitos umedecidos no leite.", "Finalize com uma camada de creme e polvilhe chocolate em pó.", "Leve à geladeira por no mínimo 4 horas." ],
        observacoes: []
    },
    {
        id: "bolinho-de-chuva",
        titulo: "Bolinho de Chuva da Vovó",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "25min",
        porcoes: "30 unidades",
        categoria: "lanches",
        ingredientes: [ "2 ovos", "1 xícara de açúcar", "1 xícara de leite", "2 e 1/2 xícaras de farinha de trigo", "1 colher de sopa de fermento em pó", "Açúcar e canela para polvilhar" ],
        modoPreparo: [ "Em uma tigela, misture os ovos e o açúcar.", "Adicione o leite e a farinha aos poucos, mexendo bem.", "Por último, adicione o fermento.", "Com a ajuda de duas colheres, modele os bolinhos e frite em óleo quente.", "Escorra em papel toalha e passe na mistura de açúcar e canela." ],
        observacoes: []
    },
    {
        id: "empadao-de-frango",
        titulo: "Empadão de Frango Cremoso",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h 30min",
        porcoes: "8 porções",
        categoria: "lanches",
        ingredientes: [ "3 xícaras de farinha de trigo", "200g de manteiga gelada", "1 ovo", "1/2 xícara de água gelada", "Recheio de frango cremoso a gosto", "1 gema para pincelar" ],
        modoPreparo: [ "Misture a farinha e a manteiga até formar uma farofa.", "Adicione o ovo e a água aos poucos, até a massa dar liga.", "Forre o fundo e as laterais de uma forma com parte da massa.", "Coloque o recheio de frango.", "Cubra com o restante da massa, pincele com a gema e asse em forno a 180°C por 40 minutos." ],
        observacoes: []
    },
    {
        id: "arroz-carreteiro",
        titulo: "Arroz Carreteiro",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "50min",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "500g de carne seca ou charque", "2 xícaras de arroz", "1 cebola picada", "2 dentes de alho picados", "1 pimentão picado", "Cheiro-verde a gosto" ],
        modoPreparo: [ "Dessalgue e cozinhe a carne seca, depois desfie ou pique em cubos.", "Frite a carne em uma panela grande.", "Adicione a cebola, o alho e o pimentão e refogue.", "Acrescente o arroz e refogue mais um pouco.", "Cubra com água quente e cozinhe até o arroz secar.", "Finalize com cheiro-verde." ],
        observacoes: []
    },
    {
        id: "torta-holandesa",
        titulo: "Torta Holandesa",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "40min",
        porcoes: "12 porções",
        categoria: "sobremesas",
        ingredientes: [ "1 pacote de biscoito maisena triturado", "100g de manteiga derretida", "1 lata de creme de leite", "1 lata de leite condensado", "1 xícara de chantilly batido", "Biscoitos Calipso para decorar", "Ganache de chocolate para cobrir" ],
        modoPreparo: [ "Misture o biscoito triturado com a manteiga e forre o fundo de uma forma de aro removível.", "Bata o creme de leite, o leite condensado e o chantilly até formar um creme homogêneo.", "Despeje o creme sobre a base de biscoito.", "Leve à geladeira por 4 horas.", "Cubra com a ganache de chocolate e decore as laterais com os biscoitos Calipso." ],
        observacoes: []
    },
    {
        id: "quindim",
        titulo: "Quindim",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h",
        porcoes: "12 unidades",
        categoria: "sobremesas",
        ingredientes: [ "10 gemas peneiradas", "1 xícara de açúcar", "100g de coco ralado fresco", "1 colher de sopa de manteiga derretida" ],
        modoPreparo: [ "Misture todos os ingredientes em uma tigela.", "Unte forminhas de empada com manteiga e açúcar.", "Despeje a mistura nas forminhas.", "Asse em banho-maria em forno pré-aquecido a 180°C por cerca de 40 minutos.", "Deixe esfriar para desenformar." ],
        observacoes: [ "Peneirar as gemas é o segredo para evitar o cheiro de ovo." ]
    },
    {
        id: "bobo-de-camarao",
        titulo: "Bobó de Camarão",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "1h",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "1 kg de camarão fresco", "1 kg de mandioca cozida", "200 ml de leite de coco", "1 cebola picada", "3 dentes de alho picados", "1 pimentão picado", "2 tomates picados", "Azeite de dendê a gosto", "Coentro picado a gosto" ],
        modoPreparo: [ "Bata a mandioca cozida com um pouco da água do cozimento e o leite de coco no liquidificador.", "Em uma panela, refogue a cebola, o alho, o pimentão e os tomates no azeite de dendê.", "Adicione os camarões e cozinhe até ficarem rosados.", "Junte o creme de mandioca e cozinhe por mais 10 minutos.", "Finalize com coentro picado." ],
        observacoes: []
    },
    {
        id: "baiao-de-dois",
        titulo: "Baião de Dois",
        imagem: "/assets/img/placeholder.jpg",
        tempoPreparo: "50min",
        porcoes: "6 porções",
        categoria: "prato-principal",
        ingredientes: [ "2 xícaras de arroz", "1 xícara de feijão fradinho cozido", "200g de carne seca dessalgada e desfiada", "100g de queijo coalho em cubos", "1 cebola picada", "Coentro e cebolinha a gosto" ],
        modoPreparo: [ "Frite a carne seca em uma panela.", "Adicione a cebola e refogue.", "Acrescente o arroz e refogue mais um pouco.", "Junte o feijão cozido e cubra com água quente.", "Cozinhe até o arroz secar.", "Desligue o fogo e misture o queijo coalho, o coentro e a cebolinha." ],
        observacoes: [ "Sirva com uma manteiga de garrafa por cima para um sabor autêntico." ]
    }
];

// Disponibiliza a variável globalmente
window.todasAsReceitas = receitas;
