# Estratégia de testes

## Objetivo e escopo

Validar o contrato da API de tarefas e as jornadas principais da interface local. Público: recrutadores e pessoas estudando QA. Priorizar perda de dados, entrada inválida e retorno claro ao usuário.

## Regras do produto demonstrativo

1. POST `/api/tasks`: título string com 1 a 100 caracteres após trim; retorna 201 com id, title e completed=false.
2. GET `/api/tasks/:id`: 200 para registro existente; 404 caso contrário.
3. DELETE `/api/tasks/:id`: 204 para registro existente; 404 caso contrário.
4. Título inválido e JSON malformado retornam 400 com mensagem de erro.
5. Interface permite inclusão, conclusão visual e exclusão; título em branco não cria item.

## Escolhas e riscos

| Risco | Prioridade | Verificação |
| --- | --- | --- |
| Registro criado com dados incorretos | Alta | API-01 e API-02 |
| Rejeição incorreta no limite | Alta | API-02 e API-03 |
| Exclusão não remove registro | Alta | API-01 e UI-01 |
| Interface oculta falha de inclusão | Média | UI-03 |
| Título em branco | Média | API-02 e UI-02 |
| JSON ou ID inválido | Média | API-04 e API-05 |

API concentra validações e particionamento; interface concentra jornadas do usuário. Seletores por papel e label expressam semântica acessível. Não usamos sleeps fixos: asserções do Playwright aguardam o estado esperado. Page Objects seriam uma evolução quando houver repetição suficiente; três testes simples não justificam essa abstração.

## Execução e aceite

Executar `npm run typecheck` e `npm test`. Aceite inicial: tipos válidos e 12 testes aprovados, sem `test.only`, sem falhas ignoradas. CI permite uma repetição para diagnóstico; um resultado flaky precisa ser investigado, mesmo que a repetição passe. Revisar o resumo e o relatório, não apenas o status verde.

## Evidências e investigação

Relatório em `playwright-report/`; traces e screenshots de falhas em `test-results/`. Na CI, baixar o artefato `playwright-report`. Para abrir um trace local: `npx playwright show-trace test-results/<pasta>/trace.zip`. Reproduzir isoladamente, verificar resposta HTTP e logs, corrigir a causa e executar novamente a suíte afetada.

## Próximas coberturas

Persistência e recarga, Firefox/WebKit, acessibilidade por teclado e leitor de tela, títulos Unicode, limite de payload, erro na exclusão, concorrência e testes de carga em ambiente próprio. Não confundir ausência de falhas nesses 12 testes com ausência de defeitos.
