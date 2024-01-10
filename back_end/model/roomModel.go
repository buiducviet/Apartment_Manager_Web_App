package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"
	"ApartmentApp/tlog"
)

// Room ...
type Room struct {
	DefaultModel
	FamilyID  string `gorm:" type:text;" json:"familyID"`
	RoomID    int    `gorm:"type:int; size:10; not null; unique_index; primary_key" json:"roomID"`
	Area      int    `gorm:"type:int; size:20; not null" json:"roomArea"`
	OwnTime   string `gorm:"type: text;" json:"ownTime"`
	OwnerID   string `json:"citizenID" gorm:" type:text"`
	OwnerName string `json:"owner_name" gorm:" type:text"`
	Status    string `json:"room_status" gorm:" type:text"`
}

// GetRoomInfo ...
func (r Room) GetRoomInfo(roomID int) (*Room, error) {
	var returnRoom = new(Room)
	var err error
	err = db.GetDB().Where("room_id = ?", roomID).Find(&returnRoom).Error
	if err != nil {
		tlog.Error("Can't get room from db", err)
		return nil, err
	}

	return returnRoom, err
}

func (r Room) GetAllRoom() ([]Room, error) {
	var returnListRoom []Room

	rows, err := db.GetDB().Table("room").Rows()
	if err != nil {
		tlog.Error("Can not get all room from db", err)
		return nil, err
	}

	for rows.Next() {
		var room Room
		db.GetDB().ScanRows(rows, &room)
		returnListRoom = append(returnListRoom, room)

	}

	err = db.GetDB().Table("room").Error
	if err != nil {
		return nil, err
	}
	err = db.GetDB().Table("room").Error
	if err != nil {
		return nil, err
	}

	return returnListRoom, nil
}
func (r Room) UpdateRoom(roomForm forms.RoomForm) (*Room, error) {

	var err error
	var room Room
	db := db.GetDB()

	err = db.Table("room").Where("room_id = ?", roomForm.RoomID).Find(&room).Error
	if err != nil {
		return nil, err
	}
	room.RoomID = roomForm.RoomID
	room.FamilyID = roomForm.FamilyID
	room.OwnerID = roomForm.OwnerID
	room.OwnTime = roomForm.OwnTime
	room.RoomID = roomForm.RoomID
	room.OwnerName = roomForm.OwnerName
	room.Status = roomForm.Status

	err = db.Save(&room).Error
	if err != nil {
		return nil, err
	}

	return &room, err

}
