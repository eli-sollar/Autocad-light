import React, { useState, useEffect } from "react";

import httpRequest from "../utility/httpRequest";
import { MenuItem, Select, OutlinedInput, InputLabel, FormControl } from "@mui/material";

import ImageWrapper from '../utility/ImageWrapper';
import { Box } from "@mui/system";

function SelectCustom(props) {

  const [selectedData, setSelectedData] = useState();
  let [options, setOptions] = useState([]);
  const [dictionaryOptions, setDictionaryOptions] = useState({});
  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const pHeight =props.pHeight ?? 100;
  const pWidth = props.pWidth ?? 100;
  useEffect(() => {
    const service = new httpRequest();
    const getData = async () => {
      let dic = {};
      let result = null;
      let optionsCalculate = [];
      const parameters = { "name": props.dataSource }
      result = await service.Get("Data/DataSource", parameters);

      for (let index = 0; index < result.Table.length; index++) {
        const element = result.Table[index];
        if (element.IsActive != false) {
          if (element.ImageName) {
            optionsCalculate.push({
              "Key": element[props.lKey],
              "Value": element[props.value],
              "ImageName": element.ImageName
            }
            );
            dic[element[props.lKey]] = { ImageName: element.ImageName, Value: element[props.value], Key: element[props.lKey] };
          } else {
            optionsCalculate.push({
              "Key": element[props.lKey],
              "Value": element[props.value]
            }
            );
            dic[element[props.lKey]] = { Value: element[props.value], Key: element[props.lKey] };
          }

        }
      }



      setDictionaryOptions(dic);

      setOptions(optionsCalculate);
      setSelectedData(dic[props.defaultData]);
    };

    if (options.length === 0) {
      getData();
    
    }
    
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
   
    setSelectedData(dictionaryOptions[value]);
    props.onChange(value, props.dataSource);
  };


  return (
    <FormControl fullWidth>
      <InputLabel id="select-label-id">{props.label}</InputLabel>

      <Select
        required
        labelId="select-label-id"
        id={"select-" + props.dataSource}
        value={selectedData ? selectedData.Key : ''}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

            {selectedData && <div><span>{selectedData.Value}</span>

            </div>
            }
            {selectedData && selectedData.ImageName && <div>
              <ImageWrapper eagerLoading={true} pWidth={pWidth} pHeight={pHeight} src={selectedData.ImageName}></ImageWrapper>
            </div>
            }

          </Box>
        )}

      >
        {options.map((name) => (

          <MenuItem
            value={name.Key}
            key={name.Key}
          >
            {name.Value}
             <ImageWrapper pWidth={pWidth} pHeight={pHeight} src={name.ImageName}></ImageWrapper>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default SelectCustom;