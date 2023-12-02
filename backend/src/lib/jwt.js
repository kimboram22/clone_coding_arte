const Crypto = require("crypto");
require("dotenv").config();

class JWT {
    salt;
    constructor() {
        this.salt = process.env["JWT_SECRET_KEY"];
    }

    encode(obj) {
        return Buffer.from(JSON.stringify(obj)).toString("base64url");
    }
    decode(base64) {
        return JSON.parse(Buffer.from(base64, "base64url").toString("utf-8"));
    }
    createSignature(base64url) {
        return Crypto.createHmac("sha256", this.salt)
            .update(base64url)
            .digest("base64url");
    }
    sign(data) {
        const header = this.encode({ type: "JWT", alg: "HS256" });
        const payload = this.encode(data);
        const base64url = [header, payload].join(".");
        const signature = this.createSignature(base64url, this.salt);
        const jwt = [base64url, signature].join(".");
        return jwt;
    }

    verify(token) {
        try {
            const [header, payload, signature] = token.split(".");
            const base64url = [header, payload].join(".");
            const newSignature = this.createSignature(base64url, this.salt);
            if (signature !== newSignature) return null;
            const result = this.decode(payload);
            return result;
        } catch (e) {
            throw new Error(`jwt verify error`, e.message);
        }
    }
}

module.exports = new JWT();
