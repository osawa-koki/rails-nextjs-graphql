FROM node:22
WORKDIR /app/
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY . .

CMD ["yarn", "dev"]
