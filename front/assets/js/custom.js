"use strict";

$("#logout").click(function () {
  var token = sessionStorage.getItem("token");
  console.log(token);
  var myHeaders = new Headers();
    //myHeaders.append("Content-Type", "text/plain", bearer);

    var requestOptions = {
      method: "GET",
      credentials: 'omit',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'text/plain'
    },
      redirect: "follow",
    };

    fetch("http://25.20.166.7:8080/user/logout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.message == "Logout successfully"){
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('role');
          alert("Đăng xuất thành công!")
          window.location.href = "/front/pages/login.html"
        }else if(result.message == "User not logged in"){
          alert("Người dùng chưa đăng nhập")
          window.location.href = "/front/pages/login.html"
        }
      })
      .catch((error) => console.log("Không kết nối được tới máy chủ", error));
  }
);



$(".student-name").text(sessionStorage.getItem("username"));


