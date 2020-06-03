'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   */
  async index ({ request }) {
    const { page } = request.get()

    const projects = await Project.query()
      .with('user').paginate(page)

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    project.merge(data)
    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   */
  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
