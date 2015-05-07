'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Item = mongoose.model('Item'),
	_ = require('lodash');
	

/**
 * Create a Item
 */
exports.create = function(req, res) {
    
  
	var item = new Item(req.body);
	item.user = req.user;

	item.save(function(err) {
		if (err) {
		    console.log('create error')
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
	
            var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            
            console.log(socketio.sockets.connected);
            socketio.sockets.to(req.user._id).emit('item.created', item); // emit an event for all connected clients
    
			res.jsonp(item);
		}
	});
};

/**
 * Show the current Item
 */
exports.read = function(req, res) {
	res.jsonp(req.item);
};

/**
 * Update a Item
 */
exports.update = function(req, res) {
	var item = req.item ;

	item = _.extend(item , req.body);

	item.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
		    
		    var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
            socketio.sockets.to(req.user._id).emit('item.updated', item); // emit an event for all connected clients
			res.jsonp(item);
		}
	});
};

/**
 * Delete an Item
 */
exports.delete = function(req, res) {
	var item = req.item ;

	item.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(item);
		}
	});
};

/**
 * List of Items
 */
exports.list = function(req, res) { 
	Item.find({user:req.user._id}).sort('-created').populate('user', 'displayName').exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			res.jsonp(items);
		}
	});
};

exports.favorites = function(req, res) { 
	Item.find({favorite:true,user:req.user._id}).sort('-created').populate('user', 'displayName').exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(items);
		}
	});
};

/**
 * Item middleware
 */
exports.itemByID = function(req, res, next, id) { 
	Item.findById(id).populate('user', 'displayName').exec(function(err, item) {
		if (err) return next(err);
		if (! item) return next(new Error('Failed to load Item ' + id));
		req.item = item ;
		next();
	});
};

/**
 * Item authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.item.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
