
var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);
var requestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};
var userid
fetch("http://25.20.166.7:8080/lv1/adminlist", requestOptions)
.then((response) => response.json())
  .then((result) => {
    if (result.message == "Get list admin OK"){
      var listadmin = result.list_admin
      for (var i = 0; i < Object.keys(listadmin).length; i++) {
        listadmin[i].stt = i + 1;
      }
      handleRoomTablePaid(listadmin)
    }
  })
  function handleRoomTablePaid(adminlist) {
    var roomsTablee = new Tabulator("#admin-account-table", {
        height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        data: adminlist, //assign data to table
        virtualDom: true,
        layout: "fitColumns", //fit columns to width of table (optional)
        columns: [
          //Define Table Columns
          {
            title: "STT",
            field: "stt",
            width: 80,
            hozAlign: "center",
            sorter: "number",
          },
          {
            title: "ID",
            field: "userID",
            hozAlign: "center",
            width: 150,
            sorter: "number",
            hozAlign: "center",
    
          },

          {
            title: "Tên đăng nhập",
            field: "username",
            hozAlign: "center",
            width: 300,
            sorter: "number",
            hozAlign: "center",
    
          },

        ],
      })
  }
fetch("http://25.20.166.7:8080/lv1/usrinfo", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    var citizen_name = result.user.username;
    userid = result.user.userID
    sessionStorage.setItem("username", citizen_name);
    var storedUsername = sessionStorage.getItem("username");
    console.log(storedUsername); // In giá trị của "username" từ `sessionStorage` vào console.
    var register_date = result.user.CreatedAt.substring(0, 10);
    var register_date_split = register_date.split("-");
    register_date =
      register_date_split[2] +
      "/" +
      register_date_split[1] +
      "/" +
      register_date_split[0];

    var update_date = result.user.UpdatedAt.substring(0, 10);

    update_date_split = update_date.split("-");
    update_date =
      update_date_split[2] +
      "/" +
      update_date_split[1] +
      "/" +
      update_date_split[0];


    /*$("#student-name").text(citizen_name)*/
    $("#admin-name").text(citizen_name);
    $("#admin-name-update").val(citizen_name)
    /*$("#citizen-room").text(result.citizen_info.room);*/
    $("#register-date").text(register_date);
    $("#update-date").text(update_date);


    $(document).ready(function() {
      // Lắng nghe sự kiện click trên nút "Lưu"
      function checkInput() {
        var name = $("#admin-name-update").val();
        var oldpass = $("#admin-password-old").val();
        var newpass = $("#admin-password-update").val();
        
        

        if (name != "" && oldpass != "" && newpass != "" ) {
          $("#save-btn-update").removeClass("disabled");
        } else {
          $("#save-btn-update").addClass("disabled");
        }
      }
        setInterval(checkInput, 300);
      $("#save-btn-update").click(function() {
        var name = $("#admin-name-update").val();
        var oldpass = $("#admin-password-old").val();
        var newpass = $("#admin-password-update").val();
        var feeeRequestOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
          },
          redirect: "follow",
        };
        fetch("http://25.20.166.7:8080/lv1/checkpasspayment?password="+oldpass, feeeRequestOptions)
        .then((response) => response.json())
      .then((result) => {
        if (result.message == "Payment password is correct"){


          var name = $("#admin-name-update").val();
          var oldpass = $("#admin-password-old").val();
          var newpass = $("#admin-password-update").val();
          console.log(userid)
          var updateuserData = {
            username: name,
            userID: userid,
            password: newpass,
            role: 1,
           
          };
          var fRequestOptions = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(updateuserData),
            redirect: "follow",
          };
          fetch("http://25.20.166.7:8080/lv1/updateuser", fRequestOptions)
          .then((response) => response.json())
          .then((result) => {
          if (result.message == "Update success" ){
            alert("Bạn đã đổi mật khẩu thành công")
            var popUpMenu = document.getElementById("popup-menu");
            popUpMenu.style.display = "none"
        }
      })
        }
      })  
      })
    })
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });


document.addEventListener("DOMContentLoaded", function() {
    // Lấy tham chiếu đến button và pop-up menu
    var button = document.getElementById("button-change-profile");
    var popUpMenu = document.getElementById("popup-menu");
    var overlay = document.createElement("div");
    overlay.className = "overlay";

    // Thêm sự kiện click cho button
    button.addEventListener("click", function() {
        // Toggle hiển thị của pop-up menu bằng cách thêm/xoá lớp "show"
        popUpMenu.style.display = "block";
    document.body.appendChild(overlay);
    overlay.style.display = "block";
    });

    // Đóng pop-up menu khi click bên ngoài nó
    overlay.addEventListener("click", function () {
        popUpMenu.style.display = "none";
        overlay.style.display = "none";
      });
});