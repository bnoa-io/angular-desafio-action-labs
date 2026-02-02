# BRL Exchange Rate

Aplicação web para consultar a taxa de câmbio do Real Brasileiro (BRL) em relação a outras moedas estrangeiras.

## Sobre o Projeto

O usuário seleciona um código de moeda e visualiza:
- **Taxa de câmbio atual** com data/hora da última atualização
- **Histórico dos últimos 30 dias** com valores de abertura (open), fechamento (close), máxima (high) e mínima (low)
- **Variação percentual** (close diff) entre o fechamento do dia atual e o dia anterior

### Moedas Suportadas

| Código | Moeda |
|--------|-------|
| USD | Dólar Americano |
| EUR | Euro |
| GBP | Libra Esterlina |
| JPY | Iene Japonês |
| CAD | Dólar Canadense |

## Tecnologias

- **Angular 19** com standalone components
- **Angular Material** para componentes de UI
- **RxJS** para programação reativa
- **TypeScript**

## Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Entrar na pasta do projeto
cd angular-actionlabs-desafio

# Instalar dependências
npm install
```

### Executar em desenvolvimento

```bash
ng serve
```

Acesse `http://localhost:4200/` no navegador.

### Build para produção

```bash
ng build
```

Os arquivos serão gerados na pasta `dist/`.

## Estrutura do Projeto

```
src/app/
├── models/                 # Interfaces e tipos
├── services/               # Serviços (API)
└── pages/
    └── home/
        ├── components/
        │   ├── exchange-result/           # Exibe taxa atual
        │   ├── exchange-history-accordion/ # Accordion do histórico
        │   └── exchange-history-card/      # Card de cada dia
        └── home.component.*               # Página principal
```

## API

A aplicação consome a API de câmbio da Action Labs:
- Documentação: https://api-brl-exchange.actionlabs.com.br/api/1.0/swagger-ui.html

**Limitações da API:**
- 5 requisições por minuto
- 500 requisições por dia

## Layout

Design baseado no Figma: [BRL Exchange Rate](https://www.figma.com/file/hcwecJTI3KNnvy5LiFuYLi/BRL-Exchange-Rate)
