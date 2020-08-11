module Api
  module V1
    class BandsController < ApplicationController

      def index
        bands = Band.all
        render json: BandSerializer.new(bands).serialized_json
      end
    end
  end
end