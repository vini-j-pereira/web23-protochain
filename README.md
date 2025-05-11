# Protochain

**Protochain** é um protótipo simples de blockchain desenvolvido com **TypeScript**, com o objetivo de estudar e entender os fundamentos técnicos por trás da tecnologia de blockchains — inspirado na blockchain do Bitcoin, porém de forma bem simplificada e didática.

Este projeto é ideal para iniciantes que desejam compreender, de maneira prática, os conceitos essenciais como blocos, transações, mineração e carteira digital.

## ✨ Objetivos

- Explorar os conceitos fundamentais de uma blockchain
- Compreender como funciona a mineração de blocos
- Simular uma carteira para envio e recebimento de transações
- Criar um ambiente educacional de fácil entendimento para iniciantes

## 🧱 Estrutura do Projeto

- `Protochain` – lógica da blockchain e dos blocos
- `Protowallet` – criação de carteiras e assinaturas
- `Protominer` – simulação da mineração de blocos
- `Classlib` – biblioteca com classes e utilitários comuns

## 📦 Tecnologias e Dependências

- [TypeScript](https://www.typescriptlang.org/)
- [ts-node](https://typestrong.org/ts-node/)
- [Nodemon](https://nodemon.io/) (utilizado via comando `npx`)

### Dependências (do `package.json`)
```json
"devDependencies": {
  "ts-node": "^10.9.2",
  "typescript": "^5.8.3"
}
```

## 🚀 Instalação e Execução

Siga os passos abaixo para baixar e rodar o projeto localmente:

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/web23-protochain.git
cd web23-protochain
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Rodar em modo de desenvolvimento
Executa o projeto usando `ts-node` com recarregamento automático:
```bash
npm run dev
```

### 4. Compilar o TypeScript
Gera os arquivos JavaScript na pasta `dist`:
```bash
npm run compile
```

### 5. Rodar projeto compilado
Executa a versão JavaScript compilada:
```bash
npm start
```

## 📁 Requisitos

- Node.js (versão 18 ou superior recomendada)
- npm (gerenciador de pacotes)

## 🧪 Status

Este é um projeto **em desenvolvimento** com fins **educacionais**. Contribuições e sugestões são bem-vindas!

---

> Criado para fins de aprendizado e experimentação. Inspirado na arquitetura do Bitcoin, mas com foco na simplicidade e clareza.
