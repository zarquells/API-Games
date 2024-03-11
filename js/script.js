const apiKey = 'ff05728585944d398909cc8c684f6ed2'
const baseURL = 'https://api.rawg.io/api'

document.addEventListener('DOMContentLoaded', async() => {
    let exibirJogos = document.querySelector('#jogos-lista')

    //fazendo a requisição de API após carregar a página
    try{
        //requisições assíncronas garantindo ''suavidade'' aos solicitar a API
        // const resposta = await fetch('https://api.rawg.io/api/games?key=ff05728585944d398909cc8c684f6ed2&page_size=9&page=1')

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
                <h1  class="font-title-2"     > ${jogo.nome}</h1>
                <p   class="font-text-1 cor-6">(${jogo.lancamento})</p>
                <p   class="font-text-1 cor-3"> ${jogo.genero}</p>
            </div>
            `
        })

        jogosLista.innerHTML = exibirJogos.join('')

        console.log(jogos)

    } catch(error) {
        console.error(error);
        //captura de erros e exceções da API exibindo-as no console
    }
})