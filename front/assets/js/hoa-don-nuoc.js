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
fetch("http://25.20.166.7:8080/lv0/roominfo", roomRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get room info successfully") {
      $("#room-id").text(result.room.roomID);
      $("#household-id").text(result.room.familyID);
      $("#room-owner").text(result.owner.name);
      $("#student-name").text(result.owner.name)
      
    } else {
      alert("Có lỗi xảy ra");
    }
    
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });

var feeid




  var waterBillrequestOptions = {
    method: "GET",
    credentials: "omit",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "text/plain",
    },
    redirect: "follow",
  };
  fetch("http://25.20.166.7:8080/lv0/waterbill", waterBillrequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get bill information") {
      $("#customerID").text(result.bill_water.customerID);
      $("#month").text(result.bill_water.bill_month);
      $("#duration").text(result.bill_water.bill_date);
      $("#sum-cost").text(result.bill_water.bill_cost);
      $("#amount").text(result.bill_water.bill_amount);

    
    if(result.bill_water.bill_status === "paid"){
      $("#feestatus").text("Đã đóng")
      $("#confirm-button").addClass("disabled");
    }
    else{ $("#feestatus").text("Chưa đóng")
      $("#confirm-button").removeClass("disabled");
    }

    feeid = result.bill_water.billID
    } else {
      alert("Có lỗi xảy ra");
    }
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
            fetch("http://25.20.166.7:8080/lv0/updatebill?id="+feeid, fRequestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (result.message == "Update bill paid success") {
                alert("Thanh toán thành công!");
                closeModal();
                location.reload()
  
  
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
    });

  console.log("đây lad "+feeid)
  var paymentButton = document.getElementById("confirm-button");
  var passwordModal = document.getElementById("passwordModal");
  paymentButton.addEventListener("click", function() {
    // Hiển thị modal
    passwordModal.style.display = "block";
  });
  function closeModal() {
        passwordModal.style.display = "none";
    }
  
  
  