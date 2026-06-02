/* Constants */
const EFFECTIVE_DATE = "January 23, 2025";
const DISCORD = "https://discord.gg/DzwQf2tJyW";
const EMAIL = "CommunitySpotlightHelp@gmail.com";

const CONTACT_MSG = `please contact us through our <b><a href="${DISCORD}" target="_blank">Discord</a></b> or by emailing us at <b><a href="mailto:${EMAIL.toLowerCase()}">${EMAIL}</a></b>`;
const SECTIONS = [
  {
    title: "Introduction",
    text: `Welcome to <b>Community Spotlight</b>. These Terms of Service <i>("Terms")</i> govern your use of our advertising platform, which allows individuals to <b>advertise their projects for free</b> and developers to <b>display others' promotions for free</b>. By using our platform, you agree to these <i>Terms</i>.`,
  },
  {
    title: "No Signup Required",
    text: `<b>Community Spotlight</b> does not require <b>any signup or account creation</b> to display or embed promotions. <b>Community Spotlight</b> does not <b>collect, store, or process </b> any personal user data.`,
  },
  {
    title: "Voluntary Participation",
    text: `<b>All</b> contributions and interactions with <b>Community Spotlight</b> are entirely voluntary. By using <b>Community Spotlight</b>, you confirm that <b>you have the necessary rights</b> to promote the material. As well, Users <b>retain full ownership</b> of their uploaded promotions. By submitting a promotion, you agree that it does <b>not</b> violate any applicable laws or the rights of others.`,
  },
  {
    title: "Prohibited Content",
    text: `<b>Copyrighted content is prohibited</b> unless you have <b>explicit permission from the copyright owner</b>. Users must ensure their uploaded content <b>does not infringe on the intellectual property rights of others</b>.<br><br>Content that is <b>unlawful, harmful, or otherwise inappropriate</b> is <b>strictly prohibited</b>. Content that is <b>generated or partially generated</b> with any LLM or Image Generation model (ChatGPT, Midjourney, Stable Diffusion, et cetera) <b>may not be promoted</b>. <b>Promotions generated with assistance or completely</b> from AI programs or tools will be handled on a <b>case-by-case</b> basis.`,
  },
  {
    title: "Content Uploads",
    text: `Users can upload <b>images, videos, and HTML embeds</b> to promote their projects. By uploading any promotional content, you grant <b>Community Spotlight</b> a <b>non-exclusive, royalty-free license</b> to display and share your content. You <b>retain ownership</b> of your content and are <b>solely responsible for its accuracy, legality, and compliance</b> with these <i>Terms</i>.`,
  },
  {
    title: "Disclaimer of Liabilities",
    text: `<b>Community Spotlight</b> is a free platform and <b>does not guarantee the performance, accuracy, or effectiveness</b> of any promotions displayed. We are <b>not responsible for any disputes or issues</b> arising from user promotions <b>unless it relates to IP or copyright</b>. As such, <b>promote and display promotions at your own risk.</b>`,
  },
  {
    title: "Content Moderation",
    text: `<b>Community Spotlight</b> reserves the right to <b>remove or refuse</b> any promotional material that <b>violates these Terms</b> or is deemed inappropriate. Promotions flagged by <b>users or moderators</b> may be subject to <b>review and removal without notice<b>.`,
  },
  {
    title: "Intellectual Property",
    text: `<b>Community Spotlight</b> respects <b>intellectual property rights</b> and expects users to <b>do the same</b>. If you believe your <b>copyright</b> has been <b>infringed upon</b>, ${CONTACT_MSG}.`,
  },
  {
    title: "Changes to the Terms",
    text: `<b>Community Spotlight</b> <b>reserves the right</b> to <b>modify these Terms</b> at any time. Updates will be posted on this page with an updated effective date. Continued use of the platform <b>constitutes acceptance</b> of the revised <b>Terms.</b>`,
  },
  {
    title: "Service Availablitiy",
    text: `<b>Community Spotlight</b> is provided <b>as is</b> and <b>as available</b>. We make no <b>guarantees regarding uptime, availability, or functionality</b>. We reserve the right to <b>suspend or discontinue</b> any part of the service <b>without prior notice</b>.`,
  },
  {
    title: "Governing Law",
    text: `These <i>Terms</i> are <b>governed by</b> and <b>constructed in accordance with</b> the laws of <b>Canada</b>. Any <b>disputes</b> arising under these <b>Terms</b> shall be resolved through mutual discussion and agreement or, if necessary, in the courts <b>Canada</b>.`,
  },
  {
    title: "Contact Us",
    text: `If you have any <b>questions or concerns</b> regarding these <b>Terms</b> or about <b>Community Spotlight</b>, ${CONTACT_MSG}.`,
  },
];

const initTosGUI = function (list) {
  const effectiveDateSpan = document.getElementById("effective-date");
  effectiveDateSpan.textContent = EFFECTIVE_DATE;

  const container = document.querySelector(".tos .term-list");
  const reusableCapsule = container.firstElementChild;
  reusableCapsule.style.display = "none";

  const sectionCapsules = [];
  for (const section of SECTIONS) {
    const capsule = reusableCapsule.cloneNode(true);
    capsule.querySelector(".header").textContent = section.title;
    capsule.querySelector(".text p").innerHTML = section.text;

    capsule.style.display = "";
    sectionCapsules.push(capsule);
  }

  container.addEventListener("click", (e) => {
    const target = e.target.closest(`img[class="flipper"]`);
    if (!target) return;

    target.toggleAttribute("open");
    const text = target.parentNode.parentNode.querySelector(".text");
    text.style.height = target.hasAttribute("open")
      ? `${text.scrollHeight}px`
      : "";

    e.stopPropagation();
  });

  reusableCapsule.remove();
  container.append(...sectionCapsules);
};

Events.on("START_SCRIPT", async (id) => {
  if (id === "tos") initTosGUI();
});
