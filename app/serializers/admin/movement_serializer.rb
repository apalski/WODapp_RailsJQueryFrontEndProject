class Admin::MovementSerializer < ActiveModel::Serializer
  attributes :id, :name, :movement_type, :quantity, :owner_id
end
