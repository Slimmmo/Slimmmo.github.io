import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'

import recDataStore from './Store_RecData'
import { InvestmentEnum, Recommendation } from './Types'
import { formatLargeNumber, formatTime, investmentNameString } from './Helpers'
import calcDataStore, { recCalcDataStore } from './Store_CalcData'
import staticDataStore from './Store_StaticData'
import userDataStore, { recUserDataStore } from './Store_UserData'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

export default function RecommendationFilters() {
	const { sdAngelUpgrades, sdCashUpgrades, sdHasMegaTickets, sdSuits, sdSuperBadges, sdInvestments, sdUnlocks } = staticDataStore(state => ({ sdAngelUpgrades: state.staticData.angelUpgrades, sdCashUpgrades: state.staticData.cashUpgrades, sdHasMegaTickets: state.staticData.hasMegaTickets, sdSuits: state.suits, sdSuperBadges: state.superBadges, sdInvestments: state.staticData.investments, sdUnlocks: state.staticData.unlocks }))
	const {
		cdCalculate, cdRecTable, cdSetRecTable,
		cdCalcUpgradeCost, cdGetDifferenceNBonus,
		cdGetNextPositiveUnlock, cdTotalIncome,
		setCDAngelUpgrades, setCDAngelNotification,
		setCDSuits, setCDSuitNotification,
		setCDSuperBadges, setCDSuperBadgeNotification
	} = calcDataStore(state => ({
		cdCalculate: state.calculate, cdRecTable: state.recTable, cdSetRecTable: state.setRecTable,
		cdCalcUpgradeCost: state.calcUpgradeCost, cdGetDifferenceNBonus: state.getDifferenceNBonus,
		cdGetNextPositiveUnlock: state.getNextPositiveUnlock, cdTotalIncome: state.totalIncome,
		setCDAngelUpgrades: state.setAngelUpgrades, setCDAngelNotification: state.setAngelNotification,
		setCDSuits: state.setSuits, setCDSuitNotification: state.setSuitNotification,
		setCDSuperBadges: state.setSuperBadges, setCDSuperBadgeNotification: state.setSuperBadgeNotification
	}))
	const { uiCashUpgrades, uiNumAngels, uiSelectedWorld, uiNumCalculates, uiInvestments, uiChangeCashUpgradesBought, uiChangeInvestments, uiSaveData } = userDataStore(state => ({ uiCashUpgrades: state.cashUpgradesBought, uiNumAngels: state.numAngels, uiSelectedWorld: state.selectedWorld, uiNumCalculates: state.numCalculates, uiInvestments: state.investments, uiChangeCashUpgradesBought: state.changeCashUpgradesBought, uiChangeInvestments: state.changeInvestments, uiSaveData: state.saveData }))
	const {
		rfHide1, rfHide10, rfHide100,
		rfDays, rfHours, rfMinutes,
		rfPercentage
	} = recDataStore(state => ({
		rfHide1: state.hide1, rfHide10: state.hide10, rfHide100: state.hide100,
		rfDays: state.days, rfHours: state.hours, rfMinutes: state.minutes,
		rfPercentage: state.percent
	}))
	const {
		recUIPlanetOverride, recUIChangeInvestments,
		recUIChangeCashUpgradesBought,
		recUIChangeAngelUpgradesBought,
		recUIChangeNumAngels, recUIChangeBoughtSuitName,
		recUIChangeBoughtSuperBadge
	} = recUserDataStore(state => ({
		recUIPlanetOverride: state.planetOverride, recUIChangeInvestments: state.changeInvestments,
		recUIChangeCashUpgradesBought: state.changeCashUpgradesBought,
		recUIChangeAngelUpgradesBought: state.changeAngelUpgradesBought,
		recUIChangeNumAngels: state.changeNumAngels, recUIChangeBoughtSuitName: state.changeBoughtSuitName,
		recUIChangeBoughtSuperBadge: state.changeBoughtSuperBadgeIndex
	}))
	const recCDCalculate = recCalcDataStore(state => state.calculate)
	const [ sorting, setSorting ] = useState<SortingState>([ { id: 'score', desc: true } ])

	useEffect(() => {
		if (uiNumCalculates === 0) return
		calcRecommendations()
		calcAngels()
		calcSuits()
		calcSuperBadges()
	}, [uiNumCalculates])

	const recString = (rec: Recommendation) => {
		if (rec === undefined) return null
		if ('upgrade' in rec) {
			return `${investmentNameString(rec.upgrade, sdInvestments)}`
		} else {
			return `${rec.investment === InvestmentEnum.All ? 'All' : sdInvestments[rec.investment].name}`
		}
	}
	const applyRecommendation = (rec: Recommendation) => {
		if ('upgrade' in rec) {
			uiChangeCashUpgradesBought(rec.upgIndex, true, false, false)
		} else {
			uiChangeInvestments(rec.investment, rec.to, null)
		}
		cdCalculate()
	}

	const calcUpgradeScore = (unlockCostTime: number) => {
		if (!isFinite(unlockCostTime)) return 0
		const recCDTotalIncome = recCalcDataStore.getState().totalIncome
		var overflowPotential = recCDTotalIncome * unlockCostTime,
		divNum = 0,
		retVal = recCDTotalIncome - cdTotalIncome
		while (!isFinite(overflowPotential)) {
			divNum += 100
			overflowPotential = recCDTotalIncome * (unlockCostTime / Number('1e+' + divNum))
		}
		retVal *= 1000000000000000000000 / overflowPotential
		if (divNum !== 0) retVal *= Number('1e+' + divNum)
		return retVal
	}

	const calcRecommendations = () => {
		let newRecTable: Recommendation[] = []
		recUIPlanetOverride(uiSaveData())
		const calcFilterTime = (rfDays === '' && rfHours === '' && rfMinutes === '') ? undefined : 0 + ((rfDays === '' ? 0 : rfDays) * 86400) + ((rfHours === '' ? 0 : rfHours) * 3600) + ((rfMinutes === '' ? 0 : rfMinutes) * 60)
		for (let i = 0; i < sdInvestments.length; i++) { // individual investments
			let inc = [ 1, 10, 100 ].filter((num) => 
				(num !== 1 || !rfHide1) && (num !== 10 || !rfHide10) && (num !== 100 || !rfHide100)
			)
			if (i === 1 && uiSelectedWorld === 'Earth') {
				for (let j = 1; j < 4; j++) {
					let k = cdGetDifferenceNBonus(i, j)
					if (k !== null) inc.push(k)
				}
			} else {
				let k = cdGetDifferenceNBonus(i, 1)
				if (k !== null) inc.push(k)
			}
			if (!sdHasMegaTickets) {
				let nPU = cdGetNextPositiveUnlock(i)
				if (nPU !== null) {
					let k = cdGetDifferenceNBonus(i, nPU)
					if (k !== null && inc.indexOf(k) === -1) inc.push(k)
				}
			}
			for (let j = 0; j < inc.length; j++) {
				recUIChangeInvestments(i, (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) + inc[j], null)
				recCDCalculate()
				let rec: Recommendation = {
					investment: i,
					to: (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) + inc[j],
					cost: cdCalcUpgradeCost(i, inc[j]) ?? -Infinity,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
			}
			recUIChangeInvestments(i, uiInvestments[i].number === '' ? 0 : uiInvestments[i].number, null) // reset it to original state
		}
		// cash upgrades
		let j = -1
		for (let i = 0; i < 22; i++) {
			j = uiCashUpgrades.indexOf(false, j + 1)
			if (j !== -1) {
				recUIChangeCashUpgradesBought(j, true, false, false)
				recCDCalculate()
				let rec: Recommendation = {
					upgrade: sdCashUpgrades[j],
					upgIndex: j,
					cost: sdCashUpgrades[j].cost?.price ?? 0,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
				recUIChangeCashUpgradesBought(j, false, false, false) // reset it
			} else {
				break
			}
		}
		// highest shared level unlocks
		if (sdUnlocks[sdInvestments.length].length > 0) {
			let highestSharedLevel = uiInvestments[0].number === '' ? 0 : uiInvestments[0].number
			for (let i = 1; i < uiInvestments.length; i++) {
				if ((uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number) < highestSharedLevel) {
					highestSharedLevel = uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number
				}
			}
			if (highestSharedLevel < (sdUnlocks[uiInvestments.length][sdUnlocks[uiInvestments.length].length - 1].cost?.price ?? 0)) { // if you don't have them all unlocked already
				for (let i = 0; i < sdUnlocks[uiInvestments.length].length; i++) {
					if ((sdUnlocks[uiInvestments.length][i].cost?.price ?? 0) > highestSharedLevel) {
						highestSharedLevel = sdUnlocks[uiInvestments.length][i].cost?.price ?? 0 // find the next shared level unlock amount
						break
					}
				}
				let sharedUnlockCost = 0
				for (let i = 0; i < uiInvestments.length; i++) {
					if ((uiInvestments[i].number === '' ? Infinity : +uiInvestments[i].number) < highestSharedLevel) {
						sharedUnlockCost += cdCalcUpgradeCost(i, highestSharedLevel - (uiInvestments[i].number === '' ? 0 : +uiInvestments[i].number)) ?? 0
						recUIChangeInvestments(i, highestSharedLevel, null)
					}
				}
				recCDCalculate()
				let rec: Recommendation = {
					investment: InvestmentEnum.All,
					to: highestSharedLevel,
					cost: sharedUnlockCost,
					income: recCalcDataStore.getState().totalIncome,
					score: -Infinity
				}
				if ((calcFilterTime === undefined || calcFilterTime > (rec.cost / cdTotalIncome)) && (rfPercentage === '' || rfPercentage < ((rec.income - cdTotalIncome) / cdTotalIncome))) {
					rec.score = calcUpgradeScore(rec.cost / cdTotalIncome)
					newRecTable.push(rec)
				}
			}
		}
		newRecTable.sort((a, b) => b.score - a.score)
		cdSetRecTable(newRecTable)
	}

	const calcAngels = () => {
		recUIPlanetOverride(uiSaveData())
		setCDAngelNotification(false)
		const newAngelUpgrades = [...recCalcDataStore.getState().angelUpgrades]
		for (let i = 0; i < recUserDataStore.getState().angelUpgradesBought.length; i++) {
			if (!recUserDataStore.getState().angelUpgradesBought[i] && uiNumAngels >= (sdAngelUpgrades[i].cost?.price ?? Infinity)) {
				recUIChangeNumAngels(uiNumAngels - (sdAngelUpgrades[i].cost?.price ?? 0))
				recUIChangeAngelUpgradesBought(i, true, false, false)
				recCDCalculate()
				let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
				let percent = delta / cdTotalIncome
				newAngelUpgrades[i] = percent
				if (delta > 0) {
					setCDAngelNotification(true)
				}
				// reset calculating state
				recUIChangeAngelUpgradesBought(i, false, false, false)
			} else {
				newAngelUpgrades[i] = null
			}
		}
		setCDAngelUpgrades(newAngelUpgrades)
	}

	const calcSuits = () => {
		recUIPlanetOverride(uiSaveData())
		setCDSuitNotification(false)
		const newSuitUpgrades = { ...recCalcDataStore.getState().suits }
		for (let key in sdSuits) {
			recUIChangeBoughtSuitName(key)
			recCDCalculate()
			let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
			let percent = delta / cdTotalIncome
			newSuitUpgrades[key] = percent
			if (delta > 0) {
				setCDSuitNotification(true)
			}
		}
		setCDSuits(newSuitUpgrades)
	}

	const calcSuperBadges = () => {
		recUIPlanetOverride(uiSaveData())
		setCDSuperBadgeNotification(false)
		const newSuperBadges = [ ...recCalcDataStore.getState().superBadges ]
		for (let i = 0; i < sdSuperBadges.length; i++) {
			recUIChangeBoughtSuperBadge(i)
			recCDCalculate()
			let delta = recCalcDataStore.getState().totalIncome - cdTotalIncome
			let percent = delta / cdTotalIncome
			newSuperBadges[i] = percent
			if (delta > 0) {
				setCDSuperBadgeNotification(true)
			}
		}
		setCDSuperBadges(newSuperBadges)
	}

	const columnHelper = createColumnHelper<Recommendation>()
	const columns = [
		columnHelper.accessor(rec => rec, {
			header: "Upgrade",
			cell: info => recString(info.getValue())
		}),
		columnHelper.accessor(rec => 'to' in rec ? rec.to : null, {
			header: "To",
			cell: info => info.getValue()
		}),
		columnHelper.accessor(rec => rec.score, {
			id: 'score',
			header: "Upgrade Score (higher = better)*",
			cell: info => formatLargeNumber(info.getValue())
		}),
		columnHelper.accessor(rec => rec.cost, {
			header: "Cost of Upgrade",
			cell: info => formatLargeNumber(info.getValue())
		}),
		columnHelper.accessor(rec => rec.cost, {
			header: "Cost of Upgrade in Time",
			cell: info => formatTime(info.getValue() / cdTotalIncome)
		}),
		columnHelper.accessor(rec => rec.income, {
			header: "Increase in $ / Second",
			cell: info => formatLargeNumber(info.getValue() - cdTotalIncome)
		}),
		columnHelper.accessor(rec => rec.income, {
			header: "% Increase in $ / Second",
			cell: info => formatLargeNumber((info.getValue() - cdTotalIncome) * 100 / cdTotalIncome) + '%'
		}),
		columnHelper.accessor(rec => rec, {
			header: 'Apply',
			cell: info => <Button onClick={() => applyRecommendation(info.getValue())}>Apply This Row</Button>,
			enableSorting: false
		})
	]
	const table = useReactTable({
		columns,
		data: cdRecTable,
		state: {
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div>
			{cdRecTable.length === 0 ? null :
				<>
					<div className='w-full flex-col justify-center mb-2'>
						<h1 className='text-2xl w-full text-center font-semibold'>Recommendation: Buy {recString(cdRecTable[0]) + ('to' in cdRecTable[0] ? ` to level ${cdRecTable[0].to}.` : ' Cash Upgrade.')}</h1>
						<div className='w-full flex justify-center'>
							<Button onClick={() => applyRecommendation(cdRecTable[0])}>Apply This Recommendation</Button>
						</div>
					</div>
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className={header.column.getCanSort() ? 'cursor-pointer select-none' : 'cursor-disabled select-none'}>
											{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{{
												asc: <BsChevronUp className='inline-flex'/>,
												desc: <BsChevronDown className='inline-flex'/>,
											}[header.column.getIsSorted() as string] ?? null}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			}
		</div>
	)
}