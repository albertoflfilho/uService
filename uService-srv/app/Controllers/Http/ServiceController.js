'use strict';
const Service = use('App/Models/Service');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const services = Service.all();

    return services;
  }

  /**
   * Render a form to be used for creating a new service.
   * GET services/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ request, response }) {
    const data = request.only([
      'user_id',
      'title',
      'address',
      'price',
      'latitude',
      'longitude',
    ]);

    const service = await Service.create(data);

    return service;
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const service = await Service.findOrFail(params.id);

    await service.load('images');

    return service;
  }

  /**
   * Render a form to update an existing service.
   * GET services/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update({ params, request, response }) {}

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const service = await Service.findOrFail(params.id);

    if (service.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' });
    }

    await service.delete();

    return response.status(200).send({ status: 'Deleted' });
  }
}

module.exports = ServiceController;
