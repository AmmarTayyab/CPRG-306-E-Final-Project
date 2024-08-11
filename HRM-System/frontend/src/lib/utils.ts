import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const trimList = (data: any[] = []) => {
  return data.map(({ id, name }) => ({
    id,
    name,
  }));
};
