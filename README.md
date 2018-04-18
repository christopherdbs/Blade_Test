# Blade_Test

Technical Test Blade with NodeJS

#Features

The user can register and sign in. Then he can pay for a service
He can check his profile page where he can see if the service is paid or not. 

Version 0.1.0
## Routes



### /v1/auth/register

Require pseudo, password, email, firstName, lastName, birthDate


### /v1/user/login

POST

Require pseudo or email and password

### /v1/app/home

### /v1/auth/logout

### /v1/user/:userid/profile

Require user_id : the user id in database
