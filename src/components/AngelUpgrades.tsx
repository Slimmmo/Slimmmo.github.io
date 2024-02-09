"use client"

import { useState } from 'react'
import { BsExclamation, BsPlus } from 'react-icons/bs'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Card,
	CardContent
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { getTitleString, summaryString } from './Helpers'
import staticDataStore from './Store_StaticData'
import userDataStore from './Store_UserData'
import calcDataStore from './Store_CalcData'

export default function AngelUpgrades() {
	const [buyBefore, setBuyBefore] = useState(false)
	const [clearAfter, setClearAfter] = useState(false)

	const { sdAngelUpgrades, sdInvestments } = staticDataStore(state => ({ sdAngelUpgrades: state.staticData.angelUpgrades, sdInvestments: state.staticData.investments }))
	const { uiAngelUpgradesBought, uiChangeAngelUpgradesBought } = userDataStore(state => ({ uiAngelUpgradesBought: state.angelUpgradesBought, uiChangeAngelUpgradesBought: state.changeAngelUpgradesBought }))
	const { cdAngelNotification, cdAngelUpgrades } = calcDataStore(state => ({ cdAngelNotification: state.angelNotification, cdAngelUpgrades: state.angelUpgrades }))

	const getAngelTitleString = (upgrade: boolean, index: number) => getTitleString(upgrade, cdAngelUpgrades[index])

	return (
		<AccordionItem value="angelUpgrades">
			<AccordionTrigger><div className='flex h-5 items-center'>Angel Upgrades{cdAngelNotification ? <BsExclamation color='var(--alert-primary)' size='32'/> : null }</div></AccordionTrigger>
			<AccordionContent>
				<Card className='mb-3'>
					<CardContent className='pt-6'>
						<div className="grid grid-cols-2 justify-items-center">
							<div className='flex items-center gap-2'>
								<Checkbox id='angelBuyAllBefore' checked={buyBefore} onCheckedChange={checked => { checked === 'indeterminate' ? null : setBuyBefore(checked)}}/>
								<Label htmlFor='angelBuyAllBefore'>Buy All Before Selection (Inclusive)</Label>
							</div>
							<div className='flex items-center gap-2'>
								<Checkbox id='angelClearAllAfter' checked={clearAfter} onCheckedChange={checked => { checked === 'indeterminate' ? null : setClearAfter(checked)}}/>
								<Label htmlFor='angelClearAllAfter'>Clear All After Selection (Inclusive)</Label>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid sm:grid-cols-2 md:grid-cols-3">
					{uiAngelUpgradesBought.map((upgrade, index) => (
						<div key={index} title={getAngelTitleString(upgrade, index)} className='inline-flex items-center min-h-5'>
							<Checkbox id={'angelUpgrade' + index} className='mr-2' checked={upgrade} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeAngelUpgradesBought(index, checked, buyBefore, clearAfter)}}/>
							<Label htmlFor={'angelUpgrade' + index}>{summaryString(sdAngelUpgrades[index], sdInvestments)}</Label>
							{(cdAngelUpgrades[index] ?? 0) > 0 ? (cdAngelUpgrades[index] === Math.max(...(cdAngelUpgrades.filter(Number) as number[])) ? <BsExclamation size='20' color='var(--alert-primary)'/> : <BsPlus size='20' color='var(--alert-secondary)'/>) : null}
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}