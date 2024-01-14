package forms

type VehicleForm struct {
	VehicleName string `json:"vehicle_name"`
	VehicleType string `json:"vehicle_type"`
	VehicleID   string `json:"vehicleID"`
	OwnerID     string `json:"owner_id"`
	RoomID      int    `json:"roomID"`
}
