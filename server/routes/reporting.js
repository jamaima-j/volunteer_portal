const express = require('express');
const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const User = require('../models/User');
const Event = require('../models/event');

const router = express.Router();

// Helper function to generate PDF
const generatePDF = async (res) => {
  const doc = new PDFDocument();
  doc.pipe(res);

  // Fetch data from database
  const volunteers = await User.find({ accountType: 'volunteer' });
  const events = await Event.find();

  doc.fontSize(25).text('Volunteer Report', { align: 'center' });
  doc.moveDown();

  volunteers.forEach(volunteer => {
    doc.fontSize(20).text(`Volunteer: ${volunteer.fullName}`);
    doc.fontSize(15).text(`Participation History:`);
    volunteer.matchedEvents.forEach(event => {
      doc.fontSize(12).text(`- ${event.name} on ${event.eventDate}`); // Make sure to use eventDate here
    });
    doc.moveDown();
  });

  doc.addPage();
  doc.fontSize(25).text('Event Report', { align: 'center' });
  doc.moveDown();

  events.forEach(event => {
    doc.fontSize(20).text(`Event: ${event.name}`);
    doc.fontSize(15).text(`Description: ${event.description}`);
    doc.fontSize(15).text(`Location: ${event.location}`);
    doc.fontSize(15).text(`Date: ${event.eventDate}`);
    doc.fontSize(15).text(`Volunteers:`);
    event.volunteers.forEach(volunteer => {
      doc.fontSize(12).text(`- ${volunteer.fullName}`);
    });
    doc.moveDown();
  });

  doc.end();
};

// Helper function to generate CSV
const generateCSV = async (res) => {
  const volunteers = await User.find({ accountType: 'volunteer' });
  const events = await Event.find();

  const csvWriter = createObjectCsvWriter({
    path: 'report.csv',
    header: [
      { id: 'type', title: 'Type' },
      { id: 'name', title: 'Name' },
      { id: 'details', title: 'Details' },
    ]
  });

  const records = [];

  volunteers.forEach(volunteer => {
    records.push({
      type: 'Volunteer',
      name: volunteer.fullName,
      details: volunteer.matchedEvents.map(event => `${event.name} on ${event.eventDate}`).join('; ')
    });
  });

  events.forEach(event => {
    records.push({
      type: 'Event',
      name: event.name,
      details: `Description: ${event.description}; Location: ${event.location}; Date: ${event.eventDate}; Volunteers: ${event.volunteers.map(v => v.fullName).join(', ')}`
    });
  });

  await csvWriter.writeRecords(records);
  res.download('report.csv');
};

// Endpoint to generate PDF report
router.get('/report/pdf', async (req, res) => {
  res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
  res.setHeader('Content-type', 'application/pdf');
  await generatePDF(res);
});

// Endpoint to generate CSV report
router.get('/report/csv', async (req, res) => {
  await generateCSV(res);
});

module.exports = router;
