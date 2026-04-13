"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const HIGHLIGHT_CLASS = "search-highlight";
const HIGHLIGHT_BG = "#F36633";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clearHighlights() {
  const marks = document.querySelectorAll(`mark.${HIGHLIGHT_CLASS}`);
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (!parent) return;
    parent.replaceChild(
      document.createTextNode(mark.textContent || ""),
      mark,
    );
    parent.normalize();
  });
}

function applyHighlights(query: string): boolean {
  const words = query.split(/[-\s,]+/).filter((w) => w.length > 1);
  if (words.length === 0) return false;

  const pattern = new RegExp(
    `(${words.map(escapeRegex).join("|")})`,
    "gi",
  );

  const root = document.querySelector("main") || document.body;
  const skipTags = new Set([
    "script", "style", "noscript", "mark",
    "input", "textarea", "select", "svg", "img",
  ]);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (skipTags.has(parent.tagName.toLowerCase()))
        return NodeFilter.FILTER_REJECT;
      if (parent.closest(`.${HIGHLIGHT_CLASS}`))
        return NodeFilter.FILTER_REJECT;
      if (!node.textContent || !pattern.test(node.textContent)) {
        pattern.lastIndex = 0;
        return NodeFilter.FILTER_REJECT;
      }
      pattern.lastIndex = 0;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let current: Node | null;
  while ((current = walker.nextNode())) {
    textNodes.push(current as Text);
  }

  if (textNodes.length === 0) return false;

  textNodes.forEach((textNode) => {
    const text = textNode.textContent || "";
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index)),
        );
      }

      const mark = document.createElement("mark");
      mark.className = HIGHLIGHT_CLASS;
      mark.style.backgroundColor = HIGHLIGHT_BG;
      mark.style.color = "#fff";
      mark.style.borderRadius = "2px";
      mark.textContent = match[0];
      frag.appendChild(mark);

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    textNode.parentNode?.replaceChild(frag, textNode);
  });

  const firstMark = root.querySelector<HTMLElement>(`mark.${HIGHLIGHT_CLASS}`);
  if (firstMark) {
    firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return true;
}

function SearchHighlighterInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const highlight = searchParams.get("highlight");

  useEffect(() => {
    if (!highlight?.trim()) {
      clearHighlights();
      return;
    }

    // Two passes: first catches SSR content, second catches hydrated/lazy content
    const t1 = setTimeout(() => {
      clearHighlights();
      applyHighlights(highlight);
    }, 500);

    const t2 = setTimeout(() => {
      clearHighlights();
      applyHighlights(highlight);
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearHighlights();
    };
  }, [highlight, pathname]);

  return null;
}

export default function SearchHighlighter() {
  return (
    <Suspense fallback={null}>
      <SearchHighlighterInner />
    </Suspense>
  );
}
