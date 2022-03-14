import { Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async postCustomer() {
    return this.customerService.postCustomer();
  }
}
