export type CallbackFunctionAny = (...args: unknown[]) => void;

export type ReactInputEvent = React.ChangeEvent<HTMLInputElement>;

export type Unit = {
    id: string,
    name: string,
    // count: number,
    health: number | number[],
    bonus: number,
    track: boolean,
    initiative: number | number[],
    player: boolean
}
