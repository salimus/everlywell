class checkoutPage {
    elements = {
        checkoutPageUrl:                () => cy.url().should('eq', 'https://www.everlywell.com/checkout/'),
        checkoutContainer:              () => cy.get('[data-testid="checkoutContainer"]'),
        checkoutItemName:               () => cy.get('[data-testid="line-item-name"]'),
        checkoutItemTotal:              () => cy.get('[data-testid="line-item-total"]'),
        imageSwiperPaginationBullet:    () => cy.get('.swiper-pagination-bullet'),
        addToCartBtn:                   () => cy.get('[data-testid="addToCartButton"]'),
        cartSlidePage:                  () => cy.get('[data-testid="cart-content"]'),
        cartSubTotal:                   () => cy.get('[data-testid="cart-subtotal"]'),
        cartTotalPrice:                 () => cy.get('[data-testid="cart-total-price"]'),
        cartCheckoutBtn:                () => cy.get('[data-testid="checkout-link"]'),
        
    }
}

module.exports = new checkoutPage();