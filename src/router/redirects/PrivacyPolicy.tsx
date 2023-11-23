import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.location.replace(
      `${process.env.REACT_APP_BASE_API_URL?.replace(
        "/api",
        "/privacy-policy"
      )}`
    );
  }, []);
  return <></>;
};

export default PrivacyPolicy;
