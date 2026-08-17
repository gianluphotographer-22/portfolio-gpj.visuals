
const header = document.querySelector(".site-header");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

function headerState(){
  if(header) header.classList.toggle("scrolled", window.scrollY > 35);
}
window.addEventListener("scroll", headerState);
headerState();

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("mobile-menu-open");
    document.body.classList.toggle("locked", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  if(nav){
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("mobile-menu-open");
        document.body.classList.remove("locked");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.addEventListener("keydown", e => {
    if(e.key === "Escape" && document.body.classList.contains("mobile-menu-open")){
      document.body.classList.remove("mobile-menu-open");
      document.body.classList.remove("locked");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const selected = btn.dataset.filter;
    projects.forEach(card => {
      const show = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !show);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.querySelector(".lightbox");
if(lightbox){
  const lightboxImg = lightbox.querySelector("img");
  const close = lightbox.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightbox.classList.add("active");
      document.body.classList.add("locked");
    });
  });

  function closeLightbox(){
    lightbox.classList.remove("active");
    document.body.classList.remove("locked");
  }
  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {if(e.target === lightbox) closeLightbox();});
  document.addEventListener("keydown", e => {if(e.key==="Escape") closeLightbox();});
}


/* Responsive state reset */
function resetResponsiveNavigation(){
  if(window.innerWidth > 1050){
    document.body.classList.remove("mobile-menu-open");
    if(!document.querySelector(".lightbox.active")){
      document.body.classList.remove("locked");
    }
    if(menuBtn){
      menuBtn.setAttribute("aria-expanded","false");
    }
    if(nav){
      nav.removeAttribute("style");
    }
  }
}

window.addEventListener("resize", resetResponsiveNavigation);
window.addEventListener("orientationchange", resetResponsiveNavigation);
resetResponsiveNavigation();


/* Mobile compact navigation polish */
window.addEventListener("resize", () => {
  if(window.innerWidth > 760){
    document.body.classList.remove("mobile-menu-open");
    if(!document.querySelector(".lightbox.active")){
      document.body.classList.remove("locked");
    }
    if(menuBtn) menuBtn.setAttribute("aria-expanded","false");
  }
});
