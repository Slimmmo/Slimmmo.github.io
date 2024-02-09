"use client"

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import {
	Card,
	CardContent
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import calcDataStore from './Store_CalcData'
import userDataStore from './Store_UserData'

export default function OtherBonuses() {
	const calcAngelEffectiveness = calcDataStore(state => state.angelEffectiveness)
	const {
		uiBonusMultiplier, uiChangeBonusMultiplier,
		uiBonusAngelEffectiveness, uiChangeBonusAngelEffectiveness
	} = userDataStore(state => ({
		uiBonusMultiplier: state.bonusMultiplier, uiChangeBonusMultiplier: state.changeBonusMultiplier,
		uiBonusAngelEffectiveness: state.bonusAngelEffectiveness, uiChangeBonusAngelEffectiveness: state.changeBonusAngelEffectiveness
	}))

	return (
		<AccordionItem value="otherBonuses">
			<AccordionTrigger>Other Bonuses</AccordionTrigger>
			<AccordionContent>
				<Card className='mb-4 pt-6'>
					<CardContent>
						<p>
							Please only input the bonus you have.
						</p>
						<p>
							<em>For example, if you have a 30% Angel Investor increase from a Christmas event, so now your base Angel Investor bonus is 32%, but with upgrades it could easily be above 40%, please only input 30 or the calculations will be off.</em>
						</p>
					</CardContent>
				</Card>
				<div className="grid grid-cols-2 justify-items-center mb-2">
					<div className='flex items-center gap-2'>
						<Input id='bonusMultiplier' type="number" value={uiBonusMultiplier} onChange={evt => uiChangeBonusMultiplier(evt.target.value === '' ? '' : parseFloat(evt.target.value))} onBlur={evt => evt.target.value === '' ? uiChangeBonusMultiplier(0) : null}/>
						<Label htmlFor='bonusMultiplier'>x Multiplier</Label>
					</div>
					<div className='flex items-center gap-2'>
						<Input id='bonusAngelEffectiveness' type="number" value={uiBonusAngelEffectiveness} onChange={evt => uiChangeBonusAngelEffectiveness(evt.target.value === '' ? '' : parseFloat(evt.target.value))} onBlur={evt => evt.target.value === '' ? uiChangeBonusAngelEffectiveness(0) : null}/>
						<Label htmlFor='bonusAngelEffectiveness'>% Angel Investor Bonus</Label>
					</div>
				</div>
				<h3 className='text-xl'>Total Angel Investor % = {calcAngelEffectiveness}%</h3>
			</AccordionContent>
		</AccordionItem>
	)
}