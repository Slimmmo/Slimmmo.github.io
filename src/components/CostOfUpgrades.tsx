"use client"

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { formatLargeNumber, formatTime } from './Helpers'
import calcDataStore from './Store_CalcData'
import staticDataStore from './Store_StaticData'

export default function CostOfUpgrades() {
	const investments = staticDataStore(state => state.staticData.investments)
	const calcUpgradeCost = calcDataStore(state => state.upgradeCost)

	return (
		<AccordionItem value="costOfUpgrades">
			<AccordionTrigger>Cost Of Upgrades</AccordionTrigger>
			<AccordionContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Type</TableHead>
							<TableHead>$ Cost +1</TableHead>
							<TableHead>Time Cost +1</TableHead>
							<TableHead>$ Cost +10</TableHead>
							<TableHead>Time Cost +10</TableHead>
							<TableHead>$ Cost +Bonus</TableHead>
							<TableHead>Time Cost +Bonus</TableHead>
							<TableHead>$ Cost +All Bonuses</TableHead>
							<TableHead>Time Cost +All Bonus</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{calcUpgradeCost.map((upgradeCost, index) => (
							<TableRow key={investments[index].name}>
								<TableCell>{investments[index].name}</TableCell>
								<TableCell>${formatLargeNumber(upgradeCost.cost1)}</TableCell>
								<TableCell>{formatTime(upgradeCost.time1)}</TableCell>
								<TableCell>${formatLargeNumber(upgradeCost.cost10)}</TableCell>
								<TableCell>{formatTime(upgradeCost.time10)}</TableCell>
								<TableCell>${formatLargeNumber(upgradeCost.costBonus)}</TableCell>
								<TableCell>{formatTime(upgradeCost.timeBonus)}</TableCell>
								<TableCell>${formatLargeNumber(upgradeCost.costAll)}</TableCell>
								<TableCell>{formatTime(upgradeCost.timeAll)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	)
}