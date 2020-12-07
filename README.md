# NucampServer
# https://github.com/FeliciaWilkes/NucampServer.git
To start express server: npm start

To start mongodb:    mongod --dbpath=data 
To open mongo Repl shell: mongo

"Mongoose Population"
1. Modify the userSchema to include firstname & lastname fields
2. Modify the commentSchema's author field for type of ObjectId and ref of User
3. Modify campsiteRouter to use.populate() method on campsite documents retrieved for get requests
4. Modify post request for adding a new comment to save current user's _id to author field
5. Modify userRouter to add firstname and lastname to user document upon registration

