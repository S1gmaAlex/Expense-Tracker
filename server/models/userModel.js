import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
            trim: true, 	 	
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
            trim: true,
		},
		age: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		},
		job: {
			type: String,
			default: "",
		},
		contact: {
			type: String,
			default: "",
		},
		profilePic: {
			type: String,
			default: "",
		},
		totalMoney: {
            type: Number,
            maxLength: 20,
            trim: true,
			default:0
        },
		bio: {
			type: String,
			default: "",
		}
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;

