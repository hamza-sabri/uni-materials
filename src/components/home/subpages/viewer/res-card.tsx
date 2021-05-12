import React, { Fragment, useEffect, useRef, useState } from 'react';
// import { cardInterface } from '../../../../interfaces/cards/cards';
import deleteIcon from '../../../../assets/material-info-assets/Delete_icon.json';
import editIcon from '../../../../assets/material-info-assets/Edit_icon.json';
import lottie, { AnimationItem } from 'lottie-web';

import '../../../../styles/viewer/topic-card/topic-card.css';
import { useHistory } from 'react-router-dom';

// TODO: Check the card interface
export default function ResCard({ cardID, cardPhoto, cardTitle, cardRate, info, onClickHandlers, description }: any) {
	const Card = () => {
		let deleteBtnRef = useRef(null);
		let editBtnRef = useRef(null);
		const [deleteAnim, setDeleteAnim] = useState<AnimationItem>();
		const [editAnim, setEditAnim] = useState<AnimationItem>();
		let history = useHistory();

		useEffect(() => {
			setDeleteAnim(lottie.loadAnimation({
				container: deleteBtnRef.current!,
				autoplay: false,
				renderer: 'svg',
				loop: false,
				animationData: deleteIcon,
			}));

			setEditAnim(lottie.loadAnimation({
				container: editBtnRef.current!,
				autoplay: false,
				renderer: 'svg',
				loop: false,
				animationData: editIcon,
			}));
		}, [])

		let handleOnClick = (e: any) => {
			let path = e.nativeEvent.composedPath();
			if (onClickHandlers && onClickHandlers.edit && path.includes(editBtnRef.current)) {
				// handle onClick for editBtn
				e.preventDefault()
				onClickHandlers.edit(history, cardID, cardTitle, cardPhoto, description, info);
				// history.push(updateTopic, { materialID: materialID, topicID: cardID, name: cardTitle, photo: cardPhoto, description: description })
			} else if (onClickHandlers && onClickHandlers.delete && path.includes(deleteBtnRef.current)) {
				// handle onClick for deleteBtn
				e.preventDefault()
				onClickHandlers.delete(cardID)
			} else if (onClickHandlers && onClickHandlers.body) {
				// handle onClick for the showRes
				onClickHandlers.body(history, info);
				// history.push(`${routeTo}/${materialID}/${cardID}`, { title: cardTitle, photo: cardPhoto, rate: cardRate, description: description })
			} else {
				console.log('nothing');
			}
		}

		return (
			// HTODO: Make component
			<div className="topic-card">
				<img src={cardPhoto} alt="card-img" />
				<div className="top-part-container">
					<div className="icons-contianer">
						{/*  HTODO: onClick: Apicall */}
						<div className="icon delete-icon" ref={deleteBtnRef} onClick={(e) => { handleOnClick(e) }} onMouseEnter={() => { if (deleteAnim) deleteAnim!.play() }} onMouseLeave={() => { if (deleteAnim) deleteAnim!.stop() }}></div>
						{/* HTODO: onClick: Route */}
						<div className="icon edit-icon" ref={editBtnRef} onClick={(e) => { handleOnClick(e); }} onMouseEnter={() => { if (editAnim) editAnim!.play() }} onMouseLeave={() => { if (editAnim) editAnim!.stop() }}></div>
					</div>

					<div className="topic-rate-container">
						<span className="topic-rate-content">
							<svg height="20px" viewBox="0 -10 511.98685 511" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"
									fill="#ffc107"
								/>
							</svg>
							<span>{cardRate}</span>
						</span>
					</div>
				</div>

				<div className="material-name-container topic-name-container">
					<pre>{cardTitle}</pre>
				</div>

				<div onClick={(e) => { handleOnClick(e); }} style={{ width: "100%", height: "100%", position: "absolute", left: 0, top: "20%" }}></div>
			</div>
		);
	};
	return <Fragment>{<Card />}</Fragment>;
}
