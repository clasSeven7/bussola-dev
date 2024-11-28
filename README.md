<h1 align="center">
  🧭 bussola.dev
</h1>

<div align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/clasSeven7/bussola-dev.svg" />
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/clasSeven7/bussola-dev.svg" />
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/clasSeven7/bussola-dev.svg" />

  <a href="https://github.com/clasSeven7/bussola-dev/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/clasSeven7/bussola-dev.svg" />
  </a>
  
  <a href="https://github.com/clasSeven7/bussola-dev/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/clasSeven7/bussola-dev.svg" />
  </a>
</div>

<div align="center">
  <img src=".github/preview.png" width="100%"/>
</div>

### 📖 Sobre

**bussola.dev** é uma rede social projetada para impulsionar o desenvolvimento de carreira e conhecimento técnico de desenvolvedores, abrangendo desde iniciantes até profissionais avançados. Além de permitir a criação de portfólios, colaboração em grupos temáticos e a obtenção de recomendações tecnológicas personalizadas, a plataforma oferece um vasto conjunto de recursos para orientar e informar os desenvolvedores, divididos em categorias de conhecimento – iniciante, intermediário e avançado – para facilitar o acesso a informações e práticas relevantes para cada nível de experiência.

### Funcionalidades

- **Cadastro de Usuário:** Cadastre-se na plataforma para ter acesso a um cartão de crédito.
- **Login de Usuário:** Faça login na plataforma para acessar o cartão de crédito.

### Tecnologias Utilizadas

- **Django:** Framework web em Python que promove um desenvolvimento rápido e design limpo.
- **Django Rest Framework:** Conjunto de ferramentas para construir APIs web.
- **PostgreSQL:** Banco de dados relacional robusto com suporte a transações ACID.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript:** Superset JavaScript que adiciona tipagem estática ao código.
- **Shadcn/ui** Biblioteca de componentes React para construção de interfaces de usuário.
- **Lucida.js** Biblioteca JavaScript para criação de gráficos interativos e icones

### 🖥 Endpoints da API

A aplicação possui uma API RESTful para gerenciar links. Abaixo alguns dos endpoints:

- `GET /api/links/`: Recupera todos os links.
- `POST /api/links/`: Cria um novo link.
- `GET /api/links/{id}/`: Recupera um link específico.
- `PUT /api/links/{id}/`: Atualiza um link específico.
- `DELETE /api/links/{id}/`: Exclui um link específico.

#### Exemplos de Requisições

**Criar um Novo Link:**

```bash
curl -X POST http://127.0.0.1:8000/api/links/ -H "Content-Type: application/json" -d '{"url": "https://exemplo.com", "description": "Descrição do link"}'
```

**Recuperar Todos os Links:**

```bash
curl http://127.0.0.1:8000/api/links/
```

### 🔍 Testes

A aplicação inclui uma suíte de testes para verificar a integridade das funcionalidades.

**Dependências para Testes:**

- Django
- Django REST Framework
- Django REST Framework Simple JWT (para autenticação)

#### Descrição dos Testes

A classe `PostAPITestCase` realiza os seguintes testes:

- **Criação de Post:** Verifica se um post pode ser criado por um usuário autenticado.
- **Recuperação de Post:** Testa se um post existente pode ser recuperado.
- **Atualização de Post:** Valida se um post pode ser atualizado.
- **Exclusão de Post:** Confirma que um post pode ser excluído.
- **Criação de Post sem Autenticação:** Garante que a criação de um post é negada sem autenticação.

#### Executando Testes

Execute os testes com o comando:

```bash
python3 manage.py test
```

### 🚀 Como Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie um novo branch `(git checkout -b feature/NovaFuncionalidade)`.
3. Faça suas alterações.
4. Commit suas alterações `(git commit -m 'Adicionar nova funcionalidade')`.
5. Envie para o branch `(git push origin feature/NovaFuncionalidade)`.
6. Abra um pull request
