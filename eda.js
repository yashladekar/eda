"use strict";
import fs from 'fs';
import * as d3 from 'd3';
import { createCanvas, loadImage } from 'canvas';
import { JSDOM } from 'jsdom';

// Load data
const data = d3.csvParse(fs.readFileSync('tasks.csv', 'utf-8'));

// Function to save plots
function savePlot(title, canvas) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`${title.replace(/\s+/g, '_')}.png`, buffer);
    console.log(`${title} saved.`);
}

// Create canvas context
const canvasWidth = 1200;
const canvasHeight = 600;
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Create a virtual DOM for D3 to manipulate
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const body = d3.select(dom.window.document).select('body');

// Helper function for bar charts
async function createBarChart(data, title, colors) {
    const svg = body.append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight);

    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const width = canvasWidth - margin.left - margin.right;
    const height = canvasHeight - margin.top - margin.bottom;

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(Array.from(data.keys()))
        .range([0, width])
        .padding(0.1);
    const y = d3.scaleLinear()
        .domain([0, d3.max(Array.from(data.values())) || 0])
        .range([height, 0]);

    g.selectAll('.bar')
        .data(Array.from(data.entries()))
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d[0]) || 0)
        .attr('y', d => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d[1]))
        .attr('fill', (d, i) => colors[i % colors.length]);

    // Add the X Axis
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the Y Axis
    g.append('g')
        .call(d3.axisLeft(y));

    // Add X Axis label
    g.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .text('Categories');

    // Add Y Axis label
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 15)
        .attr('text-anchor', 'middle')
        .text('Count');

    // Add title
    svg.append('text')
        .attr('x', canvasWidth / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '24px')
        .text(title);

    // Render the SVG to the canvas
    const svgString = body.html();
    console.log('SVG String:', svgString); // Log the SVG string for debugging
    try {
        const img = await loadImage('data:image/svg+xml;base64,' + Buffer.from(svgString).toString('base64'));
        context.drawImage(img, 0, 0);
        savePlot(title, canvas);
    } catch (error) {
        console.error('Error loading image:', error);
    }
}

// General Employee Analysis
const typeCount = d3.rollup(data, v => v.length, d => d.type);
createBarChart(typeCount, 'Count of Employees by Employment Type', ['skyblue']);
const statusCount = d3.rollup(data, v => v.length, d => d.status);
// Pie chart would be implemented similarly using d3.pie and an appropriate visualization logic
const designationCount = d3.rollup(data, v => v.length, d => d.designation);
createBarChart(designationCount, 'Employee Count by Designation', ['lightcoral']);
const categoryCount = d3.rollup(data, v => v.length, d => d.category);
createBarChart(categoryCount, 'Employee Count by Category', ['mediumseagreen']);
// Repeat similar logic for other visualizations like stacked bar charts, word clouds, etc.
// For more complex visualizations like heatmaps and squarify:
// Use d3's hierarchical data processing and scales.
// Adjust the canvas drawing context to fit hierarchical or grid-based visualizations.
console.log('Visualizations complete.');