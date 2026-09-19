# 📊 Analisador de Ações

Aplicação web para consulta e análise de informações financeiras de empresas listadas na bolsa de valores brasileira.

O projeto permite pesquisar empresas por ticker, consultar indicadores financeiros, visualizar históricos através de gráficos e comparar diferentes empresas lado a lado.

> **Objetivo:** organizar e apresentar informações financeiras de forma clara para fins de análise. O sistema não realiza recomendações de compra ou venda de ações.

---

## 🚀 Funcionalidades

* 🔎 Pesquisa de empresas por ticker;
* 🏢 Consulta de informações cadastrais;
* 📊 Visualização de indicadores financeiros;
* 📈 Histórico financeiro;
* 💰 Histórico de preços;
* 💵 Histórico de dividendos;
* 📉 Gráficos de evolução financeira;
* ⚖️ Comparação entre empresas;
* 🔌 API REST para comunicação entre Front-End e Back-End.

### Indicadores

O sistema trabalha com indicadores como:

* **P/L** — Preço/Lucro;
* **ROE** — Retorno sobre o Patrimônio;
* **Margem Líquida**;
* **Dívida Líquida/EBITDA**;
* **Dividend Yield**.

---

# 🏗️ Arquitetura

O projeto é dividido em três principais partes:

```text
┌─────────────────────┐
│      Next.js        │
│     Front-End       │
└──────────┬──────────┘
           │
           │ HTTP / REST
           ▼
┌─────────────────────┐
│    Spring Boot      │
│      Back-End       │
│       Java          │
└──────────┬──────────┘
           │
           │ JPA / Hibernate
           ▼
┌─────────────────────┐
│     PostgreSQL      │
│      Database       │
└─────────────────────┘
```

O Front-End é responsável pela interface e visualização dos dados, enquanto o Back-End fornece uma API REST responsável pelas regras de negócio e acesso ao banco de dados.

---

# 🛠️ Tecnologias

## Front-End

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Tailwind CSS
* Recharts

## Back-End

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* Bean Validation
* Maven

## Banco de Dados

* PostgreSQL

## Outras ferramentas

* Git
* GitHub
* Swagger / OpenAPI
* Flyway

---

# 📂 Estrutura do Projeto

A aplicação é organizada separando o Front-End e o Back-End:

```text
analisador-de-acoes/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── pom.xml
│   └── ...
│
└── README.md
```

> A estrutura acima representa a organização esperada do projeto. Os nomes das pastas podem variar conforme a implementação atual.

---

# 🗄️ Banco de Dados

O projeto utiliza PostgreSQL para armazenamento das informações.

### Principais entidades

#### Company

Representa uma empresa cadastrada.

```text
Company
├── id
├── ticker
├── name
├── legalName
├── cnpj
├── sector
├── segment
└── status
```

#### FinancialIndicator

Armazena os dados financeiros.

```text
FinancialIndicator
├── id
├── companyId
├── referenceDate
├── revenue
├── netIncome
├── equity
├── ebitda
├── netDebt
└── earningsPerShare
```

#### StockPrice

Armazena os preços históricos.

```text
StockPrice
├── id
├── companyId
├── date
└── closePrice
```

#### Dividend

Armazena informações sobre dividendos.

```text
Dividend
├── id
├── companyId
├── paymentDate
├── amountPerShare
└── type
```

### Relacionamentos

```text
Company
   │
   ├── 1:N ── FinancialIndicator
   │
   ├── 1:N ── StockPrice
   │
   └── 1:N ── Dividend
```

---

# 🔌 API REST

O Back-End disponibiliza uma API REST para o Front-End.

## Empresas

### Listar empresas

```http
GET /api/companies
```

Retorna todas as empresas cadastradas.

### Buscar empresa

```http
GET /api/companies/{ticker}
```

Exemplo:

```http
GET /api/companies/PETR4
```

---

## Indicadores

```http
GET /api/companies/{ticker}/indicators
```

Exemplo:

```http
GET /api/companies/PETR4/indicators
```

Resposta:

```json
{
  "ticker": "PETR4",
  "peRatio": 7.82,
  "roe": 21.43,
  "netMargin": 18.52,
  "netDebtEbitda": 0.45,
  "dividendYield": 8.31
}
```

---

## Histórico financeiro

```http
GET /api/companies/{ticker}/financials
```

---

## Preços históricos

```http
GET /api/companies/{ticker}/prices
```

---

## Dividendos

```http
GET /api/companies/{ticker}/dividends
```

---

## Comparação

```http
GET /api/companies/compare?tickers=PETR4,VALE3,WEGE3
```

Retorna os indicadores das empresas selecionadas para comparação.

---

# 🖥️ Front-End

O Front-End foi desenvolvido utilizando **Next.js, React e TypeScript**.

Entre as principais páginas estão:

### 🏠 Página inicial

Permite pesquisar uma empresa através do ticker.

### 🏢 Página de empresas

Exibe as empresas disponíveis para consulta.

### 📊 Página da empresa

Apresenta:

* Informações da empresa;
* Cotação;
* Indicadores;
* Gráficos;
* Histórico financeiro;
* Preços históricos;
* Dividendos.

### ⚖️ Página de comparação

Permite selecionar duas ou mais empresas e visualizar seus indicadores lado a lado.

---

# ⚙️ Como executar o projeto

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

* **Java 21 ou superior**
* **Node.js 18 ou superior**
* **npm**
* **PostgreSQL**
* **Git**

Verifique as versões:

```bash
java -version
```

```bash
node -v
```

```bash
npm -v
```

```bash
psql --version
```

---

# 🔙 Executando o Back-End

Entre na pasta do Back-End:

```bash
cd backend
```

Configure as informações do PostgreSQL no arquivo:

```text
src/main/resources/application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/analisador_acoes
spring.datasource.username=postgres
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Crie o banco de dados no PostgreSQL:

```sql
CREATE DATABASE analisador_acoes;
```

Depois, execute o projeto com Maven:

### Linux/macOS

```bash
./mvnw spring-boot:run
```

### Windows

```bash
mvnw.cmd spring-boot:run
```

Ou, caso o Maven esteja instalado globalmente:

```bash
mvn spring-boot:run
```

O Back-End estará disponível, por padrão, em:

```text
http://localhost:8080
```

---

# 🎨 Executando o Front-End

Em outro terminal, entre na pasta do Front-End:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O Front-End estará disponível em:

```text
http://localhost:3000
```

---

# 🔗 Comunicação Front-End ↔ Back-End

Durante o desenvolvimento, o Front-End se comunica com a API Spring Boot através de:

```text
Next.js
   │
   │ HTTP
   ▼
http://localhost:8080/api
```

Exemplo:

```text
Front-End
    │
    └── GET /api/companies/PETR4
                  │
                  ▼
            Spring Boot
                  │
                  ▼
             PostgreSQL
```

Caso o Front-End utilize uma variável de ambiente para definir a URL da API, crie um arquivo:

```text
.env.local
```

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

# 📚 Documentação da API

A API poderá ser documentada utilizando Swagger/OpenAPI.

Com o Back-End em execução, a documentação estará disponível conforme a configuração do projeto.

Exemplo de endereço:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# 📊 Fonte dos Dados

Os dados fundamentalistas serão obtidos prioritariamente de fontes públicas relacionadas ao mercado brasileiro, com destaque para dados disponibilizados pela **Comissão de Valores Mobiliários (CVM)**.

Entre os dados utilizados estão informações cadastrais e documentos financeiros, como:

* DFP — Demonstrações Financeiras Padronizadas;
* ITR — Informações Trimestrais.

Também poderão ser utilizadas informações disponibilizadas pela **B3**, de acordo com suas condições de acesso e disponibilidade.

---

# 🔄 Importação dos Dados

O fluxo de processamento dos dados é:

```text
CVM
 │
 ▼
Arquivos de dados
 │
 ▼
Importador Java
 │
 ▼
Validação
 │
 ▼
Processamento
 │
 ▼
PostgreSQL
```

Em versões futuras, o processo poderá ser automatizado através de tarefas agendadas utilizando Spring Scheduler.

```text
Spring Scheduler
       │
       ▼
Verifica novos dados
       │
       ▼
Processa informações
       │
       ▼
Atualiza PostgreSQL
```

---

# 🗺️ Roadmap

## Fase 1 — Estrutura

* [x] Criar projeto Spring Boot
* [x] Configurar JPA
* [x] Criar entidades
* [x] Criar repositories
* [x] Criar services
* [x] Criar controllers
* [ ] Configurar migrations

## Fase 2 — API

* [x] Endpoint de empresas
* [x] Endpoint de indicadores
* [ ] Endpoint de histórico financeiro
* [ ] Endpoint de preços
* [x] Endpoint de dividendos
* [x] Endpoint de comparação
* [ ] Tratamento completo de erros
* [ ] Swagger

## Fase 3 — Dados

* [ ] Definir conjunto inicial de empresas
* [ ] Importar dados da CVM
* [ ] Validar dados
* [ ] Calcular indicadores
* [ ] Armazenar dados no PostgreSQL

## Fase 4 — Front-End

* [x] Criar projeto Next.js
* [x] Criar página inicial
* [x] Criar pesquisa
* [x] Criar página de empresa
* [x] Criar cards de indicadores
* [x] Criar gráficos
* [x] Criar página de comparação

## Fase 5 — Finalização

* [ ] Testes automatizados
* [ ] Tratamento de erros
* [ ] Melhorias de interface
* [x] Documentação
* [x] README
* [ ] Deploy

---

# 🔮 Possíveis Evoluções

### V2

* Atualização automática dos dados;
* Histórico trimestral;
* Mais empresas;
* Favoritos;
* Watchlist;
* Cache com Redis;
* Testes automatizados.

### V3

* Autenticação;
* Carteira de investimentos;
* Alertas personalizados;
* Notificações;
* Dashboard individual;
* Aplicativo mobile.

---

# 🎯 Objetivo do Projeto

O **Analisador de Ações** foi desenvolvido como projeto de portfólio com foco em **desenvolvimento Full Stack**, principalmente em Back-End.

O projeto demonstra conhecimentos em:

* Java;
* Spring Boot;
* API REST;
* PostgreSQL;
* JPA/Hibernate;
* Modelagem de dados;
* Integração e processamento de dados;
* Next.js;
* React;
* TypeScript;
* Tailwind CSS;
* Visualização de dados;
* Arquitetura de aplicações web.

---

# ⚠️ Aviso

O Analisador de Ações possui finalidade **informativa e educacional**.

Os dados e indicadores apresentados não constituem recomendação de compra, venda ou manutenção de ativos financeiros.

O usuário deve realizar sua própria análise antes de tomar qualquer decisão de investimento.

---

# 👨‍💻 Desenvolvedor

Desenvolvido por **Carlos Felipe Spindula Gomes**.

Projeto desenvolvido com foco em aprendizado e demonstração de conhecimentos em **Java, Spring Boot, Next.js, TypeScript e PostgreSQL**.
