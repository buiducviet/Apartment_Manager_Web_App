package model

import "github.com/jinzhu/gorm"

type Request struct {
	gorm.Model
	Status  string `gorm:"type:text; not null" json:"status"`
	UserID  string `gorm:"not null; size:10" json:"user_id"`
	Title   string `gorm:"type:text; not null" json:"title"`
	Message string `gorm:"type:text; not null" json:"message"`
	Reply   string `gorm:"type:text" json:"reply"`
	Note    string `gorm:"type:text" json:"note"`
}
