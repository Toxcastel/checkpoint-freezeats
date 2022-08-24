const express = require("express");
const userCtrl = require("./users");
const prodCtrl = require("./products");

module.exports = { prodCtrl, userCtrl };
