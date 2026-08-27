"use client";

import { useState } from "react";
import { MAP_BOX_HEIGHT, MAP_PINS, MAP_VIEWBOX } from "./mapPins";

const PIN_PATH =
  "M11 0C6.4515 0 2.75 3.72717 2.75 8.30958C2.75 14.8207 10.2245 21.5435 10.5426 21.8258C10.6737 21.9422 10.8368 22 11 22C11.1632 22 11.3263 21.9423 11.4574 21.8268C11.7755 21.5435 19.25 14.8207 19.25 8.30958C19.25 3.72717 15.5485 0 11 0ZM11 12.8333C8.47275 12.8333 6.41667 10.7773 6.41667 8.25C6.41667 5.72275 8.47275 3.66667 11 3.66667C13.5273 3.66667 15.5833 5.72275 15.5833 8.25C15.5833 10.7773 13.5273 12.8333 11 12.8333Z";

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

export default function ContactMapInteractive() {
  const [active, setActive] = useState(3);

  const activePin = MAP_PINS.find((pin) => pin.id === active) ?? null;

  return (
    /*
     * This box IS the artwork's box, which is what keeps the percentage-positioned
     * pins aligned with the map at every viewport size.
     *
     * The width formula reproduces what preserveAspectRatio="xMidYMid meet"
     * computed: fit the 1262x623 viewBox inside a 100%-wide, MAP_BOX_HEIGHT-tall
     * container, giving min(100%, MAP_BOX_HEIGHT * 1262/623). Height then follows
     * from aspect-ratio.
     *
     * Ordering matters here. `width` must be definite and height derived, not the
     * reverse. `h-full aspect-[r] max-w-full` looks equivalent but is not: with a
     * definite height, max-width clamps the width without shrinking the height, so
     * the box stops matching the artwork ratio and the pins drift. And
     * `aspect-[r] max-h-full max-w-full` supplies no definite size at all, which
     * is what collapsed the map to a small box earlier.
     */
    <div
      className="relative"
      style={{
        width: `min(100%, calc(${MAP_BOX_HEIGHT} * ${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}))`,
        aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}`,
      }}
    >
      <img
        src="/maps/world-map.svg"
        alt=""
        aria-hidden="true"
        width={MAP_VIEWBOX.width}
        height={MAP_VIEWBOX.height}
        loading="lazy"
        decoding="async"
        className="pointer-events-none h-full w-full select-none object-contain"
      />

      {MAP_PINS.map((pin) => (
        <button
          key={pin.id}
          type="button"
          aria-label={pin.label}
          aria-expanded={active === pin.id}
          onMouseEnter={() => setActive(pin.id)}
          onFocus={() => setActive(pin.id)}
          onClick={() => setActive(pin.id)}
          className="absolute -translate-x-1/2 -translate-y-full cursor-pointer outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-orange-200 focus-visible:ring-offset-2"
          style={{
            left: pct(pin.x, MAP_VIEWBOX.width),
            top: pct(pin.y, MAP_VIEWBOX.height),
          }}
        >
          <svg width="32" height="32" viewBox="0 0 22 22" fill="none">
            <path d={PIN_PATH} fill="#F36633" />
          </svg>
        </button>
      ))}

      {activePin && (
        <div
          className="absolute z-10 w-87.5 max-w-[90%]"
          style={{
            left: pct(activePin.cardX, MAP_VIEWBOX.width),
            top: pct(activePin.cardY, MAP_VIEWBOX.height),
          }}
        >
          <div className="relative overflow-visible rounded-[20px] bg-[linear-gradient(135deg,#fa8129_0%,#dc4c03_100%)] p-[20px]">
            <img
              src="/images/home/flower-t.svg"
              alt=""
              aria-hidden="true"
              width={130}
              height={130}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -top-[40px] left-[74.29%] h-[130px] w-[130px] select-none"
            />
            {activePin.offices.map((office, index) => (
              <div
                key={office.title}
                className={index > 0 ? "mt-[24px]" : undefined}
              >
                {office.tag && (
                  <div className="mb-[10px] w-fit rounded-[20px] bg-white px-[12px] py-[3px] font-alte-hans text-[12px] font-normal uppercase text-[#DC4C03]">
                    {office.tag}
                  </div>
                )}
                <div className="mb-[6px] font-alte-hans text-[20px] font-normal text-white">
                  {office.title}
                </div>
                <div className="mb-[6px] font-roboto text-[14px] font-normal text-white">
                  {office.subTitle}
                </div>
                <div className="font-roboto text-[14px] font-normal text-white">
                  {office.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
