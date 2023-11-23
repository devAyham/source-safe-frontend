import { useCookies } from "react-cookie";

interface Props {
  dataEncrypted: string;
  rememberMe: boolean;
}
function useHandleUserCredantilesInStorge() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const cookie = localStorage.getItem("cookies");

  const setUserCredantilesInStorge = ({ dataEncrypted, rememberMe }: Props) => {
    sessionStorage.setItem("user", dataEncrypted);
    if (rememberMe) {
      if (cookie === "allowed") {
        setCookie("user", dataEncrypted, {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24 * 30, // a month,
        });
      } else {
        localStorage.setItem("user", dataEncrypted);
      }
    }
  };

  const removeUserCredantilesInStorge = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    if (cookies.user) {
      removeCookie("user", { path: "/" });
    }
  };

  return { setUserCredantilesInStorge, removeUserCredantilesInStorge };
}

export default useHandleUserCredantilesInStorge;
