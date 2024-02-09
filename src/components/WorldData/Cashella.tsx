import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 45,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Food Fighters", startingNumber: 1, cost: 4, power: 1.045, profit: 2, speed: 4 },
		{ name: "L.I.L. Z", startingNumber: 0, cost: 10, power: 1.105, profit: 6, speed: 8 },
		{ name: "Mad At The Corporation", startingNumber: 0, cost: 20, power: 1.225, profit: 12, speed: 12 },
		{ name: "Ali Jupiter", startingNumber: 0, cost: 48, power: 1.525, profit: 20, speed: 16 },
		{ name: "Beyonest", startingNumber: 0, cost: 100, power: 2.125, profit: 30, speed: 20 },
		{ name: "Brethren Songclash", startingNumber: 0, cost: 168, power: 3.3, profit: 42, speed: 24 },
		{ name: "Kenneth Rural", startingNumber: 0, cost: 252, power: 4.05, profit: 56, speed: 28 },
		{ name: "Skrilla", startingNumber: 0, cost: 396, power: 4.8, profit: 72, speed: 32 },
		{ name: "Steel Pantera", startingNumber: 0, cost: 544, power: 6, profit: 90, speed: 36 }
	],
	unlocks: [
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 240, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 1100, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 2200, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 175, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 550, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1100, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 175, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 350, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 600, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 20, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 90, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 175, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 17, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 65, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 115, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 15, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 70, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 99, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 6, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 25, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 55, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 7, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 27, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6.66, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 35, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 55, currency: Currency.Levels } }
		],
		[
			{ investment: 0, type: UpgradeType.Speed, amount: 5, cost: { price: 2, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 17, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 5, cost: { price: 22, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 5, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 5, cost: { price: 35, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 5, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 5, cost: { price: 45, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 5, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 5, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 65, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 5, cost: { price: 71, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 5, cost: { price: 72, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 5, cost: { price: 73, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 5, cost: { price: 74, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 5, cost: { price: 75, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 76, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 77, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 78, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 79, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 80, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 81, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10, cost: { price: 82, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 22345, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 127890, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 243456, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 1569012, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 2464567, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 2, cost: { price: 17801234, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 2, cost: { price: 24691356, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 180246912, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 246913578, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2469000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 49362000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 738243000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 9624000000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 102030000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 1224000000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 5, cost: { price: 14284000000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 5, cost: { price: 163248000000000000, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 5, cost: { price: 1836000000000000000, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 5, cost: { price: 2040000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 22446000000000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 9, cost: { price: 222222000000000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 9, cost: { price: 4.444e+21, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 9, cost: { price: 6.6666e+22, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 9, cost: { price: 8.88888e+23, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 9, cost: { price: 5.555e+24, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 9, cost: { price: 1.3333e+25, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 1.55555e+26, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 9, cost: { price: 1.777e+27, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 9, cost: { price: 2e+28, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 11, cost: { price: 2.0202e+29, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 13, cost: { price: 6.283e+30, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 13, cost: { price: 1.00576e+32, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 13, cost: { price: 4.61563e+32, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 13, cost: { price: 1.4135e+34, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 13, cost: { price: 1.10116e+35, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 13, cost: { price: 5.40387e+35, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 13, cost: { price: 8.857e+36, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 13, cost: { price: 3.3054e+37, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 13, cost: { price: 1.329e+39, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 15, cost: { price: 1.1176e+40, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 1969, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 196900, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 19000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 19000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 19000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 19000000000000000, currency: Currency.Angels } }
	],
	managerUpgrades: []
}