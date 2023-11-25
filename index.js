const db = require("./backend/src/lib/db");
const frontApp = require("./frontend/app");
const backApp = require("./backend/app");

frontApp.listen(3000, () => {
    console.log(`Frontend server start`);
});

backApp.listen(4000, async () => {
    await db.sequelize.sync({ force: false });
    console.log(`Backend server start`);
});
