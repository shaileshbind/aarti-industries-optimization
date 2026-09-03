/**
 * CMS rich text arrives as raw HTML. Blog bodies shipped 690KB PNGs straight
 * from the CDN with no loading hint, and <video> tags that pulled the whole
 * file on page load. Route CDN raster images through the Next image optimizer
 * (AVIF/WebP, sized for the article column) and add the attributes the editor
 * cannot; leave everything else untouched.
 */
const CDN_RASTER = /^https?:\/\/[^/]*cloudfront\.net\/.+\.(png|jpe?g|webp)$/i;
const optimized = (url: string, w: number) =>
  `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;

export function lazyMedia(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<img\b[^>]*>/gi, (tag) => {
      const src = tag.match(/\ssrc="([^"]+)"/i)?.[1];
      let out = tag;
      if (src && CDN_RASTER.test(src)) {
        // Drop the CMS srcset (it only offers other PNGs) and let the optimizer serve the sizes.
        out = out
          .replace(/\ssrcset="[^"]*"/i, "")
          .replace(/\ssizes="[^"]*"/i, "")
          .replace(
            /\ssrc="[^"]+"/i,
            ` src="${optimized(src, 1080)}" srcset="${optimized(src, 750)} 750w, ${optimized(src, 1080)} 1080w" sizes="(max-width: 767px) 92vw, 872px"`,
          );
      }
      if (!/\sloading=/i.test(out)) {
        out = out.replace(/^<img\b/i, '<img loading="lazy" decoding="async"');
      }
      return out;
    })
    .replace(/<video\b(?![^>]*\bpreload=)/gi, '<video preload="metadata"');
}
