require 'rails_helper'

describe 'Bands api' do
  describe 'GET /api/v1/bands' do

    it 'returns bands list' do
      FactoryBot.create(:band)

      get api_v1_bands_path
      parsed_response = JSON.parse(response.body).deep_symbolize_keys

      expect(response).to have_http_status(:success)
      expect(parsed_response[:data].size).to eq(1)
    end
  end
end