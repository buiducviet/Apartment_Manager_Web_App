package model

import (
	"ApartmentApp/db"
)

// InitMigration create the database, base on the model
func InitMigration() {
	db := db.GetDB()
	// if db.HasTable(&User{}) {
	// 	db.DropTable(&User{})
	// }
	db.SingularTable(true)
	db.AutoMigrate(&User{}, &Citizen{}, &Room{}, &Vehicle{}, &Bill{}, &RoomFee{})
	db.AutoMigrate()
	// defer db.Close()
}
