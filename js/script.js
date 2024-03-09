document.addEventListener('DOMContentLoaded', async() => {
    //fazendo a requisição de API após carregar a página
    try{
        //requisições assíncronas garantindo ''suavidade'' aos solicitar a API
        const response = await fetch('https://gamedatabasestefan-skliarovv1.p.rapidapi.com/getPages');

        if (!response.ok) {
            throw new Error(`Erro de requisição: ${response.status} - ${response.statusText}`);
            //verificando respostas do servidor
        }
        const data = await response.json();

        data => {
            //manipulação do resultado da API
        };
    } catch(error) {
        console.error(error);
        //captura de erros e exceções da API exibindo-as no console
    }
});