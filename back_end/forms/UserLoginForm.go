package forms

//LoginForm receive login data
type LoginForm struct {
	UserID   string `json:"userID" binding:"required"`
	Password string `json:"password" binding:"required"`
}
