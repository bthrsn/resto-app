export default class RestoService {
    _apiBase = 'http://localhost:3000';
    
    getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
    
      if(!res.ok) {
        throw new Error(`Нет доступа к серверу ${this._apiBase}${url}, статус ${res.status}`)
      }
        return await res.json();
    }
    
    getMenuItems = async () => {
      return await this.getResource('/menu/');
    };
    
    getItem = async (id) => {
      const res = await this.getResource('/menu/'),
            item = res.find(el => el.id === +id)
      return item;
      }
    
    setOrder = async (order) => {
      const number = await this.getOrderNumber(),
            newOrder = {
              id: number,
              order: order
            },
            res = await fetch(`${this._apiBase}/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(newOrder)
            });
    
            if(!res.ok) {
              throw new Error(`Ошибка, статус ${res.status}`)
            }
      // return res;
    }
    
    getOrderNumber = async () => {
      const res = await this.getResource('/orders/'),
            orderNumber = res.length + 1;
      return orderNumber;
    }
}