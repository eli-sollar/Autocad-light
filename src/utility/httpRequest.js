//import RoofTypes from "../stub/Data/RoofTypes";
export default class httpRequest {

    baseUrl = "https://localhost:7045/api/";//TODO
    constructor() {
        // if(window.debugMode){
        //     this.baseUrl="../stub/"
        // }
        
        if(process.env.NODE_ENV !="development"){
        this.baseUrl=process.env.REACT_APP_API_URL_PROD;
        }
    }

    async Get(url, parameters) {
        let result = {};
        let data = {};
        try {
            let decodedParams = this.setParameters(parameters);

            let response = {};
            if (window.debugMode) {
               // response = await import("../stub/Data/RoofTypes");
               response = await import("../stub/" + url+"/"+  parameters.name);
                data = response;
            } else {
                response = await fetch(this.baseUrl + url + "?" + decodedParams  );
                data = await response.json();
            }



            result = data;
        } catch (error) {
            result = error;
            throw new Error(error);
        }
        return result;
    }

    async Post(url, parameters,queryParameters) {
        let decodedParams = this.setParameters(queryParameters);
        //var params ={para:parameters};
        
        var uri=this.baseUrl + url+  "?" +decodedParams;
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( parameters)//[{parameters:parameters}]
           //body: parameters
        });

        const data = await response.json();
        return data;
    }
    async PostFile(url, parameters,queryParameters) {
        let decodedParams = this.setParameters(queryParameters);
        var uri=this.baseUrl + url+  "?" +decodedParams;
        const response = await fetch(uri, {
            method: 'POST',
            body: parameters//[{parameters:parameters}]
           //body: parameters
        });

        const data = await response;
        return data;
    }
//     downloadBlob(blob, filename) {
//         // Create an object URL for the blob object
//         const url = URL.createObjectURL(blob);
    
//         // Create a new anchor element
//         const a = document.createElement('a');
    
//         // Set the href and download attributes for the anchor element
//         // You can optionally set other attributes like `title`, etc
//         // Especially, if the anchor element will be attached to the DOM
//         a.href = url;
//         a.download = filename || 'download';
    
//         // Click handler that releases the object URL after the element has been clicked
//         // This is required for one-off downloads of the blob content
//         const clickHandler = function() {
//           setTimeout(() => {
//             // Release the object URL
//             URL.revokeObjectURL(url);
            
//             // Remove the event listener from the anchor element
//             this.removeEventListener('click', clickHandler);
            
//             // Remove the anchor element from the DOM
//             (this.remove && (this.remove(), 1)) ||
//             (this.parentNode && this.parentNode.removeChild(this));
//           }, 150);
//         };
//     a.click();
//         // Add the click event listener on the anchor element
//         // a.addEventListener('click', clickHandler, false);
    
//         // Programmatically trigger a click on the anchor element
//         // Useful if you want the download to happen automatically
//         // Without attaching the anchor element to the DOM
//         // a.click();
    
//         // Return the anchor element
//         // Useful if you want a reference to the element
//         // in order to attach it to the DOM or use it in some other way
//         return a;
//       }
//     async GetFile(url, parameters) {
//         let result = {};
//         let data = {};
//         try {
//             let decodedParams = this.setParameters(parameters);

//             let response = {};
//             if (window.debugMode) {
//                // response = await import("../stub/Data/RoofTypes");
//                response = await import("../stub/" + url+"/"+  parameters.name);
//                 data = response;
//             } else {
//                 response = await fetch(this.baseUrl + url + "?" + decodedParams);
//                 data =await response.blob();
//                 let downloadLink= this.downloadBlob(data,);
//                 document.body.appendChild(downloadLink);
//                 debugger
//                 //const url1 = URL.createObjectURL(data);
// //URL.revokeObjectURL(url1);
//                 //URL.revokeObjectURL(data);
//                 //const reader = new FileReader;
//             }



//             result = data;
//         } catch (error) {
//             result = error;
//             throw new Error(error);
//         }
//         return result;
//     }

    setParameters(parameters) {

        let urlParams = "";
        for (const key in parameters) {

            const element = parameters[key];
            urlParams += (key + "=" + encodeURI(element)) + "&";

        }
        return urlParams;
    }
}