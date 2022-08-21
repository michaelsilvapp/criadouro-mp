const proxy = [
    {
        context: "/api",
        target: "https://zssjt2xieg.execute-api.us-east-1.amazonaws.com",
        pathRewrite: { "^/dev": "" }
    }
];
module.exports = proxy;
