export interface Order{
  id: string,
  productCode: string,
  date: string,
  amount: number,
  quantity: number,
  customer: string,
  status: 'PENDING' | 'DELIVERED' | 'RETURNED' | 'CANCELLED',
}
