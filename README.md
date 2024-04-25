Pebblescore Test

Technical Design Document: Group Savings
1. Technologies

•	Backend: Node.js, Express.js

•	Database: MySQL

•	ORM: Sequelize (dialect: Mysql)

•	Programming Language: TypeScript

•	Authentication: JWT (JSON Web Token)

• SwaggerUI for Api Documentation (OAS)


A user can create an account

A user can login

A user can create a group savings plan

A user can send invites to up to 5 friends to join the savings plan. The friends must
be registered on the platform

An invited friend can view and either join or decline an invitation


Routes:


POST
/v1/auth/register
Register as user


POST
/v1/auth/login
Login


POST
/v1/auth/forgot-password
Forgot password


POST
/v1/auth/reset-password
Reset password

Friend
Friends

POST
/v1/friend
Send Friend Request



GET
/v1/friend
Get all user friends



PATCH
/v1/friend
Remove friend



POST
/v1/friend/acceptRequest
Accept Friend Request



POST
/v1/friend/rejectRequest
Reject Friend Request


Invites
Plan Invites



POST
/v1/invite
Send Plan Invite



POST
/v1/invite/getPlanInvites
Get all plans Invite



POST
/v1/invite/getInvite
Get Single Invite



POST
/v1/invite/acceptRequest
Accept Plan Invite



POST
/v1/invite/rejectRequest
Reject Plan Invite


Plan
Plan



POST
/v1/plan/
Add plan



GET
/v1/plan/
Get all user plans



PATCH
/v1/plan/
Update plan



POST
/v1/plan/getPlanById
Get plan and its information



POST
/v1/plan/getPlanByTitle
Get plan and its information using Title



POST
/v1/plan/deletePlan
Get plan and its information


User
User



GET
/v1/user
Get user information



PATCH
/v1/user
Update user



POST
/v1/user/findUsersByUsername
Find other users


Global


GET
/
Get server status


PATCH
/sync
Sync database