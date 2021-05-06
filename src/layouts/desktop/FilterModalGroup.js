import React from 'react'
import CheckBox from 'components/CheckBox'
import RadioButton from 'components/Radio'
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useRecoilState } from 'recoil'
import { layerSelection, modalControls } from 'data/recoil'
import { overlaySelection } from 'data/recoil';


export default function FilterGroup({title, group, closePanel}) {
  const [controls, setControls] = useRecoilState(modalControls)
  const [layer, setLayer] = useRecoilState(layerSelection);
  const [overlay, setOverlay] = useRecoilState(overlaySelection);
  
  //handler for radio groups
  const handleLayer = (e) => setLayer(e.target.value);

  //handler for checkboxes
  const handleChange = (e) => {
    setControls({ 
      ...controls,
      [group]: {
        ...controls[group],
        [e.target.type]: {
          ...controls[group][e.target.type],
          [e.target.name]: e.target.checked
        }
      }
    });
    if (group === 'layers') {
      let olyrs = [...overlay]
      if (e.target.checked) {
        olyrs.push(e.target.name)
        setOverlay(olyrs)
      } else {
        const fOLyrs = olyrs.filter(val => val !== e.target.name);
        setOverlay(fOLyrs)
      }
    }
  };  

  return (
    <div>
      <h3>{title}</h3>
      {controls[group].radio
       ? <RadioGroup value={layer} name={group}> 
          {Object.keys(controls[group].radio).map(lbl => {
            const val = controls[group].radio[lbl]
            return <FormControlLabel 
              value={val}
              key={`filter-modal-radio-${val}`}
              onChange={handleLayer}
              onClick={closePanel}
              control={<RadioButton value={val} />}
              label={lbl}
            />
          })}
        </RadioGroup>
        : null
      }
      {controls[group].checkbox
        ? <FormGroup>
            {Object.keys(controls[group].checkbox).map(lbl => 
              <FormControlLabel
                key={`filter-modal-checkbox-${lbl}`}
                control={<CheckBox checked={controls[group].checkbox[lbl]} onChange={handleChange} name={lbl} />}
                label={lbl}
              />
            )}
          </FormGroup>
        : null
      }
    </div>
  )
}
