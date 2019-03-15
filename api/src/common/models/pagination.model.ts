import { ApiModelProperty } from '@nestjs/swagger';

export class PaginationModel<T> {
  @ApiModelProperty()
  total: number;

  @ApiModelProperty()
  page: number;

  @ApiModelProperty()
  perPage: number;

  @ApiModelProperty({ isArray: true, type: Object })
  items: T[];
}