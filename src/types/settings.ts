export interface NeuralCoreSettings {
  confidenceThreshold: number;
  predictiveEscalation: boolean;
  autonomousApprovals: boolean;
}

export interface GraphVisualSettings {
  pulseIntensity: number;
  dynamicClustering: boolean;
  nodeLabels: boolean;
}

export interface InfrastructureSettings {
  apiKey: string;
  region: string;
  persistenceMode: 'REAL_TIME' | 'BATCH' | 'HYBRID';
}

export interface SystemSettings {
  neuralCore: NeuralCoreSettings;
  graphVisuals: GraphVisualSettings;
  infrastructure: InfrastructureSettings;
}
