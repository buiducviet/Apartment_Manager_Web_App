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
	vehicleCtrl := new(controller.VehicleController)

	//admin
	level1 := router.Group("/lv1")
	{
		level1.Use(authMid.TokenAuth())
		level1.Use(authMid.CheckRoleLevelMid(1))

		level1.GET("/usrinfo", userCtrl.GetUserByUserID)
		level1.GET("/check/:usr", userCtrl.GetUserByUsername)
		level1.GET("/citizeninfo", ctzCtrl.GetCitizenInfo)
		level1.GET("/allcitizen", ctzCtrl.GetAllCitizen)
		level1.POST("/updateuser", userCtrl.UpdateUserInfor)

		level1.GET("/checkpasspayment", userCtrl.CheckPaymentPassword)

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
		level1.GET("/vehicle", vehicleCtrl.GetAllVehicleByRoomID)

		level1.GET("/listelecbill", billCtrl.GetAllBillElectric)
		level1.GET("/listwaterbill", billCtrl.GetAllBillWater)
		level1.GET("/listinternetbill", billCtrl.GetAllBillInternet)
		level1.POST("/createnewfee", feeCtrl.CreatNewFee)
		level1.POST("/updatevehiclefee", feeCtrl.UpdateVehicleFee)

		level1.GET("/listdonation", donationCtrl.GetAllDonation)
		level1.POST("/newvehicle", vehicleCtrl.CreateNewVehicle)
		level1.POST("/updatevehicle", vehicleCtrl.UpdateVehicle)

		level1.GET("/adminlist", userCtrl.GetAllUserRole1)
		level1.GET("/listvehicle", vehicleCtrl.GetAllVehicle)
		level1.POST("/deletevehicle", vehicleCtrl.DeleteVehicle)
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
		level0.GET("/vehiclefee", feeCtrl.GetRoomFeePT)
		level0.GET("/housefee", feeCtrl.GetRoomFeeCC)
		level0.GET("/dichvufee", feeCtrl.GetRoomFeeDV)
		level0.POST("/updatefeepaid", feeCtrl.UpdatePaidFee)
		level0.GET("/checkpasspayment", userCtrl.CheckPaymentPassword)
		level0.POST("/updatebill", billCtrl.UpdatePaidBill)

		level0.GET("/quyvnn", donationCtrl.GetqvnnInfo)
		level0.GET("/quykh", donationCtrl.GetqkhInfo)
		level0.GET("/quytdp", donationCtrl.GetqtdpInfo)
		level0.POST("/updatedonation", donationCtrl.UpdateDonation)
	}
	router.NoRoute()
	return router
}
