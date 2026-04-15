const lang = document.documentElement.lang;


/* =========================
   HERO SLIDESHOW (FIXED)
   ========================= */

let slides = document.querySelectorAll(".slide");
let index = 0;
let interval = null;

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
}

function startSlideshow() {
    stopSlideshow(); // prevent stacking bug
    interval = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);
}

function stopSlideshow() {
    if (interval) clearInterval(interval);
}

startSlideshow();

/* stop on user interaction */
document.querySelector(".hero").addEventListener("click", stopSlideshow);


/* =========================
   STORY GRID (SCALABLE)
   ========================= */

let allStories = [];

async function loadStories() {
    let json_file = "json/stories_en.json"
    if (lang === "de") {
        json_file = "json/stories_de.json"
    }
    const res = await fetch(json_file);
    allStories = await res.json();
    renderStories();
}


let showAllP = false;

function renderStories() {
    const grid = document.getElementById("storyGrid");

    grid.innerHTML = "";

    const vs = showAllP ? allStories : allStories.slice(0, 10);

    vs.forEach(v => {
        const imgPathP = `images/webp/people/person${v.id}.webp`;
        const storyHtml = v.story.map(line => `${line}`).join("<br>");


        grid.innerHTML += `
            <div class="story-card">
                <div class="story-img-wrapper">
                    <img src="${imgPathP}" loading="lazy" alt="">
                </div>
                <div class="card-body">
                    <h5>${v.name}, ${v.age || "--"}</h5><hr>
                    <p>${storyHtml}</p>
                </div>
            </div>
`;


    });
}


/* =========================
   VICTIM GRID (SCALABLE)
   ========================= */


let allVictims = [];
let showAll = false;

async function loadVictims() {
    let json_file = "json/victims_en.json"
    if (lang === "de") {
        json_file = "json/victims_de.json"
    }
    const res = await fetch(json_file);
    allVictims = await res.json();
    renderVictims();
}

function renderVictims() {
    const grid = document.getElementById("victimGrid");
    const btn = document.getElementById("toggleBtn");

    let age_preview = "Age"
    let show_more_preview = "Show More"
    let show_less_preview = "Show Less"

    if (lang === "de") {
        age_preview = "Alter"
        show_more_preview = "mehr zeigen"
        show_less_preview = "weniger zeigen"
    }

    grid.innerHTML = "";

    const visibleVictims = showAll ? allVictims : allVictims.slice(0, 10);

    visibleVictims.forEach(v => {
        const imgPath = `images/webp/people/p${v.id}.webp`;


        grid.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 victim-wrapper">
        <div class="victim-card w-100">

            <img src="${imgPath}" loading="lazy" alt="">

            <div class="victim-text">
                <div class="victim-name">${v.name}</div>
                <div class="victim-extra">${v.extra_info || ""}</div>
                <div class="victim-age">${age_preview}: ${v.age || "--"}</div>
            </div>

        </div>
    </div>
`;


    });

    // Toggle button logic
    if (allVictims.length <= 10) {
        btn.style.display = "none";
    } else {
        btn.style.display = "inline-block";
        btn.textContent = showAll ? show_less_preview : show_more_preview;
    }
}

document.getElementById("toggleBtn").addEventListener("click", () => {
    showAll = !showAll;
    renderVictims();
});

loadStories();
loadVictims();
