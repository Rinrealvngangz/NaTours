const Tour = require('../models/tourModel');
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTour = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.limit = '5';
  req.query.fields = 'name,price,difficulty,ratingsAverage,summary';
  next();
};

exports.getallTour = catchAsync(async (req, res, next) => {
  //EXCUTE QUERY
  const feature = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginations();
  const tours = await feature.query;
  //const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.UpdateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('No tour  found with that id', 404));
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
    // { $match: { _id: { $ne: 'EASY' } } },
  ]);
  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const years = req.params.year;
  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },

    {
      $match: {
        startDates: { $gte: new Date(`${years}-1-1`), $lte: new Date(`${years}-12-31`) },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStats: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    { $project: { _id: 0 } },
    {
      $sort: { numTourStats: -1 },
    },
    {
      $limit: 6,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: plan,
  });
});
