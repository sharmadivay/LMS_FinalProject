import bcrypt from "bcryptjs";

// encrypt the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Password Encryption Error :", error.message || error);
  }
};

// compare passwords
const comparePasswords = async (userPassword, hashedPassword) => {
  try {
    return bcrypt.compare(userPassword, hashedPassword);
  } catch (error) {
    console.log("Compare Hash Password Error: ", error.message || error);
  }
};

export {hashPassword , comparePasswords};