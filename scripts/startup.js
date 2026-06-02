import { NAV_ITEMS, initNavBar } from "./nav-bar.js";
import {
  USER_DATA,
  getLocalStorage,
  setLocalStorage,
} from "./storage-manager.js";

const VALID_PAGES = Object.values(NAV_ITEMS)
  .map((n) => n.page)
  .filter((p) => Boolean(p));

const sessionData = {};

Events.on("SET_THEME", (theme) => {
  USER_DATA.isDark = theme; // 'true' means dark mode is on. Nothing else so far.
  setLocalStorage();
});

Events.on("SET_PAGE", (pageID) => {
  if (sessionData.page === pageID) return;
  if (VALID_PAGES.indexOf(pageID) === -1) {
    pageID = "404";
  }

  // set URL param to ?page=XYZ
  const url = new URL(window.location.href);
  url.searchParams.set("page", pageID);
  window.history.pushState({}, "", url);

  // apply page change
  USER_DATA.page = pageID;
  sessionData.page = pageID;
  Events.emit("CLEAR_PAGE");
  Events.emit("LOAD_PAGE-" + pageID);
  setLocalStorage();
});

Events.on("DOM_LOADED", () => {
  const url = new URL(window.location.href);

  initNavBar();
  Events.emit(
    "SET_PAGE",
    url.searchParams.get("page") ?? USER_DATA.page ?? "home",
  );
  Events.emit("APPLY_THEME", USER_DATA.isDark);
});

document.addEventListener("DOMContentLoaded", () => {
  getLocalStorage();
  Events.emit("DOM_LOADED");
});
