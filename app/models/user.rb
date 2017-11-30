class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #, :confirmable, :omniauthable

  has_many :rooms, dependent: :destroy
  include DeviseTokenAuth::Concerns::User
  mount_base64_uploader :profile_picture, ProfilePictureUploader
  validates_uniqueness_of :email, :username
  validates_presence_of :username, :email
  after_create :send_welcome_email

  def token_validation_response
    UserSerializer.new(self).as_json
  end

  def display_name
    return "#{first_name.capitalize} #{last_name[0].capitalize}"
  end

  def name
    display_name
  end

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end
end
