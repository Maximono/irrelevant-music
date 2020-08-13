module Api
  module V1
    class BandsController < ApplicationController

      def index
        bands = Band.page(params[:page]).per(5)
        bands = bands.order("#{sort_column} #{sort_direction}") if params[:sort_column]
        render json: BandSerializer.new(bands).serialized_json
      end

      private

      def sort_column
        columns = %w[name genres albums]
        params[:sort_column] if columns.include?(params[:sort_column])
      end

      def sort_direction
        params[:sort_direction] == "desc" ? "desc" : "asc"
      end
    end
  end
end