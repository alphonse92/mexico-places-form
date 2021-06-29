import { ManagerNotStarted } from '../errors/ManagerNotStarted';

export class BaseManager {
  constructor(Server) {
    this.Server = Server;
  }

  checkByInit() {
    if (!this.model) {
      throw new ManagerNotStarted();
    }
  }

  async get(id) {
    this.checkByInit();
    console.log('Method not implemented yet', id);
  }

  async getMany(arrayOfId) {
    this.checkByInit();
    console.log('Method not implemented yet', arrayOfId);
  }

  async list(query, pagination) {
    this.checkByInit();
    console.log('Method not implemented yet', query, pagination);
  }

  async create(data) {
    this.checkByInit();
    const savedData = await this.model.create(data);
    return savedData;
  }

  async update(id, data) {
    this.checkByInit();
    console.log('Method not implemented yet', id, data);
  }

  async delete(id) {
    this.checkByInit();
    console.log('Method not implemented yet', id);
  }
}