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
	db.AutoMigrate(&Room{}, &User{}, &Citizen{}, &Vehicle{}, &Bill{}, &RoomFee{}, &Notification{}, &Request{}, &Donation{})
	db.Model(&Citizen{}).AddForeignKey("room_id", "room(room_id)", "RESTRICT", "RESTRICT")
	db.Model(&Vehicle{}).AddForeignKey("owner_id", "citizen(citizen_id)", "RESTRICT", "RESTRICT")
	db.Model(&Vehicle{}).AddForeignKey("room_id", "room(room_id)", "RESTRICT", "RESTRICT")
	db.Model(&Donation{}).AddForeignKey("room_id", "room(room_id)", "RESTRICT", "RESTRICT")
	db.Model(&Bill{}).AddForeignKey("customer_id", "citizen(citizen_id)", "RESTRICT", "RESTRICT")
	db.Model(&RoomFee{}).AddForeignKey("room_id", "room(room_id)", "RESTRICT", "RESTRICT")
	db.Model(&Notification{}).AddForeignKey("user_id", "user(user_id)", "RESTRICT", "RESTRICT")
	db.Model(&Request{}).AddForeignKey("user_id", "user(user_id)", "RESTRICT", "RESTRICT")

	db.AutoMigrate()
	// defer db.Close()
}
