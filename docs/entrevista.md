# Como estudar e apresentar o projeto

## Antes de apresentar

Execute o projeto, leia cada teste e altere pelo menos um cenário. Crie uma branch, acrescente por exemplo o teste de erro na exclusão, observe uma falha e corrija. Explique a contribuição da IA e o que você verificou pessoalmente.

## Apresentação sugerida — 3 minutos

“Este é um laboratório de QA com uma aplicação local de tarefas. Planejei a cobertura pelos riscos de entrada inválida, criação e exclusão. Usei TypeScript e Playwright para verificar a API diretamente e os principais fluxos pelo navegador. A suíte possui isolamento e evidências de falha, e roda no GitHub Actions. É um projeto de estudo, com limitações explícitas de persistência e cobertura.”

Demonstre uma execução real, abra o relatório e explique um teste de fronteira e um cenário de erro. Não declare experiência comercial ou métricas de melhoria que este projeto não demonstra.

## Perguntas para praticar

- **Por que testes de API e interface?** API verifica regras com menos dependência visual; interface verifica a integração que o usuário utiliza.
- **O que é análise de valor limite?** Testar 100 e 101 caracteres porque a regra permite até 100. Também vale acrescentar testes explícitos para 1 caractere.
- **Como evitar flakiness?** Dados independentes, contexto novo por teste, espera por estado e seletores semânticos. Retry ajuda a diagnosticar, mas não corrige a causa.
- **Mock e integração são iguais?** Não. UI-03 controla a resposta para verificar feedback; API-01 usa o servidor real.
- **Severidade e prioridade?** Severidade descreve impacto; prioridade define ordem de tratamento no contexto do produto.
- **Como investigaria uma falha na CI?** Relatório, trace, status HTTP, reprodução no mesmo commit e análise da causa antes de alterar expectativas.
- **O que falta?** Persistência, outros navegadores, acessibilidade, carga e segurança; apresentar limites evita prometer cobertura total.
