import {
	Card,
	CardContent
} from "@/components/ui/card"

import { formatLargeNumber } from "./Helpers"
import calcDataStore from "./Store_CalcData"

export default function Income() {
	const incomePerSecond = calcDataStore(state => state.totalIncome)
	return (
		<Card className="pt-6 mb-3">
			<CardContent>
				<h2 className="text-xl">Total $ / second: {incomePerSecond} ({formatLargeNumber(incomePerSecond)})</h2>
				<h2 className="text-xl">Total $ / minute: {incomePerSecond * 60} ({formatLargeNumber(incomePerSecond * 60)})</h2>
				<h2 className="text-xl">Total $ / hour: {incomePerSecond * 3600} ({formatLargeNumber(incomePerSecond * 3600)})</h2>
			</CardContent>
		</Card>
	)
}