GUI.tab.acquire((contentBody) => {
  const texts = [
    `Submit your Promotional Media for free in our Uploader Site! Please follow the instructions and read the Guidelines listed there`,
    `Check on the status of your upload by joining our <a href="https://discord.gg/DzwQf2tJyW" target="_blank">Discord server</a>. It may take a few days for our Team to reach your Promotion.`
  ];

  const openCard = document.createElement("div");
  openCard.classList.add("card");
  openCard.innerHTML = `
    <div class="holder">
      <div class="title">Promotion Uploader Form</div>
      ${texts[0]}<br><br>${texts[1]}
      <br>
      <div class="open-btn">
        <div class="btn-out">
          <div class="btn-in">Go to Uploader Form<div>
        <div>
      </div>
    </div>
  `;
  contentBody.appendChild(openCard);
  openCard.querySelector(`div[class="open-btn"]`).addEventListener("click", (e) => {
    window.open("https://community-spotlight.github.io/uploader-site/", "_blank");
    e.stopPropagation();
  });
}, `
.content-body {
  margin: 20px;
}

.content-body .card {
  background: var(--theme-gradient);
  width: auto;
  max-width: 65vw;
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
.content-body .holder .title {
  font-size: 1.3em;
  font-family: Tilt Warp;
  margin-bottom: 10px;
  border-bottom: dashed 2px var(--text-colour);
}

.content-body .open-btn {
  align-items: center;
  justify-content: center;
  justify-items: center;
  display: grid;
  margin: 15px;
}
.content-body .btn-out {
  background: linear-gradient(135deg, #00ff84, #00c9ff);
  width: min-content;
  padding: 7px;
  border-radius: 15px;
  transition: transform 200ms ease-in-out, box-shadow 300ms ease-in-out;
  transform: scale(1);
  cursor: pointer;
}
.content-body .btn-out:hover {
  transform: scale(1.1);
  box-shadow: #00c9ff 0px 0px 15px;
  color: #00d970;
}
.content-body .btn-in {
  background-color: var(--bg-box);
  padding: 10px;
  border: solid #000 5px;
  border-radius: 10px;
  user-select: none;
  font-size: 1.3em;
  font-family: Tilt Warp;
  white-space: wrap;
  width: min-content;
}
`);
