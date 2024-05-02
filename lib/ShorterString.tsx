export const shorterString = (string: string, characters?: number) => {
  return string.substring(0, characters ?? 6) + "..." + string.substring(string.length - (characters ?? 6))
}