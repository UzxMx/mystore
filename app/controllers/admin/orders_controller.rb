MAX_COUNT_PER_PAGE = 15

class Admin::OrdersController < ApplicationController
  layout 'admin'
  before_action :authenticate_admin!

  def index
    logger.debug params

    if params[:page].nil?
      current_page = 1
    else
      current_page = params[:page].to_i
    end

    if params[:status].nil?
      order_status = -1
    else
      order_status = params[:status].to_i
    end

    where_conds = {}
    if order_status != -1
      where_conds['status'] = order_status
    end
    query = Order
    if where_conds.size != 0
      query = query.where(where_conds)
    end
    orders = query.offset((current_page - 1) * MAX_COUNT_PER_PAGE).limit(MAX_COUNT_PER_PAGE).eager_load(:product)

    orders_total_count = 0
    if where_conds.size != 0
      orders_total_count = Order.where(where_conds).count
    else
      orders_total_count = Order.count
    end

    @orders = orders
    @order_status = order_status

    @orders_total_count = orders_total_count

    page_num = @orders_total_count / MAX_COUNT_PER_PAGE
    page_num += 1 if @orders_total_count % MAX_COUNT_PER_PAGE

    page_start, page_end = pagination(page_num, current_page, 8)

    @page_start = page_start
    @page_end = page_end
    @page_num = page_num
    @current_page = current_page
  end

  def edit
    order_id = params[:id].to_i
    order_status = params[:status].to_i
    order = Order.find(order_id)
    order.status = order_status
    order.save

    render json: {
      status: 1
    }
  end

  private
    def pagination(page_num, current_page, showed_num)
      page_start = 1

      half = showed_num / 2
      if current_page > half
        page_start = current_page - half + 1
      end

      page_end = page_start + showed_num - 1
      if page_end > page_num
        page_end = page_num
      end

      [page_start, page_end]
    end
end
