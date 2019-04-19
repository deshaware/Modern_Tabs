import * as React from 'react';

const ShowUsage = ({usage}) => {
    console.log('%c MyApp:' , 'background:green;color:white' ,"Showing usage data");
    console.log('%c MyApp:' , 'background:green;color:white' ,usage);

    const renderUsage = () => {
        if(usage.usage === 0){
            return <div>Loading</div>;
        } else {
            return (<h3>{usage.usage}</h3>);
        }
    };
    return(
        <div>
           Site usage is {usage.usage}
        </div>
    );
};

export default ShowUsage;