/**
 * The single switch for placeholder marking.
 *
 * Marking is not only inline spans — the Footer carries a legend sentence
 * explaining the convention — so a CSS-only flag on :root could not turn it
 * all off. Both the stylesheet (via the root attribute) and the Footer read
 * this one constant, which is why flipping it to `false` at launch silences
 * the annotation and the legend together.
 *
 * `Ph` keeps emitting `data-placeholder` either way, so a pre-launch sweep
 * can still find every unfinished fact in the markup.
 */
export const PLACEHOLDER_MARKING = false

export const PLACEHOLDER_ATTRIBUTE = 'data-placeholder-marking'
