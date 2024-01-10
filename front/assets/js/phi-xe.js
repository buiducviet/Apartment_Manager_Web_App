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
      
      { title: "Loại xe", field: "vehicle_name", headerSort: false},
      { 
        title: "Biển số xe",
        field: "vehicleID",
        headerSort: false 
      },
      { 
        title: "Chủ sở hữu",
        field: "owner_name",
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
      $("#room-id").text(result.room.roomID);
      $("#household-id").text(result.room.familyID);
      $("#room-owner").text(result.owner.name);
      
    } else {
      alert("Có lỗi xảy ra");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });

