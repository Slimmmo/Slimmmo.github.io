"use client"

import { BsExclamation, BsPlus } from 'react-icons/bs'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { getTitleString, summaryString } from './Helpers'
import userDataStore from './Store_UserData'
import staticDataStore from './Store_StaticData'
import { Upgrade, WorldIndex } from './Types'
import Earth from './WorldData/Earth'
import Moon from './WorldData/Moon'
import Mars from './WorldData/Mars'
import calcDataStore from './Store_CalcData'

export default function SuperBadges() {
	const { uiSuperBadgeIndex, uiChangeBoughtSuperBadgeIndex } = userDataStore(state => ({ uiSelectedWorld: state.selectedWorld, uiSuperBadgeIndex: state.boughtSuperBadgeIndex, uiChangeBoughtSuperBadgeIndex: state.changeBoughtSuperBadgeIndex }))
	const { sdSuperBadges, sdInvestments } = staticDataStore(state => ({ sdInvestments: state.staticData.investments, sdSuperBadges: state.superBadges }))
	const { cdSuperBadges, cdSuperBadgeNotification } = calcDataStore(state => ({ cdSuperBadges: state.superBadges, cdSuperBadgeNotification: state.superBadgeNotification }))

	const getSuperBadgeTitleString = (index: number) => getTitleString(index === uiSuperBadgeIndex, cdSuperBadges[index])

	return (
		<AccordionItem value="superBadges">
			<AccordionTrigger><div className='flex h-5 items-center'>Super Badges{cdSuperBadgeNotification ? <BsExclamation color='var(--alert-primary)' size='32'/> : null }</div></AccordionTrigger>
			<AccordionContent>
				<div className="grid sm:grid-cols-2 md:grid-cols-3">
					{sdSuperBadges.map((badge, index) => (
						<div key={index} title={getSuperBadgeTitleString(index)} className='inline-flex items-center min-h-5'>
							<Checkbox className='mr-2' id={'superBadge' + index} checked={index === uiSuperBadgeIndex} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeBoughtSuperBadgeIndex(index) }}/>
							<Label htmlFor={'superBadge' + index}>{badge.name} ({summaryString(badge.upgrade, sdInvestments)})</Label>
							{(cdSuperBadges[index] ?? 0) > 0 ? (cdSuperBadges[index] === Math.max(...(cdSuperBadges.filter(Number) as number[])) ? <BsExclamation size='20' color='var(--alert-primary)'/> : <BsPlus size='20' color='var(--alert-secondary)'/>) : null}
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}