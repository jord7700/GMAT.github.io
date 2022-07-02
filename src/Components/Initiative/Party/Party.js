import * as React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField} from '@material-ui/core';

export default function Party(props) {
    const party = props.party;
    const handleChange = index => (event, changedValue) => {
        const character = party[index];
        character[event.target.name] = event.target.value ? event.target.value: event.target.checked;
        props.onPartyChange(party);
    };
    const characterBox = (character, index) => (
        <Box key={index}>
            <TextField name="name" value={character.name} onChange={handleChange(index)} label="Character Name" variant="outlined" />
            <TextField name="health" value={character.health} onChange={handleChange(index)} className="NarrowTextField" label="Health" variant="outlined" type="Number"/>
            <TextField name="bonus" value={character.bonus} onChange={handleChange(index)} className="NarrowTextField" label="Bonus" variant="outlined" type="Number"/>
            <FormControlLabel id="TrackGroup" control={<Checkbox name="track" onChange={handleChange(index)} checked={character.track} />} label="Track" />
        </Box>
    );

    const addCharacter = () => {
        party.push({
            name: '',
            count: 0,
            health: 0,
            bonus: 0,
            track: true
        });
        props.onPartyChange(party);
    }
    
    return (
        <div 
            className='Groups'
            style={{display: props.hidden === false ? 'grid' : 'none'}}
        >
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    {party.map((character, i) => {return characterBox(character, i)})}
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button 
                        className='AddGroupButton'
                        variant="outlined" 
                        size="small"
                        onClick={addCharacter}
                    >
                        <span className="material-icons">add</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}