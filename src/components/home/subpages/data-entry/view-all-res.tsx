import { match as infoPageMatch, useLocation } from 'react-router-dom';
import { APIsCaller } from './../../../../requestes/apis-caller';
import { getAllRes } from './../../../../requestes/res-requests/res'
import MaterialCard from "./../viewer/material-card";
import TopicCard from "./../viewer/topic-card";
import * as Types from './../../../../constants/res-types';

import '../../../../styles/data-entry-styles/res/view-all-topic-res.css'
import { useEffect, useState } from 'react';

// HTODO: add loding thingy.
// HTDOD: fix topic pass for the eidt and delete function.
// HTDOD: clean code more.
export default function ViewAllRes({ match }: { match: infoPageMatch<{ matID: string }> }) {
    let loc = useLocation();
    let { matID, topicID }: any = match.params;
    let { title, photo, rate, description }: any = loc.state;
    let allTypes = Object.entries(Types).map((item) => item[1]);
    let [allRes, setAllRes] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const requestParams = { materialID: matID, topicID: topicID };
            let { data } = await APIsCaller({ api: getAllRes, requestParams: requestParams });
            let tempAllRes = new Array(allTypes.length).fill(0).map(() => new Array()) as any;
            data.resorses.forEach((item: any) => {
                tempAllRes[allTypes.indexOf(item.resType)].push(item)
            });
            setAllRes(tempAllRes);
        }
        getData();
    }, [])

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
                    allRes.map((item: any, idx: any) => {
                        return (
                            <div key={idx} tabIndex={0} className="expand-on-foucs">
                                <span>{allTypes[idx]}<span className="arrow">&#9660;</span></span>
                                <div className="content-section">
                                    {
                                        item.map((res: any, id: any) => {
                                            // HTODO: add all the things
                                            switch (res.resType) {
                                                case "PDFs":
                                                    // bookRefrence: "http://res.cloudinary.com/dgviin24k/image/upload/v1615940771/TitlePage.pdf"
                                                    // resType: "PDFs"
                                                    return (<TopicCard key={id} cardPhoto={photo} cardTitle={title} cardRate={res.topicRate} />)
                                                    break;
                                                case "Videos":
                                                    // link: "youtube-link-test"
                                                    // resType: "Videos"
                                                    // topicRate: 0
                                                    // videoImage: "/static/media/youtube.2044ed05.jpg"
                                                    // videoName: "???????
                                                    return (<TopicCard key={id} cardPhoto={res.videoImage} cardTitle={res.videoName} cardRate={res.topicRate} />)
                                                    break;
                                                case "Q&A":
                                                    // answer: "aaaaaa"
                                                    // question: "a"
                                                    // resType: "Q&A"
                                                    // topicRate: 0
                                                    return (<TopicCard key={id} cardPhoto={photo} cardTitle={res.question} cardRate={res.topicRate} />)
                                                    break;
                                                case "Resources":
                                                    // link: "test-link"
                                                    // resType: "Resources"
                                                    // topicRate: 0
                                                    // websiteImage: "/static/media/website.499d2971.webp"
                                                    // websiteName: "???????"
                                                    return (<TopicCard key={id} cardPhoto={res.websiteImage} cardTitle={res.websiteName} cardRate={res.topicRate} />)
                                                    break;
                                                case "Laws":
                                                    // lawConent: "aa"
                                                    // lawExample: "aaa"
                                                    // lawName: "a"
                                                    // resType: "Laws"
                                                    // topicRate: 0
                                                    return (<TopicCard key={id} cardPhoto={photo} cardTitle={res.lawName} cardRate={res.topicRate} />)
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