module Api
  module V1
    class BandsController < ApplicationController

      def index
        bands = Band.search(params[:query]).page(params[:page]).per(5)
        bands = bands.order("#{sort_column} #{sort_direction}") if params[:sort_column]

        options = { meta: { total_pages: bands.page.per(5).total_pages } }
        render json: BandSerializer.new(bands, options).serialized_json
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