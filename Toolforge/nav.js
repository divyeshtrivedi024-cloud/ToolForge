/* TOOLFORGE OMNI-NAV - Master Controller */

const categories = {
    "growth": ["Bio Generator", "Giveaway Winner Picker", "Caption Pro", "Clickbait Title Grader", "Engagement Calculator", "Grid Previewer", "Hashtag Stacker", "Insta Caption Crafter", "LinkedIn Authority Generator", "Pinterest Description Generator", "Podcast Blurb Generator", "Safe zone checker", "Script timer", "Thumbnail Previewer", "TikTok Hook Generator", "Tweet Thread Starter", "Twitch Stream Namer", "Video Script Intros", "Viral Hook Generator", "youtube brainstormer", "pfp glow ring"],
    "technical": ["Audit Checklist", "Base64 Studio", "Canonical Tag Generator", "Color Converter", "Gradient Gen", "Html Entity Studio", "Js Minifier", "Json Formatter", "Keyword Density Checker", "Lorem Ipsum", "Markdown Converter", "Meta Tag Gen", "Mobile Tester", "Px to Rem Converter", "Redirect Generator", "Robots Generator", "Schema Generator", "SERP Simulator", "URL Encoder", "XML Sitemap Generator"],
    "generators": ["SaaS Name Generator", "Clan name generator", "Fantasy name generator", "Gamer Name generator", "Aesthetic Username generator", "Pet Name generator", "podcast name generator", "discord server namer", "clothing brand namer", "alias & persona generator"]
};

// 1. DATA PREP
const toolLibrary = [];
Object.keys(categories).forEach(folder => {
    categories[folder].forEach(name => {
        const slug = name.toLowerCase().replace(/ /g, "-") + ".html";
        toolLibrary.push({ name: name, link: `/${folder}/${slug}`, folder: folder });
    });
});

const globalUI = `
<style>
    /* 1. Updated Header with Hide/Reveal Logic */
.tf-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 10px 20px;
    width: 100%; 
    box-sizing: border-box;
    background: #05070a; 
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: sticky; 
    top: 0; 
    z-index: 9999;
    transition: transform 0.3s ease-in-out; /* Smooth slide */
}

/* The class we will toggle via JS */
.tf-header.nav-hidden {
    transform: translateY(-100%);
}

/* 2. Gradient Logo that uses the page's --primary variable */
.logo { 
    font-family: 'Outfit'; 
    font-size: 1.2rem;
    font-weight: 800; 
    /* This creates the blend: it starts white and fades into your category's primary color */
    background: linear-gradient(135deg, #ffffff 30%, var(--primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none; 
    letter-spacing: -1px; 
    flex-shrink: 0;
}

.logo:hover { 
    /* This mimics the landing page "Bluish/Cyan" blend with the tool theme */
    background: linear-gradient(90deg, #00f2fe, var(--primary), #4facfe);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: tf-shine 1.5s linear infinite;
    filter: drop-shadow(0 0 12px var(--primary));
    transform: scale(1.02);
}

@keyframes tf-shine {
    to { background-position: 200% center; }
}
    /* 2. THE STEALTH SEARCH BOX (Apple Style) */
    #searchWrapper { 
        position: relative; 
        width: 100%; 
        max-width: 250px; /* Limits search size so it fits next to logo */
        height: 36px;    /* Slimmer height */
        z-index: 10000; 
    }

    #toolSearch { 
        width: 100%; 
        height: 100%;
        background: rgba(255, 255, 255, 0.05); 
        border: 1px solid rgba(255, 255, 255, 0.1); 
        border-radius: 50px; 
        color: #f1f5f9; 
        padding: 0 10px 0 35px; 
        font-size: 0.85rem; 
        outline: none; 
        box-sizing: border-box;
    }

    /* Adaptive Focus: Blends with Pink, Blue, or Amber automatically */
    #toolSearch:focus { 
        border-color: var(--primary); 
        background: #000; 
        /* Adds a very subtle "aura" of the category color */
        box-shadow: 0 0 20px -5px var(--primary); 
    }

    /* Icon also matches the theme */
    #searchWrapper::before {
        content: ""; position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        width: 14px; height: 14px;
        /* Using currentColor or masking to let the icon match the theme */
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat center;
        opacity: 0.4; 
        filter: drop-shadow(0 0 2px var(--primary)); /* Subtle glow on the icon */
        pointer-events: none;
    }
    
    .search-item span { 
        color: var(--primary); /* Category labels in search results now match the theme */
        font-size: 0.6rem; 
        text-transform: uppercase; 
        font-weight: 900; 
    }

    /* Minimalist Search Icon (SVG for sharpness) */
    #searchWrapper::before {
        content: ""; position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        width: 14px; height: 14px;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat center;
        opacity: 0.6; pointer-events: none;
    }

    /* 3. PREMIUM RESULTS DROPDOWN */
    #searchResults { 
        position: absolute; top: calc(100% + 8px); left: 0; right: 0; 
        background: #05070a; border: 1px solid #1e293b; border-radius: 20px; 
        max-height: 450px; overflow-y: auto; display: none; 
        box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10001;
        animation: premiumFade 0.2s ease-out;
    }

    @keyframes premiumFade {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .search-item { 
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 20px; text-decoration: none; 
        border-bottom: 1px solid #0f172a; transition: 0.2s; 
    }
    .search-item:hover { background: #0f172a; }
    .search-item b { color: #f1f5f9; font-size: 0.9rem; font-weight: 500; }
    .search-item span { color: var(--primary); font-size: 0.6rem; text-transform: uppercase; font-weight: 900; }

    /* Clean scrollbar */
    #searchResults::-webkit-scrollbar { width: 4px; }
    #searchResults::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }

    /* 2. MOBILE OVERRIDE - Keep them side-by-side */
    @media (max-width: 600px) {
        .tf-header { 
            padding: 10px 15px; /* Even tighter for small screens */
            flex-direction: row !important; /* Forces side-by-side */
        }
        .logo {
            font-size: 1.1rem; /* Tiny bit smaller to guarantee fit */
        }
        #searchWrapper {
            max-width: 160px; /* Shrinks search box on small phones */
        }
    }
</style>

<header class="tf-header">
    <a href="/index.html" class="logo">ToolForge</a>
    <div id="searchWrapper">
        <input type="text" id="toolSearch" placeholder="Search..." autocomplete="off">
        <div id="searchResults"></div>
    </div>
</header>
`;

const footerUI = `
<footer class="tf-footer">
    <div class="footer-content">
        <div>
            <h3 style="color:var(--primary); font-family:'Outfit'">ToolForge</h3>
            <p>The web’s fastest utility engine. Built for performance.</p>
        </div>
        <div>
            <h4 style="color:#fff">Platform</h4>
            <p><a href="/privacy.html" style="color:inherit; text-decoration:none">Privacy Policy</a></p>
        </div>
        <div>
            <h4 style="color:#fff">Contact</h4>
            <p><a href="mailto:growthdriven024@gmail.com" style="color:var(--primary); text-decoration:none">growthdriven024@gmail.com</a></p>
        </div>
    </div>
    <div class="footer-bottom">© 2026 ToolForge Engine. All processing is 100% Client-Side.</div>
</footer>
`;

// 3. INITIALIZATION
function initToolForge() {
    // Inject Header & Search into .nav-container
    const nav = document.querySelector('.nav-container');
    if (nav) nav.innerHTML = globalUI;

    // Inject Footer into footer tag
    const footerTag = document.querySelector('footer');
    if (footerTag) footerTag.innerHTML = footerUI;

    setupSearchLogic();
}

// 4. SEARCH LOGIC (Keeping your original logic)
function setupSearchLogic() {
    const input = document.getElementById('toolSearch');
    const results = document.getElementById('searchResults');
    const contentToFade = document.querySelector('.tool-card');

    if(!input) return;

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        if (term.length > 0) {
            const matches = toolLibrary.filter(t => {
                const name = t.name.toLowerCase();
                return name.includes(term) || getFuzzyMatch(term, name.substring(0, term.length + 2)) <= 2;
            }).slice(0, 8);

            results.innerHTML = matches.length > 0 ? 
                matches.map(t => `<a href="${t.link}" class="search-item"><b>${t.name}</b><span>${t.folder} →</span></a>`).join('') :
                `<div style="padding:20px; text-align:center">No tools found</div>`;
            
            results.style.display = 'block';
            if(contentToFade) contentToFade.style.opacity = "0.2";
        } else {
            results.style.display = 'none';
            if(contentToFade) contentToFade.style.opacity = "1";
        }
    });

    // Close results on outside click
    document.addEventListener('click', (e) => {
        if (!document.getElementById('searchWrapper').contains(e.target)) {
            results.style.display = 'none';
            if(contentToFade) contentToFade.style.opacity = "1";
        }
    });
}

// FUZZY MATCH LOGIC (Your exact function)
function getFuzzyMatch(s1, s2) {
    s1 = s1.toLowerCase(); s2 = s2.toLowerCase();
    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i == 0) costs[j] = j;
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                    newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

document.addEventListener("DOMContentLoaded", initToolForge);
function setupSmartHeader() {
    const header = document.querySelector('.tf-header');
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (!header) return;
        
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Scrolling Down - Hide Header
            header.classList.add("nav-hidden");
        } else {
            // Scrolling Up - Show Header
            header.classList.remove("nav-hidden");
        }
        
        lastScrollY = currentScrollY;
    });
}

// Update your init function to include this
function initToolForge() {
    const nav = document.querySelector('.nav-container');
    if (nav) nav.innerHTML = globalUI;

    const footerTag = document.querySelector('footer');
    if (footerTag) footerTag.innerHTML = footerUI;

    setupSearchLogic();
    setupSmartHeader(); // <--- Add this line
}