package model

import (
	"ApartmentApp/db"
	"errors"
)

type Bill struct {
	DefaultModel
	BillType   string `gorm:"not null; type: text" json:"bill_type"`
	BillID     string `json:"billID" gorm:" not null; primary_key"`
	BillMonth  string `gorm:"not null; type: text" json:"bill_month"`
	BillAmount int    `gorm:"type: int" json:"bill_amount"`
	BillCost   int64  `gorm:"not null" json:"bill_cost"`
	CustomerID string `json:"customerID" gorm:" not null;"`
	Date       string `json:"bill_date" gorm:"not null; type:text"`
	Status     string `json:"bill_status" gorm:" not null;"`
}

func (b Bill) GetBillInfor(BillID string) (*Bill, error) {
	bill := new(Bill)
	err := db.GetDB().Where("bill_id = ? ", BillID).Find(&bill).Error
	if err != nil {
		return nil, errors.New("Can not find citizen with given type")
	}
	return bill, nil
}

func (b Bill) GetBillInforByType(BillType string, CustomerID string) (*Bill, error) {
	bill := new(Bill)
	err := db.GetDB().Where("bill_type = ? AND customer_id = ?", BillType, CustomerID).Find(&bill).Error
	if err != nil {
		return nil, errors.New("Can not find citizen with given type")
	}
	return bill, nil
}
