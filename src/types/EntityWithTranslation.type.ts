type TranslationType<T, O extends Partial<keyof T>> = {
  translations?: {
    ar: {
      [key in keyof Omit<T, O>]: string;
    };
    en: {
      [key in keyof Omit<T, O>]: string;
    };
  };
};

export type EntityWithTranslation<T, O extends Partial<keyof T>> = T &
  TranslationType<T, O>;
