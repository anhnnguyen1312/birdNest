"use client"; // nếu dùng Next.js 13 app router

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import { MapPinIcon } from "@heroicons/react/24/outline";
// dynamic import để tránh lỗi SSR do sử dụng window trong react-map-gl

// import Map component từ react-map-gl (Mapbox implementation)
const Map = dynamic(
  () => import("react-map-gl/mapbox").then((mod) => mod.default),
  { ssr: false }
);
// Mapbox token
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhhaS1uZ29jLXBodSIsImEiOiJjbHhpd3p2amwxbGozMnJyMmJhZTExZ3pkIn0.BnFFOObKYnZUOf2wJstUFg";

interface Branch {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: "Chi nhánh 1",
    latitude: 11.351759330516785,
    longitude: 106.63619390969603,
    address: "Xã Trừ Văn Thố, Hồ Chí Minh",
  },
  {
    id: 2,
    name: "Chi nhánh 2",
    latitude: 10.843991447527756,
    longitude: 106.71214159694847,
    address: "Khu Đô Thị Vạn Phúc",
  },
  {
    id: 3,
    name: "Chi nhánh 3",
    latitude: 10.710908845801285,
    longitude: 106.7032403022464,
    address: "Chung Cư Hoàng Anh An Tiến, Hồ Chí Minh",
  },
];

const BranchesMap: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const initialViewState = {
    latitude: 11.351759330516785,
    longitude: 106.63619390969603,
    zoom: 13,
  };

  return (
    <div style={{ width: "100%", height: "40vh" }}>
      <Map
        initialViewState={initialViewState}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onClick={(e) => {
          console.log("Event:", e);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <NavigationControl position="bottom-right" /> */}
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            latitude={branch.latitude}
            longitude={branch.longitude}
          >
            <div
              style={{ cursor: "pointer", color: "red", fontSize: "30px" }}
              onClick={() => setSelectedBranch(branch)}
            >
              &#x1f4cc
              {/* &#x1f4cc; icon marker đơn giản */}
              {/* <h1>ok</h1>
              <MapPinIcon className="w-5 h-5" /> */}
            </div>
          </Marker>
        ))}
        {selectedBranch && (
          <Popup
            latitude={selectedBranch.latitude}
            longitude={selectedBranch.longitude}
            onClose={() => setSelectedBranch(null)}
            closeOnClick={false}
            anchor="top"
          >
            <div>
              <h4>{selectedBranch.name}</h4>
              <p>{selectedBranch.address}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default BranchesMap;
