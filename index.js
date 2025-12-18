(async() => {
    await import('./index.mjs');
  })();
module.exports = app;
// This replaces the old app.listen() part
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
