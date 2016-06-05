class Order < ActiveRecord::Base
  enum status: [:order_new_created, :order_valid, :order_sent, :order_received, :order_invalid, :order_deleted]
  belongs_to :product
end
