document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const mainCharacters = [1, 2, 3, 4]; 
    const mainContainer = document.getElementById("main-characters");
    const searchInput = document.getElementById("search");
    const searchResults = document.getElementById("search-results");
    const totalSpan = document.getElementById("total");

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            totalSpan.textContent = data.info.count;
        });

    function fetchCharacter(id) {
        fetch(`${API_URL}/${id}`)
            .then(res => res.json())
            .then(character => {
                const card = createCharacterCard(character);
                mainContainer.appendChild(card);
            });
    }

    mainCharacters.forEach(id => fetchCharacter(id));

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query.length === 0) return;
         
            window.location.href = `search.html?query=${query}`;
        }
    });

    function createCharacterCard(character) {
        const card = document.createElement("div");
        card.classList.add("character-card");
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="character-image">
            <h4>${character.name}</h4>
            <p><strong>Status:</strong> ${character.status}</p>
        `;

      
        card.querySelector('img').addEventListener("click", () => {
            window.location.href = `details.html?id=${character.id}`;
        });

        return card;
    }
});

const characterLink = document.createElement("a");
characterLink.href = `details.html?id=${character.id}`;  


characterLink.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h4>${character.name}</h4>
    <p><strong>Status:</strong> ${character.status}</p>
`;


card.appendChild(characterLink);
