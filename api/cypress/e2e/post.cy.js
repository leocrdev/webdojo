
describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'SpiderMan',
      email: 'peter@parker.com',
      password: 'abc123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully registered!')
      expect(response.body.user.id).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)
    })

  })

  it('Não deve cadastrar com e-mail duplicado', () => {

    const user = {
      name: 'Cyclops',
      email: 'scott@summers.com',
      password: 'abc123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('E-mail already registered')
    })

  })

  it('O Campo name deve ser obrigatório', () => {

    const user = {
      email: 'spider@spiders.com',
      password: 'abc123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Name is required')
    })
  })

  it('O Campo e-mail deve ser obrigatório', () => {

    const user = {
      name: 'Charles Xavier',
      password: 'abc123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('E-mail is required')
    })
  })

  it('O campo senha deve ser obrigatório', () => {

    const user = {
      name: 'Hank Maccoy',
      email: 'hank@fera.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Password is required')
    })
  })

  Cypress.Commands.add('postUser', (user) => {
    return cy.api({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: user,
      failOnStatusCode: false
    })
  })

  it('Não deve passar quando o JSON está mal formatado', () => {

    const malformedJson = `{
      name: 'Eric Magneto',
      email: 'eric@xmen.com'
      password: 'abc123'
    }`

    cy.postMalformedJson(malformedJson).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })
  })

})