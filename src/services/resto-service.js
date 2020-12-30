export default class RestoService {
    url = 'http://localhost:3000/menu';
    
    getMenuItems = async () => {
      const res = await fetch(this.url);
    
      if(!res.ok) {
        throw new Error(`Нет доступа к серверу ${this.url}, статус ${res.status}`)
      }
      return await res.json();
  };
}