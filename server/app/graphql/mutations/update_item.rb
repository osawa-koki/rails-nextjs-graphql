module Mutations
  class UpdateItem < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :price, Float, required: false

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)
      item = Item.update!(id, attributes)
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
