import { StyledDatagrid } from "../style/Datagrid_styled";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { RowBuilder } from "./RowBuilder";
import { HeaderBuilder } from "./HeaderBuilder";
import { Center } from "../style/Center_styled";
import { useReducer } from "react";

export const GridContext = createContext();

export default function DataGrid({ colums, rows, selectable, getSelectedIds, getAllRows, emptyMessage }) {
  const [dataRows, setDataRows] = useState(rows);
  const [dataColums, setDataColums] = useState(selectable ? [{ field: "checkbox", type: "checkbox", sortable: false }].concat(colums) : colums);
  const [asc, ascDispatch] = useReducer((state, action) => state.map((d, index) => index == action.index ? !d : null), dataColums.map(d => null));
  const [mainSelect, setMainSelect] = useState(0);
  const [selectIds, setSelectIds] = useState([]);

  function sortGrid(i) { 
    ascDispatch({ index: i });
    let colum = dataColums[i];
    
    let sortedRow = colum.type == "number" ?
      [...dataRows].sort((a, b) => a[colum.field] - b[colum.field]) :
      colum.type == "state" ?
        [...dataRows].sort((a, b) => a[colum.field]?.label.toLowerCase() < b[colum.field]?.label.toLowerCase() ? -1 : a[colum.field].label.toLowerCase() > b[colum.field].label.toLowerCase() ? 1 : 0) :
        [...dataRows].sort((a, b) => a[colum.field]?.toLowerCase() < b[colum.field]?.toLowerCase() ? -1 : a[colum.field]?.toLowerCase() > b[colum.field]?.toLowerCase() ? 1 : 0);
 
    !asc[i] ?
      setDataRows(sortedRow) : setDataRows(sortedRow.reverse());

  }

  useEffect(() => {
    selectable ?
      setDataRows(rows.map(d => ({ ...d, checkbox: false })))
      :
      setDataRows(rows);
  }, [rows]);

  useEffect(() => {
    typeof getSelectedIds == 'function' &&
      getSelectedIds(selectIds);
    selectIds.length == rows.length ?
      setMainSelect(1) :
      selectIds.length == 0 ?
        setMainSelect(0) :
        setMainSelect(2);
  }, [selectIds]);

  useEffect(() => {
    typeof getAllRows == 'function' &&
    getAllRows(dataRows); 
  }, [dataRows]);


  useEffect(() => {
    if (selectable)
      setSelectIds(dataRows.filter(d => d.checkbox).map(d => d[colums.find(d => d.key).field]));
  }, [dataRows])

  useEffect(() => {
    setDataColums(selectable ? [{ field: "checkbox", type: "checkbox", sortable: false }].concat(colums) : colums);
  }, [colums])
  return (
    <GridContext.Provider value={{ mainSelect, setMainSelect, selectable, colums: dataColums, setColumns:setDataColums, rows: dataRows, setRows: setDataRows, sortGrid: useCallback(sortGrid, [asc, dataRows]), asc: asc }}>
      <StyledDatagrid>
        <div>
          <div>
            <HeaderBuilder />
          </div>
        </div>
        {
          rows.length ?
            <div>
              <RowBuilder />
            </div> :
            <div style={{
              position: 'relative',
              height: '200px'
            }}>
              <Center style={{
                position: 'absolute',
                width: '100%',
                display: 'inline-flex',
                height: '80%'
              }}>{emptyMessage ?? "There is no row to show"}</Center>
            </div>
        }

      </StyledDatagrid>
    </GridContext.Provider>
  );
}

