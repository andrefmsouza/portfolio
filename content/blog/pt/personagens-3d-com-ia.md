---
title: "Personagens 3D com IA: do desenho no papel ao primeiro protótipo do jogo"
description: "Como criei os personagens do Contos do Escuro com IA: linguagem das formas, folha de referência, modelo 3D e animação, até o primeiro protótipo."
date: 2026-11-28
tags: [contos-do-escuro, game-dev, design-de-personagens, modelagem-3d, blender, mixamo, claude, ia]
cover: /images/blog/contos-do-escuro/linguagem-das-formas.jpg
draft: false
translation: 3d-characters-with-ai
---

Desde criança eu gosto de desenhar. Dediquei muitos anos da minha vida à arte: aprendi a desenhar a grafite, depois com lápis de cor, fiz pintura em tela e algumas aulas sobre criação de personagens. Só que eu sempre fui muito ruim em pensar em alguma coisa e conseguir transformar aquilo numa arte bonita. Quando eu tinha que copiar um desenho, fazia isso relativamente bem. Algumas artes eu consegui fazer no papel, como esta da Ellie, de *The Last of Us*, que foi uma das que eu mais gostei de fazer.

![Meu desenho da Ellie, de The Last of Us, em papel, sobre fundo preto](/images/blog/contos-do-escuro/ellie-desenho.jpg)

Mas, quando eu ia criar um personagem meu, a coisa mudava. Tem um personagem que estou planejando para alguns capítulos futuros, e que eu carrego desde a adolescência (não vou dar spoiler agora), e eu sempre tive muita dificuldade de colocá-lo no papel. Meus personagens acabavam saindo sempre com os mesmos formatos.

## O que as formas dizem sobre um personagem

Num dos meus cursos, aprendi como a forma geométrica de um personagem passa uma mensagem antes de qualquer detalhe. Em design de personagens, isso se chama **linguagem das formas** (*shape language*). Quem olha lê primeiro a silhueta, as grandes massas do corpo, da cabeça e da roupa, e associa cada forma a uma sensação. A base são três formas.

### Círculo

O círculo não tem pontas nem quinas, e por isso passa a ideia de algo macio, seguro e acolhedor. Costuma aparecer em personagens amigáveis, ingênuos, engraçados ou fofos: rosto redondo, bochechas cheias, corpo em forma de gota. Também sugere movimento e energia, como uma bola que rola.

### Quadrado

O quadrado tem base larga e ângulos retos, e passa estabilidade, força e confiança. É a forma dos protetores, dos fortes e dos teimosos: ombros largos, mandíbula reta, músculos em bloco. O outro lado é a rigidez, alguém difícil de mover, no sentido literal e no figurado.

### Triângulo

As pontas do triângulo chamam a atenção e passam perigo, agressividade e tensão. Por isso ele aparece tanto em vilões: queixo fino, sobrancelhas em V, ombros pontudos, garras, chifres. Mas ele não é exclusivo dos vilões. Num herói, o triângulo de ombros largos que afina até a cintura passa ação e agilidade.

Dá para ver isso em todo lugar: magos têm chapéu pontudo, monstros têm garras triangulares nas pontas, e personagens fortes têm os músculos mais quadrados.

Quase nenhum personagem é feito de uma forma só. O normal é ter uma forma dominante, que define quem ele é, e uma secundária, que acrescenta uma nuance. Um personagem forte e ameaçador pode ter partes quadradas num corpo triangular. Um bruxo amigável pode ter o corpo redondinho e um sorriso, com uma varinha de estrelas pontudas e um chapéu pontudo: a base diz que ele é do bem, e as pontas dizem que ele tem poder. Dá para brincar bastante com isso.

Um exemplo conhecido é *Up: Altas Aventuras*, da Pixar. O Carl, o velho rabugento e preso ao passado, foi desenhado a partir de um quadrado, e o Russell, o menino escoteiro cheio de energia, a partir de um círculo. O contraste entre os dois já conta a relação deles antes de qualquer fala.

![Linguagem das formas: um personagem redondo e amigável dentro de um círculo, um guardião quadrado dentro de um quadrado, uma criatura pontuda dentro de um triângulo e um bruxo de corpo redondo e chapéu pontudo sobre um círculo e um triângulo sobrepostos](/images/blog/contos-do-escuro/linguagem-das-formas.jpg)

Com a inteligência artificial, eu consegui dar o salto que faltava: eu penso no personagem, descrevo, gero um prompt, e a imagem consegue transmitir aquilo que eu pensei.

## Como o Dunkel chegou à forma de hoje

O vilão principal teve toda uma construção. No início, ele não era para ser como é hoje: era para ser uma espécie de lobo.

A minha história vem sendo construída há mais de 15 anos. Tudo nela tem a ver com o meu ambiente: a minha vida, o que eu vejo e percebo com amigos e família, os filmes e as séries que eu assisto. A minha cosmovisão, vamos dizer assim. Só que, como estou demorando muito para terminar a história, outras pessoas com visões parecidas foram criando personagens parecidos. Foram aparecendo histórias com alguns símbolos semelhantes, histórias que, para ser sincero, eu nunca li. Para desvincular o meu vilão delas, mudei um pouco o personagem.

Pesquisei algumas culturas. Gosto muito da cultura nórdica e da egípcia, e também do cristianismo e da tradição judaica. Mas quis pegar outras coisas também, do folclore brasileiro, que pretendo trazer mais para frente, e do norte-americano. Foi aí que peguei alguns símbolos de algumas culturas e misturei para criar esse personagem.

O nome, Dunkel, é inspirado no alemão e significa escuro. Não sei muito bem qual seria a pronúncia correta, porque eu não falo alemão; só pesquisei um pouco as palavras, mas a ideia do nome é essa.

Com essas mudanças, ele ficou com formas mais pontudas: os galhos na cabeça e a aparência de cervo, os cacos de vidro da janela no peito, um pouco de fumaça e aquele ar de queimado, com brasas. Ele junta características que vai apresentando ao longo do livro.

![Folha de referência do Dunkel: criatura escura com crânio e galhos de cervo, olhos em brasa, cacos de vidro no peito, garras e fumaça em volta](/images/blog/contos-do-escuro/dunkel-folha.jpg)

Com o Tiago e o Miguel, o caminho foi outro. Nenhum dos dois é o retrato de uma pessoa específica. Ao longo desses mais de 15 anos, fui juntando traços meus, dos meus amigos e de pessoas próximas em geral, e os dois personagens foram se formando a partir dessa mistura. O Tolkien trabalhava de um jeito parecido. Ele dizia não gostar de alegoria, mas chamou *O Senhor dos Anéis* de uma obra fundamentalmente religiosa e católica: muitos estudiosos veem traços de Cristo divididos entre Gandalf, Frodo e Aragorn, e a Lúthien foi inspirada na esposa dele, Edith. O Miguel ainda pode mudar de forma ao longo do livro, mas, neste primeiro capítulo, os dois têm a aparência que mostro aqui.

## Do prompt à folha de referência

Com tudo certinho, já sabendo o que eu queria transmitir, passei isso para prompts, e o Claude me ajudou a formatá-los. Joguei esses prompts no Gemini para criar primeiro a folha de referência: a visão do personagem de frente, de lado, de costas e em outras posições, para ter uma ideia de como ele ficaria.

![Folha de referência do Tiago, com o personagem em várias vistas](/images/blog/contos-do-escuro/thiago.jpg)

## Da imagem ao modelo 3D

Com as imagens de referência, o próximo passo era transformar o personagem em 3D. Primeiro tentei o Meshy AI, e o resultado ficou muito bom, mas para baixar o modelo era preciso pagar. Então joguei as imagens no Hunyuan3D, uma IA chinesa da Tencent que transforma imagem em modelo 3D e que era de graça. Ela não é tão eficaz quanto o Meshy, mas foi o melhor que consegui com os planos gratuitos a que eu tinha acesso, e me serviu bem: como a câmera do jogo fica um pouco afastada, a qualidade que ela entrega é suficiente.

No fim, ele me gerou até um modelo mais fiel do que eu esperava, só que com muitos polígonos. Se eu jogasse aquilo direto no jogo, ficaria muito pesado. Então o Claude me ajudou a levar o modelo para o Blender, fazer a limpeza, juntar as partes e reduzir o número de polígonos (cada personagem fica com cerca de 16 mil triângulos), para ele entrar no jogo e rodar de forma mais fluida.

## Animação no Mixamo

Com o modelo limpo, o próximo passo era a animação. Para isso usei o Mixamo, uma plataforma gratuita da Adobe que já tem mapeada a movimentação dos personagens: parado, andando, correndo, pulando e vários outros movimentos. Dependendo do jogo, dá até para colocar o personagem segurando armas e outras coisas.

Depois que eu coloquei o personagem no Mixamo e baixei as animações, o Claude, com acesso aos arquivos, já conseguia fazer essas movimentações dentro do jogo. Ele foi me indicando as animações de que eu precisava, e, se eu preciso de outra coisa, como empurrar um objeto ou fazer alguma ação, volto ao Mixamo, baixo de novo e coloco no jogo. Se preciso de algum ajuste de iluminação ou de textura, o Claude também consegue fazer isso dentro do Blender.

![O Tiago parado, andando e correndo no jogo](/images/blog/contos-do-escuro/tiago_conferencia_animacoes.jpg)

Esses arquivos do Blender, particularmente, ainda não me deixam muito satisfeito. Eles ainda têm muitos problemas de malha, que precisariam de um artista muito bom para corrigir. Mas, como o personagem fica um pouco longe na tela, sem zoom e sem filmagens tão de perto, e como algumas cutscenes eu estou preferindo fazer em vídeo com outras inteligências artificiais, por enquanto dá para usar.

## A armadilha dos braços colados

Tem algumas armadilhas quando a gente usa a inteligência artificial para isso. O modelo gerado pode vir com problemas de polígono, por exemplo debaixo do braço, e aí entram vários ajustes. Eu descobri que o melhor é pedir já para a IA que gera a imagem criar o personagem em pose T ou em pose A, com os braços afastados do corpo, porque isso ajuda bastante na hora de a outra IA montar a malha.

Quando chegou no Miguel, os braços dele estavam todos colados no corpo. No Mixamo, quando ele levantava o braço, a camisa subia junto.

![No Mixamo, o braço do Miguel puxava a camisa junto](/images/blog/contos-do-escuro/miguel_v2_mixamo.jpg)

Precisei fazer vários ajustes para ele não ficar com esses problemas, e o Claude me ajudou com várias correções no Blender: separar a manga, girar o braço para a pose A e refazer a axila. Mesmo assim, o resultado ficou ruim.

![A axila do Miguel depois das correções no Blender](/images/blog/contos-do-escuro/miguel_v2_axila.jpg)

Então gerei um modelo novo, já em pose A e com a manga da camisa solta do corpo. Essa terceira versão passou pelo mesmo preparo dos outros personagens no Blender, sem nenhum ajuste na pose, e foi direto para o Mixamo.

![O Miguel na terceira versão, gerada já em pose A](/images/blog/contos-do-escuro/miguel_v3_corpo.jpg)

## O primeiro protótipo

Depois que consegui fazer pelo menos os primeiros personagens (o Tiago, que é o personagem principal e anda pelo castelo, e o Miguel, desse contato inicial), eu já quis fazer o primeiro teste no castelo: o Tiago andando, para eu ver como seria ele andando e correndo e como montar os cenários, que até então eram muito conceituais.

A partir disso, pedi para a IA começar a trabalhar na parte do jogo mesmo e montar a estrutura principal do primeiro cenário. Era um primeiro protótipo, sem muitos detalhes de iluminação, só com o personagem, para eu ver como seria andar com ele e controlá-lo. Não quis trabalhar com todos os outros personagens, senão ficaria muito pesado. Pedi para ele simplesmente duplicar os personagens que já existiam, mudando algumas características para diferenciar, para eu ter uma noção de como ficaria o jogo com o mínimo de esforço possível. Se eu gastasse muito tempo nesse início fazendo todos os personagens, e ao colocá-los no jogo ficasse tudo muito pesado, eu perderia muito tempo até ter essa ideia inicial. A partir do momento em que vi que era viável, continuei aprimorando.

![O primeiro protótipo: o Tiago no salão do castelo, visto de cima](/images/blog/contos-do-escuro/mvp_alto_centro.jpg)

## Tudo isso em três horas

Essa primeira experiência eu até postei no meu Instagram, e fiquei muito feliz de conseguir fazer tudo isso. Tudo o que eu contei até aqui foi construído num dia em que saí do trabalho às 6 da tarde, e às 9 da noite estava pronto. Nesse período de três horas, consegui definir todo o processo, criar as imagens dos personagens, fazer as animações, colocar tudo dentro do jogo e fazer o personagem rodar.

E isso com o Claude Opus 5.5 no plano Pro, o mais barato. Não precisei usar o Fable nem outra inteligência artificial mais cara, nem pagar nada a mais. Usei só o plano que eu já tinha, com tudo bem definido no meu computador.

Uma vez que você define a arquitetura do que quer, tem os programas todos instalados e põe a inteligência artificial para rodar, você economiza muito token e muito tempo, se souber onde quer chegar. Uma coisa que não entra nessa conta é o tempo em que tudo isso já estava na minha cabeça, com a história montada. Eu não comecei do zero absoluto. Mas, quando você já sabe o que quer e tem essa bagagem, tudo dali para frente é muito mais rápido e muito mais certeiro. Nessas três horas, eu já tive o resultado mínimo para ver que o jogo poderia sair.
