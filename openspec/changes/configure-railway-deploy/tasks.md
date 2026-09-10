## 1. Configuração de build/start na raiz do repositório

- [x] 1.1 Criar `package.json` na raiz com `"private": true`, `scripts.build` = `"npm --prefix frontend ci && npm --prefix frontend run build"`, `scripts.start` = `"serve -s frontend/dist/frontend/browser -l tcp://0.0.0.0:${PORT:-3000}"`, e `serve` como dependência de produção, e verificar que o arquivo é um JSON válido (`node -e "require('./package.json')"`)
- [x] 1.2 Criar `.node-version` na raiz com o conteúdo `24`, e verificar que o valor está dentro da faixa exigida pelo `@angular/cli` instalado em `frontend/node_modules/@angular/cli/package.json` (`engines.node`)
- [x] 1.3 Criar `.gitignore` na raiz cobrindo `node_modules/` (para o `node_modules` gerado pelo `npm install` da raiz), e verificar com `git status` que a pasta não aparece como untracked depois do passo 1.4

## 2. Instalação e verificação local

- [x] 2.1 Rodar `npm install` na raiz do repositório para gerar `package-lock.json` com `serve` resolvido, e commitá-lo junto com o `package.json`
- [x] 2.2 Rodar `npm run build` a partir da raiz e verificar que `frontend/dist/frontend/browser/index.html` é gerado sem erros
- [x] 2.3 Rodar `npm start` a partir da raiz (com e sem a variável `PORT` definida, ex.: `PORT=4300 npm start` e depois `npm start` sem `PORT`) e verificar em ambos os casos que o servidor sobe e responde HTTP 200 em `/`
- [x] 2.4 Com o servidor do passo 2.3 rodando, requisitar um caminho inexistente (ex.: `curl -i http://localhost:<porta>/rota-que-nao-existe`) e verificar que a resposta é o `index.html` do app (SPA fallback), não um 404 genérico

## 3. Verificação final

- [x] 3.1 Revisar o `README.md` e adicionar uma nota curta explicando que o `package.json`/`.node-version` da raiz existem só para o deploy no Railway builder o app de `frontend/`, para não confundir quem abrir o repositório depois
- [ ] 3.2 Fazer commit de todos os arquivos novos (`package.json`, `package-lock.json`, `.node-version`, `.gitignore` da raiz, nota no README) e push para `main`, e confirmar no painel do Railway que o novo deploy builda e fica com status ativo/healthy, respondendo na URL pública atribuída
