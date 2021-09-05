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
    console.log("Skipping dictionary fetch")
    return
  }

  try {
    console.log("Starting dictionary fetch")
    const response = await fetch("/processed_words.txt")
    const fileString = await response.text()
    console.log(`Raw file string ${fileString}`)
    dictionary = fileString.split("\r\n")
    console.log(`Processed dictionary ${dictionary}`)
    console.log(`Successfully processed words ${dictionary.length} in dictionary`)
  } catch (err) {
    console.error(err)
    sendDictionaryDownloadFailedEvent(err)
  }
}

export const isValidWordAsync = async (word) => {
  console.log("Starting isValidWordAsync")
  await fetchDictionary()
  console.log(`Checking ${word.toLowerCase()} in dictionary`)
  console.log(`Checking typeof dictionary = ${typeof dictionary}`)
  console.log(`Checking typeof word = ${typeof word}`)
  const result = dictionary.includes(word.toLowerCase())
  console.log(`Returning ${result} from isValidWordAsync`)
  return result
}