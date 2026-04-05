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
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { QueryClientDto } from "./dto/query-client.dto";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  public async findAll(@Query() search?: QueryClientDto) {
    return this.clientsService.findAll(search);
  }

  @Get(":clientId")
  public async findOne(@Param("clientId", ParseUUIDPipe) clientId: string) {
    return this.clientsService.findOne(clientId);
  }

  @Post()
  public async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Patch(":clientId")
  public async update(
    @Param("clientId", ParseUUIDPipe) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(clientId, updateClientDto);
  }

  @Delete(":clientId")
  public async delete(@Param("clientId", ParseUUIDPipe) clientId: string) {
    return this.clientsService.delete(clientId);
  }
}
