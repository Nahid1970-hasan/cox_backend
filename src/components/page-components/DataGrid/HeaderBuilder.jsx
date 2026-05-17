import { GridContext } from ".";

import { CellItem } from "../style/Datagrid_styled";
import { useContext, useState } from "react";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import { Checkbox } from "../Checkbox";
import { useEffect } from "react";
import { memo } from "react"; 

export const HeaderBuilder = memo(() => { 
  const { mainSelect, setMainSelect, setRows, colums, sortGrid, asc } = useContext(GridContext);
  //console.log("I am here");

  useEffect(() => {
    if (mainSelect == 1) {
      //setSelectIds(rows.map(d => d[colums.find(d => d.key).field]))
      setRows(rows => rows.map(d => ({ ...d, checkbox: true })));
    }
    else if (mainSelect == 0) {
      //setSelectIds([])
      setRows(rows => rows.map(d => ({ ...d, checkbox: false })));
    }
  }, [mainSelect ])

  return colums.map((header, i) => (
    header.hide && !header.key?
    "":
    <CellItem style={{ width: header.type == "checkbox" ? "30px" : header.type == "action" ? header.icons.length<2?"80px":header.icons.length? (40*header.icons.length)+"px":"auto": header.width ? header.width : "auto"}} key={i} alignment={header.type == "action" ?'center':header.alignment} type={header.type} hide={header.hide} fontSize={"girdHeaderFontSize"} onClick={(e) => (header.type != "custom" && header.type != "action" && header.sortable != false) && sortGrid(i)}>
    
      {header.type == "checkbox" ?
        <Checkbox size="sm" selectColor="primaryFont" hoverColor={'gridRowOdd'} checked={mainSelect} onClick={(e) => { setMainSelect(+e.target.checked) }} />
        :
        <div>
          {header.description ?
            <Tooltip position={'bottom'} background={'girdHeader'} color={"girdHeaderFont"} headerTitle={'girdHeaderFontSize'} title={header.description}>{header.headerName}</Tooltip>
            :header.headerName
          }
          {header.type != "action"?<>&nbsp; &nbsp;</>:<></>} 
          {
            (header.type != "custom" && header.type != "action" && header.sortable != false) &&

            (<div style={{ display: "flex" }}>
              <div className={asc[i] == null ? "" : "show"}>
                <IconButton key={i} onClick={(e) => {}}>
                  {(asc[i] == true || asc[i] == null) ?
                    (<span className="material-icons md-15">arrow_upward</span>) :
                    (<span className="material-icons md-15">arrow_downward</span>)
                  }
                </IconButton>
              </div>
              {/* <div>
              <IconButton>
                <span className="material-icons md-15">more_vert</span>
              </IconButton>
            </div> */}
            </div>)
          }
        </div>}
    </CellItem>)
  );
});
