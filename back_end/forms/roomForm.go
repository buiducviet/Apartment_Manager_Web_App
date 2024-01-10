package forms

type RoomForm struct {
	FamilyID  string ` json:"familyID"`
	RoomID    int    `json:"roomID"`
	Area      int    `json:"roomArea"`
	OwnTime   string `json:"ownTime"`
	OwnerID   string `json:"citizenID"`
	OwnerName string `json:"owner_name"`
	Status    string `json:"room_status"`
}
