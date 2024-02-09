from decimal import *
import re, sys
parseObj = {}
parsing = 0
planets = ['earth', 'moon', 'mars']
regexObj = {}

def checkLine(line):
	checkArr = ['angelAccumulation', 'managers', 'unlocks', 'upgrades', 'venture']
	for idx, check in enumerate(checkArr):
		if regexObj[check].match(line):
			return idx + 1
	return 0

def formatOutput(name, line):
	return '$scope.' + planet + '.' + name + ' = ' + line + ';\n'

def loadRegexes():
	regexObj['angelAccumulation'] = re.compile('.*?base\.angelAccumulationRate = ([^;]*?);')
	regexObj['assign'] = re.compile('([^\s]+) = (.*),?$')
	regexObj['genericClose'] = re.compile('.*?};')
	regexObj['managers'] = re.compile('.*? = new AccountantManager {')
	regexObj['reward'] = re.compile('.*?new UnlockReward(?:Every)?Venture([^\(]+)\((?:"([^,]+)", )?([^\)]+)')
	regexObj['unlocks'] = re.compile('.*? = new (?:Single|Every)VentureUnlock {')
	regexObj['upgrades'] = re.compile('.*? = new (?:AI|BuyVentures|Everything|Venture)Upgrade {')
	regexObj['venture'] = re.compile('.*? = new Venture {')

def manageClose(obj):
	global parsing
	if parsing == 1:
		temp = str(Decimal(regexObj['angelAccumulation'].findall(obj)[0]) * 150)
		parseObj['angelScale'] = formatOutput('angelScale', removeDecimal(temp))
	elif parsing == 2:
		if 'managers' not in parseObj:
			parseObj['managers'] = {}
		if obj['ventureName'] not in parseObj['managers']:
			parseObj['managers'][obj['ventureName']] = []
		parseObj['managers'][obj['ventureName']].append('[' + removeDecimal(obj['cost']) + ', false]')
	elif parsing == 3:
		if 'unlocks' not in parseObj:
			parseObj['unlocks'] = {}
		if 'ventureName' not in obj:
			obj['ventureName'] = 'Every'
		if obj['ventureName'] not in parseObj['unlocks']:
			parseObj['unlocks'][obj['ventureName']] = []
		reward = regexObj['reward'].findall(obj['Reward'])[0]
		mul = str(1 / Decimal(reward[len(reward) - 1][:-1])) if reward[2][-1:] == 'f' else reward[len(reward) - 1]
		busIndex = parseObj['businessID'].index(reward[1]) if obj['ventureName'] != 'Every' else len(parseObj['businessID'])
		index = busIndex * 2 if reward[0] == 'ProfitPer' else (busIndex * 2) + 1
		parseObj['unlocks'][obj['ventureName']].append('[' + str(unHex(obj['amountToEarn'])) + ', [' + str(index) + ', ' + removeDecimal(mul) + ']]')
	elif parsing == 4:
		endString = ', false]'
		if 'currency' in obj and obj['currency'] == 'Upgrade.Currency.angelInvestors':
			if 'angelUpgrades' not in parseObj:
				parseObj['angelUpgrades'] = []
			endString = ', false' + endString
			pointer = parseObj['angelUpgrades']
		else:
			if 'cashUpgrades' not in parseObj:
				parseObj['cashUpgrades'] = []
			pointer = parseObj['cashUpgrades']
		if 'ventureName' not in obj:
			obj['ventureName'] = 'Every'
		busIndex = parseObj['businessName'].index(obj['ventureName']) if obj['ventureName'] != 'Every' else (len(parseObj['businessName']) if 'effectivenessAmount' not in obj else len(parseObj['businessName']) + 1)
		index = busIndex * 2 if 'purchaseAmount' not in obj else busIndex + 30
		mul = obj['profitBonus'] if 'profitBonus' in obj else obj['purchaseAmount'] if 'purchaseAmount' in obj else removeDecimal(str(Decimal(obj['effectivenessAmount']) * 100))
		pointer.append('[' + removeDecimal(obj['cost']) + ', [' + str(index) + ', ' + removeDecimal(str(unHex(mul))) + ']' + endString)
	elif parsing == 5:
		nameArr = ['baseAmount', 'costPer', 'cooldownTime', 'expenseRate', 'name', 'profitPer']
		if 'businessName' not in parseObj:
			parseObj['businessName'] = []
			parseObj['businessID'] = []
		parseObj['businessName'].append(obj['name'])
		parseObj['businessID'].append(obj['id'])
		if 'baseAmount' not in obj:
			obj['baseAmount'] = '0'
		for idx, val in enumerate(nameArr):
			if val not in parseObj:
				parseObj[val] = []
			parseObj[val].append(removeDecimal(obj[val]))
	parsing = 0

def normalizeObj():
	simpleConversion = [['baseCost', 'costPer'], ['basePower', 'expenseRate'], ['baseProfit', 'profitPer'], ['baseSpeed', 'cooldownTime']]
	for tup in simpleConversion:
		parseObj[tup[0]] = formatOutput(tup[0], '[' + ', '.join(parseObj[tup[1]]) + ']')
	temp = []
	for idx, val in enumerate(parseObj['name']):
		temp.append('  [\'' + val + '\', ' + parseObj['baseAmount'][idx] + ', false, 0, 0, 0, 0]')
	parseObj['investments'] = formatOutput('investments', '[\n' + ',\n'.join(temp) + '\n]')
	temp = []
	for idx, val in enumerate(parseObj['businessName']):
		temp.append(formatOutput('unlocks[' + str(idx) + ']', '[' + ','.join(parseObj['unlocks'][val]) + ']'))
	temp.append(formatOutput('unlocks[' + str(len(parseObj['businessName'])) + ']', '[' + ','.join(parseObj['unlocks']['Every']) + ']'))
	parseObj['unlocks'] = ''.join(temp)
	simpleConversion = ['cashUpgrades', 'angelUpgrades']
	for name in simpleConversion:
		parseObj[name] = formatOutput(name, '[' + ','.join(parseObj[name]) + ']')
	temp = []
	if 'managers' in parseObj:
		for v in parseObj['businessName']:
			temp.append('[' + ','.join(parseObj['managers'][v]) + ']')
		parseObj['managers'] = ','.join(temp)
	else:
		parseObj['managers'] = ''
	parseObj['managers'] = formatOutput('managerUpgrades', '[' + parseObj['managers'] + ']')

def removeDecimal(line):
	temp = line.rstrip('0')
	return temp[:-1] if temp[-1:] == '.' else line

def unHex(num):
	if num[:2] == '0x':
		return int(num, 16)
	return num

def writeObj():
	writeOrder = ['angelScale', 'baseCost', 'basePower', 'baseProfit', 'baseSpeed', 'investments', 'unlocks', 'cashUpgrades', 'angelUpgrades', 'managers']
	for w in writeOrder:
		o.write(parseObj[w])

loadRegexes()
if len(sys.argv) == 2:
	planets.append(sys.argv[1])
o = open('GameState_Out.txt', 'w')
for planet in planets:
	parseObj = {}
	f = open('GameState_' + planet.capitalize() + '.txt', 'r')
	for line in f:
		if not parsing:
			parsing = checkLine(line)
			tempObj = {}
			if parsing == 1:
				manageClose(line)
		else:
			if regexObj['genericClose'].match(line):
				manageClose(tempObj)
			else:
				temp = regexObj['assign'].findall(line)[0]
				tempObj[temp[0]] = temp[1].rstrip(',\r').strip('"').replace("'", "\'");
	f.close()
	normalizeObj()
	writeObj()
o.close()