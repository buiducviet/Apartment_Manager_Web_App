package server

import (
	"ApartmentApp/config"
	"ApartmentApp/router"
)

// Init create a server
func Init() {
	srvCf := config.GetServerConfig()
	r := router.NewRouter()
	r.Run(srvCf.SrvHost + ":" + srvCf.SrvPort)
}
