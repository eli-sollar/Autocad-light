
import * as constants from '../constants';
export default class LabelsManager {


    getNextAlphabetLabel(letter) {
        let result = "";
        if (!letter) {
            result = "A";
        } else {
            result = letter.substring(0, letter.length - 1) + String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
        }

        return result;
    }

 
  
    getLabelsPosition(store)  {
        let labelPosition = null;
        let labelPositionHorizontal = null;
        if (store.panelsType == constants.PANEL_TYPES.HORIZANTAL_1 || store.panelsType == constants.PANEL_TYPES.VERTICAL_1_HORIZANTAL_1 ||
          store.panelsType == constants.PANEL_TYPES.VERTICAL_1_HORIZANTAL_1_VERTICAL_1) {
          labelPositionHorizontal = Math.ceil(store.panelsCount.horizontal / 2);
        } else {
          labelPosition = Math.ceil(store.panelsCount.vertical / 2);
        }
        // if (store.panelsType == 3) {
        //   labelPosition = Math.ceil(store.panelsCount.vertical / 2);
    
        // }
        return { labelPosition, labelPositionHorizontal };
      }
    
}


