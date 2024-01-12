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
fetch("http://25.20.166.7:8080/lv1/listwaterbill", roomRequestOptions)
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
  var roomsTablee = new Tabulator("#fee-table-paid", {
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
            title: "Số nước",
            field: "bill_amount",
            hozAlign: "center",
            sorter: "number",
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
}

function handleRoomTableUnPaid(roomFeeList_unpaid) {
    var roomsTable = new Tabulator("#fee-table-unpaid", {
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
              title: "Số nước",
              field: "bill_amount",
              hozAlign: "center",
              sorter: "number",
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
    
}
