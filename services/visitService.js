const SiteVisit = require('../models/SiteVisit');

async function getMonthlyVisits(siteName) {
  const visits = await SiteVisit.aggregate([
    { $match: { siteName } },
    {
      $group: {
        _id: { $month: '$month' },
        count: { $sum: '$visitCount' }
      }
    },
    {
      $project: {
        _id: 0,
        month: {
          $arrayElemAt: [
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            { $subtract: ['$_id', 1] }
          ]
        },
        count: 1
      }
    },
    { $sort: { month: 1 } }
  ]);

  return visits;
}

module.exports = { getMonthlyVisits };

