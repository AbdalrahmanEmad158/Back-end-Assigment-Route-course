Register API
url: /auth/register
method: POST
request [header]: {Content-Type:application/json}
request [body]: {name,email,password}
response [status]: success:201, failure:400
response [header]: {Content-Type:application/json}
response [body]: {message, success, data}




Verify Account API
url: /auth/verify
method: PATCH
request [header]: {Content-Type:application/json}
request [body]: {otp,email}
response [status]: 200/400
response [header]: {Content-Type:application/json}
response [body]: {message, success, data}




Login API
url: /auth/login
method:POST
request [header]:{content-type:application/json}
request [body]:{email,password}
response [status]:200/400
response [header]:{content-type:application/json}
response [body]:{message,success,data}