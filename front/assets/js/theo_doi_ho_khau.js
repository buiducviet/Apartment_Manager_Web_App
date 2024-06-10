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

var familyRequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

let tabledata;

fetch("http://25.20.166.7:8080/lv0/family", familyRequestOptions)
.then((response) => response.json())
.then((result) => {
    console.log(result);
    tabledata = result.list_citizen;
    for (var i = 0; i < Object.keys(tabledata).length; i++) {
      tabledata[i].stt = i + 1;
    }
    handleTable();
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });

function handleTable() {
  let table = new Tabulator("#roomate-table", {
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
      { title: "Họ và tên", field: "name", headerSort: false, width: 200 },
      { title: "Mã CCCD", field: "citizenID", headerSort: false },
      { title: "Giới tính", field: "gender", headerSort: false },
      { title: "Ngày sinh", field: "dob", headerSort: false },
      {
        title: "SĐT",
        field: "contact",
        headerSort: false,
      },
      /*{ title: "Địa chỉ", field: "address", headerSort: false },*/
    ],
  });
}
