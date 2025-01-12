module Mutations
  class CreateItem < BaseMutation
    argument :name, String, required: true
    argument :description, String, required: false
    argument :price, Float, required: false

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(name:, description: nil, price: nil)
      item = Item.create!(
        name: name,
        description: description,
        price: price
      )
      {
        item: item,
        errors: []
      }
    rescue => e
      {
        item: nil,
        errors: [e.message]
      }
    end
  end
end
