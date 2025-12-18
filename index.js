const app = require('express')();

// This forces the app to look at your main logic file
try {
    const mainApp = require('./index.mjs');
    if (mainApp && mainApp.default) {
        app.use(mainApp.default);
    } else {
        app.use(mainApp);
    }
} catch (e) {
    // If it's a proxy, it might just need to be imported
    import('./index.mjs');
}

// Vercel Magic
module.exports = (req, res) => {
    // This handles the request even if the mjs hasn't loaded yet
    app(req, res);
};
