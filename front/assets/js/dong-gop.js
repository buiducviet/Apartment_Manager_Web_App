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
var roomid
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
            // Đóng modal khi xác nhận thành công
            var selectElement = document.getElementById("filter-field");

        // Lấy giá trị của option được chọn
            var selectedValue = selectElement.value;
            var mySpan = document.getElementById("room-id");
            var cost =parseInt($("#amount").val())
            var donorname = $("#room-owner").innerText
            var roomid = parseInt($("#room-id").innerText)
            var selectElement = document.getElementById("filter-field");

           
            // Lấy phần chữ trong thẻ option
            var selectedText = selectElement.options[selectElement.selectedIndex].innerText;
            var donationid =selectedValue +"-P" +mySpan.innerText +"-01-2024"
            var updatedonation = {
              donationID : donationid,
              donation_cost:cost,
              donor_name: donorname,
              donation_month: "01-2024",
              donation_desc: "",
              donation_type:selectedText,
              roomID: roomid,
            }
            var fRequestOptions = {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "text/plain",
                },
                body: JSON.stringify(updatedonation),
                redirect: "follow",
              };
              
            fetch("http://25.20.166.7:8080/lv0/updatedonation", fRequestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (result.message == "Update success") {
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
    alert("Không kết nối được tới máy chủ");
  });




  function updateContent() {
    var selectElement = document.getElementById("filter-field");
    var contentElement = document.getElementById("content");

    // Lấy giá trị được chọn từ dropdown
    var selectedValue = selectElement.value;

    // Cập nhật nội dung của thẻ span
    if (selectedValue === "Quỹ vì người nghèo") {
        contentElement.textContent = " Quỹ vì người nghèo nhằm mục đích.....";
        
      } else if (selectedValue === "Quỹ tổ dân phố") {
        contentElement.textContent = " Qũy tổ dân phố nhằm mục đích....";
      } else if (selectedValue === "Quỹ khuyến học") {
        contentElement.textContent = " Quỹ khuyến học nhằm mục đích";
      } else {
        // Trường hợp giá trị không xác định
        contentElement.textContent = "";
      }
  }

  var paymentButton = document.getElementById("confirm-button");
  var passwordModal = document.getElementById("passwordModal");
  paymentButton.addEventListener("click", function() {
    // Hiển thị modal
    passwordModal.style.display = "block";
  });
  function closeModal() {
        passwordModal.style.display = "none";
    }
  