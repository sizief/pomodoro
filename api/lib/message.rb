# frozen_string_literal: true

class Message
  attr_accessor :error, :body

  def initialize(error:, body:)
    @error = error
    @body = body
  end

  def json
    { error: @error, body: @body }.to_json
  end

  def error?
    @error
  end
end
