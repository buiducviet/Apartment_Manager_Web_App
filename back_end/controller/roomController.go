package controller

import (
	"ApartmentApp/forms"
	"ApartmentApp/model"
	"ApartmentApp/tlog"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// RoomController ...
type RoomController struct{}

var roomMod = new(model.Room)
var vehicleMod = new(model.Vehicle)

// GetRoomInfo ...
func (rCtrl RoomController) GetRoomInfo(c *gin.Context) {
	accessDes, err := authModel.ExtractTokenMetadata(c.Request)

	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Canot extract metadata from Token",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get room info",
		})
		c.Abort()
		return
	}

	roomID, err := citizenMod.GetRoomID(accessDes.UserID)
	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Can not get room id from citizen id",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get room info",
		})
		c.Abort()
		return
	}

	room, err := roomMod.GetRoomInfo(roomID)
	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Can not get room info from room id",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get room info",
		})
		c.Abort()
		return
	}

	owner, err := citizenMod.GetCitizenInfo(room.OwnerID)
	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Cannot get room id from citizen id",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Cannot get room info",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get room info successfully",
		"room":    room,
		"owner":   owner,
	})
}
func (rCtrl RoomController) GetRoomInfoLV1(c *gin.Context) {
	roomID := c.Query("id")
	num, err := strconv.Atoi(roomID)

	room, err := roomMod.GetRoomInfo(num)
	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Can not get room info from room id",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get room info",
		})
		c.Abort()
		return
	}

	owner, err := citizenMod.GetCitizenInfo(room.OwnerID)
	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Cannot get room id from citizen id",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Cannot get room info",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get room info successfully",
		"room":    room,
		"owner":   owner,
	})
}
func (rCtrl RoomController) GetAllRoom(c *gin.Context) {
	listRoom, err := roomMod.GetAllRoom()
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list room",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list room",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Get list room OK",
		"list_rooms": listRoom,
	})
}
func (rCtrl RoomController) GetAllVehicleByRoomID(c *gin.Context) {
	accessDes, err := authModel.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get vehicles list",
		})
		c.Abort()
		return
	}
	returnCitizen, err := citizenMod.GetCitizenInfo(accessDes.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not find user",
		})
		c.Abort()
		return
	}

	returnVhList, err := vehicleMod.GetVehicleInfoByRoomID(returnCitizen.RoomID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get vehicles list",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list vehicles",
		"list_vehicle": returnVhList,
	})
}

func (rCtrl RoomController) GetAllVehicleByRoomIDLV1(c *gin.Context) {
	roomID := c.Query("id")
	num, err := strconv.Atoi(roomID)

	returnVhList, err := vehicleMod.GetVehicleInfoByRoomID(num)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get vehicles list",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list vehicles",
		"list_vehicle": returnVhList,
	})
}
func (rCtrl RoomController) UpdateRoomInfo(c *gin.Context) {
	var roomInfoForm forms.RoomForm

	// Giải mã dữ liệu JSON từ yêu cầu và kiểm tra lỗi
	if err := c.ShouldBindJSON(&roomInfoForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	// Tạo một đối tượng Citizen từ form
	updateRoom, err := roomMod.UpdateRoom(roomInfoForm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Room"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":     "Update success",
		"update_room": updateRoom,
	})
}
