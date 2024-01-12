package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"fmt"
	"testing"
)

func TestGetFeeInforr(t *testing.T) {
	config.Init()
	db.Init()
	rows, err := db.GetDB().Table("room").Rows()
	if err != nil {
		t.Errorf("Can not create new Fee %+v", err)
	}
	for rows.Next() {
		var room Room
		db.GetDB().ScanRows(rows, &room)
		testFee := &RoomFee{

			FeeType:  "PDV",
			FeeDesc:  "Phí dịch vụ",
			RoomID:   room.RoomID,
			Status:   "unpaid",
			FeeMonth: "01-2024",
			Date:     "31-01-2024",
		}
		testFee.FeeID = testFee.FeeType + "-" + testFee.FeeMonth + "-P" + fmt.Sprintf("%d", room.RoomID)
		var area int
		var vehicle_fee int
		t.Logf("%d", 1)
		errr := db.GetDB().Table("vehicle").
			Select("SUM(vehicle_fee)").
			Group("room_id").
			Where("room_id = ?", testFee.RoomID).Error

		if errr != nil {
			t.Errorf("Can not create new Feeeeeeeee %+v", errr)
		} else {
			db.GetDB().Table("vehicle").
				Select("SUM(vehicle_fee)").
				Group("room_id").
				Where("room_id = ?", testFee.RoomID).
				Row().
				Scan(&vehicle_fee)
		}
		area = room.Area
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

}
