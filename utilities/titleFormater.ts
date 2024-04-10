export default function splitSentences(text:string, maxWords:number) {
  // Split the text into sentences based on spaces
  const sentences = text.split(" ");

  // If maxWords is provided, slice the array and join the words with spaces
  if (maxWords) {
    return sentences.slice(0, maxWords).join(" ");
  }

  // If maxWords is not provided, return the entire text
  return text;
}