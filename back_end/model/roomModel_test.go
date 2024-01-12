package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"ApartmentApp/tlog"
	"testing"
)

var roomMod = new(Room)

func TestGetRoomInfo(t *testing.T) {
	config.Init()
	db.Init()
	tlog.Init()
	newRoom := &Room{
		RoomID: 10,
		Area:   200,
		Status: "not owned",
	}
	if newRoom.OwnerID != "" {
		var ownerName string
		var familyID string
		db.GetDB().Table("citizen").Select("name").Where("citizen_id = ? and room_id=?", newRoom.OwnerID, newRoom.RoomID).Row().Scan(&ownerName)
		db.GetDB().Table("citizen").Select("family_id").Where("citizen_id = ?", newRoom.OwnerID).Row().Scan(&familyID)

		newRoom.OwnerName = ownerName
		newRoom.FamilyID = familyID
	}

	if check := db.GetDB().Table("room").Select("room_id").Where("room_id = ?", newRoom.RoomID).RecordNotFound(); check != true {
		if err := db.GetDB().Create(newRoom).Error; err != nil {
			t.Errorf("Can not create room %+v", err)
		}
	}
	room, err := roomMod.GetRoomInfo(11)
	if err != nil || room.Area != 100 {
		t.Errorf("%+v", err)
	} else {
		tlog.GetLogger().Info("room get suc")
	}
}

/*func TestChangeRoomOccupied(t *testing.T) {
	config.Init()
	db.Init()
	tlog.Init()
	r := &Room{
		RoomID:      3,

	}

	check := db.GetDB().Table("room").Where("room_id = ?", r.RoomID).RecordNotFound()
	if check != true {
		err := db.GetDB().Create(r).Error
		if err != nil {
			t.Errorf("Can not create new room %+v", err)
			return
		}
	}

	err := r.ChangeRoomOccupied(1, 2)
	if err != nil {
		t.Errorf("Can not change room occupied %+v", err)
	}
}*/
