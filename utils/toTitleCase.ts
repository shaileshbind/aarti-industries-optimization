/**
 * Title Case Conversion Rules:
 *
 * • Keep these words exactly as written: RBI, SEBI, AIL, CDMO, API, R&D, R & D, AIL's
 * • Keep words with apostrophes exactly as written (like "AIL's", "don't", "it's")
 * • Keep small words lowercase (always): a, an, the, and, but, or, nor, for, so, yet, as, at, by, in, of, on, per, to, up, via, vs
 * • For hyphenated words, capitalize each part (keep small words lowercase)
 * • Don't change these:
 *   - Website addresses (http://example.com, www.site.com)
 *   - Email addresses (user@email.com)
 *   - Social handles (@username)
 *   - All-caps words with 2+ letters (CEO, USA)
 *   - Code patterns with numbers or all caps (X1, AB-12, Q4)
 * • Keep all separators exactly as they are (spaces, hyphens, slashes, punctuation)
 * • Multi-word exceptions are preserved (like "R & D")
 *
 * Converts a string to Title Case while preserving exceptions and special formatting.
 *
 * @param text - The input string to convert
 * @returns The title-cased string
 */
export function toTitleCase(text: string): string {
  if (!text || text.trim().length === 0) return text;

  // Case-sensitive exception list
  const exceptions = new Set([
    "RBI",
    "SEBI",
    "AIL",
    "CDMO",
    "API",
    "R&D",
    "R & D",
    "AIL's",
    "AILs",
  ]);

  // Small words that should be lowercase (unless first/last)
  const smallWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "for",
    "so",
    "yet",
    "as",
    "at",
    "by",
    "in",
    "of",
    "on",
    "per",
    "to",
    "up",
    "via",
    "vs",
  ]);

  // Regex patterns for special cases
  const urlPattern = /^(https?:\/\/|www\.|mailto:)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePattern = /^@[\w]+$/;
  const allCapsPattern = /^[A-Z0-9]{2,}$/; // All caps or alphanumeric caps, length ≥ 2
  // Code-like pattern: must contain numbers or be all uppercase, and match pattern
  const codeLikePattern = /^[A-Z0-9]+([-._][A-Z0-9]+)*$/; // Code-like: X1, AB-12, Q4, etc. (case-sensitive, uppercase)

  /**
   * Normalizes apostrophes to straight apostrophe for consistent comparison
   * Handles straight apostrophe (') and curly apostrophes ('')
   */
  function normalizeApostrophe(str: string): string {
    // Replace all types of apostrophes (straight, curly, etc.) with straight apostrophe
    // \u0027 = straight apostrophe, \u2018 = left single quote, \u2019 = right single quote
    return str.replace(/[\u0027\u2018\u2019]/g, "'");
  }

  /**
   * Checks if a token is an AIL variation that should be preserved
   * Matches: AIL, AILs, AIL's, AIL'S, etc. (case-insensitive, preserves original)
   */
  function isAILVariation(token: string): boolean {
    if (!token) return false;
    // Match patterns like: AIL, AILs, AIL's, AIL'S, AIL'S (case-insensitive)
    // Remove apostrophes for comparison, then check if it's "AIL" or "AILS"
    // Handle both straight (') and curly (') apostrophes using Unicode
    // \u0027 = straight apostrophe, \u2018 = left single quote, \u2019 = right single quote
    const withoutApostrophe = token
      .replace(/[\u0027\u2018\u2019]/g, "")
      .toUpperCase();
    return withoutApostrophe === "AIL" || withoutApostrophe === "AILS";
  }

  /**
   * Checks if a token should be preserved as-is
   */
  function shouldPreserve(token: string): boolean {
    if (!token || token.trim().length === 0) return false;

    // Special handling for AIL variations - preserve them regardless of case/capitalization rules
    if (isAILVariation(token)) return true;

    // Check exception list (case-sensitive)
    if (exceptions.has(token)) return true;
    // Normalize apostrophes for comparison to handle both straight and curly apostrophes
    const normalized = normalizeApostrophe(token);
    if (exceptions.has(normalized)) {
      // Find the matching exception and return it as stored
      for (const ex of exceptions) {
        if (normalizeApostrophe(ex) === normalized) {
          return true;
        }
      }
    }

    // Preserve words with apostrophes (like "AIL's", "don't", "it's")
    // Check for straight apostrophe (') and curly apostrophes ('')
    if (/[\u0027\u2018\u2019]/.test(token)) return true;

    // Check if all-caps or alphanumeric caps with length ≥ 2
    if (allCapsPattern.test(token)) return true;

    // Check if code-like format (must contain numbers or be all uppercase)
    // Only preserve if it's actually a code (has numbers or is all uppercase alphanumeric)
    if (
      codeLikePattern.test(token) &&
      (/\d/.test(token) || /^[A-Z0-9]+$/.test(token))
    )
      return true;

    // Check if URL, email, or handle
    if (
      urlPattern.test(token) ||
      emailPattern.test(token) ||
      handlePattern.test(token)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Applies title case to a single word
   */
  function titleCaseWord(word: string): string {
    if (!word) return word;

    // Special handling for AIL variations - preserve exactly as written
    if (isAILVariation(word)) return word;

    // Preserve if it matches exceptions (check original word for case-sensitive exceptions)
    if (shouldPreserve(word)) return word;

    // Normalize to lowercase first for consistent processing
    const normalizedWord = word.toLowerCase();

    // Check if it's a small word (keep lowercase)
    if (smallWords.has(normalizedWord)) {
      return normalizedWord;
    }

    // Apply title case
    return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1);
  }

  /**
   * Handles hyphenated words
   */
  function titleCaseHyphenated(word: string): string {
    if (!word.includes("-")) return titleCaseWord(word);

    // Split on hyphens
    const parts = word.split("-");
    const processedParts = parts.map((part) => {
      // Preserve if it matches exceptions (check original part for case-sensitive exceptions)
      if (shouldPreserve(part)) return part;

      // Normalize to lowercase first
      const lowerPart = part.toLowerCase();

      // For hyphenated words, capitalize both sides unless it's a small word
      if (smallWords.has(lowerPart)) {
        return lowerPart;
      }

      return lowerPart.charAt(0).toUpperCase() + lowerPart.slice(1);
    });

    return processedParts.join("-");
  }

  // Tokenize while preserving separators exactly
  // Match words (including hyphenated words and apostrophes) and separators separately
  // Words can contain hyphens between word chars, and apostrophes followed by letters (possessives/contractions)
  // Updated pattern to better capture apostrophes: matches word chars, optional hyphens, and apostrophe+letters as one token
  // Handles both straight (') and curly (') apostrophes using Unicode or alternation
  // Pattern explanation: [a-zA-Z0-9]+ matches word start, (?:-[a-zA-Z0-9]+)* matches hyphenated parts,
  // (?:[\u0027\u2018\u2019]+[a-zA-Z]+)? optionally matches apostrophe(s) followed by letters
  // \u0027 = straight apostrophe, \u2018 = left single quote, \u2019 = right single quote (curly apostrophe)
  const tokenPattern =
    /([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:[\u0027\u2018\u2019]+[a-zA-Z]+)?)|([\s\-/&.,:;!?]+)/g;
  const tokens: Array<{ type: "word" | "separator"; value: string }> = [];
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match[1]) {
      // It's a word (may be hyphenated or have apostrophes)
      tokens.push({ type: "word", value: match[1] });
    } else if (match[2]) {
      // It's a separator
      tokens.push({ type: "separator", value: match[2] });
    }
  }

  // Handle case where no matches (empty or only special chars)
  if (tokens.length === 0 && text.length > 0) {
    tokens.push({ type: "separator", value: text });
  }

  // Check if the entire text matches an exception (strict case-sensitive matching)
  const fullText = tokens.map((t) => t.value).join("");
  if (exceptions.has(fullText)) {
    return fullText;
  }

  // Merge tokens to check for multi-word exceptions (e.g., "R & D")
  // Also handle apostrophe-separated tokens that form exceptions (e.g., "AIL's")
  // Look for patterns: word + separator + word that form an exception
  const mergedTokens: Array<{ type: "word" | "separator"; value: string }> = [];
  let i = 0;

  while (i < tokens.length) {
    // Check if current token + next separator + next word forms an exception
    if (
      i + 2 < tokens.length &&
      tokens[i].type === "word" &&
      tokens[i + 1].type === "separator" &&
      tokens[i + 2].type === "word"
    ) {
      const combined =
        tokens[i].value + tokens[i + 1].value + tokens[i + 2].value;
      if (exceptions.has(combined)) {
        mergedTokens.push({ type: "word", value: combined });
        i += 3;
        continue;
      }
      // Also check if separator contains apostrophe and the combination forms an exception
      // This handles cases where apostrophe might be tokenized as a separator
      // Check for both straight (') and curly apostrophes using Unicode
      const separator = tokens[i + 1].value;
      if (/[\u0027\u2018\u2019]/.test(separator)) {
        // Extract the apostrophe character from the separator
        const apostropheMatch = separator.match(/[\u0027\u2018\u2019]/);
        const apostrophe = apostropheMatch ? apostropheMatch[0] : "'";

        // Check for AIL variations first (case-insensitive)
        const firstWord = tokens[i].value.toUpperCase();
        const secondWord = tokens[i + 2].value.toUpperCase();
        if (firstWord === "AIL" && secondWord === "S") {
          // Preserve the original case and apostrophe style from the separator
          const combinedAIL =
            tokens[i].value + apostrophe + tokens[i + 2].value;
          mergedTokens.push({ type: "word", value: combinedAIL });
          i += 3;
          continue;
        }

        // Try with the apostrophe found in separator
        let combinedWithApostrophe =
          tokens[i].value + apostrophe + tokens[i + 2].value;
        if (exceptions.has(combinedWithApostrophe)) {
          mergedTokens.push({ type: "word", value: combinedWithApostrophe });
          i += 3;
          continue;
        }
        // Try with straight apostrophe for exception matching
        combinedWithApostrophe = tokens[i].value + "'" + tokens[i + 2].value;
        if (exceptions.has(combinedWithApostrophe)) {
          mergedTokens.push({ type: "word", value: combinedWithApostrophe });
          i += 3;
          continue;
        }
        // Also check if it's an AIL variation
        if (
          isAILVariation(combinedWithApostrophe) ||
          isAILVariation(tokens[i].value + apostrophe + tokens[i + 2].value)
        ) {
          mergedTokens.push({
            type: "word",
            value: tokens[i].value + apostrophe + tokens[i + 2].value,
          });
          i += 3;
          continue;
        }
      }
    }
    mergedTokens.push(tokens[i]);
    i++;
  }

  // Process words
  const words = mergedTokens
    .filter((t) => t.type === "word")
    .map((t) => t.value);
  const processedWords = words.map((word) => {
    // Special handling for AIL variations - preserve exactly as written, bypassing all rules
    if (isAILVariation(word)) return word;

    // Check if this word is an exception (including multi-word)
    // Normalize apostrophes for comparison to handle both straight and curly apostrophes
    if (exceptions.has(word) || exceptions.has(normalizeApostrophe(word))) {
      // Return the version from exceptions if it exists, otherwise return original
      if (exceptions.has(word)) return word;
      // Find matching exception with normalized apostrophe
      for (const ex of exceptions) {
        if (normalizeApostrophe(ex) === normalizeApostrophe(word)) {
          return ex; // Return the exception as it appears in the list
        }
      }
      return word;
    }

    return titleCaseHyphenated(word);
  });

  // Reconstruct the string with original separators
  let result = "";
  let wordIndex = 0;

  for (const token of mergedTokens) {
    if (token.type === "word") {
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
