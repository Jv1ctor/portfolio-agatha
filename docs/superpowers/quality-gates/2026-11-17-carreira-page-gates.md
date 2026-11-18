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

Ordem (memória do repo): 3/4/6/8/9 sem servidor e, depois de
`pnpm build && pnpm start -p 3000`, 5/7/8/9.

## Manuais (feitos na entrega)

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
