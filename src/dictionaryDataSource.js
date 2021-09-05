import { sendDictionaryDownloadFailedEvent } from './firebase'

//in-memory cache of acceptable words
let dictionary = []

/**
 * Gets dictionary (hopefully from service worker cache) then caches those
 * words in memory for easier word look up. You can call this repeatedly as 
 * once the dictionary is cached this funciton is a no-op.
 */
export const fetchDictionary = async () => {
  if (dictionary.length > 0) {
    return
  }

  try {
    const response = await fetch("/processed_words.txt")
    const fileString = await response.text()
    dictionary = fileString.split("\n")
  } catch (err) {
    console.error(err)
    sendDictionaryDownloadFailedEvent(err)
  }
}

export const isValidWordAsync = async (word) => {
  await fetchDictionary()
  return dictionary.includes(word.toLowerCase())
}