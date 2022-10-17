import jwt from "jsonwebtoken";
var checkAdminAuth = async (req, res, next) => {
  const token2 = req.cookies.access_token_admin;
  if (!token2) {
    return res
      .status(403)
      .send({ status: "failed", message: "please login first..." });
  }
  try {
    jwt.verify(token2, process.env.JWT_SECRET_KEY_2);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Unauthorized User" });
  }
};

export { checkAdminAuth };
