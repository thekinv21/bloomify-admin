import { useMediaQuery } from './useMediaQuery'

export const useResponsive = () => {
	const isMobile = useMediaQuery('(max-width: 640px)')
	const isTablet = useMediaQuery('(max-width: 768px)')
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const isLargeDesktop = useMediaQuery('(min-width: 1280px)')
	const isExtraLargeDesktop = useMediaQuery('(min-width: 1536px)')
	const isPortrait = useMediaQuery('(orientation: portrait)')

	return {
		isMobile,
		isTablet,
		isDesktop,
		isLargeDesktop,
		isExtraLargeDesktop,
		isPortrait
	}
}
