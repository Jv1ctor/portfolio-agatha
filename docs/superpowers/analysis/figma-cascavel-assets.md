# Mapeamento de assets — Cascavel (Figma node 17:4049)

Fonte: export "3x" do frame 1728×10990
(`imports_figma/cases/cascavel/page-3x.png`, fora do git). O export bateu no
limite de 32768px de altura, então a escala real é **SX = 5153/1728 ≈ 2,98206**
e **SY = 32768/10990 ≈ 2,98162** (não 3). Cada recorte usa o retângulo do **nó
de imagem** (sem os textos do mesmo frame) e é salvo como JPEG q84 progressivo
em `public/images/projects/cascavel/` (largura máx. 2000px). Coordenadas em px
do frame (1x). Árvore: `docs/superpowers/analysis/figma-cascavel-tree.xml`.

| Arquivo | Nó | x, y, w, h | Conteúdo |
|---|---|---|---|
| `hero.jpg` | 17:4156 | 188, 154, 1354, 436 | Capa: render da vila (`view3 1`, recortado pelo frame) + selo da serpente |
| `fluxo.jpg` | 17:4190 | 188, 1067, 1353, 242 | Mapa de fluxo do jogo (`image 262`) |
| `paineis.jpg` | 17:4215 | 778, 1359, 762, 334 | Painéis de referência ao lado de "Prototipagem" (`image 263`) |
| `imagem-a.jpg` | 17:4219 | 188, 1775, 1354, 1457 | "Imagem a" — prancha dos assets 3D (6 imagens, 17:4221…17:4228) |
| `escolinha.jpg` | 17:4236 | 190, 3294, 776, 603 | "Imagem b" — ilustração da escolinha (`image 14`) |
| `pintura.jpg` | 17:4234 | 976, 3294, 566, 377 | "Imagem b" — pintura da Cascavel (`IlustraçãoCascavel 1`) |
| `blender.jpg` | 17:4235 | 976, 3683, 566, 215 | "Imagem b" — captura do Blender (`image 22`) |
| `identidade.jpg` | 17:4231 (faixa) | 190, 3934, 1352, 370 | Faixa de texturas/identidade: cartões de diálogo (190..966 × 3940..4051), fruta 17:4237, sobrado 17:4232, logo Quel Pipoquinhas 17:4480, banners Cajuzinho 17:4600 e Feirinha 17:4633. Topo a partir de y=3934 (2px abaixo de 3932) para não pegar a ponta da seta azul que vem de cima |
| `tela-1.jpg` | 17:4665 | 188, 4365, 448, 336 | Primeiras versões — foto 4:3 |
| `tela-2.jpg` | 17:4666 | 641, 4365, 448, 336 | Primeiras versões — foto 4:3 |
| `tela-3.jpg` | 17:4667 | 1094, 4365, 448, 336 | Primeiras versões — foto 4:3 |
| `tela-4.jpg` | 17:4669 | 188, 4714, 448, 252 | Primeira renderização 16:9 (`Capacascavel 1`) |
| `tela-5.jpg` | 17:4670 | 641, 4714, 448, 252 | Primeira renderização 16:9 |
| `tela-6.jpg` | 17:4671 | 1094, 4714, 448, 252 | Primeira renderização 16:9 |
| `tela-7.jpg` | 17:4673 | 188, 4978, 448, 252 | Primeira renderização 16:9 |
| `tela-8.jpg` | 17:4674 | 641, 4978, 448, 252 | Primeira renderização 16:9 |
| `tela-9.jpg` | 17:4675 | 1094, 4978, 448, 252 | Primeira renderização 16:9 |
| `render-1.jpg` | 17:4708 | 188, 5390, 1354, 677 | Render final (`ww7 1`) |
| `render-2.jpg` | 17:4709 | 188, 6099, 1354, 677 | Render final (`ww1 9`) |
| `render-3.jpg` | 17:4710 | 188, 6809, 1354, 677 | Render final (`ww13 2`) |
| `render-4.jpg` | 17:4711 | 188, 7518, 1354, 693 | Render final (`cycles_city_view_3 1`) |
| `render-5.jpg` | 17:4712 | 188, 8243, 1354, 762 | Render final (`view3 1`) |
| `render-6.jpg` | 17:4713 | 188, 9037, 1354, 677 | Render final (`ww17 1`) |

`hero.jpg` serve também de `coverImage` do card no índice (`lib/projects.ts`)
e de capa do case pelo `caseSlots`.

Lightbox (23, ordem de leitura — ANIMACOES §3): hero, fluxo, paineis,
imagem-a, escolinha, pintura, blender, identidade, tela-1…tela-9,
render-1…render-6. Legendas e alts em `projects.cascavel.lightbox.items`.
