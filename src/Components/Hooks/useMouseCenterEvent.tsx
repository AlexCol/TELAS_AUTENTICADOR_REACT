import { useLayoutEffect, useRef, useState } from "react";

export const useMouseCenterEvent = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [isRight, setIsRight] = useState<boolean>(false);
	const mouseRef = useRef<number>(0);

	useLayoutEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {			
			mouseRef.current = event.clientX;
			const centerOfScreen = windowWidth / 2;
			setIsRight(mouseRef.current > centerOfScreen);
		};
		document.addEventListener('mousemove', handleMouseMove);
		
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
		};
	}, [windowWidth]);

	return isRight
}