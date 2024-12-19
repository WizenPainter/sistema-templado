"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer } from 'lucide-react';


const GlassCuttingVisualizer = () => {
  const data_raw = {
    "results": {
        "CL6": {
            "summary": {
                "total_sheets": 8,
                "total_pieces": 25,
                "overall_efficiency": 64.75,
                "total_area": 68640000,
                "used_area": 44446020.0
            },
            "sheets": [
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 48.64,
                    "total_area": 8580000.0,
                    "used_area": 4173408.0,
                    "pieces": [
                        {
                            "width": 1348.0,
                            "height": 1548.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 1348.0,
                                "height": 1548.0
                            }
                        },
                        {
                            "width": 1348.0,
                            "height": 1548.0,
                            "position": {
                                "x": 1348.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 1348.0,
                                "height": 1548.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 48.64,
                    "total_area": 8580000.0,
                    "used_area": 4173408.0,
                    "pieces": [
                        {
                            "width": 1348.0,
                            "height": 1548.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 1348.0,
                                "height": 1548.0
                            }
                        },
                        {
                            "width": 1348.0,
                            "height": 1548.0,
                            "position": {
                                "x": 1348.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 1348.0,
                                "height": 1548.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 64.44,
                    "total_area": 8580000.0,
                    "used_area": 5529204.0,
                    "pieces": [
                        {
                            "width": 1348.0,
                            "height": 1548.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 1348.0,
                                "height": 1548.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 1348.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 2113.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 80.24,
                    "total_area": 8580000.0,
                    "used_area": 6885000.0,
                    "pieces": [
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 765.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 1530.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 2295.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 80.24,
                    "total_area": 8580000.0,
                    "used_area": 6885000.0,
                    "pieces": [
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 765.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 1530.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        },
                        {
                            "width": 765.0,
                            "height": 2250.0,
                            "position": {
                                "x": 2295.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 765.0,
                                "height": 2250.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 78.32,
                    "total_area": 8580000.0,
                    "used_area": 6720000.0,
                    "pieces": [
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 750.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 1500.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 2250.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 78.32,
                    "total_area": 8580000.0,
                    "used_area": 6720000.0,
                    "pieces": [
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 750.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 1500.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 2250.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        }
                    ]
                },
                {
                    "dimensions": {
                        "width": 3300,
                        "height": 2600,
                        "thickness": 6
                    },
                    "efficiency": 39.16,
                    "total_area": 8580000.0,
                    "used_area": 3360000.0,
                    "pieces": [
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        },
                        {
                            "width": 750.0,
                            "height": 2240.0,
                            "position": {
                                "x": 750.0,
                                "y": 0
                            },
                            "rotated": false,
                            "dimensions_after_rotation": {
                                "width": 750.0,
                                "height": 2240.0
                            }
                        }
                    ]
                }
            ]
        }
    }
}
const data = data_raw.results;

  const [selectedGlass, setSelectedGlass] = useState(Object.keys(data)[0]);
  const [selectedSheet, setSelectedSheet] = useState("0");
  const [scale, setScale] = useState(0.2);

  const getRandomColor = (index) => {
    const colors = [
      'rgba(59, 130, 246, 0.5)',  // blue
      'rgba(16, 185, 129, 0.5)',  // green
      'rgba(249, 115, 22, 0.5)',  // orange
      'rgba(139, 92, 246, 0.5)',  // purple
      'rgba(236, 72, 153, 0.5)',  // pink
      'rgba(245, 158, 11, 0.5)'   // amber
    ];
    return colors[index % colors.length];
  };

  const currentGlassData = data[selectedGlass];
  const currentSheet = currentGlassData.sheets[parseInt(selectedSheet)];

  // Create measurement markers
  const MeasurementGuide = ({ direction, length, scale }) => {
    const markerStyle = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      fontSize: '12px',
      color: '#666',
      zIndex: 10
    };

    if (direction === 'horizontal') {
      return (
        <div style={{
          ...markerStyle,
          width: '100%',
          height: '24px',
          top: '-24px',
          borderTop: '1px solid #666',
          borderLeft: '1px solid #666',
          borderRight: '1px solid #666',
        }}>
          {length}mm
          <div className="absolute w-full bottom-0 flex justify-between">
            <div className="h-2 w-px bg-gray-500" />
            <div className="h-2 w-px bg-gray-500" />
          </div>
        </div>
      );
    }

    return (
      <div style={{
        ...markerStyle,
        height: '100%',
        width: '24px',
        left: '-24px',
        borderTop: '1px solid #666',
        borderLeft: '1px solid #666',
        borderBottom: '1px solid #666',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
      }}>
        {length}mm
        <div className="absolute h-full right-0 flex flex-col justify-between">
          <div className="w-2 h-px bg-gray-500" />
          <div className="w-2 h-px bg-gray-500" />
        </div>
      </div>
    );
  };

  const handlePrintAllSheets = () => {
    const printWindow = window.open('', '_blank');
    const currentGlassType = selectedGlass;
    const allSheets = data[currentGlassType].sheets;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Glass Cutting Layouts - ${currentGlassType}</title>
          <style>
            @page {
              size: A4;
              margin: 15mm;
            }
            @media print {
              .print-sheet {
                page-break-after: always;
              }
              .print-sheet:last-child {
                page-break-after: avoid;
              }
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .summary {
              margin-bottom: 30px;
              font-size: 14px;
            }
            .summary h1 {
              font-size: 24px;
              margin-bottom: 20px;
            }
            .visualization {
              page-break-inside: avoid;
            }
            .sheet-header {
              font-size: 16px;
              margin-bottom: 15px;
            }
            .sheet-info {
              font-size: 14px;
              margin-bottom: 10px;
            }
            .piece-label {
              font-size: 140px !important;
              font-weight: 500 !important;
            }
            .dimension-text {
              font-size: 50px !important;
              font-weight: bold !important;
              fill: #333 !important;
            }
          </style>
        </head>
        <body>
          <div class="summary">
            <h1>Glass Cutting Layout - ${currentGlassType}</h1>
            <p>Total sheets: ${currentGlassData.summary.total_sheets}</p>
            <p>Total pieces: ${currentGlassData.summary.total_pieces}</p>
            <p>Overall efficiency: ${currentGlassData.summary.overall_efficiency.toFixed(2)}%</p>
            <p>Total area: ${(currentGlassData.summary.total_area / 1000000).toFixed(2)}m²</p>
            <p>Used area: ${(currentGlassData.summary.used_area / 1000000).toFixed(2)}m²</p>
          </div>
          ${allSheets.map((sheet, index) => `
            <div class="print-sheet">
              <h2 class="sheet-header">Sheet ${index + 1}</h2>
              <p class="sheet-info">Dimensions: ${sheet.dimensions.width}mm × ${sheet.dimensions.height}mm (${sheet.dimensions.thickness}mm thick)</p>
              <p class="sheet-info">Efficiency: ${sheet.efficiency}%</p>
              <p class="sheet-info">Used area: ${(sheet.used_area / 1000000).toFixed(2)}m²</p>
              <div style="position: relative; margin: 20px 0;">
                <svg viewBox="0 0 ${sheet.dimensions.width + 200} ${sheet.dimensions.height + 200}" 
                     style="width: 100%; height: auto; border: 2px solid #666;">
                  <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="white" flood-opacity="0.8"/>
                    </filter>
                  </defs>

                  <!-- Add margin for measurements -->
                  <g transform="translate(100, 100)">
                    <!-- Background -->
                    <rect width="${sheet.dimensions.width}" height="${sheet.dimensions.height}" 
                          fill="white" stroke="#666" stroke-width="2"/>
                    
                    <!-- Horizontal measurement -->
                    <g transform="translate(0, -50)">
                      <line x1="0" y1="0" x2="${sheet.dimensions.width}" y2="0" 
                            stroke="#333" stroke-width="2"/>
                      <line x1="0" y1="0" x2="0" y2="20" stroke="#333" stroke-width="2"/>
                      <line x1="${sheet.dimensions.width}" y1="0" x2="${sheet.dimensions.width}" y2="20" 
                            stroke="#333" stroke-width="2"/>
                      <text x="${sheet.dimensions.width/2}" y="-10" 
                            text-anchor="middle" class="dimension-text" filter="url(#shadow)">
                        ${sheet.dimensions.width}mm
                      </text>
                    </g>

                    <!-- Vertical measurement -->
                    <g transform="translate(-50, 0)">
                      <line x1="0" y1="0" x2="0" y2="${sheet.dimensions.height}" 
                            stroke="#333" stroke-width="2"/>
                      <line x1="0" y1="0" x2="20" y2="0" stroke="#333" stroke-width="2"/>
                      <line x1="0" y1="${sheet.dimensions.height}" x2="20" y2="${sheet.dimensions.height}" 
                            stroke="#333" stroke-width="2"/>
                      <text x="-10" y="${sheet.dimensions.height/2}" 
                            transform="rotate(-90, -10, ${sheet.dimensions.height/2})"
                            text-anchor="middle" class="dimension-text" filter="url(#shadow)">
                        ${sheet.dimensions.height}mm
                      </text>
                    </g>

                    <!-- Glass pieces -->
                    ${sheet.pieces.map((piece, pieceIndex) => `
                      <g transform="translate(${piece.position.x}, ${piece.position.y})">
                        <rect 
                          width="${piece.dimensions_after_rotation.width}" 
                          height="${piece.dimensions_after_rotation.height}"
                          fill="${getRandomColor(pieceIndex)}"
                          stroke="rgba(0,0,0,0.2)"
                        />
                        <text
                          x="${piece.dimensions_after_rotation.width / 2}"
                          y="${piece.dimensions_after_rotation.height / 2}"
                          text-anchor="middle"
                          dominant-baseline="middle"
                          class="piece-label"
                          filter="url(#shadow)"
                        >
                          ${piece.width}×${piece.height}${piece.rotated ? ' (R)' : ''}
                        </text>
                      </g>
                    `).join('')}
                  </g>
                </svg>
              </div>
            </div>
          `).join('')}
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const SheetVisualization = ({ sheet, sheetIndex, printScale = 0.15 }) => (
    <div className="mb-8 print-sheet">
      <div className="mb-4 space-y-2">
        <h2 className="text-lg font-semibold">Sheet {sheetIndex + 1}</h2>
        <p className="text-sm text-gray-500">
          Dimensions: {sheet.dimensions.width}mm × {sheet.dimensions.height}mm
          ({sheet.dimensions.thickness}mm thick)
        </p>
        <p className="text-sm text-gray-500">
          Efficiency: {sheet.efficiency}% (Used area: {(sheet.used_area / 1000000).toFixed(2)}m²)
        </p>
      </div>
      <div className="border border-gray-200 rounded-lg relative bg-gray-50 p-8">
        <div style={{
          position: 'relative',
          width: sheet.dimensions.width * printScale,
          height: sheet.dimensions.height * printScale,
          border: '2px solid #666',
          background: 'white'
        }}>
          <MeasurementGuide 
            direction="horizontal" 
            length={sheet.dimensions.width}
            scale={printScale}
          />
          <MeasurementGuide 
            direction="vertical" 
            length={sheet.dimensions.height}
            scale={printScale}
          />
          {sheet.pieces.map((piece, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: piece.position.x * printScale,
                top: piece.position.y * printScale,
                width: piece.dimensions_after_rotation.width * printScale,
                height: piece.dimensions_after_rotation.height * printScale,
                backgroundColor: getRandomColor(index),
                border: '1px solid rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'rgba(0,0,0,0.7)'
              }}
            >
              <div className="text-xs whitespace-nowrap">
                {piece.width}×{piece.height}
                {piece.rotated ? ' (R)' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Glass Cutting Optimization Visualization</span>
          <div className="flex gap-4 items-center">
            <Select value={selectedGlass} onValueChange={setSelectedGlass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select glass" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(data).map(glassType => (
                  <SelectItem key={glassType} value={glassType}>
                    {glassType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSheet} onValueChange={setSelectedSheet}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select sheet" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: currentGlassData.summary.total_sheets }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    Sheet {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrintAllSheets}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print All Sheets
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-gray-200 rounded-lg overflow-auto relative bg-gray-50"
             style={{
               width: '100%',
               height: '600px',
               padding: '32px'
             }}>
          <div style={{
            position: 'relative',
            width: currentSheet.dimensions.width * scale,
            height: currentSheet.dimensions.height * scale,
            border: '2px solid #666',
            background: 'white'
          }}>
            <MeasurementGuide 
              direction="horizontal" 
              length={currentSheet.dimensions.width}
              scale={scale}
            />
            <MeasurementGuide 
              direction="vertical" 
              length={currentSheet.dimensions.height}
              scale={scale}
            />
            {currentSheet.pieces.map((piece, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: piece.position.x * scale,
                  top: piece.position.y * scale,
                  width: piece.dimensions_after_rotation.width * scale,
                  height: piece.dimensions_after_rotation.height * scale,
                  backgroundColor: getRandomColor(index),
                  border: '1px solid rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.7)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="text-xs whitespace-nowrap">
                  {piece.width}×{piece.height}
                  {piece.rotated ? ' (R)' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="font-medium">Summary:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Total sheets: {currentGlassData.summary.total_sheets}</li>
            <li>Total pieces: {currentGlassData.summary.total_pieces}</li>
            <li>Overall efficiency: {currentGlassData.summary.overall_efficiency.toFixed(2)}%</li>
            <li>Total area: {(currentGlassData.summary.total_area / 1000000).toFixed(2)}m²</li>
            <li>Used area: {(currentGlassData.summary.used_area / 1000000).toFixed(2)}m²</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};



export default GlassCuttingVisualizer;