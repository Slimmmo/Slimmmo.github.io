import { create, StoreApi, UseBoundStore } from 'zustand'
import Earth from './WorldData/Earth'
import staticDataStore from './Store_StaticData'
import userDataStore, { recUserDataStore, UserData } from './Store_UserData'
import { InvestmentEnum, Recommendation, Upgrade, UpgradeCost, UpgradeType, WorldIndex } from './Types'

interface CalcData {
	inputData: UseBoundStore<StoreApi<UserData>>;
	angelEffectiveness: number;
	totalIncome: number;
	investments: { cycleIncome: number; cycleTime: number }[];
	upgradeCost: UpgradeCost[];
	angelNotification: boolean;
	angelUpgrades: (number | null)[];
	suitNotification: boolean;
	suits: Record<string, (number | null)>;
	superBadgeNotification: boolean;
	superBadges: (number | null)[];
	recTable: Recommendation[];
	applyUpgrade: (investments: { cycleIncome: number, cycleTime: number}[], angelEffectiveness: number, upgrade: Upgrade) => [ { cycleIncome: number, cycleTime: number}[], number ];
	calcUpgradeCost: (investmentIndex: number, nUnlocks: number | null) => number | null;
	calcUpgradeCostAll: () => number | null;
	setAngelNotification: (val: boolean) => void;
	setAngelUpgrades: (vals: (number | null)[]) => void;
	setRecTable: (table: Recommendation[]) => void;
	setSuitNotification: (val: boolean) => void;
	setSuits: (vals: Record<string, (number | null)>) => void;
	setSuperBadgeNotification: (val: boolean) => void;
	setSuperBadges: (vals: (number | null)[]) => void;
	getDifferenceNBonus: (investmentIndex: number, nBonus: number) => number | null;
	getNextPositiveUnlock: (investmentIndex: number) => number | null;
	calculate: () => void;
	reset: () => void;
	setInputData: (store: UseBoundStore<StoreApi<UserData>>) => void;
}

const calcStoreDefinition = (
	set: (
		partial: CalcData | Partial<CalcData> | ((state: CalcData) => CalcData | Partial<CalcData>), replace?: boolean | undefined
	) => void,
	get: () => CalcData
) => ({
	inputData: userDataStore,
	angelEffectiveness: 2,
	totalIncome: 0,
	investments: Array.from({ length: Earth.investments.length }, () => ({ cycleIncome: 0, cycleTime: 0 })),
	upgradeCost: Array.from({ length: Earth.investments.length }, () => ({
		cost1: 0,
		time1: 0,
		cost10: 0,
		time10: 0,
		costBonus: 0,
		timeBonus: 0,
		costAll: 0,
		timeAll: 0
	})),
	angelNotification: false,
	angelUpgrades: new Array(Earth.angelUpgrades.length).fill(0),
	suitNotification: false,
	suits: {
		Blue: 0,
		Gold: 0,
		Green: 0,
		Red: 0,
		Teal: 0,
		White: 0
	},
	superBadgeNotification: false,
	superBadges: new Array(staticDataStore.getState().superBadges.length).fill(0),
	recTable: [],

	applyUpgrade: (investments, angelEffectiveness, upgrade) => {
		if ('world' in upgrade && upgrade.world !== WorldIndex[userDataStore.getState().selectedWorld]) return [ investments, angelEffectiveness ]
		let start = upgrade.investment, end = upgrade.investment + 1
		if (upgrade.investment === InvestmentEnum.All) {
			start = 0
			end = investments.length
		}
		for (let i = start; i < end; i++) {
			if (upgrade.type === UpgradeType.Profit) {
				investments[i].cycleIncome *= upgrade.amount
			} else if (upgrade.type === UpgradeType.Speed) {
				investments[i].cycleTime /= upgrade.amount
			}
		}
		if (upgrade.type === UpgradeType.AngelEffectiveness) {
			angelEffectiveness += upgrade.amount
		}
		return [ investments, angelEffectiveness ]
	},
	calcUpgradeCost: (investmentIndex, nUnlocks) => {
		if (nUnlocks === null) return null
		const userData = get().inputData.getState()
		let fromLevel = userData.investments[investmentIndex].number
		if (fromLevel === '') return null
		const staticData = staticDataStore.getState().staticData
		let retVal = 1, managerDiscount = 1
		for (let i = 1; i < nUnlocks; i++) {
			retVal += Math.pow(staticData.investments[investmentIndex].power, i)
		}
		if (investmentIndex === 0 && WorldIndex[userDataStore.getState().selectedWorld] === WorldIndex.Earth) {
			fromLevel -= 1
		}
		for (let i = 0; i < staticData.angelUpgrades.length; i++) {
			if (userData.angelUpgradesBought[i]) {
				if (staticData.angelUpgrades[i].type === UpgradeType.FreeLevels && staticData.angelUpgrades[i].investment === investmentIndex) {
					fromLevel -= staticData.angelUpgrades[i].amount
				}
			}
		}
		if (staticData.managerUpgrades.length !== 0) {
			for (let i = 0; i < userData.managersBought[investmentIndex].length; i++) {
				if (userData.managersBought[investmentIndex][i]) {
					if (WorldIndex[userDataStore.getState().selectedWorld] === WorldIndex.Earth) {
						if (i === 0) {
							managerDiscount = 0.9
						} else {
							managerDiscount *= 0.00001
						}
					} else {
						managerDiscount = 0.75
					}
				}
			}
		}
		return retVal * staticData.investments[investmentIndex].cost * Math.pow(staticData.investments[investmentIndex].power, fromLevel) * managerDiscount
	},
	calcUpgradeCostAll: () => {
		const userData = get().inputData.getState(),
		staticDataUnlocks = staticDataStore.getState().staticData.unlocks
		let lowestLevel = userData.investments[0].number === '' ? Infinity : userData.investments[0].number, retVal = 0
		for (let i = 0; i < userData.investments.length; i++) {
			let num = userData.investments[i].number
			if (num === '') return null
			if (num < lowestLevel) {
				lowestLevel = num
			}
		}
		let i = 0
		while (i < staticDataUnlocks[staticDataUnlocks.length - 1].length && lowestLevel >= (staticDataUnlocks[staticDataUnlocks.length - 1][i].cost?.price || Infinity)) {
			i++
		}
		let unlockLevel = staticDataUnlocks[staticDataUnlocks.length - 1][i].cost?.price || 0
		if (unlockLevel === 0) return 0
		if (i !== staticDataUnlocks[staticDataUnlocks.length - 1].length) {
			for (let j = 0; j < userData.investments.length; j++) {
				let num = userData.investments[j].number
				if (num === '') return null
				if (num < unlockLevel) {
					retVal += get().calcUpgradeCost(j, unlockLevel - num) ?? 0
				}
			}
		}
		return retVal
	},
	getDifferenceNBonus(investmentIndex, nBonus) {
		const sdUnlocks = staticDataStore.getState().staticData.unlocks
		const uiInvestments = get().inputData.getState().investments
		for (let i = 0; i < sdUnlocks[investmentIndex].length; i++) {
			if ((uiInvestments[investmentIndex].number === '' ? Infinity : +uiInvestments[investmentIndex].number) < (sdUnlocks[investmentIndex][i].cost?.price ?? Infinity)) {
				return (sdUnlocks[investmentIndex][Math.min(i + nBonus - 1, sdUnlocks[investmentIndex].length - 1)].cost?.price ?? Infinity) - (uiInvestments[investmentIndex].number === '' ? Infinity : +uiInvestments[investmentIndex].number)
			}
		}
		return null
	},
	getNextPositiveUnlock(investmentIndex) {
		const sdUnlocks = staticDataStore.getState().staticData.unlocks
		const uiInvestments = userDataStore.getState().investments
		let retVal = 0
		for (let i = 0; i < sdUnlocks[investmentIndex].length; i++) {
			if ((uiInvestments[investmentIndex].number === '' ? Infinity : +uiInvestments[investmentIndex].number) <= (sdUnlocks[investmentIndex][i].cost?.price ?? 0)) {
			retVal++
			if (sdUnlocks[investmentIndex][i].amount > 1) {
				return retVal
			}
			}
		}
		return null
	},
	calculate: () => set(state => {
		const sdInvestments = staticDataStore.getState().staticData.investments,
		sdIgnorePlatinumBoost = staticDataStore.getState().staticData.ignorePlatinumBoost,
		userState = get().inputData.getState(),
		staticData = staticDataStore.getState()
		let calcTotalIncome = 0,
		calcInvestments = Array.from({ length: sdInvestments.length }, () => ({ cycleIncome: 0, cycleTime: 0 })),
		highestSharedLevel = userState.investments[0].number === '' ? 0 : +userState.investments[0].number,
		calcAngelEffectiveness = 2 + (userState.boughtSuitName === 'Red' ? staticData.suits.Red.amount : 0) + (userState.boughtSuitName === 'Green' ? staticData.suits.Green.amount : 0) + (userState.boughtSuitName === 'Teal' ? staticData.suits.Teal.amount : 0),
		calcUpgradeCost: UpgradeCost[] = Array.from({ length: sdInvestments.length }, () => ({
			cost1: 0,
			time1: 0,
			cost10: 0,
			time10: 0,
			costBonus: 0,
			timeBonus: 0,
			costAll: 0,
			timeAll: 0
		}))
		for (let i = 0; i < userState.investments.length; i++) {
			if ((userState.investments[i].number === '' ? 0 : +userState.investments[i].number) < highestSharedLevel) {
				highestSharedLevel = userState.investments[i].number === '' ? 0 : +userState.investments[i].number
			}
			calcInvestments[i].cycleIncome = (userState.investments[i].number === '' ? 0 : +userState.investments[i].number) * sdInvestments[i].profit
			if ((userState.triples === '' ? 0 : userState.triples) > 0 || userState.bonusMultiplier > 0 || userState.boughtSuitName === 'Gold' || userState.boughtSuitName === 'Blue') {
				calcInvestments[i].cycleIncome *= (3 * (userState.triples === '' ? 0 : userState.triples)) + userState.bonusMultiplier + (userState.boughtSuitName === 'Gold' ? staticData.suits.Gold.amount : 0) + (userState.boughtSuitName === 'Blue' ? staticData.suits.Blue.amount : 0);
			}
			if (userState.investments[i].megaTicket) {
				calcInvestments[i].cycleIncome *= sdIgnorePlatinumBoost ? 7.77 : staticData.getPlatinumBoost(userState.boughtPlatinumBoostIndex)
			}
			calcInvestments[i].cycleTime = sdInvestments[i].speed
			if ((userState.flux === '' ? 0 : userState.flux) > 0) {
				calcInvestments[i].cycleTime /= (1 + (userState.flux === '' ? 0 : userState.flux) * 1.21)
			}
			if (userState.boughtSuitName === 'White') {
				calcInvestments[i].cycleTime /= staticData.suits.White.amount
			}
			calcUpgradeCost[i].cost1 = state.calcUpgradeCost(i, 1)
			calcUpgradeCost[i].cost10 = state.calcUpgradeCost(i, 10)
			calcUpgradeCost[i].costBonus = state.calcUpgradeCost(i, state.getDifferenceNBonus(i, 1))
			calcUpgradeCost[i].costAll = state.calcUpgradeCostAll()
		}
		for (let i = 0; i < userState.cashUpgradesBought.length; i++) {
			if (userState.cashUpgradesBought[i]) {
				[ calcInvestments, calcAngelEffectiveness ] = state.applyUpgrade(calcInvestments, calcAngelEffectiveness, staticData.staticData.cashUpgrades[i])
			}
		}
		if (userState.boughtSuperBadgeIndex !== null) {
			[ calcInvestments, calcAngelEffectiveness ] = state.applyUpgrade(calcInvestments, calcAngelEffectiveness, staticData.superBadges[userState.boughtSuperBadgeIndex].upgrade)
		}
		for (let i = 0; i < userState.angelUpgradesBought.length; i++) {
			if (userState.angelUpgradesBought[i]) {
				[ calcInvestments, calcAngelEffectiveness ] = state.applyUpgrade(calcInvestments, calcAngelEffectiveness, staticData.staticData.angelUpgrades[i])
			}
		}
		for (let i = 0; i < sdInvestments.length; i++) {
			for (let j = 0; j < staticData.staticData.unlocks[i].length; j++) {
				if ((userState.investments[i].number === '' ? 0 : +userState.investments[i].number) >= (staticData.staticData.unlocks[i][j].cost?.price || Infinity)) {
					[ calcInvestments, calcAngelEffectiveness ] = state.applyUpgrade(calcInvestments, calcAngelEffectiveness, staticData.staticData.unlocks[i][j])
				}
			}
		}
		for (let j = 0; j < staticData.staticData.unlocks[staticData.staticData.unlocks.length - 1].length; j++) {
			if (highestSharedLevel >= (staticData.staticData.unlocks[staticData.staticData.unlocks.length - 1][j].cost?.price ?? Infinity)) {
				[ calcInvestments, calcAngelEffectiveness ] = state.applyUpgrade(calcInvestments, calcAngelEffectiveness, staticData.staticData.unlocks[staticData.staticData.unlocks.length - 1][j])
			}
		}
		if (userState.bonusAngelEffectiveness > 0) {
			calcAngelEffectiveness += userState.bonusAngelEffectiveness
		}
		for (let i = 0; i < calcInvestments.length; i++) {
			calcInvestments[i].cycleIncome *= 1 + (calcAngelEffectiveness * userState.numAngels / 100)
			calcTotalIncome += calcInvestments[i].cycleIncome / calcInvestments[i].cycleTime
		}
		for (let i = 0; i < calcUpgradeCost.length; i++) {
			calcUpgradeCost[i].time1 = calcUpgradeCost[i].cost1 === null ? null : (calcUpgradeCost[i].cost1 ?? 0 / calcTotalIncome)
			calcUpgradeCost[i].time10 = calcUpgradeCost[i].cost10 === null ? null : (calcUpgradeCost[i].cost10 ?? 0 / calcTotalIncome)
			calcUpgradeCost[i].timeBonus = calcUpgradeCost[i].costBonus === null ? null : (calcUpgradeCost[i].costBonus ?? 0 / calcTotalIncome)
			calcUpgradeCost[i].timeAll = calcUpgradeCost[i].costAll === null ? null : (calcUpgradeCost[i].costAll ?? 0 / calcTotalIncome)
		}
		userState.incNumCalculates()
		return {
			angelEffectiveness: calcAngelEffectiveness,
			totalIncome: calcTotalIncome,
			investments: calcInvestments,
			upgradeCost: calcUpgradeCost
		}
	}),
	setAngelNotification: (val) => set(() => ({ angelNotification: val })),
	setAngelUpgrades: (vals) => set(() => ({ angelUpgrades: vals })),
	setRecTable: (table) => set(() => ({ recTable: table })),
	setSuitNotification: (val) => set(() => ({ suitNotification: val })),
	setSuits: (vals) => set(() => ({ suits: vals })),
	setSuperBadgeNotification: (val) => set(() => ({ superBadgeNotification: val })),
	setSuperBadges: (vals) => set(() => ({ superBadges: vals })),
	reset: () => set(() => ({
		angelEffectiveness: 2,
		totalIncome: 0,
		investments: Array.from({ length: staticDataStore.getState().staticData.investments.length }, () => ({ cycleIncome: 0, cycleTime: 0 })),
		upgradeCost: Array.from({ length: staticDataStore.getState().staticData.investments.length }, () => ({
			cost1: 0,
			time1: 0,
			cost10: 0,
			time10: 0,
			costBonus: 0,
			timeBonus: 0,
			costAll: 0,
			timeAll: 0
		})),
		angelNotification: false,
		angelUpgrades: new Array(staticDataStore.getState().staticData.angelUpgrades.length).fill(0),
		suitNotification: false,
		suits: {
			Blue: 0,
			Gold: 0,
			Green: 0,
			Red: 0,
			Teal: 0,
			White: 0
		},
		superBadgeNotification: false,
		superBadges: new Array(staticDataStore.getState().superBadges.length).fill(0),
		recTable: []
	})),
	setInputData: (store) => set(() => ({ inputData: store }))
} as CalcData);

const calcDataStore = create<CalcData>(calcStoreDefinition);
export default calcDataStore;
export const recCalcDataStore = create<CalcData>(calcStoreDefinition);
recCalcDataStore.getState().setInputData(recUserDataStore);