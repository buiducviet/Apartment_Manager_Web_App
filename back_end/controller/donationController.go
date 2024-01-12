package controller

import (
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
