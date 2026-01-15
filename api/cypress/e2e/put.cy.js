describe('PUT /api/users/:id', () => {

    context('Atualização', () => {
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@sppider2.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'SPiderman',
            email: 'spider@spider.com',
            password: 'abc123'
        }

        before(() => {

            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)


            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuário existente', () => {

            cy.putUsers(userId, updatedUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            })
        })

    })

    context('Campos obrigatórios', () => {
        it('O Campo name deve ser obrigatório', () => {

            const user = {
                email: 'spider@spiders.com',
                password: 'abc123'
            }

            cy.putUsers(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Name is required')
            })
        })

        it('O Campo e-mail deve ser obrigatório', () => {

            const user = {
                name: 'Charles Xavier',
                password: 'abc123'
            }

            cy.putUsers(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('E-mail is required')
            })
        })

        it('O campo senha deve ser obrigatório', () => {

            const user = {
                name: 'Hank Maccoy',
                email: 'hank@fera.com'
            }

            cy.putUsers(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Password is required')
            })
        })
    })
})
