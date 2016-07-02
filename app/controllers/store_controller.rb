class StoreController < ApplicationController
  def shoe
  end

  def watch
    watch = Product.where(name: '手表').first

    @watch = watch
  end

  def test
    
  end
end
