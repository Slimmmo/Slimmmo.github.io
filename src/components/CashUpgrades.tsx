"use client"

import { useState } from 'react'
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

import { summaryString } from './Helpers'
import staticDataStore from './Store_StaticData'
import userDataStore from './Store_UserData'

export default function CashUpgrades() {
	const [buyBefore, setBuyBefore] = useState(false)
	const [clearAfter, setClearAfter] = useState(false)

	const { sdCashUpgrades, sdInvestments } = staticDataStore(state => ({ sdCashUpgrades: state.staticData.cashUpgrades, sdInvestments: state.staticData.investments }))
	const { uiCashUpgrades, uiChangeCashUpgradesBought } = userDataStore(state => ({ uiCashUpgrades: state.cashUpgradesBought, uiChangeCashUpgradesBought: state.changeCashUpgradesBought }))

	return (
		<AccordionItem value="cashUpgrades">
			<AccordionTrigger>Cash Upgrades</AccordionTrigger>
			<AccordionContent>
				<Card className='mb-3'>
					<CardContent className='pt-6'>
						<div className="grid grid-cols-2 justify-items-center">
							<div className='flex items-center gap-2'>
								<Checkbox id='cashBuyAllBefore' checked={buyBefore} onCheckedChange={checked => { checked === 'indeterminate' ? null : setBuyBefore(checked)}}/>
								<Label htmlFor='cashBuyAllBefore'>Buy All Before Selection (Inclusive)</Label>
							</div>
							<div className='flex items-center gap-2'>
								<Checkbox id='cashClearAllAfter' checked={clearAfter} onCheckedChange={checked => { checked === 'indeterminate' ? null : setClearAfter(checked)}}/>
								<Label htmlFor='cashClearAllAfter'>Clear All After Selection (Inclusive)</Label>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid sm:grid-cols-2 md:grid-cols-3">
					{uiCashUpgrades.map((upgrade, index) => (
						<div key={index}>
							<Checkbox id={'cashUpgrade' + index} className='mr-2' checked={upgrade} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeCashUpgradesBought(index, checked, buyBefore, clearAfter)}}/>
							<Label htmlFor={'cashUpgrade' + index}>{summaryString(sdCashUpgrades[index], sdInvestments)}</Label>
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}