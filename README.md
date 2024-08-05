# VoiceVibes

VoiceVibes é uma aplicação desenvolvida com Next.js e TypeScript que permite explorar e experimentar vozes geradas pela API ElevenLabs. Com uma interface intuitiva, você pode listar diferentes vozes, ouvir amostras e testar como um texto soa em cada voz.

## Funcionalidades

- **Listagem de Vozes**: Visualize e escute amostras de diversas vozes disponíveis na API ElevenLabs.
- **Texto Personalizado**: Insira um texto e ouça como ele é pronunciado em diferentes vozes.
- **Armazenamento e Acesso a Áudio**: Gere e salve arquivos de áudio para reprodução posterior.

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine](https://mantine.dev/)

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o Repositório**:
    ```bash
    git clone https://github.com/seu-usuario/voicevibes.git
    cd voicevibes
    ```

2. **Instale as Dependências**:
    ```bash
    npm install
    ```

3. **Configure a Chave de API**:
    - Crie um arquivo `.env.local` na raiz do projeto.
    - Adicione a chave da API do ElevenLabs:
      ```makefile
      ELEVENLABS_API_KEY=SuaChaveDeAPI
      ```

4. **Execute o Projeto**:
    ```bash
    npm run dev
    ```
    Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Deploy

O projeto está disponível online no Vercel. Você pode acessá-lo [aqui](https://voice-vibes.vercel.app/).

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.


