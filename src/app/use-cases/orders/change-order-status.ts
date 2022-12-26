import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['WAITING', 'IN_PRODUCTION', 'FINISHED'].includes(status)) {
      return res.status(400).json({
        error: 'The status must be one of the following: WAITING, IN_PRODUCTION or FINISHED!'
      });
    }
    await Order.findByIdAndUpdate(orderId, { status });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
