
import React,{useState,useEffect} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import "../allAuctions/AllAuctions.css";
import axios from 'axios';
export const AllAuctions = () => {
  const[allAuctions,setAllAuctions]=useState();
  const[allitem,setAllitem]=useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/auctions`).then((res) => {
      console.log(res.data)
      setAllAuctions(res.data);
    });
  }, []);
  const header = (
    <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
);
const footer = (
    <span>
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
    </span>
);

return (
    <div className="s">

        <Card title="Advanced Card" subTitle="Subtitle" style={{ width: '20em' }} footer={footer} header={header}>
            <p className="p-m-0" style={{lineHeight: '1.5'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
        </Card>
    </div>
)
};
