class productPage {
    elements = {
        productPageUrl:                 () => cy.url().should('eq', 'https://www.everlywell.com/products/food-sensitivity/'),
        productName:                    () => cy.get('[data-testid="heroProductName"]'),
        productPriceWithPromo:          () => cy.get('[data-testid="price-with-promo"]'),
        imageSwiperSlide:               () => cy.get('.swiper-slide-duplicate-active'),
        imageSwiperPaginationBullet:    () => cy.get('.swiper-pagination-bullet'),
        addToCartBtn:                   () => cy.get('[data-testid="addToCartButton"]'),
        cartSlidePage:                  () => cy.get('[data-testid="cart-content"]'),
        cartSubTotal:                   () => cy.get('[data-testid="cart-subtotal"]'),
        cartTotalPrice:                 () => cy.get('[data-testid="cart-total-price"]'),
        cartCheckoutBtn:                () => cy.get('[data-testid="checkout-link"]'),
        
    }
}

module.exports = new productPage();