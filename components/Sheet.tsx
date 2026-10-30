import { truncate } from '@/lib/truncate'

export default function Sheet({
  doc,
  sheetTitle,
  children,
}: {
  doc: string
  sheetTitle: string
  children: React.ReactNode
}) {
  return (
    <article className="page">
      {children}
      <div className="titleblock">
        <div>
          Doc no.
          <b>{doc}</b>
        </div>
        <div>
          Sheet
          <b>{truncate(sheetTitle, 32)}</b>
        </div>
        <div>
          Rev
          <b>A · Draft</b>
        </div>
        <div>
          Status
          <b>Content placeholders</b>
        </div>
      </div>
    </article>
  )
}
