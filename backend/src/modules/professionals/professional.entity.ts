import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  Index,
} from "typeorm";
import { Service } from "../services/service.entity";

@Entity("professionals")
@Index("professionals_email_unique", ["email"], {
  unique: true,
  where: "deleted_at IS NULL",
})
export class Professional {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 120 })
  nome!: string;

  @Column({ length: 200 })
  email!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefone?: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  especialidade?: string | null;

  @Column({ default: true })
  ativo!: boolean;

  // ── relação N:N com services ───────────────────────────

  @ManyToMany(() => Service, (service) => service.professionals, {
    eager: false,
  })
  @JoinTable({
    name: "professional_services",
    joinColumn: {
      name: "professional_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "service_id",
      referencedColumnName: "id",
    },
  })
  servicos!: Service[];

  // ── timestamps ────────────────────────────────────────

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date | null;
}
