function addFalcon() {
  cy.visit('/product/falcon-9/');
  cy.get('.single_add_to_cart_button').click();
  cy.get('.woocommerce-message').should('contain', 'Falcon 9');
  cy.visit('/cart/');
  cy.get('.cart_item').should('have.length', 1).and('contain', 'Falcon 9');
}
function amount($element) {
  return Number($element.text().replace(/[^0-9.]/g, ''));
}

describe('Bellatrix — carrinho', () => {
  it('CAR-01 mostra carrinho vazio em uma sessão nova', () => {
    cy.visit('/cart/');
    cy.contains('.cart-empty', 'Your cart is currently empty.').should('be.visible');
    cy.get('a.wc-backward').should('be.visible').and('contain', 'Return to shop');
  });

  it('CAR-02 adiciona produto e mantém o item ao recarregar', () => {
    addFalcon();
    cy.get('.cart_item input.qty').should('have.value', '1');
    cy.reload();
    cy.get('.cart_item').should('have.length', 1).and('contain', 'Falcon 9');
    cy.get('.cart_item input.qty').should('have.value', '1');
  });

  it('CAR-03 atualiza quantidade e calcula subtotal', () => {
    addFalcon();
    cy.get('.cart_item .product-price').then(($price) => {
      const unitPrice = amount($price);
      expect(unitPrice).to.be.greaterThan(0);
      cy.get('.cart_item input.qty').clear().type('2');
      cy.get('button[name="update_cart"]').click();
      cy.get('.cart_item input.qty').should('have.value', '2');
      cy.get('.cart_item .product-subtotal').should(($subtotal) => {
        expect(amount($subtotal)).to.eq(unitPrice * 2);
      });
    });
  });

  it('CAR-04 remove o produto e retorna ao estado vazio', () => {
    addFalcon();
    cy.get('.cart_item a.remove').click();
    cy.contains('.cart-empty', 'Your cart is currently empty.').should('be.visible');
    cy.get('.cart_item').should('not.exist');
  });
});
