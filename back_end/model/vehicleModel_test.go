package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"testing"
)

func TestGetVehicleInfo(t *testing.T) {
	config.Init()
	db.Init()
	testVhc := &Vehicle{
		VehicleName: "Xe máy",
		VehicleID:   "34-N7-1422",
		VehicleType: "Xe gắn máy",
		OwnerID:     "030203009774",
	}
	if testVhc.VehicleType == "Xe gắn máy" {
		testVhc.VehicleFee = 70000
	} else if testVhc.VehicleType == "Xe ô tô" {
		testVhc.VehicleFee = 1200000
	} else if testVhc.VehicleType == "Xe đạp" {
		testVhc.VehicleFee = 0
	}

	if testVhc.OwnerID != "" {

		var ownername string
		var roomid int
		db.GetDB().Table("citizen").Select("name").Where("citizen_id = ?", testVhc.OwnerID).Row().Scan(&ownername)
		db.GetDB().Table("citizen").Select("room_id").Where("citizen_id = ?", testVhc.OwnerID).Row().Scan(&roomid)
		testVhc.OwnerName = ownername
		testVhc.RoomID = roomid
	}
	if err := db.GetDB().Table("vehicle").Select("vehicle_id").Where("vehicle_id = ?", testVhc.VehicleID).Error; err == nil {
		if err := db.GetDB().Create(testVhc).Error; err != nil {
			t.Errorf("Can not create vehicle %+v", err)
		}
	}
	checkVehicle, err := testVhc.GetVehicleInfo(testVhc.VehicleID)
	if (err != nil) || (checkVehicle.VehicleID != "030203009774") {
		t.Errorf("Can not find vehicle err : %+v\nvehicle : %+v", err, checkVehicle)
	}
}
