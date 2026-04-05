import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { Professional } from "../professionals/professional.entity";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 150 })
  nome!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  descricao?: string | null;

  @Column({ type: "int" })
  duracao!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  preco!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  categoria?: string | null;

  @Column({ default: true })
  ativo!: boolean;

  // ── relação N:N com professionals ─────────────────────

  @ManyToMany(() => Professional, (professional) => professional.servicos)
  professionals!: Professional[];

  // ── timestamps ────────────────────────────────────────

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date | null;
}
