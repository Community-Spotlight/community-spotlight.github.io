GUI.tab.acquire(async (contentBody) => {
  // load the Prism Library if not already loaded
  const PrismExists = document.querySelector(`script[class="Prism"]`);
  if (!PrismExists) {
    const PrismScript = document.createElement("script");
    PrismScript.src = "./scripts/libraries/Prism.js";
    document.body.appendChild(PrismScript);

    const PrismCSS = document.createElement("link");
    PrismCSS.setAttribute("href", "./scripts/libraries/Prism.css");
    PrismCSS.setAttribute("rel", "stylesheet");
    PrismCSS.setAttribute("type", "text/css")
    document.head.appendChild(PrismCSS);
  }

  /*const descDiv = document.createElement("div");
  descDiv.classList.add("main-desc");
  descDiv.innerHTML = `
    <div class="holder">
      <div>Meet our Team Members!</div>
      <p>We are the ones working behind the scenes, moderating Promotions, creating new Features, and delivering a free Promotional Service to YOU!</p>
    </div>
  `;

  contentBody.append(descDiv);*/
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
  white-space:nowrap;
  background-color: var(--bg-box);
  margin-top: 5px;
  padding: 10px;
  border: solid grey 2px;
  border-radius: 10px;
}
.content-body .user-div b {
  white-space:nowrap;
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
