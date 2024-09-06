<h1 align="center">
  TodoAPI
</h1>

<p align = "center">
Este é o backend da aplicação Todo App - Um gerenciador de tarefas pessoal desenvolvido exclusivamente para o desafio da JackExperts! O objetivo dessa aplicação é conseguir criar uma API REST utilizando conceitos de CRUD, SOLID e Clean Code.
</p>

<blockquote align="center">“Paciência você deve ter, meu jovem Padawan. - Mestre Yoda”</blockquote>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 11 endpoints, sendo em volta principalmente do usuário - podendo cadastrar seu perfil, fazer login, relogar automaticamente, e administrar suas tarefas como desejar. <br/>

<a style="display:flex; justify-content:center" href="https://insomnia.rest/run/?label=TodoAPI&uri=https%3A%2F%2Fraw.githubusercontent.com%2FGuscaleman%2Ftodoapi-insomnia%2Fmain%2FInsomnia_2024-09-06.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<blockquote> Para importar o JSON no Insomnia é só clicar no botão "Run in Insomnia". Depois é só seguir os passos que ele irá importar todos os endpoints, então seu insomnia deve ficar da seguinte forma:

</blockquote>
 <img alt="TodoAPI" title="TodoAPI" src="https://github.com/Guscaleman/todoapi-insomnia/blob/main/insomniatodoapi.png" />

<br>

Com o propósito de facilitar o deploy deste serviço no Railway, decidi criar esse repositório separado do repositório da aplicação TodoAPP.

<br>

A url base da API é https://todo-api-production-7540.up.railway.app

## Rotas que não precisam de autenticação

<h2 align ='center'> Cadastro de usuário </h2>

`POST /users - FORMATO DA REQUISIÇÃO - STATUS 200`

```json
{
	"name": "John Doe",
	"email": "johndoe@email.com",
	"password": "12345678"
}
```

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@email.com"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso o email já esteja cadastrado no banco de dados.

`POST /users - `
` FORMATO DA RESPOSTA - STATUS 409`

```json
{
	"message": "This email is already registered"
}
```

Quando o corpo não é compatível com o padrão.

`POST /users - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Invalid email"
}
```

<h2 align ='center'> Login </h2>

`POST /users/login - FORMATO DA REQUISIÇÃO - STATUS 200`

```json
{
	"email": "johndoe@email.com",
	"password": "12345678"
}
```

`POST /users/login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjcwMjk2LCJleHAiOjE3MDEzMTM0OTZ9.Ebru139GF02sx9EFR0PouLrErYyYIcFJgLa6vIfsktA",
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "johndoe@email.com"
	}
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso o usuário não esteja cadastrado.

`POST /users/login - `
` FORMATO DA RESPOSTA - STATUS 404`

```json
{
	"message": "User does not exist"
}
```

Caso o email ou senha inseridos estejam incorretos.

`POST /users/login - `
` FORMATO DA RESPOSTA - STATUS 401`

```json
{
	"message": "Email and password doesn't match"
}
```

Quando o formato de requisição não é compatível com o padrão.

`POST /users/login - `
` FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Invalid email"
}
```

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir gerenciar seu CRUD até que sua autorização expire.

<h2 align ='center'> Buscar Perfil do usuário logado (token) </h2>

`GET /users/profile - FORMATO DA REQUISIÇÃO`

<blockquote>Na requisição apenas é necessário o TOKEN, a aplicação ficará responsável em buscar o id do usuário no token e retorna ele.</blockquote>

<br>

`GET /users/profile - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@email.com"
}
```

<h2 align ='center'> Criar tarefas para seu perfil </h2>

`POST /tasks - FORMATO DA REQUISIÇÃO`

```json
{
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"categoryId?": 1
}
```

`POST /tasks - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": 1,
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"finished": false,
	"categoryId": 1
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso a categoria informada não exista.

`POST /tasks - FORMATO DA RESPOSTA - STATUS 404`

```json
{
	"message": "Category not found"
}
```

Caso o token não seja informado.

`POST /tasks - FORMATO DA RESPOSTA - STATUS 401`

```json
{
	"message": "Token is required"
}
```

Quando o formato de requisição não é compatível com o padrão.

`POST /tasks - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "String must contain at least 1 character(s)"
}
```

<h2 align ='center'> Listar tarefas criadas no seu perfil </h2>

`GET /tasks - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": 1,
		"title": "Lorem ipsum",
		"content": "Lorem ipsum",
		"finished": false,
		"category": {
			"id": 1,
			"name": "Estudo"
		}
	}
]
```
<h2 align ='center'> Possíveis erros </h2>

`GET /tasks - FORMATO DA RESPOSTA - STATUS 401`

Caso o token não seja informado.

```json
{
	"message": "Token is required"
}
```

### Leitura de individual GET /tasks/:1 (Precisa de autorização)

Padrão de resposta (STATUS: 200)

```json
{
	"id": 1,
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"finished": false,
	"category": {
		"id": 1,
		"name": "Estudo"
	}
}
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
	"message": "Task not found"
}
```

STATUS (401) - O token é obrigatório

```json
{
	"message": "Token is required"
}
```

### Atualizar tarefa PATCH /tasks/:id (Precisa de autorização)

Padrão de corpo

```json
{
	"title?": "Lorem ipsum",
	"content?": "Lorem ipsum",
	"finished?": true,
	"categoryId?": 1
}
```

Padrão de resposta (STATUS: 200)

```json
{
	"id": 1,
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"finished": true,
	"categoryId": 1
}
```

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
	"message": "Task not found"
}
```

STATUS (404) - Categoria inválida

```json
{
	"message": "Category not found"
}
```

STATUS (401) - O token é obrigatório

```json
{
	"message": "Token is required"
}
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{
	"message": "This user is not the task owner"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Excluir tarefa DELETE /tasks/:id (Precisa de autorização)

Esta rota não tem corpo no padrão de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Tarefa inválida

```json
{
	"message": "Task not found"
}
```

STATUS (401) - O token é obrigatório

```json
{
	"message": "Token is required"
}
```

STATUS (403) - Tarefa não pertence ao usuário

```json
{
	"message": "This user is not the task owner"
}
```

### Criação de categoria POST /categories (Precisa de autorização)

Padrão de corpo

```json
{
	"name": "Example"
}
```

Padrão de resposta (STATUS 201)

```json
{
	"id": 1,
	"name": "Example"
}
```

#### Possíveis erros:

STATUS (401) - O token é obrigatório

```json
{
	"message": "Token is required"
}
```

STATUS (409) quando o corpo não é compatível com o padrão

### Exclusão de categoria DELETE /categories/:id (Precisa de autorização)

Está rota não tem um corpo de resposta (STATUS: 204)

#### Possíveis erros:

STATUS (404) - Categoria inválida

```json
{
	"message": "Category not found"
}
```

STATUS (401) - O token é obrigatório

```json
{
	"message": "Token is required"
}
```

STATUS (403) - Categoria não pertence ao usuário

```json
{
	"message": "This user is not the category owner"
}
```
