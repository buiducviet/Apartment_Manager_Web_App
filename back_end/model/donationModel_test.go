package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"fmt"
	"testing"
)

func TestGetDonationInfo(t *testing.T) {
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
		if room.OwnerID != "" {
			testDonation := &Donation{
				DonationType:  "Quỹ khuyến học",
				RoomID:        room.RoomID,
				DonorName:     room.OwnerName,
				DonationMonth: "01-2024",
				DonationCost:  0,
			}
			var head string
			if testDonation.DonationType == "Quỹ tổ dân phố" {
				head = "qtdp"

			} else if testDonation.DonationType == "Quỹ vì người nghèo" {
				head = "qvnn"
			} else if testDonation.DonationType == "Quỹ khuyến học" {
				head = "qkh"
			}
			testDonation.DonationID = head + "-P" + fmt.Sprintf("%d", room.RoomID) + "-" + testDonation.DonationMonth
			if err := db.GetDB().Table("donation").Select("donation_id").Where("donation_id = ?", testDonation.DonationID).Error; err == nil {
				if err := db.GetDB().Create(testDonation).Error; err != nil {
					t.Errorf("Can not create user %+v", err)
				}
			}

		}

	}

}
