FROM node:22 as client-builder
WORKDIR /src/client/
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install --frozen-lockfile --production --no-interactive
COPY ./client/ ./
RUN yarn build

FROM ruby:3.2.2 as server
WORKDIR /src/server/
COPY --from=client-builder /src/client/out/ ./public/
COPY ./server/Gemfile ./server/Gemfile.lock ./
RUN bundle install
COPY ./server/ ./
RUN bundle exec rails db:reset && \
    bundle exec rails db:create && \
    bundle exec rails db:migrate
RUN rm -f ./tmp/pids/server.pid
CMD ["bundle", "exec", "bin/rails", "server", "-b", "0.0.0.0"]
