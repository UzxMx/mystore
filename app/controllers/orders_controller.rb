class OrdersController < ApplicationController
  def show
  end

  def watch_succeed
  end

  def create
    product_id = params[:product_id].to_i
    product = Product.find(product_id)
    if product_id == 1
      create_shoe_order(product)
    elsif product_id == 2
      create_watch_order(product)
    end
  end

  def create_shoe_order(product)
    color = params[:color]
    size = params[:size].to_i
    count = params[:count].to_i
    receiver_name = params[:receiver_name]
    receiver_phone = params[:receiver_phone]
    receiver_address = params[:receiver_address]

    variants = {
      color: color,
      size: size
    }

    order = Order.new(
      receiver_name: receiver_name,
      receiver_phone: receiver_phone,
      receiver_address: receiver_address,
      product: product,
      count: count,
      variants: JSON.generate(variants))
    order.save

    begin
      OrderMailer.send_email_to_admin.deliver_later      
    rescue Exception => e
      
    end

    render json: {
      status: 1
    }
  end

  def create_watch_order(product)
    color = params[:color]
    size = params[:size].to_i
    count = params[:count].to_i
    receiver_name = params[:receiver_name]
    receiver_phone = params[:receiver_phone]
    receiver_address = params[:receiver_address]

    variants = {
      color: color
    }

    order = Order.new(
      receiver_name: receiver_name,
      receiver_phone: receiver_phone,
      receiver_address: receiver_address,
      product: product,
      count: count,
      variants: JSON.generate(variants))
    order.save

    begin
      OrderMailer.send_email_to_admin.deliver_later      
    rescue Exception => e
    end

    render json: {
      status: 1
    }    
  end
end
