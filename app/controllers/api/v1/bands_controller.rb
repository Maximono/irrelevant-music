module Api
  module V1
    class BandsController < ApplicationController

      def index
        bands = Band.all.page(params[:page]).per(5)
        render json: BandSerializer.new(bands).serialized_json
      end
    end
  end
end