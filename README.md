<h1 align="center">
  TodoAPI
</h1>

<p align = "center">
Este é o backend da aplicação Todo App - Um gerenciador de tarefas pessoal! O objetivo dessa aplicação é conseguir criar uma API REST utilizando conceitos de CRUD, SOLID e Clean Code.
</p>

### Cadastro de usuário POST /users

Padrão de corpo

```json
{
	"name": "John Doe",
	"email": "johndoe@email.com",
	"password": "12345678"
}
```

Padrão de resposta (STATUS: 201)

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@email.com"
}
```

#### Possíveis erros:

STATUS (409) - Email já cadastrado

```json
{
	"message": "This email is already registered"
}
```

STATUS (400) quando o corpo não é compatível com o padrão

### Login de usuário POST /users/login

Padrão de corpo

```json
{
	"email": "johndoe@email.com",
	"password": "12345678"
}
```

Padrão de resposta (STATUS: 200)

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

#### Possíveis erros:

STATUS (404) - Usuário não existente

```json
{
	"message": "User does not exist"
}
```

STATUS (401) - Email e senha não correspondem

```json
{
	"message": "Email and password doesn't match"
}
```

STATUS (400) quando o corpo não é compatível com o padrão

### Recuperação de usuário GET /users/profile (Precisa de autorização)

Padrão de resposta (STATUS: 200)

```json
{
	"id": 1,
	"name": "John Doe",
	"email": "johndoe@email.com"
}
```

### Criação de tarefa POST /tasks (Precisa de autorização)

Padrão de corpo

```json
{
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"categoryId?": 1
}
```

Padrão de resposta (STATUS: 201)

```json
{
	"id": 1,
	"title": "Lorem ipsum",
	"content": "Lorem ipsum",
	"finished": false,
	"categoryId": 1
}
```

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

STATUS (400) quando o corpo não é compatível com o padrão

### Leitura de tarefas GET /tasks (Precisa de autorização)

Padrão de resposta (STATUS: 200)

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

URL Search Params

| Parâmetro | Exemplo de uso         | Descrição                                                                          |
| --------- | ---------------------- | ---------------------------------------------------------------------------------- |
| category  | /tasks?category=estudo | Forneça o valor do campo name para trazer somente tarefas da categoria determinada |

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
