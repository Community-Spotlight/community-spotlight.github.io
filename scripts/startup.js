// Storage
let csStorage = localStorage.getItem("CS-Storage");
if (csStorage === null) csStorage = { dark: true };
else csStorage = (() => {
  try {
    return JSON.parse(csStorage);
  } catch {
    console.warn("Storage Error, couldnt parse JSON");
    return { dark: true };
  }
})();

/*
  save csStorage to localStorage (publicly accessible)
*/
function saveStorage() {
  localStorage.setItem("CS-Storage", JSON.stringify(csStorage));
}

// Global Event Emitter
const EventEmitter = (() => {
  const events = {};
  return {
    emit(eName, ...args) {
      if (!events[eName]) events[eName] = [];
      events[eName].forEach(func => func(...args));
    },
    on(eName, func) {
      if (!events[eName]) events[eName] = [];
      events[eName].push(func);
    },
    once(eName, func) {
      const wrapper = (...args) => {
        func(...args);
        this.off(eName, wrapper);
      };
      this.on(eName, wrapper);
    },
    off(eName, func) {
      if (!events[eName]) return;
      events[eName] = events[eName].filter(storedFunc => storedFunc !== func);
    }
  };
})();

// Pre-done Events
EventEmitter.on("mode-switch", (val) => {
  modeBtn.setAttribute("darkMode", val);
  childs[0].src = val === false ? "/site-real/assets/dark.svg" : "/site-real/assets/light.svg";
  childs[1].textContent = val === false ? "Dark Mode" : "Light Mode";
  document.body.style.background = val === false ? "#fff" : "#141414";
});

EventEmitter.on("tab-click", (name) => {
  const createHomeBtn = (copyableBtn) => {
    const oldBtn = document.querySelector(`div[class="nav-btn"][id="home"]`);
    if (oldBtn !== null) oldBtn.remove();
    const homeBtn = copyableBtn.cloneNode(true);
    const childs = homeBtn.children;
    homeBtn.id = "home";
    childs[0].src = "/site-real/assets/home.svg";
    childs[1].textContent = "Back to Home";

    const nav = document.querySelector(`nav[class="nav-bar"]`)
    nav.insertBefore(homeBtn, copyableBtn);
    homeBtn.addEventListener("click", () => {
      setTab("home");
      EventEmitter.emit("tab-click", "home");
      homeBtn.remove();
    });
  };
  const navBtns = document.querySelectorAll(`div[class="nav-btn"]`);
  for (let i = 1; i < navBtns.length; i++) {
    const btn = navBtns[i];
    if (btn.id !== name) btn.style.display = "";
    else if (btn.id !== "home") {
      createHomeBtn(btn);
      btn.style.display = "none";
    }
  }
});

// Tab Loader
const params = new URLSearchParams(window.location.search);
let thisPage = params.get("page");
if (!thisPage) thisPage = "home";
setTab(thisPage);

/*
  remove imported tab and its script
*/
function resetTab() {
  const innerBody = document.querySelector(`div[class="content-body"]`);
  if (innerBody) innerBody.remove();
  const tabScripts = document.querySelectorAll(`script[id="page-loader"]`);
  for (let i = 0; i < tabScripts.length; i++) tabScripts[i].remove();
}

/*
  set the tab by name and import its scripts
  defaults to the home page
*/
function setTab(name) {
  resetTab();
  thisPage = (() => {
    // in case we add more pages
    switch (name) {
      case "about": return "about";
      case "sumbit": return "sumbit";
      case "exports": return "exports";
      case "tos": return "tos";
      case "team": return "team";
      default:
        // home page
        return "home";
    }
  })();
  params.set("page", thisPage);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);

  const script = document.createElement("script");
  script.id = "page-loader";
  script.src = `/site-real/scripts/${thisPage}-page.js`;
  document.body.appendChild(script);
}

// Buttons
// light/dark mode
const modeBtn = document.querySelector(`div[id="mode-switch"]`);
const childs = modeBtn.children;
modeBtn.setAttribute("darkMode", csStorage.dark);
modeBtn.addEventListener("click", () => {
  const val = !(modeBtn.getAttribute("darkMode") === "true");
  csStorage.dark = val;
  EventEmitter.emit("mode-switch", val);
  saveStorage();
});
if (csStorage.dark === false) EventEmitter.emit("mode-switch", csStorage.dark);

// other buttons
const navBtns = document.querySelectorAll(`div[class="nav-btn"]`);
for (let i = 1; i < navBtns.length; i++) {
  const btn = navBtns[i];
  btn.addEventListener("click", () => {
    setTab(btn.id || "home");
    EventEmitter.emit("tab-click", thisPage);
  });
}
