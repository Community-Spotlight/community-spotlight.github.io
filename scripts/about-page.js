GUI.tab.acquire((contentBody) => {
  const descriptionTxts = {
    abt: [
      `<img src="assets/CS-logo.png" width=100px height=100px style="display: block;margin:auto;"></img> <br> Community Spotlight is a <strong>non-profit</strong> Project that is aimed towards providing free Promotional Content to Everyone.\n`,

      `For Advertisers, Community Spotlight allows you to Promote your content for Free in the form of Imagery, Video, or HTML.
      You have the ability to Promote any work of yours, including games, songs, websites, and more!\n`,

      `For Developers, Community Spotlight allows you to Display Promotions for Free with no sign-up required!`,

      `Unfortunately, you will not be making any profit. You simply have the ability to fill empty space in your sites/games
      while helping others!`,
    ],
    contact: `
      Feel free to Contact the Community Spotlight Team through:
      
      <br><br><br>

      <a href=https://discord.gg/DzwQf2tJyW class="social-btn social-btn-discord"><i class="fa-brands fa-discord"></i></a>
      <a class="social-btn social-btn-gmail"><img src="assets/gmail.svg"></img></a>
    `
  };

  let styles = document.createElement("link")
  styles.href = "css/about-page.css"
  styles.rel = "stylesheet"

  const fontAwesome = document.createElement('script');
  fontAwesome.src = 'https://kit.fontawesome.com/1849f4e0f8.js';
  fontAwesome.crossOrigin = 'anonymous';

  let social_media_buttons = document.createElement("link")
  social_media_buttons.href = "css/social-media-buttons.css"
  social_media_buttons.rel = "stylesheet"

 //About us 1
 let about1 = document.createElement("div")
 about1.classList = "about-card"
 about1.innerHTML = descriptionTxts.abt[0];

 //About us 2
 let about2 = document.createElement("div")
 about2.classList = "about-card"
 about2.id = "about-card2"
 about2.innerHTML = "<img src='assets/Screenshot 2024-09-21 104353.png'>";
 about2.innerHTML += `<div> ${ descriptionTxts.abt[1] } </div>`;

 //About us 3
 let about3 = document.createElement("div")
 about3.classList = "about-card"
 about3.id = "about-card3"
 about3.innerHTML = `<div> ${ descriptionTxts.abt[2] } </div>`;
 about3.innerHTML += "<img src='assets/download (1).png'>";
 about3.innerHTML += `<div> ${ descriptionTxts.abt[3] } </div>`;

 //Contact us
 let contact = document.createElement("div")
 contact.classList = "about-card"
 contact.innerHTML = descriptionTxts.contact;

  // Append to Content Body
  contentBody.append(styles, social_media_buttons, fontAwesome, about1, about2, about3, contact, GUI.makeBreak());
});
