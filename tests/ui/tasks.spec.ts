import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => { await page.goto('/'); });
test('UI-01 adiciona, conclui e exclui tarefa', async ({ page }) => {
  await page.getByLabel('Nova tarefa').fill('Estudar testes');
  await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  const row = page.getByRole('listitem').filter({ hasText: 'Estudar testes' });
  await expect(row).toBeVisible(); await expect(page.getByRole('status')).toHaveText('Tarefa adicionada');
  await row.getByRole('checkbox').check(); await expect(row.getByRole('checkbox')).toBeChecked();
  await expect(row).toHaveClass('done');
  await row.getByRole('button', { name: 'Excluir Estudar testes', exact: true }).click(); await expect(row).toHaveCount(0);
});
test('UI-02 impede título em branco', async ({ page }) => {
  await page.getByLabel('Nova tarefa').fill('   '); await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Informe o título da tarefa'); await expect(page.getByRole('listitem')).toHaveCount(0);
});
test('UI-03 informa falha da API', async ({ page }) => {
  await page.route('**/api/tasks', route => route.fulfill({ status: 500, contentType: 'application/json', body: '{}' }));
  await page.getByLabel('Nova tarefa').fill('Falha simulada'); await page.getByRole('button', { name: 'Adicionar', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Não foi possível adicionar a tarefa'); await expect(page.getByRole('listitem')).toHaveCount(0);
});
