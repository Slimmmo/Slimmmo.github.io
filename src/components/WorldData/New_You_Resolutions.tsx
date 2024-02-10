import { Currency, InvestmentEnum, UpgradeType } from '../Types'

export default {
	angelScale: 45,
	hasMegaTickets: true,
	ignorePlatinumBoost: true,
	investments: [
		{ name: "Shred-mill", startingNumber: 1, cost: 120, power: 1.45, profit: 600, speed: 30 },
		{ name: "Pro-Team Shakes", startingNumber: 0, cost: 1080, power: 1.7, profit: 3600, speed: 45 },
		{ name: "Tae Kwon Do-Flex", startingNumber: 0, cost: 7680, power: 1.95, profit: 19200, speed: 60 },
		{ name: "Dum Dum-Bells", startingNumber: 0, cost: 48000, power: 2.9, profit: 96000, speed: 75 },
		{ name: "Veggies", startingNumber: 0, cost: 276480, power: 5.9, profit: 460800, speed: 90 },
		{ name: "Com-Fy Boys", startingNumber: 1, cost: 9, power: 1.08, profit: 3, speed: 3 },
		{ name: "Soda-licious", startingNumber: 0, cost: 48, power: 1.13, profit: 12, speed: 6 },
		{ name: "Vid-Yah Games", startingNumber: 0, cost: 315, power: 1.17, profit: 63, speed: 9 },
		{ name: "Macro Chips", startingNumber: 0, cost: 792, power: 1.21, profit: 132, speed: 12 },
		{ name: "Mystery Meat", startingNumber: 0, cost: 2310, power: 1.25, profit: 330, speed: 15 }
	],
	unlocks: [
		[
			{ investment: 0, type: UpgradeType.Profit, amount: 199, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 199, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 199, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 199, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 99, cost: { price: 225, currency: Currency.Levels } },
			{ investment: 0, type: UpgradeType.Profit, amount: 99, cost: { price: 250, currency: Currency.Levels } }
		],
		[
			{ investment: 1, type: UpgradeType.Profit, amount: 199, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 199, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 199, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 120, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 199, cost: { price: 140, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 160, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 99, cost: { price: 180, currency: Currency.Levels } },
			{ investment: 1, type: UpgradeType.Profit, amount: 99, cost: { price: 200, currency: Currency.Levels } }
		],
		[
			{ investment: 2, type: UpgradeType.Profit, amount: 199, cost: { price: 15, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 199, cost: { price: 45, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 199, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 90, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 199, cost: { price: 105, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 120, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 99, cost: { price: 135, currency: Currency.Levels } },
			{ investment: 2, type: UpgradeType.Profit, amount: 99, cost: { price: 150, currency: Currency.Levels } }
		],
		[
			{ investment: 3, type: UpgradeType.Profit, amount: 199, cost: { price: 10, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 20, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 199, cost: { price: 30, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 40, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 199, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 60, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 199, cost: { price: 70, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 80, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 99, cost: { price: 90, currency: Currency.Levels } },
			{ investment: 3, type: UpgradeType.Profit, amount: 99, cost: { price: 100, currency: Currency.Levels } }
		],
		[
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 5, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 10, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 15, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 20, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 30, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 35, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 40, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 45, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 50, currency: Currency.Levels } },
			{ investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2, cost: { price: 55, currency: Currency.Levels } }
		],
		[
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 0.83333333, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 650, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 800, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 900, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 1000, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1100, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 1200, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1300, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 1400, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1500, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Speed, amount: 2, cost: { price: 1600, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1700, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 20, cost: { price: 1800, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1900, currency: Currency.Levels } },
			{ investment: 5, type: UpgradeType.Profit, amount: 333, cost: { price: 2000, currency: Currency.Levels } }
		],
		[
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 25, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 25, cost: { price: 475, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 625, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 25, cost: { price: 775, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 850, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Speed, amount: 2, cost: { price: 925, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1000, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 25, cost: { price: 1075, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 1.2, cost: { price: 1150, currency: Currency.Levels } },
			{ investment: 6, type: UpgradeType.Profit, amount: 444, cost: { price: 1250, currency: Currency.Levels } }
		],
		[
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 30, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 30, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 30, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 650, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 30, cost: { price: 750, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 800, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Speed, amount: 2, cost: { price: 850, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 1.2, cost: { price: 900, currency: Currency.Levels } },
			{ investment: 7, type: UpgradeType.Profit, amount: 555, cost: { price: 1000, currency: Currency.Levels } }
		],
		[
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 35, cost: { price: 135, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 35, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 35, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Speed, amount: 2, cost: { price: 650, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 1.2, cost: { price: 700, currency: Currency.Levels } },
			{ investment: 8, type: UpgradeType.Profit, amount: 666, cost: { price: 750, currency: Currency.Levels } }
		],
		[
			{ investment: 9, type: UpgradeType.Profit, amount: 9, cost: { price: 25, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 50, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 75, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 100, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 40, cost: { price: 125, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 150, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 175, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 200, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 40, cost: { price: 225, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 250, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 275, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 300, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 40, cost: { price: 325, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 350, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 375, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 400, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 40, cost: { price: 425, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 450, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 475, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 500, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 40, cost: { price: 525, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 550, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Speed, amount: 2, cost: { price: 575, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 1.2, cost: { price: 600, currency: Currency.Levels } },
			{ investment: 9, type: UpgradeType.Profit, amount: 777, cost: { price: 650, currency: Currency.Levels } }
		],
		[]
	],
	cashUpgrades: [
		{ investment: 0, type: UpgradeType.Profit, amount: 49, cost: { price: 3000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 49, cost: { price: 24000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 49, cost: { price: 192000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 49, cost: { price: 1536000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 49, cost: { price: 12288000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 30, cost: { price: 100000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 447456000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 1769000000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 21233000000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 254803000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 4076000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10, cost: { price: 10000000000000000, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 4, cost: { price: 65200000000000000, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 4, cost: { price: 104000000000000000, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 4, cost: { price: 4320000000000000000, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 4, cost: { price: 96300000000000000000, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 4, cost: { price: 321000000000000000000, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+21, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 2.23e+21, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 4.53e+22, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 7.21e+23, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 8.22e+24, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 1.55e+25, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+26, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 2.22e+26, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 7.61e+27, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 4.11e+28, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 7.35e+29, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 4.45e+30, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+31, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 8.96e+31, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 7.77e+32, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 9.11e+33, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 1.66e+34, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 7.41e+35, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+36, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 8.52e+36, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 6.14e+37, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 5.19e+38, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 3.51e+39, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 3.33e+40, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 5, cost: { price: 1e+41, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 7.23e+41, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 4.53e+42, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 7.21e+43, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 8.22e+44, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 1.55e+45, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+46, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 2, cost: { price: 2.22e+46, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 2, cost: { price: 7.61e+47, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 2, cost: { price: 4.11e+48, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 2, cost: { price: 7.35e+49, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 2, cost: { price: 4.55e+50, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2, cost: { price: 1e+51, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 3, cost: { price: 8.96e+51, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 3, cost: { price: 7.77e+52, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 3, cost: { price: 9.11e+53, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 3, cost: { price: 1.66e+54, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 3, cost: { price: 7.41e+55, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 7, cost: { price: 1e+56, currency: Currency.Cash } },
		{ investment: 0, type: UpgradeType.Profit, amount: 5, cost: { price: 8.52e+56, currency: Currency.Cash } },
		{ investment: 1, type: UpgradeType.Profit, amount: 5, cost: { price: 6.14e+57, currency: Currency.Cash } },
		{ investment: 2, type: UpgradeType.Profit, amount: 5, cost: { price: 5.19e+58, currency: Currency.Cash } },
		{ investment: 3, type: UpgradeType.Profit, amount: 5, cost: { price: 3.51e+59, currency: Currency.Cash } },
		{ investment: 4, type: UpgradeType.Profit, amount: 5, cost: { price: 3.33e+60, currency: Currency.Cash } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 10, cost: { price: 1e+61, currency: Currency.Cash } }
	],
	angelUpgrades: [
		{ investment: 0, type: UpgradeType.FreeLevels, amount: 25, cost: { price: 1000000, currency: Currency.Angels } },
		{ investment: 1, type: UpgradeType.FreeLevels, amount: 20, cost: { price: 2000000, currency: Currency.Angels } },
		{ investment: 2, type: UpgradeType.FreeLevels, amount: 15, cost: { price: 3000000, currency: Currency.Angels } },
		{ investment: 3, type: UpgradeType.FreeLevels, amount: 10, cost: { price: 4000000, currency: Currency.Angels } },
		{ investment: 4, type: UpgradeType.FreeLevels, amount: 5, cost: { price: 5000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.FreeLevels, amount: 25, cost: { price: 6000000000000, currency: Currency.Angels } },
		{ investment: 1, type: UpgradeType.FreeLevels, amount: 20, cost: { price: 7000000000000, currency: Currency.Angels } },
		{ investment: 2, type: UpgradeType.FreeLevels, amount: 15, cost: { price: 8000000000000, currency: Currency.Angels } },
		{ investment: 3, type: UpgradeType.FreeLevels, amount: 10, cost: { price: 9000000000000, currency: Currency.Angels } },
		{ investment: 4, type: UpgradeType.FreeLevels, amount: 5, cost: { price: 10000000000000, currency: Currency.Angels } },
		{ investment: 0, type: UpgradeType.FreeLevels, amount: 25, cost: { price: 11000000000000000000, currency: Currency.Angels } },
		{ investment: 1, type: UpgradeType.FreeLevels, amount: 20, cost: { price: 12000000000000000000, currency: Currency.Angels } },
		{ investment: 2, type: UpgradeType.FreeLevels, amount: 15, cost: { price: 13000000000000000000, currency: Currency.Angels } },
		{ investment: 3, type: UpgradeType.FreeLevels, amount: 10, cost: { price: 140000000000000000000, currency: Currency.Angels } },
		{ investment: 4, type: UpgradeType.FreeLevels, amount: 5, cost: { price: 150000000000000000000, currency: Currency.Angels } },
		{ investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 50, cost: { price: 7e+22, currency: Currency.Angels } }
	],
	managerUpgrades: []
}