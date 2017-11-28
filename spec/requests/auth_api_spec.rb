require 'rails_helper'
require 'pp'

RSpec.describe "ApiAuth", type: :request do
  let(:user_props) { FactoryBot.attributes_for(:user) }

  context "signup" do
    context "valid registration" do
      it "successfully creates an account" do
        pp user_props
        signup(user_props)
        payload = parsed_body
        expect(payload).to include("status"=>"success")
        expect(payload).to include("data")
        expect(payload["data"]).to include("provider" => "email")
        expect(payload["data"]).to include("email" => user_props[:email])
        expect(payload["data"]).to include("username" => user_props[:username])
      end
    end
    context "invalid registration" do
      context "missing information" do
        it "reports error with a message" do
          signup(user_props.except(:email), :unprocessable_entity)
          payload = parsed_body
          expect(payload["errors"]).to include("full_messages")
          expect(payload["errors"]["full_messages"]).not_to be_empty
        end
      end
      context "non-unique email" do
        it "reports error with a message" do
          signup(user_props, :ok)
          logout
          signup(user_props, :unprocessable_entity)
          payload = parsed_body
          expect(payload["errors"]).to include("full_messages")
          expect(payload["errors"]["full_messages"]).not_to be_empty
        end
      end
    end
  end
  context "anonymous user" do
    it "doesn't access protected resource" do
      get api_authcheck_checkme_path
      expect(response).to have_http_status(:unauthorized)
    end
  end
  context "login" do
    let(:account) {signup(user_props, :ok)}
    let!(:user) {login(account, :ok)}
    context "valid login" do
      it "generates access token" do
        expect(response.headers["access-token"]).to be_truthy
        expect(response.headers["token-type"]).to include("Bearer")
        expect(response.headers["client"]).to be_truthy
        expect(response.headers["uid"]).to include(account[:uid])
      end
      it "extracts access headers" do
        expect(access_tokens?).to be true
        expect(access_tokens["token-type"]).to include("Bearer")
        expect(access_tokens["client"]).to be_truthy
        expect(access_tokens["uid"]).to include(account[:uid])
      end
      it "grants access to protected resource" do
        get api_authcheck_checkme_path, headers:access_tokens
        expect(response).to have_http_status(:ok)
      end
      it "grants access to protected resource multiple times" do
        (1..10).each do |i|
          get api_authcheck_checkme_path, headers:access_tokens
          expect(response).to have_http_status(:ok)
      end
      end
      it "logs out" do
        logout
        get api_authcheck_checkme_path, headers:access_tokens
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context "invalid login" do
      it "it rejects request" do
        logout
        login({:email=> user_props[:email],
               :password=> user_props[:password] + "1"}, :unauthorized)
        login({:email=> user_props[:email] + "m",
               :password=> user_props[:password]}, :unauthorized)
      end
    end
  end
end
