'use strict'

const Antl = use('Antl')

class Project {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  get messages () {
    Antl.list('validation')
  }
}

module.exports = Project
