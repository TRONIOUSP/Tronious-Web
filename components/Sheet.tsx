export default function Sheet({
  doc,
  children,
}: {
  doc: string
  children: React.ReactNode
}) {
  return <article data-doc={doc}>{children}</article>
}
