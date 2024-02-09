import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 300,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Fake Fans", startingNumber: 1, cost: 4.996502448, power: 1.0007, profit: 0.5, speed: 1 },
		{ name: "Million-dollar Dip", startingNumber: 0, cost: 10, power: 3.2, profit: 50, speed: 10 },
		{ name: "Backpack BBQ", startingNumber: 0, cost: 200, power: 3, profit: 350, speed: 15 },
		{ name: "Death D-fine Dining", startingNumber: 0, cost: 5000, power: 2.8, profit: 1650, speed: 20 },
		{ name: "Budget Lite", startingNumber: 0, cost: 150000, power: 2.6, profit: 8000, speed: 30 },
		{ name: "Foam Stiff-arms", startingNumber: 0, cost: 10000000, power: 2.4, profit: 5000000, speed: 35 },
		{ name: "Skybox Seating", startingNumber: 0, cost: 500000000, power: 2.2, profit: 69000000, speed: 40 },
		{ name: "Hypno-ads", startingNumber: 0, cost: 400000000000, power: 2.1, profit: 8000000000, speed: 60 },
		{ name: "Designer Uniforms", startingNumber: 0, cost: 400000000000, power: 2, profit: 12000000000, speed: 60 }
	],
	unlocks: [
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 5000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 10000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.25, cost: { price: 20000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.25, cost: { price: 40000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.25, cost: { price: 50000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.2, cost: { price: 60000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 80000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 90000, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 103667, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 16, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 200, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 50, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 50, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 40, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 10, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 100, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 50, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 40, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 35, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 10, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 50, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 40, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 40, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 25, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 10, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 20, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 40, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 30, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 25, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.5, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 25, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 15, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 10, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Profit, amount: 1.25, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 5, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 10, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 10, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 5, cost: { price: 50, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Profit, amount: 1.25, cost: { price: 3, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 13, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 17, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 27, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.25, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.1, cost: { price: 37, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.5, cost: { price: 43, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.25, cost: { price: 44, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 1.1, cost: { price: 6, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.1, cost: { price: 7, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.1, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.25, cost: { price: 17, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 23, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.25, cost: { price: 29, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.35, cost: { price: 32, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 38, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 44, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 47, currency: Currency.Levels } }
		],
		[]
	],
	cashUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 18, cost: { price: 350000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 100000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 400000000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 5e+25, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2.5e+27, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 52, cost: { price: 1000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 26, cost: { price: 10000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 13, cost: { price: 20000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 6, cost: { price: 100000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 700000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 52, cost: { price: 4000000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.Profit, amount: 18, cost: { price: 20000000000, currency: Currency.Angels } }
	],
	managerUpgrades: []
}
