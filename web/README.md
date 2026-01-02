# 📘 Testes Automatizados – WebDojo (Cypress)

Esta documentação descreve a estrutura, configuração e execução dos testes automatizados da aplicação **WebDojo**, utilizando **Cypress** como ferramenta de testes end-to-end (E2E).

---

## 🧪 Visão Geral

O projeto de testes automatizados está no **mesmo repositório** da aplicação WebDojo.  
A aplicação precisa estar em execução para que os testes Cypress funcionem corretamente.

- Ferramenta de testes: **Cypress**
- Tipo de testes: **End-to-End (E2E)**
- Aplicação alvo: **WebDojo (Web)**

---

## 🚀 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- Instalar dependências do projeto:

```bash
npm install
```

---

## ▶️ Executando a aplicação WebDojo

A aplicação WebDojo **deve estar em execução** antes de rodar os testes automatizados.

```bash
npm run dev
```

A aplicação será iniciada em:

```
http://localhost:3000
```

---

## 🧩 Estrutura do Projeto Cypress

```
cypress/
├── e2e/
│   └── login.cy.js
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
├── support/
│   ├── commands.js
│   ├── e2e.js
│   └── utils.js
```

### 📂 Descrição

#### `cypress/e2e/`
Contém os testes E2E da aplicação.

- `login.cy.js` → Fluxos de testes de login.

#### `cypress/fixtures/`
Dados mockados e arquivos utilizados nos testes.

- `cep.json` → Dados de CEP
- `consultancy.json` → Massa de dados de consultoria
- `document.pdf` → Arquivo para testes de upload

#### `cypress/support/`
Configurações globais e utilitários.

- `commands.js` → Comandos customizados
- `e2e.js` → Configuração global do Cypress
- `utils.js` → Funções utilitárias

---

## 🛠️ Scripts Disponíveis

### Subir a aplicação WebDojo
```json
"dev": "serve -s dist -p 3000"
```

### Executar todos os testes (headless)
```json
"test": "npx cypress run"
```

### Abrir Cypress em modo gráfico
```json
"gui": "npx cypress open"
```

### Executar apenas testes de login
```json
"test:login": "npx cypress run --spec 'cypress/e2e/login.cy.js'"
```

### Executar testes de login em viewport mobile
```json
"test:login:mobile": "npx cypress run --spec 'cypress/e2e/login.cy.js' --config viewportWidth=414,viewportHeight=896"
```

---

## 📱 Testes Responsivos

Os testes mobile utilizam configuração de viewport via linha de comando, permitindo validar o comportamento da aplicação em dispositivos móveis.

---

## ✅ Boas Práticas

- Uso de fixtures para dados reutilizáveis
- Comandos customizados centralizados
- Separação clara entre testes, dados e utilitários
- Execução isolada por funcionalidade

---

## 📌 Observações

- A aplicação **precisa estar rodando**
- Ajustes de `baseUrl` podem ser feitos no `cypress.config.js`
- Ideal para integração com CI/CD

---

## 🧭 Próximos Passos

- Adicionar relatórios (Mochawesome / Allure)
- Integrar em pipeline CI/CD
- Criar testes para fluxos críticos
- Parametrizar ambientes

---

📦 Projeto de testes mantido junto à aplicação **WebDojo**.
