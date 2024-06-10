var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);
var roomRequestOptions = {
    method: "GET",
    credentials: "omit",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "text/plain",
    },
    redirect: "follow",
  };
console.log(1)
var feeid 

fetch("http://25.20.166.7:8080/lv0/roominfo", roomRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get room info successfully") {
        console.log(1)
      roomid = result.room.roomID
      $("#room-id").text(result.room.roomID);
      $("#household-id").text(result.room.familyID);
      $("#room-owner").text(result.owner.name);
      $("#room-area").text(result.room.roomArea)
      $("#student-name").text(result.owner.name)
      console.log(1)
      var feeRequestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "text/plain",
        },
        redirect: "follow",
      };
      console.log("r là "+roomid)
      fetch("http://25.20.166.7:8080/lv0/dichvufee?id="+roomid, feeRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "Get vehicle fee success") {
          $("#dv-feee").text(result.dv_fee.fee_cost);
          $("#dv-fee").text(result.dv_fee.fee_cost);
          if(result.dv_fee.fee_status === "paid"){
            $("#feestatus").text("Đã đóng")
            $("#confirm-button").addClass("disabled");
          }
          else{ $("#feestatus").text("Chưa đóng")
            $("#confirm-button").removeClass("disabled");
          }
          feeid = result.dv_fee.feeID
        } else {
          alert("Có lỗi xảy ra rồi rồi");
        }
        console.log("f là "+feeid)
        $(document).ready(function(){

          $("#confirmpass").click(function(){
          // Lấy giá trị mật khẩu từ ô nhập
          var password = $("#password").val()
          var feeeRequestOptions = {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/plain",
            },
            redirect: "follow",
          };
          fetch("http://25.20.166.7:8080/lv0/checkpasspayment?password="+password, feeeRequestOptions)
          .then((response) => response.json())
            .then((result) => {
              if (result.message == "Payment password is correct") {
                console.log("f là là"+feeid)
                
                  // Đóng modal khi xác nhận thành công
                
                var fRequestOptions = {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "text/plain",
                    },
                    redirect: "follow",
                  };
                fetch("http://25.20.166.7:8080/lv0/updatefeepaid?id="+feeid, fRequestOptions)
                .then((response) => response.json())
                .then((result) => {
                  if (result.message == "Update fee paid success") {
                    alert("Thanh toán thành công!");
                    location.reload()
                    closeModal();


                  }
                 else if (result.message == "Incorrect payment password") {
                    alert("Sai mật khẩu");
                  } else if (result.message == "Invalid form") {
                    alert("Thông tin điền chưa hợp lệ!");
                  } else {
                    return;
                  }
                })
        
            } else if (result.message == "Incorrect payment password") {
              alert("Sai mật khẩu");
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
          
        })
      })
      })
      .catch((error) => {
        console.log("Không kết nối được tới máy chủ", error);
        alert("Không kết nối được tới máy chủ");
      });
    
    } else {
      alert("Có lỗi xảy ra rồi");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });
  var paymentButton = document.getElementById("confirm-button");
  var passwordModal = document.getElementById("passwordModal");
  paymentButton.addEventListener("click", function() {
    // Hiển thị modal
    passwordModal.style.display = "block";
  });
  function closeModal() {
        passwordModal.style.display = "none";
    }
  