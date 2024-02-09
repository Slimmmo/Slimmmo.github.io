import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 45,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Ankle Biters", startingNumber: 1, cost: 2, power: 1.03, profit: 1, speed: 2 },
		{ name: "Babargoyles", startingNumber: 0, cost: 5, power: 1.07, profit: 3, speed: 4 },
		{ name: "Rocky and Stimpson", startingNumber: 0, cost: 10, power: 1.15, profit: 6, speed: 6 },
		{ name: "My Lil Beast Machine", startingNumber: 0, cost: 24, power: 1.35, profit: 10, speed: 8 },
		{ name: "School Bikes from Mars", startingNumber: 0, cost: 50, power: 1.75, profit: 15, speed: 10 },
		{ name: "Captain Plan It", startingNumber: 0, cost: 84, power: 2.2, profit: 21, speed: 12 },
		{ name: "Tick Juice", startingNumber: 0, cost: 126, power: 2.7, profit: 28, speed: 14 },
		{ name: "Teddy Duxpin", startingNumber: 0, cost: 198, power: 3.2, profit: 36, speed: 16 },
		{ name: "Power Rescue Rangers", startingNumber: 0, cost: 272, power: 4, profit: 45, speed: 18 }
	],
	unlocks: [
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 250, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 1111, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 2222, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 200, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 600, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 1200, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 200, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 400, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 650, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 25, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 100, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 200, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 22, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 77, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 135, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 22, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 77, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 111, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 10, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 30, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 65, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 10, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 30, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 70, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3.33, cost: { price: 15, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5.55, cost: { price: 40, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7.77, cost: { price: 65, currency: Currency.Levels } }
		],
		[
			{ investment: 0, type: UpgradeType.Speed, amount: 5, cost: { price: 5, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 10, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 14, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 5, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 5, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 5, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 5, cost: { price: 35, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 5, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 5, cost: { price: 45, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Speed, amount: 5, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Speed, amount: 5, cost: { price: 55, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Speed, amount: 5, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Speed, amount: 5, cost: { price: 65, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 5, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 5, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 5, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 5, cost: { price: 85, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 5, cost: { price: 90, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 12345, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 67890, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 123456, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 789012, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 1234567, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 2, cost: { price: 8901234, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 2, cost: { price: 12345678, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 90123456, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 123456789, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 1234000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 24681000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 369121000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 4812000000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 51015000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 612182000000000, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 5, cost: { price: 7142000000000000, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 5, cost: { price: 81624000000000000, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 5, cost: { price: 918273000000000000, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 5, cost: { price: 1020000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 11223000000000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 9, cost: { price: 111111000000000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 9, cost: { price: 2.222e+21, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 9, cost: { price: 3.3333e+22, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 9, cost: { price: 4.44444e+23, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 9, cost: { price: 5.555e+24, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 9, cost: { price: 6.6666e+25, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 7.77777e+26, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 9, cost: { price: 8.888e+27, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 9, cost: { price: 1e+29, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 11, cost: { price: 1.0101e+29, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 13, cost: { price: 3.141e+30, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 13, cost: { price: 5.0288e+31, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 13, cost: { price: 2.30781e+32, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 13, cost: { price: 7.067e+33, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 13, cost: { price: 5.5058e+34, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 13, cost: { price: 2.70193e+35, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 13, cost: { price: 4.428e+36, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 13, cost: { price: 1.6527e+37, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 13, cost: { price: 6.64821e+38, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 15, cost: { price: 5.588e+39, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 1111, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 222222, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 33000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 22000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 55000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 4, cost: { price: 77000000000000000, currency: Currency.Angels } }
	],
	managerUpgrades: []
}