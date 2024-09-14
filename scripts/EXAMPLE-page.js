GUI.tab.acquire((contentBody) => {
  contentBody.appendChild(document.createTextNode('I am an example!'));
}, `.content-body {
  background-color: red;
}`);
