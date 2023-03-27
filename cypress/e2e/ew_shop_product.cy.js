import ew_home_page from "../pages/ew_home_page"
import ew_dashboard_page from "../pages/ew_dashboard_page"
import ew_all_product_page from "../pages/ew_all_product_page"
import ew_product_page from "../pages/ew_product_page"
import ew_checkout_page from "../pages/ew_checkout_page"

describe('Everlywell login', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Shop for some product', () => {
        let foodSensTest = 'Food Sensitivity Test';
        let price = 199;
        // Login with the custom command
        cy.login('firstname@gmail.com', 'Test123!1')
        cy.get('[appearance=primary]').next().click()
        cy.wait(1000)
        // Validate the URL
        cy.url().should('eq', 'https://www.everlywell.com/products/')

        cy.wait(7000)
        
        // Close special offer iFrame pop-up
        cy.get('iframe[data-ex="28098"]')
            .should('be.visible')
            .then(($iframe) => {
            
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
            .find('#justuno_form .frame-container .design-layer-editable').first().click()
            })
        
        cy.get('[data-testid="productCard"]')
            .should('have.length',  40)
            .first().should('contain', `${foodSensTest}`)
            .find('[data-testid="pricing-wrapper"]')
            .should('contain', `${price}`).click()
        cy.url().should('eq', 'https://www.everlywell.com/products/food-sensitivity/')

        // Validate the product details
        cy.get('[data-testid="heroProductName"]')
            .should('contain', `${foodSensTest}`)
        cy.get('[data-testid="price-with-promo"]')
            .should('contain', `${price}`)

        // Validates image in the carousel
        cy.get('.swiper-slide-duplicate-active')
            .should('have.attr', 'data-swiper-slide-index')
            .and('include', '0')
        // Validates swiper should be active
        cy.get('.swiper-pagination-bullet')
            .first().should('have.attr', 'class')
            .and('include', 'swiper-pagination-bullet-active')
        
        // Add product to cart
        cy.get('[data-testid="stripe-express-pay"]')
            .prev('[data-testid="addToCartButton"]').click({force: true})
        
        // Validate that cart
        cy.get('[data-testid="cart-content"]').should('be.visible')

        cy.wait(8000)
        
        // Close special offer iFrame pop-up
        cy.get('iframe[data-ex="0"]')
            .should('be.visible')
            .then(($iframe) => {
            
            const $body = $iframe.contents().find('body')
            cy.wrap($body)
            .find('#justuno_form .frame-container .design-layer-editable').first().click()
            })
        
        // Validate product name, price, subtotal and total in the cart
        cy.get('[data-testid="cart-content"]')
            .should('be.visible')
            .find('[data-testid="cart-product"]').should('contain', `${foodSensTest}`)
            .and('contain', `${price}`)
        
        cy.get('[data-testid="cart-subtotal"]').should('contain', `${price}`)
        cy.get('[data-testid="cart-total-price"]').should('contain', `${price}`)

        // Click on checkout button
        cy.get('[data-testid="checkout-link"]').first().click({force: true})

        // Validate checkout URL
        cy.url().should('eq', 'https://www.everlywell.com/checkout/')
        
        cy.get('[data-testid="checkoutContainer"]').should('contain', 'Secure Checkout')

        // Validate product name and price in the checkout page
        cy.get('[data-testid="line-item-name"]').should('contain', `${foodSensTest}`)
        cy.get('[data-testid="line-item-total"]').should('contain', `${price}`)

        // Click on Everywell icon to navigate to home page
        cy.get('#app').find('a').first().click()

        // Validate URL for home page
        cy.url().should('eq', 'https://www.everlywell.com/')

        // Validate cart quantity
        cy.get('[data-testid="cart-quantity"]').should('contain', 1)

        // Remove item from the cart
        cy.get('[data-testid="open-cart"]').last().click()
        cy.get('[data-testid="remove-cart-item"]').last().click()

        // Validate that cart is empty
        cy.get('[data-testid="empty-cart"]').should('contain', 'Your shopping cart is empty')
    })

    it('Shop for some product (POM)', () => {
        let foodSensTest = 'Food Sensitivity Test';
        let price = 199;
        // Login with the custom command
        cy.login('firstname@gmail.com', 'Test123!1')
        ew_dashboard_page.elements.registerKitBtn().next().click()
        cy.wait(1000)
        // Validate the URL for all products page
        ew_all_product_page.elements.allProductPageUrl()
        cy.wait(7000)

        // Close special offer iFrame pop-up
        cy.all_product_iframe()
        
        ew_all_product_page.elements.productCardId()
            .should('have.length',  40)
            .first().should('contain', `${foodSensTest}`)
            .find('[data-testid="pricing-wrapper"]')
            .should('contain', `${price}`).click()

        // Validate product page URL
        ew_product_page.elements.productPageUrl()

        // Validate the product details
        ew_product_page.elements.productName()
            .should('contain', `${foodSensTest}`)
        ew_product_page.elements.productPriceWithPromo()
            .should('contain', `${price}`)

        // Validates image in the carousel
        ew_product_page.elements.imageSwiperSlide()
            .should('have.attr', 'data-swiper-slide-index')
            .and('include', '0')
        // Validates swiper should be active
        ew_product_page.elements.imageSwiperPaginationBullet()
            .first().should('have.attr', 'class')
            .and('include', 'swiper-pagination-bullet-active')
        
        // Add product to cart
        ew_product_page.elements.addToCartBtn().first().click({force: true})

        cy.wait(8000)
        
        // Close special offer iFrame pop-up
        cy.product_page_iframe()
        
        // Validate product name, price, subtotal and total in the cart
        ew_product_page.elements.cartSlidePage()
            .find('[data-testid="cart-product"]').should('contain', `${foodSensTest}`)
            .and('contain', `${price}`)
        
        ew_product_page.elements.cartSubTotal().should('contain', `${price}`)
        ew_product_page.elements.cartTotalPrice().should('contain', `${price}`)

        // Click on checkout button
        ew_product_page.elements.cartCheckoutBtn().first().click({force: true})

        // Validate checkout URL
        ew_checkout_page.elements.checkoutPageUrl()
        
        ew_checkout_page.elements.checkoutContainer().should('contain', 'Secure Checkout')

        // Validate product name and price in the checkout page
        ew_checkout_page.elements.checkoutItemName().should('contain', `${foodSensTest}`)
        ew_checkout_page.elements.checkoutItemTotal().should('contain', `${price}`)

        // Click on Everywell icon to navigate to home page
        cy.get('#app').find('a').first().click()

        // Validate URL for home page
        ew_home_page.elements.homePageUrl()

        // Validate cart quantity
        ew_home_page.elements.cartQuantityIcon().should('contain', 1)

        // Remove item from the cart
        ew_home_page.elements.homePageCart().last().click()
        ew_home_page.elements.cartRemoveLink().last().click()

        // Validate that cart is empty
        ew_home_page.elements.emptyCartMsg().should('contain', 'Your shopping cart is empty')
    })
}) 