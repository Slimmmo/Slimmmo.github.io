"use strict";

var advApp = angular.module('advApp', ['ui.bootstrap', 'ngAnimate']),
illionsArr = ['', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion', ' Sextillion', ' Septillion', ' Octillion', ' Nonillion', ' Decillion', ' Undecillion', ' Duodecillion', ' Tredecillion', ' Quattuordecillion', ' Quindecillion', ' Sexdecillion', ' Septendecillion', ' Octodecillion', ' Novemdecillion', ' Vigintillion', ' Unvigintillion', ' Duovigintillion', ' Tresvigintillion', ' Quattuorvigintillion', ' Quinvigintillion', ' Sexvigintillion', ' Septenvigintillion', ' Octovigintillion', ' Novemvigintillion', ' Trigintillion', ' Untrigintillion', ' Duotrigintillion', ' Tretrigintillion', ' Quattuortrigintillion', ' Quintrigintillion', ' Sextrigintillion', ' Septentrigintillion', ' Octotrigintillion', ' Novemtrigintillion', ' Quadragintillion', ' Unquadragintillion', ' Duoquadragintillion', ' Trequadragintillion', ' Quattuorquadragintillion', ' Quinquadragintillion', ' Sexquadragintillion', ' Septquadragintillion', ' Octoquadragintillion', ' Novemquadragintillion', ' Quinquagintillion', ' Unquinquagintillion', ' Duoquinquagintillion', ' Trequinquagintillion', ' Quattuorquinquagintillion', ' Quinquinquagintillion', ' Sexquinquagintillion', ' Septquinquagintillion', ' Octoquinquagintillion', ' Novemquinquagintillion', ' Sexagintillion', ' Unsexagintillion', ' Duosexagintillion', ' Tresexagintillion', ' Quattuorsexagintillion', ' Quinsexagintillion', ' Sexsexagintillion', ' Septsexagintillion', ' Octosexagintillion', ' Novemsexagintillion', ' Septuagintillion', ' Unseptuagintillion', ' Duoseptuagintillion', ' Treseptuagintillion', ' Quattuorseptuagintillion', ' Quinseptuagintillion', ' Sexseptuagintillion', ' Septseptuagintillion', ' Octoseptuagintillion', ' Novemseptuagintillion', ' Octogintillion', ' Unoctogintillion', ' Duooctogintillion', ' Treoctogintillion', ' Quattuoroctogintillion', ' Quinoctogintillion', ' Sexoctogintillion', ' Septoctogintillion', ' Octooctogintillion', ' Novemoctogintillion', ' Nonagintillion', ' Unnonagintillion', ' Duononagintillion', ' Trenonagintillion', ' Quattuornonagintillion', ' Quinnonagintillion', ' Sexnonagintillion', ' Septnonagintillion', ' Octononagintillion', ' Novemnonagintillion', ' Centillion', ' Uncentillion'];

function numFilter(input) {
  var out = "",
  mCount = 0,
  e = 6;
  if (input === Infinity) {
    return "Infinity";
  } else if (input !== null) {
    while (Math.abs(input) >= Number('1e+' + e)) {
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
  }
  return out + illionsArr[mCount];
}

// this directive is to reduce the watchers inside the directive from x to 1
// this is extremely useful for tables which had up to 400 watchers, significantly improving digest speed
// http://www.codelord.net/2016/04/21/angular-performance-updating-bind-once-elements/
advApp.directive('refresher', function() {
  return {
    transclude: true,
    controller: function($scope, $transclude, $attrs, $element) {
      var childScope;
      $scope.$watch($attrs.condition, function(value) {
        $element.empty();
        if (childScope) {
          childScope.$destroy();
          childScope = null;
        }
        $transclude(function(clone, newScope) {
          childScope = newScope;
          $element.append(clone);
        });
      });
    }
  };
});

advApp.filter('time', function() {
  return function(input) {
    if (input === Infinity) {
      return "———";
    } else {
      input = Math.floor(input);
      var s = ("00" + input % 60).slice(-2);
      var m = ("00" + Math.floor(input / 60) % 60).slice(-2);
      var h = ("00" + Math.floor(input / 3600) % 24).slice(-2);
      var d = Math.floor(input / 86400);
      var out = "";
      if (d >= 1) {
        out += numFilter(d) + ' d';
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
  return function(input) {
    return numFilter(input);
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
      if (index === loc.investments.length + 1) {
        retVal = 'Angel Investor';
      }
      else {
        retVal = (index < loc.investments.length) ? loc.investments[index][0] : 'All';
        retVal += (loc.cashUpgrades[input[1]][1][0] % 2 === 0) ? ' Profit' : ' Speed';
      }
      retVal += ' ' + loc.cashUpgrades[input[1]][1][1];
    }
    return retVal;
  }
});

advApp.controller('advController', ['$document', '$filter', '$scope', function($document, $filter, $scope) {
  $scope.accOpen = [false, false, false, false, false, false, false];
  $scope.accOpen2 = [false, false];
  $scope.calcToggle = true;
  $scope.carol = {};
  $scope.cashella = {};
  $scope.clearAfter = [false, false];
  $scope.coins = {};
  $scope.compare = false;
  $scope.earth = {};
  $scope.easystreet = {};
  $scope.events = [
    ['carol', 'A Capitalist Carol'],
    ['friday', 'Black & Blue Friday'],
    ['cashella', 'Cashella'],
    ['love', 'For the Love of Money'],
    ['halloween', 'Gates of Heck'],
    ['coins', 'Insert Coins to Continue'],
    ['liverich', 'Live Rich and Profit'],
    ['lyp', 'Live Your Profits'],
    ['rain', 'Making It Rain'],
    ['managermaniaI', 'Manager Mania I'],
    ['newyou', 'New You Resolutions'],
    ['evil', 'Root of All Evil'],
    ['saturday', 'Saturday Morning Fever'],
    ['excellent', 'The Excellent AdVenture'],
    ['onepercent', "1% Land"],
    ['easystreet', 'A Nightmare on Easy Street'],
    ['gizmo', 'Thanks-Gizmo'],
    ['merrymerger', 'Merry Merger'],
    ['profitabowl', 'Profit-a-Bowl']
  ];
  $scope.evil = {};
  $scope.excellent = {};
  $scope.fillBefore = [false, false];
  $scope.filterTime = {'days': null, 'hours': null, 'minutes': null, 'percentage': null};
  $scope.friday = {};
  $scope.gizmo = {};
  $scope.halloween = {};
  $scope.illionsArray = illionsArr.slice(1);
  $scope.lastEvent = 'profitabowl';
  $scope.liverich = {};
  $scope.love = {};
  $scope.lyp = {};
  $scope.managermaniaI = {};
  $scope.mars = {};
  $scope.merrymerger = {};
  $scope.moon = {};
  $scope.newyou = {};
  $scope.onepercent = {};
  $scope.platinumboosts = [17.77, 77.77, 777.77, 7777.77];
  $scope.profitabowl = {};
  $scope.rain = {};
  $scope.raw = false;
  $scope.ref = $scope.earth;
  $scope.reverse = true;
  $scope.saturday = {};
  $scope.selectAll = [false, false, false, false];
  $scope.showEvents = false;
  $scope.showUpdate = false;
  $scope.sortIndex = 2;
  $scope.suitList = [
    ['Blue', 3],
    ['Gold', 2],
    ['Green', 10],
    ['Red', 2],
    ['Teal', 30],
    ['White', 2]
  ];
  $scope.superbadgeList = [
    /*
    The structure is as follows:
    ['Name',Planet ID,[Investment,x Profit]]
    */
    ['Basket Case', 0, [6, 25]],
    ['Buy-It Shield', 0, [2, 30]],
    ['Candy Canes', 0, [10, 20]],
    ['Burger', 0, [12, 20]],
    ['Unicorn', 0, [16, 15]],
    ['Rainbow Machine', 1, [0, 30]],
    ['Villain Mask', 1, [6, 25]],
    ['Space Buddies', 1, [8, 20]],
    ['Silver Blade', 1, [12, 20]],
    ['Speaker', 1, [16, 15]],
    ['Boxing Bear', 2, [8, 20]],
    ['Time Machine', 2, [14, 15]],
    ['Bonbon', 0, [0, 25]],
    ['Kitchen Gadget', 0, [4, 30]],
    ['Fuzzee', 0, [8, 20]],
    ['Pro-Team Shake', 0, [14, 20]],
    ['Cupid', 0, [18, 15]],
    ['Bunny Ears', 1, [2, 30]],
    ['Hero Mask', 1, [4, 25]],
    ['XO Skeleton', 1, [10, 20]],
    ['Drums', 1, [18, 20]],
    ['MXC', 2, [2, 25]],
    ['Cereal', 1, [14, 20]],
    ['Capitalism Hill', 2, [6, 15]],
    ['Haunted Mansion', 2, [4, 20]],
    ['Fi-doo 3000', 2, [0, 25]],
    ['Turdy', 2, [10, 25]],
    ['Budget Light', 2, [16, 15]]
    //Future badges:
    //['', 2, [12, ]],
  ];
  var planets = ['earth', 'moon', 'mars'];

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
    loadDefaults();
    loadUnlocks();
    var lastEvent = localStorage.getItem('lastEvent');
    if (lastEvent) {
      $scope.lastEvent = lastEvent;
    }
    var saved = localStorage.getItem('planets');
    if (saved) {
      loadExportedJson(saved);
    }
    var refWorld = localStorage.getItem('refWorld');
    if (refWorld) {
      $scope.setWorld(refWorld);
    }
  });

  function loadPlanet(obj, p) {
    var i = 0, j = 0;
    if (obj.hasOwnProperty(p)) {
      $scope.fullyResetPlanet($scope[p]);
      for (i in obj[p].levels) {
        if (obj[p].levels.hasOwnProperty(i)) {
          for (j = 0; j < $scope[p].investments.length; j++) {
            if ($scope[p].investments[j][0] === i) {
              $scope[p].investments[j][1] = obj[p].levels[i];
              break;
            }
          }
        }
      }
      $scope[p].numAngels = obj[p].numAngels;
      $scope.updateViewNumAngels($scope[p]);
      for (i = 0; i < obj[p].upgradeIndexUpTo; i++) {
        $scope[p].cashUpgrades[i][$scope[p].cashUpgrades[i].length - 1] = true;
      }
      for (i = 0; i < obj[p].angelUpgradeIndexUpTo; i++) {
        $scope[p].angelUpgrades[i][$scope[p].angelUpgrades[i].length - 1] = true;
      }
      for (i = 0; i < obj[p].upgradeIndexBonus.length; i++) {
        $scope[p].cashUpgrades[obj[p].upgradeIndexBonus[i]][$scope[p].cashUpgrades[obj[p].upgradeIndexBonus[i]].length - 1] = true;
      }
      for (i = 0; i < obj[p].angelUpgradeIndexBonus.length; i++) {
        $scope[p].angelUpgrades[obj[p].angelUpgradeIndexBonus[i]][$scope[p].angelUpgrades[obj[p].angelUpgradeIndexBonus[i]].length - 1] = true;
      }
      for (i = 0; i < obj[p].managersBought.length; i++) {
        $scope[p].managerUpgrades[Math.floor(obj[p].managersBought[i] / 2)][obj[p].managersBought[i] % 2][1] = true;
      }
      if (obj[p].platinumboost != null) {
        console.log("Has platinum boost saved.");
        for (i = 0; i < $scope.platinumboosts.length; i++) {
          if (obj[p].platinumboost == $scope.platinumboosts[i]) {
            console.log("Compares to " + i + ".");
            $scope.changePlatinum($scope[p], i);
          }
        }
      } else {
        console.log("Does not have platinum boost saved.");
        $scope.changePlatinum($scope[p], 0);
      }
      $scope[p].noSingles = obj[p].noSingles || false;
      $scope[p].noTens = obj[p].noTens || false;
      $scope[p].noHundreds = obj[p].noHundreds || false;
      if ('suit' in obj[p]) {
        $scope[p].suits[obj[p].suit][0] = true;
      }
      if ('badge' in obj[p]) {
        $scope[p].badges[obj[p].badge][0] = true;
      }
      $scope[p].triples = obj[p].triples;
      $scope[p].flux = obj[p].flux;
      $scope[p].bonusAngelEffectiveness = obj[p].bonusAngelEffectiveness;
      $scope[p].bonusMultiplier = obj[p].bonusMultiplier;
      if (angular.isDefined(obj[p].megaTicket)) {
        for (i = 0; i < obj[p].megaTicket.length; i++) {
          $scope[p].investments[obj[p].megaTicket[i]][2] = true;
        }
      }
    }
    $scope.calc($scope[p]);
  }

  function loadExportedJson(str) {
    var i = 0, obj = JSON.parse(str);
    for (i in planets) {
      loadPlanet(obj, planets[i]);
    }
    for (i in $scope.events) {
      loadPlanet(obj, $scope.events[i][0]);
    }
    $scope.$digest();
  }

  $scope.apply = function(loc) {
    if (loc.recTable.length > 0) {
      $scope.applyRow(loc, loc.recTable[0]);
    }
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

  function applySuperBadge(loc) {
    var i, j;
    for (i = 0; i < loc.badges.length; i++) {
      if (loc.badges[i][0] === true) {
        if (loc.name === $scope[planets[$scope.superbadgeList[i][1]]].name) {
          var row = $scope.superbadgeList[i][2];
          var applyRow = Math.floor(row[0] / 2);
          var applyType = row[0] % 2;
          if (applyRow < loc.investments.length) {
            if (applyType === 0) {
              loc.investments[applyRow][3] *= row[1];
            } else {
              loc.investments[applyRow][4] /= row[1];
            }
          } else if (applyRow === loc.investments.length) {
            if (applyType === 0) {
              for (j = 0; j < loc.investments.length; j++) {
                loc.investments[j][3] *= row[1];
              }
            } else {
              for (j = 0; j < loc.investments.length; j++) {
                loc.investments[j][4] /= row[1];
              }
            }
          } else if (applyRow === loc.investments.length + 1) {
            loc.angelEffectiveness += row[1];
          } else if (row[0] < 30 || row[0] > 29 + loc.investments.length) {
            throw 'Pair not dealt with: ' + row;
          }
        }
        break;
      }
    }
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
    }
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
    calcSuperBadges(loc);
    calcRecommendations(loc);
    localStorage.setItem('planets', getJsonForExport());
    $scope.calcToggle = !$scope.calcToggle;
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
    maxObj = null,
    tempUnlock = null, tempUnlockTime = null, tempPercentageIncrease = null,
    upgradeScore = 0;
    loc.recTable = [];
    if (!loc.noSingles) {
      inc.push(1);
    }
    if (!loc.noTens) {
      inc.push(10);
    }
    if (!loc.noHundreds) {
      inc.push(100);
    }
    $scope.updateFilterTime(loc);
    for (; i < loc.investments.length; i++) {
      while (inc.length > 3 - (loc.noSingles ? 1 : 0) - (loc.noTens ? 1 : 0) - (loc.noHundreds ? 1 : 0)) {
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
    if (loc.unlocks[loc.investments.length].length > 0) {
      tempUnlock = 0;
      tempPlanet.investments = deepCopy(loc.investments);
      tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
      for (i = 1; i < loc.investments.length; i++) {
        if (loc.investments[i][1] < highestSharedLevel) {
          highestSharedLevel = loc.investments[i][1];
        }
      }
      if (highestSharedLevel < loc.unlocks[loc.investments.length][loc.unlocks[loc.investments.length].length - 1][0]) {
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
      }
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
    loc.angelEffectiveness = 2 + (loc.suits[suitFromName('red')][0] ? $scope.suitList[suitFromName('red')][1] : 0) + (loc.suits[suitFromName('green')][0] ? $scope.suitList[suitFromName('green')][1] : 0) + (loc.suits[suitFromName('teal')][0] ? $scope.suitList[suitFromName('teal')][1] : 0);
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
        loc.investments[i][3] *= $scope.selectAll[0] ? loc.platinumboost : 7.77;
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
    applySuperBadge(loc);
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
      } else {
        loc.suits[i][1] = false;
      }
    }
    if (max[0] !== -1) {
      loc.bestSuit = max[0];
    } else {
      loc.bestSuit = null;
    }
  };

  function calcSuperBadges(loc) {
    var i = 0, max = [-1, 0],
    tempPlanet = {};
    loc.badgeExclamation = false;
    for (; i < loc.badges.length; i++) {
      if (loc.badges[i][0] === false) {
        tempPlanet = JSON.parse(JSON.stringify(loc));
        tempPlanet.badges[i][0] = true;
        $scope.changeBadge(tempPlanet, i);
        calcState(tempPlanet);
        var delta = tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
        var percent = delta / loc.totalMoneyPerSecond;
        if (delta > 0) {
          loc.badges[i][1] = percent;
          loc.badgeExclamation = true;
          if (percent > max[1]) {
            max[0] = i;
            max[1] = percent;
          }
        } else {
          loc.badges[i][1] = false;
        }
      } else {
        loc.badges[i][1] = false;
      }
    }
    if (max[0] !== -1) {
      loc.bestBadge = max[0];
    } else {
      loc.bestBadge = null;
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

  $scope.changePlatinum = function(loc, index) {
    for (var i = 0; i < loc.platinum.length; i++) {
      if (i !== index) {
        loc.platinum[i][0] = false;
      } else {
        loc.platinum[i][0] = true;
      }
    }
    loc.platinumboost = loc.ignorePlatinumBoost !== true ? $scope.platinumboosts[index] : 7.77;
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

  $scope.changeBadge = function(loc,index) {
    for (var i = 0; i < loc.badges.length; i++) {
      if (i !== index) {
        loc.badges[i][0] = false;
      } else {
        loc.badges[i][1] = false;
      }
    }
  }

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
    string += '\r\n  ], \r\n  "noSingles": ' + loc.noSingles + ',\r\n  "noTens": ' + loc.noTens + ',\r\n  "noHundreds": ' + loc.noHundreds + ',\r\n  "platinumboost": ' + loc.platinumboost;
    for (i = 0; i < loc.suits.length; i++) {
      if (loc.suits[i][0] === true) {
        string += ',\r\n  "suit": ' + i;
        break;
      }
    }
    for (i = 0; i < loc.badges.length; i++) {
      if (loc.badges[i][0] === true) {
        string += ',\r\n  "badge": ' + i;
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
    loc.badgeExclamation = false;
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
    loc.platinumboost = 17.77;
    $scope.changePlatinum(loc, 0);
    loc.rec = null;
    loc.recTable = [];
    loc.recommendation = '';
    loc.suitExclamation = false;
    loc.totalMoneyPerSecond = 0;
    loc.triples = 0;
    loc.upgradeCosts = [];
    for (var i = 0; i < loc.investments.length; i++) {
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

  $scope.getEventName = function(ev) {
    for (var i = 0; i < $scope.events.length; i++) {
      if ($scope.events[i][0] == ev) {
        return $scope.events[i][1];
      }
    }
  };

  function getJsonForExport() {
    var retString = '{';
    for (var p in planets) {
      if (p !== '0') {
        retString += ',\r\n';
      }
      retString += formatState($scope[planets[p]]);
    }
    for (var ev in $scope.events) {
      retString += ',\r\n' + formatState($scope[$scope.events[ev][0]]);
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

  $scope.getBadgeBonusInfo = function (loc, badge) {
      var ret = '';
      ret += badge[2][1]+'x on ';
      ret += $scope[planets[badge[1]]].investments[badge[2][0] / 2][0];
      if (badge[2][0] % 2 === 1)
          ret += ' Speed';
      return ret;
  }

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

  $scope.isEvent = function() {
    return !$scope.isWorld('earth') && !$scope.isWorld('moon') && !$scope.isWorld('mars');
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
    localStorage.setItem('refWorld', planet);
    if ($scope.isEvent()) {
      $scope.lastEvent = planet;
    }
    localStorage.setItem('lastEvent', $scope.lastEvent);
    $scope.showEvents = false;
    $scope.calc($scope.ref);
  };

  $scope.showEventsClick = function() {
    $scope.showEvents = !$scope.showEvents;
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
    if (loc.rec == null) {
      loc.recommendation = 'No recommendation.'
    } else if (loc.rec[0] === 'all') {
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

  function updateView(loc,varName, viewName, illionsName) {
    if (loc[varName] < Number(1e+6)) {
      loc[viewName] = loc[varName];
      loc[illionsName] = '';
    } else {
      var filtered = numFilter(loc[varName]).split(' ');
      loc[viewName] = Number(filtered[0]);
      loc[illionsName] = filtered[1];
    }
  }

  $scope.updateViewNumAngels = function (loc) {
    updateView(loc,'numAngels', 'viewNumAngels', 'illions');
  };

  function loadDefaults() {
    $scope.carol.angelScale = 7.5;
    $scope.carol.baseCost = [0.1068, 10000, 1e+9, 1e+13, 1e+17, 1e+22, 1e+27, 1e+32, 1e+39];
    $scope.carol.basePower = [1.03, 1.05, 1.07, 1.09, 1.12, 1.15, 1.18, 1.21, 1.25];
    // All of the e+ baseProfit values are not exact. Can't get at the file. Roast Beast is probably the most wrong.
    $scope.carol.baseProfit = [0.06, 6172, 123.401e+6, 1.84629e+12, 2.41302e+16, 2.52525e+18, 31.4203e+21, 37.0926e+24, 4.32225e+29];
    $scope.carol.baseSpeed = [8, 16, 24, 32, 40, 48, 56, 64, 80];
    $scope.carol.investments = [
      ['Happy Saplings', 1, false, 0, 0, 0, 0],
      ['Silver-ish Bells', 0, false, 0, 0, 0, 0],
      ['BB Blasters', 0, false, 0, 0, 0, 0],
      ['Garnish Varnish', 0, false, 0, 0, 0, 0],
      ['Decorammunitions', 0, false, 0, 0, 0, 0],
      ['Giving Tanks', 0, false, 0, 0, 0, 0],
      ['Fuzzees', 0, false, 0, 0, 0, 0],
      ['Super Bro Dolls', 0, false, 0, 0, 0, 0],
      ['Roast Beast', 0, false, 0, 0, 0, 0]
    ];
    $scope.cashella.angelScale = 45;
    $scope.cashella.baseCost = [4, 10, 20, 48, 100, 168, 252, 396, 544];
    $scope.cashella.basePower = [1.045, 1.105, 1.225, 1.525, 2.125, 3.3, 4.05, 4.8, 6];
    $scope.cashella.baseProfit = [2, 6, 12, 20, 30, 42, 56, 72, 90];
    $scope.cashella.baseSpeed = [4, 8, 12, 16, 20, 24, 28, 32, 36];
    $scope.cashella.hasMegaTickets = false;
    $scope.cashella.investments = [
      ['Food Fighters', 1, false, 0, 0, 0, 0],
      ['L.I.L. Z', 0, false, 0, 0, 0, 0],
      ['Mad At The Corporation', 0, false, 0, 0, 0, 0],
      ['Ali Jupiter', 0, false, 0, 0, 0, 0],
      ['Beyonest', 0, false, 0, 0, 0, 0],
      ['Brethren Songclash', 0, false, 0, 0, 0, 0],
      ['Kenneth Rural', 0, false, 0, 0, 0, 0],
      ['Skrilla', 0, false, 0, 0, 0, 0],
      ['Steel Pantera', 0, false, 0, 0, 0, 0]
    ];
    $scope.coins.angelScale = 90;
    $scope.coins.baseCost = [2.5, 5, 7.5, 10, 12.5, 30, 50, 70, 125];
    $scope.coins.basePower = [1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 4.5];
    $scope.coins.baseProfit = [0.25, 0.75, 1.25, 1.75, 5.25, 15, 36.25, 67.50, 131.25];
    $scope.coins.baseSpeed = [5, 8, 11, 14, 17, 20, 35, 45, 60];
    $scope.coins.hasMegaTickets = true;
    $scope.coins.ignorePlatinumBoost = true;
    $scope.coins.investments = [
      ['Explosive Dude', 1, false, 0, 0, 0, 0],
      ['Silver Blade', 1, false, 0, 0, 0, 0],
      ['Primate Paradise', 1, false, 0, 0, 0, 0],
      ['Flemmings', 1, false, 0, 0, 0, 0],
      ['Fightingfrogs', 1, false, 0, 0, 0, 0],
      ['Crow & Jack', 1, false, 0, 0, 0, 0],
      ['Street Skid 2', 1, false, 0, 0, 0, 0],
      ['Rad Cap', 1, false, 0, 0, 0, 0],
      ['Space Worm Ted', 1, false, 0, 0, 0, 0]
    ];
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
    $scope.easystreet.angelScale = 45;
    $scope.easystreet.baseCost = [12.72, 333, 33333, 1962000, 75000000, 1200000000, 23232323232, 159159159159, 1964091800000];
    $scope.easystreet.basePower = [1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10];
    $scope.easystreet.baseProfit = [1.15, 56, 1500, 32370, 756000, 4.2e6, 85e6, 2.5e9, 130e9];
    $scope.easystreet.baseSpeed = [1, 5, 7, 9, 11, 13, 15, 18, 21];
    $scope.easystreet.hasMegaTickets = true;
    $scope.easystreet.ignorePlatinumBoost = true;
    $scope.easystreet.investments = [
        ['Golden Apple Bobbing', 1, false, 0, 0, 0, 0],
        ['Best Suit Contest', 0, false, 0, 0, 0, 0],
        ['Monster Mash DJ', 0, false, 0, 0, 0, 0],
        ['Sewer Tours', 0, false, 0, 0, 0, 0],
        ['Insufficient Fun House', 0, false, 0, 0, 0, 0],
        ['Cereal Killer House', 0, false, 0, 0, 0, 0],
        ['Scairy Tale House', 0, false, 0, 0, 0, 0],
        ['Prankenstein House', 0, false, 0, 0, 0, 0],
        ['Last Mansion on the Left', 0, false, 0, 0, 0, 0]
    ];
    $scope.evil.angelScale = 150;
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
    $scope.excellent.angelScale = 90;
    $scope.excellent.baseCost =   [2.75, 5.75, 8.75, 11.75, 17.75, 45, 86.25, 137.5, 256.25];
    $scope.excellent.basePower =  [1.75, 2,    2.25, 2.5,   2.75,  3,  3.5,   4,     4.5];
    $scope.excellent.baseProfit = [0.5,  1.5,  2.5,  3.5,   10.5,  30, 72.5,  135,   262.5];
    $scope.excellent.baseSpeed =  [5,    8,    11,   14,    17,    20, 35,    45,    60];
    $scope.excellent.hasMegaTickets = true;
    $scope.excellent.ignorePlatinumBoost = true;
    $scope.excellent.investments = [
      ['Dino Shock Collars', 1, false, 0, 0, 0, 0],
      ['Pyramid Cranes', 1, false, 0, 0, 0, 0],
      ['7 Blade Viking Razors', 1, false, 0, 0, 0, 0],
      ['Horse GPS', 1, false, 0, 0, 0, 0],
      ['Medieval Soap on a Rope', 1, false, 0, 0, 0, 0],
      ['Camel AC Units', 1, false, 0, 0, 0, 0],
      ['Sabretooth Litterboxes', 1, false, 0, 0, 0, 0],
      ['Bubonic Mouse Traps', 1, false, 0, 0, 0, 0],
      ['Pirate Ship Outboard', 1, false, 0, 0, 0, 0]
    ];
    $scope.friday.angelScale = 150;
    $scope.friday.baseCost = [10, 20, 30, 40, 50, 120, 200, 280, 500];
    $scope.friday.basePower = [1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4, 4.5];
    $scope.friday.baseProfit = [1, 3, 5, 7, 21, 60, 145, 270, 525];
    $scope.friday.baseSpeed = [5, 8, 11, 14, 17, 20, 35, 45, 60];
    $scope.friday.investments = [
      ['Door Crashers', 1, false, 0, 0, 0, 0],
      ['Power Tools', 1, false, 0, 0, 0, 0],
      ['Waffle Irons', 1, false, 0, 0, 0, 0],
      ['Blu-Ray Players', 1, false, 0, 0, 0, 0],
      ['Coupon Clippers', 1, false, 0, 0, 0, 0],
      ['Microwaves', 1, false, 0, 0, 0, 0],
      ['Kitchen Gadgets', 1, false, 0, 0, 0, 0],
      ['Trample-ines', 1, false, 0, 0, 0, 0],
      ['Sucky Vacuums', 1, false, 0, 0, 0, 0]
    ];
    $scope.gizmo.angelScale = 150;
    $scope.gizmo.baseCost = [5, 88, 777, 22222, 444444, 99999999, 222222222, 5555555555, 33333333333];
    $scope.gizmo.basePower = [1.023, 1.046, 1.083, 1.166, 1.323, 2.286, 3.563, 6.126, 12.26];
    $scope.gizmo.baseProfit = [0.5, 9, 81, 729, 7771, 1111111, 1212121, 161616161, 8180000000];
    $scope.gizmo.baseSpeed = [1.5, 5, 8, 18, 28, 120, 210, 370, 700];
    $scope.gizmo.hasMegaTickets = true;
    $scope.gizmo.ignorePlatinumBoost = true;
    $scope.gizmo.investments = [
      ['Pumpkin Spice Infuser', 1, false, 0, 0, 0, 0],
      ['Touch Screen Football', 0, false, 0, 0, 0, 0],
      ['Gravy-Go Helmet', 0, false, 0, 0, 0, 0],
      ['Snug-xedo', 0, false, 0, 0, 0, 0],
      ['Small Talk Decoy', 0, false, 0, 0, 0, 0],
      ['Leftover Delivery Drones', 0, false, 0, 0, 0, 0],
      ['Fi-doo 3000', 0, false, 0, 0, 0, 0],
      ['Leaf Thrower', 0, false, 0, 0, 0, 0],
      ['Turkey Multi-Tool', 0, false, 0, 0, 0, 0]
    ];
    $scope.halloween.angelScale = 150;
    $scope.halloween.baseCost = [6, 71, 640, 20680, 344160, 1492920, 89133040, 149084800, 5758901760, 66666666666];
    $scope.halloween.basePower = [1.02, 1.04, 1.08, 1.16, 1.32, 1.64, 2.28, 3.56, 6.12, 12.24];
    $scope.halloween.baseProfit = [.75, 20, 180, 1440, 17280, 207360, 2488325, 29860000, 358318000, 6666500000];
    $scope.halloween.baseSpeed = [2, 5, 9, 14, 20, 56, 84, 144, 328, 666];
    $scope.halloween.investments = [
      ['Texas Raisins', 1, false, 0, 0, 0, 0],
      ['Dandy Candy', 0, false, 0, 0, 0, 0],
      ['Ice Screams', 0, false, 0, 0, 0, 0],
      ['Snack O\'Lanterns', 0, false, 0, 0, 0, 0],
      ['Shredded Treat', 0, false, 0, 0, 0, 0],
      ['Creepy Dollies', 0, false, 0, 0, 0, 0],
      ['Korn Maizes', 0, false, 0, 0, 0, 0],
      ['Brains', 0, false, 0, 0, 0, 0],
      ['Treat Baskets', 0, false, 0, 0, 0, 0],
      ['Full Sized Choco-Bar', 0, false, 0, 0, 0, 0]
    ];
    $scope.liverich.angelScale = 3;
    $scope.liverich.baseCost = [0.1, 11111, 1111111111, 11111111111111, 111111111111111111, 11111111111111111111111, 1111111111111111111111111111, 111111111111111111111111111111111, 1111111111111111111111111111111111111111];
    $scope.liverich.basePower = [1.03, 1.05, 1.07, 1.09, 1.12, 1.15, 1.18, 1.21, 1.25];
    $scope.liverich.baseProfit = [0.1, 1111, 111111111, 111111111111, 1111111111111111, 111111111111111111, 111111111111111111111, 11111111111111111111111, 111111111111111111111111111];
    $scope.liverich.baseSpeed = [2, 10, 15, 25, 30, 60, 75, 120, 300];
    $scope.liverich.hasMegaTickets = false;
    $scope.liverich.investments = [
      ['XO Skeletons', 1, false, 0, 0, 0, 0],
      ['Cleaning Droids', 0, false, 0, 0, 0, 0],
      ['Spicy Sand Worms', 0, false, 0, 0, 0, 0],
      ['Red Shirts', 0, false, 0, 0, 0, 0],
      ['Barf Buckets', 0, false, 0, 0, 0, 0],
      ['Space Gates', 0, false, 0, 0, 0, 0],
      ['Calling Cards', 0, false, 0, 0, 0, 0],
      ['Bug Spray', 0, false, 0, 0, 0, 0],
      ['Space Buddies', 0, false, 0, 0, 0, 0]
    ];
    $scope.love.angelScale = 45;
    $scope.love.baseCost = [2, 5, 10, 24, 50, 84, 126, 198, 272];
    $scope.love.basePower = [1.03, 1.07, 1.15, 1.35, 1.75, 2.2, 2.7, 3.2, 4];
    $scope.love.baseProfit = [1, 3, 6, 10, 15, 21, 28, 36, 45];
    $scope.love.baseSpeed = [2, 4, 6, 8, 10, 12, 14, 16, 18];
    $scope.love.investments = [
      ['Choc Boxes', 1, false, 0, 0, 0, 0],
      ['Valentines', 0, false, 0, 0, 0, 0],
      ['The Notebooks', 0, false, 0, 0, 0, 0],
      ['Pricy Spicy Sauce', 0, false, 0, 0, 0, 0],
      ['Any Other Names', 0, false, 0, 0, 0, 0],
      ['Bling', 0, false, 0, 0, 0, 0],
      ['Feel Meals', 0, false, 0, 0, 0, 0],
      ['Bitter Sweets', 0, false, 0, 0, 0, 0],
      ['Unicoach Rides', 0, false, 0, 0, 0, 0]
    ];
    $scope.lyp.angelScale = 180;
    $scope.lyp.baseCost =   [5,     88,    777,   22222, 444444, 99999999, 222222222, 5555555555, 33333333333];
    $scope.lyp.basePower =  [1.023, 1.046, 1.083, 1.166, 1.323,  2.286,    3.563,     6.126,      12.26];
    $scope.lyp.baseProfit = [0.5,   9,     81,    729,   7777,   1.111e6,  1.212e6,   161.616e6,  8.181e9];
    $scope.lyp.baseSpeed =  [1.5,   5,     8,     18,    28,     120,      210,       370,        700];
    $scope.lyp.hasMegaTickets = false;
    $scope.lyp.investments = [
      ['Belly Flopping', 1, false, 0, 0, 0, 0],
      ['Larping', 0, false, 0, 0, 0, 0],
      ['Rock, Paper, Scissors', 0, false, 0, 0, 0, 0],
      ['Bear Knuckle Boxing', 0, false, 0, 0, 0, 0],
      ['Backyard Wrestling', 0, false, 0, 0, 0, 0],
      ['Running of the Bulls', 0, false, 0, 0, 0, 0],
      ['Competetive Eating', 0, false, 0, 0, 0, 0],
      ['MXC', 0, false, 0, 0, 0, 0],
      ['E-Sports', 0, false, 0, 0, 0, 0]
    ];
    $scope.managermaniaI.angelScale = 0;
    $scope.managermaniaI.baseCost = [12, 65];
    $scope.managermaniaI.basePower = [1.09, 1.03];
    $scope.managermaniaI.baseProfit = [2, 13];
    $scope.managermaniaI.baseSpeed = [1, 10];
    $scope.managermaniaI.hasMegaTickets = false;
    $scope.managermaniaI.investments = [
      ['W.W. Heisenbird', 1, false, 0, 0, 0, 0],
      ['Gus Pollos', 1, false, 0, 0, 0, 0]
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
    $scope.merrymerger.angelScale = 7;
    $scope.merrymerger.baseCost = [18.5152, 1250, 93733, 9373350, 1171668750, 175750000000, 30756300000000, 6.151e15, 1.384e18];
    $scope.merrymerger.basePower = [1.35, 1.325, 1.3, 1.275, 1.25, 1.225, 1.2, 1.175, 1.15];
    $scope.merrymerger.baseProfit = [5, 20, 80, 320, 1280, 5120, 20480, 81920, 327680];
    $scope.merrymerger.baseSpeed = [2, 4, 8, 16, 32, 64, 128, 256, 512];
    $scope.merrymerger.hasMegaTickets = true;
    $scope.merrymerger.ignorePlatinumBoost = true;
    $scope.merrymerger.investments = [
      ['Brussel Sprout Kids', 1, false, 0, 0, 0, 0],
      ['Stop It', 0, false, 0, 0, 0, 0],
      ['Etch-A-Cheque', 0, false, 0, 0, 0, 0],
      ['Baking Bugs', 0, false, 0, 0, 0, 0],
      ['Turdy', 0, false, 0, 0, 0, 0],
      ['House Trap', 0, false, 0, 0, 0, 0],
      ['Play Dough', 0, false, 0, 0, 0, 0],
      ['Trigger Me Millenial', 0, false, 0, 0, 0, 0],
      ['Pet Coal', 0, false, 0, 0, 0, 0]
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
    $scope.newyou.angelScale = 45;
    $scope.newyou.baseCost = [120, 1080, 7680, 48000, 276480, 9, 48, 315, 792, 2310];
    $scope.newyou.basePower = [1.45, 1.7, 1.95, 2.9, 5.9, 1.08, 1.13, 1.17, 1.21, 1.25];
    $scope.newyou.baseProfit = [600, 3600, 19200, 96000, 460800, 3, 12, 63, 132, 330];
    $scope.newyou.baseSpeed = [30, 45, 60, 75, 90, 3, 6, 9, 12, 15];
    $scope.newyou.investments = [
      ['Shred-mill', 1, false, 0, 0, 0, 0],
      ['Pro-Team Shakes', 0, false, 0, 0, 0, 0],
      ['Tae Kwon Do-Flex', 0, false, 0, 0, 0, 0],
      ['Dum Dum-Bells', 0, false, 0, 0, 0, 0],
      ['Veggies', 0, false, 0, 0, 0, 0],
      ['Com-Fy Boys', 1, false, 0, 0, 0, 0],
      ['Soda-licious', 0, false, 0, 0, 0, 0],
      ['Vid-Yah Games', 0, false, 0, 0, 0, 0],
      ['Macro Chips', 0, false, 0, 0, 0, 0],
      ['Mystery Meat', 0, false, 0, 0, 0, 0]
    ];
    $scope.onepercent.angelScale = 150; // Currently Unknown
    $scope.onepercent.baseCost = [0.91, 20, 30, 50, 100, 200, 400, 1000, 19550717100000];
    $scope.onepercent.basePower = [1.1, 3, 2, 1.5, 1.05, 1.05, 1.05, 1.05, 6]; // 9
    $scope.onepercent.baseProfit = [4, 17, 25, 33, 2500, 5000, 8000, 10000, 1000000];
    $scope.onepercent.baseSpeed = [4, 420, 540, 840, 1200, 2400, 3600, 4500, 25200];
    $scope.onepercent.hasMegaTickets = true;
    $scope.onepercent.ignorePlatinumBoost = true;
    $scope.onepercent.investments = [
      ['Lemon Lane', 1, false, 0, 0, 0, 0],
      ['Caviar Dots', 0, false, 0, 0, 0, 0],
      ['Champagne Falls', 0, false, 0, 0, 0, 0],
      ['Dodo Legs', 0, false, 0, 0, 0, 0],
      ['Endangered Animal Petting Zoo', 0, false, 0, 0, 0, 0],
      ['Grey Poupon A Stick', 0, false, 0, 0, 0, 0],
      ['Ivory Tower of Terror', 0, false, 0, 0, 0, 0],
      ['Stock Market Crash Coaster', 0, false, 0, 0, 0, 0],
      ['Capitalism Hill', 0, false, 0, 0, 0, 0]
    ];
    $scope.profitabowl.angelScale = 300;
    $scope.profitabowl.baseCost = [5, 10, 200, 5000, 150000, 10e6, 500e6, 400e9, 400e9];
    $scope.profitabowl.basePower = [1.0006999855, 3.2, 3, 2.8, 2.6, 2.4, 2.2, 2.1, 2];
    $scope.profitabowl.baseProfit = [0.5, 50, 350, 1650, 8000, 5e6, 69e6, 8e9, 12e9];
    $scope.profitabowl.baseSpeed = [1, 10, 15, 20, 30, 35, 40, 60, 60];
    $scope.profitabowl.hasMegaTickets = false;
    $scope.profitabowl.ignorePlatinumBoost = true;
    $scope.profitabowl.investments = [
      ['Fake Fans', 1, false, 0, 0, 0, 0],
      ['Million-dollar Dip', 0, false, 0, 0, 0, 0],
      ['Backpack BBQ', 0, false, 0, 0, 0, 0],
      ['Death D-fine Dining', 0, false, 0, 0, 0, 0],
      ['Budget Lite', 0, false, 0, 0, 0, 0],
      ['Foam Stiff-arms', 0, false, 0, 0, 0, 0],
      ['Skybox Seating', 0, false, 0, 0, 0, 0],
      ['Hypno-ads', 0, false, 0, 0, 0, 0],
      ['Designer Uniforms', 0, false, 0, 0, 0, 0],
    ];
    $scope.rain.angelScale = 150;
    $scope.rain.baseCost = [7, 83, 749, 24195, 402667, 98285656, 174429216, 5758901760, 33333333333];
    $scope.rain.basePower = [1.025, 1.045, 1.085, 1.165, 1.325, 2.285, 3.565, 6.125, 12.25];
    $scope.rain.baseProfit = [0.5, 10, 90, 720, 8640, 1244150, 14929000, 179159000, 7979500000];
    $scope.rain.baseSpeed = [2, 6, 10, 21, 30, 126, 216, 375, 696];
    $scope.rain.hasMegaTickets = true;
    $scope.rain.ignorePlatinumBoost = true;
    $scope.rain.investments = [
      ['Micro-Eggs', 1, false, 0, 0, 0, 0],
      ['Sham-Rocks', 0, false, 0, 0, 0, 0],
      ['Clover Fields', 0, false, 0, 0, 0, 0],
      ['Bunny Ears', 0, false, 0, 0, 0, 0],
      ['Pot O\' Golds', 0, false, 0, 0, 0, 0],
      ['Di-egg-nostics', 0, false, 0, 0, 0, 0],
      ['Rainbow Makers', 0, false, 0, 0, 0, 0],
      ['Cruelty-Free Feet', 0, false, 0, 0, 0, 0],
      ['Yucky Charms', 0, false, 0, 0, 0, 0],
    ];
    $scope.saturday.angelScale = 45;
    $scope.saturday.baseCost = [2, 5, 10, 24, 50, 84, 126, 198, 272];
    $scope.saturday.basePower = [1.03, 1.07, 1.15, 1.35, 1.75, 2.2, 2.7, 3.2, 4];
    $scope.saturday.baseProfit = [1, 3, 6, 10, 15, 21, 28, 36, 45];
    $scope.saturday.baseSpeed = [2, 4, 6, 8, 10, 12, 14, 16, 18];
    $scope.saturday.hasMegaTickets = false;
    $scope.saturday.investments = [
      ['Ankle Biters', 1, false, 0, 0, 0, 0],
      ['Babargoyles', 0, false, 0, 0, 0, 0],
      ['Rocky and Stimpson', 0, false, 0, 0, 0, 0],
      ['My Lil Beast Machine', 0, false, 0, 0, 0, 0],
      ['School Bikes from Mars', 0, false, 0, 0, 0, 0],
      ['Captain Plan It', 0, false, 0, 0, 0, 0],
      ['Tick Juice', 0, false, 0, 0, 0, 0],
      ['Teddy Duxpin', 0, false, 0, 0, 0, 0],
      ['Power Rescue Rangers', 0, false, 0, 0, 0, 0],
    ];

    for (var p in planets) {
      loadShared(planets[p]);
    }
    for (var e in $scope.events) {
      loadShared($scope.events[e][0]);
    }
  };

  function loadShared(planet) {
    $scope[planet].angelEffectiveness = 2;
    $scope[planet].angelExclamation = false;
    $scope[planet].angelIllions = '';
    $scope[planet].bestBadge = null;
    $scope[planet].bestSuit = null;
    $scope[planet].bonusAngelEffectiveness = 0;
    $scope[planet].bonusMultiplier = 0;
    $scope[planet].filterTime = null;
    $scope[planet].flux = 0;
    $scope[planet].illions = '';
    $scope[planet].lifetimeEarnings = 0;
    $scope[planet].name = planet;
    $scope[planet].noSingles = false;
    $scope[planet].noTens = false;
    $scope[planet].noHundreds = false;
    $scope[planet].numAngels = 0;
    $scope[planet].platinum = [];
    for (var i = 0; i < $scope.platinumboosts.length; i++) {
      $scope[planet].platinum.push(i === 0 ? [true] : [false]);
    }
    $scope[planet].platinumboost = 17.77;
    $scope[planet].rec = null;
    $scope[planet].recTable = [];
    $scope[planet].recommendation = '';
    $scope[planet].sacAngels = 0;
    $scope[planet].sacIllions = '';
    $scope[planet].suits = [];
    for (var i = 0; i < $scope.suitList.length; i++) {
      $scope[planet].suits.push([false, false]);
    }
    $scope[planet].badges = [];
    for (var i = 0; i < $scope.superbadgeList.length; i++) {
        $scope[planet].badges.push([false, false]);
    }
    $scope[planet].totalMoneyPerSecond = 0;
    $scope[planet].triples = 0;
    $scope[planet].unlocks = [];
    $scope[planet].viewLifetimeEarnings = 0;
    $scope[planet].viewNumAngels = 0;
    $scope[planet].viewSacAngels = 0;
    $scope[planet].upgradeCosts = [];
    for (var i = 0; i <= $scope[planet].investments.length; i++) {
      $scope[planet].upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
      $scope[planet].unlocks.push([]);
    }
  }

  function loadUnlocks() {
    $scope.carol.unlocks[0] = [[25, [1, 2]],[75, [1, 2]],[150, [1, 2]],[300, [1, 2]],[450, [1, 2]],[600, [1, 2]],[900, [0, 3]],[1300, [0, 4]],[1800, [0, 5]],[2400, [0, 6]],[3100, [0, 7]],[4000, [0, 8]]];;
    $scope.carol.unlocks[1] = [[1, [2, 2]],[25, [3, 2]],[75, [3, 2]],[150, [3, 2]],[300, [3, 2]],[450, [3, 2]],[600, [3, 2]],[900, [3, 2]],[1300, [2, 3]],[1800, [2, 4]],[2400, [2, 5]]];
    $scope.carol.unlocks[2] = [[1, [4, 2]],[25, [5, 2]],[75, [5, 2]],[150, [5, 2]],[300, [5, 2]],[450, [5, 2]],[600, [5, 2]],[900, [5, 2]],[1300, [4, 3]]];
    $scope.carol.unlocks[3] = [[1, [6, 2]],[25, [7, 2]],[75, [7, 2]],[150, [7, 2]],[300, [7, 2]],[450, [7, 2]],[600, [7, 2]],[900, [7, 2]]];
    $scope.carol.unlocks[4] = [[1, [8, 2]],[25, [9, 2]],[75, [9, 2]],[150, [9, 2]],[300, [9, 2]],[450, [9, 2]],[600, [9, 2]],[900, [9, 2]]];
    $scope.carol.unlocks[5] = [[1, [10, 2]],[25, [11, 2]],[75, [11, 2]],[150, [11, 2]],[300, [11, 2]],[450, [11, 2]],[600, [11, 2]]];
    $scope.carol.unlocks[6] = [[1, [12, 2]],[25, [13, 2]],[75, [13, 2]],[150, [13, 2]],[300, [13, 2]],[450, [13, 2]]];
    $scope.carol.unlocks[7] = [[1, [14, 2]],[25, [15, 2]],[75, [15, 2]],[150, [15, 2]],[300, [15, 2]]];
    $scope.carol.unlocks[8] = [[1, [16, 2]],[25, [17, 2]],[75, [17, 2]],[150, [17, 2]],[150, [16, 2]]];
    $scope.carol.unlocks[9] = [];
    $scope.carol.cashUpgrades = [[500, [0, 5], false],[5e+7, [0, 555], false],[5e+10, [2, 55], false],[5e+11, [0, 555], false],[1e+12, [2, 555], false],[5e+12, [4, 55], false],[5e+13, [0, 5], false],[5e+14, [2, 5], false],[5e+16, [4, 55], false],[1e+17, [6, 5], false],[1e+18, [0, 55], false],[1e+20, [2, 55], false],[1e+22, [4, 55], false],[1e+23, [6, 55], false],[1e+23, [8, 5], false],[5e+24, [0, 55], false],[1e+26, [2, 55], false],[5e+26, [4, 5], false],[1e+28, [6, 55], false],[5e+28, [8, 55], false],[1e+29, [10, 5], false],[5e+29, [0, 5], false],[1e+31, [2, 5], false],[5e+31, [4, 55], false],[1e+32, [6, 5], false],[5e+33, [8, 55], false],[1e+34, [10, 55], false],[5e+34, [12, 5], false],[1e+35, [0, 55], false],[1e+37, [2, 55], false],[5e+38, [4, 55], false],[1e+39, [6, 55], false],[5e+40, [8, 5], false],[1e+41, [10, 55], false],[5e+42, [12, 55], false],[1e+43, [14, 5], false],[5e+46, [0, 55], false],[1e+47, [2, 55], false],[5e+47, [4, 5], false],[1e+49, [6, 55], false],[5e+49, [8, 55], false],[1e+50, [10, 5], false],[5e+50, [12, 55], false],[1e+51, [14, 55], false],[5e+51, [16, 55], false],[7.7777e+52, [18, 777], false]];
    $scope.carol.angelUpgrades = [[1e+21, [18, 3], false, false]];
    $scope.carol.managerUpgrades = [];
    $scope.cashella.unlocks[0] = [[240, [18, 6.66]],   [1100, [18, 3]],   [2200, [18, 5]]];
    $scope.cashella.unlocks[1] = [[175, [18, 6.66]],   [550, [18, 3]],    [1100, [18, 5]]];
    $scope.cashella.unlocks[2] = [[175, [18, 6.66]],   [350, [18, 3]],    [600, [18, 5]]];
    $scope.cashella.unlocks[3] = [[20, [18, 6.66]],    [90, [18, 3]],     [175, [18, 5]]];
    $scope.cashella.unlocks[4] = [[17, [18, 6.66]],    [65, [18, 3]],     [115, [18, 5]]];
    $scope.cashella.unlocks[5] = [[15, [18, 6.66]],    [70, [18, 3]],     [99, [18, 5]]];
    $scope.cashella.unlocks[6] = [[6, [18, 6.66]],     [25, [18, 3]],     [55, [18, 5]]];
    $scope.cashella.unlocks[7] = [[7, [18, 6.66]],     [27, [18, 3]],     [50, [18, 5]]];
    $scope.cashella.unlocks[8] = [[12, [18, 6.66]],    [35, [18, 3]],     [55, [18, 5]]];
    $scope.cashella.unlocks[9] = [[2, [1, 5]], [12, [3, 5]], [15, [18, 2]], [17, [5, 5]], [22, [7, 5]], [30, [9, 5]], [35, [11, 5]], [40, [13, 5]], [45, [15, 5]], [50, [17, 5]],
                                  [60, [1, 5]], [65, [3, 5]], [70, [5, 5]], [71, [7, 5]], [72, [9, 5]], [73, [11, 5]], [74, [13, 5]], [75, [15, 5]],
                                  [76, [18, 8]], [77, [18, 8]], [78, [18, 8]], [79, [18, 8]], [80, [18, 8]], [81, [18, 8]], [82, [18, 10]]
                                 ];
    $scope.cashella.cashUpgrades = [[22345, [0, 2], false], [127890, [2, 2], false], [243456, [4, 2], false], [1569012, [6, 2], false], [2464567, [8, 2], false], [17801234, [10, 2], false], [24691356, [12, 2], false], [180246912, [14, 2], false], [246913578, [16, 2], false], [2.469e9, [18, 3], false],
                                    [49.362e9, [0, 5], false], [738.243e9, [2, 5], false], [9.624e12, [4, 5], false], [102.03e12, [6, 5], false], [1.224e15, [8, 5], false], [14.284e15, [10, 5], false], [163.248e15, [12, 5], false], [1.836e18, [14, 5], false], [2.04e18, [16, 5], false], [22.446e18, [18, 7], false],
                                    [222.222e18, [0, 9], false], [4.444e21, [2, 9], false], [66.666e21, [4, 9], false], [888.888e21, [6, 9], false], [5.555e24, [8, 9], false], [13.333e24, [10, 9], false], [155.555e24, [12, 9], false], [1.777e27, [14, 9], false], [20e27, [16, 9], false], [202.02e27, [18, 11], false],
                                    [6.283e30, [0, 13], false], [100.576e30, [2, 13], false], [461.563e30, [4, 13], false], [14.135e33, [6, 13], false], [110.116e33, [8, 13], false], [540.387e33, [10, 13], false], [8.857e36, [12, 13], false], [33.054e36, [14, 13], false], [1.329e39, [16, 13], false], [11.176e39, [18, 15], false],
                                   ];
    $scope.cashella.angelUpgrades = [[1969, [18, 3], false, false], [196900, [18, 4], false, false], [19e6, [18, 4], false, false], [19e9, [18, 4], false, false], [19e12, [18, 4], false, false], [19e15, [18, 4], false, false]];
    $scope.cashella.managerUpgrades = [];
    $scope.coins.unlocks[0] = [[5, [0, 2]],   [10, [0, 4]],   [20, [0, 6]],   [25, [1, 2]],  [40, [0, 8]],   [60, [0, 10]],  [70, [1, 2]],  [80, [0, 11]],  [100, [0, 2]],  [125, [0, 2]],  [150, [0, 2]], [175, [0, 2]], [200, [0, 2]], [250, [0, 2]], [300, [0, 2]]];
    $scope.coins.unlocks[1] = [[5, [2, 3]],   [10, [2, 5]],   [20, [2, 7]],   [25, [3, 2]],  [40, [2, 9]],   [60, [2, 11]],  [70, [3, 2]],  [80, [2, 12]],  [100, [2, 3]],  [125, [2, 3]],  [150, [2, 3]], [175, [2, 3]], [200, [2, 3]], [245, [2, 3]]];
    $scope.coins.unlocks[2] = [[5, [4, 4]],   [10, [4, 6]],   [20, [4, 8]],   [25, [5, 2]],  [40, [4, 10]],  [60, [4, 12]],  [70, [5, 2]],  [80, [4, 13]],  [100, [4, 4]],  [125, [4, 4]],  [150, [4, 4]], [175, [4, 4]], [200, [4, 4]]];
    $scope.coins.unlocks[3] = [[5, [6, 5]],   [10, [6, 7]],   [20, [6, 9]],   [25, [7, 2]],  [40, [6, 11]],  [60, [6, 13]],  [70, [7, 2]],  [80, [6, 14]],  [100, [6, 5]],  [125, [6, 5]],  [150, [6, 5]], [175, [6, 5]]];
    $scope.coins.unlocks[4] = [[5, [8, 6]],   [10, [8, 8]],   [20, [8, 10]],  [25, [9, 2]],  [40, [8, 12]],  [60, [8, 14]],  [70, [9, 2]],  [80, [8, 15]],  [100, [8, 6]],  [125, [8, 6]],  [150, [8, 6]], [170, [8, 6]]];
    $scope.coins.unlocks[5] = [[5, [10, 7]],  [10, [10, 9]],  [20, [10, 11]], [25, [11, 2]], [40, [10, 13]], [60, [10, 15]], [70, [11, 2]], [80, [10, 16]], [100, [10, 7]], [125, [10, 7]], [150, [10, 7]]];
    $scope.coins.unlocks[6] = [[5, [12, 8]],  [10, [12, 10]], [20, [12, 12]], [25, [13, 2]], [40, [12, 14]], [60, [12, 16]], [70, [13, 2]], [80, [12, 17]], [100, [12, 8]], [125, [12, 8]]];
    $scope.coins.unlocks[7] = [[5, [14, 9]],  [10, [14, 11]], [20, [14, 13]], [25, [15, 2]], [40, [14, 15]], [60, [14, 17]], [70, [15, 2]], [80, [14, 18]], [100, [14, 9]], [120, [14, 9]]];
    $scope.coins.unlocks[8] = [[5, [16, 10]], [10, [16, 12]], [20, [16, 14]], [25, [17, 2]], [40, [16, 16]], [60, [16, 18]], [70, [17, 2]], [80, [16, 19]], [100, [16, 10]]];
    $scope.coins.unlocks[9] = [[6, [0, 50]], [12, [2, 50]], [18, [4, 50]], [24, [6, 50]], [30, [8, 50]], [36, [10, 50]], [42, [12, 50]], [48, [14, 50]], [54, [16, 50]], [60, [19, 2]], [75, [18, 50]], [100, [18, 50]]];
    $scope.coins.cashUpgrades = [[25700, [18, 13.37], false], [268000, [18, 13.37], false], [279e+6, [18, 13.37], false], [281e+9, [18, 13.37], false], [292e+12, [18, 13.37], false], [303e+15, [18, 13.37], false], [314e+18, [18, 13.37], false], [325e+20, [18, 13.37], false], [336e+22, [18, 13.37], false], [347e+25, [18, 13.37], false], [358e+28, [18, 13.37], false], [369e+31, [18, 13.37], false], [371e+34, [18, 13.37], false], [382e+37, [18, 13.37], false], [393e+40, [18, 13.37], false], [404e+43, [18, 13.37], false], [415e+46, [18, 13.37], false], [426e+49, [18, 13.37], false], [437e+52, [18, 13.37], false], [448e+55, [18, 13.37], false], [459e+58, [18, 13.37], false]];
    $scope.coins.angelUpgrades = [[25e+7, [20, 1], false, false], [27e+13, [20, 2], false, false], [29e+18, [20, 3], false, false], [3e+24, [20, 4], false, false], [33e+27, [20, 5], false, false]];
    $scope.coins.managerUpgrades = [];
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
    $scope.earth.cashUpgrades = [[250000, [0, 3], false], [500000, [2, 3], false], [1000000, [4, 3], false], [5000000, [6, 3], false], [10000000, [8, 3], false], [25000000, [10, 3], false], [500000000, [12, 3], false], [10000000000, [14, 3], false], [50000000000, [16, 3], false], [250000000000, [18, 3], false], [1000000000000, [20, 3], false], [20000000000000, [0, 3], false], [50000000000000, [2, 3], false], [100000000000000, [4, 3], false], [500000000000000, [6, 3], false], [1e+15, [8, 3], false], [2e+15, [10, 3], false], [5e+15, [12, 3], false], [7e+15, [14, 3], false], [1e+16, [16, 3], false], [2e+16, [18, 3], false], [5e+16, [20, 3], false], [1e+17, [22, 1], false], [2e+18, [0, 3], false], [5e+18, [2, 3], false], [7e+18, [4, 3], false], [1e+19, [6, 3], false], [2e+19, [8, 3], false], [3.5e+19, [10, 3], false], [5e+19, [12, 3], false], [7.5e+19, [14, 3], false], [1e+20, [16, 3], false], [2e+20, [18, 3], false], [5e+20, [20, 3], false], [1e+21, [22, 1], false], [2.5e+22, [0, 3], false], [5e+22, [2, 3], false], [1e+23, [4, 3], false], [2e+23, [6, 3], false], [3e+23, [8, 3], false], [4e+23, [10, 3], false], [5e+23, [12, 3], false], [6e+23, [14, 3], false], [7e+23, [16, 3], false], [8e+23, [18, 3], false], [9e+23, [20, 3], false], [1e+25, [22, 2], false], [1e+27, [0, 7], false], [5e+27, [2, 7], false], [2.5e+28, [4, 7], false], [1e+29, [6, 7], false], [2.5e+29, [8, 7], false], [5e+29, [10, 7], false], [1e+30, [12, 7], false], [5e+30, [14, 7], false], [2.5e+31, [16, 7], false], [5e+31, [18, 7], false], [1e+42, [20, 7], false], [5e+42, [2, 3], false], [2.5e+43, [4, 3], false], [5e+43, [6, 3], false], [1e+44, [8, 3], false], [2.5e+44, [10, 3], false], [5e+44, [12, 3], false], [1e+45, [14, 3], false], [5e+45, [16, 3], false], [1e+46, [18, 3], false], [2.5e+46, [0, 3], false], [1e+47, [20, 3], false], [2.5e+47, [2, 3], false], [5e+47, [4, 3], false], [7.5e+47, [6, 3], false], [1e+48, [8, 3], false], [5e+48, [10, 3], false], [1.5e+49, [12, 3], false], [5e+49, [14, 3], false], [1e+50, [16, 3], false], [2.5e+50, [18, 3], false], [5e+50, [0, 3], false], [1e+51, [20, 7], false], [1e+54, [20, 5], false], [1e+60, [20, 7], false], [1e+61, [2, 3], false], [1e+62, [4, 3], false], [1e+66, [20, 9], false], [1e+67, [6, 3], false], [1e+68, [8, 3], false], [1e+72, [20, 11], false], [1e+73, [10, 3], false], [1e+74, [12, 3], false], [1e+75, [20, 13], false], [1e+76, [14, 3], false], [1e+77, [16, 3], false], [1e+78, [20, 15], false], [1e+79, [18, 3], false], [1e+80, [0, 3], false], [1e+84, [20, 3], false], [3e+87, [20, 3.1415926], false], [1e+90, [2, 3], false], [5e+90, [4, 3], false], [2.5e+91, [6, 3], false], [5e+91, [8, 3], false], [1e+92, [10, 3], false], [2.5e+92, [12, 3], false], [5e+92, [14, 3], false], [1e+93, [16, 3], false], [5e+93, [18, 3], false], [1e+94, [0, 3], false], [5e+95, [20, 2], false], [2e+96, [2, 2], false], [1.1e+97, [4, 2], false], [6.6e+97, [6, 2], false], [2.3e+98, [8, 2], false], [4e+98, [10, 2], false], [7e+98, [12, 2], false], [4e+99, [14, 2], false], [1e+100, [20, 3], false], [2e+100, [20, 6], false], [2.9e+100, [16, 2], false], [1.45e+101, [18, 2], false], [3e+101, [0, 2], false], [5e+101, [20, 2], false], [1e+102, [20, 5], false], [5e+102, [4, 3], false], [1.5e+104, [4, 3], false], [4e+104, [4, 3], false], [9e+104, [6, 3], false], [6e+105, [6, 3], false], [1.5e+106, [6, 3], false], [6e+106, [8, 2], false], [1.85e+107, [8, 3], false], [5e+107, [8, 3], false], [6e+107, [20, 3], false], [7.5e+107, [10, 2], false], [5e+108, [10, 3], false], [4.5e+109, [10, 3], false], [1.25e+110, [12, 3], false], [3e+110, [12, 3], false], [9e+110, [12, 3], false], [1e+111, [20, 3], false], [5e+111, [14, 2], false], [7e+112, [14, 3], false], [2.5e+113, [14, 3], false], [5e+113, [16, 3], false], [9e+113, [16, 3], false], [3e+114, [16, 3], false], [1.5e+115, [18, 3], false], [7.5e+115, [18, 3], false], [4e+116, [18, 3], false], [4.5e+116, [20, 3], false], [5e+116, [0, 3], false], [7.5e+116, [0, 3], false], [1e+117, [0, 3], false], [2e+117, [2, 3], false], [2e+118, [2, 3], false], [1.5e+119, [2, 3], false], [3.5e+119, [20, 5], false], [5e+119, [20, 3], false], [7e+119, [2, 3], false], [9.5e+119, [4, 3], false], [4e+120, [6, 3], false], [9e+120, [8, 3], false], [2.4e+121, [10, 3], false], [1.11e+122, [12, 3], false], [2.22e+122, [14, 3], false], [3.33e+122, [16, 3], false], [4.44e+122, [18, 3], false], [5.55e+122, [0, 3], false], [6.66e+122, [20, 6.66], false], [1e+123, [20, 3], false], [3e+123, [2, 3], false], [6e+123, [4, 3], false], [1.2e+124, [6, 3], false], [2.4e+124, [8, 3], false], [4.8e+124, [10, 3], false], [9.6e+124, [12, 3], false], [1.92e+125, [14, 3], false], [3.84e+125, [16, 3], false], [7.68e+125, [18, 3], false], [1e+126, [0, 3], false], [1e+127, [20, 5], false], [2e+129, [4, 3], false], [5e+129, [16, 3], false], [1.3e+130, [6, 3], false], [2.9e+130, [18, 3], false], [7.1e+130, [0, 3], false], [1.77e+131, [12, 3], false], [2.5e+131, [2, 3], false], [3.1e+131, [14, 3], false], [5.55e+131, [8, 3], false], [7.36e+131, [10, 3], false], [9e+131, [20, 2], false], [5e+132, [2, 2], false], [9.5e+133, [4, 2], false], [2.13e+134, [6, 2], false], [4e+134, [8, 2], false], [9.85e+134, [10, 2], false], [8e+135, [12, 2], false], [2.9e+136, [14, 2], false], [2.22e+137, [16, 2], false], [5e+137, [18, 2], false], [9e+137, [0, 2], false], [5e+138, [20, 3], false], [1.36e+140, [2, 3], false], [7e+140, [4, 3], false], [9.25e+140, [6, 3], false], [3e+141, [20, 3], false], [2.1e+142, [8, 3], false], [5.5e+142, [10, 3], false], [1.11e+143, [12, 3], false], [2.23e+143, [14, 3], false], [3.93e+143, [16, 3], false], [6e+143, [18, 3], false], [7.99e+143, [0, 3], false], [2e+144, [20, 3], false], [3e+144, [2, 3], false], [6e+144, [4, 3], false], [9e+144, [6, 3], false], [2.1e+145, [8, 3], false], [4.4e+145, [10, 3], false], [8.9e+145, [12, 3], false], [1.29e+146, [14, 3], false], [1.8e+146, [16, 3], false], [2.1e+146, [18, 3], false], [3e+146, [0, 3], false], [4.5e+146, [20, 2.71828], false], [5e+147, [10, 5], false], [3e+148, [2, 5], false], [1.8e+149, [4, 5], false], [9e+149, [16, 5], false], [5e+150, [6, 5], false], [2e+151, [18, 5], false], [8e+151, [8, 5], false], [2.4e+152, [0, 5], false], [7.2e+152, [12, 5], false], [2.1e+154, [14, 5], false], [5e+155, [20, 4.44444444444], false], [7.77e+155, [10, 2], false], [8.88e+155, [2, 2], false], [9.99e+155, [4, 2], false], [2e+156, [16, 2], false], [4e+156, [6, 2], false], [8e+156, [18, 2], false], [1.6e+157, [8, 2], false], [3.2e+157, [0, 2], false], [6.4e+157, [12, 2], false], [1.28e+158, [14, 2], false], [5.14e+158, [20, 2.99792458], false], [1e+159, [10, 3], false], [1e+160, [2, 3], false], [2.5e+160, [4, 3], false], [5e+160, [16, 3], false], [7.5e+160, [6, 3], false], [1e+161, [18, 3], false], [1.5e+161, [8, 3], false], [2e+161, [0, 3], false], [3e+161, [12, 3], false], [4e+161, [14, 3], false], [9e+161, [20, 2.35711], false], [1e+162, [14, 24], false], [2.5e+164, [20, 2], false], [5e+164, [2, 22], false], [7.5e+164, [20, 2], false], [1e+165, [4, 20], false], [2.5e+167, [20, 2], false], [5e+167, [16, 18], false], [7.5e+167, [20, 2], false], [1e+168, [10, 16], false], [2.5e+170, [20, 2], false], [5e+170, [12, 14], false], [7.5e+170, [20, 2], false], [1e+171, [18, 12], false], [2.5e+173, [20, 2], false], [5e+173, [0, 10], false], [7.5e+173, [20, 2], false], [1e+174, [6, 8], false], [2.5e+176, [20, 2], false], [5e+176, [8, 4], false], [1e+177, [20, 9], false], [5e+183, [20, 9.87654321], false], [5e+189, [20, 5], false], [2.7e+193, [20, 3], false], [1.3e+196, [20, 4], false], [2e+198, [20, 5], false], [1e+201, [0, 3], false], [1.4e+202, [2, 3], false], [9.6e+202, [4, 3], false], [1.98e+203, [6, 3], false], [3.22e+203, [8, 3], false], [6.79e+203, [10, 3], false], [8.88e+203, [12, 3], false], [1.9e+205, [14, 3], false], [8.1e+205, [16, 3], false], [1.99e+206, [18, 3], false], [2.33e+206, [0, 3], false], [4.21e+206, [2, 3], false], [6.07e+206, [4, 3], false], [7.77e+206, [6, 3], false], [9.1e+206, [8, 3], false], [1e+207, [22, 2.1], false], [2e+207, [10, 3], false], [9e+207, [12, 3], false], [4.5e+208, [14, 3], false], [2e+209, [16, 3], false], [3.28e+209, [18, 3], false], [6e+209, [20, 5], false], [1e+213, [22, 1.5], false], [1e+214, [0, 11], false], [1e+214, [2, 11], false], [1e+214, [4, 11], false], [1e+214, [6, 11], false], [1e+214, [8, 11], false], [1e+214, [10, 11], false], [1e+214, [12, 11], false], [1e+214, [14, 11], false], [1e+214, [16, 11], false], [1e+214, [18, 11], false], [1.5e+215, [0, 3], false], [1.66e+215, [2, 3], false], [1.93e+215, [4, 3], false], [4.1e+215, [6, 3], false], [6.78e+215, [8, 3], false], [9e+215, [10, 3], false], [1e+216, [22, 1], false], [1.2e+217, [12, 3], false], [6.7e+217, [14, 3], false], [1.23e+218, [16, 3], false], [3.21e+218, [18, 3], false], [5.55e+218, [20, 5], false], [8e+218, [0, 3], false], [8e+218, [2, 3], false], [8e+218, [4, 3], false], [9e+218, [6, 3], false], [1e+219, [22, 2], false], [3e+219, [8, 3], false], [4e+219, [10, 3], false], [5e+219, [12, 3], false], [6e+219, [14, 3], false], [3e+221, [16, 3], false], [4.21e+221, [18, 3], false], [6e+221, [0, 3], false], [7.89e+221, [2, 3], false], [8.45e+221, [4, 3], false], [1e+222, [22, 0.5], false], [2e+222, [6, 3], false], [5e+222, [8, 3], false], [1.4e+223, [10, 3], false], [5.4e+223, [12, 3], false], [1.08e+224, [14, 3], false], [2.19e+224, [16, 3], false], [4.68e+224, [18, 3], false], [1e+225, [22, 2], false], [1e+228, [22, 1.2], false], [1e+228, [0, 7], false], [1e+228, [2, 7], false], [1e+228, [4, 7], false], [1e+228, [6, 7], false], [1e+228, [8, 7], false], [1e+228, [10, 7], false], [1e+228, [12, 7], false], [1e+228, [14, 7], false], [1e+228, [16, 7], false], [1e+228, [18, 7], false], [1e+230, [20, 5], false], [1e+231, [22, 1.3], false], [3e+231, [0, 3], false], [8e+231, [2, 3], false], [1e+232, [22, 0.7], false], [6.9e+232, [4, 3], false], [1e+233, [20, 2], false], [1.88e+233, [6, 3], false], [2.39e+233, [8, 3], false], [4.11e+233, [10, 3], false], [7e+233, [12, 3], false], [9.12e+233, [14, 3], false], [1.2e+235, [16, 3], false], [2.4e+235, [18, 3], false], [6.3e+235, [0, 3], false], [1.99e+236, [2, 3], false], [3.98e+236, [4, 3], false], [5.66e+236, [6, 3], false], [7e+236, [8, 3], false], [8e+236, [10, 3], false], [9e+236, [12, 3], false], [1e+237, [22, 2], false], [1e+238, [20, 4], false], [1.2e+238, [14, 3], false], [2.5e+238, [16, 3], false], [5e+238, [18, 3], false], [1e+240, [22, 0.3], false], [1e+240, [0, 2], false], [5e+240, [2, 2], false], [9e+240, [4, 2], false], [1e+241, [20, 3], false], [2.1e+241, [6, 2], false], [4.5e+241, [8, 2], false], [8.9e+241, [10, 2], false], [1.53e+242, [12, 2], false], [2.99e+242, [14, 2], false], [5.77e+242, [16, 2], false], [8.13e+242, [18, 2], false], [1e+243, [22, 1], false], [2e+243, [0, 2], false], [1e+244, [20, 6], false], [2.2e+244, [2, 2], false], [4.4e+244, [4, 2], false], [6.6e+244, [6, 2], false], [8.8e+244, [8, 2], false], [1.11e+245, [10, 2], false], [2.22e+245, [12, 2], false], [3.33e+245, [14, 2], false], [4.44e+245, [16, 2], false], [5.55e+245, [18, 2], false], [1e+246, [22, 1.5], false], [1e+247, [20, 4], false], [1e+249, [22, 0.9], false], [1e+250, [20, 7], false], [1e+252, [22, 0.6], false], [1e+252, [20, 5], false], [1e+253, [20, 2], false], [1e+253, [0, 3], false], [1e+253, [2, 3], false], [1e+253, [4, 3], false], [1e+253, [6, 3], false], [1e+253, [8, 3], false], [1e+253, [10, 3], false], [1e+253, [12, 3], false], [1e+253, [14, 3], false], [1e+253, [16, 3], false], [1e+253, [18, 3], false], [5e+253, [0, 9], false], [7.5e+253, [2, 9], false], [1.25e+254, [4, 9], false], [6.25e+254, [6, 9], false], [1e+255, [22, 1], false], [3e+255, [8, 9], false], [1e+256, [20, 6], false], [1.5e+256, [10, 9], false], [7.5e+256, [12, 9], false], [3.75e+257, [14, 9], false], [1e+258, [16, 9], false], [8e+257, [18, 9], false], [1e+258, [22, 1.1], false], [2.5e+258, [20, 2], false], [6.4e+258, [0, 3], false], [1e+259, [20, 5], false], [1.22e+259, [2, 3], false], [2.33e+260, [4, 3], false], [3.99e+260, [6, 3], false], [7.66e+260, [8, 3], false], [1e+261, [22, 0.9], false], [1e+261, [10, 3], false], [1e+262, [20, 5], false], [1.9e+262, [12, 3], false], [9.8e+262, [14, 3], false], [2.6e+263, [16, 3], false], [5.44e+263, [18, 3], false], [7e+263, [0, 3], false], [1e+264, [22, 2], false], [1e+264, [2, 3], false], [1e+265, [20, 3], false], [4.5e+265, [4, 3], false], [6.9e+265, [6, 3], false], [8.9e+265, [8, 3], false], [1.89e+266, [10, 3], false], [2.89e+266, [12, 3], false], [4.48e+266, [14, 3], false], [9e+266, [16, 3], false], [1e+267, [22, 3], false], [5e+267, [18, 3], false], [1e+268, [20, 7], false], [1e+270, [22, 4], false], [1e+270, [20, 5], false], [1e+273, [22, 1], false], [1e+273, [0, 7], false], [2e+273, [2, 7], false], [3e+273, [4, 7], false], [6e+273, [6, 7], false], [2.5e+274, [8, 7], false], [2e+275, [10, 7], false], [6e+275, [12, 7], false], [9.99e+275, [14, 7], false], [1e+276, [22, 5], false], [1e+277, [20, 4], false], [1.5e+277, [16, 7], false], [3e+277, [18, 7], false], [1e+279, [22, 2.1], false], [1e+280, [20, 5], false], [1e+282, [22, 4], false], [1e+283, [20, 7.77], false], [1e+285, [22, 5], false], [1e+285, [2, 13], false], [1e+285, [4, 13], false], [1e+285, [6, 13], false], [1e+285, [8, 13], false], [1e+285, [10, 13], false], [1e+285, [12, 13], false], [1e+285, [14, 13], false], [1e+285, [16, 13], false], [1e+285, [18, 13], false], [1e+286, [20, 7.77], false], [1e+288, [20, 77.77], false]];
    $scope.earth.angelUpgrades = [[10000, [20, 3], false, false],[100000, [22, 2], false, false],[100000000, [22, 2], false, false],[1000000000, [20, 5], false, false],[100000000000, [20, 9], false, false],[25000000, [31, 10], false, false],[25000000, [32, 10], false, false],[25000000, [33, 10], false, false],[25000000, [34, 10], false, false],[250000000, [31, 50], false, false],[250000000, [32, 50], false, false],[250000000, [33, 50], false, false],[250000000, [34, 50], false, false],[25000000000, [31, 50], false, false],[25000000000, [32, 50], false, false],[25000000000, [33, 50], false, false],[25000000000, [34, 50], false, false],[1000000000000, [20, 11], false, false],[250000000000000, [2, 3], false, false],[750000000000000, [4, 3], false, false],[2e+15, [6, 3], false, false],[5e+15, [8, 3], false, false],[1e+16, [10, 3], false, false],[2.5e+16, [12, 3], false, false],[7.5e+16, [14, 3], false, false],[2e+17, [16, 3], false, false],[4e+17, [18, 3], false, false],[1e+18, [0, 3], false, false],[1e+21, [20, 15], false, false],[1e+22, [31, 75], false, false],[1e+22, [32, 75], false, false],[1e+22, [33, 75], false, false],[1e+22, [34, 75], false, false],[1e+22, [35, 75], false, false],[1e+23, [31, 75], false, false],[1e+23, [32, 75], false, false],[1e+23, [33, 75], false, false],[1e+23, [34, 75], false, false],[1e+23, [35, 75], false, false],[1e+31, [31, 100], false, false],[1e+32, [32, 100], false, false],[1e+33, [22, 10], false, false],[1e+34, [20, 15], false, false],[1e+36, [20, 3], false, false],[1e+40, [20, 5], false, false],[1e+42, [20, 5], false, false],[2e+42, [31, 50], false, false],[1e+47, [4, 4], false, false],[2e+47, [6, 6], false, false],[7e+47, [8, 3], false, false],[2e+48, [10, 3], false, false],[2.5e+49, [12, 3], false, false],[5e+50, [14, 3], false, false],[2e+52, [16, 3], false, false],[8e+52, [18, 3], false, false],[1.5e+53, [0, 3], false, false],[3e+53, [2, 3], false, false],[5e+53, [22, 10], false, false],[1e+54, [2, 3], false, false],[4e+54, [4, 3], false, false],[9e+54, [6, 3], false, false],[2.5e+55, [8, 3], false, false],[7.5e+55, [10, 3], false, false],[1.77e+56, [12, 3], false, false],[3e+56, [14, 3], false, false],[5e+56, [16, 3], false, false],[8e+56, [18, 3], false, false],[1e+57, [0, 3], false, false],[3e+61, [31, 30], false, false],[3e+61, [32, 30], false, false],[3e+61, [33, 30], false, false],[3e+61, [34, 30], false, false],[3e+61, [36, 30], false, false],[1e+62, [20, 5], false, false],[2e+63, [2, 3], false, false],[2e+63, [4, 3], false, false],[2e+63, [6, 3], false, false],[2e+63, [8, 3], false, false],[2e+63, [10, 3], false, false],[2e+63, [12, 3], false, false],[2e+63, [14, 3], false, false],[2e+63, [16, 3], false, false],[2e+63, [18, 3], false, false],[2e+63, [0, 3], false, false],[1e+65, [20, 7], false, false],[1e+66, [2, 3], false, false],[4e+66, [4, 3], false, false],[1.3e+67, [6, 3], false, false],[2e+67, [8, 3], false, false],[2.9e+67, [10, 3], false, false],[3.8e+67, [12, 3], false, false],[5.2e+67, [14, 3], false, false],[6.7e+67, [16, 3], false, false],[7.2e+67, [18, 3], false, false],[9.6e+67, [0, 3], false, false],[1.25e+68, [31, 50], false, false],[7.77e+68, [20, 7.777777], false, false],[5e+69, [31, 10], false, false],[5e+69, [32, 10], false, false],[5e+69, [33, 10], false, false],[5e+69, [34, 10], false, false],[5e+69, [35, 10], false, false],[5e+69, [36, 10], false, false],[5e+69, [37, 10], false, false],[5e+69, [38, 10], false, false],[5e+69, [39, 10], false, false],[5e+69, [30, 10], false, false],[1e+72, [2, 3], false, false],[5e+72, [4, 3], false, false],[2.2e+73, [6, 3], false, false],[4.4e+73, [8, 3], false, false],[1.11e+74, [10, 3], false, false],[2.22e+74, [12, 3], false, false],[3.33e+74, [14, 3], false, false],[4.44e+74, [16, 3], false, false],[5.55e+74, [18, 3], false, false],[6.66e+74, [0, 3], false, false],[2.5e+76, [32, 25], false, false],[2.5e+76, [31, 25], false, false],[2.5e+76, [33, 25], false, false],[2.5e+76, [34, 25], false, false],[2.5e+76, [35, 25], false, false],[2.5e+76, [36, 25], false, false],[2.5e+76, [37, 25], false, false],[2.5e+76, [38, 25], false, false],[2.5e+76, [39, 25], false, false],[2.5e+76, [30, 25], false, false],[1.1e+79, [2, 3], false, false],[2.7e+79, [4, 3], false, false],[4.3e+79, [6, 3], false, false],[8.7e+79, [8, 3], false, false],[1.9e+80, [10, 3], false, false],[3.21e+80, [12, 3], false, false],[4.95e+80, [14, 3], false, false],[6e+80, [16, 3], false, false],[7.25e+80, [18, 3], false, false],[8.98e+80, [0, 3], false, false],[3e+84, [20, 13.11], false, false],[1.3e+88, [20, 5], false, false],[3e+90, [20, 3], false, false],[1.3e+94, [20, 4], false, false],[2.4e+97, [20, 5], false, false],[1e+102, [31, 25], false, false],[1e+102, [32, 25], false, false],[1e+102, [33, 25], false, false],[1e+102, [34, 25], false, false],[1e+102, [35, 25], false, false],[1e+102, [36, 25], false, false],[1e+102, [37, 25], false, false],[1e+102, [38, 25], false, false],[1e+102, [39, 25], false, false],[1e+102, [30, 25], false, false],[3.33e+110, [20, 3], false, false],[1e+114, [2, 3], false, false],[2e+115, [4, 3], false, false],[5e+115, [6, 3], false, false],[1e+116, [8, 3], false, false],[2e+116, [10, 3], false, false],[3e+116, [12, 3], false, false],[4e+116, [14, 3], false, false],[5e+116, [16, 3], false, false],[7.5e+116, [18, 3], false, false],[2e+117, [0, 3], false, false],[1e+129, [31, 25], false, false],[1e+129, [32, 25], false, false],[1e+129, [33, 25], false, false],[1e+129, [34, 25], false, false],[1e+129, [35, 25], false, false],[1e+129, [36, 25], false, false],[1e+129, [37, 25], false, false],[1e+129, [38, 25], false, false],[1e+129, [39, 25], false, false],[1e+129, [30, 25], false, false], [1e+138, [2, 3], false, false], [1e+138, [4, 3], false, false], [1e+138, [6, 3], false, false], [1e+138, [8, 3], false, false], [1e+138, [10, 3], false, false], [1e+138, [12, 3], false, false], [1e+138, [14, 3], false, false], [1e+138, [16, 3], false, false], [1e+138, [18, 3], false, false], [1e+138, [0, 3], false, false], [2e+138, [20, 19], false, false], [2e+138, [32, 25], false, false], [2e+138, [35, 25], false, false], [2e+138, [36, 25], false, false], [2e+138, [38, 25], false, false], [2e+138, [33, 25], false, false], [2e+138, [30, 25], false, false], [3e+138, [31, 25], false, false], [3e+138, [34, 25], false, false], [3e+138, [37, 25], false, false], [4e+138, [39, 25], false, false]];
    $scope.earth.managerUpgrades = [[[10e+9, false],[9e+126, false]],[[1e+9, false],[10e+102, false]],[[100e+6, false],[3e+120, false]],[[10e+6, false],[100e+111, false]],[[1e+6, false],[3e+117, false]],[[100000, false],[750e+117, false]],[[9999, false],[75e+105, false]],[[1000, false],[250e+108, false]],[[100, false],[50e+114, false]],[[10, false],[33e+123, false]]];
    $scope.easystreet.unlocks[0] = [[5, [0, 10]], [25, [0, 13]], [75, [0, 17]], [125, [0, 23]], [225, [0, 29]], [350, [0, 31]], [450, [18, 2]], [900, [0, 99]]];
    $scope.easystreet.unlocks[1] = [[10, [2, 11]], [100, [2, 11]], [250, [2, 10]], [400, [2, 9]], [500, [18, 2]], [975, [2, 7]]];
    $scope.easystreet.unlocks[2] = [[15, [4, 12]], [100, [4, 30]], [200, [4, 60]], [300, [4, 60]], [500, [18, 2]], [1080, [4, 99]]];
    $scope.easystreet.unlocks[3] = [[20, [6, 13]], [80, [6, 13]], [160, [6, 26]], [320, [6, 26]], [500, [18, 2]], [750, [18, 2]], [950, [6, 7]]];
    $scope.easystreet.unlocks[4] = [[25, [8, 14]], [150, [8, 14]], [300, [8, 42]], [400, [18, 2]], [750, [18, 2]], [975, [8, 3]]];
    $scope.easystreet.unlocks[5] = [[20, [10, 15]], [120, [10, 10]], [280, [10, 21]], [725, [18, 2]], [850, [10, 33]]];
    $scope.easystreet.unlocks[6] = [[15, [12, 16]], [125, [12, 4]], [250, [12, 4]], [550, [18, 2]], [1025, [12, 7]]];
    $scope.easystreet.unlocks[7] = [[10, [14, 17]], [200, [14, 3]], [500, [18, 2]], [750, [14, 7]]];
    $scope.easystreet.unlocks[8] = [[5, [16, 18]], [425, [18, 2]], [666, [17, 42]], [950, [16, 7]]];
    $scope.easystreet.unlocks[9] = [[300, [1, 2]], [350, [3, 10]], [375, [5, 14]], [450, [15, 36]], [475, [13, 30]], [575, [7, 18]], [750, [9, 22]], [800, [11, 26]], [900, [19, 2]], [925, [19, 2]], [975, [18, 3]], [1000, [18, 3]]];
    $scope.easystreet.cashUpgrades = [[5e6, [0, 111], false], [170e6, [2, 111], false], [2e9, [4, 111], false], [40e9, [6, 111], false], [300e9, [8, 111], false], [2.2e12, [10, 111], false], [120e12, [12, 111], false], [4e15, [14, 111], false], [500e15, [16, 111], false], [250e21, [4, 111], false], [470e21, [6, 111], false], [1.5e24, [8, 111], false], [2.5e24, [10, 111], false], [12.5e24, [12, 111], false], [60e24, [14, 28], false], [100e24, [16, 2], false], [2e27, [2, 111], false], [5e27, [0, 3], false], [6e30, [16, 13], false], [60e30, [14, 3], false], [4e33, [12, 7], false], [8e36, [0, 20], false], [700e36, [6, 2], false], [2e39, [8, 77], false], [35e39, [2, 999], false], [40e42, [14, 10], false], [90e42, [12, 33], false], [230e42, [10, 999], false], [1.5e45, [8, 7], false], [6e45, [4, 999], false], [30e45, [6, 7], false], [140e45, [2, 99], false], [1.6e48, [0, 99], false], [50e48, [12, 99], false], [50e48, [14, 88], false], [50e48, [16, 2], false], [600e48, [6, 7], false], [600e48, [8, 2], false], [600e48, [10, 4], false], [40e51, [0, 22], false], [40e51, [2, 19], false], [40e51, [4, 7], false]];
    $scope.easystreet.angelUpgrades = [[100000, [18, 3], false, false], [200000, [0, 999], false, false], [50e6, [2, 999], false, false], [2e9, [18, 6], false, false], [6e9, [4, 7], false, false], [2e12, [18, 6], false, false], [6e12, [6, 666], false, false], [5e15, [18, 6], false, false], [15e15, [8, 99], false, false], [5e18, [18, 6], false, false], [10e18, [16, 999], false, false], [8e21, [18, 6], false, false]];
    $scope.easystreet.managerUpgrades = [];
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
    $scope.evil.cashUpgrades = [[1000, [0, 5], false], [10000, [2, 5], false], [100000, [4, 5], false], [1000000, [6, 5], false], [10000000, [8, 5], false], [100000000, [10, 5], false], [10e+8, [12, 5], false], [10e+9, [14, 5], false], [10e+10, [16, 5], false], [10e+11, [18, 5], false], [10e+12, [20, 5], false], [10e+13, [0, 6], false], [10e+14, [2, 6], false], [10e+15, [4, 6], false], [10e+16, [6, 6], false], [10e+17, [8, 6], false], [10e+18, [10, 6], false], [10e+19, [12, 6], false], [10e+20, [14, 6], false], [10e+21, [16, 6], false], [10e+22, [18, 6], false], [1e+24, [20, 6], false], [10e+24, [0, 7], false], [100e+24, [2, 7], false], [1e+27, [4, 7], false], [10e+27, [6, 7], false], [100e+27, [8, 7], false], [1e+30, [10, 7], false], [10e+30, [12, 7], false], [100e+30, [14, 7], false], [1e+33, [16, 7], false], [10e+33, [18, 7], false], [100e+33, [20, 7], false], [1e+36, [0, 8], false], [10e+36, [2, 8], false], [100e+36, [4, 8], false], [1e+39, [6, 8], false], [10e+39, [8, 8], false], [100e+39, [10, 8], false], [1e+42, [12, 8], false], [10e+42, [14, 8], false], [100e+42, [16, 8], false], [1e+45, [18, 8], false], [10e+45, [20, 8], false], [100e+45, [0, 9], false], [1e+48, [2, 9], false], [10e+48, [4, 9], false], [100e+48, [6, 9], false], [1e+51, [8, 9], false], [10e+51, [10, 9], false], [100e+51, [12, 9], false], [1e+54, [14, 9], false], [10e+54, [16, 9], false], [100e+54, [18, 9], false], [1e+57, [20, 9], false]];
    $scope.evil.angelUpgrades = [[10, [22, 1], false, false], [10000, [22, 1], false, false], [1000000, [22, 1], false, false], [10000000, [22, 1], false, false], [100000000, [22, 1], false, false], [10e+9, [22, 1], false, false], [10e+11, [22, 1], false, false], [10e+13, [22, 2], false, false], [10e+15, [22, 2], false, false], [10e+17, [22, 2], false, false], [10e+19, [22, 2], false, false], [10e+21, [22, 2], false, false]];
    $scope.evil.managerUpgrades = [];
    $scope.excellent.unlocks[0] = [[5, [0, 2]],   [10, [0, 4]],   [20, [0, 6]],   [25, [1, 2]],  [40, [0, 8]],   [60, [0, 10]],  [70, [1, 2]],  [80, [0, 11]],  [100, [0, 2]],  [125, [0, 2]],  [150, [0, 2]], [175, [0, 2]], [200, [0, 2]], [250, [0, 2]], [300, [0, 2]]];
    $scope.excellent.unlocks[1] = [[5, [2, 3]],   [10, [2, 5]],   [20, [2, 7]],   [25, [3, 2]],  [40, [2, 9]],   [60, [2, 11]],  [70, [3, 2]],  [80, [2, 12]],  [100, [2, 3]],  [125, [2, 3]],  [150, [2, 3]], [175, [2, 3]], [200, [2, 3]], [245, [2, 3]]];
    $scope.excellent.unlocks[2] = [[5, [4, 4]],   [10, [4, 6]],   [20, [4, 8]],   [25, [5, 2]],  [40, [4, 10]],  [60, [4, 12]],  [70, [5, 2]],  [80, [4, 13]],  [100, [4, 4]],  [125, [4, 4]],  [150, [4, 4]], [175, [4, 4]], [200, [4, 4]]];
    $scope.excellent.unlocks[3] = [[5, [6, 5]],   [10, [6, 7]],   [20, [6, 9]],   [25, [7, 2]],  [40, [6, 11]],  [60, [6, 13]],  [70, [7, 2]],  [80, [6, 14]],  [100, [6, 5]],  [125, [6, 5]],  [150, [6, 5]], [175, [6, 5]]];
    $scope.excellent.unlocks[4] = [[5, [8, 6]],   [10, [8, 8]],   [20, [8, 10]],  [25, [9, 2]],  [40, [8, 12]],  [60, [8, 14]],  [70, [9, 2]],  [80, [8, 15]],  [100, [8, 6]],  [125, [8, 6]],  [150, [8, 6]], [160, [8, 6]]];
    $scope.excellent.unlocks[5] = [[5, [10, 7]],  [10, [10, 9]],  [20, [10, 11]], [25, [11, 2]], [40, [10, 13]], [60, [10, 15]], [70, [11, 2]], [80, [10, 16]], [100, [10, 7]], [125, [10, 7]], [150, [10, 7]]];
    $scope.excellent.unlocks[6] = [[5, [12, 8]],  [10, [12, 10]], [20, [12, 12]], [25, [13, 2]], [40, [12, 14]], [60, [12, 16]], [70, [13, 2]], [80, [12, 17]], [100, [12, 8]], [125, [12, 8]]];
    $scope.excellent.unlocks[7] = [[5, [14, 9]],  [10, [14, 11]], [20, [14, 13]], [25, [15, 2]], [40, [14, 15]], [60, [14, 17]], [70, [15, 2]], [80, [14, 18]], [100, [14, 9]], [120, [14, 9]]];
    $scope.excellent.unlocks[8] = [[5, [16, 10]], [10, [16, 12]], [20, [16, 14]], [25, [17, 2]], [40, [16, 16]], [60, [16, 18]], [70, [17, 2]], [80, [16, 19]], [100, [16, 10]]];
    $scope.excellent.unlocks[9] = [[6, [0, 50]], [12, [2, 50]], [18, [4, 50]], [24, [6, 50]], [30, [8, 50]], [36, [10, 50]], [42, [12, 50]], [48, [14, 50]], [54, [16, 50]], [60, [19, 2]], [75, [18, 50]], [100, [18, 50]]];
    $scope.excellent.cashUpgrades = [[25000, [18, 10.21], false], [270000, [18, 20.15], false], [280000000, [18, 10.26], false], [280000000000, [18, 19.85], false], [290000000000000, [18, 10.21], false],
                                     [300000000000000000, [18, 20.15], false], [3.15E+20, [18, 10.26], false], [3.25E+22, [18, 19.85], false], [3.4E+24, [18, 10.21], false], [3.5E+27, [18, 20.15], false],
                                     [3.6E+30, [18, 10.26], false], [3.7E+33, [18, 19.85], false], [3.7E+36, [18, 10.21], false], [3.8E+39, [18, 20.15], false], [3.9E+42, [18, 10.26], false],
                                     [4.05E+45, [18, 19.85], false], [4.15E+48, [18, 10.21], false], [4.25E+51, [18, 20.15], false], [4.35E+54, [18, 10.26], false], [4.5E+57, [18, 19.85], false],
                                     [4.6E+60, [18, 10.21], false]
                              ];
    $scope.excellent.angelUpgrades = [[250000000, [20, 1], false, false], [270000000000000, [20, 2], false, false], [29000000000000000000, [20, 3], false, false], [3E+24, [20, 4], false, false], [3.3E+28, [20, 5], false, false]
                               ];
    $scope.excellent.managerUpgrades = [];
    $scope.friday.unlocks[0] = [[5, [0, 3]], [10, [0, 5]], [20, [0, 7]], [25, [1, 2]], [40, [0, 9]], [60, [0, 11]], [70, [1, 2]], [80, [0, 12]], [100, [0, 3]], [125, [0, 3]], [150, [0, 3]], [175, [0, 3]], [200, [0, 3]], [250, [0, 3]], [300, [0, 3]]];
    $scope.friday.unlocks[1] = [[5, [2, 4]], [10, [2, 6]], [20, [2, 8]], [25, [3, 2]], [40, [2, 10]], [60, [2, 12]], [70, [3, 2]], [80, [2, 13]], [100, [2, 4]], [125, [2, 4]], [150, [2, 4]], [175, [2, 4]], [200, [2, 4]], [250, [2, 4]]];
    $scope.friday.unlocks[2] = [[5, [4, 5]], [10, [4, 7]], [20, [4, 9]], [25, [5, 2]], [40, [4, 11]], [60, [4, 13]], [70, [5, 2]], [80, [4, 14]], [100, [4, 5]], [125, [4, 5]], [150, [4, 5]], [175, [4, 5]], [200, [4, 5]]];
    $scope.friday.unlocks[3] = [[5, [6, 6]], [10, [6, 8]], [20, [6, 10]], [25, [7, 2]], [40, [6, 12]], [60, [6, 14]], [70, [7, 2]], [80, [6, 15]], [100, [6, 6]], [125, [6, 6]], [150, [6, 6]], [175, [6, 6]]];
    $scope.friday.unlocks[4] = [[5, [8, 7]], [10, [8, 9]], [20, [8, 11]], [25, [9, 2]], [40, [8, 13]], [60, [8, 15]], [70, [9, 2]], [80, [8, 16]], [100, [8, 7]], [125, [8, 7]], [150, [8, 7]], [175, [8, 7]]];
    $scope.friday.unlocks[5] = [[5, [10, 8]], [10, [10, 10]], [20, [10, 12]], [25, [11, 2]], [40, [10, 14]], [60, [10, 16]], [70, [11, 2]], [80, [10, 17]], [100, [10, 8]], [125, [10, 8]], [150, [10, 8]]];
    $scope.friday.unlocks[6] = [[5, [12, 9]], [10, [12, 11]], [20, [12, 13]], [25, [13, 2]], [40, [12, 15]], [60, [12, 17]], [70, [13, 2]], [80, [12, 18]], [100, [12, 9]], [125, [12, 9]]];
    $scope.friday.unlocks[7] = [[5, [14, 10]], [10, [14, 12]], [20, [14, 14]], [25, [15, 2]], [40, [14, 16]], [60, [14, 18]], [70, [15, 2]], [80, [14, 19]], [100, [14, 10]], [125, [14, 10]]];
    $scope.friday.unlocks[8] = [[5, [16, 11]], [10, [16, 13]], [20, [16, 15]], [25, [17, 2]], [40, [16, 17]], [60, [16, 19]], [70, [17, 2]], [80, [16, 20]], [100, [16, 11]]];
    $scope.friday.unlocks[9] = [[6, [0, 50]], [12, [2, 50]], [18, [4, 50]], [24, [6, 50]], [30, [8, 50]], [36, [10, 50]], [42, [12, 50]], [48, [14, 50]], [54, [16, 50]], [60, [19, 2]], [75, [18, 50]], [100, [18, 50]]];
    $scope.friday.cashUpgrades = [[100000, [18, 4], false], [10000000, [18, 5], false], [1e+9, [18, 6], false], [100e+9, [18, 7], false], [10e+12, [18, 8], false], [1e+15, [18, 9], false], [100e+15, [18, 10], false], [1e+18, [18, 11], false], [1e+21, [18, 12], false], [1e+24, [18, 13], false], [1e+27, [18, 14], false], [1e+30, [18, 15], false], [1e+33, [18, 16], false], [1e+36, [18, 17], false], [1e+39, [18, 18], false], [1e+42, [18, 19], false], [10e+45, [18, 20], false], [100e+48, [18, 21], false], [1e+54, [18, 22], false], [100e+57, [18, 23], false], [100e+63, [18, 24], false], [1e+81, [18, 25], false], [1e+84, [18, 26], false], [1e+87, [18, 27], false], [1e+90, [18, 28], false], [1e+93, [18, 29], false], [1e+96, [18, 30], false], [1e+99, [18, 31], false], [1e+102, [18, 32], false], [1e+105, [18, 33], false], [1e+108, [18, 34], false]];
    $scope.friday.angelUpgrades = [[10e+6, [20, 2], false, false], [10e+12, [20, 3], false, false], [10e+18, [20, 4], false, false], [100e+24, [20, 5], false, false], [1e+33, [20, 16], false, false]];
    $scope.friday.managerUpgrades = [];
    $scope.gizmo.unlocks[0] = [
    [100, [0, 20]]
    ];
    $scope.gizmo.unlocks[1] = [
    [120, [2, 111]]
    ];
    $scope.gizmo.unlocks[2] = [
    ];
    $scope.gizmo.unlocks[3] = [
    ];
    $scope.gizmo.unlocks[4] = [
    ];
    $scope.gizmo.unlocks[5] = [
    ];
    $scope.gizmo.unlocks[6] = [
    ];
    $scope.gizmo.unlocks[7] = [
    ];
    $scope.gizmo.unlocks[8] = [
    ];
    $scope.gizmo.unlocks[9] = [
    [1, [19, 2]], 
    [2, [19, 2]],
    [5, [19, 2]],
    [7, [19, 2]],
    [9, [19, 2]],
    [11, [19, 2]],
    [13, [19, 2]],
    [15, [19, 2]],
    [17, [18, 7]],
    [19, [19, 2]],
    //[20, [19, 2]],
    //[21, [19, 2]],
    [23, [19, 2]],
    //[23, [19, 2]],
    //[26, [19, 2]],
    [29, [19, 2]],
    //[32, [19, 2]],
    [35, [18, 2]],
    //[55, [19, 2]],
    ];
    $scope.gizmo.cashUpgrades = [[332500, [0, 4], false], [950000, [2, 4], false], [2375000, [4, 4], false], [9500000, [6, 4], false], [23750000, [8, 4], false], [2.375e9, [10, 4], false], [95e9, [12, 4], false], [4.75e12, [14, 4], false], [9.5e12, [16, 4], false], [47.5e12, [18, 9], false], [237.5e12, [0, 5], false], [950e12, [2, 5], false], [2.375e15, [4, 5], false], [4.75e15, [6, 5], false], [9.5e15, [8, 5], false], [47.5e15, [10, 5], false], [71.25e15, [12, 5], false], [475e15, [14, 5], false], [2.375e18, [16, 5], false], [9.5e18, [18, 9], false], [47.5e18, [20, 1], false], [47.5e21, [0, 6], false], [95e21, [2, 6], false], [190e21, [4, 6], false], [760e21, [6, 6], false], [3.04e24, [8, 6], false], [14.345e24, [10, 6], false], [30.875e24, [12, 6], false], [53.865e24, [14, 6], false], [71.25e24, [16, 6], false], [95e24, [18, 9], false], [380e27, [0, 9], false], [1.52e30, [2, 9], false], [6.08e30, [4, 9], false], [12.16e30, [6, 9], false], [23.75e30, [8, 9], false], [84.36e30, [10, 9], false], [285e30, [12, 9], false], [1.9e33, [14, 9], false], [9.5e33, [16, 9], false], [47.5e33, [18, 9], false], [950e33, [0, 10], false], [1.9e36, [2, 10], false], [2.85e36, [4, 10], false], [3.8e36, [6, 10], false], [4.75e36, [8, 10], false], [6.65e36, [10, 10], false], [7.5e36, [12, 10], false], [8.55e36, [14, 10], false], [9.5e36, [16, 10], false], [95e36, [18, 9], false], [3.163e39, [0, 11], false], [6.327e39, [2, 11], false], [9.49e39, [4, 11], false], [22.8e39, [6, 11], false], [45.6e39, [8, 11], false], [121.6e39, [10, 11], false], [190e39, [12, 11], false], [337.25e39, [14, 11], false], [475e39, [16, 11], false], [950e39, [18, 9], false], [5.277e45, [0, 13], false], [52.777e45, [2, 13], false], [527.777e45, [4, 13], false], [5.277e48, [6, 13], false], [52.777e48, [8, 13], false], [5.277e51, [10, 13], false], [52.777e51, [12, 13], false], [527.777e51, [14, 13], false], [5.277e54, [16, 13], false], [52.777e54, [18, 9], false]];
    $scope.gizmo.angelUpgrades = [[621605, [0, 9], false, false], [7e6, [2, 9], false, false], [83e6, [4, 9], false, false], [938e6, [6, 9], false, false], [1e9, [8, 9], false, false], [115e9, [10, 9], false, false], [1e12, [12, 9], false, false], [13e12, [14, 9], false, false], [143e12, [16, 9], false, false], [52e15, [18, 99], false, false], [52e15, [30, 111], false, false], [52e15, [31, 75], false, false], [52e15, [32, 50], false, false], [52e15, [33, 40], false, false], [52e15, [34, 20], false, false], [52e15, [35, 15], false, false], [52e15, [36, 10], false, false], [52e15, [37, 5], false, false], [52e15, [0, 9], false, false], [95e15, [2, 9], false, false], [950e15, [4, 9], false, false], [9e18, [6, 9], false, false], [95e18, [8, 9], false, false], [9e21, [10, 9], false, false], [95e21, [12, 9], false, false], [950e21, [14, 9], false, false], [9e24, [16, 9], false, false], [949e24, [18, 9], false, false]];
    $scope.gizmo.managerUpgrades = [];
    $scope.halloween.unlocks[0] = [[111, [0,66]],[1111, [0,66]],[2222, [0,66]],[3333, [0,66]],[4444, [0,66]],[5555, [0,66]],[6666, [0,66]]];
    $scope.halloween.unlocks[1] = [[100, [2,66]],[750, [2,66]],[1500, [2,666]],[3000, [2,666]]];
    $scope.halloween.unlocks[2] = [[60, [4,66]],[600, [4,666]],[1200, [4,666]],[1800, [4,666]]];
    $scope.halloween.unlocks[3] = [[50, [6,66]],[200, [6,666]],[500, [6,666]],[1000, [6,66]]];
    $scope.halloween.unlocks[4] = [[25, [8,66]],[100, [8,66]],[250, [8,666]],[500, [8,66]]];
    $scope.halloween.unlocks[5] = [[15, [10,66]],[75, [10,66]],[150, [10,66]],[300, [10,666]]];
    $scope.halloween.unlocks[6] = [[10, [12,66]],[25, [12,66]],[75, [12,66]],[125, [12,66]],[175, [12,666]]];
    $scope.halloween.unlocks[7] = [[5, [14,66]],[30, [14,66]],[60, [14,66]],[120, [14,666]]];
    $scope.halloween.unlocks[8] = [[5, [16,66]],[25, [16,66]],[50, [16,66]],[75, [16,666]]];
    $scope.halloween.unlocks[9] = [[3, [18,66]],[18, [18,66]],[32, [18,66]],[50, [18,666]]];
    $scope.halloween.unlocks[10] = [[1, [21,2]],[5, [21,2]],[10, [21,2]],[15, [21,2]],[25, [21,2]],[35, [21,2]],[45, [21,2]]];
    $scope.halloween.cashUpgrades = [[333333, [0,6], false],[999999, [2,6], false],[3333333, [4,6], false],[9999999, [6,6], false],[333333333, [8,6], false],[999999999, [10,6], false],[33.333e+9, [12,6], false],[99.999e+9, [14,6], false],[3.333e+12, [16,6], false],[9.999e+12, [18,6], false],[66.666e+12, [20,9], false],[600e+12, [0,6], false],[1.2e+15, [2,6], false],[2.4e+15, [4,6], false],[4.8e+15, [6,6], false],[9.6e+15, [8,6], false],[22.2e+15, [10,6], false],[44.4e+15, [12,6], false],[66.6e+15, [14,6], false],[500e+15, [16,6], false],[2.5e+18, [18,6], false],[10e+18, [20,9], false],[66.6e+21, [0,6], false],[99.9e+21, [2,6], false],[200e+21, [4,6], false],[800e+21, [6,6], false],[3.2e+24, [8,6], false],[8.8e+24, [10,6], false],[15.1e+24, [12,6], false],[32.5e+24, [14,6], false],[56.7e+24, [16,6], false],[75e+24, [18,6], false],[100e+24, [20,9], false],[400e+27, [0,6], false],[1.6e+30, [2,6], false],[6.4e+30, [4,6], false],[12.8e+30, [6,6], false],[25e+30, [8,6], false],[50e+30, [10,6], false],[88.8e+30, [12,6], false],[300e+30, [14,6], false],[2e+33, [16,6], false],[10e+33, [18,6], false],[666.666e+33, [20,9], false],[1e+36, [0,6], false],[2e+36, [2,6], false],[3e+36, [4,6], false],[4e+36, [6,6], false],[5e+36, [8,6], false],[6e+36, [10,6], false],[7e+36, [12,6], false],[8e+36, [14,6], false],[9e+36, [16,6], false],[10e+36, [18,6], false],[100e+36, [20,9], false],[3.33e+39, [0,6], false],[6.66e+39, [2,6], false],[9.99e+39, [4,6], false],[24e+39, [6,6], false],[48e+39, [8,6], false],[64e+39, [10,6], false],[128e+39, [12,6], false],[200e+39, [14,6], false],[355e+39, [16,6], false],[500e+39, [18,6], false],[1e+42, [20,9], false],[6.666e+45, [0,66], false],[66.666e+45, [2,66], false],[666.666e+45, [4,66], false],[6.666e+48, [6,66], false],[66.666e+48, [8,66], false],[666.666e+48, [10,66], false],[6.666e+51, [12,66], false],[66.666e+51, [14,66], false],[666.666e+51, [16,66], false],[6.666e+54, [18,66], false],[66.666e+54, [20,9], false]];
    $scope.halloween.angelUpgrades = [[777777, [0,777], false, false],[7e+6, [2,777], false, false],[77e+6, [4,777], false, false],[777e+6, [6,777], false, false],[7e+9, [8,777], false, false],[77e+9, [10,777], false, false],[777e+9, [12,777], false, false],[7e+12, [14,777], false, false],[77e+12, [16,777], false, false],[777e+12, [18,777], false, false],[77e+15, [20,7], false, false],[77e+15, [30,111], false, false],[77e+15, [31,99], false, false],[77e+15, [32,88], false, false],[77e+15, [33,66], false, false],[77e+15, [34,44], false, false],[77e+15, [35,33], false, false],[77e+15, [36,22], false, false],[77e+15, [37,11], false, false],[77e+15, [38,6], false, false],[77e+15, [39,2], false, false],[77e+15, [0,7], false, false],[777e+15, [2,7], false, false],[7e+18, [4,7], false, false],[77e+18, [6,7], false, false],[777e+18, [8,7], false, false],[7e+21, [10,7], false, false],[77e+21, [12,7], false, false],[777e+21, [14,7], false, false],[7e+24, [16,7], false, false],[77e+24, [18,7], false, false],[7e+27, [20,7], false, false]];
    $scope.halloween.managerUpgrades = [];
    $scope.liverich.unlocks[0] = [[25, [1, 2]], [75, [1, 2]], [150, [1, 2]], [300, [1, 2]], [450, [1, 2]], [600, [1, 2]], [900, [0, 5]], [1300, [0, 5]], [1800, [0, 5]], [2400, [0, 5]], [3100, [0, 5]], [4000, [0, 5]]];
    $scope.liverich.unlocks[1] = [[1, [2, 2]], [25, [3, 2]], [75, [3, 2]], [150, [3, 2]], [300, [3, 2]], [450, [3, 2]], [600, [3, 2]], [900, [3, 2]], [1300, [2, 5]], [1800, [2, 5]], [2400, [2, 5]]];
    $scope.liverich.unlocks[2] = [[1, [4, 5]], [25, [5, 2]], [75, [5, 2]], [150, [5, 2]], [300, [5, 2]], [450, [5, 2]], [600, [5, 2]], [900, [5, 2]], [1300, [4, 5]]];
    $scope.liverich.unlocks[3] = [[1, [6, 5]], [25, [7, 2]], [75, [7, 2]], [150, [7, 2]], [300, [7, 2]], [450, [7, 2]], [600, [7, 2]], [900, [7, 2]]];
    $scope.liverich.unlocks[4] = [[1, [8, 5]], [25, [9, 2]], [75, [9, 2]], [150, [9, 2]], [300, [9, 2]], [450, [9, 2]], [600, [9, 2]], [900, [9, 2]]];
    $scope.liverich.unlocks[5] = [[1, [10, 5]], [25, [11, 2]], [75, [11, 2]], [150, [11, 2]], [300, [11, 2]], [450, [11, 2]], [600, [11, 2]]];
    $scope.liverich.unlocks[6] = [[1, [12, 5]], [25, [13, 2]], [75, [13, 2]], [150, [13, 2]], [300, [13, 2]], [450, [13, 2]]];
    $scope.liverich.unlocks[7] = [[1, [14, 5]], [25, [15, 2]], [75, [15, 2]], [150, [15, 2]], [300, [15, 2]]];
    $scope.liverich.unlocks[8] = [[1, [16, 5]], [25, [17, 2]], [75, [17, 2]], [150, [17, 2]], [150, [16, 5]]];
    $scope.liverich.unlocks[9] = [];
    $scope.liverich.cashUpgrades = [[1111, [0, 10], false], [1111111, [0, 10], false], [11111111, [2, 10], false], [111111111, [0, 10], false], [1.111e+9, [2, 10], false], [11.111e+9, [4, 10], false], [111.111e+9, [0, 10], false], [1.111e+12, [2, 10], false], [11.111e+12, [4, 10], false], [111.111e+12, [18, 7], false], [1.111e+15, [6, 10], false], [11.111e+15, [0, 10], false], [111.111e+15, [2, 10], false], [1.111e+18, [4, 10], false], [11.111e+18, [6, 10], false], [111.111e+18, [8, 10], false], [1.111e+21, [0, 10], false], [11.111e+21, [2, 10], false], [111.111e+21, [4, 10], false], [1.111e+24, [6, 10], false], [11.111e+24, [8, 10], false], [111.111e+24, [10, 10], false], [1.111e+27, [0, 10], false], [11.111e+27, [2, 10], false], [111.111e+27, [4, 10], false], [1.111e+30, [6, 10], false], [11.111e+30, [8, 10], false], [111.111e+30, [10, 10], false], [1.111e+33, [18, 7], false], [11.111e+33, [12, 10], false], [111.111e+33, [0, 10], false], [1.111e+36, [2, 10], false], [11.111e+36, [4, 10], false], [111.111e+36, [6, 10], false], [1.111e+39, [8, 10], false], [11.111e+39, [10, 10], false], [111.111e+39, [12, 10], false], [1.111e+42, [18, 7], false], [11.111e+42, [14, 10], false], [111.111e+42, [0, 10], false], [1.111e+45, [2, 10], false], [11.111e+45, [4, 10], false], [111.111e+45, [6, 10], false], [1.111e+48, [8, 10], false], [11.111e+48, [10, 10], false], [111.111e+48, [12, 10], false], [1.111e+51, [14, 10], false], [11.111e+51, [16, 10], false], [111.111e+51, [18, 111], false]];
    $scope.liverich.angelUpgrades = [[111111, [18, 2], false, false], [1e+9, [18, 2], false, false], [11e+12, [18, 2], false, false], [111e+15, [18, 2], false, false], [1e+21, [18, 2], false, false]];
    $scope.liverich.managerUpgrades = [];
    $scope.love.unlocks[0] = [[250, [18, 3.33]],[1111, [18, 5.55]],[2222, [18, 7.77]]];
    $scope.love.unlocks[1] = [[200, [18, 3.33]],[600, [18, 5.55]],[1200, [18, 7.77]]];
    $scope.love.unlocks[2] = [[200, [18, 3.33]],[400, [18, 5.55]],[650, [18, 7.77]]];
    $scope.love.unlocks[3] = [[25, [18, 3.33]],[100, [18, 5.55]],[200, [18, 7.77]]];
    $scope.love.unlocks[4] = [[22, [18, 3.33]],[77, [18, 5.55]],[135, [18, 7.77]]];
    $scope.love.unlocks[5] = [[22, [18, 3.33]],[77, [18, 5.55]],[111, [18, 7.77]]];
    $scope.love.unlocks[6] = [[10, [18, 3.33]],[30, [18, 5.55]],[65, [18, 7.77]]];
    $scope.love.unlocks[7] = [[10, [18, 3.33]],[30, [18, 5.55]],[70, [18, 7.77]]];
    $scope.love.unlocks[8] = [[15, [18, 3.33]],[40, [18, 5.55]],[65, [18, 7.77]]];
    $scope.love.unlocks[9] = [[5, [1, 5]],[10, [3, 5]],[14, [18, 2]],[15, [5, 5]],[20, [7, 8]],[25, [9, 8]],[30, [11, 5]],[35, [13, 5]],[40, [15, 5]],[45, [17, 5]],[50, [1, 5]],[55, [3, 5]],[60, [5, 5]],[65, [7, 5]],[70, [9, 5]],[75, [11, 5]],[80, [13, 5]],[85, [15, 5]],[90, [17, 5]]];
    $scope.love.cashUpgrades = [[12345, [0, 2], false],[67890, [2, 2], false],[123456, [4, 2], false],[789012, [6, 2], false],[1234567, [8, 2], false],[8901234, [10, 2], false],[12345678, [12, 2], false],[90123456, [14, 2], false],[123456789, [16, 2], false],[1.234e+9, [18, 3], false],[24.681e+9, [0, 5], false],[369.121e+9, [2, 5], false],[4.812e+12, [4, 5], false],[51.015e+12, [6, 5], false],[612.182e+12, [8, 5], false],[7.142e+15, [10, 5], false],[81.624e+15, [12, 5], false],[918.273e+15, [14, 5], false],[1.02e+18, [16, 5], false],[11.223e+18, [18, 7], false],[111.111e+18, [0, 9], false],[2.222e+21, [2, 9], false],[33.333e+21, [4, 9], false],[444.444e+21, [6, 9], false],[5.555e+24, [8, 9], false],[66.666e+24, [10, 9], false],[777.777e+24, [12, 9], false],[8.888e+27, [14, 9], false],[100e+27, [16, 9], false],[101.01e+27, [18, 11], false],[3.141e+30, [0, 13], false],[50.288e+30, [2, 13], false],[230.781e+30, [4, 13], false],[7.067e+33, [6, 13], false],[55.058e+33, [8, 13], false],[270.19e+33, [10, 13], false],[4.428e+36, [12, 13], false],[16.527e+36, [14, 13], false],[664.821e+36, [16, 13], false],[5.588e+39, [18, 15], false]];
    $scope.love.angelUpgrades = [[1111, [18, 3], false, false],[222222, [18, 4], false, false],[33000000, [18, 4], false, false],[22e+9, [18, 4], false, false],[55e+12, [18, 4], false, false],[77e+15, [18, 4], false, false]];
    $scope.love.managerUpgrades = [];
    $scope.lyp.unlocks[0] = [[100, [0, 20]],  [1000, [0, 40]],  [2000, [0, 60]],   [3000, [0, 80]], [4000, [0, 100]], [5000, [0, 200]], [6000, [0, 300]]];
    $scope.lyp.unlocks[1] = [[120, [2, 111]], [600,  [2, 222]], [1200, [2, 333]],  [3000, [2, 444]]];
    $scope.lyp.unlocks[2] = [[60,  [4, 33]],  [360,  [4, 333]], [1200, [4, 3333]], [1800, [4, 33333]]];
    $scope.lyp.unlocks[3] = [[60,  [6, 22]],  [180,  [6, 222]], [420,  [6, 2222]], [900,  [6, 22222]]];
    $scope.lyp.unlocks[4] = [[25,  [8, 100]], [100,  [8, 100]], [250,  [8, 100]],  [500,  [8, 100]]];
    $scope.lyp.unlocks[5] = [[4,   [10, 66]], [30,   [10, 66]], [60,   [10, 66]],  [120,  [10, 66]], [180, [10, 66]]];
    $scope.lyp.unlocks[6] = [[5,   [12, 77]], [25,   [12, 77]], [75,   [12, 77]],  [120,  [12, 777]]];
    $scope.lyp.unlocks[7] = [[5,   [14, 44]], [15,   [14, 44]], [45,   [14, 44]],  [83,   [14, 444]]];
    $scope.lyp.unlocks[8] = [[3,   [16, 55]], [15,   [16, 55]], [30,   [16, 55]],  [60,   [16, 555]]];
    $scope.lyp.unlocks[9] = [[1, [19, 2]], [2, [19, 2]], [5, [19, 2]], [7, [19, 2]], [9, [19, 2]], [11, [19, 2]], [13, [19, 2]],
                             [15, [19, 2]], [17, [18, 7]], [19, [19, 2]], [23, [19, 2]], [29, [19, 2]], [35, [18, 2]]
                            ];
    $scope.lyp.cashUpgrades = [[332500, [0, 4], false], [950000, [2, 4], false], [2375000, [4, 4], false], [9500000, [6, 4], false], [23750000, [8, 4], false], [2.375e9, [10, 4], false], [95e9, [12, 4], false], [4.75e12, [14, 4], false], [9.5e12, [16, 4], false], [47.5e12, [18, 9], false],
                               [237.5e12, [0, 5], false], [950e12, [2, 5], false], [2.375e15, [4, 5], false], [4.75e15, [6, 5], false], [9.5e15, [8, 5], false], [47.5e15, [10, 5], false], [71.25e15, [12, 5], false], [475e15, [14, 5], false], [2.375e18, [16, 5], false], [9.5e18, [18, 9], false], [47.5e18, [20, 1], false],
                               [47.5e21, [0, 6], false], [95e21, [2, 6], false], [190e21, [4, 6], false], [760e21, [6, 6], false], [3.04e24, [8, 6], false], [14.345e24, [10, 6], false], [30.875e24, [12, 6], false], [53.865e24, [14, 6], false], [71.25e24, [16, 6], false], [95e24, [18, 9], false],
                               [380e27, [0, 9], false], [1.52e30, [2, 9], false], [6.08e30, [4, 9], false], [12.16e30, [6, 9], false], [23.75e30, [8, 9], false], [84.36e30, [10, 9], false], [285e30, [12, 9], false], [1.9e33, [14, 9], false], [9.5e33, [16, 9], false], [47.5e33, [18, 9], false],
                               [950e33, [0, 10], false], [1.9e36, [2, 10], false], [2.85e36, [4, 10], false], [3.8e36, [6, 10], false], [4.75e36, [8, 10], false], [6.65e36, [10, 10], false], [7.6e36, [12, 10], false], [8.55e36, [14, 10], false], [9.5e36, [16, 10], false], [95e36, [18, 9], false],
                               [3.163e39, [0, 11], false], [6.327e39, [2, 11], false], [9.49e39, [4, 11], false], [22.8e39, [6, 11], false], [45.6e39, [8, 11], false], [121.6e39, [10, 11], false], [190e39, [12, 11], false], [337.25e39, [14, 11], false], [475e39, [16, 11], false], [950e39, [18, 9], false],
                               [5.277e45, [0, 13], false], [52.777e45, [2, 13], false], [527.777e45, [4, 13], false], [5.277e48, [6, 13], false], [52.777e48, [8, 13], false], [5.277e51, [10, 13], false], [52.777e51, [12, 13], false], [527.777e51, [14, 13], false], [5.277e54, [16, 13], false], [52.777e54, [18, 9], false]
                              ];
    $scope.lyp.angelUpgrades = [[621605, [0, 9], false, false], [7e6, [2, 9], false, false], [83e6, [4, 9], false, false], [938e6, [6, 9], false, false], [1e9, [8, 9], false, false], [115e9, [10, 9], false, false], [1e12, [12, 9], false, false], [13e12, [14, 9], false, false], [143e12, [16, 9], false, false], [52e15, [18, 99], false, false],
                                [52e15, [30, 111], false, false], [52e15, [31, 100], false, false], [52e15, [32, 75], false, false], [52e15, [33, 50], false, false], [52e15, [34, 40], false, false], [52e15, [35, 20], false, false], [52e15, [36, 15], false, false], [52e15, [37, 10], false, false], [52e15, [38, 5], false, false],
                                [52e15, [0, 9], false, false], [95e15, [2, 9], false, false], [950e15, [4, 9], false, false], [9e18, [6, 9], false, false], [95e18, [8, 9], false, false], [9e21, [10, 9], false, false], [95e21, [12, 9], false, false], [950e21, [14, 9], false, false], [9e24, [16, 9], false, false], [949e24, [18, 9], false, false]
                               ];
    $scope.lyp.managerUpgrades = [];
    $scope.managermaniaI.unlocks[0] = [[50, [0, 2]],[100, [2, 0.5]],[150, [0, 3]],[150, [2, 0.5]],[200, [0, 4]]];
    $scope.managermaniaI.unlocks[1] = [[111, [2, 3]],[222, [1, 0.8]],[444, [2, 4]],[666, [1, 0.8]]];
    $scope.managermaniaI.unlocks[2] = [];
    $scope.managermaniaI.unlocks[3] = [];
    $scope.managermaniaI.unlocks[4] = [];
    $scope.managermaniaI.unlocks[5] = [];
    $scope.managermaniaI.unlocks[6] = [];
    $scope.managermaniaI.unlocks[7] = [];
    $scope.managermaniaI.unlocks[8] = [];
    $scope.managermaniaI.unlocks[9] = [];
    $scope.managermaniaI.cashUpgrades = [[1001, [0, 6], false],[300001, [2, 6], false],[1000001, [0, 12], false],[10000001, [2, 12], false],[100000001, [0, 18], false],[1e9, [2, 18], false],[9e9, [0, 24], false],[80e9, [2, 24], false],[500e9, [0, 50], false],[3e12, [2, 222], false]];
    $scope.managermaniaI.angelUpgrades = [];
    $scope.managermaniaI.managerUpgrades = [];
    $scope.mars.unlocks[0] = [[200, [0, 3]],[400, [0, 3]],[600, [0, 3]],[800, [0, 3]],[1000, [1, 2]],[1200, [0, 3]],[1400, [0, 3]],[1600, [0, 3]],[1800, [0, 3]],[2000, [1, 2]],[2200, [0, 3]],[2400, [0, 3]],[2600, [0, 3]],[2800, [0, 3]],[3000, [1, 2]],[3200, [0, 3]],[3400, [0, 3]],[3600, [0, 3]],[3800, [0, 3]],[4000, [0, 3]],[4300, [0, 3]],[4600, [0, 3]],[4900, [0, 3]],[5200, [0, 3]],[5500, [0, 3]],[5800, [0, 3]],[6100, [0, 3]],[6400, [0, 3]],[6700, [0, 3]],[7000, [1, 2]],[7300, [0, 3]],[7600, [0, 3]],[7900, [0, 3]],[8200, [0, 3]],[8500, [1, 2]],[8800, [0, 3]],[9100, [0, 3]],[9400, [0, 3]],[9700, [0, 3]],[10000, [0, 3]],[10500, [0, 3]],[11000, [0, 3]],[11500, [0, 3]],[12000, [0, 3]],[12500, [0, 3]],[13000, [0, 13]],[13500, [0, 3]],[14000, [0, 3]],[14500, [0, 3]],[15000, [0, 3]],[15500, [0, 3]],[16000, [0, 3]],[16500, [0, 3]],[17000, [0, 3]],[17500, [0, 3]],[18000, [0, 3]],[18500, [0, 3]],[19000, [0, 3]],[19500, [0, 3]],[20000, [0, 3]],[20500, [0, 3]],[21500, [0, 3]],[22000, [0, 3]],[22500, [0, 3]],[23000, [0, 3]],[23500, [0, 3]],[24000, [0, 3]],[24500, [0, 3]],[25000, [0, 3]],[25500, [0, 3]],[26000, [0, 3]],[26500, [0, 3]],[27000, [0, 3]],[27500, [0, 3]],[28000, [0, 3]],[28500, [0, 3]],[29000, [0, 3]],[29500, [0, 3]],[30000, [0, 3]],[30500, [0, 3]],[31000, [0, 3]],[31500, [0, 3]],[32000, [0, 3]],[32500, [0, 3]],[33000, [0, 3]],[33500, [0, 3]],[34000, [0, 3]],[34500, [0, 3]],[35000, [0, 3]],[35500, [0, 3]],[36000, [0, 3]],[36500, [0, 3]],[37000, [0, 3]],[37500, [0, 3]],[38000, [0, 3]],[38500, [0, 3]],[39000, [0, 3]],[39500, [0, 3]],[40000, [0, 3]],[40500, [0, 3]],[41000, [0, 3]],[41500, [0, 3]],[42000, [0, 3]],[42500, [0, 3]],[43000, [0, 3]],[43500, [0, 3]],[44000, [0, 3]],[44500, [0, 3]],[45000, [0, 3]],[45500, [0, 3]],[46000, [0, 3]],[46500, [0, 3]],[47000, [0, 3]],[47500, [0, 3]],[48000, [0, 3]],[48500, [0, 3]],[49000, [0, 3]],[49500, [0, 3]],[50000, [0, 3]],[50500, [0, 3]],[51000, [0, 3]],[51500, [0, 3]],[52000, [0, 3]],[52500, [0, 3]],[53000, [0, 3]],[53500, [0, 3]],[54000, [0, 3]],[54500, [0, 3]],[55000, [0, 3]],[55555, [0, 5]],[56000, [0, 3]]];
    $scope.mars.unlocks[1] = [[75, [2, 3.33]],[150, [2, 3.33]],[225, [2, 3.33]],[300, [3, 2]],[375, [2, 3.33]],[450, [2, 3.33]],[525, [2, 3.33]],[600, [3, 2]],[675, [2, 3.33]],[750, [2, 3.33]],[825, [2, 3.33]],[900, [3, 2]],[975, [2, 3.33]],[1050, [2, 3.33]],[1125, [2, 3.33]],[1200, [3, 2]],[1275, [2, 3.33]],[1350, [2, 3.33]],[1425, [2, 3.33]],[1500, [3, 2]],[1575, [2, 3.33]],[1650, [2, 3.33]],[1725, [2, 3.33]],[1800, [3, 2]],[1875, [2, 3.33]],[1950, [2, 3.33]],[2025, [2, 3.33]],[2100, [2, 3.33]],[2275, [2, 3.33]],[2450, [2, 3.33]],[2625, [2, 3.33]],[2800, [2, 3.33]],[2975, [2, 3.33]],[3150, [2, 3.33]],[3325, [2, 3.33]],[3500, [2, 3.33]],[3675, [2, 3.33]],[3850, [2, 3.33]],[4025, [2, 3.33]],[4200, [2, 3.33]],[4375, [2, 3.33]],[4550, [2, 3.33]],[4725, [2, 3.33]],[4900, [2, 3.33]],[5075, [2, 3.33]],[5250, [2, 3.33]],[5425, [2, 3.33]],[5600, [2, 3.33]],[5775, [2, 3.33]],[5950, [2, 3.33]],[6125, [2, 3.33]],[6300, [2, 3.33]],[6475, [2, 3.33]],[6650, [2, 3.33]],[6825, [2, 3.33]],[7000, [2, 3.33]],[7175, [2, 3.33]],[7350, [2, 3.33]],[7525, [2, 3.33]],[7700, [2, 3.33]],[7875, [2, 3.33]],[8050, [2, 3.33]],[8225, [2, 3.33]],[8400, [2, 3.33]],[8575, [2, 3.33]],[8750, [2, 3.33]],[8925, [2, 3.33]],[9100, [2, 3.33]],[9275, [2, 3.33]],[9450, [2, 3.33]],[9625, [2, 3.33]],[9800, [2, 3.33]],[9975, [2, 3.33]],[10150, [2, 3.33]],[10325, [2, 3.33]],[10500, [2, 3.33]],[10675, [2, 3.33]],[10850, [2, 3.33]],[11025, [2, 3.33]],[11200, [2, 3.33]],[11375, [2, 3.33]],[11550, [2, 3.33]],[11725, [2, 3.33]],[11900, [2, 3.33]],[12075, [2, 3.33]],[12250, [2, 3.33]],[12425, [2, 3.33]],[12600, [2, 3.33]],[12775, [2, 3.33]],[12950, [2, 3.33]],[13125, [2, 3.33]],[13300, [2, 3.33]],[13475, [2, 3.33]],[13650, [2, 3.33]],[13825, [2, 3.33]],[14000, [2, 3.33]],[14175, [2, 3.33]],[14350, [2, 3.33]],[14525, [2, 3.33]],[14700, [2, 3.33]],[14875, [2, 3.33]],[15050, [2, 3.33]],[15225, [2, 3.33]],[15400, [2, 3.33]],[15575, [2, 3.33]],[15750, [2, 3.33]],[15925, [2, 3.33]],[16100, [2, 3.33]],[16275, [2, 3.33]],[16450, [2, 3.33]],[16625, [2, 3.33]],[16800, [2, 3.33]],[16975, [2, 3.33]],[17150, [2, 3.33]],[17325, [2, 3.33]],[17500, [2, 3.33]]];
    $scope.mars.unlocks[2] = [[100, [4, 5]],[200, [4, 5]],[300, [4, 5]],[400, [4, 5]],[500, [5, 5]],[600, [4, 6]],[700, [4, 9]],[800, [4, 9]],[900, [4, 9]],[1000, [5, 5]],[1100, [4, 9]],[1200, [4, 9]],[1300, [4, 9]],[1400, [4, 9]],[1500, [4, 9]],[1600, [4, 9]],[1700, [4, 9]],[1800, [4, 9]],[1900, [4, 9]],[2000, [4, 9]],[2200, [4, 9]],[2400, [4, 9]],[2600, [4, 9]],[2800, [4, 9]],[3000, [4, 9]],[3200, [4, 9]],[3400, [4, 9]],[3600, [4, 9]],[3800, [4, 9]],[4000, [4, 9]],[4200, [4, 9]],[4400, [4, 9]],[4600, [4, 9]],[4800, [4, 9]],[5000, [4, 999]],[5200, [4, 9]],[5400, [4, 9]],[5600, [4, 9]],[5800, [4, 9]],[6000, [4, 9]],[6200, [4, 9]],[6400, [4, 9]],[6600, [4, 9]],[6800, [4, 9]],[7000, [4, 9]],[7200, [4, 9]],[7400, [4, 9]],[7600, [4, 9]],[7800, [4, 9]],[8000, [4, 9]],[8200, [4, 9]],[8400, [4, 9]],[8600, [4, 9]],[8800, [4, 9]],[9000, [4, 9]],[9200, [4, 9]],[9400, [4, 9]],[9600, [4, 9]],[9800, [4, 9]],[10000, [4, 9]],[10200, [4, 9]],[10400, [4, 9]],[10600, [4, 9]],[10800, [4, 9]],[11000, [4, 9]],[11200, [4, 9]],[11400, [4, 9]],[11600, [4, 9]],[11800, [4, 9]],[12000, [4, 9]]];
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
    // 0 = Brussel Sprout Kids Profit
    // 1 = Brussel Sprout Kids Speed
    // 2 = Stop It Profit
    // 3 = Stop It Speed
    // 4 = Etch-A-Cheque Profit
    // 5 = Etch-A-Cheque Speed
    // 6 = Baking Bugs Profit
    // 7 = Baking Bugs Speed
    // 8 = Turdy Profit
    // 9 = Turdy Speed
    // 10 = House Trap Profit
    // 11 = House Trap Speed
    // 12 = Play Dough Profit
    // 13 = Play Dough Speed
    // 14 = Trigger Me Millenial Profit
    // 15 = Trigger Me Millenial Speed
    // 16 = Pet Coal Profit
    // 17 = Pet Coal Speed
    // 18 = All Profit
    // 19 = All Speed
    $scope.merrymerger.unlocks[0] = [[12, [18, 9]], [36, [18, 9]], [144, [0, 33]]];
    $scope.merrymerger.unlocks[1] = [[12, [18, 9]], [36, [18, 2]], [144, [2, 9]]];
    $scope.merrymerger.unlocks[2] = [[12, [18, 9]], [36, [18, 2]]];
    $scope.merrymerger.unlocks[3] = [[12, [18, 2]]];
    $scope.merrymerger.unlocks[4] = [[12, [18, 33]]];
    $scope.merrymerger.unlocks[5] = [[12, [18, 7]]];
    $scope.merrymerger.unlocks[6] = [[12, [18, 1.5]]];
    $scope.merrymerger.unlocks[7] = [[12, [18, 5]]];
    $scope.merrymerger.unlocks[8] = [[12, [18, 5]]];
    $scope.merrymerger.unlocks[9] = [];
    $scope.merrymerger.cashUpgrades = [];
    $scope.merrymerger.angelUpgrades = [];
    $scope.merrymerger.managerUpgrades = [];
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
    $scope.moon.angelUpgrades = [[11111, [20, 3], false, false],[222222, [0, 3], false, false],[3333333, [2, 3], false, false],[4444444, [4, 3], false, false],[55555555, [6, 3], false, false],[666666666, [8, 3], false, false],[7777777777, [10, 3], false, false],[88888888888, [12, 3], false, false],[999999999999, [14, 3], false, false],[1010101010101, [16, 3], false, false],[11111111111111, [18, 3], false, false],[123000000000000, [20, 3], false, false],[5e+19, [31, 10], false, false],[5e+19, [33, 10], false, false],[5e+19, [35, 10], false, false],[5e+19, [37, 10], false, false],[5e+19, [39, 10], false, false],[1e+21, [0, 3], false, false],[9e+21, [2, 3], false, false],[2.7e+22, [4, 3], false, false],[9.9e+22, [6, 3], false, false],[1.8e+23, [8, 3], false, false],[2.22e+23, [10, 3], false, false],[3.43e+23, [12, 3], false, false],[4.77e+23, [14, 3], false, false],[5.69e+23, [16, 3], false, false],[7.89e+23, [18, 3], false, false],[1e+24, [20, 3], false, false],[2.5e+28, [31, 10], false, false],[2.5e+28, [33, 10], false, false],[2.5e+28, [35, 10], false, false],[2.5e+28, [37, 10], false, false],[2.5e+28, [39, 10], false, false],[1e+30, [0, 3], false, false],[1.4e+31, [2, 3], false, false],[5.5e+31, [4, 3], false, false],[1e+32, [6, 3], false, false],[1.89e+32, [8, 3], false, false],[2.67e+32, [10, 3], false, false],[4.04e+32, [12, 3], false, false],[6.91e+32, [14, 3], false, false],[7.77e+32, [16, 3], false, false],[9.1e+32, [18, 3], false, false],[2e+33, [20, 3], false, false],[1e+35, [31, 10], false, false],[1e+35, [33, 10], false, false],[1e+35, [35, 10], false, false],[1e+35, [37, 10], false, false],[1e+35, [39, 10], false, false],[5e+36, [0, 3], false, false],[1.9e+37, [2, 3], false, false],[8.8e+37, [4, 3], false, false],[1.44e+38, [6, 3], false, false],[2.01e+38, [8, 3], false, false],[3.33e+38, [10, 3], false, false],[4e+38, [12, 3], false, false],[5.88e+38, [14, 3], false, false],[7.01e+38, [16, 3], false, false],[9.11e+38, [18, 3], false, false],[5e+40, [20, 9], false, false],[5e+42, [31, 10], false, false],[5e+42, [33, 10], false, false],[5e+42, [35, 10], false, false],[5e+42, [37, 10], false, false],[5e+42, [39, 10], false, false],[3e+45, [0, 5], false, false],[6e+45, [2, 5], false, false],[1.2e+46, [4, 5], false, false],[2.4e+46, [6, 5], false, false],[4.8e+46, [8, 5], false, false],[9.6e+46, [10, 5], false, false],[1.92e+47, [12, 5], false, false],[3.84e+47, [14, 5], false, false],[7.68e+47, [16, 5], false, false],[1.4e+49, [18, 5], false, false],[5e+50, [20, 9], false, false],[1e+53, [20, 9], false, false],[5e+54, [30, 50], false, false],[5e+54, [31, 50], false, false],[5e+54, [32, 50], false, false],[5e+54, [33, 50], false, false],[5e+54, [34, 50], false, false],[5e+54, [35, 50], false, false],[5e+54, [36, 50], false, false],[5e+54, [37, 50], false, false],[5e+54, [38, 50], false, false],[5e+54, [39, 50], false, false],[1e+56, [0, 3], false, false],[2e+56, [2, 3], false, false],[3e+56, [4, 3], false, false],[4e+56, [6, 3], false, false],[5e+56, [8, 3], false, false],[6e+56, [10, 3], false, false],[7e+56, [12, 3], false, false],[8e+56, [14, 3], false, false],[9e+56, [16, 3], false, false],[1e+57, [18, 3], false, false],[3.16e+59, [20, 3], false, false],[1e+60, [20, 9], false, false],[1e+65, [30, 75], false, false],[1e+65, [31, 75], false, false],[1e+65, [32, 75], false, false],[1e+65, [33, 75], false, false],[1e+65, [34, 75], false, false],[1e+65, [35, 75], false, false],[1e+65, [36, 75], false, false],[1e+65, [37, 75], false, false],[1e+65, [38, 75], false, false],[1e+65, [39, 75], false, false],[1e+66, [20, 3], false, false],[1e+69, [0, 3], false, false],[2e+69, [2, 3], false, false],[4e+69, [4, 3], false, false],[8e+69, [6, 3], false, false],[1.6e+70, [8, 3], false, false],[3.2e+70, [10, 3], false, false],[6.4e+70, [12, 3], false, false],[1.28e+71, [14, 3], false, false],[2.56e+71, [16, 3], false, false],[5.12e+71, [18, 3], false, false],[1e+72, [20, 9], false, false],[5e+75, [31, 50], false, false],[5e+75, [33, 50], false, false],[5e+75, [34, 100], false, false],[5e+75, [36, 100], false, false],[5e+75, [39, 25], false, false],[1e+77, [0, 7], false, false],[2e+77, [2, 7], false, false],[4e+77, [4, 7], false, false],[8e+77, [6, 7], false, false],[1.6e+79, [8, 7], false, false],[3.2e+79, [10, 7], false, false],[6.4e+79, [12, 7], false, false],[1.28e+80, [14, 7], false, false],[2.56e+80, [16, 7], false, false],[5.12e+80, [18, 7], false, false],[1e+81, [20, 7], false, false],[1e+86, [33, 100], false, false],[2e+86, [34, 200], false, false],[3e+86, [36, 300], false, false],[1e+87, [0, 3], false, false],[9e+87, [2, 3], false, false],[1.8e+88, [4, 3], false, false],[2.7e+88, [6, 3], false, false],[3.6e+88, [8, 3], false, false],[4.5e+88, [10, 3], false, false],[5.4e+88, [12, 3], false, false],[6.3e+88, [14, 3], false, false],[7.2e+88, [16, 3], false, false],[8.1e+88, [18, 3], false, false],[1e+90, [20, 5], false, false]];
    $scope.moon.managerUpgrades = [[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]],[[10e+99, false]]];
    $scope.newyou.unlocks[0] = [[25, [0, 25]],[50, [0, 27]],[70, [0, 29]],[100, [0, 31]],[125, [0, 33]],[150, [0, 35]],[175, [0, 37]],[200, [0, 39]],[225, [0, 41]],[250, [0, 43]]];
    $scope.newyou.unlocks[1] = [[20, [2, 25]],[40, [2, 27]],[60, [2, 29]],[80, [2, 31]],[100, [2, 33]],[120, [2, 35]],[140, [2, 37]],[160, [2, 39]],[180, [2, 41]],[200, [2, 43]]];
    $scope.newyou.unlocks[2] = [[15, [4, 25]],[30, [4, 27]],[45, [4, 29]],[60, [4, 31]],[75, [4, 33]],[90, [4, 35]],[105, [4, 37]],[120, [4, 39]],[135, [4, 41]],[150, [4, 43]]];
    $scope.newyou.unlocks[3] = [[10, [6, 25]],[20, [6, 27]],[30, [6, 29]],[40, [6, 31]],[50, [6, 33]],[60, [6, 35]],[70, [6, 37]],[80, [6, 39]],[90, [6, 41]],[100, [6, 43]]];
    $scope.newyou.unlocks[4] = [[5, [21, 2]],[10, [21, 2]],[15, [21, 2]],[20, [21, 2]],[25, [21, 2]],[30, [21, 2]],[35, [21, 2]],[40, [21, 2]],[45, [21, 2]],[50, [21, 2]],[55, [21, 2]]];
    $scope.newyou.unlocks[5] = [[25, [11, 2]],[50, [1, 0.5]],[75, [10, 20]],[100, [1, 0.5]],[150, [11, 2]],[200, [1, 0.5]],[250, [10, 20]],[300, [1, 0.5]],[350, [11, 2]],[400, [1, 0.5]],[450, [10, 20]],[500, [1, 0.5]],[550, [11, 2]],[600, [1, 0.5]],[650, [10, 20]],[700, [1, 0.5]],[800, [11, 2]],[900, [1, 0.5]],[1000, [10, 20]],[1100, [1, 0.5]],[1200, [11, 2]],[1300, [1, 0.5]],[1400, [10, 20]],[1500, [1, 0.5]],[1600, [11, 2]],[1700, [1, 0.5]],[1800, [10, 20]],[1900, [1, 0.5]],[2000, [10, 333]]];
    $scope.newyou.unlocks[6] = [[25, [13, 2]],[100, [3, 0.5]],[175, [12, 25]],[250, [3, 0.5]],[300, [13, 2]],[400, [3, 0.5]],[475, [12, 25]],[550, [3, 0.5]],[625, [13, 2]],[700, [3, 0.5]],[775, [12, 25]],[850, [3, 0.5]],[925, [13, 2]],[1000, [3, 0.5]],[1075, [12, 25]],[1150, [3, 0.5]],[1250, [12, 444]]];
    $scope.newyou.unlocks[7] = [[25, [15, 2]],[75, [5, 0.5]],[125, [14, 30]],[200, [5, 0.5]],[250, [15, 2]],[300, [5, 0.5]],[350, [14, 30]],[400, [5, 0.5]],[450, [15, 2]],[500, [5, 0.5]],[550, [14, 30]],[600, [5, 0.5]],[650, [15, 2]],[700, [5, 0.5]],[750, [14, 30]],[800, [5, 0.5]],[850, [15, 2]],[900, [5, 0.5]],[1000, [14, 555]]];
    $scope.newyou.unlocks[8] = [[25, [17, 2]],[75, [7, 0.5]],[135, [16, 35]],[200, [7, 0.5]],[250, [17, 2]],[300, [7, 0.5]],[350, [16, 35]],[400, [7, 0.5]],[450, [17, 2]],[500, [7, 0.5]],[550, [16, 35]],[600, [7, 0.5]],[650, [17, 2]],[700, [7, 0.5]],[750, [16, 666]]];
    $scope.newyou.unlocks[9] = [[25, [18, 9]],[50, [9, 0.5]],[75, [19, 2]],[100, [9, 0.5]],[125, [18, 40]],[150, [9, 0.5]],[175, [19, 2]],[200, [9, 0.5]],[225, [18, 40]],[250, [9, 0.5]],[275, [19, 2]],[300, [9, 0.5]],[325, [18, 40]],[350, [9, 0.5]],[375, [19, 2]],[400, [9, 0.5]],[425, [18, 40]],[450, [9, 0.5]],[475, [19, 2]],[500, [9, 0.5]],[525, [18, 40]],[550, [9, 0.5]],[575, [19, 2]],[600, [9, 0.5]],[650, [18, 777]]];
    $scope.newyou.unlocks[10] = [];
    $scope.newyou.cashUpgrades = [[3e+6, [0, 7], false],[24e+6, [2, 7], false],[192e+6, [4, 7], false],[1.536e+9, [6, 7], false],[12.288e+9, [8, 7], false],[100e+9, [20, 15], false],[447.456e+9, [0, 7], false],[1.769e+12, [2, 7], false],[21.233e+12, [4, 7], false],[254.803e+12, [6, 7], false],[4.076e+15, [8, 7], false],[10e+15, [20, 15], false],[65.2e+15, [0, 7], false],[104e+15, [2, 7], false],[4.32e+18, [4, 7], false],[96.3e+18, [6, 7], false],[321e+18, [8, 7], false],[1e+21, [20, 10], false],[2.23e+21, [0, 7], false],[45.3e+21, [2, 7], false],[721e+21, [4, 7], false],[8.22e+24, [6, 7], false],[15.5e+24, [8, 7], false],[100e+24, [20, 10], false],[222e+24, [0, 7], false],[7.61e+27, [2, 7], false],[41.1e+27, [4, 7], false],[735e+27, [6, 7], false],[4.45e+30, [8, 7], false],[10e+30, [20, 10], false],[89.6e+30, [0, 7], false],[777e+30, [2, 7], false],[9.11e+33, [4, 7], false],[16.6e+33, [6, 7], false],[741e+33, [8, 7], false],[1e+36, [20, 10], false],[8.52e+36, [0, 7], false],[61.4e+36, [2, 7], false],[519e+36, [4, 7], false],[3.51e+39, [6, 7], false],[33.3e+39, [8, 7], false],[100e+39, [20, 10], false],[723e+39, [0, 7], false],[4.53e+42, [2, 7], false],[72.1e+42, [4, 7], false],[822e+42, [6, 7], false],[1.55e+45, [8, 7], false],[10e+45, [20, 10], false],[22.2e+45, [0, 7], false],[761e+45, [2, 7], false],[4.11e+48, [4, 7], false],[73.5e+48, [6, 7], false],[455e+48, [8, 7], false],[1e+51, [20, 10], false],[8.96e+51, [0, 7], false],[77.7e+51, [2, 7], false],[911e+51, [4, 7], false],[1.66e+54, [6, 7], false],[74.1e+54, [8, 7], false],[100e+54, [20, 10], false],[852e+54, [0, 7], false],[6.14e+57, [2, 7], false],[51.9e+57, [4, 7], false],[351e+57, [6, 7], false],[3.33e+60, [8, 7], false],[10e+60, [20, 10], false]];
    $scope.newyou.angelUpgrades = [[1e+6, [30, 25], false, false],[2e+6, [31, 20], false, false],[3e+6, [32, 15], false, false],[4e+6, [33, 10], false, false],[5e+6, [34, 5], false, false],[6e+12, [30, 25], false, false],[7e+12, [31, 20], false, false],[8e+12, [32, 15], false, false],[9e+12, [33, 10], false, false],[10e+12, [34, 5], false, false],[11e+18, [30, 25], false, false],[12e+18, [31, 20], false, false],[13e+18, [32, 15], false, false],[140e+18, [33, 10], false, false],[150e+18, [34, 5], false, false],[77e+21, [20, 15], false, false]];
    $scope.newyou.managerUpgrades = [];
    $scope.onepercent.unlocks[0] = [[25, [9, 50]],[50, [11, 40]],[75, [13, 40]],[100, [15, 25]],[150, [19, 1.399992]],[225, [19, 1.399992]],[250, [18, 8]],[600, [18, 2]],[625, [18, 7]],[700, [18, 7]],[830, [18, 7]],[911, [0, 999]],[1000, [18, 2]],[1300, [0, 4]]];
    $scope.onepercent.unlocks[1] = [[24, [3, 2]],[36, [18, 2]],[87, [2, 5]],[115, [3, 5]]];
    $scope.onepercent.unlocks[2] = [[36, [5, 2]],[70, [18, 2]],[125, [4, 2]],[180, [5, 5]]];
    $scope.onepercent.unlocks[3] = [[60, [7, 2]],[100, [18, 2]],[220, [7, 2]],[310, [7, 4]]];
    $scope.onepercent.unlocks[4] = [[260, [8, 5]],[700, [18, 2]],[2550, [18, 3]]];
    $scope.onepercent.unlocks[5] = [[300, [10, 7]],[940, [18, 2]],[2575, [18, 3]]];
    $scope.onepercent.unlocks[6] = [[10, [18, 2]],[300, [12, 10]],[640, [18, 2]],[2585, [18, 3]]];
    $scope.onepercent.unlocks[7] = [[325, [14, 15]],[2600, [18, 3]]];
    $scope.onepercent.unlocks[8] = [[5, [18, 7]],[15, [16, 999]],[40, [16, 7]],[48, [17, 5]],[65, [16, 33]]];
    $scope.onepercent.unlocks[9] = [[1, [19, 4]],[16, [19, 3.500052]],[20, [18, 7]],[25, [18, 7]],[32, [18, 7]],[44, [18, 2]],[53, [18, 7]],[62, [18, 9]],[67, [18, 9]],[72, [18, 9]],[77, [18, 9]]];
    $scope.onepercent.cashUpgrades = [[399.99, [18, 2], false],[799.99, [8, 4], false],[499999.99, [18, 2], false],[999999.99, [10, 8], false],[9999999.99, [18, 2], false],[29999999.99, [12, 16], false],[99999999.99, [18, 2], false],[239999999.99, [14, 32], false],[3999999999.99, [18, 3], false],[29999e+6, [2, 150], false],[29999e+6, [4, 100], false],[29999e+6, [6, 100], false],[139999e+6, [2, 200], false],[139999e+6, [4, 200], false],[139999e+6, [6, 150], false],[499999e+6, [2, 200], false],[499999e+6, [4, 200], false],[499999e+6, [6, 200], false],[99999e+9, [8, 8], false],[599999e+9, [10, 4], false],[1199e+12, [12, 2.5], false],[3499e+12, [10, 3], false],[12499e+12, [12, 1.5], false],[19999e+12, [14, 2], false],[99999e+12, [12, 1.5], false],[299999e+12, [14, 2], false],[499999e+12, [8, 7], false],[4999e+15, [10, 2], false],[19999e+15, [12, 1.5], false],[99999e+15, [16, 9999], false],[15e+20, [2, 5], false],[24999e+17, [4, 5], false],[34999e+17, [6, 5], false],[4999e+24, [14, 3], false],[59999e+24, [12, 3], false],[9999e+27, [10, 3], false],[39999e+27, [8, 3], false],[2999e+30, [6, 3], false],[7999e+30, [4, 3], false],[1999e+33, [0, 999], false],[2999e+33, [2, 3], false],[79999e+36, [18, 3], false],[399999e+39, [18, 5], false],[9999e+42, [16, 5], false],[39999e+42, [0, 3], false],[1999e+45, [14, 3], false],[3999e+45, [2, 2], false],[7999e+45, [4, 2], false],[29999e+45, [6, 2], false],[69999e+45, [8, 13], false],[69999e+48, [10, 18], false],[149999e+48, [12, 19], false]];
    $scope.onepercent.angelUpgrades = [[25000, [18, 5], false, false],[4e+6, [18, 3], false, false],[28e+9, [18, 3], false, false],[3e+14, [18, 3], false, false],[1e+17, [18, 3], false, false],[2e+18, [18, 5], false, false],[2e+21, [18, 5], false, false],[1e+23, [18, 5], false, false],[3e+24, [18, 5], false, false],[4e+27, [18, 9], false, false]];
    $scope.onepercent.managerUpgrades = [];
    $scope.profitabowl.unlocks[0] = [
    [5000,[18,2]],
    [10000,[18,1.5]],
    [20000,[18,1.25]],
    [40000,[18,1.25]],
    [50000,[18,1.25]],
    [60000,[18,1.2]],
    [80000,[18,1.5]],
    [90000,[18,7]],
    [103667,[18,9]],
    ];
    $scope.profitabowl.unlocks[1] = [
    [10,[2,16]],
    [20,[2,200]],
    [30,[2,50]],
    [40,[2,50]],
    [50,[2,40]],
    ];
    $scope.profitabowl.unlocks[2] = [
    [10,[4,10]],
    [20,[4,100]],
    [30,[4,50]],
    [40,[4,40]],
    [50,[4,35]],
    ];
    $scope.profitabowl.unlocks[3] = [
    [10,[6,10]],
    [20,[6,50]],
    [30,[6,40]],
    [40,[6,40]],
    [50,[6,25]],
    ];
    $scope.profitabowl.unlocks[4] = [
    [10,[8,10]],
    [20,[8,20]],
    [30,[8,40]],
    [40,[8,30]],
    [50,[8,25]],
    ];
    $scope.profitabowl.unlocks[5] = [
    [10,[10,3]],
    [20,[10,1.5]],
    [30,[10,25]],
    [40,[10,15]],
    [50,[10,10]],
    ];
    $scope.profitabowl.unlocks[6] = [
    [10,[12,1.25]],
    [20,[12,5]],
    [30,[12,10]],
    [40,[12,10]],
    [50,[12,5]],
    ];
    $scope.profitabowl.unlocks[7] = [
    [3, [16,1.25]],
    [10,[16,1.1]],
    [13,[16,1.1]],
    [17,[16,1.1]],
    [20,[16,1.1]],
    [27,[16,1.1]],
    [30,[16,1.25]],
    [37,[16,1.1]],
    [40,[16,2]],
    [43,[16,1.5]],
    [44,[16,1.25]],
    ];
    $scope.profitabowl.unlocks[8] = [
    [6, [14,1.1]],
    [7, [14,1.1]],
    [10,[14,1.1]],
    [17,[14,1.25]],
    [23,[14,1.5]],
    [29,[14,1.25]],
    [32,[14,1.35]],
    [38,[14,1.2]],
    [44,[14,1.5]],
    [47,[14,2]],
    ];
    $scope.profitabowl.unlocks[9] = [
    //[1,[,]],
    //[5,[,]],
    //[10,[,]],
    //[15,[,]],
    //[25,[,]],
    //[30,[,]],
    //[35,[,]],
    //[40,[,]],
    //[50,[,]],
    //[52,[,]],
    //[60,[,]],
    ];
    $scope.profitabowl.cashUpgrades = [
    [350e6, [18, 18], false],
    [100e9, [18, 9], false],
    [400e18, [18, 3], false],
    [50e24, [18, 3], false],
    [2.5e27, [18, 3], false]
    ];
    $scope.profitabowl.angelUpgrades = [
    [1e6, [0, 52], false, false],
    [10e6, [0, 26], false, false],
    [20e6, [0, 13], false, false],
    [100e6, [0, 6], false, false],
    [700e6, [0, 3], false, false],
    [4e9, [0, 52], false, false],
    [20e9, [0, 18], false, false]
    ];
    $scope.profitabowl.managerUpgrades = [];
    $scope.rain.unlocks[0] = [[100, [0, 25]],[1000, [0, 50]],[2000, [0, 75]],[3000, [0, 100]],[4000, [0, 125]],[5000, [0, 150]],[6000, [0, 175]]];
    $scope.rain.unlocks[1] = [[100, [2, 200]],[600, [2, 225]],[1500, [2, 250]],[3000, [2, 275]]];
    $scope.rain.unlocks[2] = [[60, [4, 25]],[400, [4, 250]],[1200, [4, 2500]],[1800, [4, 25000]]];
    $scope.rain.unlocks[3] = [[50, [6, 25]],[200, [6, 250]],[500, [6, 2500]],[1000, [6, 25000]]];
    $scope.rain.unlocks[4] = [[25, [8, 99]],[100, [8, 99]],[250, [8, 99]],[500, [8, 99]]];
    $scope.rain.unlocks[5] = [[5, [10, 55]],[25, [10, 55]],[75, [10, 55]],[125, [10, 55]],[175, [10, 555]]];
    $scope.rain.unlocks[6] = [[5, [12, 55]],[20, [12, 55]],[60, [12, 55]],[120, [12, 555]]];
    $scope.rain.unlocks[7] = [[5, [14, 55]],[20, [14, 55]],[40, [14, 55]],[80, [14, 555]]];
    $scope.rain.unlocks[8] = [[5, [16, 55]],[15, [16, 55]],[30, [16, 55]],[60, [16, 555]]];
    $scope.rain.unlocks[9] = [[1, [19, 2]],[2, [19, 2]],[3, [19, 2]],[4, [19, 2]],[5, [19, 2]],[7, [19, 2]],[10, [19, 2]],[15, [19, 2]],[20, [18, 7]],[25, [19, 2]],[35, [19, 2]],[45, [19, 2]],[55, [18, 2]]];
    $scope.rain.cashUpgrades = [[3.5e+5, [0, 5], false],[1e+6, [2, 5], false],[2.5e+6, [4, 5], false],[1e+7, [6, 5], false],[2.5e+7, [8, 5], false],[2.5e+9, [10, 5], false],[1e+11, [12, 5], false],[5e+12, [14, 5], false],[1e+13, [16, 5], false],[5e+13, [18, 7], false],[2.5e+14, [0, 5], false],[1e+15, [2, 5], false],[2.5e+15, [4, 5], false],[5e+15, [6, 5], false],[1e+16, [8, 5], false],[5e+16, [10, 5], false],[7.5e+16, [12, 5],false],[5e+17, [14, 5], false],[2.5e+18, [16, 5], false],[1e+19, [18, 9], false],[5e+19, [20, 1], false],[5e+22, [0, 7], false],[1e+23, [2, 7], false],[2e+23, [4, 7], false],[8e+23, [6, 7], false],[3.2e+24, [8, 7], false],[15.1e+24, [10, 7], false],[32.5e+24, [12, 7], false],[56.7e+24, [14, 7], false],[75e+24, [16, 7], false],[100e+24, [18, 8], false], [400e+27, [0, 9], false],[1.6e+30, [2, 9], false],[6.4e+30, [4, 9], false],[12.8e+30, [6, 9], false],[25e+30, [8, 9], false],[88.8e+30, [10, 9], false],[300e+30, [12, 9], false],[2e+33, [14, 9], false],[10e+33, [16, 9], false],[50e+33, [18, 10], false],[1e+36, [0, 11], false],[2e+36, [2, 11], false],[3e+36, [4, 11], false],[4e+36, [6, 11], false],[5e+36, [8, 11], false],[7e+36, [10, 11], false],[8e+36, [12, 11], false],[9e+36, [14, 11], false],[10e+36, [16, 11], false],[100e+36, [18, 12], false],[3.33e+39, [0, 13], false],[6.66e+39, [2, 13], false],[9.99e+39, [4, 13], false],[24e+39, [6, 13], false],[48e+39, [8, 13], false],[128e+39, [10, 13], false],[200e+39, [12, 13], false],[355e+39, [14, 13], false],[500e+39, [16, 13], false],[1e+42, [18, 14], false],[5.555e+45, [0, 15], false],[55.555e+45, [2, 15], false],[555.555e+45, [4, 15], false],[5.555e+48, [6, 15], false],[55.555e+48, [8, 15], false],[5.555e+51, [10, 15], false],[55.555e+51, [12, 15], false],[555.555e+51, [14, 15], false],[5.555e+54, [16, 15], false],[55.555e+54, [18, 16], false]];
    $scope.rain.angelUpgrades = [[654321, [0, 9], false, false],[7e+6, [2, 9], false, false],[8.7e+7, [4, 9], false, false],[9.87e+8, [6, 9], false, false],[1e+9, [8, 9], false, false],[1.21e+11, [10, 9], false, false],[1e+12, [12, 9], false, false],[1.4e+13, [14, 9], false, false],[1.51e+14, [16, 9], false, false],[5.5e+16, [18, 9], false, false],[5.5e+16, [30, 111], false, false],[5.5e+16, [31, 100], false, false],[5.5e+16, [32, 75], false, false],[5.5e+16, [33, 50], false, false],[5.5e+16, [34, 40], false, false],[5.5e+16, [35, 20], false, false],[5.5e+16, [36, 15], false, false],[5.5e+16, [37, 10], false, false],[5.5e+16, [38, 5], false, false],[5.5e+16, [0, 9], false, false],[100e+15, [2, 9], false, false],[1e+18, [4, 9], false, false],[10e+18, [6, 9], false, false],[100e+18, [8, 9], false, false],[10e+21, [10, 9], false, false],[100e+21, [12, 9], false, false],[1e+24, [14, 9], false, false],[10e+24, [16, 9], false, false],[1e+27, [18, 9], false, false]];
    $scope.rain.managerUpgrades = [];
    $scope.saturday.unlocks[0] = [[250, [18, 3.33]],[1111, [18, 5.55]],[2222, [18, 7.77]]];
    $scope.saturday.unlocks[1] = [[200, [18, 3.33]],[600, [18, 5.55]],[1200, [18, 7.77]]];
    $scope.saturday.unlocks[2] = [[200, [18, 3.33]],[400, [18, 5.55]],[650, [18, 7.77]]];
    $scope.saturday.unlocks[3] = [[25, [18, 3.33]],[100, [18, 5.55]],[200, [18, 7.77]]];
    $scope.saturday.unlocks[4] = [[22, [18, 3.33]],[77, [18, 5.55]],[135, [18, 7.77]]];
    $scope.saturday.unlocks[5] = [[22, [18, 3.33]],[77, [18, 5.55]],[111, [18, 7.77]]];
    $scope.saturday.unlocks[6] = [[10, [18, 3.33]],[30, [18, 5.55]],[65, [18, 7.77]]];
    $scope.saturday.unlocks[7] = [[10, [18, 3.33]],[30, [18, 5.55]],[70, [18, 7.77]]];
    $scope.saturday.unlocks[8] = [[15, [18, 3.33]],[40, [18, 5.55]],[65, [18, 7.77]]];
    $scope.saturday.unlocks[9] = [[5, [1, 5]],[10, [3, 5]],[14, [18, 2]],[15, [5, 5]],[20, [7, 5]],[25, [9, 5]],[30, [11, 5]],[35, [13, 5]],[40, [15, 5]],[45, [17, 5]],[50, [1, 5]],[55, [3, 5]],[60, [5, 5]],[65, [7, 5]],[70, [9, 5]],[75, [11, 5]],[80, [13, 5]],[85, [15, 5]],[90, [17, 5]]];
    $scope.saturday.cashUpgrades = [[12345, [0, 2], false], [67890, [2, 2], false], [123456, [4, 2], false], [789012, [6, 2], false], [1234567, [8, 2], false], [8901234, [10, 2], false], [12345678, [12, 2], false], [90123456, [14, 2], false], [123456789, [16, 2], false], [1.234e+9, [18, 3], false], [24.681e+9, [0, 5], false], [369.121e+9, [2, 5], false], [4.812e+12, [4, 5], false], [51.015e+12, [6, 5], false], [612.182e+12, [8, 5], false], [7.142e+15, [10, 5], false], [81.624e+15, [12, 5], false], [918.273e+15, [14, 5], false], [1.02e+18, [16, 5], false], [11.223e+18, [18, 7], false], [111.111e+18, [0, 9], false], [2.222e+21, [2, 9], false], [33.333e+21, [4, 9], false], [444.444e+21, [6, 9], false], [5.555e+24, [8, 9], false], [66.666e+24, [10, 9], false], [777.777e+24, [12, 9], false], [8.888e+27, [14, 9], false], [100e+27, [16, 9], false], [101.01e+27, [18, 11], false], [3.141e+30, [0, 13], false], [50.288e+30, [2, 13], false], [230.781e+30, [4, 13], false], [7.067e+33, [6, 13], false], [55.058e+33, [8, 13], false], [270.193e+33, [10, 13], false], [4.428e+36, [12, 13], false], [16.527e+36, [14, 13], false], [664.821e+36, [16, 13], false], [5.588e+39, [18, 15], false]];
    $scope.saturday.angelUpgrades = [[1111, [18, 3], false, false],[222222, [18, 4], false, false],[33e+6, [18, 4], false, false],[22e+9, [18, 4], false, false],[55e+12, [18, 4], false, false],[77e+15, [18, 4], false, false]];
    $scope.saturday.managerUpgrades = [];
  };
}]);
