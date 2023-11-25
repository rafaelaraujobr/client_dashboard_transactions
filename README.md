# .

## Screenshot

![Dashboard](https://res.cloudinary.com/dp0qcuzkq/image/upload/v1700940148/Captura_da_Web_25-11-2023_162120_localhost_o6iqy1.jpg)

![Dashboard modo dark](https://res.cloudinary.com/dp0qcuzkq/image/upload/v1700940401/Captura_da_Web_25-11-2023_162613_localhost_snjici.jpg)

![Lista de transacoes](https://res.cloudinary.com/dp0qcuzkq/image/upload/v1700940490/Captura_da_Web_25-11-2023_162753_localhost_csgepp.jpg)

## Configuração IDE recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desativar o Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Digite Suporte para importações `.vue` em TS

O TypeScript não pode lidar com informações de tipo para importações `.vue` por padrão, então substituímos a CLI `tsc` por `vue-tsc` para verificação de tipo. Nos editores, precisamos [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 
o tornar o serviço de linguagem TypeScript ciente dos tipos `.vue`.

Se o plugin TypeScript independente não parecer rápido o suficiente para você, Volar também implementou um [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) isso tem mais desempenho. Você pode habilitá-lo seguindo as seguintes etapas:

1. Desative a extensão TypeScript integrada
    1) Execute `Extensões: Mostrar extensões integradas` na paleta de comandos do VSCode
    2) Encontre `TypeScript e JavaScript Language Features`, clique com o botão direito e selecione `Disable (Workspace)`
2. Recarregue a janela VSCode executando `Developer: Reload Window` na paleta de comandos.

## Personalizar configuração

Ver [Vite Configuration Reference](https://vitejs.dev/config/).

## Configuração do projeto

```sh
npm install
```

## Copie o arquivo env de exemplo e faça as alterações de configuração necessárias no arquivo .env

```sh
cp .env.example .env
```

### Compilar e recarregar a quente para desenvolvimento

```sh
npm run dev
```

### Verificação de tipo, compilação e redução para produção

```sh
npm run build
```

### Execute testes de unidade com [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
