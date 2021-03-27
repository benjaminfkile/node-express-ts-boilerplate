import createConnectionPool, { sql } from '@databases/pg';
import { link } from 'fs';
const { DATABASE_URL } = require('../config')
const db = createConnectionPool(DATABASE_URL);
const expressAllRouter = require('express')
const allRouter = expressAllRouter.Router()
const jsonParser = require('express').json()

allRouter
    .route('/')
    .get((req: any, res: any, next: any) => {
        async function run() {
            const results = await db.query(sql`SELECT * from notifications;`);
            res.json(results)
        }
        run().catch((err) => {
            // process.exit(1);
            res.send('oop')
        });
    })

allRouter
    .route('/post-dummies')
    .post(jsonParser, (req: any, res: any, next: any) => {

        const category = req.body.category
        const createdBy = req.body.createdBy
        const deletedBy = req.body.deletedBy
        const deletedDateUtc = req.body.deletedDateUtc
        const displayAtLogin = req.body.displayAtLogin
        const expires = req.body.expires
        const id = req.body.id
        const linkTo = req.body.linkTo
        const minAppVersion = req.body.minAppVersion
        const notificationState = req.body.notificationState
        const parentId = req.body.parentId
        const recipientId = req.body.recipientId
        const sendToRoles = req.body.sendToRoles
        const text = req.body.text
        const timestamp = req.body.timestamp
        const title = req.body.title
        const type = req.body.type

        async function run() {
            await db.query(sql`INSERT INTO notifications(category,createdby,deletedby,deleteddateutc,displayatlogin,expires,id,linkto,minappversion,notificationstate,parentid,recipientid,sendtoroles,text,timestamp,title,type)
                values(${category}, ${createdBy} , ${deletedBy}, ${deletedDateUtc}, ${displayAtLogin}, ${expires}, ${id}, ${linkTo}, ${minAppVersion}, ${notificationState}, ${parentId}, ${recipientId}, ${sendToRoles}, ${text}, ${timestamp}, ${title}, ${type});`)
            res.send("finished")
        }
        run().catch((err) => {
            res.send('oop')
        });
    })



module.exports = allRouter