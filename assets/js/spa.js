/* SPA behavior */
if (document.location.hash == "" || document.location.hash == "#") {
  document.location.hash = "#main";
}
let hashChangeMutex = false;
function hashChange(init) {
  if (hashChangeMutex) return;
  hashChangeMutex = true;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(() => {
    /* Change the header svg variation from triangular to rectangular */
    Array.from(document.getElementsByClassName("shape-fill")).forEach((el) => {
      if (
        document.location.hash == "#main" ||
        document.location.hash == "#contact"
      ) {
        el.setAttribute(
          "d",
          "M0 120 L0 0 L1200 120 L2400 120 L2400 130 L0 130 L0 120z",
        );
      } else {
        el.setAttribute(
          "d",
          "M0 120 L0 0 L1200 0 L2400 0 L2400 130 L0 130 L0 120z",
        );
      }
    });

    /* Display content to affect site height change */
    Array.from(document.getElementsByClassName("content")).forEach((el) => {
      el.style = "height: 0";
    });

    /* Hur-dur, no user data validation, insecure, nvm. */
    let el = document.querySelector(document.location.hash + "-content");
    if (el) {
      el.style = "height: auto";
    } else {
      document.location.hash = "#main";
      el = document.querySelector(document.location.hash + "-content");
      el.style = "height: auto";
    }

    /** If hash has changed - we need to remove parameters */
    const url = new URL(window.location.href);
    if (!init) {
      const newUrl = url.origin + url.pathname + url.hash;
      history.replaceState({}, titles[url.hash], newUrl);
    }
    document.title = titles[url.hash];

    Array.from(document.getElementsByClassName("menu-link")).forEach((el) => {
      el.classList.remove("active");
    });
    let menuItem = document.querySelectorAll(
      "." + document.location.hash.slice(1) + "-link",
    );
    menuItem.forEach((item) => item.classList.add("active"));
  }, 500);
  hashChangeMutex = false;
}

addEventListener("hashchange", (event) => {
  hashChange();
});
addEventListener("popstate", (event) => {
  hashChange(true);
});
hashChange(true);

/** Modal (a bit of abstraction leak) */
const modal = document.getElementById("modal");
const close = document.getElementById("modal-close");
const modalImg = modal.getElementsByClassName("img")[0];
const modalIndex = modal.getElementsByClassName("index")[0];
const modalType = modal.getElementsByClassName("type")[0];

function openModal(ident, index) {
  const project = document.getElementById("project-" + ident + "-" + index);
  if (!project) {
    return;
  }

  const video = project.getElementsByClassName("project-video");
  const projectName = project.getElementsByClassName("name")[0].textContent;

  const currentTitle = `${titles["#" + ident]} - ${projectName}`;
  const currentState = history.state;
  const currentHash = window.location.hash;
  history.pushState(
    currentState,
    currentTitle,
    `?p=${ident}&id=${index}${currentHash}`,
  );
  document.title = currentTitle;

  modalType.innerHTML = ident;
  modalIndex.innerHTML = index;
  if (video.length > 0) {
    const videoStr = `<iframe src="${video[0].innerHTML}" title="${projectName}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modalImg.innerHTML = videoStr;
    modalImg.style.backgroundImage = "";
  } else {
    const src =
      project.getElementsByClassName("project-img")[0].style.backgroundImage;
    const image = `<img src=${src.slice(4, -1)} style="height: 100%"/>`;
    modalImg.innerHTML = image;
  }

  modal.getElementsByClassName("date")[0].textContent =
    project.getElementsByClassName("date")[0].textContent;
  modal.getElementsByClassName("name")[0].textContent = projectName;
  modal.getElementsByClassName("description")[0].innerHTML =
    project.getElementsByClassName("description")[0].innerHTML;
  modal.getElementsByClassName("url")[0].innerHTML =
    project.getElementsByClassName("url")[0].innerHTML;
  modal.style.display = "block";

  /** Without that delay css does not want to make animation */
  setTimeout(() => {
    modal.style.opacity = 1.0;
  }, 10);
}

/** Control modal */
function closeModal() {
  if (modalImg) {
    modalImg.innerHTML = "";
  }

  if (modal && modal.style.display == "block") {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  } else {
    return;
  }

  const queryString = window.location.search;
  const currentHash = window.location.hash;
  const currentParams = new URLSearchParams(queryString);
  currentParams.delete("id");
  const currentTitle = titles["#" + (currentParams.get("p") || "realizations")];
  const currentState = history.state;
  history.pushState(
    currentState,
    currentTitle,
    `?${currentParams.toString()}${currentHash}`,
  );
  document.title = currentTitle;
}

close.onclick = closeModal;
document.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

document.body.addEventListener("keydown", function (e) {
  const idx = Number(modalIndex.innerHTML);
  if (e.key == "Escape") {
    closeModal();
  }

  /* If modal is opened */
  if (modal.style.display === "block") {
    if (e.key == "ArrowLeft") {
      openModal(modalType.innerHTML, idx - 1);
    } else if (e.key == "ArrowRight") {
      openModal(modalType.innerHTML, idx + 1);
    }
  }
});

/** Block scrollbar for animation period */
document.body.style.overflowY = "hidden";
setTimeout(() => {
  document.body.style.overflowY = "initial";
}, 7000);

function portfolioMenu(section, dontUpdateURL) {
  if (!dontUpdateURL) {
    const currentTitle = titles["#" + section];
    const currentState = history.state;
    history.pushState(currentState, currentTitle, `?p=${section}#portfolio`);
    document.title = currentTitle;
  }

  /* Change style of link */
  Array.from(
    document.querySelectorAll(".portfolio-menu .portfolio-menu-item"),
  ).forEach((el) => {
    el.classList.remove("active");
  });

  const sectionDOM = document.getElementById("portfolio-menu-" + section);
  if (!sectionDOM) {
    return false;
  }
  sectionDOM.classList.add("active");

  /* Show appropriate section */
  Array.from(
    document.querySelectorAll(".portfolio-sections .portfolio-section"),
  ).forEach((el) => {
    if (el.id === section) {
      setTimeout(() => {
        el.style.display = "block";
        el.style.opacity = 0;
        setTimeout(() => {
          el.style.opacity = 1;
        }, 100);
      }, 300);
    } else {
      setTimeout(() => {
        el.style.display = "none";
      }, 300);
      el.style.opacity = 0;
    }
  });

  return true;
}

function updateState(init) {
  const url = new URL(window.location.href);
  const portfolioParam = url.searchParams.get("p") || "skills";
  const modalParam = url.searchParams.get("id");

  if (!portfolioMenu(portfolioParam, /* dont update URL */ true)) {
    portfolioMenu("skills", true);
  }

  if (init) {
    /* Because it needs to be defined, secondly because it should not appear instantly */
    setTimeout(() => {
      if (modalParam) {
        openModal(portfolioParam, modalParam);
      } else {
        closeModal();
      }
    }, 5000);
  } else {
    if (modalParam) {
      openModal(portfolioParam, modalParam);
    } else {
      closeModal();
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateState(true);
});
/** Listen for popstate events to handle back/forward navigation */
window.addEventListener("popstate", function () {
  updateState();
});
