import { memo } from "react";
import { useContext, useRef } from "react";
import { GridContext } from ".";
import { Checkbox } from "../Checkbox";
import { Chip } from "../Chip";
import { IconButton } from "../IconButton";
import { CellItem } from "../style/Datagrid_styled";
import { Tooltip } from "../Tooltip";
import { Input } from "../style/Input_styled";
import { formatGridDate, formatGridDatetime, formatGridTimeStamp } from "../../../utils/helper";

export const GridRow = memo(({ row, index }) => {

  const rowRef = useRef(null);

  const { rows, setRows, colums, selectable } = useContext(GridContext);

  //console.log(colums);

  function getRow(callback) {
    //console.log(rowRef.current.innerText);
    let id = rowRef.current.innerText;
    callback(id, rows);
  }

  function updateCheckedRow(e) {
    setRows(rows => rows.map(d => d == row ? { ...d, checkbox: e.target.checked } : d));
  }

  function updateInputRow(e) {
    setRows(rows => rows.map(d => d == row ? { ...d, item_value : e.target.value } : d));
  }
 
  return (
    colums.map((k, j) =>
    k.hide && !k.key?
    "":
    k.type == 'checkbox' ? (
        <CellItem key={j} width={'30px'} >
          <Checkbox size="sm" selectColor="inputFont" hoverColor={'girdHeader'} checked={row.checkbox} onClick={updateCheckedRow} />
        </CellItem>
      ): k.type == 'input' ? (
        <CellItem key={j} width={k.width }>
           <Input  type="text" marginTop={'0'} min={0} fontSize={"girdBodyFontSize"} minWidth={'60px'} maxWidth={'200px'} max={1000000} defaultValue={row[k.field]} maxLength={10}  name={k.field} onChange={updateInputRow} />
        </CellItem>
      ) :
        k.type == "custom" ? (
          <CellItem key={j} type={k.type} hide={k.hide} width={k.width } alignment={k.alignment}>
            <div>
              {
                typeof row[k.field] == 'function' ?
                  <IconButton color={k.color} onClick={row[k.field]}>
                    <span className="material-icons md-15">{k.icon}</span>
                  </IconButton> : <></>
              }
            </div>
          </CellItem>
        ) : k.type == "action" ? (
          <CellItem key={j} type={k.type} hide={k.hide} width={k.icons.length? (40*k.icons.length)+"px":"auto"} alignment={"center"}>
            <div>
              {k.icons.map((f, i) => {
                // console.log(k.descriptions);
                return !!k.descriptions ?
                  <Tooltip background={index%2!=0?'gridRowOdd':'gridBody'} position={'left'} color={"gridBodyFont"}  key={i} title={k.descriptions[i]}>
                    <IconButton
                      color={k.colors[i]}
                      onClick={() => getRow(k.callBacks[i])}
                    >
                      <span className="material-icons md-18">{f}</span>
                    </IconButton>


                  </Tooltip>
                  :
                  <IconButton
                    key={i}
                    color={k.colors[i]}
                    onClick={() => getRow(k.callBacks[i])}
                  >
                    <span className="material-icons md-18">{f}</span>
                  </IconButton>
              })}
            </div>
          </CellItem>
        ) : k.type == "state" ? (
          <CellItem key={j} type={k.type} hide={k.hide} width={k.width }>
            <div ref={k.key && rowRef}>
              <Chip label={row[k.field].label} color={row[k.field].color} />
            </div>
          </CellItem>) : k.type == "number" ? (<CellItem key={j} type={k.type} width={k.width } fontSize={"girdBodyFontSize"} hide={k.hide} >
            <div ref={k.key && rowRef}>
              {!!k.decimals ?
                row[k.field].toFixed(k.decimals)
                : row[k.field]}
            </div>
          </CellItem>):k.type == "password" ? (<CellItem key={j} type={k.type} width={k.width } hide={k.hide} >
            <div ref={k.key && rowRef}>
              ********
            </div>
          </CellItem>)  : k.type == "board" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment} >
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length < 40 ? row[k.field]
                  : isNaN(row[k.field]) ? row[k.field].substr(0, 40) + "..." : row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "date" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length < 15 ? formatGridDate(row[k.field]): row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "datetime" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length < 18 ? formatGridDatetime(row[k.field]): row[k.field]
              }
              </div>
            </CellItem>
          ):k.type == "timestamp" ? 
          (
            <CellItem key={j} type={k.type} hide={k.hide}  width={k.width } fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---":row[k.field].length == 19 ? formatGridTimeStamp(row[k.field]):row[k.field]
              }
              </div>
            </CellItem>
          ): k.type == "image" ? (
          <CellItem
            key={j}
            type={k.type}
            hide={k.hide}
            width={k.width}
            fontSize={"girdBodyFontSize"}
            alignment="center"
          >
            <div>
              {row[k.field] ? (
                <img
                  src={row[k.field]}
                  alt=""
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                    display: "block",
                    verticalAlign: "middle",
                  }}
                />
              ) : (
                "—"
              )}
            </div>
          </CellItem>
          ) : typeof k.render === "function" ? (
          <CellItem
            key={j}
            width={k.width}
            fontSize={"girdBodyFontSize"}
            alignment={k.alignment || "flex-start"}
            overflow={k.overflow ?? "hidden"}
          >
            <div>{k.render(row, index)}</div>
          </CellItem>
          ) :
         
          (
            <CellItem key={j} type={k.type} hide={k.hide} width={k.width } overflow={"hidden"} fontSize={"girdBodyFontSize"} alignment={k.alignment}>
              <div ref={k.key && rowRef}>
                { row[k.field]==undefined?"---": row[k.field].length<1?"---":row[k.field]
                //:row[k.field].length < 160   ? row[k.field]
                //  : isNaN(row[k.field]) ? row[k.field].substr(0, 160) + "..." : row[k.field]
              }
              </div>
            </CellItem>
          )
    )
  );
});
