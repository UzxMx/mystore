class OrderMailer < ApplicationMailer

  def send_email_to_admin
    mail to: "18810607124@163.com", subject: "新订单到达"
  end
end
