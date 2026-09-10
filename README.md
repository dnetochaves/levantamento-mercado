# levantamento-mercado

O app fica em [`frontend/`](frontend) (Angular + Angular Material). O `package.json`, `.node-version` e `.gitignore` na raiz do repositório existem apenas para o Railway (Railpack) conseguir detectar, buildar e servir esse app a partir da raiz — não é um segundo projeto Node. O build (`npm run build`) delega para `frontend/`, e o start (`npm start`) serve os arquivos estáticos gerados em `frontend/dist/frontend/browser/` na porta `$PORT`.
