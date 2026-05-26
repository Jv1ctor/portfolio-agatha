# Implementation Plan — Portfólio Ágatha Sales

**Fonte do design:** [Figma — Pontossemno (Copy)](https://www.figma.com/design/KTDK2soU5GoGyIwFhTl7RG/Pontossemno--Copy-)
**Tipo de projeto:** Portfólio estático (sem back-end próprio)
**Decisões já travadas com o cliente:**
- Foco em **desktop**, com **responsividade mobile** como bônus.
- Tabs do header (`Gráfico`, `Interação`, `Serviços`, `3D`) viram **rotas separadas**.
- Formulário de contato funcional via **EmailJS** (tier gratuito).
- **Home (`/`)** é a página **"Sobre mim"** (filosofia + experiência da Ágatha).
- **Cards placeholder** vazios são mantidos como **"em breve"** (teaser de projetos futuros).
- **Fonte display:** **AM Novecento** — usuário fornece o arquivo.

---

## 1. Stack proposta

| Camada | Escolha | Justificativa |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + **TypeScript** | Rotas como pastas (cai como uma luva nas tabs), SSG por padrão (deploy estático grátis), `next/image` resolve sozinho a otimização das ilustrações pesadas do Figma, SEO nativo |
| Estilização | **Tailwind CSS v4** + **CSS Modules** pontuais | Tokens do Figma viram config do Tailwind; CSS Modules só para tipografia display dos heros |
| Animações | **Framer Motion** | Case studies são páginas longas com muito scroll — `whileInView`, fade/slide nos cards, transição entre tabs |
| Formulário | **EmailJS** (recomendado) ou **Formspree** | Sem back-end; EmailJS envia direto do front, Formspree intermedia. Ambos têm tier grátis |
| Fontes | `next/font/google` + arquivo local pra display | Display dos heros parece custom/handwritten — precisa do arquivo da fonte do Figma |
| Deploy | **Vercel** | Gratuito, integração nativa com Next.js, preview automático por commit |
| Lint/Format | ESLint + Prettier (defaults do `create-next-app`) | Zero config |

**Por que não Vite + React puro?** Funcionaria, mas pra um portfólio com 9 rotas, muita imagem e potencial SEO (você vai querer que recrutadores achem no Google), o Next.js entrega isso de graça sem custo extra de complexidade.

---

## 2. Mapa de rotas

```
/                           → Home = página "Sobre mim" (filosofia + experiência)
/grafico                    → Landing filtrada por Design Gráfico
/interacao                  → Landing filtrada por UX/UI
/servicos                   → Landing filtrada por Design de Serviços
/3d                         → Landing filtrada por 3D
/contato                    → "Vamos trabalhar juntos?" (form EmailJS)
/projetos/pontos-sem-no     → Case study 1
/projetos/batuco-tuco       → Case study 2
/projetos/pontinhas-soltas  → Case study 3
```

> Nota: como `/` é o "Sobre mim", removo `/sobre-mim` da árvore. O header continuará tendo o link "Sobre mim" apontando para `/`.

Os projetos no Figma têm tags de categoria (`Design de Identidade Visual`, `Design de Interfaces Gráficas`, `Design de personagens` etc.) — vou usar essas tags para decidir em qual landing cada projeto aparece (um mesmo projeto pode aparecer em mais de uma).

---

## 3. Estrutura de pastas

```
portifolio/
├── app/
│   ├── layout.tsx                  # Header + Footer globais
│   ├── page.tsx                    # Home = Sobre mim (filosofia + experiência)
│   ├── (categorias)/
│   │   ├── grafico/page.tsx
│   │   ├── interacao/page.tsx
│   │   ├── servicos/page.tsx
│   │   └── 3d/page.tsx
│   ├── contato/page.tsx
│   └── projetos/
│       ├── pontos-sem-no/page.tsx
│       ├── batuco-tuco/page.tsx
│       └── pontinhas-soltas/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Logo "Ágatha Sales" + nav
│   │   ├── Footer.tsx              # "Redes sociais" + handles
│   │   └── TabsNav.tsx             # Tabs ativas/inativas
│   ├── home/
│   │   ├── CategoryHero.tsx        # "DESIGN GRÁFICO" display
│   │   └── ProjectCard.tsx         # Card de projeto na lista
│   ├── case-study/
│   │   ├── CaseHero.tsx            # Capa do projeto
│   │   ├── TagPill.tsx             # "Concluído", "Acadêmico"
│   │   ├── ProcessGrid.tsx         # Sistema/grid de processo
│   │   ├── ImageRow.tsx            # Linhas de imagens (texturas, sketches)
│   │   └── ThankYouSection.tsx     # "Obrigada por ter chegado até aqui!"
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       └── SectionTitle.tsx
├── content/
│   └── projects.ts                 # Metadata dos 3 projetos (tags, slug, descrição)
├── lib/
│   ├── emailjs.ts                  # Cliente EmailJS
│   └── tokens.ts                   # Tipagem dos design tokens
├── public/
│   ├── images/projects/
│   │   ├── pontos-sem-no/...      # Assets exportados do Figma
│   │   ├── batuco-tuco/...
│   │   └── pontinhas-soltas/...
│   └── fonts/                      # Fonte display
└── tailwind.config.ts              # Tokens (cores, espaçamentos)
```

---

## 4. Design tokens (a confirmar exportando do Figma)

Bati o rate limit do MCP antes de extrair as variáveis nominais, mas pelas screenshots dá pra inferir a paleta principal:

| Token | Valor (aproximado) | Uso |
|---|---|---|
| `--bg-cream` | `#FBF6E9` ou similar | Fundo da landing |
| `--accent-blue` | `#3B5CD7` aprox | Hero/Capa Pontos sem nó, botões |
| `--accent-orange` | `#F2A33B` aprox | Hero Batuco-tuco |
| `--text-primary` | `#222` aprox | Corpo de texto |
| `--text-muted` | `#7A7A7A` aprox | Nav, footer |
| `--card-placeholder` | gradient azul→roxo | Card vazio |

**Tipografia:**
- **Display** (heros): **AM Novecento** — servida via **Adobe Fonts (Typekit)**. Uso: `font-family: am-novecento, sans-serif; font-weight: 400`.
- **Corpo** (texto geral): **Clother** — também via Adobe Fonts. Uso: `font-family: clother, sans-serif; font-weight: 300`.
- **Carregamento:** `<link rel="stylesheet" href="https://use.typekit.net/<KIT_ID>.css">` no `<head>` de `app/layout.tsx` + `<link rel="preconnect" href="https://use.typekit.net">` para reduzir latência.
- **Domínios autorizados** no painel do Adobe Fonts: `localhost` (dev) + domínio de produção quando definirmos.

---

## 5. Pipeline de assets

Esse projeto é **fortemente baseado em ilustração**. Estimo ~80-120 imagens entre:
- Personagens (Ali, Jenny, Lac, Nina, Haggy, Yopi, Pepo, Hanni, Cybele, Gunter…)
- Logos e variações de identidade (Pontos sem nó, Batuco-tuco)
- Capas, mockups de app, testes de impressão, sketches, painéis semânticos
- Avatar da Ágatha (a personagem com cabelo preto)

**Plano de export:**
1. Listo cada `image-ref` / `rounded-rectangle` com imagem do metadata XML.
2. Uso o MCP do Figma (`get_design_context`) por seção para pegar as URLs assinadas dos assets.
3. Baixo tudo para `public/images/projects/<slug>/` com nomes semânticos (`personagem-yopi.png`, não `image_175.png`).
4. Otimizo via `next/image` (responsive sizes, lazy load, AVIF/WebP automático).

---

## 6. Funcionalidades específicas

### TabsNav (header)
- Pill ativa marcada com `aria-current="page"`.
- Indicador animado deslizando entre tabs (`<motion.div layoutId>`).
- Em mobile vira hambúrguer (drawer lateral).

### ProjectCard
- Imagem de capa + título + tags + descrição curta + botão "Ver mais".
- No Figma há cards "preenchidos" (Pontos sem nó com bg azul, Batuco-tuco com bg laranja) e cards "vazios" (placeholder roxo) — vou interpretar os vazios como **estado de coming-soon** ou simplesmente não renderizar até o usuário ter mais projetos.

### Case study pages
- Cada uma é uma scroll story longa (5000+px no Figma).
- Vou modelar **cada seção como um componente reutilizável** (CapaHero, ProcessoCriacao, Sistema, Prototipagem, Galeria, Agradecimento) e cada projeto importa os blocos que precisa.
- `framer-motion` `useScroll` para parallax sutil no hero.

### Formulário de contato
- Campos: nome, email, mensagem (`Digite sua solicitação…`).
- Validação client-side com Zod.
- Estados: idle / enviando / sucesso / erro.
- Envio via EmailJS — você precisa criar conta grátis e me dar a `serviceId`, `templateId` e `publicKey`.

### Animações
- Fade-up nos blocos ao entrar no viewport (case studies).
- Hover dos cards: leve scale + sombra.
- Transição entre tabs: crossfade dos cards (`AnimatePresence`).
- Cursor custom (opcional, comum em portfólios de design).

---

## 7. O que CONSEGUIMOS fazer (alta confiança)

- Reproduzir fielmente os layouts das 4 landings e das 3 case studies em desktop.
- Tipografia, espaçamentos, hierarquia visual idênticos ao Figma.
- Roteamento entre todas as páginas.
- Formulário funcional com envio real.
- Responsividade adaptando os cards de 1 → 2 colunas em telas largas e mantendo coluna única em mobile.
- Otimização de imagens (lazy load, formatos modernos).
- Deploy em produção via Vercel com domínio `.vercel.app` grátis (ou domínio próprio se você tiver).
- SEO básico: meta tags, OG image por página, sitemap.
- Acessibilidade: alt em imagens, navegação por teclado, contraste WCAG AA.

## 8. O que tem RISCO / decisão pendente

| Item | Risco | Mitigação |
|---|---|---|
| **Fontes** | Servidas via Adobe Fonts (Typekit) — depende da assinatura Creative Cloud da Ágatha estar ativa e do domínio estar na allowed list do kit. Se cair, o site usa fallback web-safe | Você adiciona `localhost` e o domínio de produção no painel; mantém a CC ativa |
| **Assets ilustrativos** | ~100 imagens precisam ser exportadas — o MCP do Figma tem rate limit (já bati hoje). Vai precisar de várias sessões pra extrair tudo | Extraio em lotes por projeto; alternativa é você exportar tudo manualmente do Figma e me passar a pasta |
| **Cards placeholder** | No Figma há cards genéricos sem conteúdo. Não sei se são intencionais (slot pra projetos futuros) ou só visual | Pergunto antes de implementar |
| **Versão mobile** | O design só tem desktop. Vou ter que **inventar** o layout mobile com base nas convenções (stack vertical, header colapsa em hambúrguer) | Te mando um preview do mobile pra você aprovar antes de finalizar |
| **Microinterações específicas** | O Figma não documenta hover states ou animações | Uso o padrão de portfólios da indústria; você dá feedback durante o build |
| **Conteúdo real dos projetos** | Os textos longos no Figma estão completos? Algum é Lorem Ipsum? | Vou validar visualmente cada bloco de texto antes de copiar |

## 9. O que NÃO conseguimos / fora de escopo

- ❌ **Animações 3D interativas** (modelos rotativos dos bonecos de "Pontinhas soltas"). Se quiser isso depois, dá pra adicionar com `react-three-fiber`, mas é outro projeto.
- ❌ **CMS / painel admin** — projetos são código (Markdown ou TS). Pra adicionar projeto novo, edita um arquivo.
- ❌ **Internacionalização** — assumindo PT-BR only. Se quiser EN depois, dá pra adicionar.
- ❌ **Analytics avançado** — posso plugar Vercel Analytics ou Plausible básico, mas dashboards customizados estão fora.
- ❌ **Blog** — não está no Figma.

---

## 10. Cronograma sugerido (estimativa)

| Fase | Entregável | Esforço estimado |
|---|---|---|
| **0. Setup** | Next.js + Tailwind + estrutura de pastas + design tokens no `tailwind.config` | 1-2h |
| **1. Layout base** | Header, Footer, fontes carregadas, tema | 2-3h |
| **2. Landing pages** | 4 rotas de categoria + ProjectCard + TabsNav animado | 4-6h |
| **3. Páginas Sobre/Contato** | Conteúdo estático + form EmailJS funcionando | 3-4h |
| **4. Case study Pontos sem nó** | Página completa + assets exportados | 4-6h |
| **5. Case study Batuco-tuco** | Página completa + assets exportados | 3-5h |
| **6. Case study Pontinhas soltas** | Página completa + assets exportados | 3-5h |
| **7. Responsivo + polish** | Mobile breakpoints + animações scroll + acessibilidade | 4-6h |
| **8. Deploy + ajustes** | Vercel, domínio, SEO meta, OG images | 2-3h |
| **Total** | | **~26-40h** |

---

## 11. Próximos passos para começar

**Decisões confirmadas:**
- ✅ Stack: Next.js 15 + TypeScript + Tailwind v4 + Framer Motion + EmailJS
- ✅ Home (`/`) = página "Sobre mim"
- ✅ Cards placeholder mantidos como "em breve"
- ✅ Fontes: **AM Novecento** (display) + **Clother** (corpo)

**Pendências do usuário antes da Fase 1:**
1. Me passar a **URL do kit do Adobe Fonts** (`https://use.typekit.net/XXXXXXX.css`).
2. Confirmar que `localhost` está na lista de domínios autorizados do kit (geralmente já vem por padrão).
3. Criar conta grátis no [EmailJS](https://emailjs.com) e me passar `serviceId`, `templateId` e `publicKey`. (Vercel fica pra depois — desenvolvimento local primeiro.)

**Quando isso estiver disponível, eu começo pela Fase 0** (Setup do projeto Next.js + Tailwind + tokens).

---

## 12. Estado atual + plano de continuação multi-sessão

**Onde paramos (2026-05-25):**
- ✅ Fases 0-4 do cronograma original concluídas: setup Next.js, layout global (Header/Footer), home (Sobre mim), 4 páginas de categoria, 3 case studies (shells), página de contato com EmailJS.
- ✅ Build limpo, 9 rotas estáticas, dev server testado retornando 200 em todas.
- ❌ Layout das páginas ainda **genérico** — falta passar `get_design_context` em cada seção pra reproduzir proporções/estrutura fiel ao Figma.
- ❌ Sem assets reais (placeholders + TODOs nos lugares certos).
- ❌ Sem cores exatas (estimadas das screenshots — usar `get_variable_defs` na próxima).
- ❌ Sem fontes Adobe (aguardando `NEXT_PUBLIC_TYPEKIT_ID`).
- ❌ EmailJS não configurado (aguardando `serviceId`, `templateId`, `publicKey`).

**Por que dividir em múltiplas sessões:** o MCP do Figma no plano Starter tem limite diário de chamadas. Mecanismo de reset incerto (provavelmente rolling 24h por chamada). Fazer tudo de uma vez arrisca bater o limite no meio e deixar o projeto inconsistente. Estratégia conservadora abaixo.

### Sessão #1 — Site institucional + cores
**Objetivo:** site fiel ao Figma na parte "estática" (sem case studies). Cores corretas, layout das landings + sobre + contato.

| Etapa | Ação | Chamadas MCP |
|---|---|---|
| 1 | `get_variable_defs` no nó raiz (`82:1292`) — puxa **todas as variáveis** de cor/espaçamento do arquivo de uma vez | 1 |
| 2 | `get_design_context` na seção `257:371` (Landing + Contato versão pequena) — pega layout fiel das páginas Sobre mim + Vamos trabalhar juntos | 1 |
| 3 | `get_design_context` na seção `274:9028` (Landing + Contato grande) — pega layout fiel das 4 landings de categoria com hero display | 1 |
| 4 | Refinar `app/page.tsx`, `app/contato/page.tsx`, `components/home/CategoryPage.tsx`, `components/home/ProjectCard.tsx` | — |
| 5 | Atualizar `globals.css` com tokens nominais reais (substituir os estimados) | — |
| 6 | Se sobrar budget: 1-2 `get_screenshot` pra validar visualmente | 0-2 |

**Orçamento:** ~3-5 chamadas. Estado final: site institucional pronto, mostrável pra Ágatha.

### Sessão #2 — Case study Pontos sem nó
**Objetivo:** primeiro case study totalmente fiel + todos os assets dele baixados.

| Etapa | Ação | Chamadas MCP |
|---|---|---|
| 1 | `get_design_context` na seção `219:7640` (Pontos sem nó completa, 5600px tall) — devolve URLs assinadas de **todos os assets** dessa seção | 1-2 (pode precisar dividir em sub-nós se a resposta for grande) |
| 2 | Baixar todos os assets via `Invoke-WebRequest` para `public/images/projects/pontos-sem-no/` | — |
| 3 | Refinar `app/projetos/pontos-sem-no/page.tsx` com as seções reais (Processo de criação, Sistema, Prototipagem, Projeto final) | — |
| 4 | Criar componentes case-study reutilizáveis (ProcessGrid, ImageRow, GalleryGrid) | — |

**Orçamento:** ~2-4 chamadas. Estado final: 1 case study completo, templates de componentes prontos pra reusar.

### Sessão #3 — Case studies Batuco-tuco + Pontinhas soltas
**Objetivo:** completar os 2 case studies restantes reusando componentes da sessão #2.

| Etapa | Ação | Chamadas MCP |
|---|---|---|
| 1 | `get_design_context` na seção `272:3187` (Batuco-tuco, 3536px tall) | 1-2 |
| 2 | `get_design_context` na seção `274:8167` (Pontinhas soltas, 4399px tall) | 1-2 |
| 3 | Baixar assets de ambos | — |
| 4 | Refinar `app/projetos/batuco-tuco/page.tsx` e `app/projetos/pontinhas-soltas/page.tsx` | — |
| 5 | Polish geral: animações framer-motion no scroll, mobile responsive, validação final | — |

**Orçamento:** ~4-6 chamadas. Estado final: portfólio completo.

### Sessão #4 (opcional) — Polish e deploy
Se sobrar trabalho: ajustes finos, deploy na Vercel, configuração de domínio, SEO meta tags por página, OG images. Zero chamadas Figma necessárias.

---

## 13. Como retomar amanhã

1. Abre o Claude Code nesta pasta (`C:\Users\kaike\Desktop\portifolio`)
2. Diz: "vamos continuar do portfólio, sessão #1"
3. Se tiver as keys, me passa antes (`NEXT_PUBLIC_TYPEKIT_ID`, EmailJS keys) — eu plugo no `.env.local` antes de começar
4. Caso contrário, sigo o plano da Sessão #1 sem as keys; plugo depois

---

*Plano gerado a partir da análise de 6 seções do Figma (4 telas de landing, 3 case studies, 1 página About + Contato, biblioteca de componentes). Implementação iniciada em 2026-05-25 — fases 0-4 concluídas. Continuação programada em 3 sessões adicionais por causa do rate limit do MCP do Figma.*
