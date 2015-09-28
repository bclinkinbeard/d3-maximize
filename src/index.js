var d3 = window.d3

var containerId = 'd3-maximize-container'
var overlayId = 'd3-maximize-overlay'

function maximize (query, config) {
  var svg = d3.select(query + ' svg')

  // create full screen container
  var container = d3.select('body')
    .append('div')
    .attr('id', containerId)
    .style('position', 'fixed')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100%')
    .style('height', '100%')
    .style('z-index', '1000')

  // create full screen overlay
  var overlay = container
    .append('div')
    .attr('id', overlayId)
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100%')
    .style('height', '100%')
    .style('pointer-events', 'none')

  if (config && config.overlayClass) {
    overlay
      .attr('class', config.overlayClass)
  } else {
    overlay
      .style('background-color', 'white')
      .style('opacity', 0.97)
  }

  var closeBtn = container
    .append('button')
    .attr('onclick', 'd3.maximize.close()')
    .style('position', 'absolute')
    .style('top', 0)
    .style('right', 0)
    .style('padding', '1em')
    .style('z-index', 1000)

  if (config && config.closeButtonHtml) {
    closeBtn.html(config.closeButtonHtml)
  } else {
    closeBtn.html('X')
  }

  if (config && config.closeButtonClass) {
    closeBtn.attr('class', config.closeButtonClass)
  }

  var w = parseInt(svg.style('width'), 10)
  var h = parseInt(svg.style('height'), 10)

  svg.attr('data-container-query', query)
  svg.attr('data-position-style', svg.style('position'))
  if (!svg.attr('viewBox')) svg.attr('viewBox', '0 0 ' + w + ' ' + h)
  if (!svg.attr('preserveAspectRatio')) svg.attr('preserveAspectRatio', 'xMidYMid')

  reparent(svg, d3.select('#' + containerId))
  svg.style('position', 'absolute')

  svg
    .attr('width', parseInt(container.style('width'), 10))
    .attr('height', parseInt(container.style('height'), 10))
}

function reparent (child, parent) {
  parent.append(function () {
    return child.remove()[0][0]
  })
}

function close () {
  var svg = d3.select('#' + containerId + ' svg')
  var query = svg.attr('data-container-query')
  var vb = svg.attr('viewBox').split(' ')
  reparent(svg, d3.select(query))
  d3.select(query + ' svg')
    .attr('width', vb[2])
    .attr('height', vb[3])
    .style('position', svg.attr('data-position-style'))
  d3.select('#' + containerId).remove()
}

maximize.close = close
module.exports = maximize
