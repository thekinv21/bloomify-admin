import './Loader.scss'

export function Loader() {
	return (
		<div className='flex h-screen items-center justify-center'>
			<svg
				className='pl'
				width='128px'
				height='128px'
				viewBox='0 0 128 128'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle
					className='pl__ring2'
					cx='64'
					cy='64'
					r='52.5'
					fill='none'
					stroke='hsl(13,90%,55%)'
					strokeWidth='12'
					transform='rotate(-90,64,64)'
					strokeLinecap='round'
					strokeDasharray='329.9 329.9'
					strokeDashoffset='-329.3'
				></circle>

				<circle
					className='pl__ring4'
					cx='64'
					cy='64'
					r='37.5'
					fill='none'
					stroke='hsl(33,90%,55%)'
					strokeWidth='9'
					transform='rotate(-90,64,64)'
					strokeLinecap='round'
					strokeDasharray='254.5 254.5'
					strokeDashoffset='-254'
				></circle>

				<circle
					className='pl__ring6'
					cx='64'
					cy='64'
					r='22.5'
					fill='none'
					stroke='hsl(53,90%,55%)'
					strokeWidth='9'
					transform='rotate(-90,64,64)'
					strokeLinecap='round'
					strokeDasharray='204.2 204.2'
					strokeDashoffset='-203.9'
				></circle>
			</svg>
		</div>
	)
}
