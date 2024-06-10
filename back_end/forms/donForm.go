package forms

type DonForm struct {
	DonID       string `json:"donID"`
	DonType     string `json:"don_type"`
	Content     string `json:"content"`
	StartTime   string `json:"start_time"`
	EndTime     string `json:"end_time"`
	CitizenID   string `json:"citizen_id"`
	Status      string `json:"status"`
	CitizenName string `json:"name"`
	RoomID      string `json:"roomID"`
}
