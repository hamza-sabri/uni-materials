import { useState } from 'react';
import CardCreateor from '../../../../components/home/subpages/data-entry/add-manually';
import { match as matchType, useLocation } from 'react-router-dom';
import { addResMethods } from '../../../../constants/pages-route';

export default function UpdateTopic() {
    let loc = useLocation();
    console.log('loc', loc);

    let { materialID, topicID, name, photo, description }: any = loc.state;
    const basicTopicRoute: string = `${addResMethods}/${materialID}/${topicID}`;
    const [resRoute, setResRoute] = useState<string>(basicTopicRoute);

    let inputs = ["Topic Name", "Topic Image URL"];
    let descriptionInput = description;
    let values = [name, photo];
    let id = materialID;
    let rate = 5;


    return (
        <div className="dynamic-subpage">
            <CardCreateor {...{ inputs, descriptionInput, values, localMaterialID: id, topicID, rate, resRoute, setResRoute }} />
        </div>
    );

    return <p>Hey</p>
}
