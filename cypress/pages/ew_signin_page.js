class signInPage{
    elements = {
        loginContainer: () => cy.get('.login-container h1'),
        email:          () => cy.get('[data-test="email-field"]'),
        password:       () => cy.get('[data-test="password-field"]'),
        loginBtn:       () => cy.get('[data-test="login-button"]'),
    }
}

module.exports = new signInPage();