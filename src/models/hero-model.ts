export class Hero {
    private _id: number;
    private _name: string;
    private _lifePoints: number;
    private _strength: number;

    // Getters typescript mode

    public get id(): number {
        return this.id;
    }
    
    public get name(): string {
        return this._name;
    }

    public get lifePoints(): number {
        return this._lifePoints;
    }

    public get strength(): number {
        return this._lifePoints;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set lifePoints(lifePoints: number) {
        this._lifePoints = lifePoints;
    }

    public set strength(strength: number) {
        this._strength = strength;
    }
}