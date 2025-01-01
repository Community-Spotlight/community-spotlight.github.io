GUI.tab.acquire(async (contentBody) => {
  await GUI.imports.BasicCache.cache('users', 604800000, async () => {
    console.log('Caching users');
    const res = await fetch('./meta/users.json');
    return await res.json();
  });
  const users = await GUI.imports.BasicCache.get('users');
  console.log(users);
});
