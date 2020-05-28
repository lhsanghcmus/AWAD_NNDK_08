/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

const LinkedBankSchema = new mongoose.Schema({
	bank_id: {
		type: String,
		required: true,
		unique: true,
	},
	bank_name: {
		type: String,
		required: true,
	},
	our_public_key: {
		type: String,
		required: true,
	},
	partner_public_key: {
		type: String,
		required: true,
	},
	encrypt_type: {
		type: String,
		required: true,
	},
	partner_code: {
		type: String,
		required: true,
	},
	secret_key: {
		type: String,
		required: true,
	},
	our_private_key: {
		type: String,
		required: true,
	},
	hash_algorithm: {
		type: String,
		required: true,
	},
	passphrase: {
		type: String,
	},
})

module.exports = LinkedBank = mongoose.model('linked_bank', LinkedBankSchema)
