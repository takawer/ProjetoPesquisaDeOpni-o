# App para criação de Pesquisas de Opnião

Este aplicativo foi desenvolvido como projeto final da disciplina de Programação de Scripts da faculdade Fatec - São José dos Campos, cujo objetivo foi de criar um aplicativo utilizando Angular e banco de dados Firebase para que entidades, como universidades e empresas, podessem criar pesquisas de opnião customizadas, abrangindo apenas os assuntos e publico desejados.

O projeto ainda não está finalizado, no momento não é possível adicionar questões á um questionário e enviar um link de acesso para 
quem irá responder.


[Link do Projeto no Stackblitz](https://stackblitz.com/edit/angular-f9kioj)


## Começando

As instruções abaixo te mostrarão como obter uma cópia do projeto para testes e desenvolvimento.

### Pré-requisitos

Para começar a utilizar o projeto, é necessário possuir os seguintes requisitos:

```
Possuir um banco de dados Firebase.
```

```
Ter instalada uma IDE com suporte para Angular, ou possuir uma conta no site Stackblitz.
```



### Configurando o Firebase

Para rodar o projeto, é preciso configurar o acesso do projeto ao seu banco de dados Firebase e os metodos de autenticação.

Conectando o porjeto ao banco de dados:

```
Assim que o projeto firebase é criado, um popup exibe um script com suas informações, copie o seguinte trecho do código:

apiKey: 
authDomain: 
databaseURL: 
projectId: 
storageBucket: 
messagingSenderId: 
appId: 

Em seguida, nos arquivos do porjeto Angular vá para src/app/environments/environment.ts e cole o trecho acima.  
```

Autorizando o acesso do dominio ao banco de dados:

```
No Firebase, no menu da esquerda clique em Authentication -> Adicionar domínio e cole a URL do projeto Angular.
```
Ativando os provedores de Login:
```
No Firebase, no menu da esquerda clique em Authentication e ative o os métodos de login desejados(no caso deste projeto, Facebook e Google).
```
Após realizar estar configurações, o projeto está pronto para uso.

## Funcionamento do Aplicativo

O aplicativo possuí 3 telas:

* Login : Tela para que o usuário que irá criar a pesquisa realize a autenticação, utilizando uma conta Google ou Facebook.

* Usuário : Aqui o usuário pode visualizar e criar suas pesquisas, dando nome e data de inicio e fim, e fazer logout. Ao clicar em um
questionário da lista, o usuário é redirecionado para a tela de criação de quesões.

* Grupo : Tela para criação de questões, podendo ser questões dissertativas ou de multiplas escolhas.


## Componentes

Abaixo, uma breve explicação sobre os diretórios e seus componentes e serviços:

### Core 

Diretório composto pelos serviçoes de autenticação sendo eles principalmente: 

* auth.service : Seviço que possuí os métodos de autenticação com Google e Facebook, logout e métodos para pegar a UID e nome do usuário logado.

* user.service : Serviço que faz a atualização e verificação do status do usuário, para verificar se há um usuário logado no momento.

### Login

Neste diretório está o componente login, que a view onde o usuário realiza o login, clicando nos botões que chamam os métodos do serviço
auth.service.

### User e Questionario 

* user.component.html : View do component user, é a página para qual o usuário é redirecionado após realizar login. Possui um card com
o ícone ou imagem foto do usuário, uma barra de navegação com botão de logout e também o conteúdo do componente questionário.

* user.component.ts : O método que se destaca neste componente é o de logout, que utiliza do método do serviço auth.service para
realizar a operação.

* user.resolver.ts : Onde está situado o método que pega nome e foto do usuário logado para ser colocado no card.

* questionario.component.html : View dos questionarios do usuário, com formulário para criação de novo questionário e a lista de
questionários criados pelo usuário.

* questionario.component.ts : Componente com os métodos de salvar questionário, formatar as datas e direcionar para a tela de criação de
questões.

### Grupo

* grupo.component.html : View para os formulários para criação de questões. 

* grupo.component.ts : Possuí os métodos "toggle" e "toggler" para esconder e revelar os formulários, e os métodos restantes para 
adicionar alternativas para a questão fechada.

### app.routes e dados.ts

* app.routes : possuí as indicações das rotas de navegação dentro do projeto.

* dados.ts : Aqui estão localizadas todas as principais classes : Usuario, Questionario, Grupo, Questao, QuestaoAberta e Alternativa.

### Servico.service

Serviço com os principais métodos relacinados aos questionários : Inserir e carregar usuários; criar e carregar questionários, 
carregar grupos e adicionar questões. 

### Environments

* environments.ts : Localização do script com as infromações do projeto Firebase.

![Login](https://user-images.githubusercontent.com/38635916/59621509-dec7a280-9105-11e9-87ae-83d3de75236b.jpg)

![Ques1](https://user-images.githubusercontent.com/38635916/59621614-10d90480-9106-11e9-97df-71fb17d0db0a.jpg)

![Ques2](https://user-images.githubusercontent.com/38635916/59621633-17677c00-9106-11e9-93ab-409bb0144b66.jpg)

![Quest](https://user-images.githubusercontent.com/38635916/59621643-1df5f380-9106-11e9-8a98-35a22dc6de40.jpg)


