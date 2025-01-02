GUI.tab.acquire(async (contentBody) => {
  await GUI.imports.BasicCache.cache("users", 604800000, async () => {
    console.log("Caching User List...");
    const res = await fetch("./meta/users.json");
    return await res.json();
  });
  const users = await GUI.imports.BasicCache.get("users");

  const descDiv = document.createElement("div");
  descDiv.classList.add("main-desc");
  descDiv.innerHTML = `
    <div class="holder">
      <div>Meet our Team Members!</div>
      <p>We are the ones working behind the scenes, moderating Promotions, creating new Features, and delivering a free Promotional Service to YOU!</p>
      <p>As volunteers, we dedicate our free time working on this project, we hope you enjoy our work.</p>
    </div>
  `;

  const constructItem = (user, isOwner) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-div");

    const avatar = document.createElement("img");
    avatar.setAttribute("draggable", "false");
    avatar.setAttribute("loading", "lazy");
    avatar.src = user["avatar_url"];
    const name = document.createElement("div");
    name.textContent = user.login;

    const text = document.createElement("b");
    text.textContent = "(CEO)";

    userDiv.append(avatar, name, isOwner ? text : "");
    userDiv.addEventListener("click", (e) => {
      window.open(user["html_url"], "_blank");
      e.stopPropagation();
    });
    avatar.onload = () => {
      avatar.animate([{ opacity: "0" }, { opacity: "1" }], { duration: 400, easing: "ease-in-out" });
      avatar.style.opacity = "1";
    };
    return userDiv;
  };

  const memberList = document.createElement("div");
  memberList.classList.add("member-list");
  const userList = users.users;
  userList.forEach((user) => {
    if (user.login === "SharkPool-SP") memberList.insertBefore(constructItem(user, true), memberList.firstChild);
    else memberList.appendChild(constructItem(user, false));
  });

  contentBody.append(descDiv, memberList);
}, `
.content-body {
  margin: 20px;
}

.content-body .main-desc {
  background: var(--theme-gradient);
  width: auto;
  max-width: 50vw;
  margin: auto;
  padding: 20px 20px 40px 20px;
  border-radius: 20px;
}
.content-body .holder {
  background-color: var(--bg-box);
  padding: 10px;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .holder p {
  margin-bottom: 0px;
}
.content-body .holder div {
  font-size: 1.3em;
  font-family: Tilt Warp;
}

.content-body .member-list {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.content-body .user-div {
  background: var(--theme-gradient);
  width: auto;
  margin: 25px;
  padding: 20px 20px 30px 20px;
  border-radius: 20px;
  transition: transform 300ms ease-in-out, box-shadow 300ms ease-in-out;
  transform: scale(1);
  cursor: pointer;
}
.content-body .user-div:hover {
  transform: scale(1.05);
  box-shadow: #05f5a5 0px 0px 25px;
  text-shadow: #05f5a5 0px 0px 15px;
}
.content-body .user-div img {
  background-color: var(--bg-box);
  width: 10vw;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .user-div div {
  background-color: var(--bg-box);
  margin-top: 5px;
  padding: 10px;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .user-div b {
  font-size: 0.8em;
  background-color: var(--bg-box);
  border: solid grey 2px;
  border-radius: 0 0 6px 6px;
  padding: 0 10px 3px 10px;
  display: inline;
  position: absolute;
  transform: translate(-50%, -2px);
}
`);
