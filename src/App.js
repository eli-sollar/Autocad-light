import "./App.css";
import "./MuiCustom.css"
import AppRoutes from "./routes/routes";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
//import { createContext, useState } from 'react';

//import {  setDefaultLocale } from  "react-datepicker";

//import he from 'date-fns/locale/he';
window.debugMode = true;
const language = "he-IL";//en-US; stub, get this from service
window.isRTL = true;

if (language !== "he-IL") {
  window.isRTL = false;
}
const cacheRtl = createCache({
  key: window.isRTL ? 'muirtl' : 'muiltr',
  stylisPlugins: window.isRTL ? [rtlPlugin] : [],
});

//setDefaultLocale("he",he);
function App() {


  return (

    <CacheProvider value={cacheRtl}>

      <AppRoutes />
      {/* <authContext.Provider value={{ stepsData, setstepsData }}>
    </authContext.Provider> */}
    </CacheProvider>

  );
}

export default App;
