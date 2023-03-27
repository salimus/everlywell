class allProductPage {
    elements = {
        allProductPageUrl:      () => cy.url().should('eq', 'https://www.everlywell.com/products/'),
        productCardId:          () => cy.get('[data-testid="productCard"]'),
        settingsSideLink:       () => cy.get('[data-testid="settings-side-link"]'),
        registerKitBtn:         () => cy.get('[appearance=primary]'),
        
    }
}

module.exports = new allProductPage();
