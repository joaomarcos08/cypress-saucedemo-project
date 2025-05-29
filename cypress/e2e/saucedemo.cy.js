describe('SauceDemo - Testes Automatizados com Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('CT01 - Login com sucesso', () => {
    cy.login();
    cy.url().should('include', '/inventory.html');
  });

  it('CT02 - Login com usuário bloqueado', () => {
    cy.login('locked_out_user');
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
  });

  it('CT03 - Adicionar produto ao carrinho', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
  });

  it('CT04 - Remover produto do carrinho', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('CT05 - Finalizar compra com sucesso', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('QA');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!');
  });

  it('CT06 - Checkout com campos obrigatórios vazios', () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
  });
});
