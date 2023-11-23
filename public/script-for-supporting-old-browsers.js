function isBrowserSupported() {
    const ua = navigator.userAgent.toLowerCase();
    const isIE = ua.indexOf("msie") !== -1 || ua.indexOf("trident") !== -1;
    const isOpera =
      ua.indexOf("opr/") !== -1 || ua.indexOf("opera/") !== -1;
    const isEdge = ua.indexOf("edg/") !== -1;
    const isChrome = ua.indexOf("chrome/") !== -1;
    const isFirefox = ua.indexOf("firefox/") !== -1;
    const isSamsungBrowser = ua.indexOf("samsungbrowser/") !== -1;
    const isSafari =
      ua.indexOf("safari/") !== -1 || ua.indexOf("version/") !== -1;
    if (isIE) {
      return false; // IE is not supported
    } else if (isEdge && parseInt(ua.split("edg/")[1]) < 90) {
      return false; // Edge versions older than 88 are not supported
    } else if (
      isOpera &&
      (parseInt(ua.split("opr/")[1]) || parseInt(ua.split("opera/")[1])) <
        74
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
      (parseInt(ua.split("safari/")[1]) ||
        parseInt(ua.split("version/")[1])) < 15
    ) {
      return false; // Safari versions older than 15 are not supported
    }
    return true;
  }
  if ( isBrowserSupported()) {
    var script = document.createElement("script");
    script.defer = true;
    script.src = "/static/js/main.70cf4cde.js";
    document.body.appendChild(script);
  } else {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.position = "relative";
    container.style.flexDirection = "row-reverse";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.overflow = "hidden";
    container.style.boxSizing = "border-box";
    container.style.backgroundColor = "#7a87fb";

    const innerContainer = document.createElement("div");
    innerContainer.style.backgroundColor = "#f0f1f6";
    innerContainer.style.borderRadius = "40px";
    innerContainer.style.flexDirection = "column";
    innerContainer.style.display = "flex";
    innerContainer.style.justifyContent = "center";
    innerContainer.style.alignItems = "center";
    innerContainer.style.width = "70rem";
    innerContainer.style.height = "40rem";
    innerContainer.style.margin = "auto";
    innerContainer.style.boxShadow =
      "0px 4px 112px 16px rgba(0, 0, 0, 0.4)";
    innerContainer.style.overflow = "hidden";

    const logo = document.createElement("img");
    logo.src = "/logo.png";
    logo.alt = "";
    logo.style.height = "20vh";
    // logo.style.margin = "auto";
    logo.style.width = "100%";

    const heading = document.createElement("h1");
    heading.textContent = "Unsupported Browser";

    const paragraph1 = document.createElement("p");
    paragraph1.textContent =
      "We're sorry, but your browser is not supported by our app. Please upgrade to a newer browser to use our app.";
    paragraph1.style.padding = " 0 10px";
    const paragraph2 = document.createElement("p");
    paragraph2.innerHTML = `You can download the latest version of <a href="https://www.google.com/chrome/">Google Chrome</a>, <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>, or <a href="https://www.microsoft.com/en-us/edge">Microsoft Edge</a>.`;
    paragraph2.style.padding = " 0 10px";

    innerContainer.appendChild(logo);
    innerContainer.appendChild(heading);
    innerContainer.appendChild(paragraph1);
    innerContainer.appendChild(paragraph2);

    container.appendChild(innerContainer);

    document.body.appendChild(container);
  }