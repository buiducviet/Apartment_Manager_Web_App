package forms

type RoomFeeForm struct {
	FeeType  string `json:"fee_type"`
	FeeDesc  string ` json:"fee_desc"`
	FeeMonth string `json:"fee_month"`
	FeeCost  int64  `json:"fee_cost"`
	RoomID   int    `json:"roomID"`
	Date     string `json:"fee_date"`
	Status   string `json:"fee_status"`
}
