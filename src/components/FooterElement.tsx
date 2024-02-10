import { BsGithub, BsReddit } from 'react-icons/bs'

export default function FooterElement() {
	return (
		<div className='w-full p-4 flex justify-center bg-secondary'>
			<div className="mt-1 flex space-x-6 sm:mt-0 sm:justify-center">
				<a href="https://www.reddit.com/r/AdventureCapitalist/comments/59knd5/gates_of_heck_calculator_updated/"><BsReddit /></a>
				<a href="https://github.com/Slimmmo/Slimmmo.github.io"><BsGithub /></a>
			</div>
		</div>
	)
}
