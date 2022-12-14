'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('office_queue_manager.db', err => { if (err) throw err; });

exports.insertTicket = (ID_Counter, ST_ID, TDate, State) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Ticket(ID_Counter, ST_ID, Date, State) VALUES (?,?,?,?)";
        db.run(sql, [ID_Counter, ST_ID, TDate, State], function (err) {
            if (err) {
                reject(err);
            } else {
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

exports.getTicket = (ST_ID) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID FROM Ticket WHERE ST_ID = ? AND State = 0';
        db.all(sql, [ST_ID], (err, rows) => {
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


exports.modifyTicket = (ID, ST_ID, ID_Counter, State) => {
    return new Promise((resolve, reject) => {
        let newID_Counter = ID_Counter
        let newState = State === undefined ? 1 : State
        const sql1 = 'SELECT COUNT(*) AS count FROM Ticket WHERE ID = ?';
        db.get(sql1, [ID], (err, r) => {
            if (err) {
                reject(err)
            }
            else if (r.count === 0) {
                reject(new Error("ID not found"))
            }
            else {
                const sql2 = 'UPDATE Ticket SET ID_Counter = ?, State = ? WHERE ID = ?';
                db.run(sql2, [newID_Counter, newState, ID], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            }
        });
    });
}

exports.getTicketbyServicesbyID = (ID) => {
    return new Promise((resolve, reject) => {
        let state = 0;
        const sql = 'SELECT COUNT(*) as C FROM Ticket WHERE ST_ID = ? AND State = ?';
        db.all(sql, [ID, state], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows[0].C);
        });
    });

}
