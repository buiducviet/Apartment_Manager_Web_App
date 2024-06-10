package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"
	"errors"
)

type Vehicle struct {
	DefaultModel
	VehicleName string `gorm:"not null" json:"vehicle_name"`
	VehicleType string `gorm:"type:text; not null" json:"vehicle_type"`
	VehicleID   string `gorm:"not null;primary_key" json:"vehicleID"`
	RoomID      int    `json:"roomID" gorm:"type:int; not null"`
	OwnerID     string `gorm:"not null; size:20" json:"owner_id"`
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
func (v Vehicle) GetAllVehicle() ([]Vehicle, error) {
	var listV []Vehicle
	rows, err := db.GetDB().Table("vehicle").Rows()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var ctz Vehicle

		db.GetDB().ScanRows(rows, &ctz)
		if ctz.DeletedAt == nil {
			listV = append(listV, ctz)
		}

	}

	return listV, nil
}
func (v Vehicle) CreateNewVehicle(vform forms.VehicleForm) (*Vehicle, error) {
	var err error
	db := db.GetDB()

	testVhc := &Vehicle{
		VehicleID:   vform.VehicleID,
		VehicleName: vform.VehicleName,
		VehicleType: vform.VehicleType,
		OwnerID:     vform.OwnerID,
		RoomID:      vform.RoomID,
	}
	if testVhc.VehicleType == "Xe gắn máy" {
		testVhc.VehicleFee = 70000
	} else if testVhc.VehicleType == "Xe ô tô" {
		testVhc.VehicleFee = 1200000
	} else if testVhc.VehicleType == "Xe đạp" {
		testVhc.VehicleFee = 0
	}
	if testVhc.OwnerID != "" {

		var ownername string
		if err = db.Table("citizen").Where("citizen_id = ?", testVhc.OwnerID).Error; err != nil {
			return nil, errors.New("Can not find this owner")
		}
		db.Table("citizen").Select("name").Where("citizen_id = ?", testVhc.OwnerID).Row().Scan(&ownername)
		if err = db.Table("citizen").Where("citizen_id = ? and room_id=?", testVhc.OwnerID, testVhc.RoomID).Error; err != nil {
			return nil, errors.New("This owner is not in this room")
		}
		testVhc.OwnerName = ownername
	}

	db.Create(testVhc)

	return testVhc, err

}

func (v Vehicle) UpdateVehicle(vform forms.VehicleForm) (*Vehicle, error) {
	var err error
	db := db.GetDB()
	var testVhc Vehicle

	err = db.Table("vehicle").Where("vehicle_id = ? ", vform.VehicleID).Find(&testVhc).Error
	if err != nil {
		return nil, err
	}

	testVhc.VehicleID = vform.VehicleID
	testVhc.VehicleName = vform.VehicleName
	testVhc.VehicleType = vform.VehicleType
	testVhc.OwnerID = vform.OwnerID
	testVhc.RoomID = vform.RoomID
	if testVhc.VehicleType == "Xe gắn máy" {
		testVhc.VehicleFee = 70000
	} else if testVhc.VehicleType == "Xe ô tô" {
		testVhc.VehicleFee = 1200000
	} else if testVhc.VehicleType == "Xe đạp" {
		testVhc.VehicleFee = 0
	}
	if testVhc.OwnerID != "" {

		var ownername string
		if err = db.Table("citizen").Where("citizen_id = ?", testVhc.OwnerID).Error; err != nil {
			return nil, errors.New("Can not find this owner")
		}
		db.Table("citizen").Select("name").Where("citizen_id = ?", testVhc.OwnerID).Row().Scan(&ownername)
		if err = db.Table("citizen").Where("citizen_id = ? and room_id=?", testVhc.OwnerID, testVhc.RoomID).Error; err != nil {
			return nil, errors.New("This owner is not in this room")
		}
		testVhc.OwnerName = ownername
	}
	err = db.Save(&testVhc).Error
	if err != nil {
		return nil, err
	}

	return &testVhc, err

}
func (v Vehicle) GetVehicleInfoByRoomID(RoomID int) ([]Vehicle, error) {
	var listVhc []Vehicle

	rows, err := db.GetDB().Table("vehicle").Where("room_id = ? and deleted_at IS NULL", RoomID).Rows()
	/*defer rows.Close()*/
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
func (v Vehicle) DeleteVehicle(vehicleid string) (*Vehicle, error) {
	db := db.GetDB()

	// Tìm công dân dựa trên CitizenID
	var veh Vehicle
	if err := db.Where("vehicle_id = ?", vehicleid).Find(&veh).Error; err != nil {
		return nil, errors.New("vehicle not exist")
	}

	// Xóa công dân từ cơ sở dữ liệu
	if err := db.Delete(&veh).Error; err != nil {
		return nil, err // Trả về lỗi nếu có vấn đề khi xóa
	}

	return &veh, nil

}
