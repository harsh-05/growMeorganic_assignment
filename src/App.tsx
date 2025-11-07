import axios from 'axios';
import { DataTable } from 'primereact/DataTable'
import { Column } from "primereact/column";
import { useEffect, useState } from 'react';

type Data = {
  id: Number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: Number;
  date_end: Number;
};

function App() {
  
  const [data, setData] = useState<Data[]>([]);
  const [paginationDetails, setPaginationDetails] = useState(null);


  useEffect(() => {
    async function apicall() { 
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?page=1"
        );
        
      const dataArray: Data[] = [];
     
      response.data.data.forEach((obj: {id: Number, title: string, place_of_origin: string, artist_display:string, inscriptions: string, date_start: Number, date_end: Number }) => {
        dataArray.push({ id: obj.id, title: obj.title, place_of_origin: obj.place_of_origin, artist_display: obj.artist_display, inscriptions: obj.inscriptions, date_start: obj.date_start, date_end: obj.date_end });

      });

      console.log(dataArray);
      setData(dataArray);
    }
    apicall()
   }, [])

  return (
    <div className="max-w-10/12 mx-auto ">
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }} stripedRows>
        <Column field="title" header="Title" align={"center"}></Column>
        
      </DataTable>
    </div>
  );
}

export default App
