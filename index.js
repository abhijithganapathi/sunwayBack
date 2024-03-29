// Code for mongoose config in backend
// Filename - backend/index.js
const dotenv = require("dotenv")
dotenv.config()

// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect(process.env.REACT_APP_DB_URI, {
	dbName: 'Sunway',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) : 
	console.log('Connected to yourDB-name database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
                index: true // add this option
	}
});
const User = mongoose.model('users', UserSchema);

// For backend and express
const express = require('express'); // rename this variable
const app = express(); // use a different variable name for the express application
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by 
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete req.body.password; // delete the password from the req.body object
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});
app.listen(5000);
