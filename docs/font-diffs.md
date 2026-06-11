# Diferenças de tipografia · Figma × código

Auditoria de **2026-06-10**. Fonte: Figma `JScKam2g0JrbBdDk1Aq1Oc`, frames desktop (MacBook 1512px) da seção de Responsividade.

## Decisão

Os **tamanhos** de fonte **NÃO foram alterados** para bater com o Figma — vários valores do Figma estão em números quebrados (ex.: 46,786px, 17,55px, 28,519px), que não compensam replicar. Esta tabela registra essas diferenças apenas como referência.

Os ajustes de **peso / bold** (que o Figma define de forma limpa) **foram aplicados** — ver a seção "Pesos ajustados" no fim.

> Tamanhos do Figma são medidos no frame de 1512px. O site renderiza em coluna contida (máx. 1080px), então uma cópia 1:1 dos px nem sempre faria sentido.

## 🏠 Home / Sobre mim — `app/page.tsx`, `components/home/SectionHeading.tsx`

| Tipo | Figma | Código | Tamanho bate? |
|---|---|---|---|
| `:d` | AM Novecento 68,9px | 56px (`text-[3.5rem]`) | ❌ |
| Headings (Olá / Filosofia / Experiência) | AM Novecento 46,8px | 38px (`md:text-[2.375rem]`) | ❌ |
| Lead | Clother Bold 22,2px | 18px (`text-[1.125rem]`) | ❌ |
| Corpo | Clother Light 19,7px | 20px (`text-xl`) | ✅ (≈) |

## 🗂️ Categoria / Card — `components/home/ProjectCard.tsx`

| Tipo | Figma | Código | Tamanho bate? |
|---|---|---|---|
| Título da categoria (hero) | AM Novecento 162,6px | auto-fit (SVG) | ✅ (dinâmico) |
| Subtítulo do card | Clother Bold 28,5px | 26px (`text-[1.625rem]`) | ❌ |
| Pills (tags / data) | Clother Regular 17,55px | 16px (`text-base`) | ❌ |
| Descrição do card | Clother Light 17,55px | 16px (`text-base`) | ❌ |

## ✉️ Contato — `app/contato/page.tsx`, `components/contact/ContactForm.tsx`

| Tipo | Figma | Código | Tamanho bate? |
|---|---|---|---|
| "Vamos trabalhar juntos?" | AM Novecento 39,3px | 38px (`md:text-[2.375rem]`) | ⚠️ quase |
| Subtexto | Clother Regular 18,6px | 18px (`text-[1.125rem]`) | ✅ (≈) |
| Placeholder | Clother Regular 14,5px | tamanho padrão do input | ❌ |

## 🦶 Footer — `components/layout/Footer.tsx`

| Tipo | Figma | Código | Tamanho bate? |
|---|---|---|---|
| "Redes sociais" / IG / IN | Clother Regular 16,6px | `text-base` (16px) | ✅ (≈) |
| Handles (@aggy / Ágatha Ferreira) | Clother Light 16,6px | `text-base` (16px) | ✅ (≈) |

## 📄 Case study — `components/case-study/CaseShell.tsx`, `app/projetos/*`

(Specs do frame `368:4285` — Pontos sem nó.)

| Tipo | Figma | Código | Tamanho bate? |
|---|---|---|---|
| Subtítulo (h1) | Clother Bold 31,9px | 26px (`text-[1.625rem]`) | ❌ |
| Heading de seção (Processo / Prototipagem…) | Clother Bold 31,9px | 26px (`text-[1.625rem]`) | ❌ |
| Pills (status / tags / data) | Clother Regular 19,6px | 16px (`text-[1rem]`) | ❌ |
| Intro | Clother Light 19,6px | 16px (`text-[1rem]`) | ❌ |
| Corpo de seção | Clother Light 19,6px | 16px (`text-[1rem]`) | ❌ |
| Tabs de prototipagem | Clother Regular 19,6px | 16px (`text-[1rem]`) | ❌ |
| "Obrigada por ter chegado até aqui!" | Clother Regular 39,2px | 32px (`text-[2rem]`) | ❌ |

> Observação: assim como no resto do site, os tamanhos do código são **menores** que o Figma — mantidos por decisão (números quebrados).

## ✅ Sem diferença de tamanho

- **Nav** (header): Clother 16,6px ≈ `text-base`.
- **Hero "Ágatha sales"**: AM Novecento, auto-fit por SVG.

---

## Pesos ajustados (aplicados, sem mexer em tamanho)

Família do corpo agora é Clother **Light (300)** global (`globals.css`), batendo com o Figma. Onde o Figma usa **Regular (400)** ou **Bold (700)**, foi fixado o peso explicitamente:

| Local | Peso no Figma | Ajuste |
|---|---|---|
| Corpo da Home (ênfases: "experiência humana", "3D", "design de interfaces", "pesquisa", "currículo", "LinkedIn") | Bold 700 inline | adicionado `<strong className="font-bold">` |
| Pills do card | Regular 400 | `font-normal` |
| Footer "Redes sociais" / IG / IN | Regular 400 | `font-normal` |
| Subtexto do contato | Regular 400 | `font-normal` |
| Input / placeholder do contato | Regular 400 | `font-normal` |
| Nav item ativo | Black 900 | `font-black` (já feito) |
| Lead da Home | Bold 700 | `font-bold` (já estava) |
| Pills do case (status/tags/data) | Regular 400 | `font-normal` |
| Tabs de prototipagem (3 cases) | Regular 400 | `font-normal` |
| "Obrigada…" do case | Regular 400 | `font-normal` |
| Legendas dos thumbs (proto) | Regular 400 | `font-normal` |
| "LinkedIn" (último parágrafo da Home) | Bold + sublinhado (link) | virou `<a>` real p/ o LinkedIn (currículo segue sem link) |
| Subtítulo / headings de seção do case | Bold 700 | `font-bold` (já estava) |
| Intro / corpo de seção do case | Light 300 | `font-light` (já estava) |
