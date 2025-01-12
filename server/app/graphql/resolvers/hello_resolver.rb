module Resolvers
  class HelloResolver < BaseResolver
    type String, null: false
    description "Hello, GraphQL!"

    def resolve
      "Hello, GraphQL!"
    end
  end
end
