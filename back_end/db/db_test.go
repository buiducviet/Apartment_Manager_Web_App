package db

import (
	"testing"

	"ApartmentApp/config"

	//Import the driver for mysql
	_ "github.com/go-sql-driver/mysql"
)

func TestGetDB(t *testing.T) {
	config.Init()
	Init()
	db = GetDB()
	err := db.DB().Ping()
	if err != nil {
		t.Errorf("Something went wrong with the database : %+v", err)
	} else {
		t.Log("Connected to the database successfully!")
	}

	db.Close()
}
