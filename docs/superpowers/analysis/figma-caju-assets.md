# Mapeamento de assets — Caju (Figma node 17:5070)

Fonte: export 3x exato (5184×22266, escala 3.0) de
`imports_figma/cases/caju/page-3x.png` (fora do git). Recortes pelos retângulos
dos nós de imagem, JPEG q84 progressivo, largura máx 2000px, em
`public/images/projects/caju/`. Árvore: `docs/superpowers/analysis/figma-caju-tree.xml`.

| Arquivo | Região no frame (x, y, w, h) | Nó | Conteúdo |
|---|---|---|---|
| `hero.jpg` | 194, 154, 1354, 461 | 17:5177 | Capa do case (arte do livro) |
| `capa-versoes.jpg` | aside do topo | 17:5216 | Colagem do aside: fontes, roteiro, paleta, personagens |
| `brainstorming.jpg` | 191, 2117, 285, 350 | 17:5409 | Prototipagem — brainstorming |
| `painel-visual.jpg` | 482, 2117, 255, 350 | 17:5411 | Prototipagem — painel visual (Imagem a) |
| `teste-cores-storyboard.jpg` | 743, 2117, 181, 350 | 17:5405/5406 | Teste de cores e storyboard |
| `design-personagens.jpg` | 940, 2117, 608, 376 | 17:5416 | Design de personagens (Imagem b) |
| `rafe-1.jpg`, `rafe-2.jpg` | 194, 2551, 669, 367 cada | 17:5431/5432 | Rafes das páginas |
| `pintura-tablet.jpg`, `pintura-clip-studio.jpg` | 194/880, 2975, 666, 761 | 17:5438/5441.. | Pintura das páginas e diagramação |
| `diagramacao-indesign.jpg` | 877, 2975, 666, 451 | 17:5442 | Diagramação no InDesign |
| `livro-pag-1..6.jpg` | 189/886, 4371/4676/4981, 662, 662 | 17:5475/5476/5477 (col 0), 17:5479/5480/5481 (col 1) | Pilha sticky: 6 páginas reais na ordem do Figma |
| `livro-capa.jpg` | — | — | Capa do flipbook (face inicial) |
| `contracapa.jpg` | 556, 5722, 630, 630 | 17:5487 | Contracapa do flipbook (última face), 1260×1260. O frame 17:5070 não traz a página 32 (contracapa impressa) — a única arte do livro na seção "Simulação de leitura" é o nó 17:5487; os nós "capa banner2" (17:5075/17:5147) ficam em y>7422, fora do export. Trocar pelo arquivo final quando a designer entregar a contracapa. |
| `impresso-1..3.jpg` | 188, 3922, 521/521/293, 391 | 17:5469..5471 | Projeto final — mídia impressa |
| `quadro-processo.jpg` | 556, 5722, 630, 630 | 17:5487 | Quadro final (arte) |
| `mascote.png` | 1431, 6485, 139, 132 | 17:5492 | Rosto da mascote da trava de leitura, PNG com fundo transparente (flood fill sobre o creme #F9F3EA) |
| `paleta.png` | 1133, 1045, 175, 199 | 17:5263 | Swatches da paleta de cores (azuis e lilases) usados no card "Paleta de cores" |

O flipbook usa 32 faces: capa + 30 páginas (pool cíclico das páginas reais +
exemplos) + contracapa. Isso está documentado no código (`CajuCase.tsx`).
