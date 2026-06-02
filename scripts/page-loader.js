import { importDependancy, importDependancies } from "./dependancy-loader.js";

const CONTAINER = document.querySelector(".content-container");

Events.on("CLEAR_PAGE", () => {
  // reset page content before applying new page
  for (const child of Array.from(CONTAINER.children)) child.remove();
});

/* 404 Page */
Events.on("LOAD_PAGE-404", () => importDependancy("../pages/html/404.html"));

/* Home Page */
Events.on("LOAD_PAGE-home", () => {
  importDependancies(["../pages/html/home.html", "../styles/home.css"]);
});

/* About Us Page */
Events.on("LOAD_PAGE-about", () => {
  importDependancies(["../pages/html/about.html", "../styles/about.css"]);
});

/* Uploader Form Page */
Events.on("LOAD_PAGE-form", () => importDependancy("../pages/html/form.html"));

/* Developer Page */
Events.on("LOAD_PAGE-developers", async () => {
  await importDependancies([
    "../pages/html/developers.html",
    "../styles/developers.css",
    "https://dev.prismjs.com/themes/prism-tomorrow.min.css",
    "https://cdn.jsdelivr.net/gh/Community-Spotlight/promotion-exports/dist/community-spotlight.min.js",
  ]);

  await importDependancy("../pages/scripts/developers.js");
  Events.emit("START_SCRIPT", "developers");
});

/* Terms of Service Page */
Events.on("LOAD_PAGE-tos", async () => {
  await importDependancies(["../pages/html/tos.html", "../styles/tos.css"]);

  await importDependancy("../pages/scripts/tos.js");
  Events.emit("START_SCRIPT", "tos");
});

/* Team List Page */
Events.on("LOAD_PAGE-team", async () => {
  await importDependancies(["../pages/html/team.html", "../styles/team.css"]);

  await importDependancy("../pages/scripts/team.js");
  Events.emit("START_SCRIPT", "team-list");
});
