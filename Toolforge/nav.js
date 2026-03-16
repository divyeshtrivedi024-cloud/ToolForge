// THE SHARED DATABASE
const categories = {
    "growth": [
        "Bio Generator", 
        "Giveaway Winner Picker", 
        "Caption Pro", 
        "Clickbait Title Grader",
        "Engagement Calculator",
        "Grid Previewer",
        "Hashtag Stacker",
        "Insta Caption Crafter",
        "LinkedIn Authority Generator",
        "Pinterest Description Generator",
        "Podcast Blurb Generator",
        "Safe zone checker",
        "Script timer",
        "Thumbnail Previewer",
        "TikTok Hook Generator",
        "Tweet Thread Starter",
        "Twitch Stream Namer",
        "Video Script Intros",
        "Viral Hook Generator",
        "youtube brainstormer",
        "pfp glow ring"
    ],
    "technical": [
        "Audit Checklist", 
        "Base64 Studio", 
        "Canonical Tag Generator", 
        "Color Converter",
        "Gradient Gen",
        "Html Entity Studio",
        "Js Minifier",
        "Json Formatter",
        "Keyword Density Checker",
        "Lorem Ipsum",
        "Markdown Converter",
        "Meta Tag Gen",
        "Mobile Tester",
        "Px to Rem Converter",
        "Redirect Generator",
        "Robots Generator",
        "Schema Generator",
        "SERP Simulator",
        "URL Encoder",
        "XML Sitemap Generator",
    ],
    "Generators": [
        "SaaS Name Generator",
        "Clan name generator",
        "Fantasy name generator",
        "Gamer Name generator",
        "Aesthetic Username generator",
        "Pet Name generator",
        "podcast name generator",
        "discord server namer",
        "clothing brand namer",
        "alias & persona generator" ,
    ]
};

const toolLibrary = [];
Object.keys(categories).forEach(folder => {
    categories[folder].forEach(name => {
        const slug = name.toLowerCase().replace(/ /g, "-") + ".html";
        toolLibrary.push({
            name: name,
            // The "/" at the start ensures it works from subfolders!
            link: `/${folder}/${slug}`, 
            tags: `${folder} ${name.toLowerCase()}`
        });
    });
});

// THE SEARCH FUNCTION (Can be called by any page)
function initGlobalSearch(inputId, resultsId) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);
    
    if(!input || !results) return;

    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        if (term.length > 0) {
            const matches = toolLibrary.filter(t => t.name.toLowerCase().includes(term));
            results.innerHTML = matches.map(t => `
                <a href="${t.link}" style="display:block; padding:10px; color:white; text-decoration:none; border-bottom:1px solid #1e293b;">
                    <b>${t.name}</b>
                </a>`).join('');
            results.style.display = 'block';
        } else {
            results.style.display = 'none';
        }
    });
}