package controller

import (
	"ApartmentApp/forms"
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
		"citizen_info": returnCitizen,
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
func (ctzCtrl CitizenController) GetAllCitizenByFamilyID(c *gin.Context) {
	accessDes, err := authModel.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get famili members list",
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

	returnFrList, err := citizenMod.GetAllCitizenByFamilyID(returnCitizen.FamilyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get family members list",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list family members",
		"list_citizen": returnFrList,
	})
}
func (ctzCtrl CitizenController) GetAllCitizenByFamilyIDRoom(c *gin.Context) {
	familyID := c.Query("id")
	if familyID == "" {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "No room id found",
		})
		c.Abort()
		return
	}

	returnFrList, err := citizenMod.GetAllCitizenByFamilyID(familyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get family members list",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Get list family members",
		"list_citizen": returnFrList,
	})
}
func (ctzCtrl CitizenController) CreateCitizenHandler(c *gin.Context) {
	var ctzInfoForm forms.CitizenInfoForm

	// Giải mã dữ liệu JSON từ yêu cầu và kiểm tra lỗi
	if err := c.ShouldBindJSON(&ctzInfoForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	// Tạo một đối tượng Citizen từ form
	newCitizen, err := citizenMod.NewCitizenInfor(ctzInfoForm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create Citizen"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":     "Create success",
		"new_citizen": newCitizen,
	})
}
func (ctzCtrl CitizenController) UpdateCtzInfo(c *gin.Context) {
	var ctzInfoForm forms.CitizenInfoForm

	// Giải mã dữ liệu JSON từ yêu cầu và kiểm tra lỗi
	if err := c.ShouldBindJSON(&ctzInfoForm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	// Tạo một đối tượng Citizen từ form
	updateCitizen, err := citizenMod.ChangeCitizenInfo(ctzInfoForm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update Citizen"})
		c.Abort()
		return
	}

	// Trả về thông tin của Citizen đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":        "Update success",
		"update_citizen": updateCitizen,
	})
}
func (ctzCtrl CitizenController) DeleteCitizen(c *gin.Context) {
	ctzID := c.Query("id")

	returnCitizen, err := citizenMod.DeleteCitizen(ctzID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not find user",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":         "Delete Success",
		"citizen_deleted": returnCitizen,
	})

}
