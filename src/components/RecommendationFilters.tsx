import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import recDataStore from './Store_RecData'

export default function RecommendationFilters() {
	const {
		rfHide1, rfChangeHide1,
		rfHide10, rfChangeHide10,
		rfHide100, rfChangeHide100,
		rfDays, rfChangeDayFilter,
		rfHours, rfChangeHourFilter,
		rfMinutes, rfChangeMinuteFilter,
		rfPercent, rfChangePercentFilter
	} = recDataStore(state => ({
		rfHide1: state.hide1, rfChangeHide1: state.changeHide1,
		rfHide10: state.hide10, rfChangeHide10: state.changeHide10,
		rfHide100: state.hide100, rfChangeHide100: state.changeHide100,
		rfDays: state.days, rfChangeDayFilter: state.changeDayFilter,
		rfHours: state.hours, rfChangeHourFilter: state.changeHourFilter,
		rfMinutes: state.minutes, rfChangeMinuteFilter: state.changeMinuteFilter,
		rfPercent: state.percent, rfChangePercentFilter: state.changePercentFilter
	}))
	return (
		<AccordionItem value="recommendationFilters">
			<AccordionTrigger>Recommendation Filters</AccordionTrigger>
			<AccordionContent>
				<div className="grid md:grid-cols-3 justify-items-center mb-4">
					<div className='flex items-center gap-2'>
						<Checkbox id='hide1' checked={rfHide1} onCheckedChange={checked => { checked === 'indeterminate' ? null : rfChangeHide1(checked)}}/>
						<Label htmlFor='hide1'>Hide +1 upgrades</Label>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox id='hide10' checked={rfHide10} onCheckedChange={checked => { checked === 'indeterminate' ? null : rfChangeHide10(checked)}}/>
						<Label htmlFor='hide10'>Hide +10 upgrades</Label>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox id='hide100' checked={rfHide100} onCheckedChange={checked => { checked === 'indeterminate' ? null : rfChangeHide100(checked)}}/>
						<Label htmlFor='hide100'>Hide +100 upgrades</Label>
					</div>
				</div>
				<p className='text-center'>
					Don't show upgrades that take longer than (Days : Hours : Minutes)
				</p>
				<div className='inline-flex w-full justify-center items-center mb-4'>
					<Input className='w-20' type="number" value={rfDays} onChange={evt => { rfChangeDayFilter(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? rfChangeDayFilter('') : null}/>
					:
					<Input className='w-20' type="number" value={rfHours} onChange={evt => { rfChangeHourFilter(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? rfChangeHourFilter('') : null}/>
					:
					<Input className='w-20' type="number" value={rfMinutes} onChange={evt => { rfChangeMinuteFilter(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? rfChangeMinuteFilter('') : null}/>
				</div>
				<p className='text-center'>
					Don't show upgrades that % increase in income less than (%)
				</p>
				<div className='flex w-full justify-center'>
					<Input className='w-20' type="number" value={rfPercent} onChange={evt => { rfChangePercentFilter(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? rfChangePercentFilter('') : null}/>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}