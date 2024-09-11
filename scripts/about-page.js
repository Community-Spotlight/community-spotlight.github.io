/*
  Community Spotlight About Page
*/
(function() {
  const descriptionTxts = {
    abt: `
      Community Spotlight is a non-profit Project that is aimed towards providing free Promotional Content to Everyone.\n

      For Advertisers, Community Spotlight allows you to Promote your content for Free in the form of Imagery, Video, or HTML.
      You have the ability to Promote any work of yours, including games, songs, websites, and more!\n

      For Developers, Community Spotlight allows you to Display Promotions for Free with no sign-up required! 
      Unfortunately, you will not be making any profit. You simply have the ability to fill empty space in your sites/games
      while helping others!
    `,
    contact: `
      Feel free to Contact the Community Spotlight Team either through our Discord:\n

      Or by Emailing us at:\n
    `
  };

  // Main New Body
  const newBody = document.createElement("div");
  newBody.classList = "content-body";

  // About Us
  const aboutTitle = document.createElement("div");
  aboutTitle.classList = "title-txt";
  aboutTitle.textContent = "About Us";

  const aboutTxt = document.createElement("div");
  aboutTxt.classList = "inner-txt";
  aboutTxt.innerHTML = descriptionTxts.abt.trim();

  // Contacts
  const contactTitle = document.createElement("div");
  contactTitle.classList = "title-txt";
  contactTitle.textContent = "Contact Us";

  const contactTxt = document.createElement("div");
  contactTxt.classList = "inner-txt";
  contactTxt.innerHTML = descriptionTxts.contact.trim();

  // Append to Content Body
  newBody.append(aboutTitle, aboutTxt, makeBreak(), contactTitle, contactTxt);
  document.body.appendChild(newBody);
})();
