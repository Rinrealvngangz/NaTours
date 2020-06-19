const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No docment found with that id', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document  found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;
    //Tour.findOne({ _id: req.params.id });
    if (!doc) {
      return next(new AppError('No tour  found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: doc,
      },
    });
  });
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //To allow  for nested  GET  reviews  on Tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    //EXCUTE QUERY
    const feature = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginations();
    const doc = await feature.query;
    //const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });