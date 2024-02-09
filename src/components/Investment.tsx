"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import calcDataStore from './Store_CalcData'
import staticDataStore from './Store_StaticData'
import userDataStore from './Store_UserData'
import { formatLargeNumber, formatTime } from './Helpers'

export default function Investment() {
	const { sdHasMegaTickets, sdInvestments } = staticDataStore(state => ({ sdHasMegaTickets: state.staticData.hasMegaTickets, sdInvestments: state.staticData.investments }))
	const { uiInvestments, uiChangeInvestments, uiAllMegaTickets, uiChangeAllMegaTickets } = userDataStore(state => ({ uiInvestments: state.investments, uiChangeInvestments: state.changeInvestments, uiAllMegaTickets: state.allMegaTickets, uiChangeAllMegaTickets: state.changeAllMegaTickets }))
	const { cdInvestments, cdTotalIncome } = calcDataStore(state => ({ cdInvestments: state.investments, cdTotalIncome: state.totalIncome }))

	const updateNumber = (index: number, number: number | '') => { uiChangeInvestments(index, number, uiInvestments[index].megaTicket) }
	const updateMega = (index: number, mega: boolean) => { uiChangeInvestments(index, uiInvestments[index].number, mega) }

	return (
		<Table className='mb-4'>
			<TableHeader>
				<TableRow>
					<TableHead>Type</TableHead>
					<TableHead>Number</TableHead>
					{sdHasMegaTickets ? <TableHead><Checkbox className='mr-2' checked={uiAllMegaTickets} onCheckedChange={checked => { checked === 'indeterminate' ? null : uiChangeAllMegaTickets(checked) }}/>Mega Ticket</TableHead> : null}
					<TableHead>$ / Cycle</TableHead>
					<TableHead>Cycle Time</TableHead>
					<TableHead>$ / Second</TableHead>
					<TableHead>% of Total $ / Second</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{uiInvestments.map((inv, index) => (
					<TableRow key={sdInvestments[index].name}>
						<TableCell>{sdInvestments[index].name}</TableCell>
						<TableCell><Input type="number" value={inv.number} onChange={evt => updateNumber(index, evt.target.value === '' ? '' : parseInt(evt.target.value))} onBlur={evt => evt.target.value === '' ? updateNumber(index, 0) : null}/></TableCell>
						{sdHasMegaTickets ? <TableCell><Checkbox checked={inv.megaTicket} onCheckedChange={checked => { checked === 'indeterminate' ? null : updateMega(index, checked)}}/></TableCell> : null}
						<TableCell>${formatLargeNumber(cdInvestments[index].cycleIncome)}</TableCell>
						<TableCell>{formatTime(cdInvestments[index].cycleTime)}</TableCell>
						<TableCell>${(formatLargeNumber(cdInvestments[index].cycleIncome / cdInvestments[index].cycleTime) || 0)}</TableCell>
						<TableCell>{formatLargeNumber(((100 * cdInvestments[index].cycleIncome / cdInvestments[index].cycleTime) / cdTotalIncome) || 0)}%</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}