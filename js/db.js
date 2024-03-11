const apiKey = 'ff05728585944d398909cc8c684f6ed2'
const baseURL = 'https://api.rawg.io/api'

document.addEventListener('DOMContentLoaded', async() => {
    let exibirJogos = document.querySelector('#jogos-lista')

    //fazendo a requisição de API após carregar a página
    try{
        const resposta = await fetch('https://sheetdb.io/api/v1/2pgmcm2ya356c')

        if (!resposta.ok) {
            throw new Error(`Erro de requisição: ${resposta.status} - ${resposta.statusText}`)
            //verificando respostas do servidor
        }
        const data = await resposta.json()

        const jogos = data.map(jogo => ({
            imagem: jogo.background_image,
            nome: jogo.name,
            lancamento: jogo.released,
            genero: jogo.genres
        }))

        exibirJogos = jogos.map(jogo => {
            return `
            <div class="jogo-unico">
                <img class="imagemJogo" src='   ${jogo.imagem}'>
                <p   class="font-title-2"     > ${jogo.nome}</p>
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