'use strict'
const faker=require('faker')

class Client{

constructor(){
this.store=faker.company.companyName();
this.orderID=faker.datatype.uuid();
this.customer=faker.name.findName();
this.address=`${faker.address.cityName()}-${faker.address.country()}`;
}
}

module.exports=Client;