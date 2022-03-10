const moment = require('moment')

module.exports = {
  dateFormat: function(date, format) {
    return moment(date).format(format)
  },
  select: function(selected, options) {
    return options
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      )
  },
  stripTags: function(input) {
    return input.replace(/<(.|\n)*?>/ig, "")
  },
  truncate: function(str, n, storyId, useWordBoundary = true) {
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n - 1); // the original check
    return (useWordBoundary ?
      subString.substr(0, subString.lastIndexOf(" ")) :
      subString) + "&hellip;&nbsp<a href='/stories/show/" + storyId + "'>Read More</a>";
  },
  addButton: function(storyId) {
    return "<a href='/stories/edit/" + storyId + "' class='btn btn-primary btn-sm rounded-circle position-absolute top-0 end-0 translate-middle'><i class='fa fa-edit'></i></a>"
  }
}