import Filters from 'nyc-lib/nyc/ol/Filters'
import Choice from 'nyc-lib/nyc/Choice'
import Collapsible from 'nyc-lib/nyc/Collapsible'

Filters.prototype.addFilter = function(choices) {
  const target = $('<div class="competency"></div>')
  target.insertAfter($('.filter-1'))
  const choice = new Choice({
    target: $('<div class="competency-choices"></div>'),
    choices: choices
  })
  const collapsible = new Collapsible({
    target: target,
    title: 'Cultural competencies',
    content: choice.getContainer()
  })
  choice.on('change', $.proxy(this.filter, this))
  this.choiceControls.push(choice)
}