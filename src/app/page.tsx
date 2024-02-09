'use client'

import { useEffect, useState } from "react"

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import calcDataStore from "@/components/Store_CalcData"

import Angels from "@/components/Angels"
import Header from "@/components/Header"
import Investment from "@/components/Investment"
import { ModeToggle } from "@/components/ModeToggle"
import PlanetSelector from "@/components/PlanetSelector"
import Reset from "@/components/Reset"
import SaveLoad from "@/components/SaveLoad"
import CostOfUpgrades from "@/components/CostOfUpgrades"
import CashUpgrades from "@/components/CashUpgrades"
import userDataStore from "@/components/Store_UserData"
import AngelUpgrades from "@/components/AngelUpgrades"
import Managers from "@/components/Managers"
import PlatinumSuits from "@/components/PlatinumSuits"
import OtherBonuses from "@/components/OtherBonuses"
import SuperBadges from "@/components/SuperBadges"
import Income from "@/components/Income"
import AngelCalculations from "@/components/AngelCalculations"
import RecommendationFilters from "@/components/RecommendationFilters"
import Recommendations from "@/components/Recommendations"
import FooterElement from "@/components/FooterElement"

export default function Home() {
	const { uiInit, uiSaveLocal } = userDataStore(state => ({ uiInit: state.init, uiSaveLocal: state.saveLocal }))
	const [ loaded, setLoaded ] = useState(false)

	useEffect(() => {
		uiInit()
		setLoaded(true)
	}, [uiInit])

	return (
		<div>
			<nav className="flex flex-wrap p-2 pt-3 w-full justify-center md:justify-between">
				<Header />
				<div className="flex">
					<SaveLoad disabled={!loaded}/>
					<ModeToggle />
				</div>
			</nav>
			<main className="p-1">
				{ loaded ? 
					<>
						<PlanetSelector />
						<div className="flex flex-wrap justify-center md:justify-between mb-5">
							<Angels />
							<Reset />
						</div>
						<div className="overflow-x-auto">
							<Investment />
						</div>
						<Separator />
						<Accordion type="multiple" className="w-full mb-3">
							<CostOfUpgrades />
							<CashUpgrades />
							<AngelUpgrades />
							<Managers />
							<PlatinumSuits />
							<OtherBonuses />
							<SuperBadges />
						</Accordion>
						<div className="flex justify-center">
							<Button className="m-auto mb-3" size="lg" onClick={() => { uiSaveLocal(); calcDataStore.getState().calculate() }}>Calculate</Button>
						</div>
						<Income />
						<Accordion type="multiple" className="w-full mb-3">
							<AngelCalculations />
							<RecommendationFilters />
						</Accordion>
						<Recommendations />
					</>
				:
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
						<div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
						</div>
					</div>
				}
			</main>
			<FooterElement />
		</div>
	);
}
