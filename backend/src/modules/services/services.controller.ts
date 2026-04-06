import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { QueryServiceDto } from "./dto/query-service.dto";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  public async findAll(@Query() query: QueryServiceDto) {
    return this.servicesService.findAll(query);
  }

  @Get(":serviceId")
  public async findOne(@Param("serviceId", ParseUUIDPipe) serviceId: string) {
    return this.servicesService.findOne(serviceId);
  }

  @Post()
  public async create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Patch(":serviceId")
  public async update(
    @Param("serviceId", ParseUUIDPipe) serviceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(serviceId, updateServiceDto);
  }

  @Delete(":serviceId")
  public async delete(@Param("serviceId", ParseUUIDPipe) serviceId: string) {
    return this.servicesService.delete(serviceId);
  }
}
