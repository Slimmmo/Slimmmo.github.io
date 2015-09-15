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
        out = out.toLocaleString();
      }
    } else {
      out = input.toLocaleString();
    }
  }
  return out + illionsArr[mCount];
}

advApp.filter('time', function() {
  return function(input, raw) {
    if (input === Infinity){
      return "———";
    } else {
      input = Math.floor(input);
      var s = ("00" + input % 60).slice(-2);
      var m = ("00" + Math.floor(input / 60) % 60).slice(-2);
      var h = ("00" + Math.floor(input / 3600) % 24).slice(-2);
      var d = Math.floor(input / 86400);
      var out = "";
      if (!raw && d >= 1) {
        out += numFilter(d, false) + ' d';
        if (!raw && d < 100) {
          out += ', '
        }
  
      }
      if (!raw && d < 100) {
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

advApp.controller('advController', ['$document', '$filter', '$scope', function($document, $filter, $scope) {
  $scope.accOpen = [false, false, false, false, false, false];
  $scope.clearAfter = [false, false];
  $scope.compare = false;
  $scope.earth = {};
  $scope.fillBefore = [false, false];
  $scope.illionsArray = illionsArr.slice(1);
  $scope.moon = {};
  $scope.raw = false;
  $scope.ref = $scope.earth;
  $scope.reverse = true;
  $scope.sortIndex = 2;

  angular.element(document).ready(function() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0],
      reader = new FileReader(),
      i = 0, j = 0, k = 0, obj = null,
      loadArr = ['earth', 'moon'];
      reader.onload = function(e) {
        obj = JSON.parse(e.target.result);
        for (k in loadArr) {
          $scope.fullyResetPlanet($scope[loadArr[k]]);
          for (i in obj[loadArr[k]].levels) {
            if (obj[loadArr[k]].levels.hasOwnProperty(i)) {
              for (j = 0; j < $scope[loadArr[k]].investments.length; j++) {
                if ($scope[loadArr[k]].investments[j][0] === i) {
                  $scope[loadArr[k]].investments[j][1] = obj[loadArr[k]].levels[i];
                  break;
                }
              }
            }
          }
          $scope[loadArr[k]].numAngels = obj[loadArr[k]].numAngels;
          $scope[loadArr[k]].viewNumAngels = $scope[loadArr[k]].numAngels;
          for (i = 0; i < obj[loadArr[k]].upgradeIndexUpTo; i++) {
            $scope[loadArr[k]].cashUpgrades[i][$scope[loadArr[k]].cashUpgrades[i].length - 1] = true;
          }
          for (i = 0; i < obj[loadArr[k]].angelUpgradeIndexUpTo; i++) {
            $scope[loadArr[k]].angelUpgrades[i][$scope[loadArr[k]].angelUpgrades[i].length - 1] = true;
          }
          for (i = 0; i < obj[loadArr[k]].upgradeIndexBonus.length; i++) {
            $scope[loadArr[k]].cashUpgrades[obj[loadArr[k]].upgradeIndexBonus[i]][$scope[loadArr[k]].cashUpgrades[obj[loadArr[k]].upgradeIndexBonus[i]].length - 1] = true;
          }
          for (i = 0; i < obj[loadArr[k]].angelUpgradeIndexBonus.length; i++) {
            $scope[loadArr[k]].angelUpgrades[obj[loadArr[k]].angelUpgradeIndexBonus[i]][$scope[loadArr[k]].angelUpgrades[obj[loadArr[k]].angelUpgradeIndexBonus[i]].length - 1] = true;
          }
          for (i = 0; i < obj[loadArr[k]].managersBought.length; i++) {
            $scope[loadArr[k]].managerUpgrades[Math.floor(obj[loadArr[k]].managersBought[i] / 2)][obj[loadArr[k]].managersBought[i] % 2][1] = true;
          }
          $scope[loadArr[k]].triples = obj[loadArr[k]].triples;
          $scope[loadArr[k]].flux = obj[loadArr[k]].flux;
          $scope[loadArr[k]].bonusAngelEffectiveness = obj[loadArr[k]].bonusAngelEffectiveness;
          $scope[loadArr[k]].bonusMultiplier = obj[loadArr[k]].bonusMultiplier;
          if (angular.isDefined(obj[loadArr[k]].megaTicket)) {
            for (i = 0; i < obj[loadArr[k]].megaTicket.length; i++) {
              $scope[loadArr[k]].investments[obj[loadArr[k]].megaTicket[i]][2] = true;
            }
          }
        }
        $scope.calc($scope.earth);
        $scope.calc($scope.moon);
        //$scope.calc($scope.mars);
        $scope.$digest();
      }
      reader.readAsText(file);
    });
  });

  $scope.apply = function(loc) {
    if (loc.rec[0] === 'level') {
      loc.investments[loc.rec[1]][1] = loc.rec[2];
    } else if (loc.rec[0] === 'all') {
      for (var i = 0; i < loc.investments.length; i++) {
        if (loc.investments[i][1] < loc.rec[1]) {
          loc.investments[i][1] = loc.rec[1];
        }
      }
    } else if (loc.rec[0] === 'manager') {
      loc.managerUpgrades[loc.rec[1]][loc.managerUpgrades[loc.rec[1]].length - 1] = true;
    } else {
      loc.cashUpgrades[loc.rec[1]][loc.cashUpgrades[loc.rec[1]].length - 1] = true;
    }
    $scope.calc(loc);
  };

  $scope.applyRow = function(loc, row) {
    var name = row[0].split(' '),
    i = 0, j = false;
    if (name.length >= 3 && (name[name.length - 2] === 'Profit' || name[name.length - 2] === 'Speed' || name[name.length - 2] === 'Investor')) {
      j = true;
    }
    if (j === true) {
      loc.cashUpgrades[row[row.length - 1]][loc.cashUpgrades[row[row.length - 1]].length - 1] = true;
    } else if (name[0] === 'All') {
      for (; i < loc.investments.length; i++) {
        if (loc.investments[i][1] < row[1]) {
          loc.investments[i][1] = row[1];
        }
      }
    } else {
      for (; i < loc.investments.length; i++) {
        if (loc.investments[i][0] === name[0] || (name.length > 1 && loc.investments[i][0] === name[0] + ' ' + name[1])) {
          loc.investments[i][1] = row[1];
          break;
        }
      }
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
        if (applyRow < 10) {
          if (applyType === 0) {
            loc.investments[applyRow][3] *= row[i][1];
          } else {
            if (row[i][1] !== 2) {
              throw 'Not double speed rate, error? ' + row;
            }
            loc.investments[applyRow][4] /= 2;
          }
        } else if (applyRow === 10) {
          if (applyType === 0) {
            for (j = 0; j < loc.investments.length; j++) {
              loc.investments[j][3] *= row[i][1];
            }
          } else {
            if (row[i][1] !== 2) {
              throw 'Not double speed rate, error? ' + row;
            }
            for (j = 0; j < loc.investments.length; j++) {
              loc.investments[j][4] /= 2;
            }
          }
        } else if (applyRow === 11) {
          loc.angelEffectiveness += row[i][1] / 100;
        } else if (row[i][0] < 30 || row[i][0] > 39) {
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
    if (index === 0 && $scope.isEarth()) {
      fromLevel -= 1;
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      if (tupleIsActive(loc.angelUpgrades[i])) {
        if (loc.angelUpgrades[i][1][0] === (30 + index)) {
          fromLevel -= loc.angelUpgrades[i][1][1];
        }
      }
    }
    for (i = 0; i < loc.managerUpgrades[index].length; i++) {
      if (tupleIsActive(loc.managerUpgrades[index][i])) {
        if (loc.name === 'earth') {
          if (i === 0) {
            managerDiscount = 0.9;
          } else {
            managerDiscount = 0.00001;
          }
        } else {
          managerDiscount = 0.75;
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
    while (lowestLevel >= loc.unlocks[10][i][0]) {
      i++;
    }
    for (; j < loc.investments.length; j++) {
      if (loc.investments[j][1] < loc.unlocks[10][i][0]) {
        retVal += calcUnlockCost(loc, j, loc.investments[j][1], loc.unlocks[10][i][0] - loc.investments[j][1]);
      }
    }
    return retVal;
  }

  $scope.calc = function(loc) {
    calcState(loc);
    calcAngels(loc);
    calcRecommendations(loc);
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
        if (tempPlanet.totalMoneyPerSecond > loc.totalMoneyPerSecond) {
          loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = true;
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
    tempUnlock = null,
    upgradeScore = 0;
    loc.recTable = [];
    if (!loc.noSingles) {
      inc.push(1)
    }
    if (!loc.noTens) {
      inc.push(10)
    }
    inc.push(100);
    inc.push(1);
    for (; i < loc.investments.length; i++) {
      if (i === 1 && $scope.isEarth()) {
        inc[inc.length - 1] = getDifferenceNBonus(loc, i, 1);
        inc.push(getDifferenceNBonus(loc, i, 2));
        inc.push(getDifferenceNBonus(loc, i, 3));
      } else if (i === 2 && $scope.isEarth()) {
        inc.pop();
        inc.pop();
        inc[inc.length - 1] = getDifferenceNBonus(loc, i, 1);
      } else {
        inc[inc.length - 1] = getDifferenceNBonus(loc, i, 1);
      }
      for (j = 0; j < inc.length; j++) {
        tempPlanet.investments = deepCopy(loc.investments);
        tempPlanet.investments[i][1] += inc[j];
        calcState(tempPlanet);
        tempUnlock = calcUnlockCost(loc, i, loc.investments[i][1], inc[j]);
        upgradeScore = 1000000000000000000000 * (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) / (tempPlanet.totalMoneyPerSecond * (tempUnlock / loc.totalMoneyPerSecond) );
        if (upgradeScore > max) {
          max = upgradeScore;
          maxObj = ['level', i, tempPlanet.investments[i][1]];
        }
        loc.recTable.push([loc.investments[i][0], tempPlanet.investments[i][1], upgradeScore, tempUnlock, tempUnlock / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond, null]);
      }
    }
    j = -1;
    for (i = 0; i < 11; i++) {
      tempPlanet.investments = deepCopy(loc.investments);
      tempPlanet.angelEffectiveness = loc.angelEffectiveness;
      tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
      j = getNextCashIndex(loc, j);
      tempPlanet.cashUpgrades[j][tempPlanet.cashUpgrades[j].length - 1] = true;
      calcState(tempPlanet);
      upgradeScore = 1000000000000000000000 * (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) / (tempPlanet.totalMoneyPerSecond * (loc.cashUpgrades[j][0] / loc.totalMoneyPerSecond) );
      if (upgradeScore > max) {
        max = upgradeScore;
        maxObj = ['upgrade', j];
      }
      loc.recTable.push([$scope.getNamedType(loc, loc.cashUpgrades[j]), null, upgradeScore, loc.cashUpgrades[j][0], loc.cashUpgrades[j][0] / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond, j]);
    }
    tempUnlock = 0;
    tempPlanet.investments = deepCopy(loc.investments);
    tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
    for (i = 1; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < highestSharedLevel) {
        highestSharedLevel = loc.investments[i][1];
      }
    }
    for (i = 0; i < loc.unlocks[10].length; i++) {
      if (loc.unlocks[10][i][0] > highestSharedLevel) {
        highestSharedLevel = loc.unlocks[10][i][0];
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
    upgradeScore = 1000000000000000000000 * (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) / (tempPlanet.totalMoneyPerSecond * (tempUnlock / loc.totalMoneyPerSecond) );
    if (upgradeScore > max) {
      max = upgradeScore;
      maxObj = ['all', highestSharedLevel];
    }
    loc.recTable.push(['All', highestSharedLevel, upgradeScore, tempUnlock, tempUnlock / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond, null]);
    loc.rec = maxObj;
    $scope.reverse = true;
    $scope.sortIndex = 2;
    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, $scope.reverse);
    updateRecString(loc);
  };

  function calcState(loc) {
    var i = 0, j = 0,
    highestSharedLevel = loc.investments[0][1];
    loc.totalMoneyPerSecond = 0;
    loc.angelEffectiveness = 0.02;
    for (; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < highestSharedLevel) {
        highestSharedLevel = loc.investments[i][1];
      }
      loc.investments[i][3] = loc.investments[i][1] * loc.baseProfit[i];
      if (loc.triples > 0) {
        loc.investments[i][3] *= (3 * loc.triples) + 1;
      }
      if (loc.bonusMultiplier > 0) {
        loc.investments[i][3] *= loc.bonusMultiplier;
      }
      if (loc.investments[i][2]) {
        loc.investments[i][3] *= 7.77;
      }
      loc.investments[i][4] = loc.baseSpeed[i];
      if (loc.flux > 0) {
        loc.investments[i][4] /= (1 + loc.flux * 1.21);
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
      while (loc.investments[i][1] >= loc.unlocks[i][j][0]) {
        applyTuple(loc, loc.unlocks[i][j]);
        j++;
      }
    }
    j = 0;
    while (highestSharedLevel >= loc.unlocks[10][j][0]) {
      applyTuple(loc, loc.unlocks[10][j]);
      j++;
    }
    if (loc.bonusAngelEffectiveness > 0) {
      loc.angelEffectiveness += loc.bonusAngelEffectiveness / 100;
    }
    for (i = 0; i < loc.investments.length; i++) {
      loc.investments[i][3] *= (1 + (loc.angelEffectiveness * loc.numAngels));
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
    calcAngels(loc);
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

  function deepCopy(input) {
    var temp = [];
    for (var i = 0; i < input.length; i++) {
      temp.push(input[i].slice());
    }
    return temp;
  }

  $scope.export = function() {
    var blob = new Blob(['{' + formatState($scope.earth) + ',\r\n' + formatState($scope.moon) + '}'], {type: "application/json"});
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
    string += '\r\n  ],\r\n  "triples": ' + loc.triples + ',\r\n  "flux": ' + loc.flux + ',\r\n  "bonusAngelEffectiveness": ' + loc.bonusAngelEffectiveness + ',\r\n  "bonusMultiplier": ' + loc.bonusMultiplier + ',\r\n  "megaTicket": [';
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
    loc.angelEffectiveness = 0.02;
    loc.angelExclamation = false;
    loc.bonusAngelEffectiveness = 0;
    loc.bonusMultiplier = 0;
    loc.flux = 0;
    loc.illions = '';
    for (i = 0; i < loc.investments.length; i++) {
      if (i === 1) {
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
    loc.totalMoneyPerSecond = 0;
    loc.triples = 0;
    loc.upgradeCosts = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    loc.viewNumAngels = 0;
  };
  
  function getDifferenceNBonus(loc, index, n) {
    var i = 0,
    retVal = null;
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
        if (i < 10) {
          k += loc.investments[i][0] + (j && ' Speed ' || ' Profit ') + num;
        } else if (i === 10) {
          k += 'All' + (j && ' Speed ' || ' Profit ') + num;
        } else if (i === 11) {
          k += 'Angel Investor ' + num;
        } else if (tuple[l][0] >= 30 && tuple[l][0] <= 39) {
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

  function indexOrder(input) {
    return input[$scope.sortIndex];
  };

  $scope.isCompare = function() {
    return $scope.compare;
  };

  $scope.isEarth = function() {
    return $scope.ref === $scope.earth;
  };

  $scope.isMars = function() {
    return false;
  };

  $scope.isMoon = function() {
    return $scope.ref === $scope.moon;
  };

  $scope.setEarth = function() {
    $scope.clearAfter = [false, false];
    $scope.fillBefore = [false, false];
    $scope.compare = false;
    $scope.ref = $scope.earth;
  };

  $scope.setMoon = function() {
    $scope.clearAfter = [false, false];
    $scope.fillBefore = [false, false];
    $scope.compare = false;
    $scope.ref = $scope.moon;
  };

  $scope.toggleManagers = function(row, index) {
    if ($scope.isEarth()) {
      if (row[index][1] === true) {
        row[(index + 1) % 2][1] = false;
      }
    }
  };

  function tupleIsActive(tuple) {
    return tuple[tuple.length - 1];
  };

  $scope.updateAngels = function() {
    if ($scope.ref.illions === '') {
      $scope.ref.numAngels = $scope.ref.viewNumAngels;
    } else {
      $scope.ref.illions = $scope.ref.illions.trim();
      $scope.ref.illions = $scope.ref.illions.charAt(0).toUpperCase() + $scope.ref.illions.slice(1).toLowerCase();
      var index = $scope.illionsArray.indexOf(' ' + $scope.ref.illions);
      if (index !== -1) {
        $scope.ref.numAngels = $scope.ref.viewNumAngels * Math.pow(10, 6 + (index * 3));
      }
    }
  };

  function updateRecString(loc) {
    if (loc.rec[0] === 'level') {
      loc.recommendation = 'Buy ' + loc.recTable[0][0] + ' to level ' + loc.rec[2] + '.';
    } else if (loc.rec[0] === 'all') {
      loc.recommendation = 'Buy all to level ' + loc.rec[1];
    } else {
      loc.recommendation = 'Buy ' + loc.recTable[0][0] + ' Cash Upgrade.'
    }
  };

  function loadDefaults() {
    $scope.earth.angelEffectiveness = 0.02;
    $scope.earth.angelExclamation = false;
    $scope.earth.baseCost = [4, 60, 720, 8640, 103680, 1244160, 14929920, 179159040, 2149908480, 25798901760];
    $scope.earth.basePower = [1.07, 1.15, 1.14, 1.13, 1.12, 1.11, 1.1, 1.09, 1.08, 1.07];
    $scope.earth.baseProfit = [1, 60, 540, 4320, 51840, 622080, 7464960, 89579520, 1074954240, 29668737024];
    $scope.earth.baseSpeed = [0.6, 3, 6, 12, 24, 96, 384, 1536, 6144, 36864];
    $scope.earth.bonusAngelEffectiveness = 0;
    $scope.earth.bonusMultiplier = 0;
    $scope.earth.flux = 0;
    $scope.earth.illions = '';
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
    $scope.earth.name = 'earth';
    $scope.earth.noSingles = false;
    $scope.earth.noTens = false;
    $scope.earth.numAngels = 0;
    $scope.earth.rec = null;
    $scope.earth.recTable = [];
    $scope.earth.recommendation = '';
    $scope.earth.totalMoneyPerSecond = 0;
    $scope.earth.triples = 0;
    $scope.earth.upgradeCosts = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    $scope.earth.unlocks = [];
    $scope.earth.viewNumAngels = 0;
    $scope.moon.angelEffectiveness = 0.02;
    $scope.moon.angelExclamation = false;
    $scope.moon.baseCost = [5, 105, 2929, 42525, 493025, 18753525, 393824025, 8270000000, 173676000000, 1000000000000];
    $scope.moon.basePower = [1.05, 1.21, 1.07, 1.19, 1.09, 1.15, 1.13, 1.17, 1.11, 1.5];
    $scope.moon.baseProfit = [1, 21, 2001, 376, 98820, 1976400, 32940000, 1152900000, 11067840000, 332035000000];
    $scope.moon.baseSpeed = [2, 7, 28, 2, 45, 180, 600, 3000, 14400, 86400];
    $scope.moon.bonusAngelEffectiveness = 0;
    $scope.moon.bonusMultiplier = 0;
    $scope.moon.flux = 0;
    $scope.moon.illions = '';
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
    $scope.moon.name = 'moon';
    $scope.moon.noSingles = false;
    $scope.moon.noTens = false;
    $scope.moon.numAngels = 0;
    $scope.moon.rec = null;
    $scope.moon.recTable = null;
    $scope.moon.recommendation = '';
    $scope.moon.totalMoneyPerSecond = 0;
    $scope.moon.triples = 0;
    $scope.moon.upgradeCosts = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    $scope.moon.unlocks = [];
    $scope.moon.viewNumAngels = 0;
    /*$scope.mars.angelEffectiveness = 0.02;
    $scope.mars.angelExclamation = false;
    $scope.mars.baseCost = [];
    $scope.mars.basePower = [];
    $scope.mars.baseProfit = [];
    $scope.mars.baseSpeed = [];
    $scope.mars.bonusAngelEffectiveness = 0;
    $scope.mars.bonusMultiplier = 0;
    $scope.mars.flux = 0;
    $scope.mars.illions = '';
    $scope.mars.investments = [
      ['', 1, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0],
      ['', 0, false, 0, 0, 0, 0]
    ];
    $scope.mars.name = 'mars';
    $scope.mars.noSingles = false;
    $scope.mars.noTens = false;
    $scope.mars.numAngels = 0;
    $scope.mars.rec = null;
    $scope.mars.recTable = null;
    $scope.mars.recommendation = '';
    $scope.mars.totalMoneyPerSecond = 0;
    $scope.mars.triples = 0;
    $scope.mars.upgradeCosts = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    $scope.mars.unlocks = [];
    $scope.mars.viewNumAngels = 0;*/
  };

  function loadUnlocks() {
    $scope.earth.unlocks = [];
    for (var i = 0; i < 11; i++) {
      $scope.earth.unlocks.push([]);
    }
    $scope.earth.unlocks[0] = [[25, [1, 2]],[50, [1, 2]],[100, [1, 2]],[200, [1, 2]],[300, [1, 2]],[400, [1, 2]],[500, [0, 4]],[600, [0, 4]],[700, [0, 4]],[800, [0, 4]],[900, [0, 4]],[1000, [0, 5]],[1100, [0, 4]],[1200, [0, 4]],[1300, [0, 4]],[1400, [0, 4]],[1500, [0, 4]],[1600, [0, 4]],[1700, [0, 4]],[1800, [0, 4]],[1900, [0, 4]],[2000, [0, 5]],[2250, [0, 2]],[2500, [0, 2]],[2750, [0, 2]],[3000, [0, 5]],[3250, [0, 2]],[3500, [0, 2]],[3750, [0, 2]],[4000, [0, 5]],[4250, [0, 2]],[4500, [0, 2]],[4750, [0, 2]],[5000, [0, 5]],[5250, [0, 3]],[5500, [0, 3]],[5750, [0, 3]],[6000, [0, 5]],[6250, [0, 3]],[6500, [0, 3]],[6750, [0, 3]],[7000, [0, 5]],[7000, [0, 3]],[7250, [0, 3]],[7500, [0, 3]],[7777, [0, 3]],[8000, [0, 3]],[8200, [0, 3]],[8400, [0, 3]],[8600, [0, 3]],[8800, [0, 3]],[9000, [0, 3]],[9100, [0, 3]],[9200, [0, 3]],[9300, [0, 3]],[9400, [0, 3]],[9500, [0, 3]],[9600, [0, 3]],[9700, [0, 3]],[9800, [0, 3]],[9999, 0, 1.9999],[10000, [0, 5]]];
    $scope.earth.unlocks[1] = [[25, [3, 2]],[50, [3, 2]],[100, [3, 2]],[125, [0, 2]],[150, [4, 2]],[175, [6, 2]],[200, [3, 2]],[225, [8, 2]],[250, [0, 3]],[275, [4, 3]],[300, [3, 2]],[325, [6, 3]],[350, [8, 3]],[375, [0, 4]],[400, [3, 2]],[425, [4, 4]],[450, [6, 4]],[475, [8, 4]],[500, [10, 11]],[525, [0, 5]],[550, [4, 5]],[575, [6, 5]],[600, [12, 11]],[625, [8, 5]],[650, [0, 6]],[675, [4, 6]],[700, [14, 11]],[725, [6, 6]],[750, [8, 6]],[775, [0, 3]],[800, [16, 11]],[825, [4, 7]],[850, [6, 7]],[875, [8, 7]],[900, [18, 11]],[925, [10, 7]],[950, [12, 7]],[975, [14, 7]],[1000, [2, 7777777]],[1025, [16, 7]],[1050, [18, 7]],[1075, [4, 8]],[1100, [6, 8]],[1125, [8, 8]],[1150, [10, 8]],[1175, [12, 8]],[1200, [14, 8]],[1225, [16, 8]],[1250, [18, 8]],[1300, [2, 7777]],[1350, [0, 9]],[1400, [4, 9]],[1450, [6, 9]],[1500, [8, 9]],[1550, [10, 9]],[1600, [12, 9]],[1650, [14, 9]],[1700, [16, 9]],[1750, [18, 9]],[1800, [10, 10]],[1850, [12, 10]],[1900, [14, 10]],[1950, [16, 10]],[2000, [2, 7777]],[2100, [4, 15]],[2200, [6, 15]],[2300, [8, 15]],[2400, [10, 15]],[2500, [2, 777]],[2600, [14, 15]],[2700, [16, 15]],[2800, [18, 15]],[2900, [0, 15]],[3000, [2, 777]],[3100, [4, 20]],[3200, [12, 20]],[3300, [16, 20]],[3400, [18, 20]],[3500, [2, 777]],[3600, [12, 25]],[3700, [14, 25]],[3800, [16, 25]],[3900, [18, 25]],[4000, [2, 30]],[4100, [0, 30]],[4200, [4, 30]],[4300, [6, 30]],[4400, [8, 30]],[4500, [10, 30]],[4600, [12, 30]],[4700, [14, 30]],[4800, [16, 30]],[4900, [18, 30]],[5000, [2, 50]],[5100, [2, 50]],[5200, [2, 50]],[5300, [2, 50]],[5400, [2, 50]]];
    $scope.earth.unlocks[2] = [[25, [5, 2]],[50, [5, 2]],[100, [5, 2]],[200, [5, 2]],[300, [5, 2]],[400, [5, 2]],[500, [4, 2]],[600, [4, 2]],[700, [4, 2]],[800, [4, 2]],[900, [4, 2]],[1000, [4, 3]],[1100, [4, 2]],[1200, [4, 2]],[1300, [4, 2]],[1400, [4, 2]],[1500, [4, 2]],[1600, [4, 2]],[1700, [4, 2]],[1800, [4, 2]],[1900, [4, 2]],[2000, [4, 5]],[2100, [4, 3]],[2200, [4, 3]],[2300, [4, 3]],[2400, [4, 3]],[2500, [4, 3]],[2600, [4, 3]],[2700, [4, 3]],[2800, [4, 3]],[2900, [4, 3]],[3000, [4, 3]],[3100, [4, 3]],[3200, [4, 3]],[3300, [4, 3]],[3400, [4, 3]],[3500, [4, 3]],[3600, [4, 3]],[3700, [4, 3]],[3800, [4, 3]],[3900, [4, 3]],[4000, [4, 5]],[4100, [4, 3]],[4200, [4, 3]],[4300, [4, 3]],[4400, [4, 3]],[4500, [4, 3]],[4600, [4, 3]],[4700, [4, 3]],[4800, [4, 3]],[4900, [4, 3]],[5000, [4, 5]],[5250, [4, 3]],[5500, [4, 3]]];
    $scope.earth.unlocks[3] = [[25, [7, 2]],[50, [7, 2]],[100, [7, 2]],[200, [7, 2]],[300, [7, 2]],[400, [7, 2]],[500, [6, 2]],[600, [6, 2]],[700, [6, 2]],[800, [6, 2]],[900, [6, 2]],[1000, [6, 3]],[1100, [6, 2]],[1200, [6, 2]],[1300, [6, 2]],[1400, [6, 2]],[1500, [6, 2]],[1600, [6, 2]],[1700, [6, 2]],[1800, [6, 2]],[1900, [6, 2]],[2000, [6, 5]],[2100, [6, 3]],[2200, [6, 3]],[2300, [6, 3]],[2400, [6, 3]],[2500, [6, 3]],[2600, [6, 3]],[2700, [6, 3]],[2800, [6, 3]],[2900, [6, 3]],[3000, [6, 3]],[3100, [6, 3]],[3200, [6, 3]],[3300, [6, 3]],[3400, [6, 3]],[3500, [6, 3]],[3600, [6, 3]],[3700, [6, 3]],[3800, [6, 5]],[3900, [6, 3]],[4000, [6, 5]],[4100, [6, 3]],[4200, [6, 3]],[4300, [6, 3]],[4400, [6, 3]],[4500, [6, 3]],[4600, [6, 3]],[4700, [6, 3]],[4800, [6, 3]],[4900, [6, 3]],[5000, [6, 5]],[5250, [6, 3]],[5500, [6, 3]],[5750, [6, 3]]];
    $scope.earth.unlocks[4] = [[25, [9, 2]],[50, [9, 2]],[100, [9, 2]],[200, [9, 2]],[300, [9, 2]],[400, [9, 2]],[500, [8, 2]],[600, [8, 2]],[700, [8, 2]],[800, [8, 2]],[900, [8, 2]],[1000, [8, 3]],[1100, [8, 2]],[1200, [8, 2]],[1300, [8, 2]],[1400, [8, 2]],[1500, [8, 2]],[1600, [8, 2]],[1700, [8, 2]],[1800, [8, 2]],[1900, [8, 2]],[2000, [8, 5]],[2100, [8, 3]],[2200, [8, 3]],[2300, [8, 3]],[2400, [8, 3]],[2500, [8, 3]],[2600, [8, 3]],[2700, [8, 3]],[2800, [8, 3]],[2900, [8, 3]],[3000, [8, 3]],[3100, [8, 3]],[3200, [8, 3]],[3300, [8, 3]],[3400, [8, 3]],[3500, [8, 3]],[3600, [8, 3]],[3700, [8, 3]],[3800, [8, 3]],[3900, [8, 3]],[4000, [8, 3]],[4100, [8, 3]],[4200, [8, 3]],[4300, [8, 3]],[4400, [8, 3]],[4500, [8, 3]],[4750, [8, 3]],[5000, [8, 3]],[5250, [8, 3]],[5500, [8, 3]],[5750, [8, 3]],[6000, [8, 3]],[6250, [8, 3]]];
    $scope.earth.unlocks[5] = [[25, [11, 2]],[50, [11, 2]],[100, [11, 2]],[200, [11, 2]],[300, [11, 2]],[400, [11, 2]],[500, [10, 2]],[600, [10, 2]],[700, [10, 2]],[800, [10, 2]],[900, [10, 2]],[1000, [10, 3]],[1100, [10, 2]],[1200, [10, 2]],[1300, [10, 2]],[1400, [10, 2]],[1500, [10, 2]],[1600, [10, 2]],[1700, [10, 2]],[1800, [10, 2]],[1900, [10, 2]],[2000, [10, 5]],[2100, [10, 3]],[2200, [10, 3]],[2300, [10, 3]],[2400, [10, 3]],[2500, [10, 3]],[2600, [10, 3]],[2700, [10, 3]],[2800, [10, 3]],[2900, [10, 3]],[3000, [10, 3]],[3250, [10, 5]],[3500, [10, 5]],[3750, [10, 3]],[4000, [10, 5]],[4250, [10, 3]],[4500, [10, 5]],[4750, [10, 3]],[5000, [10, 5]],[5250, [10, 3]],[5500, [10, 5]],[5750, [10, 5]],[6000, [10, 5]],[6250, [10, 3]],[6500, [10, 5]]];
    $scope.earth.unlocks[6] = [[25, [13, 2]],[50, [13, 2]],[100, [13, 2]],[200, [13, 2]],[300, [13, 2]],[400, [13, 2]],[500, [12, 2]],[600, [12, 2]],[700, [12, 2]],[800, [12, 2]],[900, [12, 2]],[1000, [12, 3]],[1100, [12, 2]],[1200, [12, 2]],[1300, [12, 2]],[1400, [12, 2]],[1500, [12, 2]],[1600, [12, 2]],[1700, [12, 2]],[1800, [12, 2]],[1900, [12, 2]],[2000, [12, 5]],[2100, [13, 2]],[2200, [12, 3]],[2300, [13, 2]],[2400, [12, 3]],[2500, [13, 2]],[2600, [12, 3]],[2700, [13, 2]],[2800, [12, 3]],[2900, [12, 3]],[3000, [12, 3]],[3250, [12, 3]],[3500, [12, 3]],[3750, [12, 3]],[4000, [12, 5]],[4250, [12, 3]],[4500, [12, 3]],[4750, [12, 3]],[5000, [12, 7]],[5250, [12, 3]],[5500, [12, 3]],[5750, [12, 3]],[6000, [12, 7]],[6250, [12, 3]],[6500, [12, 3]],[6750, [12, 3]],[7000, [12, 7]]];
    $scope.earth.unlocks[7] = [[25, [15, 2]],[50, [15, 2]],[100, [15, 2]],[200, [15, 2]],[300, [15, 2]],[400, [15, 2]],[500, [14, 2]],[600, [14, 2]],[700, [14, 2]],[800, [14, 2]],[900, [14, 2]],[1000, [14, 3]],[1100, [14, 2]],[1200, [14, 2]],[1300, [14, 2]],[1400, [14, 2]],[1500, [14, 2]],[1600, [14, 2]],[1700, [14, 2]],[1800, [14, 2]],[1900, [14, 2]],[2000, [14, 5]],[2100, [15, 2]],[2200, [14, 2]],[2300, [15, 2]],[2400, [14, 2]],[2500, [15, 2]],[2600, [14, 2]],[2700, [15, 2]],[2800, [14, 2]],[2900, [14, 2]],[3000, [14, 2]],[3250, [15, 2]],[3500, [14, 2]],[3750, [14, 2]],[4000, [14, 2]],[4250, [14, 3]],[4500, [14, 3]],[4750, [14, 3]],[5000, [14, 5]],[5250, [14, 3]],[5500, [14, 3]],[5750, [14, 3]],[6000, [14, 9]],[6250, [14, 3]],[6500, [14, 3]],[6750, [14, 3]],[7000, [14, 9]],[7250, [14, 3]],[7500, [14, 3]],[7750, [14, 3]]];
    $scope.earth.unlocks[8] = [[25, [17, 2]],[50, [17, 2]],[100, [17, 2]],[200, [17, 2]],[300, [17, 2]],[400, [17, 2]],[500, [16, 2]],[600, [16, 2]],[700, [16, 2]],[800, [16, 2]],[900, [16, 2]],[1000, [16, 3]],[1100, [16, 2]],[1200, [16, 2]],[1300, [16, 2]],[1400, [16, 2]],[1500, [16, 2]],[1600, [16, 2]],[1700, [16, 2]],[1800, [16, 2]],[1900, [16, 2]],[2000, [16, 5]],[2250, [17, 2]],[2500, [17, 2]],[2750, [17, 2]],[3000, [17, 2]],[3250, [17, 2]],[3500, [17, 2]],[3750, [17, 2]],[4000, [17, 2]],[4250, [16, 3]],[4500, [16, 3]],[4750, [16, 3]],[5000, [16, 5]],[5250, [16, 5]],[5500, [16, 3]],[5750, [16, 3]],[6000, [16, 5]],[6250, [16, 3]],[6500, [16, 3]],[6750, [16, 3]],[7000, [16, 5]],[7250, [16, 3]],[7500, [16, 3]],[7750, [16, 3]],[8000, [16, 5]],[8250, [16, 3]],[8500, [16, 3]]];
    $scope.earth.unlocks[9] = [[25, [19, 2]],[50, [19, 2]],[100, [19, 2]],[200, [19, 2]],[300, [19, 2]],[400, [19, 2]],[500, [18, 2]],[600, [18, 2]],[700, [18, 2]],[800, [18, 2]],[900, [18, 2]],[1000, [18, 3]],[1100, [18, 2]],[1200, [18, 2]],[1300, [18, 2]],[1400, [18, 2]],[1500, [18, 2]],[1600, [18, 2]],[1700, [18, 2]],[1800, [18, 2]],[1900, [18, 2]],[2000, [18, 5]],[2250, [19, 2]],[2500, [19, 2]],[2750, [19, 2]],[3000, [19, 2]],[3250, [19, 2]],[3500, [19, 2]],[3750, [19, 2]],[4000, [19, 2]],[4250, [19, 2]],[4500, [19, 2]],[4750, [19, 2]],[5000, [19, 2]],[5250, [18, 3]],[5500, [18, 3]],[5750, [18, 3]],[6000, [18, 5]],[6250, [18, 3]],[6500, [18, 3]],[6750, [18, 3]],[7000, [18, 7]],[7250, [18, 3]],[7500, [18, 3]],[7750, [18, 3]],[8000, [18, 3]],[8250, [18, 3]],[8500, [18, 3]],[8750, [18, 3]],[9000, [18, 7]],[9250, [18, 3]],[9500, [18, 3]],[9750, [18, 3]]];
    $scope.earth.unlocks[10] = [[25, [21, 2]],[50, [21, 2]],[100, [21, 2]],[200, [21, 2]],[300, [21, 2]],[400, [21, 2]],[500, [20, 2]],[600, [20, 2]],[666, [20, 2]],[700, [20, 2]],[777, [20, 2]],[800, [20, 2]],[900, [20, 2]],[1000, [20, 2]],[1100, [20, 2]],[1111, [20, 2]],[1200, [20, 2]],[1300, [20, 2]],[1400, [20, 2]],[1500, [20, 2]],[1600, [20, 2]],[1700, [20, 2]],[1800, [20, 2]],[1900, [20, 2]],[2000, [20, 2]],[2100, [20, 2]],[2200, [20, 2]],[2222, [20, 2]],[2300, [20, 2]],[2400, [20, 2]],[2500, [20, 2]],[2600, [20, 2]],[2700, [20, 2]],[2800, [20, 2]],[2900, [20, 2]],[3000, [20, 2]],[3100, [20, 2]],[3200, [20, 2]],[3300, [20, 2]],[3333, [20, 2]],[3400, [20, 2]],[3500, [20, 2]],[3600, [20, 2]],[3700, [20, 2]],[3800, [20, 2]],[3900, [20, 2]],[4000, [20, 2]],[4100, [20, 2]],[4200, [20, 2]],[4300, [20, 2]],[4400, [20, 2]],[4500, [20, 2]],[4600, [20, 2]],[4700, [20, 2]],[4800, [20, 2]],[4900, [20, 2]],[5000, [20, 2]]];
    $scope.earth.cashUpgrades = [[250000, [0, 3], false],[500000, [2, 3], false],[1000000, [4, 3], false],[5000000, [6, 3], false],[10000000, [8, 3], false],[25000000, [10, 3], false],[500000000, [12, 3], false],[10e+9, [14, 3], false],[50e+9, [16, 3], false],[250e+9, [18, 3], false],[1e+12, [20, 3], false],[20e+12, [0, 3], false],[50e+12, [2, 3], false],[100e+12, [4, 3], false],[500e+12, [6, 3], false],[1e+15, [8, 3], false],[2e+15, [10, 3], false],[5e+15, [12, 3], false],[7e+15, [14, 3], false],[10e+15, [16, 3], false],[20e+15, [18, 3], false],[50e+15, [20, 3], false],[100e+15, [22, 1], false],[2e+18, [0, 3], false],[5e+18, [2, 3], false],[7e+18, [4, 3], false],[10e+18, [6, 3], false],[20e+18, [8, 3], false],[35e+18, [10, 3], false],[50e+18, [12, 3], false],[75e+18, [14, 3], false],[100e+18, [16, 3], false],[200e+18, [18, 3], false],[500e+18, [20, 3], false],[1e+21, [22, 1], false],[25e+21, [0, 3], false],[50e+21, [2, 3], false],[100e+21, [4, 3], false],[200e+21, [6, 3], false],[300e+21, [8, 3], false],[400e+21, [10, 3], false],[500e+21, [12, 3], false],[600e+21, [14, 3], false],[700e+21, [16, 3], false],[800e+21, [18, 3], false],[900e+21, [20, 3], false],[10e+24, [22, 2], false],[1e+27, [0, 7], false],[5e+27, [2, 7], false],[25e+27, [4, 7], false],[100e+27, [6, 7], false],[250e+27, [8, 7], false],[500e+27, [10, 7], false],[1e+30, [12, 7], false],[5e+30, [14, 7], false],[25e+30, [16, 7], false],[50e+30, [18, 7], false],[1e+42, [20, 7], false],[5e+42, [2, 3], false],[25e+42, [4, 3], false],[50e+42, [6, 3], false],[100e+42, [8, 3], false],[250e+42, [10, 3], false],[500e+42, [12, 3], false],[1e+45, [14, 3], false],[5e+45, [16, 3], false],[10e+45, [18, 3], false],[25e+45, [0, 3], false],[100e+45, [20, 3], false],[250e+45, [2, 3], false],[500e+45, [4, 3], false],[750e+45, [6, 3], false],[1e+48, [8, 3], false],[5e+48, [10, 3], false],[15e+48, [12, 3], false],[50e+48, [14, 3], false],[100e+48, [16, 3], false],[250e+48, [18, 3], false],[500e+48, [0, 3], false],[1e+51, [20, 7], false],[1e+54, [20, 5], false],[1e+60, [20, 7], false],[10e+60, [2, 3], false],[100e+60, [4, 3], false],[1e+66, [20, 9], false],[10e+66, [6, 3], false],[100e+66, [8, 3], false],[1e+72, [20, 11], false],[10e+72, [10, 3], false],[100e+72, [12, 3], false],[1e+75, [20, 13], false],[10e+75, [14, 3], false],[100e+75, [16, 3], false],[1e+78, [20, 15], false],[10e+78, [18, 3], false],[100e+78, [0, 3], false],[1e+84, [20, 3], false],[3e+87, [20, 3.1415926], false],[1e+90, [2, 3], false],[5e+90, [4, 3], false],[25e+90, [6, 3], false],[50e+90, [8, 3], false],[100e+90, [10, 3], false],[250e+90, [12, 3], false],[500e+90, [14, 3], false],[1e+93, [16, 3], false],[5e+93, [18, 3], false],[10e+93, [0, 3], false],[500e+93, [20, 2], false],[2e+96, [2, 2], false],[11e+96, [4, 2], false],[66e+96, [6, 2], false],[230e+96, [8, 2], false],[400e+96, [10, 2], false],[700e+96, [12, 2], false],[4e+99, [14, 2], false],[10e+99, [20, 3], false],[20e+99, [20, 6], false],[29e+99, [16, 2], false],[145e+99, [18, 2], false],[300e+99, [0, 2], false],[500e+99, [20, 2], false],[1e+102, [20, 5], false],[5e+102, [4, 3], false],[150e+102, [4, 3], false],[400e+102, [4, 3], false],[900e+102, [6, 3], false],[6e+105, [6, 3], false],[15e+105, [6, 3], false],[60e+105, [8, 2], false],[185e+105, [8, 3], false],[500e+105, [8, 3], false],[600e+105, [20, 3], false],[750e+105, [10, 2], false],[5e+108, [10, 3], false],[45e+108, [10, 3], false],[125e+108, [12, 3], false],[300e+108, [12, 3], false],[900e+108, [12, 3], false],[1e+111, [20, 3], false],[5e+111, [14, 2], false],[70e+111, [14, 3], false],[250e+111, [14, 3], false],[500e+111, [16, 3], false],[900e+111, [16, 3], false],[3e+114, [16, 3], false],[15e+114, [18, 3], false],[75e+114, [18, 3], false],[400e+114, [18, 3], false],[450e+114, [20, 3], false],[500e+114, [0, 3], false],[750e+114, [0, 3], false],[1e+117, [0, 3], false],[2e+117, [2, 3], false],[20e+117, [2, 3], false],[150e+117, [2, 3], false],[350e+117, [20, 5], false],[500e+117, [20, 3], false],[700e+117, [2, 3], false],[950e+117, [4, 3], false],[4e+120, [6, 3], false],[9e+120, [8, 3], false],[24e+120, [10, 3], false],[111e+120, [12, 3], false],[222e+120, [14, 3], false],[333e+120, [16, 3], false],[444e+120, [18, 3], false],[555e+120, [0, 3], false],[666e+120, [20, 6.66], false],[1e+123, [20, 3], false],[3e+123, [2, 3], false],[6e+123, [4, 3], false],[12e+123, [6, 3], false],[24e+123, [8, 3], false],[48e+123, [10, 3], false],[96e+123, [12, 3], false],[192e+123, [14, 3], false],[384e+123, [16, 3], false],[768e+123, [18, 3], false],[1e+126, [0, 3], false],[10e+126, [20, 5], false],[2e+129, [4, 3], false],[5e+129, [16, 3], false],[13e+129, [6, 3], false],[29e+129, [18, 3], false],[71e+129, [0, 3], false],[177e+129, [12, 3], false],[250e+129, [2, 3], false],[310e+129, [14, 3], false],[555e+129, [8, 3], false],[736e+129, [10, 3], false],[900e+129, [20, 2], false],[5e+132, [2, 2], false],[95e+132, [4, 2], false],[213e+132, [6, 2], false],[400e+132, [8, 2], false],[985e+132, [10, 2], false],[8e+135, [12, 2], false],[29e+135, [14, 2], false],[222e+135, [16, 2], false],[500e+135, [18, 2], false],[900e+135, [0, 2], false],[5e+138, [20, 3], false],[136e+138, [2, 3], false],[700e+138, [4, 3], false],[925e+138, [6, 3], false],[3e+141, [20, 3], false],[21e+141, [8, 3], false],[55e+141, [10, 3], false],[111e+141, [12, 3], false],[223e+141, [14, 3], false],[393e+141, [16, 3], false],[600e+141, [18, 3], false],[799e+141, [0, 3], false],[2e+144, [20, 3], false],[3e+144, [2, 3], false],[6e+144, [4, 3], false],[9e+144, [6, 3], false],[21e+144, [8, 3], false],[44e+144, [10, 3], false],[89e+144, [12, 3], false],[129e+144, [14, 3], false],[180e+144, [16, 3], false],[210e+144, [18, 3], false],[300e+144, [0, 3], false],[450e+144, [20, 2.71828], false],[5e+147, [10, 5], false],[30e+147, [2, 5], false],[180e+147, [4, 5], false],[900e+147, [16, 5], false],[5e+150, [6, 5], false],[20e+150, [18, 5], false],[80e+150, [8, 5], false],[240e+150, [0, 5], false],[720e+150, [12, 5], false],[21e+153, [14, 5], false],[500e+153, [20, 4.444444444444444], false],[777e+153, [10, 2], false],[888e+153, [2, 2], false],[999e+153, [4, 2], false],[2e+156, [16, 2], false],[4e+156, [6, 2], false],[8e+156, [18, 2], false],[16e+156, [8, 2], false],[32e+156, [0, 2], false],[64e+156, [12, 2], false],[128e+156, [14, 2], false],[514e+156, [20, 2.99792458], false],[1e+159, [10, 3], false],[10e+159, [2, 3], false],[25e+159, [4, 3], false],[50e+159, [16, 3], false],[75e+159, [6, 3], false],[100e+159, [18, 3], false],[150e+159, [8, 3], false],[200e+159, [0, 3], false],[300e+159, [12, 3], false],[400e+159, [14, 3], false],[900e+159, [20, 2.35711], false],[1e+162, [14, 24], false],[250e+162, [20, 2], false],[500e+162, [2, 22], false],[750e+162, [20, 2], false],[1e+165, [4, 20], false],[250e+165, [20, 2], false],[500e+165, [16, 18], false],[750e+165, [20, 2], false],[1e+168, [10, 16], false],[250e+168, [20, 2], false],[500e+168, [12, 14], false],[750e+168, [20, 2], false],[1e+171, [18, 12], false],[250e+171, [20, 2], false],[500e+171, [0, 10], false],[750e+171, [20, 2], false],[1e+174, [6, 8], false],[250e+174, [20, 2], false],[500e+174, [8, 4], false],[1e+177, [20, 9], false],[5e+183, [20, 9.87654321], false],[5e+189, [20, 5], false],[27e+192, [20, 3], false],[13e+195, [20, 4], false],[2e+198, [20, 5], false],[1e+201, [0, 3], false],[14e+201, [2, 3], false],[96e+201, [4, 3], false],[198e+201, [6, 3], false],[322e+201, [8, 3], false],[679e+201, [10, 3], false],[888e+201, [12, 3], false],[19e+204, [14, 3], false],[81e+204, [16, 3], false],[199e+204, [18, 3], false],[233e+204, [0, 3], false],[421e+204, [2, 3], false],[607e+204, [4, 3], false],[777e+204, [6, 3], false],[910e+204, [8, 3], false],[2e+207, [10, 3], false],[9e+207, [12, 3], false],[45e+207, [14, 3], false],[200e+207, [16, 3], false],[328e+207, [18, 3], false],[600e+207, [20, 5], false],[10e+213, [0, 11], false],[10e+213, [2, 11], false],[10e+213, [4, 11], false],[10e+213, [6, 11], false],[10e+213, [8, 11], false],[10e+213, [10, 11], false],[10e+213, [12, 11], false],[10e+213, [14, 11], false],[10e+213, [16, 11], false],[10e+213, [18, 11], false],[150e+213, [0, 3], false],[166e+213, [2, 3], false],[193e+213, [4, 3], false],[410e+213, [6, 3], false],[678e+213, [8, 3], false],[900e+213, [10, 3], false],[12e+216, [12, 3], false],[67e+216, [14, 3], false],[123e+216, [16, 3], false],[321e+216, [18, 3], false],[555e+216, [20, 5], false],[800e+216, [0, 3], false],[900e+216, [2, 3], false],[800e+216, [4, 3], false],[900e+216, [6, 3], false],[3e+219, [8, 3], false],[4e+219, [10, 3], false],[5e+219, [12, 3], false],[6e+219, [14, 3], false],[300e+219, [16, 3], false],[421e+219, [18, 3], false],[600e+219, [0, 3], false],[789e+219, [2, 3], false],[845e+219, [4, 3], false],[2e+222, [6, 3], false],[5e+222, [8, 3], false],[14e+222, [10, 3], false],[54e+222, [12, 3], false],[108e+222, [14, 3], false],[219e+222, [16, 3], false],[468e+222, [18, 3], false],[1e+228, [0, 7], false],[1e+228, [2, 7], false],[1e+228, [4, 7], false],[1e+228, [6, 7], false],[1e+228, [8, 7], false],[1e+228, [10, 7], false],[1e+228, [12, 7], false],[1e+228, [14, 7], false],[1e+228, [16, 7], false],[1e+228, [18, 7], false],[100e+228, [20, 5], false],[3e+231, [0, 3], false],[8e+231, [2, 3], false],[69e+231, [4, 3], false],[188e+231, [6, 3], false],[239e+231, [8, 3], false],[411e+231, [10, 3], false],[700e+231, [12, 3], false],[912e+231, [14, 3], false],[12e+234, [16, 3], false],[24e+234, [18, 3], false],[63e+234, [0, 3], false],[199e+234, [2, 3], false],[398e+234, [4, 3], false],[566e+234, [6, 3], false],[700e+234, [8, 3], false],[800e+234, [10, 3], false],[900e+234, [12, 3], false],[12e+237, [14, 3], false],[25e+237, [16, 3], false],[50e+237, [18, 3], false],[1e+240, [0, 2], false],[5e+240, [2, 2], false],[9e+240, [4, 2], false],[21e+240, [6, 2], false],[45e+240, [8, 2], false],[89e+240, [10, 2], false],[153e+240, [12, 2], false],[299e+240, [14, 2], false],[577e+240, [16, 2], false],[813e+240, [18, 2], false],[2e+243, [0, 2], false],[22e+243, [2, 2], false],[44e+243, [4, 2], false],[66e+243, [6, 2], false],[88e+243, [8, 2], false],[111e+243, [10, 2], false],[222e+243, [12, 2], false],[333e+243, [14, 2], false],[444e+243, [16, 2], false],[555e+243, [18, 2], false],[1e+252, [20, 5], false],[10e+252, [0, 3], false],[10e+252, [2, 3], false],[10e+252, [4, 3], false],[10e+252, [6, 3], false],[10e+252, [8, 3], false],[10e+252, [10, 3], false],[10e+252, [12, 3], false],[10e+252, [14, 3], false],[10e+252, [16, 3], false],[10e+252, [18, 3], false],[50e+252, [0, 9], false],[75e+252, [2, 9], false],[125e+252, [4, 9], false],[625e+252, [6, 9], false],[3e+255, [8, 9], false],[15e+255, [10, 9], false],[75e+255, [12, 9], false],[375e+255, [14, 9], false],[1e+258, [16, 9], false],[800e+255, [18, 9], false],[2e+258, [20, 2], false],[6e+258, [0, 3], false],[12e+258, [2, 3], false],[233e+258, [4, 3], false],[399e+258, [6, 3], false],[766e+258, [8, 3], false],[1e+261, [10, 3], false],[19e+261, [12, 3], false],[98e+261, [14, 3], false],[260e+261, [16, 3], false],[544e+261, [18, 3], false],[700e+261, [0, 3], false],[1e+264, [2, 3], false],[45e+264, [4, 3], false],[69e+264, [6, 3], false],[89e+264, [8, 3], false],[189e+264, [10, 3], false],[289e+264, [12, 3], false],[448e+264, [14, 3], false],[900e+264, [16, 3], false],[5e+267, [18, 3], false],[1e+270, [20, 5], false],[1e+273, [0, 7], false],[2e+273, [2, 7], false],[3e+273, [4, 7], false],[6e+273, [6, 7], false],[25e+273, [8, 7], false],[200e+273, [10, 7], false],[600e+273, [12, 7], false],[999e+273, [14, 7], false],[15e+276, [16, 7], false],[30e+276, [18, 7], false],[1e+285, [2, 13], false],[1e+285, [4, 13], false],[1e+285, [6, 13], false],[1e+285, [8, 13], false],[1e+285, [10, 13], false],[1e+285, [12, 13], false],[1e+285, [14, 13], false],[1e+285, [16, 13], false],[1e+285, [18, 13], false]];
    $scope.earth.angelUpgrades = [[10000, [20, 3], false, false], [100000, [22, 2], false, false], [100e+6, [22, 2], false, false], [1e+9, [20, 5], false, false], [100e+9, [20, 9], false, false], [25e+6, [31, 10], false, false], [25e+6, [32, 10], false, false], [25e+6, [33, 10], false, false], [25e+6, [34, 10], false, false], [250e+6, [31, 50], false, false], [250e+6, [32, 50], false, false], [250e+6, [33, 50], false, false], [250e+6, [34, 50], false, false], [25e+9, [31, 50], false, false], [25e+9, [32, 50], false, false], [25e+9, [33, 50], false, false], [25e+9, [34, 50], false, false], [1e+12, [20, 11], false, false], [250e+12, [2, 3], false, false], [750e+12, [4, 3], false, false], [2e+15, [6, 3], false, false], [5e+15, [8, 3], false, false], [10e+15, [10, 3], false, false], [25e+15, [12, 3], false, false], [75e+15, [14, 3], false, false], [200e+15, [16, 3], false, false], [400e+15, [18, 3], false, false], [1e+18, [0, 3], false, false], [1e+21, [20, 15], false, false], [10e+21, [31, 75], false, false], [10e+21, [32, 75], false, false], [10e+21, [33, 75], false, false], [10e+21, [34, 75], false, false], [10e+21, [35, 75], false, false], [100e+21, [31, 75], false, false], [100e+21, [32, 75], false, false], [100e+21, [33, 75], false, false], [100e+21, [34, 75], false, false], [100e+21, [35, 75], false, false], [10e+30, [31, 100], false, false], [100e+30, [32, 100], false, false], [1e+33, [22, 10], false, false], [10e+33, [20, 15], false, false], [1e+36, [20, 3], false, false], [10e+39, [20, 5], false, false], [1e+42, [20, 5], false, false], [2e+42, [31, 50], false, false], [100e+45, [4, 4], false, false], [200e+45, [6, 6], false, false], [700e+45, [8, 3], false, false], [2e+48, [10, 3], false, false], [25e+48, [12, 3], false, false], [500e+48, [14, 3], false, false], [20e+51, [16, 3], false, false], [80e+51, [18, 3], false, false], [150e+51, [0, 3], false, false], [300e+51, [2, 3], false, false], [500e+51, [22, 10], false, false], [1e+54, [2, 3], false, false], [4e+54, [4, 3], false, false], [9e+54, [6, 3], false, false], [25e+54, [8, 3], false, false], [75e+54, [10, 3], false, false], [177e+54, [12, 3], false, false], [300e+54, [14, 3], false, false], [500e+54, [16, 3], false, false], [800e+54, [18, 3], false, false], [1e+57, [0, 3], false, false], [30e+60, [31, 30], false, false], [30e+60, [32, 30], false, false], [30e+60, [33, 30], false, false], [30e+60, [34, 30], false, false], [30e+60, [36, 30], false, false], [100e+60, [20, 5], false, false], [2e+63, [2, 3], false, false], [2e+63, [4, 3], false, false], [2e+63, [6, 3], false, false], [2e+63, [8, 3], false, false], [2e+63, [10, 3], false, false], [2e+63, [12, 3], false, false], [2e+63, [14, 3], false, false], [2e+63, [16, 3], false, false], [2e+63, [18, 3], false, false], [2e+63, [0, 3], false, false], [100e+63, [20, 7], false, false], [1e+66, [2, 3], false, false], [4e+66, [4, 3], false, false], [13e+66, [6, 3], false, false], [20e+66, [8, 3], false, false], [29e+66, [10, 3], false, false], [38e+66, [12, 3], false, false], [52e+66, [14, 3], false, false], [67e+66, [16, 3], false, false], [72e+66, [18, 3], false, false], [96e+66, [0, 3], false, false], [125e+66, [31, 50], false, false], [777e+66, [20, 7.777777], false, false], [5e+69, [31, 10], false, false], [5e+69, [32, 10], false, false], [5e+69, [33, 10], false, false], [5e+69, [34, 10], false, false], [5e+69, [35, 10], false, false], [5e+69, [36, 10], false, false], [5e+69, [37, 10], false, false], [5e+69, [38, 10], false, false], [5e+69, [39, 10], false, false], [5e+69, [30, 10], false, false], [1e+72, [2, 3], false, false], [5e+72, [4, 3], false, false], [22e+72, [6, 3], false, false], [44e+72, [8, 3], false, false], [111e+72, [10, 3], false, false], [222e+72, [12, 3], false, false], [333e+72, [14, 3], false, false], [444e+72, [16, 3], false, false], [555e+72, [18, 3], false, false], [666e+72, [0, 3], false, false], [25e+75, [32, 25], false, false], [25e+75, [31, 25], false, false], [25e+75, [33, 25], false, false], [25e+75, [34, 25], false, false], [25e+75, [35, 25], false, false], [25e+75, [36, 25], false, false], [25e+75, [37, 25], false, false], [25e+75, [38, 25], false, false], [25e+75, [39, 25], false, false], [25e+75, [30, 25], false, false], [11e+78, [2, 3], false, false], [27e+78, [4, 3], false, false], [43e+78, [6, 3], false, false], [87e+78, [8, 3], false, false], [190e+78, [10, 3], false, false], [321e+78, [12, 3], false, false], [495e+78, [14, 3], false, false], [600e+78, [16, 3], false, false], [725e+78, [18, 3], false, false], [898e+78, [0, 3], false, false], [3e+84, [20, 13.11], false, false], [13e+87, [20, 5], false, false], [3e+90, [20, 3], false, false], [13e+93, [20, 4], false, false], [24e+96, [20, 5], false, false], [1e+102, [31, 25], false, false], [1e+102, [32, 25], false, false], [1e+102, [33, 25], false, false], [1e+102, [34, 25], false, false], [1e+102, [35, 25], false, false], [1e+102, [36, 25], false, false], [1e+102, [37, 25], false, false], [1e+102, [38, 25], false, false], [1e+102, [39, 25], false, false], [1e+102, [30, 25], false, false], [333e+108, [20, 3], false, false], [1e+114, [2, 3], false, false], [20e+114, [4, 3], false, false], [50e+114, [6, 3], false, false], [100e+114, [8, 3], false, false], [200e+114, [10, 3], false, false], [300e+114, [12, 3], false, false], [400e+114, [14, 3], false, false], [500e+114, [16, 3], false, false], [750e+114, [18, 3], false, false], [2e+117, [0, 3], false, false], [1e+129, [31, 25], false, false], [1e+129, [32, 25], false, false], [1e+129, [33, 25], false, false], [1e+129, [34, 25], false, false], [1e+129, [35, 25], false, false], [1e+129, [36, 25], false, false], [1e+129, [37, 25], false, false], [1e+129, [38, 25], false, false], [1e+129, [39, 25], false, false], [1e+129, [30, 25], false, false], [1e+138, [2, 3], false, false], [4e+138, [4, 3], false, false], [16e+138, [6, 3], false, false], [56e+138, [8, 3], false, false], [100e+138, [10, 3], false, false], [211e+138, [12, 3], false, false], [349e+138, [14, 3], false, false], [443e+138, [16, 3], false, false], [567e+138, [18, 3], false, false], [701e+138, [0, 3], false, false], [900e+138, [31, 25], false, false], [900e+138, [32, 25], false, false], [900e+138, [33, 25], false, false], [900e+138, [34, 25], false, false], [900e+138, [35, 25], false, false], [900e+138, [36, 25], false, false], [100e+138, [20, 19], false, false]];
    $scope.earth.managerUpgrades = [[[10e+9, false],[9e+126, false]],[[1e+9, false],[10e+102, false]],[[100e+6, false],[3e+120, false]],[[10e+6, false],[100e+111, false]],[[1e+6, false],[3e+117, false]],[[100000, false],[750e+117, false]],[[9999, false],[75e+105, false]],[[1000, false],[250e+108, false]],[[100, false],[50e+114, false]],[[10, false],[33e+123, false]]];
    $scope.moon.unlocks = [];
    for (var i = 0; i < 11; i++) {
      $scope.moon.unlocks.push([]);
    }
    $scope.moon.unlocks[0] = [[10, [0, 3.5]],[20, [0, 3.5]],[40, [0, 3.5]],[80, [0, 3.5]],[160, [0, 3.5]],[320, [0, 3.5]],[640, [0, 3.5]],[1280, [0, 3.5]],[2560, [0, 3.5]],[5120, [0, 3.5]],[10240, [0, 3.5]]];
    $scope.moon.unlocks[1] = [[30, [2, 1.5]],[60, [2, 1.75]],[100, [2, 2]],[150, [2, 2.25]],[210, [2, 2.5]],[280, [2, 2.75]],[360, [2, 3]],[450, [2, 3.25]],[550, [2, 3.5]],[660, [2, 3.75]],[780, [2, 4]],[910, [2, 4.25]],[1050, [2, 4.5]],[1200, [2, 4.75]],[1360, [2, 5]],[1520, [2, 5.5]],[1700, [2, 5.75]],[1890, [2, 6]],[2000, [2, 6.25]],[2050, [2, 6.5]],[2100, [2, 6.75]],[2150, [2, 7]],[2200, [2, 7.25]],[2250, [2, 7.5]],[2300, [2, 7.75]],[2350, [2, 8]],[2400, [2, 8.5]]];
    $scope.moon.unlocks[2] = [[10, [4, 3]],[20, [4, 3]],[40, [4, 3]],[60, [4, 3]],[80, [4, 3]],[100, [4, 3]],[120, [4, 3]],[240, [4, 3]],[360, [10, 3]],[480, [4, 3]],[600, [4, 3]],[840, [12, 3]],[1080, [4, 3]],[1320, [4, 3]],[1560, [18, 3]],[1800, [4, 3]],[2160, [4, 3]],[2520, [4, 3]],[2880, [4, 3]],[3240, [4, 3]],[3600, [4, 3]],[4000, [4, 3]],[4400, [4, 3]],[4800, [4, 3]],[5200, [4, 3]],[5600, [4, 3]],[6000, [4, 3]],[6666, [4, 3]]];
    $scope.moon.unlocks[3] = [[25, [6, 3]],[50, [6, 3]],[75, [6, 3]],[100, [6, 3]],[150, [6, 6]],[200, [6, 6]],[250, [6, 6]],[300, [6, 6]],[350, [6, 6]],[400, [6, 6]],[450, [6, 6]],[500, [6, 6]],[700, [6, 12]],[900, [6, 12]],[1100, [6, 12]],[1300, [6, 12]],[1500, [6, 12]],[1700, [6, 12]],[1900, [6, 12]],[2100, [6, 12]],[2300, [6, 12]],[2500, [6, 12]]];
    $scope.moon.unlocks[4] = [[20, [8, 12]],[50, [8, 12]],[90, [8, 12]],[180, [8, 12]],[360, [8, 12]],[720, [8, 12]],[1440, [8, 12]],[2880, [8, 12]],[5720, [8, 12]]];
    $scope.moon.unlocks[5] = [[50, [10, 7]],[100, [10, 7]],[200, [10, 7]],[300, [10, 7]],[400, [10, 7]],[500, [10, 7]],[600, [10, 7]],[700, [10, 7]],[800, [10, 7]],[900, [10, 7]],[1000, [10, 7]],[1200, [10, 7]],[1400, [10, 7]],[1600, [10, 7]],[1800, [10, 7]],[2000, [10, 7]],[2200, [10, 7]],[2400, [10, 7]],[2600, [10, 7]],[2800, [10, 7]],[3000, [10, 7]]];
    $scope.moon.unlocks[6] = [[8, [12, 5]],[16, [12, 5]],[32, [12, 5]],[64, [12, 5]],[128, [12, 5]],[256, [12, 5]],[512, [12, 5]],[1024, [12, 5]],[2048, [12, 5]],[4096, [12, 5]]];
    $scope.moon.unlocks[7] = [[80, [14, 8]],[160, [14, 8]],[240, [14, 8]],[320, [14, 8]],[480, [14, 8]],[640, [14, 8]],[800, [14, 8]],[960, [14, 8]],[1200, [14, 8]],[1440, [14, 8]],[1680, [14, 8]],[1920, [14, 8]],[2160, [14, 8]],[2300, [14, 8]],[2540, [14, 8]],[2780, [14, 8]],[3000, [14, 8]]];
    $scope.moon.unlocks[8] = [[25, [16, 2]],[50, [16, 2]],[75, [16, 2]],[100, [16, 2]],[150, [16, 2]],[200, [16, 2]],[250, [16, 2]],[300, [16, 2]],[350, [16, 2]],[400, [16, 2]],[450, [16, 2]],[500, [16, 2]],[600, [16, 2]],[700, [16, 2]],[800, [16, 2]],[900, [16, 2]],[1000, [16, 2]],[1200, [16, 2]],[1400, [16, 2]],[1600, [16, 2]],[1800, [16, 2]],[2000, [16, 2]],[2300, [16, 2]],[2600, [16, 2]],[2900, [16, 2]],[3200, [16, 2]],[3500, [16, 2]],[3800, [16, 2]],[4100, [16, 2]]];
    $scope.moon.unlocks[9] = [[50, [18, 75]],[100, [18, 75]],[200, [18, 75]],[300, [18, 75]],[400, [18, 75]],[500, [18, 75]],[600, [18, 75]],[700, [18, 75]],[800, [18, 75]],[900, [18, 75]],[1000, [18, 75]],[1111, [18, 75]]];
    $scope.moon.unlocks[10] = [[5, [21, 2]], [25, [21, 2]], [100, [21, 2]], [200, [21, 2]], [300, [21, 2]], [400, [21, 2]], [500, [21, 2]], [600, [21, 2]], [700, [21, 2]], [800, [21, 2]], [900, [21, 2]], [1000, [21, 2]], [1111, [21, 2]]];
    $scope.moon.cashUpgrades = [[332000, [0, 2], false],[665000, [2, 2], false],[1e+6, [4, 2], false],[6e+6, [6, 2], false],[13e+6, [8, 2], false],[33e+6, [10, 2], false],[1e+9, [12, 2], false],[133e+9, [14, 2], false],[665e+9, [16, 2], false],[3e+12, [18, 2], false],[10e+12, [20, 3], false],[30e+12, [0, 3], false],[70e+12, [2, 3], false],[150e+12, [4, 3], false],[275e+12, [6, 3], false],[433e+12, [8, 3], false],[266e+12, [10, 3], false],[665e+12, [12, 3], false],[931e+12, [14, 3], false],[2e+15, [16, 3], false],[3e+15, [18, 3], false],[7e+15, [20, 3], false],[13e+15, [22, 1], false],[26e+21, [0, 3], false],[67e+21, [2, 3], false],[93e+21, [4, 3], false],[133e+21, [6, 3], false],[266e+21, [8, 3], false],[465e+21, [10, 3], false],[665e+21, [12, 3], false],[997e+21, [14, 3], false],[2e+24, [16, 3], false],[3e+24, [18, 3], false],[10e+24, [20, 3], false],[20e+24, [22, 1], false],[5e+30, [0, 3], false],[10e+30, [2, 3], false],[20e+30, [4, 3], false],[40e+30, [6, 3], false],[160e+30, [8, 3], false],[280e+30, [10, 3], false],[500e+30, [12, 3], false],[690e+30, [14, 3], false],[725e+30, [16, 3], false],[833e+30, [18, 3], false],[975e+30, [20, 3], false],[4e+33, [22, 1], false],[9e+33, [0, 3], false],[20e+33, [2, 3], false],[100e+33, [4, 3], false],[200e+33, [6, 3], false],[421e+33, [8, 3], false],[655e+33, [10, 3], false],[825e+33, [12, 3], false],[5e+36, [14, 3], false],[25e+36, [16, 3], false],[50e+36, [18, 3], false],[100e+36, [20, 3], false],[75e+39, [0, 5], false],[210e+39, [2, 5], false],[353e+39, [4, 5], false],[635e+39, [6, 5], false],[900e+39, [8, 5], false],[9e+42, [10, 5], false],[22e+42, [12, 5], false],[60e+42, [14, 5], false],[132e+42, [16, 5], false],[367e+42, [18, 5], false],[1e+45, [20, 5], false],[1e+54, [22, 3], false],[18e+54, [0, 3], false],[6e+54, [2, 3], false],[79e+54, [4, 3], false],[110e+54, [6, 3], false],[220e+54, [8, 3], false],[399e+54, [10, 3], false],[666e+54, [12, 3], false],[911e+54, [14, 3], false],[4e+60, [16, 3], false],[25e+60, [18, 3], false],[112e+60, [20, 3], false],[200e+60, [0, 3], false],[356e+60, [2, 3], false],[518e+60, [4, 3], false],[766e+60, [6, 3], false],[3e+69, [8, 3], false],[6e+69, [10, 3], false],[12e+69, [12, 3], false],[50e+69, [14, 3], false],[212e+69, [16, 3], false],[367e+69, [18, 3], false],[1e+72, [20, 3], false],[25e+75, [0, 3], false],[60e+75, [2, 3], false],[177e+75, [4, 3], false],[239e+75, [6, 3], false],[432e+75, [8, 3], false],[801e+75, [10, 3], false],[2e+78, [12, 3], false],[8e+78, [14, 3], false],[22e+78, [16, 3], false],[59e+78, [18, 3], false],[444e+78, [20, 3], false],[3e+81, [22, 3], false],[12e+84, [0, 3], false],[24e+84, [2, 3], false],[48e+84, [4, 3], false],[96e+84, [6, 3], false],[192e+84, [8, 3], false],[384e+84, [10, 3], false],[968e+84, [12, 3], false],[15e+87, [14, 3], false],[35e+87, [16, 3], false],[100e+87, [18, 3], false],[1e+90, [20, 3], false],[100e+90, [0, 5], false],[200e+90, [2, 5], false],[300e+90, [4, 5], false],[400e+90, [6, 5], false],[500e+90, [8, 5], false],[600e+90, [10, 5], false],[700e+90, [12, 5], false],[800e+90, [14, 5], false],[900e+90, [16, 5], false],[999e+90, [18, 5], false],[5e+93, [20, 5], false],[10e+93, [0, 3], false],[20e+93, [2, 3], false],[55e+93, [4, 3], false],[90e+93, [6, 3], false],[180e+93, [8, 3], false],[400e+93, [10, 3], false],[750e+93, [12, 3], false],[2e+96, [14, 3], false],[4e+96, [16, 3], false],[14e+96, [18, 3], false],[50e+96, [20, 3], false],[400e+96, [0, 3], false],[700e+96, [2, 3], false],[1e+99, [4, 3], false],[3e+99, [6, 3], false],[19e+99, [8, 3], false],[55e+99, [10, 3], false],[123e+99, [12, 3], false],[200e+99, [14, 3], false],[600e+99, [16, 3], false],[888e+99, [18, 3], false],[1e+102, [20, 3], false],[5e+102, [0, 3], false],[25e+102, [2, 3], false],[125e+102, [4, 3], false],[625e+102, [6, 3], false],[3e+105, [8, 3], false],[5e+105, [10, 3], false],[65e+105, [12, 3], false],[246e+105, [14, 3], false],[500e+105, [16, 3], false],[808e+105, [18, 3], false],[1e+108, [20, 3], false],[2e+108, [0, 3], false],[4e+108, [2, 3], false],[8e+108, [4, 3], false],[16e+108, [6, 3], false],[32e+108, [8, 3], false],[64e+108, [10, 3], false],[128e+108, [12, 3], false],[256e+108, [14, 3], false],[512e+108, [16, 3], false],[1e+111, [18, 3], false],[100e+111, [20, 3], false],[125e+111, [0, 2], false],[150e+111, [2, 2], false],[175e+111, [4, 2], false],[200e+111, [6, 2], false],[225e+111, [8, 2], false],[250e+111, [10, 2], false],[275e+111, [12, 2], false],[300e+111, [14, 2], false],[350e+111, [16, 2], false],[400e+111, [18, 2], false],[500e+111, [20, 2], false],[1e+114, [0, 11], false],[10e+114, [2, 11], false],[100e+114, [4, 11], false],[1e+117, [6, 11], false],[10e+117, [8, 11], false],[100e+117, [10, 11], false],[1e+120, [12, 11], false],[10e+120, [14, 11], false],[100e+120, [16, 11], false],[1e+123, [18, 11], false],[10e+123, [20, 11], false],[1e+126, [0, 3], false],[7e+126, [2, 3], false],[29e+126, [4, 3], false],[66e+126, [6, 3], false],[129e+126, [8, 3], false],[233e+126, [10, 3], false],[555e+126, [12, 3], false],[900e+126, [14, 3], false],[3e+129, [16, 3], false],[20e+129, [18, 3], false],[111e+129, [20, 3], false],[1e+138, [0, 3], false],[2e+138, [2, 3], false],[3e+138, [4, 3], false],[4e+138, [6, 3], false],[5e+138, [8, 3], false],[6e+138, [10, 3], false],[7e+138, [12, 3], false],[8e+138, [14, 3], false],[9e+138, [16, 3], false],[10e+138, [18, 3], false],[100e+138, [20, 3], false],[1e+141, [0, 3], false],[3e+141, [2, 3], false],[7e+141, [4, 3], false],[25e+141, [6, 3], false],[75e+141, [8, 3], false],[151e+141, [10, 3], false],[400e+141, [12, 3], false],[600e+141, [14, 3], false],[900e+141, [16, 3], false],[2e+144, [18, 3], false],[6e+144, [20, 3], false],[19e+144, [0, 3], false],[66e+144, [2, 3], false],[123e+144, [4, 3], false],[299e+144, [6, 3], false],[667e+144, [8, 3], false],[901e+144, [10, 3], false],[2e+147, [12, 3], false],[53e+147, [14, 3], false],[200e+147, [16, 3], false],[500e+147, [18, 3], false],[1e+150, [20, 3], false],[1e+156, [0, 3], false],[2e+156, [2, 3], false],[4e+156, [4, 3], false],[8e+156, [6, 3], false],[16e+156, [8, 3], false],[32e+156, [10, 3], false],[64e+156, [12, 3], false],[128e+156, [14, 3], false],[256e+156, [16, 3], false],[512e+156, [18, 3], false],[1e+159, [20, 3], false],[2e+162, [0, 5], false],[5e+162, [2, 5], false],[11e+162, [4, 5], false],[23e+162, [6, 5], false],[47e+162, [8, 5], false],[95e+162, [10, 5], false],[191e+162, [12, 5], false],[383e+162, [14, 5], false],[767e+162, [16, 5], false],[5e+165, [18, 5], false],[125e+165, [20, 5], false],[1e+171, [0, 3], false],[14e+171, [2, 3], false],[114e+171, [4, 3], false],[234e+171, [6, 3], false],[444e+171, [8, 3], false],[888e+171, [10, 3], false],[23e+174, [12, 3], false],[99e+174, [14, 3], false],[423e+174, [16, 3], false],[567e+174, [18, 3], false],[899e+174, [20, 3], false],[1e+180, [0, 3], false],[3e+180, [2, 3], false],[9e+180, [4, 3], false],[27e+180, [6, 3], false],[81e+180, [8, 3], false],[234e+180, [10, 3], false],[356e+180, [12, 3], false],[432e+180, [14, 3], false],[567e+180, [16, 3], false],[836e+180, [18, 3], false],[1e+183, [20, 3], false],[10e+186, [0, 15], false],[100e+186, [2, 15], false],[1e+189, [4, 15], false],[10e+189, [6, 15], false],[100e+189, [8, 15], false],[1e+192, [10, 15], false],[10e+192, [12, 15], false],[100e+192, [14, 15], false],[1e+195, [16, 15], false],[10e+195, [18, 15], false],[100e+195, [20, 15], false]];
    $scope.moon.angelUpgrades = [[11000, [20, 3], false, false],[222000, [0, 3], false, false],[3e+6, [2, 3], false, false],[4e+6, [4, 3], false, false],[55e+6, [6, 3], false, false],[666e+6, [8, 3], false, false],[7e+9, [10, 3], false, false],[88e+9, [12, 3], false, false],[999e+9, [14, 3], false, false],[1e+12, [16, 3], false, false],[11e+12, [18, 3], false, false],[123e+12, [20, 3], false, false],[50e+18, [31, 10], false, false],[50e+18, [33, 10], false, false],[50e+18, [35, 10], false, false],[50e+18, [37, 10], false, false],[50e+18, [39, 10], false, false],[1e+21, [0, 3], false, false],[9e+21, [2, 3], false, false],[27e+21, [4, 3], false, false],[99e+21, [6, 3], false, false],[180e+21, [8, 3], false, false],[222e+21, [10, 3], false, false],[343e+21, [12, 3], false, false],[477e+21, [14, 3], false, false],[569e+21, [16, 3], false, false],[789e+21, [18, 3], false, false],[1e+24, [20, 3], false, false],[25e+27, [31, 10], false, false],[25e+27, [33, 10], false, false],[25e+27, [35, 10], false, false],[25e+27, [37, 10], false, false],[25e+27, [39, 10], false, false],[1e+30, [0, 2], false, false],[14e+30, [2, 2], false, false],[55e+30, [4, 2], false, false],[100e+30, [6, 2], false, false],[189e+30, [8, 2], false, false],[267e+30, [10, 2], false, false],[404e+30, [12, 2], false, false],[691e+30, [14, 2], false, false],[777e+30, [16, 2], false, false],[910e+30, [18, 2], false, false],[2e+33, [20, 3], false, false],[100e+33, [31, 10], false, false],[100e+33, [33, 10], false, false],[100e+33, [35, 10], false, false],[100e+33, [37, 10], false, false],[100e+33, [39, 10], false, false],[5e+36, [0, 3], false, false],[19e+36, [2, 3], false, false],[88e+36, [4, 3], false, false],[144e+36, [6, 3], false, false],[201e+36, [8, 3], false, false],[333e+36, [10, 3], false, false],[400e+36, [12, 3], false, false],[588e+36, [14, 3], false, false],[701e+36, [16, 3], false, false],[911e+36, [18, 3], false, false],[50e+39, [20, 3], false, false],[5e+42, [31, 10], false, false],[5e+42, [33, 10], false, false],[5e+42, [35, 10], false, false],[5e+42, [37, 10], false, false],[5e+42, [39, 10], false, false],[3e+45, [0, 5], false, false],[6e+45, [2, 5], false, false],[12e+45, [4, 5], false, false],[24e+45, [6, 5], false, false],[48e+45, [8, 5], false, false],[96e+45, [10, 5], false, false],[192e+45, [12, 5], false, false],[384e+45, [14, 5], false, false],[768e+45, [16, 5], false, false],[14e+48, [18, 5], false, false],[300e+51, [20, 9], false, false],[5e+54, [30, 50], false, false],[5e+54, [31, 50], false, false],[5e+54, [32, 50], false, false],[5e+54, [33, 50], false, false],[5e+54, [34, 50], false, false],[5e+54, [35, 50], false, false],[5e+54, [36, 50], false, false],[5e+54, [37, 50], false, false],[5e+54, [38, 50], false, false],[5e+54, [39, 50], false, false],[100e+54, [0, 3], false, false],[200e+54, [2, 3], false, false],[300e+54, [4, 3], false, false],[400e+54, [6, 3], false, false],[500e+54, [8, 3], false, false],[600e+54, [10, 3], false, false],[700e+54, [12, 3], false, false],[800e+54, [14, 3], false, false],[900e+54, [16, 3], false, false],[1e+57, [18, 3], false, false],[316e+57, [20, 3], false, false],[100e+63, [30, 75], false, false],[100e+63, [31, 75], false, false],[100e+63, [32, 75], false, false],[100e+63, [33, 75], false, false],[100e+63, [34, 75], false, false],[100e+63, [35, 75], false, false],[100e+63, [36, 75], false, false],[100e+63, [37, 75], false, false],[100e+63, [38, 75], false, false],[100e+63, [39, 75], false, false],[1e+69, [0, 3], false, false],[2e+69, [2, 3], false, false],[4e+69, [4, 3], false, false],[8e+69, [6, 3], false, false],[16e+69, [8, 3], false, false],[32e+69, [10, 3], false, false],[64e+69, [12, 3], false, false],[128e+69, [14, 3], false, false],[256e+69, [16, 3], false, false],[512e+69, [18, 3], false, false],[1e+72, [20, 3], false, false],[5e+75, [31, 50], false, false],[5e+75, [33, 50], false, false],[5e+75, [34, 100], false, false],[5e+75, [36, 100], false, false],[5e+75, [39, 25], false, false],[100e+75, [0, 7], false, false],[200e+75, [2, 7], false, false],[400e+75, [4, 7], false, false],[800e+75, [6, 7], false, false],[16e+78, [8, 7], false, false],[32e+78, [10, 7], false, false],[64e+78, [12, 7], false, false],[128e+78, [14, 7], false, false],[256e+78, [16, 7], false, false],[512e+78, [18, 7], false, false],[1e+81, [20, 7], false, false],[100e+84, [33, 100], false, false],[200e+84, [34, 200], false, false],[300e+84, [36, 300], false, false],[1e+87, [0, 2], false, false],[9e+87, [2, 2], false, false],[18e+87, [4, 2], false, false],[27e+87, [6, 2], false, false],[36e+87, [8, 2], false, false],[45e+87, [10, 2], false, false],[54e+87, [12, 2], false, false],[63e+87, [14, 2], false, false],[72e+87, [16, 2], false, false],[81e+87, [18, 2], false, false],[1e+90, [20, 5], false, false]];
    $scope.moon.managerUpgrades = [[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]]];
    /*$scope.mars.unlocks = [];
    for (var i = 0; i < 11; i++) {
      $scope.mars.unlocks.push([]);
    }
    $scope.mars.unlocks[0] = [];
    $scope.mars.unlocks[1] = [];
    $scope.mars.unlocks[2] = [];
    $scope.mars.unlocks[3] = [];
    $scope.mars.unlocks[4] = [];
    $scope.mars.unlocks[5] = [];
    $scope.mars.unlocks[6] = [];
    $scope.mars.unlocks[7] = [];
    $scope.mars.unlocks[8] = [];
    $scope.mars.unlocks[9] = [];
    $scope.mars.unlocks[10] = [];
    $scope.mars.cashUpgrades = [];
    $scope.mars.angelUpgrades = [];
    $scope.mars.managerUpgrades = [];*/
  };

  loadDefaults();
  loadUnlocks();
}]);
