var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);
var vehiclerequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

let tabledata;
var roomid 
var feeid 

fetch("http://25.20.166.7:8080/lv0/vehicle", vehiclerequestOptions)
.then((response) => response.json())
.then((result) => {
    console.log(result);
    tabledata = result.list_vehicle;
    for (var i = 0; i < Object.keys(tabledata).length; i++) {
      tabledata[i].stt = i + 1;
    }
    handleTable();
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });

function handleTable() {
  let table = new Tabulator("#vehicle-table", {
    height: "100%", // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: tabledata, //assign data to table
    layout: "fitDataFill", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      {
        title: "STT",
        field: "stt",
        width: 70,
        hozAlign: "center",
        headerSort: false,
      },
      { title: "Loại", field: "vehicle_type", headerSort: false},
      
      { title: "Tên xe", field: "vehicle_name", headerSort: false},
      { 
        title: "Biển số xe",
        field: "vehicleID",
        hozAlign: "center",
        headerSort: false 
      },
      { 
        title: "Chủ sở hữu",
        width: 250,
        field: "owner_name",
        hozAlign: "center",
        headerSort: false 
      },
      { 
        title: "Phí",
        width: 140,
        field: "vehicle_fee",
        hozAlign: "center",
        headerSort: false 
      },
      /*{ title: "Địa chỉ", field: "address", headerSort: false },*/
    ],
  });
}
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
      roomid = result.room.roomID
      $("#room-id").text(result.room.roomID);
      $("#household-id").text(result.room.familyID);
      $("#room-owner").text(result.owner.name);
      $("#student-name").text(result.owner.name)
      var feeRequestOptions = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "text/plain",
        },
        redirect: "follow",
      };
      console.log("r là "+roomid)
      fetch("http://25.20.166.7:8080/lv0/vehiclefee?id="+roomid, feeRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message == "Get vehicle fee success") {
          $("#total-vehicle-fee").text(result.vehicle_fee.fee_cost);
          $("#total-vehicle-feee").text(result.vehicle_fee.fee_cost);

          if(result.vehicle_fee.fee_status === "paid"){
            $("#feestatus").text("Đã đóng")
            $("#confirm-button").addClass("disabled");
          }
          else{ $("#feestatus").text("Chưa đóng")
            $("#confirm-button").removeClass("disabled");
          }
          feeid = result.vehicle_fee.feeID
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
  