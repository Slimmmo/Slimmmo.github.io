import { Cost, Currency, Investment, InvestmentEnum, Upgrade, UpgradeType, WorldIndex } from './Types'

import Earth from './WorldData/Earth'
import Moon from './WorldData/Moon'
import Mars from './WorldData/Mars'
import A_Capitalist_Carol from './WorldData/A_Capitalist_Carol'
import Black_and_Blue_Friday from './WorldData/Black_and_Blue_Friday'
import Cashalot from './WorldData/Cashalot'
import Cashella from './WorldData/Cashella'
import For_the_Love_of_Money from './WorldData/For_the_Love_of_Money'
import Gates_of_Heck from './WorldData/Gates_of_Heck'
import Insert_Coins_to_Continue from './WorldData/Insert_Coins_to_Continue'
import Live_Rich_and_Profit from './WorldData/Live_Rich_and_Profit'
import Live_Your_Profits from './WorldData/Live_Your_Profits'
import Making_It_Rain from './WorldData/Making_It_Rain'
import Manager_Mania_I from './WorldData/Manager_Mania_I'
import New_You_Resolutions from './WorldData/New_You_Resolutions'
import Root_of_All_Evil from './WorldData/Root_of_All_Evil'
import Saturday_Morning_Fever from './WorldData/Saturday_Morning_Fever'
import The_Excellent_AdVenture from './WorldData/The_Excellent_AdVenture'
import One_Percent_Land from './WorldData/One_Percent_Land'
import A_Nightmare_on_Easy_Street from './WorldData/A_Nightmare_on_Easy_Street'
import Thanks_Gizmo from './WorldData/Thanks_Gizmo'
import Merry_Merger from './WorldData/Merry_Merger'
import Profit_a_Bowl from './WorldData/Profit_a_Bowl'

export const illionsArr = ['', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion', 'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quindecillion', 'Sexdecillion', 'Septendecillion', 'Octodecillion', 'Novemdecillion', 'Vigintillion', 'Unvigintillion', 'Duovigintillion', 'Tresvigintillion', 'Quattuorvigintillion', 'Quinvigintillion', 'Sexvigintillion', 'Septenvigintillion', 'Octovigintillion', 'Novemvigintillion', 'Trigintillion', 'Untrigintillion', 'Duotrigintillion', 'Tretrigintillion', 'Quattuortrigintillion', 'Quintrigintillion', 'Sextrigintillion', 'Septentrigintillion', 'Octotrigintillion', 'Novemtrigintillion', 'Quadragintillion', 'Unquadragintillion', 'Duoquadragintillion', 'Trequadragintillion', 'Quattuorquadragintillion', 'Quinquadragintillion', 'Sexquadragintillion', 'Septquadragintillion', 'Octoquadragintillion', 'Novemquadragintillion', 'Quinquagintillion', 'Unquinquagintillion', 'Duoquinquagintillion', 'Trequinquagintillion', 'Quattuorquinquagintillion', 'Quinquinquagintillion', 'Sexquinquagintillion', 'Septquinquagintillion', 'Octoquinquagintillion', 'Novemquinquagintillion', 'Sexagintillion', 'Unsexagintillion', 'Duosexagintillion', 'Tresexagintillion', 'Quattuorsexagintillion', 'Quinsexagintillion', 'Sexsexagintillion', 'Septsexagintillion', 'Octosexagintillion', 'Novemsexagintillion', 'Septuagintillion', 'Unseptuagintillion', 'Duoseptuagintillion', 'Treseptuagintillion', 'Quattuorseptuagintillion', 'Quinseptuagintillion', 'Sexseptuagintillion', 'Septseptuagintillion', 'Octoseptuagintillion', 'Novemseptuagintillion', 'Octogintillion', 'Unoctogintillion', 'Duooctogintillion', 'Treoctogintillion', 'Quattuoroctogintillion', 'Quinoctogintillion', 'Sexoctogintillion', 'Septoctogintillion', 'Octooctogintillion', 'Novemoctogintillion', 'Nonagintillion', 'Unnonagintillion', 'Duononagintillion', 'Trenonagintillion', 'Quattuornonagintillion', 'Quinnonagintillion', 'Sexnonagintillion', 'Septnonagintillion', 'Octononagintillion', 'Novemnonagintillion', 'Centillion', 'Uncentillion'];
export function formatLargeNumber(val: number | null) {
	if (val === null || isNaN(val)) return null;
	var out = "",
	mCount = 0,
	e = 6;
	if (val === Infinity) {
		return "Infinity";
	} else if (val !== null) {
		while (Math.abs(val) >= Number('1e+' + e) && mCount < illionsArr.length) {
			e += 3;
			mCount++;
		}
		if (e !== 6) {
			e -= 3;
			val /= Number('1e+' + e);
		}
		if (val < 1000) {
			out = (Math.round(val * 1000) / 1000).toString();
		} else {
			out = (Math.round(val * 100) / 100).toString();
			out = out.toLocaleString();
		}
	}
	return `${out}${mCount > 0 ? ' ' : ''}${illionsArr[mCount]}`;
}

export function formatTime(val: number | null) {
	if (val === null || isNaN(val)) return null;
	if (val === Infinity) {
		return "—————";
	} else {
		val = Math.floor(val);
		var s = ("00" + val % 60).slice(-2);
		var m = ("00" + Math.floor(val / 60) % 60).slice(-2);
		var h = ("00" + Math.floor(val / 3600) % 24).slice(-2);
		var d = Math.floor(val / 86400);
		var out = "";
		if (d >= 1) {
			out += formatLargeNumber(d) + ' d';
			if (d < 100) {
			out += ', '
			}
		}
		if (d < 100) {
			out += h + ":" + m + ":" + s;
		}
		return out;
	}
}

export function costString(cost: Cost | null) {
	if (cost === null) return null
	return `${cost.currency === Currency.Cash ? "$" : "" }${formatLargeNumber(cost.price)}${cost.currency === Currency.Angels ? " AI" : "" }`
}

export function getTitleString(returnUndefined: boolean, percentage: number | null) {
	if (returnUndefined || percentage === null) return undefined
	if (percentage > 0) {
		return `Income increase: ${formatLargeNumber(percentage * 100)}%`
	} else if (percentage === 0) {
		return 'Income is the same'
	} else {
		return `Income decrease: ${formatLargeNumber(percentage * 100)}%`
	}
}

export function getWorldData(id: string | number) {
	switch(id) {
		case 'Earth':
		case WorldIndex.Earth:
			return Earth
		case 'Moon':
		case WorldIndex.Moon:
			return Moon
		case 'Mars':
		case WorldIndex.Mars:
			return Mars
		case 'A Capitalist Carol':
		case WorldIndex.A_Capitalist_Carol:
			return A_Capitalist_Carol
		case 'Black & Blue Friday':
		case WorldIndex.Black_and_Blue_Friday:
			return Black_and_Blue_Friday
		case 'Cashalot':
		case WorldIndex.Cashalot:
			return Cashalot
		case 'Cashella':
		case WorldIndex.Cashella:
			return Cashella
		case 'For the Love of Money':
		case WorldIndex.For_the_Love_of_Money:
			return For_the_Love_of_Money
		case 'Gates of Heck':
		case WorldIndex.Gates_of_Heck:
			return Gates_of_Heck
		case 'Insert Coins to Continue':
		case WorldIndex.Insert_Coins_to_Continue:
			return Insert_Coins_to_Continue
		case 'Live Rich and Profit':
		case WorldIndex.Live_Rich_and_Profit:
			return Live_Rich_and_Profit
		case 'Live Your Profits':
		case WorldIndex.Live_Your_Profits:
			return Live_Your_Profits
		case 'Making It Rain':
		case WorldIndex.Making_It_Rain:
			return Making_It_Rain
		case 'Manager Mania I':
		case WorldIndex.Manager_Mania_I:
			return Manager_Mania_I
		case 'New You Resolutions':
		case WorldIndex.New_You_Resolutions:
			return New_You_Resolutions
		case 'Root of All Evil':
		case WorldIndex.Root_of_All_Evil:
			return Root_of_All_Evil
		case 'Saturday Morning Fever':
		case WorldIndex.Saturday_Morning_Fever:
			return Saturday_Morning_Fever
		case 'The Excellent AdVenture':
		case WorldIndex.The_Excellent_AdVenture:
			return The_Excellent_AdVenture
		case '1% Land':
		case WorldIndex.One_Percent_Land:
			return One_Percent_Land
		case 'A Nightmare on Easy Street':
		case WorldIndex.A_Nightmare_on_Easy_Street:
			return A_Nightmare_on_Easy_Street
		case 'Thanks-Gizmo':
		case WorldIndex.Thanks_Gizmo:
			return Thanks_Gizmo
		case 'Merry Merger':
		case WorldIndex.Merry_Merger:
			return Merry_Merger
		case 'Profit-a-Bowl' || Profit_a_Bowl:
			return Profit_a_Bowl
		default:
			return null
	}
}

export function investmentNameString(upgrade: Upgrade, investments: Investment[] | undefined) {
	let retVal = ''
	if ('world' in upgrade && upgrade.world !== undefined) investments = getWorldData(upgrade.world)?.investments
	if (investments === undefined) {
		retVal = 'undefined'
	} else if (upgrade.investment >= 0) {
		retVal += `${investments[upgrade.investment].name}`
	} else if (upgrade.investment === InvestmentEnum.All) {
		retVal = 'All'
	} else if (upgrade.investment === InvestmentEnum.AngelInvestor) {
		retVal = 'Angel Investor'
	}
	if (upgrade.type === UpgradeType.FreeLevels) {
		retVal = `+${upgrade.amount} ${retVal}`
	} else if (upgrade.type !== UpgradeType.AngelEffectiveness) {
		retVal += ` ${upgrade.type === UpgradeType.Profit ? "Profit" : "Speed" } ${upgrade.amount}`
	} else {
		retVal += ` ${upgrade.amount}`
	}
	return retVal
}

export function legacyPlanetNameConverter(legacyName: string) {
	switch(legacyName) {
		case 'earth':
			return 'Earth'
		case 'moon':
			return 'Moon'
		case 'mars':
			return 'Mars'
		case 'carol':
			return 'A Capitalist Carol'
		case 'friday':
			return 'Black & Blue Friday'
		case 'cashalot':
			return 'Cashalot'
		case 'cashella':
			return 'Cashella'
		case 'love':
			return 'For the Love of Money'
		case 'halloween':
			return 'Gates of Heck'
		case 'coins':
			return 'Insert Coins to Continue'
		case 'liverich':
			return 'Live Rich and Profit'
		case 'lyp':
			return 'Live Your Profits'
		case 'rain':
			return 'Making It Rain'
		case 'managermaniaI':
			return 'Manager Mania I'
		case 'newyou':
			return 'New You Resolutions'
		case 'evil':
			return 'Root of All Evil'
		case 'saturday':
			return 'Saturday Morning Fever'
		case 'excellent':
			return 'The Excellent AdVenture'
		case 'onepercent':
			return '1% Land'
		case 'easystreet':
			return 'A Nightmare on Easy Street'
		case 'gizmo':
			return 'Thanks-Gizmo'
		case 'merrymerger':
			return 'Merry Merger'
		case 'profitabowl':
			return 'Profit-a-Bowl'
		default:
			return 'Earth'
	}
}

export function summaryString(upgrade: Upgrade, investments: Investment[] | undefined) {
	return investmentNameString(upgrade, investments) + `${upgrade.cost ? " (" + costString(upgrade.cost) + ")" : ""}`
}