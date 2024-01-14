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