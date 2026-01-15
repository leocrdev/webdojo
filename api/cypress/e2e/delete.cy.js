describe('DELETE /api/users/:id', () => {

    let userId

    const user = {
        name: 'Bruce Banner',
        email: 'hulk@marvel.com',
        password: 'abc123'
    }

    before(() => {
        cy.task('deleteUser', user.email)

        cy.postUser(user).then(response => {
            cy.log(response.body.user.id)
            userId = response.body.user.id
        })
    })

    it('Deve remover um usuário existente', () => {
        cy.api({
            method: 'DELETE',
            url: 'http://localhost:3333/api/users/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(204)
        })
    })
    after(() => {
            cy.getUsers().then(response => {
                const hulk = response.body.find(user => user.id === userId)
                expect(hulk).to.be.undefined
            })
        })
})