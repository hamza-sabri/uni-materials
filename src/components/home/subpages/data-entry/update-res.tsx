import React, { useEffect, useRef, useState } from 'react';
// import '../../../../../styles/data-entry-styles/res/res-adders.css';
import pdfAnimation from '../../../../assets/data-entry-assets/pdf-animation.json';
import qAndA from '../../../../assets/data-entry-assets/Q-and-A.json';
import rulesAnimation from '../../../../assets/data-entry-assets/rules.json';
import usefulResAnimation from '../../../../assets/data-entry-assets/useful-resources.json';
import videoAnimatedIcon from '../../../../assets/data-entry-assets/video-animated-icon.json';
import defualtWebsiteImage from "../../../../assets/data-entry-assets/website.webp";
import DropZone from './drop-zone';
import lottie from 'lottie-web';
import Swal from 'sweetalert2';
import { APIsCaller } from '../../../../requestes/apis-caller';
import { updateRes } from '../../../../requestes/res-requests/res';
import { pdfsType, questionAndAnswerType, rulesType, usefulResType, videosType } from '../../../../constants/res-types';
import { showLoading } from '../../../../utilities/alearts';
import { CREATED, OK } from '../../../../constants/status-codes';
import youtubeImage from "../../../../assets/data-entry-assets/youtube.jpg";
import axios from 'axios';
import { match as infoPageMatch, useLocation } from 'react-router';


export default function UpdateRes({ match }: { match: infoPageMatch<{resType: string; matID: string; topicID: string; resID: string }> }) {
    let loc = useLocation();
    let { ign1, ign2, ign3, name, photo, description, info }: any = loc.state;
    let { resType, matID, topicID, resID } = match.params;

    switch (info.resType) {
        case "PDFs":
            return <PDF matID={matID} topicID={topicID} resID={resID} fileName={info.fileName} bookRefrence={info.bookRefrence} />
            // break;
        // case "Videos":
        //     return <Video />
        //     break;
        // case "Q&A":
        //     return <QA />
        //     break;
        // case "Resources":
        //     return <UsefulRes />
        //     break;
        // case "Laws":
        //     return <Rules />
        //     break;
        default:
            console.log("Something worng have happend");
            return <p>Error Talk with Hamza</p>
    }
}

function PDF({matID, topicID, resID, fileName, bookRefrence}: any) {
    // fileName
    // bookRefrence
    const results: string[] = ['', '', ''];
    const bookLinkInput = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const pdfNameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        lottie
            .loadAnimation({
                container: divRef.current!,
                autoplay: true,
                renderer: 'svg',
                loop: true,
                animationData: pdfAnimation
            })
            .setSpeed(0.8);
    }, []);

    const submitHandler = async () => {
        const pdfName: string = pdfNameInput.current!.value;
        const pdfLink: string = bookLinkInput.current!.value;
        if (pdfName === '' || pdfLink === '') Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
        else {
            const requestParams = {
                materialID: matID,
                topicID: topicID,
                resorseID: resID
            };
            const requestBody = {
                resType: pdfsType,
                fileName: pdfName,
                bookRefrence: pdfLink
            };
            

            showLoading(0);
            const { status, data } = await APIsCaller({ api: updateRes, requestParams, requestBody });
            console.log(status, data);
            if (status === OK || status === CREATED) Swal.fire('Congrats', data.message, 'success');
            else Swal.fire('Ops!', data.message, 'error');
        }
    };
    return (
        <div className="adder">
            <div className="res-animation-container" ref={divRef} />
            <input type="text" className="res-input" placeholder="PDF Name" ref={pdfNameInput} defaultValue={fileName} onChange={e => {results[0] = e.target.value}}/>
            <input type="url" className="res-input" id="pdf-link" placeholder="PDF link" ref={bookLinkInput} defaultValue={bookRefrence} onChange={e => {results[1] = e.target.value}}/>
            <DropZone {...{ bookLinkInput, results, pdfNameInput }} />
            <div className="res-submit-btn" onClick={submitHandler}>
                submit
			</div>
        </div>
    );
}

// // TODO add loading after when the user adds the link
// function Video({matID, topicID, resID, fileName, bookRefrence}: any) {
//     const divRef = useRef<HTMLDivElement>(null);
//     const videoRef = useRef<HTMLInputElement>(null);
//     const [name, setName] = useState<string>('???????');
//     const [imgURl, setImgURL] = useState<string>(youtubeImage);
//     const submitHandler = async () => {
//         const VideoLink: string = videoRef.current!.value;
//         if (VideoLink === '') Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
//         else {
//             const requestParams = {
//                 materialID: matID,
//                 topicID: topicID
//             };
//             const requestBody = {
//                 resType: videosType,
//                 videoName: name, //TODO get the title of the video some how
//                 link: VideoLink,
//                 videoImage: imgURl
//             };
//             showLoading(0);
//             const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
//             console.log(status, data);
//             if (status === OK || status === CREATED) Swal.fire('Congrats', data.message, 'success');
//             else Swal.fire('Ops!', data.message, 'error');
//         }
//     };

//     const changeVideCard = async () => {
//         const url: string = videoRef.current!.value || '';
//         const { data } = await axios.get(`https://api.linkpreview.net/?key=d71742f9c4c457e68276f6288fdfc4d0&q=${url}`);
//         const { image, title } = data;
//         if (image) {
//             setImgURL(image);
//             setName(title);
//         } else {
//             setImgURL(youtubeImage);
//             setName('???????');
//         }
//     };

//     useEffect(() => {
//         lottie
//             .loadAnimation({
//                 container: divRef.current!,
//                 autoplay: true,
//                 renderer: 'svg',
//                 loop: true,
//                 animationData: videoAnimatedIcon
//             })
//             .setSpeed(0.8);
//     }, []);
//     return (
//         <div className="adder">
//             <div className="res-animation-container" ref={divRef} />
//             <input
//                 type="text"
//                 className="res-input"
//                 placeholder="video link"
//                 ref={videoRef}
//                 onChange={changeVideCard}
//                 onBlur={changeVideCard}
//             />
//             <div className="video-previewer">
//                 <img src={imgURl} alt="youtube" />
//                 <div className="name-wrapper">
//                     <div className="name">{name}</div>
//                 </div>
//             </div>
//             <div className="res-submit-btn" onClick={submitHandler}>
//                 submit
// 			</div>
//         </div>
//     );
// }

// function UsefulRes() {
//     const divRef = useRef<HTMLDivElement>(null);
//     const urlRef = useRef<HTMLInputElement>(null);
//     const [name, setName] = useState<string>('???????');
//     const [imgURl, setImgURL] = useState<string>(defualtWebsiteImage);

//     const changeVideCard = async () => {
//         const url: string = urlRef.current!.value || '';
//         const { data } = await axios.get(`https://api.linkpreview.net/?key=d71742f9c4c457e68276f6288fdfc4d0&q=${url}`);
//         const { image, title } = data;
//         if (image) {
//             setImgURL(image);
//             setName(title);
//         } else {
//             setImgURL(defualtWebsiteImage);
//             setName('???????');
//         }
//     };

//     const submitHandler = async () => {
//         const websiteLink: string = urlRef.current!.value;
//         if (websiteLink === '') Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
//         else {
//             const requestParams = {
//                 materialID: matID,
//                 topicID: topicID
//             };
//             const requestBody = {
//                 resType: usefulResType,
//                 websiteName: name, //TODO get the title of the video some how
//                 link: websiteLink,
//                 websiteImage: imgURl
//             };
//             showLoading(0);
//             const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
//             console.log(status, data);
//             if (status === OK || status === CREATED) Swal.fire('Congrats', data.message, 'success');
//             else Swal.fire('Ops!', data.message, 'error');
//         }
//     };

//     useEffect(() => {
//         lottie
//             .loadAnimation({
//                 container: divRef.current!,
//                 autoplay: true,
//                 renderer: 'svg',
//                 loop: true,
//                 animationData: usefulResAnimation
//             })
//             .setSpeed(0.8);
//     }, []);
//     return (
//         <div className="adder">
//             <div className="res-animation-container" ref={divRef} />
//             <input
//                 type="text"
//                 className="res-input"
//                 placeholder="Resource link"
//                 ref={urlRef}
//                 onChange={changeVideCard}
//                 onBlur={changeVideCard}
//             />
//             <div className="video-previewer">
//                 <img src={imgURl} alt="youtube" />
//                 <div className="name-wrapper">
//                     <div className="name">{name}</div>
//                 </div>
//             </div>
//             <div className="res-submit-btn" onClick={submitHandler}>
//                 submit
// 			</div>
//         </div>
//     );
// }

// function QA() {
//     const divRef = useRef<HTMLInputElement>(null);
//     const qNameRef = useRef<HTMLInputElement>(null);
//     const questionRef = useRef<HTMLTextAreaElement>(null);
//     const answerRef = useRef<HTMLTextAreaElement>(null);
//     const submitHandler = async () => {
//         const question: string = questionRef.current!.value;
//         const answer: string = answerRef.current!.value;
//         const QName: string = qNameRef.current!.value;
//         if (question === '' || answer === '' || QName === '') Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
//         else {
//             const requestParams = {
//                 materialID: matID,
//                 topicID: topicID
//             };
//             const requestBody = {
//                 resType: questionAndAnswerType,
//                 question,
//                 answer,
//                 QName,
//             };
//             showLoading(0);
//             const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
//             console.log(status, data);
//             if (status === OK || status === CREATED) Swal.fire('Congrats', data.message, 'success');
//             else Swal.fire('Ops!', data.message, 'error');
//         }
//     };
//     useEffect(() => {
//         lottie
//             .loadAnimation({
//                 container: divRef.current!,
//                 autoplay: true,
//                 renderer: 'svg',
//                 loop: true,
//                 animationData: qAndA
//             })
//             .setSpeed(0.8);
//     }, []);
//     return (
//         <div className="adder">
//             <div className="res-animation-container" ref={divRef} />
//             <input className="q-name-input" type="text" ref={qNameRef} placeholder="Question Name" />
//             <textarea className="res-text-area" placeholder="Question" ref={questionRef} />
//             <textarea className="res-text-area" placeholder="Answer" ref={answerRef} />
//             <div className="res-submit-btn" onClick={submitHandler}>
//                 submit
// 			</div>
//         </div>
//     );
// }

// function Rules() {
//     const divRef = useRef<HTMLDivElement>(null);
//     const lawNameRef = useRef<HTMLInputElement>(null);
//     const lawConentRef = useRef<HTMLTextAreaElement>(null);
//     const lawExampleRef = useRef<HTMLTextAreaElement>(null);
//     const submitHandler = async () => {
//         const lawName: string = lawNameRef.current!.value;
//         const lawConent: string = lawConentRef.current!.value;
//         const lawExample: string = lawExampleRef.current!.value;
//         if (lawName === '' || lawConent === '' || lawExample === '')
//             Swal.fire('Ops!', 'Sorry but all fields must not be empty', 'error');
//         else {
//             const requestParams = {
//                 materialID: matID,
//                 topicID: topicID
//             };
//             const requestBody = {
//                 resType: rulesType,
//                 lawName,
//                 lawConent,
//                 lawExample
//             };
//             showLoading(0);
//             const { status, data } = await APIsCaller({ api: createNewRes, requestParams, requestBody });
//             console.log(status, data);
//             if (status === OK || status === CREATED) Swal.fire('Congrats', data.message, 'success');
//             else Swal.fire('Ops!', data.message, 'error');
//         }
//     };
//     useEffect(() => {
//         lottie
//             .loadAnimation({
//                 container: divRef.current!,
//                 autoplay: true,
//                 renderer: 'svg',
//                 loop: true,
//                 animationData: rulesAnimation
//             })
//             .setSpeed(0.8);
//     }, []);
//     return (
//         <div className="adder">
//             <div className="res-animation-container" ref={divRef} />
//             <input type="text" className="res-input" placeholder="Law name" ref={lawNameRef} />
//             <textarea className="res-text-area" placeholder="Law content" ref={lawConentRef} />
//             <textarea className="res-text-area" placeholder="Example" ref={lawExampleRef} />
//             <div className="res-submit-btn" onClick={submitHandler}>
//                 submit
// 			</div>
//         </div>
//     );
// }
