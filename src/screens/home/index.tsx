import { CustomAreaChart } from './CustomAreaChart'
import { CustomRadialChart } from './CustomRadialChart'
import { DonutChart } from './DonutChart'

export default function HomePage() {
	return (
		<section className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
			<DonutChart />
			<CustomRadialChart />
			<div className='lg:col-span-2'>
				<CustomAreaChart />
			</div>
		</section>
	)
}
