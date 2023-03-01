import * as React from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { Unit } from 'src/Utils/types';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch, useState } from 'react';

interface duplicate {
    id: string,
    count: number
}

export default function Groups(props: any) {
    const [duplcates, setDuplicates]: [duplicate[], Dispatch<React.SetStateAction<duplicate[]>>]  = useState<duplicate[]>([]);
    const groups = props.units.filter((unit: Unit) => unit.player === false);

    const handleChange = (id: string) => (event: any) => {
        const group = props.units.find((unit: Unit) => unit !== undefined && unit.id === id);
        // update unit track value
        if (event.target.name == 'track') {
            group[event.target.name] = event.target.checked;
            props.onGroupChange(props.units);
            return;
        }
        group[event.target.name] = event.target.value !== 'false' ? event.target.value : event.target.checked;
        props.onGroupChange(props.units);
    };

    const groupBox = (group: any, index: number) => (
        <Box key={index}>
            <TextField name="name" value={group.name} onChange={handleChange(group.id)} label="Group Name" variant="outlined" />
            <TextField name="health" value={group.health} onChange={handleChange(group.id)} className="NarrowTextField" label="Health" variant="outlined" type="Number" />
            <TextField name="bonus" value={group.bonus} onChange={handleChange(group.id)} className="NarrowTextField" label="Bonus" variant="outlined" type="Number" />
            <FormControlLabel id="TrackGroup" control={<Checkbox name="track" onChange={handleChange(group.id)} checked={group.track} />} label="Track" />
            <Button
                className='DeleteGroupButton'
                variant="outlined"
                size="small"
                onClick={event => deleteCharacter(group.id)}
            >
                <span className="material-icons">close</span>
            </Button>
            <Button
                className='DeleteGroupButton'
                variant="outlined"
                size="small"
                onClick={event => duplicateUnit(group.id)}
            >
                <span className="material-icons">content_copy</span>
            </Button>
        </Box>
    );

    const addGroup = () => {
        const units = [...props.units];
        units.push({
            id: uuidv4(),
            name: '',
            health: 0,
            bonus: 0,
            track: true,
            initiative: 0,
            player: false
        });
        props.onGroupChange(units);
    }

    const deleteCharacter = (id: string) => {
        console.log(id);
        const units = [...props.units];
        const index = units.findIndex((unit: Unit) => unit !== undefined && unit.id === id);
        console.log(index);
        units.splice(index, 1);
        props.onGroupChange(units);
    }

    const duplicateUnit = (id: string) => {
        const units = [...props.units];
        const duplicate = units.find((unit: Unit) => unit.id === id);
        const count = incrementDuplicate(duplicate.id);
        units.push({
            id: uuidv4(),
            name: `${duplicate.name.split(' (')[0]} (${count})`,
            health: duplicate.health,
            bonus: duplicate.bonus,
            track: duplicate.track,
            initiative: 0,
            player: false
        });
        props.onGroupChange(units);
    }

    const incrementDuplicate = (unit: Unit) => {
        const allDups = [...duplcates];
        const exists = allDups.find((dup) => (dup as any).id === unit.id);
        if (exists) {
            (exists as any).count++;
            setDuplicates(allDups);
            return (exists as any).count;
        } else {
            (allDups as any).push({id: unit.id, count: 1});
            setDuplicates(allDups);
            return 1;
        }
    }

    return (
        <div
            className='Groups'
            style={{ display: props.hidden === false ? 'grid' : 'none' }}
        >
            <Grid container spacing={5}>
                <Grid item xs={10}>
                    {groups.map((group: any, i: number) => { return groupBox(group, i) })}
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