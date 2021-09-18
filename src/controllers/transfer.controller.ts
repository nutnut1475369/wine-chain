import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TransferService } from '@services/transfer.service';
import { TransferDto } from 'src/dtos/transfer.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller()
export class TransferController {
  constructor(
      private readonly transferService: TransferService
      ) {}

  @Post('transfer')
  @UseGuards(JwtAuthGuard)
  async transfer(
    @Body() transferDto: TransferDto,
    @Request() req,
  ): Promise<any> {
    return await this.transferService.transferWine(transferDto,req.user.userid)
  }
}
