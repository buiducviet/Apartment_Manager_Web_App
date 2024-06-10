document.addEventListener('DOMContentLoaded', function () {
  var imgLink = document.getElementById('img');
  var dropdownMenu = document.getElementById('dropdown-menu');

  // Sự kiện click vào phần tử có id là img
  imgLink.addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

    // Hiển thị hoặc ẩn dropdown menu bằng cách thêm/xóa class 'show'
    dropdownMenu.classList.toggle('show');
  });

  // Sự kiện click ở nơi khác trên trang
  document.addEventListener('click', function (e) {
    // Nếu click không nằm trong dropdown menu hoặc phần tử có id là img
    if (!dropdownMenu.contains(e.target) && e.target.id !== 'img') {
      // Ẩn dropdown menu bằng cách xóa class 'show'
      dropdownMenu.classList.remove('show');
    }
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

document.addEventListener("DOMContentLoaded", function () {
  var popupTrigger = document.getElementById("add-household");
  var popupMenu = document.getElementById("popup-menu-update-room");
  var overlay = document.createElement("div");
  overlay.className = "overlay";


  popupTrigger.addEventListener("click", function (event) {
    
    popupMenu.style.display = "block";
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    
  });
  overlay.addEventListener("click", function () {
    popupMenu.style.display = "none";
    overlay.style.display = "none";
  });
  
});
document.addEventListener("DOMContentLoaded", function () {
  var popupTrigger = document.getElementById("add-member-btn-edit");
  var popupMenu = document.getElementById("popup-menu-edit");
  var overlay = document.createElement("div");
  overlay.className = "overlay";


  popupTrigger.addEventListener("click", function (event) {
    
    popupMenu.style.display = "block";
    document.getElementById("room-table-modal").appendChild(overlay);
    overlay.style.display = "block";
    
  });
  overlay.addEventListener("click", function () {
    popupMenu.style.display = "none";
    overlay.style.display = "none";
  });
  
});
document.addEventListener("DOMContentLoaded", function () {
  var popupTrigger = document.getElementById("add-vehicle-btn-edit");
  var popupMenu = document.getElementById("popup-menu-newvehicle");
  var overlay = document.createElement("div");
  overlay.className = "overlay";


  popupTrigger.addEventListener("click", function (event) {
    
    popupMenu.style.display = "block";
    document.getElementById("room-table-modal").appendChild(overlay);
    overlay.style.display = "block";
    
  });
  overlay.addEventListener("click", function () {
    popupMenu.style.display = "none";
    overlay.style.display = "none";
  });
  
});
 ///////// 
// signUp
////////
const ipnElement = document.querySelector('#password')
const eye_open = document.querySelector('#eye-open')
const eye_close = document.querySelector('#eye-close')

eye_open.addEventListener('click', function() {

      const currentType = ipnElement.getAttribute('type')
        
      ipnElement.setAttribute(
            'type',
            currentType === 'password' ? 'text' : 'password'
      )
      eye_open.classList.add('hidden')
      eye_close.classList.remove('hidden')
}
)


eye_close.addEventListener('click', function() {

  const currentType = ipnElement.getAttribute('type')
    
  ipnElement.setAttribute(
        'type',
        currentType === 'password' ? 'text' : 'password'
  )
  eye_close.classList.add('hidden')
  eye_open.classList.remove('hidden')
}
)
