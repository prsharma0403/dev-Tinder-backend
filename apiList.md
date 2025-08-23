#dev Tinder API

##authRouter
-POST /signup
-POST /login
-POST /logout

profile/Router
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRouter
-POST /request/send/Intrested/:userId
-POST /request/send/ignored/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

userRouter
-GET /user/connections
-GET /requests/recieved
-GET /feed--gets fprofile of other user in plat form

status :ignore,reject,accept,intrested