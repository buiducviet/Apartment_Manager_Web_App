package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"

	"errors"
)

// Student ...
type Citizen struct {
	DefaultModel
	FamilyID  string `json:"familyID" gorm:" not null;"`
	CitizenID string `json:"citizenID" gorm:" not null; unique_index; primary_key"`
	Name      string `json:"name" gorm:"type:text; not null"`
	DOB       string `json:"dob" gorm:"type:text"`
	Contact   string `json:"contact" gorm:"type:text; not null"`
	Gender    string `json:"gender" gorm:"type:text; not null"`
	RoomID    int    `json:"roomID" gorm:"type:int; not null; foreignKey:room_id"`
	Relation  string `json:"relation" gorm:"type:text;"`
	Status    string `json:"citizen_status" gorm:"type:text"`
}

func (c Citizen) GetCitizenInfo(CitizenID string) (*Citizen, error) {
	ctz := new(Citizen)
	err := db.GetDB().Where("citizen_id = ?", CitizenID).Find(&ctz).Error
	if err != nil {
		return nil, errors.New("Can not find citizen with given id")
	}
	return ctz, nil
}

func (c Citizen) GetAllCitizenByRoomID(roomID int) ([]Citizen, error) {
	var listCtz []Citizen
	rows, err := db.GetDB().Model(&Citizen{}).Where("room_id = ?", roomID).Rows()
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var ctz Citizen
		db.GetDB().ScanRows(rows, &ctz)
		// fmt.Printf("%+v", std)
		listCtz = append(listCtz, ctz)
	}

	return listCtz, err
}
func (c Citizen) GetAllCitizenByFamilyID(familyID string) ([]Citizen, error) {
	var listCtz []Citizen
	rows, err := db.GetDB().Model(&Citizen{}).Where("family_id = ?", familyID).Rows()
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var ctz Citizen
		db.GetDB().ScanRows(rows, &ctz)
		// fmt.Printf("%+v", std)
		listCtz = append(listCtz, ctz)
	}

	return listCtz, err
}

// GetRoomID by citizen id
func (c Citizen) GetRoomID(CitizenID string) (roomid int, err error) {
	db.GetDB().Table("citizen").Select("room_id").Where("citizen_id = ?", CitizenID).Row().Scan(&roomid)
	if roomid == 0 {
		err = errors.New("Can not find room in DB")
		/*tlog.Error("Room ID not available", err)*/
		return -1, err
	}
	return roomid, nil
}
func (c Citizen) ChangeCitizenInfo(ctzInfoForm forms.CitizenInfoForm) (*Citizen, error) {
	var err error
	var ctz Citizen
	db := db.GetDB()

	err = db.Table("citizen").Where("citizen_id = ?", ctzInfoForm.CitizenID).Find(&ctz).Error
	if err != nil {
		return nil, err
	}
	ctz.CitizenID = ctzInfoForm.CitizenID
	ctz.Contact = ctzInfoForm.Contact
	ctz.Name = ctzInfoForm.Name
	ctz.DOB = ctzInfoForm.DOB
	ctz.Gender = ctzInfoForm.Gender
	ctz.FamilyID = ctzInfoForm.FamilyID
	ctz.Relation = ctzInfoForm.Relation
	ctz.RoomID = ctzInfoForm.RoomID
	ctz.Status = ctzInfoForm.Status
	err = db.Save(&ctz).Error
	if err != nil {
		return nil, err
	}

	return &ctz, err
}

func (c Citizen) NewCitizenInfor(ctzInfoForm forms.CitizenInfoForm) (*Citizen, error) {
	var err error
	db := db.GetDB()

	ctz := &Citizen{
		Name:      ctzInfoForm.Name,
		DOB:       ctzInfoForm.DOB,
		Relation:  ctzInfoForm.Relation,
		Contact:   ctzInfoForm.Contact,
		CitizenID: ctzInfoForm.CitizenID,
		Gender:    ctzInfoForm.Gender,
		FamilyID:  ctzInfoForm.FamilyID,
		RoomID:    ctzInfoForm.RoomID,
		Status:    ctzInfoForm.Status,
	}

	if db.Table("citizen").Where("citizen_id = ?", ctzInfoForm.CitizenID).RecordNotFound() {
		return nil, errors.New("citizen existed")
	}

	db.Table("citizen").Create(ctz)

	return ctz, err
}
func (c Citizen) DeleteCitizen(CitizenID string) (*Citizen, error) {
	db := db.GetDB()

	// Tìm công dân dựa trên CitizenID
	var citizen Citizen
	if err := db.Where("citizen_id = ?", CitizenID).First(&citizen).Error; err != nil {
		return nil, errors.New("citizen not exist")
	}

	// Xóa công dân từ cơ sở dữ liệu
	if err := db.Delete(&citizen).Error; err != nil {
		return nil, err // Trả về lỗi nếu có vấn đề khi xóa
	}

	return &citizen, nil

}

func (c Citizen) GetAllCitizen() ([]Citizen, error) {
	var listCtz []Citizen

	rows, err := db.GetDB().Table("citizen").Rows()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var ctz Citizen

		db.GetDB().ScanRows(rows, &ctz)
		if ctz.DeletedAt == nil {
			listCtz = append(listCtz, ctz)
		}

	}

	return listCtz, nil
}
