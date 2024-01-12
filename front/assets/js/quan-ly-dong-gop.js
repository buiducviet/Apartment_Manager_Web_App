var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);

var donationRequestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

fetch("http://25.20.166.7:8080/lv1/listdonation", donationRequestOptions)
.then((response) => response.json())
.then((result) => {
  if (result.message == "Get list donation OK") {
    var donationList = result.list_donations;
    for (var i = 0; i < Object.keys(donationList).length; i++) {
      donationList[i].stt = i + 1;
    }
    handleDonationTable(donationList);
  } else {
    alert("Có lỗi xảy ra");
  }
})
.catch((error) => {
  console.log("Không kết nối được tới máy chủ", error);
  alert("Không kết nối được tới máy chủ");
});
function handleDonationTable(donationList) {
  var donationTable = new Tabulator("#donation-table", {
    height: 400, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: donationList, //assign data to table
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
        title: "Loại quỹ",
        field: "donation_type",
        width: 200,
        hozAlign: "center",
        sorter: "string",
        hozAlign: "center",

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
        title: "Họ và tên chủ hộ",
        field: "donor_name",
        hozAlign: "center",
        sorter: "string",
      },  
      {
        title: "Số tiền đóng góp",
        field: "donation_cost",
        width: 300,
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
      donationTable.setFilter(filter, typeVal, valueEl.value);
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
    
    donationTable.setFilter(field, "like", value);
  }
  document
    .getElementById("download-donation-xlsx")
    .addEventListener("click", function () {
      donationTable.download("xlsx", "danhsachdonggop.xlsx", {
        sheetName: "Danh sách",
      });
    });
}