import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServerType } from "./enum";

@Entity()
export class ServerData {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({ type: 'varchar', length: 254, nullable: false })
    public name: string;

    @Column({ type: 'varchar', nullable: false })
    public address: string;

    @Column({ type: 'varchar', length: 254, nullable: false })
    public type: ServerType;

    @Column({ type: 'integer', nullable: true })
    public playersOnline: number;

    @Column({ type: 'integer', nullable: true })
    public playersMax: number;

    @Column({ type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP" })
    public timestamp: number
}