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

    it 'returns paginated page of bands list' do
      FactoryBot.create_list(:band, 10)

      get api_v1_bands_path(params: { page: '2'})
      parsed_response = JSON.parse(response.body).deep_symbolize_keys

      expect(response).to have_http_status(:success)
      expect(parsed_response[:data].size).to eq(5)
    end

    it 'returns bands list sorted by name' do
      %w[Anthrax Slayer].map do |name|
        FactoryBot.create(:band, name: name)
      end

      get api_v1_bands_path(params: { sort_column: 'name', sort_direction: 'desc' })
      parsed_response = JSON.parse(response.body).deep_symbolize_keys

      expect(response).to have_http_status(:success)
      expect(parsed_response[:data].first[:attributes][:name]).to eq('Slayer')
    end
  end
end