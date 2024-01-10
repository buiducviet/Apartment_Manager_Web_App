$(document).ready(function () {
    var token = sessionStorage.getItem("token");
    var role = sessionStorage.getItem("role");
  
    if (token != null) {
      sessionStorage.removeItem("token");
    }
    // Get current date & time
    function updateTime() {
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + " ";
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
  
      todayString = " " + dd + "/" + mm + "/" + yyyy;
      $("#date").text(todayString);
      $("#time").text(time);
    }
    setInterval(updateTime, 1000);
  
    //Check if enough input
    function checkInput() {
      var username = $("#userID").val();
      var password = $("#password").val();
      if (username != "" && password != "") {
        $("#loginButton").removeClass("disabled");
      } else {
        $("#loginButton").addClass("disabled");
      }
    }
    setInterval(checkInput, 300);
  
    //Login request
    function loginRequest(user, pass) 
    {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
  
      var raw =
        '{\n  "userID" : "' +
        user +
        '",\n  "password" : "' +
        pass +
        '"\n   \n}';
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch("http://25.20.166.7:8080/user/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message == "login success") {
            var role = result.role;
            var token = result.token.access_token;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);
            //nếu là citizen
            if (role == "0") {
              window.location.href = "/front/pages/Home.html";
            } else if (role == "1") { //nếu là admin
              window.location.href = "/front/pages/index.html";
            }
          } else if (result.message == "Invalid login details") {
            alert("Thông tin đăng nhập chưa đúng");
          } else if (result.message == "Invalid form") {
            alert("Thông tin điền chưa hợp lệ!");
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log("Không kết nối được tới máy chủ", error);
          alert("Không kết nối được tới máy chủ");
        });
    }
  
    $("#loginButton").on("click", function () {
      let username = $("#userID").val();
      let password = $("#password").val();
  
      loginRequest(username, password);
    });
  });
  