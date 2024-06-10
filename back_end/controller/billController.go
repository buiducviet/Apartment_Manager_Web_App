package controller

import (
	"ApartmentApp/model"
	"ApartmentApp/tlog"
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
func (billCtrl BillController) GetAllBillWater(c *gin.Context) {
	listBillUnPaid, listBillPaid, err := billMod.GetAllBillByType("water")
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list bill",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list bill",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":          "Get list bill OK",
		"list_bill_unpaid": listBillUnPaid,
		"list_bill_paid":   listBillPaid,
	})
}
func (billCtrl BillController) GetAllBillInternet(c *gin.Context) {
	listBillUnPaid, listBillPaid, err := billMod.GetAllBillByType("internet")
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list bill",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list bill",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":          "Get list bill OK",
		"list_bill_unpaid": listBillUnPaid,
		"list_bill_paid":   listBillPaid,
	})
}
func (billCtrl BillController) GetAllBillElectric(c *gin.Context) {
	listBillUnPaid, listBillPaid, err := billMod.GetAllBillByType("electric")
	if err != nil {
		tlog.Info(tlog.Itf{
			"msg": "Can not get list bill",
			"err": err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list bill",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":          "Get list bill OK",
		"list_bill_unpaid": listBillUnPaid,
		"list_bill_paid":   listBillPaid,
	})
}
func (bCtrl BillController) UpdatePaidBill(c *gin.Context) {

	billid := c.Query("id")

	updatevehiclebill, err := billMod.UpdateBillPaid(billid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update bill"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":          "Update bill paid success",
		"update_paid_bill": updatevehiclebill,
	})

}
