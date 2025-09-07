export type Location = {
  x: number;
  y: number;
  z: number;
  yaw: number;
};

export type Scene = {
  table1: Location;
  table2: Location;
  chair1: Location;
  chair2: Location;
};

const SALON_SCENE: Scene = {
  table1: { x: 3.5, y: 3.5, z: 0.24, yaw: -Math.PI / 4 },
  table2: { x: 4.5, y: 2.5, z: 0.24, yaw: -Math.PI / 4 },
  chair1: { x: 3.7, y: 3.7, z: 0.24, yaw: -Math.PI / 4 },
  chair2: { x: 4.7, y: 2.7, z: 0.24, yaw: -Math.PI / 4 },
};

const CAFE_SCENE: Scene = {
  table1: { x: 4.4, y: 3.5, z: 0.24, yaw: -Math.PI / 4 },
  table2: { x: 4.15, y: 3.25, z: 0.24, yaw: -Math.PI / 4 },
  chair1: { x: 4.7, y: 3.7, z: 0.24, yaw: (7 * Math.PI) / 4 },
  chair2: { x: 4.9, y: 2.9, z: 0.24, yaw: (-3 * Math.PI) / 4 },
};

const BAR_SCENE: Scene = {
  table1: { x: 3.4, y: 3.0, z: 0.24, yaw: -Math.PI / 4 },
  table2: { x: 4.0, y: 2.4, z: 0.24, yaw: -Math.PI / 4 },
  chair1: { x: 3.6, y: 3.2, z: 0.24, yaw: -Math.PI / 4 },
  chair2: { x: 4.2, y: 2.6, z: 0.24, yaw: -Math.PI / 4 },
};

export const SCENES = {
  scene1: {
    ...SALON_SCENE,
  },
  scene9: {
    ...CAFE_SCENE,
  },
  scene12: {
    ...BAR_SCENE,
  },
  scene16: {
    ...CAFE_SCENE,
  },
};
