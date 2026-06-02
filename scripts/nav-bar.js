/* Constants */
const ASSET_PATH = "https://cdn.jsdelivr.net/gh/Community-Spotlight/assets/";
const THEME_SELECT = {
  dark: { text: "Dark Mode", img: "dark.svg" },
  light: { text: "Light Mode", img: "light.svg" },
};
const NAV_ITEMS = [
  { page: "home", text: "Community Spotlight", img: "CS-logo.svg" },
  { page: null, text: "theme", img: THEME_SELECT.dark.img }, // this is overridden
  { page: "about", text: "About Us", img: "info.svg" },
  { page: "form", text: "Submit a Promo", img: "upload.svg" },
  { page: "developers", text: "For Developers", img: "eye.svg" },
  { page: "tos", text: "Terms of Service", img: "paper.svg" },
  { page: "team", text: "Our Team", img: "team.svg" },
];

const initThemeButton = function (button) {
  const txtSpan = button.querySelector("span");
  const iconImg = button.querySelector("img");

  txtSpan.textContent = THEME_SELECT.dark.text;
  button.addEventListener("click", (e) => {
    const currentTheme = document.body.getAttribute("data-dark");
    const isDark = currentTheme === "true";

    iconImg.src = ASSET_PATH + THEME_SELECT[isDark ? "light" : "dark"].img;
    txtSpan.textContent = THEME_SELECT[isDark ? "light" : "dark"].text;
    document.body.setAttribute("data-dark", !isDark);
    Events.emit("SET_THEME", !isDark);
    e.stopPropagation();
  });

  Events.once("APPLY_THEME", (isDark) => {
    // we start in dark mode
    if (!isDark) button.click();
  });
};

const initButton = function (button) {
  button.addEventListener("click", (e) => {
    Events.emit("SET_PAGE", button.id);
    e.stopPropagation();
  });
};

const initNavBar = function () {
  const navContainer = document.querySelector(`nav[class="nav-bar"]`);
  const reusableDiv = navContainer.firstElementChild;

  const navItems = [];
  for (const item of NAV_ITEMS) {
    const itemDiv = reusableDiv.cloneNode(true);

    itemDiv.id = item.page ?? item.text;
    itemDiv.querySelector("img").src = ASSET_PATH + item.img;
    itemDiv.querySelector("span").textContent = item.text;
    if (item.text === "theme") initThemeButton(itemDiv);
    else initButton(itemDiv);

    navItems.push(itemDiv);
  }

  navContainer.append(...navItems);
  reusableDiv.remove();
};

export { NAV_ITEMS, initNavBar };
