/**
 * Sets the item to the async storage.
 */
export async function setItem(key: string, value: unknown): Promise<void> {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets the item from the async storage.
 */
export async function getItem(key: string): Promise<any> {
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
