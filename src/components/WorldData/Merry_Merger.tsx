import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 7,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Brussel Sprout Kids", startingNumber: 1, cost: 18.5152, power: 1.35, profit: 5, speed: 2 },
		{ name: "Stop It", startingNumber: 0, cost: 1250, power: 1.325, profit: 20, speed: 4 },
		{ name: "Etch-A-Cheque", startingNumber: 0, cost: 93733, power: 1.3, profit: 80, speed: 8 },
		{ name: "Baking Bugs", startingNumber: 0, cost: 9373350, power: 1.275, profit: 320, speed: 16 },
		{ name: "Turdy", startingNumber: 0, cost: 1171668750, power: 1.25, profit: 1280, speed: 32 },
		{ name: "House Trap", startingNumber: 0, cost: 175750000000, power: 1.225, profit: 5120, speed: 64 },
		{ name: "Play Dough", startingNumber: 0, cost: 30756300000000, power: 1.2, profit: 20480, speed: 128 },
		{ name: "Trigger Me Millenial", startingNumber: 0, cost: 6151000000000000, power: 1.175, profit: 81920, speed: 256 },
		{ name: "Pet Coal", startingNumber: 0, cost: 1384000000000000000, power: 1.15, profit: 327680, speed: 512 }
	],
	unlocks: [
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 33, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 55, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 9, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 33, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 10, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 9, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 9, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 33, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Profit, amount: 8, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 10, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 2, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 2, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 4, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 12, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 36, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.5, cost: { price: 144, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 3, cost: { price: 360, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 1.333333, cost: { price: 24, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 10.99989, cost: { price: 72, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 4, cost: { price: 168, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 4, cost: { price: 240, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 3.00003, cost: { price: 320, currency: Currency.Levels } },
			{ investment: 4, type: UpgradeType.Speed, amount: 3.00003, cost: { price: 480, currency: Currency.Levels } }
		]
	],
	cashUpgrades: [
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 4000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 250000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 1.5, cost: { price: 5e+21, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 1.5, cost: { price: 9e+23, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 2e+24, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 1.5, cost: { price: 2.9e+25, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 1.5, cost: { price: 5e+25, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 7e+25, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 12, cost: { price: 1.2e+26, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 33, cost: { price: 1.7e+26, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 21, cost: { price: 2.5e+26, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 19, cost: { price: 4e+26, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 1.5, cost: { price: 7e+26, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 1e+27, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 1.8e+27, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 33, cost: { price: 2.9e+27, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 33, cost: { price: 9e+27, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 25, cost: { price: 1e+28, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 33, cost: { price: 1.8e+28, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 25, cost: { price: 3e+28, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 25, cost: { price: 4e+28, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 1.5, cost: { price: 5e+29, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 1.5, cost: { price: 6e+29, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 7e+29, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 6, cost: { price: 9e+29, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 22, cost: { price: 1.1e+30, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 33, cost: { price: 2.9e+30, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 33, cost: { price: 1.9e+31, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 33, cost: { price: 7e+31, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 33, cost: { price: 1.1e+32, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 9, cost: { price: 2.4e+32, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 333, cost: { price: 9e+32, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 22, cost: { price: 5e+36, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 11, cost: { price: 7e+36, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 2.9e+39, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 111, cost: { price: 7e+39, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 3, cost: { price: 6e+42, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1.1e+43, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 2e+45, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2.8e+45, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 4, cost: { price: 5e+49, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 33, cost: { price: 3e+50, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 8e+52, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 1.2e+53, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 33, cost: { price: 1.6e+55, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 9e+55, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3, cost: { price: 2.2e+57, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 3e+57, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 3e+59, currency: Currency.Cash } },
		{ investment: 8, type: UpgradeType.Profit, amount: 3, cost: { price: 4e+60, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 7e+60, currency: Currency.Cash } },
		{ investment: 7, type: UpgradeType.Profit, amount: 4, cost: { price: 7e+61, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 9e+61, currency: Currency.Cash } },
		{ investment: 6, type: UpgradeType.Profit, amount: 7, cost: { price: 7e+62, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 8e+62, currency: Currency.Cash } },
		{ investment: 5, type: UpgradeType.Profit, amount: 5, cost: { price: 9e+63, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+64, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 5e+64, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 7e+64, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 5e+65, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 2.5e+66, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 1.5e+67, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 2.4e+67, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 6, cost: { price: 5e+67, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1.4e+68, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 6, cost: { price: 3e+68, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 7.5, cost: { price: 20, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 2.5, cost: { price: 20000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 8, cost: { price: 200000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 7, cost: { price: 500000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 15, cost: { price: 30000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 15, cost: { price: 80000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 10, cost: { price: 2000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 13, cost: { price: 20000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 8, cost: { price: 3e+21, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 6, cost: { price: 5e+24, currency: Currency.Angels } },
		{ investment: InvestmentEnum.AngelInvestor, type: UpgradeType.AngelEffectiveness, amount: 6, cost: { price: 3e+25, currency: Currency.Angels } }
	],
	managerUpgrades: []
}