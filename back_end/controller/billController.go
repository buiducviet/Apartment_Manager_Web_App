package controller

import (
	"ApartmentApp/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BillController struct{}

var billMod = new((model.Bill))

func (billCtrl BillController) GetElectricBillInfo(c *gin.Context) {
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

	bill_electric, err := billMod.GetBillInforByType("electric", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":       "Get bill information",
		"bill_electric": bill_electric,
	})
}
func (billCtrl BillController) GetWaterBillInfo(c *gin.Context) {
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

	bill_water, err := billMod.GetBillInforByType("water", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Get bill information",
		"bill_water": bill_water,
	})
}
func (billCtrl BillController) GetInternetBillInfo(c *gin.Context) {
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

	bill_internet, err := billMod.GetBillInforByType("internet", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":       "Get bill information",
		"bill_internet": bill_internet,
	})
}
