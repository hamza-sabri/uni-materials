import { match as infoPageMatch, useLocation } from 'react-router-dom';
import { APIsCaller } from './../../../../requestes/apis-caller';
import { getAllRes } from './../../../../requestes/res-requests/res'
import MaterialCard from "./../viewer/material-card";
import * as Types from './../../../../constants/res-types';

import '../../../../styles/data-entry-styles/res/view-all-topic-res.css'
import { useEffect } from 'react';

export default function ViewAllRes({ match }: { match: infoPageMatch<{ matID: string }> }) {
    let loc = useLocation();
    console.log('match.params', match.params);
    let { matID, topicID }: any = match.params;
    let { title, photo, rate, description }: any = loc.state;
    let allTypes = Object.entries(Types).map((item) => item[1]);
    let allRes = new Array(allTypes.length).fill(0).map(() => new Array()) as any;

    console.log(allTypes);
    console.log(allRes);

    useEffect(() => {
        const getData = async () => {
            const requestParams = { materialID: matID, topicID: topicID };
            let { data } = await APIsCaller({ api: getAllRes, requestParams: requestParams });
            console.log(data);
            data.resorses.forEach((item: any) => {
                console.log(item);
                console.log(item.resType);
                console.log(allTypes.indexOf(item.resType));
                allRes[allTypes.indexOf(item.resType)].push(item)
            })
        }
        getData();
        console.log("N", allRes);
    })

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
                <div tabIndex={0} className="pdfs-contianer expand-on-foucs">
                    <span>spandfs<span className="arrow">&#9660;</span></span>
                    <div className="pdfs">
                        {/* {
                            // mat.map(idx => {
                            //     console.log(idx);
                            //     <MaterialCard cardTitle={title} cardPhoto={photo} cardRate={rate} />
                            // })
                        } */}
                    </div>
                </div>
                <div tabIndex={0} className="vidoes-contianer expand-on-foucs"><span>Vidoes</span><span className="arrow">&#9660;</span><div className="pdfs"></div></div>
                <div tabIndex={0} className="q&a-contianer expand-on-foucs"><span>Q&A</span><span className="arrow">&#9660;</span><div className="pdfs"></div></div>
                <div tabIndex={0} className="resources-contianer expand-on-foucs"><span>Resources</span><span className="arrow">&#9660;</span><div className="pdfs"></div></div>
                <div tabIndex={0} className="laws-contianer expand-on-foucs"><span>Laws</span><span className="arrow">&#9660;</span><div className="pdfs"></div></div>
            </div>
        </div>

    )
}