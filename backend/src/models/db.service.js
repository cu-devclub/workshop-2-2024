const dbConfig = require('../configs/db.config');
const Database = require('better-sqlite3');
const database = new Database(dbConfig.name);

/**
 * Executes a SQL query with parameters.
 * @param {string} sql - The SQL query to execute.
 * @param {Array} params - An array of parameters for the query.
 * @returns {Array|Object|null} The query results or null for non-select queries.
 */
function query(sql, params = []) {
  const stmt = database.prepare(sql);

  if (sql.trim().toUpperCase().startsWith('SELECT')) {
    if (sql.includes('LIMIT 1')) {
      return stmt.get(params);
    }
    return stmt.all(params);
  } else {
    return stmt.run(params);
  }
}

module.exports = {
  query
}


// const mysql = require('mysql2/promise');
// const dbConfig = require('../configs/db.config');

// const pool = mysql.createPool(dbConfig);

// async function query(sql, params) {
//   const MAX_RETRIES = 3;
//   let attempts = 0;

//   while (attempts < MAX_RETRIES) {
//     try {
//       const [results, ] = await pool.execute(sql, params);
//       return results;

//     } catch (error) {
//       attempts++;
//       if (isTransientError(error) && attempts < MAX_RETRIES) {
//         console.warn(`Query failed, attempt ${attempts} of ${MAX_RETRIES}. Retrying...`);
//       } else {
//         console.error("Query failed:", error.message);
//         throw error;
//       }
//     }
//   }
// }

// function isTransientError(error) {
//   const transientErrorCodes = [
//     'PROTOCOL_CONNECTION_LOST',
//     'ECONNRESET',
//     'ETIMEDOUT',
//     'EPIPE',
//     'ER_LOCK_DEADLOCK'
//   ];
//   return transientErrorCodes.includes(error.code);
// }

// module.exports = {
//   query
// };