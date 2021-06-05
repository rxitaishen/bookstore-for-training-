const mongoose = require('mongoose');

// Book Schema
const UserSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
    admin:{
        type: Boolean,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get Users
module.exports.getUsers = (callback, limit) => {
	User.find(callback).limit(limit);
}

//Get Book By Name
module.exports.getBookByName = (name, callback)=>{
	User.findOne({"name": name},callback);
	//console.log(title);
}

// Add User
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

/* Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);
}*/
