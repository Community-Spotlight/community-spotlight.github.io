GUI.tab.acquire((contentBody) => {
  const descriptionTxts = {
    abt: [
      `<img src="assets/CS-logo.png" width=100px height=100px style="display: block;margin:auto;"></img> <br> Community Spotlight is a <strong>non-profit</strong> project that is aimed towards providing free promotional content to everyone.\n`,
      `For Advertisers, Community Spotlight allows you to promote your content for free in the form of imagery, video, or HTML.
      You have the ability to Promote any work of yours, including games, songs, websites, and more!\n`,
      `For Developers, Community Spotlight allows you to display pomotions for free with no sign-up required!`,
      `You will not be making any profit. You simply have the ability to fill empty space in your sites/games
      while helping others!`,
    ],
    contact: `
      Feel free to contact the Community Spotlight Team through:
      <br /><br />

      <a href="https://discord.gg/DzwQf2tJyW"><img src="assets/DiscordLogo.svg" width=50px height=50px style="display: block;margin:auto;"></img></a>
      <!-- there's no way i can mess up now -->
    `
  };

 //About us 1
 let about1 = document.createElement("div")
 about1.classList = "about-card"
 about1.innerHTML = descriptionTxts.abt[0];

 //About us 2
 let about2 = document.createElement("div")
 about2.classList = "about-card"
 about2.id = "about-card2"
 about2.innerHTML = "<img src='assets/submission-example.png'>";
 about2.innerHTML += `<div> ${ descriptionTxts.abt[1] } </div>`;

 //About us 3
 let about3 = document.createElement("div")
 about3.classList = "about-card"
 about3.id = "about-card3"
 about3.innerHTML = `<div> ${ descriptionTxts.abt[2] } </div>`;
 about3.innerHTML += "<img src='assets/demo.png'>";
 about3.innerHTML += `<div> ${ descriptionTxts.abt[3] } </div>`;

 //Contact us
 let contact = document.createElement("div")
 contact.classList = "about-card"
 contact.innerHTML = descriptionTxts.contact;

  // Append to Content Body
  contentBody.append(about1, about2, about3, contact, GUI.makeBreak());
}, `
.about-card {
  background: var(--theme-gradient);
  padding: 50px;
  margin: 30px;
  border-radius: 10px;
  color: #fff;
  text-align: left;
}

#about-card2 {
  max-width: 111ch;
  align-self: flex-start;
  padding: 20px 0;
}

#about-card2 div {
  padding: 80px 15px;
}

#about-card2 img {
  float: left;
  padding-right: 20px;
  padding-left: 30px;
  position: relative;
  display: block;
  height: 200px; 
  width: auto;
  border-radius: 15px;
}

#about-card3 {
  max-width: 90ch;
  align-self: flex-end;
  padding: 20px 15px;
}

#about-card3 div {
  padding: 30px 20px;
}

#about-card3 img {
  padding-right: 20px;
  padding-left: 20px;
  position: relative;
  display: block;
  height: 200px; 
  width: auto;
  border-radius: 15px;
}
`);
