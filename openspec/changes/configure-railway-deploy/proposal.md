## Why

O primeiro deploy no Railway falhou: o builder padrão (Railpack) escaneia a raiz do repositório e não encontra nenhum indicador de linguagem/build ali (o app Angular real está em `frontend/`, dentro de um monorepo). Sem essa configuração, o Railway não consegue buildar nem rodar o app, então o levantamento de mercado não pode ser publicado para os usuários acessarem pelo celular.

## What Changes

- Adiciona configuração na raiz do repositório para que o Railpack (builder Node do Railway) detecte, builde e sirva o app Angular que vive em `frontend/`.
- Define um processo de build de produção (`ng build`) e um processo de start que sirva os arquivos estáticos gerados (`frontend/dist/frontend/browser/`) respeitando a porta injetada pelo Railway via `$PORT`.
- Fixa a versão de Node usada no build/runtime do Railway para uma versão compatível com os requisitos do `@angular/cli` instalado, evitando comportamento inconsistente entre ambiente local e Railway.

## Capabilities

### New Capabilities
- `railway-deployment`: builda e serve o app Angular de `frontend/` como um serviço web no Railway, a partir de configuração na raiz do repositório, sem depender de Docker/nginx.

### Modified Capabilities
(nenhuma — o comportamento do app em si, coberto por `market-report-viewer`, não muda; isso é infraestrutura de build/deploy)

## Impact

- Novos arquivos na raiz do repositório (fora de `frontend/`): configuração de build/start para o Railway (ex.: `package.json` na raiz e/ou arquivo de configuração equivalente do Railpack) e um arquivo fixando a versão de Node.
- Nenhuma mudança no código do app Angular em si (`frontend/src/**`) nem nas specs de `market-report-viewer`.
- Nenhuma dependência de produção nova além de um servidor estático leve para servir os arquivos já buildados.
