package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"
	"ApartmentApp/tlog"
	"errors"
)

type Don struct {
	DefaultModel
	DonID       string `json:"donID" gorm:"primary_key; not null"`
	DonType     string `json:"don_type"`
	Content     string `json:"content" gorm:"type:text; not null"`
	StartTime   string `json:"start_time" gorm:"not null"`
	EndTime     string `json:"end_time" gorm:"_"`
	CitizenID   string `json:"citizen_id"`
	CitizenName string `json:"name"`
	Status      string `json:"status"`
	RoomID      int    `json:"roomID"`
}

func (d Don) CreateNewDon(f forms.DonForm) (*Don, error) {
	var err error
	db := db.GetDB()

	don := &Don{
		DonID:     f.DonID,
		Content:   f.Content,
		StartTime: f.StartTime,
		EndTime:   f.EndTime,
		CitizenID: f.CitizenID,
		Status:    f.Status,
		DonType:   f.DonType,
	}
	var ctz Citizen
	if err := db.Table("citizen").Where("citizen_id = ?", f.CitizenID).First(&ctz).Error; err != nil {
		return nil, err
	}
	don.CitizenName = ctz.Name
	don.RoomID = ctz.RoomID
	if db.Table("don").Where("don_id = ?", f.DonID).RecordNotFound() {
		return nil, errors.New("don existed")
	}

	db.Table("don").Create(don)

	return don, err
}
func (d Don) GetDonInforByRoomID(citizenID string) ([]Don, error) {
	var listdon []Don
	rows, err := db.GetDB().Table("don").Where("room_id =?", citizenID).Rows()

	if err != nil {
		tlog.Error("Can not get list don from db", err)
		return nil, err
	}
	for rows.Next() {
		var vhc Don
		db.GetDB().ScanRows(rows, &vhc)
		// fmt.Printf("%+v", std)
		listdon = append(listdon, vhc)
	}

	return listdon, err

}
func (d Don) GetDonInforByCitizenID(citizenID string) ([]Don, error) {
	var listdon []Don
	rows, err := db.GetDB().Table("don").Where("citizen_id =?", citizenID).Rows()

	if err != nil {
		tlog.Error("Can not get list don from db", err)
		return nil, err
	}
	for rows.Next() {
		var vhc Don
		db.GetDB().ScanRows(rows, &vhc)
		// fmt.Printf("%+v", std)
		listdon = append(listdon, vhc)
	}

	return listdon, err

}
func (d Don) UpdateDon(f forms.DonForm) (*Don, error) {
	var err error
	db := db.GetDB()
	var don Don

	don.DonID = f.DonID
	don.Content = f.Content
	don.StartTime = f.StartTime
	don.EndTime = f.EndTime
	don.CitizenID = f.CitizenID
	don.Status = f.Status
	don.DonType = f.DonType

	var ctz Citizen
	if err := db.Table("citizen").Where("citizen_id = ?", f.CitizenID).First(&ctz).Error; err != nil {
		return nil, err
	}
	don.CitizenName = ctz.Name
	don.RoomID = ctz.RoomID
	if db.Table("don").Where("don_id = ?", f.DonID).RecordNotFound() {
		return nil, errors.New("don existed")
	}

	err = db.Save(&don).Error
	if err != nil {
		return nil, err
	}
	return &don, err
}
func (d Don) GetAllDon() ([]Don, error) {
	var listdon []Don
	rows, err := db.GetDB().Table("don").Rows()

	if err != nil {
		tlog.Error("Can not get list don from db", err)
		return nil, err
	}
	for rows.Next() {
		var vhc Don
		db.GetDB().ScanRows(rows, &vhc)
		// fmt.Printf("%+v", std)
		listdon = append(listdon, vhc)
	}

	return listdon, err

}
