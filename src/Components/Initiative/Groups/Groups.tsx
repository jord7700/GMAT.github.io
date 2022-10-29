import * as React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField} from '@material-ui/core';

export default function Groups(props: any) {
    const groups = props.groups;
    const handleChange = (index: number) => (event: any) => {
        const group = groups[index];
        group[event.target.name] = event.target.value !== 'false' ? event.target.value: event.target.checked;
        props.onGroupChange(groups);
    };
    const groupBox = (group: any, index: number) => (
        <Box key={index}>
            <TextField name="name" value={group.name} onChange={handleChange(index)} label="Group Name" variant="outlined" />
            <TextField name="count" value={group.count} onChange={handleChange(index)} className="NarrowTextField" label="Count" variant="outlined" type="Number"/>
            <TextField name="health" value={group.health} onChange={handleChange(index)} className="NarrowTextField" label="Health" variant="outlined" type="Number"/>
            <TextField name="bonus" value={group.bonus} onChange={handleChange(index)} className="NarrowTextField" label="Bonus" variant="outlined" type="Number"/>
            <FormControlLabel id="TrackGroup" control={<Checkbox name="track" onChange={handleChange(index)} checked={group.track} />} label="Track" />
            <Button 
                className='DeleteGroupButton'
                variant="outlined" 
                size="small"
                onClick={event => deleteCharacter(index)}
            >
                <span className="material-icons">close</span>
            </Button>
        </Box>
    );

    const addGroup = () => {
        groups.push({
            name: '',
            count: 0,
            health: 0,
            bonus: 0,
            track: true
        });
        props.onGroupChange(groups);
    }

    const deleteCharacter = (index: number) => {
        groups.splice(index, 1);
        props.onGroupChange(groups);
    }
    
    return (
        <div 
            className='Groups'
            style={{display: props.hidden === false ? 'grid' : 'none'}}
        >
            <Grid container spacing={5}>
                <Grid item xs={10}>
                    {groups.map((group: any, i: number) => {return groupBox(group, i)})}
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={10}>
                    <Button 
                        className='AddGroupButton'
                        variant="outlined" 
                        size="small"
                        onClick={addGroup}
                    >
                        <span className="material-icons">add</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}