import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validate = <T extends z.ZodType<any, any>>(
  values: any,
  schema: T
) => {
  try {
    schema.parse(values);
    return {};
  } catch (err) {
    return (err as z.ZodError).formErrors.fieldErrors;
  }
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type MemoizedFunction<T> = <A extends string>(arg: A) => Promise<T>;

export const apiRequestMemoize = <T>(
  fn: <A extends string>(arg: A) => Promise<T>
): MemoizedFunction<T> => {
  const cache: Record<string, Promise<T> | undefined> = {};

  return async <A extends string>(arg: A) => {
    if (cache[arg]) {
      return cache[arg] as Promise<T>;
    }

    const result = await fn(arg);
    cache[arg] = Promise.resolve(result);
    return result;
  };
};
