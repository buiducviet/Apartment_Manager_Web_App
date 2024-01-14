// Trong file forms/check_password_form.go

package forms

// CheckPasswordForm là một struct đại diện cho dữ liệu kiểm tra mật khẩu
type CheckPasswordForm struct {
	PaymentPassword string `json:"password" binding:"required"`
}
