package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"testing"
)

func TestGetFeeInfor(t *testing.T) {
	config.Init()
	db.Init()
	testFee := &RoomFee{

		FeeType:  "PPT",
		FeeDesc:  "Phí phương tiện",
		RoomID:   9,
		Status:   "unpaid",
		FeeMonth: "10-2024",
		Date:     "31-01-2024",
	}
	testFee.FeeID = testFee.FeeType + "-" + testFee.FeeMonth
	var area int
	var vehicle_fee int
	err := db.GetDB().Table("vehicle").
		Select("SUM(vehicle_fee)").
		Group("room_id").
		Where("room_id = ?", testFee.RoomID).Error

	if err != nil {
		t.Errorf("Can not create new Feeeeeeeee %+v", err)
	} else {
		db.GetDB().Table("vehicle").
			Select("SUM(vehicle_fee)").
			Group("room_id").
			Where("room_id = ?", testFee.RoomID).
			Row().
			Scan(&vehicle_fee)
	}
	if err := db.GetDB().Table("room").Select("area").Where("room_id = ?", testFee.RoomID).Error; err != nil {
		t.Errorf("Can not create new Feeeeeeeee %+v", err)
	} else {
		db.GetDB().Table("room").Select("area").Where("room_id = ?", testFee.RoomID).Row().Scan(&area)
	}

	t.Logf("Area: %d", area)
	if testFee.FeeType == "PDV" {
		testFee.FeeCost = int64(16500 * area)

	} else if testFee.FeeType == "PCC" {
		testFee.FeeCost = int64(7000 * area)
	} else if testFee.FeeType == "PPT" {
		testFee.FeeCost = int64(vehicle_fee)
	}

	if err := db.GetDB().Table("room_fee").Select("fee_id").Where("fee_id = ?", testFee.FeeID).Error; err == nil {
		if err := db.GetDB().Create(testFee).Error; err != nil {
			t.Errorf("Can not create new Fee %+v", err)
		}
	}

}
