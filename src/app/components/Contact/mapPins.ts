export interface OfficeCard {
  tag?: string;
  title: string;
  subTitle: string;
  description: string;
}

export interface MapPin {
  id: number;
  /** Anchor point in map viewBox units. The pin's tip sits exactly here. */
  x: number;
  y: number;
  label: string;
  /** Card top-left corner in map viewBox units. */
  cardX: number;
  cardY: number;
  offices: OfficeCard[];
}

/** Must match the viewBox of public/maps/world-map.svg. */
export const MAP_VIEWBOX = { width: 1262, height: 623 };

/**
 * Height of the box the map is fitted into on desktop.
 *
 * Single source of truth: ContactMap sizes its container with this, and
 * ContactMapInteractive derives the artwork width from it. The previous
 * implementation was an inline <svg width="100%" height="100%"> inside an 80vh
 * box with preserveAspectRatio="xMidYMid meet", so the artwork rendered at
 * min(100%, 80vh * 1262/623). Keeping this value here preserves that width
 * exactly and stops the two files drifting apart.
 */
export const MAP_BOX_HEIGHT = "80vh";

/**
 * Coordinates carried over from the previous inline-SVG implementation, where
 * each pin was a nested <svg x= y= width="32" height="32">. That places the
 * pin's top-left at (x, y), so its tip - the point that should sit on the city -
 * is at (x + 16, y + 32). The values below are those tip positions, and the
 * markup anchors each button by its bottom-centre to reproduce the original
 * placement exactly.
 *
 *   USA     304,238 -> 320,270
 *   Europe  576,177 -> 592,209
 *   Dubai   770,297 -> 786,329
 *   India   845,325 -> 861,357
 */
export const MAP_PINS: MapPin[] = [
  {
    id: 0,
    x: 320,
    y: 270,
    label: "USA office",
    cardX: 5,
    cardY: 90,
    offices: [
      {
        title: "USA",
        subTitle: "Aarti Chem Trade USA Inc.",
        description:
          "16192 Coastal Highway, Lewes, Delaware, 19958, County of Sussex",
      },
    ],
  },
  {
    id: 1,
    x: 592,
    y: 209,
    label: "Europe office",
    cardX: 400,
    cardY: 46,
    offices: [
      {
        title: "Europe",
        subTitle: "Alchemie Europe Ltd.",
        description: "15a St. Marys  Place , Bury, Lancs., BL9 0DZ, UK",
      },
    ],
  },
  {
    id: 2,
    x: 786,
    y: 329,
    label: "Dubai office",
    cardX: 760,
    cardY: 128,
    offices: [
      {
        title: "Dubai",
        subTitle: "Aarti Chemical Trading - FZCO",
        description:
          "Unit Number: C-10, Floor: L2, Building: Techno Hub 1 Building, DSO-IFZA, IFZA Properties, Dubai Silicon Oasis, Dubai",
      },
    ],
  },
  {
    id: 3,
    x: 861,
    y: 357,
    label: "India offices",
    cardX: 880,
    cardY: 200,
    offices: [
      {
        title: "Vapi",
        subTitle: "Aarti Industries Limited",
        description:
          "Plot No.-801/23, G.I.D.C Estate, Phase III, Vapi-396 195, Dist.-Valsad, Gujarat, India",
      },
      {
        title: "Mumbai",
        subTitle: "Aarti Industries Limited",
        description:
          "Tower C, 4th Floor, 247 Embassy Park, LBS Marg, Vikhroli (W), Mumbai - 400083",
      },
    ],
  },
];
