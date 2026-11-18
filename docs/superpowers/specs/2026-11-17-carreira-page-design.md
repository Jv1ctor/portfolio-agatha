# SPEC — Página "Minha carreira" (`/carreira`, Figma 201:53)

Data: 2026-11-17. Branch: `feature/carreira` (a partir de `refactor/minimal-adjustments`,
que ainda não entrou no `develop` e mexe no card de carreira e no footer). Figma: arquivo
`EGDJU9UG5XmLO6zV8Howwo`, frame `201:53` (1728 × 7166), o mesmo arquivo do Estudos.

## Problema

O card "Minha carreira no design" da home abre o LinkedIn. A Ágatha desenhou a página da
carreira: hero "como vim parar aqui?", faixas de janelas, "uma breve história da arte...",
"vidinha" com a boneca tricotando, "hora do desenho", "life gallery" e o footer "visite
também".

## Decisões (com o André, não reabrir)

1. **Fidelidade:** igual ao Figma, com uma única exceção, a boneca tricotando da "vidinha"
   (grupo 201:475), que ganha animação.
2. **Animação:**
   - O fio é o cachecol listrado (201:515) que sai da caixinha.
   - As "coisinhas que ela fez" são os pills Monitoria, Extensão, Estágio, Oficinas e
     Publicações acadêmicas. Cada um surge quando o fio passa por ele.
   - Roda **uma vez**, quando a cena entra na tela. As mãos mexem durante o trajeto e param
     no pose do Figma.
   - A **manivela gira junto**.
3. **Responsivo:**
   - O canvas é proporcional (1px do Figma = `100cqw / 1728`) a partir de 1024px.
   - Abaixo disso o layout é empilhado, proposto por nós (ver "Minhas escolhas").
4. **Rota e entrada:** `/pt-BR/carreira` e `/en/carreira`. O card "Minha carreira no design"
   da home abre a página (não mais o LinkedIn).
5. **Top bar:**
   - "<" leva para a home (Sobre mim).
   - "projects" com o sininho leva para `/projetos`.
   - O seletor de idioma fica no centro (regra do AGENTS.md: página sem header precisa
     dele).
6. **Camadas da boneca:** são recompostas a partir das exportações por camada do Figma, sem
   editar o arquivo. O conjunto parado tem que bater com o render do Figma (MAE ≤ 5/255).
7. **Imagens com nome de loop:** "olhar_loop", "nuvens_loop" e "turntable_personagem" ficam
   estáticas, como no Figma.

## Solução

- **Rota:**
  - `app/[lang]/carreira/page.tsx`, no padrão do Estudos.
  - `HeaderRouter` esconde o header em `carreira`.
  - `FooterRouter` usa o `HomeFooter` com "visite também" à direita (201:64).
- **Top bar:** nova variante `career` do `CaseTopBar`, com as medidas de 201:341 e 201:346.
- **Componentes:** `components/career/` tem uma seção por arquivo. O `career.module.css` usa o
  container `--u` e tudo é posicionado em px do Figma.
- **Texto:** vem do dicionário `career` (pt-BR + en). Os negritos do hero usam chaves
  partidas.
- **Arte:**
  - A arte com grão, sombra ou máscara é o render @2x do nó, em WebP lossless.
  - As fotos da gallery são o render @2x do nó (recorte, rotação e sombra do Figma), em WebP
    lossy.
- **`KnittingDoll` (client):**
  - **Camadas:** base sem as mãos, mão direita (201:500), mão esquerda (201:505), caixa sem
    a manivela, manivela, cachecol e pills em HTML.
  - **Animação:** só `transform` e `opacity`. O cachecol aparece com um par de wrappers que
    andam em sentidos opostos (`translateX`). O atraso de cada pill vem da posição x dele
    no cachecol.
  - **Estado inicial:** o servidor renderiza o estado final. O estado escondido só é ligado
    depois da hidratação, então quem está sem JS ou com movimento reduzido vê o Figma.

## Fora de escopo

- **`HomeFooter`:** fica como está, apesar de duas diferenças com o Figma desta página.
  - O 201:64 tem "Redes sociais" e "IG"/"IN" com 32px e o handle com 20px, enquanto o
    componente compartilhado usa 24/16.
  - A pílula "voltar ao topo" está no componente e não aparece no Figma.
  - Mexer nele mudaria a home e os cases. Diferença registrada para a Ágatha decidir.
- **Leftovers do Figma:**
  - `201:76` (Vector 1319, fora do canvas, x=2255) não é implementado.
  - As anotações "Contato" e "O que acredito" vieram copiadas da home e não viram código.

## Emendas da execução

1. **Os "loops" são GIFs animados.**
   - "olhar_loop" tem 16 quadros (com piscada), "nuvens_loop" tem 3 e "turntable_personagem"
     tem 8.
   - O modo dev mostra só o 1º quadro. O André decidiu animar, revendo a decisão 7.
   - Os GIFs viram WebP animado, e o 1º quadro em WebP estático entra com movimento reduzido.
   - Nas faixas, o recorte já traz o 1º quadro do olhar, e o GIF roda por cima. Todos os
     quadros cobrem o 1º (verificado), então o quadro de baixo nunca aparece.
2. **Os exports do MCP vêm opacos, sobre o creme do frame.**
   - **Arte estática:** recortes do render 2x do frame (`download_assets` do 201:53, scale 2).
     O fundo creme é o mesmo da página, e os recortes ficam longe de texto.
   - **Onde uma arte cobre outra** (boneca, cachecol, tartaruga atrás do "h" do título): a cor
     vem do export do Figma e o alfa do SVG do Figma rasterizado. A cor é desmisturada com o
     fundo conhecido, sem editar o arquivo.
   - **Erro contra o Figma:** boneca recomposta (base + mãos + sombra) 0.118/255, cachecol
     0.065, tartaruga 0.099.
   - **Pixels de peças vizinhas:** os recortes da lousa e dos botões continham partes de
     outras peças (tartaruga e orelha do coelho), e esses pixels viraram transparentes.
3. **A boneca tem uma sombra só, a do grupo** (drop shadow 18.93/12.05, σ 1.01, preto 23%),
   e as mãos são círculos lisos `#FADAE7`.
   - A base é o render do Figma sem a sombra e sem as mãos. Embaixo das mãos fica o SVG
     rasterizado, que só aparece nas frestas durante o movimento.
   - As mãos são os círculos do SVG. A sombra é aplicada ao vivo sobre a união (CSS
     `drop-shadow` com os parâmetros do Figma), para acompanhar as mãos. É o efeito do próprio
     Figma, não uma sombra nova.
4. **A manivela oscila ±12° em torno do eixo (48, 82) da caixa**, 5 ciclos de 0.7 s no tempo
   do fio (3.5 s). Uma volta inteira levaria a ponta, que está na mão esquerda, a percorrer
   ~100px. A mão esquerda acompanha a ponta, e a mão direita balança em fase oposta.
5. **Entrelinha do texto do corpo:** 31px a 26px (1.1923), medida nas caixas do Figma. O
   `normal` do Chrome para a Clother fica mais alto.
6. **Recuo dos parágrafos numerados** (`text-indent`), medido no render 2x: 54 / 56.5 / 54 /
   48 / 71.
7. **Inglês:**
   - O h1 tem quebra explícita ("how did I\nget here?"), senão "get" cobre o doodle de nuvem.
   - "vidinha" virou "my life" (curto), para não cobrir o coelho no título alinhado à direita.
8. **Fidelidade a 1728 em movimento reduzido (estado final):** MAE por região contra o render
   1:1 do Figma de 0.8 a 2.8/255. A exceção é o footer compartilhado (6.0), pela diferença de
   tipografia registrada em "Fora de escopo".

## Minhas escolhas (para revisão)

- **Abaixo de 1024px:** uma coluna. As faixas continuam proporcionais, porque são arte. Os
  pills da cena da boneca saem de cima do fio e viram uma linha embaixo da cena, para não
  ficarem com ~5px. A colagem da gallery continua proporcional, com os textos no fluxo.
- **Animação:** cerca de 3,5 s para o fio. As mãos fazem um círculo pequeno, em fase oposta.
- **Textos em inglês:** rascunho para revisão da Ágatha.
