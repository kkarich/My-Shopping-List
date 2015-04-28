'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Item Schema
 */
var ItemSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Item name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	favorite: {
		type: Boolean,
		default: '',
		trim: true
	},
	inCart: {
		type: Boolean,
		default: '',
		trim: true
	},
	bought: {
		type: Boolean,
		default: '',
		trim: true
	},
});

mongoose.model('Item', ItemSchema);