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
fetch("http://25.20.166.7:8080/lv1/alldon", requestOptions)
.then((response) => response.json())
.then((result) => {
    if (result.message == "Get list all don OK") {
        var citizenList = result.list_don_all;
    for (var i = 0; i < Object.keys(citizenList).length; i++) {
      citizenList[i].stt = i + 1;
    }
    handleTable(citizenList);
  } else {
    alert("Có lỗi xảy ra");
  }
    
})
.catch((error) => {
    console.log("Không kết nối được tới máy chủ", error);
    alert("Không kết nối được tới máy chủ");
});
  function handleTable(tabledata) {
    let table = new Tabulator("#don-table", {
      height: "100%",
       // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
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
          width: 120,
          hozAlign: "center",
          headerSort: false,
        },
        
        { title: "Họ và tên", field: "name",hozAlign: "center", headerSort: false, width: 200 },
        { title: "Mã CCCD", field: "citizen_id", headerSort: false },
        {title:"Từ", field: "start_time", width: 120, headerSort: false },
        {
          title: "Đến",
          width: 120,
          field: "end_time",
          headerSort: false,
        },
        {
            title: "Trạng thái",
            field: "status",
            headerSort: false,
          },
        
        /*{ title: "Địa chỉ", field: "address", headerSort: false },*/
      ],
      rowClick: function (e, row){
        var popupMenu = document.getElementById("popup-menu");
        var overlay = document.createElement("div");
        overlay.className = "overlay";
        popupMenu.style.display = "block";
        document.body.appendChild(overlay);
        overlay.style.display = "block";
        overlay.addEventListener("click", function () {
          popupMenu.style.display = "none";
          overlay.style.display = "none";
        });


        var citizenID = row.getData().citizen_id
        var name = row.getData().name
        var status= row.getData().status
        var type = row.getData().don_type
        var from = row.getData().start_time
        var to = row.getData().end_time
        var content = row.getData().content

        $("#citizenid").text(citizenID)
        $("#type").text(type)
        $("#content").text(content)
        $("#from").text(from)
        $("#to").text(to)
        $("#status").text(status)
        $("#name").text(name)

        $(document).ready(function() {
            var status= row.getData().status
            if(status == "Chấp nhận" || status == "Từ chối"){
                var savebtn = document.getElementById("save-btn")
                savebtn.style.display="none"
                var denybtn = document.getElementById("deny-btn")
                denybtn.style.display="none"
            }
            $("#save-btn").click(function() {
                var citizenID = row.getData().citizen_id
                
                var type = row.getData().don_type
                var from = row.getData().start_time
                var to = row.getData().end_time
                var content = row.getData().content

                var id = citizenID+"-"+type+"-"+from
                var newfeedata = {
                    donID : id,
                    content: content,
                    start_time: from,
                    end_time:to,
                    citizen_id:citizenID,
                    status:"Chấp nhận",
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

                  fetch("http://25.20.166.7:8080/lv1/updatedon", updatefeeOptions)
                  .then((response)=> response.json())
                .then((result )=> {

                if(result.message == "Update success"){
                alert("Đã chấp nhận đăng ký")
                var popupMenu = document.getElementById("popup-menu");
         
                
                var overlay = document.getElementsByClassName("overlay");
              
                  popupMenu.style.display = "none";
                  overlay.style.display = "none";   
            }

        })
            })
            $("#deny-btn").click(function(){
                var citizenID = row.getData().citizen_id
                
                var type = row.getData().don_type
                var from = row.getData().start_time
                var to = row.getData().end_time
                var content = row.getData().content

                var id = citizenID+"-"+type+"-"+from
                var newfeedata = {
                    donID : id,
                    content: content,
                    start_time: from,
                    end_time:to,
                    citizen_id:citizenID,
                    status:"Từ chối",
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

                  fetch("http://25.20.166.7:8080/lv1/updatedon", updatefeeOptions)
                  .then((response)=> response.json())
                .then((result )=> {

                if(result.message == "Update success"){
                alert("Đã từ chối đăng ký")
                var popupMenu = document.getElementById("popup-menu");
         
                
                var overlay = document.getElementsByClassName("overlay");
              
                  popupMenu.style.display = "none";
                  overlay.style.display = "none";   
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
      
      table.setFilter(field, "like", value);
    }
    document
      .getElementById("download-citizen-xlsx")
      .addEventListener("click", function () {
        table.download("xlsx", "danhsachcudan.xlsx", {
          sheetName: "Danh sách",
        });
      });
  
}
