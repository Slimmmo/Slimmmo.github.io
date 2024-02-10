import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 150,
	hasMegaTickets: true,
	ignorePlatinumBoost: false,
	investments: [
		{ name: "Door Crashers", startingNumber: 1, cost: 10, power: 1.75, profit: 1, speed: 5 },
		{ name: "Power Tools", startingNumber: 1, cost: 20, power: 2, profit: 3, speed: 8 },
		{ name: "Waffle Irons", startingNumber: 1, cost: 30, power: 2.25, profit: 5, speed: 11 },
		{ name: "Blu-Ray Players", startingNumber: 1, cost: 40, power: 2.5, profit: 7, speed: 14 },
		{ name: "Coupon Clippers", startingNumber: 1, cost: 50, power: 2.75, profit: 21, speed: 17 },
		{ name: "Microwaves", startingNumber: 1, cost: 120, power: 3, profit: 60, speed: 20 },
		{ name: "Kitchen Gadgets", startingNumber: 1, cost: 200, power: 3.5, profit: 145, speed: 35 },
		{ name: "Trample-ines", startingNumber: 1, cost: 280, power: 4, profit: 270, speed: 45 },
		{ name: "Sucky Vacuums", startingNumber: 1, cost: 500, power: 4.5, profit: 525, speed: 60 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 7, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 9, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 11, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 12, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 300, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 6, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 8, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 10, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 12, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 13, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 250, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 9, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 11, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 13, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 14, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 200, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 6, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 8, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 10, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 12, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 14, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 15, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 6, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 6, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 6, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 6, cost: { price: 175, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 9, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 11, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 13, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 15, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 16, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 175, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 10, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 12, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 14, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 16, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 17, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 8, cost: { price: 150, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 11, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 13, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 15, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 17, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 18, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 125, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 10, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 12, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 14, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 16, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 18, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 19, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 10, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 10, cost: { price: 125, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Profit, amount: 11, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 13, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 15, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 17, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 19, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 20, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 11, cost: { price: 100, currency: Currency.Levels } }
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
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 100000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 10000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 6, cost: { price: 1000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 100000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 8, cost: { price: 10000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 1000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10, cost: { price: 100000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 11, cost: { price: 1000000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 12, cost: { price: 1e+21, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 13, cost: { price: 1e+24, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 14, cost: { price: 1e+27, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 15, cost: { price: 1e+30, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 16, cost: { price: 1e+33, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 17, cost: { price: 1e+36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 18, cost: { price: 1e+39, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 19, cost: { price: 1e+42, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 20, cost: { price: 1e+46, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 21, cost: { price: 1e+50, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 22, cost: { price: 1e+54, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 23, cost: { price: 1e+59, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 24, cost: { price: 1e+65, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 25, cost: { price: 1e+81, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 26, cost: { price: 1e+84, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 27, cost: { price: 1e+87, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 28, cost: { price: 1e+90, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 29, cost: { price: 1e+93, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 30, cost: { price: 1e+96, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 31, cost: { price: 1e+99, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 32, cost: { price: 1e+102, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 33, cost: { price: 1e+105, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 34, cost: { price: 1e+108, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 2, cost: { price: 10000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 3, cost: { price: 10000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 4, cost: { price: 10000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 5, cost: { price: 1e+26, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 16, cost: { price: 1e+33, currency: Currency.Angels } }
	],
	managerUpgrades: []
}