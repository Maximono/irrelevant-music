class Band < ApplicationRecord

  def self.search(pattern)
    return all if pattern.blank?

    where("name ILIKE ?", "%#{pattern}%")
  end
end
