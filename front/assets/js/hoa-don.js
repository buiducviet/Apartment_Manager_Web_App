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




var electricBillrequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};
fetch("http://25.20.166.7:8080/lv0/electricbill", electricBillrequestOptions)
.then((response) => response.json())
.then((result) => {
  if (result.message == "Get bill information") {
    $("#customerID").text(result.bill_electric.customerID);
    $("#month").text(result.bill_electric.bill_month);
    $("#duration").text(result.bill_electric.bill_date);
    $("#sum-cost").text(result.bill_electric.bill_cost);
  } else {
    alert("Có lỗi xảy ra");
  }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });


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
    } else {
      alert("Có lỗi xảy ra");
    }
    })
    .catch((error) => {
      console.log("Không kết nối được tới máy chủ", error);
    });
  

var internetBillrequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};
fetch("http://25.20.166.7:8080/lv0/internetbill", internetBillrequestOptions)
.then((response) => response.json())
.then((result) => {
  if (result.message == "Get bill information") {
    $("#customerID").text(result.bill_internet.customerID);
    $("#month").text(result.bill_internet.bill_month);
    $("#duration").text(result.bill_internet.bill_date);
    $("#sum-cost").text(result.bill_internet.bill_cost);
  } else {
    alert("Có lỗi xảy ra");
  }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });


      
    

  
  