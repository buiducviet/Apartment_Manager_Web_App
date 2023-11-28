$(document).ready(function() {
    // Bắt sự kiện click vào hình ảnh avatar
    $("#img").click(function(e) {
      e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
      $("#dropdown-menu").toggleClass("show"); // Thêm hoặc xóa class "show" từ dropdown-menu
    });
  });

$("[data-toggle='sidebar']").click(function() {
    var body = $("body"),
      w = $(window);

   if(w.outerWidth() >= 1024) {
      //body.removeClass('search-show search-gone');
      if(body.hasClass('sidebar-mini')) {
        body.removeClass('sidebar-mini');
        body.addClass('sidebar-show');
      }
      else{
        body.removeClass('sidebar-show');
        body.addClass('sidebar-mini');
        
      }

      update_sidebar_nicescroll();
    }else{
      //body.removeClass('search-show search-gone');
      if(body.hasClass('sidebar-mini')) {
        toggle_sidebar_mini(false);
      }else{
        toggle_sidebar_mini(true);
      }
    }

    return false;
  });