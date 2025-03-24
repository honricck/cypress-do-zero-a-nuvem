describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach (()=> {
    cy.visit ( './src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    
  })

  it('preenche os campos obrigatórios e envia o formulário',() =>{
    const longText = Cypress._.repeat ('Keep going!!', 10)

    cy.get('#firstName').type('Paulo Ricardo')
    cy.get('#lastName').type('Honorio')
    cy.get('#email').type('exemplo@teste.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter formulário com email com formatação inválida',() =>{
    cy.get('#firstName').type('Paulo Ricardo')
    cy.get('#lastName').type('Honorio')
    cy.get('#email').type('exemplo#teste.com')
    cy.get('#open-text-area').type('Bons Estudos!!')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numérico',() =>{
    cy.get('#phone')
      .type('abcde')
      .should('have.value','')
    })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() =>{
    cy.get('#firstName').type('Paulo Ricardo')
    cy.get('#lastName').type('Honorio')
    cy.get('#email').type('exemplo@teste.com')
    cy.get('#open-text-area').type('Testando')
    cy.get('#phone-checkbox').check()
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
      cy.get('#firstName')
        .type('Paulo Ricardo')
        .should('have.value', 'Paulo Ricardo')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Honorio')
        .should('have.value', 'Honorio')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('exemplo@teste.com')
        .should('have.value', 'exemplo@teste.com')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('123456789')
        .should('have.value','123456789')
        .clear()
        .should('have.value','')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Paulo',
        lastName: 'Honorio',
        email: 'exemplo@teste.com',
        text: 'Testando!'
      }
      cy.fillMandatoryFieldsAndSubmit(data)
      cy.get('.success')
        .should('be.visible')
    }) 

    it('seleciona um produto (YouTube) por seu texto',() => {
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })
    
    it('seleciona um produto (Mentoria) por seu valor (value)',() => {
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) pelo seu índice',() =>{
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

      })

    it('marca o tipo de atendimento "Feedback"', ()=> {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
    })
    it('marca cada tipo de atendimento',()=>{
      cy.get('input[type="radio"]')
        .each(typeOfService=> {
            cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })
    })
  it('marca ambos checkboxes, depois desmarca o ultimo',()=>{
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    })
  it('seleciona um arquivo da pasta fixtures',()=> {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
      })
     })
  
  it('seleciona um arquivo simulando um drag-and-drop',()=>{
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  
  it('seleciona um arquivo para qual foi dado um alias',()=>{
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    })
   
})
