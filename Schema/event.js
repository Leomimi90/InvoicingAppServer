const { Schema, model } = require('mongoose')

const Events = new Schema({
  userId: String,
  eventTitle: String,
  eventDescription: String,
  dateString: String,
  startTime: String, endTime: String, startDate: String, endDate: String

},
  {
    timestamps: true,

  }
)

module.exports = model('Events', Events)