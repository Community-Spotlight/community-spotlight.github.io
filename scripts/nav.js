window.GUI_Nav = new (function() {
  this.globalEvents = new GUI_Imports.EventEmitter();
  let _GUI = null;
  this.GUI = function() {
    if (_GUI) return Promise.resolve(_GUI);
    return new Promise(resolve => {
      WindowEvents.once('GUI', (GUI) => {
        _GUI ??= GUI;
        resolve(GUI);
      });
    });
  };
  this.node = document.querySelector('[for="nav"]');
  this.node.innerHTML = `<div class="logo" data-name="logo" role="button" aria-pressed="false" tabindex="1">
    <img src="./assets/CS-logo.svg"></img>
    <div style="padding: 0px 5px; margin-right: 5px;">Community Spotlight</div>
  </div>
  <div class="nav-btn" data-name="theme-switch" role="button" aria-pressed="false" tabindex="2">
    <img src="./assets/light.svg"></img>
    <span>Light Mode</span>
  </div>`;
  this.tabindex = 3;
  this.createButton = function(name, asset, text) {
    const btn = document.createElement('div');
    btn.classList = 'nav-btn';
    btn.dataset.name = String(name);
    btn.role = 'button';
    btn.setAttribute('aria-pressed', 'false');
    btn.tabindex = String(this.tabindex);
    this.node.appendChild(btn);
    btn.innerHTML = `<img src="./assets/${asset}" /><span role="presentation"></span>`;
    btn.querySelector('span').textContent = text;
    this.tabindex++;
  };
  this.createButton('about', 'info.svg', 'About Us');
  this.createButton('submit', 'upload.svg', 'Submit a Promo');
  this.createButton('exports', 'eye.svg', 'For Developers');
  this.createButton('tos', 'paper.svg', 'Terms of Service');
  this.createButton('team', 'team.svg', 'Our Team');
})();

