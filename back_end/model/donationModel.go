package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"
	"ApartmentApp/tlog"
	"errors"
)

type Donation struct {
	DefaultModel
	DonationID    string `json:"donationID" gorm:" not null; unique_index; primary_key"`
	DonationType  string `gorm:"not null; type: text" json:"donation_type"`
	DonationDesc  string `gorm:"type:text" json:"donation_desc"`
	DonationMonth string `gorm:"not null; type: text" json:"donation_month"`
	DonationCost  int64  `json:"donation_cost"`
	RoomID        int    `json:"roomID" gorm:" not null;"`
	DonorName     string `gorm:"type:text" json:"donor_name"`
}

func (d Donation) GetAllDonation() ([]Donation, error) {
	var returnListDonation []Donation

	rows, err := db.GetDB().Table("donation").Rows()
	if err != nil {
		tlog.Error("Can not get all donation from db", err)
		return nil, err
	}

	for rows.Next() {
		var donation Donation
		db.GetDB().ScanRows(rows, &donation)
		returnListDonation = append(returnListDonation, donation)

	}

	err = db.GetDB().Table("donation").Error
	if err != nil {
		return nil, err
	}
	err = db.GetDB().Table("donation").Error
	if err != nil {
		return nil, err
	}

	return returnListDonation, nil
}
func (d Donation) GetDonationInforByType(DonationType string, CustomerID string) (*Donation, error) {
	donation := new(Donation)
	err := db.GetDB().Where("donation_type = ? AND customer_id = ?", DonationType, CustomerID).Find(&donation).Error
	if err != nil {
		return nil, errors.New("Can not find citizen with given type")
	}
	return donation, nil
}
func (d Donation) UpdateDonationamount(form forms.DonationForm) (*Donation, error) {
	var err error
	var testDonation Donation

	err = db.GetDB().Table("donation").Where("donation_id = ?", form.DonationID).Find(&testDonation).Error
	if err != nil {
		return nil, err
	}
	testDonation.DonationCost = form.Cost
	err = db.GetDB().Save(&testDonation).Error
	if err != nil {
		return nil, err
	}

	return &testDonation, err
}
