const mongodbClient = require('../../db');

module.exports = async (req, res) => {
  const { startDate, endDate, minCount, maxCount } = req.body || {};

  const aggregation = [];

  // add date filter
  if (startDate || endDate) {
    const dateFilter = { createdAt: {} };

    if (startDate) {
      dateFilter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      dateFilter.createdAt.$lte = new Date(endDate);
    }

    aggregation.push({ $match: dateFilter });
  }

  // calculate total count
  aggregation.push({
    $addFields: {
      totalCount: { $sum: '$counts' },
    },
  });

  // add total count filter
  if (minCount || maxCount) {
    const totalCountFilter = { totalCount: {} };

    if (minCount) {
      totalCountFilter.totalCount.$gte = minCount;
    }

    if (maxCount) {
      totalCountFilter.totalCount.$lte = maxCount;
    }

    aggregation.push({ $match: totalCountFilter });
  }

  // projection
  aggregation.push({
    $project: {
      _id       : 0,
      key       : 1,
      createdAt : 1,
      totalCount: 1,
    },
  });

  const records = await mongodbClient.db.collection('records')
    .aggregate(aggregation)
    .toArray();

  res.status(200).json({
    records,
    code: 0,
    msg : 'Success',
  });
};
