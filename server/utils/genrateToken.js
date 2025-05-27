import jwt from "jsonwebtoken";

export const generateToken = async (res,userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWTSECRET, {
      expiresIn: "2d",
    });

    await res.cookie("jwt", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true ,
      sameSite: "strict",
    });
    console.log("Token Generated");
  } catch (error) {
    console.log("Geneate Token Error: ", error.message || error);
  }
};
