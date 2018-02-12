class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable
  #, :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  has_many :rooms, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many :contributions, dependent: :destroy
  has_many :connections, dependent: :destroy
  has_one :library, dependent: :destroy
  has_many :room_musics, dependent: :nullify
  mount_base64_uploader :profile_picture, ProfilePictureUploader
  validates_uniqueness_of :email, :username
  validates_presence_of :username, :email
  after_create :send_welcome_email
  before_create :build_default_library


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

  def build_default_library
    # build default library instance. Will use default params.
    # The foreign key to the owning User model is set automatically
    build_library
    true # Always return true in callbacks as the normal 'continue' state
    # Assumes that the default_profile can **always** be created.
    # or
    # Check the validation of the profile. If it is not valid, then
    # return false from the callback. Best to use a before_validation
    # if doing this. View code should check the errors of the child.
    # Or add the child's errors to the User model's error array of the :base
    # error item
  end

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end
end
