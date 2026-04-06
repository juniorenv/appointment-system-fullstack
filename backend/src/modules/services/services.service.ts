import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { CreateServiceDto } from "./dto/create-service.dto";
import { QueryServiceDto } from "./dto/query-service.dto";

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  public async findAll(query: QueryServiceDto) {
    const ativo = query.ativo ?? true;

    const qb = this.servicesRepository
      .createQueryBuilder("service")
      .andWhere("service.ativo = :ativo", { ativo })
      .orderBy("service.nome", "ASC");

    if (query.categoria) {
      qb.andWhere("LOWER(service.categoria) = LOWER(:categoria)", {
        categoria: query.categoria,
      });
    }

    return qb.getMany();
  }

  public async findOne(serviceId: string) {
    const service = await this.servicesRepository.findOne({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }

    return service;
  }

  public async create(createServiceDto: CreateServiceDto) {
    const service = this.servicesRepository.create(createServiceDto);
    return await this.servicesRepository.save(service);
  }

  public async update(serviceId: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.servicesRepository.preload({
      id: serviceId,
      ...updateServiceDto,
    });

    if (!service) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }

    return await this.servicesRepository.save(service);
  }

  public async delete(serviceId: string) {
    const deleteResult = await this.servicesRepository.softDelete(serviceId);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Service with id ${serviceId} not found`);
    }
  }
}
