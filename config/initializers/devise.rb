Devise.setup do |config|
  # config.email_regexp = /\A[^@\s]+@[^@\s]+\z/
  config.mailer_sender = "mulliez.baptiste@gmail.com"
  config.navigational_formats = [:json]
  config.secret_key = '8bbebc0f5077d793c06ca506ce3bea24023cb0253f36de8d0dc5b70a95ecb5544d4d1b798188d883d02ce94f2b1972983d202b8fd0ac87886c4fd7da8e585376'
end
