GUI.tab.acquire(async (contentBody) => {
  GUI.importStyle('./css/prism.css');
  await (GUI.importScript('./scripts/prism.js', null, true).loadPromise);
  
  const getImgPromo = async (params) => {
    const promo = await getOnlinePromoCS("image", params);
    const promoDiv = document.createElement("div");
    const mediaDiv = document.createElement("img");
    mediaDiv.setAttribute("title", promo.promoter);
    mediaDiv.classList.add("promotion");
    mediaDiv.src = promo.url;
    mediaDiv.setAttribute("onclick", `window.open("${promo["promoter-url"]}", "_blank")`);
    promoDiv.appendChild(mediaDiv);
    return promoDiv.innerHTML;
  };

  const texts = {
    main1: `Looking to display Promotions like this in Your Project?:`,
    main2: `Use our Developer Exports! In this page, we'll document and direct you on how to use the Community Spotlight Promotion Exports.`,
    download1: `First, download the most recent version of our Exports:`,
    download2: `Or, check out our <b>GitHub Repository:</b>`,

    import1: `First, import the Exports script. You can do this by using a <b>HTML Script</b> or by pasting the <b>JS Directly</b>`,
    import2: `You are allowed to use a Local Copy of the Exports File.`,
    setup1: `With our Exports, you have the choice to Fetch Promotions either <b>Online</b> or through <b>Stored Cache.</b>`,
    setup2: `The difference between the two is that <b>Stored Cache</b> performs a <i>single</i> Fetch of the Promotion List and <b>saves it in the 'window' for future use,</b> while <b>Online Fetching</b> retrieves the list on <i>every</i> 'getOnlinePromoCS' call.`,
    setup3: `Here’s how to setup the Exports:`,
    usage1: `Here's how to use 'getOnlinePromoCS' and 'getCachedPromoCS' to retrieve specific Promotions based on specific Parameters. <i>(Note: all Parameters are <u>optional</u>)</i>`,
    usage2: `These functions will both return Promotion JSON like the following:`,
  };
  const code = {
    // excuse the formatting
    // it needs to be like this to not look bad in the site
    import: `
/* HTML method */
&lt;script src="https://cdn.jsdelivr.net/gh/Community-Spotlight/promotion-exports/scripts/community-spotlight.js"&gt;&lt;/script&gt;

/* JS method */
function importCommunitySpotlight() {
  // insert JS code here...
}
importCommunitySpotlight();
`,
    setup: `
/* Stored Cache */
// use this to initialize the Cache
// you may re-run this anytime to refresh the list
await refreshPromoCacheCS();

// you can now use this function for instant outputs
// proper Parameters are described below
getCachedPromoCS("image", {});


/* Online */
// no setup required, fetches the Promotion List
// proper Parameters are described below
await getOnlinePromoCS("video", {});
`,
    usage: `
// both functions use the same Parameter rules
await getOnlinePromoCS(type, optParams);
getCachedPromoCS(type, optParams);

/*
  Parameters:
  - type: "image", "video", or "html"
  - optParams:
    tags: [array] – Valid tags can be found on our Uploader Site
    aspectRatio (image): 250x250, 300x250, 480x270, 300x50, 50x300, 360x120, 120x360
    aspectRatio (video): 1:1, 4:3, 4:5, 16:9, 9:16
    videoLength (video): 5, 10, 15, 30
    aspectRatio (html): 1:1, 4:3, 4:5, 16:9, 9:16
*/

// examples:
getCachedPromoCS("image", {
  tags: ["Gaming"],
  aspectRatio: "300x250",
});

getCachedPromoCS("video", {
  aspectRatio: "4:3",
});
`,
    example: `
{
  "expires": "...", // expiry date
  "id": "...", // promotion ID
  "promoter": "...", // promotion name
  "promoter-url": "https://...", // promotion direct url
  "tags": [...], // promotion tags
  "url": "https://..." // promotion media url
}
`,
  };

  const mainCard = document.createElement("div");
  mainCard.classList.add("card");
  mainCard.innerHTML = `
    <div class="holder">
      <div class="title">Developer Exports</div>
      ${texts.main1}<br>${await getImgPromo({ aspectRatio: "360x120" })}<br>${texts.main2}
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
          <img src="/assets/file-icon.svg">
          exports.js
        </button>
        <button class="downloadBtn">
          <img src="/assets/file-icon.svg">
          exports.min.js
        </button>
      </div>
      ${texts.download2}<br>
      <button class="downloadBtn">
        <img src="/assets/CS-logo.svg">
      </button>
    </div>
  `;

  const handleClick = async (e, isMin) => {
    const url = `/promotion-exports/scripts/community-spotlight${isMin ? "-min" : ""}.js`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = isMin ? "CS-exports-min.js" : "CS-exports.js";
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

  contentBody.append(mainCard, downloadCard);
  await loadPrismLibrary();

  const docsSetup = document.createElement("div");
  docsSetup.classList.add("card-big");
  docsSetup.innerHTML = `
    <div class="holder">
      <div class="title">Documentation -- Setup</div>
      ${texts.import1}<br><br>${texts.import2}<br>
      <pre><code class="language-javascript">${code.import.trim()}</code></pre>
      ${texts.setup1}<br><br>${texts.setup2}<br><br>${texts.setup3}<br>
      <pre><code class="language-javascript">${code.setup.trim()}</code></pre>
    </div>
  `;

  const docsUsage = document.createElement("div");
  docsUsage.classList.add("card-big");
  docsUsage.innerHTML = `
    <div class="holder">
      <div class="title">Documentation -- Fetching Promotion Data</div>
      ${texts.usage1}<br>
      <pre><code class="language-javascript">${code.usage.trim()}</code></pre>
      ${texts.usage2}<br>
      <pre><code class="language-javascript">${code.example.trim()}</code></pre>
    </div>
  `;

  contentBody.append(docsSetup, docsUsage);
  Prism.highlightAll();
}, `
.content-body {
  margin: 20px;
}
.content-body .promotion {
  width: 90%;
  margin: 15px;
  border: 2px grey solid;
  border-radius: 15px;
  cursor: pointer;
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
  background-color: var(--bg-box-dark);
  border: 2px solid grey;
  border-radius: 15px;
  margin: 15px;
}
.content-body code.language-javascript {
  color: #e88922;
  text-shadow: none;
  font-size: 0.85em;
  line-height: 1;
}
.content-body code [class="token operator"] {
  background: none;
}
`);
