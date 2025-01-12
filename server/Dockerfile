FROM ruby:3.2.2
WORKDIR /app/
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
CMD ["bundle", "exec", "bin/rails", "server", "-b", "0.0.0.0"]
