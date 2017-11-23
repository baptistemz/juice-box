class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_picture
end
