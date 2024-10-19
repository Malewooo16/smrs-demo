export function wordCount(sentence:string) {
    // Trim the sentence to remove leading/trailing spaces
    // Split the sentence into words using whitespace as the delimiter
    // Filter out any empty strings that may result from multiple spaces
    const words = sentence.trim().split(/\s+/).filter(word => word.length > 0);
    
    // Return the length of the words array
    return words.length;
}

// Example usage:
// const sentence = "This is an example sentence.";
// console.log(wordCount(sentence)); // Output: 5
