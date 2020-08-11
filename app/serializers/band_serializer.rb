class BandSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :genres, :albums
end
