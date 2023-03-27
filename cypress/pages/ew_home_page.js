class homePage{
    elements = {
        homePageUrl:            () => cy.url().should('eq', 'https://www.everlywell.com/'),
        loginBtn:               () => cy.get('[data-testid="desktop-login-link"]'),
        getMainText:            () => cy.get('[data-testid="hero"]'),
        getTreatmentNowBtn:     () => cy.get('[data-testid="second-cta-button-test-control"]'),
        cartQuantityIcon:       () => cy.get('[data-testid="cart-quantity"]'),
        homePageCart:           () => cy.get('[data-testid="open-cart"]'),
        cartRemoveLink:         () => cy.get('[data-testid="remove-cart-item"]'),
        emptyCartMsg:           () => cy.get('[data-testid="empty-cart"]')
    }
}

module.exports = new homePage();