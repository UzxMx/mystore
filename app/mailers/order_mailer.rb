class OrderMailer < ApplicationMailer

  def send_email_to_admin
    mail to: "327110424@163.com", subject: "新订单到达"
  end
end
