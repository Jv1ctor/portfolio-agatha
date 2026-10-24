/**
 * Layout da seção /projetos. Renderiza o `children` (índice ou página de case)
 * e o slot paralelo `@modal`, que mostra o case interceptado sobre o índice
 * quando a navegação é feita no cliente (Task 4). Sem interceptação, o slot cai
 * em `@modal/default.tsx` (null).
 */
export default function ProjetosLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
