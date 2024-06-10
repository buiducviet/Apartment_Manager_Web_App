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

fetch("http://25.20.166.7:8080/lv1/allcitizen", citizenRequestOptions)
.then((response) => response.json())
.then((result) => {
  if (result.message == "Get list citizen OK") {
    var citizenList = result.list_citizen;
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
  var citizenTable = new Tabulator("#citizen-table", {
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
      {
        title: "CCCD",
        field: "citizenID",
        width: 150,
        hozAlign: "center",
        sorter: "string",
        hozAlign: "center",

      },
      {
        title: "Họ và tên",
        field: "name",
        width: 300,
        hozAlign: "center",
        sorter: "string",
        hozAlign: "center",

      },
    
      {
        title: "Ngày sinh",
        field: "dob",
        hozAlign: "center",
        sorter: "string",
      },  
      {
        title: "Giới tính",
        field: "gender",
        hozAlign: "center",
        sorter: "string",
        hozAlign: "center",

      },
      {
        title: "Số nhà",
        field: "roomID",
        hozAlign: "center",
        sorter: "number",
        hozAlign: "center",

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
      $("input[name='status-update'][value='" + status + "']").prop("checked", true);

      var popupMenu = document.getElementById("popup-menu-update");
      var overlay = document.createElement("div");
      overlay.className = "overlay";
      popupMenu.style.display = "block";
      document.body.appendChild(overlay);
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
            roomID: roomid,
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