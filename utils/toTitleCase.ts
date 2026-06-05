/**
 * Converts a string to Title Case while preserving exceptions and special formatting.
 *
 * Rules:
 * • Preserved as-is:  RBI, SEBI, AIL, CDMO, API, R&D, R & D, AIL's
 * • Apostrophe words: kept exactly (AIL's, don't, it's)
 * • Small words (lowercase unless first): a, an, the, and, but, or, nor, for, so, yet,
 *                                         as, at, by, in, of, on, per, to, up, via, vs
 * • Hyphenated words: capitalize each part (small words stay lowercase)
 * • Never changed:    URLs, emails, @handles, ALL-CAPS (≥2 letters), code patterns (X1, Q4)
 * • Separators kept exactly as-is (spaces, hyphens, slashes, punctuation)
 *
 * Token pattern — word chars = anything EXCEPT separators: \s - / & . , : ; ! ?
 * Allowed inside tokens: a-z A-Z 0-9 · Unicode letters/scripts · accented chars ·
 *                        symbols (% $ # @ ^ * + = | ~ `) · brackets · emoji
 *
 * @param text - Input string to convert
 * @returns Title-cased string
 */
export function toTitleCase(text: string): string {
  // Handle non-string inputs or empty values
  if (text == null || typeof text !== "string") {
    return text == null ? "" : String(text);
  }
  if (text.trim().length === 0) return text;

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

  // Small words that stay lowercase unless they're the first word
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

  const urlPattern = /^(https?:\/\/|www\.|mailto:)/i;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handlePattern = /^@[\w]+$/;
  const allCapsPattern = /^[A-Z0-9]{2,}$/;                  // e.g. CEO, USA
  const codeLikePattern = /^[A-Z0-9]+([-._][A-Z0-9]+)*$/;  // e.g. X1, AB-12, Q4

  /** Normalizes straight + curly apostrophes to ' for consistent comparison. */
  function normalizeApostrophe(str: string): string {
    return str.replace(/[\u0027\u2018\u2019]/g, "'");
  }

  /** Returns true for AIL, AILs, AIL's, AIL'S, etc. (case-insensitive). */
  function isAILVariation(token: string): boolean {
    if (!token) return false;
    const withoutApostrophe = token.replace(/[\u0027\u2018\u2019]/g, "").toUpperCase();
    return withoutApostrophe === "AIL" || withoutApostrophe === "AILS";
  }

  /** Returns true if the token should be kept exactly as written. */
  function shouldPreserve(token: string): boolean {
    if (!token || token.trim().length === 0) return false;

    if (isAILVariation(token)) return true;

    // Check exception list (case-sensitive, with apostrophe normalization)
    if (exceptions.has(token)) return true;
    const normalized = normalizeApostrophe(token);
    if (exceptions.has(normalized)) {
      for (const ex of exceptions) {
        if (normalizeApostrophe(ex) === normalized) return true;
      }
    }

    if (/[\u0027\u2018\u2019]/.test(token)) return true; // any apostrophe word
    if (allCapsPattern.test(token)) return true;
    if (codeLikePattern.test(token) && (/\d/.test(token) || /^[A-Z0-9]+$/.test(token))) return true;
    if (urlPattern.test(token) || emailPattern.test(token) || handlePattern.test(token)) return true;

    return false;
  }

  /**
   * Title-cases a single (non-hyphenated) word.
   * @param isFirstWord - Capitalizes even if it's a small word.
   */
  function titleCaseWord(word: string, isFirstWord = false): string {
    if (!word) return word;
    if (isAILVariation(word)) return word;
    if (shouldPreserve(word)) return word;

    const lower = word.toLowerCase();
    if (smallWords.has(lower)) {
      return isFirstWord ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  /**
   * Title-cases a hyphenated word, capitalizing each part individually.
   * @param isFirstWord - Passed through to the first part.
   */
  function titleCaseHyphenated(word: string, isFirstWord = false): string {
    if (!word.includes("-")) return titleCaseWord(word, isFirstWord);

    return word
      .split("-")
      .map((part, index) => {
        if (shouldPreserve(part)) return part;
        const lower = part.toLowerCase();
        if (smallWords.has(lower)) {
          return isFirstWord && index === 0
            ? lower.charAt(0).toUpperCase() + lower.slice(1)
            : lower;
        }
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join("-");
  }

  // ---------------------------------------------------------------------------
  // Tokenizer — splits text into word tokens and separator tokens.
  //
  // Word chars: anything EXCEPT the separator set (\s - / & . , : ; ! ?)
  // This allows all Unicode letters, digits, accented chars, symbols, emoji, etc.
  // Apostrophes ('' ') are separators by default but are captured as part of a
  // word token when immediately followed by more word chars (possessives).
  // ---------------------------------------------------------------------------
  const tokenPattern =
    /([^\s\-/&.,:;!?]+(?:-[^\s\-/&.,:;!?]+)*(?:[\u0027\u2018\u2019]+[^\s\-/&.,:;!?]+)?)|([\s\-/&.,:;!?]+)/g;

  const tokens: Array<{ type: "word" | "separator"; value: string }> = [];
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match[1]) {
      tokens.push({ type: "word", value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: "separator", value: match[2] });
    }
  }

  // Fallback: if nothing matched, treat the whole string as a separator
  if (tokens.length === 0 && text.length > 0) {
    tokens.push({ type: "separator", value: text });
  }

  // Short-circuit: entire text is a known exception
  if (exceptions.has(tokens.map((t) => t.value).join(""))) {
    return tokens.map((t) => t.value).join("");
  }

  // -------------------------------------------------------------------------
  // Merge adjacent tokens that together form a multi-word exception (e.g. "R & D")
  // or an apostrophe-split exception/AIL variation (e.g. "AIL" + "'" + "s").
  // -------------------------------------------------------------------------
  const mergedTokens: Array<{ type: "word" | "separator"; value: string }> = [];
  let i = 0;

  while (i < tokens.length) {
    // Look-ahead: word + separator + word
    if (
      i + 2 < tokens.length &&
      tokens[i].type === "word" &&
      tokens[i + 1].type === "separator" &&
      tokens[i + 2].type === "word"
    ) {
      const combined = tokens[i].value + tokens[i + 1].value + tokens[i + 2].value;

      if (exceptions.has(combined)) {
        mergedTokens.push({ type: "word", value: combined });
        i += 3;
        continue;
      }

      // Handle apostrophe that got tokenized as a separator
      const sep = tokens[i + 1].value;
      if (/[\u0027\u2018\u2019]/.test(sep)) {
        const apostrophe = (sep.match(/[\u0027\u2018\u2019]/) ?? ["'"])[0];

        // AIL + ' + s  →  preserve original casing
        if (tokens[i].value.toUpperCase() === "AIL" && tokens[i + 2].value.toUpperCase() === "S") {
          mergedTokens.push({ type: "word", value: tokens[i].value + apostrophe + tokens[i + 2].value });
          i += 3;
          continue;
        }

        // Check exceptions with original or straight apostrophe
        for (const candidate of [
          tokens[i].value + apostrophe + tokens[i + 2].value,
          tokens[i].value + "'" + tokens[i + 2].value,
        ]) {
          if (exceptions.has(candidate) || isAILVariation(candidate)) {
            mergedTokens.push({ type: "word", value: tokens[i].value + apostrophe + tokens[i + 2].value });
            i += 3;
            break;
          }
        }
        if (i !== tokens.indexOf(tokens[i])) continue; // already advanced
      }
    }

    mergedTokens.push(tokens[i]);
    i++;
  }

  // Process each word token
  const words = mergedTokens.filter((t) => t.type === "word").map((t) => t.value);
  const processedWords = words.map((word, index) => {
    if (isAILVariation(word)) return word;

    // Return exception exactly as stored (normalize apostrophe for lookup)
    if (exceptions.has(word) || exceptions.has(normalizeApostrophe(word))) {
      if (exceptions.has(word)) return word;
      for (const ex of exceptions) {
        if (normalizeApostrophe(ex) === normalizeApostrophe(word)) return ex;
      }
      return word;
    }

    return titleCaseHyphenated(word, index === 0);
  });

  // Reconstruct, splicing processed words back between separators
  let result = "";
  let wordIndex = 0;
  for (const token of mergedTokens) {
    result += token.type === "word" ? processedWords[wordIndex++] : token.value;
  }
  return result;
}

/**
 * React hook wrapper around toTitleCase.
 *
 * @param text - Input string to convert
 * @returns Title-cased string
 */
export function useTitleCase(text: string): string {
  return toTitleCase(text);
}