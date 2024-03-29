import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 0.375,
	hasMegaTickets: false,
	ignorePlatinumBoost: false,
	investments: [
		{ name: "Pimp Thy Steed", startingNumber: 1, cost: 30, power: 1.1, profit: 10, speed: 2 },
		{ name: "Tapestry Selfie Booth", startingNumber: 0, cost: 30000, power: 1.1, profit: 1000, speed: 3 },
		{ name: "Serf Surfing", startingNumber: 0, cost: 200000, power: 1.1, profit: 20000, speed: 4 },
		{ name: "Wyvernry", startingNumber: 0, cost: 9000000000, power: 1.1, profit: 40000000, speed: 5 },
		{ name: "Unicorn Jousting", startingNumber: 0, cost: 35000000000, power: 1.1, profit: 2500000000, speed: 6 },
		{ name: "Armor Bedazzling Shoppes", startingNumber: 0, cost: 1200000000000, power: 1.1, profit: 16000000000, speed: 7 },
		{ name: "Centaur Rides", startingNumber: 0, cost: 250000000000000, power: 1.1, profit: 17500000000000, speed: 9 },
		{ name: "Dragon Races", startingNumber: 0, cost: 144000000000000000, power: 1.1, profit: 75000000000000000, speed: 10 },
		{ name: "Killer Rabbit Show", startingNumber: 0, cost: 110000000000000000000, power: 1.1, profit: 425000000000000000, speed: 12 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 11, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 125, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 777, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 825, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 1160, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 12, cost: { price: 1212, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1525, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 2.5, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 6666, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 7777, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 8888, cost: { price: 600, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 9999, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 12, cost: { price: 777, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 4444, cost: { price: 1075, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1300, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 11, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 7, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 4444, cost: { price: 256, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 5555, cost: { price: 368, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 6666, cost: { price: 512, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 7777, cost: { price: 640, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 55, cost: { price: 777, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 1111, cost: { price: 1040, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 66, cost: { price: 1135, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1400, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1475, currency: Currency.Levels } }
		],
		[
			{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 2222, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 3333, cost: { price: 325, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 4444, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 5555, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 123, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 333, cost: { price: 900, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1305, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1414, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Profit, amount: 2, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 5, cost: { price: 45, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 1111, cost: { price: 225, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 2222, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 3333, cost: { price: 475, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 333, cost: { price: 685, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 111, cost: { price: 860, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 168, cost: { price: 1024, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1212, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1380, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Profit, amount: 9, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 17, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 777, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 888, cost: { price: 325, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 999, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 999, cost: { price: 666, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 66, cost: { price: 800, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1212, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1375, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 2.5, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 6666, cost: { price: 275, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 9999, cost: { price: 325, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 4444, cost: { price: 625, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 36, cost: { price: 740, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 666, cost: { price: 950, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1212, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1333, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Profit, amount: 2.5, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 4, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 40, cost: { price: 185, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 80, cost: { price: 225, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 9999, cost: { price: 585, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 15, cost: { price: 650, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1050, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1175, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Profit, amount: 15, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 2, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 5, cost: { price: 575, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 825, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 4, cost: { price: 950, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1066, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1125, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1225, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 333, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 700, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 4, cost: { price: 875, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 4, cost: { price: 925, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 10000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 8, cost: { price: 100000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 12, cost: { price: 250000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+24, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 5e+26, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 4.2e+30, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 2.1e+32, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9e+35, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 2.5e+38, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1.3e+40, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 3.2e+42, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1.1e+45, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+47, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9e+48, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 6e+60, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 1.2e+62, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 5e+62, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 1.5e+63, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 7, cost: { price: 6e+63, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 2.5e+64, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 7.5e+64, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 2e+65, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 8e+65, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 7, cost: { price: 2e+66, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 5e+66, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 7, cost: { price: 2.5e+67, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 9e+67, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 7, cost: { price: 5e+68, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 7, cost: { price: 2.2e+69, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 7, cost: { price: 2.5e+70, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 3.5e+71, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 2, cost: { price: 2000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 3, cost: { price: 5000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 5, cost: { price: 30000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 10, cost: { price: 2000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 12, cost: { price: 20000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 25, cost: { price: 700000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 16, cost: { price: 1e+24, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 25, cost: { price: 3e+26, currency: Currency.Angels } }
	],
	managerUpgrades: []
}