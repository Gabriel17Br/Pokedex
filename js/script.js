const container = document.getElementById("container")
const loadMoreBtn = document.getElementById("loadMoreBtn")
const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")

let offset = 0
const limit = 12

async function buscarDetalhes(url) {
  const resposta = await fetch(url)
  return await resposta.json()
}

async function listarPokemons() {
  try {
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
    const dados = await resposta.json()

    for (let pokemon of dados.results) {
      const detalhe = await buscarDetalhes(pokemon.url)

      criarCard(detalhe)
    }

    offset += limit

  } catch (erro) {
    container.innerHTML = "<p style='color:white;'>Erro ao carregar</p>"
  }
}

function criarCard(detalhe) {
  const card = document.createElement("div")
  card.classList.add("card")

  card.innerHTML = `
    <img src="${detalhe.sprites.front_default}">
    <h3>${detalhe.name}</h3>
    <p>ID: ${detalhe.id}</p>
    <p>Tipo: ${detalhe.types[0].type.name}</p>
  `

  container.appendChild(card)
}

async function buscarPokemon() {
  const nome = searchInput.value.toLowerCase()

  if (nome) return

  container.innerHTML = ""
  offset = 0

  try {
    const resposta = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nome}`
    )

    if (!resposta.ok) {
      throw new Error("Não encontrado")
    }

    const detalhe = await resposta.json()

    criarCard(detalhe)

  } catch {
    container.innerHTML = "<p style='color:white;'>Pokémon não encontrado</p>"
  }
}

loadMoreBtn.addEventListener("click", listarPokemons)
searchBtn.addEventListener("click", buscarPokemon)

listarPokemons()


 const tableBody = document.getElementById("foto-table-body");

    function buscarPersonagens() {
        const nome = document.getElementById("searchInput").value;  
        const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

        tableBody.innerHTML = ""; // limpa tabela antes de nova busca

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Personagem não encontrado");
                }
                return response.json();
            })
            .then(data => {
                data.results.forEach(pokemon => {
                    const row = document.createElement(card);

                    row.innerHTML = `
    <img src="${detalhe.sprites.front_default}">
    <h3>${detalhe.name}</h3>
    <p>ID: ${detalhe.id}</p>
    <p>Tipo: ${detalhe.types[0].type.name}</p>
  `
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4">Nenhum pokemon encontrado.</td>
                    </tr>
                `;
            });
    }

    // Carrega personagens ao abrir a página
    //buscarPersonagens();
