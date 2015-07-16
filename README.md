# d3-maximize

General purpose solution for maximizing D3 SVG charts

## Usage

`d3.maximize('#chart')`, assuming your chart is constructed like `d3.select('#chart').append('svg')...`.

The `d3-maximize` script must be loaded after D3 itself. The only required parameter is the query for obtaining the SVG tag's parent. 

## Options

`d3.maximize()` takes a config object as its optional second parameter. The supported options are as follows:

* **overlayClass:** CSS class to apply to the div that will overlay your entire browser window to obscure the rest of the page. The default style is a nearly opaque white background.
* **closeButtonClass:** CSS class to apply to the button for closing out of full screen mode. No default styling.
* **closeButtonHtml:** The HTML content of the close button. Defaults to a simple X.

## Example

[bl.ocks.org demo](http://bl.ocks.org/bclinkinbeard/98e891d0b2a1eebc0f7d)
[Source Gist](https://gist.github.com/bclinkinbeard/98e891d0b2a1eebc0f7d)