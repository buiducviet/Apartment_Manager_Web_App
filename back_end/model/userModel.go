package model

import (
	"ApartmentApp/forms"
	"errors"
	"log"
	"strings"

	"ApartmentApp/db"

	"golang.org/x/crypto/bcrypt"
)

var (
	authModel = new(AuthModel)
)

// User user type
type User struct {
	DefaultModel
	UserID   string `gorm:"not null;primary_key" json:"userID"`
	Role     int    `gorm:"not null; type:int;" json:"role"`
	Username string `gorm:"not null" json:"username"`
	Password string `gorm:"type:text;not null" json:"password"`
}

func (u User) GetAllUserRole1() ([]User, error) {
	var listU []User

	rows, err := db.GetDB().Table("user").Where("role=?", 1).Rows()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var ctz User

		db.GetDB().ScanRows(rows, &ctz)
		if ctz.DeletedAt == nil {
			listU = append(listU, ctz)
		}

	}

	return listU, nil

}
func (u User) GetUserByID(id string) (*User, error) {
	ctz := new(User)
	err := db.GetDB().Where("user_id = ?", id).Find(&ctz).Error
	if err != nil {
		return nil, errors.New("Can not find user with given id")
	}
	return ctz, nil
}
func hashPassword(password string) (string, error) {
	var err error
	hashedPwd := []byte(password)

	hashedPwd, err = bcrypt.GenerateFromPassword(hashedPwd, bcrypt.DefaultCost)
	if err != nil {
		log.Printf("hashPassword error : %+v", err)
		return "", err
	}

	return string(hashedPwd), nil
}

// Login check if user login with correct information
func (u User) Login(form forms.LoginForm) (user User, token Token, err error) {
	err = db.GetDB().Where(&User{
		UserID: form.UserID,
	}).Find(&user).Error

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(form.Password))

	if err != nil {
		return user, token, errors.New("Invalid Password")
	}

	//Generate JWT token
	tokenDetails, err := authModel.CreateToken(user.UserID, uint(user.Role))
	if err != nil {
		return user, token, errors.New("Can not create token")
	}

	//If save to redis success return token to the user
	saveErr := authModel.CreateAuth(user.UserID, tokenDetails)
	if saveErr == nil {
		token.AccessToken = tokenDetails.AccessToken
		token.RefreshToken = tokenDetails.RefreshToken
	}

	return user, token, nil
}

// Register receive data and create new user in db
func (u *User) Register(form forms.RegisterForm) (*User, error) {
	var err error
	db := db.GetDB()
	// defer db.Close()

	//check space in form
	if checkInputFormat(form.Username) || strings.Contains(form.Password, " ") {
		return nil, errors.New("Invalid format")
	}

	newUser := &User{
		Username: form.Username,
		Password: form.Password,
		UserID:   form.UserID,
		Role:     form.Role,
	}

	if db.Table("user").Or("user_id = ?", form.UserID).RecordNotFound() {
		return nil, errors.New("User existed")
	}

	newUser.Password, err = hashPassword(newUser.Password)
	if err != nil {
		return nil, err
	}

	if !db.NewRecord(newUser) {
		return nil, errors.New("User existed")
	}

	db.Create(newUser)

	return newUser, err
}

func checkInputFormat(inputString string) bool {
	checkList := []string{"*", "#", "/", "\\"}
	for _, check := range checkList {
		if strings.Contains(inputString, check) {
			return true
		}
	}
	return false
}
func (u *User) CheckPaymentPassword(inputPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(inputPassword))
	return err == nil
}

// CheckPass check if input password is in the db
func (u User) CheckPass() (bool, error) {
	db := db.GetDB()
	// defer db.Close()

	checkUser := new(User)

	err := db.Where(&User{
		UserID: u.UserID,
	}).Find(&checkUser).Error

	if err != nil {
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(checkUser.Password), []byte(u.Password))
	if err != nil {
		return false, err
	}

	return true, err
}

// GetByUsr query user by username
func (u *User) GetByUsr(userid string) error {
	db := db.GetDB()
	// defer db.Close()

	var err error

	err = db.Where(&User{
		UserID: userid,
	}).Find(&u).Error

	if err != nil {
		return err
	}

	return err
}
func (u *User) UpdateUserInfor(uform forms.RegisterForm) (*User, error) {

	var err error
	var user User
	db := db.GetDB()

	err = db.Table("user").Where("user_id = ?", uform.UserID).Find(&user).Error
	if err != nil {
		return nil, err
	}
	user.UserID = uform.UserID
	user.Username = uform.Username
	user.Role = uform.Role
	user.Password, err = hashPassword(uform.Password)
	if err != nil {
		return nil, err
	}

	err = db.Save(&user).Error
	if err != nil {
		return nil, err
	}

	return &user, err
}
