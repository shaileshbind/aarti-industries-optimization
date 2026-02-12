/**
 * One-time script: extracts static SVG from DesktopMapSvg.tsx and StateMapSvg.tsx
 * into public/maps/*.svg so the path data is not in the JS bundle.
 * Run: node scripts/extract-map-svgs.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DESKTOP_SRC = path.join(ROOT, "src/app/components/global-reach/DesktopMapSvg.tsx");
const STATE_SRC = path.join(ROOT, "src/app/components/global-reach/StateMapSvg.tsx");
const OUT_DIR = path.join(ROOT, "public/maps");

function extractDesktopMapSvg() {
  let content = fs.readFileSync(DESKTOP_SRC, "utf8");
  const svgStart = content.indexOf("<svg");
  const svgEnd = content.lastIndexOf("</svg>") + 6;
  let svg = content.slice(svgStart, svgEnd);

  // Replace React fill props with default static fill
  const fillProps = [
    "fillRestOfWorld", "fillIndia", "fillMiddleEast", "fillRestOfAsia",
    "fillEurope", "fillNorthAmerica"
  ];
  fillProps.forEach((prop) => {
    svg = svg.replace(new RegExp(`fill=\\{${prop}\\}`, "g"), 'fill="#E7EBED"');
  });

  // Replace style={{ transition: ... }} with static style
  svg = svg.replace(/\s*style=\{\{[^}]+\}\}/g, ' style="transition: fill 1s cubic-bezier(0.4, 0, 0.2, 1)"');

  // Replace onMouseEnter with data-hover for runtime binding
  const hoverMap = [
    ["hoverNorthAmerica", "northAmerica"],
    ["hoverRestWorld", "restOfWorld"],
    ["hoverEurope", "europe"],
    ["hoverMiddleE", "middleEast"],
    ["hoverIndia", "india"],
    ["hoverAsia", "restOfAsia"],
  ];
  hoverMap.forEach(([hover, id]) => {
    svg = svg.replace(new RegExp(`onMouseEnter=\\{${hover}\\}`, "g"), `data-hover="${id}"`);
  });

  // Remove className="hover:cursor-pointer" (we'll add cursor in CSS or keep in wrapper)
  svg = svg.replace(/\s*className="hover:cursor-pointer"/g, ' class="map-hover"');

  // Remove MapBlip components (everything from <MapBlip to />)
  svg = svg.replace(/<MapBlip[\s\S]*?\/>/g, "");

  // Remove JSX comments
  svg = svg.replace(/\s*\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");

  fs.writeFileSync(path.join(OUT_DIR, "desktop-map.svg"), svg, "utf8");
  console.log("Wrote public/maps/desktop-map.svg");
}

function extractStateMapSvg() {
  let content = fs.readFileSync(STATE_SRC, "utf8");
  const svgStart = content.indexOf("<svg");
  const svgEnd = content.lastIndexOf("</svg>") + 6;
  let svg = content.slice(svgStart, svgEnd);

  // Add data-region to the 6 interactive groups (order: Bhachau, Dahej, Jhagadia, Tarapur, Navi Mumbai, Vapi)
  const regions = ["bhachau", "dahej", "jhagadia", "tarapur", "navi-mumbai", "vapi"];
  const hoverNames = ["hoverBachau", "hoverDahej", "hoverJhagadia", "hoverTarapur", "hoverNaviM", "hoverVapi"];
  regions.forEach((region, i) => {
    const name = hoverNames[i];
    const re = new RegExp("(<g\\s*)onMouseEnter=\\{" + name + "\\}", "g");
    svg = svg.replace(re, "$1data-region=\"" + region + "\" ");
  });

  // Remove any remaining onMouseEnter (if any other pattern)
  svg = svg.replace(/\s*onMouseEnter=\{[^}]+\}/g, "");

  // Replace JSX width/height with static values for standalone SVG
  svg = svg.replace(/width=\{width\}/, 'width="100%"');
  svg = svg.replace(/height=\{height\}/, 'height="100%"');

  // Remove JSX comments
  svg = svg.replace(/\s*\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");

  fs.writeFileSync(path.join(OUT_DIR, "state-map.svg"), svg, "utf8");
  console.log("Wrote public/maps/state-map.svg");
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
extractDesktopMapSvg();
extractStateMapSvg();
