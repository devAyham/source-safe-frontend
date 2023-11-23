import { useEffect } from "react";

const DeleteAccount = () => {
  useEffect(() => {
    window.location.replace(
      `${process.env.REACT_APP_BASE_API_URL?.replace("/api", "/auth/delete-account")}`
    );
  }, []);
  return <></>;
};

export default DeleteAccount;
