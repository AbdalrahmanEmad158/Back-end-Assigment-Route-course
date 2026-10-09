NGL APP
tech stack:

express.js
node.js
mongodb
redis/cache
jwt
bcrypt
rate limiter
load balancer
nginx
login with Google. [Social-App]
features:

authentication flow:

register.
send verification email. [otp,link]
verify email using. [otp,link]
login.
forgot password.
reset password.
login with Google.
user flow:

update profile.
view profile.
view all users.
messages flow:

send message.
view incoming messages.
delete a specific message.
no SQL
high availability. [view]
eventual consistency.[]
OTP [one-time password]
generate OTP.[register,reset-password,vodafone-cash,place-order]
save OTP into DB within the register.
delete OTP after usage verify an account.
delete OTP after 10 minutes.[TTL] >> time to live.
modules :
commonJs -> ES5 -> const require() >> module.exports = fn;
moduleJs -> ES6 -> import fn from 'module-name' >> export fn;
============================

todo session2:
refactor folder structure.✅
register.✅
verify email using otp.✅
login how to send token in res.[cookie]✅
=============================

todo session3:
send otp.
reset password.
send a message
how to access the token from req.
customize error handler