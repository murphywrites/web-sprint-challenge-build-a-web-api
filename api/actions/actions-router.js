// Write your "actions" router here!
const express = require('express')
const router = express.Router();
const { validateActionId, validateAction, validateProjectId } = require('../projects/projects-middleware')
const Actions = require('./actions-model')


router.get('/', (req, res) => {
    Actions.get().then(actionsArray => {
        res.status(200).json(actionsArray)
    }).catch(err => {

    })
})

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        next(err)
    })
})

router.post('/', validateAction, validateProjectId, (req, res, next) => {
    Actions.insert(req.body).then(action => {
        res.status(201).json(action)
    }).catch(err => {
        next(err)
    })
})

router.put('/:id', validateActionId, validateAction, validateProjectId, (req, res, next) => {
    Actions.update(req.params.id, req.body).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        next(err)
    })
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id).then(
        res.status(200).json()
    )
})

module.exports = router