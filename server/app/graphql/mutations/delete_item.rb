module Mutations
  class DeleteItem < BaseMutation
    argument :id, ID, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      item = Item.find(id)
      item.destroy
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
