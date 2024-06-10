package controller

import (
	"ApartmentApp/forms"
	"ApartmentApp/model"
	"ApartmentApp/tlog"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DonationController struct{}

var donationMod = new(model.Donation)

func (dCtrl DonationController) GetAllDonation(c *gin.Context) {
	listDonation, err := donationMod.GetAllDonation()
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list donation",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list donation",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":        "Get list donation OK",
		"list_donations": listDonation,
	})
}
func (dCtrl DonationController) UpdateDonation(c *gin.Context) {
	var form forms.DonationForm
	if err := c.ShouldBindJSON(&form); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	updatedonation, err := donationMod.UpdateDonationamount(form)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		c.Abort()
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":         "Update success",
		"update_donation": updatedonation,
	})

}
func (dCtrl DonationController) GetqkhInfo(c *gin.Context) {
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

	qkh, err := donationMod.GetDonationInforByType("Quỹ khuyến học", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get donation information",
		"qkh":     qkh,
	})
}

func (dCtrl DonationController) GetqvnnInfo(c *gin.Context) {
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

	qkh, err := donationMod.GetDonationInforByType("Quỹ vì người nghèo", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get donation information",
		"qvnn":    qkh,
	})
}

func (dCtrl DonationController) GetqtdpInfo(c *gin.Context) {
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

	qkh, err := donationMod.GetDonationInforByType("Quỹ tổ dân phố", returnCitizen.CitizenID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get bill information",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Get donation information",
		"qtdp":    qkh,
	})
}
