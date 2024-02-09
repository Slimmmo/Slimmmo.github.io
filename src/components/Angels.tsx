"use client"

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

import { illionsArr } from './Helpers'
import userDataStore from './Store_UserData'

export default function Angels() {
	const [angelNumber, setAngelNumber] = useState<number | ''>(0)
	const [angelIllions, setAngelIllions] = useState('')
	const [illionsOpen, setIllionsOpen] = useState(false)

	const { uiChangeAngels, uiNumAngels, uiNumLoads } = userDataStore(state => ({ uiChangeAngels: state.changeNumAngels, uiNumAngels: state.numAngels, uiNumLoads: state.numLoads }))

	useEffect(() => {
		if (angelNumber === '') return
		// why is the combobox values for illionsArr all lowercase?
		const index = illionsArr.indexOf(angelIllions.charAt(0).toUpperCase() + angelIllions.slice(1))
		if (index === 0) {
			uiChangeAngels(angelNumber)
		} else {
			uiChangeAngels(angelNumber * Math.pow(10, 3 + (index * 3)))
		}
	}, [angelNumber, angelIllions])

	useEffect(() => {
		if (uiNumAngels < 1e6) {
			setAngelNumber(uiNumAngels)
			setAngelIllions('')
		} else {
			let e = 6
			while (uiNumAngels >= Number(`1e+${e}`)) {
				e += 3
			}
			if (e !== 6) e -= 3
			setAngelNumber(uiNumAngels / Number(`1e+${e}`))
			setAngelIllions(illionsArr[(e - 3) / 3])
		}
	}, [uiNumLoads])

	return (
		<div className='w-full sm:w-auto justify-center sm:justify-normal inline-flex flex-wrap items-center mb-2 sm:mb-0'>
			<Input className='w-full sm:w-40' type="number" step="0.001" value={angelNumber} onChange={evt => { setAngelNumber(evt.target.value === '' ? '' : parseFloat(evt.target.value)) }} onBlur={evt => evt.target.value === '' ? setAngelNumber(0) : null}></Input>
			<Popover open={illionsOpen} onOpenChange={setIllionsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={illionsOpen}
						className="w-full sm:w-[200px] justify-between"
						>
						{angelIllions ? angelIllions : "*illions..."}
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
										setAngelIllions(currentValue)
										setIllionsOpen(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											angelIllions === ill.toLowerCase() ? "opacity-100" : "opacity-0"
										)}
									/>
									{ill}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
			<Label># of Angels</Label>
		</div>
	)
}