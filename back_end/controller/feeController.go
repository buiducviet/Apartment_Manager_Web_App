package controller

import (
	"ApartmentApp/model"
	"ApartmentApp/tlog"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FeeController struct{}

var feeMod = new(model.RoomFee)

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

/*func (fCtrl FeeController) GetAllRoomFee(c *gin.Context) {
	listRoomFeeUnPaid, err := feeMod.GetAllRoomFee()
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

	})
}
*/
