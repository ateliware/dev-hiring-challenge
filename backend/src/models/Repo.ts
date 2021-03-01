import {Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("repositories")
export class Repo {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    owner: string;

    @Column()
    name: string;

    @Column()
    html_url: string;

    @Column()
    stars: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
