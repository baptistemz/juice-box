class ProfilePictureUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
  process eager: true  # Force version generation at upload time.

  process convert: 'jpg'

  version :thumb do
    cloudinary_transformation width: 100, height: 100, crop: :thumb, gravity: :face
  end

  version :micro do
    cloudinary_transformation width: 30, height: 30, crop: :thumb, gravity: :face
  end
end
