GUI.tab.acquire((contentBody) => {
  const sections = {
    main1: `<b>Community Spotlight</b> is a <b>non-profit project</b> dedicated to supporting creators, artists, and developers by offering <b>free promotional services.</b>`,
    main2: `Our goal is to highlight and showcase talent, projects, and events within the community, providing a platform for visibility and growth. Our team strives to foster engagement, encourage creativity, and build positive connections.`,
    advert1: `Community Spotlight allows you to Promote your content in the form of promotional Images, Videos, or HTML Embeds. This is all done <b>free of charge!</b>`,
    advert2: `You have the freedom to promote any work of yours, including games, songs, websites, and more.`,
    advert3: `To upload your Promotions, check out our Uploader Form by clicking the "Submit a Promo" Button above. You'll find our Guidelines and other rules there.`,
    devs1: `Community Spotlight allows you to display Promotions for <b>free</b> with no required Sign-Ups or API keys!`,
    devs2: `Since we are a <b>non-profit</b>, you will <b>not</b> be making any financial profit. You are simply helping other people promote their work.`,
    devs3: `To display Promotions in your project, check out our Developer Exports by clicking the "For Developers" Button above.`,
    contact1: `Connect with the Community Spotlight Team through our Discord!`,
    contact2: `Join us to stay updated with announcements, get assistance, and engage with other promoters in the community! It's the perfect place to ask questions, share ideas, and collaborate.`,
  };

  const mainCard = document.createElement("div");
  mainCard.classList.add("card");
  mainCard.innerHTML = `
    <img class="logo-img" draggable="false" src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/CS-logo.svg">
    <div class="holder">
      <div class="title">Terms of Service</div>
      ${sections.main1}<br><br>${sections.main2}
      <div class="title">1) ...</div>
      ${sections.main1}<br><br>${sections.main2}
    </div>
  `;

  contentBody.append(mainCard);
}, `
.content-body {
  margin: 20px;
}

.content-body .logo-img {
  margin-bottom: 5px;
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
`);
