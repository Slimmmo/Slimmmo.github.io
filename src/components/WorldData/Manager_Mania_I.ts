import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 0,
	hasMegaTickets: false,
	ignorePlatinumBoost: false,
	investments: [
		{ name: "W.W. Heisenbird", startingNumber: 1, cost: 12, power: 1.09, profit: 2, speed: 1 },
		{ name: "Gus Pollos", startingNumber: 1, cost: 65, power: 1.03, profit: 13, speed: 10 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 0.5, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 0.5, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 4, cost: { price: 200, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 111, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 0.8, cost: { price: 222, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 444, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 0.8, cost: { price: 666, currency: Currency.Levels } }
		],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 6, cost: { price: 1001, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 6, cost: { price: 300001, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 12, cost: { price: 1000001, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 12, cost: { price: 10000001, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 18, cost: { price: 100000001, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 18, cost: { price: 1000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 24, cost: { price: 9000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 24, cost: { price: 80000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 50, cost: { price: 500000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 222, cost: { price: 3000000000000, currency: Currency.Cash } }
	],
	angelUpgrades: [],
	managerUpgrades: []
}
