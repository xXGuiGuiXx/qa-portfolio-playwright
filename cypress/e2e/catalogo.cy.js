describe('Bellatrix — catálogo e busca', () => {
  beforeEach(() => cy.visit('/'));

  it('CAT-01 apresenta catálogo com títulos, preços e links', () => {
    cy.get('h1').should('have.text', 'Shop');
    cy.get('ul.products > li.product').should('have.length.at.least', 1).each(($product) => {
      cy.wrap($product).find('h2').should('not.be.empty');
      cy.wrap($product).find('.price').should('contain', '€');
      cy.wrap($product).find('a.woocommerce-LoopProduct-link').should('have.attr', 'href').and('include', '/product/');
    });
  });

  it('CAT-02 abre os detalhes do Falcon 9', () => {
    cy.contains('ul.products h2', /^Falcon 9$/).click();
    cy.location('pathname').should('eq', '/product/falcon-9/');
    cy.get('h1.product_title').should('have.text', 'Falcon 9');
    cy.get('.summary .price').should('contain', '€');
    cy.get('.summary input.qty').should('have.value', '1');
    cy.get('.single_add_to_cart_button').should('be.visible').and('be.enabled');
  });

  it('CAT-03 busca um produto pelo nome', () => {
    cy.get('#woocommerce-product-search-field-0').type('Falcon{enter}');
    cy.location('search').should('include', 's=Falcon');
    cy.contains('ul.products h2', 'Falcon 9').should('be.visible');
    cy.contains('ul.products h2', 'Falcon Heavy').should('be.visible');
  });

  it('CAT-04 informa busca sem resultados', () => {
    cy.get('#woocommerce-product-search-field-0').type('qa-produto-inexistente-93751{enter}');
    cy.contains('.woocommerce-info', 'No products were found matching your selection.').should('be.visible');
    cy.get('ul.products > li.product').should('not.exist');
  });

  for (const [order, ascending] of [['price', true], ['price-desc', false]]) {
    it(`CAT-05 ordena por preço ${ascending ? 'crescente' : 'decrescente'}`, () => {
      cy.get('select.orderby').first().select(order);
      cy.location('search').should('include', `orderby=${order}`);
      cy.get('ul.products > li.product .price').should(($prices) => {
        const prices = [...$prices].map((el) => {
          // Produtos em promoção têm preço antigo em del e vigente em ins.
          const current = el.querySelector('ins') || el;
          return Number(current.textContent.replace(/[^0-9.]/g, ''));
        });
        expect(prices.length).to.be.greaterThan(1);
        expect(prices.every(Number.isFinite), 'preços numéricos').to.eq(true);
        const sorted = [...prices].sort((a, b) => ascending ? a - b : b - a);
        expect(prices, 'ordem dos preços exibidos').to.deep.eq(sorted);
      });
    });
  }
});
