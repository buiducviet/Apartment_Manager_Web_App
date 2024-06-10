package forms

type BillForm struct {
	BillType     string `json:"bill_type"`
	BillID       string `json:"billID"`
	BillMonth    string `json:"bill_month"`
	BillAmount   int    `json:"bill_amount"`
	BillCost     int64  `json:"bill_cost"`
	CustomerID   string `json:"customerID"`
	CustomerName string `json:"customer_name"`
	Date         string `json:"bill_date"`
	Status       string `json:"bill_status"`
}
