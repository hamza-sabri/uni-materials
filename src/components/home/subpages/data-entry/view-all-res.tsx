import { match as infoPageMatch, useHistory, useLocation } from 'react-router-dom';
import { APIsCaller } from './../../../../requestes/apis-caller';
import { getAllRes, deleteRes } from './../../../../requestes/res-requests/res'
import MaterialCard from "./../viewer/material-card";
import ResCard from "./../viewer/res-card";
import * as Types from './../../../../constants/res-types';
import PdfSVG from './../../../../assets/data-entry-assets/pdf.svg'
import { updateTopicRes } from '../../../../constants/pages-route';

import lottie, { AnimationItem } from 'lottie-web';
import '../../../../styles/data-entry-styles/res/view-all-topic-res.css'
import { useEffect, useState, useRef } from 'react';
import Swal from 'sweetalert2';

import loadingIcon from '../../../../assets/material-info-assets/loading_icon.json';

interface LooseObject {
    [key: string]: any
}

// HTODO: add loding thingy.
// HTDOD: clean code more.
export default function ViewAllRes({ match }: { match: infoPageMatch<{ matID: string }> }) {
    let loc = useLocation();
    let { matID, topicID }: any = match.params;
    let { title, photo, rate, description }: any = loc.state;
    let allTypes = Object.entries(Types).map((item) => item[1]);
    let [allRes, setAllRes] = useState<Array<Array<any>>>([]);
    let [loading, setLoding] = useState(true);
    let [loadingAnimation, setLoadingAnimation] = useState<AnimationItem>();

    const loadingDivRef = useRef(null);

    // HTODO: add to local storage.
    useEffect(() => {
        // loading animation for the loading animation.
        // this comment is intended to be confusing :);
        setLoadingAnimation(lottie.loadAnimation({
            container: loadingDivRef.current!,
            autoplay: true,
            renderer: 'svg',
            loop: true,
            animationData: loadingIcon,
        }));


        const getData = async () => {
            const requestParams = { materialID: matID, topicID: topicID };
            let { data } = await APIsCaller({ api: getAllRes, requestParams: requestParams });
            let tempAllRes = new Array(allTypes.length).fill(0).map(() => new Array()) as any;
            data.resorses.forEach((item: any) => {
                tempAllRes[allTypes.indexOf(item.resType)].push(item)
                setLoding(false);
            });
            setAllRes(tempAllRes);
        }
        getData();
    }, [])

    let editResFun = (history: any, cardID: any, cardTitle: any, cardPhoto: any, ResDes: any, info: any) => {
        console.log("resType", info.resType);
        history.push(`${updateTopicRes}/${info.resType}/${matID}/${topicID}/${cardID}`, { materialID: matID, topicID: topicID, ResID: cardID, name: cardTitle, photo: cardPhoto, description: ResDes, info: info })
    }

    let deleteResFun = async (cardID: any) => {
        const requestParams = { materialID: matID, topicID: topicID, resorseID: cardID };
        // HTODO: Make this a comp
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleting Topic",
                    text: "Please Wait...",
                    didOpen: async () => {
                        Swal.showLoading();
                        let res = await APIsCaller({ api: deleteRes, requestParams });
                        Swal.hideLoading();
                        if (res.status === 200) {
                            // after deleting completed
                            removeFromAllRes(cardID);
                            Swal.fire(
                                'Deleted!',
                                res.data.message,
                                'success'
                            )
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!',
                                footer: '<a href>Please Try Agian</a>'
                            })
                        }

                    }
                })
            }
        })
    }

    // HTODO: make this better.
    let removeFromAllRes = (resID: string) => {
        let newRes = allRes.map(item => {
            return item.filter(res => {
                return res.resID !== resID;
            })
        })
        setAllRes(newRes);
    }

    let showRes = (history:any, info: LooseObject) => {
        info.readOnly = true;
        history.push(`${updateTopicRes}/${info.resType}/${matID}/${topicID}/${info.resID}`, { materialID: matID, topicID: topicID, ResID: "", name: "", photo: "", description: "", info: info })
    }

    let onClickHandlers = {
        edit: editResFun,
        delete: deleteResFun,
        body: (history:any,info: any) => { },
    }

    return (
        <div className="all-topic-res-contianer">
            {/* TODO: move this to be a component */}
            <div id="material-card">
                <MaterialCard cardTitle={title} cardPhoto={photo} cardRate={rate} />
            </div>

            <div id="desc">
                <p id="desc-title">Description: </p>
                <p id="desc-text">{description || "No Description"}</p>
            </div>

            <div className="resource-section">
                {
                    (loading) ?
                        <div  className="loading-div" ref={loadingDivRef}></div>
                        : allRes.map((item: any, idx: any) => {
                            return (
                                <div key={idx} tabIndex={0} className="expand-on-foucs">
                                    <span className="section-name"><span>{allTypes[idx]}</span><span className="arrow">&#9660;</span></span>
                                    <div className="content-section">
                                        {
                                            item.map((res: any, id: any) => {
                                                switch (res.resType) {
                                                    case "PDFs":
                                                        // resID
                                                        // fileName: "test"
                                                        // bookRefrence: "https://res.cloudinary.com/dgviin24k/image/upload/v1620041621/20vanemdeboastrees.pdf"
                                                        // rate: 5
                                                        onClickHandlers.body = (info: any) => { };
                                                        return (
                                                            <a key={id} href={res.link || res.bookRefrence} target="_blank">
                                                                <ResCard key={id}
                                                                    cardID={res.resID}
                                                                    cardPhoto={PdfSVG}
                                                                    cardTitle={res.fileName || title || "Book Chapter"}
                                                                    cardRate={res.rate}
                                                                    info={res}
                                                                    onClickHandlers={{...onClickHandlers}}
                                                                />
                                                            </a>
                                                        )
                                                        break;
                                                    case "Videos":
                                                        // link: "youtube-link-test"
                                                        // resType: "Videos"
                                                        // rate: 0
                                                        // videoImage: "/static/media/youtube.2044ed05.jpg"
                                                        // videoName: "???????
                                                        onClickHandlers.body = (info: any) => { };
                                                        return (
                                                            <a key={id} href={res.link} target="_blank">
                                                                <ResCard key={id}
                                                                    cardID={res.resID}
                                                                    cardPhoto={res.videoImage}
                                                                    cardTitle={res.videoName}
                                                                    cardRate={res.topicRate}
                                                                    info={res}
                                                                    onClickHandlers={{...onClickHandlers}} />
                                                            </a>)
                                                        break;
                                                    case "Q&A":
                                                        // QName: "best Q" 
                                                        // answer: "aaaaaa"
                                                        // question: "a"
                                                        // resType: "Q&A"
                                                        // rate: 0
                                                        onClickHandlers.body = showRes;
                                                        return (
                                                            <ResCard key={id}
                                                                cardID={res.resID}
                                                                cardPhoto={photo}
                                                                cardTitle={res.QName || "Q N"}
                                                                cardRate={res.topicRate}
                                                                info={res}
                                                                onClickHandlers={{...onClickHandlers}} />)
                                                        break;
                                                    case "Resources":
                                                        // link: "test-link"
                                                        // resType: "Resources"
                                                        // topicRate: 0
                                                        // websiteImage: "/static/media/website.499d2971.webp"
                                                        // websiteName: "???????"
                                                        onClickHandlers.body = (info: any) => { };
                                                        return (
                                                            <a key={id} href={res.link} target="_blank">
                                                                <ResCard key={id}
                                                                    cardID={res.resID}
                                                                    cardPhoto={res.websiteImage}
                                                                    cardTitle={res.websiteName}
                                                                    cardRate={res.topicRate}
                                                                    info={res}
                                                                    onClickHandlers={{...onClickHandlers}} />
                                                            </a>)
                                                        break;
                                                    case "Laws":
                                                        // lawConent: "aa"
                                                        // lawExample: "aaa"
                                                        // lawName: "a"
                                                        // resType: "Laws"
                                                        // topicRate: 0
                                                        onClickHandlers.body = showRes;
                                                        return (
                                                            <ResCard key={id}
                                                                cardID={res.resID}
                                                                cardPhoto={photo}
                                                                cardTitle={res.lawName}
                                                                cardRate={res.topicRate}
                                                                info={res}
                                                                onClickHandlers={{...onClickHandlers}} />)
                                                        break;
                                                    default:
                                                        console.log("Something worng have happend");
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>

    )
}