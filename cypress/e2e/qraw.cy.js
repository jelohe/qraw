describe('QRaw', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      console.error('Uncaught error:', err.message);
      throw err;
    });
  });

  it('loads Scan page without errors', () => {
    cy.visit('https://localhost:3000');
    cy.get('.header-brand').should('contain', 'QRaw');
    cy.get('.terminal-panel').should('exist');
    cy.contains('[SCANNER]').should('exist');
    cy.get('.header-controls select').should('have.length', 2);
  });

  it('navigates to Upload without errors', () => {
    cy.visit('https://localhost:3000/upload');
    cy.contains('[UPLOAD]').should('exist');
  });

  it('navigates to Create without errors', () => {
    cy.visit('https://localhost:3000/create');
    cy.contains('[DATA IN]').should('exist');
  });

  it('navigates to History without errors', () => {
    cy.visit('https://localhost:3000/history');
    cy.contains('QR History').should('exist');
  });

  it('toggles theme without errors', () => {
    cy.visit('https://localhost:3000');
    cy.get('.header-theme select').select('dark');
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('.header-theme select').select('light');
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('switches language without errors', () => {
    cy.visit('https://localhost:3000');
    cy.get('.header-lang select').select('es');
    cy.contains('Escáner').should('exist');
    cy.get('.header-lang select').select('en');
    cy.contains('Camera').should('exist');
  });

  it('create page generates QR without errors', () => {
    cy.visit('https://localhost:3000/create');
    cy.get('.terminal-input-group input').type('https://example.com');
    cy.get('.terminal-panel__body button').click();
    cy.contains('[DATA ENCODED]').should('exist');
    cy.get('.qr-output svg').should('exist');
    cy.contains('Discard').click();
    cy.contains('[DATA IN]').should('exist');
  });

  it('404 page shows without errors', () => {
    cy.visit('https://localhost:3000/nonexistent');
    cy.contains('404').should('exist');
  });
})
