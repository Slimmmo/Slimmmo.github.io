import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 150,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Lemon Lane", startingNumber: 1, cost: 0.91, power: 1.1, profit: 4, speed: 4 },
		{ name: "Caviar Dots", startingNumber: 0, cost: 20, power: 3, profit: 17, speed: 420 },
		{ name: "Champagne Falls", startingNumber: 0, cost: 30, power: 2, profit: 25, speed: 540 },
		{ name: "Dodo Legs", startingNumber: 0, cost: 50, power: 1.5, profit: 33, speed: 840 },
		{ name: "Endangered Animal Petting Zoo", startingNumber: 0, cost: 100, power: 1.05, profit: 2500, speed: 1200 },
		{ name: "Grey Poupon A Stick", startingNumber: 0, cost: 200, power: 1.05, profit: 5000, speed: 2400 },
		{ name: "Ivory Tower of Terror", startingNumber: 0, cost: 400, power: 1.05, profit: 8000, speed: 3600 },
		{ name: "Stock Market Crash Coaster", startingNumber: 0, cost: 1000, power: 1.05, profit: 10000, speed: 4500 },
		{ name: "Capitalism Hill", startingNumber: 0, cost: 19550717100000, power: 6, profit: 1000000, speed: 25200 }
	],
	unlocks: [
		[
			{ investment: 4, type: UpgradeType.Speed, amount: 50, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 40, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 40, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 25, cost: { price: 100, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 1.399992, cost: { price: 150, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 1.399992, cost: { price: 225, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 250, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 625, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 700, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 830, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 911, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1000, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 4, cost: { price: 1300, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 24, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 87, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 115, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 180, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 60, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 220, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 4, cost: { price: 310, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 260, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2550, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 940, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2575, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 10, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 640, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2585, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 15, cost: { price: 325, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2600, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 999, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 5, cost: { price: 48, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 33, cost: { price: 65, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 4, cost: { price: 1, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 3.500052, cost: { price: 16, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 20, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 25, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 32, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 44, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 53, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 62, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 67, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 72, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 77, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 399.99, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 799.99, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 499999.99, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 999999.99, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9999999.99, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 16, cost: { price: 29999999.99, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 99999999.99, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 32, cost: { price: 239999999.99, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 3999999999.99, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 150, cost: { price: 29999000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 100, cost: { price: 29999000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 100, cost: { price: 29999000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 200, cost: { price: 139999000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 200, cost: { price: 139999000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 150, cost: { price: 139999000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 200, cost: { price: 499999000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 200, cost: { price: 499999000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 200, cost: { price: 499999000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 8, cost: { price: 99999000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 4, cost: { price: 599999000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 2.5, cost: { price: 1199000000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 3499000000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 12499000000000000, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 19999000000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 99999000000000000, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 299999000000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 499999000000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 2, cost: { price: 4999000000000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 19999000000000000000, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 9999, cost: { price: 99999000000000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 1.5e+21, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 2.4999e+21, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 3.4999e+21, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 4.999e+27, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 3, cost: { price: 5.9999e+28, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 9.999e+30, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 3.9999e+31, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 2.999e+33, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 7.999e+33, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 1.999e+36, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 2.999e+36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 7.9999e+40, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 3.99999e+44, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 5, cost: { price: 9.999e+45, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 3.9999e+46, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 1.999e+48, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 3.999e+48, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 7.999e+48, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 2.9999e+49, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 13, cost: { price: 6.9999e+49, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 18, cost: { price: 6.9999e+52, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 19, cost: { price: 1.49999e+53, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 25000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 4000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 28000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 300000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 100000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 2000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 2e+21, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+23, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 3e+24, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 4e+27, currency: Currency.Angels } }
	],
	managerUpgrades: []
}