package model

import (
	"ApartmentApp/db"
	"errors"
)

type Vehicle struct {
	DefaultModel
	VehicleName string `gorm:"not null;unique" json:"vehicle_name"`
	VehicleType string `gorm:"type:text; not null" json:"vehicle_type"`
	VehicleID   string `gorm:"not null;unique" json:"vehicleID"`
	RoomID      int    `json:"roomID" gorm:"type:int; not null"`
	OwnerID     string `gorm:"type:text; not null" json:"owner_id"`
	OwnerName   string `gorm:"type:text; not null" json:"owner_name"`
	VehicleFee  int    `gorm:"type:int; not null" json:"vehicle_fee"`
}

func (v Vehicle) GetVehicleInfo(VehicleID string) (*Vehicle, error) {
	vhc := new(Vehicle)
	err := db.GetDB().Where("vehicle_id = ?", VehicleID).Find(&vhc).Error
	if err != nil {
		return nil, errors.New("Can not find Vehicle with given id")
	}
	return vhc, nil
}

func (v Vehicle) GetVehicleInfoByRoomID(RoomID int) ([]Vehicle, error) {
	var listVhc []Vehicle
	rows, err := db.GetDB().Model(&Vehicle{}).Where("room_id = ?", RoomID).Rows()
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var vhc Vehicle
		db.GetDB().ScanRows(rows, &vhc)
		// fmt.Printf("%+v", std)
		listVhc = append(listVhc, vhc)
	}

	return listVhc, err
}
