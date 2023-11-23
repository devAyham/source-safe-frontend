import { SetStateAction } from "react";
import { Dispatch, useEffect, useState } from "react";
/**
 * @description a hook that used to make a delay on the set search state to give the user more powerfull ux
 *  @returns [
 *      string | undefined,
 *      Dispatch<SetStateAction<string | undefined>>
 *           ]
 */
export function useSearchDelay(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
] {
  const [searchContent, setSearch] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchTerm);
    }, 1250);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  return [searchContent, setSearchTerm];
}
