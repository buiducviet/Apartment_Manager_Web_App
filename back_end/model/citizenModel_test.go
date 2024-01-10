package model

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"ApartmentApp/tlog"
	"testing"
)

func TestGetCitizenInfo(t *testing.T) {
	config.Init()
	db.Init()
	testCtz := &Citizen{
		CitizenID: "030203009774",
		Name:      "Bùi Đức Việt",
		DOB:       "15/07/2003",
		Contact:   "0123856789",
		RoomID:    9,
		Gender:    "Nam",
		FamilyID:  "nhacuaviet2",
	}
	if err := db.GetDB().Table("citizen").Select("citizen_id").Where("citizen_id = ?", testCtz.CitizenID).Error; err == nil {
		if err := db.GetDB().Create(testCtz).Error; err != nil {
			t.Errorf("Can not create user %+v", err)
		}
	}
	checkCitizen, err := testCtz.GetCitizenInfo(testCtz.CitizenID)
	if (err != nil) || (checkCitizen.CitizenID != "030203009774") {
		t.Errorf("Can not find user err : %+v\nuser : %+v", err, checkCitizen)
	}
}

/*func TestGetFriends(t *testing.T) {
	config.Init()
	db.Init()
	var std = new(Citizen)
	testList, err := std.GetFriends(00000003)
	if err != nil || (len(testList) != 2) {
		t.Errorf("Err : %+v\nList : %+v", err, testList)
	}
}*/

func TestGetRoomID(t *testing.T) {
	config.Init()
	db.Init()
	tlog.Init()
	var std = new(Citizen)
	roomID, err := std.GetRoomID("030203009774")
	if err != nil || roomID == -1 {
		t.Errorf("%+v", err)
	}
}
