package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"testing"
)

func TestGetBillInfo(t *testing.T) {
	config.Init()
	db.Init()
	testBill := &Bill{
		BillID:     "wtr1234",
		BillType:   "water",
		BillMonth:  "1/2024",
		BillCost:   2000000,
		BillAmount: 20,
		Date:       "15/2/2024",
		CustomerID: "030203009774",
	}
	if err := db.GetDB().Table("bill").Select("bill_id").Where("bill_id = ?", testBill.BillID).Error; err == nil {
		if err := db.GetDB().Create(testBill).Error; err != nil {
			t.Errorf("Can not create user %+v", err)
		}
	}
	checkCitizen, err := testBill.GetBillInfor(testBill.BillID)
	if (err != nil) || (checkCitizen.BillID != "wtr1234") {
		t.Errorf("Can not find user err : %+v\nuser : %+v", err, checkCitizen)
	}
}
