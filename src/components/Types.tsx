export const WorldIndex: Record<string, number> = {
	'Earth': 0,
	'Moon': 1,
	'Mars': 2,
	'A Capitalist Carol': 3,
	'Black & Blue Friday': 4,
	'Cashalot': 5,
	'Cashella': 6,
	'For the Love of Money': 7,
	'Gates of Heck': 8,
	'Insert Coins to Continue': 9,
	'Live Rich and Profit': 10,
	'Live Your Profits': 11,
	'Making It Rain': 12,
	'Manager Mania I': 13,
	'New You Resolutions': 14,
	'Root of All Evil': 15,
	'Saturday Morning Fever': 16,
	'The Excellent AdVenture': 17,
	'1% Land': 18,
	'A Nightmare on Easy Street': 19,
	'Thanks-Gizmo': 20,
	'Merry Merger': 21,
	'Profit-a-Bowl': 22
}

export const Currency = {
	Cash: 0,
	Angels: 1,
	Levels: 2
}

export type Cost = {
	price: number;
	currency: number;
}

export type Manager = { cost10: Cost, cost99: Cost } | { cost25: Cost }

export type Investment = {
	name: string;
	startingNumber: number;
	cost: number;
	power: number;
	profit: number;
	speed: number
}

export const InvestmentEnum = {
	All: -2,
	AngelInvestor: -3 
}

export type Recommendation = {
	investment: number;
	to: number;
	score: number;
	cost: number;
	income: number;
} | {
	upgrade: Upgrade;
	upgIndex: number;
	score: number;
	cost: number;
	income: number;
}

export const UpgradeType = {
	Profit: 0,
	Speed: 1,
	AngelEffectiveness: 2,
	FreeLevels: 3
}

export type Upgrade = {
	world?: number;
	investment: number;
	type: number;
	amount: number;
	cost?: Cost;
}

export interface UpgradeCost {
	cost1: number | null;
	time1: number | null;
	cost10: number | null;
	time10: number | null;
	costBonus: number | null;
	timeBonus: number | null;
	costAll: number | null;
	timeAll: number | null;
}