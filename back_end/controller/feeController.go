package controller

import (
	"ApartmentApp/forms"
	"ApartmentApp/model"
	"ApartmentApp/tlog"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type FeeController struct{}

var feeMod = new(model.RoomFee)

func (fCtrl FeeController) GetRoomFeePT(c *gin.Context) {
	roomID := c.Query("id")
	num, err := strconv.Atoi(roomID)
	feetype := "PPT"

	vehiclefee, err := feeMod.GetFeeInfor(num, feetype)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get fee infor",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":     "Get vehicle fee success",
		"vehicle_fee": vehiclefee,
	})
}
func (fCtrl FeeController) GetRoomFeeCC(c *gin.Context) {
	roomID := c.Query("id")
	num, err := strconv.Atoi(roomID)
	feetype := "PCC"

	vehiclefee, err := feeMod.GetFeeInfor(num, feetype)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get fee infor",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get vehicle fee success",
		"cc_fee":  vehiclefee,
	})
}
func (fCtrl FeeController) GetRoomFeeDV(c *gin.Context) {
	roomID := c.Query("id")
	num, err := strconv.Atoi(roomID)
	feetype := "PDV"

	vehiclefee, err := feeMod.GetFeeInfor(num, feetype)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get fee infor",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get vehicle fee success",
		"dv_fee":  vehiclefee,
	})
}
func (fCtrl FeeController) GetAllRoomFeeCC(c *gin.Context) {
	listRoomFeeUnPaid, listRoomFeePaid, err := feeMod.GetAllRoomFeeCC()
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list room fee",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list room fee",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":              "Get list room fee OK",
		"list_room_fee_unpaid": listRoomFeeUnPaid,
		"list_room_fee_paid":   listRoomFeePaid,
	})
}
func (fCtrl FeeController) GetAllRoomFeePT(c *gin.Context) {
	listRoomFeeUnPaid, listRoomFeePaid, err := feeMod.GetAllRoomFeePT()
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list room fee",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list room fee",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":              "Get list room fee OK",
		"list_room_fee_unpaid": listRoomFeeUnPaid,
		"list_room_fee_paid":   listRoomFeePaid,
	})
}
func (fCtrl FeeController) GetAllRoomFeeDV(c *gin.Context) {
	listRoomFeeUnPaid, listRoomFeePaid, err := feeMod.GetAllRoomFeeDV()
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list room fee",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list room fee",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":              "Get list room fee OK",
		"list_room_fee_unpaid": listRoomFeeUnPaid,
		"list_room_fee_paid":   listRoomFeePaid,
	})
}
func (fCtrl FeeController) CreatNewFee(c *gin.Context) {
	var fee_form forms.RoomFeeForm
	if err := c.ShouldBindJSON(&fee_form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return

	}

	var feetype = []map[string]string{
		{"code": "PPT", "description": "Phí phương tiện"},
		{"code": "PCC", "description": "Phí chung cư"},
		{"code": "PDV", "description": "Phí dịch vụ"},
	}

	for _, feetypee := range feetype {
		fee_form.FeeType = feetypee["code"]
		fee_form.FeeDesc = feetypee["description"]
		newfee, err := feeMod.CreatNewFee(fee_form)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create fee"})
			c.Abort()
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Create fee success",
			"new_fee": newfee,
		})
	}
}
func (fCtrl FeeController) UpdateVehicleFee(c *gin.Context) {
	var feeform forms.RoomFeeForm

	// Giải mã dữ liệu JSON từ yêu cầu và kiểm tra lỗi
	if err := c.ShouldBindJSON(&feeform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	updatevehiclefee, err := feeMod.UpdateFee(feeform)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Citizen"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":            "Update fee success",
		"update_vehicle_fee": updatevehiclefee,
	})

}
func (fCtrl FeeController) UpdatePaidFee(c *gin.Context) {

	feeid := c.Query("id")

	updatevehiclefee, err := feeMod.UpdateFeePaid(feeid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update fee"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":         "Update fee paid success",
		"update_paid_fee": updatevehiclefee,
	})

}
