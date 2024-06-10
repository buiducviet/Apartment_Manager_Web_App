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
fetch("http://25.20.166.7:8080/lv1/listinternetbill", roomRequestOptions)
  .then((response) => response.json())
  .then((result) => {
    if (result.message == "Get list bill OK") {
      var BillList_unpaid = result.list_bill_unpaid;
      
      var BillList_paid= result.list_bill_paid;
      if (BillList_paid!=null && BillList_unpaid!= null){
        for (var i = 0; i < Object.keys(BillList_unpaid).length; i++) {
          BillList_unpaid[i].stt = i + 1;
        }
        for (var i = 0; i < Object.keys(BillList_paid).length; i++) {
          BillList_paid[i].stt = i + 1;
        }
        handleRoomTableUnPaid(BillList_unpaid);
        handleRoomTablePaid(BillList_paid);
      }else if(BillList_paid!=null && BillList_unpaid == null){
        for (var i = 0; i < Object.keys(BillList_paid).length; i++) {
          BillList_paid[i].stt = i + 1;
        }
        handleRoomTablePaid(BillList_paid);
      }
      else if(BillList_paid==null && BillList_unpaid != null){
        for (var i = 0; i < Object.keys(BillList_unpaid).length; i++) {
          BillList_unpaid[i].stt = i + 1;
        }
        handleRoomTableUnPaid(BillList_unpaid);
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
  var roomsTablee = new Tabulator("#bill-table-paid", {
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
          field: "bill_type",
          hozAlign: "center",
          width: 60,
          sorter: "number",
          hozAlign: "center",
  
        },
        {
            title: "CCCD Khách hàng",
            field: "customerID",
            hozAlign: "center",
            width: 60,
            sorter: "number",
            hozAlign: "center",
    
          },
       
        {
            title: "Khách hàng",
            field: "customer_name",
            hozAlign: "center",
            width: 150,
            sorter: "number",
            hozAlign: "center",
    
          },
        
        {
          title: "Tổng",
          field: "bill_cost",
          hozAlign: "center",
          sorter: "number",
        },
        {
          title: "Thời hạn",
          field: "bill_date",
          hozAlign: "center",
          sorter: "number",
        },

        {
            title: "Tình trạng",
            field: "bill_status",
            width: 120,
            hozAlign: "center",
            sorter: "number",
            hozAlign: "center",
    
          },
  
        
      ],
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
    var roomsTable = new Tabulator("#bill-table-unpaid", {
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
            field: "bill_type",
            hozAlign: "center",
            width: 60,
            sorter: "number",
            hozAlign: "center",
    
          },
          {
              title: "CCCD Khách hàng",
              field: "customerID",
              hozAlign: "center",
              width: 60,
              sorter: "number",
              hozAlign: "center",
      
            },
         
          {
              title: "Khách hàng",
              field: "customer_name",
              hozAlign: "center",
              width: 150,
              sorter: "number",
              hozAlign: "center",
      
            },
          
          {
            title: "Tổng",
            field: "bill_cost",
            hozAlign: "center",
            sorter: "number",
          },
          {
            title: "Thời hạn",
            field: "bill_date",
            hozAlign: "center",
            sorter: "number",
          },
  
          {
              title: "Tình trạng",
              field: "bill_status",
              width: 120,
              hozAlign: "center",
              sorter: "number",
              hozAlign: "center",
      
            },
    
      ],
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
