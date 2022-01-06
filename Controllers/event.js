const { signRefreshToken } = require("../Middleware/authToken");
const event = require("../Schema/event");

const events = async (req, res) => {
  try {
    const {
      eventTitle,
      eventDescription,
      dateString,
      startTime,
      endTime,
      startDate,
      endDate,
    } = req.body;
    const eventObject = {
      userId: req.user.sub,
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      dateString: dateString,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
    };
    await event.create(eventObject);
    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
const updateEvents = async (req, res) => {
  try {
    const { eventTitle, eventDescription, startTime, endTime, endDate } =
      req.body;
    const eventObject = {
      eventTitle: eventTitle,
      eventDescription: eventDescription,
      startTime: startTime,
      endTime: endTime,
      endDate: endDate,
    };
    await event.findByIdAndUpdate(req.params.id, { $set: eventObject });
    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const allEvents = event.find({ userId: req.user.sub });
    res.status(200).json({ status: 200, message: allEvents });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await event.findByIdAndDelete(req.params.id);
    const token = await signRefreshToken(req.user.sub);
    res.status(200).json({ status: 200, message: token });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { events, updateEvents, getAllEvent, deleteEvent };