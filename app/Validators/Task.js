'use strict'

const Antl = use('Antl')

class Task {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      due_date: 'date'
    }
  }

  get messages () {
    Antl.list('validation')
  }
}

module.exports = Task
