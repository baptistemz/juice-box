Devise.setup do |config|
  # config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.mailer_sender = "mulliez.baptiste@gmail.com"
  config.navigational_formats = [:json]
end
