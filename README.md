![](https://finxapp.com.br/wp-content/uploads/2025/07/group.webp)

# Case Técnico FinxApp

O projeto consiste em uma tela de listagem de solicitações cirúrgicas, onde o usuário pode filtrar os resultados com base em critérios específicos, como nome do médico, nome do paciente e convênio médico. A interface é desenvolvida utilizando Vue.js com TypeScript e a biblioteca de componentes NuxtUI.

## 🚀 Tecnologias

- [Vue.js 3](https://vuejs.org/)
- [NuxtUI](https://ui.nuxt.com/)
- [Tailwindcss](https://tailwindcss.com)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [TypeScript](https://typescriptlang.org/)
- [Axios](https://axios-http.com/)

## ⚙️ Instalação

1. Clone o repositório:

```bash
  git clone git@github.com:jpdrsanchez/case-finxapp.git
  cd case-finxapp
```

2. Instale as dependências:

```bash
  yarn install
```

3. Execute a aplicação em ambiente de desenvolvimento:

```bash
  yarn dev
```

4. Acesse a aplicação em seu navegador:

```bash
  http://localhost:3000
```

## 🧪 Testes

### Vitest

**Testes Unitários**

```bash
  yarn test
```

## 🧹 Lint e Formatação

O projeto utiliza ESLint e Prettier para manter a qualidade e a padronização do código.

```bash
  yarn lint # executa o lint e corrige os erros automaticamente
  yarn format # formata o código automaticamente
```

## 🗂️ Estrutura de Pastas

```bash

├── public/      # Arquivos públicos servidos diretamente (favicon, robots.txt, etc)
├── server/
│   ├── datasources.ts # Respostas da API mockadas para o MSW
│   ├── factories.ts   # Funções que geram dados dinâmicos para o MSW
│   ├── handlers.ts    # Handlers do MSW para interceptar requisições
│   ├── server.ts      # Inicialização do servidor MSW para uso no vitest
│   ├── worker.ts      # Inicialização do service worker MSW para uso na aplicação
├── src/
│   ├── api/         # Instância e configuração do axios
│   ├── assets/      # Imagens, css, ícones e fontes da aplicação
│   ├── components/  # Componentes reutilizáveis e independentes
│   ├── composables/ # Hooks que compõe a lógica da aplicação (useSearch, etc)
│   ├── constants/   # Constantes da aplicação
│   ├── dtos/        # Tipagens e definições das respostas da API
│   ├── mappers/     # Transformação de dados entre camadas (DTO → Model)
│   ├── models/      # Modelos de dados da aplicação
│   ├── views/       # Telas associadas às rotas
│   ├── main.ts      # Ponto de entrada da aplicação
│   └── App.vue      # Componente raiz da aplicação
├── test
│   └── vistest/ # Setup e configuração do Vitest
├── package.json     # Arquivo que define as dependências, scripts e metadados do projeto
├── tsconfig*.json   # Configurações do TypeScript
├── DECISIONS.md     # Documentação de decisões técnicas tomadas no projeto
├── README.md        # Este arquivo
├── vite.config.ts   # Arquivo de configuração do vite e vitest
```
