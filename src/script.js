const menuImg = new URL('./img/menu.png', import.meta.url);
const arrowImg = new URL('./img/arrow.png', import.meta.url);

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggle-gallery");
  const gallery = document.querySelector(".gallery");

  if (btn && gallery) {
    btn.addEventListener("click", () => {
      gallery.classList.toggle("hidden");
    });
  }

  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  const icon = document.getElementById("menu-icon");

  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    if (nav.classList.contains("open")) {
      icon.src = arrowImg.href;
      icon.alt = "Tancar menú";
    } else {
      icon.src = menuImg.href;
      icon.alt = "Obrir menú";
    }
  });
  
});

  