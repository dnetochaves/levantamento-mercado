## Context

O repositório é um monorepo simples: o único app de verdade é o Angular em `frontend/` (ver `market-report-viewer`); a raiz só tem `.claude/`, `openspec/`, `README.md` e o PDF do relatório — nenhum indicador de linguagem/build. O Railway usa o Railpack como builder padrão, que escaneia a **raiz** do repositório para decidir como buildar/rodar o serviço; sem configuração de "root directory" no painel (não versionada, fora do nosso controle via código) e sem nenhum arquivo na raiz que o Railpack reconheça, o build falha com "could not determine how to build the app" (ver `proposal.md` - Why). O build de produção do Angular gera arquivos estáticos puros em `frontend/dist/frontend/browser/` — não há backend nem SSR.

## Goals / Non-Goals

**Goals:**
- Um `git push` para `main` deve resultar em um build e deploy bem-sucedidos no Railway, a partir da raiz do repositório, sem exigir configuração manual fora do repositório (como mudar o "Root Directory" no painel do Railway).
- O serviço em produção deve responder na porta que o Railway atribuir dinamicamente via `$PORT`.

**Non-Goals:**
- Server-side rendering (SSR) do Angular — o app é servido como arquivos estáticos.
- Domínio customizado, HTTPS, ou outras configurações de rede do Railway — ficam a cargo do painel do Railway, fora do escopo desta mudança.
- Múltiplos serviços (ex.: separar um backend futuro) — hoje é um único serviço estático.
- Uso de Docker/nginx — descartado deliberadamente (ver Decisões) por ser complexidade desnecessária para um front estático sem backend.

## Decisions

**1. Configuração via `package.json` na raiz do repositório, usando o provedor Node nativo do Railpack — não Docker/nginx, não a opção "Root Directory" do painel do Railway.**
Um `package.json` mínimo na raiz (com `scripts.build` e `scripts.start`) é o suficiente para o Railpack detectar um provedor Node válido e seguir o fluxo padrão: instalar dependências da raiz, rodar `npm run build`, depois `npm start`. Alternativas consideradas:
- *Dockerfile + nginx*: dá controle total, mas adiciona uma camada de infraestrutura (imagem, configuração de nginx, templating de porta via variável de ambiente) desnecessária para servir arquivos estáticos gerados por um `ng build`. Rejeitada por complexidade desproporcional ao problema.
- *"Root Directory" = `frontend` no painel do Railway*: resolveria a detecção sem nenhum arquivo novo no repo, mas é uma configuração que vive fora do controle de versão (não aparece em `git log`, não é revisável em PR, e exigiria o usuário reconfigurar manualmente o serviço). Rejeitada como solução primária porque o pedido foi "configurar o projeto" (o repositório); continua sendo uma opção de contorno documentada no Plano de Migração caso a abordagem via `package.json` apresente algum problema específico do Railway.

**2. Build: o script `build` da raiz delega para `frontend/` via `npm --prefix`.**
`"build": "npm --prefix frontend ci && npm --prefix frontend run build"`. Usa `ci` (não `install`) para respeitar exatamente o `frontend/package-lock.json` já commitado, e reutiliza o script `build` (`ng build`) que já existe em `frontend/package.json` — sem duplicar lógica de build do Angular na raiz.

**3. Start: servir os arquivos estáticos com o pacote `serve`, escutando em `$PORT`.**
`"start": "serve -s frontend/dist/frontend/browser -l tcp://0.0.0.0:${PORT:-3000}"`. `serve` é adicionado como dependência de produção do `package.json` da raiz (não devDependency — o Railpack pode instalar em modo produção antes de rodar `start`, então a dependência precisa estar disponível nesse momento). A flag `-s`/`--single` faz `serve` responder com `index.html` para qualquer caminho não encontrado (SPA fallback), atendendo esse requisito sem código adicional. `${PORT:-3000}` cobre o cenário de `$PORT` não definida (execução manual local), com uma porta padrão razoável. Alternativas consideradas:
- *`http-server` (outro pacote npm popular)*: equivalente em funcionalidade, mas não tem um flag de SPA fallback tão direto quanto `-s` do `serve` (precisaria de `--proxy` apontando pro próprio index.html); `serve` resolve isso de forma mais simples.
- *Escrever um servidor Node mínimo próprio (ex.: com `http`/`express`)*: mais código para manter para resolver um problema já resolvido por uma ferramenta madura e amplamente usada; rejeitado por ir contra a simplicidade pedida.

**4. Versão do Node fixada via `.node-version` na raiz, apontando para Node 24 (LTS ativa).**
O `@angular/cli@22.1.7` instalado em `frontend/` declara `engines.node` como `^22.22.3 || ^24.15.0 || >=26.0.0`. Um arquivo `.node-version` contendo `24` na raiz do repositório é lido pelo Railpack (assim como por `nvm`/`fnm` localmente) para escolher a versão major de Node do build, ficando dentro da faixa exigida e evitando os avisos de `EBADENGINE` observados localmente com Node 25 (uma versão ímpar/experimental, fora de qualquer uma das faixas aceitas). Alternativa considerada: usar apenas `engines.node` no `package.json` da raiz em vez de `.node-version` — mantido como redundância opcional, mas `.node-version` é o mecanismo mais direto e amplamente reconhecido pelo Railpack para fixar a versão de build.

**5. Commitar `package-lock.json` da raiz.**
Depois de adicionar `serve` como dependência, rodar `npm install` na raiz e commitar o `package-lock.json` gerado, para que o Railway instale exatamente a mesma versão resolvida localmente (evita builds não determinísticos).

## Risks / Trade-offs

- **[Risco] Ter um `package.json` na raiz além do `frontend/package.json` pode confundir quem for mexer no repo, parecendo um segundo projeto Node.** → Mitigação: mantê-lo mínimo (poucas linhas, só build/start/`serve`) e comentar no README que ele existe apenas para o Railway detectar o app.
- **[Risco] `serve` é só um servidor de arquivos estáticos; se o projeto ganhar um backend/API no futuro, essa configuração de deploy precisa ser revista.** → Aceito como escopo desta mudança (app é 100% estático hoje); não é um problema a resolver agora.
- **[Trade-off] Não usamos a opção "Root Directory" do painel do Railway**, que seria a configuração "nativa" para monorepos. → Aceito porque o pedido foi configurar isso via repositório/código, não via painel; a opção do painel continua disponível como contorno manual se necessário (ver Plano de Migração).

## Migration Plan

1. Implementar os arquivos novos na raiz (`package.json`, `package-lock.json`, `.node-version`, `.gitignore` cobrindo `node_modules/` da raiz).
2. Testar localmente: `npm run build` e depois `npm start` a partir da raiz do repositório, confirmando que o app abre em `http://localhost:$PORT` (ou na porta padrão).
3. Commitar e dar push para `main` — se o serviço no Railway já estiver conectado a este repositório/branch, o próximo deploy é disparado automaticamente e deve ser bem-sucedido.
4. Se, mesmo assim, o Railway não detectar o build corretamente por alguma particularidade da conta/projeto, o contorno manual é configurar "Root Directory" = `frontend` nas configurações do serviço no painel do Railway, como alternativa à configuração baseada em `package.json` da raiz (não deveria ser necessário, mas fica documentado aqui).
5. Rollback: como não há mudança de schema/dado, basta reverter o commit (`git revert`) e dar push, ou reimplantar uma versão anterior pelo próprio painel do Railway.
