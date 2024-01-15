package forms

type DonationForm struct {
	DonationID    string `json:"donationID" `
	DonationType  string `json:"donation_type"`
	DonationDesc  string `json:"donation_desc"`
	DonationMonth string `json:"donation_month"`
	Cost          int64  `json:"donation_cost"`
	RoomID        int    `json:"roomID"`
	DonorName     string `json:"donor_name"`
}
