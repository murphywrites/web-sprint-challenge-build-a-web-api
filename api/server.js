const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')
server.use(express.json())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.use((err, req, res, next) => {
    const { message, stack, status = 500 } = err
    const response = { message }
    if (process.env.NODE_ENV !== 'production' && stack) {
        response.stack = stack
    }
    res.status(status).json(response)
})
module.exports = server;
