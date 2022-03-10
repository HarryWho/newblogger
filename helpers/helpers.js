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
  }
}