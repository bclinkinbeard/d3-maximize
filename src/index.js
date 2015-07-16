function maximize (query) {
  var svg = d3.select(query + ' svg')
  var svgParent = d3.select(svg.node().parentNode)

  // create full screen container
  var container = d3.select('body')
    .append('div')
    .attr('id', 'full-screen-container')
    .style('position', 'fixed')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100%')
    .style('height', '100%')

  // create full screen overlay
  var overlay = container
    .append('div')
    .attr('id', 'full-screen-overlay')
    .style('position', 'absolute')
    .style('top', 0)
    .style('left', 0)
    .style('width', '100%')
    .style('height', '100%')
    .style('background-color', 'white')
    .style('opacity', 0.97)
    .style('pointer-events', 'none')

  var closeBtn = container
    .append('button')
    .attr('onclick', 'd3.maximize.close()')
    .style('position', 'absolute')
    .style('top', 0)
    .style('right', 0)
    .style('padding', '1em')
    .style('z-index', 1000)
    .html('X')

  var w = parseInt(svg.style('width'), 10)
  var h = parseInt(svg.style('height'), 10)
  var aspect = w / h

  svg.attr('data-container-query', query)
  svg.attr('data-position-style', svg.style('position'))
  if (!svg.attr('viewBox')) svg.attr('viewBox', '0 0 ' + w + ' ' + h)
  if (!svg.attr('preserveAspectRatio')) svg.attr('preserveAspectRatio', 'xMidYMid')

  // full screen CSS
  svg.style('position', 'absolute')

  reparent(svg, d3.select('#full-screen-container'))

  var targetW = parseInt(container.style('width'), 10)
  var targetH = parseInt(container.style('height'), 10)

  svg
    .attr('width', targetW)
    .attr('height', targetH)
}

function reparent (child, parent) {
  parent.append(function () {
    return child.remove()[0][0]
  })
}

function closeFS () {
  var svg = d3.select('#full-screen-container svg')
  var query = svg.attr('data-maximize-query')
  var vb = svg.attr('viewBox').split(' ')
  reparent(svg, d3.select(query))
  d3.select(query + ' svg')
    .attr('width', vb[2])
    .attr('height', vb[3])
    .style('position', svg.attr('data-position-style'))
  d3.select('#full-screen-container').remove()
}

maximize.close = closeFS
module.exports = maximize
