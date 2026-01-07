/**
 * Converts a string to Title Case while preserving exceptions and special formatting.
 * 
 * @param text - The input string to convert
 * @returns The title-cased string
 */
export function toTitleCase(text: string): string {
  if (!text || text.trim().length === 0) return text;

  // Case-sensitive exception list
  const exceptions = new Set(['RBI', 'SEBI', 'AIL', 'CDMO', 'API', 'R&D', 'R & D', "AIL's"]);

  // Small words that should be lowercase (unless first/last)
  const smallWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'so', 'yet',
    'as', 'at', 'by', 'in', 'of', 'on', 'per', 'to', 'up', 'via', 'vs'
  ]);

  // Regex patterns for special cases
  const urlPattern = /^(https?:\/\/|www\.|mailto:)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePattern = /^@[\w]+$/;
  const allCapsPattern = /^[A-Z0-9]{2,}$/; // All caps or alphanumeric caps, length ≥ 2
  // Code-like pattern: must contain numbers or be all uppercase, and match pattern
  const codeLikePattern = /^[A-Z0-9]+([-._][A-Z0-9]+)*$/; // Code-like: X1, AB-12, Q4, etc. (case-sensitive, uppercase)

  /**
   * Checks if a token should be preserved as-is
   */
  function shouldPreserve(token: string): boolean {
    if (!token || token.trim().length === 0) return false;
    
    // Check exception list (case-sensitive)
    if (exceptions.has(token)) return true;
    
    // Check if all-caps or alphanumeric caps with length ≥ 2
    if (allCapsPattern.test(token)) return true;
    
    // Check if code-like format (must contain numbers or be all uppercase)
    // Only preserve if it's actually a code (has numbers or is all uppercase alphanumeric)
    if (codeLikePattern.test(token) && (/\d/.test(token) || /^[A-Z0-9]+$/.test(token))) return true;
    
    // Check if URL, email, or handle
    if (urlPattern.test(token) || emailPattern.test(token) || handlePattern.test(token)) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Applies title case to a single word
   */
  function titleCaseWord(word: string, isFirst: boolean, isLast: boolean): string {
    if (!word) return word;
    
    // Preserve if it matches exceptions (check original word for case-sensitive exceptions)
    if (shouldPreserve(word)) return word;
    
    // Normalize to lowercase first for consistent processing
    const normalizedWord = word.toLowerCase();
    
    // Always capitalize first and last word
    if (isFirst || isLast) {
      return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1);
    }
    
    // Check if it's a small word
    if (smallWords.has(normalizedWord)) {
      return normalizedWord;
    }
    
    // Apply title case
    return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1);
  }

  /**
   * Handles hyphenated words
   */
  function titleCaseHyphenated(word: string, isFirst: boolean, isLast: boolean): string {
    if (!word.includes('-')) return titleCaseWord(word, isFirst, isLast);
    
    // Split on hyphens
    const parts = word.split('-');
    const processedParts = parts.map((part, index) => {
      const isPartFirst = isFirst && index === 0;
      const isPartLast = isLast && index === parts.length - 1;
      
      // Preserve if it matches exceptions (check original part for case-sensitive exceptions)
      if (shouldPreserve(part)) return part;
      
      // Normalize to lowercase first
      const lowerPart = part.toLowerCase();
      
      // For hyphenated words, capitalize both sides unless it's a small word
      if (!isPartFirst && !isPartLast && smallWords.has(lowerPart)) {
        return lowerPart;
      }
      
      return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1);
    });
    
    return processedParts.join('-');
  }

  // Tokenize while preserving separators exactly
  // Match words (including hyphenated words and apostrophes) and separators separately
  // Words can contain hyphens between word chars, and apostrophes followed by letters (possessives/contractions)
  const tokenPattern = /([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:'[a-z]+)?)|([\s\-/&.,:;!?]+)/g;
  const tokens: Array<{ type: 'word' | 'separator'; value: string }> = [];
  let match;
  
  while ((match = tokenPattern.exec(text)) !== null) {
    if (match[1]) {
      // It's a word (may be hyphenated)
      tokens.push({ type: 'word', value: match[1] });
    } else if (match[2]) {
      // It's a separator
      tokens.push({ type: 'separator', value: match[2] });
    }
  }
  
  // Handle case where no matches (empty or only special chars)
  if (tokens.length === 0 && text.length > 0) {
    tokens.push({ type: 'separator', value: text });
  }

  // Check if the entire text matches an exception (strict case-sensitive matching)
  const fullText = tokens.map(t => t.value).join('');
  if (exceptions.has(fullText)) {
    return fullText;
  }

  // Merge tokens to check for multi-word exceptions (e.g., "R & D")
  // Look for patterns: word + separator + word that form an exception
  const mergedTokens: Array<{ type: 'word' | 'separator'; value: string }> = [];
  let i = 0;
  
  while (i < tokens.length) {
    // Check if current token + next separator + next word forms an exception
    if (i + 2 < tokens.length &&
        tokens[i].type === 'word' &&
        tokens[i + 1].type === 'separator' &&
        tokens[i + 2].type === 'word') {
      const combined = tokens[i].value + tokens[i + 1].value + tokens[i + 2].value;
      if (exceptions.has(combined)) {
        mergedTokens.push({ type: 'word', value: combined });
        i += 3;
        continue;
      }
    }
    mergedTokens.push(tokens[i]);
    i++;
  }

  // Process words
  const words = mergedTokens.filter(t => t.type === 'word').map(t => t.value);
  const processedWords = words.map((word, index) => {
    // Check if this word is an exception (including multi-word)
    if (exceptions.has(word)) return word;
    
    const isFirst = index === 0;
    const isLast = index === words.length - 1;
    return titleCaseHyphenated(word, isFirst, isLast);
  });

  // Reconstruct the string with original separators
  let result = '';
  let wordIndex = 0;
  
  for (const token of mergedTokens) {
    if (token.type === 'word') {
      result += processedWords[wordIndex++];
    } else {
      result += token.value;
    }
  }

  return result;
}

/**
 * React hook that converts a string to Title Case.
 * 
 * @param text - The input string to convert
 * @returns The title-cased string
 */
export function useTitleCase(text: string): string {
  return toTitleCase(text);
}
