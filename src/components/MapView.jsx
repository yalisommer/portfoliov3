import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import sharkImage from '../assets/shark-img.png'; // Import the shark image

// Constants for data processing
const CHUNK_SIZE = 1000; // Process data in chunks of 1000 items
const PROCESSING_INTERVAL = 100; // Process chunks every 100ms

// Dark map style
const darkMapStyle = new XYZ({
  url: 'https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  attributions: '© OpenStreetMap contributors, © CARTO'
});

function MapView() {
  const mapRef = useRef();
  const mapElement = useRef();
  const vectorLayerRef = useRef();
  const [sharkData, setSharkData] = useState({ sharks: [], paths: [] });
  const [selectedShark, setSelectedShark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Process data in chunks
  const processDataChunk = useCallback((data, startIndex) => {
    const endIndex = Math.min(startIndex + CHUNK_SIZE, data.length);
    const chunk = data.slice(startIndex, endIndex);
    
    // Use objects instead of Maps for simplicity
    const uniqueSharks = {};
    const paths = {};

    chunk.forEach(item => {
      if (!item.Shark || !item.Depth || !item.Length || !item.Latitude || !item.Longitude || !item.timestamp) {
        return;
      }

      const sharkId = item.Shark;
      
      // Only process if we haven't seen this shark before or if we have less than 10 sharks
      if (!uniqueSharks[sharkId] && Object.keys(uniqueSharks).length < 10) {
        // Create unique color for each shark based on index
        const sharkIndex = Object.keys(uniqueSharks).length;
        const hue = (sharkIndex * 36) % 360; // Distribute colors evenly
        const color = `hsla(${hue}, 85%, 70%, 0.8)`; // More pastel: increased lightness, slightly reduced saturation
        
        // Store the most recent data point for each shark
        uniqueSharks[sharkId] = {
          id: sharkId,
          depth: item.Depth,
          length: item.Length,
          lat: item.Latitude,
          lng: item.Longitude,
          timestamp: item.timestamp,
          color: color
        };

        // Initialize path for this shark
        paths[sharkId] = {
          sharkId: sharkId,
          points: [{ 
            lat: item.Latitude, 
            lng: item.Longitude,
            timestamp: item.timestamp 
          }],
          color: color
        };
      } else if (paths[sharkId]) {
        // Add point to existing path
        paths[sharkId].points.push({
          lat: item.Latitude,
          lng: item.Longitude,
          timestamp: item.timestamp
        });
      }
    });

    return {
      sharks: Object.values(uniqueSharks),
      paths: Object.values(paths)
    };
  }, []);

  useEffect(() => {
    const fetchSharkData = async () => {
      try {
        console.log('Attempting to fetch shark data...');
        const response = await axios.get('/src/public/shark_data.json');
        console.log('Response received:', {
          status: response.status,
          statusText: response.statusText,
          dataType: typeof response.data,
          isArray: Array.isArray(response.data),
          dataLength: Array.isArray(response.data) ? response.data.length : 'not an array'
        });
        
        const rawData = response.data;
        
        // Validate that rawData is an array
        if (!Array.isArray(rawData)) {
          throw new Error(`Invalid data format: Expected an array of shark data, got ${typeof rawData}`);
        }
        
        // Check if we have any data
        if (rawData.length === 0) {
          throw new Error('No shark data available');
        }

        console.log(`Successfully loaded ${rawData.length} shark data points`);

        // First, identify the 10 unique sharks we want to track
        const uniqueSharkIds = new Set();
        for (const item of rawData) {
          if (item.Shark && !uniqueSharkIds.has(item.Shark)) {
            uniqueSharkIds.add(item.Shark);
            if (uniqueSharkIds.size >= 10) break;
          }
        }
        
        console.log('Unique shark IDs:', Array.from(uniqueSharkIds));

        // Filter data to only include our 10 sharks
        const filteredData = rawData.filter(item => 
          item.Shark && uniqueSharkIds.has(item.Shark)
        );
        
        console.log('Filtered data length:', filteredData.length);

        // Process all data at once instead of in chunks to avoid duplicates
        const uniqueSharks = {};
        const paths = {};

        // Sort data by timestamp to ensure we get the most recent data for each shark
        const sortedData = [...filteredData].sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Process each shark's data
        sortedData.forEach(item => {
          if (!item.Shark || !item.Depth || !item.Length || !item.Latitude || !item.Longitude || !item.timestamp) {
            return;
          }

          const sharkId = item.Shark;
          
          // Only process if we haven't seen this shark before
          if (!uniqueSharks[sharkId]) {
            // Create unique color for each shark based on index
            const sharkIndex = Object.keys(uniqueSharks).length;
            const hue = (sharkIndex * 36) % 360; // Distribute colors evenly
            const color = `hsla(${hue}, 85%, 70%, 0.8)`; // More pastel: increased lightness, slightly reduced saturation
            
            // Store the most recent data point for each shark
            uniqueSharks[sharkId] = {
              id: sharkId,
              depth: item.Depth,
              length: item.Length,
              lat: item.Latitude,
              lng: item.Longitude,
              timestamp: item.timestamp,
              color: color
            };

            // Initialize path for this shark
            paths[sharkId] = {
              sharkId: sharkId,
              points: [{ 
                lat: item.Latitude, 
                lng: item.Longitude,
                timestamp: item.timestamp 
              }],
              color: color
            };
          } else {
            // Add point to existing path
            paths[sharkId].points.push({
              lat: item.Latitude,
              lng: item.Longitude,
              timestamp: item.timestamp
            });
          }
        });

        // Sort paths by timestamp to ensure chronological order
        Object.values(paths).forEach(path => {
          path.points.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
        
        setSharkData({
          sharks: Object.values(uniqueSharks),
          paths: Object.values(paths)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shark data:', error);
        setError('The shark tracking system is currently under maintenance. Please check back later.');
        setLoading(false);
      }
    };

    fetchSharkData();
  }, []);

  // Initialize map
  useEffect(() => {
    if (loading || error || mapRef.current) return;

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: darkMapStyle
        })
      ],
      view: new View({
        center: fromLonLat([-118.2615, 29.1148]), // Centered on Guadalupe Island
        zoom: 10,
        minZoom: 4,
        maxZoom: 12
      })
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const type = feature.get('type');
        if (type === 'shark') {
          const shark = feature.get('sharkData');
          const isSelected = selectedShark && shark.id === selectedShark.id;
          return new Style({
            image: new CircleStyle({
              radius: isSelected ? 8 : 6,
              fill: new Fill({
                color: shark.color
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: isSelected ? 3 : 2
              })
            })
          });
        } else {
          return new Style({
            stroke: new Stroke({
              color: feature.get('color'),
              width: 2
            })
          });
        }
      }
    });

    vectorLayerRef.current = vectorLayer;
    map.addLayer(vectorLayer);

    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, feature => feature);
      const clickedShark = feature?.get('sharkData');
      
      if (clickedShark) {
        setSelectedShark(prev => 
          prev && prev.id === clickedShark.id ? null : clickedShark
        );
      } else {
        setSelectedShark(null);
      }
    });

    mapRef.current = map;
  }, [loading, error, selectedShark]);

  // Update features when data changes
  useEffect(() => {
    if (!vectorLayerRef.current || loading) return;

    const vectorSource = vectorLayerRef.current.getSource();
    vectorSource.clear();

    // Add shark paths
    sharkData.paths?.forEach(path => {
      const coordinates = path.points.map(point =>
        fromLonLat([point.lng, point.lat])
      );
      
      const pathFeature = new Feature({
        geometry: new LineString(coordinates),
        sharkId: path.sharkId,
        color: path.color,
        type: 'path'
      });

      vectorSource.addFeature(pathFeature);
    });

    // Add shark markers
    sharkData.sharks?.forEach(shark => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([shark.lng, shark.lat])),
        sharkData: shark,
        type: 'shark'
      });

      vectorSource.addFeature(marker);
    });

    if (mapRef.current) {
      mapRef.current.render();
    }
  }, [sharkData, loading]);

  // Update map style when selected shark changes
  useEffect(() => {
    if (!vectorLayerRef.current) return;
    
    const vectorLayer = vectorLayerRef.current;
    
    // Update the style function to handle selected shark
    vectorLayer.setStyle((feature) => {
      const type = feature.get('type');
      
      if (type === 'shark') {
        const shark = feature.get('sharkData');
        const isSelected = selectedShark && shark.id === selectedShark.id;
        
        return new Style({
          image: new CircleStyle({
            radius: isSelected ? 8 : 6,
            fill: new Fill({
              color: selectedShark ? (isSelected ? shark.color : 'rgba(128, 128, 128, 0.6)') : shark.color
            }),
            stroke: new Stroke({
              color: '#ffffff',
              width: isSelected ? 3 : 2
            })
          })
        });
      } else if (type === 'path') {
        const sharkId = feature.get('sharkId');
        const isSelectedSharkPath = selectedShark && sharkId === selectedShark.id;
        
        return new Style({
          stroke: new Stroke({
            color: selectedShark ? (isSelectedSharkPath ? feature.get('color') : 'rgba(128, 128, 128, 0.6)') : feature.get('color'),
            width: isSelectedSharkPath ? 3 : 2
          })
        });
      }
    });
    
    if (mapRef.current) {
      mapRef.current.render();
    }
  }, [selectedShark]);

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        borderRadius: '8px',
        border: '1px solid rgba(45, 95, 138, 0.3)',
        color: '#646cff',
        fontSize: '1.2rem',
        margin: '2rem auto',
        maxWidth: '600px'
      }}>
        <h2 style={{ color: '#2d5f8a', marginBottom: '1rem' }}>Shark Tracker Status</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <img
          src={sharkImage}
          alt="Loading..."
          className="loading-shark"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}
        />
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: `${processingProgress}%`,
            height: '100%',
            backgroundColor: '#646cff',
            borderRadius: '2px',
            transition: 'width 0.3s ease'
          }} />
        </div>
        <p>Loading shark data... {Math.round(processingProgress)}%</p>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      height: 'auto',
      minHeight: '100vh',
      overflowY: 'auto'
    }}>
      <div style={{ 
        width: '100%', 
        height: '600px', 
        marginBottom: selectedShark ? '20px' : '0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(45, 95, 138, 0.3)'
      }}>
        <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
        
        {selectedShark && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(26, 26, 26, 0.8)',
            padding: '20px',
            borderRadius: '8px',
            color: 'white',
            maxWidth: '300px',
            border: '1px solid rgba(45, 95, 138, 0.3)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ color: '#2d5f8a', marginTop: 0 }}>Shark {selectedShark.id}</h3>
            <div style={{ marginTop: '15px' }}>
              <p><strong>Depth:</strong> {selectedShark.depth}m</p>
              <p><strong>Length:</strong> {selectedShark.length}m</p>
              <p><strong>Location:</strong></p>
              <p>Latitude: {selectedShark.lat.toFixed(4)}°</p>
              <p>Longitude: {selectedShark.lng.toFixed(4)}°</p>
              <p><strong>Last Updated:</strong></p>
              <p>{new Date(selectedShark.timestamp).toLocaleString()}</p>
            </div>
            <button
              onClick={() => setSelectedShark(null)}
              style={{
                marginTop: '15px',
                padding: '8px 15px',
                background: '#2d5f8a',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1a4a7a'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2d5f8a'}
            >
              Clear Selection
            </button>
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(26, 26, 26, 0.8)',
          padding: '15px',
          borderRadius: '8px',
          color: 'white',
          maxHeight: '80%',
          overflowY: 'auto',
          zIndex: 1000,
          border: '1px solid rgba(45, 95, 138, 0.3)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2d5f8a' }}>Shark Tracking</h3>
          <p style={{ fontSize: '14px', marginBottom: '10px' }}>Click on a shark to view details</p>
          {[...(sharkData.sharks || [])].sort((a, b) => {
            const aNum = parseInt(a.id.replace('WS', ''));
            const bNum = parseInt(b.id.replace('WS', ''));
            return aNum - bNum;
          }).map(shark => (
            <div
              key={`shark-${shark.id}`}
              onClick={() => setSelectedShark(prev => prev?.id === shark.id ? null : shark)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                fontSize: '14px',
                opacity: selectedShark ? (selectedShark.id === shark.id ? 1 : 0.5) : 1,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
            >
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: selectedShark && selectedShark.id !== shark.id ?
                  'rgba(128, 128, 128, 0.6)' : shark.color,
                marginRight: '8px',
                border: '2px solid white'
              }} />
              <span>Shark {parseInt(shark.id.replace('WS', ''))}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedShark && (
        <div style={{
          width: '100%',
          padding: '20px',
          backgroundColor: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '8px',
          border: '1px solid rgba(45, 95, 138, 0.3)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          marginBottom: '40px',
          overflow: 'hidden'
        }}>
          <h2 style={{ color: '#2d5f8a', marginBottom: '20px' }}>
            Movement Track for Shark {selectedShark.id}
          </h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden'
          }}>
            <img
              src={`/src/public/plots/shark_${selectedShark.id}.png`}
              alt={`Movement track for Shark ${selectedShark.id}`}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '4px',
                boxShadow: '0 4px 15px rgba(45, 95, 138, 0.2)',
                display: 'block'
              }}
              onError={(e) => {
                console.error(`Failed to load plot for shark ${selectedShark.id}`);
                e.target.src = '/src/public/plots/shark_WS1.png'; // Fallback to first shark's plot
                e.target.alt = 'Shark track visualization not available';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MapView;
