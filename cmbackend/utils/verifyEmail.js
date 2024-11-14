import connection from "../db/db.js";
import AsyncWrap from "./AsyncWrap.js";
import EXpressErr from "./expressError.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "dflajeroquwerdmnsvljna6749";

export const verifyEmail = AsyncWrap(async (req, res) => {
  const { token } = await req.query;
  // console.log(token);
  if (!token) {
    throw new EXpressErr(400, "Verification token is missing", false);
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  // const query = "UPDATE vuser SET isVerified = true WHERE id = ?";
  const query = "select * from vuser where id=?";
  const values = [decoded.id];
  const result = await connection.query(query, values);
  // console.log(result[0]);
  // res.status(200).redirect("http://localhost:3000");
  return res.status(200).json({ message: "Email verified successfully!" });
});
