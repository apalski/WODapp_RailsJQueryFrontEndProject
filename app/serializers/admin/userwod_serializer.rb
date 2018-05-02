class UserwodSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :cftype, :result, :pr, :user_id
end