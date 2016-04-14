"use strict";

var advApp = angular.module('advApp', ['ui.bootstrap', 'ngAnimate']),
illionsArr = ['', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion', ' Sextillion', ' Septillion', ' Octillion', ' Nonillion', ' Decillion', ' Undecillion', ' Duodecillion', ' Tredecillion', ' Quattuordecillion', ' Quindecillion', ' Sexdecillion', ' Septendecillion', ' Octodecillion', ' Novemdecillion', ' Vigintillion', ' Unvigintillion', ' Duovigintillion', ' Tresvigintillion', ' Quattuorvigintillion', ' Quinvigintillion', ' Sexvigintillion', ' Septenvigintillion', ' Octovigintillion', ' Novemvigintillion', ' Trigintillion', ' Untrigintillion', ' Duotrigintillion', ' Tretrigintillion', ' Quattuortrigintillion', ' Quintrigintillion', ' Sextrigintillion', ' Septentrigintillion', ' Octotrigintillion', ' Novemtrigintillion', ' Quadragintillion', ' Unquadragintillion', ' Duoquadragintillion', ' Trequadragintillion', ' Quattuorquadragintillion', ' Quinquadragintillion', ' Sexquadragintillion', ' Septquadragintillion', ' Octoquadragintillion', ' Novemquadragintillion', ' Quinquagintillion', ' Unquinquagintillion', ' Duoquinquagintillion', ' Trequinquagintillion', ' Quattuorquinquagintillion', ' Quinquinquagintillion', ' Sexquinquagintillion', ' Septquinquagintillion', ' Octoquinquagintillion', ' Novemquinquagintillion', ' Sexagintillion', ' Unsexagintillion', ' Duosexagintillion', ' Tresexagintillion', ' Quattuorsexagintillion', ' Quinsexagintillion', ' Sexsexagintillion', ' Septsexagintillion', ' Octosexagintillion', ' Novemsexagintillion', ' Septuagintillion', ' Unseptuagintillion', ' Duoseptuagintillion', ' Treseptuagintillion', ' Quattuorseptuagintillion', ' Quinseptuagintillion', ' Sexseptuagintillion', ' Septseptuagintillion', ' Octoseptuagintillion', ' Novemseptuagintillion', ' Octogintillion', ' Unoctogintillion', ' Duooctogintillion', ' Treoctogintillion', ' Quattuoroctogintillion', ' Quinoctogintillion', ' Sexoctogintillion', ' Septoctogintillion', ' Octooctogintillion', ' Novemoctogintillion', ' Nonagintillion', ' Unnonagintillion', ' Duononagintillion', ' Trenonagintillion', ' Quattuornonagintillion', ' Quinnonagintillion', ' Sexnonagintillion', ' Septnonagintillion', ' Onctononagintillion', ' Novemnonagintillion', ' Centillion', ' Uncentillion'];

function numFilter(input, raw) {
  var out = "",
  mCount = 0,
  e = 6;
  if (input === Infinity) {
    return "Infinity";
  } else if (input !== null) {
    if (!raw) {
      while (input >= Number('1e+' + e)) {
        e += 3;
        mCount++;
      }
      if (e !== 6) {
        e -= 3;
        input /= Number('1e+' + e);
      }
      if (input < 1000) {
        out = Math.round(input * 1000) / 1000;
      } else {
        out = Math.round(input * 100) / 100;
        out = out.toLocaleString("en-US");
      }
    } else {
      out = input.toLocaleString("en-US");
    }
  }
  return out + illionsArr[mCount];
}

advApp.filter('time', function() {
  return function(input, raw) {
    if (input === Infinity) {
      return "———";
    } else if (raw) {
      var out = numFilter(input, raw) + ' s';
    } else {
      input = Math.floor(input);
      var s = ("00" + input % 60).slice(-2);
      var m = ("00" + Math.floor(input / 60) % 60).slice(-2);
      var h = ("00" + Math.floor(input / 3600) % 24).slice(-2);
      var d = Math.floor(input / 86400);
      var out = "";
      if (d >= 1) {
        out += numFilter(d, false) + ' d';
        if (d < 100) {
          out += ', '
        }
      }
      if (d < 100) {
        out += h + ":" + m + ":" + s;
      }
      return out;
    }
  };
});

advApp.filter('num', function() {
  return function(input, raw) {
    return numFilter(input, raw);
  };
});

advApp.filter('percentage', function() {
  return function(input) {
    if (isNaN(input)) return input;
    return Math.floor(input * 1000) / 10 + '%';
  };
});

advApp.filter('rec', function() {
  "use strict";
  return function(input, loc) {
    var retVal = '';
    if (input === 'all') {
      retVal = 'All';
    } else if (input[0] === 'level') {
      retVal = loc.investments[input[1]][0];
    } else if (input[0] === 'cash') {
      var index = Math.floor(loc.cashUpgrades[input[1]][1][0] / 2);
      retVal = (index < loc.investments.length) ? loc.investments[index][0] : 'All';
      retVal += (loc.cashUpgrades[input[1]][1][0] % 2 === 0) ? ' Profit' : ' Speed';
      retVal += ' ' + loc.cashUpgrades[input[1]][1][1];
    }
    return retVal;
  }
});

advApp.controller('advController', ['$document', '$filter', '$scope', function($document, $filter, $scope) {
  $scope.accOpen = [false, false, false, false, false, false];
  $scope.accOpen2 = [false, false];
  $scope.evil = {};
  $scope.clearAfter = [false, false];
  $scope.compare = false;
  $scope.earth = {};
  $scope.fillBefore = [false, false];
  $scope.filterTime = {'days': null, 'hours': null, 'minutes': null, 'percentage': null};
  $scope.illionsArray = illionsArr.slice(1);
  $scope.mars = {};
  $scope.moon = {};
  $scope.raw = false;
  $scope.ref = $scope.evil;
  $scope.reverse = true;
  $scope.selectAll = [false, false, false, false];
  $scope.showUpdate = false;
  $scope.sortIndex = 2;
  $scope.suitList = [
    ['Blue', 3],
    ['Gold', 2],
    ['Green', 10],
    ['Red', 2],
    ['White', 2]
  ];
  var planets = ['earth', 'moon', 'mars', 'evil'];

  angular.element(document).ready(function() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0],
      reader = new FileReader();
      reader.onload = function(e) {
        loadExportedJson(e.target.result);
      }
      reader.readAsText(file);
    });
    var saved = localStorage.getItem('planets');
    if (saved) {
      loadExportedJson(saved);
    }
  });

  function loadExportedJson(str) {
    var i = 0, j = 0, k = 0,
    obj = JSON.parse(str);
    for (k in planets) {
      if (obj.hasOwnProperty(planets[k])) {
        $scope.fullyResetPlanet($scope[planets[k]]);
        for (i in obj[planets[k]].levels) {
          if (obj[planets[k]].levels.hasOwnProperty(i)) {
            for (j = 0; j < $scope[planets[k]].investments.length; j++) {
              if ($scope[planets[k]].investments[j][0] === i) {
                $scope[planets[k]].investments[j][1] = obj[planets[k]].levels[i];
                break;
              }
            }
          }
        }
        $scope[planets[k]].numAngels = obj[planets[k]].numAngels;
        $scope[planets[k]].viewNumAngels = $scope[planets[k]].numAngels;
        for (i = 0; i < obj[planets[k]].upgradeIndexUpTo; i++) {
          $scope[planets[k]].cashUpgrades[i][$scope[planets[k]].cashUpgrades[i].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].angelUpgradeIndexUpTo; i++) {
          $scope[planets[k]].angelUpgrades[i][$scope[planets[k]].angelUpgrades[i].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].upgradeIndexBonus.length; i++) {
          $scope[planets[k]].cashUpgrades[obj[planets[k]].upgradeIndexBonus[i]][$scope[planets[k]].cashUpgrades[obj[planets[k]].upgradeIndexBonus[i]].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].angelUpgradeIndexBonus.length; i++) {
          $scope[planets[k]].angelUpgrades[obj[planets[k]].angelUpgradeIndexBonus[i]][$scope[planets[k]].angelUpgrades[obj[planets[k]].angelUpgradeIndexBonus[i]].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].managersBought.length; i++) {
          $scope[planets[k]].managerUpgrades[Math.floor(obj[planets[k]].managersBought[i] / 2)][obj[planets[k]].managersBought[i] % 2][1] = true;
        }
        $scope[planets[k]].noSingles = obj[planets[k]].noSingles || false;
        $scope[planets[k]].noTens = obj[planets[k]].noTens || false;
        if ('suit' in obj[planets[k]]) {
          $scope[planets[k]].suits[obj[planets[k]].suit][0] = true;
        }
        $scope[planets[k]].triples = obj[planets[k]].triples;
        $scope[planets[k]].flux = obj[planets[k]].flux;
        $scope[planets[k]].bonusAngelEffectiveness = obj[planets[k]].bonusAngelEffectiveness;
        $scope[planets[k]].bonusMultiplier = obj[planets[k]].bonusMultiplier;
        if (angular.isDefined(obj[planets[k]].megaTicket)) {
          for (i = 0; i < obj[planets[k]].megaTicket.length; i++) {
            $scope[planets[k]].investments[obj[planets[k]].megaTicket[i]][2] = true;
          }
        }
      }
      $scope.calc($scope[planets[k]]);
    }
    $scope.$digest();
  }

  $scope.apply = function(loc) {
    $scope.applyRow(loc, loc.recTable[0]);
  };

  $scope.applyRow = function(loc, row) {
    var i = 0;
    if (row[0] === 'all') {
      for (; i < loc.investments.length; i++) {
        if (loc.investments[i][1] < row[1]) {
          loc.investments[i][1] = row[1];
        }
      }
    } else if (row[0][0] === 'level') {
      loc.investments[row[0][1]][1] = row[1];
    } else if (row[0][0] === 'cash') {
      loc.cashUpgrades[row[0][1]][2] = true;
    }
    $scope.calc(loc);
  };

  function applyTuple(loc, row) {
    var i = 0, j = 0,
    applyRow = -1,
    applyType = -1;
    for (; i < row.length; i++) {
      if (typeof row[i] === 'object') {
        applyRow = Math.floor(row[i][0] / 2);
        applyType = row[i][0] % 2;
        if (applyRow < loc.investments.length) {
          if (applyType === 0) {
            loc.investments[applyRow][3] *= row[i][1];
          } else {
            loc.investments[applyRow][4] /= row[i][1];
          }
        } else if (applyRow === loc.investments.length) {
          if (applyType === 0) {
            for (j = 0; j < loc.investments.length; j++) {
              loc.investments[j][3] *= row[i][1];
            }
          } else {
            for (j = 0; j < loc.investments.length; j++) {
              loc.investments[j][4] /= row[i][1];
            }
          }
        } else if (applyRow === loc.investments.length + 1) {
          loc.angelEffectiveness += row[i][1];
        } else if (row[i][0] < 30 || row[i][0] > 29 + loc.investments.length) {
          throw 'Tuple not dealt with: ' + row;
        }
      }
    }
  };

  function calcUnlockCost(loc, index, fromLevel, numLevels) {
    var retVal = 1,
    i = 1, j = 0,
    managerDiscount = 1;
    for (; i < numLevels; i++) {
      retVal += Math.pow(loc.basePower[index], i);
    };
    if (index === 0 && $scope.isWorld('earth')) {
      fromLevel -= 1;
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      if (tupleIsActive(loc.angelUpgrades[i])) {
        if (loc.angelUpgrades[i][1][0] === (30 + index)) {
          fromLevel -= loc.angelUpgrades[i][1][1];
        }
      }
    }
    if (loc.managerUpgrades.length !== 0) {
      for (i = 0; i < loc.managerUpgrades[index].length; i++) {
        if (tupleIsActive(loc.managerUpgrades[index][i])) {
          if (loc.name === 'earth') {
            if (i === 0) {
              managerDiscount = 0.9;
            } else {
              managerDiscount *= 0.00001;
            }
          } else {
            managerDiscount = 0.75;
          }
        }
      }
    }
    retVal *= loc.baseCost[index] * Math.pow(loc.basePower[index], fromLevel) * managerDiscount;
    return retVal;
  };

  function calcUnlockCostAll(loc) {
    var lowestLevel = loc.investments[0][1],
    i = 1, j = 0,
    retVal = 0;
    for (; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < lowestLevel) {
        lowestLevel = loc.investments[i][1];
      }
    }
    i = 0;
    while (i < loc.unlocks[loc.investments.length].length && lowestLevel >= loc.unlocks[loc.investments.length][i][0]) {
      i++;
    }
    if (i !== loc.unlocks[loc.investments.length].length) {
      for (; j < loc.investments.length; j++) {
        if (loc.investments[j][1] < loc.unlocks[loc.investments.length][i][0]) {
          retVal += calcUnlockCost(loc, j, loc.investments[j][1], loc.unlocks[loc.investments.length][i][0] - loc.investments[j][1]);
        }
      }
    } else {
      retVal = null;
    }
    return retVal;
  }

  $scope.calc = function(loc) {
    calcState(loc);
    calcAngels(loc);
    calcSuits(loc);
    calcRecommendations(loc);
    localStorage.setItem('planets', getJsonForExport());
  };

  function calcAngelCost(numAngels, mul) {
    return (1e+15 * Math.pow(numAngels / mul, 2));
  };

  $scope.calcAngelInvestors = function(loc) {
    loc.angelCosts = [];
    var earnedNumAngels = loc.numAngels + loc.sacAngels;
    var loopVals = [['10%', 1.1], ['50%', 1.5], ['Doubled w/o Sacrificed', 2], ['Doubled', 2], ['5x', 5], ['10x', 10], ['Custom Multiplier', loc.customAngelMul || 0]];
    for (var val in loopVals) {
      loc.angelCosts[val] = []
      loc.angelCosts[val][0] = loopVals[val][0];
      if (loopVals[val][1] !== 0) {
        if (val !== '2') {
          loc.angelCosts[val][1] = loopVals[val][1] * earnedNumAngels;
        } else {
          loc.angelCosts[val][1] = (loopVals[val][1] * loc.numAngels) + loc.sacAngels;
        }
        loc.angelCosts[val][2] = calcAngelCost(loc.angelCosts[val][1], loc.angelScale);
        loc.angelCosts[val][3] = Math.max(loc.angelCosts[val][2] - loc.lifetimeEarnings, 0);
        loc.angelCosts[val][4] = loc.angelCosts[val][3] / loc.totalMoneyPerSecond;
      }
    }
  };

  function calcAngels(loc) {
    var i = 0,
    tempPlanet = null;
    loc.angelExclamation = false;
    for (; i < loc.angelUpgrades.length; i++) {
      if (!tupleIsActive(loc.angelUpgrades[i]) && loc.angelUpgrades[i][0] < loc.numAngels) {
        tempPlanet = JSON.parse(JSON.stringify(loc));
        tempPlanet.numAngels -= loc.angelUpgrades[i][0];
        tempPlanet.angelUpgrades[i][tempPlanet.angelUpgrades[i].length - 1] = true;
        calcState(tempPlanet);
        var delta = tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
        var percent = delta / loc.totalMoneyPerSecond;
        if (delta > 0) {
          loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = percent;
          loc.angelExclamation = true;
        } else {
          loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = false;
        }
      }
    }
  };

  function calcRecommendations(loc) {
    var i = 0, j = 0, k = 0,
    highestSharedLevel = loc.investments[0][1],
    inc = [],
    tempPlanet = JSON.parse(JSON.stringify(loc)),
    max = 0,
    maxObj = [0, 0],
    tempUnlock = null, tempUnlockTime = null, tempPercentageIncrease = null,
    upgradeScore = 0;
    loc.recTable = [];
    if (!loc.noSingles) {
      inc.push(1);
    }
    if (!loc.noTens) {
      inc.push(10);
    }
    inc.push(100);
    $scope.updateFilterTime(loc);
    for (; i < loc.investments.length; i++) {
      while (inc.length > 3 - (loc.noSingles ? 1 : 0) - (loc.noTens ? 1 : 0)) {
        inc.pop();
      }
      if (i === 1 && $scope.isWorld('earth')) {
        for (j = 1; j < 4; j++) {
          k = getDifferenceNBonus(loc, i, j);
          if (k !== null) {
            inc.push(k);
          }
        }
      } else {
        k = getDifferenceNBonus(loc, i, 1);
        if (k !== null) {
          inc.push(k);
        }
      }
      if (!loc.hasMegaTickets) {
        k = getDifferenceNBonus(loc, i, getNextPositiveUnlock(loc, i));
        if (k !== null && inc.indexOf(k) === -1) {
          inc.push(k);
        }
      }
      for (j = 0; j < inc.length; j++) {
        tempPlanet.investments = deepCopy(loc.investments);
        tempPlanet.investments[i][1] += inc[j];
        calcState(tempPlanet);
        tempUnlock = calcUnlockCost(loc, i, loc.investments[i][1], inc[j]);
        tempUnlockTime = tempUnlock / loc.totalMoneyPerSecond;
        tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
        if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
          upgradeScore = calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
          if (upgradeScore > max) {
            max = upgradeScore;
            maxObj = ['level', i, tempPlanet.investments[i][1]];
          }
          loc.recTable.push([['level', i], tempPlanet.investments[i][1], upgradeScore, tempUnlock, tempUnlockTime, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
        }
      }
    }
    j = -1;
    for (i = 0; i < 22; i++) {
      tempPlanet.investments = deepCopy(loc.investments);
      tempPlanet.angelEffectiveness = loc.angelEffectiveness;
      tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
      j = getNextCashIndex(loc, j);
      if (j !== null) {
        tempPlanet.cashUpgrades[j][tempPlanet.cashUpgrades[j].length - 1] = true;
        calcState(tempPlanet);
        tempUnlockTime = loc.cashUpgrades[j][0] / loc.totalMoneyPerSecond;
        tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
        if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
          upgradeScore = calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
          if (upgradeScore > max) {
            max = upgradeScore;
            maxObj = ['upgrade', j];
          }
          loc.recTable.push([['cash', j], null, upgradeScore, loc.cashUpgrades[j][0], tempUnlockTime, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
        }
      } else {
        break;
      }
    }
    tempUnlock = 0;
    tempPlanet.investments = deepCopy(loc.investments);
    tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
    for (i = 1; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < highestSharedLevel) {
        highestSharedLevel = loc.investments[i][1];
      }
    }
    for (i = 0; i < loc.unlocks[loc.investments.length].length; i++) {
      if (loc.unlocks[loc.investments.length][i][0] > highestSharedLevel) {
        highestSharedLevel = loc.unlocks[loc.investments.length][i][0];
        break;
      }
    }
    for (i = 0; i < tempPlanet.investments.length; i++) {
      if (tempPlanet.investments[i][1] < highestSharedLevel) {
        tempUnlock += calcUnlockCost(loc, i, tempPlanet.investments[i][1], highestSharedLevel - tempPlanet.investments[i][1]);
        tempPlanet.investments[i][1] = highestSharedLevel;
      }
    }
    calcState(tempPlanet);
    tempUnlockTime = tempUnlock / loc.totalMoneyPerSecond;
    tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
    if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
      upgradeScore = calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
      if (upgradeScore > max) {
        max = upgradeScore;
        maxObj = ['all', highestSharedLevel];
      }
      loc.recTable.push(['all', highestSharedLevel, upgradeScore, tempUnlock, tempUnlock / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
    }
    loc.rec = maxObj;
    $scope.reverse = true;
    $scope.sortIndex = 2;
    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, $scope.reverse);
    updateRecString(loc);
  };

  function calcState(loc) {
    var i = 0, j = true,
    highestSharedLevel = loc.investments[0][1];
    loc.totalMoneyPerSecond = 0;
    loc.angelEffectiveness = 2 + (loc.suits[suitFromName('red')][0] ? $scope.suitList[suitFromName('red')][1] : 0) + (loc.suits[suitFromName('green')][0] ? $scope.suitList[suitFromName('green')][1] : 0);
    for (; i < loc.investments.length; i++) {
      if (loc.investments[i][2] === false) {
        j = false;
        break;
      }
    }
    if (j === true) {
      $scope.selectAll[0] = true;
    } else {
      $scope.selectAll[0] = false;
    }
    j = 0;
    for (i = 0; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < highestSharedLevel) {
        highestSharedLevel = loc.investments[i][1];
      }
      loc.investments[i][3] = loc.investments[i][1] * loc.baseProfit[i];
      if (loc.triples > 0 || loc.bonusMultiplier > 0 || loc.suits[suitFromName('gold')][0] || loc.suits[suitFromName('blue')][0]) {
        loc.investments[i][3] *= (3 * loc.triples) + loc.bonusMultiplier + (loc.suits[suitFromName('gold')][0] ? $scope.suitList[suitFromName('gold')][1] : 0) + (loc.suits[suitFromName('blue')][0] ? $scope.suitList[suitFromName('blue')][1] : 0);
      }
      if (loc.investments[i][2]) {
        loc.investments[i][3] *= $scope.selectAll[0] ? 17.77 : 7.77;
      }
      loc.investments[i][4] = loc.baseSpeed[i];
      if (loc.flux > 0) {
        loc.investments[i][4] /= (1 + loc.flux * 1.21);
      }
      if (loc.suits[suitFromName('white')][0]) {
        loc.investments[i][4] /= 2;
      }
      loc.upgradeCosts[i][0] = calcUnlockCost(loc, i, loc.investments[i][1], 1);
      loc.upgradeCosts[i][2] = calcUnlockCost(loc, i, loc.investments[i][1], 10);
      loc.upgradeCosts[i][4] = calcUnlockCost(loc, i, loc.investments[i][1], getDifferenceNBonus(loc, i, 1));
      loc.upgradeCosts[i][6] = calcUnlockCostAll(loc);
    }
    for (i = 0; i < loc.cashUpgrades.length; i++) {
      if (tupleIsActive(loc.cashUpgrades[i])) {
        applyTuple(loc, loc.cashUpgrades[i]);
      }
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      if (tupleIsActive(loc.angelUpgrades[i])) {
        applyTuple(loc, loc.angelUpgrades[i]);
      }
    }
    for (i = 0; i < loc.investments.length; i++) {
      j = 0;
      while (j < loc.unlocks[i].length && loc.investments[i][1] >= loc.unlocks[i][j][0]) {
        applyTuple(loc, loc.unlocks[i][j]);
        j++;
      }
    }
    j = 0;
    while (j < loc.unlocks[loc.investments.length].length && highestSharedLevel >= loc.unlocks[loc.investments.length][j][0]) {
      applyTuple(loc, loc.unlocks[loc.investments.length][j]);
      j++;
    }
    if (loc.bonusAngelEffectiveness > 0) {
      loc.angelEffectiveness += loc.bonusAngelEffectiveness;
    }
    for (i = 0; i < loc.investments.length; i++) {
      loc.investments[i][3] *= (1 + (loc.angelEffectiveness * loc.numAngels / 100));
      loc.investments[i][5] = loc.investments[i][3] / loc.investments[i][4]
      loc.totalMoneyPerSecond += loc.investments[i][5];
    }
    for (i = 0; i < loc.investments.length; i++) {
      loc.investments[i][6] = loc.investments[i][5] * 100 / loc.totalMoneyPerSecond;
    }
    for (i = 0; i < loc.upgradeCosts.length; i++) {
      loc.upgradeCosts[i][1] = loc.upgradeCosts[i][0] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][3] = loc.upgradeCosts[i][2] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][5] = loc.upgradeCosts[i][4] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][7] = loc.upgradeCosts[i][6] / loc.totalMoneyPerSecond;
    }
  };

  function calcSuits(loc) {
    var i = 0, max = [-1, 0],
    tempPlanet = {};
    loc.suitExclamation = false;
    for (; i < loc.suits.length; i++) {
      if (loc.suits[i][0] === false) {
        tempPlanet = JSON.parse(JSON.stringify(loc));
        tempPlanet.suits[i][0] = true;
        $scope.changeSuits(tempPlanet, i);
        calcState(tempPlanet);
        var delta = tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
        var percent = delta / loc.totalMoneyPerSecond;
        if (delta > 0) {
          loc.suits[i][1] = percent;
          loc.suitExclamation = true;
          if (percent > max[1]) {
            max[0] = i;
            max[1] = percent;
          }
        } else {
          loc.suits[i][1] = false;
        }
      }
    }
    if (max[0] !== -1) {
      loc.bestSuit = max[0];
    } else {
      loc.bestSuit = null;
    }
  };

  function calcUpgradeScore(planet, loc, unlockCost) {
    var overflowPotential = planet.totalMoneyPerSecond * unlockCost,
    divNum = 0,
    retVal = planet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
    if (!isFinite(unlockCost)) {
      return 0;
    }
    while (!isFinite(overflowPotential)) {
      divNum += 100;
      overflowPotential = planet.totalMoneyPerSecond * (unlockCost / Number('1e+' + divNum));
    }
    retVal *= 1000000000000000000000 / overflowPotential;
    if (divNum !== 0) {
      retVal *= Number('1e+' + divNum);
    }
    return retVal;
  };

  $scope.changeSuits = function(loc, index) {
    for (var i = 0; i < loc.suits.length; i++) {
      if (i !== index) {
        loc.suits[i][0] = false;
      } else {
        loc.suits[i][1] = false;
      }
    }
  };

  $scope.checkAngel = function(loc, index) {
    var i = 0;
    loc.angelUpgrades[index][loc.angelUpgrades[index].length - 2] = false;
    if ($scope.fillBefore[1] && loc.angelUpgrades[index][loc.angelUpgrades[index].length - 1] == true) {
      for (; i < index; i++) {
        loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = true;
        loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = false;
      }
    }
    if ($scope.clearAfter[1] && loc.angelUpgrades[index][loc.angelUpgrades[index].length - 1] == false) {
      for (i = index + 1; i < loc.angelUpgrades.length; i++) {
        loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = false;
      }
    }
    //calcAngels(loc);
  };

  $scope.checkCash = function(loc, index) {
    var i = 0;
    if ($scope.fillBefore[0] && loc.cashUpgrades[index][loc.cashUpgrades[index].length - 1] == true) {
      for (; i < index; i++) {
        loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = true;
      }
    }
    if ($scope.clearAfter[0] && loc.cashUpgrades[index][loc.cashUpgrades[index].length - 1] == false) {
      for (i = index + 1; i < loc.cashUpgrades.length; i++) {
        loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = false;
      }
    }
  };

  $scope.clickSort = function(loc, index) {
    if (index === $scope.sortIndex) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.sortIndex = index;
      if (index === 2 || index >= 5) {
        $scope.reverse = true;
      } else {
        $scope.reverse = false;
      }
    }
    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, $scope.reverse);
  };

  $scope.decrementDays = function(loc) {
    if ($scope.filterTime.days !== null) {
      if ($scope.filterTime.days > 0) {
        $scope.filterTime.days--;
      }
    }
  };

  $scope.decrementHours = function(loc) {
    if ($scope.filterTime.hours !== null) {
      if ($scope.filterTime.hours > 0) {
        $scope.filterTime.hours--;
      }
    }
  };

  $scope.decrementMinutes = function(loc) {
    if ($scope.filterTime.minutes !== null) {
      if ($scope.filterTime.minutes > 0) {
        $scope.filterTime.minutes--;
      }
    }
  };

  $scope.decrementPercentage = function(loc) {
    if ($scope.filterTime.percentage !== null) {
      if ($scope.filterTime.percentage > 0) {
        $scope.filterTime.percentage--;
      }
    }
  };

  function deepCopy(input) {
    var temp = [];
    for (var i = 0; i < input.length; i++) {
      temp.push(input[i].slice());
    }
    return temp;
  }

  $scope.export = function() {
    var blob = new Blob([getJsonForExport()], {type: "application/json"});
    var title = "AdvCapCalc.json";
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, title);
    } else {
      var downloadLink = angular.element("<a></a>");
      downloadLink.attr("href", window.URL.createObjectURL(blob));
      downloadLink.attr("download", title);
      $document.find("body").append(downloadLink);
      downloadLink[0].click();
      downloadLink.remove();
    }
  };

  function formatState(loc) {
    var string = '"' + loc.name + '": {\r\n  "levels": {\r\n',
    i = 0, j = 0, first = true;
    for (; i < loc.investments.length; i++) {
      if (i !== 0) {
        string += ',\r\n';
      }
      string += '    "' + loc.investments[i][0] + '": ' + loc.investments[i][1];
    }
    string += '\r\n  },\r\n  "numAngels": ' + loc.numAngels + ',\r\n  "upgradeIndexUpTo": ';
    for (i = 0; i < loc.cashUpgrades.length; i++) {
      if (loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] === false) {
        break;
      }
    }
    string += i + ',\r\n  "upgradeIndexBonus": [';
    for (; i < loc.cashUpgrades.length; i++) {
      if (loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] === true) {
        if (first !== true) {
          string += ',\r\n'
        } else {
          string += '\r\n';
          first = false;
        }
        string += '    ' + i;
      }
    }
    string += '\r\n  ],\r\n  "angelUpgradeIndexUpTo": ';
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      if (loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] === false) {
        break;
      }
    }
    first = true;
    string += i + ',\r\n  "angelUpgradeIndexBonus": [';
    for (; i < loc.angelUpgrades.length; i++) {
      if (loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] === true) {
        if (first !== true) {
          string += ',\r\n'
        } else {
          string += '\r\n';
          first = false;
        }
        string += '    ' + i;
      }
    }
    first = true;
    string += '\r\n  ],\r\n  "managersBought": [';
    for (i = 0; i < loc.managerUpgrades.length; i++) {
      for (j = 0; j < loc.managerUpgrades[i].length; j++) {
        if (loc.managerUpgrades[i][j][1] === true) {
          if (first !== true) {
            string += ',\r\n'
          } else {
            string += '\r\n';
            first = false;
          }
          string += '    ' + ((i * 2) + j);
        }
      }
    }
    string += '\r\n  ], \r\n  "noSingles": ' + loc.noSingles + ',\r\n  "noTens": ' + loc.noTens;
    for (i = 0; i < loc.suits.length; i++) {
      if (loc.suits[i][0] === true) {
        string += ',\r\n  "suit": ' + i;
        break;
      }
    }
    string += ',\r\n  "triples": ' + loc.triples + ',\r\n  "flux": ' + loc.flux + ',\r\n  "bonusAngelEffectiveness": ' + loc.bonusAngelEffectiveness + ',\r\n  "bonusMultiplier": ' + loc.bonusMultiplier + ',\r\n  "megaTicket": [';
    first = true;
    for (i = 0; i < loc.investments.length; i++) {
      if (loc.investments[i][2] === true) {
        if (first !== true) {
          string += ',\r\n'
        } else {
          string += '\r\n';
          first = false;
        }
        string += '    ' + i;
      }
    }
    string += '\r\n  ]\r\n}';
    return string;
  };

  $scope.fullyResetPlanet = function(loc) {
    var i = 0;
    for (; i < loc.cashUpgrades.length; i++) {
      loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = false;
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = false;
    }
    for (i = 0; i < loc.managerUpgrades.length; i++) {
      loc.managerUpgrades[i][0][loc.managerUpgrades[i][0].length - 1] = false;
      if (angular.isDefined(loc.managerUpgrades[i][1])) {
        loc.managerUpgrades[i][1][loc.managerUpgrades[i][1].length - 1] = false;
      }
    }
    loc.angelEffectiveness = 2;
    loc.angelExclamation = false;
    loc.bonusAngelEffectiveness = 0;
    loc.bonusMultiplier = 0;
    loc.flux = 0;
    loc.illions = '';
    for (i = 0; i < loc.investments.length; i++) {
      if (i === 0) {
        loc.investments[i][1] = 1;
      } else {
        loc.investments[i][1] = 0;
      }
      loc.investments[i][2] = false;
    }
    loc.numAngels = 0;
    loc.rec = null;
    loc.recTable = [];
    loc.recommendation = '';
    loc.suitExclamation = false;
    loc.totalMoneyPerSecond = 0;
    loc.triples = 0;
    loc.upgradeCosts = [];
    for (var i = 0; i <= loc.investments.length; i++) {
      loc.upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    loc.viewNumAngels = 0;
    $scope.calc(loc);
  };

  function getDifferenceNBonus(loc, index, n) {
    var i = 0,
    retVal = null;
    if (n === null) {
      return null;
    }
    for (; i < loc.unlocks[index].length; i++) {
      if (loc.investments[index][1] < loc.unlocks[index][i][0]) {
        if (i + n - 1 < loc.unlocks[index].length) {
          retVal = loc.unlocks[index][i + n - 1][0];
          break;
        }
      }
    }
    return (retVal === null) ? null : retVal - loc.investments[index][1];
  };

  function getJsonForExport() {
    var retString = '{';
    for (var p in planets) {
      if (p !== '0') {
        retString += ',\r\n';
      }
      retString += formatState($scope[planets[p]]);
    }
    return retString + '}';
  };

  $scope.getNamedType = function(loc, tuple) {
    var i, j, k = '', l = 1, num;
    for (; l < tuple.length - 1; l++) {
      if (typeof tuple[l] === 'object') {
        i = Math.floor(tuple[l][0] / 2);
        j = tuple[l][0] % 1;
        num = tuple[l][1];
        if (l !== 1) {
          k += ', ';
        }
        if (i < loc.investments.length) {
          k += loc.investments[i][0] + (j && ' Speed ' || ' Profit ') + num;
        } else if (i === loc.investments.length) {
          k += 'All' + (j && ' Speed ' || ' Profit ') + num;
        } else if (i === loc.investments.length + 1) {
          k += 'Angel Investor ' + num;
        } else if (tuple[l][0] >= 30 && tuple[l][0] <= 29 + loc.investments.length) {
          k += '+' + tuple[l][1] + ' ' + loc.investments[tuple[l][0] - 30][0];
        }
      }
    }
    return k;
  };

  function getNextCashIndex(loc, index) {
    index += 1;
    while (index < loc.cashUpgrades.length && tupleIsActive(loc.cashUpgrades[index])) {
      index++;
    }
    if (index === loc.cashUpgrades.length) {
      index = null;
    }
    return index;
  };

  function getNextPositiveUnlock(loc, index) {
    var i = 0,
    retVal = 0;
    for (; i < loc.unlocks[index].length; i++) {
      if (loc.investments[index][1] < loc.unlocks[index][i][0]) {
        retVal++;
        if (loc.unlocks[index][i][1][1] > 1) {
          return retVal;
        }
      }
    }
    return null;
  };

  $scope.hideUpdate = function() {
    $scope.showUpdate = false;
  };

  $scope.incrementDays = function(loc) {
    if ($scope.filterTime.days !== null) {
      $scope.filterTime.days++;
    } else {
      $scope.filterTime.days = 1;
    }
  };

  $scope.incrementHours = function(loc) {
    if ($scope.filterTime.hours !== null) {
      $scope.filterTime.hours++;
    } else {
      $scope.filterTime.hours = 1;
    }
  };

  $scope.incrementMinutes = function(loc) {
    if ($scope.filterTime.minutes !== null) {
      $scope.filterTime.minutes++;
    } else {
      $scope.filterTime.minutes = 1;
    }
  };

  $scope.incrementPercentage = function(loc) {
    if ($scope.filterTime.percentage !== null) {
      $scope.filterTime.percentage++;
    } else {
      $scope.filterTime.percentage = 1;
    }
  };

  function indexOrder(input) {
    return input[$scope.sortIndex];
  };

  $scope.isCompare = function() {
    return $scope.compare;
  };

  $scope.isWorld = function(world) {
    return $scope.ref == $scope[world];
  };
  
  function lzf_decode(str) {
    var iidx = 0, oidx = 0, oLen = str.length,
    temp = Array.apply(null, new Array(oLen)).map(Number.prototype.valueOf, 0);
    do {
      var ctrl = str.charCodeAt(iidx++);
      if (ctrl < (1 << 5)) {
        ctrl++;
        while (oidx + ctrl > oLen) {
          oLen++;
          temp.push(String.fromCharCode(0));
        }
        do {
          temp[oidx++] = str.charAt(iidx++);
        } while ((--ctrl) != 0);
      } else {
        var len = ctrl >> 5, reference = oidx - ((ctrl & 0x1f) << 8) - 1;
        if (len == 7) {
          len += str.charCodeAt(iidx++);
        }
        reference -= str.charCodeAt(iidx++);
        while (oidx + len + 2 > oLen) {
          oLen++;
          temp.push(String.fromCharCode(0));
        }
        if (reference < 0) {
          console.log('error');
          return 0;
        }
        temp[oidx++] = temp[reference++];
        do {
          temp[oidx++] = temp[reference++];
        } while ((--len) >= 0);
      }
    } while (iidx < $scope.lzfData.length);
    return temp.join("");
  }
  
  $scope.loadGame = function(str) {
    var obj = JSON.parse(lzf_decode(atob(str))), i, id = 0;
    for (i in obj.ventures) {
      id = 0; // find the correct id from short somehow
      loc.investments[i][1] = i.numOwned;
      loc.investments[i][2] = i.isBoosted;
    }
    for (i in obj.upgrades) {
      if (i.id.indexOf("_angel_") != -1) {
        id = 0; // find the correct id from short somehow
        loc.angelUpgrades[i][3] = i.purchased;
      } else {
        id = 0; // find the correct id from short somehow
        loc.cashUpgrades[i][2] = i.purchased;
      }
    }
    for (i in obj.upgrades) {
      if (i.id.indexof("_accountant" != -1)) {
        id = 0; // find the correct id from short somehow
        loc.managerUpgrades[id][(i.id.charAt(i.id.length - 1) != '2') ? 0 : 1][1] = i.purchased;
      }
    }
    loc.lifetimeEarnings = obj.totalCash || obj.sessionCash + obj.totalPreviousCash;
    loc.numAngels = obj.angelInvestors;
    loc.sacAngels = obj.angelInvestorsSpent;
    // how to find gold multipliers, flux, bonus angel effectiveness (kong login etc), suits
  };

  $scope.resetPlanet = function(loc) {
    var i = 0;
    for (; i < loc.cashUpgrades.length; i++) {
      loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = false;
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = false;
    }
    for (i = 0; i < loc.managerUpgrades.length; i++) {
      loc.managerUpgrades[i][0][loc.managerUpgrades[i][0].length - 1] = false;
      if (angular.isDefined(loc.managerUpgrades[i][1])) {
        loc.managerUpgrades[i][1][loc.managerUpgrades[i][1].length - 1] = false;
      }
    }
    loc.angelEffectiveness = 2;
    loc.angelExclamation = false;
    loc.bonusAngelEffectiveness = 0;
    loc.bonusMultiplier = 0;
    for (i = 0; i < loc.investments.length; i++) {
      if (i === 0) {
        loc.investments[i][1] = 1;
      } else {
        loc.investments[i][1] = 0;
      }
    }
    loc.rec = null;
    loc.recTable = [];
    loc.recommendation = '';
    loc.totalMoneyPerSecond = 0;
    loc.upgradeCosts = [];
    for (var i = 0; i <= loc.investments.length; i++) {
      loc.upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    $scope.calc(loc);
  };

  $scope.selectedAll = function(loc, index) {
    var i = 0;
    if (index === 0) {
      for (i = 0; i < loc.investments.length; i++) {
        loc.investments[i][2] = $scope.selectAll[0];
      }
    } else if (index === 1) {
      for (i = 0; i < loc.managerUpgrades.length; i++) {
        loc.managerUpgrades[i][0][1] = $scope.selectAll[1];
/*        if ($scope.selectAll[2]) {
          $scope.selectAll[2] = false;
        }
        loc.managerUpgrades[i][1][1] = $scope.selectAll[2];*/
      }
    } else if (index === 2) {
      for (i = 0; i < loc.managerUpgrades.length; i++) {
        loc.managerUpgrades[i][1][1] = $scope.selectAll[2];
/*        if ($scope.selectAll[1]) {
          $scope.selectAll[1] = false;
        }
        loc.managerUpgrades[i][0][1] = $scope.selectAll[1];*/
      }
    } else if (index === 3) {
      for (i = 0; i < loc.managerUpgrades.length; i++) {
        loc.managerUpgrades[i][0][1] = $scope.selectAll[3];
      }
    }
  };

  $scope.setWorld = function(planet) {
    $scope.clearAfter = [false, false];
    $scope.fillBefore = [false, false];
    $scope.compare = false;
    $scope.ref = $scope[planet];
  };

  function suitFromName(name) {
    var i = 0;
    for (; i < $scope.suitList.length; i++) {
      if ($scope.suitList[i][0].toLowerCase() === name) {
        return i;
      }
    }
    return null;
  }

  $scope.toggleManagers = function(row, index) {
    if ($scope.isWorld('earth')) {
      if (row[index][1] === true) {
        row[(index + 1) % 2][1] = false;
      }
    }
  };

  function tupleIsActive(tuple) {
    return tuple[tuple.length - 1];
  };

  $scope.updateAngels = function() {
    updateIllionize('numAngels', 'viewNumAngels', 'illions');
  };

  $scope.updateEarnings = function() {
    updateIllionize('lifetimeEarnings', 'viewLifetimeEarnings', 'angelIllions');
  };

  $scope.updateFilterTime = function(loc) {
    if ($scope.filterTime.days === null && $scope.filterTime.hours === null && $scope.filterTime.minutes === null) {
      loc.filterTime = null;
    } else {
      loc.filterTime = ($scope.filterTime.days !== null ? $scope.filterTime.days * 86400 : 0) + ($scope.filterTime.hours !== null ? $scope.filterTime.hours * 3600 : 0) + ($scope.filterTime.minutes !== null ? $scope.filterTime.minutes * 60 : 0)
      if (loc.filterTime === 0) {
        loc.filterTime = null;
      }
    }
  };

  function updateIllionize(varName, viewName, illionsName) {
    if ($scope.ref[illionsName] === '') {
      $scope.ref[varName] = $scope.ref[viewName];
    } else {
      $scope.ref[illionsName] = $scope.ref[illionsName].trim();
      $scope.ref[illionsName] = $scope.ref[illionsName].charAt(0).toUpperCase() + $scope.ref[illionsName].slice(1).toLowerCase();
      var index = $scope.illionsArray.indexOf(' ' + $scope.ref[illionsName]);
      if (index !== -1) {
        $scope.ref[varName] = $scope.ref[viewName] * Math.pow(10, 6 + (index * 3));
      }
    }
  };

  function updateRecString(loc) {
    if (loc.rec[0] === 'all') {
      loc.recommendation = 'Buy all to level ' + loc.rec[1];
    } else if (loc.rec[0] === 'level') {
      loc.recommendation = 'Buy ' + loc.investments[loc.rec[1]][0] + ' to level ' + loc.rec[2] + '.';
    } else {
      loc.recommendation = 'Buy ' + $filter('rec')(loc.recTable[0][0], loc) + ' Cash Upgrade.'
    }
  };

  $scope.updateSacrificedAngels = function() {
    updateIllionize('sacAngels', 'viewSacAngels', 'sacIllions');
  };

  function loadDefaults() {
    $scope.earth.angelScale = 150;
    $scope.earth.baseCost = [4, 60, 720, 8640, 103680, 1244160, 14929920, 179159040, 2149908480, 25798901760];
    $scope.earth.basePower = [1.07, 1.15, 1.14, 1.13, 1.12, 1.11, 1.1, 1.09, 1.08, 1.07];
    $scope.earth.baseProfit = [1, 60, 540, 4320, 51840, 622080, 7464960, 89579520, 1074954240, 29668737024];
    $scope.earth.baseSpeed = [0.6, 3, 6, 12, 24, 96, 384, 1536, 6144, 36864];
    $scope.earth.hasMegaTickets = true;
    $scope.earth.investments = [
      ['Lemon', 1, false, 0, 0, 0, 0],
      ['Newspaper', 0, false, 0, 0, 0, 0],
      ['Carwash', 0, false, 0, 0, 0, 0],
      ['Pizza', 0, false, 0, 0, 0, 0],
      ['Donut', 0, false, 0, 0, 0, 0],
      ['Shrimp', 0, false, 0, 0, 0, 0],
      ['Hockey', 0, false, 0, 0, 0, 0],
      ['Movies', 0, false, 0, 0, 0, 0],
      ['Bank', 0, false, 0, 0, 0, 0],
      ['Oil', 0, false, 0, 0, 0, 0]
    ];
    $scope.evil.angelScale = 150; // Dunno
    $scope.evil.baseCost = [12, 200, 770, 2268, 46662, 65, 770, 3708, 31900, 8666658];
    $scope.evil.basePower = [1.09, 1.18, 1.36, 1.72, 2.44, 1.03, 1.09, 1.27, 1.81, 3.43];
    $scope.evil.baseProfit = [2, 25, 77, 189, 3333, 13, 110, 412, 2900, 666666];
    $scope.evil.baseSpeed = [1, 3, 5, 7, 9, 10, 19, 25, 42, 96];
    $scope.evil.hasMegaTickets = false;
    $scope.evil.investments = [
      ['Super King', 1, false, 0, 0, 0, 0],
      ['Honey Badger', 0, false, 0, 0, 0, 0],
      ['Black Knight', 0, false, 0, 0, 0, 0],
      ['Rope Slinger', 0, false, 0, 0, 0, 0],
      ['Samurai Pizza Turtles', 0, false, 0, 0, 0, 0],
      ['BadDay', 1, false, 0, 0, 0, 0],
      ['Mag-Neato', 0, false, 0, 0, 0, 0],
      ['The Prankster', 0, false, 0, 0, 0, 0],
      ['Jareth Green', 0, false, 0, 0, 0, 0],
      ['Hair Clan', 0, false, 0, 0, 0, 0]
    ];
    $scope.moon.angelScale = 165;
    $scope.moon.baseCost = [5, 105, 2929, 42525, 493025, 18753525, 393824025, 8270304525, 173676395025, 1000000000000];
    $scope.moon.basePower = [1.05, 1.21, 1.07, 1.19, 1.09, 1.15, 1.13, 1.17, 1.11, 1.5];
    $scope.moon.baseProfit = [1, 21, 2001, 376, 98820, 1976400, 32940000, 1152900000, 11067840000, 332035000000];
    $scope.moon.baseSpeed = [2, 7, 28, 2, 45, 180, 600, 3000, 14400, 86400];
    $scope.moon.hasMegaTickets = true;
    $scope.moon.investments = [
      ['Moon Shoe', 1, false, 0, 0, 0, 0],
      ['Gravity Booth', 0, false, 0, 0, 0, 0],
      ['Payday Clone', 0, false, 0, 0, 0, 0],
      ['Moon Express', 0, false, 0, 0, 0, 0],
      ['Oxygen Bar', 0, false, 0, 0, 0, 0],
      ['Helium-3 Farm', 0, false, 0, 0, 0, 0],
      ['Cheese Mine', 0, false, 0, 0, 0, 0],
      ['Amusement Park', 0, false, 0, 0, 0, 0],
      ['Werewolf Colony', 0, false, 0, 0, 0, 0],
      ['Giant Laser', 0, false, 0, 0, 0, 0]
    ];
    $scope.mars.angelScale = 300;
    $scope.mars.baseCost = [0.05, 1, 1234, 23e+6, 49e+9, 77e+12, 5e+15, 1e+18, 13e+24];
    $scope.mars.basePower = [1.01, 1.03, 1.05, 1.07, 1.11, 1.04, 1.07, 1.09, 1.25];
    $scope.mars.baseProfit = [0.011, 1, 4321, 4007310, 518783295, 500634321, 7543177325, 69263532485, 99760273916482500];
    $scope.mars.baseSpeed = [0.5, 3, 9, 32, 64, 4, 18, 42, 43200];
    $scope.mars.hasMegaTickets = true;
    $scope.mars.investments = [
      ['Red Dirt', 1, false, 0, 0, 0, 0],
      ['Marsies', 0, false, 0, 0, 0, 0],
      ['Men', 0, false, 0, 0, 0, 0],
      ['Buggles', 0, false, 0, 0, 0, 0],
      ['Heck Portal', 0, false, 0, 0, 0, 0],
      ['Ambassadors', 0, false, 0, 0, 0, 0],
      ['Brain-cation', 0, false, 0, 0, 0, 0],
      ['LIFE Pod', 0, false, 0, 0, 0, 0],
      ['Terrorformer', 0, false, 0, 0, 0, 0]
    ];
    for (var p in planets) {
      $scope[planets[p]].angelEffectiveness = 2;
      $scope[planets[p]].angelExclamation = false;
      $scope[planets[p]].angelIllions = '';
      $scope[planets[p]].bestSuit = null;
      $scope[planets[p]].bonusAngelEffectiveness = 0;
      $scope[planets[p]].bonusMultiplier = 0;
      $scope[planets[p]].filterTime = null;
      $scope[planets[p]].flux = 0;
      $scope[planets[p]].illions = '';
      $scope[planets[p]].lifetimeEarnings = 0;
      $scope[planets[p]].name = planets[p];
      $scope[planets[p]].noSingles = false;
      $scope[planets[p]].noTens = false;
      $scope[planets[p]].numAngels = 0;
      $scope[planets[p]].rec = null;
      $scope[planets[p]].recTable = [];
      $scope[planets[p]].recommendation = '';
      $scope[planets[p]].sacAngels = 0;
      $scope[planets[p]].sacIllions = '';
      $scope[planets[p]].suits = [];
      for (var i = 0; i < $scope.suitList.length; i++) {
        $scope[planets[p]].suits.push([false, false]);
      }
      $scope[planets[p]].totalMoneyPerSecond = 0;
      $scope[planets[p]].triples = 0;
      $scope[planets[p]].unlocks = [];
      $scope[planets[p]].viewLifetimeEarnings = 0;
      $scope[planets[p]].viewNumAngels = 0;
      $scope[planets[p]].viewSacAngels = 0;
      $scope[planets[p]].upgradeCosts = [];
      for (var i = 0; i <= $scope[planets[p]].investments.length; i++) {
        $scope[planets[p]].upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
        $scope[planets[p]].unlocks.push([]);
      }
    }
  };

  function loadUnlocks() {
    $scope.earth.unlocks[0] = [[25, [1, 2]],[50, [1, 2]],[100, [1, 2]],[200, [1, 2]],[300, [1, 2]],[400, [1, 2]],[500, [0, 4]],[600, [0, 4]],[700, [0, 4]],[800, [0, 4]],[900, [0, 4]],[1000, [0, 5]],[1100, [0, 4]],[1200, [0, 4]],[1300, [0, 4]],[1400, [0, 4]],[1500, [0, 4]],[1600, [0, 4]],[1700, [0, 4]],[1800, [0, 4]],[1900, [0, 4]],[2000, [0, 5]],[2250, [0, 2]],[2500, [0, 2]],[2750, [0, 2]],[3000, [0, 5]],[3250, [0, 2]],[3500, [0, 2]],[3750, [0, 2]],[4000, [0, 5]],[4250, [0, 2]],[4500, [0, 2]],[4750, [0, 2]],[5000, [0, 5]],[5250, [0, 3]],[5500, [0, 3]],[5750, [0, 3]],[6000, [0, 5]],[6250, [0, 3]],[6500, [0, 3]],[6750, [0, 3]],[7000, [0, 5]],[7000, [0, 3]],[7250, [0, 3]],[7500, [0, 3]],[7777, [0, 3]],[8000, [0, 3]],[8200, [0, 3]],[8400, [0, 3]],[8600, [0, 3]],[8800, [0, 3]],[9000, [0, 3]],[9100, [0, 3]],[9200, [0, 3]],[9300, [0, 3]],[9400, [0, 3]],[9500, [0, 3]],[9600, [0, 3]],[9700, [0, 3]],[9800, [0, 3]],[9999, [0, 1.9999]],[10000, [0, 5]]];
    $scope.earth.unlocks[1] = [[25, [3, 2]],[50, [3, 2]],[100, [3, 2]],[125, [0, 2]],[150, [4, 2]],[175, [6, 2]],[200, [3, 2]],[225, [8, 2]],[250, [0, 3]],[275, [4, 3]],[300, [3, 2]],[325, [6, 3]],[350, [8, 3]],[375, [0, 4]],[400, [3, 2]],[425, [4, 4]],[450, [6, 4]],[475, [8, 4]],[500, [10, 11]],[525, [0, 5]],[550, [4, 5]],[575, [6, 5]],[600, [12, 11]],[625, [8, 5]],[650, [0, 6]],[675, [4, 6]],[700, [14, 11]],[725, [6, 6]],[750, [8, 6]],[775, [0, 3]],[800, [16, 11]],[825, [4, 7]],[850, [6, 7]],[875, [8, 7]],[900, [18, 11]],[925, [10, 7]],[950, [12, 7]],[975, [14, 7]],[1000, [2, 7777777]],[1025, [16, 7]],[1050, [18, 7]],[1075, [4, 8]],[1100, [6, 8]],[1125, [8, 8]],[1150, [10, 8]],[1175, [12, 8]],[1200, [14, 8]],[1225, [16, 8]],[1250, [18, 8]],[1300, [2, 7777]],[1350, [0, 9]],[1400, [4, 9]],[1450, [6, 9]],[1500, [8, 9]],[1550, [10, 9]],[1600, [12, 9]],[1650, [14, 9]],[1700, [16, 9]],[1750, [18, 9]],[1800, [10, 10]],[1850, [12, 10]],[1900, [14, 10]],[1950, [16, 10]],[2000, [2, 7777]],[2100, [4, 15]],[2200, [6, 15]],[2300, [8, 15]],[2400, [10, 15]],[2500, [2, 777]],[2600, [14, 15]],[2700, [16, 15]],[2800, [18, 15]],[2900, [0, 15]],[3000, [2, 777]],[3100, [4, 20]],[3200, [12, 20]],[3300, [16, 20]],[3400, [18, 20]],[3500, [2, 777]],[3600, [12, 25]],[3700, [14, 25]],[3800, [16, 25]],[3900, [18, 25]],[4000, [2, 30]],[4100, [0, 30]],[4200, [4, 30]],[4300, [6, 30]],[4400, [8, 30]],[4500, [10, 30]],[4600, [12, 30]],[4700, [14, 30]],[4800, [16, 30]],[4900, [18, 30]],[5000, [2, 50]],[5100, [2, 50]],[5200, [2, 50]],[5300, [2, 50]],[5400, [2, 50]]];
    $scope.earth.unlocks[2] = [[25, [5, 2]],[50, [5, 2]],[100, [5, 2]],[200, [5, 2]],[300, [5, 2]],[400, [5, 2]],[500, [4, 2]],[600, [4, 2]],[700, [4, 2]],[800, [4, 2]],[900, [4, 2]],[1000, [4, 3]],[1100, [4, 2]],[1200, [4, 2]],[1300, [4, 2]],[1400, [4, 2]],[1500, [4, 2]],[1600, [4, 2]],[1700, [4, 2]],[1800, [4, 2]],[1900, [4, 2]],[2000, [4, 5]],[2100, [4, 3]],[2200, [4, 3]],[2300, [4, 3]],[2400, [4, 3]],[2500, [4, 3]],[2600, [4, 3]],[2700, [4, 3]],[2800, [4, 3]],[2900, [4, 3]],[3000, [4, 3]],[3100, [4, 3]],[3200, [4, 3]],[3300, [4, 3]],[3400, [4, 3]],[3500, [4, 3]],[3600, [4, 3]],[3700, [4, 3]],[3800, [4, 3]],[3900, [4, 3]],[4000, [4, 5]],[4100, [4, 3]],[4200, [4, 3]],[4300, [4, 3]],[4400, [4, 3]],[4500, [4, 3]],[4600, [4, 3]],[4700, [4, 3]],[4800, [4, 3]],[4900, [4, 3]],[5000, [4, 5]],[5250, [4, 3]],[5500, [4, 3]]];
    $scope.earth.unlocks[3] = [[25, [7, 2]],[50, [7, 2]],[100, [7, 2]],[200, [7, 2]],[300, [7, 2]],[400, [7, 2]],[500, [6, 2]],[600, [6, 2]],[700, [6, 2]],[800, [6, 2]],[900, [6, 2]],[1000, [6, 3]],[1100, [6, 2]],[1200, [6, 2]],[1300, [6, 2]],[1400, [6, 2]],[1500, [6, 2]],[1600, [6, 2]],[1700, [6, 2]],[1800, [6, 2]],[1900, [6, 2]],[2000, [6, 5]],[2100, [6, 3]],[2200, [6, 3]],[2300, [6, 3]],[2400, [6, 3]],[2500, [6, 3]],[2600, [6, 3]],[2700, [6, 3]],[2800, [6, 3]],[2900, [6, 3]],[3000, [6, 3]],[3100, [6, 3]],[3200, [6, 3]],[3300, [6, 3]],[3400, [6, 3]],[3500, [6, 3]],[3600, [6, 3]],[3700, [6, 3]],[3800, [6, 5]],[3900, [6, 3]],[4000, [6, 5]],[4100, [6, 3]],[4200, [6, 3]],[4300, [6, 3]],[4400, [6, 3]],[4500, [6, 3]],[4600, [6, 3]],[4700, [6, 3]],[4800, [6, 3]],[4900, [6, 3]],[5000, [6, 5]],[5250, [6, 3]],[5500, [6, 3]],[5750, [6, 3]]];
    $scope.earth.unlocks[4] = [[25, [9, 2]],[50, [9, 2]],[100, [9, 2]],[200, [9, 2]],[300, [9, 2]],[400, [9, 2]],[500, [8, 2]],[600, [8, 2]],[700, [8, 2]],[800, [8, 2]],[900, [8, 2]],[1000, [8, 3]],[1100, [8, 2]],[1200, [8, 2]],[1300, [8, 2]],[1400, [8, 2]],[1500, [8, 2]],[1600, [8, 2]],[1700, [8, 2]],[1800, [8, 2]],[1900, [8, 2]],[2000, [8, 5]],[2100, [8, 3]],[2200, [8, 3]],[2300, [8, 3]],[2400, [8, 3]],[2500, [8, 3]],[2600, [8, 3]],[2700, [8, 3]],[2800, [8, 3]],[2900, [8, 3]],[3000, [8, 3]],[3100, [8, 3]],[3200, [8, 3]],[3300, [8, 3]],[3400, [8, 3]],[3500, [8, 3]],[3600, [8, 3]],[3700, [8, 3]],[3800, [8, 3]],[3900, [8, 3]],[4000, [8, 3]],[4100, [8, 3]],[4200, [8, 3]],[4300, [8, 3]],[4400, [8, 3]],[4500, [8, 3]],[4750, [8, 3]],[5000, [8, 3]],[5250, [8, 3]],[5500, [8, 3]],[5750, [8, 3]],[6000, [8, 3]],[6250, [8, 3]]];
    $scope.earth.unlocks[5] = [[25, [11, 2]],[50, [11, 2]],[100, [11, 2]],[200, [11, 2]],[300, [11, 2]],[400, [11, 2]],[500, [10, 2]],[600, [10, 2]],[700, [10, 2]],[800, [10, 2]],[900, [10, 2]],[1000, [10, 3]],[1100, [10, 2]],[1200, [10, 2]],[1300, [10, 2]],[1400, [10, 2]],[1500, [10, 2]],[1600, [10, 2]],[1700, [10, 2]],[1800, [10, 2]],[1900, [10, 2]],[2000, [10, 5]],[2100, [10, 3]],[2200, [10, 3]],[2300, [10, 3]],[2400, [10, 3]],[2500, [10, 3]],[2600, [10, 3]],[2700, [10, 3]],[2800, [10, 3]],[2900, [10, 3]],[3000, [10, 3]],[3250, [10, 5]],[3500, [10, 5]],[3750, [10, 3]],[4000, [10, 5]],[4250, [10, 3]],[4500, [10, 5]],[4750, [10, 3]],[5000, [10, 5]],[5250, [10, 3]],[5500, [10, 3]],[5750, [10, 3]],[6000, [10, 5]],[6250, [10, 3]],[6500, [10, 5]]];
    $scope.earth.unlocks[6] = [[25, [13, 2]],[50, [13, 2]],[100, [13, 2]],[200, [13, 2]],[300, [13, 2]],[400, [13, 2]],[500, [12, 2]],[600, [12, 2]],[700, [12, 2]],[800, [12, 2]],[900, [12, 2]],[1000, [12, 3]],[1100, [12, 2]],[1200, [12, 2]],[1300, [12, 2]],[1400, [12, 2]],[1500, [12, 2]],[1600, [12, 2]],[1700, [12, 2]],[1800, [12, 2]],[1900, [12, 2]],[2000, [12, 5]],[2100, [13, 2]],[2200, [12, 3]],[2300, [13, 2]],[2400, [12, 3]],[2500, [13, 2]],[2600, [12, 3]],[2700, [13, 2]],[2800, [12, 3]],[2900, [12, 3]],[3000, [12, 3]],[3250, [12, 3]],[3500, [12, 3]],[3750, [12, 3]],[4000, [12, 5]],[4250, [12, 3]],[4500, [12, 3]],[4750, [12, 3]],[5000, [12, 7]],[5250, [12, 3]],[5500, [12, 3]],[5750, [12, 3]],[6000, [12, 7]],[6250, [12, 3]],[6500, [12, 3]],[6750, [12, 3]],[7000, [12, 7]]];
    $scope.earth.unlocks[7] = [[25, [15, 2]],[50, [15, 2]],[100, [15, 2]],[200, [15, 2]],[300, [15, 2]],[400, [15, 2]],[500, [14, 2]],[600, [14, 2]],[700, [14, 2]],[800, [14, 2]],[900, [14, 2]],[1000, [14, 3]],[1100, [14, 2]],[1200, [14, 2]],[1300, [14, 2]],[1400, [14, 2]],[1500, [14, 2]],[1600, [14, 2]],[1700, [14, 2]],[1800, [14, 2]],[1900, [14, 2]],[2000, [14, 5]],[2100, [15, 2]],[2200, [14, 2]],[2300, [15, 2]],[2400, [14, 2]],[2500, [15, 2]],[2600, [14, 2]],[2700, [15, 2]],[2800, [14, 2]],[2900, [14, 2]],[3000, [14, 2]],[3250, [15, 2]],[3500, [14, 2]],[3750, [14, 2]],[4000, [14, 2]],[4250, [14, 3]],[4500, [14, 3]],[4750, [14, 3]],[5000, [14, 5]],[5250, [14, 3]],[5500, [14, 3]],[5750, [14, 3]],[6000, [14, 9]],[6250, [14, 3]],[6500, [14, 3]],[6750, [14, 3]],[7000, [14, 9]],[7250, [14, 3]],[7500, [14, 3]],[7750, [14, 3]]];
    $scope.earth.unlocks[8] = [[25, [17, 2]],[50, [17, 2]],[100, [17, 2]],[200, [17, 2]],[300, [17, 2]],[400, [17, 2]],[500, [16, 2]],[600, [16, 2]],[700, [16, 2]],[800, [16, 2]],[900, [16, 2]],[1000, [16, 3]],[1100, [16, 2]],[1200, [16, 2]],[1300, [16, 2]],[1400, [16, 2]],[1500, [16, 2]],[1600, [16, 2]],[1700, [16, 2]],[1800, [16, 2]],[1900, [16, 2]],[2000, [16, 5]],[2250, [17, 2]],[2500, [17, 2]],[2750, [17, 2]],[3000, [17, 2]],[3250, [17, 2]],[3500, [17, 2]],[3750, [17, 2]],[4000, [17, 2]],[4250, [16, 3]],[4500, [16, 3]],[4750, [16, 3]],[5000, [16, 5]],[5250, [16, 5]],[5500, [16, 3]],[5750, [16, 3]],[6000, [16, 5]],[6250, [16, 3]],[6500, [16, 3]],[6750, [16, 3]],[7000, [16, 5]],[7250, [16, 3]],[7500, [16, 3]],[7750, [16, 3]],[8000, [16, 5]],[8250, [16, 3]],[8500, [16, 3]]];
    $scope.earth.unlocks[9] = [[25, [19, 2]],[50, [19, 2]],[100, [19, 2]],[200, [19, 2]],[300, [19, 2]],[400, [19, 2]],[500, [18, 2]],[600, [18, 2]],[700, [18, 2]],[800, [18, 2]],[900, [18, 2]],[1000, [18, 3]],[1100, [18, 2]],[1200, [18, 2]],[1300, [18, 2]],[1400, [18, 2]],[1500, [18, 2]],[1600, [18, 2]],[1700, [18, 2]],[1800, [18, 2]],[1900, [18, 2]],[2000, [18, 5]],[2250, [19, 2]],[2500, [19, 2]],[2750, [19, 2]],[3000, [19, 2]],[3250, [19, 2]],[3500, [19, 2]],[3750, [19, 2]],[4000, [19, 2]],[4250, [19, 2]],[4500, [19, 2]],[4750, [19, 2]],[5000, [19, 2]],[5250, [18, 3]],[5500, [18, 3]],[5750, [18, 3]],[6000, [18, 5]],[6250, [18, 3]],[6500, [18, 3]],[6750, [18, 3]],[7000, [18, 7]],[7250, [18, 3]],[7500, [18, 3]],[7750, [18, 3]],[8000, [18, 3]],[8250, [18, 3]],[8500, [18, 3]],[8750, [18, 3]],[9000, [18, 7]],[9250, [18, 3]],[9500, [18, 3]],[9750, [18, 3]]];
    $scope.earth.unlocks[10] = [[25, [21, 2]],[50, [21, 2]],[100, [21, 2]],[200, [21, 2]],[300, [21, 2]],[400, [21, 2]],[500, [20, 2]],[600, [20, 2]],[666, [20, 2]],[700, [20, 2]],[777, [20, 2]],[800, [20, 2]],[900, [20, 2]],[1000, [20, 2]],[1100, [20, 2]],[1111, [20, 2]],[1200, [20, 2]],[1300, [20, 2]],[1400, [20, 2]],[1500, [20, 2]],[1600, [20, 2]],[1700, [20, 2]],[1800, [20, 2]],[1900, [20, 2]],[2000, [20, 2]],[2100, [20, 2]],[2200, [20, 2]],[2222, [20, 2]],[2300, [20, 2]],[2400, [20, 2]],[2500, [20, 2]],[2600, [20, 2]],[2700, [20, 2]],[2800, [20, 2]],[2900, [20, 2]],[3000, [20, 2]],[3100, [20, 2]],[3200, [20, 2]],[3300, [20, 2]],[3333, [20, 2]],[3400, [20, 2]],[3500, [20, 2]],[3600, [20, 2]],[3700, [20, 2]],[3800, [20, 2]],[3900, [20, 2]],[4000, [20, 2]],[4100, [20, 2]],[4200, [20, 2]],[4300, [20, 2]],[4400, [20, 2]],[4500, [20, 2]],[4600, [20, 2]],[4700, [20, 2]],[4800, [20, 2]],[4900, [20, 2]],[5000, [20, 2]]];
    $scope.earth.cashUpgrades = [[250000, [0, 3], false],[500000, [2, 3], false],[1000000, [4, 3], false],[5000000, [6, 3], false],[10000000, [8, 3], false],[25000000, [10, 3], false],[500000000, [12, 3], false],[10000000000, [14, 3], false],[50000000000, [16, 3], false],[250000000000, [18, 3], false],[1000000000000, [20, 3], false],[20000000000000, [0, 3], false],[50000000000000, [2, 3], false],[100000000000000, [4, 3], false],[500000000000000, [6, 3], false],[1e+15, [8, 3], false],[2e+15, [10, 3], false],[5e+15, [12, 3], false],[7e+15, [14, 3], false],[1e+16, [16, 3], false],[2e+16, [18, 3], false],[5e+16, [20, 3], false],[1e+17, [22, 1], false],[2e+18, [0, 3], false],[5e+18, [2, 3], false],[7e+18, [4, 3], false],[1e+19, [6, 3], false],[2e+19, [8, 3], false],[3.5e+19, [10, 3], false],[5e+19, [12, 3], false],[7.5e+19, [14, 3], false],[1e+20, [16, 3], false],[2e+20, [18, 3], false],[5e+20, [20, 3], false],[1e+21, [22, 1], false],[2.5e+22, [0, 3], false],[5e+22, [2, 3], false],[1e+23, [4, 3], false],[2e+23, [6, 3], false],[3e+23, [8, 3], false],[4e+23, [10, 3], false],[5e+23, [12, 3], false],[6e+23, [14, 3], false],[7e+23, [16, 3], false],[8e+23, [18, 3], false],[9e+23, [20, 3], false],[1e+25, [22, 2], false],[1e+27, [0, 7], false],[5e+27, [2, 7], false],[2.5e+28, [4, 7], false],[1e+29, [6, 7], false],[2.5e+29, [8, 7], false],[5e+29, [10, 7], false],[1e+30, [12, 7], false],[5e+30, [14, 7], false],[2.5e+31, [16, 7], false],[5e+31, [18, 7], false],[1e+42, [20, 7], false],[5e+42, [2, 3], false],[2.5e+43, [4, 3], false],[5e+43, [6, 3], false],[1e+44, [8, 3], false],[2.5e+44, [10, 3], false],[5e+44, [12, 3], false],[1e+45, [14, 3], false],[5e+45, [16, 3], false],[1e+46, [18, 3], false],[2.5e+46, [0, 3], false],[1e+47, [20, 3], false],[2.5e+47, [2, 3], false],[5e+47, [4, 3], false],[7.5e+47, [6, 3], false],[1e+48, [8, 3], false],[5e+48, [10, 3], false],[1.5e+49, [12, 3], false],[5e+49, [14, 3], false],[1e+50, [16, 3], false],[2.5e+50, [18, 3], false],[5e+50, [0, 3], false],[1e+51, [20, 7], false],[1e+54, [20, 5], false],[1e+60, [20, 7], false],[1e+61, [2, 3], false],[1e+62, [4, 3], false],[1e+66, [20, 9], false],[1e+67, [6, 3], false],[1e+68, [8, 3], false],[1e+72, [20, 11], false],[1e+73, [10, 3], false],[1e+74, [12, 3], false],[1e+75, [20, 13], false],[1e+76, [14, 3], false],[1e+77, [16, 3], false],[1e+78, [20, 15], false],[1e+79, [18, 3], false],[1e+80, [0, 3], false],[1e+84, [20, 3], false],[3e+87, [20, 3.1415926], false],[1e+90, [2, 3], false],[5e+90, [4, 3], false],[2.5e+91, [6, 3], false],[5e+91, [8, 3], false],[1e+92, [10, 3], false],[2.5e+92, [12, 3], false],[5e+92, [14, 3], false],[1e+93, [16, 3], false],[5e+93, [18, 3], false],[1e+94, [0, 3], false],[5e+95, [20, 2], false],[2e+96, [2, 2], false],[1.1e+97, [4, 2], false],[6.6e+97, [6, 2], false],[2.3e+98, [8, 2], false],[4e+98, [10, 2], false],[7e+98, [12, 2], false],[4e+99, [14, 2], false],[1e+100, [20, 3], false],[2e+100, [20, 6], false],[2.9e+100, [16, 2], false],[1.45e+101, [18, 2], false],[3e+101, [0, 2], false],[5e+101, [20, 2], false],[1e+102, [20, 5], false],[5e+102, [4, 3], false],[1.5e+104, [4, 3], false],[4e+104, [4, 3], false],[9e+104, [6, 3], false],[6e+105, [6, 3], false],[1.5e+106, [6, 3], false],[6e+106, [8, 2], false],[1.85e+107, [8, 3], false],[5e+107, [8, 3], false],[6e+107, [20, 3], false],[7.5e+107, [10, 2], false],[5e+108, [10, 3], false],[4.5e+109, [10, 3], false],[1.25e+110, [12, 3], false],[3e+110, [12, 3], false],[9e+110, [12, 3], false],[1e+111, [20, 3], false],[5e+111, [14, 2], false],[7e+112, [14, 3], false],[2.5e+113, [14, 3], false],[5e+113, [16, 3], false],[9e+113, [16, 3], false],[3e+114, [16, 3], false],[1.5e+115, [18, 3], false],[7.5e+115, [18, 3], false],[4e+116, [18, 3], false],[4.5e+116, [20, 3], false],[5e+116, [0, 3], false],[7.5e+116, [0, 3], false],[1e+117, [0, 3], false],[2e+117, [2, 3], false],[2e+118, [2, 3], false],[1.5e+119, [2, 3], false],[3.5e+119, [20, 5], false],[5e+119, [20, 3], false],[7e+119, [2, 3], false],[9.5e+119, [4, 3], false],[4e+120, [6, 3], false],[9e+120, [8, 3], false],[2.4e+121, [10, 3], false],[1.11e+122, [12, 3], false],[2.22e+122, [14, 3], false],[3.33e+122, [16, 3], false],[4.44e+122, [18, 3], false],[5.55e+122, [0, 3], false],[6.66e+122, [20, 6.66], false],[1e+123, [20, 3], false],[3e+123, [2, 3], false],[6e+123, [4, 3], false],[1.2e+124, [6, 3], false],[2.4e+124, [8, 3], false],[4.8e+124, [10, 3], false],[9.6e+124, [12, 3], false],[1.92e+125, [14, 3], false],[3.84e+125, [16, 3], false],[7.68e+125, [18, 3], false],[1e+126, [0, 3], false],[1e+127, [20, 5], false],[2e+129, [4, 3], false],[5e+129, [16, 3], false],[1.3e+130, [6, 3], false],[2.9e+130, [18, 3], false],[7.1e+130, [0, 3], false],[1.77e+131, [12, 3], false],[2.5e+131, [2, 3], false],[3.1e+131, [14, 3], false],[5.55e+131, [8, 3], false],[7.36e+131, [10, 3], false],[9e+131, [20, 2], false],[5e+132, [2, 2], false],[9.5e+133, [4, 2], false],[2.13e+134, [6, 2], false],[4e+134, [8, 2], false],[9.85e+134, [10, 2], false],[8e+135, [12, 2], false],[2.9e+136, [14, 2], false],[2.22e+137, [16, 2], false],[5e+137, [18, 2], false],[9e+137, [0, 2], false],[5e+138, [20, 3], false],[1.36e+140, [2, 3], false],[7e+140, [4, 3], false],[9.25e+140, [6, 3], false],[3e+141, [20, 3], false],[2.1e+142, [8, 3], false],[5.5e+142, [10, 3], false],[1.11e+143, [12, 3], false],[2.23e+143, [14, 3], false],[3.93e+143, [16, 3], false],[6e+143, [18, 3], false],[7.99e+143, [0, 3], false],[2e+144, [20, 3], false],[3e+144, [2, 3], false],[6e+144, [4, 3], false],[9e+144, [6, 3], false],[2.1e+145, [8, 3], false],[4.4e+145, [10, 3], false],[8.9e+145, [12, 3], false],[1.29e+146, [14, 3], false],[1.8e+146, [16, 3], false],[2.1e+146, [18, 3], false],[3e+146, [0, 3], false],[4.5e+146, [20, 2.71828], false],[5e+147, [10, 5], false],[3e+148, [2, 5], false],[1.8e+149, [4, 5], false],[9e+149, [16, 5], false],[5e+150, [6, 5], false],[2e+151, [18, 5], false],[8e+151, [8, 5], false],[2.4e+152, [0, 5], false],[7.2e+152, [12, 5], false],[2.1e+154, [14, 5], false],[5e+155, [20, 4.44444444444], false],[7.77e+155, [10, 2], false],[8.88e+155, [2, 2], false],[9.99e+155, [4, 2], false],[2e+156, [16, 2], false],[4e+156, [6, 2], false],[8e+156, [18, 2], false],[1.6e+157, [8, 2], false],[3.2e+157, [0, 2], false],[6.4e+157, [12, 2], false],[1.28e+158, [14, 2], false],[5.14e+158, [20, 2.99792458], false],[1e+159, [10, 3], false],[1e+160, [2, 3], false],[2.5e+160, [4, 3], false],[5e+160, [16, 3], false],[7.5e+160, [6, 3], false],[1e+161, [18, 3], false],[1.5e+161, [8, 3], false],[2e+161, [0, 3], false],[3e+161, [12, 3], false],[4e+161, [14, 3], false],[9e+161, [20, 2.35711], false],[1e+162, [14, 24], false],[2.5e+164, [20, 2], false],[5e+164, [2, 22], false],[7.5e+164, [20, 2], false],[1e+165, [4, 20], false],[2.5e+167, [20, 2], false],[5e+167, [16, 18], false],[7.5e+167, [20, 2], false],[1e+168, [10, 16], false],[2.5e+170, [20, 2], false],[5e+170, [12, 14], false],[7.5e+170, [20, 2], false],[1e+171, [18, 12], false],[2.5e+173, [20, 2], false],[5e+173, [0, 10], false],[7.5e+173, [20, 2], false],[1e+174, [6, 8], false],[2.5e+176, [20, 2], false],[5e+176, [8, 4], false],[1e+177, [20, 9], false],[5e+183, [20, 9.87654321], false],[5e+189, [20, 5], false],[2.7e+193, [20, 3], false],[1.3e+196, [20, 4], false],[2e+198, [20, 5], false],[1e+201, [0, 3], false],[1.4e+202, [2, 3], false],[9.6e+202, [4, 3], false],[1.98e+203, [6, 3], false],[3.22e+203, [8, 3], false],[6.79e+203, [10, 3], false],[8.88e+203, [12, 3], false],[1.9e+205, [14, 3], false],[8.1e+205, [16, 3], false],[1.99e+206, [18, 3], false],[2.33e+206, [0, 3], false],[4.21e+206, [2, 3], false],[6.07e+206, [4, 3], false],[7.77e+206, [6, 3], false],[9.1e+206, [8, 3], false],[2e+207, [10, 3], false],[9e+207, [12, 3], false],[4.5e+208, [14, 3], false],[2e+209, [16, 3], false],[3.28e+209, [18, 3], false],[6e+209, [20, 5], false],[1e+214, [0, 11], false],[1e+214, [2, 11], false],[1e+214, [4, 11], false],[1e+214, [6, 11], false],[1e+214, [8, 11], false],[1e+214, [10, 11], false],[1e+214, [12, 11], false],[1e+214, [14, 11], false],[1e+214, [16, 11], false],[1e+214, [18, 11], false],[1.5e+215, [0, 3], false],[1.66e+215, [2, 3], false],[1.93e+215, [4, 3], false],[4.1e+215, [6, 3], false],[6.78e+215, [8, 3], false],[9e+215, [10, 3], false],[1.2e+217, [12, 3], false],[6.7e+217, [14, 3], false],[1.23e+218, [16, 3], false],[3.21e+218, [18, 3], false],[5.55e+218, [20, 5], false],[8e+218, [0, 3], false],[8e+218, [2, 3], false],[8e+218, [4, 3], false],[9e+218, [6, 3], false],[3e+219, [8, 3], false],[4e+219, [10, 3], false],[5e+219, [12, 3], false],[6e+219, [14, 3], false],[3e+221, [16, 3], false],[4.21e+221, [18, 3], false],[6e+221, [0, 3], false],[7.89e+221, [2, 3], false],[8.45e+221, [4, 3], false],[2e+222, [6, 3], false],[5e+222, [8, 3], false],[1.4e+223, [10, 3], false],[5.4e+223, [12, 3], false],[1.08e+224, [14, 3], false],[2.19e+224, [16, 3], false],[4.68e+224, [18, 3], false],[1e+228, [0, 7], false],[1e+228, [2, 7], false],[1e+228, [4, 7], false],[1e+228, [6, 7], false],[1e+228, [8, 7], false],[1e+228, [10, 7], false],[1e+228, [12, 7], false],[1e+228, [14, 7], false],[1e+228, [16, 7], false],[1e+228, [18, 7], false],[1e+230, [20, 5], false],[3e+231, [0, 3], false],[8e+231, [2, 3], false],[6.9e+232, [4, 3], false],[1.88e+233, [6, 3], false],[2.39e+233, [8, 3], false],[4.11e+233, [10, 3], false],[7e+233, [12, 3], false],[9.12e+233, [14, 3], false],[1.2e+235, [16, 3], false],[2.4e+235, [18, 3], false],[6.3e+235, [0, 3], false],[1.99e+236, [2, 3], false],[3.98e+236, [4, 3], false],[5.66e+236, [6, 3], false],[7e+236, [8, 3], false],[8e+236, [10, 3], false],[9e+236, [12, 3], false],[1.2e+238, [14, 3], false],[2.5e+238, [16, 3], false],[5e+238, [18, 3], false],[1e+240, [0, 2], false],[5e+240, [2, 2], false],[9e+240, [4, 2], false],[2.1e+241, [6, 2], false],[4.5e+241, [8, 2], false],[8.9e+241, [10, 2], false],[1.53e+242, [12, 2], false],[2.99e+242, [14, 2], false],[5.77e+242, [16, 2], false],[8.13e+242, [18, 2], false],[2e+243, [0, 2], false],[2.2e+244, [2, 2], false],[4.4e+244, [4, 2], false],[6.6e+244, [6, 2], false],[8.8e+244, [8, 2], false],[1.11e+245, [10, 2], false],[2.22e+245, [12, 2], false],[3.33e+245, [14, 2], false],[4.44e+245, [16, 2], false],[5.55e+245, [18, 2], false],[1e+252, [20, 5], false],[1e+253, [0, 3], false],[1e+253, [2, 3], false],[1e+253, [4, 3], false],[1e+253, [6, 3], false],[1e+253, [8, 3], false],[1e+253, [10, 3], false],[1e+253, [12, 3], false],[1e+253, [14, 3], false],[1e+253, [16, 3], false],[1e+253, [18, 3], false],[5e+253, [0, 9], false],[7.5e+253, [2, 9], false],[1.25e+254, [4, 9], false],[6.25e+254, [6, 9], false],[3e+255, [8, 9], false],[1.5e+256, [10, 9], false],[7.5e+256, [12, 9], false],[3.75e+257, [14, 9], false],[1e+258, [16, 9], false],[8e+257, [18, 9], false],[2.5e+258, [20, 2], false],[6.4e+258, [0, 3], false],[1.22e+259, [2, 3], false],[2.33e+260, [4, 3], false],[3.99e+260, [6, 3], false],[7.66e+260, [8, 3], false],[1e+261, [10, 3], false],[1.9e+262, [12, 3], false],[9.8e+262, [14, 3], false],[2.6e+263, [16, 3], false],[5.44e+263, [18, 3], false],[7e+263, [0, 3], false],[1e+264, [2, 3], false],[4.5e+265, [4, 3], false],[6.9e+265, [6, 3], false],[8.9e+265, [8, 3], false],[1.89e+266, [10, 3], false],[2.89e+266, [12, 3], false],[4.48e+266, [14, 3], false],[9e+266, [16, 3], false],[5e+267, [18, 3], false],[1e+270, [20, 5], false],[1e+273, [0, 7], false],[2e+273, [2, 7], false],[3e+273, [4, 7], false],[6e+273, [6, 7], false],[2.5e+274, [8, 7], false],[2e+275, [10, 7], false],[6e+275, [12, 7], false],[9.99e+275, [14, 7], false],[1.5e+277, [16, 7], false],[3e+277, [18, 7], false],[1e+285, [2, 13], false],[1e+285, [4, 13], false],[1e+285, [6, 13], false],[1e+285, [8, 13], false],[1e+285, [10, 13], false],[1e+285, [12, 13], false],[1e+285, [14, 13], false],[1e+285, [16, 13], false],[1e+285, [18, 13], false]];
    $scope.earth.angelUpgrades = [[10000, [20, 3], false, false],[100000, [22, 2], false, false],[100000000, [22, 2], false, false],[1000000000, [20, 5], false, false],[100000000000, [20, 9], false, false],[25000000, [31, 10], false, false],[25000000, [32, 10], false, false],[25000000, [33, 10], false, false],[25000000, [34, 10], false, false],[250000000, [31, 50], false, false],[250000000, [32, 50], false, false],[250000000, [33, 50], false, false],[250000000, [34, 50], false, false],[25000000000, [31, 50], false, false],[25000000000, [32, 50], false, false],[25000000000, [33, 50], false, false],[25000000000, [34, 50], false, false],[1000000000000, [20, 11], false, false],[250000000000000, [2, 3], false, false],[750000000000000, [4, 3], false, false],[2e+15, [6, 3], false, false],[5e+15, [8, 3], false, false],[1e+16, [10, 3], false, false],[2.5e+16, [12, 3], false, false],[7.5e+16, [14, 3], false, false],[2e+17, [16, 3], false, false],[4e+17, [18, 3], false, false],[1e+18, [0, 3], false, false],[1e+21, [20, 15], false, false],[1e+22, [31, 75], false, false],[1e+22, [32, 75], false, false],[1e+22, [33, 75], false, false],[1e+22, [34, 75], false, false],[1e+22, [35, 75], false, false],[1e+23, [31, 75], false, false],[1e+23, [32, 75], false, false],[1e+23, [33, 75], false, false],[1e+23, [34, 75], false, false],[1e+23, [35, 75], false, false],[1e+31, [31, 100], false, false],[1e+32, [32, 100], false, false],[1e+33, [22, 10], false, false],[1e+34, [20, 15], false, false],[1e+36, [20, 3], false, false],[1e+40, [20, 5], false, false],[1e+42, [20, 5], false, false],[2e+42, [31, 50], false, false],[1e+47, [4, 4], false, false],[2e+47, [6, 6], false, false],[7e+47, [8, 3], false, false],[2e+48, [10, 3], false, false],[2.5e+49, [12, 3], false, false],[5e+50, [14, 3], false, false],[2e+52, [16, 3], false, false],[8e+52, [18, 3], false, false],[1.5e+53, [0, 3], false, false],[3e+53, [2, 3], false, false],[5e+53, [22, 10], false, false],[1e+54, [2, 3], false, false],[4e+54, [4, 3], false, false],[9e+54, [6, 3], false, false],[2.5e+55, [8, 3], false, false],[7.5e+55, [10, 3], false, false],[1.77e+56, [12, 3], false, false],[3e+56, [14, 3], false, false],[5e+56, [16, 3], false, false],[8e+56, [18, 3], false, false],[1e+57, [0, 3], false, false],[3e+61, [31, 30], false, false],[3e+61, [32, 30], false, false],[3e+61, [33, 30], false, false],[3e+61, [34, 30], false, false],[3e+61, [36, 30], false, false],[1e+62, [20, 5], false, false],[2e+63, [2, 3], false, false],[2e+63, [4, 3], false, false],[2e+63, [6, 3], false, false],[2e+63, [8, 3], false, false],[2e+63, [10, 3], false, false],[2e+63, [12, 3], false, false],[2e+63, [14, 3], false, false],[2e+63, [16, 3], false, false],[2e+63, [18, 3], false, false],[2e+63, [0, 3], false, false],[1e+65, [20, 7], false, false],[1e+66, [2, 3], false, false],[4e+66, [4, 3], false, false],[1.3e+67, [6, 3], false, false],[2e+67, [8, 3], false, false],[2.9e+67, [10, 3], false, false],[3.8e+67, [12, 3], false, false],[5.2e+67, [14, 3], false, false],[6.7e+67, [16, 3], false, false],[7.2e+67, [18, 3], false, false],[9.6e+67, [0, 3], false, false],[1.25e+68, [31, 50], false, false],[7.77e+68, [20, 7.777777], false, false],[5e+69, [31, 10], false, false],[5e+69, [32, 10], false, false],[5e+69, [33, 10], false, false],[5e+69, [34, 10], false, false],[5e+69, [35, 10], false, false],[5e+69, [36, 10], false, false],[5e+69, [37, 10], false, false],[5e+69, [38, 10], false, false],[5e+69, [39, 10], false, false],[5e+69, [30, 10], false, false],[1e+72, [2, 3], false, false],[5e+72, [4, 3], false, false],[2.2e+73, [6, 3], false, false],[4.4e+73, [8, 3], false, false],[1.11e+74, [10, 3], false, false],[2.22e+74, [12, 3], false, false],[3.33e+74, [14, 3], false, false],[4.44e+74, [16, 3], false, false],[5.55e+74, [18, 3], false, false],[6.66e+74, [0, 3], false, false],[2.5e+76, [32, 25], false, false],[2.5e+76, [31, 25], false, false],[2.5e+76, [33, 25], false, false],[2.5e+76, [34, 25], false, false],[2.5e+76, [35, 25], false, false],[2.5e+76, [36, 25], false, false],[2.5e+76, [37, 25], false, false],[2.5e+76, [38, 25], false, false],[2.5e+76, [39, 25], false, false],[2.5e+76, [30, 25], false, false],[1.1e+79, [2, 3], false, false],[2.7e+79, [4, 3], false, false],[4.3e+79, [6, 3], false, false],[8.7e+79, [8, 3], false, false],[1.9e+80, [10, 3], false, false],[3.21e+80, [12, 3], false, false],[4.95e+80, [14, 3], false, false],[6e+80, [16, 3], false, false],[7.25e+80, [18, 3], false, false],[8.98e+80, [0, 3], false, false],[3e+84, [20, 13.11], false, false],[1.3e+88, [20, 5], false, false],[3e+90, [20, 3], false, false],[1.3e+94, [20, 4], false, false],[2.4e+97, [20, 5], false, false],[1e+102, [31, 25], false, false],[1e+102, [32, 25], false, false],[1e+102, [33, 25], false, false],[1e+102, [34, 25], false, false],[1e+102, [35, 25], false, false],[1e+102, [36, 25], false, false],[1e+102, [37, 25], false, false],[1e+102, [38, 25], false, false],[1e+102, [39, 25], false, false],[1e+102, [30, 25], false, false],[3.33e+110, [20, 3], false, false],[1e+114, [2, 3], false, false],[2e+115, [4, 3], false, false],[5e+115, [6, 3], false, false],[1e+116, [8, 3], false, false],[2e+116, [10, 3], false, false],[3e+116, [12, 3], false, false],[4e+116, [14, 3], false, false],[5e+116, [16, 3], false, false],[7.5e+116, [18, 3], false, false],[2e+117, [0, 3], false, false],[1e+129, [31, 25], false, false],[1e+129, [32, 25], false, false],[1e+129, [33, 25], false, false],[1e+129, [34, 25], false, false],[1e+129, [35, 25], false, false],[1e+129, [36, 25], false, false],[1e+129, [37, 25], false, false],[1e+129, [38, 25], false, false],[1e+129, [39, 25], false, false],[1e+129, [30, 25], false, false],[1e+138, [2, 3], false, false],[4e+138, [4, 3], false, false],[1.6e+139, [6, 3], false, false],[5.6e+139, [8, 3], false, false],[1e+140, [10, 3], false, false],[2.11e+140, [12, 3], false, false],[3.49e+140, [14, 3], false, false],[4.43e+140, [16, 3], false, false],[5.67e+140, [18, 3], false, false],[7.01e+140, [0, 3], false, false],[9e+140, [31, 25], false, false],[9e+140, [32, 25], false, false],[9e+140, [33, 25], false, false],[9e+140, [34, 25], false, false],[9e+140, [35, 25], false, false],[9e+140, [36, 25], false, false],[9e+140, [37, 25], false, false],[9e+140, [38, 25], false, false],[9e+140, [39, 25], false, false],[9e+140, [30, 25], false, false],[1e+140, [20, 19], false, false]];
    $scope.earth.managerUpgrades = [[[10e+9, false],[9e+126, false]],[[1e+9, false],[10e+102, false]],[[100e+6, false],[3e+120, false]],[[10e+6, false],[100e+111, false]],[[1e+6, false],[3e+117, false]],[[100000, false],[750e+117, false]],[[9999, false],[75e+105, false]],[[1000, false],[250e+108, false]],[[100, false],[50e+114, false]],[[10, false],[33e+123, false]]];
    $scope.evil.unlocks[0] = [[50, [0, 2]], [100, [10, 0.5]], [150, [0, 3]], [150, [10, 0.5]], [200, [0, 4]], [300, [10, 0.5]], [400, [0, 5]], [500, [10, 0.5]], [600, [0, 6]], [700, [10, 0.5]], [800, [0, 7]], [900, [10, 0.5]], [1000, [0, 8]], [1100, [10, 0.5]], [1200, [0, 9]], [1300, [10, 0.5]], [1500, [0, 10]]];
    $scope.evil.unlocks[1] = [[50, [2, 5]], [75, [12, 0.9]], [100, [2, 5]], [125, [12, 0.9]], [150, [2, 5]], [200, [12, 0.9]], [250, [2, 5]], [300, [12, 0.9]], [350, [2, 5]], [375, [12, 0.9]], [400, [2, 5]], [450, [12, 0.9]], [500, [2, 5]], [550, [12, 0.9]], [600, [2, 5]], [700, [12, 0.9]], [800, [2, 5]]];
    $scope.evil.unlocks[2] = [[10, [4, 10]], [20, [14, 0.5]], [40, [4, 9]], [60, [14, 0.5]], [80, [4, 8]], [100, [14, 0.5]], [120, [4, 7]], [140, [14, 0.5]], [160, [4, 6]], [180, [14, 0.5]], [200, [4, 5]], [230, [14, 0.5]], [260, [4, 4]], [290, [14, 0.5]], [320, [4, 3]], [350, [14, 0.5]], [400, [4, 2]]];
    $scope.evil.unlocks[3] = [[6, [6, 25]], [12, [16, 0.5]], [24, [6, 25]], [36, [16, 0.5]], [48, [6, 25]], [60, [16, 0.5]], [72, [6, 25]], [84, [16, 0.5]], [96, [6, 25]], [108, [16, 0.5]], [120, [6, 25]], [140, [16, 0.5]], [160, [6, 25]], [180, [16, 0.5]], [200, [6, 25]], [225, [16, 0.5]], [250, [6, 25]]];
    $scope.evil.unlocks[4] = [[10, [0, 9]], [20, [2, 9]], [40, [4, 9]], [55, [6, 9]], [70, [8, 15]], [85, [0, 15]], [100, [2, 15]], [125, [4, 15]], [150, [6, 15]]];
    $scope.evil.unlocks[5] = [[111, [10, 3]], [222, [1, 0.8]], [444, [10, 4]], [666, [1, 0.8]], [888, [10, 5]], [1000, [1, 0.8]], [1200, [10, 6]], [1400, [1, 0.8]], [1600, [10, 7]], [1900, [1, 0.8]], [2200, [10, 8]], [2500, [1, 0.8]], [2750, [10, 9]], [3000, [1, 0.8]], [3250, [10, 10]], [3500, [1, 0.8]], [4444, [10, 11]]];
    $scope.evil.unlocks[6] = [[33, [12, 2]], [77, [3, 0.8]], [111, [12, 2]], [222, [3, 0.8]], [333, [12, 2]], [444, [3, 0.8]], [555, [12, 2]], [666, [3, 0.8]], [777, [12, 2]], [888, [3, 0.8]], [999, [12, 2]], [1111, [3, 0.8]], [1234, [12, 2]], [1333, [3, 0.8]], [1444, [12, 2]], [1499, [3, 0.8]], [1500, [12, 2]]];
    $scope.evil.unlocks[7] = [[5, [14, 2]], [25, [5, 0.5]], [50, [14, 3]], [75, [5, 0.5]], [100, [14, 4]], [125, [5, 0.5]], [150, [14, 5]], [175, [5, 0.5]], [200, [14, 6]], [225, [5, 0.5]], [250, [14, 7]], [275, [5, 0.5]], [300, [14, 8]], [325, [5, 0.5]], [333, [14, 9]], [444, [5, 0.5]], [555, [14, 10]]];
    $scope.evil.unlocks[8] = [[5, [16, 25]], [10, [7, 0.5]], [20, [16, 25]], [30, [7, 0.5]], [40, [16, 25]], [50, [7, 0.5]], [60, [16, 25]], [70, [7, 0.5]], [80, [16, 25]], [90, [7, 0.5]], [100, [16, 25]], [120, [7, 0.5]], [140, [16, 25]], [160, [7, 0.5]], [180, [16, 25]], [200, [7, 0.5]], [222, [16, 25]]];
    $scope.evil.unlocks[9] = [[5, [21, 0.8]], [10, [21, 0.8]], [20, [21, 0.8]], [30, [21, 0.8]], [40, [21, 0.8]], [50, [21, 0.8]], [60, [21, 0.8]], [70, [21, 0.8]], [90, [21, 0.8]]];
    $scope.evil.unlocks[10] = [[1, [20, 10]], [5, [20, 10]], [10, [20, 10]], [15, [21, 2]], [20, [21, 2]], [25, [21, 10]], [35, [21, 5]], [40, [20, 10]], [50, [20, 10]], [65, [21, 5]], [70, [20, 10]], [75, [21, 10]], [100, [20, 10]]];
    $scope.evil.cashUpgrades = [[1000, [0, 5], false], [10000, [2, 5], false], [100000, [4, 5], false], [1000000, [6, 5], false], [10000000, [8, 5], false], [100000000, [10, 5], false], [10e+8, [12, 5], false], [10e+9, [14, 5], false], [10e+10, [16, 5], false], [10e+11, [18, 5], false], [10e+12, [20, 5], false], [10e+13, [0, 6], false], [10e+14, [2, 6], false], [10e+15, [4, 6], false], [10e+16, [6, 6], false], [10e+17, [8, 6], false], [10e+18, [10, 6], false], [10e+19, [12, 6], false], [10e+20, [14, 6], false], [10e+21, [16, 6], false], [10e+22, [18, 6], false]];
    $scope.evil.angelUpgrades = [[10, [22, 1], false, false], [10000, [22, 1], false, false], [1000000, [22, 1], false, false], [10000000, [22, 1], false, false], [100000000, [22, 1], false, false], [10e+9, [22, 1], false, false], [10e+11, [22, 1], false, false], [10e+13, [22, 2], false, false], [10e+15, [22, 2], false, false], [10e+17, [22, 2], false, false], [10e+19, [22, 2], false, false], [10e+21, [22, 2], false, false]];
    $scope.evil.managerUpgrades = [];
    $scope.moon.unlocks[0] = [[10, [0, 3.5]],[20, [0, 4]],[40, [0, 4.5]],[80, [0, 5]],[160, [0, 5.5]],[320, [0, 6]],[640, [0, 6.5]],[1280, [0, 7]],[2560, [0, 7.5]],[5120, [0, 999999999]],[10000, [0, 3.5]]];
    $scope.moon.unlocks[1] = [[30, [2, 1.5]],[60, [2, 1.75]],[90, [2, 2]],[120, [2, 2.25]],[160, [2, 2.5]],[200, [2, 2.75]],[240, [2, 3]],[280, [2, 3.25]],[330, [2, 3.5]],[380, [2, 3.75]],[430, [2, 4]],[480, [2, 4.25]],[540, [2, 4.5]],[600, [2, 4.75]],[660, [2, 5]],[720, [2, 5.5]],[790, [2, 5.75]],[860, [2, 6]],[940, [2, 6.25]],[1020, [2, 6.5]],[1110, [2, 6.75]],[1200, [2, 7]],[1400, [2, 7.25]],[1600, [2, 7.5]],[1800, [2, 7.75]],[2000, [2, 999999999]],[2400, [2, 8.5]]];
    $scope.moon.unlocks[2] = [[10, [4, 3]],[20, [4, 3]],[40, [4, 3]],[60, [4, 3]],[80, [4, 3]],[100, [4, 3]],[120, [4, 3]],[240, [4, 3]],[360, [10, 3]],[480, [4, 3]],[600, [4, 3]],[840, [12, 3]],[1080, [4, 3]],[1320, [4, 3]],[1560, [18, 3]],[1800, [4, 3]],[2160, [4, 3]],[2520, [4, 3]],[2880, [4, 3]],[3240, [4, 33]],[3600, [4, 33]],[4000, [4, 33]],[4400, [4, 33]],[4800, [4, 33]],[5200, [4, 3333]],[5600, [4, 3333]],[6000, [4, 3333]],[6666, [4, 3333]]];
    $scope.moon.unlocks[3] = [[25, [6, 3]],[50, [6, 3]],[75, [6, 3]],[100, [6, 3]],[150, [6, 6]],[200, [6, 6]],[250, [6, 6]],[300, [6, 6]],[350, [6, 6]],[400, [6, 6]],[450, [6, 6]],[500, [6, 12]],[700, [6, 24]],[900, [6, 36]],[1100, [6, 48]],[1300, [6, 60]],[1500, [6, 72]],[1700, [6, 84]],[1900, [6, 96]],[2100, [6, 108]],[2300, [6, 120]],[2500, [6, 144]]];
    $scope.moon.unlocks[4] = [[20, [8, 12]],[50, [8, 12]],[90, [8, 12]],[180, [8, 22]],[360, [8, 333]],[720, [8, 4444]],[1440, [8, 55555]],[2880, [8, 666666]],[5720, [8, 7777777]]];
    $scope.moon.unlocks[5] = [[50, [10, 7]],[100, [10, 7]],[200, [10, 7]],[300, [10, 7]],[400, [10, 7]],[500, [10, 7]],[600, [10, 7]],[700, [10, 7]],[800, [10, 7]],[900, [10, 7]],[1000, [10, 7]],[1200, [10, 7]],[1400, [10, 7]],[1600, [10, 7]],[1800, [10, 7]],[2000, [10, 7]],[2200, [10, 777]],[2400, [10, 777]],[2600, [10, 777]],[2800, [10, 777]],[3000, [10, 777]]];
    $scope.moon.unlocks[6] = [[8, [12, 5]],[16, [12, 5]],[32, [12, 5]],[64, [12, 5]],[128, [12, 5]],[256, [12, 5]],[512, [12, 5]],[1024, [12, 5]],[2048, [12, 88888888]],[4096, [12, 88888888]]];
    $scope.moon.unlocks[7] = [[80, [14, 8]],[160, [14, 8]],[240, [14, 8]],[320, [14, 8]],[480, [14, 8]],[640, [14, 8]],[800, [14, 8]],[960, [14, 8]],[1200, [14, 8]],[1440, [14, 888]],[1680, [14, 888]],[1920, [14, 888]],[2160, [14, 888]],[2300, [14, 888]],[2540, [14, 888]],[2780, [14, 888]],[3000, [14, 888]]];
    $scope.moon.unlocks[8] = [[25, [16, 3]],[50, [16, 3]],[75, [16, 3]],[100, [16, 3]],[150, [16, 3]],[200, [16, 3]],[250, [16, 3]],[300, [16, 3]],[350, [16, 3]],[400, [16, 3]],[450, [16, 3]],[500, [16, 3]],[600, [16, 3]],[700, [16, 3]],[800, [16, 3]],[900, [16, 3]],[1000, [16, 3]],[1200, [16, 3]],[1400, [16, 3]],[1600, [16, 3]],[1800, [16, 3]],[2000, [16, 3]],[2300, [16, 3]],[2600, [16, 3]],[2900, [16, 33]],[3200, [16, 33]],[3500, [16, 9876543210]],[3800, [16, 33]],[4100, [16, 33]]];
    $scope.moon.unlocks[9] = [[50, [18, 75]],[100, [18, 75]],[200, [18, 75]],[300, [18, 75]],[400, [18, 75]],[500, [18, 75]],[600, [18, 75]],[700, [18, 75]],[800, [18, 75]],[900, [18, 75]],[1000, [18, 75]],[1111, [18, 75]]];
    $scope.moon.unlocks[10] = [[1, [21, 2]],[5, [21, 2]],[25, [21, 2]],[50, [21, 2]],[75, [21, 2]],[100, [21, 2]],[150, [21, 2]],[200, [21, 2]],[250, [21, 2]],[300, [21, 2]],[350, [21, 2]],[400, [21, 2]],[450, [21, 2]],[500, [21, 2]],[600, [21, 2]],[700, [21, 2]],[800, [21, 2]],[900, [21, 2]],[1000, [21, 2]],[1111, [21, 2]]];
    $scope.moon.cashUpgrades = [[332500, [0, 3], false],[665000, [2, 3], false],[1330000, [4, 3], false],[6650000, [6, 3], false],[13300000, [8, 3], false],[33250000, [10, 3], false],[1665000000, [12, 3], false],[133000000000, [14, 3], false],[665000000000, [16, 3], false],[3300000000000, [18, 3], false],[10000000000000, [20, 9], false],[30000000000000, [0, 3], false],[70000000000000, [2, 3], false],[150000000000000, [4, 3], false],[266000000000000, [6, 3], false],[275000000000000, [8, 3], false],[433000000000000, [10, 3], false],[665000000000000, [12, 3], false],[931000000000000, [14, 3], false],[2e+15, [16, 3], false],[3e+15, [18, 3], false],[7e+15, [20, 9], false],[1.3e+16, [22, 1], false],[5e+20, [20, 9], false],[2.6e+22, [0, 3], false],[6.7e+22, [2, 3], false],[9.3e+22, [4, 3], false],[1.33e+23, [6, 3], false],[2.66e+23, [8, 3], false],[4.65e+23, [10, 3], false],[6.65e+23, [12, 3], false],[9.97e+23, [14, 3], false],[2e+24, [16, 3], false],[3e+24, [18, 3], false],[1e+25, [20, 9], false],[2e+25, [22, 1], false],[5e+30, [0, 3], false],[1e+31, [2, 3], false],[2e+31, [4, 3], false],[4e+31, [6, 3], false],[1.6e+32, [8, 3], false],[2.8e+32, [10, 3], false],[5e+32, [12, 3], false],[6.9e+32, [14, 3], false],[7.25e+32, [16, 3], false],[8.33e+32, [18, 3], false],[9.75e+32, [20, 9], false],[4e+33, [22, 1], false],[9e+33, [0, 3], false],[2e+34, [2, 3], false],[1e+35, [4, 3], false],[2e+35, [6, 3], false],[4.21e+35, [8, 3], false],[6.55e+35, [10, 3], false],[8.25e+35, [12, 3], false],[5e+36, [14, 3], false],[2.5e+37, [16, 3], false],[5e+37, [18, 3], false],[1e+38, [20, 9], false],[7.5e+40, [0, 5], false],[2.1e+41, [2, 5], false],[3.53e+41, [4, 5], false],[6.35e+41, [6, 5], false],[9e+41, [8, 5], false],[9e+42, [10, 5], false],[2.2e+43, [12, 5], false],[6e+43, [14, 5], false],[1.32e+44, [16, 5], false],[3.67e+44, [18, 5], false],[1e+45, [20, 9], false],[1e+51, [20, 9], false],[1e+54, [22, 3], false],[1.8e+55, [0, 3], false],[6e+54, [2, 3], false],[7.9e+55, [4, 3], false],[1.1e+56, [6, 3], false],[2.2e+56, [8, 3], false],[3.99e+56, [10, 3], false],[6.66e+56, [12, 3], false],[9.11e+56, [14, 3], false],[4e+60, [16, 3], false],[2.5e+61, [18, 3], false],[1.12e+62, [20, 9], false],[2e+62, [0, 3], false],[3.56e+62, [2, 3], false],[5.18e+62, [4, 3], false],[7.66e+62, [6, 3], false],[3e+69, [8, 3], false],[6e+69, [10, 3], false],[1.2e+70, [12, 3], false],[5e+70, [14, 3], false],[2.12e+71, [16, 3], false],[3.67e+71, [18, 3], false],[1e+72, [20, 9], false],[2.5e+76, [0, 3], false],[6e+76, [2, 3], false],[1.77e+77, [4, 3], false],[2.39e+77, [6, 3], false],[4.32e+77, [8, 3], false],[8.01e+77, [10, 3], false],[2e+78, [12, 3], false],[8e+78, [14, 3], false],[2.2e+79, [16, 3], false],[5.9e+79, [18, 3], false],[4.44e+80, [20, 9], false],[3e+81, [22, 3], false],[1.2e+85, [0, 3], false],[2.4e+85, [2, 3], false],[4.8e+85, [4, 3], false],[9.6e+85, [6, 3], false],[1.92e+86, [8, 3], false],[3.84e+86, [10, 3], false],[9.68e+86, [12, 3], false],[1.5e+88, [14, 3], false],[3.5e+88, [16, 3], false],[1e+89, [18, 3], false],[1e+90, [20, 9], false],[1e+92, [0, 5], false],[2e+92, [2, 5], false],[3e+92, [4, 5], false],[4e+92, [6, 5], false],[5e+92, [8, 5], false],[6e+92, [10, 5], false],[7e+92, [12, 5], false],[8e+92, [14, 5], false],[9e+92, [16, 5], false],[9.99e+92, [18, 5], false],[5e+93, [20, 9], false],[1e+94, [0, 3], false],[2e+94, [2, 3], false],[5.5e+94, [4, 3], false],[9e+94, [6, 3], false],[1.8e+95, [8, 3], false],[4e+95, [10, 3], false],[7.5e+95, [12, 3], false],[2e+96, [14, 3], false],[4e+96, [16, 3], false],[1.4e+97, [18, 3], false],[5e+97, [20, 9], false],[4e+98, [0, 3], false],[7e+98, [2, 3], false],[1e+99, [4, 3], false],[3e+99, [6, 3], false],[1.9e+100, [8, 3], false],[5.5e+100, [10, 3], false],[1.23e+101, [12, 3], false],[2e+101, [14, 3], false],[6e+101, [16, 3], false],[8.88e+101, [18, 3], false],[1e+102, [20, 9], false],[5e+102, [0, 3], false],[2.5e+103, [2, 3], false],[1.25e+104, [4, 3], false],[6.25e+104, [6, 3], false],[3e+105, [8, 3], false],[5e+105, [10, 3], false],[6.5e+106, [12, 3], false],[2.46e+107, [14, 3], false],[5e+107, [16, 3], false],[8.08e+107, [18, 3], false],[1e+108, [20, 9], false],[2e+108, [0, 3], false],[4e+108, [2, 3], false],[8e+108, [4, 3], false],[1.6e+109, [6, 3], false],[3.2e+109, [8, 3], false],[6.4e+109, [10, 3], false],[1.28e+110, [12, 3], false],[2.56e+110, [14, 3], false],[5.12e+110, [16, 3], false],[1e+111, [18, 3], false],[1e+113, [20, 9], false],[1.25e+113, [0, 3], false],[1.5e+113, [2, 3], false],[1.75e+113, [4, 3], false],[2e+113, [6, 3], false],[2.25e+113, [8, 3], false],[2.5e+113, [10, 3], false],[2.75e+113, [12, 3], false],[3e+113, [14, 3], false],[3.5e+113, [16, 3], false],[4e+113, [18, 3], false],[5e+113, [20, 9], false],[1e+114, [0, 11], false],[1e+115, [2, 11], false],[1e+116, [4, 11], false],[1e+117, [6, 11], false],[1e+118, [8, 11], false],[1e+119, [10, 11], false],[1e+120, [12, 11], false],[1e+121, [14, 11], false],[1e+122, [16, 11], false],[1e+123, [18, 11], false],[1e+124, [20, 15], false],[1e+126, [0, 3], false],[7e+126, [2, 3], false],[2.9e+127, [4, 3], false],[6.6e+127, [6, 3], false],[1.29e+128, [8, 3], false],[2.33e+128, [10, 3], false],[5.55e+128, [12, 3], false],[9e+128, [14, 3], false],[3e+129, [16, 3], false],[2e+130, [18, 3], false],[1.11e+131, [20, 9], false],[1e+135, [20, 9], false],[1e+138, [0, 3], false],[2e+138, [2, 3], false],[3e+138, [4, 3], false],[4e+138, [6, 3], false],[5e+138, [8, 3], false],[6e+138, [10, 3], false],[7e+138, [12, 3], false],[8e+138, [14, 3], false],[9e+138, [16, 3], false],[1e+139, [18, 3], false],[1e+140, [20, 9], false],[1e+141, [0, 3], false],[3e+141, [2, 3], false],[7e+141, [4, 3], false],[2.5e+142, [6, 3], false],[7.5e+142, [8, 3], false],[1.51e+143, [10, 3], false],[4e+143, [12, 3], false],[6e+143, [14, 3], false],[9e+143, [16, 3], false],[2e+144, [18, 3], false],[6e+144, [20, 9], false],[1.9e+145, [0, 3], false],[6.6e+145, [2, 3], false],[1.23e+146, [4, 3], false],[2.99e+146, [6, 3], false],[6.67e+146, [8, 3], false],[9.01e+146, [10, 3], false],[2e+147, [12, 3], false],[5.3e+148, [14, 3], false],[2e+149, [16, 3], false],[5e+149, [18, 3], false],[1e+150, [20, 9], false],[1e+156, [0, 3], false],[2e+156, [2, 3], false],[4e+156, [4, 3], false],[8e+156, [6, 3], false],[1.6e+157, [8, 3], false],[3.2e+157, [10, 3], false],[6.4e+157, [12, 3], false],[1.28e+158, [14, 3], false],[2.56e+158, [16, 3], false],[5.12e+158, [18, 3], false],[1e+159, [20, 9], false],[2e+162, [0, 5], false],[5e+162, [2, 5], false],[1.1e+163, [4, 5], false],[2.3e+163, [6, 5], false],[4.7e+163, [8, 5], false],[9.5e+163, [10, 5], false],[1.91e+164, [12, 5], false],[3.83e+164, [14, 5], false],[7.67e+164, [16, 5], false],[5e+165, [18, 5], false],[1.25e+167, [20, 9], false],[1e+168, [20, 9], false],[1e+171, [0, 3], false],[1.4e+172, [2, 3], false],[1.14e+173, [4, 3], false],[2.34e+173, [6, 3], false],[4.44e+173, [8, 3], false],[8.88e+173, [10, 3], false],[2.3e+175, [12, 3], false],[9.9e+175, [14, 3], false],[4.23e+176, [16, 3], false],[5.67e+176, [18, 3], false],[8.99e+176, [20, 9], false],[1e+180, [0, 3], false],[3e+180, [2, 3], false],[9e+180, [4, 3], false],[2.7e+181, [6, 3], false],[8.1e+181, [8, 3], false],[2.34e+182, [10, 3], false],[3.56e+182, [12, 3], false],[4.32e+182, [14, 3], false],[5.67e+182, [16, 3], false],[8.36e+182, [18, 3], false],[1e+183, [20, 9], false],[1e+187, [0, 15], false],[1e+188, [2, 15], false],[1e+189, [4, 15], false],[1e+190, [6, 15], false],[1e+191, [8, 15], false],[1e+192, [10, 15], false],[1e+193, [12, 15], false],[1e+194, [14, 15], false],[1e+195, [16, 15], false],[1e+196, [18, 15], false],[1e+197, [20, 999], false]];
    $scope.moon.angelUpgrades = [[11111, [20, 3], false, false],[222222, [0, 3], false, false],[3333333, [2, 3], false, false],[4444444, [4, 3], false, false],[55555555, [6, 3], false, false],[666666666, [8, 3], false, false],[7777777777, [10, 3], false, false],[88888888888, [12, 3], false, false],[999999999999, [14, 3], false, false],[1010101010101, [16, 3], false, false],[11111111111111, [18, 3], false, false],[123000000000000, [20, 3], false, false],[5e+19, [31, 10], false, false],[5e+19, [33, 10], false, false],[5e+19, [35, 10], false, false],[5e+19, [37, 10], false, false],[5e+19, [39, 10], false, false],[1e+21, [0, 3], false, false],[9e+21, [2, 3], false, false],[2.7e+22, [4, 3], false, false],[9.9e+22, [6, 3], false, false],[1.8e+23, [8, 3], false, false],[2.22e+23, [10, 3], false, false],[3.43e+23, [12, 3], false, false],[4.77e+23, [14, 3], false, false],[5.69e+23, [16, 3], false, false],[7.89e+23, [18, 3], false, false],[1e+24, [20, 3], false, false],[2.5e+28, [31, 10], false, false],[2.5e+28, [33, 10], false, false],[2.5e+28, [35, 10], false, false],[2.5e+28, [37, 10], false, false],[2.5e+28, [39, 10], false, false],[1e+30, [0, 3], false, false],[1.4e+31, [2, 3], false, false],[5.5e+31, [4, 3], false, false],[1e+32, [6, 3], false, false],[1.89e+32, [8, 3], false, false],[2.67e+32, [10, 3], false, false],[4.04e+32, [12, 3], false, false],[6.91e+32, [14, 3], false, false],[7.77e+32, [16, 3], false, false],[9.1e+32, [18, 3], false, false],[2e+33, [20, 3], false, false],[1e+35, [31, 10], false, false],[1e+35, [33, 10], false, false],[1e+35, [35, 10], false, false],[1e+35, [37, 10], false, false],[1e+35, [39, 10], false, false],[5e+36, [0, 3], false, false],[1.9e+37, [2, 3], false, false],[8.8e+37, [4, 3], false, false],[1.44e+38, [6, 3], false, false],[2.01e+38, [8, 3], false, false],[3.33e+38, [10, 3], false, false],[4e+38, [12, 3], false, false],[5.88e+38, [14, 3], false, false],[7.01e+38, [16, 3], false, false],[9.11e+38, [18, 3], false, false],[5e+40, [20, 9], false, false],[5e+42, [31, 10], false, false],[5e+42, [33, 10], false, false],[5e+42, [35, 10], false, false],[5e+42, [37, 10], false, false],[5e+42, [39, 10], false, false],[3e+45, [0, 5], false, false],[6e+45, [2, 5], false, false],[1.2e+46, [4, 5], false, false],[2.4e+46, [6, 5], false, false],[4.8e+46, [8, 5], false, false],[9.6e+46, [10, 5], false, false],[1.92e+47, [12, 5], false, false],[3.84e+47, [14, 5], false, false],[7.68e+47, [16, 5], false, false],[1.4e+49, [18, 5], false, false],[5e+50, [20, 9], false, false],[1e+53, [20, 9], false, false],[5e+54, [30, 50], false, false],[5e+54, [31, 50], false, false],[5e+54, [32, 50], false, false],[5e+54, [33, 50], false, false],[5e+54, [34, 50], false, false],[5e+54, [35, 50], false, false],[5e+54, [36, 50], false, false],[5e+54, [37, 50], false, false],[5e+54, [37, 50], false, false],[5e+54, [39, 50], false, false],[1e+56, [0, 3], false, false],[2e+56, [2, 3], false, false],[3e+56, [4, 3], false, false],[4e+56, [6, 3], false, false],[5e+56, [8, 3], false, false],[6e+56, [10, 3], false, false],[7e+56, [12, 3], false, false],[8e+56, [14, 3], false, false],[9e+56, [16, 3], false, false],[1e+57, [18, 3], false, false],[3.16e+59, [20, 3], false, false],[1e+60, [20, 9], false, false],[1e+65, [30, 75], false, false],[1e+65, [31, 75], false, false],[1e+65, [32, 75], false, false],[1e+65, [33, 75], false, false],[1e+65, [34, 75], false, false],[1e+65, [35, 75], false, false],[1e+65, [36, 75], false, false],[1e+65, [37, 75], false, false],[1e+65, [38, 75], false, false],[1e+65, [39, 75], false, false],[1e+66, [20, 3], false, false],[1e+69, [0, 3], false, false],[2e+69, [2, 3], false, false],[4e+69, [4, 3], false, false],[8e+69, [6, 3], false, false],[1.6e+70, [8, 3], false, false],[3.2e+70, [10, 3], false, false],[6.4e+70, [12, 3], false, false],[1.28e+71, [14, 3], false, false],[2.56e+71, [16, 3], false, false],[5.12e+71, [18, 3], false, false],[1e+72, [20, 9], false, false],[5e+75, [31, 50], false, false],[5e+75, [33, 50], false, false],[5e+75, [34, 100], false, false],[5e+75, [36, 100], false, false],[5e+75, [39, 25], false, false],[1e+77, [0, 7], false, false],[2e+77, [2, 7], false, false],[4e+77, [4, 7], false, false],[8e+77, [6, 7], false, false],[1.6e+79, [8, 7], false, false],[3.2e+79, [10, 7], false, false],[6.4e+79, [12, 7], false, false],[1.28e+80, [14, 7], false, false],[2.56e+80, [16, 7], false, false],[5.12e+80, [18, 7], false, false],[1e+81, [20, 7], false, false],[1e+86, [33, 100], false, false],[2e+86, [34, 200], false, false],[3e+86, [36, 300], false, false],[1e+87, [0, 3], false, false],[9e+87, [2, 3], false, false],[1.8e+88, [4, 3], false, false],[2.7e+88, [6, 3], false, false],[3.6e+88, [8, 3], false, false],[4.5e+88, [10, 3], false, false],[5.4e+88, [12, 3], false, false],[6.3e+88, [14, 3], false, false],[7.2e+88, [16, 3], false, false],[8.1e+88, [18, 3], false, false],[1e+90, [20, 5], false, false]];
    $scope.moon.managerUpgrades = [[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]]];
    $scope.mars.unlocks[0] = [[200, [0, 3]],[400, [0, 3]],[600, [0, 3]],[800, [0, 3]],[1000, [1, 2]],[1200, [0, 3]],[1400, [0, 3]],[1600, [0, 3]],[1800, [0, 3]],[2000, [1, 2]],[2200, [0, 3]],[2400, [0, 3]],[2600, [0, 3]],[2800, [0, 3]],[3000, [1, 2]],[3200, [0, 3]],[3400, [0, 3]],[3600, [0, 3]],[3800, [0, 3]],[4000, [0, 3]],[4300, [0, 3]],[4600, [0, 3]],[4900, [0, 3]],[5200, [0, 3]],[5500, [0, 3]],[5800, [0, 3]],[6100, [0, 3]],[6400, [0, 3]],[6700, [0, 3]],[7000, [1, 2]],[7300, [0, 3]],[7600, [0, 3]],[7900, [0, 3]],[8200, [0, 3]],[8500, [1, 2]],[8800, [0, 3]],[9100, [0, 3]],[9400, [0, 3]],[9700, [0, 3]],[10000, [0, 3]],[10500, [0, 3]],[11000, [0, 3]],[11500, [0, 3]],[12000, [0, 3]],[12500, [0, 3]],[13000, [0, 13]],[13500, [0, 3]],[14000, [0, 3]],[14500, [0, 3]],[15000, [0, 3]],[15500, [0, 3]],[16000, [0, 3]],[16500, [0, 3]],[17000, [0, 3]],[17500, [0, 3]],[18000, [0, 3]],[18500, [0, 3]],[19000, [0, 3]],[19500, [0, 3]],[20000, [0, 3]],[20500, [0, 3]],[21500, [0, 3]],[22000, [0, 3]],[22500, [0, 3]],[23000, [0, 3]],[23500, [0, 3]],[24000, [0, 3]],[24500, [0, 3]],[25000, [0, 3]],[25500, [0, 3]],[26000, [0, 3]],[26500, [0, 3]],[27000, [0, 3]],[27500, [0, 3]],[28000, [0, 3]],[28500, [0, 3]],[29000, [0, 3]],[29500, [0, 3]],[30000, [0, 3]],[30500, [0, 3]],[31000, [0, 3]],[31500, [0, 3]],[32000, [0, 3]],[32500, [0, 3]],[33000, [0, 3]],[33500, [0, 3]],[34000, [0, 3]],[34500, [0, 3]],[35000, [0, 3]],[35500, [0, 3]],[36000, [0, 3]],[36500, [0, 3]],[37000, [0, 3]],[37500, [0, 3]],[38000, [0, 3]],[38500, [0, 3]],[39000, [0, 3]],[39500, [0, 3]],[40000, [0, 3]],[40500, [0, 3]],[41000, [0, 3]],[41500, [0, 3]],[42000, [0, 3]],[42500, [0, 3]],[43000, [0, 3]],[43500, [0, 3]],[44000, [0, 3]],[44500, [0, 3]],[45000, [0, 3]],[45500, [0, 3]],[46000, [0, 3]],[46500, [0, 3]],[47000, [0, 3]],[47500, [0, 3]],[48000, [0, 3]],[48500, [0, 3]],[49000, [0, 3]],[49500, [0, 3]],[50000, [0, 3]],[50500, [0, 3]],[51000, [0, 3]],[51500, [0, 3]],[52000, [0, 3]],[52500, [0, 3]],[53000, [0, 3]],[53500, [0, 3]],[54000, [0, 3]],[54500, [0, 3]],[55000, [0, 3]],[55555, [0, 5]],[56000, [0, 3]]];
    $scope.mars.unlocks[1] = [[75, [2, 3.33]],[150, [2, 3.33]],[225, [2, 3.33]],[300, [3, 2]],[375, [2, 3.33]],[450, [2, 3.33]],[525, [2, 3.33]],[600, [3, 2]],[675, [2, 3.33]],[750, [2, 3.33]],[825, [2, 3.33]],[900, [3, 2]],[975, [2, 3.33]],[1050, [2, 3.33]],[1125, [2, 3.33]],[1200, [3, 2]],[1275, [2, 3.33]],[1350, [2, 3.33]],[1425, [2, 3.33]],[1500, [3, 2]],[1575, [2, 3.33]],[1650, [2, 3.33]],[1725, [2, 3.33]],[1800, [3, 2]],[1875, [2, 3.33]],[1950, [2, 3.33]],[2025, [2, 3.33]],[2100, [2, 3.33]],[2275, [2, 3.33]],[2450, [2, 3.33]],[2625, [2, 3.33]],[2800, [2, 3.33]],[2975, [2, 3.33]],[3150, [2, 3.33]],[3325, [2, 3.33]],[3500, [2, 3.33]],[3675, [2, 3.33]],[3850, [2, 3.33]],[4025, [2, 3.33]],[4200, [2, 3.33]],[4375, [2, 3.33]],[4550, [2, 3.33]],[4725, [2, 3.33]],[4900, [2, 3.33]],[5075, [2, 3.33]],[5250, [2, 3.33]],[5425, [2, 3.33]],[5600, [2, 3.33]],[5775, [2, 3.33]],[5950, [2, 3.33]],[6125, [2, 3.33]],[6300, [2, 3.33]],[6475, [2, 3.33]],[6650, [2, 3.33]],[6825, [2, 3.33]],[7000, [2, 3.33]],[7175, [2, 3.33]],[7350, [2, 3.33]],[7525, [2, 3.33]],[7700, [2, 3.33]],[7875, [2, 3.33]],[8050, [2, 3.33]],[8225, [2, 3.33]],[8400, [2, 3.33]],[8575, [2, 3.33]],[8750, [2, 3.33]],[8925, [2, 3.33]],[9100, [2, 3.33]],[9275, [2, 3.33]],[9450, [2, 3.33]],[9625, [2, 3.33]],[9800, [2, 3.33]],[9975, [2, 3.33]],[10150, [2, 3.33]],[10325, [2, 3.33]],[10500, [2, 3.33]],[10675, [2, 3.33]],[10850, [2, 3.33]],[11025, [2, 3.33]],[11200, [2, 3.33]],[11375, [2, 3.33]],[11550, [2, 3.33]],[11725, [2, 3.33]],[11900, [2, 3.33]],[12075, [2, 3.33]],[12250, [2, 3.33]],[12425, [2, 3.33]],[12600, [2, 3.33]],[12775, [2, 3.33]],[12950, [2, 3.33]],[13125, [2, 3.33]],[13300, [2, 3.33]],[13475, [2, 3.33]],[13650, [2, 3.33]],[13825, [2, 3.33]],[14000, [2, 3.33]],[14175, [2, 3.33]],[14350, [2, 3.33]],[14525, [2, 3.33]],[14700, [2, 3.33]],[14875, [2, 3.33]],[15050, [2, 3.33]],[15225, [2, 3.33]],[15400, [2, 3.33]],[15575, [2, 3.33]],[15750, [2, 3.33]],[15925, [2, 3.33]],[16100, [2, 3.33]],[16275, [2, 3.33]],[16450, [2, 3.33]],[16625, [2, 3.33]],[16800, [2, 3.33]],[16975, [2, 3.33]],[17150, [2, 3.33]],[17325, [2, 3.33]],[17500, [2, 3.33]]];
    $scope.mars.unlocks[2] = [[100, [4, 5]],[200, [4, 5]],[300, [4, 5]],[400, [4, 5]],[500, [5, 2]],[600, [4, 6]],[700, [4, 9]],[800, [4, 9]],[900, [4, 9]],[1000, [5, 2]],[1100, [4, 9]],[1200, [4, 9]],[1300, [4, 9]],[1400, [4, 9]],[1500, [4, 9]],[1600, [4, 9]],[1700, [4, 9]],[1800, [4, 9]],[1900, [4, 9]],[2000, [4, 9]],[2200, [4, 9]],[2400, [4, 9]],[2600, [4, 9]],[2800, [4, 9]],[3000, [4, 9]],[3200, [4, 9]],[3400, [4, 9]],[3600, [4, 9]],[3800, [4, 9]],[4000, [4, 9]],[4200, [4, 9]],[4400, [4, 9]],[4600, [4, 9]],[4800, [4, 9]],[5000, [4, 999]],[5200, [4, 9]],[5400, [4, 9]],[5600, [4, 9]],[5800, [4, 9]],[6000, [4, 9]],[6200, [4, 9]],[6400, [4, 9]],[6600, [4, 9]],[6800, [4, 9]],[7000, [4, 9]],[7200, [4, 9]],[7400, [4, 9]],[7600, [4, 9]],[7800, [4, 9]],[8000, [4, 9]],[8200, [4, 9]],[8400, [4, 9]],[8600, [4, 9]],[8800, [4, 9]],[9000, [4, 9]],[9200, [4, 9]],[9400, [4, 9]],[9600, [4, 9]],[9800, [4, 9]],[10000, [4, 9]],[10200, [4, 9]],[10400, [4, 9]],[10600, [4, 9]],[10800, [4, 9]],[11000, [4, 9]],[11200, [4, 9]],[11400, [4, 9]],[11600, [4, 9]],[11800, [4, 9]],[12000, [4, 9]]];
    $scope.mars.unlocks[3] = [[10, [6, 2]],[20, [6, 2]],[40, [6, 2]],[80, [6, 2]],[100, [7, 2]],[150, [6, 2]],[200, [6, 2]],[250, [6, 2]],[300, [7, 2]],[350, [6, 2]],[400, [6, 2]],[450, [6, 2]],[500, [7, 2]],[600, [6, 2]],[700, [6, 2]],[777, [6, 77777]],[800, [6, 2]],[900, [6, 2]],[1000, [6, 77]],[1100, [6, 5]],[1200, [6, 5]],[1300, [6, 5]],[1400, [6, 5]],[1500, [7, 2]],[1600, [6, 5]],[1700, [6, 5]],[1800, [6, 5]],[1900, [6, 5]],[2000, [6, 5]],[2100, [6, 5]],[2200, [6, 5]],[2300, [6, 5]],[2400, [6, 5]],[2500, [7, 2]],[2600, [6, 5]],[2700, [6, 5]],[2800, [6, 5]],[2900, [6, 5]],[3000, [6, 5]],[3100, [6, 5]],[3200, [6, 5]],[3300, [6, 5]],[3400, [6, 5]],[3500, [6, 5]],[3600, [6, 5]],[3700, [6, 5]],[3800, [6, 5]],[3900, [6, 5]],[4000, [6, 5]],[4100, [6, 5]],[4200, [6, 5]],[4300, [6, 5]],[4400, [6, 5]],[4500, [6, 5]],[4600, [6, 5]],[4700, [6, 5]],[4800, [6, 5]],[4900, [6, 5]],[5000, [6, 5]],[5100, [6, 5]],[5200, [6, 5]],[5300, [6, 5]],[5400, [6, 5]],[5500, [6, 5]],[5600, [6, 5]],[5700, [6, 5]],[5800, [6, 5]],[5900, [6, 5]],[6000, [6, 5]],[6100, [6, 5]],[6200, [6, 5]],[6300, [6, 5]],[6400, [6, 5]],[6500, [6, 5]],[6600, [6, 5]],[6700, [6, 5]],[6800, [6, 5]],[6900, [6, 5]],[7000, [6, 5]],[7100, [6, 5]],[7200, [6, 5]],[7300, [6, 5]],[7400, [6, 5]],[7500, [6, 5]],[7600, [6, 5]],[7700, [6, 5]],[7800, [6, 5]],[7900, [6, 5]],[8000, [6, 5]]];
    $scope.mars.unlocks[4] = [[25, [8, 7]],[50, [8, 7]],[100, [8, 7]],[200, [8, 7]],[300, [9, 2]],[400, [8, 7]],[500, [8, 7]],[600, [8, 7]],[666, [8, 666]],[800, [8, 666]],[900, [8, 666]],[1000, [8, 666]],[1250, [8, 666]],[1500, [8, 666]],[1750, [8, 666]],[2000, [8, 666]],[2250, [8, 666]],[2500, [8, 666]],[2750, [8, 666]],[3000, [8, 666]],[3250, [8, 666]],[3500, [8, 666]],[3725, [8, 666]],[4000, [8, 666]],[4250, [8, 666]],[4500, [8, 666]],[4750, [8, 666]],[5000, [8, 666]]];
    $scope.mars.unlocks[5] = [[10, [10, 6]],[50, [10, 6]],[100, [10, 6]],[200, [10, 6]],[400, [10, 6]],[600, [10, 6]],[800, [10, 6]],[1000, [11, 2]],[1200, [10, 6]],[1400, [10, 6]],[1600, [10, 6]],[1800, [10, 6]],[2000, [10, 6]],[2200, [10, 6]],[2400, [10, 6]],[2600, [10, 6]],[2800, [10, 6]],[3000, [10, 6]],[3200, [10, 6]],[3400, [10, 6]],[3600, [10, 6]],[3800, [10, 6]],[4000, [10, 6]],[4200, [10, 6]],[4400, [10, 6]],[4600, [10, 6]],[4800, [10, 6]],[5000, [10, 6]],[5200, [10, 6]],[5400, [10, 6]],[5600, [10, 6]],[5800, [10, 6]],[6000, [10, 6]],[6200, [10, 6]],[6400, [10, 6]],[6600, [10, 6]],[6800, [10, 6]],[7000, [10, 6]],[7200, [10, 6]],[7400, [10, 6]],[7600, [10, 6]],[7800, [10, 6]],[8000, [10, 6]],[8200, [10, 6]],[8400, [10, 6]],[8600, [10, 6]],[8800, [10, 6]],[9000, [10, 6]],[9200, [10, 6]],[9400, [10, 6]],[9600, [10, 6]],[9800, [10, 6]],[10000, [10, 6]],[10200, [10, 6]],[10400, [10, 6]],[10600, [10, 6]],[10800, [10, 6]],[11000, [10, 6]],[11200, [10, 6]],[11400, [10, 6]],[11600, [10, 6]],[11800, [10, 6]],[12000, [10, 6]],[12200, [10, 6]],[12400, [10, 6]],[12600, [10, 6]],[12800, [10, 6]],[13000, [10, 6]],[13200, [10, 6]],[13400, [10, 6]],[13600, [10, 6]],[13800, [10, 6]],[14000, [10, 6]]];
    $scope.mars.unlocks[6] = [[25, [12, 3]],[50, [12, 3]],[75, [12, 3]],[100, [12, 3]],[150, [12, 3]],[200, [12, 3]],[250, [12, 3]],[300, [12, 3]],[350, [12, 3]],[400, [12, 3]],[450, [12, 3]],[500, [13, 2]],[550, [12, 3]],[600, [12, 3]],[650, [12, 3]],[700, [12, 3]],[750, [12, 7]],[800, [12, 3]],[850, [12, 3]],[900, [12, 3]],[950, [12, 3]],[1000, [12, 8]],[1150, [12, 8]],[1300, [12, 8]],[1450, [12, 8]],[1600, [12, 8]],[1750, [12, 8]],[1900, [12, 8]],[2050, [12, 8]],[2200, [12, 8]],[2350, [12, 8]],[2500, [12, 8]],[2650, [12, 8]],[2800, [12, 8]],[2950, [12, 8]],[3100, [12, 8]],[3250, [12, 8]],[3400, [12, 8]],[3550, [12, 8]],[3700, [12, 8]],[3850, [12, 8]],[4000, [12, 8]],[4150, [12, 8]],[4300, [12, 8]],[4450, [12, 8]],[4600, [12, 8]],[4750, [12, 8]],[4900, [12, 8]],[5050, [12, 8]],[5200, [12, 8]],[5350, [12, 8]],[5500, [12, 8]],[5650, [12, 8]],[5800, [12, 8]],[5950, [12, 8]],[6100, [12, 8]],[6250, [12, 8]],[6400, [12, 8]],[6550, [12, 8]],[6700, [12, 8]],[6850, [12, 8]],[7000, [12, 8]],[7150, [12, 8]],[7300, [12, 8]],[7450, [12, 8]],[7600, [12, 8]]];
    $scope.mars.unlocks[7] = [[100, [14, 15]],[200, [14, 15]],[300, [14, 15]],[400, [14, 15]],[500, [15, 2]],[700, [14, 50]],[900, [14, 50]],[1100, [14, 50]],[1300, [14, 50]],[1500, [14, 5050]],[1700, [14, 50]],[1900, [14, 50]],[2100, [14, 50]],[2300, [14, 50]],[2500, [14, 50]],[2700, [14, 50]],[2900, [14, 50]],[3100, [14, 50]],[3300, [14, 50]],[3500, [14, 50]],[3700, [14, 50]],[3900, [14, 50]],[4100, [14, 50]],[4300, [14, 50]],[4500, [14, 50]],[4700, [14, 50]],[4900, [14, 50]],[5100, [14, 50]],[5300, [14, 50]],[5500, [14, 50]],[5700, [14, 50]],[5900, [14, 50]],[6000, [14, 50]]];
    $scope.mars.unlocks[8] = [[33, [16, 333]],[66, [16, 333]],[99, [16, 333]],[222, [16, 333]],[333, [16, 333]],[444, [16, 333]],[555, [16, 333]],[666, [16, 333]],[777, [16, 333]],[888, [16, 333]],[999, [16, 333]],[1111, [16, 333]],[2222, [16, 333]]];
    $scope.mars.unlocks[9] = [[1, [19, 2]],[50, [19, 2]],[100, [19, 2]],[200, [19, 2]],[300, [19, 2]],[400, [19, 2]],[500, [19, 2]],[600, [19, 2]],[700, [19, 2]],[800, [19, 2]],[900, [19, 2]],[1000, [19, 2]],[1200, [19, 2]],[1400, [19, 2]],[1600, [19, 2]],[1800, [19, 2]],[2000, [19, 2]],[2500, [19, 2]]];
    $scope.mars.cashUpgrades = [[15000000, [0, 33], false],[500000000, [2, 33], false],[100000000000, [4, 33], false],[19000000000000, [6, 33], false],[1e+15, [8, 33], false],[1.2e+19, [10, 33], false],[9e+21, [12, 33], false],[6e+23, [14, 33], false],[3e+27, [16, 33], false],[1e+36, [4, 66], false],[5e+39, [6, 66], false],[2.5e+43, [8, 66], false],[1.3e+47, [10, 66], false],[3e+50, [12, 66], false],[6e+52, [14, 66], false],[1e+55, [16, 66], false],[1e+57, [18, 33], false],[1e+60, [0, 999], false],[7e+62, [2, 999], false],[9e+62, [4, 99], false],[1e+63, [6, 99], false],[5e+66, [8, 99], false],[1.7e+67, [10, 99], false],[9.9e+67, [12, 99], false],[2.31e+68, [14, 99], false],[3.33e+68, [16, 99], false],[5e+71, [18, 33], false],[1.23e+74, [0, 999], false],[2.46e+74, [2, 999], false],[3.69e+74, [6, 999], false],[2e+75, [10, 999], false],[3e+75, [12, 999], false],[1.2e+76, [14, 999], false],[2.3e+76, [16, 999], false],[1e+78, [18, 66], false],[5e+102, [0, 33], false],[1.25e+104, [2, 33], false],[4.5e+104, [4, 33], false],[6.25e+104, [6, 33], false],[3e+105, [10, 33], false],[2.5e+106, [12, 33], false],[1e+107, [14, 33], false],[1e+110, [18, 33], false],[1e+111, [0, 77], false],[4e+111, [2, 77], false],[5.5e+112, [4, 77], false],[9e+112, [6, 77], false],[2.1e+113, [10, 77], false],[4.31e+113, [12, 77], false],[7.77e+113, [14, 77], false],[5e+116, [18, 777], false],[5e+132, [6, 33], false],[3.5e+133, [10, 33], false],[1.77e+134, [12, 33], false],[5.69e+134, [14, 33], false],[7.14e+134, [0, 33], false],[9.76e+134, [2, 33], false],[1e+135, [4, 33], false],[5e+136, [18, 33], false],[1e+144, [0, 66], false],[2e+144, [2, 66], false],[6e+144, [4, 66], false],[9e+144, [6, 66], false],[4.9e+145, [10, 66], false],[3e+146, [12, 66], false],[7e+146, [14, 66], false],[3e+149, [18, 55], false],[5e+156, [0, 99], false],[1.4e+157, [2, 99], false],[6.6e+157, [4, 99], false],[8.8e+157, [6, 99], false],[2.5e+158, [10, 99], false],[4.44e+158, [12, 99], false],[6.53e+158, [14, 99], false],[1e+162, [18, 15], false],[1e+171, [0, 77], false],[3e+171, [2, 77], false],[9e+171, [4, 77], false],[1.9e+172, [6, 77], false],[3.6e+172, [10, 77], false],[9.9e+172, [12, 77], false],[2.79e+173, [14, 77], false],[4e+173, [18, 25], false],[1e+183, [0, 999], false],[5e+183, [2, 999], false],[8e+183, [4, 999], false],[1e+184, [6, 999], false],[6.6e+184, [10, 999], false],[1.53e+185, [12, 999], false],[3.72e+185, [14, 999], false],[5e+185, [16, 999], false],[6e+201, [0, 33], false],[2.5e+202, [2, 33], false],[8e+202, [4, 33], false],[1.7e+203, [6, 33], false],[4.39e+203, [10, 33], false],[6.5e+203, [12, 33], false],[9e+203, [14, 33], false],[2.5e+205, [16, 33], false],[2.5e+206, [18, 9], false],[1e+213, [0, 22], false],[1.1e+214, [2, 22], false],[2.22e+215, [6, 22], false],[3.33e+215, [10, 22], false],[4.44e+215, [12, 22], false],[5.55e+215, [14, 22], false],[6.66e+215, [16, 22], false],[1e+216, [18, 66], false],[1e+223, [0, 44], false],[2e+223, [2, 44], false],[4e+223, [6, 44], false],[6e+223, [10, 44], false],[1.5e+224, [12, 44], false],[3.56e+224, [14, 44], false],[9e+224, [16, 44], false],[6e+225, [18, 777], false],[1e+228, [0, 999], false],[1e+231, [2, 999], false],[1e+234, [6, 999], false],[1e+237, [10, 999], false],[1e+240, [12, 999], false],[1e+243, [14, 999], false],[1e+246, [16, 999], false]];
    $scope.mars.angelUpgrades = [[100000000000, [18, 3], false, false],[1e+17, [18, 3], false, false],[1e+21, [0, 5], false, false],[2e+21, [2, 5], false, false],[4e+21, [4, 5], false, false],[8e+21, [6, 5], false, false],[1.6e+22, [8, 5], false, false],[3.2e+22, [10, 5], false, false],[6.4e+22, [12, 5], false, false],[1.28e+23, [14, 5], false, false],[2.56e+23, [16, 5], false, false],[1e+24, [18, 3], false, false],[1e+30, [0, 7], false, false],[3e+30, [2, 7], false, false],[9e+30, [4, 7], false, false],[2.7e+31, [6, 7], false, false],[1e+32, [8, 7], false, false],[2e+32, [10, 7], false, false],[4e+32, [12, 7], false, false],[6e+32, [14, 7], false, false],[9e+32, [16, 7], false, false],[1e+36, [18, 5], false, false],[1e+42, [18, 3], false, false],[3e+45, [0, 3], false, false],[1.2e+46, [2, 3], false, false],[2.9e+46, [4, 3], false, false],[1.36e+47, [6, 3], false, false],[3.11e+47, [8, 3], false, false],[5.55e+47, [10, 3], false, false],[7.89e+47, [12, 3], false, false],[2.5e+49, [14, 3], false, false],[1e+50, [16, 3], false, false],[1e+56, [18, 5], false, false],[1e+60, [0, 5], false, false],[5e+60, [2, 5], false, false],[4.5e+61, [4, 5], false, false],[6.6e+61, [6, 5], false, false],[9.9e+61, [8, 5], false, false],[1.75e+62, [10, 5], false, false],[2.8e+62, [12, 5], false, false],[4.2e+62, [14, 5], false, false],[7e+62, [16, 5], false, false],[5e+63, [18, 5], false, false],[1e+74, [18, 7], false, false],[1e+78, [0, 9], false, false],[1e+79, [2, 9], false, false],[2e+79, [4, 9], false, false],[1e+80, [6, 9], false, false],[2e+80, [8, 9], false, false],[4e+80, [10, 9], false, false],[8e+80, [12, 9], false, false],[1.6e+82, [14, 9], false, false],[2.22e+83, [16, 9], false, false],[6.66e+83, [18, 9], false, false],[1e+84, [18, 9], false, false],[2e+90, [0, 15], false, false],[1.4e+91, [2, 15], false, false],[5.6e+91, [4, 15], false, false],[1.12e+92, [6, 15], false, false],[1.79e+92, [8, 15], false, false],[2.98e+92, [10, 15], false, false],[4.34e+92, [12, 15], false, false],[6.2e+92, [14, 15], false, false],[8.08e+92, [16, 15], false, false],[1e+93, [18, 15], false, false],[9e+99, [18, 9], false, false],[4e+105, [0, 21], false, false],[6e+105, [2, 21], false, false],[1.2e+106, [4, 21], false, false],[2.4e+106, [6, 21], false, false],[6.9e+106, [8, 21], false, false],[1.05e+107, [10, 21], false, false],[2.14e+107, [12, 21], false, false],[3.33e+107, [14, 21], false, false],[5e+107, [16, 21], false, false],[1e+108, [18, 9], false, false],[7.77e+113, [18, 777], false, false]];
    $scope.mars.managerUpgrades = [];
  };
  loadDefaults();
  loadUnlocks();
}]);
