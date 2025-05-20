import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Handlebars from "handlebars";

Handlebars.registerHelper('ifEquals', function (this: any, arg1: any, arg2: any, options: any) {
  if (arg1 === arg2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
