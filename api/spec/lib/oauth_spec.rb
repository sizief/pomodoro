require File.expand_path '../../spec_helper.rb', __FILE__

describe "Oauth" do
  it "should get error if id_token is not exists" do
    VCR.use_cassette("google_auth") do
      message = Oauth.new(1).call
      expect(message.error).to eq(true)
    end
  end
  
  it "should get profile info if id_token exists" do
    VCR.use_cassette("google_success_auth") do
      message = Oauth.new("eyJhbGciOiJSUzI1NiIsImtpZCI6ImRiMDJhYjMwZTBiNzViOGVjZDRmODE2YmI5ZTE5NzhmNjI4NDk4OTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTQ3Mzc3MjAzNzc4LXJuYXMwMW5nOGlybnM1NGhwaG84MXJvb3N1b2FndWNxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNTQ3Mzc3MjAzNzc4LXJuYXMwMW5nOGlybnM1NGhwaG84MXJvb3N1b2FndWNxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNTUwODM2ODc1Nzk3MTQ5OTQ5IiwiZW1haWwiOiJzaXppZWZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJibkdFbWJhUW5GeFhDeVJkRFAtb09nIiwibmFtZSI6IkFsaSBEZWlzaGlkaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUF1RTdtQV80aEpiQ3JjdTZFZVpPM21tNU1zOVN1TExFZ054bGpFWFhpLVJtdz1zOTYtYyIsImdpdmVuX25hbWUiOiJBbGkiLCJmYW1pbHlfbmFtZSI6IkRlaXNoaWRpIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1NzQ0Mzc3OTYsImV4cCI6MTU3NDQ0MTM5NiwianRpIjoiY2EzYmU5M2U0NDdjYjA4YzM4YjRlYWM5OTZiNTU2OWNmMzVlYzk1ZCJ9.C5N9lBdVQ2c_EJm5KzsZgelGJtT6psvZgRP5QRiWOCkYzTu2lEfTEy7LKWv3d1J-EN4ZreY9RxkbOtkPVu2Z0qBWNBY3SVteEcxgQIGFPgzUM0wIxxTyD0P75eMFrTcO6J3DMk1ksF6psPsw3ePyYH4HGlfPorEArY84WhHleM4wWkq5fG5gOnQKirGF3wwbd4W0wsDLGmwl-eLX2i5ALInk1VNyXaEWZuy0Zyei9cHPldl2INwx1fbxWKvQp4Ni1py08xoS0AYCgfffa-oYJVvsTZvsODi8ZYMx-ldOR66JAaJIi7VLqpOv5G5sGTZKbcL-OezY1t1QhWYzcUKz").call
      expect(message.error).to eq(false)
      expect(message.body['given_name']).to eq('Ali')
    end
  end
end
