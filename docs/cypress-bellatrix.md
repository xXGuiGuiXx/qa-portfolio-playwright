# Cypress — Bellatrix Demos

## Objetivo

Testar fluxos reais de compra até o carrinho em https://demos.bellatrix.solutions/ com Cypress e JavaScript. A aplicação de terceiros precisa estar acessível pela internet. A suíte acessa o site diretamente, sem interceptações que substituam os resultados.

## Executar

Node.js 24, npm e dependências de sistema do Cypress/Electron são necessários. Em Linux, a execução usa Xvfb. Consulte os [pré-requisitos oficiais](https://docs.cypress.io/app/get-started/install-cypress).

```bash
npm ci
npm run cy:open
npm run cy:run
npm run cy:catalogo
npm run cy:carrinho
```

`cy:open` abre o modo interativo; escolha E2E e um arquivo. `cy:run` executa todos os cenários em Electron. Não é preciso iniciar a aplicação local de tarefas. Para Chrome instalado: `npx cypress run --browser chrome`.

## Casos e critérios

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CAT-01 | Abrir loja | Catálogo não vazio, títulos, preços e links de produtos |
| CAT-02 | Abrir Falcon 9 | URL e título corretos, preço e botão habilitado |
| CAT-03 | Buscar Falcon | Falcon 9 e Falcon Heavy visíveis |
| CAT-04 | Buscar produto inexistente | Mensagem e nenhum produto |
| CAT-05a | Ordenar por menor preço | Preços vigentes em ordem crescente |
| CAT-05b | Ordenar por maior preço | Preços vigentes em ordem decrescente |
| CAR-01 | Acessar carrinho novo | Mensagem de carrinho vazio |
| CAR-02 | Adicionar e recarregar | Um Falcon 9 com quantidade 1 permanece |
| CAR-03 | Alterar quantidade para 2 | Quantidade atualizada e subtotal igual a preço unitário × 2 |
| CAR-04 | Remover item | Carrinho vazio e nenhuma linha de produto |

## Decisões técnicas

Cypress limpa cookies e armazenamento entre testes com `testIsolation: true`. Cada teste de carrinho adiciona seu próprio produto; não depende do cenário anterior. O site de demonstração inspecionado mantém estado no navegador. A suíte não usa APIs internas para preparar o carrinho, de modo que a inclusão também é exercitada pela interface.

Seletores usam IDs existentes, campos de formulário e classes específicas do WooCommerce. Como não controlamos o site, não adicionamos atributos data-cy. A ordenação compara os preços realmente exibidos, usando o valor promocional em `ins` quando disponível e ignorando o preço antigo. A conversão considera o formato atual da loja: ponto decimal e vírgula de milhar.

As asserções nativas repetem a checagem até o timeout. Não há pausas fixas, cliques forçados ou tratamento global que esconda exceções da aplicação. Retry de teste está desabilitado para expor falhas. Helpers pequenos reduzem repetição sem introduzir Page Objects desnecessários.

## Evidências e CI

Vídeos em `cypress/videos/`; screenshots em `cypress/screenshots/` quando há falha. Os arquivos são ignorados pelo Git. O workflow **Cypress - Bellatrix** guarda esses arquivos e XML JUnit no artefato `cypress-bellatrix-evidencias`, por 14 dias. Execução manual: GitHub → Actions → Cypress - Bellatrix → Run workflow.

## Limites e manutenção

A disponibilidade do site e mudanças de catálogo, preço ou DOM podem afetar os testes. Nenhuma execução cria contas ou finaliza pedidos. Não há cobertura de pagamento, login, carga, segurança ou acessibilidade completa. Electron é o navegador validado nesta suíte; isso não comprova compatibilidade com todos os navegadores.

## Para explicar na entrevista

Demonstre uma busca e a atualização de quantidade. Explique por que cada teste cria seu estado, por que se usa o preço promocional, como a asserção detecta uma ordenação incorreta e como investigar vídeos e screenshots. Compare a suíte externa com os testes locais Playwright: ferramentas diferentes, ambientes e objetivos diferentes. Apresente como projeto de estudo elaborado com assistência de IA e valide pessoalmente os cenários.

## Execução verificada

Em 16/11/2026, Cypress 16.3.0 com Electron 150 em Linux executou os dois arquivos contra o site externo: **10 testes aprovados, nenhum reprovado ou ignorado**. A verificação TypeScript do projeto também passou. O resultado descreve essa execução; consulte o workflow para o resultado mais recente. Electron está marcado como descontinuado nesta versão do Cypress; planeje migrar a execução para Chrome antes de atualizar para uma versão que o remova.
