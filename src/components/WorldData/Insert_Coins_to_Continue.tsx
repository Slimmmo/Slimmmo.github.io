import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 90,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Explosive Dude", startingNumber: 1, cost: 2.5, power: 1.75, profit: 0.25, speed: 5 },
		{ name: "Silver Blade", startingNumber: 1, cost: 5, power: 2, profit: 0.75, speed: 8 },
		{ name: "Primate Paradise", startingNumber: 1, cost: 7.5, power: 2.25, profit: 1.25, speed: 11 },
		{ name: "Flemmings", startingNumber: 1, cost: 10, power: 2.5, profit: 1.75, speed: 14 },
		{ name: "Fightingfrogs", startingNumber: 1, cost: 12.5, power: 2.75, profit: 5.25, speed: 17 },
		{ name: "Crow & Jack", startingNumber: 1, cost: 30, power: 3, profit: 15, speed: 20 },
		{ name: "Street Skid 2", startingNumber: 1, cost: 50, power: 3.5, profit: 36.25, speed: 35 },
		{ name: "Rad Cap", startingNumber: 1, cost: 70, power: 4, profit: 67.5, speed: 45 },
		{ name: "Space Worm Ted", startingNumber: 1, cost: 125, power: 4.5, profit: 131.25, speed: 60 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 4, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 6, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 8, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 10, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 11, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 300, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 7, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 9, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 11, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 12, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 245, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 6, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 8, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 10, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 12, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 13, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 200, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 7, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 9, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 11, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 13, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 14, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 175, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 8, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 10, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 12, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 14, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 15, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 170, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 9, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 11, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 13, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 15, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 16, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 7, cost: { price: 150, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Profit, amount: 8, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 10, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 12, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 14, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 16, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 17, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 8, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 8, cost: { price: 125, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 9, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 11, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 13, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 15, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 17, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 18, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 9, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 9, cost: { price: 120, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Profit, amount: 10, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 12, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 14, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 16, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 18, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 19, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 10, cost: { price: 100, currency: Currency.Levels } }
		],
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 50, cost: { price: 6, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 50, cost: { price: 12, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 50, cost: { price: 18, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 50, cost: { price: 24, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 50, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 50, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 50, cost: { price: 42, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 50, cost: { price: 48, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 50, cost: { price: 54, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 60, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 50, cost: { price: 75, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 50, cost: { price: 100, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 25700, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 268000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 279000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 281000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 292000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 303000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 314000000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.25e+22, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.36e+24, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.47e+27, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.58e+30, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.69e+33, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.71e+36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.82e+39, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 3.93e+42, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.04e+45, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.15e+48, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.26e+51, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.37e+54, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.48e+57, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13.37, cost: { price: 4.59e+60, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 1, cost: { price: 250000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 2, cost: { price: 270000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 3, cost: { price: 29000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 4, cost: { price: 3e+24, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 5, cost: { price: 3.3e+28, currency: Currency.Angels } }
	],
	managerUpgrades: []
}