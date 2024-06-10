package model

import (
	"ApartmentApp/db"
	"ApartmentApp/tlog"
	"errors"
)

type Bill struct {
	DefaultModel
	BillType     string `gorm:"not null; type: text" json:"bill_type"`
	BillID       string `json:"billID" gorm:" not null; primary_key"`
	BillMonth    string `gorm:"not null; type: text" json:"bill_month"`
	BillAmount   int    `gorm:"type: int" json:"bill_amount"`
	BillCost     int64  `gorm:"not null" json:"bill_cost"`
	CustomerID   string `json:"customerID" gorm:" not null;"`
	CustomerName string `json:"customer_name" gorm:" not null;"`
	Date         string `json:"bill_date" gorm:"not null; type:text"`
	Status       string `json:"bill_status" gorm:" not null;"`
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
func (b Bill) GetAllBillByType(FeeType string) ([]Bill, []Bill, error) {
	var returnListBillUnPaid []Bill
	var returnListBillPaid []Bill

	feeStatus := "unpaid"

	rows, err := db.GetDB().Table("bill").Where("status = ? and bill_type= ?", feeStatus, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var bill Bill
		db.GetDB().ScanRows(rows, &bill)
		returnListBillUnPaid = append(returnListBillUnPaid, bill)

	}
	feeStatuss := "paid"
	rowss, err := db.GetDB().Table("bill").Where("status = ? and bill_type= ?", feeStatuss, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rowss.Next() {
		var bill Bill
		db.GetDB().ScanRows(rowss, &bill)
		returnListBillPaid = append(returnListBillPaid, bill)

	}

	err = db.GetDB().Table("bill").Error
	if err != nil {
		return nil, nil, err
	}

	return returnListBillUnPaid, returnListBillPaid, nil
}

func (b Bill) UpdateBillPaid(billid string) (*Bill, error) {
	var err error
	var testBill Bill

	err = db.GetDB().Table("bill").Where("bill_id = ?", billid).Find(&testBill).Error
	if err != nil {
		return nil, err
	}
	testBill.Status = "paid"
	err = db.GetDB().Save(&testBill).Error
	if err != nil {
		return nil, err
	}

	return &testBill, err
}
