import { personal, company } from '../fixtures/consultancy.json'


describe('Formulario de Consultoría', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

        cy.fixture('consultancy').as('consultancyData')
    })
    it('Deve solicitar consultoria individual', () => {

        cy.get('input[placeholder="Digite seu nome completo"]').type(personal.name)
        cy.get('input[placeholder="Digite seu email"]').type(personal.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(personal.phone)
        //.should('have.value', '(62) 98585-8585')


        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(personal.document)
        //.should('have.value', '785.698.857-98')


        personal.discoveryChannels.forEach(channel => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)
            .should('have.value', 'Gostaria de uma consultoria para melhorar minhas habilidades em Cypress e automação de testes.')

        personal.tech.forEach(tech => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')

                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

            if (personal.terms === true)
                cy.contains('label', 'termos de uso')
                    .find('input')
                    .check()

            cy.contains('button', 'Enviar formulário')
                .click()

            cy.get('.modal', { timeout: 7000 })
                .should('be.visible')
                .find('.modal-content')
                .should('be.visible')
                .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')


        })
    })


    it('Deve solicitar consultoria In Company', () => {


        cy.get('input[placeholder="Digite seu nome completo"]').type(company.name)
        cy.get('input[placeholder="Digite seu email"]').type(company.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(company.phone)
        //.should('have.value', '(62) 98585-8585')


        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancyType)


        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')


        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(company.document)
        //.should('have.value', '785.698.857-98')


        company.discoveryChannels.forEach(channel => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)
            .should('have.value', 'Gostaria de uma consultoria para melhorar minhas habilidades em Cypress e automação de testes.')

        company.tech.forEach(tech => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')

                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

            if (company.terms === true)
                cy.contains('label', 'termos de uso')
                    .find('input')
                    .check()

            cy.contains('button', 'Enviar formulário')
                .click()

            cy.get('.modal', { timeout: 7000 })
                .should('be.visible')
                .find('.modal-content')
                .should('be.visible')
                .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')


        })
    })

})
