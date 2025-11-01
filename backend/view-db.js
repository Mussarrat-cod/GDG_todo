const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const dbPath = path.join(__dirname, 'todos.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Function to view all tables and their contents
function viewDatabase() {
  // List all tables
  db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'", [], (err, tables) => {
    if (err) {
      console.error('Error getting tables:', err);
      return;
    }

    console.log('\nFound tables:', tables.map(t => t.name).join(', '));
    
    // For each table, display its structure and data
    tables.forEach(table => {
      console.log(`\n=== Table: ${table.name} ===`);
      
      // Get table structure
      db.all(`PRAGMA table_info(${table.name})`, [], (err, columns) => {
        if (err) {
          console.error(`Error getting structure for table ${table.name}:`, err);
          return;
        }
        
        console.log('\nStructure:');
        console.table(columns);
        
        // Get table data
        db.all(`SELECT * FROM ${table.name}`, [], (err, rows) => {
          if (err) {
            console.error(`Error getting data from table ${table.name}:`, err);
            return;
          }
          
          console.log('\nData:');
          if (rows.length > 0) {
            console.table(rows);
          } else {
            console.log('No data found.');
          }
          
          // If this is the last table, close the database
          if (tables.indexOf(table) === tables.length - 1) {
            db.close();
          }
        });
      });
    });
  });
}

// Start viewing the database
viewDatabase();
