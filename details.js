document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://rickandmortyapi.com/api/character";
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get("id");
    const characterContainer = document.getElementById("character-container");

   
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";  
    });

    
    if (characterId) {
        fetch(`${API_URL}/${characterId}`)
            .then(res => res.json())
            .then(character => {
                const card = createCharacterCard(character);
                characterContainer.appendChild(card);
            })
            .catch(error => {
                console.error("Erro ao buscar o personagem:", error);
                characterContainer.innerHTML = "<p>Erro ao carregar as informações do personagem.</p>";
            });
    } else {
        characterContainer.innerHTML = "<p>Personagem não encontrado.</p>";
    }

    function createCharacterCard(character) {
        const card = document.createElement("div");
        card.classList.add("details-card"); 

        
        card.innerHTML = `
            <div class="details-content">
                <img src="${character.image}" alt="${character.name}" class="character-image">
                <div class="character-info">
                    <h4>${character.name}</h4>
                    <p><strong>Status:</strong> ${character.status}</p>
                    <p><strong>Gênero:</strong> ${character.gender}</p>
                    <p><strong>Localização:</strong> ${character.location.name}</p>
                    <p><strong>Episódios:</strong> ${character.episode.map(ep => ep.split("/").pop()).join(", ")}</p>
                </div>
            </div>
        `;
        
        return card;
    }
});