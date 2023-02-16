import React, { useState } from 'react';
import loadZip from '../../zip/loadZip';
import {
  Page,
  List,
  ListItem,
} from 'framework7-react';


export default function App() {
  const [data, setData] = useState([]);
  useState(()=>{
    loadZip('http://api.foroom.ru/uploads/download/zip/data.zip', ok, notok);
  }, [])
  
  function ok() {
    setData(arguments[0].all_data.izd);
  }


  function notok() {
    console.log('Error');
  }



  return (  
    <Page>
      <List style={{padding: '10px'}}>
        {data.map((item, index) => (
        <ListItem
        key={index}
        mediaItem
        title={`№${index +1} ${item.name}`}
        subtitle={item.nameRu}
        style={{ marginBottom: `10px`, padding: '5px', border: '1px solid #d3d3d3' }}
        virtualListIndex={0}
      />
        ))}

      </List>
    </Page>
      
    
  );
};