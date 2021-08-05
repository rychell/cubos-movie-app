# Movie app

Essa é uma aplicação web para consulta de informações sobre filmes. Toda a aplicação foi desenvolvida utilizando o ReactJS.


## Acessando a aplicação

Para visualizar, utilize o link: https://cubos-movie-app.vercel.app/

Caso prefira acessar localmente em seu computador, clone este repositório e em seguida instale as dependências do projeto. Para isso, abra o terminal na pasta onde o repositório foi clonado e execute:
```
npm install
```
Após concluída a instalação das dependências, você poderá iniciar a aplicação em modo de desenvolvimento usando o comando:
```
npm start
```

Lembrando que para executar os comandos acima é necessário ter o NodeJS instalado.
## Principais recursos
* Para otimizar o número de requisições para a API do catálogo de filmes, utilizei a técnica de debounce para fazer a requisição apenas quando o usuário ficar por um intervalo de tempo sem digitar nada.
* Buscando também otimizar as consultas para a API do catálogo de filmes, faço a consulta de gêneros apenas no momento que a aplicação se inicia e esse dado é reutilizado durante a navegação do usuário dentro da aplicação. Decidi fazer dessa forma por entender que a probabilidade de surgir um gênero novo durante a sessão do usuário é muito baixa e não faria sentido fazer essa consulta inúmeras vezes e sempre obter o mesmo resultado.
* Caso a busca esteja vazia, são exibidos os filmes mais populares do momento.
* Utilizei a Context API do React para compartilhar informações e estados entre componentes.
* Por ser um projeto pequeno, optei por utilizar css modules. Sass ou até mesmo styled-components seria aplicável, mas para esse escopo não traria vantagens.


## Principais desafios
* O layout em um arquivo estático dificultou bastante, pois identificar os detalhes da tipografia (fonte, tamanho, cor, etc) é bem difícil de fazer usando apenas a inspeção visual. Da mesma forma o espaçamento entre os elementos. Acredito que deixei visualmente no mesmo formato, mas sei que não ficou pixel-perfect ao layout proposto.
* O requisito de ser apenas 5 filmes por página também foi um desafio, pois a API não possui um parâmetro para definir o número de resultados por página. Tive que implementar uma lógica para manter a paginação como estava o requisito.

## Principais aprendizados
* Não conhecia a API do The Movie DB e gostei bastante de trabalhar com ela. Além de filmes possui também séries e com informações bem completas.
