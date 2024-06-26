FROM node:20.11.1-alpine3.19 as app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .


FROM app as backend
RUN npm run build:backend
CMD ["npm", "run", "start:backend"]


FROM app as front
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL $PUBLIC_API_URL
RUN npm run build:front
CMD ["npm", "run", "start:front"]
