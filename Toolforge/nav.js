/* TOOLFORGE OMNI-NAV - Bulletproof Version */

const categories = {
    "growth": ["Bio Generator", "Giveaway Winner Picker", "Caption Pro", "Clickbait Title Grader", "Engagement Calculator", "Grid Previewer", "Hashtag Stacker", "Insta Caption Crafter", "LinkedIn Authority Generator", "Pinterest Description Generator", "Podcast Blurb Generator", "Safe zone checker", "Script timer", "Thumbnail Previewer", "TikTok Hook Generator", "Tweet Thread Starter", "Twitch Stream Namer", "Video Script Intros", "Viral Hook Generator", "youtube brainstormer", "pfp glow ring"],
    "technical": ["Audit Checklist", "Base64 Studio", "Canonical Tag Generator", "Color Converter", "Gradient Gen", "Html Entity Studio", "Js Minifier", "Json Formatter", "Keyword Density Checker", "Lorem Ipsum", "Markdown Converter", "Meta Tag Gen", "Mobile Tester", "Px to Rem Converter", "Redirect Generator", "Robots Generator", "Schema Generator", "SERP Simulator", "URL Encoder", "XML Sitemap Generator"],
    "Generators": ["SaaS Name Generator", "Clan name generator", "Fantasy name generator", "Gamer Name generator", "Aesthetic Username generator", "Pet Name generator", "podcast name generator", "discord server namer", "clothing brand namer", "alias & persona generator"]
};

const toolLibrary = [];
Object.keys(categories).forEach(folder => {
    categories[folder].forEach(name => {
        const slug = name.toLowerCase().replace(/ /g, "-") + ".html";
        toolLibrary.push({ name: name, link: `/${folder}/${slug}`, folder: folder });
    });
});

const searchUI = `
<div id="searchWrapper">
    <input type="text" id="toolSearch" placeholder="Search 50+ tools..." autocomplete="off">
    <div id="searchResults"></div>
</div>
<style>
    #searchWrapper { width: 90%; max-width: 550px; margin: 20px auto; position: relative; z-index: 10000; }
    #toolSearch { 
        width: 100%; padding: 15px 25px; background: rgba(15, 23, 42, 0.7); 
        border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 50px;
        color: #fff; outline: none; backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
        transition: 0.4s ease; font-size: 16px; box-sizing: border-box;
    }
    #toolSearch:focus { border-color: #6366f1; box-shadow: 0 0 30px rgba(99, 102, 241, 0.3); background: rgba(15, 23, 42, 0.9); }
    #searchResults { 
        position: absolute; top: calc(100% + 12px); left: 0; right: 0; 
        background: #0f172a; border: 1px solid #1e293b; border-radius: 50px; 
        max-height: 400px; overflow-y: auto; display: none; 
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7); z-index: 10001; overflow-y: overlay;
        scrollbar-width: thin;
        scrollbar-color: #334155 transparent;
    }
        #searchResults::-webkit-scrollbar { 
        width: 8px; /* Keep it thin and subtle */
    }

    #searchResults::-webkit-scrollbar-track { 
        background: transparent; /* Makes the track invisible so the corners stay clean */
        margin: 15px; /* Crucial: Stops the scrollbar from hitting the rounded top/bottom */
    }

    #searchResults::-webkit-scrollbar-thumb { 
        background: rgba(99, 102, 241, 0.3); /* Uses your primary theme color with transparency */
        border-radius: 50px; /* Makes the actual scroll handle a pill shape */
        border: 2px solid #0f172a; /* Adds "padding" around the handle to make it look floating */
    }

    #searchResults::-webkit-scrollbar-thumb:hover { 
        background: rgba(99, 102, 241, 0.6); /* Brightens on hover */
    }
    .search-item { display: block; padding: 16px 24px; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.03); border-radius: 12px; margin: 4px; transition: 0.2s; }
    .search-item:hover { background: rgba(99, 102, 241, 0.1); padding-left: 32px; }
    .search-item b { color: #fff; display: block; font-size: 1rem; }
    .search-item span { color: #6366f1; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; }
    .search-focus-mode { opacity: 0.1 !important; filter: blur(8px); pointer-events: none; transition: 0.4s; }
    .search-item:active {
    background: rgba(99, 102, 241, 0.2);
    transform: scale(0.98);}
    @media (max-width: 600px) {
    #searchWrapper { 
        width: 95%; /* Give it more horizontal space on small screens */
        margin: 15px auto; 
    }

    #toolSearch {
        padding: 12px 20px; /* Slightly slimmer for mobile height */
        font-size: 15px; /* Prevents iOS from auto-zooming on the input */
    }

    #searchResults {
        width: 100%;
        border-radius: 20px; /* Slightly tighter radius for smaller screens */
        max-height: 60vh; /* Allow it to take up more vertical space on a phone */
    }

    .search-item {
        padding: 14px 18px; /* Bigger tap target for thumbs */
        margin: 6px; /* Space them out so you don't accidental-click the wrong tool */
    }

    .search-item b {
        font-size: 0.95rem; /* Stop text from wrapping too early */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; /* Adds "..." if the tool name is too long */
    }
}
</style>
`;

function initOmniSearch() {
    console.log("ToolForge Search: Initializing...");
    
    // Attempt to find the container
    const nav = document.querySelector('.nav-container') || document.body;
    
    if (nav) {
        const container = document.createElement('div');
        container.innerHTML = searchUI;
        nav.prepend(container);
        console.log("ToolForge Search: Successfully injected into", nav.tagName);
    } else {
        console.error("ToolForge Search: Could not find .nav-container or body!");
        return;
    }

    const input = document.getElementById('toolSearch');
    const results = document.getElementById('searchResults');
    const contentToFade = document.querySelector('.grid') || document.querySelector('.tool-card');

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        
        if (term.length > 0) {
            const matches = toolLibrary
    .filter(t => {
        const name = t.name.toLowerCase();
        // Exact match OR typo match (Distance <= 2)
        return name.includes(term) || getFuzzyMatch(term, name.substring(0, term.length + 2)) <= 2;
    })
    .slice(0, 8);

            if (matches.length > 0) {
                // Show matching tools
                results.innerHTML = matches.map(t => `
                    <a href="${t.link}" class="search-item">
                        <b>${t.name}</b>
                        <span>${t.folder} →</span>
                    </a>`).join('');
            } else {
                // THE "NO RESULTS" STATE
                results.innerHTML = `
                    <div style="padding: 30px 20px; text-align: center; color: #94a3b8;">
                        <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                        <p style="margin: 0; font-size: 0.9rem;">No tools found for "<b>${term}</b>"</p>
                        <p style="margin-top: 5px; font-size: 0.75rem; opacity: 0.6;">Try a different keyword or category.</p>
                    </div>
                `;
            }
            
            results.style.display = 'block';
            if(contentToFade) contentToFade.classList.add('search-focus-mode');
        } else {
            results.style.display = 'none';
            if(contentToFade) contentToFade.classList.remove('search-focus-mode');
        }
    });

    document.addEventListener('click', (e) => {
        if (!document.getElementById('searchWrapper').contains(e.target)) {
            results.style.display = 'none';
            if(contentToFade) contentToFade.classList.remove('search-focus-mode');
        }
    });
}

// THIS IS THE FIX: Wait for everything to be ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOmniSearch);
} else {
    initOmniSearch();
}
function getFuzzyMatch(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
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