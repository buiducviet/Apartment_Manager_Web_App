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

fetch("http://25.20.166.7:8080/lv1/listFamily", roomRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get list room OK") {
      var roomList = result.list_rooms;
      for (var i = 0; i < Object.keys(roomList).length; i++) {
        roomList[i].stt = i + 1;
      }
      handleRoomTable(roomList);
    } else {
      alert("Có lỗi xảy ra");
    }
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
  });

function handleRoomTable(roomList) {
  var roomsTable = new Tabulator("#household-table", {
    height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: roomList, //assign data to table
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
        title: "Số nhà",
        field: "roomID",
        width: 120,
        hozAlign: "center",
        sorter: "number",
        hozAlign: "center",

      },
      {
        title: "Diện tích",
        field: "roomArea",
        hozAlign: "center",
        sorter: "number",
        hozAlign: "center",

      },
      {
        title: "Mã hộ",
        field: "familyID",
        width: 120,
        hozAlign: "center",
        sorter: "number",
        hozAlign: "center",

      },
      {
        title: "Họ và tên chủ hộ",
        field: "owner_name",
        hozAlign: "center",
        sorter: "number",
      },  
      {
        title: "Tình trạng",
        field: "room_status",
        width: 120,
        hozAlign: "center",
        sorter: "number",
        hozAlign: "center",

      },
      
    ],
    rowClick: function (e, row) {
      var room = row.getData().familyID;
      var owner_name = row.getData().owner_name;
      var update_date = row.getData().UpdatedAt;
      var register_date = row.getData().CreatedAt;
      var roomID = row.getData().roomID;
      var room_area = row.getData().roomArea

     if(row.getData().room_status !="not owned"){
      fetch(
        "http://25.20.166.7:8080/lv1/citizensbyfamily?id=" + room,
        roomRequestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.message == "Get list family members") {
            var citizensList = result.list_citizen;
            var table = new Tabulator("#citizens-in-room", {
              data: citizensList,
              layout: "fitDataStretch",
              columns: [
                //define the table columns
                
                {
                  title: "Tên",
                  field: "name",
                  sorter: "number",
                },
                {
                  title: "CCCD",
                  field: "citizenID",
                  sorter: "number",
                },
                {
                  title: "Ngày sinh",
                  field: "dob",
                  sorter: "date",
                },
                {
                  title: "Giới tính",
                  field: "gender",
                  sorter: "number",
                  hozAlign: "center",
                },
                {
                  title: "Quan hệ với chủ hộ",
                  field: "relation",
                  sorter: "number",
                  hozAlign: "center",
                },
                {
                  title: "SĐT",
                  field: "contact",
                  sorter: "number",
                },
                {
                  title: "Tình trạng",
                  field: "citizen_status",
                  sorter: "number",
                },
              
              ],
              rowClick: function (e, roww){
                var id = roww.getData().citizenID;
                var name = roww.getData().name;
                var dob = roww.getData().dob;
                var gender = roww.getData().gender;
                var relation = roww.getData().relation;
                var contact = roww.getData().contact;
                var status = roww.getData().citizen_status;
                console.log(id);

                $("#add-name-input-update").val(name)
                $("#add-citizenID-input-update").val(id);
                $("#add-birthday-input-update").val(dob);
                $("input[name='genderr'][value='" + gender + "']").prop("checked", true);
                $("#add-contact-input-update").val(contact);
                $("#add-relation-input-update").val(relation);
                $("input[name='status-update'][value='" + gender + "']").prop("checked", true);

                var popupMenu = document.getElementById("popup-menu-update");
                var overlay = document.createElement("div");
                overlay.className = "overlay";
                popupMenu.style.display = "block";
                document.getElementById("room-table-modal").appendChild(overlay);
                overlay.style.display = "block";
                overlay.addEventListener("click", function () {
                  popupMenu.style.display = "none";
                  overlay.style.display = "none";
                });


                $(document).ready(function() {
                  // Lắng nghe sự kiện click trên nút "Lưu"
                  function checkInput() {
                    var name = $("#add-name-input-update").val();
                    var citizenID = $("#add-citizenID-input-update").val();
                    var dob = $("#add-birthday-input-update").val();
                    var gender = $("input[name='genderr']:checked").val();
                    var contact = $("#add-contact-input-update").val();
                    var relation = $("#add-relation-input-update").val();
                    var status = $("input[name='status-update']:checked").val();
                    
          
                    if (name != "" && citizenID != "" && dob != "" && gender!= ""&& relation!= "" && status !="") {
                      $("#save-btn-update").removeClass("disabled");
                    } else {
                      $("#save-btn-update").addClass("disabled");
                    }
                  }
                    setInterval(checkInput, 300);
                  $("#save-btn-update").click(function() {
                    // Thu thập dữ liệu từ các trường input
                    var name = $("#add-name-input-update").val();
                    var citizenID = $("#add-citizenID-input-update").val();
                    var dob = $("#add-birthday-input-update").val();
                    var gender = $("input[name='genderr']:checked").val();
                    var contact = $("#add-contact-input-update").val();
                    var relation = $("#add-relation-input-update").val();
                    var status = $("input[name='status-update']:checked").val();
                    // Tạo một đối tượng chứa dữ liệu
                    var updatecitizenData = {
                      name: name,
                      citizenID: citizenID,
                      dob: dob,
                      gender: gender,
                      contact: contact,
                      relation: relation,
                      familyID: room,
                      roomID: roomID,
                      citizen_status: status,
                    };
                    console.log(name);
                    
                    var updaterequestOptions = {
                      method: "POST",
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "text/plain",
                      },
                      body: JSON.stringify(updatecitizenData),
                      redirect: "follow",
                    };
          
                    // Gửi dữ liệu lên server thông qua fetch API
                    fetch("http://25.20.166.7:8080/lv1/updatecitizen", updaterequestOptions)
                    .then(response => response.json())
                    .then((result) => {
                      if (result.message == "Update success") {
                        var popupMenu = document.getElementById("popup-menu-update");
                        popupMenu.style.display = "none";
                        var overlay = document.getElementsByClassName("overlay");
                        overlay.display= "none";
                        location.reload();
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
                  function DeleteCitizen(id){
                    fetch("http://25.20.166.7:8080/lv1/deletecitizen?id="+id,{

                      method: 'DELETE',
                    
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "text/plain",
                      },
                      
                      
                    })
                    .then(response => response.json())
                    .then((result) => {
                      if (result.message == "Delete Success") {
                        var popupMenu = document.getElementById("popup-menu-update");
                        popupMenu.style.display = "none";
                        var overlay = document.getElementsByClassName("overlay");
                        overlay.display= "none";
                        location.reload();
                        location.reload();
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
                  $("#delete-btn-update").click(function(){
                    var citizenID = $("#add-citizenID-input-update").val();
                    console.log(citizenID);
                    DeleteCitizen(citizenID);
                    
                   
                  });
                });
              }
  
            });       
          } else {
            alert("Có lỗi xảy ra rồi");
          }

        })
        .catch((error) => {
          console.log("Không kết nối được tới máy chủ", error);
          alert("Không kết nối được tới máy chủ");
        });

      register_date = register_date.substring(0, 10);
      register_date_split = register_date.split("-");
      register_date =
        register_date_split[2] +
        "/" +
        register_date_split[1] +
        "/" +
        register_date_split[0];

      update_date = update_date.substring(0, 10);
      update_date_split = update_date.split("-");
      update_date =
        update_date_split[2] +
        "/" +
        update_date_split[1] +
        "/" +
        update_date_split[0];

      $("#owner-name").text(owner_name);
      $("#roomID").text(roomID)
      $("#familyID").text(room)
      $("#register_date").text(register_date);
      $("#update_date").text(update_date);


      
      $(document).ready(function() {
        // Lắng nghe sự kiện click trên nút "Lưu"
        function checkInput() {
          var name = $("#add-name-input").val();
          var citizenID = $("#add-citizenID-input").val();
          var dob = $("#add-birthday-input").val();
          var gender = $("input[name='gender']:checked").val();
          var contact = $("#add-contact-input").val();
          var relation = $("#add-relation-input").val();
          var status = $("input[name='status']:checked").val();
          

          if (name != "" && citizenID != "" && dob != "" && gender!= ""&& contact!= ""&& relation!= "" && status!="") {
            $("#save-btn-edit").removeClass("disabled");
          } else {
            $("#save-btn-edit").addClass("disabled");
          }
        }
          setInterval(checkInput, 300);
        $("#save-btn-edit").click(function() {
          // Thu thập dữ liệu từ các trường input
          var name = $("#add-name-input").val();
          var citizenID = $("#add-citizenID-input").val();
          var dob = $("#add-birthday-input").val();
          var gender = $("input[name='gender']:checked").val();
          var contact = $("#add-contact-input").val();
          var relation = $("#add-relation-input").val();
          var status = $("input[name='status-update']:checked").val();
          
          
          // Tạo một đối tượng chứa dữ liệu
          var citizenData = {
            name: name,
            citizenID: citizenID,
            dob: dob,
            gender: gender,
            contact: contact,
            relation: relation,
            familyID: room,
            roomID: roomID,
            citizen_status: status
          };
          
          var newrequestOptions = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(citizenData),
            redirect: "follow",
          };

          // Gửi dữ liệu lên server thông qua fetch API
          fetch("http://25.20.166.7:8080/lv1/newcitizen", newrequestOptions)
          .then(response => response.json())
          .then((result) => {
            if (result.message == "Create success") {
              var popupMenu = document.getElementById("popup-menu-edit");
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
      });
      $("#room-table-modal").modal("show");
     } else {
      $("#chuho_roomID").val(roomID)
      $("#save-btn-new").click(function(){
            var name = $("#chuho_name").val();
            var citizenID = $("#chuhoID").val();
            var dob = $("#chuho_dob").val();
            var gender = $("input[name='gender_chuho']:checked").val();
            var contact = $("#chuho_contact").val();
            var relation = "";
            var owntime = $("#chuho_owntime").val()
            var familyID = $("#chuho_familyID").val()
            var citizenDataa = {
              name: name,
              citizenID: citizenID,
              dob: dob,
              gender: gender,
              contact: contact,
              relation: relation,
              familyID: familyID,
              roomID: roomID
            };
            
            fetch ("http://25.20.166.7:8080/lv1/newcitizen", {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "text/plain",
              },
              body: JSON.stringify(citizenDataa),
              redirect: "follow",
            })
            .then(response => response.json())
            .then((result) => {
            if (result.message == "Create success") {
              var popupMenu = document.getElementById("popup-menu-edit");
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

            var updateroomDataa = {
              citizenID: citizenID,
              room_status: "owned",
              roomArea: room_area,
              ownTime: owntime,
              owner_name: name,
              familyID: familyID,
              roomID: roomID
            };
            console.log(updateroomDataa.owner_name)
            var updaterequestOptions = {
              method: "POST",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "text/plain",
              },
              body: JSON.stringify(updateroomDataa),
              redirect: "follow",
            };
            fetch("http://25.20.166.7:8080/lv1/updateroom", updaterequestOptions)
                    .then(response => response.json())
                    .then((result) => {
                      if (result.message == "Update success") {
                        var popupMenu = document.getElementById("popup-menu-update-room");
                        popupMenu.style.display = "none";
                        var overlay = document.getElementsByClassName("overlay");
                        overlay.display= "none";
                        location.reload();
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
                      alert("Không kết nối được tới máy chủ rồi");
                    });
      })
      var popupMenu = document.getElementById("popup-menu-update-room");
         
      popupMenu.style.display = "block";
      var overlay = document.createElement("div");
      overlay.className = "overlay";
    
       overlay.style.display = "block";
       document.body.appendChild(overlay);
       overlay.addEventListener("click", function () {
        popupMenu.style.display = "none";
        overlay.style.display = "none";
      });

     }
      
    },
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



/*function handleRoomTable(roomList) {
  var roomsTable = new Tabulator("#household-table", {
    height: 400,
    data: roomList,
    virtualDom: true,
    layout: "fitColumns",
    columns: [
      { title: "STT", field: "stt", width: 80, hozAlign: "center", sorter: "number" },
      { title: "Số nhà", field: "roomID", width: 120, hozAlign: "center", sorter: "number" },
      { title: "Mã hộ", field: "familyID", hozAlign: "center", sorter: "number" },
      { title: "CCCD chủ hộ", field: "citizenID", hozAlign: "center", sorter: "number" },
      { title: "Ngày cập nhật", field: "update_date", hozAlign: "center", sorter: "string", visible: false },
      { title: "Ngày đăng kí", field: "register_date", sorter: "string", visible: false },
      {
        title: "Actions",
        formatter: function(cell, formatterParams, onRendered) {
          var rowIndex = cell.getRow().getIndex();
          return '<a href="#" class="details-icon" onclick="showDetails(' + rowIndex + ')"><i class="fa fa-info-circle"></i></a>' +
                 '<a href="#" class="edit-icon" onclick="editRow(' + rowIndex + ')"><i class="fa fa-pencil"></i></a>';
        },
        hozAlign: "center",
        headerSort: false,
      },
    ],
  });

  // Hàm hiển thị thông tin chi tiết khi nhấp vào biểu tượng "details"
  function showDetails(rowIndex) {
    var rowData = roomsTable.getData()[rowIndex];
    console.log("Details for row: ", rowData);
    // Thực hiện logic hiển thị thông tin chi tiết
  }

  // Hàm xử lý khi nhấp vào biểu tượng "edit"
  function editRow(rowIndex) {
    var rowData = roomsTable.getData()[rowIndex];
    console.log("Edit row: ", rowData);
    // Thực hiện logic sửa đổi dữ liệu hoặc mở form sửa đổi
  }
}


*/