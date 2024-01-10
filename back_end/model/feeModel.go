package model

import (
	"ApartmentApp/db"
	"ApartmentApp/tlog"
	"errors"
)

type RoomFee struct {
	DefaultModel
	FeeID    string `json:"feeID" gorm:" not null; unique_index; primary_key"`
	FeeType  string `gorm:"not null; type: text" json:"fee_type"`
	FeeDesc  string `gorm:"not null; type:text" json:"fee_desc"`
	FeeMonth string `gorm:"not null; type: text" json:"fee_month"`
	FeeCost  int64  `gorm:"not null" json:"fee_cost"`
	RoomID   int    `json:"roomID" gorm:" not null;"`
	Date     string `json:"fee_date" gorm:"not null; type:text"`
	Status   string `json:"fee_status" gorm:" not null;"`
}

func (f RoomFee) GetFeeInfor(roomID int) (*RoomFee, error) {
	fee := new(RoomFee)
	err := db.GetDB().Table("room_fee").Where("room_id = ? ", roomID).Find(&fee).Error
	if err != nil {
		return nil, errors.New("Can not find citizen with given type")
	}
	return fee, nil
}

func (f RoomFee) GetAllRoomFeeCC() ([]RoomFee, []RoomFee, error) {
	var returnListRoomFeeUnPaid []RoomFee
	var returnListRoomFeePaid []RoomFee

	feeStatus := "unpaid"
	FeeType := "PCC"
	rows, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatus, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rows, &room_fee)
		returnListRoomFeeUnPaid = append(returnListRoomFeeUnPaid, room_fee)

	}
	feeStatuss := "paid"
	rowss, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatuss, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rowss, &room_fee)
		returnListRoomFeePaid = append(returnListRoomFeePaid, room_fee)

	}

	err = db.GetDB().Table("room_fee").Error
	if err != nil {
		return nil, nil, err
	}

	return returnListRoomFeeUnPaid, returnListRoomFeePaid, nil
}
func (f RoomFee) GetAllRoomFeePT() ([]RoomFee, []RoomFee, error) {
	var returnListRoomFeeUnPaid []RoomFee
	var returnListRoomFeePaid []RoomFee

	feeStatus := "unpaid"
	FeeType := "PPT"
	rows, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatus, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rows, &room_fee)
		returnListRoomFeeUnPaid = append(returnListRoomFeeUnPaid, room_fee)

	}
	feeStatuss := "paid"
	rowss, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatuss, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rowss, &room_fee)
		returnListRoomFeePaid = append(returnListRoomFeePaid, room_fee)

	}

	err = db.GetDB().Table("room_fee").Error
	if err != nil {
		return nil, nil, err
	}

	return returnListRoomFeeUnPaid, returnListRoomFeePaid, nil
}
func (f RoomFee) GetAllRoomFeeDV() ([]RoomFee, []RoomFee, error) {
	var returnListRoomFeeUnPaid []RoomFee
	var returnListRoomFeePaid []RoomFee

	feeStatus := "unpaid"
	FeeType := "PDV"
	rows, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatus, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rows, &room_fee)
		returnListRoomFeeUnPaid = append(returnListRoomFeeUnPaid, room_fee)

	}
	feeStatuss := "paid"
	rowss, err := db.GetDB().Table("room_fee").Where("status = ? and fee_type= ?", feeStatuss, FeeType).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rowss, &room_fee)
		returnListRoomFeePaid = append(returnListRoomFeePaid, room_fee)

	}

	err = db.GetDB().Table("room_fee").Error
	if err != nil {
		return nil, nil, err
	}

	return returnListRoomFeeUnPaid, returnListRoomFeePaid, nil
}

/*func (f RoomFee) GetAllRoomFee() ([]RoomFee, error) {
	var returnListRoomFeeUnPaid []RoomFee
	temp := "unpaid"
	rows, err := db.GetDB().Table("room_fee").Where("status = ?", temp).Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, err
	}

	for rows.Next() {
		var room_fee RoomFee
		db.GetDB().ScanRows(rows, &room_fee)
		returnListRoomFeeUnPaid = append(returnListRoomFeeUnPaid, room_fee)

	}

	err = db.GetDB().Table("room_fee").Error
	if err != nil {
		return nil, err
	}

	return returnListRoomFeeUnPaid, nil
}*/
