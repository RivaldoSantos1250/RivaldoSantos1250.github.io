// assets/javascript/dados-receitas.js

const receitas = [
    {
        id: "pudim-tapioca",
        titulo: "Pudim de Tapioca",
        imagem: "/assets/img/pudim-tapioca.jpg",
        tempoPreparo: "2h",
        porcoes: "12 porções",
        ingredientes: [
            "500g de tapioca granulada",
            "1 litro e meio de leite",
            "1 vidro de leite de coco",
            "1 lata de leite condensado",
            "1 xícara de chá de açúcar",
            "Coco ralado desidratado a gosto"
        ],
        modoPreparo: [
            "É importante hidratar a tapioca com leite antes de preparar o pudim para que a massa fique bem macia e molhadinha.",
            "Em um recipiente, coloque 500 gramas de tapioca granulada e 1 litro e meio de leite. Misture.",
            "Em seguida, adicione 1 vidro de leite de coco, 1 lata de leite condensado e 1 xícara de chá de açúcar. Misture novamente.",
            "Transfira a mistura para uma forma e leve para gelar por 2 horas.",
            "Desenforme e finalize com coco desidratado ralado a gosto."
        ],
        observacoes: []
    },
    {
        id: "pudim-leite-condensado",
        titulo: "Pudim de Leite Condensado",
        imagem: "/assets/img/pudim-leite-condensado.jpg",
        tempoPreparo: "1h 30min",
        porcoes: "8 porções",
        ingredientes: [
            "1 xícara de açúcar (para a calda)",
            "1/4 de xícara de água (para a calda)",
            "1 lata de leite condensado",
            "A mesma medida de leite (usar a lata de leite condensado como medida)",
            "3 ovos inteiros",
            "1 colher de chá de essência de baunilha (opcional)"
        ],
        modoPreparo: [
            "Em uma panela, coloque o açúcar e a água. Leve ao fogo médio-baixo, sem mexer, até obter uma calda dourada.",
            "Despeje o caramelo em uma forma para pudim e reserve.",
            "No liquidificador, coloque o leite condensado, o leite, os ovos e a essência de baunilha. Bata tudo até obter uma mistura homogênea.",
            "Despeje a mistura na forma caramelizada e cubra com papel alumínio.",
            "Asse em banho-maria por aproximadamente 1 hora e 30 minutos a 180°C.",
            "Deixe esfriar, leve à geladeira por pelo menos 4 horas e desenforme."
        ],
        observacoes: [
            "Se desejar, decore o pudim com raspas de chocolate ou frutas cristalizadas antes de servir."
        ]
    },
    {
        id: "brownie-caneca",
        titulo: "Brownie de Caneca",
        imagem: "/assets/img/brownie.jpg",
        tempoPreparo: "5min",
        porcoes: "1 porção",
        ingredientes: [
            "2 colheres de sopa de farinha de trigo",
            "2 colheres de sopa de chocolate em pó",
            "2 colheres de sopa de açúcar",
            "2 colheres de sopa de leite",
            "1 e 1/2 colher de sopa de manteiga derretida"
        ],
        modoPreparo: [
            "Em uma caneca grande, misture a farinha de trigo, o chocolate em pó, o açúcar, o leite e a margarina derretida até obter uma massa homogênea.",
            "Adicione as gotas de chocolate e mexa delicadamente para distribuí-las na massa.",
            "Leve a mistura em uma caneca, ao micro-ondas durante 1 minuto.",
            "Caso precise de mais tempo coloque de 10 em 10 segundos até ficar pronto."
        ],
        observacoes: [
            "Experimente adicionar nozes picadas ou pedaços de chocolate amargo para uma versão ainda mais indulgente.",
            "Se preferir, substitua a manteiga por margarina derretida."
        ]
    },
    {
        id: "brigadeiro-microondas",
        titulo: "Brigadeiro de Micro-ondas",
        imagem: "/assets/img/brigadeiro-microondas.jpg",
        tempoPreparo: "10min",
        porcoes: "20 brigadeiros",
        ingredientes: [
            "1 lata de leite condensado",
            "2 colheres de sopa de chocolate em pó",
            "1 colher de sopa de manteiga",
            "Chocolate granulado para decorar"
        ],
        modoPreparo: [
            "Em uma tigela própria para micro-ondas, misture o leite condensado, o chocolate em pó e a manteiga.",
            "Leve ao micro-ondas por 6 a 8 minutos, mexendo a cada 2 minutos para não queimar.",
            "Quando a mistura estiver desgrudando do fundo da tigela, retire do micro-ondas e deixe esfriar.",
            "Com as mãos untadas de manteiga, faça bolinhas e passe-as no chocolate granulado.",
            "Coloque os brigadeiros em forminhas de papel e sirva."
        ],
        observacoes: [
            "Você pode substituir o chocolate em pó por cacau em pó para um sabor mais intenso.",
            "Experimente adicionar uma pitada de sal para realçar os sabores."
        ]
    },
    {
        id: "mojito-classico",
        titulo: "Mojito Clássico",
        imagem: "/assets/img/mojito.jpg",
        tempoPreparo: "10min",
        porcoes: "1 porção",
        ingredientes: [
            "1 limão cortado em 4 pedaços",
            "10 folhas de hortelã",
            "2 colheres de chá de açúcar",
            "50ml de rum branco",
            "Água com gás",
            "Gelo a gosto"
        ],
        modoPreparo: [
            "Em um copo alto, adicione os pedaços de limão e o açúcar. Amasse suavemente com um pilão para extrair o suco do limão.",
            "Adicione as folhas de hortelã e amasse delicadamente para liberar os aromas, mas sem desintegrar as folhas.",
            "Encha o copo com gelo até a metade.",
            "Adicione o rum branco.",
            "Complete o copo com água com gás e mexa suavemente.",
            "Decore com um ramo de hortelã e uma fatia de limão. Sirva imediatamente."
        ],
        observacoes: [
            "Para um toque extra, adicione algumas gotas de angostura.",
            "Se preferir, substitua o açúcar por xarope simples para uma dissolução mais rápida."
        ]
    },
    {
        id: "panqueca-aveia-banana",
        titulo: "Panquecas de Aveia e Banana",
        imagem: "/assets/img/panqueca-aveia-banana.jpg",
        tempoPreparo: "20min",
        porcoes: "4 porções",
        ingredientes: [
            "2 bananas maduras",
            "2 ovos",
            "1/2 xícara de aveia",
            "1 colher de chá de canela (opcional)",
            "Mel a gosto (opcional)"
        ],
        modoPreparo: [
            "Amasse as bananas em uma tigela grande.",
            "Adicione os ovos e misture bem até ficar homogêneo.",
            "Acrescente a aveia e a canela, misturando bem.",
            "Aqueça uma frigideira antiaderente em fogo médio e unte com um pouco de óleo ou manteiga.",
            "Despeje pequenas porções da massa na frigideira, formando as panquecas.",
            "Cozinhe por 2-3 minutos de cada lado ou até dourar.",
            "Sirva as panquecas quentes com mel, frutas ou iogurte, conforme desejar."
        ],
        observacoes: [
            "Você pode adicionar uma pitada de sal na massa para realçar os sabores.",
            "Para uma versão sem glúten, utilize aveia certificada sem glúten."
        ]
    }
];

// Para que outros arquivos possam usar essa lista
window.todasAsReceitas = receitas;