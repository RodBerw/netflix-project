import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  generateTokens(id: Number, email: String) {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!accessSecret || !refreshSecret) {
      throw new Error("JWT_ACCESS_SECRET or JWT_REFRESH_SECRET are not defined");
    }

    return {
      refreshToken: jwt.sign({ id, email }, refreshSecret, {
        expiresIn: "7d",
      }),
      accessToken: jwt.sign({ id, email }, accessSecret, {
        expiresIn: "15m",
      }),
    };
  }

  verifyToken(token: string, secret: string) {
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      const decoded = jwt.verify(token, secret);

      return decoded;
    } catch (err) {
      throw new Error("Invalid token");
    }
  }

  refreshAccessToken(refreshToken: string) {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
      throw new Error("JWT_REFRESH_SECRET is not defined");
    }

    const decoded = this.verifyToken(refreshToken, secret) as jwt.JwtPayload;

    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    } else {
      const newAccessToken = jwt.sign(
        { id: decoded.id, email: decoded.email },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      return { accessToken: newAccessToken };
    }
  }
}

export default new AuthService();
