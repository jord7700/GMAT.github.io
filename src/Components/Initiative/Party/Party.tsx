import * as React from 'react';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField} from '@material-ui/core';

export default function Party(props: any) {
    const party = props.party;
    const handleChange = (index: number) => (event: any) => {
        console.log(event);
        const character = party[index];
        character[event.target.name] = event.target.value !== 'false' ? event.target.value: event.target.checked;
        props.onPartyChange(party);
    };
    const characterBox = (character: any, index: number) => (
        <Box key={index}>
            <TextField name="name" value={character.name} onChange={handleChange(index)} label="Character Name" variant="outlined" />
            <TextField name="health" value={character.health} onChange={handleChange(index)} className="NarrowTextField" label="Health" variant="outlined" type="Number"/>
            <TextField name="bonus" value={character.bonus} onChange={handleChange(index)} className="NarrowTextField" label="Bonus" variant="outlined" type="Number"/>
            <FormControlLabel id="TrackGroup" control={<Checkbox name="track" onChange={handleChange(index)} checked={character.track} />} label="Track" />
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

    const deleteCharacter = (index: number) => {
        party.splice(index, 1);
        props.onPartyChange(party);
    }
    
    return (
        <div 
            className='Groups'
            style={{display: props.hidden === false ? 'grid' : 'none'}}
        >
            <Grid container spacing={5}>
                <Grid item xs={10}>
                    {party.map((character: any, i: number) => {return characterBox(character, i)})}
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={10}>
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