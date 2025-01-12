module Resolvers
  class ItemsResolver < BaseResolver
    type [Types::ItemType], null: false
    description "Fetches all items"

    def resolve
      Item.all
    end
  end
end
