import { twMerge } from "tailwind-merge";
import {clsx, ClassValue} from "clsx";

export default function clsxN(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}