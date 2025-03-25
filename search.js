document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const searchResults = document.getElementById("search-results");
    const searchInput = document.getElementById("search");
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    
    if (query) {
        fetch(`${API_URL}?name=${query}`)
            .then(res => res.json())
            .then(data => {
                console.log(data); 
                if (data.results && data.results.length > 0) {
                    
                    data.results.forEach(character => {
                        const card = createCharacterCard(character);
                        searchResults.appendChild(card);
                    });
                } else {
                    searchResults.innerHTML = "<p>Nenhum personagem encontrado.</p>";
                }
            })
            .catch(error => {
                searchResults.innerHTML = "<p>Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.</p>";
                console.error("Erro ao buscar dados:", error);
            });
    } else {
        searchResults.innerHTML = "<p>Digite um nome para buscar.</p>";
    }

    
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

       
        const statusBubble = document.createElement("span");
        statusBubble.classList.add("status-bubble");

       
        if (character.status === "Dead") {
            statusBubble.classList.add("status-dead");
        } else if (character.status === "Alive") {
            statusBubble.classList.add("status-alive");
        } else if (character.status === "unknown") {
            statusBubble.classList.add("status-missing"); 
        }

        
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="character-image">
            <h4>${character.name}</h4>
            <p><strong>Status:</strong> ${character.status}</p>
        `;
        
       
        card.querySelector('p').appendChild(statusBubble);

        
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
