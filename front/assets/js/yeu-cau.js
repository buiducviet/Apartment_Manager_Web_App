var token = sessionStorage.getItem("token");
var myHeaders = new Headers();
//myHeaders.append("Content-Type", "text/plain", bearer);
var requestOptions = {
  method: "GET",
  credentials: "omit",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "text/plain",
  },
  redirect: "follow",
};

fetch("http://25.20.166.7:8080/lv0/usrinfo", requestOptions)
  .then((response) => response.json())
  .then((result) => {

    var citizen_id = result.citizen_info.roomID;
    fetch("http://25.20.166.7:8080/lv0/alldon?id="+citizen_id, requestOptions)
    .then((response)=> response.json())
    .then((result )=> {

        if(result.message == "Get list don OK"){
            tabledata = result.list_don;
        for (var i = 0; i < Object.keys(tabledata).length; i++) {
        tabledata[i].stt = i + 1;
        }
        handleTable();
        }

    })
  })
  .catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
  });
  function handleTable() {
    let table = new Tabulator("#don-table", {
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
        {
          title: "Loại",
          field: "don_type",
          width: 80,
          hozAlign: "center",
          headerSort: false,
        },
        { title: "Họ và tên", field: "name",hozAlign: "center", headerSort: false, width: 200 },
        { title: "Mã CCCD", field: "citizen_id", headerSort: false },
        {title:"Từ", field: "start_time", headerSort: false },
        {
          title: "Đến",
          field: "end_time",
          headerSort: false,
        },
        {
            title: "Lí do",
            field: "content",
            headerSort: false,
          },
        {
            title: "Trạng thái",
            field: "status",
            headerSort: false,
          },
        /*{ title: "Địa chỉ", field: "address", headerSort: false },*/
      ],
    });
}
$(document).ready(function() {

   /* function checkInput() {
        var citizenID = $("#add-citizenID-input").val();
        var status = $("input[name='status']:checked").val();
        var from = $("#add-fromtime-input").val()
        var to =  $("#add-endtime-input").val()
        var content = $("#add-content-input").val()

        if (citizenID != "" && status !="") {
          $("#save-btn").removeClass("disabled");
        } else {
          $("#save-btn-update").addClass("disabled");
        }
      }
        setInterval(checkInput, 300);*/


    $("#makedon").click(function(){
    var popupMenu = document.getElementById("popup-menu");
         
      popupMenu.style.display = "block";
      var overlay = document.createElement("div");
      overlay.className = "overlay";
    
       overlay.style.display = "block";
       document.body.appendChild(overlay);
       overlay.addEventListener("click", function () {
        popupMenu.style.display = "none";
        overlay.style.display = "none";
      });
    })
    $("#save-btn").click(function(){
        function checkInput() {
            var citizenID = $("#add-citizenID-input").val();
            var type = $("input[name='type']:checked").val();
            var from = $("#add-fromtime-input").val()
            var to =  $("#add-endtime-input").val()
            var content = $("#add-content-input").val()
    
            if (citizenID != "" && type !="") {
              $("#save-btn").removeClass("disabled");
            } else {
              $("#save-btn-update").addClass("disabled");
            }
          }
          var citizenID = $("#add-citizenID-input").val();
          var type = $("input[name='type']:checked").val();
          var from = $("#add-fromtime-input").val()
          var to =  $("#add-endtime-input").val()
          var content = $("#add-content-input").val()
          var id = citizenID+"-"+type+"-"+from
  
          var newfeedata = {
            donID : id,
            content: content,
            start_time: from,
            end_time:to,
            citizen_id:citizenID,
            status:"Đang xác thực",
            don_type: type,
          };
          var updatefeeOptions = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(newfeedata),
            redirect: "follow",
          };
            setInterval(checkInput, 300);
            fetch("http://25.20.166.7:8080/lv0/newdon", updatefeeOptions)
            .then((response)=> response.json())
            .then((result )=> {

            if(result.message == "Create success"){
                alert("Tạo đơn thành công")
                var popupMenu = document.getElementById("popup-menu");
         
                
                var overlay = document.getElementsByClassName("overlay");
              
                  popupMenu.style.display = "none";
                  overlay.style.display = "none";
                
            }

        })
            
        
        })

})
