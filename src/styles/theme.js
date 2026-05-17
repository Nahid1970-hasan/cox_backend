export const theme = {
  // --primary-color: #006332;
  //--secondary-color: #26b355;
  colors: { 
    bg: "#fff",
    font: "#000",
    //Banner -> used for background of banner image
    banner:'#031740',//'#2b8b3c',
    //PDF Header Color
    pdfColor:"#8ee18b",
    //Theme-> used for Header/Footer/Sidebar
    primary:"#195942",//"#30b256", 
    primaryHover:"#07B5F2",//"#279749",
    primaryActive:"#0755F2",//"#217b3c",
    primaryFont:"#fff", 
    primaryBorder: "#30b256",
    primarySecendaryBorder: "#8e8f8e",
    //Tooltip
    tooltip:"#000",
    tooltipFont:"#fff",
    //input 
    inputBackground:"#fff",
    inputFont: "#000",
    inputBorder: "#30b256",
    //Grid
    girdHeader:"#1e9c82",
    girdHeaderFont:"#fff",
    gridBody:"#fff",
    gridBodyFont:"#000", 
    gridRowOdd:"#d5d5d5",
    //Button
    primaryButton:"#1e9c82", //used for Submit/Save/Search/Add New -- all for positive and add/update purpose
    primaryButtonHover:"",
    primaryButtonFont:"#fff",
    primaryButtonBorder:"#161D25",
    alertButton:"#ef5350", // used for Reset/Delete/Yes(delete confirmation)
    alertButtonHover:"", 
    alertButtonFont:"#fff",
    alertButtonBorder:"#161D25",
    secondaryButton:"#000", // used for Cancel/No/Back
    secondaryButtonHover:"",
    secondaryButtonFont:"#fff",
    secondaryButtonBorder:"#161D25",
    //Popup/Modal
    modalHeader:"#1e9c82", //Modal header
    modalHeaderFont:"#fff",
   
    modalBody:"#fff", //Modal Body Content
    modalBodyFont:"#000",
   
    //Page
    bodyTitle:"#1e9c82", //Used for Title any information space
    bodyTitleFont:"#000", 
      
    bodySubTitle:"#1e9c82", //Used for Sub-Title any information space
    bodySubTitleFont:"#fff",
  
    bodyContent:"#fff", //Used for Content Text of page
    bodyContentFont:"#000",
    

    //Card
    cardTitle:"#1e9c82", //Used for Title any information space
    cardTitleFont:"#fff", 
   
    cardSubTitle:"#fff", //Used for Sub-Title any information space
    cardSubTitleFont:"#000",
  
    cardContent:"#fff", //Used for Content Text of page
    cardContentFont:"#000",
   
     
    //InfoCard
    infoCardTitle:"#1e9c82", //Used for Title any information space
    infoCardTitleFont:"#fff", 
  
    infoCardSubTitle:"#fff", //Used for Sub-Title any information space
    infoCardSubTitleFont:"#000",
   
    infoCardContent:"#c6dfc7", //Used for Content Text of page
    infoCardContentFont:"#000",
    
    tooltip:"#000",
    tooltipFont:"#fff",
    error: "#ef5350", //"rgb(239, 83, 80)",
    error_bg: "rgb(253, 237, 237)",
    success: "#30b256", //rgb(76, 175, 80)",
    success_bg: "rgb(237, 247, 237)",
    warning: "#ed6c02",
    info: "#000",//"#0288d1",
    update: "#217b3c",
    download: "#30b256",
    secondary:"#fff",

    button: "#1e9c82",
    buttonBorder: "#161D25",
    buttonFont: "#fff", 
    barFont: "#fff",//"#161D25",
    secondaryFont: "#959EAD",
    cardFont: "#5b5b5b",
    // alert: "#DE3618",
    new:"#808080",
    new1:"#999999",
    yellow: "#EEC200",
    focus: "#E8F0D6",
    answer:"#000",
    blue:"#0070C0",
    green:"#4de67a",
    sky:"#41aef3f7",
    
    card_bg: "#f4fff5",
    bulletin_bg:"#CF1932",//"#f0403d",
    infocard_bg:"#f4fff5",
    orgInfoPrimary:"#006332", 
    orgInfoSecondary:"#26b355",
    orgInfoTitle:"#c01313", 
    orgInfoSubtitle:'#d47575',
    footer_active_back:"#000"
  },
  fontSize: {
    font: "16px",
    smFont: "14px",
    bodyTitleFontSize:"22px",
    bodySubTitleFontSize:"18px",
    bodyContentFontSize:"16px",

    girdHeaderFontSize:"18px",
    girdBodyFontSize:"16px",

    modalHeaderFontSize:"18px", 
    modalBodyFontSize:"16px", 
    
    cardTitleFontSize:"22px",  
    cardSubTitleFontSize:"18px", 
    cardContentFontSize:"16px", 

    infoCardTitleFontSize:"22px",  
    infoCardSubTitleFontSize:"18px", 
    infoCardContentFontSize:"16px", 
  },
  grid: 12,
  layout: {
    xs: "768px",
    sm: "820px",
    md: "1080px",
  },
  /** Shared radii / shadows for pages and CSS that read from JS */
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  shadows: {
    card: "0 1px 2px rgba(31, 62, 114, 0.06)",
    cardMd: "0 4px 6px -1px rgba(31, 62, 114, 0.08), 0 2px 4px -2px rgba(31, 62, 114, 0.06)",
    loginCard: "0 25px 50px -12px rgba(3, 23, 64, 0.18)",
  },
};
