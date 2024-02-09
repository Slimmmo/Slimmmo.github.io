import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 45,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "XO Skeletons", startingNumber: 1, cost: 12.7181818, power: 1.1, profit: 1.15, speed: 1 },
		{ name: "Cleaning Droids", startingNumber: 0, cost: 333, power: 1.1, profit: 56, speed: 4 },
		{ name: "Spicy Sand Worms", startingNumber: 0, cost: 33333, power: 1.1, profit: 1500, speed: 6 },
		{ name: "Red Shirts", startingNumber: 0, cost: 1962000, power: 1.1, profit: 32370, speed: 8 },
		{ name: "Barf Buckets", startingNumber: 0, cost: 75000000, power: 1.1, profit: 756000, speed: 10 },
		{ name: "Space Gates", startingNumber: 0, cost: 1200000000, power: 1.1, profit: 4200000, speed: 12 },
		{ name: "Calling Cards", startingNumber: 0, cost: 23232323232, power: 1.1, profit: 85000000, speed: 15 },
		{ name: "Bug Spray", startingNumber: 0, cost: 159159159159, power: 1.1, profit: 2500000000, speed: 18 },
		{ name: "Space Buddies", startingNumber: 0, cost: 1964091800000, power: 1.1, profit: 130000000000, speed: 21 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 10, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 13, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 17, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 23, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 29, cost: { price: 225, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 31, cost: { price: 350, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 99, cost: { price: 900, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 11, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 11, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 10, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 9, cost: { price: 400, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 7, cost: { price: 975, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 12, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 30, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 60, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 60, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 99, cost: { price: 1080, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 13, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 13, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 26, cost: { price: 160, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 26, cost: { price: 320, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 750, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 7, cost: { price: 950, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 14, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 14, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 42, cost: { price: 300, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 750, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 975, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 15, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 10, cost: { price: 120, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 21, cost: { price: 280, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 725, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 33, cost: { price: 850, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Profit, amount: 16, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 4, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 4, cost: { price: 250, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 1025, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 17, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 200, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 7, cost: { price: 750, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Profit, amount: 18, cost: { price: 5, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 425, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 42, cost: { price: 666, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 950, currency: Currency.Levels } }
		],
		[
			{ investment: 0, type: UpgradeType.Speed, amount: 2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 10, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 14, cost: { price: 375, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 36, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 30, cost: { price: 475, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 18, cost: { price: 575, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 22, cost: { price: 750, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 26, cost: { price: 800, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 900, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 925, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 975, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 1000, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 111, cost: { price: 5000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 111, cost: { price: 170000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 111, cost: { price: 2000000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 111, cost: { price: 40000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 111, cost: { price: 300000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 111, cost: { price: 2200000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 111, cost: { price: 120000000000000, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 111, cost: { price: 4000000000000000, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 111, cost: { price: 500000000000000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 111, cost: { price: 2.5e+23, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 111, cost: { price: 4.7e+23, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 111, cost: { price: 1.5e+24, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 111, cost: { price: 2.5e+24, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 111, cost: { price: 1.25e+25, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 28, cost: { price: 6e+25, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+26, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 111, cost: { price: 2e+27, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 5e+27, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 13, cost: { price: 6e+30, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 3, cost: { price: 6e+31, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 4e+33, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 20, cost: { price: 8e+36, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 7e+38, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 77, cost: { price: 2e+39, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 999, cost: { price: 3.5e+40, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 10, cost: { price: 4e+43, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 33, cost: { price: 9e+43, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 999, cost: { price: 2.3e+44, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 1.5e+45, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 999, cost: { price: 6e+45, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 7, cost: { price: 3e+46, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 99, cost: { price: 1.4e+47, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 99, cost: { price: 1.6e+48, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 99, cost: { price: 5e+49, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 88, cost: { price: 5e+49, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 5e+49, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 7, cost: { price: 6e+50, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 6e+50, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 4, cost: { price: 6e+50, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 22, cost: { price: 4e+52, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 19, cost: { price: 4e+52, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 4e+52, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 100000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 999, cost: { price: 200000, currency: Currency.Angels } },
		{ investment: 1, type: UpgradeType.Profit, amount: 999, cost: { price: 50000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 2000000000, currency: Currency.Angels } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 6000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 2000000000000, currency: Currency.Angels } },
		{ investment: 3, type: UpgradeType.Profit, amount: 666, cost: { price: 6000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 5000000000000000, currency: Currency.Angels } },
		{ investment: 4, type: UpgradeType.Profit, amount: 99, cost: { price: 15000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 5000000000000000000, currency: Currency.Angels } },
		{ investment: 8, type: UpgradeType.Profit, amount: 999, cost: { price: 10000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 8e+21, currency: Currency.Angels } }
	],
	managerUpgrades: []
}