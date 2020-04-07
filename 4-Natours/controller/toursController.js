const Tour = require('../models/tourModel');
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getallTour = async (req, res) => {
  try {
    console.log(req.query);

    //BUILD QUERY
    //1) Filtering
    const queryObj = { ...req.query }; // truyền yêu cầu vào obj dùng three dot es6
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //mảng gồm những yêu cầu nếu có
    excludedFields.forEach((el) => delete queryObj[el]); //lặp những phần tử trong mảng nếu có trong obj của
    //quertObj thì xóa element đó
    // 2) Advanced filtering
    let querytStr = JSON.stringify(queryObj);
    querytStr = querytStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Tour.find(JSON.parse(querytStr));

    //EXCUTE QUERY
    const tours = await query;
    //const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err, //'Invalid data sent',
    });
  }
};
exports.UpdateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
