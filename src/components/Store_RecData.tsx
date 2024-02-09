import { create } from 'zustand'

interface RecData {
	hide1: boolean;
	changeHide1: (val: boolean) => void;
	hide10: boolean;
	changeHide10: (val: boolean) => void;
	hide100: boolean;
	changeHide100: (val: boolean) => void;
	days: number | '';
	changeDayFilter: (val: number | '') => void;
	hours: number | '';
	changeHourFilter: (val: number | '') => void;
	minutes: number | '';
	changeMinuteFilter: (val: number | '') => void;
	percent: number | '';
	changePercentFilter: (val: number | '') => void;
}

const recDataStore = create<RecData>(set => ({
	hide1: false,
	changeHide1: (val) => set(() => ({ hide1: val })),

	hide10: false,
	changeHide10: (val) => set(() => ({ hide10: val })),

	hide100: false,
	changeHide100: (val) => set(() => ({ hide100: val })),

	days: '',
	changeDayFilter: (val) => set(() => ({ days: val })),

	hours: '',
	changeHourFilter: (val) => set(() => ({ hours: val })),

	minutes: '',
	changeMinuteFilter: (val) => set(() => ({ minutes: val })),

	percent: '',
	changePercentFilter: (val) => set(() => ({ percent: (val === '') ? val : (val / 100) }))
}))

export default recDataStore