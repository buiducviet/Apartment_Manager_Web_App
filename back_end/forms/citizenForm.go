package forms

type CitizenInfoForm struct {
	Name      string `json:"name"`
	DOB       string `json:"dob"`
	Contact   string `json:"contact"`
	CitizenID string `json:"citizenID"`
	Gender    string `json:"gender"`
	Relation  string `json:"relation"`
	FamilyID  string `json:"familyID"`
	RoomID    int    `json:"roomID"`
	Status    string `json:"citizen_status"`
}
