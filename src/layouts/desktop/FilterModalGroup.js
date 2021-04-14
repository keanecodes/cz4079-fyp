import React from 'react'
import CheckBox from 'components/CheckBox'
import RadioButton from 'components/Radio'
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useRecoilState } from 'recoil'
import { modalControls } from 'data/recoil'


export default function FilterGroup({title, group}) {
  const [controls, setControls] = useRecoilState(modalControls)
  const handleChange = (e) => {
    setControls({ 
      ...controls,
      [group]: {
        ...controls[group],
        [e.target.name]: e.target.checked
      }
    });
  };

  const [layer, setLayer] = React.useState('Heat Map (2D Only)');
  const handleLayer = (e) => setLayer(e.target.value);

  return (
    <div>
      <h3>{title}</h3>
      {group === 'layers' 
       ? <RadioGroup defaultValue={Object.keys(controls[group])[0]}>
          {Object.keys(controls[group]).map(lbl => 
            <FormControlLabel 
              value={layer}
              key={`filter-modal-radio-${lbl}`}
              onChange={handleLayer}
              control={<RadioButton value={lbl} />}
              label={lbl}
            />
          )}
        </RadioGroup>
      : <FormGroup>
          {Object.keys(controls[group]).map(lbl => 
            <FormControlLabel
              key={`filter-modal-checkbox-${lbl}`}
              control={<CheckBox checked={controls[group][lbl]} onChange={handleChange} name={lbl} />}
              label={lbl}
            />
          )}
        </FormGroup>
      }
    </div>
  )
}
