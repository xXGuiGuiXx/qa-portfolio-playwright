import { test, expect } from '@playwright/test';
test('API-01 cria, consulta e exclui tarefa', async ({ request }) => {
  const created = await request.post('/api/tasks', { data: { title: '  Preparar entrevista  ' } });
  expect(created.status()).toBe(201);
  const task = await created.json();
  try {
    expect(task).toEqual({ id: expect.any(String), title: 'Preparar entrevista', completed: false });
    const found = await request.get(`/api/tasks/${task.id}`);
    expect(found.status()).toBe(200); expect(await found.json()).toEqual(task);
  } finally { expect((await request.delete(`/api/tasks/${task.id}`)).status()).toBe(204); }
  expect((await request.get(`/api/tasks/${task.id}`)).status()).toBe(404);
});
for (const [name, title] of [['vazio', ''], ['espaços', '   '], ['acima do limite', 'a'.repeat(101)], ['tipo inválido', 42], ['nulo', null]] as const) {
  test(`API-02 rejeita título ${name}`, async ({ request }) => {
    const response = await request.post('/api/tasks', { data: { title } });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: 'Título deve ter entre 1 e 100 caracteres' });
  });
}
test('API-03 aceita limite de 100 caracteres', async ({ request }) => {
  const response = await request.post('/api/tasks', { data: { title: 'a'.repeat(100) } });
  expect(response.status()).toBe(201); const task = await response.json();
  try { expect(task.title).toHaveLength(100); } finally { await request.delete(`/api/tasks/${task.id}`); }
});
test('API-04 rejeita JSON malformado', async ({ request }) => {
  const response = await request.post('/api/tasks', { data: Buffer.from('{'), headers: { 'Content-Type': 'application/json' } });
  expect(response.status()).toBe(400); expect(await response.json()).toEqual({ error: 'JSON inválido' });
});
test('API-05 consulta e exclusão de ID inexistente', async ({ request }) => {
  for (const method of ['get', 'delete'] as const) {
    const response = await request[method]('/api/tasks/inexistente');
    expect(response.status()).toBe(404); expect(await response.json()).toEqual({ error: 'Tarefa não encontrada' });
  }
});
