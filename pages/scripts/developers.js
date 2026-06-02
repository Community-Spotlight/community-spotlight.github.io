/* Constants */
const EXPORTS_PATH =
  "https://raw.githubusercontent.com/Community-Spotlight/promotion-exports/refs/heads/main/dist/"; // Dont use a CDN as it can be slow to update

const downloadExports = async function (isMinified) {
  const fileName = `CS-Exports${isMinified ? ".min" : ""}.js`;
  const url =
    EXPORTS_PATH + `community-spotlight${isMinified ? ".min" : ""}.js`;

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    link.remove();
  } catch (e) {
    console.warn("Download Failed: ", e);
  }
};

const initExportsGUI = function (list) {
  const container = document.querySelector(".exports");
  const downloadsContainer = container.querySelector(".flex-div");

  downloadsContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".btn-clear");
    if (!target) return;

    const isMinified = target.id === "exports-min";
    downloadExports(isMinified);

    e.stopPropagation();
  });
};

Events.on("START_SCRIPT", async (id) => {
  if (id === "developers") initExportsGUI();
});
