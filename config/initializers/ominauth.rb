
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, '0baa007762dc36d143ea', 'bf581cc5dc724d2a4302cc36e5132b2749e76ccb'
  provider :facebook, '674186382773850', 'd1e387722b64bde1f51177d316ad6f08'
end

# OmniAuth.config.logger = Rails.logger
# Rails.application.config.middleware.use OmniAuth::Builder do
#  provider :facebook, Rails.application.secrets.facebook_app_id, Rails.application.secrets.facebook_app_secret, scope: ‘public_profile’, info_fields: ‘id,name,link’,
#  provider :github, Rails.application.secrets.github_key, Rails.application.secrets.github_secret, scope: ‘public_profile’, info_fields: ‘id,name,link’
# end