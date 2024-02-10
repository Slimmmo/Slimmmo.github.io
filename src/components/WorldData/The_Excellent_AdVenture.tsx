import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 90,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Dino Shock Collars", startingNumber: 1, cost: 2.75, power: 1.75, profit: 0.5, speed: 5 },
		{ name: "Pyramid Cranes", startingNumber: 1, cost: 5.75, power: 2, profit: 1.5, speed: 8 },
		{ name: "7 Blade Viking Razors", startingNumber: 1, cost: 8.75, power: 2.25, profit: 2.5, speed: 11 },
		{ name: "Horse GPS", startingNumber: 1, cost: 11.75, power: 2.5, profit: 3.5, speed: 14 },
		{ name: "Medieval Soap on a Rope", startingNumber: 1, cost: 17.75, power: 2.75, profit: 10.5, speed: 17 },
		{ name: "Camel AC Units", startingNumber: 1, cost: 45, power: 3, profit: 30, speed: 20 },
		{ name: "Sabretooth Litterboxes", startingNumber: 1, cost: 86.25, power: 3.5, profit: 72.5, speed: 35 },
		{ name: "Bubonic Mouse Traps", startingNumber: 1, cost: 137.5, power: 4, profit: 135, speed: 45 },
		{ name: "Pirate Ship Outboard", startingNumber: 1, cost: 256.25, power: 4.5, profit: 262.5, speed: 60 }
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
			{ investment: 4, type: UpgradeType.Profit, amount: 6, cost: { price: 160, currency: Currency.Levels } }
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
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 25000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20.15, cost: { price: 270000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.26, cost: { price: 280000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19.85, cost: { price: 280000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 290000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20.15, cost: { price: 300000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.26, cost: { price: 315000000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19.85, cost: { price: 3.25e+22, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 3.4e+24, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20.15, cost: { price: 3.5e+27, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.26, cost: { price: 3.6e+30, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19.85, cost: { price: 3.7e+33, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 3.7e+36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20.15, cost: { price: 3.8e+39, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.26, cost: { price: 3.9e+42, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19.85, cost: { price: 4.05e+45, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 4.15e+48, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20.15, cost: { price: 4.25e+51, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.26, cost: { price: 4.35e+54, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19.85, cost: { price: 4.5e+57, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10.21, cost: { price: 4.6e+60, currency: Currency.Cash } }
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