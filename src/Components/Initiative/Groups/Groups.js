import * as React from 'react';
import {Box, Button, Checkbox, FormControlLabel, TextField} from '@material-ui/core';

export default function Groups(props) {
    const group = (
        <Box>
            <TextField value={props.groups.name}   label="Group Name" variant="outlined" />
            <TextField value={props.groups.count}  className="NarrowTextField" label="Count" variant="outlined" type="Number"/>
            <TextField value={props.groups.health} className="NarrowTextField" label="Health" variant="outlined" type="Number"/>
            <TextField value={props.groups.bonus}  className="NarrowTextField" label="Bonus" variant="outlined" type="Number"/>
            <FormControlLabel id="TrackGroup" control={<Checkbox checked={props.groups.track} />} label="Track" />
        </Box>
    );
    
    return (
        <div 
            className='Groups'
            style={{display: props.hidden === false ? 'grid' : 'none'}}
        >
            {group}
            <Button 
                className='AddGroupButton'
                variant="outlined" 
                size="small"
            >
                <span className="material-icons">add</span>
            </Button>
        </div>
    );
}