const modal = document.querySelector(".modal-container");
const addBookmarkd = document.querySelector("#show-modal");
const closeModal = document.querySelector("#close-modal");
const bookmarkForm = document.getElementById("bookmarkform");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let storeBookmarks = [];

// Show Modal, Focus on input
function showModal() {
  modal.classList.add("show");
  websiteName.focus();
}
// Hide Modal
function removeModal() {
  modal.classList.remove("show");
}

// Adding Bookmark
function addbookmark(e) {
  e.preventDefault();
  const userWebName = e.srcElement[0].value;
  let userWebUrl = e.srcElement[1].value;
  if (!userWebUrl.includes("http://") && !userWebUrl.includes("https://")) {
    userWebUrl = `https://${userWebUrl}`;
  }
  if (!validate(userWebName, userWebUrl)) {
    return false;
  }

  const bookmark = {
    name: userWebName,
    url: userWebUrl,
  };
  storeBookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(storeBookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteName.focus();
}
// Creating Bookmarks
function buildBookmarks() {
  // build item
  bookmarksContainer.innerHTML = "";
  storeBookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // item
    const item = document.createElement("div");
    item.classList.add("item");
    // close
    const close = document.createElement("i");
    close.classList.add("fas", "fa-times");
    close.setAttribute("title", "Delete Bookmark");
    close.setAttribute("onclick", `deleteBookmark('${url}')`);
    // Favicon Link
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "favicon");
    // Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // Append to bookmark container
    linkInfo.append(favicon, link);
    item.append(close, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// Delete Bookmark
function deleteBookmark(url) {
  storeBookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      storeBookmarks.splice(i, 1);
    }
  });
  //  update bookmark array in local storage
  localStorage.setItem("bookmarks", JSON.stringify(storeBookmarks));
  fetchBookmarks();
}

// Fetch Bookmarks from localStorage
function fetchBookmarks() {
  // Get bookmarks from local if has
  if (JSON.parse(localStorage.getItem("bookmarks"))[0]) {
    storeBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // Create bookmark array
    storeBookmarks = [
      {
        name: "Husnain Syed",
        url: "https://daimsyed.github.io/First-Web/",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(storeBookmarks));
  }
  buildBookmarks();
}

// Validate Form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("Please submit values for both field");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("please provide a valid web address");
    return false;
  }
  //   Valid
  return true;
}

// Event Listener
addBookmarkd.addEventListener("click", showModal);
closeModal.addEventListener("click", removeModal);
window.addEventListener("click", (e) => {
  e.target === modal ? removeModal() : false;
});
bookmarkForm.addEventListener("submit", addbookmark);
// on load
fetchBookmarks();
