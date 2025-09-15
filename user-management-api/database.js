// database.js
const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "users.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    throw err;
  } else {
    console.log("✅ Connected to the SQLite database.");

    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        company TEXT,
        street TEXT,
        city TEXT,
        zipcode TEXT,
        lat TEXT,
        lng TEXT
      )`;

    db.run(sql, (err) => {
      if (err) {
        console.error("❌ Error creating users table:", err.message);
      } else {
        console.log("✅ Users table created or already exists.");

        // --- Seed multiple users if table is empty ---
        const checkSql = `SELECT COUNT(*) AS count FROM users`;
        db.get(checkSql, (err, row) => {
          if (err) {
            console.error(err.message);
          } else if (row.count === 0) {
            const users = [
              ['John Doe', 'john@example.com', '1234567890', 'Acme Corp', '123 Main St', 'New York', '10001', '40.7128', '-74.0060'],
              ['Jane Smith', 'jane@example.com', '9876543210', 'Globex Inc', '456 Elm St', 'Los Angeles', '90001', '34.0522', '-118.2437'],
              ['Alice Johnson', 'alice@example.com', '5555555555', 'Initech', '789 Oak St', 'Chicago', '60601', '41.8781', '-87.6298'],
              ['Bob Williams', 'bob@example.com', '4444444444', 'Umbrella Corp', '321 Pine St', 'Houston', '77001', '29.7604', '-95.3698'],
              ['Charlie Brown', 'charlie@example.com', '3333333333', 'Soylent Corp', '654 Cedar St', 'Miami', '33101', '25.7617', '-80.1918'],
              ['David Wilson', 'david@example.com', '2222222222', 'Stark Industries', '987 Maple St', 'San Francisco', '94101', '37.7749', '-122.4194'],
              ['Emma Davis', 'emma@example.com', '1111111111', 'Wayne Enterprises', '321 Birch St', 'Seattle', '98101', '47.6062', '-122.3321'],
              ['Frank Miller', 'frank@example.com', '7777777777', 'Oscorp', '123 Spruce St', 'Boston', '02101', '42.3601', '-71.0589'],
              ['Grace Lee', 'grace@example.com', '8888888888', 'Hooli', '456 Walnut St', 'Austin', '73301', '30.2672', '-97.7431'],
              ['Henry Moore', 'henry@example.com', '9999999999', 'Vandelay Industries', '789 Chestnut St', 'Denver', '80201', '39.7392', '-104.9903'],
              ['Isabella Taylor', 'isabella@example.com', '6666666666', 'Wonka Industries', '321 Ash St', 'Philadelphia', '19019', '39.9526', '-75.1652'],
              ['Jack Anderson', 'jack@example.com', '5555555555', 'Tyrell Corp', '654 Poplar St', 'Phoenix', '85001', '33.4484', '-112.0740'],
              ['Karen Thomas', 'karen@example.com', '4444444444', 'Cyberdyne Systems', '987 Pine St', 'San Diego', '92101', '32.7157', '-117.1611'],
              ['Leo Harris', 'leo@example.com', '3333333333', 'Massive Dynamic', '123 Willow St', 'Dallas', '75201', '32.7767', '-96.7970'],
              ['Mia Martin', 'mia@example.com', '2222222222', 'Clampett Oil', '456 Fir St', 'Atlanta', '30301', '33.7490', '-84.3880'],
              ['Nathan White', 'nathan@example.com', '1111111111', 'InGen', '789 Pinecone St', 'Orlando', '32801', '28.5383', '-81.3792'],
              ['Olivia King', 'olivia@example.com', '7777777777', 'Monarch Solutions', '321 Redwood St', 'Portland', '97201', '45.5051', '-122.6750'],
              ['Paul Scott', 'paul@example.com', '8888888888', 'Soylent Corp', '654 Cypress St', 'Las Vegas', '88901', '36.1699', '-115.1398'],
              ['Quinn Baker', 'quinn@example.com', '9999999999', 'Virtucon', '987 Sequoia St', 'Detroit', '48201', '42.3314', '-83.0458'],
              ['Rachel Adams', 'rachel@example.com', '6666666666', 'Gringotts', '123 Magnolia St', 'Minneapolis', '55401', '44.9778', '-93.2650']
            ];

            const insert = `
              INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            users.forEach(user => {
              db.run(insert, user, (err) => {
                if (err) console.error("❌ Error inserting user:", err.message);
              });
            });

            console.log("✅ 20 seed users inserted successfully.");
          }
        });
        // --- End of seed ---
      }
    });
  }
});

module.exports = db;
