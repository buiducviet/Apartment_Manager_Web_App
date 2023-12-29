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

	//admin
	level1 := router.Group("/lv1")
	{
		level1.Use(authMid.TokenAuth())
		level1.Use(authMid.CheckRoleLevelMid(1))

		level1.GET("/check/:usr", userCtrl.GetUserByUsername)
		level1.GET("/citizeninfo", ctzCtrl.GetCitizenInfo)
		level1.GET("/allstudent", ctzCtrl.GetAllCitizen)
	}
	//citizen
	level0 := router.Group("/lv0")
	{
		level0.Use(authMid.TokenAuth())
		level0.Use(authMid.CheckRoleLevelMid(0))
	}
	router.NoRoute()
	return router
}
