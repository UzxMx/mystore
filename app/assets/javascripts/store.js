(function($) {
  var Mystore = window.Mystore || {};
  window.Mystore = Mystore;

  var Store = Mystore.Store || {};
  Mystore.Store = Store;

  var Shoe = Store.Shoe || {};
  Store.Shoe = Shoe;

  Shoe.init = function() {
    var window_width = $(window).width();
    var window_height = $(window).height();

    var init_fixed_bottom_container = function() {
      if (window_width < 600) {
        $fixed_bottom = $('.container-fixed-bottom');
        var heightPx = ((55 / 300.0) * window_width) + 'px';
        $fixed_bottom.css({
          height: heightPx
        });
        $('#shoeImagesContainer').css({
          marginBottom: heightPx
        })
      }
    };
    init_fixed_bottom_container();

    var init_color_variant = function() {
      $('.section-product-variant-color .variant-option').click(function() {
        $selected = $('.section-product-variant-color .variant-option.selected');
        $selected.removeClass('selected');
        $(this).addClass('selected');
      });
    };
    init_color_variant();

    var init_size_variant = function() {
      $('.section-product-variant-size .variant-option').click(function() {
        $selected = $('.section-product-variant-size .variant-option.selected');
        $selected.removeClass('selected');
        $(this).addClass('selected');
      });

      $('#sizeHelperPopup').on('show.bs.modal', function() {
        $('#sizeHelperPopup').css('display', 'block');
        var marginTop = (window_height - $('#sizeHelperPopup .modal-content').height()) / 2;
        $('#sizeHelperPopup .modal-dialog').css({
          marginTop: marginTop + 'px'
        });
      });
    };
    init_size_variant();

    var init_count_section = function() {
      function change_product_count(increment) {
        $productCount = $('#productCount');
        var value = parseInt($productCount.val());
        if (isNaN(value)) {
          value = 0;
        }
        if (increment) {
          value++;
        } else {
          value = Math.max(value - 1, 1);
        }

        $productCount.val(value);

        update_total_price();
      }

      function update_total_price() {
        $productCount = $('#productCount');
        var value = parseInt($productCount.val());
        if (isNaN(value)) {
          value = 1;
        }
        var price = 228 * value;
        $('.container-order-price .total-price').text('¥' + price);
        $('.container-order-price .actual-total-price').text(price);
      }

      $('.section-product-variant-count .btn-minus').click(function() {
        change_product_count(false);
      });
      $('.section-product-variant-count .btn-plus').click(function() {
        change_product_count(true);
      });      

      $('#productCount').blur(function() {
        update_total_price();
      });
    };
    init_count_section();

    var init_receiver_section = function() {
      (function() {
        var asterisk_width = $('.container-input-box-name span:last-child').width();
        var width = $('.container-input-box-name').width();
        var name_icons_width =  $('.container-input-box-name .icons-receiver').outerWidth(true);
        $('#receiverName').css({
          width: (width - name_icons_width - asterisk_width) + 'px'
        });
      })();

      (function() {
        var asterisk_width = $('.container-input-box-name span:last-child').width();
        var width = $('.container-input-box-phone').width();
        var name_icons_width =  $('.container-input-box-phone .icons-phone').outerWidth(true);
        $('#receiverPhone').css({
          width: (width - name_icons_width - asterisk_width) + 'px'
        });
      })();

      (function() {
        var asterisk_width = $('.container-input-box-address span:last-child').width();
        var width = $('.container-input-box-address').width();
        var name_icons_width =  $('.container-input-box-address .icons-address').outerWidth(true);
        $('#receiverAddress').css({
          width: (width - name_icons_width - asterisk_width) + 'px'
        });
      })();          
    };
    init_receiver_section();

    var init_submit_order = function() {
      function show_error_popup(msg) {
        var timeout_handler;

        var modal = $('#inputErrorPopup').modal()
          .on('show.bs.modal', function() {
            $('body').addClass('overlay-transparent');
            $('#inputErrorPopup').css('display', 'block');
            var marginTop = (window_height - $('#inputErrorPopup .modal-content').height()) / 2;
            $('#inputErrorPopup .modal-dialog').css({
              marginTop: marginTop + 'px'
            });
            timeout_handler = setTimeout(function() {
              modal.hide();
            }, 5 * 1000);
          }).on('hide.bs.modal', function() {
            $('body').removeClass('overlay-transparent');
            clearTimeout(timeout_handler);
          }).data('bs.modal');
        $('#inputErrorPopup .modal-body .container-error-message').text(msg);
        modal.show();
      }

      var message_popup;

      function show_message_popup(msg) {
        message_popup = $('#messagePopup').modal({
          backdrop: 'static',
          keyboard: false
        }).on('show.bs.modal', function() {
            $('body').addClass('overlay-transparent');
            $('#messagePopup').css('display', 'block');
            var marginTop = (window_height - $('#messagePopup .modal-content').height()) / 2;
            $('#messagePopup .modal-dialog').css({
              marginTop: marginTop + 'px'
            });
        }).on('hide.bs.modal', function() {
          $('body').removeClass('overlay-transparent');
        }).data('bs.modal');
        $('#messagePopup .modal-body').text(msg);
        message_popup.show();
      }

      function hide_message_popup(msg) {
        message_popup.hide();     
      }

      $('#buyBtn').click(function() {
        $color_selected = $('.section-product-variant-color .variant-option.selected');
        if ($color_selected.length == 0) {
          show_error_popup('请选择颜色分类');
          return;
        }

        $size_selected = $('.section-product-variant-size .variant-option.selected');
        if ($size_selected.length == 0) {
          show_error_popup('请选择尺寸分类');
          return;
        }

        $productCount = $('#productCount');
        var product_count = parseInt($productCount.val());
        if (isNaN(product_count)) {
          show_error_popup("请输入正确的购买数量");
          return;
        }

        var receiver_name = $('#receiverName').val().trim();
        if (receiver_name == '') {
          show_error_popup("请输入收件人姓名");
          return;
        }

        var receiver_phone = $('#receiverPhone').val().trim();
        if (receiver_phone == '') {
          show_error_popup("请输入收件人电话");
          return;
        }

        var receiver_address = $('#receiverAddress').val().trim();
        if (receiver_address == '') {
          show_error_popup("请输入收件人地址");
          return;
        }

        show_message_popup("处理中...");
        $.post({
          url: Routes.orders_create_path(),
          data: {
            product_id: 1,
            color: $color_selected.attr('data-value'),
            size: $size_selected.attr('data-value'),
            count: product_count,
            receiver_name: receiver_name,
            receiver_phone: receiver_phone,
            receiver_address: receiver_address
          },
          success: function(data) {
            if (data.status == 1) {
              hide_message_popup();
              location.href = Routes.orders_show_path();
            }
          }
        });
      });
    };
    init_submit_order();
  };

  $(function() {
    if ($('body').hasClass('store') && $('body').hasClass('shoe')) {
      Shoe.init();
    }
  });
})(jQuery);