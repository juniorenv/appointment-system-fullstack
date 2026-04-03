import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./clients.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  public async delete(clientId: string) {
    const deletedUser = await this.clientsRepository.softDelete(clientId);

    if (deletedUser.affected === 0) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }
  }
}
