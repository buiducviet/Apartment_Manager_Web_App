package main

import (
	"ApartmentApp/config"
	"ApartmentApp/db"
	"ApartmentApp/model"
	"ApartmentApp/server"
	"ApartmentApp/tlog"
)

func main() {
	config.Init()
	db.Init()
	db.RedisClientInit("1")
	model.InitMigration()
	tlog.Init()
	server.Init()
}
