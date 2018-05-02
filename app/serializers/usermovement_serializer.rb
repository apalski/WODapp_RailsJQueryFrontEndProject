class UsermovementSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :cftype, :result, :pr, :comment, :user_id
end