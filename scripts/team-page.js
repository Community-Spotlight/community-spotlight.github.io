GUI.tab.acquire(async (contentBody) => {
  GUI_Imports.BasicCache.cache('users', 604800000, async () => {
    const res = await fetch('../meta/users.json');
    return await res.json();
  });
  const users = await GUI_Imports.BasicCache.get('users');
  print(users);
});
