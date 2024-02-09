"use client"

import { Button } from "@/components/ui/button"

import userDataStore from './Store_UserData'

interface SaveLoadProps {
	disabled: boolean;
}

const SaveLoad: React.FC<SaveLoadProps> = ({ disabled }) => {
	const { uiLoadSaveFile, uiSaveLocal } = userDataStore(state => ({ uiLoadSaveFile: state.loadSaveFile, uiSaveLocal: state.saveLocal }))

	const getJsonForExport = () => {
		uiSaveLocal()
		return localStorage.getItem('planets2') || '{}'
	}	

	const loadExportedJson = (json: string | ArrayBuffer | null | undefined) => {
		if (json instanceof ArrayBuffer || json === null || json === undefined) return
		uiLoadSaveFile(JSON.parse(json))
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile) {
			const reader = new FileReader()
			reader.onload = function(e) {
				loadExportedJson(e.target?.result)
			}
			reader.readAsText(selectedFile)
		}
	}
	const loadSavedState = () => { document.getElementById('fileInput')?.click() }
	const saveState = () => {
		const url = URL.createObjectURL(new Blob([getJsonForExport()], { type: 'application/json' }))
		const a = document.createElement('a')
		a.href = url
		a.download = 'AdvCapCalc.json'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)
	}

	return (
		<div className='self-center pr-1 flex flex-wrap justify-end'>
			<Button disabled={disabled} onClick={loadSavedState}>
				Load a Saved State
			</Button>
			<Button disabled={disabled} onClick={saveState}>
				Save State
			</Button>
			<input type="file" id="fileInput" className="hidden" onChange={handleFileChange}></input>
		</div>
	)
}

export default SaveLoad