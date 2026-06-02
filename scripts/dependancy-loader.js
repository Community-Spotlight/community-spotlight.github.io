const CONTENT_CACHE = new Map();
const DEPENDANCIES = new Map();

/**
 * Imports a dependancy for a page such as html, js, or css and applies it to the page.
 *
 * @param {String} url Dependancy URL path
 */
const importDependancy = async function (url) {
  if (DEPENDANCIES.has(url)) return;

  const container = document.querySelector(".content-container");
  const type = url.substring(url.lastIndexOf(".") + 1);

  let source = document.body;
  let element;
  switch (type) {
    case "css": {
      element = document.createElement("link");
      element.href = url;
      element.setAttribute("rel", "stylesheet");
      source = document.head;
      break;
    }
    case "js": {
      element = document.createElement("script");
      element.src = url;
      element.setAttribute("type", "module");
      break;
    }
    case "html": {
      let htmlText;

      if (CONTENT_CACHE.has(url)) {
        htmlText = CONTENT_CACHE.get(url);
      } else {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Couldnt fetch dependancy: " + url);
        }

        htmlText = await response.text();
        CONTENT_CACHE.set(url, htmlText);
      }

      container.insertAdjacentHTML("beforeend", htmlText);
      break;
    }
  }

  if (type !== "html") DEPENDANCIES.set(url, element);
  if (element) {
    await new Promise((resolve, reject) => {
      if (type === "js") {
        element.onload = resolve;
        element.onerror = () => {
          reject(new Error("Failed to load dependancy:" + url));
        };
      }

      source.appendChild(element);
      if (type !== "js") resolve();
    });
  }
};

/**
 * Imports a list of dependancies for a page such as html, js, or css and applies it to the page.
 *
 * @param {Array<String>} url List of dependancy URL paths
 */
const importDependancies = async function (urls) {
  return Promise.all(urls.map((url) => importDependancy(url)));
};

export { importDependancy, importDependancies };
