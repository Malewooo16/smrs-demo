export default function toSentenceCase(text:string) {
    // Split the text into sentences using period (.) as the delimiter
    const sentences = text.split('-');
  
    // Capitalize the first letter of each sentence and make the rest lowercase
    const sentenceCaseSentences = sentences.map((sentence:string) => {
      if (sentence.length > 0) {
        const firstLetter = sentence[0].toUpperCase();
        const restOfSentence = sentence.slice(1).toLowerCase();
        return `${firstLetter}${restOfSentence}`;
      }
      return sentence; // Handle empty sentences (e.g., double periods "..")
    });
  
    // Join the sentences back together with a period and space
    return sentenceCaseSentences.join(' ');
  }
  
  