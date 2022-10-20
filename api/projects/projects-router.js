// Write your "projects" router here!
const express = require('express')
const router = express.Router();
const { validateId, validateProject } = require('./projects-middleware')
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get().then(projectsArray => {
        res.status(200).json(projectsArray)
    }).catch(err => {
        // res.status(500).json({message:"there was an error"})
    })
})

router.get('/:id', validateId,(req, res, next) => {
    Projects.get(req.params.id).then(project => {
        res.status(200).json(project)
    }).catch(err => {
        next(err)
    })
})

router.post('/',validateProject, (req, res, next) => {
    Projects.insert(req.body).then(project => {
        res.status(201).json(project)
    }).catch(err => {
        next(err)
    })})

router.put('/:id', validateId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body).then(project => {
        res.status(200).json(project)
    }).catch(err => {
        next(err)
    })
})

router.delete('/:id', validateId, (req, res, next) => {
    const { id } = req.params
    Projects.remove(id).then(deleted => {
        res.status(200).json()
    }).catch(err => {
        next(err)
    })
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.get(req.params.id).then(project => {
        const { actions } = project
        res.status(200).json(actions)
    }).catch(err => {
        next(err)
    })
})

module.exports = router