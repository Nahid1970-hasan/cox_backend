import { DateTime } from "luxon";
import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClicker(ref, callback) {
  // console.log(callback);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        //alert("You clicked outside of me!");
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// /**
//  * Component that alerts if you click outside of it
//  */
// export function OutsideClick(props) {
//   const wrapperRef = useRef(null);
//   useOutsideAlerter(wrapperRef, props.callback);

//   return <div ref={wrapperRef}>{props.children}</div>;
// }

export const stringSearch = (items, str, field, delay = 500) => {
  console.log(str);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          items.filter((item) =>
            !!field
              ? item[field].toLowerCase().includes(str.toLowerCase())
              : item.includes(str)
          )
        ),
      delay
    )
  );
};

export const getDate = (datestr) => {
  let date = new Date(datestr);

  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
};

export const formatGridDate = (str)=>{
  return DateTime.fromFormat(str,"yyyy-MM-dd").toFormat("dd MMM yyyy")
}

export const formatGridDatetime = (str)=>{
  return DateTime.fromFormat(str,"yyyy-MM-dd HH:mm").toFormat("hh:mm a, dd MMM, yyyy")
}

export const formatGridTimeStamp = (str)=>{
  var date= '---';
  try {
    date = DateTime.fromFormat(str,"yyyy-MM-dd HH:mm:ss").toFormat("hh:mm:ss a, dd MMM, yyyy")
  } catch (error) {
    date = str;
  } 
  return date;
}

export const getFinanCialYear = (size) => {
  var fnYear = []; 
  var currentMonth = DateTime.now().month;
  for (let i=1;i<=size;i++){
    var nextYear = currentMonth>5 ? DateTime.now().plus({year:1}):DateTime.now();
    var cYear = nextYear.minus({year:i}); 
    fnYear.push(cYear.toFormat("yyyy")+"-"+cYear.plus({year:1}).toFormat("yy")) 
  }
  return (  fnYear );
};

export const getBackYearList = (size) => {
  var ttYear = []; 
  var currentMonth = DateTime.now().year;
  for (let i=0;i<=size;i++){ 
    ttYear.push(currentMonth-i) 
  }
  return (ttYear);
};

export const getNextYearList = (size) => {
  var ttYear = []; 
  var currentMonth = DateTime.now().year;
  for (let i=0;i<=size;i++){ 
    ttYear.push(currentMonth+i) 
  }
  return (ttYear);
};
 