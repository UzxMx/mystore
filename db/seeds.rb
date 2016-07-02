# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'json'

# admin = Admin.new(
#   email: '327110424@163.com',
#   password: 'MxyXmx123.',
#   password_confirmation: 'MxyXmx123.')
# admin.save

# product_variants = {
#   color: ["silver", "gold"],
#   size: [35, 36, 37, 38, 39, 40]
# }
# product = Product.new(
#   name: '小白鞋',
#   price: 228,
#   variants: JSON.generate(product_variants))
# product.save

product_variants = {
  color: ["gwhite", "pwhite"]
}

product = Product.new(
  name: '手表',
  price: 398,
  variants: JSON.generate(product_variants))

product.save

# variants = {
#   color: "silver",
#   size: 35
# }
# order = Order.new(
#   receiver_name: '薛明翔',
#   receiver_phone: '18810294314',
#   receiver_address: '碧兴园2号楼2503',
#   product: product,
#   count: 1,
#   variants: JSON.generate(variants))
# order.save

# product = Product.find(1)

# for i in 1..200
#   variants = {
#     color: "silver",
#     size: 35
#   }
#   order = Order.new(
#     receiver_name: "薛明翔#{i}",
#     receiver_phone: '18810294314',
#     receiver_address: '碧兴园2号楼2503',
#     product: product,
#     count: 1,
#     variants: JSON.generate(variants))
#   order.save
# end