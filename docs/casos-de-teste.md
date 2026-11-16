# Casos de teste e exploração

Pré-condição: `npm start`, aplicação aberta em http://127.0.0.1:3000, lista inicial vazia. Reiniciar o servidor limpa os dados da API.

| ID | Passos / dados | Resultado esperado | Automação |
| --- | --- | --- | --- |
| CT-01 | Informar Estudar testes e adicionar | Um item e confirmação; campo limpo | UI-01 (item e confirmação) |
| CT-02 | Marcar checkbox do item | Checkbox marcado e título riscado | UI-01 |
| CT-03 | Excluir item | Item removido e API sem o registro | UI-01 / API-01 |
| CT-04 | Adicionar somente espaços | Mensagem de validação, lista vazia | UI-02 |
| CT-05 | Criar via API com título vazio, espaços, número ou null | 400 e erro de validação | API-02 |
| CT-06 | Criar via API com 100 e 101 letras | 201 para 100; 400 para 101 | API-03 / API-02 |
| CT-07 | Enviar JSON incompleto | 400 e erro de JSON | API-04 |
| CT-08 | Consultar e excluir ID inexistente | 404 | API-05 |
| CT-09 | Simular 500 na criação pela interface | Mensagem de erro e nenhum item | UI-03 |

CT-01 inclui limpeza do campo como checagem manual adicional, ainda sem asserção automatizada.

## Sessão exploratória sugerida — 20 minutos

Investigar entrada e feedback: acentos, emoji, HTML como texto, título com espaços nas bordas, cliques rápidos, navegação com Tab/Enter/Espaço, falha de rede e exclusão. Anotar ambiente, dados, passos, comportamento observado e impacto. Recarregar a página: a ausência de recarga dos itens é uma limitação documentada desta fixture.

Registrar resultados reais com data, versão/commit, cenário, aprovado/reprovado e evidência. Esta lista é um plano; não comprova execução manual.
