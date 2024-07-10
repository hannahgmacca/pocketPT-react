export const camelCaseToSentenceCase = (input: string): string => {
    // Check if the input is empty
    if (!input) return '';

    // Replace capital letters with space + lowercase equivalent
    const sentence = input
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .toLowerCase();

    // Capitalize the first letter of the resulting sentence
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

