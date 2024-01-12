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
fetch("http://25.20.166.7:8080/lv1/listfeedv", roomRequestOptions)
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
    })
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
    })
    
}