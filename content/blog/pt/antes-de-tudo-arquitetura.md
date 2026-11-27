---
title: "Antes de tudo, arquitetura: como escolhi a engine, o estilo e as mecânicas do meu jogo feito com IA"
description: "Antes de programar, defini a arquitetura do jogo com o Claude: por que o Godot venceu Unity e Unreal, como a taxonomia de Bartle definiu a mecânica e quais IAs entraram no pipeline."
date: 2026-11-27
tags: [contos-do-escuro, game-design, game-dev, godot, arquitetura, claude, ia]
cover: /images/blog/contos-do-escuro/capa-post-2-arquitetura.jpg
draft: false
translation: architecture-first
---

Antes de abrir qualquer engine, pedir para o Claude programar alguma coisa ou começar as artes, eu precisava responder uma pergunta: dá para fazer o jogo que está na minha cabeça, com IA, num computador comum?

Eu tinha visto muitos vídeos no YouTube de gente desenvolvendo jogos com IA e pesquisado o que dava para fazer com as ferramentas que eu tinha. Mas não tinha testado nada. E o que estava na minha cabeça ficava no meio do caminho: eu não queria um joguinho 2D de pular plataformas, nem algo no nível dos vídeos em que o pessoal usava o Fable 5, o modelo mais avançado da Anthropic, para fazer jogos em primeira pessoa com cenário realista, gastando muito dinheiro em tokens. Não queria um jogo infantil, e também não queria algo pesado no nível de um GTA 6.

## Requisito número 1: rodar em computador fraco

Meu equipamento é limitado. Ele é ótimo para trabalho, mas não é um computador gamer com placa de vídeo de última geração. Trabalho com um Ryzen 7, e o meu notebook tem vídeo integrado. Eu queria jogar no notebook. E queria que alguns amigos, com computadores mais simples, de Ryzen 3, Core i3 ou Core i5, também conseguissem.

Então a primeira regra do projeto saiu antes de qualquer outra: testar cedo na máquina mais fraca, para a otimização não virar uma reforma no fim. O jogo ganhou dois níveis de qualidade. No alto, névoa volumétrica e sombras melhores; no baixo, névoa simples e menos sombra. Medir o FPS no notebook virou etapa fixa de cada fase.

## Perfil de jogador: a taxonomia de Bartle

Mesmo fazendo o jogo também para os amigos, eu não quis um jogo multiplayer. Rede, sincronização e salvamento compartilhado multiplicam o trabalho e os bugs. E, principalmente, eu queria fazer primeiro o tipo de jogo de que eu gosto.

Em game design, a referência clássica para isso é a **taxonomia de Bartle**. Richard Bartle, um dos criadores do MUD, o primeiro jogo online multiusuário, publicou em 1996 um estudo que classifica os jogadores em quatro perfis. A classificação cruza dois eixos: se o jogador prefere agir ou interagir, e se o foco dele está nos outros jogadores ou no mundo do jogo.

- **Assassinos** (*killers*): agem sobre outros jogadores; competem, se impõem e querem vencer.
- **Conquistadores** (*achievers*): agem sobre o mundo; cumprem metas e acumulam pontos, níveis e itens.
- **Socializadores** (*socializers*): interagem com outros jogadores; conversam, cooperam e criam laços.
- **Exploradores** (*explorers*): interagem com o mundo; descobrem o mapa e entendem como as regras funcionam.

![Diagrama da taxonomia de Bartle: eixo vertical agir e interagir, eixo horizontal jogadores e mundo, com assassinos, conquistadores, socializadores e exploradores nos quatro quadrantes](/images/blog/contos-do-escuro/taxonomia-bartle.jpg)

Eu fico entre o explorador e o conquistador. Lembro muito do Tibia, quando eu saía com os amigos para fazer quests e ganhar os itens. A companhia era boa, mas mesmo sozinho eu ia, porque gostava de ter no repertório todas as quests possíveis. Luta e socialização nunca foram o meu forte.

Daí veio a decisão de mecânica: exploração e quebra-cabeças, com lutas pontuais contra o vilão. Cada confronto vira um chefe-quebra-cabeça, com poucos ataques, sempre anunciados, que o jogador aprende a ler. Foi assim que nasceu a luta com o Dunkel no fim da primeira fase: as brasas dos olhos pulsam e uma marca vermelha aparece no chão antes de cada ataque, e o jogador precisa descobrir quando o peito dele fica exposto.

Para jogar com os amigos, o jeito é o mais antigo de todos: todo mundo junto, passando o controle. Por isso o jogo tem checkpoints antes dos trechos difíceis e em cada fase da luta, para quem pega o controle não refazer um trecho longo, e funciona com controle além do teclado.

## Câmera de Diablo, escuridão de Inside, estilo de Arcane

Gosto de jogos em terceira pessoa, com a câmera nem muito longe, nem muito perto, um pouco inclinada. A referência era o **Diablo** e o **Inside**. Nunca joguei nenhum dos dois, mas vi vídeos, e a disposição da câmera e o tanto de cenário que aparece na tela eram o que eu queria. Juntei também o **Ruined King**, um RPG do universo de League of Legends que tem cenas de exploração com esse enquadramento.

No gráfico, a referência foi o **Arcane**, da Netflix. A série me impressionou muito. Eu gosto de desenhar e, na época, fiquei com vontade de entrar para o ramo de animação só para fazer algo parecido. Não faço ideia de como se anima quadro a quadro e não tenho muita habilidade com desenho no computador, mas queria levar um pouco daquele estilo para o jogo.

## A conversa com o Claude

Com as referências na mão, juntei as imagens, colei no prompt e perguntei: dá para fazer isso virar realidade com o equipamento que eu tenho e com o conhecimento que eu tenho?

Duas respostas mudaram o projeto.

A primeira foi sobre o hardware. O estilo do Inside é ótimo para computador fraco: pouca textura, formas simples e um clima feito de luz e névoa. Uma luz que acompanha o personagem e mostra só o que está perto, mais um efeito que escurece as bordas da tela, custam pouco e dão quase todo o clima.

A segunda foi sobre a engine.

## Por que o Godot, e não Unity ou Unreal

Eu conhecia o Unreal e o Unity. Não conhecia o Godot. O conceito de engine eu já tinha visto por dentro: para estudar, criei uma engine própria, bem básica, e um clone do Among Us, onde aprendi a controlar a física e a colisão entre objetos. Nada perto de uma engine profissional, mas me ensinou o que uma engine faz. O Claude listou os prós e os contras de cada um para a minha situação, e o Godot ganhou por um motivo ligado ao jeito como a IA trabalha.

No Godot, cenas, materiais e scripts são arquivos de texto. O Claude consegue criar e editar uma fase inteira mexendo nesses arquivos, por MCP ou pela linha de comando, sem eu precisar deixar o editor aberto. No Unreal, muita coisa fica em arquivos binários e em Blueprints visuais, que a IA não edita bem. O Unity funcionaria, mas o editor é bem mais pesado. Somaram-se outros motivos: o Godot é gratuito, de código aberto e não cobra royalties.

## Personagens: de uma IA para quatro ferramentas

Depois perguntei sobre o 3D. Os personagens eram o ponto mais delicado: uma imagem é arte conceitual 2D, e o jogo precisa de personagens que andam, viram e se movem sempre iguais.

O caminho proposto passou por quatro ferramentas além do Claude:

1. o **Gemini**, para gerar as imagens dos personagens;
2. o **Hunyuan3D**, uma IA chinesa da Tencent que transforma imagem em modelo 3D;
3. o **Blender**, para ajustar os modelos junto com o Claude, que já estava conectado a ele no meu computador;
4. o **Mixamo**, para fazer o esqueleto e dar movimento aos personagens, a parte mais difícil de fazer só com o Claude.

Veio junto um aviso: essas ferramentas entregam malhas bagunçadas e texturas inconsistentes, e o resultado precisa de ajuste. O aviso se confirmou: o Miguel precisou de três versões. Isso fica para outro post.

A conversa também deixou claro o que esperar da IA em cada parte. Código, como movimento, inimigos, diálogos, salvamento e shaders, ela faz muito bem. Objetos de cenário feitos de formas geométricas, como lápides, grades e muros, saem bem de scripts no Blender. Personagens e animação são difíceis, e o melhor é partir de bases prontas. Nas semanas seguintes, foi exatamente assim.

## Uma descoberta no meio do caminho: a Artcraft

Já com o projeto andando, descobrimos os programas da Artcraft. São parecidos com os da Adobe, mas gratuitos, e já vêm com o protocolo MCP, então o Claude consegue operar cada um deles direto, como faz com o Godot e o Blender.

Eles entraram em várias partes do projeto: o FilmCraft na edição de vídeo, o FigCraft na edição de imagens e o SoundCraft nos sons. O vídeo de abertura do jogo foi montado no FilmCraft e no SoundCraft, e o diagrama de Bartle deste post, no FigCraft.

## O briefing que virou a memória do projeto

Com os requisitos levantados e a certeza de que era viável, pedi para o Claude fechar um briefing: empacotar as regras e decisões, junto com o que eu já tinha do livro e do jogo, os primeiros capítulos e a ideia inicial.

O livro também é feito com ajuda dele, mas de outro jeito. Não sou escritor. Eu dito cada linha e digo exatamente como quero cada ponto. O Claude corrige o português e às vezes sugere como melhorar uma frase, como um editor. A ideia e a maior parte do texto, uns 90 a 95%, são minhas. Essa é a parte criativa, e ela não sai da minha mão.

O resultado foi o `briefing_jogo.md`, a proposta inicial do jogo. Ele foi o ponto de partida de tudo e ainda abre todas as conversas do projeto. Ali começou o método do projeto: escrever as decisões num lugar que a IA lê toda vez, porque ela não lembra da conversa de ontem.

Antes de qualquer linha de código, o projeto já tinha decidido:

- **público e hardware:** rodar em notebook com vídeo integrado e em computadores de entrada;
- **jogador:** um jogo para um jogador, de exploração e quebra-cabeças, para jogar passando o controle;
- **visual:** câmera elevada, cenário no escuro e personagens estilizados;
- **engine:** Godot, porque a IA trabalha nos arquivos de texto dele;
- **ferramentas:** Gemini, Hunyuan3D, Blender e Mixamo em volta do Claude.

No próximo post, conto como esse método funciona: a pasta de contexto, as regras que nascem de cada erro e as sessões da IA trabalhando em paralelo.

*Logo do Godot na capa: Andrea Calabró, licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
