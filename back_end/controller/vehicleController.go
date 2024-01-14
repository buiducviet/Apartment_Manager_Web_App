package controller

import (
	"ApartmentApp/forms"
	"ApartmentApp/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type VehicleController struct{}

var (
	vehicleMode = new(model.Vehicle)
)

func (v VehicleController) CreateNewVehicle(c *gin.Context) {

	var vform forms.VehicleForm
	if err := c.ShouldBindJSON(&vform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return

	}

	newvehicle, err := vehicleMod.CreateNewVehicle(vform)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create vehicle"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":     "Create vehicle success",
		"new_vehicle": newvehicle,
	})

}
func (v VehicleController) UpdateVehicle(c *gin.Context) {
	var vform forms.VehicleForm
	if err := c.ShouldBindJSON(&vform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return

	}
	newvehicle, err := vehicleMod.UpdateVehicle(vform)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update vehicle"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":        "Update vehicle success",
		"update_vehicle": newvehicle,
	})
}
func (vCtrl VehicleController) GetAllVehicleByRoomID(c *gin.Context) {
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
