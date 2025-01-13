FROM node:22 as client-builder
WORKDIR /src/client/
COPY ./client/package.json ./client/package-lock.json ./
RUN yarn install --frozen-lockfile --production --no-interactive
COPY ./client/ .
RUN yarn build

FROM ruby:3.2.2 as server
WORKDIR /src/server/
COPY --from=client-builder /src/client/ ./public/assets
COPY ./server/Gemfile ./server/Gemfile.lock ./
RUN bundle install --jobs 8 --retry 3
COPY ./server/ .
RUN bundle exec rake assets:precompile
