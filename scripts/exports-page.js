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

  const texts = {
    main1: `Looking to show our Promotions in Your Project?`,
    main2: `Use our Developer Exports! In this page, we'll document and direct you on how to use the Community Spotlight Promotion Exports.`,
    download1: `First, download the most recent version of our Exports:`,
    download2: `Or, check out our <b>GitHub Repository:</b>`,

    setup: `You have the freedom to promote any work of yours, including games, songs, websites, and more.`,
    advert3: `To upload your Promotions, check out our Uploader Form by clicking the "Submit a Promo" Button above. You'll find our Guidelines and other rules there.`,
    devs1: `Community Spotlight allows you to display Promotions for <b>free</b> with no required Sign-Ups or API keys!`,
    devs2: `Since we are a <b>non-profit</b>, you will <b>not</b> be making any financial profit. You are simply helping other people promote their work.`,
    devs3: `To display Promotions in your project, check out our Developer Exports by clicking the "For Developers" Button above.`,
    contact1: `Connect with the Community Spotlight Team through our Discord!`,
    contact2: `Join us to stay updated with announcements, get assistance, and engage with other promoters in the community! It's the perfect place to ask questions, share ideas, and collaborate.`,
  };
  const code = {
    // excuse the formatting
    // it needs to be like this to not look bad in the site
    setup:
`
// comment test
refreshPromos()
`,
    
  };

  const mainCard = document.createElement("div");
  mainCard.classList.add("card");
  mainCard.innerHTML = `
    <div class="holder">
      <div class="title">Developer Exports</div>
      ${texts.main1}<br><br>${texts.main2}
    </div>
  `;

  const downloadCard = document.createElement("div");
  downloadCard.classList.add("card-big");
  downloadCard.innerHTML = `
    <div class="holder">
      <div class="title">Downloads</div>
      ${texts.download1}<br>
      <div class="download-div">
        <button class="downloadBtn">
          <img src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/file-icon.svg">
          Exports.js
        </button>
        <button class="downloadBtn">
          <img src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/file-icon.svg">
          Exports.min.js
        </button>
      </div>
      ${texts.download2}<br>
      <button class="downloadBtn">
        <img src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/CS-logo.svg">
      </button>
    </div>
  `;

  const handleClick = async (e, isMin) => {
    const url = `https://raw.githubusercontent.com/Community-Spotlight/promotion-exports/refs/heads/main/scripts/community-spotlight${isMin ? "-min" : ""}.js`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = isMin ? "CS-Exports-Min.js" : "CS-Exports.js";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    } catch (e) {
      console.warn("Download failed", e);
    }
    e.stopPropagation();
  }
  const cardBtns = downloadCard.querySelectorAll(`button[class="downloadBtn"]`);
  cardBtns[0].addEventListener("click", (e) => handleClick(e, false));
  cardBtns[1].addEventListener("click", (e) => handleClick(e, true));
  cardBtns[2].addEventListener("click", (e) => window.open("https://github.com/Community-Spotlight/promotion-exports", "_blank"));

  const documentation = document.createElement("div");
  documentation.classList.add("card-big");
  documentation.innerHTML = `
    <div class="holder">
      <div class="title">Documentation</div>
      ${texts.setup}<br>
      <pre><code class="language-javascript">
${code.setup}
      </code></pre>
    </div>
  `;

  contentBody.append(mainCard, downloadCard, documentation);
}, `
.content-body {
  margin: 20px;
}

.content-body .card {
  background: var(--theme-gradient);
  width: auto;
  max-width: 50vw;
  margin: 15px;
  padding: 20px 20px 40px 20px;
  border-radius: 20px;
  position: relative;
}
.content-body .card-big {
  background: var(--theme-gradient);
  width: auto;
  max-width: 60vw;
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

.content-body .download-div {
  display: flex;
}
.content-body .downloadBtn {
  margin: 15px 10px 15px 10px;
  padding: 5px 15px 5px 15px;
  width: 50%;
  display: flex;
  justify-content: center;
  justify-self: center;
  text-align: center;
  font-family: Tilt Warp;
  font-size: 25px;
  line-height: 200%;
  border: 2px grey solid;
  border-radius: 15px;
  background: transparent;
  color: var(--text-color);
  transition: transform 200ms ease-in-out, box-shadow 300ms ease-in-out;
  transform: scale(1);
  cursor: pointer;
}
.content-body .downloadBtn:hover {
  transform: scale(1.05);
  box-shadow: #00ff84 0px 0px 15px;
}
.content-body img {
  width: 50px;
  margin-right: 10px;
}

.content-body pre.language-javascript {
  border: 2px solid grey;
  border-radius: 15px;
  margin: 15px;
}
`);
