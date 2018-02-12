class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_picture
  has_one :library
end
