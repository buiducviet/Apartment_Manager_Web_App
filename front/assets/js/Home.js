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

fetch("http://25.20.166.7:8080/lv0/usrinfo", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    var citizen_name = result.citizen_info.name;
    sessionStorage.setItem("username", citizen_name);
    var storedUsername = sessionStorage.getItem("username");
    console.log(storedUsername); // In giá trị của "username" từ `sessionStorage` vào console.
    var register_date = result.citizen_info.CreatedAt.substring(0, 10);
    var register_date_split = register_date.split("-");
    register_date =
      register_date_split[2] +
      "/" +
      register_date_split[1] +
      "/" +
      register_date_split[0];

    var update_date = result.citizen_info.UpdatedAt.substring(0, 10);

    update_date_split = update_date.split("-");
    update_date =
      update_date_split[2] +
      "/" +
      update_date_split[1] +
      "/" +
      update_date_split[0];


      $("#student-name").text(citizen_name)
    $("#citizen-name").text(citizen_name);
    $("#citizen-id").text(result.citizen_info.citizenID);
    $("#citizen-birth").text(result.citizen_info.dob);
    $("#citizen-gender").text(result.citizen_info.gender);
    $("#citizen-contact").text(result.citizen_info.contact);
    /*$("#citizen-room").text(result.citizen_info.room);*/
    $("#citizen-register-date").text(register_date);
    $("#citizen-update-date").text(update_date);
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });

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
      $("#room-area").text(result.room.roomArea);
      $("#own-time").text(result.room.ownTime);
    } else {
      alert("Có lỗi xảy ra");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });

var roomMoneyRequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

/*fetch("http://25.20.166.7:8080/lv0/dormmoney", roomMoneyRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Dorm money history") {
      var money_history = result.money_list;
      console.log(money_history[Object.keys(money_history).length-1])
      if(money_history[Object.keys(money_history).length-1].status=="unpaid"){
        $("#fee-status").text("Chưa thanh toán");
      }else{
        $("#fee-status").text("Đã thanh toán");
      }
      
    } else {
      alert("Có lỗi xảy ra");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });*/
