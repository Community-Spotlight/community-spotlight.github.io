GUI.tab.acquire(async (contentBody) => {
  await GUI_Imports.BasicCache.cache('users', 604800000, async () => {
    console.log('Caching users');
    const res = await fetch('./meta/users.json');
    return await res.json();
  });
  const users = await GUI_Imports.BasicCache.get('users');
  console.log(users);
});
