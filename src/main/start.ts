import './settings/alias';
import express from 'express';
import { connect } from './baileys';
connect({
  printQRInTerminal: true,
}).then(() => {});
