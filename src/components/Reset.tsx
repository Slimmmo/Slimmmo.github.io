"use client"

import { Button } from "@/components/ui/button"
import userDataStore from "./Store_UserData"
import calcDataStore from "./Store_CalcData"

export default function Reset() {
	const { uiReset, uiResetExtra } = userDataStore(state => ({ uiReset: state.reset, uiResetExtra: state.resetExtra }))
	const cdCalculate = calcDataStore(state => state.calculate)

	const resetPlanet = () => {
		uiReset()
		cdCalculate()
	}
	const hardResetPlanet = () => {
		uiReset()
		uiResetExtra()
		cdCalculate()
	}
	return (
		<div className="flex w-full sm:w-auto justify-center sm:justify-normal">
			<Button onClick={resetPlanet}>Reset Planet</Button>
			<Button onClick={hardResetPlanet}>Hard Reset Planet</Button>
		</div>
	)
}