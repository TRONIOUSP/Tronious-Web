import { cx } from '@/lib/cx'

/**
 * A visual summary of the three markets the quality system is built for. The
 * full, authoritative detail for each market lives in the cards that follow
 * this figure on the page, so this figure is marked decorative to avoid a
 * screen reader announcing the same market/agency pairing twice.
 */
const MARKETS = [
  { market: 'United States', agency: 'FDA' },
  { market: 'European Union', agency: 'EU MDR' },
  { market: 'Australia', agency: 'TGA' },
]

export default function MarketCoverageFigure({ className }: { className?: string }) {
  return (
    <figure data-market-coverage="" aria-hidden="true" className={cx(className)}>
      <ul data-market-coverage-list="">
        {MARKETS.map((item) => (
          <li key={item.market}>
            <span data-market-coverage-market="">{item.market}</span>
            <span data-market-coverage-agency="">{item.agency}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}
