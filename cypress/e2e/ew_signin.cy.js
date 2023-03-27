import ew_home_page from "../pages/ew_home_page"
import ew_signin_page from "../pages/ew_signin_page"
import ew_dashboard_page from "../pages/ew_dashboard_page"

describe('Everlywell login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Test Login workflow', () => {
        cy.url().should('eq', 'https://www.everlywell.com/')
        cy.get('[data-testid="hero"]').should('contain', 'Sick and tired of being sick and tired? We got you.')
        cy.get('[data-testid="desktop-login-link"]').click()
        cy.url().should('eq', 'https://secure.everlywell.com/login')
        cy.get('.login-container h1').should('contain', 'Log In to My Everly')

        // Type login credentials
        cy.get('[data-test="email-field"]').type('firstname@gmail.com').should('have.value', 'firstname@gmail.com')
        cy.get('[data-test="password-field"]').type('Test123!1')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('eq', 'https://results.everlywell.com/dashboard')
        
        // Validate the welcome message 
        cy.get('#app').should('contain', 'Hi,')
            .find('main div .row header h1 var').should('contain', 'First')
            .next().should('contain', 'Welcome to your dashboard')

        // Validate side navigation
        cy.get('[data-testid="my-everly-side-link"]').should('contain', 'My Everly')
            .should('have.class', 'active').and('have.attr', 'href').and('include', '/dashboard')
        cy.get('[data-testid="test-results-side-link"]').should('contain', 'Test Results')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/results')
        cy.get('[data-testid="virtual-care-side-link"]').should('contain', 'Virtual Care')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/virtual-care')
        cy.get('[data-testid="settings-side-link"]').should('contain', 'Settings')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/account/settings')
    });

    it('Test Login workflow (POM)', () => {
        cy.url().should('eq', 'https://www.everlywell.com/')
        ew_home_page.elements.getMainText().should('contain', 'Sick and tired of being sick and tired? We got you.')
        ew_home_page.elements.getTreatmentNowBtn().should('be.visible')
        ew_home_page.elements.loginBtn().click()
        cy.url().should('eq', 'https://secure.everlywell.com/login')
        ew_signin_page.elements.loginContainer().should('contain', 'Log In to My Everly')

        // Type login credentials
        ew_signin_page.elements.email().type('firstname@gmail.com')
        ew_signin_page.elements.password().type('Test123!1')
        ew_signin_page.elements.loginBtn().click()
        cy.url().should('eq', 'https://results.everlywell.com/dashboard')
        
        // Validate the welcome message 
        ew_dashboard_page.elements.welcomeMsg().should('contain', 'Welcome to your dashboard')

        // Validate side navigation
        ew_dashboard_page.elements.myEverlySideLink().should('contain', 'My Everly')
            .should('have.class', 'active').and('have.attr', 'href').and('include', '/dashboard')
        ew_dashboard_page.elements.testResultsSideLink().should('contain', 'Test Results')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/results')
        ew_dashboard_page.elements.virtualCareSideLink().should('contain', 'Virtual Care')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/virtual-care')
        ew_dashboard_page.elements.settingsSideLink().should('contain', 'Settings')
            .should('not.have.class', 'active').and('have.attr', 'href').and('include', '/account/settings')
    });
}) 