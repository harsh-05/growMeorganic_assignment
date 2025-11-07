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
  const [selected, setSelected] = useState([])
  const [selectNumber, setSelectNumber] = useState("");
  const [showSelectBox, setShowSelectBox] = useState(false);


  useEffect(() => {
    async function apicall() { 
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?page=1"
        );
        
      const dataArray: Data[] = [];
     
      response.data.data.forEach((obj: {id: Number, title: string, place_of_origin: string, artist_display:string, inscriptions: string, date_start: Number, date_end: Number }) => {
        dataArray.push({
          id: obj.id,
          title: obj.title,
          place_of_origin: obj.place_of_origin,
          artist_display: obj.artist_display,
          inscriptions: obj.inscriptions,
          date_start: obj.date_start,
          date_end: obj.date_end
        });

      });

      console.log(dataArray);
      setData(dataArray);
    }
    apicall()
  }, [])


   const toggleAll = () => {
    
   };
  


    const selectionHeader = (
      <div className="relative flex items-center gap-1">
        {/* Popup box */}
        {showSelectBox && (
          <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white border rounded shadow z-20">
            <div className="text-sm font-medium mb-2">Select Multiple Rows</div>
            <div className="text-xs text-gray-600 mb-2">
              Enter number of rows to select across all pages
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max={data.length}
                value={selectNumber}
                onChange={(e) => {
                  // keep only digits in the field
                  const val = e.target.value.replace(/\D+/g, "");
                  setSelectNumber(val);
                }}
                placeholder={`e.g., ${Math.min(5, data.length)}`}
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <button className="px-3 py-1 rounded bg-violet-500 text-white text-sm hover:opacity-95">
                Select
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Total rows: {data.length}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowSelectBox((s) => !s)}
          className="ml-1 p-1 rounded hover:bg-slate-100"
          aria-label="Open select multiple rows"
        >
          {/* using a simple chevron; replace with icon if you prefer */}
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );

  return (
    <div className=" mx-auto ">
      <DataTable value={data} stripedRows selectionMode={'checkbox'} selection={selected}  tableStyle={{ minWidth: "50rem" }}>
        <Column
          selectionMode="multiple"
          header={ selectionHeader}
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="TITLE"></Column>
        <Column field="place_of_origin" header="PLACE OF ORIGIN"></Column>
        <Column field="artist_display" header="ARTIST"></Column>
        <Column field="inscriptions" header="INSCRIPTIONS"></Column>
        <Column field="date_start" header="START DATE"></Column>
        <Column field="date_end" header="END DATE"></Column>
      </DataTable>
    </div>
  );
}

export default App
