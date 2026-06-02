import {
  USER_DATA,
  getLocalStorage,
  setLocalStorage,
} from "../../scripts/storage-manager.js";

const USER_CACHE_EXPIRE = 7 * 24 * 60 * 60 * 1000; // 1 week
const OWNER_NAME = "SharkPool-SP";

const fetchTeamList = async function () {
  const cached = USER_DATA.userList;
  if (cached !== undefined) {
    if (Date.now() < cached.expires) return cached.list;
  }

  const response = await fetch("../../meta/users.json");
  if (!response.ok) {
    console.warn("Couldnt Fetch Team Member List!");
    return {};
  }

  const list = await response.json();

  // Clean the list of extra information.
  const userList = [];
  for (const user of list.users) {
    userList.push({
      name: user.login,
      url: user.html_url,
      pfp: user.avatar_url,
    });
  }

  USER_DATA.userList = {
    expires: Date.now() + USER_CACHE_EXPIRE,
    list: userList,
  };
  setLocalStorage();

  return userList;
};

const initTeamGUI = function (list) {
  const container = document.querySelector(".team .team-list");
  const reusableCard = container.firstElementChild;
  reusableCard.style.display = "none";

  const teamMembers = [];
  for (let i = 0; i < list.length; i++) {
    const { name, url, pfp } = list[i];

    const card = reusableCard.cloneNode(true);
    card.title = name;
    card.querySelector(".title").textContent = name;
    card.querySelector(".icon").src = pfp;
    card.addEventListener("click", (e) => {
      window.open(url, "_blank");
      e.stopPropagation();
    });

    card.style.display = "";
    card.style.animationDelay = `${i * 50}ms`;
    if (name === OWNER_NAME) {
      // Owner goes first
      teamMembers.unshift(card);
    } else {
      card.querySelector(".holder.sub-title").remove();
      teamMembers.push(card);
    }
  }

  reusableCard.remove();
  container.append(...teamMembers);
};

Events.on("START_SCRIPT", async (id) => {
  if (id === "team-list") {
    const list = await fetchTeamList();
    initTeamGUI(list);
  }
});
