class APIFeatures {
  constructor(query, querytString) {
    this.query = query;
    this.querytString = querytString;
  }

  filter() {
    //BUILD QUERY
    //1A) Filtering

    const queryObj = { ...this.querytString }; // truyền yêu cầu vào obj dùng three dot es6
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //mảng gồm những yêu cầu nếu có
    excludedFields.forEach((el) => delete queryObj[el]); //lặp những phần tử trong mảng nếu có trong obj của

    //quertObj thì xóa element đó
    // 1B) Advanced filtering
    let querytStr = JSON.stringify(queryObj);
    querytStr = querytStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(querytStr));
    return this;
    //let query = Tour.find(JSON.parse(querytStr));
  }

  sort() {
    if (this.querytString.sort) {
      const sortBy = this.querytString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createAt');
    }
    return this;
  }

  limitFields() {
    if (this.querytString.fields) {
      const fields = this.querytString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginations() {
    // page =2;limit =3
    const page = this.querytString.page * 1 || 1;
    const limit = this.querytString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
