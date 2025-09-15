import React, { ReactNode } from "react";
import clsx from "clsx";

interface TextHoverProps {
    children: ReactNode;
    activeHover: boolean;
    staggered?: boolean;
    animateTowardsBottom?: boolean;
    className?: string;
}

export default function TextHover({ children, activeHover, staggered = false, animateTowardsBottom = false, className = "" }: TextHoverProps) {
    const offsetIncrement = 0.01;

    // Convert children to string
    const text = staggered ? (typeof children === "string" ? children : React.Children.toArray(children).join("")) : children;

    return (
        <div className={clsx("btn-animate-chars", [activeHover && (animateTowardsBottom ? 'activeHoverTowardsBottom' : 'activeHover')])}>
            <span data-button-animate-chars={animateTowardsBottom ? "false" : "true"} data-button-animate-chars-bottom={animateTowardsBottom ? "true" : "false"} className={clsx("btn-animate-chars__text", className)}>
                {
                    (typeof text === "string") ?
                        text.split("").map((char: string, index: number) => (
                            <span
                                key={index}
                                style={{
                                    transitionDelay: `${(staggered ? index : 1) * offsetIncrement}s`,
                                    whiteSpace: char === " " ? "pre" : undefined,
                                }}
                            >
                                {char}
                            </span>
                        ))
                        :
                        <span style={{ transitionDelay: `${1 * offsetIncrement}s`, whiteSpace: 'pre' }}>
                            {text}
                        </span>
                }
            </span>
        </div>
    );
}