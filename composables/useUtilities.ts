export function useUtilities() {
  const cutText = (text: string, length: number) => {
    return text.length > length ? `${text.slice(0, length)}...` : text
  }

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return {
    cutText,
    capitalize
  }
}
