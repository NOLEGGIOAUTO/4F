'use client';
import { cn } from '../lib/utils';
import React, { useEffect, useRef, useState } from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [theme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		if (!containerRef.current) return;

		const canvas = document.createElement('canvas');
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.left = '0';
		canvas.style.pointerEvents = 'none';

		containerRef.current.appendChild(canvas);
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		let count = 0;

		const handleResize = () => {
			if (canvas && containerRef.current) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		const SEPARATION = 46;
		const rows = 16;

		const draw = () => {
			if (!ctx || !canvas) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Choose a extremely beautiful gold/orange tint aligned with the brand design
			ctx.fillStyle = theme === 'dark' 
				? 'rgba(212, 175, 55, 0.15)' 
				: 'rgba(212, 175, 55, 0.06)';

			const cols = Math.ceil(canvas.width / SEPARATION) + 4;
			const centerY = canvas.height * 0.72;

			for (let ix = 0; ix < cols; ix++) {
				for (let iy = 0; iy < rows; iy++) {
					const x = ix * SEPARATION - 60;
					const zEffect = (iy + 1) / rows; // depth projection factor

					// Sine waves intersecting for a beautiful fluid 3D wave feeling
					const waveY = Math.sin((ix + count) * 0.18) * 28 * zEffect +
								  Math.sin((iy + count) * 0.28) * 18 * zEffect;

					// Perspective projection coordinate calculations
					const drawX = x + (x - canvas.width / 2) * (zEffect * 0.42);
					const drawY = centerY + (iy * 22 * zEffect) + waveY;
					const radius = 0.8 + zEffect * 2.2;

					if (drawY > 0 && drawY < canvas.height && drawX > 0 && drawX < canvas.width) {
						ctx.beginPath();
						ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
						ctx.fill();
					}
				}
			}

			count += 0.035;
			animationId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
			if (containerRef.current && canvas.parentNode === containerRef.current) {
				containerRef.current.removeChild(canvas);
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 -z-10 bg-transparent', className)}
			{...props}
		/>
	);
}
