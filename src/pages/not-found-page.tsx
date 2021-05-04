import React from 'react'
import FourOFour from '../components/404/404-componant'
import { match as matchType } from 'react-router-dom';
import ProfilePage from './profile-page';
import { homePageRoute } from '../constants/pages-route';
export default function NotFoundPage({ match }: {match:matchType<any>}) {
    return (
        <div>
        {match?.url === homePageRoute? <ProfilePage />: <FourOFour />}
        </div> 
    )
}
