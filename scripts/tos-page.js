GUI.tab.acquire((contentBody) => {
  const effectiveDate = "January 23, 2025";
  const endMessage = `Thank you for reading and for using <b>Community Spotlight!</b> to share and support creative projects!`;
  const contact = `through our <b><a href="https://discord.gg/DzwQf2tJyW" target="_blank">Discord</a></b> or by emailing us at <b><a href="mailto:communityspotlighthelp@gmail.com">CommunitySpotlightHelp@gmail.com</a></b>`;

  const sections = {
    "Introduction":
    `Welcome to <b>Community Spotlight</b>. These Terms of Service <b>("Terms")</b> govern your use of our advertising platform, which allows individuals to <b>advertise their projects for free</b> and developers to <b>display others' promotions for free</b>. By using our platform, you agree to these <b>Terms</b>.`,

    "No Signup Required":
    `<b>Community Spotlight</b> does not require <b>any signup or account creation</b> to display or embed promotions. <b>Community Spotlight</b> does not <b>collect, store, or process </b> any personal user data.`,

    "Voluntary Participation":
    `<b>All</b> contributions and interactions with <b>Community Spotlight</b> are entirely voluntary. By using <b>Community Spotlight</b>, you confirm that <b>you have the necessary rights</b> to promote the material. As well, Users <b>retain full ownership</b> of their uploaded promotions. By submitting a promotion, you agree that it does <b>not</b> violate any applicable laws or the rights of others.`,

    "Prohibited Content":
    `<b>Copyrighted content is prohibited</b> unless you have <b>explicit permission from the copyright owner</b>. Users must ensure their uploaded content <b>does not infringe on the intellectual property rights of others</b>.<br><br>Content that is <b>unlawful, harmful, or otherwise inappropriate</b> is <b>strictly prohibited</b>. Content that is <b>generated or partially generated</b> with any LLM or Image Generation model (ChatGPT, Midjourney, Stable Diffusion, et cetera) <b>may not be promoted</b>. <b>Promotions generated with assistance or completely</b> from AI programs or tools will be handled on a <b>case-by-case</b> basis.`,

    "Content Uploads":
    `Users can upload <b>images, videos, and HTML embeds</b> to promote their projects. By uploading any promotional content, you grant <b>Community Spotlight</b> a <b>non-exclusive, royalty-free license</b> to display and share your content. You <b>retain ownership</b> of your content and are <b>solely responsible for its accuracy, legality, and compliance</b> with these <b>Terms</b>.`,

    "Disclaimer of Liabilities":
    `<b>Community Spotlight</b> is a free platform and <b>does not guarantee the performance, accuracy, or effectiveness</b> of any promotions displayed. We are <b>not responsible for any disputes or issues</b> arising from user promotions <b>unless it relates to IP or copyright</b>. As such, <b>promote and display promotions at your own risk.</b>`,

    "Content Moderation":
    `<b>Community Spotlight</b> reserves the right to <b>remove or refuse</b> any promotional material that <b>violates these Terms</b> or is deemed inappropriate. Promotions flagged by <b>users or moderators</b> may be subject to <b>review and removal without notice<b>.`,

    "Intellectual Property":
    `<b>Community Spotlight</b> respects <b>intellectual property rights</b> and expects users to <b>do the same</b>. If you believe your <b>copyright</b> has been <b>infringed upon</b>, please contact us ${contact}.`,

    "Changes to the Terms":
    `<b>Community Spotlight</b> <b>reserves the right</b> to <b>modify these Terms</b> at any time. Updates will be posted on this page with an updated effective date. Continued use of the platform <b>constitutes acceptance</b> of the revised <b>Terms.</b>`,

    "Service Availablitiy":
    `<b>Community Spotlight</b> is provided <b>as is</b> and <b>as available</b>. We make no <b>guarantees regarding uptime, availability, or functionality</b>. We reserve the right to <b>suspend or discontinue</b> any part of the service <b>without prior notice</b>.`,

    "Governing Law":
    `These <b>Terms</b> are <b>governed by</b> and <b>constructed in accordance with</b> the laws of <b>Canada</b>. Any <b>disputes</b> arising under these <b>Terms</b> shall be resolved through mutual discussion and agreement or, if necessary, in the courts <b>Canada</b>.`,

    "Contact Us":
    `If you have any <b>questions or concerns</b> regarding these <b>Terms</b> or about <b>Community Spotlight</b>, please contact us ${contact}.`,
  };

  const makeCapsule = (entry) => {
    const capsule = document.createElement("div");
    capsule.classList.add("capsule");
    capsule.innerHTML = `
      <div class="capsule-contain">
        <img class="flipper-img" draggable="false" src="https://raw.githubusercontent.com/Community-Spotlight/assets/refs/heads/main/arrow-right.svg">
        <div class="header">${entry[0]}</div>
      </div>
      <div class="text">${entry[1]}</div>
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
      <b>Effective: ${effectiveDate}</b>
    </div>
  `;

  const endCard = document.createElement("div");
  endCard.classList.add("card");
  endCard.innerHTML = `
    <div class="holder">
      <div class="title">The End</div>
      ${endMessage}
    </div>
  `;

  const holder = mainCard.querySelector(`div[class="holder"]`);
  const entries = Object.entries(sections);
  for (let i = 0; i < entries.length; i++) holder.appendChild(makeCapsule(entries[i]));
  contentBody.append(mainCard, endCard);
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
