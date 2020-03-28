/**
 * Sets the item to the async storage.
 */
export async function setItem<T>(key: string, value: T): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets the item from the async storage.
 */
export async function getItem<T>(key: string): Promise<T | null> {
  const json = localStorage.getItem(key)

  if (!json) {
    return null
  }

  try {
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}
