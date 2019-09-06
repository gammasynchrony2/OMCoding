const pg = require('pg');
// const format = require('pg-format');
const pool = new pg.Pool({
    user: '4cylinder',
    host: '127.0.0.1',
    database: 'testDatabase'});

pool.query("INSERT INTO myCars (year, make, model, engine_size, transmission) VALUES(1976, 'Volkswagen', 'Beetle', '1.6 L', 'Manual')", (err, res) => {
    if (err) {
        console.log(err);
    }
    else{
        console.log(res);
    }
    pool.end();
});