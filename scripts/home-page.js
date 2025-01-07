GUI.tab.acquire((contentBody) => {
  const header = document.createElement("h1")
  header.innerHTML = `<span class="themeText">Free</span> Promotional Media for <span class="themeText">Everyone</span>`
  header.className = "header"

  contentBody.append( header, GUI.makeBreak());
}, `
h1 {
  font-family: Tilt Warp, arial;
  font-weight: 300;
  font-size: 130px;
  color: white;
}
.themeText {
  -webkit-text-stroke-color: var(--theme-green);
  -webkit-text-stroke-width: thin;
  color: transparent;
}
.header {
  text-shadow: -0.1px 5.8px 6.5px hsl(151deg 100% 24% / 0.34);
  background-image: url('https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/stacked-waves-haikei.svg');
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: fit-content;
  margin: 0;
  padding: 100px;
  overflow-x: hidden;
}
`);
