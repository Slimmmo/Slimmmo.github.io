import { create } from 'zustand'
import Earth from './WorldData/Earth'
import staticDataStore from './Store_StaticData'
import { getWorldData, legacyPlanetNameConverter } from './Helpers';

interface LegacyWorldSave {
	levels: { [key: string]: number };
	numAngels: number;
	upgradeIndexUpTo: number;
	upgradeIndexBonus: number[];
	angelUpgradeIndexUpTo: number;
	angelUpgradeIndexBonus: number[];
	managersBought: number[];
	noSingles: boolean;
	noTens: boolean;
	noHundreds: boolean;
	platinumboost: number;
	suit: number;
	badge: number;
	triples: number;
	flux: number;
	bonusAngelEffectiveness: number;
	bonusMultiplier: number;
	megaTicket: number[];
}
interface LegacySaveFile {
	[key: string]: LegacyWorldSave
}
interface LoadableUserData {
	investments: { number: number | ''; megaTicket: boolean }[];
	cashUpgradesBought: boolean[];
	angelUpgradesBought: boolean[];
	managersBought: boolean[][];
	boughtSuitName: string | null;
	boughtPlatinumBoostIndex: number;
	boughtSuperBadgeIndex: number | null;
	triples: number | '';
	bonusMultiplier: number;
	bonusAngelEffectiveness: number;
	flux: number | '';
	numAngels: number;
}
interface SaveFile {
	[key: string]: LoadableUserData
}
export interface UserData extends LoadableUserData {
	selectedWorld: string;
	setSelectedWorld: (val: string) => void;
	numCalculates: number;
	numLoads: number;
	incNumLoads: () => void;
	incNumCalculates: () => void;
	changeInvestments: (index: number, number: number | '', mega: boolean | null) => void;
	allMegaTickets: boolean;
	changeAllMegaTickets: (val: boolean) => void;
	changeCashUpgradesBought: (index: number, val: boolean, buyBefore: boolean, clearAfter: boolean) => void;
	changeAngelUpgradesBought: (index: number, val: boolean, buyBefore: boolean, clearAfter: boolean) => void;
	changeManagersBought: (index: number, managerIndex: number, val: boolean, all10: boolean | null, all99: boolean | null) => void;
	changeBoughtSuitName: (name: string | null) => void;
	changeBoughtPlatinumBoostIndex: (index: number) => void;
	changeBoughtSuperBadgeIndex: (index: number) => void;
	changeTriples: (val: number | '') => void;
	changeBonusMultiplier: (val: number | '') => void;
	changeBonusAngelEffectiveness: (val: number | '') => void;
	changeFlux: (val: number | '') => void;
	changeNumAngels: (val: number) => void;
	init: () => void;
	reset: () => void;
	resetExtra: () => void;
	saveData: () => LoadableUserData;
	saveLocal: () => void;
	planetOverride: (data: LoadableUserData) => void;
	loadPlanet: (planetName: string) => void;
	loadSaveFile: (data: SaveFile | LegacySaveFile) => void;
}
const userStoreDefinition = (
	set: (
		partial: UserData | Partial<UserData> | ((state: UserData) => UserData | Partial<UserData>), replace?: boolean | undefined
	) => void,
	get: () => UserData
) => ({
	selectedWorld: 'Earth',
	setSelectedWorld: (val) => set(() => ({ selectedWorld: val })),

	numCalculates: 0,
	incNumCalculates: () => set(state => ({ numCalculates: state.numCalculates + 1 })),

	numLoads: 0,
	incNumLoads: () => set(state => ({ numLoads: state.numLoads + 1 })),

	investments: Array.from({ length: Earth.investments.length }, () => ({ number: 0, megaTicket: false })),
	changeInvestments: (index, number, mega) => set(state => {
		const newInv = [...state.investments]
		newInv[index] = { number: number, megaTicket: mega === null ? newInv[index].megaTicket : mega }
		return { investments: newInv, allMegaTickets: newInv.every(obj => obj.megaTicket) }
	}),

	allMegaTickets: false,
	changeAllMegaTickets: (val) => set(state => {
		const newInv = [...state.investments]
		for (let i = 0; i < newInv.length; i++) {
			newInv[i] = { number: newInv[i].number, megaTicket: val }
		}
		return { investments: newInv, allMegaTickets: val }
	}),

	cashUpgradesBought: [],
	changeCashUpgradesBought: (index, val, buyBefore, clearAfter) => set(state => {
		const newCash = [...state.cashUpgradesBought]
		if (buyBefore && val) {
			for (let i = 0; i <= index; i++) {
				newCash[i] = true
			}
		} else if (clearAfter && !val) {
			for (let i = index; i < newCash.length; i++) {
				newCash[i] = false
			}
		} else {
			newCash[index] = val
		}
		return { cashUpgradesBought: newCash }
	}),

	angelUpgradesBought: [],
	changeAngelUpgradesBought: (index, val, buyBefore, clearAfter) => set(state => {
		const newAngels = [...state.angelUpgradesBought]
		if (buyBefore && val) {
			for (let i = 0; i <= index; i++) {
				newAngels[i] = true
			}
		} else if (clearAfter && !val) {
			for (let i = index; i < newAngels.length; i++) {
				newAngels[i] = false
			}
		} else {
			newAngels[index] = val
		}
		return { angelUpgradesBought: newAngels }
	}),

	managersBought: [],
	changeManagersBought: (index, managerIndex, val, all10, all99) => set(state => {
		const newManagers = [...state.managersBought]
		if (all10 !== null) {
			for (let i = 0; i < newManagers.length; i++) {
				newManagers[i][0] = all10
			}
		} else if (all99 !== null) {
			for (let i = 0; i < newManagers.length; i++) {
				newManagers[i][1] = all99
			}
		} else {
			newManagers[index][managerIndex] = val
		}
		return { managersBought: newManagers }
	}),

	boughtSuitName: null,
	changeBoughtSuitName: (name) => set(state => ({ boughtSuitName: name === state.boughtSuitName ? null : name })),

	boughtPlatinumBoostIndex: 0,
	changeBoughtPlatinumBoostIndex: (index) => set(() => ({ boughtPlatinumBoostIndex: index })),

	boughtSuperBadgeIndex: null,
	changeBoughtSuperBadgeIndex: (index) => set(state => ({ boughtSuperBadgeIndex: index === state.boughtSuperBadgeIndex ? null : index })),

	triples: 0,
	changeTriples: (val) => set(() => ({ triples: val })),

	bonusMultiplier: 0,
	changeBonusMultiplier: (val) => set(() => ({ bonusMultiplier: val === '' ? 0 : val })),

	bonusAngelEffectiveness: 0,
	changeBonusAngelEffectiveness: (val) => set(() => ({ bonusAngelEffectiveness: val === '' ? 0 : val })),

	flux: 0,
	changeFlux: (val) => set(() => ({ flux: val })),

	numAngels: 0,
	changeNumAngels: (val) => set(() => ({ numAngels: val })),

	init: () => {
		let data = localStorage.getItem('planets2')
		if (data !== null) {
			get().loadSaveFile(JSON.parse(data) as SaveFile)
			return
		}
		data = localStorage.getItem('planets')
		if (data !== null) {
			get().loadSaveFile(JSON.parse(data) as LegacySaveFile)
			localStorage.removeItem('planets')
			return
		}
		get().reset()
	},

	reset: () => set(() => {
		const newInv = []
		const sdInvestments = staticDataStore.getState().staticData.investments
		const sdAngelUpgrades = staticDataStore.getState().staticData.angelUpgrades
		const sdCashUpgrades = staticDataStore.getState().staticData.cashUpgrades
		const sdManagers = staticDataStore.getState().staticData.managerUpgrades
		for (let i = 0; i < sdInvestments.length; i++) {
			newInv[i] = { number: sdInvestments[i].startingNumber, megaTicket: false }
		}
		return {
			investments: newInv,
			cashUpgradesBought: new Array(sdCashUpgrades.length).fill(false),
			angelUpgradesBought: new Array(sdAngelUpgrades.length).fill(false),
			managersBought: Array.from({ length: sdManagers.length }, () => ([ false, false ])),
			bonusMultiplier: 0,
			bonusAngelEffectiveness: 0
		}
	}),

	resetExtra: () => set(() => ({ flux: 0, boughtPlatinumboostIndex: 0, triples: 0, numAngels: 0 })),

	saveData: () => ({
		investments: get().investments,
		cashUpgradesBought: get().cashUpgradesBought,
		angelUpgradesBought: get().angelUpgradesBought,
		managersBought: get().managersBought,
		boughtSuitName: get().boughtSuitName,
		boughtPlatinumBoostIndex: get().boughtPlatinumBoostIndex,
		boughtSuperBadgeIndex: get().boughtSuperBadgeIndex,
		triples: get().triples,
		bonusMultiplier: get().bonusMultiplier,
		bonusAngelEffectiveness: get().bonusAngelEffectiveness,
		flux: get().flux,
		numAngels: get().numAngels
	}),
	saveLocal: () => {
		let state = JSON.parse(localStorage.getItem('planets2') || '{}')
		state[get().selectedWorld] = get().saveData()
		localStorage.setItem('planets2', JSON.stringify(state))
	},
	planetOverride: data => set(() => data),
	loadPlanet: planetName => {
		let data = JSON.parse(localStorage.getItem('planets2') || '{}') as SaveFile
		if (!(planetName in data)) {
			get().reset()
			return
		}
		set(() => data[planetName])
	},
	loadSaveFile: data => {
		let isLegacySaveFile = false
		for (let key in data) {
			if ('upgradeIndexUpTo' in data[key]) {
				isLegacySaveFile = true
			}
			break
		}
		if (!isLegacySaveFile) {
			localStorage.setItem('planets2', JSON.stringify(data))
			get().loadPlanet(get().selectedWorld)
		} else {
			let pObj: Record<string, LoadableUserData> = {}
			for (let planetName in data) {
				const input = (data as LegacySaveFile)[planetName]
				planetName = legacyPlanetNameConverter(planetName)
				let planetData = getWorldData(planetName)
				if (planetData === null) continue
				pObj[planetName] = { 
					investments: [],
					cashUpgradesBought: new Array(planetData.cashUpgrades.length).fill(false),
					angelUpgradesBought: new Array(planetData.angelUpgrades.length).fill(false),
					managersBought: Array.from({ length: planetData.managerUpgrades.length }, () => ([ false, false ])),
					boughtSuitName: null,
					boughtPlatinumBoostIndex: 0,
					boughtSuperBadgeIndex: null,
					triples: 0,
					bonusMultiplier: 0,
					bonusAngelEffectiveness: 0,
					flux: 0,
					numAngels: 0
				}
				for (let key in input.levels) {
					pObj[planetName].investments.push({ number: input.levels[key], megaTicket: input.megaTicket.indexOf(pObj[planetName].investments.length) !== -1 })
				}
				for (let i = 0; i < input.upgradeIndexUpTo; i++) {
					pObj[planetName].cashUpgradesBought[i] = true
				}
				for (let i = 0; i < input.upgradeIndexBonus.length; i++) {
					pObj[planetName].cashUpgradesBought[input.upgradeIndexBonus[i]] = true
				}
				for (let i = 0; i < input.angelUpgradeIndexUpTo; i++) {
					pObj[planetName].angelUpgradesBought[i] = true
				}
				for (let i = 0; i < input.angelUpgradeIndexBonus.length; i++) {
					pObj[planetName].angelUpgradesBought[input.angelUpgradeIndexBonus[i]] = true
				}
				for (let i = 0; i < input.managersBought.length; i++) {
					pObj[planetName].managersBought[Math.floor(input.managersBought[i] / 2)][input.managersBought[i] % 2] = true
				}
				pObj[planetName].boughtPlatinumBoostIndex = [17.77, 77.77, 777.77, 7777.77].indexOf(input.platinumboost)
				pObj[planetName].boughtSuitName = ["Blue", "Gold", "Green", "Red", "Teal", "White"][input.suit]
				pObj[planetName].boughtSuperBadgeIndex = input.badge
				pObj[planetName].triples = input.triples
				pObj[planetName].flux = input.flux
				pObj[planetName].bonusAngelEffectiveness = input.bonusAngelEffectiveness
				pObj[planetName].bonusMultiplier = input.bonusMultiplier
				pObj[planetName].numAngels = input.numAngels
			}
			localStorage.setItem('planets2', JSON.stringify(pObj))
			get().loadPlanet(get().selectedWorld)
		}
		get().incNumLoads()
	}
} as UserData);

const userDataStore = create<UserData>(userStoreDefinition);
export default userDataStore;
export const recUserDataStore = create<UserData>(userStoreDefinition);