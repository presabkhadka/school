import mongoose, { mongo } from "mongoose";

mongoose.connect(
  "mongodb+srv://pchiranjivi2050:qOWJi2HDO8WhrGuZ@cpcluster.4apcyab.mongodb.net/"
);

const adminSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userContact: String,
});

export const Admin = mongoose.model("Admin", adminSchema);

module.exports = {
  Admin,
};
