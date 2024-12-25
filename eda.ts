import * as fs from 'fs';
import * as d3 from 'd3';
import { createCanvas } from 'canvas';
// import { WordCloud } from 'd3-cloud';

interface DataRow {
    type: string;
    status: string;
    designation: string;
    category: string;
    territory: string;
    location: string;
    projectManager: string;
    reportingManager: string;
    grade: string;
}

// Load data
const data: DataRow[] = d3.csvParse(fs.readFileSync('tasks.csv', 'utf-8'));

// Function to save plots
function savePlot(title: string, canvas: any): void {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`${title.replace(/\s+/g, '_')}.png`, buffer);
    console.log(`${title} saved.`);
}

// Create canvas context
const canvasWidth = 1200;
const canvasHeight = 600;
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Helper function for bar charts
function createBarChart(data: Map<string, number>, title: string, colors: string[]): void {
    const svg = d3.select(context)
        .append('svg')
        .attr('width', canvasWidth)
        .attr('height', canvasHeight);

    const x = d3.scaleBand()
        .domain(Array.from(data.keys()))
        .range([0, canvasWidth])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(Array.from(data.values())) || 0])
        .range([canvasHeight, 0]);

    svg.selectAll('.bar')
        .data(Array.from(data.entries()))
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d[0]) || 0)
        .attr('y', d => y(d[1]))
        .attr('width', x.bandwidth())
        .attr('height', d => canvasHeight - y(d[1]))
        .attr('fill', (d, i) => colors[i % colors.length]);

    savePlot(title, canvas);
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
