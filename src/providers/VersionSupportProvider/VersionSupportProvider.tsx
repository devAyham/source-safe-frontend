import Logo from "assets/svgs/logo.svg";
/**
 * @description This provider is to check the version browser is supproted or not
 * for our app, if the browser supported the will continue working else the app will
 * render page says that your browser is not supported please update your browser
 * @description our app browser support versions:
 * - `internet explorer` is `not` supported
 * - `opera` from `74` and up
 * - `chrome` from `88` and up
 * - `firefox` from `78` and up
 * - `edge` from `90` and up
 * - `samsung browser` from `15` and up
 * - `safari` from `15` and up
 */
const VersionSupportProvider = ({ children }: any) => {
  const isBrowserSupported = () => {
    // take the user agent from the navigator
    const ua = navigator.userAgent.toLowerCase();
    // check if the browser woking on internet explorer
    const isIE = ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1;
    // check if the browser woking on opera
    const isOpera = ua.indexOf("opr/") !== -1 || ua.indexOf("opera/") !== -1;
    // check if the browser woking on edge
    const isEdge = ua.indexOf("edg/") !== -1;
    // check if the browser woking on chrome
    const isChrome = ua.indexOf("chrome/") !== -1;
    // check if the browser woking on firefox
    const isFirefox = ua.indexOf("firefox/") !== -1;
    // check if the browser woking on samsung browser
    const isSamsungBrowser = ua.indexOf("samsungbrowser/") !== -1;
    // check if the browser woking on safari or ios safari
    const isSafari =
      ua.indexOf("safari/") !== -1 || ua.indexOf("version/") !== -1;

    if (isIE) {
      return false; // IE is not supported
    } else if (isEdge && parseInt(ua.split("edg/")[1]) < 90) {
      return false; // Edge versions older than 88 are not supported
    } else if (
      isOpera &&
      (parseInt(ua.split("opr/")[1]) || parseInt(ua.split("opera/")[1])) < 74
    ) {
      return false; // Opera versions older than 74 are not supported
    } else if (isChrome && parseInt(ua.split("chrome/")[1]) < 88) {
      return false; // Chrome versions older than 88 are not supported
    } else if (isFirefox && parseInt(ua.split("firefox/")[1]) < 78) {
      return false; // Firefox versions older than 78 are not supported
    } else if (
      isSamsungBrowser &&
      parseInt(ua.split("samsungbrowser/")[1]) < 15
    ) {
      return false; // Samsung Browser versions older than 15 are not supported
    } else if (
      isSafari &&
      (parseInt(ua.split("safari/")[1]) || parseInt(ua.split("version/")[1])) <
        15
    ) {
      return false; // Safari versions older than 15 are not supported
    }

    return true;
  };

  return (
    <>
      {isBrowserSupported() ? (
        children
      ) : (
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            boxSizing: "border-box",
            backgroundColor: "var(--primary_color_1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#f0f1f6",
              borderRadius: "40px",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "70rem",
              height: "40rem",
              margin: "auto",
              boxShadow: "0px 4px 112px 16px rgba(0, 0, 0, 0.4)",
              overflow: "hidden",
            }}
          >
            <div>
              <img
                src={Logo}
                alt=""
                style={{ height: "20vh", margin: "auto", width: "100%" }}
              />
            </div>
            <div style={{ padding: "0 30px" }}>
              <h1>Unsupported Browser</h1>
              <p>
                We're sorry, but your browser is not supported by our app.
                Please upgrade to a newer browser to use our app.
              </p>
              <p>
                You can download the latest version of{" "}
                <a href="https://www.google.com/chrome/">Google Chrome</a>,{" "}
                <a href="https://www.mozilla.org/en-US/firefox/new/">
                  Mozilla Firefox
                </a>
                , or{" "}
                <a href="https://www.microsoft.com/en-us/edge">
                  Microsoft Edge
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VersionSupportProvider;
