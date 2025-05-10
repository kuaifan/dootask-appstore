import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 阻止关闭
 * @returns {boolean} - 返回true表示阻止关闭，false表示允许关闭
 */
export function beforeClose(): boolean {
  const containers = [...document.querySelectorAll("[role='app-store-close']")].reverse()
  if (containers.length === 0) {
    return false
  }
  (containers[0] as HTMLElement).click()
  return true
}
