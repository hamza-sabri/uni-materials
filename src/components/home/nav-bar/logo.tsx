import { motion, Variants } from 'framer-motion';
import { homePageRoute } from '../../../constants/pages-route';
import { NavLink } from 'react-router-dom';
export default function Logo() {
	const repeatDelay = 25.5;
	const svgVariants: Variants = {
		hidden: {
			scale: 0.95
		},
		visible: {
			scale: 1.02,
			transition: {
				duration: 1.5,
				ease: 'backInOut',
				repeat: Infinity,
				repeatDelay,
				repeatType: 'reverse',
				delay: 6
			}
		}
	};
	const pathVariants: Variants = {
		hidden: {
			opacity: 0.1,
			pathLength: 0,
			rotate: 180,
			y: '-20%',
			x: '-80%'
		},
		visible: {
			y: '0',
			x: '0',
			rotate: 0,
			opacity: 1,
			pathLength: 1,
			transition: {
				duration: 2,
				ease: 'backInOut',
			}
		}
	};

	const mVariants: Variants = {
		hidden: {
			opacity: 0,
			pathLength: 0,
			rotate: -360
		},
		visible: {
			rotate: 0,
			opacity: 1,
			pathLength: 1,
			transition: {
				duration: 2,
				ease: 'backInOut',
				delay: 2,
				staggerChildren: 2,
			}
		}
	};

	const aVariants: Variants = {
		hidden: {
			opacity: 0,
			pathLength: 0,
			y: '-100%'
		},
		visible: {
			rotate: 0,
			opacity: 1,
			pathLength: 1,
			y: '0',
			transition: {
				duration: 1.5,
				ease: 'backInOut',
				delay: 2.8,
				staggerChildren: 2,
			}
		}
	};

	const tVariants: Variants = {
		hidden: {
			opacity: 0,
			pathLength: 0,
			y: '100%'
		},
		visible: {
			rotate: 0,
			opacity: 1,
			pathLength: 1,
			y: '0',
			transition: {
				duration: 1.8,
				ease: 'backInOut',
				delay: 3.2,
				staggerChildren: 2,
			}
		}
	};

	return (
		<NavLink to={homePageRoute} className="logo">
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 383.4 89.62"
				initial="hidden"
				animate="visible"
				variants={svgVariants}
			>
				<g id="Layer_2" data-name="Layer 2">
					<g id="Layer_1-2" data-name="Layer 1">
						<motion.path
							variants={pathVariants}
							className="cls-1"
							d="M110.63,10.45A386.22,386.22,0,0,0,98.06,47.86q-4.41,16.28-4.41,26.19,0,7.19,2.5,10.56a24.59,24.59,0,0,1-4.84,2.5,13.86,13.86,0,0,1-4.85.87,10.14,10.14,0,0,1-3.92-.76,8.09,8.09,0,0,1-3.27-2.56A14.2,14.2,0,0,1,77,80a23.54,23.54,0,0,1-.88-7c0-1.46.06-3,.17-4.63a47.55,47.55,0,0,1,.6-5Q66.43,77,58.2,83.3T45.3,89.62q-7.08,0-10.67-5.39T31,70.13a60.13,60.13,0,0,1,1.47-12.2,106.26,106.26,0,0,1,4.25-14.54,141.57,141.57,0,0,1,6.7-15.3A120.63,120.63,0,0,1,52.16,13.5a87.57,87.57,0,0,0-18.51,6.26,48.79,48.79,0,0,0-11.82,7.79,24.84,24.84,0,0,0-6.26,8.71,23.81,23.81,0,0,0-1.85,8.93c0,.73,0,1.45.11,2.18a12.88,12.88,0,0,0,.33,2Q6.09,46.72,3.05,43a12.69,12.69,0,0,1-3-8.27A20.14,20.14,0,0,1,4.25,22.87Q8.5,17,17.75,12.2t23.9-8.06Q56.29.87,77.2,0a5.6,5.6,0,0,1,.44,2.29,4.44,4.44,0,0,1-.27,1.58,9.59,9.59,0,0,1-.82,1.57,15.32,15.32,0,0,1-1.47,2c-.62.73-1.4,1.6-2.34,2.62L60.87,11.65a12.06,12.06,0,0,1,3.48,1.69A8.71,8.71,0,0,1,67,16.22c-1.24,2-2.54,4.38-3.92,7s-2.71,5.44-4,8.38-2.48,6-3.64,9.1-2.2,6.19-3.11,9.2a82,82,0,0,0-2.12,8.6,39.82,39.82,0,0,0-.76,7.24q0,7.19,5.33,7.19a8.42,8.42,0,0,0,4.3-1.85,41.73,41.73,0,0,0,6.16-5.56c2.32-2.46,4.86-5.5,7.62-9.09s5.62-7.75,8.6-12.47q2.17-7.62,5.23-15.84t6.53-16.72Q99.42,7.31,104.1,7.3T110.63,10.45Z"
						/>
						<motion.path
							variants={pathVariants}
							className="cls-1"
							d="M169.76,58.26a11.41,11.41,0,0,1,.22,2.17,13.64,13.64,0,0,1-.77,3.71,11.53,11.53,0,0,1-1.85,3.37A105.76,105.76,0,0,1,159,77.2a69.88,69.88,0,0,1-7,6.32A25.75,25.75,0,0,1,146.51,87a11.1,11.1,0,0,1-4.19,1A10.39,10.39,0,0,1,137,86.57a10.11,10.11,0,0,1-4-4.68,29.82,29.82,0,0,1,1.09-4.9,74.63,74.63,0,0,1,2.94-8.17L144,51.94a1.7,1.7,0,0,0-1.74-1.09c-.94,0-2.25.86-3.92,2.56a59.59,59.59,0,0,0-5.55,6.81q-3.06,4.25-6.43,9.8t-6.64,11.43c-2.32,4.36-5.16,6.53-8.49,6.53a7.79,7.79,0,0,1-4.69-1.58A11.84,11.84,0,0,1,102.9,82l9.15-29.95c.5-1.81,1-3.63,1.58-5.44s1-3.54,1.47-5.18.79-3.08,1.09-4.35a25.91,25.91,0,0,0,.54-3.11,43.77,43.77,0,0,1,5-.32q5.22,0,7.68,1.63a6.33,6.33,0,0,1,2.88,4.47,35.73,35.73,0,0,1-1.74,5.39q-1.63,4.41-5.55,13.23a3.27,3.27,0,0,0,2.39-.77,145.78,145.78,0,0,1,9.69-12.19,71.39,71.39,0,0,1,7.46-7.3,22.61,22.61,0,0,1,5.55-3.54,11.59,11.59,0,0,1,4.09-.92,9.52,9.52,0,0,1,5.28,1.58A9.39,9.39,0,0,1,163.12,40a40.6,40.6,0,0,1-1.74,6c-.95,2.69-2,5.54-3.11,8.55L155,63.27a60.15,60.15,0,0,0-2.12,6.53,1.18,1.18,0,0,0,.44.92,1.42,1.42,0,0,0,1,.39c.58,0,2.23-1,4.95-2.89A71.21,71.21,0,0,0,169.76,58.26Z"
						/>
						<motion.path
							variants={pathVariants}
							className="cls-1"
							d="M197.53,58.26a3,3,0,0,1,.21,1.09v1.08a13,13,0,0,1-2.61,7.08Q187,78.07,180.54,83t-10.45,5c-3.71,0-6.57-2.46-8.61-7.4l8.82-28.53c.51-1.81,1-3.63,1.58-5.44s1-3.54,1.47-5.18.8-3.08,1.09-4.35.51-2.31.65-3.11a43.23,43.23,0,0,1,4.9-.32q4.9,0,7.3,1.63a6.93,6.93,0,0,1,2.94,4.79l-9,29.73c0,.87.4,1.31,1.2,1.31q.87,0,4.9-3A77.19,77.19,0,0,0,197.53,58.26ZM178.69,23.85q.54-2.18,1.41-4.69a18,18,0,0,1,2.4-4.62A13.23,13.23,0,0,1,186.26,11a9.86,9.86,0,0,1,5.39-1.42,7.83,7.83,0,0,1,5.17,1.69c1.34,1.13,2,2.92,2,5.39a10,10,0,0,1-3.16,7.57,10.93,10.93,0,0,1-7.84,3,14.72,14.72,0,0,1-5.66-1A8.15,8.15,0,0,1,178.69,23.85Z"
						/>
						<motion.path
							variants={pathVariants}
							className="cls-1"
							d="M199.27,88a7,7,0,0,1-5.12-1.74,6.32,6.32,0,0,1-1.74-4.68,10.36,10.36,0,0,1,.87-4.25,11.35,11.35,0,0,1,2.34-3.43,10.93,10.93,0,0,1,3.54-2.34,11.13,11.13,0,0,1,4.36-.87,6.77,6.77,0,0,1,5.06,1.74,6.62,6.62,0,0,1,1.69,4.79,10.08,10.08,0,0,1-.87,4.14,11.43,11.43,0,0,1-2.35,3.43,11.1,11.1,0,0,1-3.48,2.34A10.73,10.73,0,0,1,199.27,88Z"
						/>
						<svg>
							<motion.path
								variants={mVariants}
								className="cls-2"
								d="M316.54,64.35a123.37,123.37,0,0,1-5.39,11.11,32.79,32.79,0,0,1-6.21,8,11.56,11.56,0,0,1-8.11,3.44,7.16,7.16,0,0,1-5.93-2.51,10.24,10.24,0,0,1-2-6.64A25.82,25.82,0,0,1,290,70.62q1.09-3.77,3.38-9.86,1.95-5.32,3-8.87a23.28,23.28,0,0,0,1-6.48c0-3.78-1.89-5.66-5.67-5.66q-2.94,0-6.47,3.75a48.25,48.25,0,0,0-6.65,9.2,69.77,69.77,0,0,0-4.84,10.13l-7.41,21.78a2.11,2.11,0,0,1-2.18,1.52,2.22,2.22,0,0,1-1.9-1,2,2,0,0,1-.27-2.07l7.4-21.88q2.07-6,3-9.37a23.21,23.21,0,0,0,.92-6,6.88,6.88,0,0,0-1.3-4.57,5.18,5.18,0,0,0-4.14-1.52q-3.81,0-9.48,7.94-1.41,2.19-5,8.77t-4.13,7.89l-7.41,21a2.18,2.18,0,0,1-1.14,1.36,2.74,2.74,0,0,1-1.8.17,2.35,2.35,0,0,1-1.3-1.2,2.09,2.09,0,0,1-.11-1.74l16.77-47a2.12,2.12,0,0,1,2.17-1.52,2.24,2.24,0,0,1,1.91,1,2,2,0,0,1,.27,2.07,20.63,20.63,0,0,0-1.09,2.94q5.34-6.21,10.35-6.21,4.78,0,7.4,2.78a10.14,10.14,0,0,1,2.62,7.24,27.16,27.16,0,0,1,6.42-7.08,12.22,12.22,0,0,1,7.4-2.94Q302,35.17,302,45.41A27.5,27.5,0,0,1,300.81,53q-1.15,4-3.22,9.41c-1.38,3.71-2.39,6.68-3,8.93a22.86,22.86,0,0,0-1,6.43,6.15,6.15,0,0,0,.76,3.48,2.82,2.82,0,0,0,2.5,1.09q3.93,0,7.46-4.74t8.11-15.4a1.92,1.92,0,0,1,.87-1,2.65,2.65,0,0,1,1.31-.38,2.44,2.44,0,0,1,2.29,2.29C316.87,63.12,316.76,63.56,316.54,64.35Z"
							/>
							<motion.path
								variants={aVariants}
								className="cls-2"
								d="M360.75,63.05a3.33,3.33,0,0,1-.22,1l-.11.32c-2,4.51-3.86,8.24-5.5,11.22a30.73,30.73,0,0,1-6.15,7.89,11.77,11.77,0,0,1-8.17,3.44,7,7,0,0,1-5.82-2.51,10.29,10.29,0,0,1-2-6.64q-6.54,9.15-13.62,9.15a7.61,7.61,0,0,1-6.64-3.27,14.55,14.55,0,0,1-2.29-8.5,50.48,50.48,0,0,1,3.43-16.87,53.74,53.74,0,0,1,9-16.17q5.55-6.71,11.65-6.7,7.08,0,9.91,5.77l1.85-4.9a1.89,1.89,0,0,1,.82-1,2.4,2.4,0,0,1,1.36-.38,2,2,0,0,1,1.9,1,2.11,2.11,0,0,1,.17,2l-5.45,14.6-1.2,3.37Q340.4,65.12,338.86,70a28,28,0,0,0-1.52,7.73,6.15,6.15,0,0,0,.76,3.48,2.83,2.83,0,0,0,2.5,1.09q4.47,0,8-5.39a104.18,104.18,0,0,0,7.57-14.43l.11-.32a2.28,2.28,0,0,1,2.06-1.42,3.27,3.27,0,0,1,1,.22A2.16,2.16,0,0,1,360.75,63.05ZM326.67,78.13a42.86,42.86,0,0,0,6.2-9.75q2.63-5.55,5.78-13.5l2.61-7a8.6,8.6,0,0,0-2.07-5.82,6.39,6.39,0,0,0-4.9-2.13c-3.12.08-6.17,2.14-9.15,6.21a55.26,55.26,0,0,0-7.35,14.32,46.12,46.12,0,0,0-3,13.88,14,14,0,0,0,1,5.88A3.35,3.35,0,0,0,319,82.32Q323.08,82.32,326.67,78.13Z"
							/>
							<motion.path
								variants={tVariants}
								className="cls-2"
								d="M383.4,63.05a3.33,3.33,0,0,1-.22,1q-5.34,11.43-10.4,17.15a15.56,15.56,0,0,1-12,5.72,7.29,7.29,0,0,1-5.93-2.56,10,10,0,0,1-2.13-6.59,39.09,39.09,0,0,1,1.75-9.26,126.44,126.44,0,0,1,4.46-13.17l5.55-15.57h-6.86a2.21,2.21,0,0,1-1.63-.66,2.19,2.19,0,0,1-.65-1.63,2.25,2.25,0,0,1,.65-1.58,2.14,2.14,0,0,1,1.63-.71H366q1-2.61,2.88-8.11T371.64,19a2.12,2.12,0,0,1,2.18-1.53,2.23,2.23,0,0,1,1.9,1,2.08,2.08,0,0,1,.28,2.07c-.37,1.16-1.11,3.36-2.24,6.59s-2.08,5.93-2.88,8.11h7.29a2.15,2.15,0,0,1,1.64.71,2.29,2.29,0,0,1,.65,1.58,2.24,2.24,0,0,1-2.29,2.29h-8.93l-2.61,7.62q-.33.77-3.48,9.58-3.37,9.48-4.63,13.94a27.37,27.37,0,0,0-1.25,6.86,5.36,5.36,0,0,0,.92,3.37,3.06,3.06,0,0,0,2.56,1.2q5.34,0,9.53-5.17t8.66-15.08a2.38,2.38,0,0,1,2.17-1.31,3.27,3.27,0,0,1,1,.22A2.33,2.33,0,0,1,383.4,63.05Z"
							/>
						</svg>
					</g>
				</g>
			</motion.svg>
		</NavLink>
	);
}
