package controller

import (
	"ApartmentApp/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	citizenMod = new(model.Citizen)
)

// StudentController ...
type CitizenController struct{}

func (ctzCtrl CitizenController) GetCitizenInfo(c *gin.Context) {
	accessDes, err := authModel.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not find user",
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

	c.JSON(http.StatusOK, gin.H{
		"message":      "User found",
		"student_info": returnCitizen,
	})
}

func (ctzCtrl CitizenController) GetAllCitizen(c *gin.Context) {
	listStd, err := citizenMod.GetAllCitizen()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list citizens",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list citizen OK",
		"list_citizen": listStd,
	})
}
