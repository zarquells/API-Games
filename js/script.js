document.addEventListener('DOMContentLoaded', catalogo_padrao())
// ativando a função logo após o carregamento da página

async function catalogo_padrao(){
    try{
        //requisições assíncronas garantindo 'suavidade'' aos solicitar a API
        const resposta = await fetch('https://api.rawg.io/api/games?key=ff05728585944d398909cc8c684f6ed2&page_size=12&page=1')
        if (!resposta.ok) {
            throw new Error(`Erro de requisição: ${resposta.status} - ${resposta.statusText}`)
            //verificando respostas do servidor
        }
        const data = await resposta.json()
        // criando uma variável responsável por receber as respostas do servidor

        const jogos = data.results.map(jogo => ({
            imagem: jogo.background_image,
            nome: jogo.name,
            lancamento: jogo.released.substring(0, 4),
            genero: jogo.genres.map(genre => genre.name).join(', ')
            // organizando essas respostas como objetos('jogo') de propriedades específicas e organizadas dentro da array ('jogos')
            // desta forma o resto do código consegue ser mais intuitivo e com padronização
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
            // mapeando cada objeto e formatando-os para HTML
        })

        jogosLista.innerHTML = exibirJogos.join('')
        // inserindo no hmtl dentro da div('jogosLista')
        
    } catch(error) {
        console.error(error)
        // 'catch error' para saber onde está o erro caso não retorne nada
    }
}



async function searchGames() {
    // nesta função capturamos o termo inserido pelo usuário no campo de pesquisa para manipulá-lo
    const searchTerm = pesquisar.value
    
    jogosLista.style.display = "none";
    buscaLista.style.display = "flex";
    // ocultando o background do catálogo padrão e exbindo agora o da pesquisa
    // dessa forma evitamos sobrecarregar o sistema com muitas requisições e já teremos os jogos padrões carregados e salvos


    //fazendo a requisição de API de forma assíncrona
    try {
        const resposta = await fetch(`https://api.rawg.io/api/games?key=ff05728585944d398909cc8c684f6ed2&search=${searchTerm}`)
        //desta vez colocamos o requisito de pesquisa = &search + termo inserido pelo usuário
        
        if (!resposta.ok) {
            throw new Error(`Erro de requisição: ${resposta.status} - ${resposta.statusText}`)
            //verificando respostas do servidor
        }
        
        const dataSearch = await resposta.json()
        
        const jogosNovos = dataSearch.results.map(jogo => ({
            imagem: jogo.background_image,
            nome: jogo.name,
            lancamento: jogo.released ? jogo.released.substring(0, 4) : "Indisponível", // Verifica se released é nulo
            genero: jogo.genres.map(genre => genre.name).join(', ')
        }))
        // até aqui fora feito o mesmo da function padrão com nomes de variáveis diferentes
        
        const exibirJogosNovos = jogosNovos.map(jogo => {
            return `
            <div class="jogo-unico">
            <img class="imagemJogo" src='${jogo.imagem}'>
            <p class="font-title-2">${jogo.nome}</p>
            <p class="font-text-1 cor-6">(${jogo.lancamento})</p>
            <p class="font-text-1 cor-3">${jogo.genero}</p>
            </div>
            `
            // mesma formatação do function catalogo_padrao
        })
        
        buscaLista.innerHTML = exibirJogosNovos.join('')
        buttonlimpar.classList.add('tom-verde');
        // esta parte em especial adiciona a classe chamada "tom-verde" ao elemento de Limpar Filtros
        // sendo bastante intuitivo, esta classe só é ativa quando o usuário realmente pode limpar sua busca
        
    } catch(error) {
        console.error(error)
        
    }  
    
}

// esquema de interação entre o usuário e o sistema além das functions
// podemos nomeá-los como as alavancas dos eventos da página
const pesquisar = document.querySelector('.search')
const buttonsearch = document.querySelector('#pesquisa-btn')
const formPesquisa = document.querySelector('#pesquisa')
const buttonlimpar = document.querySelector('.button-limpar');
const acessar = document.querySelector('.button-acessar');

acessar.addEventListener('click', function(){
    // neste aqui, nós ativamos a função de scroll até o catálogo com o botão de 'acessar catálogo'
    var pesquisar = document.querySelector(".pesquisa-cont");
    pesquisar.scrollIntoView({behavior: 'smooth' });
    // let barraSearch = document.querySelector('#search').value;
    
});

formPesquisa.addEventListener('submit', function(event) {
    // ativamos a função de busca sem precisar recarregar a página 
    event.preventDefault()
    searchGames()
})

buttonsearch.addEventListener('click', function(event) {
    // mesma coisa da função acima porém associada especificamente ao botão de busca
    event.preventDefault()
    searchGames()
})

buttonlimpar.addEventListener('click', function(event) {
    // por último, nós temos o botton de limpar filtros, onde é restaurado a visibilidade do catálogo padrão e ocultado a de pesquisa
    // tudo de forma dinâmica :)
    pesquisar.value = "";
    jogosLista.style.display = "flex";
    buscaLista.style.display = "none";
    buttonlimpar.classList.remove('tom-verde');
});
