class HttpMessage {
    constructor(message, statusCode, data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.timestamp = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Seoul",
            hour12: false,
        });
    }
}

class Ok extends HttpMessage {
    constructor(data) {
        super();
        this.statusCode = "200";
        this.message = "OK";
        this.data = data;
    }
}

class Created extends HttpMessage {
    constructor(data) {
        super();
        this.statusCode = "201";
        this.message = "Created";
        this.data = data;
    }
}

module.exports = { Ok, Created };
