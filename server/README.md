# VideoResume

# video resume is running on localhost:8080 (port)

# for installing node js

https://nodejs.org/en/download for installing the node js click on the link select your platform

# for mongodb atlas

https://www.mongodb.com/atlas/database click on the link singin in with mail ID

# for runing the app

download the code
unzip the code
open the code in vs code

# run command in vs_code terminal

npm i (for downloading the node_module and libraries)
npm i dotenv (for instralling dotenv file)
npm start (for starting the server)

# for checking the api

download the postman app
go to the routing folder
copy the end points  
 http://localhost:8080/api/signup (this is for signup,[prvide mail id password and name] Post api ),
http://localhost:8080/api/signin (this is for signin endpoint,[provide mail id and password] post api),
http://localhost:8080/api/logout (this is for signout endpoint,[provide mail id and password] get api),
http://localhost:8080/api/candidateProfile (this is for candidateprofile[DOB ,rodoc,pimage,salary,location,education,cdi], post api)
http://localhost:8080/api/lookup (this is for candidate get data endpoint [provide mail_id and cdi]get api)

# importent

1.in candidate profile you have to enter cdi manually ,when we login mongodb provide a unique object_id enter that object_id manually in cdi field 2. rdoc and pimage is requierd field 3. create .env file
