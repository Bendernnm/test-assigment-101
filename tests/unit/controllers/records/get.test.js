jest.mock('../../../../src/db');

const mongodbClient = require('../../../../src/db');

const { get: getRecords } = require('../../../../src/controllers/records');

let req;
let res;
let records;
let spyAggregate;

beforeEach(() => {
  req = {};
  res = {
    status: jest.fn(() => res),
    json  : jest.fn(),
  };
  records = [
    {
      key       : 'UdVAhvel',
      createdAt : '2016-10-29T01:57:38.537Z',
      totalCount: 499,
    },
    {
      key       : 'GbAmjUNH',
      createdAt : '2016-09-12T18:40:33.614Z',
      totalCount: 406,
    },
  ];

  mongodbClient.toArray.mockResolvedValueOnce(records);

  spyAggregate = jest.spyOn(mongodbClient, 'aggregate')
      .mockImplementationOnce(() => mongodbClient);
});

it('should return records without filters', async () => {
  await getRecords(req, res);

  expect(spyAggregate).toHaveBeenCalledWith([
    {
      $addFields: {
        totalCount: { $sum: '$counts' },
      },
    },
    {
      $project: {
        _id       : 0,
        key       : 1,
        createdAt : 1,
        totalCount: 1,
      },
    },
  ]);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    records,
    code: 0,
    msg : 'Success',
  });
});

it('should return empty records, when db is clear', async () => {
  records = [];

  mongodbClient.toArray.mockReset().mockResolvedValueOnce(records);

  await getRecords(req, res);

  expect(res.json).toHaveBeenCalledWith({
    records,
    code: 0,
    msg : 'Success',
  });
});

describe('Get records with filters', () => {
  beforeEach(() => {
    req.body = {};
  });

  it('should return records, after filtering by date', async () => {
    req.body.startDate = '2016-07-25';
    req.body.endDate = '2017-01-01';

    await getRecords(req, res);

    expect(spyAggregate).toHaveBeenCalledWith([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.startDate),
            $lte: new Date(req.body.endDate),
          },
        },
      },
      {
        $addFields: {
          totalCount: { $sum: '$counts' },
        },
      },
      {
        $project: {
          _id       : 0,
          key       : 1,
          createdAt : 1,
          totalCount: 1,
        },
      },
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      records,
      code: 0,
      msg : 'Success',
    });
  });

  it('should return records, after filtering by total count', async () => {
    req.body.minCount = 300;
    req.body.maxCount = 520;

    await getRecords(req, res);

    expect(spyAggregate).toHaveBeenCalledWith([
      {
        $addFields: {
          totalCount: { $sum: '$counts' },
        },
      },
      {
        $match: {
          totalCount: {
            $gte: req.body.minCount,
            $lte: req.body.maxCount,
          },
        },
      },
      {
        $project: {
          _id       : 0,
          key       : 1,
          createdAt : 1,
          totalCount: 1,
        },
      },
    ]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      records,
      code: 0,
      msg : 'Success',
    });
  });

  describe('Filter has only one parameter', () => {
    it('should return records, after filtering by date without endDate',
        async () => {
          req.body.startDate = '2016-07-25';

          await getRecords(req, res);

          expect(spyAggregate).toHaveBeenCalledWith([
            {
              $match: {
                createdAt: {
                  $gte: new Date(req.body.startDate),
                },
              },
            },
            {
              $addFields: {
                totalCount: { $sum: '$counts' },
              },
            },
            {
              $project: {
                _id       : 0,
                key       : 1,
                createdAt : 1,
                totalCount: 1,
              },
            },
          ]);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            records,
            code: 0,
            msg : 'Success',
          });
        });

    it('should return records, after filtering by date without startDate',
        async () => {
          req.body.endDate = '2017-01-01';

          await getRecords(req, res);

          expect(spyAggregate).toHaveBeenCalledWith([
            {
              $match: {
                createdAt: {
                  $lte: new Date(req.body.endDate),
                },
              },
            },
            {
              $addFields: {
                totalCount: { $sum: '$counts' },
              },
            },
            {
              $project: {
                _id       : 0,
                key       : 1,
                createdAt : 1,
                totalCount: 1,
              },
            },
          ]);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({
            records,
            code: 0,
            msg : 'Success',
          });
        });

    it('should return records, after filtering by total count without min count', async () => {
      req.body.maxCount = 520;

      await getRecords(req, res);

      expect(spyAggregate).toHaveBeenCalledWith([
        {
          $addFields: {
            totalCount: { $sum: '$counts' },
          },
        },
        {
          $match: {
            totalCount: {
              $lte: req.body.maxCount,
            },
          },
        },
        {
          $project: {
            _id       : 0,
            key       : 1,
            createdAt : 1,
            totalCount: 1,
          },
        },
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        records,
        code: 0,
        msg : 'Success',
      });
    });


    it('should return records, after filtering by total count without max count', async () => {
      req.body.minCount = 300;

      await getRecords(req, res);

      expect(spyAggregate).toHaveBeenCalledWith([
        {
          $addFields: {
            totalCount: { $sum: '$counts' },
          },
        },
        {
          $match: {
            totalCount: {
              $gte: req.body.minCount,
            },
          },
        },
        {
          $project: {
            _id       : 0,
            key       : 1,
            createdAt : 1,
            totalCount: 1,
          },
        },
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        records,
        code: 0,
        msg : 'Success',
      });
    });
  });
});
