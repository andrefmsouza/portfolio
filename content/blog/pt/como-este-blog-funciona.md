---
title: "Como este blog funciona: Markdown, Next.js e nenhum banco de dados"
description: "Os posts deste site são arquivos .md dentro do repositório. Um commit publica, o Google indexa e não existe painel para administrar."
date: 2026-10-19
tags: [nextjs, markdown, seo]
draft: true
---

Este é um post de exemplo. Ele mostra como escrever aqui e serve de referência para a formatação. Enquanto `draft: true` estiver no topo do arquivo, ele aparece só no `npm run dev` e não entra no site publicado.

## A ideia

Cada post é um arquivo Markdown em `content/blog/pt/` (ou `content/blog/en/` para a versão em inglês). No build, o Next.js lê esses arquivos e gera uma página HTML estática para cada um, então não tem banco de dados, CMS nem servidor consultando nada a cada visita.

Para publicar um post novo:

1. Crie `content/blog/pt/meu-post.md`
2. Preencha o cabeçalho (o *frontmatter*)
3. Faça commit e push

O endereço do post vem do nome do arquivo: `meu-post.md` vira `/pt/blog/meu-post`.

## O cabeçalho

```yaml title="content/blog/pt/meu-post.md"
---
title: "Título do post"
description: "Uma ou duas frases. Aparece no Google e nas prévias de compartilhamento."
date: 2026-10-19
updated: 2026-11-02 # opcional
tags: [nodejs, ia]
cover: /images/blog/minha-capa.png # opcional
draft: false
---
```

Se existir um arquivo com o **mesmo nome** em `pt/` e em `en/`, o site entende que um é tradução do outro e liga os dois, tanto no seletor de idioma quanto para o Google.

## Código

Os blocos de código ganham destaque de sintaxe, um botão de copiar e podem destacar linhas:

```ts {3}
export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("Usuário não encontrado");
  return res.json();
}
```

Código no meio do texto também funciona: `npm run dev`.

### Tabelas e listas

| Recurso        | Como                       |
| -------------- | -------------------------- |
| Sumário        | Gerado a partir dos `##`   |
| Tempo de leitura | Calculado automaticamente |
| Imagem de prévia | Gerada para cada post     |

- [x] Markdown com GFM (tabelas, checklists, ~~riscado~~)
- [x] Feed RSS
- [ ] Escrever o primeiro post de verdade

> Citações ficam assim: maiores, em serifa, com um traço na lateral.

## Imagens

Coloque o arquivo em `public/images/blog/` e use `![descrição da imagem](/images/blog/arquivo.png)`. A descrição importa: é o que leitores de tela e o Google usam.
