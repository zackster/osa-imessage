const sqlite = require('better-sqlite3');
const dbPath = `${process.env.HOME}/Library/Messages/chat.db`
const OPEN_READONLY = true

let db
function open() {
    if (db) return db

    console.log("Attempting to open DB with dbPath: ", dbPath);
    db = new sqlite(dbPath, { readonly: OPEN_READONLY })
    return db
}

let isClosing;
function cleanUp() {
    if (db && !isClosing) {
        isClosing = true
        db.close()
    }
}
process.on('exit', cleanUp)
process.on('uncaughtException', cleanUp)

module.exports = {
    open,
}
