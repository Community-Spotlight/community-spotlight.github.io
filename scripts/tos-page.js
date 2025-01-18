GUI.tab.acquire((contentBody) => {
  const titles = [
    "test",
    "test2",
  ];
  const sections = {
    test: `<b>Community Spotlight</b> is a <b>non-profit project</b> dedicated to supporting creators, artists, and developers by offering <b>free promotional services.</b>`,
    test2: `<b>Community Spotlight</b> is a <b>non-profit project</b> dedicated to supporting creators, artists, and developers by offering <b>free promotional services.</b>`,
  };

  const makeCapsule = (title) => {
    const capsule = document.createElement("div");
    capsule.classList.add("capsule");
    capsule.innerHTML = `
      <div class="capsule-contain">
        <img class="flipper-img" draggable="false" src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/arrow-right.svg">
        <div class="header">${title}</div>
      </div>
      <div class="text">${sections[title]}</div>
    `;

    const arrow = capsule.querySelector(`img[class="flipper-img"]`);
    const text = capsule.querySelector(`div[class="text"]`);
    arrow.addEventListener("click", (e) => {
      const isOpen = capsule.classList.toggle("open");
      if (isOpen) {
        text.style.height = `${text.scrollHeight}px`;
        text.style.paddingTop = "10px";
        arrow.style.transform = "rotate(90deg)";
      } else {
        text.style.height = "0px";
        text.style.paddingTop = "0px";
        arrow.style.transform = "rotate(0deg)";
      }

      e.stopPropagation();
    });

    return capsule;
  };

  const mainCard = document.createElement("div");
  mainCard.classList.add("card");
  mainCard.innerHTML = `
    <img class="logo-img" draggable="false" src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/CS-logo.svg">
    <div class="holder">
      <div class="title">Terms of Service</div>
    </div>
  `;

  const holder = mainCard.querySelector(`div[class="holder"]`);
  for (let i = 0; i < titles.length; i++) holder.appendChild(makeCapsule(titles[i]));
  contentBody.append(mainCard);
}, `
.content-body {
  margin: 20px;
}

.content-body .logo-img {
  margin-bottom: 5px;
}
.content-body .flipper-img {
  margin: 5px;
  width: 20px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.content-body .title {
  font-size: 1.2em;
  font-family: Tilt Warp;
  margin-bottom: 10px;
  border-bottom: dashed 2px var(--text-colour);
}
.content-body .header {
  font-size: 1.3em;
  font-family: Tilt Warp;
  margin-left: 10px;
}
.content-body .text {
  overflow: hidden;
  transition: height 0.3s ease-in-out, padding 0.3s ease-in-out;
  height: 0px;
}

.content-body .card {
  background: var(--theme-gradient);
  width: auto;
  max-width: 70vw;
  margin: 15px;
  padding: 20px 20px 40px 20px;
  border-radius: 20px;
  position: relative;
}

.content-body .holder {
  background-color: var(--bg-box);
  padding: 10px;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .capsule {
  background-color: var(--bg-box);
  padding: 10px;
  margin: 20px 10px 20px 10px;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .capsule-contain {
  margin-left: 10px;
  display: flex;
  align-items: left;
  justify-content: left;
  justify-items: left;
}
`);
