# WenLock - Desafio Técnico Instituto Conecthus

Este projeto foi desenvolvido como parte do **teste técnico para o Instituto Conecthus**. É uma aplicação web de gerenciamento de usuários feita em Next.js.

## Acesso

A aplicação pode ser acessada pelo seguinte link:

> [conecthus-case.vercel.app](conecthus-case.vercel.app)

## Bibliotecas

As principais bibliotecas utilizadas:

| Nome        | Versão | Documentação                                         |
| ----------- | ------ | ---------------------------------------------------- |
| next        | 16.1.6 | [nextjs.org/docs](https://nextjs.org/docs)           |
| react       | 19.2.3 | [react.dev](https://react.dev)                       |
| tailwindcss | ^4     | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| eslint      | ^10    | [eslint.org/docs](https://eslint.org/docs)           |
| shadcn/ui   | -      | [shadcn/ui](https://ui.shadcn.com/)                  |

## Funcionalidades

- Sidebar colapsável com navegação
- Listagem de usuários com busca por texto
- Cadastro de usuários com validação de formulário
- Visualização de detalhes do usuário
- Exclusão de usuários com modal de confirmação

## Estrutura do Projeto

```
src/
├── app/                        # Rotas (App Router)
│   ├── api/users/              # API Routes (GET, POST, DELETE)
│   └── (private)/              # Páginas autenticadas
│       ├── (home)/             # Home (/)
│       └── users/              # Usuários (/users, /users/create)
├── components/
│   ├── common/                 # Componentes reutilizáveis
│   ├── pages/                  # Componentes específicos de página
│   └── ui/                     # Primitivos shadcn/ui
├── hooks/                      # Hooks customizados
├── lib/                        # Utilitários e API client
└── services/                   # Tipos e definições de serviço
```

## Como Rodar

### Desenvolvimento

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Docker

```shell
docker compose up -d --build
```

## API Routes

| Método | Rota                      | Descrição                            |
| ------ | ------------------------- | ------------------------------------ |
| GET    | `/api/users?search=texto` | Lista usuários (com filtro opcional) |
| POST   | `/api/users`              | Cria um novo usuário                 |
| DELETE | `/api/users/:id`          | Remove um usuário                    |

> O armazenamento é feito em memória (dados são resetados ao reiniciar o servidor).
