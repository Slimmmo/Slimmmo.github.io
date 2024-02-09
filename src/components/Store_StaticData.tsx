import { create } from 'zustand'
import Earth from './WorldData/Earth'

import { Investment, InvestmentEnum, Manager, Upgrade, UpgradeType, WorldIndex } from './Types'
import { getWorldData } from './Helpers';

interface StaticData {
	staticData: {
		angelScale: number;
		hasMegaTickets: boolean;
		ignorePlatinumBoost: boolean;
		investments: Investment[],
		unlocks: Upgrade[][],
		cashUpgrades: Upgrade[],
		angelUpgrades: Upgrade[],
		managerUpgrades: Manager[]
	};
	suits: {
		Blue: Upgrade,
		Gold: Upgrade,
		Green: Upgrade,
		Red: Upgrade,
		Teal: Upgrade,
		White: Upgrade
	};
	platinumBoosts: number[];
	superBadges: { name: string, upgrade: Upgrade }[],
	changeStaticData: (val: string) => void;
	getPlatinumBoost: (index: number) => number;
}

const staticDataStore = create<StaticData>(set => ({
	staticData: Earth,
	suits: {
		Blue: { investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 3 },
		Gold: { investment: InvestmentEnum.All, type: UpgradeType.Profit, amount: 2 },
		Green: { investment: InvestmentEnum.AngelInvestor, type: UpgradeType.Profit, amount: 10 },
		Red: { investment: InvestmentEnum.AngelInvestor, type: UpgradeType.Profit, amount: 2 },
		Teal: { investment: InvestmentEnum.AngelInvestor, type: UpgradeType.Profit, amount: 30 },
		White: { investment: InvestmentEnum.All, type: UpgradeType.Speed, amount: 2 }
	},
	platinumBoosts: [
		17.77,
		77.77,
		777.77,
		7777.77
	],
	superBadges: [
		{ name: 'Basket Case', upgrade: { world: WorldIndex.Earth, investment: 3, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Buy-It Shield', upgrade: { world: WorldIndex.Earth, investment: 1, type: UpgradeType.Profit, amount: 30 }},
		{ name: 'Candy Canes', upgrade: { world: WorldIndex.Earth, investment: 5, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Burger', upgrade: { world: WorldIndex.Earth, investment: 6, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Unicorn', upgrade: { world: WorldIndex.Earth, investment: 8, type: UpgradeType.Profit, amount: 15 }},
		{ name: 'Rainbow Machine', upgrade: { world: WorldIndex.Moon, investment: 0, type: UpgradeType.Profit, amount: 30 }},
		{ name: 'Villain Mask', upgrade: { world: WorldIndex.Moon, investment: 3, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Space Buddies', upgrade: { world: WorldIndex.Moon, investment: 4, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Silver Blade', upgrade: { world: WorldIndex.Moon, investment: 6, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Speaker', upgrade: { world: WorldIndex.Moon, investment: 8, type: UpgradeType.Profit, amount: 15 }},
		{ name: 'Boxing Bear', upgrade: { world: WorldIndex.Mars, investment: 4, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Time Machine', upgrade: { world: WorldIndex.Mars, investment: 7, type: UpgradeType.Profit, amount: 15 }},
		{ name: 'Bonbon', upgrade: { world: WorldIndex.Earth, investment: 0, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Kitchen Gadget', upgrade: { world: WorldIndex.Earth, investment: 2, type: UpgradeType.Profit, amount: 30 }},
		{ name: 'Fuzzee', upgrade: { world: WorldIndex.Earth, investment: 4, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Pro-Team Shake', upgrade: { world: WorldIndex.Earth, investment: 7, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Cupid', upgrade: { world: WorldIndex.Earth, investment: 9, type: UpgradeType.Profit, amount: 15 }},
		{ name: 'Bunny Ears', upgrade: { world: WorldIndex.Moon, investment: 1, type: UpgradeType.Profit, amount: 30 }},
		{ name: 'Hero Mask', upgrade: { world: WorldIndex.Moon, investment: 2, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'XO Skeleton', upgrade: { world: WorldIndex.Moon, investment: 5, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Drums', upgrade: { world: WorldIndex.Moon, investment: 9, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'MXC', upgrade: { world: WorldIndex.Mars, investment: 1, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Cereal', upgrade: { world: WorldIndex.Moon, investment: 7, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Capitalism Hill', upgrade: { world: WorldIndex.Mars, investment: 3, type: UpgradeType.Profit, amount: 15 }},
		{ name: 'Haunted Mansion', upgrade: { world: WorldIndex.Mars, investment: 2, type: UpgradeType.Profit, amount: 20 }},
		{ name: 'Fi-doo 3000', upgrade: { world: WorldIndex.Mars, investment: 0, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Turdy', upgrade: { world: WorldIndex.Mars, investment: 5, type: UpgradeType.Profit, amount: 25 }},
		{ name: 'Budget Light', upgrade: { world: WorldIndex.Mars, investment: 8, type: UpgradeType.Profit, amount: 15 }}
	],

	changeStaticData: (val) => set(() => {
		let data = getWorldData(val)
		if (data === null) return { selectedWorld: 'Earth', staticData: Earth }
		return { staticData: data }
	}),

	getPlatinumBoost: (index) => {
		let retVal = 0
		const sdPlatinumBoosts = staticDataStore.getState().platinumBoosts
		if (index < sdPlatinumBoosts.length) {
			retVal = sdPlatinumBoosts[index]
		}
		return retVal
	}
}))

export default staticDataStore