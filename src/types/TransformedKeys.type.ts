type TransformedKeysUtils<T, O extends keyof T> = {
  ar: { [k in O]: T[k] };
  en: { [k in O]: T[k] };
};
export type TransformedKeys<
  T extends Record<string, any>,
  O extends keyof T
> = Omit<T, O> & TransformedKeysUtils<T, O>;
