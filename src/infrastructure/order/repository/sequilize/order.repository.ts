import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const order = await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      },
    )

    if (order?.[0]) {
      const itemsPromises = entity.items.map(item =>
        OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          orderId: entity.id,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })
      )
      await Promise.all(itemsPromises)
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: [{ model: OrderItemModel }],
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(item => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.productId,
      item.quantity
    ))
    const order = new Order(orderModel.id, orderModel.customerId, orderItems);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });
    
    const orders = orderModels.map(orderModel => {
      const orderItems = orderModel.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.productId,
        item.quantity
      ))
      const order = new Order(orderModel.id, orderModel.customerId, orderItems);
      return order
    })
    
    return orders;
  }
    

}

