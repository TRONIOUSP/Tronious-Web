/** Joins class names, dropping conditionals that evaluated to nothing. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
