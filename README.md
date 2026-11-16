# QA Portfolio — Playwright + TypeScript

Projeto de estudo para demonstrar planejamento, automação de testes de API e interface e integração contínua. A aplicação **QA Task Lab** acompanha o projeto e executa localmente, sem contas ou serviços externos.

## Comece aqui

Requisitos: Node.js 24 e npm. Em Linux, a instalação dos navegadores pode precisar de permissões administrativas para bibliotecas do sistema.

```bash
npm ci
npx playwright install --with-deps chromium
npm run typecheck
npm test
npm run report
```

O Playwright inicia e encerra o servidor automaticamente na porta 3000. Deixe essa porta livre. Para usar a aplicação manualmente: `npm start` e acesse http://127.0.0.1:3000.

## O que está coberto

- **9 testes de API:** ciclo de criação/consulta/exclusão, partições inválidas, limite de caracteres, JSON malformado e ID inexistente.
- **3 testes de interface:** adicionar/concluir/excluir, título em branco e erro de servidor simulado.
- Asserções sobre status HTTP, conteúdo de resposta e comportamento observável.
- Dados independentes, limpeza dos registros de API e contextos de navegador isolados.
- Relatório HTML, screenshots e traces em falhas; execução no GitHub Actions.

```bash
npm run test:api
npm run test:ui
npm run test:headed
```

## Organização

| Caminho | Finalidade |
| --- | --- |
| `app/` | Aplicação de demonstração e API Node.js |
| `tests/api/` | Testes HTTP sem navegador |
| `tests/ui/` | Jornadas de interface com Chromium |
| `playwright.config.ts` | Servidor, isolamento, relatórios e evidências |
| `docs/` | Estratégia, casos manuais, exemplo de defeito e roteiro de entrevista |
| `.github/workflows/tests.yml` | Verificação de tipos e testes em push e pull request |

## Documentação

- [Estratégia e riscos](docs/estrategia.md)
- [Casos e exploração manual](docs/casos-de-teste.md)
- [Modelo de relato de defeito](docs/exemplo-bug.md)
- [Preparação para entrevista](docs/entrevista.md)

## Limitações conhecidas

A aplicação é uma fixture educacional. Os registros ficam em memória e desaparecem ao reiniciar o servidor; a interface não recarrega registros e a conclusão é apenas visual, sem persistência na API. Não há autenticação, banco de dados, testes de carga, auditoria de segurança ou validação completa de acessibilidade. A cobertura de interface usa somente Chromium. O teste de erro HTTP utiliza interceptação e não valida uma falha real de infraestrutura.

O projeto foi elaborado com assistência de IA. Estude, execute e adapte os cenários antes de apresentá-lo; descreva como projeto de estudo e não como experiência profissional. A documentação não afirma resultados que não tenham sido executados.

## Cypress — Bellatrix Demos

Nova suíte E2E no site real https://demos.bellatrix.solutions/, independente dos testes locais com Playwright.

```bash
npm ci
npm run cy:open
# Ou execução sem interface:
npm run cy:run
```

São 10 cenários de catálogo, busca, ordenação, detalhes e carrinho. Consulte o [guia completo de Cypress](docs/cypress-bellatrix.md). O workflow **Cypress - Bellatrix** executa a suíte e guarda vídeos, screenshots de falhas e resultados JUnit.
