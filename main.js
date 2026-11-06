let page = 1;

const container = document.getElementById("breweries");
const loading = document.getElementById("loading");

async function getBreweries() {
    loading.style.display = "block";

    const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=10`);
    const data = await res.json();

    loading.style.display = "none";

    showBreweries(data);

    document.getElementById("page").textContent = "Страница " + page;
}

function showBreweries(data) {
    container.innerHTML = "";

    data.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.city}</p>
            <a href="${item.website_url || '#'}">${item.website_url || ''}</a>
        `;

        container.appendChild(card);
    });
}

document.getElementById("nextBtn").onclick = function() {
    page++;
    getBreweries();
};

document.getElementById("prevBtn").onclick = function() {
    if (page > 1) {
        page--;
        getBreweries();
    }
};

document.getElementById("searchBtn").onclick = async function() {
    const name = document.getElementById("searchInput").value;

    loading.style.display = "block";

    const res = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${encodeURIComponent(name)}`);
    const data = await res.json();

    loading.style.display = "none";

    showBreweries(data);
};

getBreweries();