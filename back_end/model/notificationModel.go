package model

import "github.com/jinzhu/gorm"

type Notification struct {
	gorm.Model
	Title   string `json:"title" gorm:"type:text; not null"`
	Content string `json:"content" gorm:"type:text; not null"`
	UserID  string `json:"userID"`
}
