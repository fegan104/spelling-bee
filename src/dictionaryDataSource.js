let dictionary = []


const fetchDictionary = async () => {
  if (dictionary.length === 0) {
    console.log("Waiting ⏳...")
    console.time('dictionary');
    const response = await fetch("/processed_words.txt")
    const fileString = await response.text()
    dictionary = fileString.split("\r\n")
    console.timeEnd('dictionary');
    console.log("Dictionary fetched ✅")
  }
}

const isValidWordAsync = async (word) => {
  return dictionary.includes(word.toLowerCase())
}

export { isValidWordAsync, fetchDictionary };