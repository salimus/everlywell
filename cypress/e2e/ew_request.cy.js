describe('Shopping cart and promo code api testing',() => {
    let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1NTc4MDIxLCJ0b2tlbiI6Im1VMURpS2dQTEstYnBaSHJpa1dtancxNjc5NDcxMDc5NzcyIiwiZXhwIjoxNjgxMjU3NzMxfQ.gpgiyqGnHJKOf-3cpF1Ek7tiptMuwjgtb3zLfWx2wJc'

    it("will test the retrieval of the items in the user's shopping cart and asserts the subtotal price", () => {
        
        cy.request({
            method : 'GET',
            url : 'https://secure.everlywell.com/aapi/v2/orders/18460783',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }).then( (res) => {
            expect(res.status).to.eq(200)
            console.log(res);
            // Assert that 2 items in the cart
            expect(res.body.line_items).to.have.length(2)

            // Subtotal assertion
            let sumOfItems = parseInt(res.body.line_items[0].total) + parseInt(res.body.line_items[1].total);
            let subTotalPrice = sumOfItems.toString() + '.00'
            console.log(subTotalPrice)
            expect(res.body.amount).to.eq(subTotalPrice)
        })
    })

    it("will test by applying a coupon code and asserts the subtotal price", () => {
        
        cy.request({
            method : 'PUT',
            url : 'https://secure.everlywell.com/aapi/v2/orders/18460783/add_promo',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: {coupon_code: "EVERLY20"}
        }).then( (res) => {
            expect(res.status).to.eq(200)
            // Assert that 2 items in the cart
            expect(res.body.line_items).to.have.length(2)

            // Subotal assertion after appliying promo code
            let sumOfItems = parseFloat(res.body.line_items[0].amount) + parseFloat(res.body.line_items[1].amount) + parseFloat(res.body.promo_total);
            let subTotalPrice = sumOfItems.toString() + '0'
            console.log(subTotalPrice)
            expect(res.body.total).to.eq(subTotalPrice)
        })
    })

    it("will test by removing applied coupon code and asserts the subtotal price", () => {
        
        cy.request({
            method : 'PUT',
            url : 'https://secure.everlywell.com/aapi/v2/orders/18460783/remove_promos',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }).then( (res) => {
            expect(res.status).to.eq(200)
            // Assert that 2 items in the cart
            expect(res.body.line_items).to.have.length(2)

            let sumOfItems = parseFloat(res.body.line_items[0].total) + parseFloat(res.body.line_items[1].total);
            let subTotalPrice = sumOfItems.toString() + '.00'
            console.log(subTotalPrice)
            expect(res.body.total).to.eq(subTotalPrice)
        })
    })

    it("will test failed coupon code and asserts the subtotal price", () => {
        
        cy.request({
            method : 'PUT',
            url : 'https://secure.everlywell.com/aapi/v2/orders/18460783/add_promo',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            },
            body: {coupon_code: "PROMO_TEST"}
        }).then( (res) => {

            expect(res.body).to.include("The coupon code you entered doesn't exist. Please try again.")
        })
    })

})