package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"math/rand"
	"testing"
	"time"
)

func TestGetBillInfo(t *testing.T) {

	config.Init()
	db.Init()
	rows, err := db.GetDB().Table("room").Rows()
	if err != nil {
		t.Errorf("Can not create new Fee %+v", err)
	}
	for rows.Next() {

		// Tạo số ngẫu nhiên trong khoảng từ 1 đến 100

		var room Room
		db.GetDB().ScanRows(rows, &room)
		rand.Seed(time.Now().UnixNano())
		if room.OwnerID != "" {
			testBill := &Bill{
				BillType:   "internet",
				BillMonth:  "1/2024",
				BillCost:   180000,
				Date:       "31/1/2024",
				CustomerID: room.OwnerID,
				Status:     "unpaid",
			}
			var temp string
			db.GetDB().Table("citizen").Select("name").Where("citizen_id = ?", testBill.CustomerID).Row().Scan(&temp)
			testBill.CustomerName = temp
			testBill.BillID = testBill.CustomerID + "-" + testBill.Date + "-" + testBill.BillType

			if err := db.GetDB().Table("bill").Select("bill_id").Where("bill_id = ?", testBill.BillID).Error; err == nil {
				if err := db.GetDB().Create(testBill).Error; err != nil {
					t.Errorf("Can not create user %+v", err)
				}
			}

		}

	}

}
