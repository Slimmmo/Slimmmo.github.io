import { useEffect, useState } from 'react'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent
} from "@/components/ui/card"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"

import { illionsArr } from './Helpers'
import calcDataStore from './Store_CalcData'
import staticDataStore from './Store_StaticData'
import { formatLargeNumber, formatTime } from './Helpers'
import userDataStore from './Store_UserData'

export default function AngelCalculations() {
	const sdAngelScale = staticDataStore(state => state.staticData.angelScale)
	const cdTotalIncome = calcDataStore(state => state.totalIncome)
	const uiNumAngels = userDataStore(state => state.numAngels)

	const [angelsEarning, setAngelsEarning] = useState(0)
	const [earningsOpen, setEarningsOpen] = useState(false)
	const [angelNumberEarning, setAngelNumberEarning] = useState<number | ''>(0)
	const [angelIllionsEarning, setAngelIllionsEarning] = useState('')
	const [angelsSacrificed, setAngelsSacrificed] = useState(0)
	const [sacrificedOpen, setSacrificedOpen] = useState(false)
	const [angelNumberSacrificed, setAngelNumberSacrificed] = useState<number | ''>(0)
	const [angelIllionsSacrificed, setAngelIllionsSacrificed] = useState('')
	const [angelCalcTable, setAngelCalcTable] = useState<[string, number, number, number, number][]>([])
	const [customAngelMul, setCustomAngelMul] = useState<number | ''>('')

	useEffect(() => {
		if (angelNumberEarning === '') return
		const index = illionsArr.indexOf(angelIllionsEarning)
		if (index === 0) {
			setAngelsEarning(angelNumberEarning)
		} else {
			setAngelsEarning(angelNumberEarning * Math.pow(10, 3 + (index * 3)))
		}
	}, [angelNumberEarning, angelIllionsEarning])

	useEffect(() => {
		if (angelNumberSacrificed === '') return
		const index = illionsArr.indexOf(angelIllionsSacrificed)
		if (index === 0) {
			setAngelsSacrificed(angelNumberSacrificed)
		} else {
			setAngelsSacrificed(angelNumberSacrificed * Math.pow(10, 3 + (index * 3)))
		}
	}, [angelNumberSacrificed, angelIllionsSacrificed])

	const calcAngelCost = (numAngels: number, mul: number) => 1e+15 * Math.pow(numAngels / mul, 2)

	const calculateAngels = () => {
		let angels: [string, number, number, number, number][] = []
		let earnedNumAngels: number = uiNumAngels + angelsSacrificed
		let loopVals: [string, number][] = [['10%', 1.1], ['50%', 1.5], ['Doubled w/o Sacrificed', 2], ['Doubled', 2], ['5x', 5], ['10x', 10], ['Custom Multiplier', customAngelMul === '' ? 0 : customAngelMul]]
		for (let idx = 0; idx < loopVals.length; idx++) {
			angels[idx] = ['', 0, 0, 0, 0]
			angels[idx][0] = loopVals[idx][0]
			angels[idx][1] = idx !== 2 ? loopVals[idx][1] * earnedNumAngels : (loopVals[idx][1] * uiNumAngels) + angelsSacrificed,
			angels[idx][2] = calcAngelCost(angels[idx][1], sdAngelScale),
			angels[idx][3] = Math.max(angels[idx][2] - angelsEarning, 0),
			angels[idx][4] = angels[idx][3] / cdTotalIncome
		}
		setAngelCalcTable(angels)
	}

	return (
		<AccordionItem value="angelCalculations">
			<AccordionTrigger>Angel Calculations</AccordionTrigger>
			<AccordionContent>
				<Card className='mb-4 pt-6'>
					<CardContent>
						All of values in the tables will include sacrificed angels in calculating the number required to increase by x%. The only exception is Doubled w/o Sacrificed which should match your in game numbers exactly and does not include sacrificed angels.
					</CardContent>
				</Card>
				<div className="grid md:grid-cols-2 justify-items-center mb-2">
					<div className='flex items-center mb-2'>
						<Input className='w-full sm:w-40' type="number" step="0.001" value={angelNumberEarning} onChange={evt => { setAngelNumberEarning(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? setAngelNumberEarning(0) : null}></Input>
						<Popover open={earningsOpen} onOpenChange={setEarningsOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={earningsOpen}
									className="w-full sm:w-[200px] justify-between"
									>
									{angelIllionsEarning ? angelIllionsEarning : "*illions..."}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full sm:w-[200px] p-0">
								<Command>
									<CommandInput placeholder="*illions..." />
									<CommandEmpty>Not found.</CommandEmpty>
									<CommandGroup>
										{illionsArr.map(ill => (
											<CommandItem
												key={ill}
												value={ill}
												onSelect={currentValue => {
													setAngelIllionsEarning(currentValue)
													setEarningsOpen(false)
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														angelIllionsEarning === ill ? "opacity-100" : "opacity-0"
													)}
												/>
												{ill}
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<Label>Lifetime Earnings</Label>
					</div>
					<div className='flex items-center'>
						<Input className='w-full sm:w-40' type="number" step="0.001" value={angelNumberSacrificed} onChange={evt => { setAngelNumberSacrificed(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? setAngelNumberSacrificed(0) : null}></Input>
						<Popover open={sacrificedOpen} onOpenChange={setSacrificedOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={sacrificedOpen}
									className="w-full sm:w-[200px] justify-between"
									>
									{angelIllionsSacrificed ? angelIllionsSacrificed : "*illions..."}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full sm:w-[200px] p-0">
								<Command>
									<CommandInput placeholder="*illions..." />
									<CommandEmpty>Not found.</CommandEmpty>
									<CommandGroup>
										{illionsArr.map(ill => (
											<CommandItem
												key={ill}
												value={ill}
												onSelect={currentValue => {
													setAngelIllionsSacrificed(currentValue)
													setSacrificedOpen(false)
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														angelIllionsSacrificed === ill ? "opacity-100" : "opacity-0"
													)}
												/>
												{ill}
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<Label># Angels Sacrificed</Label>
					</div>
				</div>
				<div className='flex'>
					<Button className="m-auto mb-3" size="lg" onClick={calculateAngels}>Calculate Angels</Button>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Threshold</TableHead>
							<TableHead>Number of Angels</TableHead>
							<TableHead>Lifetime Cost</TableHead>
							<TableHead>Lifetime Difference</TableHead>
							<TableHead>Difference Time Cost</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{angelCalcTable.map((row, idx) => (
							<TableRow key={idx}>
								<TableCell className='flex items-center'>{row[0] !== 'Custom Multiplier' ? row[0] : (<><Input className='mr-1' type="number" value={customAngelMul} onChange={evt => { setCustomAngelMul(evt.target.value === '' ? '' : parseFloat(evt.target.value))}} onBlur={evt => evt.target.value === '' ? setCustomAngelMul('') : null}/>x</>)}</TableCell>
								<TableCell>{formatLargeNumber(row[1])} AI</TableCell>
								<TableCell>${formatLargeNumber(row[2])}</TableCell>
								<TableCell>${formatLargeNumber(row[3])}</TableCell>
								<TableCell>{formatTime(row[4])}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AccordionContent>
		</AccordionItem>
	)
}