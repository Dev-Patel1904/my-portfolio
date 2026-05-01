// =====================
// CURSOR EFFECT
// =====================
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + "px";
  dot.style.top  = mouseY + "px";
});

// Smooth ring follow
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + "px";
  ring.style.top  = ringY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor grows on hoverable elements
document.querySelectorAll("a, button, [data-hover]").forEach(el => {
  el.addEventListener("mouseenter", () => {
    dot.style.transform  = "translate(-50%,-50%) scale(2.5)";
    ring.style.transform = "translate(-50%,-50%) scale(1.5)";
    ring.style.borderColor = "rgba(56,189,248,0.7)";
  });
  el.addEventListener("mouseleave", () => {
    dot.style.transform  = "translate(-50%,-50%) scale(1)";
    ring.style.transform = "translate(-50%,-50%) scale(1)";
    ring.style.borderColor = "rgba(56,189,248,0.45)";
  });
});

// =====================
// MOBILE MENU
// =====================
const hamburger = document.querySelector(".nav-hamburger");
const navLinks  = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity   = "1";
    spans[2].style.transform = "none";
  }
});

// Close on nav link click
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity   = "1";
    spans[2].style.transform = "none";
  });
});

// =====================
// SCROLL REVEAL
// =====================
const reveals     = document.querySelectorAll(".reveal");
const revealsLeft = document.querySelectorAll(".reveal-left");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

[...reveals, ...revealsLeft].forEach(el => revealObserver.observe(el));

// =====================
// ACTIVE NAV HIGHLIGHT
// =====================
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// =====================
// CARD MOUSE GLOW
// =====================
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%";
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%";
    card.style.setProperty("--mx", x);
    card.style.setProperty("--my", y);
  });
});

// =====================
// SKILL TABS
// =====================
const skillsData = {
  Languages: [
    { icon: 'fa-brands fa-html5',   cls: 'ic-html', label: 'HTML' },
    { icon: 'fa-brands fa-js',      cls: 'ic-js',   label: 'JavaScript' },
    { icon: 'fa-brands fa-python',  cls: 'ic-py',   label: 'Python' },
    { icon: 'fa-brands fa-php',     cls: 'ic-php',  label: 'PHP' },
    { icon: 'devicon-c-plain colored',          cls: 'ic-c',  label: 'C', devicon: true },
  ],
  Frontend: [
    { icon: 'fa-brands fa-react',    cls: 'ic-react', label: 'React' },
    { icon: 'fa-brands fa-css3-alt', cls: 'ic-css',   label: 'CSS3' },
    { icon: 'fa-brands fa-html5',    cls: 'ic-html',  label: 'HTML5' },
    { icon: 'devicon-vitejs-plain colored', cls: 'ic-react', label: 'Vite', devicon: true },
  ],
  Backend: [
    { icon: 'fa-brands fa-node-js', cls: 'ic-node', label: 'Node.js' },
    { icon: 'fa-solid fa-server',   cls: 'ic-node', label: 'Express.js' },
    { icon: 'fa-brands fa-php',     cls: 'ic-php',  label: 'PHP' },
    { icon: 'fa-brands fa-laravel', cls: 'ic-laravel', label: 'Laravel' }
  ],
  Databases: [
    
    { icon: 'devicon-mongodb-plain colored',    cls: 'ic-mongo', label: 'MongoDB', devicon: true },
    { icon: 'devicon-mysql-plain colored',      cls: 'ic-pg',    label: 'MySQL', devicon: true },
    { icon: 'fa-solid fa-database',             cls: 'ic-accent', label: 'SQL' },
   
  ],
  Tools: [
    { icon: 'fa-brands fa-git-alt',  cls: 'ic-git',   label: 'Git' },
    { icon: 'fa-brands fa-github',   cls: 'ic-text',  label: 'GitHub' },
    { icon: 'fa-solid fa-terminal',  cls: 'ic-fast',  label: 'Linux CLI' },
    { icon: 'fa-solid fa-code',      cls: 'ic-accent', label: 'VS Code' },
  ]
};

const tabBtns  = document.querySelectorAll(".skill-tab");
const panel    = document.querySelector(".skills-panel");

function renderSkills(category) {
  const items = skillsData[category] || [];
  panel.innerHTML = items.map((item, i) => `
    <div class="sk-card" style="animation-delay:${i * 0.05}s">
      <div class="sk-icon-wrap ${item.cls}">
        <i class="${item.icon}"></i>
      </div>
      <p class="sk-label">${item.label}</p>
    </div>
  `).join('');
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const label = btn.textContent.trim().replace(/\d+/g, '').trim();
    renderSkills(label);
  });
});

// init with Languages
renderSkills('Languages');

// =====================
// TYPING EFFECT
// =====================
const roles = [
  "Laravel Developer",
  "Php Developer",
];

const roleEl = document.querySelector(".hero-role strong");
if (roleEl) {
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typeRole() {
    const current = roles[roleIdx];
    const cursorSpan = '<span class="hero-cursor">&nbsp;</span>';

    if (!deleting) {
      charIdx++;
      roleEl.innerHTML = current.slice(0, charIdx) + cursorSpan;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
    } else {
      charIdx--;
      roleEl.innerHTML = current.slice(0, charIdx) + cursorSpan;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 50 : 90);
  }

  setTimeout(typeRole, 1500);
}

// =====================
// NAVBAR SCROLL STYLE
// =====================
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.background = "rgba(7, 11, 20, 0.92)";
    nav.style.boxShadow  = "0 1px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.background = "rgba(7, 11, 20, 0.75)";
    nav.style.boxShadow  = "none";
  }
}, { passive: true });

// trigger once on load
window.dispatchEvent(new Event("scroll"));


