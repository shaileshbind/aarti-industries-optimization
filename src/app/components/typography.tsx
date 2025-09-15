import React from "react";

type Variant =
    | "h1"
    | "h1-italic"
    | "h2-l"
    | "h2-l-italic"
    | "h2-m"
    | "h2-s"
    | "h3"
    | "body"
    | "body-xl"
    | "body-l"
    | "body-m"
    | "body-s"
    | "button-m"
    | "button-s"
    | "nav"
    | "stat-number"
    | "stat-label";

type TypographyProps = React.HTMLAttributes<HTMLElement> & {
    variant: Variant;
    children?: React.ReactNode;
    className?: string;
};

const styles: Record<string, string> = {
    // Headings
    "h1": "h1 text-h1",
    "h1-italic": "h1-italic text-h1-italic",
    "h2-l": "h2-l text-h2-l",
    "h2-l-italic": "h2-l-italic text-h2-l-italic",
    "h2-m": "h2-m text-h2-m",
    "h2-s": "h2-s text-h2-s",
    "h3": "h3 text-h3",

    // Body text
    "body": "body text-body-xl",
    "body-xl": "body-xl text-body-xl",
    "body-l": "body-l text-body-l",
    "body-m": "body-m text-body-m",
    "body-s": "body-s text-body-s",

    // UI Elements
    "button-m": "button-m text-button-m",
    "button-s": "button-s text-button-s",
    "nav": "nav text-nav-item",

    // Stat
    "stat-number": "stat-number text-stat-number",
    "stat-label": "stat-label text-stat-label",
};

export default function Typography({
    variant,
    className = "",
    children,
    ...props
}: TypographyProps) {
    let Tag: keyof React.HTMLAttributes<HTMLElement> | "h1" | "h2" | "h3" | "p" | "span";

    if (variant.startsWith("body") || variant === "nav") {
        Tag = "p";
    } else if (variant.startsWith("h")) {
        Tag = variant.split("-")[0] as "h1" | "h2" | "h3";
    } else {
        Tag = "span";
    }

    return (
        <Tag className={`${styles[variant]} ${className}`} {...props}>
            {children}
        </Tag>
    );
}
