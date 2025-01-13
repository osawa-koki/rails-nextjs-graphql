# rails-nextjs-graphql

🫗🫗🫗 Ruby on RailsとNext.jsを使用して、GraphQLを介してデータを取得するアプリケーションです！  

## 実行方法

```bash
docker compose run --rm server bundle install
docker compose run --rm client yarn install
docker compose run --rm server bundle exec rails db:create
docker compose run --rm server bundle exec rails db:migrate

docker compose up -d
```

## メイン実行用

```bash
docker build -t rails-nextjs-graphql .
docker run --rm -d -p 8888:3000 --name rails-nextjs-graphql rails-nextjs-graphql
```
