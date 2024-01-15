package controller

import (
	"net/http"

	"ApartmentApp/forms"
	"ApartmentApp/model"
	"ApartmentApp/tlog"

	"github.com/gin-gonic/gin"
)

var userModel = new(model.User)
var authenModel = new(model.AuthModel)

// UserController controller for user
type UserController struct{}

// GetUserByUsername return an user by username
func (u UserController) GetUserByUsername(c *gin.Context) {
	if c.Param("usr") != "" {
		user := new(model.User)

		err := user.GetByUsr(c.Param("usr"))

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "Error to retrive user",
				"error":   err,
			})

			c.Abort()
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "User founded",
			"user":    user,
		})
		return
	}

	c.JSON(http.StatusBadRequest, gin.H{
		"message": "bad request",
	})
}
func (u UserController) GetUserByUserID(c *gin.Context) {
	accessDes, err := authModel.ExtractTokenMetadata(c.Request)

	if err != nil {
		tlog.Info(tlog.Itf{
			"message": "Canot extract metadata from Token",
			"error":   err,
		})
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get userinfo",
		})
		c.Abort()
		return
	}
	user, err := userModel.GetUserByID(accessDes.UserID)
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

	c.JSON(http.StatusOK, gin.H{
		"message": "get user infor ok",
		"user":    user,
	})
}

// Login validate user and return token
func (u UserController) Login(c *gin.Context) {
	var loginForm forms.LoginForm

	if c.ShouldBindJSON(&loginForm) != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{
			"message": "Invalid form",
		})
		c.Abort()
		return
	}

	user, token, err := userModel.Login(loginForm)
	if err != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{
			"message": "Invalid login details",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "login success",
			"role":    user.Role,
			"userID":  user.UserID,
			"token":   token,
		})
	}
}

// Logout remove user accessToken
func (u UserController) Logout(c *gin.Context) {
	au, err := authenModel.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "User not logged in",
		})
		return
	}

	deleted, delErr := authenModel.DeleteAuth(au.AccessUUID)
	if delErr != nil || deleted == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Invalid request",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Logout successfully",
	})
}

// Register create new user
func (u UserController) Register(c *gin.Context) {
	var registerForm forms.RegisterForm
	if c.ShouldBindJSON(&registerForm) != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{
			"message": "Invalid form",
		})
		c.Abort()
		return
	}

	user, err := userModel.Register(registerForm)
	if err != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{
			"message": err.Error(),
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Register successfully",
		"user":    user,
	})

}

// Trong file controller/user_controller.go

// CheckPaymentPassword kiểm tra mật khẩu thanh toán
func (u UserController) CheckPaymentPassword(c *gin.Context) {
	password := c.Query("password")
	// Lấy thông tin xác thực từ token
	authDes, err := authenModel.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "User not logged in",
		})
		return
	}

	// Lấy người dùng từ ID
	user, err := userModel.GetUserByID(authDes.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Error retrieving user",
			"error":   err,
		})
		return
	}
	if !user.CheckPaymentPassword(password) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Incorrect payment password",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Payment password is correct",
	})
}
func (u UserController) UpdateUserInfor(c *gin.Context) {

	var userform forms.RegisterForm
	if err := c.ShouldBindJSON(&userform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	updateUser, err := userModel.UpdateUserInfor(userform)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update User"})
		c.Abort()
		return
	}

	// Trả về thông tin của User đã tạo
	c.JSON(http.StatusOK, gin.H{
		"message":     "Update success",
		"update_user": updateUser,
	})
}
func (u UserController) GetAllUserRole1(c *gin.Context) {
	listU, err := userModel.GetAllUserRole1()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Can not get list admins",
		})
		c.Abort()
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Get list admin OK",
		"list_admin": listU,
	})
}
