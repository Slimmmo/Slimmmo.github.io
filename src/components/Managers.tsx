"use client"

import { useState } from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { costString } from './Helpers'
import staticDataStore from './Store_StaticData'
import userDataStore from './Store_UserData'
import { Manager } from './Types'

export default function Managers() {
	const [ allManager0, changeAllManager0 ] = useState(false)
	const [ allManager1, changeAllManager1 ] = useState(false)

	const { sdInvestments, sdManagers } = staticDataStore(state => ({ sdInvestments: state.staticData.investments, sdManagers: state.staticData.managerUpgrades }))
	const { uiManagers, uiChangeManagers, uiSelectedWorld } = userDataStore(state => ({ uiManagers: state.managersBought, uiChangeManagers: state.changeManagersBought, uiSelectedWorld: state.selectedWorld }))

	const getCost = (manager: Manager, index: number) => {
		if (index === 0) {
			if ('cost10' in manager) {
				return manager.cost10
			} else {
				return manager.cost25
			}
		} else if ('cost99' in manager) {
			return manager.cost99
		}
		return null
	}
	const setAllManagers = (managerIndex: number, val: boolean) => {
		if (managerIndex === 0) {
			changeAllManager0(val)
			uiChangeManagers(0, managerIndex, val, val, null)
		} else {
			changeAllManager1(val)
			uiChangeManagers(0, managerIndex, val, null, val)
		}
	}
	const setManager = (index: number, managerIndex: number, val: boolean) => {
		uiChangeManagers(index, managerIndex, val, null, null)
		const allTrue = uiManagers.every(tuple => tuple[managerIndex] === true)
		if (allTrue !== (managerIndex === 0 ? allManager0 : allManager1)) {
			if (managerIndex === 0) {
				changeAllManager0(allTrue)
			} else {
				changeAllManager1(allTrue)
			}
		}
	}
	return (
		<AccordionItem value="managers">
			<AccordionTrigger>Managers</AccordionTrigger>
			<AccordionContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Business</TableHead>
							<TableHead><Checkbox className='mr-2' id='allManager0' checked={allManager0} onCheckedChange={checked => { checked === 'indeterminate' ? null : setAllManagers(0, checked)}}/><Label htmlFor='allManager0'>{uiSelectedWorld === 'Earth' ? '10% Off' : '25% Off'}</Label></TableHead>
							{uiSelectedWorld === 'Earth' ? <TableHead><Checkbox className='mr-2' id='allManager1' checked={allManager1} onCheckedChange={checked => { checked === 'indeterminate' ? null : setAllManagers(1, checked)}}/><Label htmlFor='allManager1'>99.999% Off</Label></TableHead> : null}
						</TableRow>
					</TableHeader>
					<TableBody>
						{uiManagers.map((manager, index) => (
							<TableRow key={sdInvestments[index].name}>
								<TableCell>{sdInvestments[index].name}</TableCell>
								<TableCell>
									<Checkbox className='mr-2' id={index + 'manager' + 0} checked={manager[0]} onCheckedChange={checked => { checked === 'indeterminate' ? null : setManager(index, 0, checked)}}/>
									<Label htmlFor={index + 'manager' + 0}>{costString(getCost(sdManagers[index], 0))}</Label>
								</TableCell>
								{uiSelectedWorld === 'Earth' ? <TableCell>
									<Checkbox className='mr-2' id={index + 'manager' + 1} checked={manager[1]} onCheckedChange={checked => { checked === 'indeterminate' ? null : setManager(index, 1, checked)}}/>
									<Label htmlFor={index + 'manager' + 1}>{costString(getCost(sdManagers[index], 1))}</Label>
								</TableCell> : null }
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	)
}