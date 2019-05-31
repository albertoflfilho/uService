'use strict';

const Route = use('Route');

Route.post('/users', 'UserController.create');
// Route.post('/users', 'UserController.index');
Route.post('/sessions', 'SessionController.create');
Route.resource('services', 'ServiceController')
  .apiOnly()
  .middleware('auth');
