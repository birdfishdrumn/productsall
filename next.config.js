const withPWA = require("next-pwa");

module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
});

module.exports = {
    // images: { domains: ['firebasestorage.googleapis.com'] },
    images: {
        domains: [
            'res.cloudinary.com',
            'localhost:3000'
        ],
    },
}