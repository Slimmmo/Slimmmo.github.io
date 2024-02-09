"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { WorldIndex } from './Types'
import userDataStore from './Store_UserData'
import staticDataStore from './Store_StaticData'
import calcDataStore from './Store_CalcData'

export default function PlanetSelector() {
	const nBasePlanets = 3
	const planets = Object.keys(WorldIndex).slice(0, nBasePlanets)
	const events = Object.keys(WorldIndex).slice(nBasePlanets)
	const [ showEvents, setShowEvents ] = useState(false)
	const [ selectedEvent, setSelectedEvent ] = useState<string | undefined>(undefined)
	const [ tab, setTab ] = useState("Earth")
	const { uiInit, uiSetSelectedWorld } = userDataStore(state => ({ uiInit: state.init, uiSelectedWorld: state.selectedWorld, uiSetSelectedWorld: state.setSelectedWorld }))
	const { cdCalculate, cdReset } = calcDataStore(state => ({ cdCalculate: state.calculate, cdReset: state.reset }))
	const sdChangeStaticData = staticDataStore(state => state.changeStaticData)

	const toggleEvents = () => { setShowEvents(!showEvents) }
	const selectWorld = (val: string | undefined, isEvent: boolean = false) => {
		if (val === undefined) val = 'Earth'
		if (val === tab) return
		if (val === 'selectedEvent') {
			if (tab === 'selectedEvent') return
			if (tab === 'Events') {
				setShowEvents(false)
				setTab('selectedEvent')
				return
			}
			val = selectedEvent
			isEvent = true
		}
		if (val === 'Events') {
			toggleEvents()
		} else {
			if (val === undefined) val = 'Earth'
			uiSetSelectedWorld(val)
			sdChangeStaticData(val)
			uiInit()
			cdReset()
			cdCalculate()
			if (isEvent) {
				setSelectedEvent(val)
				val = 'selectedEvent'
			}
			setShowEvents(false)
		}
		setTab(val)
	}

	return (
		<div>
			<Tabs className='w-full mb-1' value={tab} onValueChange={tab => selectWorld(tab)}>
				<TabsList className='w-full'>
					{planets.map(planet => (
						<TabsTrigger value={planet} key={planet}>{planet}</TabsTrigger>
					))}
					{selectedEvent && (
						<TabsTrigger value='selectedEvent' key="selectedEvent">{selectedEvent}</TabsTrigger>
					)}
					<TabsTrigger value="Events" key="Events">Events</TabsTrigger>
				</TabsList>
			</Tabs>
			{showEvents ?
				<div className='flex flex-wrap justify-center'>
					{events.map(event => (
						<Button className='m-1' variant={event === selectedEvent ? 'default' : 'secondary'} key={event} onClick={() => selectWorld(event, true)}>{event}</Button>
					))}
				</div>
			: null}
		</div>
	)
}