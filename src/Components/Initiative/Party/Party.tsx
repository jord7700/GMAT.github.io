import * as React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { ReactInputEvent, Unit } from 'src/Utils/types';
import {v4 as uuidv4} from 'uuid';

export default function Party(props: any) {
    const party = props.units.filter((unit: Unit) => unit.player === true);
    
    const handleChange = (id: string) => (event: ReactInputEvent) => {
        const character = props.units.find((unit: Unit) => unit !== undefined && unit.id === id);
        // update unit track value
        if (event.target.name == 'track') {
            character[event.target.name] = event.target.checked;
            props.onPartyChange(props.units);
            return;
        }
        character[event.target.name] = event.target.value !== 'false' ? event.target.value : event.target.checked;
        props.onPartyChange(props.units);
    };
    
    const characterBox = (character: any, index: number) => (
        <Box key={index}>
            <TextField name="name" value={character.name} onChange={handleChange(character.id)} label="Character Name" variant="outlined" />
            <TextField name="health" value={character.health} onChange={handleChange(character.id)} className="NarrowTextField" label="Health" variant="outlined" type="Number" />
            <TextField name="bonus" value={character.bonus} onChange={handleChange(character.id)} className="NarrowTextField" label="Bonus" variant="outlined" type="Number" />
            <FormControlLabel id="TrackGroup" control={<Checkbox name="track" onChange={handleChange(character.id)} checked={character.track} />} label="Track" />
            <Button
                className='DeleteGroupButton'
                variant="outlined"
                size="small"
                onClick={event => deleteCharacter(character.id)}
            >
                <span className="material-icons">close</span>
            </Button>
        </Box>
    );

    const addCharacter = () => {
        const units = [...props.units];
        units.push({
            id: uuidv4(),
            name: '',
            health: 0,
            bonus: 0,
            track: true,
            initiative: 0,
            player: true
        });
        props.onPartyChange(units);
    }

    const deleteCharacter = (id: string) => {
        const units = [...props.units];
        const index = units.findIndex((unit: Unit) => unit !== undefined && unit.id === id);
        units.splice(index, 1);
        props.onPartyChange(units);
    }

    return (
        <div
            className='Groups'
            style={{ display: props.hidden === false ? 'grid' : 'none' }}
        >
            <Grid container spacing={5}>
                <Grid item xs={10}>
                    {party.map((character: any, i: number) => { return characterBox(character, i) })}
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