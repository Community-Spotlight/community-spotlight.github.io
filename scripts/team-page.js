GUI.tab.acquire(async (contentBody) => {
  await GUI.imports.BasicCache.cache("users", 604800000, async () => {
    console.log("Caching User List...");
    const res = await fetch("./meta/users.json");
    return await res.json();
  });
  const users = await GUI.imports.BasicCache.get("users");

  console.log(users);
  contentBody.appendChild(document.createTextNode('I am an example!'));
}, `
.content-body {
  background-color: red;
}
`);
