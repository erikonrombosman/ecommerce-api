FROM node:latest

## Crea un directorio de trabajo dentro de la máquina virtual
WORKDIR /usr/src/app

## Copia el archivo package.json a la ruta de trabajo
COPY package.json /usr/src/app

## Instala dependencias, todas las dependencias deben estar en el packge.json
RUN npm install
RUN npm install -g babel

## Copia todo al directorio
COPY . /usr/src/app

## construye la imagen
RUN npm run build
## Expone el puerto
EXPOSE 9000
## Inicia el servidor
CMD npm start