# SmartDocAI - Chatbot com IA para Documentos Extensos

**SmartDocAI** é um chatbot desenvolvido para facilitar o acesso a informações específicas em documentos extensos, como editais e regulamentos. Utilizando modelos de linguagem avançados e integração com o WhatsApp, a ferramenta permite ao usuário obter respostas rápidas e precisas, economizando tempo e esforço em comparação com a busca manual.

Este projeto foi desenvolvido como parte do Trabalho de Conclusão de Curso (TCC) e visa explorar o potencial da Inteligência Artificial (IA) em processos de recuperação de informação.

## Funcionalidades

- **Busca Inteligente**: Busca por informações específicas em documentos com várias páginas.
- **Integração com o WhatsApp**: Acesso direto através do WhatsApp, uma plataforma amplamente utilizada.
- **Uso de IA Avançada**: Modelo baseado no GPT-3.5 para interpretar perguntas e fornecer respostas contextualizadas.

## Tecnologias Utilizadas

- **Node.js** com **Bun**: Para desempenho otimizado e gerenciamento de dependências.
- **GPT-3.5**: Modelo de linguagem para processar perguntas e gerar respostas relevantes.
- **Express.js**: Framework web para a API.

## Instalação

### Pré-requisitos

- [Bun](https://bun.sh/) instalado globalmente
- Node.js

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/viniciuspiresb/tcc.git
   cd tcc
   ```

2. Instale as dependências usando Bun:
   ```bash
   bun install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e preencha com as credenciais do modelo GPT e a chave da API do WhatsApp.

   ```plaintext
   
   OPEN_API_KEY=your_openai_api_key
   API_URL=your_api_url
   ```

4. Inicie o servidor:
   ```bash
   cd src/api & bun run start
   cd .. & cd .. & bun run start
   ```

5. Leia o QrCode no terminal com o celular para conectar na SmartDocAI.

## Uso

1. Envie uma mensagem para o chatbot no WhatsApp com uma pergunta sobre o documento.
2. O chatbot processará a pergunta usando o modelo GPT-3.5 e buscará a resposta no documento.
3. Receba uma resposta direta e precisa no WhatsApp.

## Objetivos do TCC

Este projeto foi desenvolvido para responder às seguintes perguntas de pesquisa:
- **O chatbot consegue fornecer respostas precisas e relevantes?**
- **A ferramenta proporciona uma economia de tempo significativa em comparação com buscas manuais?**
- **O uso do chatbot melhora a experiência geral dos usuários na busca por informações?**

Essas questões são exploradas e respondidas por meio de experimentos e feedback dos usuários.

## Contato

Desenvolvido por [Vinicius Pires Barreto](https://www.linkedin.com/in/viniciuspiresb/).
