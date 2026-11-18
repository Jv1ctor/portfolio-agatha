# Quality gates — Página Minha carreira (2026-11-17)

Spec: `docs/superpowers/specs/2026-11-17-carreira-page-design.md`.

## Automáticos

- **Gate 4:** `app/[lang]/carreira/page.tsx` entrou em `PAGES` e `METADATA_PAGES`
  (`await params`, `isLocale`, `notFound`, `getDictionary`, `generateMetadata`).
- **Gate 5:** `/pt-BR/carreira` e `/en/carreira` → 200.
- **Gate 9** (`./scripts/check-quality-gates.sh 9`):
  - **Dicionário:**
    - paridade de `career.*` pt-BR ↔ en, sem valores vazios
    - mesma ordem das chaves `p*`/`b*` dos negritos do hero
    - `metadata.career` presente
  - **Rota:**
    - página com `x-default`
    - `HeaderRouter` esconde o header e `FooterRouter` usa o `HomeFooter`
    - `CaseTopBar variant="career"`
    - o bloco de carreira da home aponta para `/carreira`
  - **Assets:** todo `/images/carreira/*.webp` referenciado existe, inclusive os pares
    `<nome>.webp` + `<nome>-static.webp` de cada `Loop`.
  - **Texto:** nenhum texto fixo em `components/career` (comentários não contam).
  - **Movimento:** `KnittingDoll` é Client Component; há bloco de movimento reduzido no
    `knitting.module.css` e `<source>` de movimento reduzido nos GIFs.
  - **Runtime** (`:3000`):
    - o HTML tem o h1, os pills, "vidinha", `hrefLang` en/x-default e o voltar ao topo
    - a home tem o link para `/pt-BR/carreira`

  - **Lousa mágica e blocos (Emenda 3):**
    - `DrawingPlayground`, `MagicBoard` e `ToolBlocks` são Client Components
    - existem as camadas em `public/images/carreira/lousa/` e frente + verso dos 8 blocos em
      `public/images/carreira/blocos/`
    - há bloco de movimento reduzido no `blocks.module.css` e `reducedMotion()` na lousa
    - os blocos só ficam de verso depois da hidratação (`useSyncExternalStore`)
    - os placeholders `{name}`/`{n}` de `career.drawing` existem nos dois idiomas
    - `vitest` passa (máquina de estados, geometria da régua e da caneta, glifos dentro da
      tela e contínuos)

Ordem (memória do repo): 3/4/6/8/9 sem servidor e, depois de
`pnpm build && pnpm start -p 3000`, 5/7/8/9.

## Manuais (feitos na entrega)

- **Lousa e blocos (Emenda 3), Playwright:**
  - **Repouso a 1728:** lousa com MAE 0.39/255 contra o recorte do Figma e blocos com 2.9 em
    movimento reduzido. De verso a diferença é só a pedida.
  - **Clicar num bloco:** ele gira e o label vira "Desenhar o ícone do …".
  - **Clicar de novo:** a bolinha varre e a tela fica vazia, a caneta desenha (sai tinta na
    caixa do ícone) e volta ao suporte com o `transform` vazio.
  - **Antes do 1º desenho:** arrastar a bolinha não apaga, os blocos balançam e a região viva
    avisa.
  - **Depois:** arrastar a bolinha até o meio zera a metade esquerda, e arrastar a caneta
    sobre a tela deixa tinta.
  - **Teclado:** Tab no bloco, Enter vira, Enter desenha. Setas na bolinha apagam aos poucos
    e End apaga tudo.
  - **As 8 grafias:** folha de capturas para a Ágatha revisar.

- **1728, movimento reduzido:** recortes contra o render 1:1 do Figma, com MAE ≤ 2.8/255 por
  região (o footer compartilhado fica em 6.0, diferença conhecida).
- **Animação:**
  - a cena fica armada (escondida) até entrar na tela e dispara uma vez
  - os pills aparecem na ordem do fio
  - o fim é o pose do Figma
  - com movimento reduzido não há animação, e os GIFs ficam no 1º quadro
- **Larguras** 390, 768, 1024, 1280, 1366, 1440, 1728 e 1920 nos dois idiomas: sem scroll
  horizontal, sem texto vazando, sem texto sobre arte que não esteja assim no Figma.
- **Navegação:**
  - "<" leva para `/pt-BR` e "projetos" para `/pt-BR/projetos`
  - o seletor de idioma leva para `/en/carreira`
  - `/fr/carreira` dá 404
