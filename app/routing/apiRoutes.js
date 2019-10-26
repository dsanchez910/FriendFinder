const friendMatch = require('../data/friends.js');


module.exports = function(app) {
  app.get('/api/friends', function (req, res) {
    res.json(friendMatch);
  });
  app.post('/api/friends', function (req, res) {
    const newFriend = req.body;
    for(var i = 0; i < newFriend.scores.length; i++) {
      if(newFriend.scores[i] == "1 (Yes)") {

        newFriend.scores[i] = 1;
      } else if(newFriend.scores[i] == "3 (No)") {

        newFriend.scores[i] = 3;
      } else {

        newFriend.scores[i] = parseInt(newFriend.scores[i]);
      }
    }
    
    const comparisonArray = [];

    for(const i = 0; i < friendMatch.length; i++) {
      const comparedFriend = friendMatch[i];
      const totalDifference = 0;
      
      for(const k = 0; k < comparedFriend.scores.length; k++) {
        const differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
        totalDifference += differenceOneScore;
      }

      comparisonArray[i] = totalDifference;
    }

    const bestFriendNum = comparisonArray[0];
    const bestFriendI = 0;

    for(const i = 1; i < comparisonArray.length; i++) {
      if(comparisonArray[i] < bestFriendNum) {
        bestFriendNum = comparisonArray[i];
        bestFriendI = i;
      }
    }
    friendMatch.push(newFriend);
    res.json(friendMatch[bestFriendI]);
  });
};