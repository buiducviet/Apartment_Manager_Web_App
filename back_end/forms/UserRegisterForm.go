package forms

//RegisterForm contains register information
type RegisterForm struct {
	Username string `json:"username" binding:"required"`
	UserID   string `json:"userID" binding:"required"`
	Password string `json:"password" binding:"required"`
}
