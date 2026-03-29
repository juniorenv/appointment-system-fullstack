import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 120 })
  nome!: string;

  @Column({ unique: true, length: 200 })
  email!: string;

  @Column({ length: 20 })
  telefone!: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  cpf?: string | null;

  @Column({ type: "date", nullable: true })
  data_nascimento!: string | null;

  // -- endereço --

  @Column({ type: "varchar", length: 8, nullable: true })
  cep!: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  logradouro!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  numero!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  complemento!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  bairro!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  cidade!: string | null;

  @Column({ type: "varchar", length: 2, nullable: true })
  estado!: string | null;

  // -- extra --

  @Column({ type: "varchar", length: 500, nullable: true })
  observacoes!: string | null;

  // -- timestamps --

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @DeleteDateColumn()
  deleted_at?: Date | null;
}
