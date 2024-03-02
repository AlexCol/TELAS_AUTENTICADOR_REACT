# Use a imagem base do Node.js
FROM node:18-alpine as BUILD_IMAGE

# Configure o diretório de trabalho (o nome pode ser qualquer um, não precisa ser o nome da pasta raiz)
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY ["package.json", "package-lock.json", "./"]
# Instale as dependências (o --production vai ignorar as dependencias em devDependencies)
RUN npm install --production
#copiar os demais arquivos
COPY . .
#instalar typescript pra dar build sem erro
RUN npm install typescript
#build no projeto
RUN npm run build

#agora inicia a montagem de uma imagem com a build, para que seja exposto o código no navegador quando acessado de fora
FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app

#copiando o arquivo montado na build anterior, para a pasta da build da produção
COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

# Exponha a porta do aplicativo
EXPOSE 8011

# Copie os arquivos necessários para a produção
COPY package.json .
COPY vite.config.ts .

# Instale o TypeScript para a execução
RUN npm install typescript

CMD ["npm", "run", "preview"]