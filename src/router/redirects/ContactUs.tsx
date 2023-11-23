import {useEffect} from "react";

const ContactUs = () => {
  useEffect(() => {
    window.location.replace(`${process.env.REACT_APP_BASE_API_URL?.replace("/api", "/contact-us")}`);
  }, []);
  return <></>;
};

export default ContactUs;
