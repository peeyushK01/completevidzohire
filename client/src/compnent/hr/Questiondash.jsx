import React from 'react';
import Question from './Question';
import Questionbanner from './Questionbanner';
import Candibar from '../candidate/Candibar';


const Questiondash = () =>{
    return <div>
        <Candibar />,
    <Questionbanner />,
     <Question />
    </div>
}

export default Questiondash;