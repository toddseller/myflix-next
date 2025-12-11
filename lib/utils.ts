import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z|A-Z\s'-]/g, "")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}