'use strict';

const async = require('async');

const db = require('./config');

// seed users table
let query; 
let userId;
let credentialId;
let scheduleOneId;
let scheduleTwoId;

async.autoInject({
  user: (cb) => {
    query = `INSERT INTO users(username, email, phone) VALUES('bshelor', 'bshelor24@gmail.com', '3176399465') RETURNING 'id';`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }
    
      query = `SELECT id FROM users where username = 'bshelor';`;
      db.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        userId = results.rows[0].id;
        cb();
      });
    })
  },
  venmoCredentials: (user, cb) => {
    query = `INSERT INTO venmo_credentials("user_id", "username", "password", "access_token", "active") VALUES(E'${userId}', 'bshelor', 'testpassword', 'testaccesstoken', TRUE);`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      query = `SELECT id FROM venmo_credentials WHERE user_id = '${userId}';`;
      db.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        credentialId = results.rows[0].id;
        cb();
      });
    });
  },
  venmoAccountInfo: (venmoCredentials, cb) => {
    query = `INSERT INTO "public"."venmo_account_info"("credentials_id", "external_account_id", "email", "phone")
              VALUES('${credentialId}', 'N68FHKL', 'dunkman4@yahoo.com', '3176399465');`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      cb();
    });
  },
  venmoFriends: (venmoAccountInfo, cb) => {
    query = `INSERT INTO "public"."venmo_friends"("user_id", "username")
              VALUES('${userId}', 'cshelor');`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      const secondInsertQuery = `INSERT INTO "public"."venmo_friends"("user_id", "username")
              VALUES('${userId}', 'nwilloughby');`;
      db.query(secondInsertQuery, (error, results) => {
        if (error) {
          throw error;
        }
        cb();
      });
    });
  },
  scheduleOne: (venmoFriends, cb) => {
    query = `INSERT INTO "public"."schedules"("user_id", "type", "amount", "recurrence", "next_occurrence", "last_occurrence", "start", "repeat_days")
            VALUES('${userId}', 'payment', 36, 'weekly', '2022-01-05', '2022-04-05', 'immediately', 'Wednesday');`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      query = `SELECT id FROM schedules where user_id = '${userId}' and type = 'payment';`;
      db.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        scheduleOneId = results.rows[0].id;
        cb();
      });
    });
  },
  scheduleTwo: (scheduleOne, cb) => {
    query = `INSERT INTO "public"."schedules"("user_id", "type", "amount", "recurrence", "next_occurrence", "last_occurrence", "start", "repeat_days")
            VALUES('${userId}', 'request', 48, 'monthly', '2022-01-01', '2023-01-01', 'first occurrence', '29');`;
    db.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      query = `SELECT id FROM schedules where user_id = '${userId}' and type = 'request';`;
      db.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        scheduleTwoId = results.rows[0].id;
        cb();
      });
    });
  },
  scheduleExecutions: (scheduleTwo, cb) => {
    query = `INSERT INTO "public"."schedule_executions"("schedule_id", "status", "executed_at", "details")
              VALUES('${scheduleOneId}', 'Failed', '2021-12-28 00:00:00', '{"message": "Failed due to token expiration"}');`;
    db.query(query, (error, results) => {
      if (error) {
        console.log("🚀 ~ file: seed.js ~ line 116 ~ db.query ~ error", error)
        throw error;
      }

      query = `INSERT INTO "public"."schedule_executions"("schedule_id", "status", "executed_at", "details")
              VALUES('${scheduleTwoId}', 'Success', '2021-12-27 00:00:00', '{"message": "Successfully paid 2 people"}');`;
      db.query(query, (error, results) => {
        if (error) {
          console.log("🚀 ~ file: seed.js ~ line 124 ~ db.query ~ error", error)
          throw error;
        }
        cb();
      });
    });
  }
}, (err, results) => {
  if (err) {
    console.log("Errored: ", err);
  } else {
    console.log('Seeded small amount of demo data into database.');
    process.exit(0);
  }
});


