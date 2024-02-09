"use client"

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BsExclamation, BsPlus } from 'react-icons/bs'

import userDataStore from './Store_UserData'
import staticDataStore from './Store_StaticData'
import calcDataStore from './Store_CalcData'
import { getTitleString } from './Helpers'

export default function PlatinumSuits() {
	const {
		uiBoughtPlatinumBoostIndex, uiChangeBoughtPlatinumBoostIndex,
		uiBoughtSuitName, uiChangeBoughtSuitName,
		uiTriples, uiChangeTriples,
		uiFlux, uiChangeFlux
	} = userDataStore(state => ({
		uiBoughtPlatinumBoostIndex: state.boughtPlatinumBoostIndex, uiChangeBoughtPlatinumBoostIndex: state.changeBoughtPlatinumBoostIndex,
		uiBoughtSuitName: state.boughtSuitName, uiChangeBoughtSuitName: state.changeBoughtSuitName,
		uiTriples: state.triples, uiChangeTriples: state.changeTriples,
		uiFlux: state.flux, uiChangeFlux: state.changeFlux
	}))
	const { sdPlatinumBoosts, sdSuits } = staticDataStore(state => ({ sdPlatinumBoosts: state.platinumBoosts, sdSuits: state.suits }))
	const { cdSuits, cdSuitNotification } = calcDataStore(state => ({ cdSuits: state.suits, cdSuitNotification: state.suitNotification }))

	const getSuitTitleString = (suitName: string) => getTitleString(suitName === uiBoughtSuitName, cdSuits[suitName])

	return (
		<AccordionItem value="platinumSuits">
			<AccordionTrigger><div className='flex h-5 items-center'>Gold/Platinum Upgrades & Suits{cdSuitNotification ? <BsExclamation color='var(--alert-primary)' size='32'/> : null }</div></AccordionTrigger>
			<AccordionContent>
				<Card className='mb-3 p-6'>
					<div className="grid grid-cols-2 justify-items-center">
						<div className='flex items-center gap-2'>
							<Input id='3xMultipliers' type="number" value={uiTriples} onChange={evt => uiChangeTriples(evt.target.value === '' ? '' : parseInt(evt.target.value))} onBlur={evt => evt.target.value === '' ? uiChangeTriples(0) : null}/>
							<Label htmlFor='3xMultipliers'># 3x Multipliers</Label>
						</div>
						<div className='flex items-center gap-2'>
							<Input id='flux' type="number" value={uiFlux} onChange={evt => uiChangeFlux(evt.target.value === '' ? '' : parseInt(evt.target.value))} onBlur={evt => evt.target.value === '' ? uiChangeFlux(0) : null}/>
							<Label htmlFor='flux'># Flux Capitalors</Label>
						</div>
					</div>
				</Card>
				<div className="grid grid-cols-2 justify-items-center">
					<div>
						<h3>Platinum Boost:</h3>
						<ul>
							{sdPlatinumBoosts.map((plat, index) => (
								<li key={index}>
									<Checkbox className='mr-2' id={'platinum' + index} checked={index == uiBoughtPlatinumBoostIndex} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeBoughtPlatinumBoostIndex(index)}}/>
									<Label htmlFor={'platinum' + index}>{plat}</Label>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3>Suits:</h3>
						<ul>
							{Object.keys(sdSuits).map((suitName, index) => (
								<li key={index} title={getSuitTitleString(suitName)}>
									<div className="inline-flex items-center h-5">
										<Checkbox className='mr-2' id={'suit' + index} checked={suitName == uiBoughtSuitName} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeBoughtSuitName(suitName)}}/>
										<Label htmlFor={'suit' + index}>{suitName} Suit</Label>
										{(cdSuits[suitName] ?? 0) > 0 ? (cdSuits[suitName] === Math.max(...(Object.values(cdSuits).flatMap(val => val ? [val] : []))) ? <BsExclamation size='20' color='var(--alert-primary)'/> : <BsPlus size='20' color='var(--alert-secondary)'/>) : null}
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}