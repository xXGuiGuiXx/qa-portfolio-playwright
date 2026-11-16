# Exemplo didático de relato de defeito

**Este é um exemplo hipotético; não representa um defeito encontrado e reproduzido nesta versão.**

Título: [Inclusão] Interface exibe sucesso quando API responde 500.

Ambiente: informar sistema, navegador, versão do projeto e URL.
Pré-condição: aplicação aberta e resposta 500 simulada no POST /api/tasks.

1. Informar “Preparar entrevista”.
2. Selecionar Adicionar.
3. Observar mensagem e lista.

Esperado: exibir falha de inclusão e não adicionar item.
Observado no exemplo hipotético: mensagem de sucesso mesmo sem criação.
Impacto: usuário acredita que salvou uma tarefa que será perdida.
Severidade sugerida: alta. Prioridade: definida com produto conforme frequência e contexto.
Evidências a anexar em um caso real: screenshot, trace e resposta HTTP, sem informações sensíveis.
Regressão relacionada: UI-03 valida a mensagem de erro e ausência do item.
