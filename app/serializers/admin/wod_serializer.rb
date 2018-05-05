class Admin::WodSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :wod_type, :owner_id
end