'use strict';

const sqlite = require('sqlite3');
const {Queue} = require('../models/queueModel');

const db = new sqlite.Database('office_queue_manager.db', err => { if (err) throw err;});

exports.insertTicket = (ID_Counter, ST_ID, TDate, State) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Ticket(ID_Counter, ST_ID, Date, State) VALUES (?,?,?,?)";
        db.run(sql, [ ID_Counter, ST_ID, TDate, State], function(err) {
            if(err){
                reject(err);
                return;
            }else{
                resolve(this.lastId);
            }
        });
    });
}

exports.getTicketbyCounter = (ID_Counter) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID FROM Ticket WHERE ID_Counter = ? AND State = "OPEN"';
        db.all(sql, [ID_Counter], (err, rows) => {
            if (err) {
                reject(err);
            }
            const counters = rows.map((r) => (
                {   
                    ID: r.ID, 
                }
            ));
            resolve(counters[0]);
        });
    });

}

exports.getTicketbyServicesbyID = (ID) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*) as C FROM Ticket WHERE ST_ID = ? AND State = "OPEN"';
        db.all(sql, [ID], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows[0].C);
        });
    });

}