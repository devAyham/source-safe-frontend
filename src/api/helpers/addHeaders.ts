// import Cookies from 'js-cookie';

import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import i18n from "i18next";

interface HeaderProps {
  token: string;
}

export const addHeaders = ({
  token,
}: HeaderProps): RawAxiosRequestHeaders | AxiosHeaders => {
  const language = i18n.language;

  return {
    Authorization: `Bearer ${token}`,
    "Accept-Language": language,
    "current-page": window.location.href,
  };
};
