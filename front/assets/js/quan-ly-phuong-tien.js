var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);

var citizenRequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

fetch("http://25.20.166.7:8080/lv1/listvehicle", citizenRequestOptions)
.then((response) => response.json())
.then((result) => {
  if (result.message == "Get list vehicle OK") {
    var citizenList = result.list_vehicle;
    for (var i = 0; i < Object.keys(citizenList).length; i++) {
      citizenList[i].stt = i + 1;
    }
    handleCitizenTable(citizenList);
  } else {
    alert("Có lỗi xảy ra");
  }
})
.catch((error) => {
  console.log("Không kết nối được tới máy chủ", error);
  alert("Không kết nối được tới máy chủ");
});
function handleCitizenTable(citizenList) {
  var citizenTable = new Tabulator("#vehicle-table", {
    height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: citizenList, //assign data to table
    virtualDom: true,
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      {
        title: "STT",
        field: "stt",
        width: 80,
        hozAlign: "center",
        sorter: "number",
      },
      { title: "Loại xe", field: "vehicle_type", headerSort: false},
      { title: "Tên xe", field: "vehicle_name", headerSort: false},
      { 
        title: "Biển số xe",
        field: "vehicleID",
        headerSort: false 
      },
      {
        title: "Số nhà",
        field: "roomID",
        hozAlign: "center",
        headerSort: false 
      },
      { 
        title: "Chủ sở hữu",
        field: "owner_name",
        width: 200,
        hozAlign: "center",
        headerSort: false 
      },
      { 
        title: "Mã CCCD chủ sở hữu",
        field: "owner_id",
        width: 200,
        hozAlign: "center",
        headerSort: false 
      },
      {
        title: "Phí",
        field: "vehicle_fee",
        hozAlign: "center",
        headerSort: false 
      },
    ],
    rowClick: function (e, row){
      var ownername = row.getData().owner_name;
      var ownerid = row.getData().owner_id
      var vehicleid = row.getData().vehicleID
      var vehiclename = row.getData().vehicle_name
      var roomid = row.getData().roomID

     
      $("#owner_name").text(ownername)
      $("#roomID").text(roomid)
      $("#vehicleID").text(vehicleid)
      $("#vehicle_name").text(vehiclename)

      var popupMenu = document.getElementById("popup-menu-edit-vehicle");
      var overlay = document.createElement("div");
      overlay.className = "overlay";
      popupMenu.style.display = "block";
      document.body.appendChild(overlay);
      overlay.style.display = "block";
      overlay.addEventListener("click", function () {
        popupMenu.style.display = "none";
        overlay.style.display = "none";
      });

      $(document).ready(function(){
        $("#delete_vehicle").click(function(){
          var newrequestOptions = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/plain",
            },
            redirect: "follow",
          };
          fetch("http://25.20.166.7:8080/lv1/deletevehicle?id="+vehicleid, newrequestOptions)
            .then(response => response.json())
            .then((result) => {
              if (result.message == "Delete Success") {
               
                var feeData = {
                  fee_type: "PPT",
                  fee_desc: "Phí phương tiện",
                  fee_month: "01-2024",
                  roomID: parseInt(roomid),
                  fee_date: "31-01-2024",
                  fee_status: "unpaid",
                }
                console.log(feeData.roomID)
                      var newfeeOptions = {
                        method: "POST",
                        headers: {
                          Authorization: "Bearer " + token,
                          "Content-Type": "text/plain",
                        },
                        body: JSON.stringify(feeData),
                        redirect: "follow",
                      };
                      fetch("http://25.20.166.7:8080/lv1/updatevehiclefee", newfeeOptions)
                      .then(response => response.json())
                      .then((result) => {
                        if (result.message == "Update fee success") {
                          alert("Đã xóa phương tiện thành công")
                          var popupMenu = document.getElementById("popup-menu-edit-vehicle");
                          var overlay= document.getElementsByClassName("overlay");
                          popupMenu.style.display="none"
                          overlay.style.display="none"
                        } else if (result.message == "citizen existed") {
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
            })
        })
      })

    }
  });
  var fieldEl = document.getElementById("filter-field");
  var valueEl = document.getElementById("filter-value");

  //Trigger setFilter function with correct parameters
  function updateFilter() {
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    var filter = filterVal == "function" ? customFilter : filterVal;

    if (filterVal == "function") {
      typeEl.disabled = true;
      valueEl.disabled = true;
    } else {
      typeEl.disabled = false;
      valueEl.disabled = false;
    }

    if (filterVal) {
      citizenTable.setFilter(filter, typeVal, valueEl.value);
    }
  }

  //Update filters on value change
  document.getElementById("filter-field").addEventListener("change", function() {
    applyFilter();
  });

  document.getElementById("filter-value").addEventListener("input", function() {
    applyFilter();
  });

  // Function to apply filter
  function applyFilter() {
    var field = document.getElementById("filter-field").value;
    var value = document.getElementById("filter-value").value.toLowerCase();
    
    citizenTable.setFilter(field, "like", value);
  }
  document
    .getElementById("download-citizen-xlsx")
    .addEventListener("click", function () {
      citizenTable.download("xlsx", "danhsachcudan.xlsx", {
        sheetName: "Danh sách",
      });
    });
}