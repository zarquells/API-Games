document.addEventListener('DOMContentLoaded', async() => {

    //fazendo a requisição de API após carregar a página
    try{
        //requisições assíncronas garantindo 'suavidade'' aos solicitar a API
        const resposta = await fetch('https://api.rawg.io/api/games?key=ff05728585944d398909cc8c684f6ed2&page_size=12&page=1')

        if (!resposta.ok) {
            throw new Error(`Erro de requisição: ${resposta.status} - ${resposta.statusText}`)
            //verificando respostas do servidor
        }
        const data = await resposta.json()

        const jogos = data.results.map(jogo => ({
            imagem: jogo.background_image,
            nome: jogo.name,
            lancamento: jogo.released.substring(0, 4),
            genero: jogo.genres.map(genre => genre.name).join(', ')
        }))

        exibirJogos = jogos.map(jogo => {
            return `
            <div class="jogo-unico">
                <img class="imagemJogo" src='   ${jogo.imagem}'>
                <p  class="font-title-2"     > ${jogo.nome}</p>
                <p   class="font-text-1 cor-6">(${jogo.lancamento})</p>
                <p   class="font-text-1 cor-3"> ${jogo.genero}</p>
            </div>
            `
        })

        jogosLista.innerHTML = exibirJogos.join('')

        // console.log(jogos)

    } catch(error) {
        console.error(error)
        //captura de erros e exceções da API exibindo-as no console
    }
})


const pesquisar = document.querySelector('#searchtest')
const buttonsearch = document.querySelector('#pesquisa-btn')
const formPesquisa = document.querySelector('#pesquisa')

formPesquisa.addEventListener('submit', function(event) {
    event.preventDefault()
    searchGames()
})

buttonsearch.addEventListener('click', function(event) {
    event.preventDefault()
    searchGames()
})

async function searchGames() {
    const searchTerm = pesquisar.value // Corrigido para obter o valor do campo de pesquisa

    jogosLista.style.display = "none"
    //fazendo a requisição de API de forma assíncrona
    try {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=ff05728585944d398909cc8c684f6ed2&search=${searchTerm}`)

        if (!resposta.ok) {
            throw new Error(`Erro de requisição: ${resposta.status} - ${resposta.statusText}`)
            //verificando respostas do servidor
        }
        
        const dataSearch = await resposta.json()
        console.log(dataSearch)

        const jogosNovos = dataSearch.results.map(jogo => ({
            imagem: jogo.background_image,
            nome: jogo.name,
            lancamento: jogo.released ? jogo.released.substring(0, 4) : "Indisponível", // Verifica se released é nulo
            genero: jogo.genres.map(genre => genre.name).join(', ')
        }))

        const exibirJogosNovos = jogosNovos.map(jogo => {
            return `
            <div class="jogo-unico">
                <img class="imagemJogo" src='${jogo.imagem}'>
                <p class="font-title-2">${jogo.nome}</p>
                <p class="font-text-1 cor-6">(${jogo.lancamento})</p>
                <p class="font-text-1 cor-3">${jogo.genero}</p>
            </div>
            `
        })

        buscaLista.innerHTML = exibirJogosNovos.join('')

    } catch(error) {
        console.error(error)
        //captura de erros e exceções da API exibindo-as no console
    }  
}
