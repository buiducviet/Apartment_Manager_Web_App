$(document).ready(function () {
   /* var token = sessionStorage.getItem("token");
    var role = sessionStorage.getItem("role");
  
    if (token != null) {
      sessionStorage.removeItem("token");
    }*/
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
      var username = $("#username").val();
      var userID = $("#userID").val();
      var password = $("#password").val();

      if (username != "" && password != "" && userID != "") {
        $("#signUpButton").removeClass("disabled");
      } else {
        $("#signUpButton").addClass("disabled");
      }
    }
    setInterval(checkInput, 300);
  
    //Login request
    function signUpRequest(username, userID, pass) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");
  
      var raw =

        '{\n  "username" : "' +
        username +
        '",\n  "userID" : "' +
        userID +
        '",\n  "password" : "' +
        pass +
        '"\n   \n}';
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch("http://25.20.166.7:8080/user/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.message == "Register successfully") {
            /*var role = result.role;
            var token = result.token.access_token;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);
            if (role == "0") {
              window.location.href = "/app/frontend/pages/index.html";
            } else if (role == "1") {
              window.location.href = "/app/frontend/pages/index0.html";
            }*/
            window.location.href = "/front/pages/login.html";
          } else if (result.message == "User existed") {
            alert("Đã tồn tại người dùng này!");
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
  
    $("#signUpButton").on("click", function () {
      let userID = $("#userID").val();
      let username = $("#username").val();
      let password = $("#password").val();
  
      signUpRequest(username,userID, password);
    });
  });
  