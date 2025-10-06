# Marvel Filmes (React Native + Expo)

App simples que consome a API de filmes e lista em cards com rolagem.

## API
- URL: `https://www.fabiooliveira.cloud/api_aula/filmes/`
- Header de autorização: `Authorization: a8ea3f9c1e47b2d89f0d41b7f3c2d0c6`

## Como executar (Expo)
1. Instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Inicie o app:
   ```bash
   npm run start
   ```
3. Use o aplicativo Expo Go no seu celular para escanear o QR code (modo LAN) ou execute em um emulador.

## Layout
- Cor principal: `#a11e1e`
- Utiliza `ScrollView` e `map` para renderizar a lista.

## Estrutura de arquivos
- `App.js`: tela principal com fetch, estados de loading/erro e UI.
- `index.js`: ponto de entrada Expo.
- `app.json`: configurações do Expo (tema, splash, ícones).

