import sqlite3 from 'sqlite3'
export const sqliteRepositoriesClient = new sqlite3.Database('development.sqlite')
