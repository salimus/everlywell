// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('[data-test="email-field"]').type(email)
    cy.get('[data-test="password-field"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.wait(1000)
    cy.url().should('eq', 'https://results.everlywell.com/dashboard')
})

Cypress.Commands.add('all_product_iframe', () => {
    cy.get('iframe[data-ex="28098"]')
        .should('be.visible')
        .then(($iframe) => {
            
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
        .find('#justuno_form .frame-container .design-layer-editable').first().click()
        })
})

Cypress.Commands.add('product_page_iframe', () => {
     cy.get('iframe[data-ex="0"]')
        .should('be.visible')
        .then(($iframe) => {
            
        const $body = $iframe.contents().find('body')
        cy.wrap($body)
        .find('#justuno_form .frame-container .design-layer-editable').first().click()
        })
})
