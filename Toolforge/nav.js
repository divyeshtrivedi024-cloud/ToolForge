/* Brixe OMNI-NAV - Master Controller (RESTORED PRESET) */

const categories = {
    "growth": ["Bio Generator", "Giveaway Winner Picker", "Caption Pro", "Clickbait Title Grader", "Engagement Calculator", "Grid Previewer", "Hashtag Stacker", "Insta Caption Crafter", "LinkedIn Authority Generator", "Pinterest Description Generator", "Podcast Blurb Generator", "Safe zone checker", "Script timer", "Thumbnail Previewer", "TikTok Hook Generator", "Tweet Thread Starter", "Twitch Stream Namer", "Video Script Intros", "Viral Hook Generator", "youtube brainstormer", "pfp glow ring"],
    "technical": ["Audit Checklist", "Base64 Studio", "Canonical Tag Generator", "Color Converter", "Gradient Gen", "Html Entity Studio", "Js Minifier", "Json Formatter", "Keyword Density Checker", "Lorem Ipsum", "Markdown Converter", "Meta Tag Gen", "Mobile Tester", "Px to Rem Converter", "Redirect Generator", "Robots Generator", "Schema Generator", "SERP Simulator", "URL Encoder", "XML Sitemap Generator"],
    "generators": ["SaaS Name Generator", "Clan name generator", "Fantasy name generator", "Gamer Name generator", "Aesthetic Username generator", "Pet Name generator", "podcast name generator", "discord server namer", "clothing brand namer", "alias & persona generator"]
};

const toolLibrary = [];
Object.keys(categories).forEach(folder => {
    categories[folder].forEach(name => {
        const slug = name.toLowerCase().replace(/ /g, "-") + ".html";
        toolLibrary.push({ name: name, link: `/${folder}/${slug}`, folder: folder });
    });
});

const globalUI = `
<style>
/* 1. RESTORED HEADER & LOGO ANIMATIONS */
.tf-header { 
    display: flex; justify-content: space-between; align-items: center; 
    padding: 10px 20px; width: 100%; box-sizing: border-box;
    background: #05070a; border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: sticky; top: 0; z-index: 9999;
    transition: transform 0.5s ease-in-out;
}
.tf-header.nav-hidden { transform: translateY(-100%); }

.logo { 
    font-family: 'Outfit'; font-size: 1.2rem; font-weight: 800; 
    background: linear-gradient(135deg, #ffffff 30%, var(--primary) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    text-decoration: none; letter-spacing: -1px; flex-shrink: 0;
}
.logo:hover { 
    background: linear-gradient(90deg, #00f2fe, var(--primary), #4facfe);
    background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    animation: tf-shine 1.5s linear infinite;
    filter: drop-shadow(0 0 12px var(--primary)); transform: scale(1.02);
}
@keyframes tf-shine { to { background-position: 200% center; } }

/* 2. THE STEALTH SEARCH BOX */
#searchWrapper { position: relative; width: 100%; max-width: 250px; height: 36px; z-index: 10000; }
#toolSearch { 
    width: 100%; height: 100%; background: rgba(255, 255, 255, 0.05); 
    border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 50px; 
    color: #f1f5f9; padding: 0 10px 0 35px; font-size: 0.85rem; outline: none; box-sizing: border-box;
}
#toolSearch:focus { 
    border-color: var(--primary); background: #000; 
    box-shadow: 0 0 20px -5px var(--primary);
}
#searchWrapper::before {
    content: ""; position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    width: 14px; height: 14px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>') no-repeat center;
    opacity: 0.4; filter: drop-shadow(0 0 2px var(--primary)); pointer-events: none;
}

/* 3. PREMIUM RESULTS DROPDOWN */
#searchResults { 
    position: absolute; top: calc(100% + 8px); left: 0; right: 0; 
    background: #05070a; border: 1px solid #1e293b; border-radius: 20px; 
    max-height: 450px; overflow-y: auto; display: none; 
    box-shadow: 0 20px 40px rgba(0,0,0,0.6); z-index: 10001;
    animation: premiumFade 0.5s ease-out;
}
@keyframes premiumFade { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

.search-item { 
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px; text-decoration: none; border-bottom: 1px solid #0f172a; transition: 0.2s;
}
.search-item:hover { background: #0f172a; }
.search-item b { color: #f1f5f9; font-size: 0.9rem; font-weight: 500; }
.search-item span { color: var(--primary); font-size: 0.6rem; text-transform: uppercase; font-weight: 900; }

/* 4. MOBILE SHIT-FIXER */
@media (max-width: 600px) {
    .tf-header { padding: 10px 15px; flex-direction: row !important; }
    .logo { font-size: 1.1rem; }
    #searchWrapper { max-width: 160px; }
}
    /* 5. MASTER BACK BUTTON */
/* 5. MASTER SPLIT-NAV CONTROLLER */
.back-btn-wrapper { 
    display: flex;
    justify-content: space-between; /* This pushes them to the sides */
    align-items: center;
    margin: 20px 0 30px 0; 
    width: 100%;
}

.nav-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 800;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 10px 16px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Left Button (Hub) Hover */
.nav-link.left-nav:hover {
    color: var(--primary);
    background: rgba(255, 255, 255, 0.07);
    border-color: var(--primary);
    transform: translateX(-5px);
}

/* Right Button (Home) Hover */
.nav-link.right-nav:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}

.nav-link svg {
    width: 14px;
    height: 14px;
    stroke-width: 3px;
}
    /* OMNI-NAV SPLIT SYSTEM */
.omni-nav-bar { 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    width: 100%;
    pointer-events: auto;
}

.omni-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #64748b;
    text-decoration: none;
    font-size: 0.7rem;
    font-weight: 800;
    transition: all 0.2s ease;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.omni-link:hover {
    color: var(--primary);
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--primary);
}

.omni-link svg { width: 14px; height: 14px; stroke-width: 2.5px; }

/* Right side specific hover */
.omni-home:hover { transform: translateX(3px); color: #fff; }
.omni-hub:hover { transform: translateX(-3px); }
</style>

<header class="tf-header">
    <a href="/" class="logo">Brixe</a>
    <div id="searchWrapper">
        <input type="text" id="toolSearch" placeholder="Search..." autocomplete="off">
        <div id="searchResults"></div>
    </div>
</header>`;

const footerUI = `
<footer class="tf-footer">
    <div class="footer-content" style="display: flex; justify-content: space-between; padding: 40px 20px; max-width: 1200px; margin: 0 auto; flex-wrap: wrap; gap: 30px;">
        <div>
            <h3 style="color:var(--primary); font-family:'Outfit'; margin-bottom: 10px;">Brixe</h3>
            <p style="opacity: 0.7; font-size: 0.9rem;">The web’s fastest utility engine. Built for performance.</p>
        </div>
        <div>
            <h4 style="color:#fff; margin-bottom: 10px;">Platform</h4>
            <p><a href="/privacy.html" style="color:inherit; text-decoration:none; opacity: 0.7;">Privacy Policy</a></p>
        </div>
        <div>
            <h4 style="color:#fff; margin-bottom: 10px;">Contact</h4>
            <p><a href="mailto:growthdriven024@gmail.com" style="color:var(--primary); text-decoration:none; font-weight: 700;">growthdriven024@gmail.com</a></p>
        </div>
    </div>
    <div class="footer-bottom" style="text-align: center; padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.75rem; opacity: 0.5;">© 2026 Brixe Engine. All processing is 100% Client-Side.</div>
</footer>`;


const seoUI = `
<section class="seo-authority-section" style="max-width: 1000px; margin: 100px auto 40px; padding: 60px 20px; border-top: 1px solid #1e293b; color: #94a3b8; line-height: 1.8; font-size: 0.95rem;">
    
    <div style="margin-bottom: 50px;">
        <h2 style="font-family: 'Outfit'; color: #fff; font-size: 2.2rem; margin-bottom: 25px; letter-spacing: -1px;">
            The Architecture of <span style="color: var(--primary);">High-Performance Web Utilities</span>
        </h2>
        <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 20px;">
            In the modern digital landscape, the tools we use define the speed of our innovation. <strong>Brixe</strong> was conceived as a response to the bloated, ad-heavy utility sites of the past decade. We provide a streamlined, <strong>privacy-centric infrastructure</strong> for developers, digital marketers, and creative entrepreneurs who require precision without compromise.
        </p>
        <p>
            Unlike traditional platforms that rely on server-side processing—which introduces latency and potential security vulnerabilities—the Brixe engine operates on a <strong>decentralized execution model</strong>. By leveraging the power of modern browser APIs and ES6+ JavaScript, every calculation, formatting task, and generation happens locally on your hardware. This "Client-Side First" philosophy ensures that your sensitive data—from proprietary source code to brand-new startup identities—never leaves the safety of your local environment.
        </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-bottom: 50px;">
        <div>
            <h3 style="font-family: 'Outfit'; color: var(--primary); font-size: 1.3rem; margin-bottom: 15px;">Why Data Sovereignty Matters</h3>
            <p style="font-size: 0.9rem;">
                Every time you paste code or text into a standard online tool, you risk your data being logged, analyzed, or sold. Brixe eliminates this risk entirely. Our <strong>Zero-Log Policy</strong> isn't just a promise; it's a technical reality enforced by our architecture. Because there is no back-end database receiving your inputs, your intellectual property remains 100% yours. This makes Brixe the gold standard for enterprise-level developers and privacy-conscious creators.
            </p>
        </div>
        <div>
            <h3 style="font-family: 'Outfit'; color: var(--primary); font-size: 1.3rem; margin-bottom: 15px;">Optimized for Digital Agility</h3>
            <p style="font-size: 0.9rem;">
                Speed is the ultimate feature. By stripping away heavy frameworks and tracking scripts, we’ve achieved <strong>near-instantaneous load times</strong>. Our tools are designed with a "Gen Z" aesthetic—minimalist, high-contrast, and mobile-responsive—ensuring that your workflow isn't interrupted, whether you're at a desktop workstation or optimizing on the go. Brixe isn't just a website; it's a productivity multiplier designed for the fast-paced 2026 web ecosystem.
            </p>
        </div>
    </div>

    <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid #1e293b; padding: 40px; border-radius: 24px; margin-bottom: 40px;">
        <h3 style="font-family: 'Outfit'; color: #fff; margin-bottom: 20px; font-size: 1.4rem;">The Brixe Technical Edge</h3>
        <p style="margin-bottom: 20px; font-size: 0.9rem;">
            Our suite is divided into three specialized hubs to cater to every facet of the digital journey:
        </p>
        <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; font-size: 0.85rem;">
            <li style="display: flex; flex-direction: column; gap: 5px;">
                <strong style="color: var(--primary);">Technical Hub:</strong>
                <span>Advanced JSON formatting, CSS minification, and SEO audit tools for hardened development workflows.</span>
            </li>
            <li style="display: flex; flex-direction: column; gap: 5px;">
                <strong style="color: var(--primary);">Growth Hub:</strong>
                <span>Strategic social media content generators, engagement calculators, and viral hook engines for modern marketers.</span>
            </li>
            <li style="display: flex; flex-direction: column; gap: 5px;">
                <strong style="color: var(--primary);">Generator Hub:</strong>
                <span>AI-powered naming utilities for SaaS startups, gaming personas, and brand identities.</span>
            </li>
        </ul>
    </div>

    <p style="text-align: center; color: #475569; font-size: 0.85rem; max-width: 700px; margin: 0 auto;">
        By choosing Brixe, you are supporting a faster, more private, and more beautiful internet. We are constantly expanding our library of tools to meet the evolving needs of the global creator community. 
        <strong>100% Free. 100% Secure. 100% Client-Side.</strong>
    </p>

</section>`;


function initBrixe() {
    // 1. Header & Footer Injection
    const navContainer = document.querySelector('.nav-container') || document.querySelector('header');
    if (navContainer) navContainer.innerHTML = globalUI;

    const footerTag = document.querySelector('footer');
    if (footerTag) footerTag.innerHTML = footerUI;

    // 2. SEO SECTION INJECTION (The big text block)
    if (footerTag) {
        footerTag.insertAdjacentHTML('beforebegin', seoUI);
    }

    // 3. META TAG INJECTION (The "Invisible" SEO)
    injectSmartSEO();

    // 2. SAFE SPLIT-NAV INJECTION
    const container = document.querySelector('.container');
    if (container) {
        // Remove ONLY the omni-nav if it already exists (prevents duplicates)
        const existingNav = document.getElementById('omni-nav-trigger');
        if (existingNav) existingNav.remove();

        const path = window.location.pathname;
       
        // Replace the old hubDest logic with this:
        if (path !== "/" && path !== "/index.html" && path.length > 1) {
let hubDest = "/"; // Default to root
let hubLabel = "All Tools";

if (path.includes('/growth/')) { hubDest = "/growth/"; hubLabel = "Growth Hub"; }
else if (path.includes('/technical/')) { hubDest = "/technical/"; hubLabel = "Technical Hub"; }
else if (path.includes('/generators/')) { hubDest = "/generators/"; hubLabel = "Generator Hub"; }

            const splitNavHTML = `
                <div id="omni-nav-trigger" class="omni-nav-bar">
                    <a href="${hubDest}" class="omni-link omni-hub">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        <span>${hubLabel}</span>
                    </a>
                    <a href="/" class="omni-link omni-home">
                        <span>Home</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </a>
                </div>
            `;
            // Insert at the top of the container
            container.insertAdjacentHTML('afterbegin', splitNavHTML);
        }
    }

    setupSearchLogic();
    setupSmartHeader();
    applyThemeDetection();
}

function setupSmartHeader() {
    const header = document.querySelector('.tf-header');
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        if (!header) return;
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add("nav-hidden");
        } else {
            header.classList.remove("nav-hidden");
        }
        lastScrollY = currentScrollY;
    });
}

function setupSearchLogic() {
    const input = document.getElementById('toolSearch');
    const results = document.getElementById('searchResults');
    const contentToFade = document.querySelector('.tool-wrapper') || document.querySelector('.tool-card');

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

    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('searchWrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            results.style.display = 'none';
            if(contentToFade) contentToFade.style.opacity = "1";
        }
    });
}

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

function injectSmartSEO() {
    const pageTitle = document.title;
    const currentUrl = window.location.href;
    const toolName = pageTitle.split('|')[0].trim();
    
    // Detect Category based on Folder
    let categoryVerb = "Utility"; // Default
    if (currentUrl.includes('/generators/')) categoryVerb = "Generator";
    if (currentUrl.includes('/technical/')) categoryVerb = "Developer Tool";
    if (currentUrl.includes('/growth/')) categoryVerb = "Growth Engine";

    // 1. Dynamic Meta Description
    if (!document.querySelector('meta[name="description"]')) {
        const meta = document.createElement('meta');
        meta.name = "description";
        // This creates: "Use the JSON Formatter on Brixe. A premium, private Developer Tool..."
        meta.content = `Use the ${toolName} on Brixe. A premium, 100% private ${categoryVerb} built for speed and data sovereignty. No data leaves your browser.`;
        document.head.appendChild(meta);
    }

    // 2. Canonical Tag (Crucial for avoiding "Dead Weight" duplicate content)
    if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link');
        canonical.rel = "canonical";
        canonical.href = currentUrl.split('?')[0].split('#')[0]; // Cleans URLs
        document.head.appendChild(canonical);
    }

    // 3. Social Media Tags (Open Graph)
    const ogData = {
        'og:title': `${toolName} | Brixe`,
        'og:description': `Fast, private ${categoryVerb} for modern creators.`,
        'og:url': currentUrl
    };

    Object.entries(ogData).forEach(([prop, content]) => {
        if (!document.querySelector(`meta[property="${prop}"]`)) {
            const m = document.createElement('meta');
            m.setAttribute('property', prop);
            m.content = content;
            document.head.appendChild(m);
        }
    });
}
document.addEventListener("DOMContentLoaded", initBrixe);