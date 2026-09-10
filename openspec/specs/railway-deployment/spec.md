# railway-deployment Specification

## Purpose

Permitir que o Railway builde e sirva o app Angular do relatório de mercado (hoje dentro de `frontend/`) como um serviço web funcional, a partir da raiz do repositório, sem exigir Docker/nginx nem configuração manual de "root directory" no painel do Railway.

## Requirements

### Requirement: Build automático detectado a partir da raiz do repositório
O builder do Railway (Railpack) SHALL detectar e iniciar um provedor de build válido a partir de configuração presente na raiz do repositório, sem exigir alteração da configuração de "root directory" do serviço no painel do Railway.

#### Scenario: Deploy a partir da raiz do repositório
- **WHEN** o Railway inicia um build a partir da raiz do repositório (sem root directory customizado)
- **THEN** o Railpack identifica um provedor válido (Node) e prossegue para a fase de build, em vez de falhar com "could not determine how to build the app"

### Requirement: Build de produção do Angular
O processo de build do Railway SHALL instalar as dependências do app em `frontend/` e gerar o build de produção do Angular antes de iniciar o processo de start.

#### Scenario: Build de produção gerado
- **WHEN** o Railway executa a fase de build
- **THEN** os arquivos estáticos de produção existem em `frontend/dist/frontend/browser/` (index.html, JS e CSS) ao final da fase de build

### Requirement: Processo de start serve o app estático na porta do Railway
O processo de start SHALL servir os arquivos estáticos gerados pelo build do Angular e SHALL escutar na porta informada pela variável de ambiente `PORT` fornecida pelo Railway.

#### Scenario: Serviço responde na porta atribuída
- **WHEN** o Railway inicia o processo de start com a variável de ambiente `PORT` definida
- **THEN** o serviço aceita conexões HTTP nessa porta e responde à raiz (`/`) com o conteúdo do app (status HTTP 200)

#### Scenario: Porta não definida usa um padrão razoável
- **WHEN** o processo de start é executado sem a variável de ambiente `PORT` definida (ex.: execução manual local)
- **THEN** o serviço ainda inicia, escutando em uma porta padrão documentada, em vez de falhar

### Requirement: Rotas não encontradas retornam o app (SPA fallback)
Para qualquer caminho de URL que não corresponda a um arquivo estático existente, o servidor SHALL responder com o `index.html` do app, para que o Angular possa assumir o roteamento no cliente caso rotas sejam adicionadas no futuro.

#### Scenario: Caminho desconhecido ainda carrega o app
- **WHEN** um cliente solicita um caminho que não corresponde a nenhum arquivo estático buildado
- **THEN** o servidor responde com o `index.html` do app, em vez de um erro 404 genérico

### Requirement: Versão de Node compatível fixada para o build
O ambiente de build do Railway SHALL usar uma versão de Node compatível com os requisitos declarados pelas ferramentas do Angular (`@angular/cli` e dependências relacionadas) instaladas em `frontend/`, em vez de depender da versão padrão que o Railpack escolheria sem essa informação.

#### Scenario: Build usa a versão de Node fixada
- **WHEN** o Railway resolve qual versão de Node usar para o build
- **THEN** a versão usada satisfaz a faixa exigida pelas ferramentas do Angular instaladas em `frontend/`, sem gerar avisos de incompatibilidade de engine
