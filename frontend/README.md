# Analisador de Ações — Frontend

Frontend do projeto Analisador de Ações usando Next.js, React, TypeScript, Tailwind CSS e Recharts.

## Requisitos

- Node.js 20+
- Backend Spring Boot rodando em `http://localhost:8080`

## Instalação

```bash
npm install
```

Crie `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Depois:

```bash
npm run dev
```

Acesse:

http://localhost:3000

## Rotas

- `/`
- `/companies`
- `/companies/[ticker]`
- `/compare`

## API consumida

- `GET /api/companies`
- `GET /api/companies/{ticker}`
- `GET /api/companies/{ticker}/indicators`
- `GET /api/companies/{ticker}/financials`
- `GET /api/companies/{ticker}/prices`
- `GET /api/companies/{ticker}/dividends`
- `GET /api/companies/compare?tickers=PETR4,VALE3,WEGE3`

## Observação sobre CORS

Como o frontend roda em `localhost:3000` e o Spring Boot em `localhost:8080`, o backend precisa permitir requisições do frontend durante o desenvolvimento.

Exemplo de configuração no Spring Boot:

```java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }
}
```
