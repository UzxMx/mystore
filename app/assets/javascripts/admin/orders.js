(function ($) {
  var Mystore = window.Mystore || {};
  window.Mystore = Mystore;

  var Admin = Mystore.Admin || {};
  Mystore.Admin = Admin;

  var Orders = Admin.Orders || {};
  Admin.Orders = Orders;

  Orders.init = function() {

    var get_filter_params = function() {
      var params = {};
      var status = $('select[name=status]').val();
      if (status != -1) {
        params['status'] = status;
      }

      return params;
    };

    $('.btn-filter-orders').click(function() {
      location.href = Routes.admin_orders_path(get_filter_params());
    });

    var restore_orders_table = function() {
      var $container_edit_order = $('.container-edit-order');
      if ($container_edit_order.length == 0) {
        return;
      }

      var row = $container_edit_order.parent().parent();
      row.prev().remove();
      row.prev().css({
        display: 'table-row'
      });
      row.remove();
    };

    $('.btn-edit-order').click(function() {
      restore_orders_table();

      var $parent_row = $(this).parent().parent().parent().parent();
      var order_id = $parent_row.attr('id').substring("order-".length);

      var html = '<tr style="display:none;"></tr><tr id="edit-' + order_id + '"><td colspan="3"></td></tr>';

      $(html).insertAfter($parent_row);
      var $container_edit_order = $('#editOrderTemplate').children().clone().addClass('container-edit-order');
      $container_edit_order.appendTo($('#edit-' + order_id + ' td'));
      $parent_row.css({
        display: 'none'
      });

      var original_status = $('.col-status', $parent_row).attr('data-status');
      $('select[name=status]', $container_edit_order).val(original_status);

      $('.btn-cancel', $container_edit_order).click(function() {
        restore_orders_table();
      });
      $('.btn-update-order', $container_edit_order).click(function() {
        var status = $('select[name=status]', $container_edit_order).val();
        if (status == original_status) {
          restore_orders_table();
          return;
        }

        $(this).addClass('processing');

        $.post({
          url: Routes.admin_edit_orders_path(order_id),
          data: {
            status: status
          },
          success: function(data) {
            $(this).removeClass('processing');

            if (data['status'] == 1) {
              toastr.success("保存成功");
              if (status != original_status) {
                var $status = $('.col-status', $parent_row);
                $status.attr('data-status', status);
                $status.text($('option[value=' + status + ']', $container_edit_order).text());
              }

              restore_orders_table();
            }
          }
        });
      });
    });

    $('.container-pagination a').click(function(event) {
      var page = $(this).attr('data-page');
      if (page) {
        var params = get_filter_params();
        params['page'] = page;
        location.href = Routes.admin_orders_path(params);
      }

      event.preventDefault();
    });
  };

  $(function() {
    Orders.init();
  });
})(jQuery);