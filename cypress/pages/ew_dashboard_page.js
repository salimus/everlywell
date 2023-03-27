class dashboardPage {
    elements = {
        welcomeMsg:             () => cy.get('#app').should('contain', 'Hi,').find('main div .row header h1 var').should('contain', 'First').next(),
        myEverlySideLink:       () => cy.get('[data-testid="my-everly-side-link"]'),
        testResultsSideLink:    () => cy.get('[data-testid="test-results-side-link"]'),
        virtualCareSideLink:    () => cy.get('[data-testid="virtual-care-side-link"]'),
        settingsSideLink:       () => cy.get('[data-testid="settings-side-link"]'),
        registerKitBtn:         () => cy.get('[appearance=primary]'),

    }
}

module.exports = new dashboardPage();