import { GridRow } from "./GridRow";
import { useContext } from "react";
import { GridContext } from ".";
import { theme } from "../../../styles/theme";
import { memo } from "react";

export const RowBuilder = memo(() => {
  const { rows} = useContext(GridContext);
 
  return rows.map((d, i) => (
    <div key={i} style={{background:i%2!=0?theme.colors.gridRowOdd:theme.colors.gridBody}}>
      <GridRow row={d} index={i} />
    </div>
  ));

});
