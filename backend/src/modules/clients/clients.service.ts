import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./clients.entity";
import { Repository } from "typeorm";
import { UpdateClientDto } from "./dto/update-client.dto";
import { isUniqueViolation } from "src/common/helpers/db-errors.helper";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  public async create(createClientDto: CreateClientDto) {
    try {
      const client = this.clientsRepository.create(createClientDto);
      return await this.clientsRepository.save(client);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException("Client with this email already exists");
      }
      throw error;
    }
  }

  public async update(clientId: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientsRepository.preload({
      id: clientId,
      ...updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }

    try {
      return await this.clientsRepository.save(client);
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw new ConflictException("Client with this email already exists");
      }
      throw error;
    }
  }

  public async delete(clientId: string) {
    const deletedUser = await this.clientsRepository.softDelete(clientId);

    if (deletedUser.affected === 0) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }
  }
}
