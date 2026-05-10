FROM node:18-alpine

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install

COPY . /code/

EXPOSE 5173

CMD ["npm", "run", "dev"]
