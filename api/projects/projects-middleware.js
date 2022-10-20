// add middlewares here related to projects
const Projects = require('../projects/projects-model')
const Actions = require('../actions/actions-model')
const yup = require('yup')

const projectSchema = yup.object().shape({
    name: yup.string().typeError('must be a string')
    .required('name is required').trim(),
    description: yup.string().typeError('must be a string')
    .required('description is required').trim(),
    completed: yup.boolean().typeError('must be true or false').required("completed required")
})

const actionSchema = yup.object().shape({
    project_id: yup.number().typeError('must be a number').required('project id is required'),
    description: yup.string().typeError('must be a string')
    .required('description is required').max(128, "max length 128 characters").trim(),
    notes: yup.string().typeError('must be a string').required("notes required"),
    completed: yup.boolean().typeError('must be true or false').required("completed required")
})

//validate credentials
const validateProject = (req, res, next) => {
    console.log(req.body)
projectSchema.validate(req.body, { stripUnknown: true}).then(validated => {
    req.project = validated

    next()
}
).catch(err => {
    next({ status: 400, message: err.message})
})
}

const validateId = (req, res, next) => {
    const { id } = req.params;
    Projects.get(id).then(project => {
        project ? next() : res.status(404).json({message: "Project with that ID not found"})
    }).catch(err => {
        next(err)
    }
    )
}

const validateProjectId = (req, res, next) => {
    const id = req.body.project_id;
    Projects.get(id).then(project => {
        project ? next() : res.status(404).json({message: "Project with that ID not found"})
    }).catch(err => {
        next(err)
    }
    )
}

const validateActionId = (req, res, next) => {
    const { id } = req.params;
    Actions.get(id).then(action => {
        action ? next() : res.status(404).json({message: "Action with that ID not found"})
    }).catch(err => {
        next(err)
    }
    )
}

//validate credentials
const validateAction = (req, res, next) => {
actionSchema.validate(req.body, { stripUnknown: true}).then(validated => {
    req.action = validated

    next()
}
).catch(err => {
    next({ status: 400, message: err.message})
})
}

module.exports = {validateId, validateProject, validateActionId, validateAction, validateProjectId}