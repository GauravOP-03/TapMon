const mongoose = require("mongoose");
const metricSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  temperature: {
    type: Number,
  },
  heartRate: {
    type: Number,
},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Metric = mongoose.model("Metric", metricSchema);

module.exports = Metric;