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
fetch("http://25.20.166.7:8080/lv1/listfeept", roomRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get list room fee OK") {
      var roomFeeList_unpaid = result.list_room_fee_unpaid;
      
      var roomFeeList_paid= result.list_room_fee_paid;
      if (roomFeeList_paid!=null && roomFeeList_unpaid!= null){
        for (var i = 0; i < Object.keys(roomFeeList_unpaid).length; i++) {
          roomFeeList_unpaid[i].stt = i + 1;
        }
        for (var i = 0; i < Object.keys(roomFeeList_paid).length; i++) {
          roomFeeList_paid[i].stt = i + 1;
        }
        handleRoomTableUnPaid(roomFeeList_unpaid);
        handleRoomTablePaid(roomFeeList_paid);
      }else if(roomFeeList_paid!=null && roomFeeList_unpaid == null){
        for (var i = 0; i < Object.keys(roomFeeList_paid).length; i++) {
          roomFeeList_paid[i].stt = i + 1;
        }
        handleRoomTablePaid(roomFeeList_paid);
      }
      else if(roomFeeList_paid==null && roomFeeList_unpaid != null){
        for (var i = 0; i < Object.keys(roomFeeList_unpaid).length; i++) {
          roomFeeList_unpaid[i].stt = i + 1;
        }
        handleRoomTableUnPaid(roomFeeList_unpaid);
      }
      
      
     
    } else {
      alert("Có lỗi xảy ra");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
});
function handleRoomTablePaid(roomFeeList_paid) {
  var roomsTablee = new Tabulator("#housefee-table-paid", {
      height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      data: roomFeeList_paid, //assign data to table
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
        
        {
          title: "Mã",
          field: "fee_type",
          hozAlign: "center",
          width: 60,
          sorter: "number",
          hozAlign: "center",
  
        },
        {
            title: "Loại",
            field: "fee_desc",
            width: 120,
            hozAlign: "center",
            sorter: "number",
            hozAlign: "center",
    
          },
        {
          title: "Số nhà",
          field: "roomID",
          hozAlign: "center",
          width: 80,
          sorter: "number",
          hozAlign: "center",
  
        },
       
        {
          title: "Tổng",
          field: "fee_cost",
          hozAlign: "center",
          sorter: "number",
        },
        {
          title: "Thời hạn",
          field: "fee_date",
          hozAlign: "center",
          sorter: "number",
        },

        {
            title: "Tình trạng",
            field: "fee_status",
            width: 120,
            hozAlign: "center",
            sorter: "number",
            hozAlign: "center",
    
          },
  
        
      ],
      rowClick: function (e, row){
        var roomID = row.getData().roomID;
        var totalFee = row.getData().fee_cost;
        var roomRequestOptions = {
          method: "GET",
          credentials: "omit",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
          },
          redirect: "follow",
        };
        fetch("http://25.20.166.7:8080/lv1/roominfor?id="+roomID, roomRequestOptions)
        .then(response => response.json())
        .then((result) => {
          if (result.message == "Get room info successfully") {
            var room = result.room;
            var owner_name = room.owner_name;
            var familyID = room.familyID;
            $("#roomID").text(roomID);
            $("#familyID").text(familyID);
            $("#owner-name").text(owner_name);
            $("#vehicle-fee").text(totalFee);
            fetch("http://25.20.166.7:8080/lv1/vehicle?id="+roomID, roomRequestOptions)
            .then(response => response.json())
            .then((result) => {
              if (result.message == "Get list family members") {
                var vehicleList = result.list_vehicle;
                var table = new Tabulator("#vehicle-in-room", {
                  data: vehicleList,
                  layout: "fitDataStretch",
                  columns: [
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
                    {
                      title: "Phí",
                      field: "vehicle_fee",
                      headerSort: false 
                    }
                  ],
                });
              }
              })

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
        $("#room-table-modal").modal("show");
      }
    })
    var fieldEl = document.getElementById("filter-field");
    var valueEl = document.getElementById("filter-value");
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
        roomsTable.setFilter(filter, typeVal, valueEl.value);
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
      
      roomsTablee.setFilter(field, "like", value);
    }
    document
      .getElementById("download-xlsx")
      .addEventListener("click", function () {
        roomsTablee.download("xlsx", "danhsachhokhau.xlsx", {
          sheetName: "Danh sách",
        });
      });
}

function handleRoomTableUnPaid(roomFeeList_unpaid) {
    var roomsTable = new Tabulator("#housefee-table-unpaid", {
      height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
      data: roomFeeList_unpaid, //assign data to table
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
        
        {
          title: "Mã",
          field: "fee_type",
          hozAlign: "center",
          width: 60,
          sorter: "number",
          hozAlign: "center",
  
        },
        {
            title: "Loại",
            field: "fee_desc",
            width: 120,
            hozAlign: "center",
            sorter: "number",
            hozAlign: "center",
    
          },
        {
          title: "Số nhà",
          field: "roomID",
          hozAlign: "center",
          width: 80,
          sorter: "number",
          hozAlign: "center",
  
        },
       
        {
          title: "Tổng",
          field: "fee_cost",
          hozAlign: "center",
          sorter: "number",
        },
        {
          title: "Thời hạn",
          field: "fee_date",
          hozAlign: "center",
          sorter: "number",
        },

        {
            title: "Tình trạng",
            field: "fee_status",
            width: 120,
            hozAlign: "center",
            sorter: "number",
            hozAlign: "center",
    
          },
  
        
      ],
      rowClick: function (e, row){
        var roomID = row.getData().roomID;
        var totalFee = row.getData().fee_cost;
        var roomRequestOptions = {
          method: "GET",
          credentials: "omit",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "text/plain",
          },
          redirect: "follow",
        };
        fetch("http://25.20.166.7:8080/lv1/roominfor?id="+roomID, roomRequestOptions)
        .then(response => response.json())
        .then((result) => {
          if (result.message == "Get room info successfully") {
            var room = result.room;
            var owner_name = room.owner_name;
            var familyID = room.familyID;
            $("#roomID").text(roomID);
            $("#familyID").text(familyID);
            $("#owner-name").text(owner_name);
            $("#vehicle-fee").text(totalFee);
            console.log(roomID)
            var roommRequestOptions = {
              method: "GET",
              credentials: "omit",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "text/plain",
              },
              redirect: "follow",
            };
            fetch("http://25.20.166.7:8080/lv1/vehicle?id="+roomID, roommRequestOptions)
            
            .then(response => response.json())
            .then((result) => {
              if (result.message == "Get list vehicles") {
                var vehicleList = result.list_vehicle;
                console.log(vehicleList)
                if(vehicleList== null){
                  console.log("dmcd")
                  $("#vehicle-in-roomm").html("");
                  console.log("dmcd")
                }
                else{
                  /*;*/
                  var table = new Tabulator("#vehicle-in-roomm", {
                    data: vehicleList,
                    with: "50%",
                    layout: "fitDataStretch",
                    columns: [
                      
                      { title: "Loại xe", field: "vehicle_type", headerSort: false},
                      { title: "Tên xe", field: "vehicle_name", headerSort: false},
                      { 
                        title: "Biển số xe",
                        field: "vehicleID",
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
                    rowClick: function (e, roww){
                      var vehiclename = roww.getData().vehicle_name
                      var vehicleID = roww.getData().vehicleID
                      var vehicle_ownerID = roww.getData().owner_id
                      var vehicle_type = roww.getData().vehicle_type
                      
  
                      $("#add-vehiclename-input-edit").val(vehiclename);
                      $("#add-vehicleID-edit").val(vehicleID);
                      $("#add-ownerID-edit").val(vehicle_ownerID);
                      $("#add-vehicleID-edit").val(vehicleID);
                      $("input[name='vehicle-type-edit'][value='" + vehicle_type + "']").prop("checked", true);
                      var popupMenu = document.getElementById("popup-menu-edit-vehicle");
                      var overlay = document.createElement("div");
                      overlay.className = "overlay";
                      popupMenu.style.display = "block";
                      document.getElementById("room-table-modal").appendChild(overlay);
                      overlay.style.display = "block";
                      overlay.addEventListener("click", function () {
                        popupMenu.style.display = "none";
                        overlay.style.display = "none";
                      });
  
                      document.querySelectorAll('input[name="vehicle-type-edit"]').forEach(function(radio) {
                        radio.disabled = true;
                      });
                      $(document).ready(function() {
                        var roomid =   document.getElementById("roomID").innerHTML
                        $("#roomID-vehicle-edit").text(roomid)
                        console.log("room là: "+roomid)
                        function checkInput() {
                          var vehiclename = $("#add-vehiclename-input-edit").val();
                          var vehicleID = $("#add-vehicleID-edit").val();
                          var vehicle_type = $("input[name='vehicle-type-edit']:checked").val();
                          var vehicle_ownerID = $("#add-ownerID-edit").val();             
                          if (vehicleID != "" && vehiclename != "" && vehicle_type != "" && vehicle_ownerID!= "") {
                            $("#save-btn-edit-vehicle").removeClass("disabled");
                            var myButton = document.getElementById("save-btn-edit-vehicle");
                            myButton.disabled = false; 
                          } else {
                            $("#save-btn-edit-vehicle").addClass("disabled");
                            var myButton = document.getElementById("save-btn-edit-vehicle");
                            myButton.disabled = true; 
                          }
                        }
        
        
                        setInterval(checkInput,300)
        
                        $("#save-btn-edit-vehicle").click(function() {
                          // Thu thập dữ liệu từ các trường input
                          var vehiclename = $("#add-vehiclename-input-edit").val();
                          var vehicleID = $("#add-vehicleID-edit").val();
                          var vehicle_type = $("input[name='vehicle-type-edit']:checked").val();
                          var vehicle_ownerID = $("#add-ownerID-edit").val();
                          console.log(vehicleID)
                          
                         
                          // Tạo một đối tượng chứa dữ liệu
                          var vehicleData = {
                            vehicle_name: vehiclename,
                            vehicle_type: vehicle_type,
                            vehicleID :vehicleID,
                            owner_id:vehicle_ownerID,
                            roomID: roomid,                
                          };
                          console.log(vehicleData.owner_id)
                          console.log(vehicleData.vehicle_type)
                          var newrequestOptions = {
                            method: "POST",
                            headers: {
                              Authorization: "Bearer " + token,
                              "Content-Type": "text/plain",
                            },
                            body: JSON.stringify(vehicleData),
                            redirect: "follow",
                          };
                
                          // Gửi dữ liệu lên server thông qua fetch API
                          fetch("http://25.20.166.7:8080/lv1/updatevehicle", newrequestOptions)
                          .then(response => response.json())
                          .then((result) => {
                            if (result.message == "Update vehicle success") {
                              var popupMenu = document.getElementById("popup-menu-edit-vehicle");
                              popupMenu.style.display = "none";
                              var overlay = document.getElementsByClassName("overlay");
                              overlay.display= "none";
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
                        });
      
                      })
                    }
                  });
  
                  
                }
         

               
              }
              })

              $(document).ready(function() {
                $("#roomID-vehicle").text(roomID)
                function checkInput() {
                  var vehiclename = $("#add-vehiclename-input").val();
                  var vehicleID = $("#add-vehicleID-input").val();
                  var vehicle_type = $("input[name='vehicle-type']:checked").val();
                  var vehicle_ownerID = $("#add-ownerID-input").val();
                  
                  
        
                  if (vehicleID != "" && vehiclename != "" && vehicle_type != "" && vehicle_ownerID!= "") {
                    $("#save-btn-new-vehicle").removeClass("disabled");
                    var myButton = document.getElementById("save-btn-new-vehicle");
                    myButton.disabled = false; 
                  } else {
                    $("#save-btn-new-vehicle").addClass("disabled");
                    var myButton = document.getElementById("save-btn-new-vehicle");
                    myButton.disabled = true; 
                  }
                }


                setInterval(checkInput,300)

                $("#save-btn-new-vehicle").click(function() {
                  // Thu thập dữ liệu từ các trường input
                  var vehiclename = $("#add-vehiclename-input").val();
                  var vehicleID = $("#add-vehicleID-input").val();
                  var vehicle_type = $("input[name='vehicle-type']:checked").val();
                  var vehicle_ownerID = $("#add-ownerID-input").val();
                  var rid =  parseInt(document.getElementById("roomID-vehicle").innerHTML)
                  console.log("abc"+rid)
                  
                 
                  // Tạo một đối tượng chứa dữ liệu
                  var vehicleData = {
                    vehicle_name: vehiclename,
                    vehicle_type: vehicle_type,
                    vehicleID :vehicleID,
                    owner_id:vehicle_ownerID,
                    roomID: rid,                
                  };
                  console.log()
                  console.log(vehicleData.owner_id)
                  console.log(vehicleData.vehicle_type)
                  var newrequestOptions = {
                    method: "POST",
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "text/plain",
                    },
                    body: JSON.stringify(vehicleData),
                    redirect: "follow",
                  };
        
                  // Gửi dữ liệu lên server thông qua fetch API
                  fetch("http://25.20.166.7:8080/lv1/newvehicle", newrequestOptions)
                  .then(response => response.json())
                  .then((result) => {
                    if (result.message == "Create vehicle success") {
                      var feeData = {
                        fee_type: "PPT",
                        fee_desc: "Phí phương tiện",
                        fee_month: "01-2024",
                        roomID: rid,
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
                          console.log("done")
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
    
                      var popupMenu = document.getElementById("popup-menu-newvehicle");
                      popupMenu.style.display = "none";
                      var overlay = document.getElementsByClassName("overlay");
                      overlay.display= "none";
                      
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

                  
                
                 
                })
              
            });

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
        $("#room-table-modal").modal("show");
      }
    })
    var fieldEl = document.getElementById("filter-field");
    var valueEl = document.getElementById("filter-value");
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
        roomsTable.setFilter(filter, typeVal, valueEl.value);
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
      
      roomsTable.setFilter(field, "like", value);
    }
    document
      .getElementById("download-xlsx")
      .addEventListener("click", function () {
        roomsTable.download("xlsx", "danhsachhokhau.xlsx", {
          sheetName: "Danh sách",
        });
      });
}
