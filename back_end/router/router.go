package router

import (
	"ApartmentApp/controller"
	"ApartmentApp/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func configCORS() gin.HandlerFunc {
	cfg := cors.DefaultConfig()
	cfg.AllowOrigins = []string{"*", "*/"}
	cfg.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "authorization"}
	return cors.New(cfg)
}

// NewRouter routing
func NewRouter() *gin.Engine {
	router := gin.New()
	router.Use(configCORS())
	// router.Use(cors.Default())
	router.Use(gin.Logger())

	authCtrl := new(controller.AuthController)
	router.POST("/tokenrf", authCtrl.Refresh)

	healthGroup := router.Group("health")
	{
		healthCtrl := new(controller.Health)
		healthGroup.GET("check", healthCtrl.Check)
	}
	//user: chưa đăng nhập
	userGroup := router.Group("user")
	{
		userCtrl := new(controller.UserController)
		userGroup.POST("/register", userCtrl.Register)
		userGroup.POST("/login", userCtrl.Login)
		userGroup.GET("/logout", userCtrl.Logout)
	}

	var authMid = new(middleware.AuthMiddleware)
	ctzCtrl := new(controller.CitizenController)
	/*hoholdCtrl := new(controller.HouseHoldController)*/
	userCtrl := new(controller.UserController)
	roomCtrl := new(controller.RoomController)
	billCtrl := new(controller.BillController)
	feeCtrl := new(controller.FeeController)
	donationCtrl := new(controller.DonationController)

	//admin
	level1 := router.Group("/lv1")
	{
		level1.Use(authMid.TokenAuth())
		level1.Use(authMid.CheckRoleLevelMid(1))

		level1.GET("/check/:usr", userCtrl.GetUserByUsername)
		level1.GET("/citizeninfo", ctzCtrl.GetCitizenInfo)
		level1.GET("/allcitizen", ctzCtrl.GetAllCitizen)

		level1.GET("/listFamily", roomCtrl.GetAllRoom)
		level1.GET("/citizensbyfamily", ctzCtrl.GetAllCitizenByFamilyIDRoom)
		level1.POST("/newcitizen", ctzCtrl.CreateCitizenHandler)
		level1.POST("/updatecitizen", ctzCtrl.UpdateCtzInfo)
		level1.DELETE("/deletecitizen", ctzCtrl.DeleteCitizen)

		level1.POST("/updateroom", roomCtrl.UpdateRoomInfo)

		level1.GET("/listfeecc", feeCtrl.GetAllRoomFeeCC)
		level1.GET("/listfeept", feeCtrl.GetAllRoomFeePT)
		level1.GET("/listfeedv", feeCtrl.GetAllRoomFeeDV)
		level1.GET("/roominfor", roomCtrl.GetRoomInfoLV1)
		level1.GET("/vehicle", roomCtrl.GetAllVehicleByRoomIDLV1)

		level1.GET("/listelecbill", billCtrl.GetAllBillElectric)
		level1.GET("/listwaterbill", billCtrl.GetAllBillWater)
		level1.GET("/listinternetbill", billCtrl.GetAllBillInternet)

		level1.GET("/listdonation", donationCtrl.GetAllDonation)
		/*level1.POST("/newfee", feeCtrl.c)*/
	}
	//citizen
	level0 := router.Group("/lv0")
	{
		level0.Use(authMid.TokenAuth())
		level0.Use(authMid.CheckRoleLevelMid(0))

		level0.GET("/usrinfo", ctzCtrl.GetCitizenInfo)

		level0.GET("/roominfo", roomCtrl.GetRoomInfo)
		level0.GET("/family", ctzCtrl.GetAllCitizenByFamilyID)
		level0.GET("/vehicle", roomCtrl.GetAllVehicleByRoomID)
		level0.GET("/waterbill", billCtrl.GetWaterBillInfo)
		level0.GET("/electricbill", billCtrl.GetElectricBillInfo)
		level0.GET("/internetbill", billCtrl.GetInternetBillInfo)
	}
	router.NoRoute()
	return router
}
