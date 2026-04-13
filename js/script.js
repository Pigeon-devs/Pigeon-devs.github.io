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
    const res = await fetch("stories.json");
    allStories = await res.json();
    renderStories();
}


let showAllP = false;

function renderStories() {
    const grid = document.getElementById("storyGrid");
    console.log(allStories)

    grid.innerHTML = "";

    const vs = showAllP ? allStories : allStories.slice(0, 10);

    vs.forEach(v => {
        const imgPathP = `images/people/person${v.id}.jpg`;
        const storyHtml = v.story.map(line => `${line}`).join("<br>");


        grid.innerHTML += `
            <div class="story-card">
                <div class="story-img-wrapper">
                    <img src="${imgPathP}">
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
    const res = await fetch("victims.json");
    allVictims = await res.json();
    renderVictims();
}

function renderVictims() {
    const grid = document.getElementById("victimGrid");
    const btn = document.getElementById("toggleBtn");

    grid.innerHTML = "";

    const visibleVictims = showAll ? allVictims : allVictims.slice(0, 10);

    visibleVictims.forEach(v => {
        const imgPath = `images/people/p${v.id}.jpg`;


        grid.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 victim-wrapper">
        <div class="victim-card w-100">

            <img src="${imgPath}"
                 onerror="this.src='images/fallback.jpg'">

            <div class="victim-text">
                <div class="victim-name">${v.name}</div>
                <div class="victim-extra">${v.extra_info || ""}</div>
                <div class="victim-age">Age: ${v.age || "--"}</div>
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
        btn.textContent = showAll ? "Show Less" : "Show More";
    }
}

document.getElementById("toggleBtn").addEventListener("click", () => {
    showAll = !showAll;
    renderVictims();
});

loadStories();
loadVictims();
