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
}