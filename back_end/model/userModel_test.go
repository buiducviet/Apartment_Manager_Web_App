package model

import (
	"testing"

	"ApartmentApp/config"
	"ApartmentApp/db"
	"ApartmentApp/forms"

	"golang.org/x/crypto/bcrypt"
)

func TestHashPassword(t *testing.T) {
	testPwd := "vietthptqt10a"
	val, err := hashPassword(testPwd)
	if err != nil {
		t.Error(err)
	}
	t.Log(val)
	err = bcrypt.CompareHashAndPassword([]byte(val), []byte(testPwd))
	if err != nil {
		t.Error(err)
	}
}

func TestRegister1(t *testing.T) {
	config.Init()
	db.Init()

	newUser := &User{
		Username: "Bùi Đức Việt",
		UserID:   "030203009779",
		Password: "vietthptqt10a123",
		Role:     0,
	}
	newUser.Register(forms.RegisterForm{
		Username: newUser.Username,
		UserID:   newUser.UserID,
		Password: newUser.Password,
		Role:     newUser.Role,
	})

	/*_, err := newUser.Register(forms.RegisterForm{
		Username: newUser.Username,
		UserID:   newUser.UserID,
		Password: newUser.Password,
		Role:     newUser.Role,
	})
	if err == nil {
		t.Error(err)
	}*/
}

func TestCheckPass(t *testing.T) {
	config.Init()
	db.Init()

	loginUser := &User{
		UserID:   "viet12345",
		Password: "viet33",
	}

	check, err := loginUser.CheckPass()
	if err != nil {
		t.Errorf("TestCheckPass err : %+v", err)
	}

	if check != true {
		t.Errorf("Wrong password : %+v", check)
	}
}
