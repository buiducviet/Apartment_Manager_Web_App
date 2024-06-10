package controller

import (
	"ApartmentApp/forms"
	"ApartmentApp/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

var donMod = new(model.Don)

type DonController struct{}

func (dCtrl DonController) CreateNewDon(c *gin.Context) {
	var dForm forms.DonForm

	if err := c.ShouldBindJSON(&dForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	newdon, err := donMod.CreateNewDon(dForm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new don"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message": "Create success",
		"new_don": newdon,
	})
}
func (dCtrl DonController) GetAllDonByRoomID(c *gin.Context) {
	ctzID := c.Query("id")
	listD, err := donMod.GetDonInforByRoomID(ctzID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list don of this citizen",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Get list don OK",
		"list_don": listD,
	})
}
func (dCtrl DonController) UpdateDon(c *gin.Context) {
	var dForm forms.DonForm

	if err := c.ShouldBindJSON(&dForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	updatedon, err := donMod.UpdateDon(dForm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update this don"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":    "Update success",
		"update_don": updatedon,
	})
}
func (dCtrl DonController) GetAllDon(c *gin.Context) {
	listD, err := donMod.GetAllDon()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list don of this citizen",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list all don OK",
		"list_don_all": listD,
	})
}
