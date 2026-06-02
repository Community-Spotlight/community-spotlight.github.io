const STORAGE_KEY = "CS-Storage";
const USER_DATA = {};

/**
 * Retrieves and parses Local Storage value.
 */
const getLocalStorage = function () {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("User Data is not an object!");
    }

    Object.assign(USER_DATA, parsed);
  } catch {
    console.warn("Malformed Local Storage! Reseting...");
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Updates the Local Storage value to whatever is stored in 'userData'.
 */
const setLocalStorage = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(USER_DATA));
};

export { USER_DATA, getLocalStorage, setLocalStorage };
