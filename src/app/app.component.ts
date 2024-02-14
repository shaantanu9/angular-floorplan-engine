import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-draw';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'floorplan-app-2';
  //   title = 'floorplan-app-2';
  imageUrl =
    'https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145940/What-is-a-floor-plan-with-dimensions.png'; // Replace with your image URL
  geojson = null; // Initialize GeoJSON data as needed
  ngOnInit(): void {
    this.initializeMap();
  }
  initializeMap(): void {
    const position = [52.396185, 13.3831551]; // Initial map position
    const map = L.map('map').setView([52.396185, 13.3831551], 10); // Create Leaflet map

    // Add image overlay
    L.imageOverlay(this.imageUrl, [
      [52.34335, 13.0826], // Bottom left coordinate
      [52.68135, 13.78545], // Top right coordinate
    ]).addTo(map);

    // Initialize Leaflet Draw plugin
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        rectangle: undefined,
        circle: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);
  }
}
