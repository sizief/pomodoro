require 'faraday'

class Oauth
  def initialize(token_id)
    @token_id = token_id
  end

  def call
    google_url = "https://oauth2.googleapis.com/tokeninfo?id_token=#{@token_id}"
    connection = Faraday.new(google_url, request: {
       open_timeout: 2,   # opening a connection
        timeout: 5         # waiting for response
    })
    connection.proxy "http://localhost:8485" if ENV['APP_ENV'] == 'development'
    raw_response = connection.get google_url 
    return user_not_exist if raw_response.status != 200
    
    Message.new(
      error: false, 
      body: JSON.parse(raw_response.body)
    )
  rescue Faraday::ConnectionFailed
    connection_refused
  end

  private
  def user_not_exist
   Message.new(error: true, body: 'User is not exist')
  end

  def connection_refused
    Message.new(error: true, body: 'Connection refused')
  end

  def user_body(response)
    {
      email: response.email,
      given_name: response.given_name,
      family_name: response.family_name,
      picture: response.picture,
      id: response.sub,
      provider: 'google'
    }
  end
end
