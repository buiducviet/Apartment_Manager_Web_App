package model

import (
	"ApartmentApp/db"
	"ApartmentApp/forms"

	"errors"
)

// Student ...
type Citizen struct {
	DefaultModel
	CitizenID string `json:"studentid" gorm:"type:int; not null; unique_index; primary_key"`
	Name      string `json:"name" gorm:"type:text; not null"`
	DOB       string `json:"dob" gorm:"type:text"`
	RoomID    int    `json:"room" gorm:"type:int; not null"`
}

// MoneyManage ...
/*type MoneyManage struct {
	gorm.Model
	CitizenID   int    `json:"studentid" gorm:"type:int;not null; index"`
	Month       int    `json:"month" gorm:"type:int; not null"`
	Year        int    `json:"year" gorm:"type:int; not null"`
	Money       int    `json:"money" gorm:"type:int; not null"`
	Status      string `json:"status" gorm:"type:text; not null"`
	Description string `json:"description" gorm:"type:text"`
}*/

// GetStudentInfo based on student id
func (c Citizen) GetCitizenInfo(citizenid string) (*Citizen, error) {
	ctz := new(Citizen)
	err := db.GetDB().Where("citizen_id = ?", citizenid).Find(&ctz).Error
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

// GetRoomID by student id
func (c Citizen) GetRoomID(citizenid string) (roomid int, err error) {
	db.GetDB().Table("citizen").Select("room_id").Where("citizen_id = ?", citizenid).Row().Scan(&roomid)
	if roomid == 0 {
		err = errors.New("Can not find room in DB")
		/*tlog.Error("Room ID not available", err)*/
		return -1, err
	}
	return roomid, nil
}

// GetDormMoney get dorm money based on student id
/*func (s Student) GetDormMoney(studentid int) ([]MoneyManage, error) {
	var listMoney []MoneyManage

	rows, err := db.GetDB().Table("money_manage").Where("student_id = ?", studentid).Rows()
	defer rows.Close()
	if err != nil {
		tlog.Error("Can not query money_manage from db", err)
		return nil, err
	}

	for rows.Next() {
		var monMng MoneyManage
		db.GetDB().ScanRows(rows, &monMng)

		listMoney = append(listMoney, monMng)
	}

	return listMoney, nil
}

func (s Student) ChangeRoom(studentID int, roomID int) (*Student, error) {
	var returnStd Student
	var rMod Room

	err := db.GetDB().Table("student").Where("student_id = ?", studentID).Find(&returnStd).Error
	if err != nil {
		return nil, err
	}

	if returnStd.RoomID == roomID {
		return nil, errors.New("Same room")
	}

	err = rMod.ChangeRoomOccupied(returnStd.RoomID, roomID)
	if err != nil {
		return nil, err
	}
	returnStd.RoomID = roomID

	err = db.GetDB().Save(&returnStd).Error
	if err != nil {
		return nil, err
	}

	return &returnStd, nil
}

func (mMng MoneyManage) CalculateNewMonth() ([]MoneyManage, error) {
	var listMonMng []MoneyManage
	//get all student available
	var listStd []Student
	rows, err := db.GetDB().Table("student").Not("room_id = ?", 0).Rows()
	defer rows.Close()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var std Student
		db.GetDB().ScanRows(rows, &std)
		listStd = append(listStd, std)
	}

	//Check month
	month := int(time.Now().Month())
	year := int(time.Now().Year())

	var checkMonth []int
	err = db.GetDB().Table("money_manage").Select("MAX(month) as max_month").Where("year = ?", year).Pluck("max_month", &checkMonth).Error
	if err != nil {
		return nil, err
	}
	if len(checkMonth) != 0 {
		if checkMonth[0] >= month {
			return nil, errors.New("This month has been calculated")
		}
	}

	//Calculated money
	for _, std := range listStd {
		var money []int
		err = db.GetDB().Table("room").Select("price").Where("room_id = ?", std.RoomID).Pluck("price", &money).Error
		if err != nil {
			return listMonMng, err
		}

		newMonMng := &MoneyManage{
			StudentID: std.StudentID,
			Month:     month,
			Year:      year,
			Money:     money[0],
			Status:    "Unpaid",
		}
		err = db.GetDB().Create(newMonMng).Error
		if err != nil {
			return listMonMng, err
		}

		listMonMng = append(listMonMng, *newMonMng)
	}

	return listMonMng, nil
}

func (mMng MoneyManage) GetAllMoneyManage() ([]MoneyManage, error) {
	var listMonMng []MoneyManage
	rows, err := db.GetDB().Table("money_manage").Rows()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var newMMng MoneyManage
		db.GetDB().ScanRows(rows, &newMMng)
		listMonMng = append(listMonMng, newMMng)
	}

	return listMonMng, nil
}

func (mMng MoneyManage) UpdatePaymentStatus(monMngID int, status string) (*MoneyManage, error) {
	var monMng MoneyManage
	err := db.GetDB().Table("money_manage").Where("id = ?", monMngID).Find(&monMng).Error
	if err != nil {
		return nil, err
	}

	bkStatus := monMng.Status
	monMng.Status = status

	err = db.GetDB().Table("money_manage").Save(&monMng).Error
	if err != nil {
		monMng.Status = bkStatus
		return nil, err
	}

	return &monMng, nil
}*/

func (c Citizen) NewCitizenInfor(citizenId string, ctzInfoForm forms.CitizenInfoForm) (*Citizen, error) {
	var ctz = &Citizen{
		Name: ctzInfoForm.Name,
		DOB:  ctzInfoForm.DOB,
	}

	if !db.GetDB().Debug().Table("citizen").Find(&Citizen{CitizenID: citizenId}).RecordNotFound() {
		err := db.GetDB().Table("citizen").Where("citizen_id = ?", citizenId).Update(ctz).Error
		if err != nil {
			return nil, err
		}
		if db.GetDB().Table("student").Where("citizen_id = ?", citizenId).Find(&ctz).Error != nil {
			return nil, err
		}
		return ctz, nil
	}

	err := db.GetDB().Table("citizen").Create(ctz).Error
	if err != nil {
		return nil, err
	}

	return ctz, nil
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
		listCtz = append(listCtz, ctz)
	}

	return listCtz, nil
}

/*func (mMng MoneyManage) GetReportStudentPayment() (paid int, unpaid int, err error) {
	var paidTemp = make([]int, 1)
	var unpaidTemp = make([]int, 1)

	err = db.GetDB().Table("money_manage").Select("COUNT(DISTINCT(`student_id`)) as sum_paid").Where("status LIKE \"Paid\"").Pluck("sum_paid", &paidTemp).Error
	if err != nil {
		return -1, -1, err
	}

	err = db.GetDB().Table("money_manage").Select("COUNT(DISTINCT(`student_id`)) as sum_unpaid").Where("status LIKE \"Unpaid\"").Pluck("sum_unpaid", &unpaidTemp).Error
	if err != nil {
		return -1, -1, err
	}

	return paidTemp[0], unpaidTemp[0], nil
}*/
